# Development Guide

This guide provides step-by-step instructions for setting up the development environment and
running tests for the Prices REST API — a Spring Boot / Java service with no frontend and no
external database dependency (H2 runs in-memory, embedded in the application process).

## 🚀 Setup Instructions

### Prerequisites

Ensure you have the following installed:
- **Java 11** (matches `<java.version>11</java.version>` in `pom.xml`)
- **Maven** — or use the bundled wrapper (`./mvnw` / `mvnw.cmd`), which requires no separate
  Maven install
- **Git**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd app-prices-rest
```

### 2. Environment Configuration

No `.env` file or external configuration is required to run locally. The application defaults
to an in-memory H2 database (src/main/resources/application.yaml:12-16); override via
environment variables only if pointing at a different database:

```bash
export DATABASE_URL=jdbc:h2:mem:testdb   # default
export DATABASE_USER=sa                  # default
export DATABASE_PASS=                    # default (empty)
```

### 3. Build and Run

```bash
# Build (first run resolves dependencies from Maven Central; add -o once cached, as a speed-up only)
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080` (default Spring Boot port — no
`server.port` override is configured).

Database migrations (Flyway) run automatically on startup and seed the `PRICES` table with 4
fixture rows (src/main/resources/db/migration/V1_create_tables.sql).

### 4. Verify

```bash
curl "http://localhost:8080/api/price?brandId=1&productId=35455&applicationDate=2020-06-14%2010:00:00"
```

Expected response (200):

```json
{
  "brandId": 1,
  "startDate": "2020-06-14T00:00:00",
  "endDate": "2020-12-31T23:59:59",
  "productId": 35455,
  "priceList": 1,
  "priority": 0,
  "price": 35.5,
  "curr": "EUR"
}
```

## 🧪 Testing

```bash
# Run all tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=PriceControllerTest
```

The test suite (src/test/java/com/llandaeta/prices/) uses JUnit 5 (Jupiter), Spring Boot Test,
`MockMvc` for controller-level integration tests, and Mockito's `@MockBean` for service-level
unit tests. There is no separate frontend or E2E test suite — this repository is backend-only.

No coverage tool (e.g. JaCoCo) is configured in `pom.xml`; there is no enforced coverage
threshold.
