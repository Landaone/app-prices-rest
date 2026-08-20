# Data Model Documentation

This document describes the data model for the Prices REST API — a single-table Spring Boot
service that resolves the applicable price for a brand/product/date combination.

## Model Descriptions

### 1. PriceEntity (persistence) / PriceModel (API response)

Represents one price-list window: a price that applies to a brand and product during a given
date range, with a priority used to break ties when windows overlap.

The application uses two representations of the same concept:

- `PriceEntity` (src/main/java/com/llandaeta/prices/db/entities/PriceEntity.java) — the JPA
  entity mapped to the `PRICES` table.
- `PriceModel` (src/main/java/com/llandaeta/prices/core/model/PriceModel.java) — the response
  model returned by the REST API, with identical fields to `PriceEntity` (mapped by
  `PriceEntityModelConverter`, src/main/java/com/llandaeta/prices/core/converters/PriceEntityModelConverter.java).

**Fields** (identical across both representations except where noted):

| Field | Type | Column | Description |
|---|---|---|---|
| `id` | `Long` | `ID` (identity, PK) | Unique identifier. Present only on `PriceEntity` — not exposed on `PriceModel` (src/main/java/com/llandaeta/prices/core/converters/PriceEntityModelConverter.java:14-23 never copies `id`). |
| `brandId` | `int` | `BRAND_ID` | Brand identifier |
| `startDate` | `LocalDateTime` | `START_DATE` | Start of this price window's validity period |
| `endDate` | `LocalDateTime` | `END_DATE` | End of this price window's validity period |
| `productId` | `int` | `PRODUCT_ID` | Product identifier |
| `priceList` | `int` | `PRICE_LIST` | Identifier of the price list this row belongs to |
| `priority` | `int` | `PRIORITY` | Tie-break rank among overlapping windows for the same brand/product/date — higher wins |
| `price` | `double` | `PRICE`, `DECIMAL(4,2)` | The price amount |
| `curr` | `String` | `CURR`, `VARCHAR(3)` | ISO currency code (e.g. `EUR`) |

**Validation Rules:**

- None enforced by the entity, model, or controller — `PriceEntity` and `PriceModel` are plain
  Lombok `@Data`/`@Builder` classes with no Bean Validation annotations
  (src/main/java/com/llandaeta/prices/db/entities/PriceEntity.java,
  src/main/java/com/llandaeta/prices/core/model/PriceModel.java), and
  `PriceController.searchPriceForBrandTime` performs no validation on its query parameters
  beyond what `LocalDateTime.parse` itself enforces
  (src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:24-30).

**Relationships:**

- None. `PRICES` is the only table (src/main/resources/db/migration/V1_create_tables.sql); there
  are no foreign keys.

**Query used to resolve the applicable price** (src/main/java/com/llandaeta/prices/db/repositories/PriceRepository.java:13):

```
findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc(
    brandId, productId, startDate, endDate)
```

Given a `brandId`, `productId`, and a single instant (passed as both `startDate` and `endDate`
by the caller — src/main/java/com/llandaeta/prices/core/services/impl/PriceServiceImpl.java:26,
src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:30), this returns the
one row whose window contains that instant, preferring the highest `priority` when more than one
window overlaps. If no row matches, `PriceServiceImpl` throws `NoPriceFoundException`
(src/main/java/com/llandaeta/prices/core/exception/NoPriceFoundException.java), which the global
error handler maps to HTTP 404.

## Entity Relationship Diagram

```mermaid
erDiagram
    PriceEntity {
        Long id PK
        int brandId
        LocalDateTime startDate
        LocalDateTime endDate
        int productId
        int priceList
        int priority
        double price
        String curr
    }
```

## Persistence and Migrations

- **Database**: H2, in-memory (`jdbc:h2:mem:testdb` by default, overridable via the
  `DATABASE_URL`/`DATABASE_USER`/`DATABASE_PASS` environment variables —
  src/main/resources/application.yaml:12-16). The H2 console is enabled
  (src/main/resources/application.yaml:9-11).
- **Schema**: all tables live under the `test` schema (src/main/resources/db/migration/V1_create_tables.sql:1,
  src/main/resources/application.yaml:20).
- **Migrations**: managed by Flyway, `baseline-on-migrate: true`, migrations loaded from
  `filesystem:src/main/resources/db/migration` (src/main/resources/application.yaml:17-22). A
  single migration, `V1_create_tables.sql`, creates the `PRICES` table and seeds it with the 4
  fixture rows used by the test suite (src/main/resources/db/migration/V1_create_tables.sql).
- **JPA**: `hibernate.ddl-auto: none` — schema changes are made exclusively through Flyway
  migrations, never through Hibernate auto-DDL (src/main/resources/application.yaml:23-25).

## Known Risks and Defects

- **No Bean Validation on the entity or the request path**: neither `PriceEntity`/`PriceModel`
  nor `PriceController` declare validation constraints, so malformed input (e.g. a negative
  `brandId`) is accepted by the query and simply yields no match (404) rather than a 400
  (src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:23-31).
- See `docs/api-spec.yml`'s `x-known-risks-and-defects` for the `applicationDate` parsing and
  unhandled-exception-handler defects, which are API-contract-level, not data-model-level.
