---
description: Frontend development standards for this repository — currently not applicable, no frontend application exists
globs: []
alwaysApply: false
---

# Frontend Project Standards

## Status: Not Applicable

This repository (`app-prices-rest`) is a backend-only Spring Boot REST service (`com.llandaeta.prices`, see `pom.xml`). There is no `frontend/` directory, no JavaScript/TypeScript UI package, no browser-facing code, and no client application anywhere in this codebase.

Do not:
- Create frontend, browser, or UI-facing code in this repository unless the user explicitly starts a new project decision to add one.
- Introduce browser-based, Playwright, Cypress, or other E2E testing requirements for this repository — there is no UI to drive.
- Reference React, TypeScript frontend tooling, Bootstrap, or any other client-side framework as part of this project's actual stack.

If this repository ever gains a frontend (a separate module/package or a companion repository), replace this document with real frontend standards derived from that codebase's actual structure, tooling, and conventions — do not restore generic or template frontend content.

For backend standards, see [Backend Standards](./backend-standards.md). For the actual HTTP contract this service exposes, see [API Spec](./api-spec.yml).
