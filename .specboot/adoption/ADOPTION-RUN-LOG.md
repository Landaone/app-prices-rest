# SpecBoot Adoption Run Log

Read [`00-conventions.md`](../../../../../specboot/specboot-adoption/00-conventions.md) at the
canonical source for the evidence discipline governing every field below.

---

## Run identification

```text
Repository: app-prices-rest-specboot-ai-adoption-v4 (branch experiment/specboot-ai-adoption-v4)
Adoption date: 2026-08-18
Operator: Landaone (luis.landaeta@gmail.com)
Client(s) selected: Claude
CodeGraph adopted (yes / no): PENDING — decided at ADOPT-04/05
Reason if not adopted: N/A yet
Guide revision used: checksum below
```

---

## Source and delivery mode

```text
Delivery mode:                              source-linked
Guide checksum   (SPECBOOT_ADOPTION_GUIDE.md): sha256:2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0
Skill checksum   (ai-specs/skills/specboot-adopt/SKILL.md): sha256:2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3
Git worktree state:                         clean
Git status:                                 recorded
Source Git commit:                          ec90087ddd57024c08a94027152d0559a656564d
Git unavailable — reason:                   N/A
Observed HEAD (dirty worktree only):        N/A
Local source path resolution:               The local canonical source path is resolved per machine
                                            and is not recorded here.
Source treated as read-only for the whole adoption (YES / NO): YES
```

| Source state | `worktree` | `status` | Also fill |
|---|---|---|---|
| Git working tree, **clean** | `clean` | `recorded` | commit `ec90087ddd57024c08a94027152d0559a656564d` |

### Drift check at each resume

| Resumed at (date/time) | Local path obtained from (machine-local store / operator / rediscovery) | Guide checksum matches | Skill checksum matches | Commit matches | Verdict | Reconciliation decision |
|---|---|---|---|---|---|---|
| (none yet — initial run) | | | | | | |

---

## Client selection

```text
Route used (manual / autodiscovery): autodiscovery
```

| Client | Displayed as a candidate by autodiscovery | Explicitly SELECTED by the human | Recorded status |
|---|---|---|---|
| Claude | NO (probe found no candidates) | YES | SELECTED |
| Kiro | NO (probe found no candidates) | NO | NOT SELECTED |
| Codex | NO (probe found no candidates) | NO | NOT SELECTED |

Where autodiscovery ran: confirm the repository tree was **byte-for-byte unchanged** when the
findings were displayed (the probe writes nothing): YES

Where autodiscovery found nothing: confirm that was treated as a finding and the operator was still
asked, rather than the run proceeding with no client: YES

### Two axes, never collapsed

| Client | This adoption | Recipe status | Effect on this run |
|---|---|---|---|
| Claude | SELECTED | Validated (per `06-adapters-and-discovery.md` reference status) | gate to be exercised at `ADOPT-15` |
| Kiro | NOT SELECTED | Validated (reference status; not exercised by this run) | none |
| Codex | NOT SELECTED | `PENDING EVIDENCE` (per canonical recipe record) | none — not selected, so it cannot block this run |

---

## Step state — resume checklist

| Step | File | Status (PENDING / PASS / FAIL / SKIPPED) | Date |
|---|---|---|---|
| `ADOPT-00` | `09-bootstrap.md` | PASS | 2026-08-18 |
| `ADOPT-01` | `01-prerequisites-and-install.md` | PASS | 2026-08-18 |
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

---

## Evidence blocks

### `ADOPT-00` — Bootstrap Client Discovery

- Repository had SpecBoot files / AI configuration before this step: NO
- **Cold-start state confirmed** (no SpecBoot files, no OpenSpec, no `/opsx:*` commands, no
  discoverable `specboot-adopt` skill, no `.specboot/`): YES
- **Canonical source supplied**: SUPPLIED — `/Users/landaeta/repos/specboot`
- **Three-artifact validation, run before any orchestration load and before the first write:**
  - `SPECBOOT_ADOPTION_GUIDE.md` present: YES
  - `specboot-adoption/` present: YES
  - `ai-specs/skills/specboot-adopt/SKILL.md` present **and readable as a file**: YES
  - Verdict: VALID
  - If REJECTED, target repository left byte-for-byte unchanged (zero writes): N/A
- **Refusals reached**:
  - No canonical source supplied: NONE
  - Supplied source failed the three-artifact validation: NONE
  - No client selected: NONE
  - Selected client has no recipe: NONE
  - Selected client cannot discover the external skill without symlinks: NONE
  - For every REFUSED row above: N/A — no refusals reached
- **Orchestration procedure obtained by a source-relative direct read of `SKILL.md`** (a direct
  read, **not** native skill discovery): YES — path read (source-relative):
  `ai-specs/skills/specboot-adopt/SKILL.md`
- **Client-selection route**: autodiscovery
- Selected client(s): Claude
- Every other supported client recorded `NOT SELECTED`: Kiro — NOT SELECTED; Codex — NOT SELECTED
- OS / shell: Darwin 22.6.0 (macOS) / zsh
- Symlink probe result (capability-detected, not assumed): SUPPORTED — `ln -s . .specboot-symlink-probe && rm .specboot-symlink-probe` succeeded
- Pre-existing artifacts detected, and their disposition: none detected (`.claude`, `.specboot`, root `CLAUDE.md` all absent)
- Manifest entry count: 2 (`.claude/skills/specboot-adopt` symlink, `.claude/CLAUDE.md` bootstrap block)
- **Preflight, run before the first write**:
  - Paths resolved and their classification: `.claude/skills/specboot-adopt` — absent;
    `.claude/CLAUDE.md` — absent; `.specboot/adoption/*` — absent; `.specboot/local/*` — absent;
    `.gitignore` — pre-existing, to be modified (append only)
  - Collisions detected: NONE
- **Exact mutation inventory presented at the approval gate**: `.claude/skills/specboot-adopt`
  (create, symlink, reversible); `.claude/CLAUDE.md` (create, real-file with delimited block,
  reversible); `.specboot/adoption/BOOTSTRAP-MANIFEST.json` (create, durable, reversible);
  `.specboot/adoption/ADOPTION-RUN-LOG.md` (create, durable, reversible);
  `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (create, durable, reversible);
  `.specboot/local/canonical-source-path` (create, git-ignored, reversible); `.gitignore`
  (modify, append `.specboot/bootstrap/`, `.specboot/local/`, `.specboot/staging/`, reversible
  except the `.specboot/staging/` line which is durable by design). `.git/info/exclude` — not
  touched (no other linked worktree of this repository itself requires it).
- **Provisioning performed exactly that inventory and nothing outside it:** YES
- **Provisioning failure, if any**: N/A — no failure
- **Obligations recorded** — payload: `SKIPPED — source-linked mode`;
  container: `SKIPPED — source-linked mode`
- `.specboot/bootstrap/` never created at any point: YES
- No copied guide, phase file, or skill body anywhere in the project: YES
- Discovery entries point at the external canonical source, and none was staged for any checkpoint:
  YES
- Machine-local `.specboot/local/` store holds the resolved path and nothing else, and
  `git check-ignore` reports it ignored: YES (see verdicts below)
- Client-selection record carries no placeholder: YES
- **Session stopped after provisioning and generated the fresh-session handoff prompt**: YES —
  handoff prompt generated, verbatim: see end of this file / final assistant message
- **No OpenSpec or `/opsx:*` command used before `ADOPT-02` completed**: YES
- `git check-ignore .specboot/bootstrap/…` verdict: IGNORED
- `git check-ignore .specboot/local/…` verdict: IGNORED
- `git check-ignore .specboot/adoption/…` verdict: NOT ignored
- No bare `.specboot/` rule written: YES
- Fresh-session discovery probe — exact prompt used: see handoff prompt (generated for the
  operator to run in a new session)
- Fresh-session outcome, verbatim: PENDING — to be recorded by the fresh session at `ADOPT-15`
  (this session cannot evidence its own provisioning)
- Manifest validation: no JSON-Schema validator (`ajv` or equivalent) available in this
  environment; performed structural conformance check instead — every required top-level key
  present (`manifestVersion`, `createdAt`, `source`, `selectedClient`, `clientSelection`,
  `environment`, `entries`), `source` block carries no resolved-path field, `additionalProperties:
  false` honored, all enum values match declared options. File parses as valid JSON.
- Fresh session resumed from the durable manifest and run log, with source identity verified:
  N/A — not yet resumed
- Approval (who, when, exactly what was approved): Landaone, 2026-08-18, the exact mutation
  inventory listed above, via interactive approval prompt; standing commit-and-push authorization
  also granted at the same gate (see `ADOPTION-AUTHORIZATION.md`)
- Result: PASS

---

### `ADOPT-15` — Fresh-Session Native Discovery Probe Input (recorded early, at point of observation)

- **This is a fresh session** relative to the `ADOPT-00` bootstrap session: no prior conversation
  history, no operator-supplied path to the skill.
- **Probe observation**: at session start, before any file was opened or path supplied by the
  operator, the `specboot-adopt` skill appeared by name and one-line description in this session's
  system-provided available-skills listing.
- **Exact resolution path**: `.claude/skills/specboot-adopt` (a symlink to
  `/Users/landaeta/repos/specboot/ai-specs/skills/specboot-adopt`), created during `ADOPT-00`
  bootstrap provisioning. Confirmed present and resolving: `ls -la .claude/skills/` shows
  `specboot-adopt -> /Users/landaeta/repos/specboot/ai-specs/skills/specboot-adopt`.
- **No operator-supplied path used to invoke discovery**: the skill was invoked in this session via
  the harness's native skill-invocation mechanism (`Skill` tool, name `specboot-adopt`), not a
  direct file read of a path the operator provided.
- Verdict: fresh-session native discovery of the `specboot-adopt` skill **CONFIRMED**.
- This satisfies `ADOPT-00`'s deferred fresh-session outcome field and is the probe input `ADOPT-15`
  will consume when that step is reached in `06-adapters-and-discovery.md`; `ADOPT-15` itself
  remains `PENDING` until its own phase-file step is executed in full.

---

## `ADOPT-01` — Install Prerequisites

- Date: 2026-08-18
- Machine: Darwin 22.6.0 (macOS), zsh
- Repository evidence inspected: `pom.xml` present (Maven project); no `package.json`,
  `build.gradle`, `build.gradle.kts`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`;
  no `README.md`; `mvnw`/`mvnw.cmd` present but `.mvn/wrapper/maven-wrapper.properties` missing
  (wrapper incomplete — global Maven used instead, see below).
- Node: `node --version` → `v24.18.0` (meets `>= 20.19.0`)
- npm: `npm --version` → `11.16.0`
- Git: `git --version` → `git version 2.39.2 (Apple Git-143)`
- OpenSpec: `which openspec` → `/Users/landaeta/.nvm/versions/node/v24.18.0/bin/openspec`;
  `openspec --version` → `1.7.0`
- CodeGraph: `which codegraph` → `/Users/landaeta/.local/bin/codegraph`; `codegraph --version` →
  `1.5.0`
- Project runtime: Java, `<java.version>11</java.version>` in `pom.xml`
- Project build tool: Maven — `mvnw` wrapper present but non-functional (missing wrapper jar
  properties); global `mvn -version` → `Apache Maven 3.9.16`, `Java version: 11.0.31` (Amazon
  Corretto), confirming a working Java 11 + Maven 3.9.16 toolchain matches the reference
  experiment exactly.
- No installation or upgrade performed: every required tool was already present and already met
  or exceeded the documented minimum/reference version. The `[HUMAN APPROVAL REQUIRED]` gate for
  installing/upgrading software was not reached, per this step's own text ("reached only when the
  install/upgrade command above actually runs").
- Allowed modifications: none (declared) — no repository-local write made.
- Result: PASS
