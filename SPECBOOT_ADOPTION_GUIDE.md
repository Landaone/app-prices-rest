# SpecBoot Adoption Guide

**Scope:** Reusable procedure for adopting SpecBoot, OpenSpec, and CodeGraph in an existing company brownfield repository.

**Purpose:** Provide a reproducible, evidence-driven path from an existing repository to a spec-driven AI workflow. This document is the starting point for a clean live validation run. It contains the exact prompts that were recovered, consolidated prompts derived from the observed corrections, commands, approval boundaries, validation criteria, and recovery guidance.

**Reference status:** Reconstructed from the verified prompts and outcomes of the reference adoption. A clean installation must be performed to validate and refine every step.

**Status of the daily workflow:** `PENDING END-TO-END VALIDATION`

---

## Prompt Label Conventions

| Label | Meaning |
|---|---|
| `HISTORICAL PROMPT — VERIFIED VERBATIM` | Exact prompt text recovered from the reference adoption and confirmed as executed. |
| `CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS` | Reusable prompt assembled from verified outcomes and observed correction chains. It was not necessarily executed as one historical block. |
| `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` | Reusable prompt intended for the daily change workflow. It has not yet completed a full live cycle. |
| `LIVE VALIDATION REQUIRED` | The step is documented but must be re-run in a clean installation before being considered fully validated. |

Prompts without one of these labels are shell commands, human actions, or explanatory text.

---

## Happy Path 1 — One-Time Repository Adoption

```text
existing brownfield repository
→ install prerequisites
→ initialize OpenSpec with explicitly selected clients
→ import SpecBoot
→ initialize CodeGraph
→ configure CodeGraph for selected clients
→ configure selected-client permissions
→ adapt repository technical context
→ configure and verify OpenSpec
→ inspect, adapt, and validate agents
→ inspect, adapt, and validate skills
→ create and validate client adapters
→ validate fresh-session runtime discovery
→ run project baseline
→ review and create a clean local checkpoint
```

Approval boundaries are marked **[HUMAN APPROVAL REQUIRED]**.

---

## Happy Path 2 — Daily Request-to-PR-Ready Workflow

`PENDING END-TO-END VALIDATION`

```text
developer request
→ OpenSpec proposal / specifications / design / tasks
→ implementation
→ tests
→ review
→ affected documentation and canonical-spec synchronization
→ commit message and pull-request content prepared
→ STOP before push or pull-request creation
→ human approval
→ authorized remote operation according to company policy
```

---

## Table of Contents

1. [Install Prerequisites](#1-install-prerequisites)
2. [Install and Initialize OpenSpec with Explicitly Selected Clients](#2-install-and-initialize-openspec-with-explicitly-selected-clients)
3. [Import SpecBoot](#3-import-specboot)
4. [Initialize CodeGraph](#4-initialize-codegraph)
5. [Configure CodeGraph for the Selected Clients](#5-configure-codegraph-for-the-selected-clients)
6. [Adapt the Repository Technical Context](#6-adapt-the-repository-technical-context)
7. [Configure OpenSpec to Consume docs/ and ai-specs/](#7-configure-openspec-to-consume-docs-and-ai-specs)
8. [Verify OpenSpec Configuration](#8-verify-openspec-configuration)
9. [Inspect and Adapt Agents](#9-inspect-and-adapt-agents)
10. [Validate Agents](#10-validate-agents)
11. [Inspect and Adapt Skills](#11-inspect-and-adapt-skills)
12. [Validate Skills](#12-validate-skills)
13. [Create Selected-Client Adapters](#13-create-selected-client-adapters)
14. [Validate Adapter Files, Symlinks, and Generated Directories](#14-validate-adapter-files-symlinks-and-generated-directories)
15. [Validate Runtime Discovery in a Fresh Client Session](#15-validate-runtime-discovery-in-a-fresh-client-session)
16. [Run the Project Baseline](#16-run-the-project-baseline)
17. [Review and Create a Clean Local Checkpoint](#17-review-and-create-a-clean-local-checkpoint)
18. [Daily Request-to-PR-Ready Workflow](#18-daily-request-to-pr-ready-workflow)
19. [Permission Recommendations](#19-permission-recommendations)
20. [Prompt Inventory](#20-prompt-inventory)
21. [Validation Status Table](#21-validation-status-table)
22. [Troubleshooting and Recovery](#22-troubleshooting-and-recovery)

---

## 1. Install Prerequisites

**Purpose:** Ensure every required tool is available before modifying the repository.

### Official sources

| Tool | Source |
|---|---|
| Node.js | https://nodejs.org/ |
| OpenSpec | https://github.com/Fission-AI/OpenSpec |
| OpenSpec npm package | `@fission-ai/openspec` |
| CodeGraph | https://github.com/colbymchenry/codegraph |
| Git | https://git-scm.com/ |
| AI client | Vendor-specific official documentation |

### Minimum and reference versions

| Tool | Requirement | Reference experiment |
|---|---|---|
| Node.js | `>= 20.19.0` | `v24.18.0` |
| npm | Bundled with Node.js | `11.16.0` |
| OpenSpec | Installed version must support the documented keys | `1.7.0` |
| CodeGraph | Version with `init`, `install`, and exploration support | `1.5.0` |
| Git | Recent supported version | Verify locally |
| Project runtime/build tool | Derived from repository evidence | Java 11 + Maven 3.9.16 in the reference repo |

Inspect the target repository before assuming a runtime or build system:

```text
README.md
pom.xml
build.gradle
build.gradle.kts
package.json
requirements.txt
pyproject.toml
go.mod
Cargo.toml
Makefile
docs/
CI configuration
```

### Verification commands

```bash
node --version
npm --version
git --version
```

After installation:

```bash
openspec --version
codegraph --version
```

**[HUMAN APPROVAL REQUIRED]** before installing or upgrading software.

### Expected result

- Every required executable is available on `PATH`.
- Version commands return without error.
- Repository-specific toolchain is identified from project evidence.

### Common failures and recovery

| Failure | Recovery |
|---|---|
| Node.js missing or below 20.19.0 | Install a supported version from the official source or an approved version manager. |
| Global npm executables unavailable | Run `npm prefix -g` and add the appropriate executable directory to `PATH`. |
| Project build tool missing | Follow the repository development guide. |
| AI client unavailable | Install and authenticate the selected client before continuing. |

### Live validation record

```text
Date:
Machine:
Node:
npm:
OpenSpec:
CodeGraph:
Git:
Project runtime:
Project build tool:
Result: PASS / FAIL
Notes:
```

---

## 2. Install and Initialize OpenSpec with Explicitly Selected Clients

**Purpose:** Install OpenSpec, initialize the repository, and explicitly select the clients that will use the project.

### Install

```bash
npm install -g @fission-ai/openspec@latest
openspec --version
```

**[HUMAN APPROVAL REQUIRED]** before global installation or upgrade.

### Initialize

Run from the repository root:

```bash
openspec init
```

During the interactive flow:

1. Inspect the available client options.
2. Select only the clients the repository will actually use.
3. Record every selection.
4. Do not accept defaults without review.

The installed version may generate either:

```text
openspec/config.yaml
```

or:

```text
openspec/config.yml
```

Use the actual generated path.

### Expected result

- `openspec/` exists.
- A configuration file exists.
- Client-specific OpenSpec resources exist for selected clients.
- No resources are added for unselected clients unless the installed version requires them.

### Validation

```bash
openspec --version
openspec doctor
find openspec -maxdepth 3 -print
git status --short
```

### Common failures and recovery

| Failure | Recovery |
|---|---|
| `openspec` not found | Check npm global prefix and `PATH`. |
| Wrong clients selected | Re-run initialization or use the installed version's client-management flow. |
| Config extension differs | Use the generated extension. |
| Unsupported config key later appears | Verify against the installed version before editing. |

### Live validation record

```text
OpenSpec version:
Command:
Clients offered:
Clients selected:
Generated config path:
Generated client resources:
openspec doctor result:
Git changes:
Result: PASS / FAIL
```

---

## 3. Import SpecBoot

**Purpose:** Copy the company-approved SpecBoot baseline into the brownfield repository without overwriting existing project files.

### Generic command

```bash
cp -rn <SPECBOOT_SOURCE>/* <TARGET_REPOSITORY>/
```

Reference experiment command:

```bash
cp -rn <SPECBOOT_SOURCE>/* .
```

### Important shell behavior

- `*` does not copy hidden directories.
- `.claude/`, `.kiro/`, and other hidden client directories will not be copied by this command.
- `-n` prevents overwriting existing files.
- Hidden client resources must be created by OpenSpec, CodeGraph, or the adapter steps.

**[HUMAN APPROVAL REQUIRED]** before repository-local writes.

### Expected result

Inspect for:

```text
docs/
ai-specs/
AGENTS.md
CLAUDE.md
GEMINI.md
codex.md
```

The exact set depends on the approved SpecBoot source.

### Root instruction single source

`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `codex.md` should each be a relative symlink to `docs/base-standards.md` when the filesystem/client supports it, matching `packages/specboot/bin/init.js`. This keeps a single source of truth instead of four files that can drift apart.

```bash
test -L AGENTS.md && readlink AGENTS.md
test -L CLAUDE.md && readlink CLAUDE.md
test -L GEMINI.md && readlink GEMINI.md
test -L codex.md && readlink codex.md
```

Expect every command to print exactly `docs/base-standards.md`, and every symlink to resolve.

### Validation

```bash
find docs -maxdepth 2 -type f -print
find ai-specs -maxdepth 3 -type f -print
git status --short
```

### Common failures and recovery

| Failure | Recovery |
|---|---|
| Hidden directories missing | Expected; configure clients separately. |
| Existing files not replaced | Expected with `-n`; review whether a deliberate merge is needed. |
| Wrong source path | Verify `<SPECBOOT_SOURCE>` before copying. |
| Partial copy | Compare source and target inventories. |
| Root instruction file is a real file, not a symlink | Replace it with a relative symlink to `docs/base-standards.md`, matching `packages/specboot/bin/init.js`; do not let its content diverge from `docs/base-standards.md` first. |

### Live validation record

```text
Source:
Target:
Exact command:
Files added:
Files skipped because they existed:
Hidden directories expected but not copied:
Root instruction symlinks resolve to docs/base-standards.md:
Result: PASS / FAIL
```

---

## 4. Initialize CodeGraph

**Purpose:** Build a repository index for grounded source navigation and call-graph exploration.

### Official source

```text
https://github.com/colbymchenry/codegraph
```

Follow the official installation procedure, then verify:

```bash
codegraph --version
```

**[HUMAN APPROVAL REQUIRED]** before software installation.

### Initialize

```bash
codegraph init
```

Reference result:

```text
25 files indexed
314 nodes
389 edges
1.0 second
```

These values are evidence from the reference repository, not universal expectations.

### Expected result

- `.codegraph/` exists.
- An indexing summary reports files, nodes, and edges.
- The index is queryable.
- Internal `.codegraph/` files are treated as version-dependent.

### Validation

```bash
test -d .codegraph
codegraph explore "list entry points"
```

### Common failures and recovery

| Failure | Recovery |
|---|---|
| `codegraph` not on `PATH` | Review installation and shell configuration. |
| Zero files indexed | Confirm the command ran from the repository root. |
| Unsupported language coverage | Record the limitation; do not claim full graph coverage. |
| Empty exploration result | Re-run initialization or the installed version's refresh command. |

### Live validation record

```text
CodeGraph version:
Command:
Files indexed:
Nodes:
Edges:
Duration:
Exploration query:
Result: PASS / FAIL
```

---

## 5. Configure CodeGraph for the Selected Clients

**Purpose:** Integrate CodeGraph with every explicitly selected client.

Run:

```bash
codegraph install
```

Record the interactive choices:

| Decision | Reference experiment | Live decision |
|---|---|---|
| Clients | Claude and Kiro | |
| Scope | Project | |
| CLI on PATH | Yes | |
| Automatic allow | No | |
| Automatic prompt front-loading | No | |
| CodeGraph Pro | No | |

Reference choices are evidence, not universal defaults.

**[HUMAN APPROVAL REQUIRED]** before project-local configuration changes.

### Rules

- Select only clients used by the repository.
- Prefer project scope for repository-specific adoption.
- Do not enable automatic allow until exact command patterns are reviewed.
- Treat prompt front-loading as optional.
- Do not hand-author MCP configuration as the primary path when `codegraph install` supports the selected client.
- Inspect all generated files.
- Do not create adapters for unselected clients.

### Validation

```bash
git status --short
git diff --name-only
codegraph explore "list public interfaces"
```

Runtime discovery is validated later in a fresh session.

### Common failures and recovery

| Failure | Recovery |
|---|---|
| Selected client not configured | Re-run `codegraph install` with the correct selection. |
| Unselected client configured | Remove only the unintended generated configuration after review. |
| Client cannot launch CodeGraph | Confirm the executable is visible in the client environment. |
| Excessive approval prompts | Adjust only verified read-only patterns; do not broadly auto-allow writes. |

### Live validation record

```text
Command:
Clients selected:
Scope:
PATH:
Automatic allow:
Prompt front-loading:
Pro:
Generated files:
Result: PASS / FAIL
```

### Configure Selected-Client Permissions (Early, One-Time)

**Purpose:** Once selected clients and their OpenSpec/CodeGraph resources are known (above), and before the first AI-heavy adaptation step (Section 6), configure a project-scoped, read-only permission allowlist for each selected client. This avoids repeated approval prompts on the same verified read-only commands across every remaining adoption step. See [Section 19](#19-permission-recommendations) for the full policy/reference material; this subsection is only the first-time setup.

Rules:

- Configure a permission file only for a client explicitly selected above. Claude and Kiro are not mandatory; skip a client the repository does not use.
- Allow only verified, project-scoped, read-only patterns: repository file reading/listing, OpenSpec inspection (`--version`, `--help`, `doctor`, `context`, `schemas`, `templates`), CodeGraph exploration, and Git inspection (`status`, `diff`, `rev-parse`).
- Keep every mutating or higher-risk operation reviewable or approval-gated: edits, arbitrary execution, installation/upgrade, deletion, overwrite, staging, commit, push, PR, merge, credential/secret changes, network access, and any other remote mutation.
- Do not auto-allow generic shell loops, glob expansions, or filesystem-wide searches.
- Validate the file's syntax, then run a fresh-session read-only smoke test before relying on it.

**[HUMAN APPROVAL REQUIRED]** before writing either permission file.

Validated Claude Code example — `.claude/settings.local.json` (local and git-ignored; never staged or shared):

```json
{
  "enabledMcpjsonServers": [
    "codegraph"
  ],
  "permissions": {
    "allow": [
      "Bash(command -v openspec)",
      "Bash(npm root -g)",
      "Bash(openspec --version)",
      "Bash(openspec --help)",
      "Bash(openspec doctor:*)",
      "Bash(openspec context:*)",
      "Bash(openspec schemas:*)",
      "Bash(openspec templates:*)",
      "Bash(codegraph explore:*)",
      "Bash(git status:*)",
      "Bash(git -C * status:*)",
      "Bash(git diff:*)",
      "Bash(git rev-parse:*)",
      "Bash(find .:*)",
      "Bash(ls:*)",
      "Bash(grep:*)",
      "Bash(rg:*)",
      "Bash(head:*)",
      "Bash(tail:*)",
      "Bash(wc:*)",
      "Bash(readlink:*)",
      "Bash(sed -n:*)",
      "mcp__codegraph__codegraph_explore"
    ]
  }
}
```

Validated Kiro example — `.kiro/settings/permissions.yaml` (not inherently local; may be committed and shared with the team when company policy permits):

```yaml
rules:
  - capability: fs_read
    match:
      - "./**"
    effect: allow
  - capability: shell
    match:
      - "command -v openspec"
      - "npm root -g"
      - "openspec --version"
      - "openspec --help"
      - "openspec doctor"
      - "openspec doctor *"
      - "openspec context"
      - "openspec context *"
      - "openspec schemas"
      - "openspec schemas *"
      - "openspec templates"
      - "openspec templates *"
      - "codegraph explore *"
      - "git status"
      - "git status *"
      - "git -C * status *"
      - "git diff"
      - "git diff *"
      - "git rev-parse *"
      - "find . *"
      - "ls *"
      - "grep *"
      - "rg *"
      - "head *"
      - "tail *"
      - "wc *"
      - "readlink *"
      - "sed -n *"
    effect: allow
  - capability: mcp
    match:
      - "codegraph/codegraph_explore"
    effect: allow
```

Validation: check syntax (JSON/YAML parse), then run this read-only smoke test in a fresh session of each configured client:

`HISTORICAL PROMPT — VERIFIED VERBATIM`

```text
Perform a read-only smoke test of this repository's project-local permissions.

Run these commands separately, without combining them with shell operators:
- `openspec --version`
- `openspec doctor --json`
- `openspec context --json`
- `openspec schemas`
- `openspec templates`
- `git status --short`
- `git diff -- openspec/config.yaml`
- one read-only CodeGraph exploration query

Do not modify files.

For each command report:
- whether it executed;
- whether it requested permission;
- PASS or FAIL.

Stop after reporting the permission behavior.
```

Adjust `openspec/config.yaml` to the actual generated path (`openspec/config.yml`) when different.

### Live validation record — Permissions

```text
Clients selected:
Claude file present / JSON valid:
Kiro file present / YAML valid:
Smoke test commands executed:
Permission prompts triggered:
File modifications during smoke test:
Result: PASS / FAIL
```

---

## 6. Adapt the Repository Technical Context

**Purpose:** Replace generic SpecBoot documentation with accurate, implementation-ready context for the actual brownfield repository.

### Historical prompt

`HISTORICAL PROMPT — VERIFIED VERBATIM`

```text
Following the same base structure already present in docs/, update all technical context documents according to this project's specifics.

Requirements:
- Keep the same document set and file names in docs/.
- Replace generic content with this project's real stack, architecture patterns, coding conventions, and domain terminology.
- Update backend, frontend, and documentation standards to reflect actual practices used by this team.
- Update docs/api-spec.yml and docs/data-model.md so they match the real endpoints and entities of this project.
- Ensure all references are internally consistent and aligned across docs/.
- Keep everything in English and make guidance implementation-ready for AI agents.
- Use CodeGraph as part of the repository analysis to ground the updates in the actual codebase.
```

### Consolidated prompt for the clean run

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Adapt the technical context under `docs/` to this brownfield repository.

Use CodeGraph when available, and inspect the actual build configuration, source code, tests, API endpoints, persistence entities, migrations, package or module structure, and existing repository documentation before modifying files.

Requirements:
- Keep the existing document set and file names under `docs/`.
- Replace generic or template-specific content with the actual stack, architecture, coding conventions, testing practices, and domain terminology of this repository.
- Update backend, frontend, and documentation standards according to the capabilities actually present.
- When the repository has no frontend, preserve the frontend document but mark it clearly as not applicable; do not introduce frontend, browser, Playwright, or E2E requirements.
- Update `docs/api-spec.yml` so it matches the real API endpoints, parameters, responses, and error contracts.
- Update `docs/data-model.md` so it matches the real entities, fields, relationships, persistence mappings, and migrations.
- Preserve known defects as explicitly documented risks; do not turn defective behavior into a convention to reproduce.
- Search for and remove stack, domain, company, architecture, or terminology inherited from the SpecBoot template.
- Ensure all files under `docs/` are internally consistent.
- Keep the documentation in English and implementation-ready for AI agents.
- Do not modify source code, tests, OpenSpec configuration, agents, skills, or client adapters.

After editing, validate:
- documented stack against build files;
- architecture against source structure;
- API documentation against controllers or routes;
- data model against entities and migrations;
- build and test commands against repository configuration;
- absence of unrelated template terminology;
- consistency across all changed documents.

Report:
- repository evidence inspected;
- files modified;
- template contamination removed;
- unresolved contradictions or risks;
- PASS or FAIL for each validation.

Stop after presenting the documentation diff and validation evidence.
```

### Allowed modifications

```text
docs/
```

### Must preserve

```text
source code
tests
OpenSpec configuration
ai-specs/agents/
ai-specs/skills/
client adapters
```

**[HUMAN APPROVAL REQUIRED]** before accepting documentation changes.

### Validation

- Compare stack against build files.
- Compare API docs against actual routes/controllers.
- Compare data model against entities and migrations.
- Search for template terminology.
- Confirm frontend is marked not applicable when absent.
- Confirm all documentation is internally consistent.

### Live validation record

```text
Prompt used:
Files changed:
Template contamination found:
Corrections needed:
Validation:
Prompt changes required:
Result: PASS / FAIL
```

---

## 7. Configure OpenSpec to Consume docs/ and ai-specs/

**Purpose:** Connect OpenSpec artifact generation to adapted documentation, canonical agents, and canonical skills.

### Historical prompt

`HISTORICAL PROMPT — VERIFIED VERBATIM`

```text
Update my openspec config.yml context to reference this repository's docs and ai-specs structure.

Requirements:
- Use docs/base-standards.md as the single source of truth.
- Include docs/backend-standards.md, docs/frontend-standards.md, and docs/documentation-standards.md.
- Include docs/api-spec.yml and docs/data-model.md.
- Tell the agent to adopt the relevant agent from ai-specs/agents/ according to the work being performed.
- Mention ai-specs/skills/ as workflow guidance.
- Keep all paths relative to the project root.
```

### Consolidated prompt for the clean run

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

### Allowed modifications

```text
openspec/config.yaml
openspec/config.yml
```

Only the path that exists.

### Common failures and recovery

| Failure | Recovery |
|---|---|
| YAML parse error caused by `:` | Quote the affected scalar and rerun validation. |
| Unsupported key | Inspect the installed version and change only the unsupported entry. |
| Missing path | Fix the reference or create the expected source artifact. |
| Wrong agent selection | Point to an existing canonical agent. |
| Absolute machine path | Replace with a repository-relative path. |

### Live validation record

```text
Prompt used:
Config path:
OpenSpec version:
Rules:
Operations:
Warnings:
Corrections:
Result: PASS / FAIL
```

---

## 8. Verify OpenSpec Configuration

**Purpose:** Prove that OpenSpec resolves the project schema, context, rules, operations, agents, and skills before any change is proposed.

### Commands

```bash
openspec --version
openspec --help
openspec doctor
```

Use only validation commands exposed by the installed version.

### Validation prompt

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

### Expected result

- Valid YAML.
- Configured schema resolves.
- Context paths exist.
- Proposal, specifications, and tasks rules resolve.
- Apply/archive guidance resolves when configured.
- Agent and skill references exist.
- `openspec doctor` reports zero warnings.

### Live validation record

```text
Commands:
Exit codes:
Schema:
Context:
Rules:
Operations:
Agent references:
Skill references:
Warnings:
Result: PASS / FAIL
```

---

## 9. Inspect and Adapt Agents

**Purpose:** Ensure canonical agents match the work types and technology families present without overwriting agents for other stacks.

### Consolidated prompt

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Inspect, adapt, and validate the canonical agents for this repository.

Use CodeGraph when available. Read the repository build configuration, source structure, `docs/`, existing OpenSpec configuration, and every agent under `ai-specs/agents/`.

Requirements:
- Keep `ai-specs/agents/` as the canonical, client-neutral agent source.
- Preserve all existing agents intended for other languages, frameworks, clients, or work types, including technology-agnostic product or strategy agents; do not reject an agent merely because it is not a programming-stack agent — judge it by its work type.
- Do not overwrite or repurpose an unrelated agent.
- Validate every existing agent's frontmatter with a strict YAML parser before adapting agents. When frontmatter is invalid only because an unquoted description scalar contains YAML-sensitive text (for example embedded `Context:`, `user:`, or `assistant:` patterns), repair only the YAML representation (convert to a block scalar) while preserving the description text, metadata, and body exactly.
- Determine which technology stacks and work types are actually present from repository evidence, not from a hardcoded filename.
- Reuse an existing agent when its validated description and scope appropriately cover the work.
- Create a new stack-specific agent only when no existing validated agent covers a detected technology family or work type; treat creation as explicitly conditional and optional, never a default step.
- A new agent must remain reusable for its technology family rather than hard-code this repository's domain, architecture, frameworks, build tool, database, or package names.
- The agent must read the relevant repository documentation at task time to obtain project-specific details.
- Give a newly created agent portable, client-neutral frontmatter only; do not embed Claude/Kiro model names, tool allowlists, colors, MCP identifiers, or other client-only metadata unless the canonical format demonstrably requires it.
- Any reusable example in a newly created agent must be domain-neutral: it must not leak this repository's entities, fields, controllers, repositories, business domain, package names, or an unrelated imported template's domain.
- Reference only documentation files that actually exist.
- Update the agent-selection portion of OpenSpec configuration only after the selected or newly created agent has passed the validation checks below; replace an obsolete selection rather than appending a contradictory one.
- Do not create client adapters in this step.

Allowed modifications:
- `ai-specs/agents/`, limited to creating a new agent when required and representation-only frontmatter repairs;
- the agent-selection portion of `openspec/config.yaml` or `openspec/config.yml`, only when required.

Validation:
- strict YAML parsing succeeds for every file under `ai-specs/agents/`;
- every selected agent exists;
- frontmatter is valid;
- description matches its technology family or work type;
- unrelated agents remain unchanged;
- a newly created agent is client-neutral, domain-neutral, and free of repository-specific assumptions;
- project-specific details are read from `docs/`;
- every referenced documentation path exists;
- OpenSpec selects an existing canonical agent;
- no client adapter is treated as canonical.

Report:
- detected stacks and work types;
- agents inspected and strict frontmatter results;
- representation-only frontmatter repairs;
- agents preserved;
- agents created or adapted, and why;
- evidence that any new agent is client-neutral and domain-neutral;
- OpenSpec selection changes;
- files modified;
- PASS or FAIL for every validation;
- remaining risks.

Stop after the canonical agents and selection references validate. Do not create client adapters.
```

### Reference outcome

- Original TypeScript backend, React frontend, and product-strategy agents preserved; each had frontmatter invalid under strict YAML solely because its unquoted description scalar contained YAML-sensitive colon patterns (for example `Context:`, `user:`, `assistant:` inside the examples text), repaired to a block scalar with description, metadata, and body preserved exactly.
- No existing agent covered Java/JVM backend work, so `java-backend-developer.md` was created: client-neutral frontmatter (name and description only), generic across the Java/JVM family, domain-neutral examples, reading project details from `docs/` at task time.
- OpenSpec selected the Java agent for Java backend work and the product-strategy agent for applicable product/ideation work, only after both passed validation.

### Live validation record

```text
Detected stacks:
Existing agents:
Agents preserved:
Agents created:
Agents modified:
OpenSpec selection:
Corrections:
Result: PASS / FAIL
```

---

## 10. Validate Agents

**Purpose:** Perform a read-only verification of canonical agents and OpenSpec selection.

### Checks

- Selected agent exists under `ai-specs/agents/`.
- Frontmatter is valid.
- Description matches the intended technology family or work type.
- Unrelated agents remain present.
- Project-specific details are not unnecessarily duplicated.
- Referenced documentation exists.
- OpenSpec selects an existing canonical agent.
- Client adapters are not canonical sources.

### Commands

```bash
find ai-specs/agents -maxdepth 1 -type f -name '*.md' -print
grep -R "ai-specs/agents" openspec 2>/dev/null
git diff -- ai-specs/agents openspec/config.yaml openspec/config.yml 2>/dev/null
```

### Expected result

Every selected canonical agent passes all checks.

### Live validation record

```text
Agent:
Frontmatter:
Description:
Referenced docs:
OpenSpec selection:
Unrelated agents preserved:
Adapter not canonical:
Result: PASS / FAIL
```

---

## 11. Inspect and Adapt Skills

**Purpose:** Ensure canonical skills detect the repository stack rather than assuming a specific ecosystem.

### Consolidated prompt

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Inspect, adapt, and validate the canonical skills for this repository.

Use CodeGraph when available. Read the repository documentation, build configuration, test configuration, and every skill under `ai-specs/skills/`.

Requirements:
- Keep `ai-specs/skills/` as the canonical shared skill source.
- Preserve skills that are already technology-agnostic or correctly detect the repository stack.
- Adapt only skills whose assumptions would select incorrect tools, commands, languages, build systems, or workflows.
- Detect languages, build systems, test tools, linters, static-analysis tools, and repository conventions from files that actually exist.
- Make technology-specific commands conditional.
- Detect existing tooling first, and use only tools and dependencies already configured by the repository's normal build or dependency workflow; do not install or download an undeclared tool merely to perform inspection, and distinguish resolving a dependency the project already declares (allowed) from introducing a new, undeclared dependency merely to satisfy a skill (not allowed).
- External web, GitHub, or package-registry research requires explicit user authorization before it is performed.
- Do not modify client-specific OpenSpec-generated skill directories.
- Do not copy client-generated skills into the canonical shared source.
- Do not create client adapters in this step.

Allowed modifications:
- files under `ai-specs/skills/` only.

Validation:
- every canonical skill has its required entry file;
- supporting resources exist;
- referenced paths resolve;
- stack-aware skills derive commands from repository configuration;
- technology-specific checks are conditional;
- no undeclared tool or dependency is required;
- no generated client directory is confused with a canonical skill;
- shared skills remain suitable for the selected AI clients;
- independent validation treats any unexecuted or failed command as FAIL, never an inferred PASS from empty output.

Report:
- skills inspected;
- assumptions found;
- skills preserved;
- skills adapted and why;
- files modified;
- blockers versus optional improvements;
- PASS or FAIL for every validation.

Stop after presenting the complete skill validation evidence.
```

### Reference outcome

- Twelve canonical skills inspected; eleven preserved unchanged because they were already technology-agnostic or already detected the repository stack correctly.
- `code-auditing` adapted to detect the stack, no longer assumed Node.js/TypeScript tooling, made technology-specific checks conditional, and required explicit authorization before any web/GitHub/registry research. No new tools introduced.
- `using-git-worktrees` was reviewed and left unchanged: its dependency-bootstrap commands resolve dependencies the target repository already declares, which is not the same as introducing an undeclared dependency.
- Independent validation used absolute executable paths after an initial pass produced false PASS results caused by shell-resolved commands that had actually failed to run.

### Live validation record

```text
Skills found:
Skills preserved:
Skills adapted:
Assumptions:
New dependencies:
Corrections:
Result: PASS / FAIL
```

---

## 12. Validate Skills

**Purpose:** Verify canonical skill structure, resources, stack detection, and dependency safety.

### Commands

```bash
find ai-specs/skills -mindepth 1 -maxdepth 2 -type f -print
find ai-specs/skills -type l -print -exec readlink {} \;
git diff -- ai-specs/skills
```

Run these with absolute executable paths when a shell alias or function could shadow the real tool; treat an unexecuted or failed command as FAIL, never an inferred PASS from empty output.

### Checklist

- Every canonical skill exists.
- Expected entry file exists.
- Supporting resources resolve.
- Stack-aware skills inspect repository configuration.
- Technology-specific commands are conditional.
- No undeclared dependency is required.
- Client-generated OpenSpec skills are not copied into canonical shared skills.
- Shared skills are suitable for selected clients.

### Live validation record

```text
Canonical skill count:
Missing entry files:
Missing resources:
Unconditional stack assumptions:
Undeclared dependencies:
Generated-client content confused with canonical:
Result: PASS / FAIL
```

---

## 13. Create Selected-Client Adapters

**Purpose:** Expose canonical agents and shared skills to selected clients while preserving OpenSpec-generated resources.

### Consolidated prompt

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Create and validate the minimum project-local adapters needed by the AI clients explicitly selected for this repository.

First inspect:
- OpenSpec-generated client configuration;
- CodeGraph client configuration;
- root instruction files;
- `ai-specs/agents/`;
- `ai-specs/skills/`;
- existing client agent and skill directories.

Requirements:
- Detect selected clients from real client configuration generated in the repository; do not assume Claude, Kiro, Cursor, or any other client is selected.
- Keep `ai-specs/agents/` and `ai-specs/skills/` as the canonical sources.
- Create adapters only for selected clients.
- Determine exposed agents from active OpenSpec agent-selection rules plus actual applicability, including technology-agnostic agents (for example a product/strategy agent) selected for applicable business/product work; do not skip an agent merely because it is not tied to a programming stack. Preserve canonical agents for other stacks without exposing them when configuration explicitly rejects them.
- Use the client's native agent directory for agents and native skill directory for skills.
- Prefer relative symlinks for shared canonical resources when the client supports them.
- Do not place agent definitions inside skill directories.
- Preserve all OpenSpec-generated client skill directories as real directories. If a canonical skill name collides with an existing real client-generated directory, preserve the real directory and skip that symlink; report the collision explicitly.
- Do not replace, move, delete, or convert OpenSpec-generated directories into symlinks.
- Preserve existing client configuration and unrelated adapters.
- Do not create adapters for unselected clients.
- Do not modify canonical agents or skills during this step.
- Do not modify source code, tests, project documentation, or OpenSpec planning artifacts.
- Make shell examples safe for the detected shell: do not iterate over a space-separated scalar assuming Bash-style word splitting under zsh; use explicit per-item commands or a shell-native array.

Before creating any directory or symlink, present the complete adapter plan — selected clients and evidence, directories to create, every symlink path and exact relative target, real directories to preserve, collisions and skipped entries, and agents not exposed and why — and obtain explicit human approval. **[HUMAN APPROVAL REQUIRED]**

After approved creation, validate for each selected client:
- agent symlinks and their recorded targets;
- shared skill symlinks and their recorded targets;
- target existence under `ai-specs/`;
- real OpenSpec-generated skill directories;
- absence of broken symlinks;
- absence of malformed symlink names (for example a name containing spaces);
- absence of adapters for unselected clients.

For clients with `.claude/` or `.kiro/` paths, use read-only checks equivalent to:
- `find <client-agent-paths> -type l -print -exec readlink {} \;`
- `find <client-skill-paths> -type l -print -exec readlink {} \;`
- `find <client-skill-paths> -mindepth 1 -maxdepth 1 -type d -print`
- `find -L <all-adapter-paths> -type l -print`

Interpret a non-empty final broken-link result as FAIL.

Report:
- selected clients detected;
- canonical agents and skills exposed;
- symlinks created;
- real directories preserved;
- existing files unchanged;
- unselected clients checked;
- PASS or FAIL for agents, skills, real directories, and broken links;
- files modified.

Stop after filesystem validation. Do not claim runtime discovery has passed; that requires a fresh client session.
```

**[HUMAN APPROVAL REQUIRED]** before creating symlinks or modifying client directories.

### Reference outcome

- Claude and Kiro selected.
- Two agents exposed to each client — `java-backend-developer.md` and `product-strategy-analyst.md` — for four agent symlinks total; the TypeScript backend and frontend agents were preserved but not exposed because they do not apply to this repository.
- Eleven of twelve canonical skills exposed per client, for twenty-two shared skill symlinks total; the twelfth (`openspec-sync-specs`) collided with an existing real OpenSpec-generated directory, so the real directory was preserved and its symlink was skipped and reported.
- Six OpenSpec-generated skill directories per client (twelve total) remained real.
- No Cursor adapters created.
- A first attempt looped over a space-separated client list, which zsh treats as one unsplit word; it produced one malformed symlink per client. Only those two malformed entries were removed, then the approved symlinks were created explicitly.

### Live validation record

```text
Selected clients:
Canonical agents exposed:
Canonical skills exposed:
Symlinks:
Real directories preserved:
Unselected clients checked:
Corrections:
Result: PASS / FAIL
```

---

## 14. Validate Adapter Files, Symlinks, and Generated Directories

**Purpose:** Distinguish canonical symlinks, real OpenSpec directories, and broken links.

For Claude and Kiro when selected:

```bash
find .claude/agents .kiro/agents -type l -print -exec readlink {} \;
find .claude/skills .kiro/skills -type l -print -exec readlink {} \;
find .claude/skills .kiro/skills -mindepth 1 -maxdepth 1 -type d -print
find -L .claude/agents .kiro/agents .claude/skills .kiro/skills -type l -print
```

Interpretation:

- `readlink` shows each recorded target.
- Directory search lists real directories.
- OpenSpec-generated skill directories remain real.
- Final `find -L ... -type l` should return no broken symlinks.
- `find -L ... -type f` alone is insufficient.

The total staged symlink count normally combines client agent/skill adapters with any root-instruction symlinks from Section 3 (see there for their own validation). In the reference clean run this was 26 adapter symlinks (4 agent + 22 skill) plus 4 root-instruction symlinks, for 30 total — illustrative evidence, not a fixed target for every repository.

### Checklist

- Agent adapters point to canonical files.
- Skill adapters point to canonical directories.
- Targets exist.
- Generated directories remain real.
- No broken links.
- No malformed symlink names (for example a name containing spaces).
- No adapters for unselected clients.

### Live validation record

```text
Agent symlinks:
Skill symlinks:
Real directories:
Root-instruction symlinks:
Broken links:
Malformed symlink names:
Unselected client adapters:
Result: PASS / FAIL
```

---

## 15. Validate Runtime Discovery in a Fresh Client Session

**Purpose:** Prove that a new client session discovers and uses repository instructions, agents, skills, docs, and CodeGraph integration.

### Historical Kiro prompt

`HISTORICAL PROMPT — VERIFIED VERBATIM`

```text
Review the backend architecture of this repository and identify the most important implementation risk. Use the repository's configured agents and skills where appropriate. Do not modify files.
```

### Observed Kiro result

- Loaded `AGENTS.md`.
- Loaded `code-auditing`.
- Read `java-backend-developer.md`.
- Consumed project documentation.
- Identified the `HttpErrorHandler` fallback as the primary risk.
- Modified no files.
- Kiro's own self-report initially labeled discovery FAIL because documentation and tests were opened manually during analysis; under the interpretation rules below, that is expected manual task execution, not a discovery failure, so the corrected result is PASS. Claude Code independently reached the same primary risk in a separate fresh session, with the agent roster, skill catalog, and CodeGraph automatically discovered and no files modified.

### Consolidated validation prompt

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Perform a read-only architecture review of this repository and identify the most important implementation risk.

Use the repository's configured agents, skills, project instructions, documentation, and CodeGraph integration where appropriate.

Do not modify files.
Do not access the web or any external service.

Before giving the architecture finding, report:
- the client and active agent or mode;
- root repository instruction files automatically loaded;
- canonical or adapted agent definitions automatically discovered or used;
- skills automatically discovered or used;
- project documentation consumed;
- CodeGraph tools or commands used;
- resources that had to be opened manually because automatic discovery failed.

Then report:
- the primary implementation risk;
- repository evidence supporting it;
- files modified, which must be none;
- PASS or FAIL for automatic runtime discovery.

Do not claim automatic discovery for a resource that was manually supplied or explicitly loaded after the session started.
```

### Interpretation rules

Distinguish four separate concepts when judging the result: (1) automatic instruction/catalog/profile discovery — root instructions, agent roster, skill catalog loaded without being told to; (2) explicit agent or skill activation/invocation; (3) normal manual reading of relevant repository evidence during task execution, which is expected task behavior, not a discovery failure; (4) prohibited manual injection of resources the client did not discover on its own. A session fails automatic discovery only when (1) did not happen or the operator had to perform (4). Do not fail a session merely because it exhibited (3), and do not front-load project documentation into the prompt merely to force a PASS — that is itself (4). Report invocation (2) separately; a client that judges direct read-only analysis sufficient and never formally invokes an agent or skill has not failed discovery.

### Procedure

1. Close the current client session.
2. Open a new session at the repository root.
3. Use the client default mode unless client documentation requires another mode.
4. Submit the prompt.
5. Record automatic discovery separately from manual loading and from invocation.
6. Repeat for every selected client.

### Status

| Client | Status |
|---|---|
| Kiro | Validated |
| Claude | Validated |
| Other selected clients | Pending live validation |

### Live validation record

```text
Client:
Mode:
Root instructions:
Agent:
Skills:
Docs:
CodeGraph:
Manual loading:
Primary risk:
Files modified:
Result: PASS / FAIL
```

---

## 16. Run the Project Baseline

**Purpose:** Establish a known-good project state after adoption and before the first product change.

### Determine the command from repository evidence

Inspect:

```text
README
development guide
build files
CI configuration
test configuration
```

Do not assume a build system.

Examples only:

```bash
mvn test
```

```bash
./gradlew test
```

```bash
npm ci && npm test
```

```bash
pytest
```

Also run:

```bash
openspec doctor
codegraph sync
git status --short
```

If `codegraph sync` is unsupported, inspect help and use the installed version's refresh command.

### Stale build output can invalidate the baseline

A build tool that skips recompilation when it believes output is current can produce a false baseline: source may be correct while previously generated output is stale and silently missing generated members. Prefer a clean rebuild when the build tool supports one. If cleanup is blocked and removing generated output is required for a trustworthy baseline, obtain explicit approval and prefer moving the generated output to a recoverable location over deleting it, then retry. Reference evidence, not a universal command: in the reference Java/Maven repository, `mvn -o test` reused stale `target/classes` missing Lombok-generated members; `mvn -o clean test` failed because the offline plugin cache lacked `maven-clean-plugin`; after approval, `target/` was moved recoverably outside the repository, and `mvn -o test` then passed with 8 tests, 0 failures, 0 errors, 0 skipped.

### Record evidence

- Every failed attempt, its diagnosis, and the recovery performed.
- Exact final command.
- Exit code.
- Tests reported.
- Warnings.
- OpenSpec result.
- CodeGraph result.
- Git status.

### Live validation record

```text
Failed attempts and diagnosis:
Recovery performed:
Baseline command:
Exit code:
Tests:
Warnings:
OpenSpec doctor:
CodeGraph refresh:
Git status:
Result: PASS / FAIL
```

---

## 17. Review and Create a Clean Local Checkpoint

**Purpose:** Preserve the adoption as a reviewable local checkpoint before starting product work.

### Safe sequence

```bash
git status --short
git diff
git diff --stat
```

Stage only intended files. Do not use unconditional `git add -A`.

Then inspect:

```bash
git diff --cached
git diff --cached --stat
git diff --cached --check
```

Save the complete staged diff so the reviewed content is reproducible: `git diff --cached > <RUN_LOG_DIR>/staged.diff`.

### Staged-scope checklist

Check the staged diff and staged file list explicitly for: application source/test code the adoption did not intentionally change; build outputs or other generated artifacts; ignored local client settings accidentally staged; CodeGraph runtime/database files; secret- or credential-shaped text; machine-specific absolute paths; unexpected file modes (in particular a symlink staged as a regular file, or vice versa); symlink targets resolving to the expected canonical path; broken symlinks; adapters for unselected clients; unstaged changes left after staging; and untracked files that reveal an incomplete step.

`git diff --cached --check` reports whitespace problems. Imported canonical SpecBoot/template material may already contain inherited, non-semantic formatting that predates this adoption — record that as a non-blocking warning and do not edit canonical imports just to normalize it. Treat a warning as a blocking defect only if it changes meaning or could affect runtime behavior in a file this adoption modified. Record the decision explicitly rather than silently normalizing every warning.

Whenever a review step above produces a correction, rerun a fresh, independent read-only review of the corrected staged diff against the full checklist above before requesting commit approval; do not treat the reviewer that made the correction as the last check.

Suggested message:

```text
chore: adopt SpecBoot workflow
```

**[HUMAN APPROVAL REQUIRED]** immediately before creating the local commit.

Do not push.

### Acceptance criteria

- Baseline passes.
- OpenSpec passes.
- CodeGraph is current.
- Diff contains only intended adoption changes.
- Staged diff reviewed and saved.
- `git diff --cached --check` results triaged as blocking or non-blocking, with the decision recorded.
- Every staged-scope checklist item above checked.
- An independent final validation ran after any correction.
- No remote mutation.

### Live validation record

```text
Branch:
Status:
Files staged:
Files excluded:
Staged diff saved to:
Staged diff reviewed:
git diff --cached --check result:
Blocking vs. non-blocking decisions:
Independent final validation performed:
Approval:
Commit:
Push performed: NO
Result: PASS / FAIL
```

---

## 18. Daily Request-to-PR-Ready Workflow

**Status:** `PENDING END-TO-END VALIDATION`

### Reusable prompt

`CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION`

```text
Implement the following request:

<REQUEST>

Take this change through the repository's configured SpecBoot and OpenSpec workflow.

Required outcome:
- create or update the OpenSpec change artifacts;
- produce proposal, specifications, design when applicable, and tasks;
- implement the approved change;
- add or update tests;
- run the repository's configured validation commands;
- review the implementation against the repository documentation;
- update API, data-model, technical documentation, and canonical specs only when affected;
- prepare the commit message and pull-request title and description.

Stop before pushing commits, creating the pull request, or performing any remote mutation.
Present the completed evidence and request approval to proceed with the pull request.
```

### Expected flow

1. Create or identify an isolated feature branch.
2. Create OpenSpec change artifacts.
3. Review proposal, specifications, design, and tasks.
4. Implement approved scope.
5. Add tests.
6. Run validation.
7. Run audit/adversarial review where appropriate.
8. Synchronize affected docs/specs.
9. Prepare commit and PR content.
10. Stop before remote mutation.
11. After approval, authorized human or client may perform the remote operation according to policy.

### Planned pilot request

```text
Fix the fallback handler in `HttpErrorHandler` so generic exceptions are handled by the declared `Exception.class` handler.

Add regression coverage proving that an unexpected exception returns HTTP 500 using the project's `Error` JSON structure.

Do not expand the scope to redesign all validation behavior or convert malformed input to HTTP 400 unless the OpenSpec artifacts explicitly justify that as a separate requirement.
```

### Pilot validation criteria

- OpenSpec artifacts created.
- Scope remains focused.
- Handler parameter corrected.
- Regression test proves unexpected exception returns 500 with project error JSON.
- Existing tests pass.
- Review completed.
- Docs/specs updated only if contracts changed.
- Commit and PR content prepared.
- No remote mutation without approval.

### Live validation record

```text
Request:
Change ID:
Artifacts:
Implementation:
Tests:
Review:
Docs/spec sync:
Commit message:
PR title:
PR description:
Remote mutation attempted: NO
Result: PASS / FAIL
Prompt corrections required:
```

---

## 19. Permission Recommendations

First-time permission configuration for each selected client is performed early, in the [Configure Selected-Client Permissions](#configure-selected-client-permissions-early-one-time) subsection at the end of Section 5, right after selected clients and their OpenSpec/CodeGraph resources are known. This section is policy and reference material for ongoing operation, not where first-time setup should happen.

Approval behavior depends on client and company policy.

### Read-only repository operations

Examples:

```text
file listing
file reading
grep
find
readlink
git status
git diff
openspec doctor
OpenSpec help/schema inspection
CodeGraph exploration
```

These may be eligible for reduced prompting only after exact command patterns are verified.

### Project-local mutations

Examples:

```text
editing documentation
editing OpenSpec configuration
creating agents
editing skills
creating symlinks
staging files
creating a local commit
```

These must remain reviewable.

### High-risk operations

Always require explicit approval:

```text
software installation or upgrade
deletion
overwrite
destructive Git commands
changes outside the repository
push
pull-request creation or modification
merge
remote mutation
credential or secret changes
```

### Reference observations

- Read-only commands sometimes requested approval.
- `find`, `grep`, CodeGraph, and OpenSpec were not universally auto-allowed.
- Broad shell write permissions were not granted.
- Remote mutation remained out of scope.
- After the Section 5 permission files were configured, a fresh Claude Code session executed 8 verified read-only commands with zero permission prompts and zero file modifications; Kiro's own permission behavior was covered separately by its later fresh-session runtime-discovery evidence.

### Live permission record

```text
Client:
Mode:
Command:
Read-only or mutation:
Prompted:
Decision:
Reason:
```

---

## 20. Prompt Inventory

### Verified historical prompts

| # | Phase | Status |
|---|---|---|
| 1 | Technical-context adaptation | `HISTORICAL PROMPT — VERIFIED VERBATIM` |
| 2 | OpenSpec configuration | `HISTORICAL PROMPT — VERIFIED VERBATIM` |
| 3 | Kiro and Claude fresh-session architecture review | `HISTORICAL PROMPT — VERIFIED VERBATIM` |
| 4 | Claude Code project-permission smoke test | `HISTORICAL PROMPT — VERIFIED VERBATIM` |

### Consolidated prompts

| # | Phase | Status |
|---|---|---|
| 1 | Technical-context adaptation | `CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS` |
| 2 | OpenSpec configuration and validation | Same label |
| 3 | Agent inspection, adaptation, and validation | Same label |
| 4 | Skill inspection, adaptation, and validation | Same label |
| 5 | Client adapter creation and filesystem validation | Same label |
| 6 | Fresh-session runtime discovery | Same label |

Each consolidated prompt is derived from executed prompts and corrective chains; it was not necessarily executed verbatim as a single block in every run.

### Pending workflow prompt

| # | Phase | Status |
|---|---|---|
| 1 | Daily request-to-PR-ready workflow | `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` |

### Historical prompt chains not recovered verbatim

```text
template-contamination correction
frontend/E2E contradiction correction
OpenSpec structure correction
YAML quoting correction
agent inspection prompt
Java/JVM agent creation prompt
Java/JVM agent generalization prompt
agent domain-neutral example correction
agent selection update prompt
agent validation prompt
skill inspection prompt
code-auditing adaptation prompt
skill dependency-resolution correction
skill validation prompt
adapter planning prompt
adapter creation prompt
adapter zsh word-splitting correction
adapter agent-eligibility correction
adapter validation prompt
permission-configuration timing correction
root-instruction symlink correction
checkpoint whitespace-triage correction
interrupted-execution recovery prompt
```

These chains are excluded from the clean reusable execution path and never appear as commands a clean adoption should execute in sequence; their verified lessons are folded into the corresponding consolidated prompt above.

---

## 21. Validation Status Table

| Capability | Reference status | Clean-run status |
|---|---|---|
| Prerequisite discovery | Partially validated | PASS |
| OpenSpec initialization for Claude Code and Kiro | Validated in reference repo | PASS |
| SpecBoot import | Validated with hidden-directory caveat | PASS |
| CodeGraph initialization and selected-client configuration | Validated for Claude and Kiro | PASS |
| Selected-client permission configuration | Not previously tracked | PASS — Claude and Kiro |
| Technical-context adaptation | Validated after corrections | PASS |
| OpenSpec configuration | Validated after corrections | PASS |
| Canonical agent adaptation/validation | Validated after corrections | PASS |
| Canonical skill adaptation/validation | Validated after corrections | PASS |
| Claude/Kiro adapter filesystem validation | Validated for Claude and Kiro | PASS |
| Claude fresh-session discovery | Pending | PASS |
| Kiro fresh-session discovery | Validated | PASS |
| Project baseline | Pending | PASS, 8 tests with zero failures/errors/skips |
| Local checkpoint | Pending | READY, explicit human commit approval still required |
| Daily request-to-PR-ready workflow | `PENDING END-TO-END VALIDATION` | Still pending end-to-end validation |

A status may be upgraded only after observed evidence is recorded. The clean-run column reflects the `experiment/specboot-adoption-clean` run; a future run must re-earn PASS with its own evidence rather than inherit this one.

---

## 22. Troubleshooting and Recovery

### Shell wildcard omits hidden directories

**Symptom:** Hidden client directories are missing after import.

**Cause:** `*` does not match dot-prefixed names.

**Recovery:** Configure client resources through OpenSpec, CodeGraph, and adapter steps.

---

### `cp -n` preserves an incompatible existing file

**Symptom:** Expected SpecBoot content does not appear.

**Cause:** `-n` prevents overwrite.

**Recovery:** Compare source and target and merge deliberately.

---

### Template stack or domain appears in docs

**Symptom:** Documentation contains unrelated TypeScript, LTI, frontend, Playwright, or template terminology.

**Recovery:** Re-run the consolidated technical-context prompt with CodeGraph, build files, source, tests, endpoints, entities, and migrations as evidence.

---

### Frontend requirements appear in a backend-only repository

**Recovery:** Preserve the frontend document but mark it not applicable. Remove unsupported browser/E2E requirements.

---

### YAML fails because a rule contains `:`

**Recovery:** Quote the affected scalar without changing its meaning, then rerun full validation.

---

### OpenSpec key unsupported by installed version

**Recovery:** Inspect `openspec --version` and `openspec --help`. Use only supported keys.

---

### Agent overwrites another stack, or a new agent is too narrow

**Symptom:** An unrelated agent was overwritten, or a newly created agent names one specific framework instead of its whole technology/runtime family.

**Recovery:** Restore the original agent. For an overly narrow agent, restore any OpenSpec selection that referenced it, then, only after explicit human approval, remove it and create the replacement scoped to the technology family instead, reading framework-specific detail from `docs/` at task time, and validate it before updating OpenSpec selection.

---

### Agent is too project-specific, or its examples leak this repository's domain

**Recovery:** Move project details into `docs/`; make the agent read them at task time. Replace only leaking example scenarios with domain-neutral examples for that technology family, preserving the agent's generic behavior, client-neutral frontmatter, and body.

---

### Skill assumes the wrong ecosystem

**Recovery:** Adapt it to detect tools from repository files and make technology-specific commands conditional.

---

### OpenSpec-generated skill directories replaced by symlinks

**Recovery:** Restore them as real directories. Use symlinks only for shared canonical skills.

---

### Filesystem validation passes but runtime discovery fails

**Cause:** Filesystem structure and runtime discovery are separate capabilities.

**Recovery:** Run the fresh-session validation and inspect root instructions, mode, native paths, and client config.

---

### Adapter created for an unselected client

**Recovery:** Remove only the unintended adapter after review, then rerun client detection.

---

### Shell-specific list expansion or word-splitting produces one malformed entry

**Symptom:** A single symlink or directory is created with a name containing spaces, instead of one per intended target.

**Cause:** List/word-splitting behavior for an unquoted, space-separated variable differs across shells (for example zsh, Bash, and PowerShell); a loop written for one shell's rules can silently iterate once instead of once per item under another.

**Recovery:** Derive loop syntax from the actual active shell, and prefer explicit per-item commands or a shell-native array/list over a space-separated scalar loop. After explicit human approval, remove only the malformed entry, then create each intended entry explicitly.

---

### Read-only commands repeatedly request permission

**Recovery:** Record exact patterns. Configure the Section 5 permission files early, and reduce prompting only for verified read-only commands.

---

### AI says a file exists, but it does not

Verify physically:

```bash
test -f <FILE>
wc -l <FILE>
grep '^## ' <FILE>
git status --short -- <FILE>
```

Never claim persistence until the filesystem confirms it.

---

### Large documentation write truncates or replaces content

**Recovery:**

1. Reject unsafe replacement when valid content exists.
2. Verify the current file physically.
3. Write from a durable source.
4. Check existence, line count, headings, and tail.
5. Commit only after full review.

---

### Prompt labeled verbatim was changed

**Recovery:** Compare character-for-character against the authoritative source. Use historical labels only for exact text.

---

## Clean-Install Working Method

For the clean validation run:

1. Create this guide and the logs before installing anything.
2. Save each prompt before submitting it.
3. Save each command before executing it.
4. Record every interactive decision immediately.
5. Record every permission prompt.
6. Record PASS, FAIL, and RECOVERY separately.
7. Do not let the AI rewrite this guide during installation.
8. Update the guide only after validating a step.
9. Preserve failed prompts in the runbook.
10. Replace a consolidated prompt only when live evidence proves a correction is needed.

Recommended companion files:

```text
SPECBOOT_ADOPTION_RUNBOOK.md
SPECBOOT_PROMPT_LOG.md
SPECBOOT_COMMAND_LOG.md
SPECBOOT_DECISION_LOG.md
specboot-terminal-session.log
```

Optional terminal capture:

```bash
script -a specboot-terminal-session.log
```

---

## Final Acceptance Criteria

The guide is ready for company reuse only when:

- Every one-time adoption step has been executed in a clean repository.
- Exact commands and interactive decisions are recorded.
- Every AI-driven step has a validated prompt.
- Prompt corrections are incorporated into the consolidated prompt.
- Kiro and Claude discovery are independently verified when both are selected.
- The project baseline passes after adoption.
- A clean local checkpoint is created.
- The daily workflow completes the HttpErrorHandler pilot through PR-ready evidence.
- No remote mutation occurs without explicit approval.
- The guide and runbook are physically present, versioned, and reviewed.
