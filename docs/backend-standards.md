---
description: Backend development standards, best practices, and conventions for the app-prices-rest Java 11 / Spring Boot 2.4.5 REST API, including layered architecture, persistence, error handling, and testing practices
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
  - [Language and Naming Conventions](#language-and-naming-conventions)
  - [Lombok Usage](#lombok-usage)
  - [Error Handling](#error-handling)
  - [Logging Standards](#logging-standards)
- [API Design Standards](#api-design-standards)
- [Database Patterns](#database-patterns)
  - [Flyway Migrations](#flyway-migrations)
  - [JPA Entity Mapping](#jpa-entity-mapping)
  - [Repository Pattern](#repository-pattern)
- [Testing Standards](#testing-standards)
- [Build and Development Workflow](#build-and-development-workflow)
- [Known Risks and Defects](#known-risks-and-defects)

---

## Overview

This document outlines the actual conventions found in the `app-prices-rest` backend. The
application is a single Spring Boot service exposing one read endpoint that resolves the
applicable price for a brand, product, and point in time. There is no separate frontend, no
microservice split, and no Domain-Driven-Design layering with aggregates or domain events — the
codebase is a straightforward controller → service → repository stack.

## Technology Stack

Verified against `pom.xml:1-90`:

- **Java 11** (`pom.xml:17`, `<java.version>11</java.version>`)
- **Spring Boot 2.4.5** as the parent POM (`pom.xml:6-9`)
- **Spring Boot Starter Web** — REST controllers, embedded Tomcat (`pom.xml:26-28`)
- **Spring Boot Starter Data JPA** — Hibernate-backed persistence (`pom.xml:21-23`)
- **Flyway Core** — versioned SQL migrations (`pom.xml:30-33`)
- **H2 Database** (runtime scope) — the only configured datasource driver (`pom.xml:42-46`,
  `src/main/resources/application.yaml:16`)
- **Lombok** (optional, excluded from the fat jar) — `@Data`, `@Builder`, `@AllArgsConstructor`,
  `@NoArgsConstructor`, `@Getter`, `@Slf4j` (`pom.xml:54-58`, exclusion block at `pom.xml:79-84`)
- **Spring Boot DevTools** (runtime, optional) — hot reload during development (`pom.xml:35-39`)
- **Spring Boot Configuration Processor** (optional) — `@ConfigurationProperties` metadata
  (`pom.xml:48-51`)
- **JUnit 5 (Jupiter) via `spring-boot-starter-test`**, with the JUnit 4 vintage engine explicitly
  excluded (`pom.xml:60-70`)
- **Build tool**: Maven, via the `spring-boot-maven-plugin` (`pom.xml:75-86`). No Gradle, no npm,
  no Node.js anywhere in the repository.

There is no TypeScript, Express, Prisma, PostgreSQL, or React in this repository — those
technologies do not appear anywhere in `pom.xml`, `src/`, or `src/main/resources/`.

## Architecture Overview

### Layered Architecture

The backend follows a simple four-package layering under
`src/main/java/com/llandaeta/prices/`, verified by directory listing:

**REST layer** (`rest/`)
- `rest/controllers/PriceController.java` — the single `@RestController`, mapped under `/api`
  (`PriceController.java:18-19`)
- `rest/dto/Error.java` — the JSON error payload shape returned by the custom error handler
  (`Error.java:6-11`)
- `rest/exception/HttpErrorHandler.java` — `@RestControllerAdvice` translating exceptions to HTTP
  responses (`HttpErrorHandler.java:11-13`)

**Core layer** (`core/`)
- `core/services/PriceService.java` — the service interface (`PriceService.java:8`)
- `core/services/impl/PriceServiceImpl.java` — its single implementation, a `@Service`
  (`PriceServiceImpl.java:16-19`)
- `core/model/PriceModel.java` — the API-facing DTO returned by the controller
  (`PriceModel.java:9-12`)
- `core/converters/PriceEntityModelConverter.java` — a Spring `Converter<PriceEntity, PriceModel>`
  bean (`PriceEntityModelConverter.java:8-9`)
- `core/exception/HttpException.java`, `core/exception/NotFoundException.java`,
  `core/exception/NoPriceFoundException.java` — the exception hierarchy
  (`HttpException.java:7`, `NotFoundException.java:7`, `NoPriceFoundException.java:3`)

**Persistence layer** (`db/`)
- `db/entities/PriceEntity.java` — the single JPA `@Entity`, mapped to table `prices` in schema
  `test` (`PriceEntity.java:14-15`)
- `db/repositories/PriceRepository.java` — a `JpaRepository<PriceEntity, Long>` with one derived
  query method (`PriceRepository.java:10-13`)

There is no separate "domain" package, no repository *interfaces* distinct from Spring Data
repositories, and no aggregate roots — `PriceEntity` is both the JPA entity and the sole
persistence-layer type.

### Project Structure

Verified with `find src -type f`:

```
src/main/java/com/llandaeta/prices/
├── AppPricesRestApplication.java          # @SpringBootApplication entry point
├── core/
│   ├── converters/PriceEntityModelConverter.java
│   ├── exception/HttpException.java
│   ├── exception/NoPriceFoundException.java
│   ├── exception/NotFoundException.java
│   ├── model/PriceModel.java
│   ├── services/PriceService.java
│   └── services/impl/PriceServiceImpl.java
├── db/
│   ├── entities/PriceEntity.java
│   └── repositories/PriceRepository.java
└── rest/
    ├── controllers/PriceController.java
    ├── dto/Error.java
    └── exception/HttpErrorHandler.java

src/main/resources/
├── application.yaml
└── db/migration/V1_create_tables.sql

src/test/java/com/llandaeta/prices/
├── AppPricesRestApplicationTests.java
├── core/converters/PriceEntityModelConverterTest.java
├── core/services/impl/PriceServiceImplTest.java
└── rest/controllers/PriceControllerTest.java
```

## Coding Standards

### Language and Naming Conventions

- **Variable/method naming**: camelCase (e.g. `brandId`, `searchPriceToApply`) — see
  `PriceService.java:10`.
- **Class naming**: PascalCase (e.g. `PriceEntity`, `PriceServiceImpl`) throughout.
- **Package naming**: lowercase, layer-first (`core.services.impl`, `db.repositories`,
  `rest.controllers`) — see the package declarations at the top of each source file.
- **File naming**: file name matches the public class/interface name (standard Java convention),
  observed consistently across all 12 source files under `src/main/java`.
- English is used throughout identifiers, comments, and log messages, per
  [Base Standards](./base-standards.md) §2.

### Lombok Usage

Entities and DTOs favor Lombok annotations over hand-written boilerplate:

- `PriceEntity` uses `@Data @AllArgsConstructor @NoArgsConstructor @Builder`
  (`PriceEntity.java:16-19`).
- `PriceModel` uses `@Data @ToString @Builder` (`PriceModel.java:9-11`).
- `Error` uses `@Data @Builder` with `final` fields (`Error.java:6-11`).
- Services and controllers use `@AllArgsConstructor` for constructor injection instead of
  `@Autowired` fields (`PriceServiceImpl.java:18`, `PriceController.java:17`).
- `@Slf4j` is used for logger injection rather than manually declaring an SLF4J `Logger` field
  (`PriceServiceImpl.java:17`, `PriceController.java:16`, `HttpErrorHandler.java:12`).

Follow this pattern for new entities/DTOs/services: prefer `@Data`/`@Builder` plus
`@AllArgsConstructor` for constructor injection, and `@Slf4j` for logging, rather than
hand-rolled getters/setters/loggers.

### Error Handling

The custom exception hierarchy:

- `HttpException` (`core/exception/HttpException.java`) — a `RuntimeException` carrying an
  `HttpStatus`, defaulting to `INTERNAL_SERVER_ERROR` if `null` is passed
  (`HttpException.java:11-14`).
- `NotFoundException extends HttpException` — always constructs with `HttpStatus.NOT_FOUND`
  (`NotFoundException.java:7-10`).
- `NoPriceFoundException extends NotFoundException` — thrown when no price row matches the
  search criteria (`NoPriceFoundException.java:3-6`, thrown at `PriceServiceImpl.java:30`).

`HttpErrorHandler` (`@RestControllerAdvice`, `HttpErrorHandler.java:11-13`) has two handlers:

1. `handleHttpError(HttpException httpException)` for `HttpException` and its subtypes — maps the
   exception's own `HttpStatus` and message into the `Error` DTO
   (`HttpErrorHandler.java:15-22`). **This is the only handler that is actually reachable** for
   any exception type, because it is the more specific match Spring MVC selects.
2. `unhandledExceptions(HttpException exception)`, annotated `@ExceptionHandler(Exception.class)`
   (`HttpErrorHandler.java:24-25`) — intended as a catch-all for any other exception, mapping it to
   HTTP 500. **This handler is broken** — see
   [Known Risks and Defects](#known-risks-and-defects) below; do not rely on it and do not extend
   it further without first fixing the parameter type mismatch it already has.

Convention going forward: throw a subtype of `HttpException` (or add one) for every error
condition that must reach the client as the custom `Error` JSON shape (`{"httpcode": ..,
"message": ..}`). Do not rely on an unchecked exception reaching `unhandledExceptions` to produce
that shape — today it does not.

### Logging Standards

- Use `@Slf4j` (Lombok) to obtain a `log` field; do not instantiate `LoggerFactory` manually.
- `HttpErrorHandler.unhandledExceptions` logs at `error` level with the exception attached
  (`HttpErrorHandler.java:26`) before building the response.
- `application.yaml:1-5` sets `ROOT` and `com.llandaeta` logging to `INFO`.

## API Design Standards

- **Base path**: all endpoints are mapped under `/api` via `@RequestMapping("/api")` on the
  controller (`PriceController.java:18`).
- **Query parameters, not path variables or a request body**, are used for the single GET
  endpoint's inputs (`@RequestParam`, `PriceController.java:24-26`).
- **Response body**: the controller returns the domain DTO (`PriceModel`) directly — Spring
  serializes it to JSON via the default Jackson `MessageConverter`; there is no wrapping envelope
  (no `{"success": true, "data": ...}` pattern in this codebase).
- **Error body**: `Error` (`httpcode: int`, `message: String`) for errors that reach
  `HttpErrorHandler.handleHttpError` — i.e., `HttpException` subtypes only (see
  [Error Handling](#error-handling) and [Known Risks and Defects](#known-risks-and-defects)).
- The full request/response contract is in [`docs/api-spec.yml`](./api-spec.yml).

There is no CORS configuration anywhere in the codebase (no `CorsConfiguration`, `@CrossOrigin`,
or `WebMvcConfigurer` bean was found by inspection of `src/main/java`) — do not assume any is
active.

## Database Patterns

### Flyway Migrations

- Migrations live at `src/main/resources/db/migration/`, configured via
  `spring.flyway.locations: filesystem:src/main/resources/db/migration`
  (`application.yaml:19`).
- `spring.flyway.schemas: test` and `spring.flyway.baseline-on-migrate: true`
  (`application.yaml:20-21`).
- The migration file naming separator is `_` (`spring.flyway.sql-migration-separator: _`,
  `application.yaml:22`), matching the existing `V1_create_tables.sql` file name.
- There is exactly one migration today: `V1_create_tables.sql`, which creates schema `test`, table
  `test.PRICES`, and seeds it with four rows (`V1_create_tables.sql:1-26`).
- Add new migrations as `V<n>_<description>.sql` in the same directory; never edit an already
  applied migration file.

### JPA Entity Mapping

- `spring.jpa.hibernate.ddl-auto: none` (`application.yaml:24`) — **schema changes are only ever
  made through Flyway migrations**, never through Hibernate auto-DDL. Do not set `ddl-auto` to
  `update` or `create` for this project.
- `spring.jpa.show-sql: true` (`application.yaml:25`) — generated SQL is logged; keep this in mind
  when reviewing local logs (it is a development convenience, not a security concern given H2 is
  in-memory by default).
- Column mapping uses explicit `@Column(name = "...")` in upper snake case
  (`PriceEntity.java:25-47`) even though the entity's own field names are camelCase — this mirrors
  the migration's column names (`BRAND_ID`, `START_DATE`, `END_DATE`, `PRODUCT_ID`, `PRICE_LIST`,
  `PRIORITY`, `PRICE`, `CURR`; `V1_create_tables.sql:4-13`).
- The entity table/schema binding is `@Table(name = "prices", schema = "test")`
  (`PriceEntity.java:15`) — lower-case, while the migration's `CREATE TABLE` uses
  `` `test`.`PRICES` `` (upper-case, backtick-quoted; `V1_create_tables.sql:3`). H2's default
  unquoted-identifier folding makes both resolve to the same table; this was confirmed by running
  the test suite successfully against this exact configuration (see
  [Testing Standards](#testing-standards)).

### Repository Pattern

- `PriceRepository extends JpaRepository<PriceEntity, Long>` (`PriceRepository.java:10-11`).
- The only query is a derived query method:
  `findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc`
  (`PriceRepository.java:13`) — Spring Data derives the SQL from the method name; there is no
  `@Query` annotation anywhere in the codebase.
- New query needs should follow the same derived-method-name convention unless the query becomes
  too complex to express that way, at which point `@Query` with JPQL is the natural next step (not
  yet used anywhere in this codebase, so there is no established convention to follow for it).

## Testing Standards

Verified against the four files under `src/test/java/com/llandaeta/prices/`:

- **Framework**: JUnit 5 (Jupiter) with `@ExtendWith(SpringExtension.class)` or `@SpringBootTest`
  directly; the JUnit 4 vintage engine is explicitly excluded (`pom.xml:63-69`).
- **Test file naming**: `<ClassUnderTest>Test.java`, colocated under `src/test/java` mirroring the
  main package structure (all four test files follow this).
- **Controller tests** use `@SpringBootTest(webEnvironment = RANDOM_PORT)` plus `MockMvc` built
  from the `WebApplicationContext` (`PriceControllerTest.java:21-37`) — full Spring context, real
  HTTP-shaped requests through `MockMvc`, no manual mocking of the controller's collaborators.
- **Service tests** use `@SpringBootTest` with `@MockBean` to replace the repository
  (`PriceServiceImplTest.java:20-27`) — the real `PriceService` bean and the real
  `PriceEntityModelConverter` bean are exercised; only the repository is mocked.
- **Converter tests** use `@SpringBootTest` with `@Autowired` on the real converter bean
  (`PriceEntityModelConverterTest.java:16-26`) — no mocking at all.
- All three non-trivial test classes assert against the seeded H2 data or entity/DTO field values
  directly with JUnit `Assertions` (`assertEquals`, `assertTrue`) and Hamcrest (`is`) for
  `jsonPath` assertions in the controller test.
- **No coverage threshold is configured anywhere in this repository** — no JaCoCo plugin in
  `pom.xml`, no coverage configuration file found. Do not assume or enforce a numeric coverage
  gate (e.g. 90%) unless one is actually added to the build.
- Running `mvn test` (or `mvn -o test` once dependencies are cached) executes the full suite,
  including a real Spring context boot against the in-memory H2 database seeded by Flyway; this
  was run directly against this repository and passed (all four test classes green).

## Build and Development Workflow

- **Build tool**: Maven. `pom.xml` is the single source of truth for dependencies and the build.
- First-clone build/test: `mvn test` (online — resolves dependencies from Maven Central on first
  run). Add `-o` (offline) only once dependencies are already cached locally, as a speed-up — never
  as the first command run against a fresh clone.
- **The Maven wrapper (`mvnw`) is currently broken in this repository**: `.mvn/wrapper/` does not
  exist (verified: `ls .mvn` reports "No such file or directory"), so `./mvnw` fails immediately
  with `ClassNotFoundException: org.apache.maven.wrapper.MavenWrapperMain` before it can download
  anything. Use a system-installed `mvn` until the wrapper is repaired — see
  [Known Risks and Defects](#known-risks-and-defects).
- **Run locally**: `mvn spring-boot:run` boots the application with the embedded Tomcat server and
  the in-memory H2 datasource, auto-migrated by Flyway on startup.
- **Packaging** (`mvn package`) uses the `spring-boot-maven-plugin`, which excludes the `lombok`
  artifact from the runnable jar (`pom.xml:79-84`) — this is standard Lombok packaging practice,
  not a defect.
- There is no separate lint/format tool configured (no Checkstyle, Spotless, or similar plugin
  found in `pom.xml`).
- Git workflow, commit language, and documentation-update obligations are defined in
  [Base Standards](./base-standards.md) and [Documentation Standards](./documentation-standards.md)
  — this document does not restate them.

## Known Risks and Defects

These are accurate descriptions of existing behavior, each independently verified. They are
recorded here as risks to be aware of; **fixing them is out of scope for documentation work** and
must go through its own change.

1. **Generic (non-`HttpException`) exceptions do not produce the documented `Error` JSON shape and
   leak a full stack trace instead.**
   `HttpErrorHandler.unhandledExceptions` is annotated `@ExceptionHandler(Exception.class)` but
   declares its parameter as `HttpException exception` (`HttpErrorHandler.java:24-25`) — a type
   mismatch between the annotation's target and the method's actual parameter type. Spring MVC
   resolves `@ExceptionHandler` methods by matching the thrown exception against the declared
   parameter type, not solely the annotation value; because most runtime exceptions are not
   assignable to `HttpException`, this handler is effectively unreachable for them, and Spring
   Boot's own default error page handles the exception instead. Verified empirically against a
   locally running instance of this exact code (`mvn spring-boot:run`, 2026-08-19):
   - `GET /api/price` with a malformed `applicationDate` (e.g. `not-a-date`) returns HTTP 500 with
     Spring Boot's default Whitelabel error JSON (`{"timestamp":..,"status":500,"error":"Internal
     Server Error","trace":"java.time.format.DateTimeParseException...","message":..,"path":..}`),
     **not** the custom `{"httpcode":500,"message":..}` shape. The exception originates at
     `PriceController.java:28` (`LocalDateTime.parse(...)`).
   - `GET /api/price` with a non-numeric `brandId` (e.g. `abc`) returns HTTP 400 with the same
     default Whitelabel shape (`MethodArgumentTypeMismatchException`), not the custom `Error` DTO.
   - `POST /api/price` (an unmapped method on this route) returns HTTP 405 with the same default
     Whitelabel shape (`HttpRequestMethodNotSupportedException`), not the custom `Error` DTO.
   - By contrast, `GET /api/price` with no matching price row correctly returns HTTP 404 with the
     custom `{"httpcode":404,"message":"No  price found to the brand"}` body, because
     `NoPriceFoundException` is an `HttpException` subtype and is caught by
     `handleHttpError`, which has no such mismatch (`HttpErrorHandler.java:15-22`).
   - Consequence: API clients cannot rely on a single error-response shape for this service today;
     only the 404 "no price found" case uses the documented `Error` schema. See
     [`docs/api-spec.yml`](./api-spec.yml) for how both shapes are documented.

2. **The "no price found" error message has a grammatical defect.**
   `NoPriceFoundException` is constructed with the literal string `"No  price found to the brand"`
   (double space after "No", and "to the brand" rather than "for the brand") at
   `PriceServiceImpl.java:30`. Verified in the live 404 response body above:
   `"message":"No  price found to the brand"`.

3. **The `PRICE` column can only hold values up to 99.99.**
   The migration defines `PRICE` as `DECIMAL(4,2)` (`V1_create_tables.sql:12`) — 4 total digits, 2
   after the decimal point, so the maximum representable value is `99.99`. The seeded data's
   highest price is `38.95` (`V1_create_tables.sql:26`), safely under that limit, but any future
   price at or above `100.00` cannot be stored with this column definition.

4. **The Maven wrapper (`mvnw`) cannot run in this repository as checked out.**
   `mvnw` (`mvnw:1-*`) expects `.mvn/wrapper/maven-wrapper.properties`, which does not exist in
   this repository (`ls .mvn` → "No such file or directory"). Running `./mvnw test` fails
   immediately with `ClassNotFoundException: org.apache.maven.wrapper.MavenWrapperMain`. A
   system-installed Maven (verified present: `mvn 3.9.16`) works correctly with the same commands
   (`mvn test`, `mvn spring-boot:run`) — use it until the wrapper is repaired.

This document serves as the accurate technical baseline for the `app-prices-rest` backend. Update
it whenever the actual stack, structure, or conventions change — see
[Documentation Standards](./documentation-standards.md).
