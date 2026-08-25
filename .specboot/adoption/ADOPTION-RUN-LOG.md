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
| `ADOPT-02` | `01-prerequisites-and-install.md` | PASS | 2026-08-25 — OpenSpec 1.7.0 reused (no install); `init --tools claude` |
| `ADOPT-03` | `01-prerequisites-and-install.md` | PASS | 2026-08-25 — 30 files mirrored + CLAUDE.md symlink; live gate |
| `ADOPT-04` | `02-codegraph.md` (**mandatory**) | PASS | 2026-08-25 — CodeGraph 1.5.0 reused; 22 files / 295 nodes / 355 edges |
| `ADOPT-05` | `02-codegraph.md` (**mandatory**) | PASS | 2026-08-25 — operator ran `install -t claude -l local --no-permissions`; block resolved |
| `ADOPT-05B` | `03-client-permissions.md` (**mandatory**) | PENDING | Steps 1–5 done, file authored + validated; awaiting fresh-session smoke test |
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
                     `<node-prefix>/bin/node --version`, exit 0  (node prefix per `npm prefix -g`)
npm:                 11.16.0    (bundled with Node — MET; equals the reference experiment)
                     `<node-prefix>/bin/npm --version`, exit 0
OpenSpec:            1.7.0      (equals the reference experiment; supports the documented keys)
                     `<node-prefix>/bin/openspec --version`, exit 0
CodeGraph:           1.5.0      (equals the reference experiment)
                     `<user-local-bin>/codegraph --version`, exit 0
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
  - **Correction applied at checkpoint 3.** As first written (and committed in `bad06cc`), this
    block spelled two tool locations as absolute paths under the operator's home directory. That is
    not the leak the guide forbids — the prohibition is on recording the resolved **canonical
    source path**, and a scan confirms that path appears nowhere in this log — but it is
    unnecessary machine-specific detail in a file that is committed to a **public** repository, and
    it was inconsistent with the `<node-prefix>` form already used for npm on the line above. Both
    were normalized to placeholders. The evidentiary claim is unchanged and still true: each
    version command was invoked through its resolved absolute executable path, so no zsh alias or
    function could shadow a real tool. Only the written rendering changed, not what was run.
```


### `ADOPT-02` — Install and Initialize OpenSpec with Explicitly Selected Clients

```text
OpenSpec version:    1.7.0 — `openspec --version`, exit 0, run by absolute path.
Install/upgrade:     **SKIPPED — an already-installed version already met the documented
                     requirement.** `npm install -g @fission-ai/openspec@latest` was NOT run, so
                     ADOPT-02's `[HUMAN APPROVAL REQUIRED]` gate was **never presented**: it guards
                     global installation or upgrade, and neither occurred (design D-Z, part 6).
                     Outcome also written back to ADOPTION-AUTHORIZATION.md's OpenSpec-version-
                     policy section, as this step's Action requires — updated in place, never a
                     second file (design D-Z, part 2a).
Command:             `openspec init --tools claude --no-animation`, exit 0.
                     Run non-interactively **because the client selection was already made and is
                     binding** (ADOPTION-AUTHORIZATION.md: `claude`; kiro and codex NOT SELECTED).
                     `--tools` is the installed version's documented non-interactive equivalent of
                     the interactive client prompt, so the selection was declared, not defaulted —
                     no default was accepted without review, and no prompt was answered on the
                     operator's behalf.
Clients offered:     the installed version's `openspec init --help` enumerates 34 selectable
                     tools, recorded verbatim from its output: amazon-q, antigravity, auggie, bob,
                     claude, cline, codeartsagent, codex, devin, forgecode, codebuddy, continue,
                     costrict, crush, cursor, factory, gemini, github-copilot, hermes, iflow,
                     junie, kilocode, kimi, kiro, lingma, vibe, oh-my-pi, opencode, pi, qoder,
                     qwen, roocode, trae, zcode (plus `windsurf`, accepted as an alias of `devin`),
                     and the aggregate values `all` and `none`. `claude`, `kiro` and `codex` — the
                     three clients this adoption tracks — are all offered by this version.
Clients selected:    **claude only.** `all` was deliberately not used. Every other offered tool,
                     including kiro and codex, is NOT SELECTED and received nothing.
Generated config path: `openspec/config.yaml` (the `.yaml` extension is what this version actually
                     generated; the guide's `.yml` alternative does not apply here). Contents:
                     `schema: spec-driven` plus commented-out optional blocks (context, per-artifact
                     rules, per-operation guidance) — no repository context filled in yet, which is
                     ADOPT-06's work, not this step's.
Generated client resources: the installer reported "6 skills and 6 commands in .claude/". Verified
                     on the filesystem rather than trusted from that message —
                     `.claude/commands/opsx/{apply,archive,explore,propose,sync,update}.md` (6) and
                     `.claude/skills/openspec-{apply-change,archive-change,explore,propose,
                     sync-specs,update-change}/SKILL.md` (6). Directories `openspec/changes/`,
                     `openspec/changes/archive/` and `openspec/specs/` were also created and are
                     **empty**, so Git tracks none of them; `git add -n openspec` confirms exactly
                     one path would stage: `openspec/config.yaml`.
Per-client provisioning provenance (installer-provisioned vs. separately configured):
                     Recorded as observed in THIS run, not inferred from files being present
                     (00-conventions.md, "Capability availability is not installer provenance").
                     - claude — OpenSpec resources (`.claude/commands/opsx/`,
                       `.claude/skills/openspec-*/`): provisioned by **`openspec init --tools
                       claude`** in this step, in this run.
                     - claude — `.claude/CLAUDE.md` and `.claude/skills/specboot-adopt`:
                       provisioned by the **ADOPT-00 bootstrap**, not by OpenSpec. `openspec init`
                       left both untouched — `git diff --quiet .claude/CLAUDE.md` reports
                       UNCHANGED, so the bootstrap block survives intact, and the
                       `specboot-adopt` symlink is unmodified.
                     - The SpecBoot npm installer has NOT run at this point (that is ADOPT-03), so
                       nothing here is attributable to it.
                     - kiro, codex: NOT SELECTED — nothing provisioned by any process.
openspec doctor result: exit 0. Output: `Root — Location:
                     <repo>; OpenSpec root: ok` / `References — (none declared)`. "No references
                     declared" is the expected state before ADOPT-07 wires docs/ and ai-specs/; it
                     is recorded as an observed finding, not read as a failure.
Git changes:         `git status --short` → `?? .claude/commands/`, `?? .claude/skills/`,
                     `?? openspec/`, plus the two carried-forward `.specboot/adoption/` edits.
                     `.claude/skills/specboot-adopt` does not appear: it stays git-excluded, as
                     source-linked mode requires.
Result: PASS
Notes:
  - PASS criteria checked one by one: `openspec/` exists — YES; a configuration file exists —
    YES (`openspec/config.yaml`); client-specific resources exist for the selected client — YES
    (12 files verified on disk); no resources added for unselected clients — YES, verified by an
    explicit repository-wide scan for `.kiro/`, `.agents/`, `AGENTS.md`, `codex.md`, `.cursor/`,
    `.gemini/`, `.windsurf/`, `.continue/`, `.roo/`, `.github/copilot-instructions.md`, `.qoder/`
    and `.trae/`, **all absent**. That scan is the evidence; the absence of complaints is not.
  - Independent runtime corroboration, observed in this session immediately after the command: the
    client surfaced the 6 new `openspec-*` skills and the 6 `opsx:*` commands as available. That is
    a genuine discovery signal, distinct from the filesystem check above — but it is recorded as
    corroboration only. The canonical runtime-discovery gate is ADOPT-15, in a fresh session, and
    this does not pre-satisfy it.
```


### `ADOPT-03` — Import SpecBoot

```text
Source:              `<SPECBOOT_SOURCE>/packages/specboot/template/` — the generic, redistributable
                     payload, **not** `<SPECBOOT_SOURCE>`'s own root. Confirmed explicitly, because
                     copying the bare root is the template-contamination failure this step warns
                     about: the canonical source is itself a real adopted repository, so its root
                     `docs/`/`ai-specs/` hold that repository's own project-specific content.
                     `<SPECBOOT_SOURCE>` was NOT re-derived here — it was read from the
                     machine-local `.specboot/local/canonical-source-path` store that ADOPT-00
                     wrote, and the operator was not asked to name it again. Payload
                     materialization was **checked, not assumed**: `test -d
                     <SPECBOOT_SOURCE>/packages/specboot/template` → true, so the `cp -rn`
                     technique applied and the `git archive` fallback for a sparse checkout was
                     not needed. The resolved absolute path is not recorded here, by design.
Target:              this repository root (linked worktree, branch
                     experiment/specboot-ai-adoption-v7).
Exact command:       `cp -rn <SPECBOOT_SOURCE>/packages/specboot/template/* .` — exit 0.
                     Then: `ln -s docs/base-standards.md CLAUDE.md` — exit 0.
Files added:         **30**, and the count is the literal output of `find docs ai-specs -type f |
                     wc -l`, run after the copy — not a recalled figure. Payload total is 31
                     files; 1 is excluded by the glob (see below); 31 − 1 = 30. Breakdown:
                     `docs/` **7** — api-spec.yml, backend-standards.md, base-standards.md,
                     data-model.md, development_guide.md, documentation-standards.md,
                     frontend-standards.md. `ai-specs/` **23** — specboot-instructions.md;
                     agents/ ×3 (backend-developer, frontend-developer,
                     product-strategy-analyst); scripts/code_review.sh; skills/ ×18 across
                     adversarial-review, code-auditing (+2 references), commit, enrich-us,
                     explain, meta-prompt, specboot-verify, update-docs, using-git-worktrees,
                     writing-skills (+5 support files incl. examples/CLAUDE_MD_TESTING.md).
                     **A zero-file copy would have been FAIL, not a no-op** (design D-Z part 18):
                     `cp -rn` exits 0 on a nonexistent source having copied nothing, so the count
                     was checked the moment the copy finished, not left for validation to notice.
                     Result was 30, non-zero.
                     Plus **1** created path: the `CLAUDE.md` root symlink (see below).
Files skipped because they existed: **0.** Verified before the copy, not inferred from `-n`
                     staying quiet: the target had no `docs/`, no `ai-specs/`, and none of the
                     four root instruction files. Nothing pre-existing was overwritten or
                     shadowed, and `-n` had nothing to suppress.
Hidden directories expected but not copied: **1** — `.cursor/` (holding
                     `.cursor/rules/use-base-rules.mdc`). Excluded because `*` does not match
                     dot-prefixed names, which is the documented, intended behaviour and is also
                     the correct outcome here on a second, independent ground: Cursor is not a
                     selected client. Verified absent afterwards rather than assumed. No
                     `.claude/`, `.kiro/` or other hidden client directory came from this step.
Root instruction symlinks resolve to docs/base-standards.md:
                     `CLAUDE.md` → `docs/base-standards.md`, `test -L` true, target resolves.
                     `AGENTS.md`, `GEMINI.md`, `codex.md`: **deliberately not created.**
                     **This is a recorded deviation from the step's own text, taken to a live
                     approval gate — not a silent judgement call.** All four are ABSENT from the
                     payload (verified by direct existence checks), so `cp` could not have
                     produced any of them, and the step's "expect every command to print exactly
                     docs/base-standards.md" is unsatisfiable as written against this payload.
                     The step's `Allowed modifications` does permit all four, but an allowlist is
                     a **ceiling on what a step may write, never an instruction to write all of
                     it** — and creating the other three would breach a rule that
                     `00-conventions.md` states holds across *every* step: "Never create adapters
                     or configuration for a client the repository did not explicitly select."
                     GEMINI.md and codex.md are root instruction files for clients that are NOT
                     SELECTED, and AGENTS.md is precisely the marker ADOPT-00's own autodiscovery
                     probed *as* the Codex marker. Because the mechanical comparison surfaced this
                     deviation, the gate did **not** auto-approve — the auto-approval clause
                     applies only where the copy matches the closed rule exactly. Approved live by
                     Landaone at 2026-08-25T18:38:56Z, shown the literal find counts and the three options;
                     the operator selected "CLAUDE.md only". Raised as improvement proposal 4.
Per-client provisioning provenance (installer-provisioned vs. separately configured):
                     Recorded as observed in this run, never inferred from files being present.
                     - `docs/`, `ai-specs/`: provisioned by **this step's `cp -rn`** from the
                       SpecBoot template payload. Client-neutral — neither is a client resource.
                     - `CLAUDE.md` (root symlink): created by **this step**, by hand, under the
                       live gate above. It is not installer output: the payload did not contain
                       it, and `packages/specboot/bin/init.js` (which normally creates it) was not
                       run in this adoption.
                     - `.claude/commands/opsx/`, `.claude/skills/openspec-*/`: **OpenSpec's
                       `init`** at ADOPT-02. Untouched here.
                     - `.claude/CLAUDE.md`, `.claude/skills/specboot-adopt`: **ADOPT-00
                       bootstrap**. Untouched here. Note these are `.claude/`-scoped and do not
                       collide with the new root `CLAUDE.md`, which is a different path.
                     - The **SpecBoot npm installer has still not run** in this adoption; nothing
                       anywhere is attributable to it.
                     - kiro, codex, cursor, gemini: NOT SELECTED — nothing provisioned.
Result: PASS
Notes:
  - Byte-for-byte mirror verified, which is what the closed-rule allowlist actually demands:
    `diff -r <payload>/docs docs` and `diff -r <payload>/ai-specs ai-specs` both reported **no
    differences**, exit 0. Nothing outside the two mirrored trees and the one created symlink was
    written — `git status --short` shows exactly `?? CLAUDE.md`, `?? ai-specs/`, `?? docs/`, plus
    the carried-forward run-log edit.
  - **The read-only guarantee on the canonical source was verified, not assumed.** A digest over
    every file in the payload tree was taken before and after the copy and is identical
    (`4f7180a1aba5c60215c9297ce17e579505d9d0d136aaeff2e4f9a32adcbe61a5`), and `git -C <source>
    status --porcelain` is still empty. The source was read from and never written to.
```


### `ADOPT-04` — Initialize CodeGraph

```text
Capability selection (recorded before anything else, per this phase file's
"Capability selection" section — a code-graph capability is MANDATORY, and there is no
waiver, no skip, and no `PENDING EVIDENCE`):
  1. Implementation selected:  **CodeGraph** (the guide's default product choice). No
                               company-approved equivalent was substituted.
  2. Availability established by an **executed command**, not by assertion:
                               `codegraph --version` → `1.5.0`, **exit 0**, run by resolved
                               absolute path so no shell alias could shadow it.
  3. Coverage limitations:     see "Files indexed" below — recorded, not glossed.
  4. Usable implementation found, so this step is not FAIL and the adoption continues.
  No "small repository" exemption was sought or applied. The repository is small (17 `.java`
  files), which is exactly the circumstance the phase file names as the one rationalization
  the rule exists to refuse; text search was never treated as a substitute.

CodeGraph version:   1.5.0 — equals the reference experiment's version.
Installation:        **SKIPPED — an already-installed version already satisfied this step's
                     requirement.** The official installation procedure was NOT run, so
                     ADOPT-04's `[HUMAN APPROVAL REQUIRED]` gate was **never presented**: it
                     guards software installation, and none occurred (design D-Z, part 13).
Command:             `codegraph init`, run from the repository root, exit 0. This is a
                     repository-local index build, not a software install, so it runs
                     regardless of the skipped installation procedure.
Files indexed:       **22.** Recorded verbatim from the tool's own output line "Indexed 22
                     files".
                     **Coverage note, recorded rather than glossed:** the repository contains
                     17 `.java` files and 2 resource files (`application.yaml`,
                     `V1_create_tables.sql`) under `src/`, plus `pom.xml` at the root — and
                     the ADOPT-03 import added script assets (`ai-specs/scripts/code_review.sh`,
                     `ai-specs/skills/writing-skills/render-graphs.js`). 22 is therefore larger
                     than the Java source count, not smaller. The installed version prints no
                     per-file index listing, so **this run did not obtain an authoritative
                     file-by-file breakdown** and does not claim one; what is asserted here is
                     the tool's reported count and the repository's own file census, each
                     independently measured. No claim of full graph coverage across every
                     language present is made.
Nodes:               **295** — from the tool's output line "295 nodes, 355 edges in 602ms".
Edges:               **355** — same line.
Duration:            **602ms** — same line. (The guide's 25 files / 314 nodes / 389 edges / 1.0s
                     figures are the reference repository's evidence, explicitly not a universal
                     expectation, so the difference here is not a deviation.)
Exploration query:   `codegraph explore "list entry points"`, exit 0. **Non-empty structured
                     result**, which is the criterion: "Found 49 symbols across 3 files", with a
                     blast-radius section naming real symbols at real locations — e.g.
                     `getPriceList` at `src/main/java/com/llandaeta/prices/core/model/
                     PriceModel.java:18` (1 caller, covering test identified) and `getPriceList`
                     at `.../db/entities/PriceEntity.java:38` (1 caller, flagged "no covering
                     tests found") — plus verbatim on-disk source. The index is genuinely
                     queryable against the real codebase, not merely present on disk.
Result: PASS
Notes:
  - PASS criteria checked individually: `.codegraph/` exists (`test -d`, exit 0) — YES; an
    indexing summary reports files, nodes and edges — YES, all three, quoted above; the index is
    queryable — YES, demonstrated by a non-empty exploration result rather than by the directory
    merely existing; internal `.codegraph/` files treated as version-dependent — YES, and
    enforced rather than merely intended: CodeGraph provisioned `.codegraph/.gitignore` with
    `*` / `!.gitignore`, and `git check-ignore -v .codegraph/codegraph.db` confirms the 860 KB
    index database is ignored by that rule. `git add -n .codegraph` reports exactly one
    trackable path, `.codegraph/.gitignore` — matching this step's closed allowlist exactly.
```


### `ADOPT-05` — Configure CodeGraph for the Selected Clients

```text
Resolution of the earlier block: the previous PENDING record for this step (committed as
`9b01bfa`) stands as the honest account of the period when `codegraph install` had not run.
It is superseded here, not deleted: the blocker was real, and the way it was resolved is part
of the evidence. The pty driver was never permitted to execute, so **this session never drove
the interactive flow**. The operator ran the command directly at their own keyboard — which
this phase file explicitly names as a legitimate response when automation cannot complete the
flow — and reported completion at 2026-08-25T19:05:50Z.

Command:             `codegraph install -t claude -l local --no-permissions`, run by the
                     operator (Landaone) in their own terminal at the repository root.
                     **Executed by the operator, not by this session** — recorded that way
                     deliberately: `00-conventions.md` forbids claiming automatic discovery or
                     execution for something manually supplied. `-y` was NOT used.
Clients selected:    **claude only.** OBSERVED from artifacts, not taken on trust: the only
                     client configuration produced is `.mcp.json` plus the `CODEGRAPH_START/END`
                     block in `.claude/CLAUDE.md`. A repository-wide scan found no `.kiro/`,
                     `.agents/`, `AGENTS.md`, `codex.md`, `.cursor/`, `.opencode/` or
                     `.hermes/`. The machine-global `~/.codex/config.toml` **does** exist but is
                     pre-existing (mtime 2026-08-20, five days before this run) and contains
                     **zero** occurrences of "codegraph" — so Codex, recorded NOT SELECTED, was
                     not configured by this command. Checked rather than assumed, because a file
                     merely existing proves nothing about which process wrote it.
Scope:               **project / local.** OBSERVED: `.mcp.json` was written inside the
                     repository, and the machine-global `~/.claude.json` contains **zero**
                     occurrences of "codegraph" despite existing (61 KB). Had the install gone
                     to global scope, that file — the destination `--print-config claude` named
                     in its preview — is where the server entry would have landed. Least-privilege
                     default honoured.
PATH:                **No.** OBSERVED by mtime, not merely reported: `codegraph` resolves to
                     `~/.local/bin/codegraph`, a symlink into `~/.codegraph/versions/v1.5.0/`
                     dated **2026-07-25**, one month before this adoption. The install created
                     nothing there and nothing under `~/.codegraph/` was newly written by it
                     beyond telemetry and an update check. This is the answer this run's own
                     ADOPT-01/ADOPT-04 evidence required: `codegraph` was already resolvable on
                     PATH, so answering Yes would have performed a machine-level mutation
                     outside this step's repository-local `Allowed modifications` to
                     re-establish something already true.
                     **Residual risk, recorded rather than dismissed:** declining prints a
                     generic warning that agents will not be able to launch the MCP server
                     without a PATH install. That warning does not account for an
                     already-resolvable PATH entry, so it is deferred to `ADOPT-15`'s
                     fresh-session runtime-discovery validation — not treated as a blocking
                     failure here, and not treated as resolved either. If `ADOPT-15` shows the
                     client cannot launch the server, its documented recovery is to re-run
                     `codegraph install` accepting the PATH install.
Automatic allow:     **No.** OBSERVED: `--no-permissions` was passed, and `.claude/settings.json`
                     is **absent** — the file this flag suppresses. Nothing auto-allows any
                     command pattern, honouring the rule "do not enable automatic allow until
                     exact command patterns are reviewed" and the least-privilege policy in
                     `ADOPTION-AUTHORIZATION.md`.
Prompt front-loading: **No.** Confirmed by the operator at 2026-08-25T19:05:50Z when asked directly.
                     **Not independently observable from artifacts** — this sub-question leaves
                     no trace in the repository or in `~/.codegraph/` — so it is recorded as an
                     operator-confirmed answer, explicitly distinguished from the mtime- and
                     content-verified findings above. Indirect corroboration only: the
                     `CODEGRAPH_START/END` block is the tool's standard guidance text, with no
                     front-loaded prompt content.
Pro:                 **No.** Confirmed by the operator at the same time. Same evidential status
                     as front-loading: operator-confirmed, not artifact-observable. Indirect
                     corroboration: `~/.codegraph/beta-signup.json` is untouched, dated
                     2026-07-30, and nothing under `~/.codegraph/` was written today except
                     `telemetry-queue.jsonl` and `update-check.json`.
Generated files:     **3**, each inspected, and all three inside this step's closed allowlist:
                     1. `.mcp.json` (new) — a single `mcpServers.codegraph` stdio entry invoking
                        `codegraph serve --mcp`. No credentials, no absolute paths, no
                        machine-specific content; portable and safe to commit.
                     2. `.claude/CLAUDE.md` (modified) — **purely additive**. `git diff` shows
                        only insertions: a blank line plus an 11-line
                        `<!-- CODEGRAPH_START -->` … `<!-- CODEGRAPH_END -->` block. The
                        ADOPT-00 `SPECBOOT-BOOTSTRAP` block above it is byte-identical, so
                        nothing was rewritten or reordered. The delimiters also supply the
                        provenance marker this step's own "check before configuring" branch
                        reads on a later run.
                     3. `.claude/settings.json` — **deliberately NOT generated** (see Automatic
                        allow). Its absence is the evidence, not an omission.
                     The canonical root `CLAUDE.md` symlink was **not** touched — `ls -l`
                     confirms it still points at `docs/base-standards.md` and `git diff` for it
                     is empty. This matters: the allowlist names `.claude/CLAUDE.md` and
                     explicitly says "never the canonical root symlink itself", and writing
                     through the symlink would have silently rewritten `docs/base-standards.md`,
                     a file mirrored byte-for-byte from the canonical payload at ADOPT-03.
Per-client provisioning provenance (installer-provisioned vs. separately configured):
                     - claude — `.mcp.json` and the `CODEGRAPH_START/END` block: provisioned by
                       **`codegraph install`** in this step, in this run, run by the operator.
                     - claude — `.claude/commands/opsx/`, `.claude/skills/openspec-*/`:
                       **OpenSpec `init`** (ADOPT-02). Untouched here.
                     - claude — the `SPECBOOT-BOOTSTRAP` block in `.claude/CLAUDE.md` and
                       `.claude/skills/specboot-adopt`: **ADOPT-00 bootstrap**. Untouched here;
                       the CodeGraph block was appended below, not merged into it.
                     - `docs/`, `ai-specs/`, root `CLAUDE.md` symlink: **ADOPT-03**. Untouched.
                     - `.codegraph/`: **`codegraph init`** (ADOPT-04). Untouched.
                     - The SpecBoot npm installer has still not run in this adoption.
                     - kiro, codex, cursor, opencode, hermes: NOT SELECTED — nothing
                       provisioned, verified by scan.
Validation:          `git status --short` → `M .claude/CLAUDE.md`, `?? .mcp.json` (plus the
                     carried-forward run-log edit). `git diff --name-only` → `.claude/CLAUDE.md`
                     only. `codegraph explore "list public interfaces"` → **exit 0**, non-empty
                     structured result: "Found 52 symbols across 4 files", with blast radius
                     naming real symbols at real locations, including `PriceService`
                     (`src/main/java/com/llandaeta/prices/core/services/PriceService.java:8`) with
                     5 callers and its covering test identified.
Result: PASS
Notes:
  - Runtime discovery is NOT established by this step and is not claimed. Filesystem
    configuration passing here says nothing about whether a fresh client session can actually
    launch the MCP server; that is `ADOPT-15`'s gate, in a fresh session, and the PATH residual
    risk above rides on it.
  - `ADOPTION-AUTHORIZATION.md`'s code-graph privilege-scope section was updated in place with
    these actual choices, as this step's Action requires — never a second file (design D-Z
    part 2a).
```

### `ADOPT-05B` — Selected-Client Permissions

```text
Clients selected:    claude only. kiro and codex are NOT SELECTED and received no permission
                     file — verified by scan, not assumed: no `.kiro/`, no `.agents/`.

-- Provisioning (ADOPT-05B Step 1) --
Source baseline located (where it came from):
                     **NONE EXISTS. No organization-reviewed generic baseline was found, and
                     this is recorded as a finding rather than papered over.** Searched: (a) the
                     external canonical source — no `.claude/settings.json`, no
                     `permissions.yaml`, and no permission baseline anywhere in
                     `bootstrap-kit/`; (b) `19-permissions-policy.md`, which discusses a shared
                     `.claude/settings.json` as policy but ships no file; (c) this repository's
                     reachable history.
                     **The (c) search surfaced exactly the trap this step warns about, and it
                     was refused.** `git log --all -- .claude/settings.json` returns 9 commits —
                     including "SpecBoot ADOPT-05B: configure Claude permission baseline" and
                     "Checkpoint ADOPT-05B: configure and validate client permissions". Those
                     are **other adoption runs' own output** on sibling experiment branches
                     (`experiment/specboot-ai-adoption-v1`, `-v2`, `-v4`, `-v5`), reachable only
                     because this linked worktree shares one Git object database with them. A
                     commit reachable only because it shares an object store is **not** evidence
                     of an organization-reviewed baseline, and adopting one would have dressed a
                     same-repository coincidence as external authority. Not used.
                     → Per this step's own instruction for exactly this case, the baseline was
                       authored as **this project's first one**, from the step's Rules, and is
                       declared as such rather than presented as inherited authority.
Target file existed before this step? (yes / no): **no.** Verified: ADOPT-03's `cp -rn <src>/* .`
                     cannot deliver it (the glob excludes dot-prefixed names), and ADOPT-05's
                     `codegraph install` was run with `--no-permissions`, which is precisely the
                     flag that suppresses writing this file. Confirmed absent immediately before
                     writing.
Decision: COPY / MERGE, and why:
                     **Neither — AUTHORED.** A COPY needs a baseline to copy and there is none;
                     a MERGE needs an existing target and there is none. Recording this as
                     "COPY" would name a source that does not exist. No blind overwrite occurred
                     because there was nothing to overwrite.
Merge conflicts resolved, and how (none if COPY): none — nothing pre-existing to conflict with.

-- Supported-environment matrix (Step 2) --
Clients supported by the project/team: claude (Claude Code).
Stacks supported:    Java 11 + Apache Maven (pom.xml: `<java.version>11</java.version>` under
                     spring-boot-starter-parent 2.4.5; `mvn` 3.9.16 on PATH; `mvnw`/`mvnw.cmd`
                     wrappers present). Node/npm are adoption tooling, not a product stack.
Shells supported:    zsh, bash, PowerShell — the broad default, deliberately NOT narrowed.
Operating systems supported: macOS, Linux, Windows — the broad default, deliberately NOT narrowed.
                     Full reasoning and the evidence census are in `ADOPTION-AUTHORIZATION.md`'s
                     environment-matrix section, updated in place at 2026-08-25T19:12:58Z (never a second
                     file). In short: the matrix governs only read-only, project-scoped, low-risk
                     patterns, so breadth recognises more command-syntax variants without
                     increasing privilege, while narrowing to this machine's macOS/zsh would
                     strand a teammate on another platform behind an unexplained prompt. The
                     repository has no CI config, no container definition and no platform
                     statement, so absence of evidence was recorded as absence and NOT used to
                     narrow.

-- Reconciliation (Step 3) --
Entries removed as out-of-matrix: **none.** Nothing was inherited, so there was nothing
                     out-of-matrix to strip. No entry for kiro, codex, cursor or any unselected
                     client was ever written.
Entries retained for supported environments not present on this machine:
                     **7 — the entire `mvnw.cmd` Windows family** (`-v`, `test`, `test:*`,
                     `clean test`, `clean test:*`, `verify`, `verify:*`). This adoption ran on
                     macOS and **could not exercise a single one of them**; they are retained
                     anyway, which is the explicit instruction. Positive repository evidence
                     backs them: `mvnw.cmd` is committed alongside the POSIX `mvnw`, so the
                     repository already ships a Windows invocation path. Stripping them because
                     the adopting machine is a Mac is exactly the failure this step names —
                     it surfaces later, on a teammate's machine, as an unexplained prompt far
                     from here.
Entries added for the real project: **68 total**, by family — openspec 15 (read-only
                     inspection); git 11 (status/diff/log/show/rev-parse/check-ignore/ls-files/
                     branch --list — inspection only, **no** add/commit/push/reset/rebase);
                     mvn 8 + ./mvnw 7 + mvnw.cmd 7 = 22 (controlled local build/test); read-only
                     shell 12 (ls, cat, head, tail, wc, grep, rg, sed -n, readlink, realpath,
                     file, shasum); codegraph 2 + MCP `codegraph_explore` 1; environment queries
                     5 (command -v ×2, npm root -g, npm prefix -g, java -version).
                     `deny` and `ask` are both empty.
                     **Deliberate narrowing against the guide's own illustrative example:**
                     `find` was **excluded**, though the illustrative Kiro YAML lists `find . *`.
                     `find -delete` and `find -exec` mutate the filesystem, and the Rules require
                     every mutating operation to stay reviewable or approval-gated. Accepting a
                     read-only-looking pattern that can delete files would have contradicted the
                     rule that the same example sits beside. Recorded as a deviation from the
                     example, not from the Rules.
                     The 22 Maven entries are the one genuinely new privilege family: they use
                     repository-declared tooling, write only to the git-ignored `target/`, and do
                     not install, deploy, publish, or reach external services. **Permission to
                     run a test never implies its result is PASS.**

-- Safety and syntax (Step 4) --
Credentials / secret-shaped text found: **none** — grep for token|secret|password|api-key|
                     bearer|ssh-rsa|BEGIN PRIVATE returned no match.
Personal absolute paths or home directories found: **none** — grep for /Users/|/home/|
                     C:\Users|$HOME|~/ returned no match.
Machine-specific dependency locations found: **none** — grep for .nvm|.sdkman|/opt/homebrew|
                     /usr/local/Cellar|.local/bin|versions/v returned no match. This matters
                     because the file is shared and versioned; the ADOPT-01 evidence block had
                     to be corrected for exactly this class of leak earlier in the run.
Unsafe broad command patterns found: **none.** A first grep appeared to flag the Maven entries,
                     but that was a false positive of the author's own pattern — `mv` matched the
                     `mvn` prefix. Re-run with word boundaries: no rm/mv/cp/chmod/chown/xargs/
                     eval/sudo/curl/wget/find/sh/bash/zsh/git-add/git-commit/git-push, and no
                     `**`, shell loop, `&&`, `;`, `||` or `$(...)`. The only npm entries are
                     `npm root -g` and `npm prefix -g`, both read-only.
Client-specific syntax validation (JSON / YAML / other):
                     **JSON — PASS.** `python3 -c "json.load(open('.claude/settings.json'))"`,
                     exit 0, parsed to 68 allow entries. Validated in this session as the step
                     requires.
Allowlist coverage of the canonical smoke-test commands, verified by pattern matching rather
                     than by eye: all 8 covered — `openspec --version`, `openspec doctor --json`,
                     `openspec context --json`, `openspec schemas`, `openspec templates`,
                     `git status --short`, `git diff -- openspec/config.yaml`, and a CodeGraph
                     exploration query.

-- Smoke tests (one row per supported client/OS combination) --
Client / OS | Available? | Negative control | Result (PASS / FAIL / PENDING EVIDENCE) | Reason
Claude Code / macOS  | yes | not yet observed | **PENDING EVIDENCE** | Requires a fresh session.
  The smoke test terminates in a stop-and-hand-off by design, and this session cannot supply it:
  its permission state was established **before** `.claude/settings.json` existed, so an absence
  of prompts here measures the old session, not the new file. A same-session run is diagnostic
  data only and is never smoke-test evidence. The exact fresh-session prompt has been generated
  and handed off (see the handoff block below). There is no "continue in this session instead"
  option to offer.
Claude Code / Linux  | no  | — | **PENDING EVIDENCE** | No Linux machine available during this
  adoption. Declared supported, untested — not passing, not failing, not omitted.
Claude Code / Windows| no  | — | **PENDING EVIDENCE** | No Windows machine available during this
  adoption, so the 7 retained `mvnw.cmd` entries are unexercised. Declared supported, untested.
Permission prompts triggered: not yet observed — no smoke test has run.
File modifications during smoke test: not applicable — no smoke test has run.

DIAGNOSTIC ONLY, explicitly NOT smoke-test evidence: the negative control (`date`, a command
  deliberately absent from the allowlist) was run in THIS session at 2026-08-25T19:12:58Z. It executed,
  exit 0, and **did not request permission**. Under the canonical prompt's own routing this
  would mean `NOT APPLICABLE ON THIS CLIENT` — the client auto-approves outside the allowlist
  regardless of the file under test, so no command could demonstrate anything about that file.
  It is recorded here as a forewarning of the likely fresh-session outcome, NOT as that outcome:
  this session runs under a non-default permission mode, and a genuinely fresh session may
  behave differently. If the fresh session reproduces it, the row falls through to this step's
  **alternative criterion**, which is weaker evidence, must be labelled as such, and carries its
  own **[HUMAN APPROVAL REQUIRED]** to close — it cannot itself distinguish a working permission
  file from no permission file at all. The first two of its three conditions are already
  satisfied and recorded above (every canonical command verified by inspection as covered by an
  allowlist pattern; every one of them observed executing successfully earlier in this run).

-- Integrity and provenance --
Generic source baseline unchanged (confirmed): **not applicable, and confirmed anyway.** There
                     is no generic source baseline to leave unchanged. Independently,
                     `git -C <source> status --porcelain` is empty, so the external canonical
                     source remains untouched by this step as by every other.
Per-client provisioning provenance (installer-provisioned vs. separately configured):
                     - claude — `.claude/settings.json`: **authored by this step**, by hand, in
                       this run, under a live approval gate. NOT installer output: no installer
                       produces it, `codegraph install --no-permissions` explicitly suppresses
                       it, and ADOPT-03's copy cannot reach dot-prefixed paths.
                     - Everything else unchanged from ADOPT-05's record.
                     - kiro, codex: NOT SELECTED — no permission file, verified by scan.

Remaining limitations:
  1. Two declared OS rows (Linux, Windows) are PENDING EVIDENCE and will remain so unless a
     machine of each becomes available. The 7 `mvnw.cmd` entries are unexercised.
  2. `.mvn/` is absent (ADOPT-01 finding), so the `./mvnw` and `mvnw.cmd` entries cannot resolve
     a Maven distribution as the repository currently stands. The `mvn`-on-PATH entries are the
     ones that work today; the wrapper entries are retained for portability once that gap is
     fixed. ADOPT-16's baseline must use `mvn`.
  3. The negative control's diagnostic result suggests the macOS row may close on the weaker
     alternative criterion rather than a true PASS smoke test.
Result: **PENDING** — Steps 1 through 5 are complete and the file is authored, safety-checked and
        syntax-validated, but this step cannot reach PASS until the fresh-session smoke test is
        observed. Not FAIL: nothing failed. Not SKIPPED: this step is unconditionally mandatory.
```

#### Handoff prompt for the ADOPT-05B smoke test (verbatim, generated by this session)

```text
Perform a read-only smoke test of this repository's project-local permissions.

First, run one command deliberately absent from this project's permission allowlist — for
example `date` — as a negative control. Evaluate it before any other command; its result routes
the rest of this test:
- If it requests permission: the test can measure the permission file. Continue below.
- If it does not request permission: this client auto-approves outside the allowlist regardless
  of the file under test, so no command below can demonstrate anything about that file. Stop
  here and report `NOT APPLICABLE ON THIS CLIENT`, with this result as the reason. Do not run
  the remaining commands as smoke-test evidence.

Only if the negative control requested permission, run these commands separately, without
combining them with shell operators:
- `openspec --version`
- `openspec doctor --json`
- `openspec context --json`
- `openspec schemas`
- `openspec templates`
- `git status --short`
- `git diff -- openspec/config.yaml`
- one read-only CodeGraph exploration query, only when CodeGraph was adopted

Do not modify files.

For each command report:
- whether it executed;
- whether it requested permission;
- PASS or FAIL.

Treat an unexecuted or failed command as FAIL, never an inferred PASS from empty output.

Stop after reporting the negative control's result and the permission behavior.
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
| 2 | `ADOPT-01` (single step, not a group) | n/a — not a group | `ADOPT-01` = **PASS**. Every required tool already present at or above its documented minimum, each queried by **absolute executable path** so no zsh alias could shadow it, each exit 0: Node `v24.18.0` (min `>= 20.19.0`), npm `11.16.0`, OpenSpec `1.7.0`, CodeGraph `1.5.0`, Git `2.39.2`. Project toolchain derived from repository evidence rather than assumed: `pom.xml` declares `<java.version>11</java.version>` under `spring-boot-starter-parent` 2.4.5, `java -version` confirms OpenJDK 11.0.31 (Corretto), `mvn -v` confirms Apache Maven 3.9.16. | Run log §`ADOPT-01` evidence block | **YES** — `ADOPT-01`'s `Allowed modifications` is **`none`**, and the only staged path is `.specboot/adoption/ADOPTION-RUN-LOG.md`, which `00-conventions.md` makes an implicit permitted write for **every** step ("the run log is always a permitted write and never counts against any step's `Allowed modifications`", design D-Z part 22) — a literal `none` does not exclude it. Subset test therefore holds exactly, not by concession. `ADOPTION-AUTHORIZATION.md` was **deliberately kept out of this staged set**: it is checkpoint-1 residue and is not in `ADOPT-01`'s allowlist, so it was committed separately as `47fc5fe` against `ADOPT-00`'s allowlist, which does cover it. Folding it in here would have been a staged path outside the covered step's allowlist — `FAIL_CLOSED`, not a rounding error. | YES — declared with the exact staged file list before the gate | **auto: standing authorization** — `ADOPTION-AUTHORIZATION.md` §Standing commit-and-push authorization (Landaone, 2026-08-25T18:12:48Z); subset test YES; branch `experiment/specboot-ai-adoption-v7` matches. | `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) — one path only | `bad06ccd88d0984ab6424b2428573063a8c42440` — filled after the commit; this one-line delta carries into checkpoint 3's staged set, per `00-conventions.md` (design D-Z, part 21) | **UNCHANGED FROM THE `ADOPT-00` BASELINE — verdict: no automation triggered.** Re-probed read-only at 2026-08-25T18:31:03Z, as `ADOPTION-AUTHORIZATION.md` §Amendment 1 requires ("reuse is not trust"), not carried over on the strength of the earlier check: `actions/workflows` total_count **0**, `hooks` **0**, `rulesets` **0**, `rules/branches/experiment%2Fspecboot-ai-adoption-v7` **`[]`**, `keys` **0**, `environments` **0**, `pages` **404**. Every value identical to row 1's baseline. Fast-forward confirmed by `git fetch origin` then `git rev-list --left-right --count @{u}...HEAD` → `0	1` (zero behind), so unlike checkpoint 1 the fast-forward condition is now a real, satisfied test rather than a vacuous one. | **PUSHED — auto-approved**, both conditions of §Amendment 1 met (fast-forward YES, baseline unchanged YES). Pushes commit `47fc5fe` (checkpoint-1 residue) alongside this checkpoint's commit; no force, no other branch, **no pull request** (`00-conventions.md` non-negotiable 6). | none — no new proposal arose at `ADOPT-01`; the three raised at `ADOPT-00` remain `proposed` |
| 3 | `ADOPT-02` (single step, not a group) | n/a — not a group | `ADOPT-02` = **PASS**, each criterion checked individually rather than as a batch: `openspec/` exists; a config file exists (`openspec/config.yaml` — the extension this version actually generated, not the guide's `.yml` alternative); the selected client's resources exist — **12 files verified on the filesystem**, not trusted from the installer's own "6 skills and 6 commands" message; and **no resources exist for any unselected client**, verified by an explicit repository-wide scan for `.kiro/`, `.agents/`, `AGENTS.md`, `codex.md`, `.cursor/`, `.gemini/`, `.windsurf/`, `.continue/`, `.roo/`, `.github/copilot-instructions.md`, `.qoder/`, `.trae/` — all absent. `openspec doctor` exit 0, root ok. No install or upgrade ran (1.7.0 already met the requirement), so that gate was never reached. | Run log §`ADOPT-02` evidence block; `ADOPTION-AUTHORIZATION.md` §OpenSpec version policy | **YES** — 15 staged paths, every one inside `ADOPT-02`'s closed exact list: `openspec/config.yaml`; the selected client's generated resources exactly as `openspec init --tools claude` reported them (`.claude/commands/opsx/*.md` ×6, `.claude/skills/openspec-*/SKILL.md` ×6); `ADOPTION-AUTHORIZATION.md` (**update only**, never a second file); plus the always-permitted run log. No unexpected path. Three generated directories (`openspec/changes/`, `openspec/changes/archive/`, `openspec/specs/`) are empty and therefore untracked — `git add -n openspec` confirmed exactly one path would stage. `.claude/CLAUDE.md` is **not** staged: `openspec init` left it byte-identical (`git diff --quiet` → UNCHANGED), and it belongs to `ADOPT-00`, not here. | YES — declared with the exact 15-path staged list before the gate | **auto: standing authorization** (Landaone, 2026-08-25T18:12:48Z); subset test YES; branch matches. | `.claude/commands/opsx/{apply,archive,explore,propose,sync,update}.md` (A ×6); `.claude/skills/openspec-{apply-change,archive-change,explore,propose,sync-specs,update-change}/SKILL.md` (A ×6); `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (M); `.specboot/adoption/ADOPTION-RUN-LOG.md` (M); `openspec/config.yaml` (A) — 15 paths | `5873e28f9421f1fa477150052f232350ae1d88d9` — filled after the commit; delta carries into checkpoint 4 | **UNCHANGED FROM THE `ADOPT-00` BASELINE — verdict: no automation triggered.** Re-probed read-only at 2026-08-25T18:34:15Z per §Amendment 1: `workflows=0 hooks=0 rulesets=0 branch-rules=[] keys=0 envs=0`. Identical to row 1's baseline. Fast-forward confirmed: `git rev-list --left-right --count @{u}...HEAD` → `0/0` (behind/ahead), zero behind. | **PUSHED — auto-approved** under §Amendment 1 (fast-forward YES, baseline unchanged YES). No force, no other branch, **no pull request**. | none new. **One correction recorded**, not a proposal: the `ADOPT-01` evidence block committed in `bad06cc` spelled two tool locations as absolute paths under the operator's home directory. Not the prohibited leak — a scan confirms the resolved **canonical source path** appears nowhere in this log — but unnecessary machine detail in a file committed to a **public** repository, and inconsistent with the `<node-prefix>` form already used on the adjacent npm line. Both were normalized to placeholders in this checkpoint; the evidentiary claim (each version command invoked through its resolved absolute path, so no alias could shadow a tool) is unchanged and still true. |
| 4 | `ADOPT-03` (single step, not a group) | n/a — not a group | `ADOPT-03` = **PASS**. 30 files mirrored from the payload; `diff -r` against both source trees reports **no differences**, so the closed rule's "byte-for-byte mirror" is verified, not asserted. Zero files skipped (target had no colliding path). `.cursor/` correctly excluded by the glob — doubly correct, since Cursor is unselected. `CLAUDE.md` symlink resolves to `docs/base-standards.md` and is staged with mode `120000`, i.e. a real symlink rather than a materialized copy. A zero-file copy was treated as the FAIL it is and checked at the moment of copy, not deferred to validation; the count came back 30. | Run log §`ADOPT-03` evidence block; §Improvement proposals row 4 | **YES** — 32 staged paths, all inside `ADOPT-03`'s closed rule: the `docs/` (7) and `ai-specs/` (23) mirrors, the `CLAUDE.md` root symlink (one of the four the rule names), and the always-permitted run log. Nothing outside the two mirrored trees and the named symlinks; no hidden client directory. Three of the four permitted root symlinks were **not** created — writing fewer paths than an allowlist permits is not an allowlist violation, since the field is a ceiling on permitted writes, not a required set. | YES — declared with the exact 32-path staged list before the gate | **LIVE approval, not auto** — Landaone, 2026-08-25T18:39:44Z, approved the exact mutation after being shown the literal `find` counts (31 payload files, 30 copied, 1 glob-excluded, 0 skipped) and the three options for the absent root instruction files; the operator selected "CLAUDE.md only". The step's auto-approval clause applies **only** where the mechanical comparison shows the copy matches the closed rule exactly; it surfaced a deviation (all four root instruction files absent from the payload, and a conflict between the step's allowlist and `00-conventions.md`'s no-unselected-client boundary), so the deviation reached the live gate exactly as documented. Standing authorization was **not** used to wave this through. | `CLAUDE.md` (A, symlink); `docs/*` (A ×7); `ai-specs/**` (A ×23); `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) — 32 paths | `533313ad4c0664912cb553e79b70df2a97f67e42` — filled after the commit; delta carries into checkpoint 5 | **UNCHANGED FROM THE `ADOPT-00` BASELINE — verdict: no automation triggered.** Re-probed read-only at 2026-08-25T18:39:44Z per §Amendment 1: `workflows=0 hooks=0 rulesets=0 branch-rules=[] keys=0 envs=0`. Identical to row 1's baseline. Fast-forward confirmed: `git rev-list --left-right --count @{u}...HEAD` → `0/0` (behind/ahead), zero behind. | **PUSHED — auto-approved** under §Amendment 1 (fast-forward YES, baseline unchanged YES). Note the two gates stayed distinct here: the commit gate was **live**, the push gate auto-approved on its own separate conditions; neither approval was read as covering the other. No force, no other branch, **no pull request**. | **1 new — proposal 4** (`01-prerequisites-and-install.md`): `ADOPT-03` instructs the runner to expect all four root instruction symlinks to resolve, but three of them are configuration for unselected clients, which `00-conventions.md` forbids across every step — and this payload ships none of the four, while the step's `On failure` table has no row for the absent case. Proposes per-selected-client creation, an `On failure` row, and an explicit statement that `Allowed modifications` is a ceiling, not a checklist. Proposals 1–3 remain `proposed`. |
| 5 | `ADOPT-04` (single step, not a group) | n/a — not a group | `ADOPT-04` = **PASS**. Capability selection recorded first, as this phase file requires: CodeGraph selected, availability established by an **executed** command (`codegraph --version` → 1.5.0, exit 0) rather than asserted. `codegraph init` exit 0: **22 files, 295 nodes, 355 edges, 602ms**. Index proven **queryable**, not merely present: `codegraph explore "list entry points"` returned a non-empty structured result (49 symbols across 3 files) naming real symbols at real line numbers in this repository's own Java sources. No "small repository" exemption sought — the repo is small, which is precisely the rationalization the phase file names and refuses. | Run log §`ADOPT-04` evidence block | **YES** — `ADOPT-04`'s `Allowed modifications` is the closed exact list `.codegraph/`, of which only `.codegraph/.gitignore` is ever trackable. `git add -n .codegraph` reports exactly that one path, and `git check-ignore -v .codegraph/codegraph.db` confirms the 860 KB index database is ignored by CodeGraph's own provisioned rule (`*` / `!.gitignore`) — so the version-dependent index cannot reach the commit. Staged set is that one file plus the always-permitted run log. No unexpected path. | YES — declared with the exact staged file list before the gate | **auto: standing authorization** (Landaone, 2026-08-25T18:12:48Z); subset test YES; branch matches. `ADOPT-04`'s own install gate was never reached — 1.5.0 was already present, so nothing was installed. | `.codegraph/.gitignore` (A); `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) — 2 paths | `2ea875f967f27d65a444ad40453348a1859c7863` — filled after the commit; delta carries into checkpoint 6 | **UNCHANGED FROM THE `ADOPT-00` BASELINE — verdict: no automation triggered.** Re-probed read-only at 2026-08-25T18:41:50Z per §Amendment 1: `workflows=0 hooks=0 rulesets=0 branch-rules=[] keys=0 envs=0`. Identical to row 1's baseline. Fast-forward confirmed: `0/0` (behind/ahead), zero behind. | **PUSHED — auto-approved** under §Amendment 1. No force, no other branch, **no pull request**. | none new; proposals 1–4 remain `proposed` |
| 6 | `ADOPT-05` (single step, not a group) | n/a — not a group | `ADOPT-05` = **PASS**, after the earlier block was resolved by the operator running the command directly — which this phase file names as a legitimate response when automation cannot drive the flow. `codegraph install -t claude -l local --no-permissions`, never `-y`. Every scope-relevant choice **verified from artifacts rather than taken on trust**: project scope (`.mcp.json` in-repo; `~/.claude.json` has **zero** codegraph occurrences despite existing at 61 KB); auto-allow off (`.claude/settings.json` **absent** — its absence is the evidence); claude only (no `.kiro/`, `.agents/`, `AGENTS.md`, `codex.md`, `.cursor/`, `.opencode/`, `.hermes/`; the pre-existing `~/.codex/config.toml`, mtime 2026-08-20, has zero codegraph occurrences); no PATH mutation (`~/.local/bin/codegraph` symlink dated **2026-07-25**, a month earlier). Front-loading and Pro were confirmed **No** by the operator and are recorded as operator-confirmed, explicitly distinguished from the artifact-verified findings, since neither leaves a trace. Validation: `codegraph explore "list public interfaces"` exit 0, 52 symbols across 4 files. | Run log §`ADOPT-05` evidence block; `ADOPTION-AUTHORIZATION.md` §Code-graph capability default privilege scope | **YES** — 4 staged paths, all inside `ADOPT-05`'s closed exact list: `.mcp.json`; the additive `CODEGRAPH_START/END` block in `.claude/CLAUDE.md` (the client's root instruction file — **not** the canonical root symlink, which the allowlist forbids and which `git diff` confirms untouched); `ADOPTION-AUTHORIZATION.md` (**update only**); plus the always-permitted run log. `.claude/settings.json` is absent by design and stages nothing. No adapter or configuration for any unselected client. | YES — declared with the exact 4-path staged list before the gate | **auto-approved under `ADOPT-05`'s own gate clause**, not merely under the standing authorization: the gate auto-approves where the actual choices exactly match the least-privilege defaults in the Rules and in `ADOPTION-AUTHORIZATION.md`'s code-graph privilege-scope policy — project scope YES, automatic allow = No YES. **No deviation toward broader scope or automatic allow occurred**, so nothing reached the live gate. The generated files remain fully diff-reviewable evidence rather than a question answered in the moment. | `.mcp.json` (A); `.claude/CLAUDE.md` (M, additive block only); `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (M); `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) — 4 paths | `ace037731c03bc71881bcd3fe4a9fbf49c7a0ca0` — filled after the commit; delta carries into checkpoint 7 | **UNCHANGED FROM THE `ADOPT-00` BASELINE — verdict: no automation triggered.** Re-probed read-only at 2026-08-25T19:06:50Z per §Amendment 1: `workflows=0 hooks=0 rulesets=0 branch-rules=[] keys=0 envs=0`. Identical to row 1's baseline. Fast-forward confirmed: `0/0` (behind/ahead), zero behind. | **PUSHED — auto-approved** under §Amendment 1. No force, no other branch, **no pull request**. | none new; proposals 1–4 remain `proposed`. **One residual risk carried forward, not closed:** declining the CLI-on-PATH sub-question prints a warning that agents cannot launch the MCP server without it, and that warning does not account for an already-resolvable PATH entry. Deferred to `ADOPT-15`'s fresh-session runtime-discovery gate, whose documented recovery is to re-run `codegraph install` accepting the PATH install. Filesystem configuration passing here establishes **no** runtime discovery. |

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
| 4 | `ADOPT-03` | `specboot-adoption/01-prerequisites-and-install.md` | The step's "Root instruction single source" section and its `Allowed modifications` both cover all four root instruction files (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `codex.md`), and the section instructs the runner to expect every one of them to resolve to `docs/base-standards.md`. That conflicts with `00-conventions.md`'s scope boundary, which holds across *every* step: "Never create adapters or configuration for a client the repository did not explicitly select." On a single-client adoption the two cannot both be satisfied — three of the four files are root instruction files for clients recorded NOT SELECTED, and `AGENTS.md` is the very marker `bootstrap-kit/client-autodiscovery.md` probes *as* the Codex marker. A second, independent gap: this payload (`packages/specboot/template/`) ships **none** of the four, so the `test -L ... && readlink ...` block cannot pass as written for any of them, yet the step gives no `On failure` row for "root instruction file absent" — only for "is a real file, not a symlink". Proposal: (a) state that the four root instruction files are created **per selected client**, with the client-neutral single-source target unchanged, so an unselected client's file is correctly absent rather than a failed expectation; (b) add an `On failure` row for the absent case, pointing at creating the selected client's symlink; and (c) say explicitly that `Allowed modifications` is a ceiling on permitted writes, not a checklist of required ones — the run log for this adoption had to argue that from first principles at a live gate. | `proposed` |

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
