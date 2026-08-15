# Phase 4 — Technical Context and OpenSpec Configuration

Read [`00-conventions.md`](00-conventions.md) first.

Steps: `ADOPT-06`, `ADOPT-07`, `ADOPT-08`. Formerly sections 6–8. `ADOPT-07`'s adapt action is
followed immediately by `ADOPT-08`'s read-only validation of the same configuration; per
`00-conventions.md`'s checkpoint-grouping rule, this is a guide-documented executed pair eligible
for one checkpoint with a recorded structural justification — the same treatment
`05-agents-and-skills.md` already states for `ADOPT-09`/`ADOPT-10` and `ADOPT-11`/`ADOPT-12`.
`ADOPT-06` is not part of that pair.

---

## `ADOPT-06` — Adapt the Repository Technical Context

**Condition:** always

**Purpose:** Replace generic SpecBoot documentation with accurate, implementation-ready
context for the actual brownfield repository.

**Preconditions:** `ADOPT-03` = PASS, `ADOPT-05B` = PASS

**Action:**

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Adapt the technical context under `docs/` to this brownfield repository.

Use the selected code-graph capability, and inspect the actual build configuration, source code, tests, API endpoints, persistence entities, migrations, package or module structure, and existing repository documentation before modifying files.

Requirements:
- Keep the existing document set and file names under `docs/`.
- Replace generic or template-specific content with the actual stack, architecture, coding conventions, testing practices, and domain terminology of this repository.
- Update backend, frontend, and documentation standards according to the capabilities actually present.
- When the repository has no frontend, preserve the frontend document but mark it clearly as not applicable; do not introduce frontend, browser, Playwright, or E2E requirements.
- Update `docs/api-spec.yml` so it matches the real API endpoints, parameters, responses, and error contracts.
- Update `docs/data-model.md` so it matches the real entities, fields, relationships, persistence mappings, and migrations.
- Preserve known defects as explicitly documented risks; do not turn defective behavior into a convention to reproduce. Documenting a defect accurately, with its citation, is this step's job; changing the code the defect lives in is never this step's job, regardless of how small the fix would be.
- Search for and remove stack, domain, company, architecture, or terminology inherited from the SpecBoot template.
- Ensure all files under `docs/` are internally consistent.
- Keep the documentation in English and implementation-ready for AI agents.
- Do not modify source code, tests, OpenSpec configuration, agents, skills, or client adapters.
- Every factual claim written into `docs/` — including a narrative "Known Risks and Defects" claim, not only a structural one — must resolve to a verifiable citation (file, line, type, or annotation) obtained via the selected code-graph capability. A claim with no resolvable citation is not written; either find the citation or omit the claim. An authoring convention with no project-specific judgment in it (for example, defaulting first-clone build instructions to an online rather than offline invocation) follows the fixed convention below rather than being decided fresh for this repository.

**Fixed authoring conventions** (apply without asking; these are not project-specific decisions):
- First-clone build/test instructions default to an online invocation; an offline flag is documented only as an optional speed-up once dependencies are already cached, never as the first command a new clone runs.

After editing, validate:
- documented stack against build files;
- architecture against source structure;
- API documentation against controllers or routes;
- data model against entities and migrations;
- build and test commands against repository configuration;
- absence of unrelated template terminology;
- consistency across all changed documents;
- every factual claim, including narrative risk claims, resolves to a code-graph citation — this is the gate that lets this step's content approval be mechanical (see `00-conventions.md`'s standing-authorization clause) rather than requiring a live human read every time.

Report:
- repository evidence inspected;
- files modified;
- template contamination removed;
- unresolved contradictions or risks;
- the citation for every factual claim, or the claim's removal where none was found;
- PASS or FAIL for each validation.

Stop after presenting the documentation diff and validation evidence.
```

Allowed modifications:

```text
docs/
```

Must preserve:

```text
source code
tests
OpenSpec configuration
ai-specs/agents/
ai-specs/skills/
client adapters
```

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before accepting documentation changes.

**Validation:**

- Compare stack against build files.
- Compare API docs against actual routes/controllers.
- Compare data model against entities and migrations.
- Search for template terminology.
- Confirm frontend is marked not applicable when absent.
- Confirm all documentation is internally consistent.
- Confirm every factual claim resolves to a code-graph citation; a claim with none is FAIL for that claim.

**Evidence to record:** run-log `ADOPT-06` — prompt used, files changed, template
contamination found, corrections needed, validation, the citation-check result per claim,
prompt changes required, result.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md), "Template stack or
domain appears in docs" and "Frontend requirements appear in a backend-only repository".

---

## `ADOPT-07` — Configure OpenSpec to Consume `docs/` and `ai-specs/`

**Condition:** always

**Purpose:** Connect OpenSpec artifact generation to adapted documentation, canonical
agents, and canonical skills.

**Preconditions:** `ADOPT-06` = PASS

**Action:**

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Configure and validate this repository's OpenSpec project context.

First inspect:
- the installed OpenSpec version;
- the configuration file generated by that version;
- the supported configuration keys and validation commands;
- the existing files under `docs/`, `ai-specs/agents/`, and `ai-specs/skills/`.

Modify only the actual OpenSpec configuration file generated in this repository, normally `openspec/config.yaml` or `openspec/config.yml`.

Requirements:
- Keep the configured schema supported by the installed OpenSpec version.
- Use `docs/base-standards.md` as the primary source of project rules.
- Reference `docs/backend-standards.md`, `docs/frontend-standards.md`, and `docs/documentation-standards.md`.
- Reference `docs/api-spec.yml` and `docs/data-model.md`.
- Configure agent selection using existing canonical agents under `ai-specs/agents/`.
- Treat `ai-specs/skills/` as workflow guidance.
- Add proposal, specification, and task rules that reflect the repository documentation.
- Configure apply and archive guidance only when supported by the installed OpenSpec version.
- Use repository-relative paths only.
- Quote YAML scalar strings when characters such as `:` could change YAML parsing.
- Do not duplicate the complete project documentation in the configuration.
- Do not modify `docs/`, agents, skills, source code, tests, or client adapters.

Validate:
- YAML syntax;
- schema resolution;
- every referenced path;
- proposal, specification, and task rules;
- apply and archive guidance when configured;
- selected agent existence;
- canonical skills path;
- absence of absolute machine-specific paths;
- `openspec doctor` with zero warnings.

Use only validation commands exposed by the installed OpenSpec version.

If validation fails, correct only the failing configuration entries and rerun the full validation.

Report:
- configuration path;
- installed OpenSpec version;
- files modified;
- resolved context and rules;
- exact validation commands;
- PASS or FAIL for every check;
- warnings remaining.

Stop only when the configuration validates with zero warnings, or report the blocker without hiding it.
```

Allowed modifications — only the path that exists:

```text
openspec/config.yaml
openspec/config.yml
```

**Approval gate:** none beyond the edit itself being reviewable; this step modifies only the
OpenSpec configuration file.

**Validation:** the prompt's own validation list, run to completion with zero warnings.

**Evidence to record:** run-log `ADOPT-07` — prompt used, config path, OpenSpec version,
rules, operations, warnings, corrections, result.

**On failure:** recovery is **inline in this step** (contract form A, see
[`00-conventions.md`](00-conventions.md)) — the table below is the documented recovery for
these failures, not an absence of one:

| Failure | Recovery |
|---|---|
| YAML parse error caused by `:` | Quote the affected scalar and rerun validation. |
| Unsupported key | Inspect the installed version and change only the unsupported entry. |
| Missing path | Fix the reference or create the expected source artifact. |
| Wrong agent selection | Point to an existing canonical agent. |
| Absolute machine path | Replace with a repository-relative path. |

---

## `ADOPT-08` — Verify OpenSpec Configuration

**Condition:** always

**Purpose:** Prove that OpenSpec resolves the project schema, context, rules, operations,
agents, and skills before any change is proposed.

**Preconditions:** `ADOPT-07` = PASS

**Action:**

```bash
openspec --version
openspec --help
openspec doctor
```

Use only validation commands exposed by the installed version. Then:

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Perform a read-only verification of this repository's OpenSpec configuration.

Do not modify files.

First inspect the installed OpenSpec version and its supported commands. Use only validation commands exposed by that version.

Verify:
- the actual OpenSpec configuration file exists;
- its YAML syntax is valid;
- the configured schema resolves;
- every path referenced by the context exists;
- the context references the intended repository documentation;
- proposal, specification, and task rules parse correctly;
- apply and archive guidance parses correctly when configured;
- referenced canonical agents exist under `ai-specs/agents/`;
- referenced canonical skills exist under `ai-specs/skills/`;
- repository paths are relative rather than machine-specific absolute paths;
- `openspec doctor` completes with zero warnings.

For every check report:
- command or inspection performed;
- exact file or path involved;
- PASS or FAIL;
- error or warning text when applicable.

Do not correct failures during this validation.

Stop after presenting the complete evidence.
```

**Approval gate:** none — this step is read-only and must not correct failures it finds.

**Validation:** PASS criteria:

- Valid YAML.
- Configured schema resolves.
- Context paths exist.
- Proposal, specifications, and tasks rules resolve.
- Apply/archive guidance resolves when configured.
- Agent and skill references exist.
- `openspec doctor` reports zero warnings.

**Evidence to record:** run-log `ADOPT-08` — commands, exit codes, schema, context, rules,
operations, agent references, skill references, warnings, result.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md) — "OpenSpec command not
found" when the executable does not resolve (no output plus `command not found` is FAIL, never
a clean result); "OpenSpec key unsupported by installed version" and "YAML fails because a rule
contains `:`" when the command runs but the configuration is wrong. Correct the failing entries
in `ADOPT-07`, then rerun this step in full.

---

**Next:** [`05-agents-and-skills.md`](05-agents-and-skills.md).
