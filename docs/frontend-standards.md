---
description: Frontend development standards — not applicable to this repository
globs: []
alwaysApply: false
---

# Frontend Standards — Not Applicable

This repository (`app-prices-rest`) has no frontend. It is a backend-only Spring Boot / Java
service exposing a single REST endpoint (`GET /api/price`) — see `docs/backend-standards.md` and
`docs/api-spec.yml`.

Confirmed by repository inspection: no `package.json`, no `frontend/` directory, no
`src/main/resources/static/` or `src/main/resources/templates/` content, and no frontend
framework dependency in `pom.xml`.

Do not introduce frontend, browser, Playwright, or E2E requirements for this repository unless a
frontend is actually added to it — in which case this document should be rewritten to describe
it, following the same repository-evidence-based approach as the rest of `docs/`.
