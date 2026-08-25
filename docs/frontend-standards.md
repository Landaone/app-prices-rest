---
description: Frontend standards - NOT APPLICABLE to this repository, which is a backend-only Spring Boot service. Retained as a placeholder.
alwaysApply: false
---

# Frontend Project Configuration and Best Practices

> ## NOT APPLICABLE TO THIS REPOSITORY
>
> **`app-prices-rest` has no frontend.** This document is preserved so the standard SpecBoot
> document set stays complete, and so that a future frontend would have an obvious home. It
> currently carries **no requirements**.

## Why this document is empty of requirements

This repository is a backend-only Spring Boot REST service. The claim is checked, not assumed:

- Every source file is Java under `src/main/java/com/llandaeta/prices/` — 17 files, no other
  language in the source tree.
- The only non-Java resources are `src/main/resources/application.yaml` and
  `src/main/resources/db/migration/V1_create_tables.sql`.
- `pom.xml` declares Spring Web, Spring Data JPA, Flyway, H2, Lombok, and the Spring Boot test
  starter. There is **no** frontend build, asset pipeline, template engine, or static resource
  directory.
- There is no `package.json`, no `node_modules`, no bundler configuration, and no
  `src/main/resources/static` or `/templates`.
- The single endpoint returns JSON (`GET /api/price`,
  `src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:23`) and is consumed by
  API clients, not by a browser application in this repository.

## Rules that follow from that

**Do not introduce any of the following into this repository**, and do not write them into task
lists, specs, or standards:

- UI frameworks or libraries (React, Vue, Angular, Svelte, and so on)
- TypeScript, JavaScript tooling, `npm`/`yarn`/`pnpm` scripts, or Node.js build steps
- CSS frameworks, component libraries, or styling conventions
- Browser-driven or end-to-end testing (Playwright, Cypress, Selenium, WebDriver)
- Accessibility, responsive-layout, routing, or form-handling requirements
- Any "MANDATORY E2E" step in an OpenSpec `tasks.md`

A task list for this repository that contains an E2E or frontend step is **wrong**, not merely
over-specified: it mandates work that the codebase gives no way to perform. See
[Base Standards §6](./base-standards.md#6-openspec-tasks-mandatory-steps), which omits that step
deliberately.

## Testing the API without a frontend

Verify HTTP behaviour with `curl` or with `MockMvc`, as
`src/test/java/com/llandaeta/prices/rest/controllers/PriceControllerTest.java` already does. See
[Backend Standards → Testing Standards](./backend-standards.md#testing-standards).

## If a frontend is ever added

This document becomes live and must be written from the real choices made at that time — not from
a template. Until then, treat every heading below as intentionally absent rather than pending.
