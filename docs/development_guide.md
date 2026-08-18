# Development Guide

This guide provides step-by-step instructions for setting up the development environment,
running, and testing `app-prices-rest` — a Java 11 / Spring Boot 2.4.5 REST API backed by an
in-memory H2 database and Flyway migrations. This repository has **no frontend**; see
[Frontend Standards](./frontend-standards.md).

## Prerequisites

Verified against `pom.xml` and the repository root:

- **Java 11** (`pom.xml:17`, `<java.version>11</java.version>`)
- **Apache Maven** — a system-installed Maven is required; the bundled wrapper is currently broken
  in this repository (see [Known Issue: Maven Wrapper](#known-issue-maven-wrapper) below)
- **Git**

No Node.js, npm, Docker, or Docker Compose is required — there is no `package.json`,
`Dockerfile`, or `docker-compose.yml` anywhere in the repository (verified by search).

## 1. Clone the Repository

```bash
git clone <this-repository-url>
cd app-prices-rest-specboot-ai-adoption-v4
```

## 2. Build and Run Tests (first clone — online)

```bash
mvn test
```

This resolves all dependencies from Maven Central on first run and executes the full test suite
under `src/test/java/com/llandaeta/prices/` (4 test classes: application context load, the
controller, the service, and the converter). All four passed when run directly against this
repository.

Once dependencies are cached locally, `-o` (offline) can be used as a speed-up on subsequent runs:

```bash
mvn -o test
```

Do not use `-o` on the very first run against a fresh clone — dependencies will not yet be cached
and the build will fail.

### Known Issue: Maven Wrapper

`./mvnw test` **fails immediately** in this repository:

```
Error: no se ha encontrado o cargado la clase principal org.apache.maven.wrapper.MavenWrapperMain
Causado por: java.lang.ClassNotFoundException: org.apache.maven.wrapper.MavenWrapperMain
```

This is because `.mvn/wrapper/maven-wrapper.properties` does not exist in this repository
(verified: `ls .mvn` → "No such file or directory"), even though `mvnw`/`mvnw.cmd` are present at
the repository root and expect it. Use a system-installed `mvn` (verified working: Maven 3.9.16)
for all commands in this guide until the wrapper is repaired.

## 3. Run the Application

```bash
mvn spring-boot:run
```

This starts the embedded Tomcat server (default port `8080`) and, on startup, Flyway
auto-migrates the configured schema before the application accepts requests
(`spring.flyway.enabled: true`, `src/main/resources/application.yaml:18`).

### Database

By default the application uses an **in-memory** H2 database
(`spring.datasource.url: ${DATABASE_URL:jdbc:h2:mem:testdb}`,
`src/main/resources/application.yaml:15`) — all data is reset on every restart and reseeded by the
Flyway migration `src/main/resources/db/migration/V1_create_tables.sql`. No external database
setup (PostgreSQL, Docker, etc.) is required or supported by this configuration.

The H2 web console is enabled at `/h2-console` by default
(`spring.h2.console.enabled: true`, `application.yaml:9-11`); default credentials are
`sa` / *(empty)* (`application.yaml:13-14`), overridable via the `DATABASE_USER` and
`DATABASE_PASS` environment variables. The JDBC URL to use in the console is
`jdbc:h2:mem:testdb` (or the value of `DATABASE_URL` if set).

### Configuration Overrides

All datasource settings are overridable via environment variables (`application.yaml:13-15`):

```bash
DATABASE_URL=jdbc:h2:mem:testdb DATABASE_USER=sa DATABASE_PASS= mvn spring-boot:run
```

## 4. Exercise the Endpoint

This repository exposes exactly one endpoint,
`GET /api/price` (`src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:23`),
which resolves the applicable price for a brand, product, and point in time from the seeded data
in `V1_create_tables.sql:16-26`.

**Successful request** (matches the first seeded row):
```bash
curl -s "http://localhost:8080/api/price?brandId=1&productId=35455&applicationDate=2020-06-14%2010:00:00"
```
Expected response (verified against a locally running instance of this exact code):
```json
{"brandId":1,"startDate":"2020-06-14T00:00:00","endDate":"2020-12-31T23:59:59","productId":35455,"priceList":1,"priority":0,"price":35.5,"curr":"EUR"}
```

**No matching price (404)**:
```bash
curl -s -w "\n%{http_code}\n" "http://localhost:8080/api/price?brandId=99&productId=99&applicationDate=2020-06-14%2016:00:00"
```
Expected: HTTP `404`, body `{"httpcode":404,"message":"No  price found to the brand"}` (note: the
double space and "to the brand" wording is an existing defect in the source message — see
[Known Risks and Defects](./backend-standards.md#known-risks-and-defects); it is not a
documentation error).

**Malformed `applicationDate` (500, default Spring error body — not the custom `Error` shape)**:
```bash
curl -s -w "\n%{http_code}\n" "http://localhost:8080/api/price?brandId=1&productId=35455&applicationDate=not-a-date"
```
Expected: HTTP `500` with Spring Boot's default Whitelabel error JSON (includes `timestamp`,
`status`, `error`, `trace`, `message`, `path`), **not** the project's custom
`{"httpcode":..,"message":..}` shape. This was verified empirically against a running instance of
this exact code and is documented as a known defect in
[Backend Standards](./backend-standards.md#known-risks-and-defects) — do not "fix" it as part of
routine documentation or feature work without a dedicated change.

**Non-numeric `brandId` (400, same default error body)**:
```bash
curl -s -w "\n%{http_code}\n" "http://localhost:8080/api/price?brandId=abc&productId=35455&applicationDate=2020-06-14%2016:00:00"
```
Expected: HTTP `400`, same default Whitelabel shape as above.

**Unsupported method (405, same default error body)**:
```bash
curl -s -w "\n%{http_code}\n" -X POST "http://localhost:8080/api/price?brandId=1&productId=35455&applicationDate=2020-06-14%2016:00:00"
```
Expected: HTTP `405`, same default Whitelabel shape as above.

The full request/response contract, including both error shapes, is documented in
[`docs/api-spec.yml`](./api-spec.yml).

## 5. Testing

```bash
# Run all tests
mvn test

# Run a single test class
mvn -Dtest=PriceControllerTest test
```

Test classes (`src/test/java/com/llandaeta/prices/`):
- `AppPricesRestApplicationTests` — Spring context load smoke test
- `rest/controllers/PriceControllerTest` — `MockMvc`-driven HTTP tests against the real endpoint
  and seeded data
- `core/services/impl/PriceServiceImplTest` — service-layer test with the repository mocked via
  `@MockBean`
- `core/converters/PriceEntityModelConverterTest` — converter unit test

There is no coverage threshold configured in this repository (no JaCoCo plugin in `pom.xml`); do
not assume or enforce a numeric coverage gate that isn't actually configured in the build. See
[Backend Standards](./backend-standards.md#testing-standards).

## 6. Packaging

```bash
mvn package
```

Produces a runnable Spring Boot jar via the `spring-boot-maven-plugin` (`pom.xml:75-86`), with the
`lombok` artifact excluded from the final jar (`pom.xml:79-84`) — standard Lombok packaging
practice.
