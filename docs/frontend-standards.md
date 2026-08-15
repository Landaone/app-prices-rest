---
description: Frontend development standards — not applicable to this repository (backend-only REST API, no frontend module).
globs: []
alwaysApply: true
---

# Frontend Project Standards

## Not Applicable

This repository (`app-prices-rest`) is a backend-only Spring Boot REST API. There is no frontend
module, no UI framework, and no browser-based code anywhere in this codebase — confirmed during
`ADOPT-06` by inspecting the repository tree: no `frontend/`, no `src/main/webapp/`, no
`package.json`, and no `.js`/`.jsx`/`.ts`/`.tsx` source file exists anywhere in this repository.

Do not introduce frontend, browser, Playwright, or end-to-end UI testing requirements on the
strength of this document or of `base-standards.md`'s conditional frontend/E2E guidance — that
guidance is already scoped to "when applicable" / "for frontend workflows", which this repository
never triggers.

If a frontend is ever added to this repository, replace this file's content with real, verified
frontend standards for the stack actually chosen. Do not restore the previous generic
React/TypeScript/Cypress template content this file held before adoption — it described an
unrelated project and stack.
