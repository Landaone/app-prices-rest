---
description: Backend standards, architecture, and conventions for the app-prices-rest Spring Boot service.
alwaysApply: true
---

# Backend Project Standards and Best Practices

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Layered Architecture](#layered-architecture)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [API Design Standards](#api-design-standards)
- [Persistence Patterns](#persistence-patterns)
- [Testing Standards](#testing-standards)
- [Known Risks and Defects](#known-risks-and-defects)

## Overview

`app-prices-rest` resolves **which price applies** to a `(brandId, productId)` pair at a given
instant. Price rows overlap in time; the row with the highest `PRIORITY` wins.

The whole service is one read-only query. There are no write endpoints, no authentication, no
messaging, and no external service calls.

## Technology Stack

Every entry below is taken from `pom.xml` or `src/main/resources/application.yaml`; none is assumed.

### Core Technologies
- **Java 11** — `pom.xml:17` (`<java.version>11</java.version>`)
- **Spring Boot 2.4.5** — `pom.xml:8`, inherited via `spring-boot-starter-parent`
- **Apache Maven** — `pom.xml`; wrappers `mvnw` / `mvnw.cmd` are present at the repository root
- **Spring Web (MVC)** — `spring-boot-starter-web`, `pom.xml:27`

### Database & Persistence
- **Spring Data JPA / Hibernate** — `spring-boot-starter-data-jpa`, `pom.xml:22`
- **H2, in-memory** — `pom.xml:44` (`runtime` scope); URL defaults to `jdbc:h2:mem:testdb`
  (`application.yaml`)
- **Flyway** — `pom.xml:32`; migrations under `src/main/resources/db/migration`
- `hibernate.ddl-auto: none` (`application.yaml`) — **the schema is owned by Flyway, never by
  Hibernate**. Do not add entity mappings expecting Hibernate to create tables.
- The H2 console is enabled (`spring.h2.console.enabled: true`, `application.yaml`).

### Testing Framework
- **JUnit 5** via `spring-boot-starter-test` (`pom.xml:62`); the **JUnit 4 vintage engine is
  explicitly excluded** (`pom.xml:66-68`), so do not write JUnit 4 tests.
- **Mockito** — used through `@MockBean`
  (`src/test/java/com/llandaeta/prices/core/services/impl/PriceServiceImplTest.java:26`)
- **MockMvc** — used for the HTTP layer
  (`src/test/java/com/llandaeta/prices/rest/controllers/PriceControllerTest.java:36`)

### Development Tools
- **Lombok** — `pom.xml:56`, `optional`, and excluded from the repackaged jar (`pom.xml:80-83`)
- **Spring Boot DevTools** — `pom.xml:37`, `runtime` + `optional`
- **spring-boot-configuration-processor** — `pom.xml:50`

## Architecture Overview

A conventional **three-layer** arrangement. This service is small and deliberately not
domain-driven: there are no aggregates, value objects, or domain events, and none should be
introduced without a change proposal that justifies the added indirection.

```
rest      HTTP boundary          controllers, DTOs, exception handling
core      application logic      services, converters, models, exception types
db        persistence            JPA entities, Spring Data repositories
```

### Layered Architecture

Dependencies point inward and downward only:

- `rest` depends on `core`. `PriceController` holds a `PriceService`
  (`src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:21`).
- `core` depends on `db`. `PriceServiceImpl` holds a `PriceRepository`
  (`src/main/java/com/llandaeta/prices/core/services/impl/PriceServiceImpl.java:21`).
- `db` depends on nothing in this project.

**`core` must never import from `rest`.** One partial exception already exists and is deliberate:
`core.exception.HttpException` carries a Spring `HttpStatus`
(`src/main/java/com/llandaeta/prices/core/exception/HttpException.java:9`). That couples the core
exception type to a web concern. It is documented here rather than silently reproduced — prefer not
to widen it.

**Entities must not leave the `core` layer.** `PriceEntity` is converted to `PriceModel` by
`PriceEntityModelConverter`
(`src/main/java/com/llandaeta/prices/core/converters/PriceEntityModelConverter.java:12`) before the
service returns. Keep that boundary: never return a `PriceEntity` from a controller.

### Project Structure

```
src/main/java/com/llandaeta/prices/
├── AppPricesRestApplication.java          @SpringBootApplication entry point
├── core/
│   ├── converters/PriceEntityModelConverter.java   Spring Converter<PriceEntity, PriceModel>
│   ├── exception/HttpException.java                RuntimeException + HttpStatus
│   ├── exception/NotFoundException.java            → 404
│   ├── exception/NoPriceFoundException.java        → 404, price-specific
│   ├── model/PriceModel.java                       API-facing model
│   └── services/PriceService.java                  interface
│       └── impl/PriceServiceImpl.java              implementation
├── db/
│   ├── entities/PriceEntity.java                   @Entity, table test.prices
│   └── repositories/PriceRepository.java           JpaRepository<PriceEntity, Long>
└── rest/
    ├── controllers/PriceController.java            @RestController, /api
    ├── dto/Error.java                              error response body
    └── exception/HttpErrorHandler.java             @RestControllerAdvice

src/main/resources/
├── application.yaml
└── db/migration/V1_create_tables.sql
```

## Coding Standards

### Naming Conventions
- Classes `PascalCase`; methods and fields `camelCase`; constants `UPPER_SNAKE_CASE`
  (as in `PriceEntityModelConverterTest.java:19-23`).
- Packages are lowercase and singular by role (`core`, `db`, `rest`), plural by content
  (`controllers`, `entities`, `services`, `converters`).
- Interface first, implementation in an `impl` sub-package with an `Impl` suffix —
  `PriceService` / `PriceServiceImpl`.
- Spring Data derived queries carry their whole predicate in the method name; the existing one is
  long by necessity, not by accident
  (`src/main/java/com/llandaeta/prices/db/repositories/PriceRepository.java:13`).

### Lombok Usage

Lombok is used throughout and is the established convention here:
- `@Data` on models and entities (`PriceModel.java:9`, `PriceEntity.java:16`)
- `@Builder` for construction (`PriceModel.java:11`, `PriceEntity.java:19`, `Error.java:7`)
- `@AllArgsConstructor` on Spring beans for constructor injection
  (`PriceController.java:17`, `PriceServiceImpl.java:18`)
- `@Slf4j` for logging (`PriceController.java:16`, `HttpErrorHandler.java:12`)
- `@Getter` on exception types (`HttpException.java:6`)

**Dependency injection is by constructor**, produced by Lombok's `@AllArgsConstructor`. Do not
introduce field injection with `@Autowired` in main code.

### Error Handling

- Throw a subclass of `HttpException` to control the HTTP status. It stores the status and falls
  back to `INTERNAL_SERVER_ERROR` when passed `null`
  (`src/main/java/com/llandaeta/prices/core/exception/HttpException.java:13`).
- `NotFoundException` fixes the status to 404 (`NotFoundException.java:9`);
  `NoPriceFoundException` extends it for the "no applicable price" case
  (`NoPriceFoundException.java:3`).
- `HttpErrorHandler` is the single `@RestControllerAdvice`
  (`src/main/java/com/llandaeta/prices/rest/exception/HttpErrorHandler.java:11`). It maps
  `HttpException` to the `Error` DTO (`HttpErrorHandler.java:16-22`).
- **Before relying on the generic fallback handler, read
  [Known Risks and Defects](#known-risks-and-defects) — it does not work as written.**

### Logging Standards
- Use the Lombok-provided `log` field; do not instantiate loggers by hand.
- Root and `com.llandaeta` log levels are both `INFO` (`application.yaml`).
- `spring.jpa.show-sql: true` (`application.yaml`) means generated SQL is printed. Be aware this is
  on in the default profile.

## API Design Standards

### REST Endpoints

The service exposes exactly one endpoint. The base path is `/api`
(`src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:18`).

```
GET /api/price?brandId={int}&productId={int}&applicationDate={yyyy-MM-dd HH:mm:ss}
```

- All three parameters are **required** `@RequestParam` values with no defaults
  (`PriceController.java:24-26`).
- `applicationDate` is received as a `String` and parsed with the explicit pattern
  `yyyy-MM-dd HH:mm:ss` (`PriceController.java:28`). Note the **space** separator — this is not
  ISO-8601, and `2020-06-14T10:00:00` will not parse.
- The response body is a `PriceModel` serialized as JSON.

The full contract, including the error shape, is in [`api-spec.yml`](./api-spec.yml). Keep the two
in step: an endpoint change that does not update `api-spec.yml` is incomplete.

### Error Response Format

`Error` is an immutable two-field body (`src/main/java/com/llandaeta/prices/rest/dto/Error.java:10-11`):

```json
{ "httpcode": 404, "message": "No  price found to the brand" }
```

The field is named `httpcode` — all lowercase, no separator. Do not rename it without treating it
as a breaking API change.

## Persistence Patterns

### Repository Pattern

`PriceRepository` extends `JpaRepository<PriceEntity, Long>`
(`src/main/java/com/llandaeta/prices/db/repositories/PriceRepository.java:11`) and declares a
single derived query:

```java
Optional<PriceEntity> findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc(
        int brandId, int productId, LocalDateTime startDate, LocalDateTime endDate);
```

This encodes the entire selection rule:
- `findFirst` + `OrderByPriorityDesc` → **highest priority wins** among overlapping rows.
- `StartDateIsLessThanEqual` / `EndDateGreaterThanEqual` → the validity window is **inclusive on
  both ends**.
- `Optional` → absence is a normal result, converted to a 404 by the service
  (`PriceServiceImpl.java:30`).

Prefer derived queries. Introduce `@Query` only when a rule cannot be expressed by method naming.

### Migrations

- Flyway owns the schema. Add a new versioned script under `src/main/resources/db/migration`.
- The migration separator is configured as `_`, not the Flyway default `__`
  (`spring.flyway.sql-migration-separator: _`, `application.yaml`), which is why the existing file
  is named `V1_create_tables.sql` with a single underscore. **A new script using the conventional
  `V2__name.sql` will not be picked up under this configuration.**
- `baseline-on-migrate: true` and `schemas: test` are both set (`application.yaml`).

## Testing Standards

### Test File Structure

Tests mirror the main source tree package for package, with a `Test` suffix:

```
src/test/java/com/llandaeta/prices/
├── AppPricesRestApplicationTests.java              context smoke test
├── core/converters/PriceEntityModelConverterTest.java
├── core/services/impl/PriceServiceImplTest.java
└── rest/controllers/PriceControllerTest.java
```

### Test Case Naming Convention

Two conventions are in use, both acceptable:
- Plain method-name-as-subject: `convert()`, `testSearchPriceToApply()`.
- Behavioural, underscore-separated: `shouldReturnSuccessful_PriceToApplyForTheDate20200614_100000()`
  (`PriceControllerTest.java:40`).

Prefer the behavioural form for new HTTP-level tests.

### Test Organization Pattern

- `@SpringBootTest` is used for **every** existing test, including the converter unit test
  (`PriceEntityModelConverterTest.java:16`). This starts the whole context and is slower than a
  focused slice; when adding narrow unit tests, plain JUnit or a slice annotation is preferable.
- `@MockBean` replaces the repository so the service can be tested without the database
  (`PriceServiceImplTest.java:26-27`).
- `PriceControllerTest` runs against the **real** repository and the Flyway-seeded H2 data — it
  uses `webEnvironment = RANDOM_PORT` with `MockMvcBuilders.webAppContextSetup`
  (`PriceControllerTest.java:22`, `:36`) and `@TestInstance(PER_CLASS)` because `@BeforeAll` is an
  instance method.
- Fixture setup goes in `@BeforeEach` (`PriceEntityModelConverterTest.java:32`).

### Test Data

`PriceControllerTest` asserts against the four rows inserted by `V1_create_tables.sql`
(product `35455`, brand `1`, price lists `1`-`4`). **Changing the seed data will break those
tests.** Treat the migration's `INSERT` statements as test fixtures.

### Coverage Gaps

Recorded as observed, via the code-graph capability, not as an aspiration:
- `HttpErrorHandler` — **no covering tests found**. Neither the mapped-exception path nor the
  fallback path is exercised.
- `PriceController.searchPriceForBrandTime` — no direct unit test; it is covered indirectly
  through `PriceControllerTest`'s MockMvc calls.
- No test asserts the **404** path, despite it being a designed behaviour
  (`PriceServiceImpl.java:30`). All five controller tests assert `status().isOk()`.
- No test covers a malformed `applicationDate`.

## Known Risks and Defects

Documented here as risks with citations. **Documenting these is in scope; fixing them is not** —
a fix belongs to its own change proposal, however small it looks.

### D1 — The generic exception handler cannot receive a generic exception

`HttpErrorHandler.unhandledExceptions` is annotated `@ExceptionHandler(Exception.class)` but
declares its parameter as `HttpException`
(`src/main/java/com/llandaeta/prices/rest/exception/HttpErrorHandler.java:24-25`):

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<Error> unhandledExceptions(HttpException exception){
```

The annotation advertises that it handles every `Exception`, while the method signature only
accepts an `HttpException`. Any exception that is not an `HttpException` cannot be bound to that
parameter, so the intended catch-all 500 response is not produced for the very cases it exists to
cover. The handler is also untested (see Coverage Gaps), so nothing currently detects this.

### D2 — Unparseable `applicationDate` is unhandled

`PriceController.searchPriceForBrandTime` parses the date with no surrounding validation or
`try`/`catch` (`PriceController.java:28`). A malformed value raises `DateTimeParseException`,
which is not an `HttpException` — so it lands on the fallback handler that D1 shows is
non-functional. The status and body a client receives for a bad date are therefore **not
specified by this codebase**, and `api-spec.yml` deliberately does not claim one.

### D3 — Entity identifier has no generation strategy

`PriceEntity.id` is annotated `@Id` with no `@GeneratedValue`
(`src/main/java/com/llandaeta/prices/db/entities/PriceEntity.java:22-23`), while the migration
declares `ID IDENTITY PRIMARY KEY` (`src/main/resources/db/migration/V1_create_tables.sql:5`).
The read path is unaffected. Persisting a new `PriceEntity` through JPA would require assigning the
identifier by hand, which is almost certainly not intended.

### D4 — Monetary amount stored as `double`

`PriceEntity.price` is a primitive `double` (`PriceEntity.java:44`) and `PriceModel.price` likewise
(`src/main/java/com/llandaeta/prices/core/model/PriceModel.java:20`), while the column is
`DECIMAL(4,2)` (`V1_create_tables.sql:12`). Two consequences: binary floating point is a poor fit
for money, and `DECIMAL(4,2)` caps any price at **99.99**, which is a product constraint nothing in
the code enforces or documents elsewhere.

### D5 — Flyway migration location is filesystem-relative

`spring.flyway.locations` is `filesystem:src/main/resources/db/migration` (`application.yaml`).
Because it is a **filesystem** path rather than the usual `classpath:` one, migrations resolve only
when the process runs with the project root as its working directory. A packaged jar started from
elsewhere would not find them.

### D6 — Case mismatch between entity mapping and migration

`PriceEntity` maps to `@Table(name = "prices", schema = "test")` in lowercase
(`PriceEntity.java:15`), while the migration creates a quoted, uppercase `` `test`.`PRICES` ``
(`V1_create_tables.sql:3`). This currently works because H2 is configured leniently, but it is a
latent portability hazard on a case-sensitive database.

### D7 — Maven wrapper cannot resolve a distribution

`mvnw` and `mvnw.cmd` are committed at the repository root, but the `.mvn/` directory — and
therefore `.mvn/wrapper/maven-wrapper.properties` — is **absent**. The wrapper has no
`distributionUrl` to read, so `./mvnw` cannot bootstrap Maven. Use the `mvn` on your `PATH`; see
[Development Guide](./development_guide.md).

### D8 — Cosmetic: doubled space in the not-found message

`new NoPriceFoundException("No  price found to the brand")` contains two spaces between "No" and
"price" (`src/main/java/com/llandaeta/prices/core/services/impl/PriceServiceImpl.java:30`). It is
reproduced verbatim in `api-spec.yml` because it is what the service actually returns. Do not
"tidy" it in the documentation while the code still emits it.
