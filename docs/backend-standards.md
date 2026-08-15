---
description: Backend development standards, best practices, and conventions for the app-prices-rest Java/Spring Boot application, including layered architecture, API design, persistence, and testing practices.
globs: ["src/main/java/**/*.java", "src/test/java/**/*.java", "src/main/resources/**/*.yaml", "src/main/resources/db/migration/**/*.sql", "pom.xml"]
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
  - [Naming Conventions](#naming-conventions)
  - [Lombok Usage](#lombok-usage)
  - [Error Handling](#error-handling)
- [API Design Standards](#api-design-standards)
- [Database Patterns](#database-patterns)
  - [Migrations (Flyway)](#migrations-flyway)
  - [Repository Pattern (Spring Data JPA)](#repository-pattern-spring-data-jpa)
- [Testing Standards](#testing-standards)
- [Known Risks and Defects](#known-risks-and-defects)
- [Development Workflow](#development-workflow)

---

## Overview

This document outlines the practices, conventions, and standards used in the `app-prices-rest`
backend application: a single-endpoint Spring Boot REST service that resolves the applicable
price for a brand/product at a given point in time.

## Technology Stack

### Core Technologies
- **Java 11**
- **Spring Boot 2.4.5** (`spring-boot-starter-web`, `spring-boot-starter-data-jpa`)
- **Maven** — use the system `mvn`; the checked-in `./mvnw`/`mvnw.cmd` wrapper is currently broken
  (see [Known Risks](#known-risks-and-defects))
- **Lombok** — reduces boilerplate on models, entities, and DTOs (`@Data`, `@Builder`,
  `@AllArgsConstructor`, `@NoArgsConstructor`, `@Getter`, `@Slf4j`)

### Database & Persistence
- **Spring Data JPA** over `JpaRepository`
- **H2** in-memory database (runtime dependency), schema `test`
- **Flyway** for version-controlled schema migrations, configured via `spring.flyway.*` in
  `application.yaml`
- `hibernate.ddl-auto: none` — Hibernate never generates or alters schema; Flyway migrations are
  the only source of schema truth

### Testing
- **JUnit 5** (Jupiter)
- **Spring Boot Test** (`@SpringBootTest`, full application context — no `@WebMvcTest`/
  `@DataJpaTest` slices are currently used)
- **Mockito** (`@MockBean`) for mocking repository collaborators in service tests
- **MockMvc** for controller-level integration tests
- No code-coverage tool is currently configured in `pom.xml` (no JaCoCo or equivalent plugin) —
  do not claim or enforce a numeric coverage threshold that doesn't exist in the build

### Development Tools
- Spring Boot DevTools (runtime, optional) for local hot reload
- Spring Boot Configuration Processor (optional) for IDE config metadata

## Architecture Overview

### Layered Architecture

The backend follows a simple layered architecture — not full Domain-Driven Design; there are no
aggregates, value objects, or domain events in this codebase.

**`rest/`** — HTTP boundary
- `rest/controllers/` — `@RestController`s that parse request parameters and delegate to
  `core/services`
- `rest/dto/` — response DTOs not backed by persistence (`Error`)
- `rest/exception/` — `@RestControllerAdvice` global exception handling

**`core/`** — application/business logic
- `core/services/` — interfaces plus an `impl/` package, orchestrating repositories and converters
- `core/converters/` — Spring `Converter<S, T>` beans mapping persistence entities to API-facing
  models
- `core/model/` — plain model classes returned to callers (not JPA entities)
- `core/exception/` — exception hierarchy (`HttpException` → `NotFoundException` →
  `NoPriceFoundException`)

**`db/`** — persistence
- `db/entities/` — JPA `@Entity` classes, one per table
- `db/repositories/` — `JpaRepository` interfaces using Spring Data derived query methods

### Project Structure

```
src/main/java/com/llandaeta/prices/
├── AppPricesRestApplication.java     # @SpringBootApplication entry point
├── core/
│   ├── converters/                   # PriceEntityModelConverter
│   ├── exception/                    # HttpException, NotFoundException, NoPriceFoundException
│   ├── model/                        # PriceModel
│   └── services/
│       ├── PriceService.java         # interface
│       └── impl/PriceServiceImpl.java
├── db/
│   ├── entities/                     # PriceEntity
│   └── repositories/                 # PriceRepository
└── rest/
    ├── controllers/                  # PriceController
    ├── dto/                          # Error
    └── exception/                    # HttpErrorHandler

src/main/resources/
├── application.yaml
└── db/migration/                     # Flyway migrations (V<n>_description.sql)

src/test/java/com/llandaeta/prices/   # mirrors src/main/java package structure
```

## Coding Standards

### Naming Conventions
- Packages: lowercase, singular where practical (`controllers`, `services`, `entities`,
  `repositories`)
- Classes: PascalCase, suffixed by role — `*Controller`, `*Service`/`*ServiceImpl`,
  `*Repository`, `*Entity`, `*Model`, `*Converter`, `*Exception`
- Methods/fields: camelCase

### Lombok Usage
- `@Data` + `@Builder` on plain models/DTOs (`PriceModel`, `Error`)
- `@Entity` classes additionally use `@Builder`, `@AllArgsConstructor`, `@NoArgsConstructor` (JPA
  requires a no-args constructor)
- `@AllArgsConstructor` on `@Service`/`@RestController` classes for constructor injection — do not
  use field injection (`@Autowired` on fields)
- `@Slf4j` for logging; do not instantiate loggers manually
- `@Getter` on exception classes exposing immutable state (e.g. `HttpException.httpStatus`)

### Error Handling
- Business/HTTP errors extend `core.exception.HttpException`, which carries a Spring `HttpStatus`
- `NotFoundException` (404) and `NoPriceFoundException` (extends `NotFoundException`) are the only
  concrete exceptions currently defined
- `rest.exception.HttpErrorHandler` is a `@RestControllerAdvice` that maps `HttpException` to a
  structured `Error` response (`{httpcode, message}`) using the exception's own status
- New domain errors should extend `HttpException` (or an existing subclass) rather than being
  thrown as a raw `RuntimeException`, so they are handled consistently by `HttpErrorHandler`

## API Design Standards

### REST Endpoints
- Base path: `/api`
- Query-parameter-based filtering is the current pattern
  (`GET /api/price?brandId=&productId=&applicationDate=`) — there is only one endpoint today;
  follow the same query-parameter style for read endpoints unless a resource clearly needs a path
  parameter (e.g. `/api/price/{id}`)
- Date/time query parameters use the literal pattern `yyyy-MM-dd HH:mm:ss` (see
  `PriceController`, parsed with `DateTimeFormatter.ofPattern(...)`), not ISO-8601 — keep new
  date-time parameters consistent with this unless there's a project-wide reason to change it

### Response Format
- Success responses return the domain model directly (e.g. `PriceModel`) — there is no
  `{data, metadata}` or `{success, data}` envelope in this codebase
- Error responses use the shared `Error` DTO: `{"httpcode": <int>, "message": <string>}`

## Database Patterns

### Migrations (Flyway)
- Location: `src/main/resources/db/migration/`, configured via
  `spring.flyway.locations=filesystem:src/main/resources/db/migration`
- Naming: `V<n>_<description>.sql` (e.g. `V1_create_tables.sql`); `sql-migration-separator` is
  configured as `_`
- Schema: all objects live under the `test` schema (`spring.flyway.schemas: test`) — this name is
  inherited from the original project setup, not a per-environment convention; do not assume it
  changes between environments without checking `application.yaml`
- `hibernate.ddl-auto: none` — never rely on Hibernate to create/alter tables; every schema change
  must be a new Flyway migration

### Repository Pattern (Spring Data JPA)
- Repository interfaces extend `JpaRepository<Entity, IdType>` under `db/repositories/`
- Prefer Spring Data derived query methods (as in `PriceRepository`) over `@Query` for simple
  lookups; reserve `@Query`/`@Modifying` for cases where a derived-method name would become
  unreadable
- Repositories return entities; conversion to API-facing models happens in `core/converters/`,
  never in the controller

## Testing Standards

- Framework: JUnit 5 (Jupiter) via `spring-boot-starter-test`
- Current tests use `@SpringBootTest` (full application context) rather than test slices
  (`@WebMvcTest`, `@DataJpaTest`); follow this pattern unless a test's scope specifically benefits
  from a slice
- Controller tests use `MockMvc` built from the `WebApplicationContext`
  (`@SpringBootTest(webEnvironment = RANDOM_PORT)` +
  `MockMvcBuilders.webAppContextSetup(wac)`), asserting on `jsonPath(...)`
- Service tests mock the repository layer with `@MockBean` and Mockito's
  `doReturn(...).when(...)`
- Converter tests are plain `@SpringBootTest` classes that `@Autowired` the converter bean
  directly
- Test naming: descriptive method names in `shouldReturnX_forY` or plain behavior-describing style
  (`convert()`, `testSearchPriceToApply()`) — both styles exist in the current codebase; prefer
  the descriptive `should...` form for new controller/integration tests since it documents the
  scenario in the test report
- No code-coverage threshold is enforced by the build

## Known Risks and Defects

Documented as-is because they exist in the current codebase; not conventions to copy into new
code.

1. **`HttpErrorHandler.unhandledExceptions` parameter type.** The method is annotated
   `@ExceptionHandler(Exception.class)` but its parameter is typed `HttpException`, not
   `Exception`. For a thrown exception that is not an `HttpException` — including a
   `DateTimeParseException` from an unparsable `applicationDate` in `PriceController` — Spring
   cannot bind the parameter, so this handler does not reliably produce the intended structured
   `500` response for genuinely unexpected errors. New global handlers should keep the annotation
   value and the parameter type in agreement.
2. **`NoPriceFoundException` message.** The message `"No  price found to the brand"` (double
   space) does not mention the product and has a formatting typo. Do not copy this string into
   new error messages.
3. **Migration timestamp literals.** `V1_create_tables.sql` uses `.` as the time separator in seed
   data (e.g. `'2020-06-14 00.00.00'`) rather than the more common `:` — H2 accepts this, but new
   migrations should use standard `HH:mm:ss` unless there's a reason to match the existing seed
   rows exactly.
4. **Unvalidated `applicationDate`.** `PriceController` parses `applicationDate` with a fixed
   `DateTimeFormatter` and no try/catch; combined with risk 1, a malformed value currently surfaces
   as an unhandled exception rather than a clean `400` response.

## Development Workflow

### Build and Run
```bash
mvn validate             # first run after cloning — online, so dependencies can be downloaded
mvn test                  # first test run — online
mvn -o validate           # offline validate, once dependencies are already cached
mvn -o test                # offline test run, once dependencies are already cached
mvn spring-boot:run         # run the application locally (H2 in-memory, Flyway auto-migrates on startup)
```
Use system `mvn`, not `./mvnw` — the wrapper's `.mvn/wrapper/` support files are not present in
this repository (see `ADOPT-01` evidence in `.specboot/adoption/ADOPTION-RUN-LOG.md`).

### Git Workflow
- Feature branches, descriptive commit messages in English, small focused PRs — the same general
  discipline `base-standards.md` describes. No backend-specific branch-suffix convention is
  established in this repository's history.

---

This document reflects the actual `app-prices-rest` codebase as adapted during SpecBoot adoption
(`ADOPT-06`). Update it whenever the stack, architecture, or conventions materially change.
