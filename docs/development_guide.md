# Development Guide

This guide provides step-by-step instructions for setting up the development environment, running, and testing `app-prices-rest` — a single-module Spring Boot REST service (no frontend, no external services).

## Prerequisites

- **JDK 11** — the project targets Java 11 (`<java.version>11</java.version>` in `pom.xml`). See [Known Setup Risk: JDK version and Lombok](#known-setup-risk-jdk-version-and-lombok) below before using a newer JDK.
- **Maven** — either the bundled wrapper (`./mvnw`) or a system-installed Maven 3.6+ (see [Known Setup Risk: Maven Wrapper](#known-setup-risk-maven-wrapper) below)
- **Git**
- No Docker, no Node.js, and no external database are required — the application runs against an in-memory H2 database by default.

## 1. Clone the Repository

```bash
git clone git@github.com:Landaone/app-prices-rest.git
cd app-prices-rest
```

## 2. Configuration (Optional)

The application works out of the box with an in-memory H2 database. To point it at an external database instead, override these environment variables before starting the app (see `src/main/resources/application.yaml`):

```bash
export DATABASE_URL="jdbc:h2:mem:testdb"   # or another JDBC URL
export DATABASE_USER="sa"
export DATABASE_PASS=""
```

No `.env` file is used or read by the application.

## 3. Build

```bash
./mvnw clean install     # build, compile, run tests
# or, if using a system-installed Maven (see risk note below):
mvn clean install
```

## 4. Run the Application

```bash
./mvnw spring-boot:run
# or
mvn spring-boot:run
```

The API will be available at `http://localhost:8080` (default Spring Boot port; no custom `server.port` is configured).

The H2 console is enabled and available at `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:mem:testdb`, user `sa`, empty password by default).

## 5. Exercise the Endpoint

The service is seeded on startup by the Flyway migration (`src/main/resources/db/migration/V1_create_tables.sql`) with sample price data for `brandId=1`, `productId=35455`. Example request:

```bash
curl "http://localhost:8080/api/price?brandId=1&productId=35455&applicationDate=2020-06-14%2016:00:00"
```

Expected response:

```json
{
  "brandId": 1,
  "startDate": "2020-06-14T15:00:00",
  "endDate": "2020-06-14T18:30:00",
  "productId": 35455,
  "priceList": 2,
  "priority": 1,
  "price": 25.45,
  "curr": "EUR"
}
```

See `docs/api-spec.yml` for the full contract, including error responses.

## Testing

```bash
./mvnw test              # run the full JUnit 5 test suite
# or
mvn test
```

- Unit tests (`core/services`, `core/converters`) mock the repository layer with `@MockBean`
- Controller tests (`rest/controllers/PriceControllerTest`) run against the real, migration-seeded H2 database via `MockMvc` — no mocking at that layer
- There is no code coverage tool or threshold configured in `pom.xml`
- There is no frontend and therefore no E2E/browser test suite in this repository — see `docs/frontend-standards.md`

## Known Setup Risks

### Known Setup Risk: JDK version and Lombok

This project uses an older Lombok version pulled transitively by the `spring-boot-starter-parent:2.4.5` parent POM. Verified in this environment: compiling with a very recent JDK (JDK 26) causes Lombok's annotation processor to silently fail to generate the `@Data`/`@Builder`/`@AllArgsConstructor`/`@Slf4j`-generated members (getters, builders, the `log` field, etc.), producing "cannot find symbol" compiler errors across `PriceEntity`, `PriceModel`, `Error`, and `HttpErrorHandler`. Build with **JDK 11** (matching `pom.xml`) to avoid this; if only a newer JDK is available, upgrading the `lombok` dependency version may be required, but that is a build-configuration change outside the scope of this documentation.

### Known Setup Risk: Maven Wrapper

The `.mvn/wrapper` directory (which normally holds `maven-wrapper.properties` and the wrapper jar) is not present in this checkout, so `./mvnw` currently fails to bootstrap Maven when no cached wrapper jar is available and network access is restricted. If `./mvnw` fails with a `ClassNotFoundException` for `MavenWrapperMain`, fall back to a system-installed Maven (`mvn`) with the same commands shown above, or regenerate the wrapper (`mvn -N io.takari:maven:wrapper` or equivalent) before relying on `./mvnw` in CI or onboarding scripts.
