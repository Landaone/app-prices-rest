# SpecBoot Adoption Run Log

Filled copy for this adoption run. Filled as the run goes, not at the end.

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
Repository:                     app-prices-rest (linked worktree, branch experiment/specboot-ai-adoption-v7)
Adoption date:                  2026-08-25
Operator:                       Landaone
Client(s) selected:             claude   (kiro: NOT SELECTED, codex: NOT SELECTED)
CodeGraph adopted (yes / no):   PENDING - decided at ADOPT-04/ADOPT-05
Reason if not adopted:          n/a - not yet reached
Guide revision used:            source commit b457914c168de2548e10c02411462e8d1ad52d6d
```

---

## Source and delivery mode

The run's identity. **Identity is the checksums, and it is the only thing identity can be** — no
resolved path is recorded anywhere in this log.

```text
Delivery mode:                              source-linked
Guide checksum   (SPECBOOT_ADOPTION_GUIDE.md):
  sha256:2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0
Skill checksum   (ai-specs/skills/specboot-adopt/SKILL.md):
  sha256:2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3
Git worktree state:                         clean
Git status:                                 recorded
Source Git commit:                          b457914c168de2548e10c02411462e8d1ad52d6d
Git unavailable — reason:                   n/a — status is 'recorded'
Observed HEAD (dirty worktree only):        n/a — worktree is clean
Local source path resolution:               The local canonical source path is resolved per machine
                                            and is not recorded here.
Source treated as read-only for the whole adoption (YES / NO): YES
```

**Source moved during the initial session — recorded as observation, not drift.** The source HEAD
was `249ad6fbbd7662a61dbae4b3767bbcae0aa15a6d` when this session first read the phase files, and
`b457914c168de2548e10c02411462e8d1ad52d6d` when the run was restarted at the operator's request
after the first mutation gate was DECLINED. **Both identity checksums above were byte-identical
across the two observations.** The only differing file was `specboot-adoption/00-conventions.md`
(+18 lines, "add compaction guidance for the bounded per-step working set"), which was re-read at
the current commit before provisioning. No manifest existed at the earlier commit, so there was no
recorded identity to drift from.

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
| 2026-08-25T18:21:27Z | machine-local store (`.specboot/local/canonical-source-path`) | YES | YES | YES | MATCH | n/a — no drift; resume continued |

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
Route used (manual / autodiscovery): autodiscovery
```

| Client | Displayed as a candidate by autodiscovery | Explicitly SELECTED by the human | Recorded status |
|---|---|---|---|
| Claude | NO — no `.claude/`, `.claude/skills/`, `.claude/settings.json`, `CLAUDE.md` | YES | SELECTED |
| Kiro | NO — no `.kiro/`, `.kiro/skills/`, `.kiro/settings/` | NO | NOT SELECTED |
| Codex | NO — no `.agents/`, `.agents/skills/`, `AGENTS.md`, `codex.md` | NO | NOT SELECTED |

The probe displayed **no** candidates. Claude was selected by the operator despite not being found
on disk — a selection, never a finding.

**An autodiscovery finding is never recorded as a selection.** The two columns are separate
precisely so the difference between what was seen and what was chosen survives in the record. A
client that was displayed but not selected is `NOT SELECTED`, never `PENDING EVIDENCE`.

Where autodiscovery ran: confirm the repository tree was **byte-for-byte unchanged** when the
findings were displayed (the probe writes nothing): YES — verified by `git status --porcelain`
(empty) plus a full `ls -a` listing taken before and after; the probe issued existence reads only.

Where autodiscovery found nothing: confirm that was treated as a finding and the operator was still
asked, rather than the run proceeding with no client: YES — the empty result was displayed in the
canonical format with its question attached, and the operator selected `claude` explicitly.

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
| Claude | SELECTED | supported | its discovery-and-execution gate must PASS for this run |
| Kiro | NOT SELECTED | supported | none — nothing provisioned, validated, or owed |
| Codex | NOT SELECTED | **`PENDING EVIDENCE`** — gate parts 1–2 complete; part 3, the fresh-session discovery-and-execution test, **not observed** | none when NOT SELECTED |

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
| `ADOPT-00` | `09-bootstrap.md` | PASS | 2026-08-25 — provisioned; fresh-session discovery probe observed PASS |
| `ADOPT-01` | `01-prerequisites-and-install.md` | PASS | 2026-08-25 — all prerequisites already present; no install, gate not reached |
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

- Repository had SpecBoot files / AI configuration before this step: NO
- **Cold-start state confirmed** (no SpecBoot files, no OpenSpec, no `/opsx:*` commands, no
  discoverable `specboot-adopt` skill, no `.specboot/`): YES — every probed path absent:
  `.claude/`, `.claude/skills/`, `.claude/settings.json`, `CLAUDE.md`, `.kiro/`, `.kiro/skills/`,
  `.kiro/settings/`, `.agents/`, `.agents/skills/`, `AGENTS.md`, `codex.md`, `.specboot/`.
- **Canonical source supplied**: SUPPLIED — checksums and Git disposition are in the *Source and
  delivery mode* block above; the resolved path is recorded nowhere in this log.
- **Three-artifact validation, run before any orchestration load and before the first write:**
  - `SPECBOOT_ADOPTION_GUIDE.md` present: YES (readable file)
  - `specboot-adoption/` present: YES (directory)
  - `ai-specs/skills/specboot-adopt/SKILL.md` present **and readable as a file**: YES
  - Verdict: VALID — missing: none. (The launcher's fourth check,
    `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`, was also present and readable.)
  - If REJECTED, target repository left byte-for-byte unchanged (zero writes): n/a — not rejected
- **Refusals reached**:
  - No canonical source supplied: NONE
  - Supplied source failed the three-artifact validation: NONE
  - No client selected: NONE
  - Selected client has no recipe: NONE — `claude` has a recipe at
    `specboot-adoption/bootstrap-kit/discovery/claude.md`
  - Selected client cannot discover the external skill without symlinks: NONE — the symlink probe
    SUCCEEDED, so this branch was not reached
  - For every REFUSED row above: n/a — no refusal was reached in the provisioning run
- **Operator DECLINED the first mutation gate; that decline was honoured with zero writes.** An
  earlier pass of this same step reached the `[HUMAN APPROVAL REQUIRED]` gate and the operator
  answered "No apruebo — detente". Nothing was provisioned. Verified afterwards:
  `git status --porcelain` empty, `.claude/` absent, `.specboot/` absent, no symlink-probe residue,
  `.gitignore` and `.git/info/exclude` at their original checksums, and the canonical source
  byte-identical. The operator then asked to restart the process; this run is that restart, and it
  re-ran Step 0, the four-artifact validation, the resume check, autodiscovery, the environment
  detection and the full preflight from scratch rather than reusing the declined pass.
- **Orchestration procedure obtained by a source-relative direct read of `SKILL.md`** (a direct
  read, **not** native skill discovery): YES — path read (source-relative):
  `ai-specs/skills/specboot-adopt/SKILL.md`
- **Client-selection route**: autodiscovery
- Selected client(s) (**declared by the operator, never inferred**): claude
- Every other supported client recorded `NOT SELECTED`: kiro — NOT SELECTED; codex — NOT SELECTED
- OS / shell: macOS 13.7.8 (Darwin 22.6.0 x86_64) / zsh
- Symlink probe result (capability-detected, not assumed): SUPPORTED — `ln -s . .specboot-symlink-probe`
  succeeded and `rm -f` removed it; `ls -a` plus `git status --porcelain` were identical before and
  after, so the probe left no residue. `symlinkDetermination: capability-detected`.
- Pre-existing artifacts detected, and their disposition: none of the client or `.specboot/` paths
  existed. `.gitignore` and `.git/info/exclude` pre-existed and were modified by delimited block
  (`ownership: pre-existing-modified`); no pre-existing content was overwritten or removed.
- Manifest entry count: 5
- **Preflight, run before the first write**:
  - Paths resolved and their classification: `absent` — `.claude/`, `.claude/skills/`,
    `.claude/skills/specboot-adopt`, `.claude/CLAUDE.md`, `.specboot/`, `.specboot/adoption/`,
    `.specboot/adoption/BOOTSTRAP-MANIFEST.json`, `.specboot/adoption/ADOPTION-RUN-LOG.md`,
    `.specboot/adoption/ADOPTION-AUTHORIZATION.md`, `.specboot/local/`,
    `.specboot/local/canonical-source-path`. `pre-existing` (modified by delimited block) —
    `.gitignore`, `.git/info/exclude`.
  - Collisions detected (all of them, or NONE): NONE
  - **Shared-`exclude` check (design D-Z, part 29).** This repository is a **linked worktree**;
    `.git/info/exclude` resolves to the *common* Git directory and is shared with the main
    checkout. `git check-ignore` was run for every needed rule **before** writing and all returned
    `rc=1` (NOT ignored), so no rule was already in effect and none was duplicated. The operator
    was shown this and explicitly accepted the shared edit at the gate.
- **Exact mutation inventory presented at the approval gate** — 9 paths:
  1. `.claude/`, `.claude/skills/` — create — implicit parent directories — reversible
  2. `.claude/skills/specboot-adopt` — create — symlink to the external canonical
     `ai-specs/skills/specboot-adopt` (`machineLocal: true`, never committed) — reversible (unlink)
  3. `.claude/CLAUDE.md` — create — real-file carrying the recipe's verbatim `SPECBOOT-BOOTSTRAP`
     block — reversible (block removed at `ADOPT-18`)
  4. `.specboot/adoption/ADOPTION-RUN-LOG.md` — create — filled template, written first —
     preserved by `ADOPT-18`
  5. `.specboot/adoption/BOOTSTRAP-MANIFEST.json` — create — schema-conformant JSON, 5 entries —
     preserved by `ADOPT-18`
  6. `.specboot/adoption/ADOPTION-AUTHORIZATION.md` — create — filled template — preserved
  7. `.specboot/local/canonical-source-path` — create — the path and nothing else, git-ignored,
     `machineLocal: true` — reversible (`ADOPT-18`)
  8. `.gitignore` — modify — delimited block (`.specboot/bootstrap/`, `.specboot/local/`) plus one
     durable line `.specboot/staging/` **outside** the block — partially reversible: `ADOPT-18`
     removes only the block, and `.specboot/staging/` is permanent by design
  9. `.git/info/exclude` (shared with the main checkout) — modify — delimited block containing
     `.claude/skills/specboot-adopt` — reversible (`ADOPT-18`)
- **Provisioning performed exactly that inventory and nothing outside it:** YES
- **Provisioning failure, if any**: N/A — provisioning completed
- **Obligations recorded** — payload: `SKIPPED — source-linked mode`;
  container: `SKIPPED — source-linked mode`
- `.specboot/bootstrap/` never created at any point: YES
- No copied guide, phase file, or skill body anywhere in the project: YES
- Discovery entries point at the external canonical source, and none was staged for any checkpoint:
  YES — `.claude/skills/specboot-adopt` resolves to the external source and is excluded from
  staging via `.git/info/exclude`
- Machine-local `.specboot/local/` store holds the resolved path and nothing else, and
  `git check-ignore` reports it ignored: YES
- Client-selection record carries no placeholder: YES — `selected: ["claude"]`,
  `notSelected: ["kiro","codex"]`; no `undeclared` or equivalent anywhere
- **Manifest validation method used** (a JSON-Schema validator is not guaranteed to exist before
  `ADOPT-01`): **structural conformance check** — no validator was available (`python3 -c "import
  jsonschema"` → ModuleNotFoundError; `ajv` absent; `check-jsonschema` absent), and installing one
  here would sit behind `ADOPT-01`'s own approval gate. 119 structural checks ran — every required
  key present, every enum value one of the schema's declared options, every field's type correct,
  `additionalProperties: false` honored on the `source` block, and the `git` conditional
  constraints enforced. Verdict: CONFORME, exit 0.
- **Session stopped after provisioning and generated the fresh-session handoff prompt**: YES —
  handoff prompt generated, verbatim: see the *Handoff prompt* block at the end of this evidence
  block.
- **No OpenSpec or `/opsx:*` command used before `ADOPT-02` completed and its availability check
  passed**: YES — no OpenSpec or `/opsx:*` command was issued at any point in this session
- `git check-ignore .specboot/bootstrap/…` verdict: IGNORED
- `git check-ignore .specboot/local/…` verdict: IGNORED
- `git check-ignore .specboot/adoption/…` verdict: NOT ignored (correct — the durable record is committed)
- No bare `.specboot/` rule written: YES — the rules written are `.specboot/bootstrap/`,
  `.specboot/local/` and `.specboot/staging/`, each a distinct subpath
- Fresh-session discovery probe — exact prompt used: the *Handoff prompt* block below was executed
  verbatim as the opening operator message of a genuinely fresh session (this session). Within it,
  the probe itself was the native skill invocation `Skill(skill="specboot-adopt")` — the skill named
  **by name only**, with no operator-supplied path, no filesystem path argument, and no direct read
  of the skill body. Filesystem presence was not used as discovery.
- Fresh-session outcome, verbatim: the invocation returned `Launching skill: specboot-adopt`, and
  the client loaded the skill body, announcing its resolved base directory as
  `<repo>/.claude/skills/specboot-adopt` and rendering `SKILL.md` in full — heading `# SpecBoot
  Adopt`, the `## Overview`, `## Quick Reference`, `## Non-negotiables` (10 items), `## Common
  Mistakes`, `## Red Flags`, and the closing `**REQUIRED SUB-SKILL:**` line naming `enrich-us`,
  `specboot-verify`, `adversarial-review`. The resolved base directory is the bootstrap symlink,
  so discovery reached the **external canonical skill**, not a copy. **Discovery-and-execution
  gate: PASS for client `claude`.** Clients `kiro` and `codex` are NOT SELECTED and were not
  probed — no rows.
- Fresh session resumed from the durable manifest and run log, with source identity verified: YES.
  This session read `ADOPTION-RUN-LOG.md`, `BOOTSTRAP-MANIFEST.json` and `ADOPTION-AUTHORIZATION.md`
  before acting, obtained the local canonical source path from the machine-local store
  `.specboot/local/canonical-source-path` (recorded in the drift-check table above; the path itself
  is not recorded anywhere in this log), and recomputed both identity checksums with
  `shasum -a 256`, exit 0: guide
  `2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0` (MATCH), skill
  `2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3` (MATCH),
  `git -C <source> rev-parse HEAD` = `b457914c168de2548e10c02411462e8d1ad52d6d` (MATCH),
  `git -C <source> status --porcelain` empty (source worktree clean, and therefore byte-identical
  before and after — this run performed no write to the canonical source).
- Acceptance criteria re-verified in this fresh session, each from live command output:
  `.specboot/bootstrap/` **ABSENT** (never created); no copied canonical content anywhere in the
  project (`.claude/skills/specboot-adopt` is a symlink, `readlink` resolves to the external
  canonical `ai-specs/skills/specboot-adopt`); payload obligation `SKIPPED — source-linked mode`;
  container obligation `SKIPPED — source-linked mode`; `git check-ignore` →
  `.specboot/bootstrap/` IGNORED, `.specboot/local/` IGNORED, `.specboot/adoption/` NOT ignored;
  `.claude/skills/specboot-adopt` IGNORED via the main checkout's `info/exclude`
  (worktree note: `.git` is a file here, so the rule lives at `$(git rev-parse
  --git-common-dir)/info/exclude`) — so the absolute-external-path discovery entry **cannot** be
  staged; `.claude/CLAUDE.md` NOT ignored (correct — `machineLocal: false`)
- Approval (who, when, exactly what was approved): Landaone, at the `ADOPT-00` mutation gate on
  2026-08-25, approved the exact 9-path mutation inventory listed above and nothing outside it, and
  in the same gate granted standing commit-and-push authorization for this run (recorded in
  `ADOPTION-AUTHORIZATION.md`). An earlier gate presentation on the same date was DECLINED and
  honoured with zero writes.
- Result: **PASS** — provisioning was complete at the initial session; the fresh-session
  discovery-and-execution probe has now been observed in this session and recorded verbatim above,
  and every acceptance criterion was re-verified from live command output. The gate's evidence now
  exists.

#### Handoff prompt (verbatim, generated by this session)

```text
Resume the SpecBoot adoption in this repository.

Durable state already exists. Read it first, and resume from it — do not restart from a launcher
and do not re-ask anything it already records:

  .specboot/adoption/ADOPTION-RUN-LOG.md
  .specboot/adoption/BOOTSTRAP-MANIFEST.json
  .specboot/adoption/ADOPTION-AUTHORIZATION.md

Then follow section 8 of the canonical entry prompt, "Step 7, in the fresh session":

1. Resume from the manifest and the run log. The client selection recorded there is binding.
2. Obtain a local canonical source path: read .specboot/local/canonical-source-path if it exists
   on this machine, otherwise ask the operator for it. Being asked is the ordinary case, not a
   failure. Record where the path came from — never the path itself.
3. Verify source identity by recomputing both recorded checksums against whatever source you
   obtained, and compare the recorded commit. A path is accepted only when the checksums match.
4. If either checksum differs, that is drift: stop for human reconciliation.
5. ADOPT-00 is recorded PENDING with its fresh-session discovery evidence NOT yet recorded, so
   attempt native skill discovery now: invoke the `specboot-adopt` skill BY NAME, with no
   operator-supplied paths. That attempt, and its verbatim outcome, is ADOPT-00's discovery
   evidence. Filesystem presence is not discovery. If it succeeds, record ADOPT-00 PASS and
   checkpoint it; if it does not, record FAIL — never a blank.

Then continue through every reachable adoption step, stopping only at documented human-approval
gates or genuine external blockers.

Note for this machine: this repository is a linked git worktree. Run everything from this
directory; do not cd to the main checkout.
```

### `ADOPT-01` — Install Prerequisites

```text
Date:                2026-08-25T18:29:41Z
Machine:             macOS 13.7.8 (Darwin 22.6.0 x86_64), shell zsh
Node:                v24.18.0   (requirement >= 20.19.0 — MET; equals the reference experiment)
                     `/Users/landaeta/.nvm/versions/node/v24.18.0/bin/node --version`, exit 0
npm:                 11.16.0    (bundled with Node — MET; equals the reference experiment)
                     `<node-prefix>/bin/npm --version`, exit 0
OpenSpec:            1.7.0      (equals the reference experiment; supports the documented keys)
                     `<node-prefix>/bin/openspec --version`, exit 0
CodeGraph:           1.5.0      (equals the reference experiment)
                     `/Users/landaeta/.local/bin/codegraph --version`, exit 0
                     Recorded here as availability only. Whether CodeGraph is *adopted* is decided
                     at ADOPT-04/ADOPT-05, not here.
Git:                 2.39.2 (Apple Git-143)  `/usr/bin/git --version`, exit 0
Project runtime:     Java 11 — `java -version` reports OpenJDK 11.0.31 (Corretto 11.0.31.11.1),
                     exit 0. Derived from repository evidence, not assumed: `pom.xml` declares
                     `<java.version>11</java.version>` and inherits
                     `spring-boot-starter-parent` 2.4.5.
Project build tool:  Apache Maven 3.9.16 (2bdd9fddda4b155ebf8000e807eb73fd829a51d5), `mvn -v`
                     exit 0, running on Java 11.0.31 (Amazon Corretto, via sdkman).
                     Repository evidence: `pom.xml` present; `mvnw` and `mvnw.cmd` wrappers
                     present (POSIX + Windows). **Finding:** the wrappers are present but
                     `.mvn/` is **absent** (`ls: .mvn: No such file or directory`), so
                     `.mvn/wrapper/maven-wrapper.properties` does not exist and `./mvnw` cannot
                     resolve a distribution offline. This is a pre-existing repository condition,
                     not caused by this run; it is recorded here and carried to ADOPT-16, whose
                     baseline command must therefore use the PATH `mvn`, not `./mvnw`.
Result: PASS
Notes:
  - Repository inspected before assuming a toolchain, per the step's Action: present — `pom.xml`,
    `mvnw`, `mvnw.cmd`, `src/`, `target/`, `HELP.md`. Absent — `README.md`, `build.gradle`,
    `build.gradle.kts`, `package.json`, `requirements.txt`, `pyproject.toml`, `go.mod`,
    `Cargo.toml`, `Makefile`, `docs/`, and any CI configuration.
  - **The approval gate was never reached, and therefore nothing was approved.** ADOPT-01's gate
    guards "installing or upgrading software"; every required tool was already present at or
    above its documented minimum, so this step performed **no install and no upgrade** — only
    read-only version queries. Recording an approval here would be recording one that no human
    gave for a mutation that never happened.
  - OpenSpec was NOT upgraded, per `ADOPTION-AUTHORIZATION.md` §OpenSpec version policy: the
    installed 1.7.0 already meets the documented requirement, so the policy's "do not silently
    upgrade a globally installed tool" clause applies and no question was owed.
  - Version commands were run with **absolute executable paths** (`00-conventions.md`, evidence
    discipline) so a zsh alias or function could not shadow a real tool. Every one returned
    exit 0; no version was inferred from an empty or absent output.
  - `Allowed modifications: none` — honoured. This step made no repository-local write; `git
    status --porcelain` before and after shows only the two carried-forward run-log/authorization
    edits from checkpoint 1.
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

| # | Step or group | Grouping justification (required if a group) | Validation | Evidence pointers | Allowlist match (YES / NO + anomalies) | Ready declared | Approval (who / when / what — or "auto: standing authorization") | Exact staged file list | Commit SHA | Remote-impact assessment + verdict | Push status | Improvement proposals raised |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `ADOPT-00` (single step, not a group) | n/a — not a group | `ADOPT-00` = **PASS**. Fresh-session native skill discovery by name succeeded (`Skill(skill="specboot-adopt")` → `Launching skill: specboot-adopt`, external canonical `SKILL.md` rendered via the bootstrap symlink). Source identity re-verified: both checksums MATCH, commit `b457914c168de2548e10c02411462e8d1ad52d6d` MATCH, source worktree clean. `.specboot/bootstrap/` ABSENT; no copied canonical content; payload + container obligations `SKIPPED — source-linked mode`; `check-ignore` verdicts correct. | Run log §`ADOPT-00` evidence block; §Drift check at each resume row 1; `BOOTSTRAP-MANIFEST.json` | **YES** — staged set is 5 paths, every one covered by `ADOPT-00`'s `Allowed modifications` (the `claude` recipe `## Entries` table: `.claude/CLAUDE.md`; plus the fixed durable set: `.specboot/adoption/{BOOTSTRAP-MANIFEST.json,ADOPTION-RUN-LOG.md,ADOPTION-AUTHORIZATION.md}` and `.gitignore`). No anomalies; no unexpected path. `.claude/skills/specboot-adopt` (absolute external symlink, `machineLocal: true`) is git-excluded and was **not** staged, as source-linked mode requires. | YES — declared to the operator with the exact staged file list before the gate | **auto: standing authorization** — `ADOPTION-AUTHORIZATION.md` §Standing commit-and-push authorization, granted by Landaone 2026-08-25T18:12:48Z, scope "every checkpoint whose staged file list is a subset of its step's declared `Allowed modifications`, on branch `experiment/specboot-ai-adoption-v7`"; subset test = YES; current branch matches. Commit gate only — the push gate did **not** auto-approve (see next column). | `.claude/CLAUDE.md` (A); `.gitignore` (M); `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (A); `.specboot/adoption/ADOPTION-RUN-LOG.md` (A); `.specboot/adoption/BOOTSTRAP-MANIFEST.json` (A) | `fb4d2f09579c4c75a08bbc3de9cf84fc507c5326` — filled after the commit (the run log is inside the commit's own staged set, so the SHA cannot exist before it); this one-line delta is carried into the next checkpoint's staged set, per `00-conventions.md` (design D-Z, part 21) | **DETERMINED — this is the `ADOPT-00` remote-impact baseline.** Operator (Landaone) explicitly authorized read-only GitHub inspection at the push gate on 2026-08-25, per `00-conventions.md` ("External web, GitHub, or package-registry research requires explicit user authorization"). Inspected read-only via `gh` 2.95.0 (authenticated as `Landaone`), no write call issued: working tree — no `.github/` directory, the only YAML is `src/main/resources/application.yaml` (Spring config, not a pipeline). Remote `Landaone/app-prices-rest` (**public**, not archived, default branch `master`): `actions/workflows` total_count **0**; `hooks` **0**; `rulesets` **0**; `rules/branches/experiment%2Fspecboot-ai-adoption-v7` **`[]`** (no branch protection or ruleset applies to the target branch); `keys` (deploy keys) **0**; `environments` total_count **0**; `pages` **404 Not Found**. Actions is enabled at the repo level (`{"enabled":true,"allowed_actions":"all"}`) but **has zero workflows**, so nothing can trigger. Not determinable with a user token: the repo's GitHub App installations (`repos/{}/installation` → HTTP 401, "A JSON web token could not be decoded" — that endpoint requires a GitHub App JWT, not a coverage gap this run can close). **Verdict: no CI, no deployment, no security scan, no webhook, no required check, and no notification automation is triggered by this push.** Two facts recorded as findings, not automation: (1) the branch does not exist on the remote (`gh api .../branches/experiment%2Fspecboot-ai-adoption-v7` → "Branch not found"; `git ls-remote --heads origin experiment/specboot-ai-adoption-v7` → empty, exit 0), so the push **creates a new remote ref** rather than fast-forwarding an existing one — no history is discarded, but the standing authorization's literal "fast-forward push only" condition has no existing ref to fast-forward; (2) the repository is **public**, so pushing publishes the adoption record. | **PUSHED.** Live operator approval, not an auto-approval: Landaone approved at the checkpoint-1 push gate on 2026-08-25T18:28:22Z, after being shown the determined assessment and both of its findings (the remote ref did not exist, so this creates a branch; the repository is public, so the record becomes public). The gate did **not** auto-approve — the standing authorization requires a fast-forward push *and* an assessment unchanged from the `ADOPT-00` baseline, and neither is satisfiable at the first checkpoint, since there was no remote ref to fast-forward and this assessment *is* the baseline. Reading them as met in spirit is the `references/rationalizations.md` red flag "The gate protects a purpose, and that purpose is met here", so the gate was presented live. Command: `git push -u origin experiment/specboot-ai-adoption-v7`, **exit 0**, output `* [new branch] experiment/specboot-ai-adoption-v7 -> experiment/specboot-ai-adoption-v7`. Verified: `git ls-remote --heads origin experiment/specboot-ai-adoption-v7` → `fb4d2f09579c4c75a08bbc3de9cf84fc507c5326`. No force, no other branch, **no pull request** — GitHub's `pull/new/...` hint in the push output is a server-side suggestion, not an action taken, and no PR may exist before `ADOPT-19` (`00-conventions.md` non-negotiable 6). In the same answer the operator **extended** the standing push authorization to later checkpoints on this branch against this baseline; recorded in `ADOPTION-AUTHORIZATION.md` §Amendment 1, which also requires the baseline to be **re-probed** at each later checkpoint — a changed probe lapses the auto-approval and returns the gate to the operator. | 3 raised at `ADOPT-00` — see §Improvement proposals rows 1–3 |
| 2 | `ADOPT-01` (single step, not a group) | n/a — not a group | `ADOPT-01` = **PASS**. Every required tool already present at or above its documented minimum, each queried by **absolute executable path** so no zsh alias could shadow it, each exit 0: Node `v24.18.0` (min `>= 20.19.0`), npm `11.16.0`, OpenSpec `1.7.0`, CodeGraph `1.5.0`, Git `2.39.2`. Project toolchain derived from repository evidence rather than assumed: `pom.xml` declares `<java.version>11</java.version>` under `spring-boot-starter-parent` 2.4.5, `java -version` confirms OpenJDK 11.0.31 (Corretto), `mvn -v` confirms Apache Maven 3.9.16. | Run log §`ADOPT-01` evidence block | **YES** — `ADOPT-01`'s `Allowed modifications` is **`none`**, and the only staged path is `.specboot/adoption/ADOPTION-RUN-LOG.md`, which `00-conventions.md` makes an implicit permitted write for **every** step ("the run log is always a permitted write and never counts against any step's `Allowed modifications`", design D-Z part 22) — a literal `none` does not exclude it. Subset test therefore holds exactly, not by concession. `ADOPTION-AUTHORIZATION.md` was **deliberately kept out of this staged set**: it is checkpoint-1 residue and is not in `ADOPT-01`'s allowlist, so it was committed separately as `47fc5fe` against `ADOPT-00`'s allowlist, which does cover it. Folding it in here would have been a staged path outside the covered step's allowlist — `FAIL_CLOSED`, not a rounding error. | YES — declared with the exact staged file list before the gate | **auto: standing authorization** — `ADOPTION-AUTHORIZATION.md` §Standing commit-and-push authorization (Landaone, 2026-08-25T18:12:48Z); subset test YES; branch `experiment/specboot-ai-adoption-v7` matches. | `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) — one path only | PENDING-FILL — recorded immediately after the commit, per `00-conventions.md` (design D-Z, part 21) | **UNCHANGED FROM THE `ADOPT-00` BASELINE — verdict: no automation triggered.** Re-probed read-only at 2026-08-25T18:31:03Z, as `ADOPTION-AUTHORIZATION.md` §Amendment 1 requires ("reuse is not trust"), not carried over on the strength of the earlier check: `actions/workflows` total_count **0**, `hooks` **0**, `rulesets` **0**, `rules/branches/experiment%2Fspecboot-ai-adoption-v7` **`[]`**, `keys` **0**, `environments` **0**, `pages` **404**. Every value identical to row 1's baseline. Fast-forward confirmed by `git fetch origin` then `git rev-list --left-right --count @{u}...HEAD` → `0	1` (zero behind), so unlike checkpoint 1 the fast-forward condition is now a real, satisfied test rather than a vacuous one. | **PUSHED — auto-approved**, both conditions of §Amendment 1 met (fast-forward YES, baseline unchanged YES). Pushes commit `47fc5fe` (checkpoint-1 residue) alongside this checkpoint's commit; no force, no other branch, **no pull request** (`00-conventions.md` non-negotiable 6). | none — no new proposal arose at `ADOPT-01`; the three raised at `ADOPT-00` remain `proposed` |

> The commit approval and the push approval are **two distinct gates**. Neither carries forward to
> the next checkpoint. Unknown or unapproved remote impact **blocks** the push; "no CI
> configuration found" is a finding to report, not a licence to push.
>
> **Allowlist match** records the result of comparing the exact staged file list against the
> covered step's `Allowed modifications` field (`00-conventions.md`). Filled for **every**
> checkpoint, auto-approved or live-approved alike — an auto-approval is never left implicit.
> `NO`, with the exact unexpected path named, is `FAIL_CLOSED`, not a routine approval outcome.

---

## Improvement proposals

Raised after each validated checkpoint. **Never applied during the adoption run** — the guide is
not rewritten mid-installation; accepted proposals go through the normal OpenSpec change workflow.

| # | Checkpoint | Target file | Proposal | Status (`proposed` / `accepted` / `rejected` / `applied-in-change-<id>`) |
|---|---|---|---|---|
| 1 | `ADOPT-00` | `specboot-adoption/bootstrap-kit/client-autodiscovery.md` | Its "Probes, per client recipe" section says symlink capability "is detected later, at provisioning time, inside the approved mutation set", but `09-bootstrap.md` action 3 orders the symlink probe *before* actions 6 and 7, both of which depend on its result (action 6 decides whether to refuse; action 7's inventory presupposes the symlink mechanism). The two cannot both hold. This run followed `09-bootstrap.md`, which `client-autodiscovery.md` itself names as the canonical authority. Proposal: reword the parenthetical to say the probe is not part of the *read-only autodiscovery stage*, and that it runs at `09-bootstrap.md` action 3 — before the gate — since the refusal it feeds must precede provisioning. | `proposed` |
| 2 | `ADOPT-00` | `specboot-adoption/09-bootstrap.md` | Action 3's symlink probe is the one repository write that necessarily precedes the `[HUMAN APPROVAL REQUIRED]` gate, while `ADOPTION-ENTRY-PROMPT.md` §10 states "Never write to the target repository before ... the mutation gate has been approved". The probe is self-cleaning and left the tree byte-for-byte unchanged here, but the contract does not say so explicitly. Proposal: state in action 3 that the capability probe is an explicit, named exception to the pre-gate no-write rule, bounded to a create-and-immediately-remove at a single probe path, and require that its post-probe restoration be verified and recorded. | `proposed` |
| 3 | `ADOPT-00` | `specboot-adoption/09-bootstrap.md` | The `Validation` criteria require `git check-ignore` to report `.specboot/adoption/` **not** ignored, but the step's `Allowed modifications` and action 8 do not say which of the two ignore files each rule belongs in. This run placed `.specboot/bootstrap/` and `.specboot/local/` in the `.gitignore` block, `.specboot/staging/` outside it, and the machine-local discovery entry in `.git/info/exclude`, deriving the split from the schema's `machineLocal` description rather than from the phase file. Proposal: state the intended split explicitly in action 8, so it is read rather than inferred. | `proposed` |

---

## Client- and company-specific adaptations

| # | Adaptation | Reason | Blast radius (which steps or artifacts it affects) |
|---|---|---|---|
| 1 | `.git/info/exclude` is edited in the **common** Git directory, shared with the main checkout at the repository's other worktree | This repository is a linked worktree, so `.git/info/exclude` is not worktree-local the way `.gitignore` is. `git check-ignore` confirmed no needed rule was already in effect, so nothing was duplicated (design D-Z, part 29). The operator was shown this at the gate and accepted it explicitly. | `ADOPT-00` (the write), `ADOPT-18` (must remove the block from the shared file), and any checkpoint whose staged scope depends on the exclusion of `.claude/skills/specboot-adopt`. The rule is inert in the main checkout, which has no such path. |

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
2026-08-25 / ADOPT-00 / Q2 client-selection route = autodiscovery / Landaone / operator chose to
  see read-only candidates before selecting.
2026-08-25 / ADOPT-00 / Q3 selected client = claude; kiro and codex NOT SELECTED / Landaone /
  explicit selection after the probe displayed no candidates.
2026-08-25 / ADOPT-00 / FIRST mutation gate DECLINED / Landaone / operator answered "No apruebo —
  detente". Zero writes; repository verified byte-for-byte unchanged. Reason not stated by the
  operator and NOT inferred here.
2026-08-25 / ADOPT-00 / process restarted at operator request / Landaone / "rearranca el proceso".
  Step 0, four-artifact validation, resume check, autodiscovery, environment detection and the full
  preflight were all re-run from scratch.
2026-08-25 / ADOPT-00 / shared `.git/info/exclude` edit accepted / Landaone / operator was shown
  that the file is shared with the main checkout and accepted the delimited-block edit.
2026-08-25 / ADOPT-00 / SECOND mutation gate APPROVED — exact 9-path inventory, nothing outside it
  / Landaone / presented with every path, its mechanism and its reversibility.
2026-08-25 / ADOPT-00 / standing commit-and-push authorization GRANTED (both gates), branch
  experiment/specboot-ai-adoption-v7 / Landaone / granted in the same gate; recorded in
  ADOPTION-AUTHORIZATION.md.
```

## Correction record

Record every failed attempt, its diagnosis, and the recovery performed. A step that passed
on the third attempt is different evidence from one that passed immediately.

```text
ADOPT-00 / attempt 1 / mutation gate DECLINED by the operator / not a failure of the run — the gate
  worked as designed / zero writes; repository verified unchanged (git status empty, .claude/ and
  .specboot/ absent, no probe residue, .gitignore and .git/info/exclude at original checksums,
  canonical source byte-identical) / clean stop.
ADOPT-00 / attempt 2 / none / n/a / n/a / provisioning completed; ADOPT-00 recorded PENDING
  awaiting the fresh-session discovery probe.
Source observation / n/a / source HEAD advanced from 249ad6f to b457914 between attempt 1 and
  attempt 2 / both identity checksums byte-identical; only 00-conventions.md differed (+18 lines) /
  the changed file was re-read at the current commit before provisioning / recorded as observation,
  not drift — no manifest existed at the earlier commit.
```
