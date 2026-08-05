---
description: Backend development standards, best practices, and conventions for the app-prices-rest Java/Spring Boot application including layered architecture, API design, persistence, error handling, and testing practices
globs: ["src/main/java/**/*.java", "src/test/java/**/*.java", "src/main/resources/**/*.yaml", "src/main/resources/db/migration/**/*.sql", "pom.xml"]
alwaysApply: true
---

# Backend Project Standards and Best Practices

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
  - [Core Technologies](#core-technologies)
  - [Database & Persistence](#database--persistence)
  - [Testing Framework](#testing-framework)
  - [Development Tools](#development-tools)
- [Architecture Overview](#architecture-overview)
  - [Layered Architecture](#layered-architecture)
  - [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
  - [Naming Conventions](#naming-conventions)
  - [Formatting Conventions](#formatting-conventions)
  - [Lombok Usage](#lombok-usage)
  - [Error Handling](#error-handling)
  - [Logging Standards](#logging-standards)
- [API Design Standards](#api-design-standards)
  - [REST Endpoints](#rest-endpoints)
  - [Request/Response Patterns](#requestresponse-patterns)
  - [Error Response Format](#error-response-format)
- [Database Patterns](#database-patterns)
  - [JPA Entities](#jpa-entities)
  - [Flyway Migrations](#flyway-migrations)
  - [Repository Pattern](#repository-pattern)
  - [Environment Configuration](#environment-configuration)
- [Testing Standards](#testing-standards)
  - [Unit Testing](#unit-testing)
  - [Controller / Integration Testing](#controller--integration-testing)
  - [Test Naming Convention](#test-naming-convention)
  - [Mocking Standards](#mocking-standards)
- [Known Risks and Defects](#known-risks-and-defects)
- [Development Workflow](#development-workflow)
  - [Git Workflow](#git-workflow)
  - [Build and Run Commands](#build-and-run-commands)

---

## Overview

This document outlines the actual practices, conventions, and standards used in the `app-prices-rest` backend application. The backend is a single-module Spring Boot REST service that exposes the price of a product for a given brand and application date. There is no Domain-Driven Design tactical pattern set (no aggregates, value objects, or domain events) — the codebase uses a pragmatic, small layered structure: REST controllers, application services, converters, and Spring Data JPA repositories.

## Technology Stack

### Core Technologies
- **Java 11**: Language level, set via `<java.version>11</java.version>` in `pom.xml`
- **Spring Boot 2.4.5**: Parent POM `org.springframework.boot:spring-boot-starter-parent`
- **Spring Web (`spring-boot-starter-web`)**: REST controllers, embedded Tomcat
- **Maven**: Build tool, invoked through the wrapper (`./mvnw`)

### Database & Persistence
- **Spring Data JPA (`spring-boot-starter-data-jpa`)**: Repository abstraction over Hibernate
- **H2 (`com.h2database:h2`, runtime scope)**: In-memory relational database, no external DB required
- **Flyway (`flyway-core`)**: SQL-based schema migrations, applied on startup

### Testing Framework
- **JUnit 5 (Jupiter)**: `spring-boot-starter-test` with `junit-vintage-engine` explicitly excluded — JUnit 4 is not used
- **Mockito**: `@MockBean` and `doReturn().when(...)` style stubbing
- **Spring MockMvc**: HTTP-level controller testing via `MockMvcBuilders.webAppContextSetup(wac)`
- **Test location**: `src/test/java`, mirroring the `src/main/java` package structure, files suffixed `Test.java`

### Development Tools
- **Lombok**: Boilerplate reduction (`@Data`, `@Builder`, `@AllArgsConstructor`, `@NoArgsConstructor`, `@Getter`, `@ToString`, `@Slf4j`), excluded from the fat jar via the `spring-boot-maven-plugin` configuration
- **Spring Boot DevTools** (`runtime`, `optional`): hot reload during local development
- **Spring Boot Configuration Processor** (`optional`): metadata for `@ConfigurationProperties`, currently unused by application code but present as a build dependency

## Architecture Overview

### Layered Architecture

The backend follows a simple layered structure under the base package `com.llandaeta.prices`, without a formal domain layer:

**REST Layer** (`rest/`)
- `rest/controllers`: `@RestController` classes that parse request parameters and delegate to services
- `rest/dto`: response DTOs shaped for the HTTP contract (currently the `Error` payload)
- `rest/exception`: `@RestControllerAdvice` global exception handling

**Core / Service Layer** (`core/`)
- `core/services` (+ `core/services/impl`): business logic behind an interface, implemented as a single `@Service` bean
- `core/model`: plain data carriers returned by services and serialized directly as API responses (no separate "view model" mapping step)
- `core/converters`: Spring `Converter<S, T>` beans that map JPA entities to `core/model` objects
- `core/exception`: custom runtime exceptions carrying an `HttpStatus`, thrown from the service layer

**Persistence Layer** (`db/`)
- `db/entities`: JPA `@Entity` classes mapped to the schema created by Flyway
- `db/repositories`: `JpaRepository` interfaces, using Spring Data derived query methods (no custom `@Query` in use today)

### Project Structure

```
src/
├── main/
│   ├── java/com/llandaeta/prices/
│   │   ├── AppPricesRestApplication.java   # @SpringBootApplication entry point
│   │   ├── core/
│   │   │   ├── converters/                 # Entity -> Model converters
│   │   │   ├── exception/                  # HttpException hierarchy
│   │   │   ├── model/                      # Response models (PriceModel)
│   │   │   └── services/
│   │   │       └── impl/                   # Service implementations
│   │   ├── db/
│   │   │   ├── entities/                   # JPA entities
│   │   │   └── repositories/               # Spring Data repositories
│   │   └── rest/
│   │       ├── controllers/                # @RestController classes
│   │       ├── dto/                        # HTTP-facing DTOs (Error)
│   │       └── exception/                  # @RestControllerAdvice handlers
│   └── resources/
│       ├── application.yaml                # Spring configuration
│       └── db/migration/                   # Flyway SQL migrations
└── test/
    └── java/com/llandaeta/prices/          # mirrors main package structure
```

## Coding Standards

### Naming Conventions

- **Package Naming**: lowercase, feature/layer-based (`core.services.impl`, `db.repositories`, `rest.controllers`)
- **Class Naming**: PascalCase, suffixed by role — `PriceController`, `PriceService`/`PriceServiceImpl`, `PriceRepository`, `PriceEntity`, `PriceModel`, `PriceEntityModelConverter`
- **Method Naming**: camelCase, intention-revealing (`searchPriceToApply`, `searchPriceForBrandTime`)
- **Test Method Naming**: see [Test Naming Convention](#test-naming-convention)
- **Exception Naming**: suffixed `Exception` and named after the HTTP semantics they carry (`NotFoundException`, `NoPriceFoundException`)

### Formatting Conventions

The existing codebase consistently omits the space before an opening brace on class, method, and control-flow declarations:

```java
// Actual style used throughout the codebase
public class PriceController{

    @GetMapping("/price")
    public PriceModel searchPriceForBrandTime(...){
        ...
    }
}
```

Follow this convention (`ClassName{` / `methodName(){`, no space) for consistency with existing files rather than the more common `ClassName {` spacing.

### Lombok Usage

- **Response/data models** (`core/model`, `rest/dto`): `@Data` + `@Builder` (add `@ToString` only if extra clarity is needed, as done on `PriceModel`)
- **JPA entities**: `@Data` + `@Builder` + `@AllArgsConstructor` + `@NoArgsConstructor` — JPA requires a no-args constructor, and the builder needs the all-args one
- **Exceptions**: `@Getter` to expose the carried `HttpStatus` without hand-written accessors
- **Services/Controllers**: `@AllArgsConstructor` for constructor injection instead of `@Autowired` fields, `@Slf4j` for logging

### Error Handling

- Domain/service-level errors are modeled as unchecked exceptions rooted in `HttpException` (`core/exception/HttpException.java`), which carries an `HttpStatus` and defaults to `INTERNAL_SERVER_ERROR` when none is supplied
- Specific cases extend `HttpException` (directly or transitively) to fix both the status and semantics, e.g. `NotFoundException` (404) and `NoPriceFoundException extends NotFoundException`
- Throw these exceptions from the service layer (`PriceServiceImpl.searchPriceToApply` throws `NoPriceFoundException` via `Optional#orElseThrow`) — controllers should not catch or translate them, that responsibility belongs to the global handler

```java
public PriceModel searchPriceToApply(final int brandId, final int productId, final LocalDateTime startDate, final LocalDateTime endDate){
    Optional<PriceEntity> optionalPrice = priceRepository.findFirstBy...(brandId, productId, startDate, endDate);

    return optionalPrice
            .map(priceEntityModelConverter::convert)
            .orElseThrow(() -> new NoPriceFoundException("No price found to the brand"));
}
```

### Logging Standards

- Use Lombok `@Slf4j` on controllers, services, and exception handlers rather than instantiating a logger manually
- Log unexpected/unhandled exceptions at `error` level with the exception object, as done in `HttpErrorHandler.unhandledExceptions`
- No structured/JSON logging is configured; log levels are set per-package in `application.yaml` (`logging.level.com.llandaeta: INFO`)

## API Design Standards

### REST Endpoints

- Every endpoint is mounted under the fixed base path `/api` via `@RequestMapping("/api")` on the controller
- Query parameters, not path variables or request bodies, are used for the current read-only endpoint (`GET /api/price?brandId=...&productId=...&applicationDate=...`)
- `applicationDate` is a `String` query parameter parsed manually in the controller with `DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")` — there is no global date/time (de)serialization configuration; new endpoints accepting dates should follow the same explicit-format approach unless a project-wide formatter is introduced

### Request/Response Patterns

- Success responses serialize the `core/model` object directly (e.g. `PriceModel`) — there is no envelope (`{ success, data }`) wrapper
- JSON field names follow the model's camelCase property names (`brandId`, `startDate`, `endDate`, `productId`, `priceList`, `priority`, `price`, `curr`)
- `LocalDateTime` fields serialize using Spring's default Jackson `JavaTimeModule` ISO format (e.g. `"2020-06-14T00:00:00"`), as asserted in `PriceControllerTest`

### Error Response Format

All errors are funneled through `rest/exception/HttpErrorHandler` (`@RestControllerAdvice`) into a single flat `Error` DTO:

```json
{
  "httpcode": 404,
  "message": "No price found to the brand"
}
```

- `HttpException` (and subclasses) are mapped to their carried status via `handleHttpError`
- Any other unhandled exception is intended to fall back to a generic 500 response — see [Known Risks and Defects](#known-risks-and-defects) for a defect in that fallback path
- There are no machine-readable error codes (`ERROR_CODE`) and no `details`/validation-error arrays in the current contract; keep new error responses consistent with this flat `{ httpcode, message }` shape unless the contract is deliberately evolved (update `docs/api-spec.yml` and this document together if so)

## Database Patterns

### JPA Entities

- One `@Entity` per table under `db/entities`, annotated with an explicit `@Table(name = ..., schema = ...)` — the schema name (`test`) is hardcoded in `PriceEntity` and must stay in sync with `spring.flyway.schemas` in `application.yaml`
- Columns are mapped explicitly with `@Column(name = "UPPER_SNAKE_CASE")` even when the name would match Hibernate's default physical naming strategy
- `hibernate.ddl-auto` is `none` — Hibernate never creates or alters schema; **Flyway migrations are the single source of truth** for the database structure

### Flyway Migrations

- Migrations live in `src/main/resources/db/migration`, loaded via `spring.flyway.locations: filesystem:src/main/resources/db/migration`
- **Non-default separator**: `spring.flyway.sql-migration-separator` is set to `_` (single underscore), so migration files follow `V<version>_<description>.sql` (e.g. `V1_create_tables.sql`), not Flyway's default `V1__description.sql`
- `baseline-on-migrate: true` and `spring.flyway.schemas: test` — the schema is created by the migration itself (`CREATE SCHEMA test;`) as its first statement
- Add new migrations as new `V<n>_description.sql` files; never edit an already-applied migration

### Repository Pattern

- Repository interfaces live in `db/repositories`, extend `JpaRepository<Entity, IdType>`, and are annotated `@Repository`
- Prefer Spring Data **derived query methods** over custom `@Query`/native SQL, following the existing style:

```java
Optional<PriceEntity> findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc(
        int brandId, int productId, LocalDateTime startDate, LocalDateTime endDate);
```

- Return `Optional<Entity>` for single-result lookups that may not exist, and translate the empty case to a domain exception in the service layer (not in the repository or controller)

### Environment Configuration

- `spring.datasource.url` / `username` / `password` are overridable via `DATABASE_URL`, `DATABASE_USER`, `DATABASE_PASS` environment variables, defaulting to the in-memory H2 instance (`jdbc:h2:mem:testdb`, user `sa`, no password) — no `.env` file or Docker Compose setup is used or required
- The H2 console is enabled (`spring.h2.console.enabled: true`) for local inspection at `/h2-console`
- `server.max-http-header-size: 102400` is the only non-default server tuning currently applied

## Testing Standards

### Unit Testing

- Tests use `@SpringBootTest` (full context) rather than slice tests (`@WebMvcTest`, `@DataJpaTest`) — even converter unit tests (`PriceEntityModelConverterTest`) boot the full Spring context and `@Autowired` the bean under test
- Service tests mock the repository with `@MockBean` and stub behavior with `doReturn(...).when(mock).method(...)`, then assert on the object returned by the real (autowired) service implementation
- Assertions use plain JUnit 5 (`assertEquals`, `assertTrue`, `assertNotNull`) — no AssertJ fluent assertions are in use

### Controller / Integration Testing

- Controller tests use `@ExtendWith(SpringExtension.class)` + `@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)`, build `MockMvc` manually in a `@BeforeAll` via `MockMvcBuilders.webAppContextSetup(wac)`, and exercise the real H2 database seeded by the Flyway migration's `INSERT` statements — repositories are **not** mocked at this level
- Assertions use `jsonPath(...)` against the actual response body; `andDo(print())` is used to aid debugging and may be kept in new tests
- Because these tests hit the real (migration-seeded) H2 data, new controller tests must either rely on the existing seed data in `V1_create_tables.sql` or add new seed rows via a new migration — do not assume a clean/mockable database at this layer

### Test Naming Convention

The codebase currently mixes two styles; use the one matching the layer you're testing:

- **Controller/integration tests**: scenario-descriptive names prefixed `shouldReturnSuccessful_...`, e.g. `shouldReturnSuccessful_PriceToApplyForTheDate20200614_100000`
- **Service/unit tests**: short, either the method under test (`convert`) or a `test<MethodName>` form (`testSearchPriceToApply`)

New tests should favor the scenario-descriptive style used by the controller tests when the test name benefits from stating the input/expected outcome; simple single-behavior unit tests may keep the shorter form.

### Mocking Standards

- Mock only the layer directly below the unit under test: repository mocked in service tests, nothing mocked in controller tests (full slice against the real H2 instance)
- Use `@MockBean` (Spring-aware mock, participates in the application context) rather than plain Mockito `@Mock`, consistent with the `@SpringBootTest`-everywhere approach
- Test data is built inline in `@BeforeEach`/`init()` methods using entity/model builders (`PriceEntity.builder()...build()`), not shared fixture files or factories

## Known Risks and Defects

Document, do not silently "fix" or normalize, the following observed issues — they are the current behavior of the system, not the intended convention for new code:

- **Generic exception handler has a type mismatch**: `HttpErrorHandler.unhandledExceptions` is annotated `@ExceptionHandler(Exception.class)` but declares its parameter as `HttpException exception`. Spring MVC resolves the handler method parameter by matching the thrown exception's type; for any exception that is not itself an `HttpException` (or subclass), Spring cannot bind the parameter and this handler will fail to invoke correctly, so truly unexpected exceptions do **not** reliably produce the documented `{ httpcode: 500, message }` body today. When adding new endpoints, do not assume unhandled exceptions are safely caught by this handler — treat it as a known gap rather than copying the pattern.
- **`applicationDate` parsing has no error handling**: `PriceController.searchPriceForBrandTime` calls `LocalDateTime.parse(applicationDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))` directly; a malformed value throws an uncaught `DateTimeParseException`, which then hits the defective generic handler above instead of a clean 400 response.
- **`PRICE` column precision is `DECIMAL(4,2)`**: values of 100.00 or higher, or with more than 2 decimal places, cannot be represented and will fail at the database layer. Any change that introduces prices ≥ 100 requires a new Flyway migration widening the column — do not assume the current precision is sufficient for new price data.
- **Schema/table names use MySQL-style backtick quoting** (`` `test`.`PRICES` ``) inside the Flyway migration even though the runtime database is H2. H2 accepts this syntax, but it is worth knowing if the database is ever swapped for one where backtick-quoted identifiers behave differently.

## Development Workflow

### Git Workflow

- **Feature Branches**: develop changes in a dedicated branch with a descriptive name
- **Descriptive Commits**: write commit messages in English
- **Code Review**: review before merging (this repository uses PR-based merges into `dev`/`master`, per existing merge commits)

### Build and Run Commands

```bash
./mvnw clean install       # Build, compile, and run the full test suite
./mvnw test                 # Run tests only
./mvnw spring-boot:run       # Run the application locally (embedded Tomcat, in-memory H2)
```

There is no separate lint/format tool (ESLint/Prettier equivalent) configured in `pom.xml`; rely on IDE formatting consistent with the [Formatting Conventions](#formatting-conventions) above and on `./mvnw test` passing before merging.
