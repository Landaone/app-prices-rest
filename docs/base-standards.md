---
description: This document contains all development rules and guidelines for this project, applicable to all AI agents (Claude, Cursor, Codex, Gemini, etc.).
alwaysApply: true
---

## 0. What this repository is

`app-prices-rest` is a **backend-only Spring Boot REST service** that resolves which price applies
to a product of a brand at a given instant. It exposes exactly one endpoint and has no user
interface of any kind.

- Build: Apache Maven, `pom.xml` (`groupId` `com.llandaeta`, `artifactId` `prices`).
- Runtime: **Java 11** (`pom.xml:17`), **Spring Boot 2.4.5** (`pom.xml:8`).
- Persistence: Spring Data JPA over an **in-memory H2** database, schema migrated by **Flyway**.
- Root package: `com.llandaeta.prices`.

There is **no frontend, no browser, and no end-to-end UI layer** in this repository. Do not
introduce React, TypeScript, Node tooling, Playwright, Cypress, or any browser-driven requirement.
See [Frontend Standards](./frontend-standards.md), which is retained and marked not applicable.

## 1. Core Principles

- **Small tasks, one at a time**: Always work in baby steps, one at a time. Never go forward more than one step.
- **Test-Driven Development**: Start with failing tests for any new functionality (TDD), according to the task details.
- **Type discipline**: Java is statically typed — use precise types rather than `Object`, raw
  collections, or stringly-typed values. Prefer `Optional<T>` for absent results, as
  `PriceRepository` already does (`src/main/java/com/llandaeta/prices/db/repositories/PriceRepository.java:13`).
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

- [Backend Standards](./backend-standards.md) - API development, JPA persistence patterns, testing, and backend best practices for this Spring Boot service
- [Frontend Standards](./frontend-standards.md) - **Not applicable**: this repository has no frontend. Retained as a placeholder only.
- [Documentation Standards](./documentation-standards.md) - Technical documentation structure, formatting, and maintenance guidelines, including AI standards like this document
- [Development Guide](./development_guide.md) - Build, run, and test instructions
- [Data Model](./data-model.md) - The single `PRICES` table, its entity mapping and migration
- [API Specification](./api-spec.yml) - OpenAPI contract for the one exposed endpoint

## 4. Project Skills

- Skills live in `ai-specs/skills`.
- When a request matches a skill, load and follow the corresponding `SKILL.md` automatically before continuing.
- Also load any referenced files in the skill folder (for example, `references/*.md`) when the skill requires them.

## 5. Symlink Integrity and Multi-Agent Portability

- **Canonical Source**: Keep reusable artifacts in `ai-specs` as the canonical source. Agent-specific paths (such as `.claude` and `.cursor`) should reference them through symlinks when possible.
- **Root instruction file**: `CLAUDE.md` at the repository root is a **relative symlink to this
  file** (`docs/base-standards.md`). Editing `CLAUDE.md` edits this document. Never replace that
  symlink with a real file, and never let the two diverge.
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
3. **Run the test suite and verify database state (MANDATORY)** — `mvn test`
4. **Manual endpoint testing with curl (MANDATORY - AGENT MUST EXECUTE)**
5. **Update technical documentation (MANDATORY)**

There is **no E2E/Playwright step**, because there is no frontend to drive. Adding one would be
inventing a requirement this repository cannot satisfy.

### 6.3 Manual testing execution is agent responsibility

- **Never delegate testing to the user** for steps required by `tasks.md`.
- The agent must start required services, run tests, validate outcomes, and restore data state after any mutating operation.
- The agent must only mark tasks as completed (`[x]`) after required tests pass and cleanup is complete.

### 6.4 Mandatory curl coverage (for endpoint work)

The service currently exposes **one** endpoint, and it is read-only
(`src/main/java/com/llandaeta/prices/rest/controllers/PriceController.java:23`). Execute and verify:

- The success path: `GET /api/price` with `brandId`, `productId`, and `applicationDate`.
- The not-found path: parameters for which no row matches, which must produce HTTP **404**
  (`NoPriceFoundException` → `NotFoundException` → `HttpStatus.NOT_FOUND`,
  `src/main/java/com/llandaeta/prices/core/exception/NotFoundException.java:9`).
- The malformed-date path — see the defect recorded in
  [Backend Standards → Known Risks and Defects](./backend-standards.md#known-risks-and-defects)
  before asserting any expected status for it.

There are no POST, PUT, PATCH, or DELETE endpoints to cover. Add cleanup and restore steps only
if a change introduces a mutating endpoint.

Document commands, responses, and restoration actions.

### 6.5 Completion checklist before finalizing `tasks.md`

- Step 0 branch creation is first
- Mandatory steps are present and sequential
- Mandatory labels are explicit
- Branch name matches backend convention
- Manual testing tasks explicitly state "AGENT MUST EXECUTE"
- Database restoration steps are included for any mutating operation introduced by the change
- No frontend or E2E step has been invented for this backend-only repository

### 6.6 Mandatory artifact updates for change requests between `/apply` and `/archive`

If a new fix/change is requested after `/apply` and before `/archive`, treat it as a spec update first (never code-only first).

Required order:
1. Update affected OpenSpec artifacts (scenarios, requirements/specs, `tasks.md`).
2. Re-run your OpenSpec CLI's own current artifact-generation/update workflow when needed (whatever your installed version currently calls its "create/update change artifacts" step — check `openspec schemas`/your client's command list rather than assuming a specific name, since these names change between OpenSpec releases).
3. Implement code only after artifacts reflect the new request.
4. Re-run verification against updated artifacts before archiving.

Do not close this window with direct coding that is not reflected in OpenSpec artifacts.
