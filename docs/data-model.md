# Data Model Documentation

This service has **one table**. Everything below is taken from the Flyway migration
`src/main/resources/db/migration/V1_create_tables.sql` and the JPA entity
`src/main/java/com/llandaeta/prices/db/entities/PriceEntity.java`.

The schema is owned by **Flyway, not Hibernate** — `spring.jpa.hibernate.ddl-auto` is `none`
(`src/main/resources/application.yaml`). A model change is a migration, never an entity edit alone.

## Storage

- Engine: **H2, in-memory** — `jdbc:h2:mem:testdb` by default, overridable via `DATABASE_URL`
  (`application.yaml`). The database is recreated on every start; **nothing persists across
  restarts.**
- Schema name: `test`, created by the migration itself (`V1_create_tables.sql:1`) and configured
  for Flyway as `spring.flyway.schemas: test`.
- Credentials default to user `sa` with an empty password, overridable via `DATABASE_USER` /
  `DATABASE_PASS` (`application.yaml`).

## Model Descriptions

### 1. Price

The only entity. It represents **one pricing rule** valid for a brand and product over a time
window, at a given priority.

| Column | SQL type | Java field | Java type | Notes |
|---|---|---|---|---|
| `ID` | `IDENTITY PRIMARY KEY` | `id` | `Long` | `@Id`, **no `@GeneratedValue`** — see D3 below. Never exposed by the API. |
| `BRAND_ID` | `INTEGER` | `brandId` | `int` | Brand identifier. |
| `START_DATE` | `TIMESTAMP` | `startDate` | `LocalDateTime` | Inclusive start of validity. |
| `END_DATE` | `TIMESTAMP` | `endDate` | `LocalDateTime` | Inclusive end of validity. |
| `PRICE_LIST` | `INTEGER` | `priceList` | `int` | Tariff identifier. |
| `PRODUCT_ID` | `INTEGER` | `productId` | `int` | Product identifier. |
| `PRIORITY` | `INTEGER` | `priority` | `int` | Disambiguates overlapping windows; **highest wins**. |
| `PRICE` | `DECIMAL(4,2)` | `price` | `double` | Amount. The type caps values at **99.99** — see D4. |
| `CURR` | `VARCHAR(3)` | `curr` | `String` | Currency code; all seeded rows are `EUR`. |

Entity mapping details:
- `@Entity`, `@Table(name = "prices", schema = "test")` (`PriceEntity.java:14-15`).
- Every column is bound with an explicit `@Column(name = ...)` (`PriceEntity.java:25-47`), so
  field renames do not silently change the mapping.
- Lombok supplies `@Data`, `@AllArgsConstructor`, `@NoArgsConstructor` and `@Builder`
  (`PriceEntity.java:16-19`). The no-args constructor is what JPA requires.

**There are no relationships.** No `@OneToMany`, `@ManyToOne`, `@JoinColumn`, or foreign key exists
anywhere in the schema. `BRAND_ID` and `PRODUCT_ID` are plain integers, not references to tables
this service owns.

**There are no indexes and no constraints** beyond the primary key. The lookup query filters on
`BRAND_ID`, `PRODUCT_ID`, `START_DATE` and `END_DATE` with no supporting index — acceptable at the
current four-row scale, and worth revisiting before any realistic data volume.

## Entity Relationship Diagram

A single unrelated table:

```
┌─────────────────────────────┐
│        test.PRICES          │
├─────────────────────────────┤
│ ID          IDENTITY  PK    │
│ BRAND_ID    INTEGER         │
│ START_DATE  TIMESTAMP       │
│ END_DATE    TIMESTAMP       │
│ PRICE_LIST  INTEGER         │
│ PRODUCT_ID  INTEGER         │
│ PRIORITY    INTEGER         │
│ PRICE       DECIMAL(4,2)    │
│ CURR        VARCHAR(3)      │
└─────────────────────────────┘
```

## Access Pattern

Exactly one query reads this table
(`src/main/java/com/llandaeta/prices/db/repositories/PriceRepository.java:13`):

```java
Optional<PriceEntity> findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc(
        int brandId, int productId, LocalDateTime startDate, LocalDateTime endDate);
```

Read as a rule: *of the rows for this brand and product whose window contains the requested instant
(inclusive at both ends), take the one with the highest priority.* Absence is a normal outcome and
becomes a 404 (`PriceServiceImpl.java:30`).

The entity never leaves the `core` layer: `PriceEntityModelConverter` maps it to `PriceModel`
(`src/main/java/com/llandaeta/prices/core/converters/PriceEntityModelConverter.java:12`), dropping
`id` and carrying the other eight fields through unchanged.

## Seed Data

`V1_create_tables.sql` inserts **four rows**, all for brand `1` and product `35455`
(`V1_create_tables.sql:15-25`):

| price_list | start_date | end_date | priority | price | curr |
|---|---|---|---|---|---|
| 1 | 2020-06-14 00:00:00 | 2020-12-31 23:59:59 | 0 | 35.50 | EUR |
| 2 | 2020-06-14 15:00:00 | 2020-06-14 18:30:00 | 1 | 25.45 | EUR |
| 3 | 2020-06-15 00:00:00 | 2020-06-15 11:00:00 | 1 | 30.50 | EUR |
| 4 | 2020-06-16 00:00:00 | 2020-12-31 23:59:59 | 1 | 38.95 | EUR |

These rows deliberately overlap with price list 1 so that the priority rule is exercised.

**This seed data is a test fixture.** All five tests in
`src/test/java/com/llandaeta/prices/rest/controllers/PriceControllerTest.java` assert against these
exact values. Changing an `INSERT` will break them.

Note the literal timestamps use **dots** as the time separator — `'2020-06-14 00.00.00'`, not
`00:00:00` (`V1_create_tables.sql:16`). H2 accepts this; it is unusual and is recorded here so it is
not "corrected" without checking.

## Migration Conventions

- Migrations live in `src/main/resources/db/migration` and are located by Flyway through a
  **filesystem** path, not the classpath (`application.yaml`) — see defect D5 in
  [Backend Standards](./backend-standards.md#known-risks-and-defects).
- `spring.flyway.sql-migration-separator` is `_` (a single underscore), overriding Flyway's default
  `__`. That is why the existing file is `V1_create_tables.sql`. **A new migration named
  `V2__add_index.sql` will not be recognised under this configuration** — use `V2_add_index.sql`.
- `baseline-on-migrate: true` is set (`application.yaml`).

## Known Risks and Defects

Each is stated with its citation, and each is documented rather than fixed here.

- **D3 — no identifier generation strategy.** `@Id` appears without `@GeneratedValue`
  (`PriceEntity.java:22-23`) while the column is `IDENTITY` (`V1_create_tables.sql:5`). Reads are
  unaffected; inserting through JPA would need a hand-assigned id.
- **D4 — money as `double`, capped at 99.99.** `price` is a primitive `double`
  (`PriceEntity.java:44`) over a `DECIMAL(4,2)` column (`V1_create_tables.sql:12`). Binary floating
  point is a poor fit for currency, and the column silently bounds the domain to two integer
  digits — a product constraint documented nowhere in the code.
- **D6 — case mismatch between mapping and migration.** The entity maps lowercase
  `prices`/`test` (`PriceEntity.java:15`); the migration creates quoted uppercase
  `` `test`.`PRICES` `` (`V1_create_tables.sql:3`). Tolerated by H2 as configured; a hazard on a
  case-sensitive engine.
- **No uniqueness guarantee.** Nothing prevents two rows with the same brand, product, window and
  priority. `findFirst` would then return an arbitrary one of them, and which one is not defined by
  the query.
