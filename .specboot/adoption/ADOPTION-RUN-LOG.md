# SpecBoot Adoption Run Log

Filled copy of `specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md`. Filled as the run
goes, not at the end. Evidence discipline per `00-conventions.md`: an unexecuted or failed command
is FAIL, never an inferred PASS from empty output.

---

## Run identification

```text
Repository:              app-prices-rest (linked worktree: app-prices-rest-specboot-ai-adoption-v2)
Branch:                  experiment/specboot-ai-adoption-v2
Adoption date:           2026-08-15
Operator:                Landaone
Client(s) selected:      Claude
CodeGraph adopted:       PENDING — ADOPT-04 / ADOPT-05 not yet reached
Reason if not adopted:   n/a
Guide revision used:     1271266d753c46c50e3b730c0b0284b19dc33648 (originally
                          834ee535de598247318ed6beaccfb73793bfe064 at ADOPT-00's initial
                          provisioning; advanced at this fresh-session resume — see Drift check
                          table below)
```

---

## Source and delivery mode

```text
Delivery mode:                              source-linked
Guide checksum   (SPECBOOT_ADOPTION_GUIDE.md):
                 sha256:2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0
Skill checksum   (ai-specs/skills/specboot-adopt/SKILL.md):
                 sha256:2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3
Git worktree state:                         clean
Git status:                                 recorded
Source Git commit:                          834ee535de598247318ed6beaccfb73793bfe064
Git unavailable — reason:                   n/a (status is recorded)
Observed HEAD (dirty worktree only):        n/a (worktree is clean)
Local source path resolution:               The local canonical source path is resolved per machine
                                            and is not recorded here.
Source treated as read-only for the whole adoption: YES
```

**Source topology observed (context, not identity).** The canonical source is a detached-HEAD,
**sparse-checkout** linked worktree of the *same underlying Git repository* as this target. Its
sparse cone exposes exactly `/SPECBOOT_ADOPTION_GUIDE.md`, `/specboot-adoption/`, and
`/ai-specs/skills/specboot-adopt/`. Its `.claude/skills/specboot-adopt` is tracked but flagged
`skip-worktree`, which is why it is absent from disk while `git status` is legitimately empty.
`worktree: clean` is therefore an accurate reading, not a missed dirty tree. A later reader
resolving commit `834ee535` will find more files than the source worktree exposed; identity is
unaffected, because the checksums were computed over the bytes actually read.

### Drift check at each resume

| Resumed at (date/time) | Local path obtained from | Guide checksum matches | Skill checksum matches | Commit matches | Verdict | Reconciliation decision |
|---|---|---|---|---|---|---|
| 2026-08-15 (fresh session per `ADOPT-00`'s handoff prompt) | `.specboot/local/canonical-source-path` (machine-local store; convenience, checksummed exactly as a typed path would be) | YES — `sha256:2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0` recomputed and matched | YES — `sha256:2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3` recomputed and matched | **NO** — manifest recorded `834ee535de598247318ed6beaccfb73793bfe064`; source HEAD is `1271266d753c46c50e3b730c0b0284b19dc33648`. Verified via `git merge-base --is-ancestor`: the manifest commit **is** an ancestor of HEAD (clean fast-forward, one intervening commit, source worktree still clean). `git diff` of that one commit against the two checksummed files: **empty** — content identity independently confirmed, not merely inferred from the matching checksums. | Both checksums match exactly, so this is **not** the checksum-mismatch drift the handoff prompt names as blocking. But the one intervening commit ("Wire ADOPTION-AUTHORIZATION.md's creation into ADOPT-00") changes `09-bootstrap.md` — outside the two-file checksum baseline — to add `.specboot/adoption/ADOPTION-AUTHORIZATION.md` to `ADOPT-00`'s own mutation inventory and `Allowed modifications`, a requirement that did not exist when the previous session's Gate 1/Gate 2 approvals were granted. | Not silently absorbed. Treated as a **new gate** (Gate 3), consistent with non-negotiable 1 ("never self-approve") and the previous session's own Gate-2 precedent (new mechanism discovered mid-run ⇒ new gate, not an adjustment). Operator approved at Gate 3, 2026-08-15 — see the `ADOPT-00` evidence block below and the Decision record. |

---

## Client selection

```text
Route used: autodiscovery
```

| Client | Displayed as a candidate by autodiscovery | Explicitly SELECTED by the human | Recorded status |
|---|---|---|---|
| Claude | NO | YES | SELECTED |
| Kiro | NO | NO | NOT SELECTED |
| Codex | NO | NO | NOT SELECTED |

Autodiscovery probe result: **no candidates found**. Probes run (all read-only existence/content
reads): Claude — `.claude/`, `.claude/skills/`, `.claude/settings.json`, root `CLAUDE.md`; Kiro —
`.kiro/`, `.kiro/skills/`, `.kiro/settings/`; Codex — `.agents/`, `.agents/skills/`, `AGENTS.md`,
`codex.md`. Every one absent.

Repository tree byte-for-byte unchanged when the findings were displayed: **YES**
Finding nothing was treated as a finding and the operator was still asked: **YES** — Claude was
then named explicitly by the human.

### Two axes, never collapsed

| Client | This adoption | Recipe status | Effect on this run |
|---|---|---|---|
| Claude | SELECTED | recipe available; this run records its own fresh-session result | gate outstanding — see `ADOPT-00` |
| Kiro | NOT SELECTED | recipe available | none |
| Codex | NOT SELECTED | **`PENDING EVIDENCE`** — gate parts 1–2 complete; part 3 not observed | **none** — nothing provisioned, nothing validated, nothing owed |

Codex's outstanding obligation is **not** discharged by this run, which did not select it. It stays
`PENDING EVIDENCE` as a shipped recipe, and is neither converted to PASS nor quietly dropped.

---

## Step state — resume checklist

| Step | File | Status | Date |
|---|---|---|---|
| `ADOPT-00` | `09-bootstrap.md` | **PASS** — fresh-session discovery observed, Gate 3 resolved | 2026-08-15 |
| `ADOPT-01` | `01-prerequisites-and-install.md` | **PASS** | 2026-08-15 |
| `ADOPT-02` | `01-prerequisites-and-install.md` | **PASS** — checkpointed | 2026-08-15 |
| `ADOPT-03` | `01-prerequisites-and-install.md` | **PASS** — checkpointed | 2026-08-16 |
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

---

## Evidence blocks

### `ADOPT-00` — Bootstrap Client Discovery

- Repository had SpecBoot files / AI configuration before this step: **NO**
- **Cold-start state confirmed**: **YES, with one recorded deviation.** The *repository* is cold —
  no `.specboot/`, no SpecBoot files, no repo-level OpenSpec artifacts (`openspec/`, `.openspec`,
  `openspec.json`, `package.json`, `.mcp.json` all absent), no discoverable `specboot-adopt` skill.
  **Deviation:** the *machine* carries `openspec` 1.7.0 and `codegraph` on PATH, and the
  orchestrating session listed `/opsx:*` skills from user-level configuration. That is machine-level
  tooling, not a repository installation, and it changes nothing procedurally — the embargo below
  was honoured regardless. Recorded rather than ticked away, because the entry prompt's cold-start
  premise asserts their absence.
- **Canonical source supplied**: **SUPPLIED** (runtime input; checksums and Git disposition in the
  *Source and delivery mode* block — the resolved path is recorded nowhere in this log)
- **Three-artifact validation, run before any orchestration load and before the first write:**
  - `SPECBOOT_ADOPTION_GUIDE.md` present: **YES** (343 lines, readable)
  - `specboot-adoption/` present: **YES** (directory)
  - `ai-specs/skills/specboot-adopt/SKILL.md` present **and readable as a file**: **YES** (70 lines)
  - *(the launcher additionally validated a fourth artifact,
    `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`: present and readable, 292 lines)*
  - Verdict: **VALID** — missing: none
  - If REJECTED, target left byte-for-byte unchanged: n/a — not rejected
- **Self-adoption check (launcher Step 0), run before the four-artifact check:** resolved
  symlink-free paths compared, plus device:inode. Target `16777220:6249477`, candidate
  `16777220:6083352` — **distinct**. Git identity was deliberately **not** compared, and that
  mattered here: the source and target are separate linked worktrees of the **same** underlying Git
  repository, sharing common Git directory, root commit, and origin. A Git-identity comparison would
  have produced a **false self-adoption refusal** against a legitimate setup.
- **Refusals reached:**
  - No canonical source supplied: **NONE**
  - Supplied source failed the three-artifact validation: **NONE**
  - No client selected: **NONE**
  - Selected client has no recipe: **NONE**
  - Selected client cannot discover the external skill without symlinks: **NONE** — symlink probe
    passed, so R5 was not reached
  - For every REFUSED row above: n/a — no refusal was reached
- **Orchestration procedure obtained by a source-relative direct read of `SKILL.md`** (a direct
  read, **not** native skill discovery): **YES** — path read (source-relative):
  `ai-specs/skills/specboot-adopt/SKILL.md`
- **Client-selection route:** autodiscovery
- Selected client(s) (**declared by the operator, never inferred**): **Claude**
- Every other supported client recorded `NOT SELECTED`: **Kiro — NOT SELECTED; Codex — NOT SELECTED**
- OS / shell: **Darwin 22.6.0 (macOS) / zsh**
- Symlink probe result (capability-detected, not assumed): **SUPPORTED** —
  `ln -s . .specboot-symlink-probe` exit 0, symlink verified with `-L`, `rm` exit 0, residue check
  clean, `git status` 0 changes afterwards. Probe deferred to provisioning time per
  `client-autodiscovery.md`, because it needs to create a temporary file and therefore may not run
  before the approval gate.
- Pre-existing artifacts detected, and their disposition: **`.gitignore`** — pre-existing, 30 lines,
  **modified by append only**, original content preserved byte-for-byte (backed up and diffed).
  No other target path existed.
- **Manifest entry count: 2**
- **Preflight, run before the first write:**
  - Paths resolved and classified: `.claude/`, `.claude/skills/`, `.claude/skills/specboot-adopt`,
    `.claude/CLAUDE.md`, `.specboot/`, `.specboot/adoption/BOOTSTRAP-MANIFEST.json`,
    `.specboot/adoption/ADOPTION-RUN-LOG.md`, `.specboot/local/`,
    `.specboot/local/canonical-source-path`, `.git/info/exclude` — all **absent**;
    `.gitignore` — **pre-existing** (append-only).
  - Collisions detected: **NONE**
- **Exact mutation inventory presented at the approval gate:** two Claude discovery entries
  (`.claude/skills/specboot-adopt` as a symlink; `.claude/CLAUDE.md` as a real file carrying the
  recipe's verbatim delimited block), their two container directories, the durable state
  (`.specboot/adoption/BOOTSTRAP-MANIFEST.json`, `.specboot/adoption/ADOPTION-RUN-LOG.md`), the
  machine-local store (`.specboot/local/canonical-source-path`), the two ignore-rule edits, and the
  transient symlink probe — each named with its operation, mechanism, and reversibility.
- **Manifest entry count corrected at the gate, before approval.** The inventory first stated 5
  entries. The operator challenged it; re-verification against the schema and `10-debootstrap.md`
  confirmed **2**. `.specboot/local/…`, `.git/info/exclude`, and `.gitignore` are *permitted
  mutations that are not manifest entries*: none has a `source.canonicalPath` (a required field
  defined as the source-relative canonical path the entry points at), `ADOPT-18` Step 5b removes
  `.specboot/local/` **by name** — listed separately from the entry set in its `Allowed
  modifications` — and neither ignore file appears anywhere in `ADOPT-18`'s allowed modifications,
  so recording them as entries would oblige a step to act on paths it may not touch. The selected
  client's recipe `## Entries` table **is** the manifest entry set: exactly two rows.
- **Provisioning performed exactly that inventory and nothing outside it:** **YES**, after the
  second gate below.
- **A second approval gate was required mid-provisioning.** The approved inventory named
  `.git/info/exclude` as a repository-local, machine-local file. This target is a **linked
  worktree**: `.git` is a *file*, and `git rev-parse --git-path info/exclude` resolves to the
  **shared common** Git directory read by **8 worktrees** — including the canonical source
  worktree. That is a different mechanism and blast radius than the one approved, so it was treated
  as a **new gate, not an adjustment**: provisioning stopped, the pre-provisioning state was
  restored, the finding was reported, and the operator chose the mechanism. Approved: append the
  delimited block to the shared common exclude. Rationale recorded: it is the kit's specified
  mechanism resolved through git's own `--git-path`; the file already carries cross-worktree
  `**/.claude/…` machine-local rules; it is never committed; and it is inert in the other 7
  worktrees, where the path is either tracked (ignore rules never affect tracked files) or absent.
- **Provisioning failure, if any** — pre-provisioning state restored with no partial discovery
  entry, manifest, run log, ignore rule, or machine-local store: **RESTORED** (attempt 1 — see the
  Correction record). Verified after rollback: `git status --porcelain` empty, `.gitignore`
  byte-identical to its backup, `.claude/` absent, `.specboot/` absent, no probe residue.
- **Obligations recorded** — payload: `SKIPPED — source-linked mode`;
  container: `SKIPPED — source-linked mode`
- `.specboot/bootstrap/` never created at any point: **YES**
- No copied guide, phase file, or skill body anywhere in the project: **YES** — nothing canonical
  was copied; the only reference is the symlink
- Discovery entries point at the external canonical source, and none was staged for any checkpoint:
  **YES** — nothing has been staged or committed by this session at all
- Machine-local `.specboot/local/` store holds the resolved path and nothing else, and
  `git check-ignore` reports it ignored: **YES** — one line, the path, nothing more
- Client-selection record carries no placeholder: **YES** — `selected: ["claude"]`,
  `notSelected: ["kiro","codex"]`; schema-rejected placeholders were negative-tested
- Manifest validated against `BOOTSTRAP-MANIFEST.schema.json`: **PASS**. No `jsonschema` module was
  available and installing one would have required unauthorized network access, so an offline
  draft-07-subset validator was written against the canonical schema file and **negative-tested
  against 10 deliberately invalid variants** — dirty-worktree-carrying-a-commit, placeholder
  `selectedClient`, placeholder in `selected`, empty `selected`, a resolved absolute path in the
  `source` block, a reworded `local-path-resolution` const, an entry missing `source.canonicalPath`,
  the forbidden `pointer-file` mode, `not-a-repository` carrying `observed-head`, and a missing
  `entries` — **all 10 correctly rejected**, and the real manifest passes.
- **Session stopped after provisioning and generated the fresh-session handoff prompt:** **YES** —
  recorded verbatim below.
- **No OpenSpec or `/opsx:*` command used before `ADOPT-02` completed and its availability check
  passed:** **YES** — none was invoked at any point in this session. `command -v openspec` is a
  shell lookup, not an OpenSpec command, and was used only to record cold-start evidence.
- `git check-ignore .specboot/bootstrap/…` verdict: **IGNORED**
- `git check-ignore .specboot/local/…` verdict: **IGNORED**
- `git check-ignore .specboot/adoption/…` verdict: **not ignored** (correct — durable evidence)
- `git check-ignore .claude/skills/specboot-adopt` verdict: **IGNORED** (via the shared common
  exclude)
- No bare `.specboot/` rule written: **YES** — the two rules are `.specboot/bootstrap/` and
  `.specboot/local/` only
- Fresh-session discovery probe — exact prompt used: **see the handoff prompt below** (delivered
  verbatim by the prior session; no operator-supplied path or content accompanied it)
- Fresh-session outcome, verbatim: **OBSERVED, this session (2026-08-15).** Two independent pieces
  of evidence: (1) `specboot-adopt` appeared, unprompted, in this session's system-reminder listing
  of available skills — harness-populated from the provisioned discovery symlink
  (`.claude/skills/specboot-adopt` → `/Users/landaeta/repos/specboot/ai-specs/skills/specboot-adopt`,
  verified via `readlink`), not self-reported. (2) The `Skill` tool was invoked with
  `skill: "specboot-adopt"` and no operator-supplied path; the tool result returned the skill's
  `SKILL.md` body verbatim (Overview, Quick Reference table, ten Non-negotiables, Common Mistakes,
  Red Flags, required-sub-skill note) — proof the client executed the adoption contract through
  native discovery, not a direct file read. This satisfies the criterion the previous session could
  not: "a genuinely fresh session ... surfaces `specboot-adopt` and reaches this guide with no
  operator-supplied paths."
- Fresh session resumed from the durable manifest and run log, with source identity verified:
  **YES** — run log's step-state table read first (named `ADOPT-00` as next step before any other
  action); local canonical source path obtained from `.specboot/local/canonical-source-path`
  (machine-local store, not operator-typed); both checksums recomputed and matched the manifest's
  `source` block exactly. Commit did not match byte-for-byte (see Drift check table) but was verified
  a clean fast-forward ancestor with an empty diff on both checksummed files — content identity
  independently confirmed, not inferred.
- **Gate 3 — a new gate found mid-resume, not part of the original two.** Diffing the one commit
  between the manifest's recorded source commit and current HEAD (routine due diligence once the
  commit mismatch was observed, not reading ahead in the guide) showed `09-bootstrap.md` itself had
  changed: `.specboot/adoption/ADOPTION-AUTHORIZATION.md` is now part of `ADOPT-00`'s own mutation
  inventory and `Allowed modifications`, created by `ADOPT-00` rather than left for a later step to
  find missing. Neither of the previous session's two gates covered this file. Per non-negotiable 1
  ("never self-approve") and the previous session's own Gate-2 precedent, this was presented to the
  operator as a new gate rather than silently created. Three sub-decisions, all 2026-08-15,
  Landaone:
  - **Approved** creating `.specboot/adoption/ADOPTION-AUTHORIZATION.md` now, assembled from
    `run-template/ADOPTION-AUTHORIZATION.template.md`, with the client-selection section filled from
    this step's own step-5 outcome (Claude, autodiscovery) and the OpenSpec-version and
    code-graph-privilege-scope sections pre-filled with the template's stated defaults (no
    deviation), explicitly marked for confirmation when `ADOPT-02`/`ADOPT-05` are reached per the
    canonical progressive-update contract.
  - **Granted** standing commit-and-push authorization for this run: scope = every checkpoint whose
    staged file list is a subset of its step's declared `Allowed modifications`, on branch
    `experiment/specboot-ai-adoption-v2`; conditions = fast-forward push only and remote-impact
    assessment unchanged from the `ADOPT-00` baseline. Any staged path outside a step's allowlist
    remains `FAIL_CLOSED` regardless, per the template's own Notes section.
  - **Declared** the team environment matrix as scoped to this operator/machine only (Claude;
    this repository's observed stack; zsh; macOS), evidence "none — declared directly," given this
    is a single-operator lab/experiment repository — recorded now rather than deferred to
    `ADOPT-05B`, since the question was already resolved as part of unblocking this gate.
    `ADOPT-05B` confirms or corrects this recorded matrix when reached rather than asking blank.
  - File created and verified present: `.specboot/adoption/ADOPTION-AUTHORIZATION.md`, 3068 bytes.
    Not a manifest `entries` member (confirmed against
    `bootstrap-kit/BOOTSTRAP-MANIFEST.schema.json`: `entries[]` has no field for it, and it carries
    no `source.canonicalPath`) — it is a durable-state file alongside `BOOTSTRAP-MANIFEST.json` and
    `ADOPTION-RUN-LOG.md`, per `09-bootstrap.md`'s own "Durable record" table. Manifest entry count
    unaffected: still **2**.
  - `git check-ignore -v .specboot/adoption/ADOPTION-AUTHORIZATION.md`: exit 1 (**not ignored**,
    correct — committable durable evidence, same as the manifest and run log).
  - External canonical source verified byte-for-byte unchanged throughout this session:
    `git -C <source> status --porcelain` empty, HEAD unchanged at `1271266d753c46c50e3b730c0b0284b19dc33648`
    before and after.
- Approval (who, when, exactly what was approved):
  - **Gate 1 — 2026-08-15, Landaone:** the exact mutation inventory, after the entry count was
    corrected from 5 to 2 at their challenge.
  - **Gate 2 — 2026-08-15, Landaone:** the shared common `info/exclude` mechanism, after the linked
    worktree was discovered mid-provisioning.
  - **Gate 3 — 2026-08-15, Landaone:** creation of `ADOPTION-AUTHORIZATION.md` with the content
    above, standing commit-and-push authorization, and the single-operator/machine environment
    matrix — see the three sub-decisions above and the Decision record.
- Result: **PASS.** Every criterion `09-bootstrap.md` names is now satisfied on evidence: the
  fresh-session discovery-and-execution gate observed (above); `.specboot/bootstrap/` never created;
  no copied canonical content anywhere in the project; payload/container obligations
  `SKIPPED — source-linked mode`; discovery entries resolve to the external canonical guide and
  skill; external canonical source byte-identical throughout; manifest valid against schema (content
  unchanged since the prior session's validation); `git check-ignore` verdicts correct for
  `.specboot/bootstrap/`, `.specboot/local/`, `.specboot/adoption/`, and the new
  `ADOPTION-AUTHORIZATION.md`; `clientSelection` carries no placeholder; no
  `pre-existing-untouched` path modified. Not yet checkpointed (staged/committed/pushed) — that is
  the checkpoint protocol's own separate procedure, taken up next.

#### Handoff prompt, verbatim

```text
You are resuming a SpecBoot adoption in the repository this session is rooted at. This is the fresh
session that `ADOPT-00` handed off to; the session that provisioned it has stopped.

Do not re-run the adoption entry prompt, and do not re-ask questions already answered — the answers
are recorded in durable state.

1. Resume from the durable state, in this order:
   - `.specboot/adoption/ADOPTION-RUN-LOG.md` — read the step-state table first and name the next
     step before doing anything else.
   - `.specboot/adoption/BOOTSTRAP-MANIFEST.json` — the durable control record.

2. Obtain a local canonical source path:
   - from `.specboot/local/canonical-source-path` where it exists on this machine — it is
     git-ignored, holds the path and nothing else, and reading it is a convenience, never a
     shortcut;
   - otherwise by asking the operator, or by rediscovering the source. Being asked is the ordinary
     case, not a failure: no path is recorded in the committed manifest, so none can be required to
     exist.
   Record in the run log where the path came from — never the path itself.

3. Verify source identity by recomputing both checksums against whatever source you obtained,
   however you obtained it, and comparing them with the manifest's `source` block plus the recorded
   commit. A path is accepted only when they match. Reuse is not trust: a path read from the store
   is checksummed exactly like one the operator just typed.

4. Block on drift. A checksum mismatch means the canonical instructions changed underneath this
   run — stop for human reconciliation rather than continuing against instructions nobody approved.

5. Attempt native skill discovery here, and only here. This is the first session in which
   `specboot-adopt` could be discoverable at all. Invoke it by name and let it execute the adoption
   contract. Record the discovery-and-execution result verbatim in the run log as `ADOPT-00`'s
   fresh-session evidence. Filesystem presence is not discovery, and the previous session's
   source-relative direct read of `SKILL.md` is not discovery.

6. `ADOPT-00` stays `PENDING` until that probe passes. When it does, record it `PASS` with its
   evidence, then continue through every reachable adoption step, stopping only at documented
   human-approval gates or genuine external blockers.

Use no OpenSpec command and no `/opsx:*` command until `ADOPT-02` has completed and its OpenSpec
availability check has explicitly passed. Until then OpenSpec's absence from this repository is the
expected state — never a blocker and never an error.
```

---

### `ADOPT-01` — Install Prerequisites

```text
Date: 2026-08-15
Machine: Darwin 22.6.0 (macOS), zsh
Node: v24.18.0 (>= 20.19.0 required — PASS)
npm: 11.16.0 (bundled with Node)
OpenSpec: 1.7.0 (already on PATH; machine-level presence, not yet installer-provenanced — ADOPT-02
  determines whether this run's own install/upgrade command runs or is skipped)
CodeGraph: 1.5.0 (already on PATH; same caveat — capability availability is not installer
  provenance, per 00-conventions.md)
Git: 2.39.2 (Apple Git-143)
Project runtime: Java 11 (pom.xml `<java.version>11</java.version>`; installed JVM confirmed via
  `java -version`: OpenJDK Corretto-11.0.31)
Project build tool: Maven — `pom.xml` present, Spring Boot 2.4.5 parent (`spring-boot-starter-data-jpa`,
  `spring-boot-starter-web`). The repo's own `./mvnw` wrapper is broken (`.mvn/wrapper/` was never
  committed to this repository — confirmed via `git log --all -- .mvn`, empty; a pre-existing repo
  defect, not something this step's Action names or this adoption is scoped to fix — recovery table
  says "Project build tool missing -> follow the repository development guide"). System Maven
  3.9.16 (`which mvn` -> `/Users/landaeta/.sdkman/candidates/maven/current/bin/mvn`) is available and
  usable instead, and matches this guide's own "Reference experiment" column value for this exact
  tool (`Java 11 + Maven 3.9.16`) — strong evidence this repository (or a sibling worktree of it) is
  the guide's own reference experiment repo.
Result: PASS — every required executable already present and meeting or exceeding the documented
  minimum. Nothing installed or upgraded, so the `[HUMAN APPROVAL REQUIRED]` gate (which applies
  "before installing or upgrading software") was never reached — there was no installation or
  upgrade action to gate.
Notes: Repository-specific toolchain identified from project evidence (`pom.xml`, `mvnw`), not
  assumed. No `README.md` at repo root (only `HELP.md`, a Spring Initializr default) — did not
  affect toolchain identification, since `pom.xml` was sufficient and present.
```

---

### `ADOPT-02` — Install and Initialize OpenSpec with Explicitly Selected Clients

```text
OpenSpec version: 1.7.0 — already installed, meets ADOPT-01's documented-keys requirement.
Command: install/upgrade command SKIPPED (not run) — the installed version already met the
  documented requirement, per design D-Z part 6; `openspec init --tools claude --no-animation`
  actually executed
Clients offered: full `--tools` enum (amazon-q, antigravity, auggie, bob, claude, cline,
  codeartsagent, codex, devin, forgecode, codebuddy, continue, costrict, crush, cursor, factory,
  gemini, github-copilot, hermes, iflow, junie, kilocode, kimi, kiro, lingma, vibe, oh-my-pi,
  opencode, pi, qoder, qwen, roocode, trae, zcode, windsurf) — inspected via `openspec init --help`
  before running, per the step's own "inspect the available client options" instruction
Clients selected: claude only — explicitly passed as `--tools claude`, matching the client
  selection already declared and approved at ADOPT-00 (manifest `selectedClient: "claude"`,
  `clientSelection.selected: ["claude"]`). Not an interactive-default accept: the exact value was
  chosen deliberately from the inspected list, satisfying "do not accept defaults without review."
Generated config path: openspec/config.yaml (this installed version generated the .yaml, not .yml,
  extension — used as the guide instructs, "use the actual generated path")
Generated client resources: .claude/skills/{openspec-apply-change,openspec-archive-change,
  openspec-explore,openspec-propose,openspec-sync-specs,openspec-update-change}/SKILL.md (6);
  .claude/commands/opsx/{apply,archive,explore,propose,sync,update}.md (6) — matches the CLI's own
  reported "6 skills and 6 commands in .claude/". `.claude/CLAUDE.md` (the SpecBoot bootstrap
  pointer block from ADOPT-00) verified byte-unchanged: `git diff -- .claude/CLAUDE.md` empty.
Per-client provisioning provenance (installer-provisioned vs. separately configured): all of the
  above installer-provisioned by this run's own `openspec init --tools claude` invocation —
  directly observed, not inferred from presence (per 00-conventions.md's "capability availability
  is not installer provenance").
openspec doctor result: "OpenSpec root: ok"; Location resolved to the repository root; References
  "(none declared)" — expected at this point in the adoption, no findings.
Git changes: `git status --porcelain --ignored=matching` — new untracked: `.claude/commands/`,
  `.claude/skills/` (contains both the new openspec-* skill dirs and the pre-existing, still-ignored
  `specboot-adopt` symlink — confirmed the symlink itself still resolves and is still excluded via
  `!!`), `openspec/`. No other top-level directory appeared — confirmed via `ls -la` — so no
  resources were added for any unselected client.
Result: PASS — `openspec/` exists; `openspec/config.yaml` exists; Claude-specific resources exist;
  no unselected-client resources found.
```

---

### `ADOPT-03` — Import SpecBoot

```text
Source: packages/specboot/template/ (within the same canonical source already resolved and
  validated at ADOPT-00, `.specboot/local/canonical-source-path`, pinned commit
  1271266d753c46c50e3b730c0b0284b19dc33648) — NOT the source's own repository root. Materialized
  via `git archive <pinned-commit> -- packages/specboot/template/docs packages/specboot/template/ai-specs`
  piped to `tar -x --strip-components=3` into a scratch directory, deliberately never touching the
  source worktree itself (no `git sparse-checkout` change, no working-directory write in the
  source) — `git status --porcelain` and `git sparse-checkout list` in the source confirmed
  byte-for-byte unchanged before and after. This mechanism was necessary because the source is a
  sparse-checkout worktree that materializes only the three ADOPT-00 bootstrap artifacts on disk;
  `packages/specboot/template/`, though tracked at that same commit, is outside its checked-out
  cone.
  **Correction chain, recorded in full because it changed what was actually copied:** an initial
  attempt extracted `docs/`, `ai-specs/`, and the four root pointer files from the source
  repository's own root (also tracked at the same commit, also outside the sparse cone, extracted
  the same way) rather than from `packages/specboot/template/`. The operator caught this and
  corrected it, twice: first identifying that root-level `docs/` (8 files, including an extra
  `openspec-tasks-mandatory-steps.md` not in the template) and root-level `ai-specs/skills/` (14
  directories, including `openspec-sync-specs`, `show-spec-working`, `sync-agent-symlinks`, and —
  incoherently — a copy of `specboot-adopt` itself) reflect that source repository's own
  accumulated development/pilot history, not the clean distributable baseline; then, after
  re-verification against `packages/specboot/template/` directly, catching a second error in the
  corrected count (`ai-specs/agents/` recorded as 4 files when the pinned tree has 3 — no
  `java-backend-developer.md`, carried over by mistake from the first, wrong extraction). Both
  corrections were verified directly against the pinned commit's tree (`git ls-tree`) before
  re-presenting the mutation inventory, not accepted on assertion.
Target: /Users/landaeta/repos/labs/app-prices-rest-specboot-ai-adoption-v2 (repository root)
Exact command: `cp -rn <scratch-extraction-of-packages/specboot/template>/* .`, run from the target
  repository root, after a dry-run collision check (`find` + existence test per path) confirmed
  zero collisions — every path was new. Then, as a separate action not covered by `cp` (the
  template ships no pre-made symlinks): `ln -s docs/base-standards.md AGENTS.md` (and the same for
  `CLAUDE.md`, `GEMINI.md`, `codex.md`), matching `packages/specboot/bin/init.js`'s behavior per the
  step's own "Root instruction single source" note.
Files added: `docs/` (7: `api-spec.yml`, `backend-standards.md`, `base-standards.md`,
  `data-model.md`, `development_guide.md`, `documentation-standards.md`, `frontend-standards.md`);
  `ai-specs/agents/` (3: `backend-developer.md`, `frontend-developer.md`,
  `product-strategy-analyst.md`); `ai-specs/scripts/code_review.sh`;
  `ai-specs/specboot-instructions.md`; `ai-specs/skills/` (10 directories: `adversarial-review`,
  `code-auditing` [+ 2 reference files], `commit`, `enrich-us`, `explain`, `meta-prompt`,
  `specboot-verify`, `update-docs`, `using-git-worktrees`, `writing-skills` [+ 5 supporting files]).
  Root symlinks: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `codex.md` (all → `docs/base-standards.md`).
Files skipped because they existed: none — the dry-run collision check found zero pre-existing
  paths at any of the copied locations.
Hidden directories expected but not copied: `.cursor/rules/use-base-rules.mdc` exists under
  `packages/specboot/template/` but was correctly excluded — hidden directories are never matched
  by the shell glob `*` in `cp -rn <SOURCE>/* .`, exactly as this step's own text warns, and no
  Cursor resources were wanted since only Claude was selected at `ADOPT-00`.
Root instruction symlinks resolve to docs/base-standards.md: YES, all four — verified via
  `test -L <file> && readlink <file>` after creation: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`,
  `codex.md` each print exactly `docs/base-standards.md`.
Per-client provisioning provenance (installer-provisioned vs. separately configured): none of this
  content is client-specific (no `.claude/`, `.kiro/`, etc. touched) — it is the client-agnostic
  `ai-specs/`/`docs/` baseline every later client-adapter step (`ADOPT-09`–`ADOPT-15`) works from.
Result: PASS — `find docs`/`find ai-specs` confirm all expected content present; `git status --short`
  shows exactly the new paths and nothing else; all four root symlinks resolve correctly; the
  external canonical source verified untouched throughout (`git status --porcelain` empty,
  `git sparse-checkout list` unchanged, same three entries as before this step began).
```

---

## Checkpoint ledger

| # | Step or group | Grouping justification | Validation | Evidence pointers | Allowlist match | Ready declared | Approval | Exact staged file list | Commit SHA | Remote-impact assessment + verdict | Push status | Improvement proposals raised |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `ADOPT-00` | n/a — single step, default one-checkpoint-per-step | PASS on every criterion `09-bootstrap.md` names (see evidence block above) | this run log's `ADOPT-00` evidence block; `BOOTSTRAP-MANIFEST.json`; `ADOPTION-AUTHORIZATION.md` | **YES** — staged set `{.gitignore, .claude/CLAUDE.md, .specboot/adoption/BOOTSTRAP-MANIFEST.json, .specboot/adoption/ADOPTION-RUN-LOG.md, .specboot/adoption/ADOPTION-AUTHORIZATION.md}` is exactly the fixed durable-state set plus the one non-machine-local Claude discovery entry; `.claude/skills/specboot-adopt` (machine-local symlink) correctly excluded, confirmed via `git status --ignored` (`!!`) and an independent reviewer agent | **YES** | **Commit: auto-approved via standing authorization** (`ADOPTION-AUTHORIZATION.md` Gate 3b, granted 2026-08-15 by Landaone) — allowlist match YES, so no live question asked; auto-approval itself recorded here as evidence, not presented as a live human review. **Push: auto-approved under the same standing authorization**, its fast-forward and unchanged-remote-impact conditions independently verified below before the push ran. | `.gitignore`, `.claude/CLAUDE.md`, `.specboot/adoption/BOOTSTRAP-MANIFEST.json`, `.specboot/adoption/ADOPTION-RUN-LOG.md`, `.specboot/adoption/ADOPTION-AUTHORIZATION.md` — independently reviewed by a separate agent (see below) before commit; clean bill of health, one disclosed non-blocking observation | `1c2198e650797fdb799564a3cad020387027c0a0` | Inspected read-only via `gh api` against `Landaone/app-prices-rest` (public, not archived, default branch `master`): 0 registered Actions workflows, 0 webhooks, 0 rulesets; working branch `experiment/specboot-ai-adoption-v2` did not exist on the remote (404), so no branch protection could apply and the push creates a new ref rather than rewriting one. **Verdict: no automation triggered; this determination is itself the `ADOPT-00` remote-impact baseline** the standing authorization's conditions reference going forward. | **Pushed** — `git push -u origin experiment/specboot-ai-adoption-v2`, exit 0, `* [new branch] experiment/specboot-ai-adoption-v2 -> experiment/specboot-ai-adoption-v2`. Not a force push; the only branch named by this run. No PR opened (correctly withheld — non-negotiable 6: no PR until `ADOPT-00`…`ADOPT-19` are all PASS). | 4 (see Improvement proposals table) |

**Independent review of the staged diff** (checkpoint protocol step 5): performed by a separate
`general-purpose` subagent with no prior context on this run, given only the working directory and
the declared allowlist. Findings: staged set matched the allowlist exactly; `.gitignore` diff was a
pure append; `.claude/CLAUDE.md` carried a reasonable delimited pointer block with no copied
canonical content, secrets, or absolute paths; `ADOPTION-AUTHORIZATION.md` was internally consistent
with no unfilled placeholders; no secrets or credentials found anywhere in the staged diff. One
disclosed, non-blocking observation: `ADOPTION-RUN-LOG.md`'s narrative evidence text (not the
manifest, not any discovery entry) contains three `/Users/landaeta/...` paths, from recording
command output verbatim (a `readlink` result, a PATH lookup, and linked-worktree `.git` file
contents) per the evidence-discipline rule ("record the exact command... and its output"). This is
consistent with the previous session's own already-recorded practice in this same run log (e.g. the
`codegraph` PATH location, worktree inode numbers) and does not violate the guide's actual
restriction, which is scoped to the **manifest** and **discovery entries** never carrying a resolved
absolute path (confirmed clean in both) — not to the run log's evidentiary narrative. Reported to the
operator for awareness given the target repository is public; not treated as blocking.

| 2 | `ADOPT-01` | n/a — single step | PASS (nothing installed or upgraded; gate never reached) | this run log's `ADOPT-01` evidence block | **not mechanically verifiable** — `01-prerequisites-and-install.md` declares no `Allowed modifications` field for `ADOPT-01` (see Improvement proposal #5 below); staged set is `.specboot/adoption/ADOPTION-RUN-LOG.md` only, which `00-conventions.md` names as inherent to executing *any* step ("writing it is part of executing the step, not separate bookkeeping"), not a gated repository-content mutation — treated as within bounds on that basis, not by inventing an allowlist | **YES** | **Auto-approved** (commit and push both) under the same standing authorization — zero repository-content mutation occurred (pure inspection/version-check step), only run-log evidence, so there is nothing an allowlist comparison could meaningfully police here even though no field is declared | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `bfad2af` (full: recorded in `git log`) | Unchanged from the `ADOPT-00` baseline (0 workflows, 0 webhooks, 0 rulesets; no new commits landed remotely since that determination) | **Pushed** — `09ede1b..bfad2af`, fast-forward, exit 0 | 1 (see Improvement proposals #5) |
| 3 | `ADOPT-02` | n/a — single step | PASS (`openspec/` exists, config exists, Claude resources present, no unselected-client resources) | this run log's `ADOPT-02` evidence block; `openspec doctor` output | **not mechanically verifiable — no declared `Allowed modifications` for this step** (Improvement proposal #5); staged set presented in full for live review instead of auto-approved | **YES** | **Live approval requested and granted for BOTH gates separately** (not auto-approved via standing authorization, precisely because there is no declared allowlist to check the staged set against): commit approved by Landaone, 2026-08-15, after independent subagent review of the full staged diff (clean — file list matched exactly what `openspec init --tools claude` generates plus the two `.specboot/adoption/` evidence updates; no secrets; no absolute paths anywhere in this diff; `config.yaml` confirmed unmodified generator output). Push approved separately by Landaone, 2026-08-15, after re-checking remote impact fresh (not reused from the ADOPT-00 baseline without re-verification) — found unchanged: 0 workflows, 0 webhooks, 0 rulesets, branch unprotected. | `openspec/config.yaml`; `.claude/commands/opsx/{apply,archive,explore,propose,sync,update}.md`; `.claude/skills/openspec-{apply-change,archive-change,explore,propose,sync-specs,update-change}/SKILL.md`; `.specboot/adoption/ADOPTION-RUN-LOG.md`; `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (15 files total) | `4dabf60cc9fa0107124000bf8868521263629c32` | Re-checked fresh (not assumed unchanged): 0 workflows, 0 webhooks, 0 rulesets, branch unprotected (404 on the protection endpoint) — **unchanged from the `ADOPT-00` baseline** | **Pushed** — `bfad2af..4dabf60`, fast-forward, exit 0 | 0 |
| 4 | `ADOPT-03` | n/a — single step | PASS (`docs/`, `ai-specs/` present with exact expected content, 4 root symlinks resolve, external source verified untouched) | this run log's `ADOPT-03` evidence block, including the full correction chain | **not mechanically verifiable — no declared `Allowed modifications`** (Improvement proposal #5); staged set presented in full for live review, twice re-corrected before approval (Improvement proposals #6, #7) | **YES**, after two rounds of correction | **Live approval requested and granted for BOTH gates separately.** Commit approved by Landaone, 2026-08-16, on the **third** presentation of the mutation inventory — the first two were rejected with specific, source-verified corrections (wrong extraction root entirely, then a miscounted file total carried over from the wrong extraction) before approval; independent subagent review of the final staged diff confirmed exact match to the corrected inventory with zero contamination from either earlier wrong attempt, no secrets, no absolute paths in content files. Push approved separately by Landaone, 2026-08-16, after re-checking remote impact fresh — unchanged. | `docs/` (7 files); `ai-specs/agents/` (3), `ai-specs/scripts/code_review.sh`, `ai-specs/specboot-instructions.md`, `ai-specs/skills/` (10 dirs, 17 files); `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `codex.md` (symlinks); `.specboot/adoption/ADOPTION-RUN-LOG.md` (35 files total) | `df654c25bad633f054b644ba8932001cb0a00b6f` | Re-checked fresh: 0 workflows, 0 webhooks, 0 rulesets, branch unprotected — **unchanged from the `ADOPT-00` baseline** | **Pushed** — `c76edca..df654c2`, fast-forward, exit 0 | 2 (see Improvement proposals #6, #7) |

---

## Improvement proposals

Raised after the checkpoint; **never applied during the run**. The canonical source is read-only
for the whole adoption, including for these.

| # | Checkpoint | Target file | Proposal | Status |
|---|---|---|---|---|
| 1 | `ADOPT-00` | `bootstrap-kit/discovery/symlink-fallback.md`, `bootstrap-kit/manifest.json`, `09-bootstrap.md` | **`.git/info/exclude` is specified as a literal path, which is wrong in a linked worktree.** There, `.git` is a *file* and the path resolves via `git rev-parse --git-path info/exclude` to the **shared common** Git directory, read by every worktree of the underlying repository. `mkdir -p .git/info` fails outright with "Not a directory". The kit should (a) specify resolution through `git rev-parse --git-path info/exclude` rather than a literal path, and (b) state the consequence — the exclusion is repository-wide across worktrees, not worktree-local — so a run can present the true blast radius at its gate instead of discovering it by a failed write. Note the launcher's Step 0 *already* anticipates linked worktrees; the bootstrap mechanics do not. | proposed |
| 2 | `ADOPT-00` | `09-bootstrap.md`, `bootstrap-kit/manifest.json` | **The transient ignore-rule set is stated inconsistently.** `manifest.json#ignoreRules.transient` lists **three** paths (`.specboot/staging/`, `.specboot/bootstrap/`, `.specboot/local/`), while `ADOPT-00`'s validation criteria require only **two** (`.specboot/bootstrap/`, `.specboot/local/`) and the run-log template mentions `.specboot/staging/` in passing. This run provisioned exactly the two the approved inventory named, declining to widen an approved mutation set on its own authority. The canonical set should be stated once, in one place. | proposed |
| 3 | `ADOPT-00` | `ADOPTION-ENTRY-PROMPT.md` §0 | **The cold-start premise asserts more than the adoption controls.** §0 states the target has "no OpenSpec installation and no `openspec` command" and "no `/opsx:*` commands". Those are *machine- and client-level* facts, not repository state: this run began with `openspec` 1.7.0 and `codegraph` on PATH and `/opsx:*` skills listed from user-level configuration, in a repository that was genuinely cold. The premise should be scoped to the repository, so an orchestrator records the machine-level presence as an observation rather than facing an apparent contradiction between the prompt and the evidence. | proposed |
| 6 | `ADOPT-03` | `01-prerequisites-and-install.md` (`ADOPT-03`) | **`<SPECBOOT_SOURCE>` is ambiguous between the ADOPT-00 source root and `packages/specboot/template/` nested within it, and this run picked wrong on the first attempt.** `ADOPT-03`'s Action names `<SPECBOOT_SOURCE>` as the same placeholder used throughout the guide, and its own "Root instruction single source" note references `packages/specboot/bin/init.js` only as a symlink-matching detail, never stating that the installer's actual copy root is `packages/specboot/template/`, one level below whatever `<SPECBOOT_SOURCE>` otherwise resolves to. This run's first attempt extracted from the source repository's own root instead (also tracked at the same pinned commit, also outside the sparse cone, so equally plausible as "the source") and got a materially different, larger result — including that source repository's own accumulated pilot/dev content (4 extra skill directories, one of them an incoherent self-referential copy of `specboot-adopt`, plus an extra `docs/` file) that is not part of the clean distributable baseline. The operator caught this by direct comparison against the pinned commit's actual tree, not by re-reading the guide — the guide itself gave no signal that the first extraction was wrong. The guide should state explicitly, in `ADOPT-03`'s own Action (not only implied by an installer-script cross-reference), that `<SPECBOOT_SOURCE>` for this step resolves to `packages/specboot/template/` relative to the validated source root, distinct from the narrower root used for `ADOPT-00`'s three-artifact validation. | proposed |
| 7 | `ADOPT-03` | `01-prerequisites-and-install.md` (`ADOPT-03`) | **Root pointer-file symlink creation is implied, not specified, as an Action.** `ADOPT-03`'s "Expected content" list and validation commands (`test -L AGENTS.md && readlink AGENTS.md`) both assume `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`codex.md` exist as symlinks after this step, but `packages/specboot/template/` — confirmed by direct inspection — ships no such symlinks; they are apparently generated by `packages/specboot/bin/init.js`, which `ADOPT-03`'s Action never invokes and never describes replicating. This run created the four relative symlinks as a second, explicit action beyond the literal `cp -rn` command, inferred from the "Root instruction single source" note and the failure-recovery table's symlink-repair entry, and presented that inference to the operator for approval before acting rather than assuming it silently. The guide should state symlink creation as an explicit second sub-action of `ADOPT-03`'s `Action` field, not leave it inferable only from the validation and failure-recovery sections. | proposed |
| 5 | `ADOPT-01` | `01-prerequisites-and-install.md` (`ADOPT-01`, `ADOPT-02`, `ADOPT-03`) | **No `Allowed modifications` field is declared for `ADOPT-01`, `ADOPT-02`, or `ADOPT-03`.** `00-conventions.md` states this field is a required, ninth part of the step contract for every executable step, authored by the guide maintainer in advance so the checkpoint protocol's standing-authorization mechanism can mechanically verify `staged_files ⊆ Allowed modifications(step)` without the orchestrator ever deriving or widening it live. `grep -c "Allowed modifications" 01-prerequisites-and-install.md` returns 0. The design history for this guide (task 15.13) records that a prior revision populated this field into six other steps found missing it (`ADOPT-00`, `ADOPT-13`, `ADOPT-14`, `ADOPT-15`, `ADOPT-18`, `ADOPT-19`, `ADOPT-20`) but that pass never touched this phase file, so the gap survived. Consequence observed live: `ADOPT-01`'s checkpoint produced no repository-content mutation, so the gap was harmless here, but `ADOPT-02` (`openspec init`, generating `openspec/` and client resources) and `ADOPT-03` (`cp -rn` importing the SpecBoot baseline) will produce real repository content with no declared allowlist to mechanically check the staged set against — meaning standing authorization's core condition cannot be verified for those two steps' checkpoints as written today, and this run is treating their commit/push gates as requiring live approval rather than auto-approving, pending this gap's resolution in the canonical guide. | proposed |
| 4 | `ADOPT-00` (resumed) | fresh-session handoff prompt (step 3); `00-conventions.md` drift language | **The two-checksum identity check has a real blind spot: a phase-file contract change lands invisibly.** The handoff prompt's step 3 ties blocking drift to a checksum mismatch on `SPECBOOT_ADOPTION_GUIDE.md` and `SKILL.md` only. This resume found the manifest's recorded commit (`834ee535`) one commit behind source HEAD (`1271266d`), where the intervening commit changed `09-bootstrap.md` — outside the checksum baseline — to add a new mandatory artifact to `ADOPT-00`'s own contract. Both checksums matched exactly throughout, so the documented blocking criterion alone would not have surfaced this; it was only found by independently diffing the intervening commit once the commit-mismatch (not checksum-mismatch) was noticed. A run that skipped that extra diff — reasonably, since the prompt's stated blocking condition was satisfied — would have declared `ADOPT-00` PASS against a stale contract. The guide should either checksum the full `specboot-adoption/` tree (or a manifest of per-file hashes) for identity, or explicitly instruct every resume to diff phase files touched by any intervening commits, not just the two named files. | proposed |

---

## Client- and company-specific adaptations

| # | Adaptation | Reason | Blast radius |
|---|---|---|---|
| 1 | Machine-local exclusion written to the **shared common** `info/exclude` rather than a worktree-local file | The target is a linked worktree; no worktree-local `info/exclude` exists in Git | The rule is visible to all 8 worktrees sharing the common Git directory. Inert in the other 7: tracked in the canonical-source worktree (ignore rules never affect tracked files) and absent elsewhere. Removed at `ADOPT-18` by deleting the delimited block. |

---

## Code-graph capability selection

- Selected implementation: **PENDING** — `ADOPT-04` / `ADOPT-05` not yet reached
- Version: `codegraph` observed on PATH at `/Users/landaeta/.local/bin/codegraph` (machine-level
  presence only; **not** installer provenance and **not** a capability verification)
- Verification command executed, with exit code and output summary: **NOT YET RUN**
- Coverage limitations: not yet assessed
- Result: **PENDING** — a code-graph capability is mandatory; none usable is FAIL, with no waiver,
  no skip, and no `PENDING EVIDENCE` at that step

---

## Permission decisions

```text
(none recorded this session)
```

---

## Decision record

```text
2026-08-15 / launcher Step 0 / proceed — target and candidate source are distinct working trees
  (resolved paths and inodes differ); Git identity deliberately not compared / Landaone (procedure) /
  they are separate linked worktrees of one repository, which is legitimate, not self-adoption

2026-08-15 / ADOPT-00 Q2 / client-selection route = autodiscovery / Landaone / operator chose to see
  candidates before selecting

2026-08-15 / ADOPT-00 Q3 / selected client = Claude; Kiro and Codex NOT SELECTED / Landaone /
  explicit human declaration after the probe found no candidates

2026-08-15 / ADOPT-00 gate 1 / exact mutation inventory approved, manifest entry count corrected
  5 -> 2 before approval / Landaone / operator challenged the count; re-verification against the
  schema and 10-debootstrap.md confirmed 2

2026-08-15 / ADOPT-00 gate 2 / shared common info/exclude mechanism approved / Landaone / linked
  worktree discovered mid-provisioning; treated as a new gate rather than an adjustment

2026-08-15 / ADOPT-00 / staging, commit and push deliberately NOT performed / orchestrator
  (procedure) / ADOPT-00 is PENDING; readiness is never declared while a covered step is PENDING

2026-08-15 / ADOPT-00 gate 3a / create ADOPTION-AUTHORIZATION.md now, from the template, with
  client selection filled and OpenSpec/code-graph sections left at documented defaults / Landaone /
  09-bootstrap.md changed underneath the run (one intervening source commit) to require this file as
  part of ADOPT-00's own mutation inventory; not covered by gates 1-2

2026-08-15 / ADOPT-00 gate 3b / standing commit-and-push authorization GRANTED for this run, scoped
  to branch experiment/specboot-ai-adoption-v2, conditioned on fast-forward-only push and unchanged
  remote-impact vs. the ADOPT-00 baseline / Landaone / avoids a live question at every remaining
  checkpoint while any staged path outside a step's Allowed modifications still FAIL_CLOSEDs
  regardless

2026-08-15 / ADOPT-00 gate 3c / declared team environment matrix = this operator/machine only
  (Claude; zsh; macOS) / Landaone / single-operator lab/experiment repository; recorded now rather
  than deferred to ADOPT-05B since the question was already resolved while unblocking gate 3
```

---

## Correction record

```text
Step:      ADOPT-00
Attempt:   1
Failure:   Provisioning aborted at `mkdir -p .git/info` — "mkdir: .git: Not a directory".
Diagnosis: The target is a linked worktree. `.git` is a FILE containing
           "gitdir: /Users/landaeta/repos/labs/app-prices-rest/.git/worktrees/…", so `.git/info/`
           cannot be created and the approved literal path does not exist. `git rev-parse
           --git-path info/exclude` resolves to the SHARED common Git directory instead — a
           different mechanism and a materially different blast radius than the one approved.
Recovery:  Automatic rollback to the pre-provisioning state (all-or-nothing). Verified:
           `git status --porcelain` empty, `.gitignore` byte-identical to its backup, `.claude/`
           absent, `.specboot/` absent, no probe residue. Then STOPPED and re-gated rather than
           substituting a mechanism on the orchestrator's own authority.
Outcome:   Operator approved the shared common exclude at gate 2. Attempt 2 completed cleanly.

Step:      ADOPT-00
Attempt:   2
Failure:   none
Outcome:   PASS on every criterion observable in this session. Fresh-session discovery gate
           outstanding by design.
```

---

### Daily workflow pilot (not part of one-time adoption)

```text
(not reached — ADOPT-19)
```
