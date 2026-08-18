---
description: This document contains all development rules and guidelines for this project, applicable to all AI agents (Claude, Cursor, Codex, Gemini, etc.).
alwaysApply: true
---

## 1. Core Principles

- **Small tasks, one at a time**: Always work in baby steps, one at a time. Never go forward more than one step.
- **Test-Driven Development**: Start with failing tests for any new functionality (TDD), according to the task details.
- **Type Safety**: All code must be fully typed. Java is statically typed, so this means avoiding raw types, preferring explicit method signatures, and using `var` only where the right-hand side already names the type (as at `src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:28`).
- **Clear Naming**: Use clear, descriptive names for all variables and functions.
- **Incremental Changes**: Prefer incremental, focused changes over large, complex modifications.
- **Question Assumptions**: Always question assumptions and inferences.
- **Pattern Detection**: Detect and highlight repeated code patterns.

## 2. Language Standards
- **English Only**: All technical artifacts must always use English, including:
    - Code (variables, functions, classes, comments, error messages, log messages)
    - Documentation (README, guides, API docs)
    - Jira tickets (titles, descriptions, comments)
    - Data schemas and database names
    - Configuration files and scripts
    - Git commit messages
    - Test names and descriptions

## 3. Specific standards

For detailed standards and guidelines specific to different areas of the project, refer to:

- [Backend Standards](./backend-standards.md) - Java 11 / Spring Boot 2.4.5 architecture, layering, persistence, error handling, testing and build
- [Data Model](./data-model.md) - the single persisted entity, its schema, migration and query semantics
- [API Specification](./api-spec.yml) - the OpenAPI contract for the one exposed endpoint
- [Development Guide](./development_guide.md) - setup, run, configuration and endpoint exercises
- [Frontend Standards](./frontend-standards.md) - **NOT APPLICABLE** — this repository has no frontend; the document records that determination and defines no active standards
- [Documentation Standards](./documentation-standards.md) - Technical documentation structure, formatting, and maintenance guidelines, including AI standards like this document

## 4. Project Skills

- Skills live in `ai-specs/skills`.
- When a request matches a skill, load and follow the corresponding `SKILL.md` automatically before continuing.
- Also load any referenced files in the skill folder (for example, `references/*.md`) when the skill requires them.

## 5. Symlink Integrity and Multi-Agent Portability

- **Canonical Source**: Keep reusable artifacts in `ai-specs` as the canonical source. Agent-specific paths (such as `.claude` and `.cursor`) should reference them through symlinks when possible.
- **Update Safety**: Whenever a file is renamed, moved, or its suffix changes, verify and update all symlinks that target it before considering the change complete.
- **New Artifact Linking**: Whenever creating a new artifact that requires multi-agent exposure (for example new agents or skills in `ai-specs`), create the corresponding symlinks from the expected agent-specific reference paths.
- **External Customization Review**: Whenever customization is introduced outside `ai-specs`, evaluate whether it should be moved into `ai-specs` and replaced with symlinks from the original locations.
- **Completion Gate**: A change is incomplete if it leaves broken symlinks, stale targets, or duplicated canonical artifacts across agent-specific folders.

## 6. OpenSpec Tasks Mandatory Steps

When creating or updating OpenSpec `tasks.md` artifacts, follow these requirements.

### 6.1 Read OpenSpec configuration first

- **Required first action**: Read `openspec/config.yaml` before drafting or editing any `tasks.md` file.
- **Purpose**: Capture mandatory steps, naming conventions, task structure, testing expectations, and documentation requirements from project configuration.

### 6.2 Required backend task structure

For backend changes, ensure the checklist includes these mandatory steps in order:

1. **Step 0 (must be first)**: Create and switch to feature branch:
   - `feature/[ticket-id]-backend` or `feature/[change-name]-backend`
2. **Review and update existing unit tests (MANDATORY)**
3. **Run unit tests and verify database state (MANDATORY)**
4. **Manual endpoint testing with curl (MANDATORY - AGENT MUST EXECUTE)**
5. ~~E2E testing with Playwright MCP~~ — **NOT APPLICABLE in this repository** (no frontend; see §6.5). Omit this step rather than marking it pending.
6. **Update technical documentation (MANDATORY)**

### 6.3 Manual testing execution is agent responsibility

- **Never delegate testing to the user** for steps required by `tasks.md`.
- The agent must start required services, run tests, validate outcomes, and restore data state after CREATE/UPDATE/DELETE operations.
- The agent must only mark tasks as completed (`[x]`) after required tests pass and cleanup is complete.

### 6.4 Mandatory curl coverage (for endpoint work)

Execute and verify every endpoint the change touches, and document the exact commands and responses.

**This repository currently exposes exactly one endpoint — `GET /api/price`
(`src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:23`) — and no mutating
endpoints.** So today the applicable coverage is:
- The GET endpoint, including the priority-resolution case where date ranges overlap
- Error cases: 404 when no price matches, malformed `applicationDate`, a non-numeric `brandId`/`productId`, and an unsupported HTTP method

The clauses below apply as soon as a mutating endpoint is added, and not before:
- POST endpoints (with cleanup)
- PUT/PATCH endpoints (with revert)
- DELETE endpoints (with recreation/restore)

Database restoration is only owed for operations that mutate state. Since the default datasource is
in-memory and reseeded by Flyway on every start
(`src/main/resources/application.yaml:15`, `src/main/resources/db/migration/V1_create_tables.sql`),
a restart restores the baseline; a restart is not a substitute for cleanup once a persistent
datasource is configured.

Concrete commands are in [Development Guide](./development_guide.md).

### 6.5 Playwright E2E coverage — NOT APPLICABLE to this repository

**This repository has no frontend**, verified by inspection: no `package.json`, no
`src/main/webapp/`, and no `.html`/`.jsx`/`.tsx`/`.vue` files anywhere in the tree, and no frontend
dependency in `pom.xml` (confirmed absent by search). See [Frontend Standards](./frontend-standards.md).

Therefore **do not add Playwright, browser, or end-to-end steps to `tasks.md` for this repository**,
and do not record them as pending — there is no UI for them to drive. The applicable equivalent is
§6.4's curl coverage plus the MockMvc-based controller tests
(`src/test/java/com/llandaeta/prices/rest/controllers/PriceControllerTest.java`).

This clause becomes live only if a frontend is added, at which point it applies as written.

### 6.6 Completion checklist before finalizing `tasks.md`

- Step 0 branch creation is first
- Mandatory steps are present and sequential
- Mandatory labels are explicit
- Branch name matches backend convention
- Manual testing tasks explicitly state "AGENT MUST EXECUTE"
- Database restoration steps are included for mutating operations
- E2E step is **omitted** — this repository has no frontend (§6.5); it is not marked pending

### 6.7 Mandatory artifact updates for change requests between `/apply` and `/archive`

If a new fix/change is requested after `/apply` and before `/archive`, treat it as a spec update first (never code-only first).

Required order:
1. Update affected OpenSpec artifacts (scenarios, requirements/specs, `tasks.md`).
2. Re-run your OpenSpec CLI's own current artifact-generation/update workflow when needed (whatever your installed version currently calls its "create/update change artifacts" step — check `openspec schemas`/your client's command list rather than assuming a specific name, since these names change between OpenSpec releases).
3. Implement code only after artifacts reflect the new request.
4. Re-run verification against updated artifacts before archiving.

Do not close this window with direct coding that is not reflected in OpenSpec artifacts.
