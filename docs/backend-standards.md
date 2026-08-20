---
description: Backend development standards, best practices, and conventions for the Prices REST API Java/Spring Boot application, including layered architecture, API design, and testing practices
globs: ["src/main/java/**/*.java", "src/test/java/**/*.java", "pom.xml", "src/main/resources/application.yaml", "src/main/resources/db/migration/**/*.sql"]
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
  - [Language and Naming Conventions](#language-and-naming-conventions)
  - [Lombok Usage](#lombok-usage)
  - [Error Handling](#error-handling)
  - [Logging Standards](#logging-standards)
- [API Design Standards](#api-design-standards)
- [Database Patterns](#database-patterns)
  - [Flyway Migrations](#flyway-migrations)
  - [Repository Pattern](#repository-pattern)
- [Testing Standards](#testing-standards)
- [Development Workflow](#development-workflow)
  - [Git Workflow](#git-workflow)
  - [Development Scripts](#development-scripts)

---

## Overview

This document outlines the actual practices and conventions used in this backend application —
a small Spring Boot service with a single REST endpoint that resolves the applicable price for a
brand/product/date combination. The backend follows a layered architecture, separating REST
concerns, business logic, and persistence.

## Technology Stack

- **Java 11** (`pom.xml`'s `<java.version>11</java.version>`)
- **Spring Boot 2.4.5** (`spring-boot-starter-parent`), via `spring-boot-starter-web` and
  `spring-boot-starter-data-jpa`
- **H2** — in-memory relational database (runtime dependency)
- **Flyway** (`flyway-core`) — schema migrations, run on startup
- **Lombok** (`@Data`, `@Builder`, `@AllArgsConstructor`, `@NoArgsConstructor`, `@Getter`,
  `@Slf4j`) — compile-time boilerplate reduction, marked `optional` in `pom.xml`
- **JUnit 5 (Jupiter)** + **Spring Boot Test** + **Mockito** (`spring-boot-starter-test`) —
  testing
- **Maven** — build tool, with the `mvnw`/`mvnw.cmd` wrapper committed to the repository

There is no frontend in this repository — see `docs/frontend-standards.md`.

## Architecture Overview

### Layered Architecture

The backend follows a layered architecture under `src/main/java/com/llandaeta/prices/`:

**REST layer** (`rest/`)
- `rest/controllers/` — `@RestController` classes that parse HTTP request parameters and
  delegate to a service (e.g. `PriceController`)
- `rest/dto/` — response DTOs used only at the HTTP boundary (e.g. `Error`)
- `rest/exception/` — `@RestControllerAdvice` global exception handling (`HttpErrorHandler`)

**Core layer** (`core/`)
- `core/services/` — service interfaces (`PriceService`) and their `impl/` implementations
  (`PriceServiceImpl`), holding business logic
- `core/model/` — response models returned by services and, ultimately, controllers
  (`PriceModel`) — distinct from persistence entities
- `core/converters/` — Spring `Converter<S, T>` beans that map persistence entities to response
  models (`PriceEntityModelConverter`)
- `core/exception/` — the application's exception hierarchy (`HttpException` →
  `NotFoundException` → `NoPriceFoundException`)

**Persistence layer** (`db/`)
- `db/entities/` — JPA `@Entity` classes (`PriceEntity`)
- `db/repositories/` — Spring Data JPA repository interfaces (`PriceRepository`), using derived
  query methods rather than hand-written JPQL

### Project Structure

```
src/
├── main/
│   ├── java/com/llandaeta/prices/
│   │   ├── AppPricesRestApplication.java   # @SpringBootApplication entry point
│   │   ├── core/
│   │   │   ├── converters/                 # entity → model mapping
│   │   │   ├── exception/                  # exception hierarchy
│   │   │   ├── model/                      # response models
│   │   │   └── services/                   # service interfaces + impl/
│   │   ├── db/
│   │   │   ├── entities/                   # JPA entities
│   │   │   └── repositories/               # Spring Data JPA repositories
│   │   └── rest/
│   │       ├── controllers/                # @RestController
│   │       ├── dto/                        # HTTP-boundary DTOs
│   │       └── exception/                  # @RestControllerAdvice
│   └── resources/
│       ├── application.yaml
│       └── db/migration/                   # Flyway migrations
└── test/
    └── java/com/llandaeta/prices/          # mirrors the main package structure
```

## Coding Standards

### Naming Conventions

- **Package naming**: lowercase, layered by responsibility (`core.services.impl`, `db.entities`,
  `rest.controllers`)
- **Class naming**: PascalCase (`PriceController`, `PriceServiceImpl`)
- **Variable/method naming**: camelCase (`brandId`, `searchPriceToApply`)
- All identifiers, comments, and messages are in English, matching this project's own
  [documentation standards](./documentation-standards.md).

### Lombok Usage

- Use `@Data` + `@Builder` for simple data-holder classes (entities, models, DTOs) — see
  `PriceEntity`, `PriceModel`, `Error`.
- Use `@AllArgsConstructor` on `@Service`/`@RestController` classes for constructor injection
  instead of `@Autowired` fields — see `PriceServiceImpl`, `PriceController`.
- Use `@Slf4j` for logging instead of manually declaring a `Logger` field.
- Use `@Getter` (not full `@Data`) on exception classes, which are immutable after construction —
  see `HttpException`, `NotFoundException`.

### Error Handling

- Business/HTTP-facing errors extend `HttpException`
  (src/main/java/com/llandaeta/prices/core/exception/HttpException.java), which carries an
  `HttpStatus`. Subclass per HTTP status meaning, not per business case — e.g.
  `NotFoundException` (404) is the reusable subclass; `NoPriceFoundException` extends it for the
  specific "no price for this brand/product/date" case.
- A single `@RestControllerAdvice` (`HttpErrorHandler`) maps `HttpException` to its carried
  status and any other `Exception` to 500, in both cases producing a uniform `Error` response
  body (`{ httpcode, message }`).
- **Known defect**: `HttpErrorHandler.unhandledExceptions` is annotated
  `@ExceptionHandler(Exception.class)` but declares its parameter as `HttpException`. Spring MVC
  only routes to a handler method when the thrown exception is assignable to its **parameter**
  type, so a genuinely unexpected exception (not an `HttpException`) does not actually reach this
  method despite the annotation — see `docs/api-spec.yml`'s `x-known-risks-and-defects` for the
  citation. Do not copy this pattern; if you add a catch-all handler, its parameter type must
  match (or be broader than) its `@ExceptionHandler` value.

### Logging Standards

- Use the Lombok-provided `log` field (`@Slf4j`) rather than a manually instantiated logger.
- Log levels are configured per-package in `application.yaml` (`logging.level`); this project
  currently only sets `ROOT` and `com.llandaeta` to `INFO`.

## API Design Standards

- **RESTful, resource-based paths** under `/api` — e.g. `GET /api/price`.
- **Query parameters, not path variables**, for a read endpoint whose "resource" is really a
  computed value (price resolution), not an addressable entity by ID.
- **Uniform error body**: `{ "httpcode": <int>, "message": <string> }` for every non-2xx
  response, produced by the single `HttpErrorHandler` — do not introduce a second error shape.
- See `docs/api-spec.yml` for the full, current contract, including its own recorded
  known-risks-and-defects section for parameter-parsing behavior.

## Database Patterns

### Flyway Migrations

- All schema changes are version-controlled SQL migrations under
  `src/main/resources/db/migration/`, named `V<N>_<description>.sql`
  (`sql-migration-separator: _` in `application.yaml`).
- `hibernate.ddl-auto: none` — Hibernate never generates or alters schema; Flyway is the single
  source of truth for schema state.
- `baseline-on-migrate: true` is set — appropriate for this project's current single-migration
  state; revisit if the migration history grows and baselining semantics matter.

### Repository Pattern

- Repository interfaces extend `JpaRepository<Entity, IdType>` and prefer **derived query
  methods** (Spring Data method-name parsing) over `@Query` annotations for straightforward
  lookups — see `PriceRepository.findFirstBy...OrderByPriorityDesc`.
- Repositories return `Optional<Entity>` for single-result queries that may not match, and the
  calling service maps the empty case to a domain-specific `HttpException` subclass
  (`PriceServiceImpl.searchPriceToApply`).

## Testing Standards

- **Framework**: JUnit 5 (Jupiter) with `@SpringBootTest`.
- **Controller tests**: use `MockMvc` built from the full `WebApplicationContext`
  (`@SpringBootTest(webEnvironment = RANDOM_PORT)`), exercising the real Flyway-seeded H2
  database rather than mocking the service layer — see `PriceControllerTest`.
- **Service tests**: use `@MockBean` to mock the repository layer and exercise the service in
  isolation — see `PriceServiceImplTest`.
- **Converter tests**: exercise the mapping logic directly against constructed entities — see
  `PriceEntityModelConverterTest`.
- **Test naming**: descriptive method names stating the scenario, e.g.
  `shouldReturnSuccessful_PriceToApplyForTheDate20200614_100000`.
- No coverage tool or enforced threshold is configured in `pom.xml` — do not assume a numeric
  coverage gate exists for this project unless one is added.
- **Known gap**: no test exercises `PriceRepository`'s derived query method directly against the
  database with multiple overlapping, differently-prioritized windows beyond the four fixture
  rows in `V1_create_tables.sql` — see `docs/api-spec.yml`'s known-risks-and-defects entry.

## Development Workflow

### Git Workflow

- **Feature branches**: this repository has no committed branch-naming convention of its own;
  follow whatever convention the adopting team's own workflow (for example this project's
  OpenSpec `tasks.md` process) specifies for a given change.
- **Descriptive commits**: write descriptive commit messages in English.

### Development Scripts

```bash
./mvnw clean install     # Build, run tests
./mvnw test               # Run tests only
./mvnw spring-boot:run    # Run the application locally
```
