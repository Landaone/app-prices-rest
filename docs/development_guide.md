# Development Guide

How to build, run, and test `app-prices-rest`. Every command below was verified against this
repository's actual configuration, not carried over from a template.

## Setup Instructions

### Prerequisites

| Tool | Requirement | Where it comes from |
|---|---|---|
| **JDK 11** | Required | `pom.xml:17` declares `<java.version>11</java.version>` |
| **Apache Maven** | Required (3.6+) | `pom.xml`; see the wrapper note below |
| **Git** | Required | — |

No database server is needed. The application uses an **in-memory H2** database
(`spring.datasource.url` defaults to `jdbc:h2:mem:testdb`, `src/main/resources/application.yaml`)
and Flyway creates the schema at startup. There is nothing to install, provision, or run in Docker.

> **Use the `mvn` on your `PATH`, not `./mvnw`.**
> `mvnw` and `mvnw.cmd` are committed at the repository root, but `.mvn/` is absent, so
> `.mvn/wrapper/maven-wrapper.properties` does not exist and the wrapper has no `distributionUrl`
> to bootstrap from. Tracked as defect D7 in
> [Backend Standards](./backend-standards.md#known-risks-and-defects). Every command in this guide
> therefore uses `mvn`.

Verify your toolchain:

```bash
java -version
mvn -v
```

### 1. Clone the Repository

```bash
git clone git@github.com:Landaone/app-prices-rest.git
cd app-prices-rest
```

### 2. Environment Configuration

**No configuration file needs to be created.** Every setting has a working default in
`src/main/resources/application.yaml`. Override any of them through environment variables only if
you need to point at a different database:

| Variable | Default | Meaning |
|---|---|---|
| `DATABASE_URL` | `jdbc:h2:mem:testdb` | JDBC URL |
| `DATABASE_USER` | `sa` | Database user |
| `DATABASE_PASS` | *(empty)* | Database password |

The application listens on the Spring Boot default port **8080** — `application.yaml` sets no
`server.port`.

### 3. Build

From the repository root, on a fresh clone:

```bash
mvn clean package
```

The first run downloads dependencies from Maven Central, so it needs network access. Once your
local repository is populated, `-o` (offline) is available as an optional speed-up:

```bash
mvn -o clean package
```

Do not use `-o` on a fresh clone — there is nothing cached yet for it to resolve against.

### 4. Run

```bash
mvn spring-boot:run
```

Or, after packaging:

```bash
java -jar target/prices-0.0.1-SNAPSHOT.jar
```

> Running the jar from a directory other than the project root will fail to apply migrations:
> `spring.flyway.locations` is a **filesystem-relative** path
> (`filesystem:src/main/resources/db/migration`, `application.yaml`), not a classpath one. Defect
> D5 in [Backend Standards](./backend-standards.md#known-risks-and-defects).

On startup Flyway applies `V1_create_tables.sql`, which creates the `test` schema, the `PRICES`
table, and four seed rows. The H2 web console is enabled
(`spring.h2.console.enabled: true`) and is reachable at `http://localhost:8080/h2-console` using
the JDBC URL and credentials above.

### 5. Call the API

The service exposes one endpoint. Note that `applicationDate` uses a **space** separator and must
be URL-encoded:

```bash
curl -s "http://localhost:8080/api/price?brandId=1&productId=35455&applicationDate=2020-06-14%2010:00:00"
```

```json
{"brandId":1,"startDate":"2020-06-14T00:00:00","endDate":"2020-12-31T23:59:59","productId":35455,"priceList":1,"priority":0,"price":35.5,"curr":"EUR"}
```

The overlapping-window case, where the higher priority wins:

```bash
curl -s "http://localhost:8080/api/price?brandId=1&productId=35455&applicationDate=2020-06-14%2016:00:00"
```

The not-found case returns HTTP 404 with an `Error` body:

```bash
curl -s -i "http://localhost:8080/api/price?brandId=99&productId=99&applicationDate=2020-06-14%2010:00:00"
```

See [`api-spec.yml`](./api-spec.yml) for the full contract, and note that the response for a
**malformed** `applicationDate` is deliberately unspecified — defects D1 and D2.

## Testing

The suite is JUnit 5 (`spring-boot-starter-test`, with the JUnit 4 vintage engine excluded at
`pom.xml:66-68`).

```bash
mvn test
```

A single test class:

```bash
mvn test -Dtest=PriceControllerTest
```

There is **no coverage plugin configured** in `pom.xml` — no JaCoCo, no Surefire report
configuration beyond the Spring Boot parent's defaults. `mvn test -Dtest=...` and the console
output are what is available; do not document a coverage command this build cannot run.

### What the tests cover

| Test class | Scope |
|---|---|
| `AppPricesRestApplicationTests` | Context loads (smoke test) |
| `PriceEntityModelConverterTest` | Entity → model field mapping |
| `PriceServiceImplTest` | Service logic with a `@MockBean` repository |
| `PriceControllerTest` | Five HTTP cases through `MockMvc`, against the real Flyway-seeded data |

Every existing test is annotated `@SpringBootTest`, so the full context starts for each class.
`PriceControllerTest` asserts against the exact seed rows in `V1_create_tables.sql` — changing that
seed data will break it.

Known gaps, recorded rather than implied: the 404 path, the malformed-date path, and
`HttpErrorHandler` have **no** test coverage. See
[Backend Standards → Coverage Gaps](./backend-standards.md#coverage-gaps).

## Project Layout

```
.
├── pom.xml                      Maven build
├── mvnw, mvnw.cmd               wrappers (non-functional, see D7)
├── docs/                        this documentation set
├── ai-specs/                    agents and skills for AI tooling
├── openspec/                    OpenSpec configuration and changes
└── src/
    ├── main/java/com/llandaeta/prices/   rest / core / db layers
    ├── main/resources/application.yaml
    ├── main/resources/db/migration/      Flyway scripts
    └── test/java/com/llandaeta/prices/   test suite
```

For architecture and conventions see [Backend Standards](./backend-standards.md); for the schema
see [Data Model](./data-model.md).
