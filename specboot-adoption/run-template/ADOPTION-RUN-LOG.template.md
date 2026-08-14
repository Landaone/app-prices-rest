# SpecBoot Adoption Run Log — Template

Copy this file for each adoption run and fill it as you go, not at the end.

Read [`../00-conventions.md`](../00-conventions.md) for the evidence discipline that governs
every field below. In short: an unexecuted or failed command is FAIL, never an inferred PASS
from empty output; record the exact command, exit code, and output summary.

**Where to keep the filled copy** is decided: `.specboot/adoption/ADOPTION-RUN-LOG.md`,
**committed**. AI-driven resume needs a deterministic path — the orchestrator reads the step-state
table below to name the next step, and it cannot do that if the location varies per team. It sits
beside the committed `BOOTSTRAP-MANIFEST.json`, and `.specboot/adoption/` is deliberately **not**
git-ignored, unlike the transient `.specboot/bootstrap/` and `.specboot/staging/` paths.

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

## Source and delivery mode

The run's identity. **Identity is the checksums, and it is the only thing identity can be** — no
resolved path is recorded anywhere in this log.

```text
Delivery mode:                              source-linked
Guide checksum   (SPECBOOT_ADOPTION_GUIDE.md):
Skill checksum   (ai-specs/skills/specboot-adopt/SKILL.md):
Git worktree state:                         clean / dirty / not-a-repository
Git status:                                 recorded / unavailable
Source Git commit:                          (ONLY when worktree is clean AND status is recorded)
Git unavailable — reason:                   (required whenever status is unavailable; never inferred)
Observed HEAD (dirty worktree only):        (CONTEXT ONLY — does not identify the source content)
Local source path resolution:               The local canonical source path is resolved per machine
                                            and is not recorded here.
Source treated as read-only for the whole adoption (YES / NO):
```

**Git provenance has three dispositions, never two.** Fill exactly one row:

| Source state | `worktree` | `status` | Also fill |
|---|---|---|---|
| not a Git working tree | `not-a-repository` | `unavailable` | the reason |
| Git working tree, **clean** | `clean` | `recorded` | the commit |
| Git working tree, **uncommitted changes** | `dirty` | `unavailable` | the reason; optionally the observed HEAD |

**A dirty working tree has content that no commit identifies.** HEAD names what was committed; the
run read something else. Recording that commit as identity is *precisely wrong* — worse than
leaving it out, because a later reader can resolve it, diff nothing, and conclude the source
matched. Where the observed HEAD is recorded at all it goes on its own line, labelled as context,
and never on the commit line. **The checksums stay correct in all three cases**, because they are
computed over the bytes actually read.

**There is no field for a resolved absolute source path, and none may be added.** This run log is
committed by design, so a path written here would travel into every clone of the repository — and a
label calling it machine-specific would not make committing it portable. Where a run needs the path
afterwards it is kept only in machine-local, git-ignored state under `.specboot/local/`, holding
the path and nothing else, and `ADOPT-18` removes it.

**"Unavailable" is a recorded value, not a blank.** A source that is not a Git working tree records
that fact with its reason. Leaving the line empty invites a later reader to fill it with something
plausible.

### Drift check at each resume

One row per resume, including the one that follows the initial session's handoff. A mismatch is
**drift**: stop for human reconciliation rather than continuing against changed instructions.
Record where the local source path came from — never the path itself.

| Resumed at (date/time) | Local path obtained from (machine-local store / operator / rediscovery) | Guide checksum matches | Skill checksum matches | Commit matches | Verdict | Reconciliation decision |
|---|---|---|---|---|---|---|
| | | YES / NO | YES / NO | YES / NO / N/A | MATCH / **DRIFT** | |

**Reuse is not trust.** A resume that read the path from the machine-local store still recomputes
and compares both checksums; the store is a convenience pointer, never evidence of identity.

Having no local path here is **not** drift and **not** a failure — it is the ordinary case on any
machine but the one that ran `ADOPT-00`, and on the same machine after `ADOPT-18`. Obtain one by
asking or rediscovering; it is accepted only when the checksums (and the recorded commit, where one
exists) match.

---

## Client selection

Selection is **declared by a human, never inferred** from a directory on disk.

```text
Route used (manual / autodiscovery):
```

| Client | Displayed as a candidate by autodiscovery | Explicitly SELECTED by the human | Recorded status |
|---|---|---|---|
| Claude | YES / NO / n/a | YES / NO | SELECTED / NOT SELECTED |
| Kiro | YES / NO / n/a | YES / NO | SELECTED / NOT SELECTED |
| Codex | YES / NO / n/a | YES / NO | SELECTED / NOT SELECTED |

**An autodiscovery finding is never recorded as a selection.** The two columns are separate
precisely so the difference between what was seen and what was chosen survives in the record. A
client that was displayed but not selected is `NOT SELECTED`, never `PENDING EVIDENCE`.

Where autodiscovery ran: confirm the repository tree was **byte-for-byte unchanged** when the
findings were displayed (the probe writes nothing): YES / NO

Where autodiscovery found nothing: confirm that was treated as a finding and the operator was still
asked, rather than the run proceeding with no client: YES / NO

### Two axes, never collapsed

A client carries **two independent statuses**, and reading either one as the other is the mistake
this block exists to prevent:

| Axis | Question it answers | Where it lives |
|---|---|---|
| **This adoption** | did *this run* select it? | the table above — `SELECTED` or `NOT SELECTED` |
| **The shipped recipe** | has its discovery-and-execution gate ever been observed to pass? | the recipe's own record, carried forward across adoptions |

`SELECTED` + `PENDING EVIDENCE` blocks **the adoption that selected it**, and no other. A client this
run recorded `NOT SELECTED` cannot block it, whatever its recipe status — nothing was provisioned,
nothing validated, nothing owed.

| Client | This adoption | Recipe status | Effect on this run |
|---|---|---|---|
| Claude | SELECTED / NOT SELECTED | | |
| Kiro | SELECTED / NOT SELECTED | | |
| Codex | SELECTED / NOT SELECTED | **`PENDING EVIDENCE`** — gate parts 1–2 complete; part 3, the fresh-session discovery-and-execution test, **not observed** | none when NOT SELECTED |

**Codex's outstanding obligation is not discharged by a run that did not select it.** A successful
adoption with a different client leaves it exactly where it was: still `PENDING EVIDENCE`, still
owed, never converted to PASS and never quietly dropped. Recording it as PASS on the strength of an
unrelated run would claim evidence nobody produced.

---

## Step state — resume checklist

Update this table as each step completes. An agent or operator resuming a partially
completed adoption reads this table first to determine the next step. A step is `PASS` only
when its evidence block below is filled.

| Step | File | Status (PENDING / PASS / FAIL / SKIPPED) | Date |
|---|---|---|---|
| `ADOPT-00` | `09-bootstrap.md` | PENDING | |
| `ADOPT-01` | `01-prerequisites-and-install.md` | PENDING | |
| `ADOPT-02` | `01-prerequisites-and-install.md` | PENDING | |
| `ADOPT-03` | `01-prerequisites-and-install.md` | PENDING | |
| `ADOPT-04` | `02-codegraph.md` (**mandatory**) | PENDING | |
| `ADOPT-05` | `02-codegraph.md` (**mandatory**) | PENDING | |
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
| `ADOPT-18` | `10-debootstrap.md` | PENDING | |
| `ADOPT-19` | `11-e2e-pilot-and-pr-gate.md` | PENDING | |
| `ADOPT-20` | `11-e2e-pilot-and-pr-gate.md` | PENDING | |

`SKIPPED` is valid only for `ADOPT-00` (repository already carried SpecBoot files and AI
configuration) and `ADOPT-18` (`SKIPPED — no bootstrap performed`). Record the reason in the run
identification block above.

**`ADOPT-04` and `ADOPT-05` can no longer be `SKIPPED`.** A code-graph capability is mandatory:
CodeGraph is optional only as the product choice, and no usable capability is **FAIL**, not a skip
and not `PENDING EVIDENCE`. `ADOPT-05B` is never `SKIPPED`.

---

## Evidence blocks


### `ADOPT-00` — Bootstrap Client Discovery

- Repository had SpecBoot files / AI configuration before this step: YES / NO
- **Cold-start state confirmed** (no SpecBoot files, no OpenSpec, no `/opsx:*` commands, no
  discoverable `specboot-adopt` skill, no `.specboot/`): YES / NO
- **Canonical source supplied** (runtime input; record the checksums and Git disposition in the
  *Source and delivery mode* block above — the resolved path is recorded nowhere in this log):
  SUPPLIED / NONE — *a validated source is a precondition; NONE is a refusal, not a fallback*
- **Three-artifact validation, run before any orchestration load and before the first write:**
  - `SPECBOOT_ADOPTION_GUIDE.md` present: YES / NO
  - `specboot-adoption/` present: YES / NO
  - `ai-specs/skills/specboot-adopt/SKILL.md` present **and readable as a file**: YES / NO
  - Verdict: VALID / REJECTED — missing:
  - If REJECTED, target repository left byte-for-byte unchanged (zero writes): YES / NO
- **Refusals reached** (each must leave the target repository byte-for-byte unchanged — record
  NONE where the run proceeded):
  - No canonical source supplied: NONE / REFUSED — reported:
  - Supplied source failed the three-artifact validation: NONE / REFUSED — reported:
  - No client selected: NONE / REFUSED — reported:
  - Selected client has no recipe: NONE / REFUSED — reported (must name the supported clients):
  - Selected client cannot discover the external skill without symlinks: NONE / REFUSED —
    reported (client, mechanism its recipe requires, what was attempted):
  - For every REFUSED row above: target repository byte-for-byte unchanged, with no `.specboot/`,
    discovery entry, manifest, run log, ignore rule, or machine-local store: YES / NO
- **Orchestration procedure obtained by a source-relative direct read of `SKILL.md`** (a direct
  read, **not** native skill discovery): YES / NO — path read (source-relative):
- **Client-selection route** (record the detail in the *Client selection* block above):
  manual / autodiscovery
- Selected client(s) (**declared by the operator, never inferred**):
- Every other supported client recorded `NOT SELECTED` (never blank, never `PENDING EVIDENCE`):
- OS / shell:
- Symlink probe result (capability-detected, not assumed): SUPPORTED / UNAVAILABLE — reason:
- Pre-existing artifacts detected, and their disposition:
- Manifest entry count:
- **Preflight, run before the first write** — every target path resolved and classified, with
  **all** collisions reported together rather than one failed write at a time:
  - Paths resolved and their classification (absent / pre-existing-untouched / colliding):
  - Collisions detected (all of them, or NONE):
- **Exact mutation inventory presented at the approval gate** — for every path: created or
  modified, by what mechanism, and whether reversible:
- **Provisioning performed exactly that inventory and nothing outside it:** YES / NO
- **Provisioning failure, if any** — pre-provisioning state restored with no partial discovery
  entry, manifest, run log, ignore rule, or machine-local store: N/A / RESTORED / **FAIL**
- **Obligations recorded** — payload: `SKIPPED — source-linked mode`;
  container: `SKIPPED — source-linked mode` (never blank, never inferred as PASS):
- `.specboot/bootstrap/` never created at any point: YES / NO
- No copied guide, phase file, or skill body anywhere in the project: YES / NO
- Discovery entries point at the external canonical source, and none was staged for any checkpoint
  (machine-specific entries are never committed): YES / NO
- Machine-local `.specboot/local/` store holds the resolved path and nothing else, and
  `git check-ignore` reports it ignored: YES / NO
- Client-selection record carries no placeholder (`undeclared` or equivalent is a FAIL): YES / NO
- **Session stopped after provisioning and generated the fresh-session handoff prompt** (rather
  than continuing into the adoption steps): YES / NO — handoff prompt generated, verbatim:
- **No OpenSpec or `/opsx:*` command used before `ADOPT-02` completed and its availability check
  passed** (absence of OpenSpec here is the expected cold-start state): YES / NO
- `git check-ignore .specboot/bootstrap/…` verdict (expect IGNORED — provisioned unconditionally
  as a property of the installer, though no run creates the path):
- `git check-ignore .specboot/local/…` verdict (expect IGNORED):
- `git check-ignore .specboot/adoption/…` verdict (expect NOT ignored):
- No bare `.specboot/` rule written: YES / NO
- Fresh-session discovery probe — exact prompt used:
- Fresh-session outcome, verbatim (presence on disk is **not** discovery, and the source-relative
  direct read above is **not** discovery — native discovery is attempted only in this fresh
  session):
- Fresh session resumed from the durable manifest and run log, with source identity verified:
  YES / NO
- Approval (who, when, exactly what was approved):
- Result: PASS / FAIL / SKIPPED — reason:

---

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


### `ADOPT-18` — De-bootstrap and Reconcile Client Artifacts

- Manifest read from `.specboot/adoption/BOOTSTRAP-MANIFEST.json`: YES / NO
- Entry count by `ownership` (bootstrap-created / pre-existing-modified / pre-existing-untouched):
- Every `intended-permanent-replacement` verified to exist and resolve **before** removal: YES / NO
- Entries removed / converted / retained-with-reason:
- `pre-existing-untouched` entries touched (must be NONE):
- **Delivery mode read from the manifest:** source-linked *(a manifest recording
  `packaged-snapshot` predates the deferral and is read as history, not re-interpreted)*
- **Payload obligation:** `SKIPPED — source-linked mode` (never blank, never inferred as PASS)
- **Container obligation:** `SKIPPED — source-linked mode` (never blank, never inferred as PASS)
- `.specboot/bootstrap/` never created at any point in the run: YES / NO
- Project-local discovery entries removed, and every file a delimited block was appended to
  **byte-restored** (not merely trimmed): YES / NO
- Machine-local `.specboot/local/` store removed (or already absent), while the committed manifest
  and run log were **preserved**: YES / NO
- External canonical source **byte-identical**, file for file, to its pre-run state: YES / NO
- No manifest entry describes the source or any path inside it: YES / NO
- **Refusals reached** (record NONE where the step completed):
  - Unresolved `intended-permanent-replacement`: NONE / **FAIL** — entry left in place, named:
  - Unrecorded content in scope for removal: NONE / **FAIL** — residue named, neither it nor its
    container removed:
  - For every FAIL row: entries already dispositioned kept their terminal values, entries not
    reached stayed `pending`, and the durable manifest and run log were preserved so another
    session can resume: YES / NO
- `.specboot/adoption/` present and committed: YES / NO
- Artifacts removed for unselected or unverified clients:
- Broken-symlink scan (`find -L … -type l`, expect empty):
- Root instruction symlinks all resolve to `docs/base-standards.md`: YES / NO
- `ADOPT-14` re-validation: PASS / FAIL
- `ADOPT-15` re-validation (fresh session, per selected client): PASS / FAIL / PENDING EVIDENCE
- Every entry carries a terminal `cleanup-status` and `final-disposition` (an entry left
  `pending` is **FAIL**, not a partial PASS): YES / NO
- Approval (deletion is high-risk and always requires explicit approval):
- Result: PASS / FAIL / SKIPPED — no bootstrap performed

---

### `ADOPT-19` — Real-Project End-to-End Pilot

- Pilot task, **named by the human**:
- Pilot change name:
- `enrich-us` → `READY FOR PROPOSAL`: PASS / FAIL
- propose: PASS / FAIL
- apply: PASS / FAIL
- tests: PASS / FAIL
- `specboot-verify`: PASS / PASS WITH GAPS / FAIL
- `adversarial-review`: PASS / PASS WITH GAPS / FAIL — reviewer provenance (session/client):
- docs and spec sync: PASS / FAIL
- archive (both verdicts plus explicit human approval): PASS / FAIL
- Deviations encountered and their recovery:
- Result: PASS / FAIL

> Evidence for the six capabilities is recorded in the **Daily workflow pilot** block below —
> that block is the sink for this step, not a parallel record.

---

### `ADOPT-20` — Pull-Request Readiness Gate

Per-step confirmation from **recorded evidence**. An empty evidence block blocks readiness: it
means "not known to have completed", never "completed but unrecorded".

| Step | Recorded status | Evidence pointer |
|---|---|---|
| `ADOPT-00` … `ADOPT-19` | | |

- Any row at FAIL, PENDING, or blank (must be NONE):
- Readiness verdict: READY / BLOCKED — reason:
- Approval:
- Pull request created (identifier), if any:

---

## Checkpoint ledger

One row per checkpoint. A checkpoint is the smallest independently validated `ADOPT` step; a
group requires a **written structural justification** — "fewer commits" is not one.

| # | Step or group | Grouping justification (required if a group) | Validation | Evidence pointers | Ready declared | Approval (who / when / what) | Exact staged file list | Commit SHA | Remote-impact assessment + verdict | Push status | Improvement proposals raised |
|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | |

> The commit approval and the push approval are **two distinct gates**. Neither carries forward to
> the next checkpoint. Unknown or unapproved remote impact **blocks** the push; "no CI
> configuration found" is a finding to report, not a licence to push.

---

## Improvement proposals

Raised after each validated checkpoint. **Never applied during the adoption run** — the guide is
not rewritten mid-installation; accepted proposals go through the normal OpenSpec change workflow.

| # | Checkpoint | Target file | Proposal | Status (`proposed` / `accepted` / `rejected` / `applied-in-change-<id>`) |
|---|---|---|---|---|
| | | | | |

---

## Client- and company-specific adaptations

| # | Adaptation | Reason | Blast radius (which steps or artifacts it affects) |
|---|---|---|---|
| | | | |

---

## Code-graph capability selection

- Selected implementation (CodeGraph, or the named company-approved equivalent):
- Version:
- Verification command executed, with exit code and output summary:
- Coverage limitations (for example unsupported languages):
- Result: PASS / **FAIL — adoption stops** (no waiver, no skip, no `PENDING EVIDENCE`)

---

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
