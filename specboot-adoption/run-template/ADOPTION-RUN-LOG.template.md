# SpecBoot Adoption Run Log — Template

Copy this file for each adoption run and fill it as you go, not at the end.

Read [`../00-conventions.md`](../00-conventions.md) for the evidence discipline that governs
every field below. In short: an unexecuted or failed command is FAIL, never an inferred PASS
from empty output; record the exact command, exit code, and output summary.

**Where to keep the filled copy** is your team's choice. It can be committed alongside the
adoption as evidence, or kept local. This guide does not enforce either, and does not add a
`.gitignore` rule for it. Decide once, record the decision here, and be consistent.

---

## Run identification

```text
Repository:
Adoption date:
Operator:
Client(s) selected:
CodeGraph adopted (yes / no):
Reason if not adopted:
Guide revision used:
```

---

## Step state — resume checklist

Update this table as each step completes. An agent or operator resuming a partially
completed adoption reads this table first to determine the next step. A step is `PASS` only
when its evidence block below is filled.

| Step | File | Status (PENDING / PASS / FAIL / SKIPPED) | Date |
|---|---|---|---|
| `ADOPT-01` | `01-prerequisites-and-install.md` | PENDING | |
| `ADOPT-02` | `01-prerequisites-and-install.md` | PENDING | |
| `ADOPT-03` | `01-prerequisites-and-install.md` | PENDING | |
| `ADOPT-04` | `02-codegraph.md` (conditional) | PENDING | |
| `ADOPT-05` | `02-codegraph.md` (conditional) | PENDING | |
| `ADOPT-05B` | `03-client-permissions.md` (**mandatory**) | PENDING | |
| `ADOPT-06` | `04-context-and-openspec.md` | PENDING | |
| `ADOPT-07` | `04-context-and-openspec.md` | PENDING | |
| `ADOPT-08` | `04-context-and-openspec.md` | PENDING | |
| `ADOPT-09` | `05-agents-and-skills.md` | PENDING | |
| `ADOPT-10` | `05-agents-and-skills.md` | PENDING | |
| `ADOPT-11` | `05-agents-and-skills.md` | PENDING | |
| `ADOPT-12` | `05-agents-and-skills.md` | PENDING | |
| `ADOPT-13` | `06-adapters-and-discovery.md` | PENDING | |
| `ADOPT-14` | `06-adapters-and-discovery.md` | PENDING | |
| `ADOPT-15` | `06-adapters-and-discovery.md` (once per client) | PENDING | |
| `ADOPT-16` | `07-baseline-and-checkpoint.md` | PENDING | |
| `ADOPT-17` | `07-baseline-and-checkpoint.md` | PENDING | |

`SKIPPED` is valid only for `ADOPT-04` and `ADOPT-05`, and only when CodeGraph was not
adopted. Record the reason in the run identification block above. `ADOPT-05B` is never
`SKIPPED`.

---

## Evidence blocks


### `ADOPT-01` — Install Prerequisites

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


### `ADOPT-02` — Install and Initialize OpenSpec with Explicitly Selected Clients

```text
OpenSpec version:
Command:
Clients offered:
Clients selected:
Generated config path:
Generated client resources:
Per-client provisioning provenance (installer-provisioned vs. separately configured):
openspec doctor result:
Git changes:
Result: PASS / FAIL
```


### `ADOPT-03` — Import SpecBoot

```text
Source:
Target:
Exact command:
Files added:
Files skipped because they existed:
Hidden directories expected but not copied:
Root instruction symlinks resolve to docs/base-standards.md:
Per-client provisioning provenance (installer-provisioned vs. separately configured):
Result: PASS / FAIL
```


### `ADOPT-04` — Initialize CodeGraph

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


### `ADOPT-05` — Configure CodeGraph for the Selected Clients

```text
Command:
Clients selected:
Scope:
PATH:
Automatic allow:
Prompt front-loading:
Pro:
Generated files:
Per-client provisioning provenance (installer-provisioned vs. separately configured):
Result: PASS / FAIL
```


### `ADOPT-05B` — Selected-Client Permissions

```text
Clients selected:

-- Provisioning (ADOPT-05B Step 1) --
Source baseline located (where it came from):
Target file existed before this step? (yes / no):
Decision: COPY / MERGE, and why:
Merge conflicts resolved, and how (none if COPY):

-- Supported-environment matrix (Step 2) --
Clients supported by the project/team:
Stacks supported:
Shells supported:
Operating systems supported:

-- Reconciliation (Step 3) --
Entries removed as out-of-matrix:
Entries retained for supported environments not present on this machine:
Entries added for the real project:

-- Safety and syntax (Step 4) --
Credentials / secret-shaped text found: none / list
Personal absolute paths or home directories found: none / list
Machine-specific dependency locations found: none / list
Unsafe broad command patterns found: none / list
Client-specific syntax validation (JSON / YAML / other):

-- Smoke tests (one row per supported client/OS combination) --
Client / OS | Available? | Result (PASS / FAIL / PENDING EVIDENCE) | Reason if pending
Permission prompts triggered:
File modifications during smoke test:

-- Integrity and provenance --
Generic source baseline unchanged (confirmed):
Per-client provisioning provenance (installer-provisioned vs. separately configured):

Remaining limitations:
Result: PASS / FAIL
```

An unavailable supported combination is `PENDING EVIDENCE`, never PASS. A `Result: PASS` for
this step requires every available combination to have passed and every unavailable one to be
recorded as pending with its reason.


### `ADOPT-06` — Adapt the Repository Technical Context

```text
Prompt used:
Files changed:
Template contamination found:
Corrections needed:
Validation:
Prompt changes required:
Result: PASS / FAIL
```


### `ADOPT-07` — Configure OpenSpec to Consume docs/ and ai-specs/

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


### `ADOPT-08` — Verify OpenSpec Configuration

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


### `ADOPT-09` — Inspect and Adapt Agents

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


### `ADOPT-10` — Validate Agents

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


### `ADOPT-11` — Inspect and Adapt Skills

```text
Skills found:
Skills preserved:
Skills adapted:
Assumptions:
New dependencies:
Corrections:
Result: PASS / FAIL
```


### `ADOPT-12` — Validate Skills

```text
Canonical skill count:
Missing entry files:
Missing resources:
Unconditional stack assumptions:
Undeclared dependencies:
Generated-client content confused with canonical:
Result: PASS / FAIL
```


### `ADOPT-13` — Create Selected-Client Adapters

```text
Selected clients:
Canonical agents exposed:
Canonical skills exposed:
Symlinks:
Real directories preserved:
Unselected clients checked:
Per-client provisioning provenance (installer-provisioned vs. separately configured):
Corrections:
Result: PASS / FAIL
```


### `ADOPT-14` — Validate Adapter Files, Symlinks, and Generated Directories

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


### `ADOPT-15` — Validate Runtime Discovery in a Fresh Client Session

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


### `ADOPT-16` — Run the Project Baseline

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


### `ADOPT-17` — Review and Create a Clean Local Checkpoint

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


### Daily workflow pilot (not part of one-time adoption)

```text
Request:
Change ID:
Artifacts:
Implementation:
Tests:
enrich-us outcome (READY FOR PROPOSAL / NEEDS CLARIFICATION):
Proposal approval:
Apply result:
specboot-verify verdict (PASS / PASS WITH GAPS / FAIL):
Independent adversarial-review verdict (PASS / PASS WITH GAPS / FAIL):
Independent adversarial-review provenance (reviewing session/client; cross-session, cross-client, or same-session-fallback):
Archive approval (explicit human approval, both gates PASS/PASS WITH GAPS):
Archive result:
Docs/spec sync:
Commit message:
PR title:
PR description:
Remote mutation attempted: NO
Result: PASS / FAIL
Prompt corrections required:
```


### Permission decisions (ongoing, one row per decision)

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

## Decision record

Record every interactive decision, permission prompt, and approval as it happens.

```text
Date / step / decision / who approved / reason:
```

## Correction record

Record every failed attempt, its diagnosis, and the recovery performed. A step that passed
on the third attempt is different evidence from one that passed immediately.

```text
Step / attempt / failure / diagnosis / recovery / outcome:
```
