# Development Guide

This guide provides step-by-step instructions for setting up the development environment,
running, and testing the `app-prices-rest` service.

## Prerequisites

- **Java 11** (matches `<java.version>11</java.version>` in `pom.xml`)
- **Maven** — use the system `mvn` (Apache Maven 3.9.x tested); the checked-in `./mvnw`/
  `mvnw.cmd` wrapper is currently broken because `.mvn/wrapper/maven-wrapper.properties` and
  `maven-wrapper.jar` are not present in this repository
- **Git**

No Docker, Node.js, or external database is required to run or test this service: it uses an
in-memory H2 database (see `application.yaml`), and the schema is created automatically by Flyway
on startup.

## 1. Clone the Repository

```bash
git clone git@github.com:Landaone/app-prices-rest.git
cd app-prices-rest
```

## 2. Build

For the first build after cloning, use normal (online) Maven so dependencies can be downloaded:

```bash
mvn validate
mvn test
```

Once dependencies are cached locally, `-o` (offline mode) can be added to skip the network check on
subsequent runs:

```bash
mvn -o validate
mvn -o test
```

## 3. Run

```bash
mvn spring-boot:run
```

The application starts on the default Spring Boot port (`8080`, not overridden in
`application.yaml`). Flyway applies `src/main/resources/db/migration/V1_create_tables.sql`
automatically on startup, seeding the in-memory H2 database with 4 sample price rows for
`brandId=1`, `productId=35455`.

### Environment variables (optional)

`application.yaml` reads these with safe defaults, so none are required for local development:

```text
DATABASE_URL   # default: jdbc:h2:mem:testdb
DATABASE_USER  # default: sa
DATABASE_PASS  # default: (empty)
```

## 4. Try the API

```bash
curl "http://localhost:8080/api/price?brandId=1&productId=35455&applicationDate=2020-06-14%2016:00:00"
```

Expected: a `200` response with the price rule active at that timestamp (`priceList: 2`,
`price: 25.45`, per the seed data in `V1_create_tables.sql`).

## 5. H2 Console (optional)

The H2 web console is enabled (`spring.h2.console.enabled: true`) and available at
`http://localhost:8080/h2-console` while the application is running. Use JDBC URL
`jdbc:h2:mem:testdb`, user `sa`, empty password, to inspect the seeded `test.PRICES` table.

## Testing

```bash
mvn test                                 # run the full test suite (online, for a first run)
mvn -o test                              # offline, once dependencies are already cached
mvn -o -q -Dtest=PriceControllerTest test   # run a single test class (offline, once cached)
```

Tests use an embedded Spring context and the same in-memory H2 database/Flyway migration as local
development — no separate test database setup is required.
