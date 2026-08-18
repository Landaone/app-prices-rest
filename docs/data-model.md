# Data Model Documentation

This document describes the data model for the `app-prices-rest` application: a Spring Boot /
JPA / H2 / Flyway service that resolves the applicable price for a brand, product, and point in
time. There is exactly **one** persisted entity.

## Model Description

### PriceEntity

Represents a price-list row: a price for a given brand and product, valid over a date range, with
a priority used to resolve overlapping ranges.

Source: `src/main/java/com/llandaeta/prices/db/entities/PriceEntity.java:14-48`.

**JPA mapping:**
- `@Entity` (`PriceEntity.java:14`)
- `@Table(name = "prices", schema = "test")` (`PriceEntity.java:15`)
- Lombok: `@Data @AllArgsConstructor @NoArgsConstructor @Builder` (`PriceEntity.java:16-19`)

**Fields:**

| Field | Java type | Column | Column type (migration) | Notes |
|---|---|---|---|---|
| `id` | `Long` | `ID` | `IDENTITY PRIMARY KEY` | `@Id` (`PriceEntity.java:22-23`); auto-generated identity column (`V1_create_tables.sql:5`) |
| `brandId` | `int` | `BRAND_ID` | `INTEGER` | `PriceEntity.java:25-26` / `V1_create_tables.sql:6` |
| `startDate` | `LocalDateTime` | `START_DATE` | `TIMESTAMP` | Inclusive lower bound of the validity window; `PriceEntity.java:28-29` / `V1_create_tables.sql:7` |
| `endDate` | `LocalDateTime` | `END_DATE` | `TIMESTAMP` | Inclusive upper bound of the validity window; `PriceEntity.java:31-32` / `V1_create_tables.sql:8` |
| `productId` | `int` | `PRODUCT_ID` | `INTEGER` | `PriceEntity.java:34-35` / `V1_create_tables.sql:10` |
| `priceList` | `int` | `PRICE_LIST` | `INTEGER` | Identifies which price list/rate the row belongs to; `PriceEntity.java:37-38` / `V1_create_tables.sql:9` |
| `priority` | `int` | `PRIORITY` | `INTEGER` | Used to break ties when multiple rows match the same brand/product/date; higher wins (see [Query Semantics](#query-semantics)); `PriceEntity.java:40-41` / `V1_create_tables.sql:11` |
| `price` | `double` | `PRICE` | `DECIMAL(4,2)` | The price amount; `PriceEntity.java:43-44` / `V1_create_tables.sql:12`. **Column can only represent values up to `99.99`** — see [Known Risks and Defects](#known-risks-and-defects) |
| `curr` | `String` | `CURR` | `VARCHAR(3)` | ISO-4217-shaped currency code (seed data uses `EUR`); `PriceEntity.java:46-47` / `V1_create_tables.sql:13` |

**Relationships:** none. `PriceEntity` has no `@OneToMany`, `@ManyToOne`, or other JPA
relationship annotations — verified by inspection of the full file
(`src/main/java/com/llandaeta/prices/db/entities/PriceEntity.java`); `brandId` and `productId` are
plain integer columns, not foreign keys to other mapped entities. There is no `Brand` or `Product`
entity anywhere in the codebase.

### Table-only vs entity-only naming mismatch

`PriceEntity.java:15` binds to `@Table(name = "prices", schema = "test")` (lower-case
`prices`), while `V1_create_tables.sql:3` creates `` `test`.`PRICES` `` (upper-case, backtick
quoted). Both resolve to the same physical table under H2's default (case-insensitive,
uppercase-folding) identifier handling — confirmed by running the project's test suite
successfully against this exact schema and entity mapping (`mvn test`, all four test classes
passing, including database-backed tests). This is not a defect to fix in this document; it is
recorded here so future entity or migration edits do not assume the names must be
character-for-character identical.

## Persistence Configuration

Source: `src/main/resources/application.yaml`.

- `spring.jpa.hibernate.ddl-auto: none` (`application.yaml:24`) — Hibernate never generates or
  alters schema; all schema changes come from Flyway migrations only.
- `spring.jpa.show-sql: true` (`application.yaml:25`) — generated SQL is logged.
- `spring.datasource.url: ${DATABASE_URL:jdbc:h2:mem:testdb}` (`application.yaml:15`) — defaults
  to an **in-memory** H2 database unless `DATABASE_URL` is set; state does not survive a restart
  by default.
- `spring.datasource.username: ${DATABASE_USER:sa}` (`application.yaml:14`),
  `spring.datasource.password: ${DATABASE_PASS:}` (`application.yaml:13`, empty by default).
- `spring.h2.console.enabled: true` (`application.yaml:9-11`) — the H2 web console is enabled.

## Migration

Source: `src/main/resources/db/migration/V1_create_tables.sql:1-26`. This is the **only**
migration file in the repository (verified: `find src -path "*db/migration*"` returns exactly one
file).

1. `CREATE SCHEMA test;` (line 1)
2. `CREATE TABLE `test`.`PRICES` (...)` with the column definitions in the table above (lines
   3-14)
3. Four `INSERT` statements seeding the table (lines 16-26), reproduced here as the model's
   canonical example data:

| BRAND_ID | START_DATE | END_DATE | PRICE_LIST | PRODUCT_ID | PRIORITY | PRICE | CURR |
|---|---|---|---|---|---|---|---|
| 1 | 2020-06-14 00:00:00 | 2020-12-31 23:59:59 | 1 | 35455 | 0 | 35.50 | EUR |
| 1 | 2020-06-14 15:00:00 | 2020-06-14 18:30:00 | 2 | 35455 | 1 | 25.45 | EUR |
| 1 | 2020-06-15 00:00:00 | 2020-06-15 11:00:00 | 3 | 35455 | 1 | 30.50 | EUR |
| 1 | 2020-06-16 00:00:00 | 2020-12-31 23:59:59 | 4 | 35455 | 1 | 38.95 | EUR |

Flyway configuration (`application.yaml:17-22`): `spring.flyway.enabled: true`,
`locations: filesystem:src/main/resources/db/migration`, `schemas: test`,
`baseline-on-migrate: true`, `sql-migration-separator: _` — matching the `V1_create_tables.sql`
naming.

## Query Semantics

The single repository query,
`PriceRepository.findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc`
(`src/main/java/com/llandaeta/prices/db/repositories/PriceRepository.java:13`), implements
"find the applicable price": among rows matching `brandId` and `productId` whose
`[startDate, endDate]` window contains the given instant (inclusive on both ends), return the one
with the highest `priority`, or none.

`PriceServiceImpl.searchPriceToApply` (`src/main/java/com/llandaeta/prices/core/services/impl/PriceServiceImpl.java:25-31`)
calls this query and throws `NoPriceFoundException`
(`src/main/java/com/llandaeta/prices/core/exception/NoPriceFoundException.java:3-6`) when no row
matches, which `HttpErrorHandler` maps to HTTP 404 (`src/main/java/com/llandaeta/prices/rest/exception/HttpErrorHandler.java:15-22`).

Both the `startDate` and `endDate` query parameters are populated from the **same** parsed
`applicationDate` value at the call site
(`src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:30`) — this is the
intended semantics (checking that a single instant falls within a row's validity window), not a
bug: the derived query's two comparisons (`startDate <= X` and `endDate >= X`) both use `X`, the
requested point in time.

## API-Facing Model: PriceModel

`core/model/PriceModel.java:9-23` is the DTO returned by the REST API — a flattened view of
`PriceEntity` without the `id` field:

| Field | Type |
|---|---|
| `brandId` | `int` |
| `startDate` | `LocalDateTime` |
| `endDate` | `LocalDateTime` |
| `productId` | `int` |
| `priceList` | `int` |
| `priority` | `int` |
| `price` | `double` |
| `curr` | `String` |

Conversion from `PriceEntity` to `PriceModel` is done by
`PriceEntityModelConverter.convert` (`core/converters/PriceEntityModelConverter.java:11-24`), a
Spring `Converter<PriceEntity, PriceModel>` bean — a field-by-field copy, omitting `id`.

Verified live serialization shape (running instance, `mvn spring-boot:run`, request
`GET /api/price?brandId=1&productId=35455&applicationDate=2020-06-14 10:00:00`):
```json
{"brandId":1,"startDate":"2020-06-14T00:00:00","endDate":"2020-12-31T23:59:59","productId":35455,"priceList":1,"priority":0,"price":35.5,"curr":"EUR"}
```
`LocalDateTime` fields serialize as ISO-8601 local date-time strings (e.g.
`"2020-06-14T00:00:00"`), not as numeric arrays — this is Spring Boot's default Jackson
`jackson-datatype-jsr310` behavior and is not separately configured anywhere in this repository.

## Known Risks and Defects

1. **`PRICE` is `DECIMAL(4,2)`, capping storable values at `99.99`.**
   `V1_create_tables.sql:12` defines the column as `DECIMAL(4,2)` — 4 significant digits, 2 after
   the decimal point. All seeded prices (`35.50`, `25.45`, `30.50`, `38.95`) fit comfortably, but
   any future price at or above `100.00` cannot be represented with this column definition without
   a new migration widening it.

2. **The "no price found" message has a grammatical defect.**
   `NoPriceFoundException("No  price found to the brand")`
   (`src/main/java/com/llandaeta/prices/core/services/impl/PriceServiceImpl.java:30`) has a double
   space after "No" and reads "to the brand" rather than "for the brand". Verified in the live 404
   response body: `{"httpcode":404,"message":"No  price found to the brand"}`.

3. **No relational integrity between `PRICES` and any brand/product table.**
   `BRAND_ID` and `PRODUCT_ID` are plain integers with no foreign key or lookup table anywhere in
   the schema or codebase (verified: `V1_create_tables.sql` defines only the `PRICES` table; no
   other `CREATE TABLE` statement exists in the repository). Any integer value is accepted by the
   API for these fields; there is no validation that a given `brandId`/`productId` combination
   corresponds to a "real" brand or product beyond whether a `PRICES` row happens to exist for it.

See [Backend Standards](./backend-standards.md) §Known Risks and Defects for the related API
error-handling defect (generic exceptions do not use this model's error shape).
