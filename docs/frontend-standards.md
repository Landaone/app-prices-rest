---
description: Frontend development standards for this repository. NOT APPLICABLE — this repository has no frontend. This document records that determination and defines no active standards.
globs: []
alwaysApply: false
---

# Frontend Standards — NOT APPLICABLE

## Determination

This repository (`app-prices-rest`) has **no frontend**. It is a backend-only Java 11 / Spring Boot
2.4.5 REST API with a single read endpoint, `GET /api/price`
(`src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:23`).

This determination was verified by direct inspection of the repository, not inferred:

- No `package.json` anywhere in the repository (searched with `find . -iname package.json`,
  excluding `target/`; no result).
- No `.jsx`, `.tsx`, or `.vue` files anywhere in the repository (searched with
  `find . -iname "*.jsx" -o -iname "*.tsx" -o -iname "*.vue"`, excluding `target/`; no result).
- No `src/main/webapp/` directory (searched with `find . -iname webapp -type d`; no result).
- `pom.xml` declares no frontend-related dependency, build plugin, or resource — its full
  dependency list is Spring Boot Web, Spring Boot Data JPA, Flyway, Spring Boot DevTools, H2,
  Spring Boot Configuration Processor, Lombok, and Spring Boot Test (`pom.xml:19-71`). None of
  these serve, bundle, or proxy a browser client.
- The only web-facing artifact in `src/main` is the JSON REST controller
  `src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java`, which returns a
  serialized `PriceModel` (`src/main/java/com/llandaeta/prices/core/model/PriceModel.java:9`), not
  HTML or a rendered view.

## Consequences for this document set

- **Do not introduce frontend, browser, Playwright, or end-to-end (E2E) requirements** into
  `tasks.md`, `docs/base-standards.md`, or any other document in this set, unless a frontend is
  actually added to this repository first.
- [`docs/base-standards.md`](./base-standards.md) §6.5 records the same NOT APPLICABLE
  determination for the OpenSpec task-generation workflow, with the same citations.
- If a frontend is added in the future, this document must be rewritten with the actual stack,
  component conventions, state management, and testing practices of that frontend — never
  restored from a template.

## No active standards

This document intentionally defines no React, TypeScript, Cypress, Bootstrap, or other
frontend-specific conventions. Any such content found here previously was inherited from the
SpecBoot template project and did not describe this repository; it has been removed.
