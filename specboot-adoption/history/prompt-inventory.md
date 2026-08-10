# Prompt Inventory and Historical Prompts

Read [`00-conventions.md`](../00-conventions.md) first.

Formerly section 20. **Historical record only.** Nothing in this file is part of the clean
reusable execution path, and no prompt here should be executed as an adoption step. Each
live step presents exactly one canonical prompt in its own phase file.

Every block labeled `HISTORICAL PROMPT — VERIFIED VERBATIM` below is preserved byte-for-byte
from the pre-restructure guide. Per the recovery entry "Prompt labeled verbatim was changed"
in [`../22-troubleshooting.md`](../22-troubleshooting.md), such text must be compared
character-for-character against its authoritative source and never edited in place.

---

### Verified historical prompts

| # | Phase | Status | Current location |
|---|---|---|---|
| 1 | Technical-context adaptation | `HISTORICAL PROMPT — VERIFIED VERBATIM` | Relocated — see [Relocated historical prompts (verbatim)](#relocated-historical-prompts-verbatim) below (originally Section 6) |
| 2 | OpenSpec configuration | `HISTORICAL PROMPT — VERIFIED VERBATIM` | Relocated — see [Relocated historical prompts (verbatim)](#relocated-historical-prompts-verbatim) below (originally Section 7) |
| 3 | Kiro and Claude fresh-session architecture review | `HISTORICAL PROMPT — VERIFIED VERBATIM` | Relocated — see [Relocated historical prompts (verbatim)](#relocated-historical-prompts-verbatim) below (originally Section 15) |
| 4 | Claude Code project-permission smoke test | `HISTORICAL PROMPT — VERIFIED VERBATIM` | **Relocated into this file** — see [Relocated during the guide restructure](#relocated-during-the-guide-restructure) below. The live step `ADOPT-05B` in [`../03-client-permissions.md`](../03-client-permissions.md) presents a **consolidated** form instead; the verbatim block is here, and appears here only |

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

Six required workflow capabilities, in order, all authored in [`../08-daily-workflow.md`](../08-daily-workflow.md) from the canonical sources (`ai-specs/specboot-instructions.md`, the three canonical skill files, `openspec/specs/specboot-verification-workflow/spec.md`):

| # | Phase | Status |
|---|---|---|
| 1 | `enrich-us` — mandatory pre-proposal refinement gate | `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` |
| 2 | `propose` — `/opsx:propose` (Claude) / `/opsx-propose` (Kiro) | `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` |
| 3 | `apply` — `/opsx:apply` (Claude) / `/opsx-apply` (Kiro) | `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` |
| 4 | `specboot-verify` — `/specboot-verify` (identical on both clients) | `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` |
| 5 | independent `adversarial-review` | `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` |
| 6 | `archive` — `/opsx:archive` (Claude) / `/opsx-archive` (Kiro) | `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` |

### Relocated historical prompts (verbatim)

These are the exact `HISTORICAL PROMPT — VERIFIED VERBATIM` blocks originally shown inline in Sections 6, 7, and 15's live path, relocated here byte-for-byte so each of those sections presents exactly one consolidated prompt, matching the pattern already used in Sections 8, 9, 11, and 13. They are historical record, not part of the clean reusable execution path — see [Historical prompt chains not recovered verbatim](#historical-prompt-chains-not-recovered-verbatim) immediately below for chains whose original text was not recovered this precisely.

#### Section 6 — Adapt the Repository Technical Context (relocated historical prompt)

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

#### Section 7 — Configure OpenSpec to Consume docs/ and ai-specs/ (relocated historical prompt)

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

#### Section 15 — Validate Runtime Discovery in a Fresh Client Session (relocated historical prompt and correction narrative)

`HISTORICAL PROMPT — VERIFIED VERBATIM`

```text
Review the backend architecture of this repository and identify the most important implementation risk. Use the repository's configured agents and skills where appropriate. Do not modify files.
```

Relocated "Observed Kiro result" correction narrative (reference-run correction evidence, not a live step):

- Loaded `AGENTS.md`.
- Loaded `code-auditing`.
- Read `java-backend-developer.md`.
- Consumed project documentation.
- Identified the `HttpErrorHandler` fallback as the primary risk.
- Modified no files.
- Kiro's own self-report initially labeled discovery FAIL because documentation and tests were opened manually during analysis; under Section 15's interpretation rules, that is expected manual task execution, not a discovery failure, so the corrected result is PASS. Claude Code independently reached the same primary risk in a separate fresh session, with the agent roster, skill catalog, and CodeGraph automatically discovered and no files modified.

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

---

## Relocated during the guide restructure

One further `HISTORICAL PROMPT — VERIFIED VERBATIM` block was relocated here when the guide
was split into `specboot-adoption/`: the Claude Code project-permission smoke test, which
the pre-restructure guide kept live in its section 5. It is preserved byte-for-byte below.

The live step `ADOPT-05B` in [`../03-client-permissions.md`](../03-client-permissions.md)
now presents a consolidated form instead, which parameterizes the OpenSpec config path
(`openspec/config.yaml` or `openspec/config.yml`), makes the CodeGraph query conditional on
CodeGraph actually being adopted, and states the FAIL discipline explicitly. This keeps the
"exactly one canonical prompt per step, never a historical one" rule that every other step
already follows.

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

The historical form's trailing note read: "Adjust `openspec/config.yaml` to the actual
generated path (`openspec/config.yml`) when different."
