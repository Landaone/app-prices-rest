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
| `ADOPT-02` | `01-prerequisites-and-install.md` | PASS | 2026-08-18 |
| `ADOPT-03` | `01-prerequisites-and-install.md` | PASS | 2026-08-18 |
| `ADOPT-04` | `02-codegraph.md` (**mandatory**) | PASS | 2026-08-18 |
| `ADOPT-05` | `02-codegraph.md` (**mandatory**) | PASS | 2026-08-19 |
| `ADOPT-05B` | `03-client-permissions.md` (**mandatory**) | PASS — closed via the alternative criterion (negative control did not request permission), operator-ruled | 2026-08-19 |
| `ADOPT-06` | `04-context-and-openspec.md` | PASS | 2026-08-19 |
| `ADOPT-07` | `04-context-and-openspec.md` | PASS | 2026-08-19 |
| `ADOPT-08` | `04-context-and-openspec.md` | PASS | 2026-08-19 |
| `ADOPT-09` | `05-agents-and-skills.md` | PASS | 2026-08-19 |
| `ADOPT-10` | `05-agents-and-skills.md` | PASS | 2026-08-19 |
| `ADOPT-11` | `05-agents-and-skills.md` | PASS — operator ruling on completeness criterion, see evidence | 2026-08-19 |
| `ADOPT-12` | `05-agents-and-skills.md` | PASS | 2026-08-19 |
| `ADOPT-13` | `06-adapters-and-discovery.md` | PASS | 2026-08-19 |
| `ADOPT-14` | `06-adapters-and-discovery.md` | PASS | 2026-08-19 |
| `ADOPT-15` | `06-adapters-and-discovery.md` (once per client) | PASS | 2026-08-19 |
| `ADOPT-16` | `07-baseline-and-checkpoint.md` | PASS | 2026-08-19 |
| `ADOPT-17` | `07-baseline-and-checkpoint.md` | PASS | 2026-08-19 |
| `ADOPT-18` | `10-debootstrap.md` | PASS | 2026-08-19 |
| `ADOPT-19` | `11-e2e-pilot-and-pr-gate.md` | PASS | 2026-08-19 |
| `ADOPT-20` | `11-e2e-pilot-and-pr-gate.md` | PASS | 2026-08-19 |

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

---

## `ADOPT-02` — Install and Initialize OpenSpec with Explicitly Selected Clients

- Date: 2026-08-18
- Pre-check: `openspec --version` → `1.7.0`, already installed and already meets the documented
  minimum/reference (`1.7.0`) and supports the documented keys. Install/upgrade command **skipped
  entirely** per this step's own text; the `[HUMAN APPROVAL REQUIRED]` gate for install/upgrade was
  not reached.
- `ADOPTION-AUTHORIZATION.md` OpenSpec-version-policy section: default policy applied (reuse
  installed version meeting minimum; no deviation) — already recorded at `ADOPT-00`/authorization
  time, unchanged.
- Command run: `openspec init --tools claude` (non-interactive client selection, matching the
  client already explicitly selected at `ADOPT-00`; avoids the interactive TUI flow while still
  recording an explicit, reviewed selection rather than accepting a default).
- Clients offered (per `openspec init --tools --help`): amazon-q, antigravity, auggie, bob,
  claude, cline, codeartsagent, codex, devin, forgecode, codebuddy, continue, costrict, crush,
  cursor, factory, gemini, github-copilot, hermes, iflow, junie, kilocode, kimi, kiro, lingma,
  vibe, oh-my-pi, opencode, pi, qoder, qwen, roocode, trae, zcode, windsurf.
- Clients selected: `claude` only (matches `ADOPT-00`'s recorded client selection; no other
  client resource generated).
- Generated config path: `openspec/config.yaml` (confirmed by `find openspec -maxdepth 3 -print`:
  `openspec`, `openspec/specs`, `openspec/changes`, `openspec/config.yaml`,
  `openspec/changes/archive`).
- Generated client resources: `.claude/commands/opsx/{explore,archive,apply,sync,update,propose}.md`
  (6 commands); `.claude/skills/openspec-{apply-change,explore,update-change,archive-change,
  propose,sync-specs}/SKILL.md` (6 skills) — confirmed by `find .claude/commands .claude/skills
  -type f -o -type l`. No resources for any unselected client.
- Per-client provisioning provenance: this run's `openspec init --tools claude` command directly
  provisioned the `.claude/commands/opsx/*.md` and `.claude/skills/openspec-*/SKILL.md` resources
  (observed in this session, not inferred from presence alone — see `00-conventions.md`,
  "Capability availability is not installer provenance").
- `openspec doctor` result: `Root: OpenSpec root: ok`; `References: (none declared)`. No errors.
- Git changes: `git status --short` → `M .specboot/adoption/ADOPTION-RUN-LOG.md` (carried-forward
  delta from checkpoint 1), `?? .claude/commands/`, `?? .claude/skills/` (new: the 6
  `openspec-*` skill dirs; `specboot-adopt` still present as a symlink but git-ignored via the
  shared `.git/info/exclude`, unchanged from before), `?? openspec/`.
- Validation against PASS criteria: `openspec/` exists — YES; a configuration file exists
  (`openspec/config.yaml`) — YES; client-specific OpenSpec resources exist for the selected
  client (Claude) — YES; no resources added for unselected clients — YES (confirmed: only
  `claude`-named paths present).
- Result: PASS

---

## `ADOPT-03` — Import SpecBoot

- Date: 2026-08-18
- `<SPECBOOT_SOURCE>`: `/Users/landaeta/repos/specboot` — read from
  `.specboot/local/canonical-source-path`, the same value `ADOPT-00` already resolved and
  validated; not re-derived.
- Payload materialization check: `test -d /Users/landaeta/repos/specboot/packages/specboot/template`
  → **not materialized** (sparse checkout — `packages/` never populated in the working tree).
- Extraction technique: `git archive` against the pinned commit, per this step's documented
  fallback. Source repo confirmed clean and at `HEAD` = `ec90087ddd57024c08a94027152d0559a656564d`
  (matches the pinned commit `ADOPT-00` recorded) before extraction.
  - Command: `git archive ec90087ddd57024c08a94027152d0559a656564d packages/specboot/template |
    tar -x -C <scratch>/specboot-payload` — exit 0.
  - Source working tree confirmed untouched after extraction: `git status --porcelain | wc -l` →
    `0`, both before and after.
  - Extraction non-empty (not a silent zero-file result): scratch tree contained
    `packages/specboot/template/{.cursor,docs,ai-specs}`.
- Mechanical enumeration, run before the approval gate (per `00-conventions.md` evidence
  discipline — literal command output, not recalled):
  - Source: `find <scratch>/.../template/docs -maxdepth 2 -type f | wc -l` → `7`;
    `find <scratch>/.../template/ai-specs -maxdepth 3 -type f | wc -l` → `20`.
  - Pre-copy target: `ls docs ai-specs` → both "No such file or directory" (neither existed;
    nothing will be skipped by `-n`).
  - Source template root: no `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `codex.md`, and no symlinks —
    this particular canonical source's template payload does not carry root instruction files at
    all (the phase file's expected-content list is explicitly conditional: "depending on the
    approved SpecBoot source"). Recorded as a finding, not a failure.
- Copy command run: `cp -rn <scratch>/.../template/* .` — exit 0.
- Post-copy enumeration (identical commands, target): `find docs -maxdepth 2 -type f -print` → 7
  files (`frontend-standards.md`, `api-spec.yml`, `documentation-standards.md`, `data-model.md`,
  `development_guide.md`, `backend-standards.md`, `base-standards.md`); `find ai-specs -maxdepth 3
  -type f -print` → 20 files (`specboot-instructions.md`; `agents/{backend-developer,
  product-strategy-analyst,frontend-developer}.md`; `scripts/code_review.sh`;
  `skills/enrich-us/SKILL.md`; `skills/code-auditing/SKILL.md`;
  `skills/writing-skills/{testing-skills-with-subagents.md,render-graphs.js,
  anthropic-best-practices.md,persuasion-principles.md,SKILL.md,graphviz-conventions.dot}`;
  `skills/specboot-verify/SKILL.md`; `skills/commit/SKILL.md`;
  `skills/using-git-worktrees/SKILL.md`; `skills/explain/SKILL.md`; `skills/update-docs/SKILL.md`;
  `skills/meta-prompt/SKILL.md`; `skills/adversarial-review/SKILL.md`). Counts match source
  exactly (7 and 20) — zero files skipped, zero files missing.
- Files added: all 27 (7 + 20) listed above. Files skipped because they existed: none (target
  was empty pre-copy).
- Hidden directories expected but not copied: `.cursor/` — confirmed absent from target
  (`test -d .cursor` → absent), as expected: unquoted `*` glob does not match dot-prefixed names,
  and Cursor was not the selected client in any case.
- Root instruction symlink resolution: N/A — source template root carries no `AGENTS.md`,
  `CLAUDE.md`, `GEMINI.md`, or `codex.md` for this canonical source, so none were created; no
  divergent real file exists to correct either. Recorded as a genuine source-content difference,
  not a copy failure.
- Per-client provisioning provenance: N/A for this step — this step's copy is client-agnostic
  (`docs/` and `ai-specs/` only); no hidden client directory was touched.
- `git status --short` (post-copy, relevant lines): `?? ai-specs/`, `?? docs/` (plus
  carried-forward `?? .claude/commands/`, `?? .claude/skills/`, `?? openspec/` from `ADOPT-02`,
  and ` M .specboot/adoption/ADOPTION-RUN-LOG.md`).
- **Approval gate — mechanical comparison**: post-copy enumeration matches this step's closed-rule
  `Allowed modifications` exactly (byte-for-byte mirror of source `docs/` and `ai-specs/`;
  4 root symlinks correctly absent because the source has none; nothing outside the two mirrored
  trees). **Gate auto-approved** per this step's own text ("Where that mechanical comparison shows
  the copy matches ... exactly ... the gate auto-approves").
- Result: PASS

---

## Capability selection — code-graph implementation

- Selected implementation: CodeGraph (product choice; no company-approved equivalent named for
  this run).
- Availability verified with an executed command: `codegraph --version` → `1.5.0` (already
  installed, satisfies this step's requirement).
- Result: usable code-graph capability established. No waiver invoked.

## `ADOPT-04` — Initialize CodeGraph

- Date: 2026-08-18
- Pre-check: `codegraph --version` → `1.5.0`, already installed and satisfies this step's
  requirement. Installation procedure **skipped entirely**; the `[HUMAN APPROVAL REQUIRED]` gate
  for installation was not reached.
- Command run: `codegraph init` (repository-local index build, runs regardless of the
  install-skip above).
- Output: `Initialized in /Users/landaeta/repos/labs/app-prices-rest-specboot-ai-adoption-v4` →
  `Indexed 22 files` → `295 nodes, 355 edges in 534ms` → `Done`.
- Files indexed: 22. Nodes: 295. Edges: 355. Duration: 534ms.
- Validation: `test -d .codegraph` → exists. `codegraph explore "list entry points"` → non-empty,
  structured result: 49 symbols across 3 files, with blast-radius/caller analysis and verbatim
  source for `PriceModel.java`, `PriceEntity.java`, `PriceEntityModelConverter.java`. Index is
  queryable.
- `.codegraph/` internal files confirmed version-dependent and git-ignored:
  `.codegraph/.gitignore` contents — `*` then `!.gitignore` (ignores everything except itself).
  `git status --short .codegraph` → `?? .codegraph/` (directory itself untracked pending the
  `.gitignore` file inside it being added — the directory entry collapses once that one trackable
  file is staged).
- Coverage limitations: none observed for this repository (single-language Java/Maven project;
  all 22 source files indexed).
- Result: PASS

---

## `ADOPT-05` — Configure CodeGraph for the Selected Clients

- Date: 2026-08-19
- Pre-check performed before any attempt (operator-prompted, correcting a proceed-without-checking
  slip): confirmed `ADOPT-05` had **not** already run for this repository — `.mcp.json`,
  `.claude/settings.json`, `.claude/settings.local.json` all absent; `~/.claude.json` has no entry
  referencing this repository path; `codegraph install --print-config claude` (no-write preview)
  confirmed what *would* be generated without asserting it already existed.
- **Canonical explicit-flag form attempted first, per this step's own text** ("The canonical
  invocation is explicit-flag, never `-y`"): `codegraph install -t claude -l local
  --no-permissions`, driven through an allocated pty (`expect`) across 4 separate attempts with
  progressively adjusted timing/key strategies (plain `\r`, `y`/`n` hotkeys, arrow-key toggles,
  long fixed delays up to 10s between sends). **Result: consistently unable to complete.** In every
  attempt the first sub-question (CLI-on-PATH) resolved correctly (`◇ Installed codegraph CLI on
  PATH`), but the process then stopped consuming further input at the second sub-question
  (front-loading) and eventually exited without writing any file — reproduced identically across
  all 4 attempts, indicating an environment limitation (most likely how this sandboxed pty reports
  terminal geometry to the tool's Ink-based TUI) rather than a timing defect in the automation
  script. No files were written by any of these 4 attempts (`git status --short` confirmed clean
  before the 5th attempt below).
- **Operator's explicit decision, recorded verbatim in intent**: proceed with the `-y` automated
  route instead, citing this adoption's own `v1` precedent for the same command form, as a
  deliberate, informed trade-off (full automation over strict scope adherence) rather than an
  oversight — see `ADOPTION-AUTHORIZATION.md`'s updated code-graph-privilege-scope section for the
  full rationale, verified consequence, and grant record.
- Command actually run: `codegraph install -y --target claude --location local --no-permissions`
  — fully non-interactive, completed in a single invocation with no pty automation needed.
- **Verification that explicit overrides still won over `-y`'s bundled defaults** (not assumed —
  checked against actual output): `.mcp.json` created at the repository root (project/local scope,
  not the global `~/.claude.json` `-y` alone would target); `.claude/settings.json` created
  containing only a `UserPromptSubmit` hook block — **no** `permissions`/auto-allow content,
  confirming `--no-permissions` was honored over `-y`'s bundled `automatic-allow on`.
- **CLI-on-PATH sub-question** (no flag equivalent — this is the one dimension `-y`'s internal
  default, not the explicit overrides, controlled): fell through to `-y`'s default, which per `v1`'s
  own recorded evidence is "Yes". **Verified this produced no actual machine-level mutation**:
  `~/.local/bin/codegraph` symlink `stat -f "%Sm"` → `Jul 25 03:21:05 2026` (pre-existing, unrelated
  to this run); `~/.zshrc`, `~/.zprofile`, `~/.bash_profile`, `~/.bashrc` mtimes all predate this
  session (2026-08-19). The tool detected the CLI was already on `PATH` (established at `ADOPT-01`,
  re-confirmed working at `ADOPT-04`) and the "Yes" answer required no write — the anticipated
  residual scope deviation did not materialize in practice.
- Generated files (all inspected):
  - `.mcp.json`: `{"mcpServers":{"codegraph":{"type":"stdio","command":"codegraph","args":["serve","--mcp"]}}}`.
  - `.claude/settings.json`: `{"hooks":{"UserPromptSubmit":[{"hooks":[{"type":"command","command":"codegraph prompt-hook"}]}]}}`.
  - `.claude/CLAUDE.md`: additive `<!-- CODEGRAPH_START -->` … `<!-- CODEGRAPH_END -->` block
    appended (documents reaching for `codegraph_explore`/`codegraph explore` before grep/find in
    indexed repos) — the canonical root symlink target `docs/base-standards.md` itself untouched;
    `.claude/CLAUDE.md` is a real file per `ADOPT-00`'s bootstrap discovery entry, not the symlink.
- Interactive choices, recorded against the reference table:

  | Decision | Reference experiment | Live decision |
  |---|---|---|
  | Clients | Claude and Kiro | Claude only |
  | Scope | Project | Project (`--location local`) |
  | CLI on PATH | Yes | Yes (via `-y` default; verified no-op — see above) |
  | Automatic allow | No | No (`--no-permissions`, verified — no permissions block written) |
  | Automatic prompt front-loading | No | Unknown — no flag exists to inspect or force either way
    under `-y`; not independently observable from generated file contents. Recorded as
    `unavailable`, not inferred. |
  | CodeGraph Pro | No | Not prompted/not applicable in this non-interactive run (`-y` produced no
    Pro-related output or file). |

- Per-client provisioning provenance: this run's `codegraph install -y --target claude --location
  local --no-permissions` directly produced `.mcp.json`, `.claude/settings.json`, and the
  `CLAUDE.md` block (observed in this session's own command output, not inferred from presence
  alone). No unselected-client (Kiro, etc.) resources generated — confirmed no other adapter files
  appeared.
- Validation: `git status --short` → `M .claude/CLAUDE.md`, `?? .claude/settings.json`,
  `?? .mcp.json` (plus carried-forward run-log delta). `git diff --name-only` confirms the same
  set. `codegraph explore "list public interfaces"` — deferred: MCP-tool-path validation is a
  fresh-session concern; the shell-path form (`codegraph explore`) was already proven functional at
  `ADOPT-04`. Runtime discovery of the MCP server inside a live Claude session is explicitly
  deferred to `ADOPT-15` per this step's own text ("Runtime discovery is validated later, in
  `ADOPT-15`, in a fresh session — filesystem configuration passing here does not establish it").
- **Approval gate**: live, explicit operator approval for this exact mutation — the operator's own
  message directed the specific command, cited the accepted trade-off, and pre-authorized recording
  it transparently. This is the human approval this gate requires; not an auto-approval, and not
  self-approved by the executing agent. Additionally, the *resulting* choices (project scope,
  automatic-allow disabled) independently match this step's least-privilege auto-approval
  criteria — recorded for completeness, though live approval was what was actually exercised here.
- Result: PASS

---

## `ADOPT-05B` — Configure Selected-Client Permissions (Early, One-Time)

- Date: 2026-08-19
- Clients selected: Claude Code only (per `ADOPT-00`/`ADOPT-02`). No `.kiro/settings/permissions.yaml`
  or Codex equivalent created — Kiro and Codex are `NOT SELECTED`.

**Step 1 — Provisioning**

- Source baseline located: the canonical SpecBoot source's own reviewed `.claude/settings.json`,
  read via `git show ec90087ddd57024c08a94027152d0559a656564d:.claude/settings.json` — the pinned
  commit `ADOPT-00` resolved and validated, never the source's current working tree, never edited
  at the source. 2067 bytes, 74 lines. This is the organization's reviewed starting allowlist for
  Claude Code; the source repository is itself the reference Java/Maven implementation, so the
  baseline is already stack-appropriate.
- Observation, not drift requiring reconciliation: the source repository's own `HEAD` has since
  advanced to `9b01067d79afb76a32dc0cf2839f70f14c4b8e9d` (checked incidentally while performing
  this read) — the pinned identity itself, `ec90087`, is unaffected, since this read (and every
  prior read of the source in this run — `ADOPT-03`'s `git archive`, this step's `git show`) always
  targeted the pinned commit explicitly, never a fresh `HEAD`. Source remains read-only for this
  adoption.
- Target file existed before this step: **YES** — `.claude/settings.json` was created by `ADOPT-05`
  (`codegraph install`), containing only a `hooks.UserPromptSubmit` block, no `permissions` key.
- Decision: **MERGE**, not overwrite. No key-level conflicts: the baseline contributes `$schema`,
  `enabledMcpjsonServers`, and `permissions.allow`; the target's own `hooks` block (from `ADOPT-05`,
  itself already checkpointed) is retained unchanged.

**Step 2 — Declared supported-environment matrix**

- Recorded into `ADOPTION-AUTHORIZATION.md`'s environment-matrix section (updated in place,
  superseding the `ADOPT-00` evidence-derived draft): Clients = Claude; Stacks = Java 11/Spring
  Boot/Maven; Shells = zsh, bash, PowerShell (default-broad); Operating systems = macOS, Linux,
  Windows (default-broad). Per this step's own rule ("default broad, narrow only on stated
  evidence — never the reverse") — no stated reason to narrow exists for this project, so the
  guide's own default applies directly; this did not require a separate live operator ruling
  (unlike this same repository's `v3` adoption, which had to *correct* an initially-narrow draft —
  this run declared broadly from the start).

**Step 3 — Reconciliation**

- Entries removed as out-of-matrix: **none**. The baseline's 65 entries (64 `Bash(...)` patterns +
  1 `mcp__codegraph__codegraph_explore`) are all cross-platform-shaped (POSIX tools plus generic
  `git`/`openspec`/`mvn`/`codegraph` invocations); none is OS- or shell-specific in a way the
  declared matrix would exclude.
- Entries retained for supported environments not present on this machine: all 65, plus
  `enabledMcpjsonServers: ["codegraph"]` and the `$schema` reference — correct, since `ADOPT-04`/
  `ADOPT-05` adopted CodeGraph. Nothing stripped for being unused on this adopting machine.
- Entries added for the real project: **none, by explicit operator decision.** This step's
  baseline already includes `mvn`-based validate/test patterns matching this repository's stack
  (Java 11 + Maven, per `pom.xml`). A candidate addition of 10 `./mvnw`/`mvnw.cmd` wrapper-form
  entries (mirroring this same repository's own prior `v3` adoption, whose wrapper was functional)
  was proposed and **explicitly declined** by the operator at the live approval gate below — this
  repository's `mvnw`/`mvnw.cmd` wrapper is currently non-functional here (missing
  `.mvn/wrapper/maven-wrapper.properties`, recorded at `ADOPT-01`), so the operator chose not to
  pre-authorize commands this checkout cannot actually run. Recorded as a deliberate scope decision,
  not an oversight; a future checkpoint may add these if the wrapper is repaired and the team wants
  wrapper-form commands allowlisted.

**Step 4 — Safety and syntax**

- Safety scan (`grep -iE "password|secret|token|api[_-]?key|/Users/|/home/|credential"
  .claude/settings.json`): no matches — no credentials, no personal absolute paths, no
  machine-specific dependency locations. No unsafe broad patterns (no bare shell loops,
  filesystem-wide globs, or mutation-capable wildcards) — every `:*` wildcard trails a fixed,
  read-only or local-artifact-only subcommand.
- Syntax validation: `python3 -c "import json; json.load(open('.claude/settings.json'))"` →
  `VALID JSON`, exit 0.

**Step 5 — Generic source baseline unchanged**

- Confirmed: nothing was written to the canonical source. The merge target was this repository's
  own `.claude/settings.json` only; the source's `.claude/settings.json` at `ec90087` was read via
  `git show`, never opened for editing.

**Approval gate**

- This gate covers two acts, exercised separately here: (a) creating/merging strictly within the
  reviewed baseline — **auto-approvable** per this step's own text, since content is deterministic
  and sourced from a baseline reviewed once, elsewhere, in advance; (b) broadening with a command
  family absent from that baseline (the proposed 10 `mvnw`/`mvnw.cmd` entries) — **live
  `[HUMAN APPROVAL REQUIRED]`, exercised**: the operator was shown the exact baseline content, its
  provenance, and the proposed addition, and explicitly chose "baseline only, drop mvnw additions."
  The file actually written contains **only** the reviewed baseline (a) — no broadening occurred,
  so (b)'s gate was presented and the broadening was declined, not granted.
- The harness's own safety classifier independently blocked an unapproved write to
  `.claude/settings.json` (a permissions-relevant file) before the live gate above was even
  reached, consistent with treating this file's mutation as requiring explicit human review.

**Mandatory fresh-session smoke test — NOT YET RUN, this session cannot evidence it**

Per this step's own text: "This step's smoke test terminates in a stop-and-hand-off... The session
that just wrote the permission file cannot evidence it: its permission state was established before
the file existed... Generate the exact fresh-session prompt below and stop." This is this step's own
designed stopping point, not a "continue?" question — reaching it, this run stops here rather than
proceeding into `ADOPT-06`.

Fresh-session prompt to run, verbatim, in a **new** Claude Code session in this repository:

```text
Perform a read-only smoke test of this repository's project-local permissions.

First, run one command deliberately absent from this project's permission allowlist — for
example `date` — as a negative control. Evaluate it before any other command; its result routes
the rest of this test:
- If it requests permission: the test can measure the permission file. Continue below.
- If it does not request permission: this client auto-approves outside the allowlist regardless
  of the file under test, so no command below can demonstrate anything about that file. Stop
  here and report NOT APPLICABLE ON THIS CLIENT, with this result as the reason. Do not run
  the remaining commands as smoke-test evidence.

Only if the negative control requested permission, run these commands separately, without
combining them with shell operators:
- openspec --version
- openspec doctor --json
- openspec context --json
- openspec schemas
- openspec templates
- git status --short
- git diff -- openspec/config.yaml
- one read-only CodeGraph exploration query (for example: codegraph explore "list entry points")

Do not modify files.

For each command report:
- whether it executed;
- whether it requested permission;
- PASS or FAIL.

Treat an unexecuted or failed command as FAIL, never an inferred PASS from empty output.

Stop after reporting the negative control's result and the permission behavior.
```

| Client / OS | Available? | Negative control | Result |
|---|---|---|---|
| Claude Code / macOS | yes | **did not request permission** — negative control (`date`) executed silently | `NOT APPLICABLE ON THIS CLIENT` — see alternative-criterion closure below |
| Claude Code / Linux | not available on this adoption's hardware | — | `PENDING EVIDENCE` |
| Claude Code / Windows | not available on this adoption's hardware | — | `PENDING EVIDENCE` |

**Negative control result and alternative-criterion closure (macOS / Claude Code row)**

- Negative control (`date`) executed without triggering a permission prompt. Per this step's own
  text, this is not evidence that the permission file is broken — it means this client auto-approves
  outside the allowlist regardless of the file under test, so the primary smoke test cannot
  distinguish a working permission file from no permission file at all on this client. Falls through
  to the alternative criterion, not a FAIL.
- **Alternative-criterion sub-criteria, both verified**:
  1. **Allowlist coverage by inspection** — every command in the canonical prompt matched an
     existing pattern already present in the merged `.claude/settings.json`: `openspec --version` →
     `Bash(openspec --version)`; `openspec doctor --json` → `Bash(openspec doctor:*)`;
     `openspec context --json` → `Bash(openspec context:*)`; `openspec schemas` →
     `Bash(openspec schemas:*)`; `openspec templates` → `Bash(openspec templates:*)`;
     `git status --short` → `Bash(git status:*)`; `git diff -- openspec/config.yaml` →
     `Bash(git diff:*)`; a `codegraph explore` query → `Bash(codegraph explore:*)` and
     `mcp__codegraph__codegraph_explore`.
  2. **Functional execution** — all 8 canonical-prompt commands were run directly and returned
     exit 0 with valid output (reported by the operator, not independently re-executed by this
     session as smoke-test evidence — recording as reported, per evidence discipline: this is the
     operator's own verification, distinct from this session's earlier, unrelated executions of
     several of the same tools for other purposes).
  3. **`[HUMAN APPROVAL REQUIRED]` to close on this criterion** — **GRANTED**, operator (Landaone),
     2026-08-19, interactive instruction: "Human approval granted to close ADOPT-05B via the
     alternative criterion documented in 03-client-permissions.md... Record ADOPT-05B as closed via
     the alternative criterion, explicitly labeled as weaker evidence than a PASS smoke test per the
     guide's own framing." Recorded verbatim as the required reasoning; this criterion cannot itself
     distinguish a working permission file from no permission file at all — that limitation is
     carried forward, not resolved, exactly as the guide requires.
- **Residual note, explicitly flagged by the operator as non-blocking for this checkpoint**: the
  silent execution of the negative control suggests this client may be operating under a global
  permission override independent of `.claude/settings.json` (a skip-permissions mode, or a
  user-level settings override) — this session's own prior experience is consistent with that
  (several Bash commands ran unprompted throughout this run, while a small number of
  higher-risk actions — `git push`, writing `.claude/settings.json` itself — were separately
  blocked by what this session observed as "the auto mode classifier," a distinct mechanism from
  the project-local allowlist file). Worth investigating independently since it would affect any
  future command in this environment, not only this smoke test. Not resolved here; carried forward
  as a limitation.
- Windows and Linux rows remain `PENDING EVIDENCE` — no such hardware was available during this
  adoption. Not quietly omitted; not inferred as PASS.

- Result: **PASS** — closed on the alternative criterion for the one available combination
  (Claude Code / macOS), per live, reasoned operator ruling. Windows/Linux rows remain `PENDING
  EVIDENCE`, carried forward rather than blocking this step, since the guide records an unavailable
  combination as pending, never as a step-level FAIL.

---

## `ADOPT-07` — Configure OpenSpec to Consume `docs/` and `ai-specs/`

- Date: 2026-08-19
- Prompt used: the canonical consolidated prompt from `04-context-and-openspec.md`, executed
  directly by this session (not delegated — scope is one file, contained enough for the executing
  session to handle without a subagent).
- Pre-inspection: installed OpenSpec version `1.7.0` (unchanged since `ADOPT-02`); config file is
  `openspec/config.yaml` (the version's generated extension); existing `docs/`, `ai-specs/agents/`,
  `ai-specs/skills/` inventoried (7 docs files from `ADOPT-06`; 3 agents — `backend-developer.md`,
  `product-strategy-analyst.md`, `frontend-developer.md`; skills including `enrich-us`,
  `specboot-verify`, `adversarial-review`, `update-docs`, `commit`, and others from `ADOPT-03`).
- Reference consulted: this same repository's prior `v3` adoption's own `openspec/config.yaml`, as
  a structural template only — every fact re-verified against v4's actual current files rather
  than copied. Verified directly against source: the `GET /api/price` endpoint
  (`PriceController.java`), the `httpcode` field (`Error.java`), the priority-desc repository
  method name (`PriceRepository.java`), and the `yyyy-MM-dd HH:mm:ss` request date format
  (`PriceController.java`) — all confirmed identical to v3's citations, since v4's source for these
  specific files is unchanged from v3.
- **Deviations from the v3 reference, made deliberately for v4's actual current state**:
  - **Agent selection**: v3 referenced `ai-specs/agents/java-spring-backend-developer.md`, a
    Java-specific agent created at v3's own `ADOPT-09` (agent-adaptation step). That step has not
    yet run in this v4 adoption — no such agent exists here yet (confirmed:
    `ai-specs/agents/` contains only the three generic agents from `ADOPT-03`). Recorded this gap
    explicitly in `context` instead of referencing a nonexistent file, with a forward-pointer
    noting `ADOPT-09` will resolve it.
  - **Test command**: v3's repository had a working `mvnw` wrapper, so its rules canonicalized
    `./mvnw test`. This v4 checkout's wrapper is broken (`ADOPT-01`'s finding, reconfirmed in
    `ADOPT-06`'s evidence) — rules here canonicalize `mvn test` instead and explicitly say not to
    use the wrapper.
  - **Known-defect framing**: v3 had already fixed its exception-handler defect; this v4 repository
    has not (per `ADOPT-06`). Context and the `specs` rule here explicitly state the defect is
    UNFIXED and describe the actual current error-path behavior (malformed date/non-numeric
    params/wrong method fall through Spring's default error body, not the custom `Error` DTO),
    matching `ADOPT-06`'s empirically-verified findings, not v3's already-corrected behavior.
- Validation performed:
  - YAML syntax: `python3 -c "import yaml; yaml.safe_load(open('openspec/config.yaml'))"` →
    `VALID YAML`, no error.
  - `openspec doctor` → `OpenSpec root: ok`, `References (none declared)` — zero warnings.
  - Every referenced path checked with `test -f`/existence: all 7 `docs/` files, all 3
    `ai-specs/agents/*.md` files, `src/main/resources/db/migration/V1_create_tables.sql`,
    `src/main/java/com/llandaeta/prices/db/repositories/PriceRepository.java` — all confirmed
    present.
  - **Rules-block check, made falsifiable with a negative control** (per this step's own required
    method, since `openspec doctor` does not read the `rules` block): created a scratch change
    `openspec/changes/scratch-adopt07-check/` with a minimal `proposal.md`; ran `openspec
    instructions proposal --change scratch-adopt07-check` and confirmed the real `proposal` rules
    text appeared in the output (e.g. the `GET /api/price`/`httpcode`/`Non-goals` rule lines).
    **Negative control**: injected a deliberately invalid marker
    (`'NEGATIVE-CONTROL-MARKER-XYZ123'`) as the first `proposal` rule, reran the same command, and
    confirmed the marker **was** reported in the output — proving the check is falsifiable (a
    broken/unread `rules` block would NOT have surfaced it). Removed the marker; `diff` against a
    pre-injection backup confirmed the config was restored byte-identical. Scratch change removed
    (`rm -rf openspec/changes/scratch-adopt07-check`); confirmed absent
    (`find openspec/changes -maxdepth 2` shows only `openspec/changes` and `openspec/changes/archive`).
  - Apply/archive guidance: verified separately at `ADOPT-08` below (same underlying config,
    re-checked read-only).
  - No absolute machine-specific paths: `grep -n "/Users/\|/home/" openspec/config.yaml` → no
    matches.
- **Approval gate**: none beyond the edit itself being reviewable, per this step's own text — this
  step modifies only the OpenSpec configuration file. No live gate presented.
- Result: PASS

---

## `ADOPT-08` — Verify OpenSpec Configuration

- Date: 2026-08-19 (same session, executed immediately after `ADOPT-07` — this guide's own
  documented executed pair with `ADOPT-07`, per `04-context-and-openspec.md`'s header note: "per
  `00-conventions.md`'s checkpoint-grouping rule, this is a guide-documented executed pair eligible
  for one checkpoint with a recorded structural justification — the same treatment
  `05-agents-and-skills.md` already states for `ADOPT-09`/`ADOPT-10` and `ADOPT-11`/`ADOPT-12`."
  This is the guide's own documented pairing, not this run's own convenience choice.)
- Read-only re-verification of the same `openspec/config.yaml` written at `ADOPT-07` — confirmed
  byte-identical (no edit occurred between the two steps; `md5 openspec/config.yaml` =
  `d477c9f8ff8fea554032e9632ef1e353`, matching the post-restoration state at the end of `ADOPT-07`).
- `openspec --version` → `1.7.0`. `openspec --help` → command list resolves normally (no
  `command not found`).
- `openspec doctor` → `OpenSpec root: ok`, zero warnings.
- Configured schema resolves: `schema: spec-driven` present and valid.
- Context references the intended repository documentation: `grep -c "docs/" openspec/config.yaml`
  → 20 references present.
- Proposal/specification/task rules parse correctly: re-confirmed via the same falsifiable method
  as `ADOPT-07` would require, using a fresh scratch change
  (`openspec/changes/scratch-adopt08-check/`) — `openspec instructions proposal --change
  scratch-adopt08-check` resolved real rule text. Scratch change removed immediately after.
- Apply/archive guidance parses correctly: `openspec instructions apply --change
  scratch-adopt08-check` → resolved `"Implement in small, reviewable steps..."`; `openspec
  instructions archive --change scratch-adopt08-check` → resolved `"Confirm the documentation
  under \"docs/\" reflects the change before archiving..."`. Scratch change removed immediately
  after both checks (`rm -rf openspec/changes/scratch-adopt08-check`); confirmed absent.
- Referenced canonical agents exist: `ai-specs/agents/product-strategy-analyst.md`,
  `ai-specs/agents/backend-developer.md`, `ai-specs/agents/frontend-developer.md` — all confirmed
  present via `test -f`.
- Referenced canonical skills exist: `enrich-us`, `specboot-verify`, `adversarial-review`,
  `update-docs`, `commit` — all confirmed present under `ai-specs/skills/` via `test -d`.
- Repository paths are relative, not machine-specific absolute: `grep -n "/Users/\|/home/"
  openspec/config.yaml` → no matches.
- No corrections were made during this validation (read-only, per this step's own rule — "Do not
  correct failures during this validation"); none were needed since `ADOPT-07`'s content already
  passed every check.
- Result: PASS

---

## `ADOPT-06` — Adapt the Repository Technical Context

- Date: 2026-08-19
- Prompt used: the canonical consolidated prompt from `04-context-and-openspec.md` verbatim,
  executed by a delegated agent (this session's own subagent, not a separate orchestration —
  the executing session remained accountable for review and the approval gate). A first attempt
  using a narrowly-scoped `backend-developer` subagent (TypeScript/DDD/Prisma-only, plan-file-only
  role) correctly self-refused as mismatched to this Java/Spring Boot repository and to a
  direct-edit task; re-run with a general-purpose agent, which performed the actual edits.
- Repository evidence inspected (by the executing agent, self-reported and independently
  spot-checked below): `pom.xml` (90 lines — Spring Boot 2.4.5 parent, Java 11, data-jpa, web,
  flyway-core, h2, devtools, lombok, configuration-processor, starter-test); all 12 main source
  files under `src/main/java/com/llandaeta/prices/`; all 4 test files; `application.yaml`;
  `V1_create_tables.sql`; `HELP.md`; git log. CodeGraph (`codegraph explore`) used to cross-verify
  controller/model/service/entity and exception-handler/repository relationships — outputs matched
  direct file reads. Live empirical verification: ran `mvn test` (4 test classes, reported passing)
  and `mvn spring-boot:run`, then issued `curl` requests covering success/404/malformed-date/
  non-numeric-param/wrong-method cases, revealing the actual error-contract split described below.
  Confirmed `./mvnw test` fails (`.mvn/wrapper/maven-wrapper.properties` missing, consistent with
  `ADOPT-01`'s own finding) while system `mvn` works. Read the sibling `v3` adoption's `docs/` only
  as a structural/quality reference, not copied — every fact independently re-verified against this
  repository's actual current files (v3 and v4 differ: v3 already fixed the exception-handler
  defect v4 still has).
- Files modified (all under `docs/`, matching this step's `Allowed modifications` exactly):
  `docs/base-standards.md`, `docs/backend-standards.md`, `docs/frontend-standards.md`,
  `docs/documentation-standards.md`, `docs/development_guide.md`, `docs/data-model.md`,
  `docs/api-spec.yml`. `git diff --stat docs/`: 7 files changed, 862 insertions, 3189 deletions.
  **Independently verified** (by this session, not merely trusting the subagent's self-report):
  `git status --short` confirms no path outside `docs/` (plus the pre-existing, unrelated run-log
  delta) was touched — `src/`, `ai-specs/`, `openspec/`, `.claude/`, `.mcp.json` all show no diff.
- Template contamination removed: full replacement of the TypeScript/Node/Express/Prisma/
  PostgreSQL/Jest/DDD-aggregate/"LTI ATS" candidate-domain content in `backend-standards.md`,
  `frontend-standards.md` (→ NOT APPLICABLE determination), `data-model.md`, `api-spec.yml`
  (Candidates/Positions/Interviews OpenAPI spec → real single `GET /api/price` contract), and
  `development_guide.md`. **Independently re-verified** by this session:
  `grep -riE "prisma|postgresql|node\.js|react|cypress|candidate|typescript|express\.js|LTI \(|jest\b"
  docs/*.md docs/*.yml` — all matches are legitimate negation statements confirming absence (for
  example "There is no TypeScript, Express, Prisma... in this repository"), not residual
  contamination.
- Known defects documented as risks (code unchanged, only documented with citations):
  1. Broken generic exception handler — `HttpErrorHandler.unhandledExceptions`
     (`HttpErrorHandler.java:24-25`) is `@ExceptionHandler(Exception.class)` but its parameter is
     typed `HttpException`, making it unreachable for non-`HttpException` exceptions.
     **Independently re-verified**: read the file directly — lines 24-25 confirmed exactly as
     cited.
  2. Grammatically defective error message, `"No  price found to the brand"` (double space, wrong
     preposition) — `PriceServiceImpl.java:30`. **Independently re-verified**: read the file
     directly, line 30 confirmed exact match.
  3. `PRICE DECIMAL(4,2)` caps storable values at 99.99 — `V1_create_tables.sql:12`.
     **Independently re-verified**: read the file directly, line 12 confirmed.
  4. `mvnw` wrapper broken — missing `.mvn/wrapper/maven-wrapper.properties`, consistent with
     `ADOPT-01`'s own finding.
- Unresolved contradictions or risks: none reported; cross-document heading references confirmed
  resolvable.
- Citation-check result: every factual claim reported to carry a `file:line` citation; the
  reporting agent stated it independently re-verified every line number against actual current
  file line counts and self-corrected 3 off-by-one errors before reporting. This session
  spot-checked 3 of the citations directly against the actual files (the exception-handler defect,
  the error-message defect, and the migration's `DECIMAL(4,2)`/seed-row lines) — all 3 confirmed
  exact matches. Not every one of the reported ~179-scale citation set was individually
  re-verified by this session; the spot-check covers the highest-risk claims (the two documented
  defects) plus one structural claim, not an exhaustive re-audit.
- Validation (as reported by the executing agent, cross-checked where noted): stack vs `pom.xml` —
  PASS; architecture vs source structure — PASS; API docs vs controller — PASS; data model vs
  entity+migration — PASS; build/test commands vs repo config (including the `mvnw` defect) —
  PASS; absence of template terminology — PASS, **independently re-confirmed** by this session's
  own grep above; internal consistency — PASS; every factual claim resolves to a citation — PASS,
  partially spot-checked as above; frontend marked NOT APPLICABLE, no Playwright/E2E introduced —
  PASS, **independently re-confirmed** by this session reading `docs/frontend-standards.md`
  directly; only `docs/` modified — PASS, **independently re-confirmed** via `git status`/`git
  diff --stat` above; YAML syntax of `api-spec.yml` — PASS, **independently re-confirmed** by this
  session running `python3 -c "import yaml; yaml.safe_load(open('docs/api-spec.yml'))"` → no error.
- **Approval gate**: **[HUMAN APPROVAL REQUIRED]**, exercised live. The diff summary, verification
  results, and defect list above were presented to the operator; approved, 2026-08-19, via
  interactive confirmation ("Approve (Recommended)").
- Result: PASS

---

## `ADOPT-13` — Create Selected-Client Adapters

- Date: 2026-08-19
- Prompt used: the canonical consolidated prompt from `06-adapters-and-discovery.md`, executed
  directly by this session (contained enough — symlink creation only, no content generation).
- Selected clients detected from real client configuration: Claude only (`.claude/` present,
  OpenSpec-generated `.claude/commands/opsx/*`, `.claude/skills/openspec-*`, `.claude/settings.json`,
  `.mcp.json` all confirmed present from `ADOPT-02`/`ADOPT-05`/`ADOPT-05B`); no `.kiro/` directory
  exists — confirmed via `test -d .kiro` — so no Kiro adapters were created.
- Pre-inspection: `.claude/agents/` did not exist yet (`ls -la .claude/agents` → "No such file or
  directory"); `.claude/skills/` contained 6 real OpenSpec-generated directories
  (`openspec-apply-change`, `openspec-archive-change`, `openspec-explore`, `openspec-propose`,
  `openspec-sync-specs`, `openspec-update-change`) plus the machine-local `specboot-adopt` symlink
  from `ADOPT-00` (absolute target, git-ignored via `.git/info/exclude` — distinct from this step's
  canonical, relative symlinks).
- Exposed agents, determined from `openspec/config.yaml`'s active agent-selection rules (from
  `ADOPT-09`) plus applicability: `ai-specs/agents/java-backend-developer.md` (selected, applicable
  — this repository's entire implementation surface is Java/Spring Boot) and
  `ai-specs/agents/product-strategy-analyst.md` (technology-agnostic, selected, applies unchanged).
  **Not exposed**, per the config's own explicit rejection: `ai-specs/agents/backend-developer.md`
  (TypeScript-scoped, config explicitly says "do not select") and
  `ai-specs/agents/frontend-developer.md` (no frontend exists, config explicitly says "do not
  select") — both remain canonical and preserved, simply not symlinked for this client.
- Exposed skills: all 10 canonical skills under `ai-specs/skills/` (`adversarial-review`,
  `code-auditing`, `commit`, `enrich-us`, `explain`, `meta-prompt`, `specboot-verify`,
  `update-docs`, `using-git-worktrees`, `writing-skills`) — none collides by name with any of the
  6 real OpenSpec-generated skill directories, so no collision/skip case was triggered.
- Symlinks created (all relative, per this step's preference): 2 under `.claude/agents/`
  (`java-backend-developer.md` → `../../ai-specs/agents/java-backend-developer.md`,
  `product-strategy-analyst.md` → `../../ai-specs/agents/product-strategy-analyst.md`); 10 under
  `.claude/skills/` (each → `../../ai-specs/skills/<name>`) — commands: `mkdir -p .claude/agents`,
  then explicit per-item `ln -s` invocations (not a Bash word-splitting loop, per this step's own
  shell-safety rule — zsh is this session's active shell).
- Real directories preserved unchanged: all 6 `openspec-*` directories under `.claude/skills/` —
  none replaced, moved, deleted, or converted to a symlink.
- Existing files unchanged: `.claude/CLAUDE.md`, `.claude/settings.json`, `.claude/commands/`,
  `.mcp.json` — none touched by this step (confirmed no diff on these paths).
- Unselected clients checked: `.kiro/` confirmed absent — no adapters created for Kiro.
- Validation (this step's own filesystem checks, run after creation):
  - `find -L .claude/agents .claude/skills -type l -print` → empty — **no broken symlinks**.
  - `find .claude/skills -mindepth 1 -maxdepth 1 -type d -print` → the same 6 real `openspec-*`
    directories, unchanged.
  - `find .claude/agents .claude/skills -name "* *"` → empty — **no malformed (space-containing)
    symlink names**.
  - `test -d .kiro` → absent — confirmed no unselected-client adapter created.
- Files modified: 12 new symlinks (2 agent, 10 skill) under `.claude/agents/` and `.claude/skills/`.
  No other path touched.
- **Approval gate**: the adapter plan exposes exactly the agents and skills already validated at
  `ADOPT-09`–`ADOPT-12` (the same 2 agents `openspec/config.yaml` selects, the same 10 canonical
  skills, no different selection, nothing not already in that evidence) — **gate auto-approved**
  per this step's own text, recorded as evidence here rather than presented as a live question.
- **This step's own text**: "Do not claim runtime discovery has passed; that requires a fresh
  client session" — no such claim made here; deferred to `ADOPT-15`.
- Result: PASS

---

## `ADOPT-14` — Validate Adapter Files, Symlinks, and Generated Directories

- Date: 2026-08-19 (same session, executed immediately after `ADOPT-13` — this guide's own
  documented executed pair, per `06-adapters-and-discovery.md`'s header note, the same treatment as
  `ADOPT-09`/`10` and `ADOPT-11`/`12`.)
- Commands run (read-only, substituting the actual selected client — Claude only; no `.kiro/`
  paths exist so those arguments were omitted rather than passed against a nonexistent directory):
  - `find .claude/agents -type l -print -exec readlink {} \;` → 2 symlinks, both resolving to their
    recorded relative targets under `ai-specs/agents/`.
  - `find .claude/skills -type l -print -exec readlink {} \;` → 11 symlinks: the 10 canonical skill
    symlinks (relative, resolving to `ai-specs/skills/<name>`) plus the pre-existing, unrelated
    `specboot-adopt` machine-local symlink from `ADOPT-00` (absolute target, out of this step's
    scope — it is not a canonical agent/skill adapter, it is the orchestration skill's own
    discovery entry).
  - `find .claude/skills -mindepth 1 -maxdepth 1 -type d -print` → the same 6 real `openspec-*`
    directories, confirmed still real (not symlinks).
  - `find -L .claude/agents .claude/skills -type l -print` → empty — **zero broken symlinks**,
    satisfying this step's explicit "non-empty final broken-link result is FAIL" criterion.
- Total symlink count in this repository at this point: 12 canonical adapter symlinks (2 agent +
  10 skill) + 1 machine-local `specboot-adopt` (not a counted adapter) + 4 root-instruction symlinks
  from `ADOPT-03`... **correction, checked directly rather than assumed**: `ADOPT-03`'s own evidence
  recorded that this canonical source's template carries **no** root-instruction symlinks
  (`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`codex.md` all absent from the source template root), so
  this repository's actual total is 12 canonical adapters, not the reference run's illustrative 30 —
  consistent with `ADOPT-14`'s own framing of that figure as "illustrative evidence, not a fixed
  target for every repository."
- **Validation, PASS criterion by criterion**:
  - Agent adapters point to canonical files: PASS — both resolve under `ai-specs/agents/`.
  - Skill adapters point to canonical directories: PASS — all 10 resolve under `ai-specs/skills/`.
  - Targets exist: PASS — re-confirmed via `find -L` producing zero broken-link output.
  - Generated directories remain real: PASS — 6 `openspec-*` directories confirmed still real.
  - No broken links: PASS.
  - No malformed symlink names: PASS — re-confirmed via `find ... -name "* *"` → empty.
  - No adapters for unselected clients: PASS — `.kiro/` confirmed absent.
- Result: PASS

---

## `ADOPT-15` — Validate Runtime Discovery in a Fresh Client Session

- Date: 2026-08-19. Client: Claude Code (the only client selected this run, per `ADOPT-00`) —
  satisfies the once-per-client requirement with this single report.
- Procedure followed: operator closed the session that performed `ADOPT-13`/`14`'s work, opened a
  genuinely new session at the repository root, submitted the canonical prompt verbatim, and
  returned the fresh session's report to this (a third, separate) session for recording. This
  session did not and could not perform the fresh-session probe itself — it only records evidence
  supplied by the operator from the actual fresh session, per this step's own designed
  stop-and-hand-off.
- **Discovery report** (as returned by the fresh session, via the operator):
  - Client and mode: Claude Code CLI, default agent, plan/read-only stance; no agent or skill
    formally invoked to perform the review itself.
  - Root instruction files automatically loaded: `~/.claude/CLAUDE.md` (user global) and
    `.claude/CLAUDE.md` (project), both injected automatically at session start.
  - Canonical/adapted agent definitions automatically discovered: `.claude/agents/
    java-backend-developer.md` and `.claude/agents/product-strategy-analyst.md` (the two symlinks
    created at `ADOPT-13`), surfaced via the Agent tool's auto-populated type list; **confirmed
    independently** by this session — the new-agent-availability system-reminder that appeared
    when the operator's own message arrived in this conversation (visible above, listing
    `java-backend-developer` as newly available and `backend-developer`/`frontend-developer` as no
    longer available) is itself separate, first-hand corroborating evidence of the same discovery
    mechanism working, from a different point in this same adoption. Neither agent was invoked.
  - Skills automatically discovered: the full skill listing injected via system reminder, including
    this repository's adapted skills (`specboot-adopt`, `code-auditing`, `openspec-*`, `commit`,
    etc.) — matches this session's own repeated observation of the same mechanism throughout this
    adoption (for example, immediately after `ADOPT-13`'s symlink creation, this session's own next
    turn showed the 10 canonical skills newly listed). None invoked in the fresh session, since it
    was a direct read-only review.
  - Project documentation consumed: none automatically pushed into context; `docs/*.md` and
    `openspec/` exist but nothing surfaced them without an explicit query.
  - CodeGraph tools/commands used: none invoked explicitly by the fresh session; `codegraph_explore`
    fired automatically via the `UserPromptSubmit` hook (the `CODEGRAPH_START/END` block provisioned
    at `ADOPT-05`) and returned `PriceService`, `PriceRepository`, `PriceServiceImpl`, `PriceModel`
    verbatim, including a blast-radius note flagging the repository query as having "no covering
    tests found."
  - Resources opened manually (automatic discovery did not surface them): `docs/*.md`, `openspec/`,
    `.specboot/adoption/ADOPTION-RUN-LOG.md`, `.specboot/local/canonical-source-path`;
    `PriceController.java`, `PriceEntity.java`, `V1_create_tables.sql`, `application.yaml`
    (CodeGraph's automatic pass covered only the service/repository/model layer);
    `PriceServiceImplTest.java` (opened manually to confirm CodeGraph's no-covering-tests flag).
- **Primary implementation risk reported**: `PriceRepository`'s derived query
  (`findFirstBy...OrderByPriorityDesc`, `PriceRepository.java:13`) has no deterministic tie-break
  rule when priorities are equal for overlapping date ranges, and
  `PriceServiceImplTest.java` mocks `PriceRepository` (`@MockBean`), so this derived query never
  executes against a real database anywhere in the test suite — no `@DataJpaTest` or equivalent
  exists. **Independently re-verified by this session**: read `PriceRepository.java` directly —
  line 13 confirmed exact match (the full derived-query method signature, unchanged from earlier
  `ADOPT-04`/`ADOPT-06` citations of the same file); read
  `PriceServiceImplTest.java` directly — lines 26-27 confirmed `@MockBean private PriceRepository
  priceRepository;`, corroborating the mocking claim exactly as reported.
- **Secondary risk reported**: `PRICE DECIMAL(4,2)` mapped to Java `double`
  (`PriceEntity.java:44`) risks floating-point rounding drift and caps prices at 99.99. **Matches
  this run's own `ADOPT-06` evidence** (defect 3, `V1_create_tables.sql:12`'s `DECIMAL(4,2)` cap,
  already documented in `docs/backend-standards.md`'s Known Risks and Defects section) — this is
  the same underlying schema constraint viewed from the entity-mapping side rather than a new,
  independently-discovered risk. **Independently re-verified**: read `PriceEntity.java` directly —
  line 44 confirmed `private double price;`.
- Files modified: none — confirmed by the fresh session's own report and consistent with this
  step's prompt explicitly forbidding modification.
- **Interpretation per this step's four-concept framework**: (1) automatic instruction/catalog/
  profile discovery — root instructions, the 2 adapted agents, and the 10 canonical skills were all
  discovered automatically, without being told to; CodeGraph's hook-driven auto-context is also
  automatic discovery, not manual injection. (2) explicit invocation — none occurred; not a failure
  condition per this step's own text ("a client that... never formally invokes an agent or skill
  has not failed discovery"). (3) normal manual reading during task execution — the "resources
  opened manually" list above is expected task behavior (reading `docs/`, entity/controller files,
  the test file), not a discovery failure. (4) prohibited manual injection — none occurred; no
  project documentation was front-loaded into the prompt to force a PASS.
- **PASS basis**: automatic discovery (concept 1) demonstrably happened — root instructions, both
  adapted agents, all canonical skills, and CodeGraph's hook-driven context all loaded without
  being told to, and CodeGraph's automatic pass correctly surfaced the exact risk area (the
  untested derived query) and its missing-coverage flag before any file was opened manually. No
  concept-4 violation occurred.
- **Approval**: read-only step per its own text — no approval gate. The operator's transmission of
  the fresh-session report, and this session's independent re-verification of its citations, is the
  evidence-recording act itself, not a separate gate.
- Result: PASS

---

## `ADOPT-16` — Run the Project Baseline

- Date: 2026-08-19
- Command determined from repository evidence: `mvn test` (Maven project per `pom.xml`; `mvnw`
  present but non-functional in this checkout, per `ADOPT-01`/`ADOPT-06`/`ADOPT-11`'s consistent
  finding — system `mvn` used directly, matching the canonical skills' own documented fallback
  pattern from `ADOPT-11`).
- No failed attempts: unlike the reference Java/Maven repository's own recorded experience (stale
  `target/classes` from an offline run required a `target/` relocation and approval), this run's
  `target/` was already fresh from `mvn test`/`mvn -q -DskipTests compile` runs performed earlier
  in this session (during `ADOPT-11`'s independent verification) — no stale-output remediation was
  needed. No approval gate reached (nothing removed or relocated).
- Final command and result: `mvn test` → exit 0. Per-class results: `Tests run: 1, Failures: 0,
  Errors: 0, Skipped: 0` (`PriceEntityModelConverterTest`); `Tests run: 1, Failures: 0, Errors: 0,
  Skipped: 0` (`PriceServiceImplTest`); `Tests run: 1, Failures: 0, Errors: 0, Skipped: 0`
  (`AppPricesRestApplicationTests`); `Tests run: 5, Failures: 0, Errors: 0, Skipped: 0`
  (`PriceControllerTest`). Aggregate: `Tests run: 8, Failures: 0, Errors: 0, Skipped: 0` —
  `BUILD SUCCESS`.
- `openspec doctor` → `OpenSpec root: ok`, `References (none declared)` — zero warnings.
- `git status --short` → clean except the always-permitted, carried-forward run-log delta from the
  prior checkpoint (` M .specboot/adoption/ADOPTION-RUN-LOG.md`) — no unexpected paths.
- `codegraph sync` → `Scanning files... Already up to date. Done` — CodeGraph current.
- Result: PASS

---

## `ADOPT-17` — Review and Create a Clean Local Checkpoint

- Date: 2026-08-19. Branch: `experiment/specboot-ai-adoption-v4`.
- Context distinct from the reference run: this adoption checkpointed after **every** individual
  step throughout (`ADOPT-00` through `ADOPT-16`), rather than deferring one large checkpoint to
  this final step — consistent with `00-conventions.md`'s "smallest independently validated step"
  default. `ADOPT-17`'s own union is therefore small: only `ADOPT-16`'s run-log delta remained
  uncommitted at this point.
- `git status --short` (pre-stage) → ` M .specboot/adoption/ADOPTION-RUN-LOG.md`, nothing else.
- `git diff --stat` (pre-stage) → 1 file changed, 28 insertions, 2 deletions.
- Staged: `git add .specboot/adoption/ADOPTION-RUN-LOG.md` (the only changed path — no
  unconditional `git add -A` used).
- `git diff --cached --stat` → same 1 file, 28/2. `git diff --cached --check` → exit 0, no
  whitespace-problem output.
- Staged diff saved for review: `git diff --cached > .specboot/adoption/staged.diff` (52 lines);
  reviewed, then deleted before the commit step per this step's explicit instruction (confirmed
  `git status --short` no longer lists it).
- **Staged-scope checklist**, checked explicitly:
  - Application source/test code the adoption did not intentionally change: none staged.
  - Build outputs or generated artifacts: none staged (`target/` remains git-ignored, untouched).
  - Personal client overrides accidentally staged: none — no `.claude/settings.local.json` exists.
  - Intentional shared client settings omitted from review: none — `.claude/settings.json` was
    already committed at its own `ADOPT-05B` checkpoint, not part of this diff.
  - CodeGraph runtime/database files: none staged — `.codegraph/` remains git-ignored except its
    already-committed `.gitignore`.
  - Secret- or credential-shaped text: `git diff --cached` reviewed directly — none present (only
    prose evidence text was added).
  - Machine-specific absolute paths: none in the diff (checked directly — the diff only contains
    narrative evidence referencing repository-relative paths and previously-recorded commit SHAs).
  - Unexpected file modes: none — the single changed file is a regular text file, mode unchanged.
  - Symlink targets/broken symlinks: re-checked as part of this review even though no symlink is in
    this specific diff — `find -L .claude/agents .claude/skills -type l -print` → empty, confirming
    the state committed at `ADOPT-13` remains intact.
  - Adapters for unselected clients: none — no `.kiro/` exists.
  - Unstaged changes left after staging: `git status --short` post-stage → only the `M ` (staged)
    line, no unstaged remainder.
  - Untracked files revealing an incomplete step: none — `git status --short` shows no `??` entries.
- No correction was needed during this review, so the "rerun a fresh independent review after any
  correction" clause did not apply — this was the single, final review of the staged diff.
- **Validation against this step's acceptance criteria**:
  - Baseline passes: PASS — `ADOPT-16` (`mvn test`, 8/8, `BUILD SUCCESS`).
  - OpenSpec passes: PASS — `ADOPT-16`'s `openspec doctor`, zero warnings.
  - CodeGraph current: PASS — `ADOPT-16`'s `codegraph sync`, already up to date.
  - Diff contains only intended adoption changes: PASS — staged-scope checklist above, all clear.
  - Staged diff reviewed and saved: PASS (then deleted, per this step's own instruction).
  - `git diff --cached --check` triaged: PASS, exit 0 — no warnings to triage.
  - Every staged-scope checklist item checked: PASS — see above.
  - Independent final validation after correction: N/A — no correction was needed.
  - Checkpoint protocol steps followed in order, both approvals recorded separately: see below.
  - Remote-impact assessment performed from real evidence, reported before push approval: see below.
  - Push, if performed, targeted the current working branch on the already-configured remote, not
    a force push: see below.
- **Commit approval**: staged set `{.specboot/adoption/ADOPTION-RUN-LOG.md}` is a subset of the
  always-permitted run log with no other path — **auto-approved** per standing authorization
  (`ADOPTION-AUTHORIZATION.md`), recorded as evidence.
- Result: PASS (commit SHA, remote-impact assessment, and push status recorded in the checkpoint
  ledger entry below, per this step's own instruction that `ADOPT-17` reuses the checkpoint
  protocol rather than duplicating its fields here).

---

## `ADOPT-18` — De-bootstrap and Reconcile Client Artifacts

- Date: 2026-08-19. `.specboot/adoption/BOOTSTRAP-MANIFEST.json` exists → this step's `always`
  condition applies (not the `SKIPPED — no bootstrap performed` path).
- **Preconditions confirmed before step 1**: `ADOPT-17` = PASS (checked above). `ADOPT-11`/`12`'s
  mandatory-capability completeness check = PASS — confirmed via the operator ruling recorded at
  `ADOPT-11` (`propose`/`apply`/`archive` satisfied by design through OpenSpec-CLI-generated client
  artifacts). This precondition was verified **before** any manifest entry was read or removed, per
  this step's own explicit ordering requirement.
- Delivery mode read from the manifest: `source-linked`. Both mode obligations already recorded:
  `payload: "SKIPPED — source-linked mode"`, `container: "SKIPPED — source-linked mode"` — neither
  was ever created, confirmed by `test -d .specboot/bootstrap` → absent.
- **Manifest read** (step 1): 2 entries. Entry 1: `.claude/skills/specboot-adopt`,
  `ownership: bootstrap-created`, `mode: symlink`, `intended-permanent-replacement: null`,
  `machineLocal: true`. Entry 2: `.claude/CLAUDE.md`, `ownership: bootstrap-created`,
  `mode: real-file`, `intended-permanent-replacement: null`, `machineLocal: false`.
- **Replacement verification (step 2)**: both entries carry `intended-permanent-replacement: null`
  — no replacement claimed for either, so nothing to verify or create. Not a refusal condition
  (a `null` intended replacement is not a missing/unresolved one).
- **Act per entry (step 3)**:
  - Entry 1 (`symlink` mode): `unlink .claude/skills/specboot-adopt` → exit 0. Confirmed removed:
    `ls -la .claude/skills/specboot-adopt` → "No such file or directory". Never followed — the
    unlink targets the entry path itself, not its absolute external target.
  - Entry 2 (`real-file` mode, **operator-approved deviation from the literal disposition**): the
    manifest's `real-file` mode reflects the file's content exactly as `ADOPT-00` created it (the
    checksum `sha256:b25e5f4b...` corresponds to the SPECBOOT-BOOTSTRAP delimited block being the
    entire file at bootstrap time). `ADOPT-05` (already checkpointed, commit `3ea53de`) later
    appended a permanent, non-bootstrap `CODEGRAPH_START/END` block into this same file. A literal
    full-file removal would have destroyed that already-checkpointed permanent content — this
    tension was presented to the operator (not resolved unilaterally) via `AskUserQuestion`, who
    explicitly approved: remove only the delimited `<!-- SPECBOOT-BOOTSTRAP:BEGIN/END -->` block,
    byte-preserving the rest. Read the file in full before editing (5 lines were the bootstrap
    block, 1 blank separator line, 10 lines were the CodeGraph block); removed exactly the
    bootstrap block plus its trailing blank separator line via `Edit`; **re-read the file after**
    to confirm byte-for-byte preservation of the `CODEGRAPH_START`...`CODEGRAPH_END` content,
    unchanged from `ADOPT-05`'s own recorded text. The file itself is retained (not removed), since
    it now holds only non-bootstrap, permanent content.
- **Root instruction file conversion (step 4)**: N/A — confirmed at `ADOPT-03` that this canonical
  source's template carries no root-level `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`codex.md`, so none
  exists in this repository to convert. `.claude/CLAUDE.md` (inside the client directory) is a
  distinct file from a root instruction file and is not in scope for this step's step-4 conversion
  rule.
- **Transient payload container (step 5)**: `SKIPPED — source-linked mode` — recorded explicitly in
  the manifest's `modeObligations`, unchanged from `ADOPT-00`; never created, nothing to remove.
- **Step 5b — machine-local source-path store**: `.specboot/local/` existed
  (`.specboot/local/canonical-source-path`, containing `/Users/landaeta/repos/specboot`) — removed
  via `rm -rf .specboot/local`; confirmed absent via `test -d .specboot/local`. The external
  canonical source the store pointed at was never touched by this removal (removing a pointer never
  follows what it named). `.specboot/adoption/BOOTSTRAP-MANIFEST.json` and
  `.specboot/adoption/ADOPTION-RUN-LOG.md` preserved (updated, not deleted).
- **Unselected/unverified client artifacts (step 6)**: none exist — confirmed `.kiro/` absent (no
  Kiro artifacts to remove); Codex was never selected and has no artifacts either.
- **Re-validation (step 7)**: `ADOPT-14`'s filesystem checks re-run in full: `find .claude/agents
  -type l -print -exec readlink {} \;` → 2 symlinks, both resolving correctly; `find .claude/skills
  -type l -print -exec readlink {} \;` → 10 canonical skill symlinks, all resolving (the
  `specboot-adopt` entry no longer appears, correctly, since it was just unlinked);
  `find .claude/skills -mindepth 1 -maxdepth 1 -type d -print` → the same 6 real `openspec-*`
  directories, unchanged; `find -L .claude/agents .claude/skills -type l -print` → **empty — zero
  broken symlinks**; `test -d .kiro` → absent, confirmed no unselected-client adapter.
  **Second `ADOPT-15` fresh-session check**: **not required** — disposition touched only entries
  within the manifest's exact `bootstrap-created` set (the `specboot-adopt` symlink, the delimited
  block inside `.claude/CLAUDE.md`, and the `.specboot/local/` store), nothing beyond it. This
  `ADOPT-14` filesystem re-check is recorded as the explicit substitute evidence per this step's own
  design-D-Y rule, not silently treated as equivalent to an unexercised fresh-session test.
- **Write-back (step 8)**: `.specboot/adoption/BOOTSTRAP-MANIFEST.json` updated —
  entry 1: `cleanup-status: "removed"`, `final-disposition` recorded (unlinked, never followed,
  absence is the ordinary state on any machine but the one that ran `ADOPT-00`). Entry 2:
  `cleanup-status: "retained-with-reason"`, `final-disposition` recorded in full (the operator-
  approved deviation reasoning above). Both entries now carry a **terminal** `cleanup-status` and a
  `final-disposition` — none left `pending`. JSON re-validated:
  `python3 -c "import json; json.load(open('.specboot/adoption/BOOTSTRAP-MANIFEST.json'))"` →
  no error.
- **No refusal reached**: neither refusal condition (unresolved replacement; unrecorded content in
  scope for removal) applied — both entries had `null` intended replacements (nothing to resolve),
  and no unrecorded content was encountered during processing.
- **External canonical source**: never touched — re-confirmed via `cd /Users/landaeta/repos/specboot
  && git status --porcelain` → empty (checked as part of this step's own diligence, consistent with
  every prior read of the source in this run using pinned-commit or read-only access only).
- **Approval gate**: **[HUMAN APPROVAL REQUIRED]** before any removal — exercised live. The
  complete removal plan (unlink `specboot-adopt`; remove `.specboot/local/`;
  `.specboot/bootstrap/` correctly SKIPPED; the `.claude/CLAUDE.md` tension and proposed
  resolution) was presented via `AskUserQuestion`; operator (Landaone) approved the recommended
  resolution (remove only the delimited block), 2026-08-19.
- Result: PASS

---

### Daily workflow pilot (not part of one-time adoption)

```text
Request: Fix the untested priority-tie-break behavior in PriceRepository's derived query
  (findFirstByBrandIdAndProductIdAndStartDateIsLessThanEqualAndEndDateGreaterThanEqualOrderByPriorityDesc,
  PriceRepository.java:13), flagged during ADOPT-15's architecture review. Named by the operator
  (Landaone), 2026-08-19 — not selected by the executing agent, per this step's own text.
Change ID: fix-price-priority-tie-break
Artifacts: proposal.md, specs/price-resolution/spec.md (new capability), design.md, tasks.md,
  enriched-work-item.md — all created via /opsx:propose, validated (openspec validate --strict:
  1 passed, 0 failed).
Implementation: PriceRepository.java's derived query renamed
  ...OrderByPriorityDesc -> ...OrderByPriorityDescIdDesc (Spring Data JPA parses the extended
  method name directly into ORDER BY priority DESC, id DESC — no @Query needed). New
  PriceRepositoryTest.java (@DataJpaTest, real H2/Flyway database, 4 tests). docs/data-model.md
  updated. Deviation surfaced by the implementing agent, not silently resolved: the
  proposal/design's "no other file changes" claim did not hold —
  PriceServiceImpl.java:26 calls the derived method by exact name and
  PriceServiceImplTest.java:59 stubs it by exact name via Mockito; both required a mechanical
  method-name-only update to keep compiling. A second gap was surfaced and deliberately left
  unresolved: docs/backend-standards.md:259 and docs/api-spec.yml:59 both still quote the old
  method name in prose and are now stale, but neither file was in this change's declared scope
  (proposal.md's Impact section names only docs/data-model.md; api-spec.yml is explicitly called
  out as unchanged) — flagged as a follow-up, not fixed here.
Tests: mvn test — independently re-run by this session (not only trusted from the implementer's
  report): Tests run: 12, Failures: 0, Errors: 0, Skipped: 0, BUILD SUCCESS. All 4 pre-existing
  test classes (8 tests) plus the new PriceRepositoryTest (4 tests: tie-at-top-priority returns
  the same row on every repeated call; tie-only-at-top-priority never returns the lower row;
  differing-priorities regression; no-match regression). This session independently read the new
  test file in full and confirmed it matches specs/price-resolution/spec.md's scenarios exactly.
enrich-us outcome (READY FOR PROPOSAL / NEEDS CLARIFICATION): READY FOR PROPOSAL. One assumption
  flagged rather than blocking (per the operator's own instruction to let enrich-us work out the
  tie-break rule): the deterministic key is id, direction left for the apply/design step to
  finalize.
Proposal approval: N/A — ADOPT-13's canonical-adapter approval-style auto-approval does not apply
  here; propose/apply's own approval gates are internal to the daily workflow (archive is the one
  gate ADOPT-19 itself consumes, per this step's own text) — proposal creation itself carries no
  separate human gate in this OpenSpec schema.
Apply result: all 8 tasks in tasks.md marked [x]. Independently re-verified by this session: git
  diff/status confirms exactly the claimed files changed, nothing beyond scope; mvn test re-run
  directly by this session with the same result reported.
specboot-verify verdict (PASS / PASS WITH GAPS / FAIL): **PASS**. Run directly by this session
  (not delegated). Task-by-task disk-evidence check: all 8 tasks in tasks.md confirmed against
  actual files (branch exists; PriceRepository.java renamed; PriceServiceImpl.java/Test.java
  call-site updates confirmed necessary and correct via `grep -n "OrderByPriority"` showing
  PriceControllerTest.java/PriceEntityModelConverterTest.java correctly untouched; new
  PriceRepositoryTest.java read in full; `mvn test` independently re-run by this session, 12/12,
  BUILD SUCCESS; manual curl testing independently RE-EXECUTED by this session — not merely
  trusted from the implementer's report — against a freshly started `mvn spring-boot:run`
  instance, all 6 documented cases (200 success, 200 priority-resolution, 404, 500, 400, 405)
  matched exactly; docs/data-model.md updated). Requirement/scenario walk against
  specs/price-resolution/spec.md: "Highest priority wins" — PASS (differingPriorities test +
  curl); "Deterministic tie-break when priorities are equal" — PASS (twoRowsTiedAtSamePriority
  test asserts the same row across 3 repeated calls; tieAtTopPriorityOnly test confirms a
  lower-priority row never wins); "No matching price yields not-found" — PASS
  (noMatchingRow test + curl 404). Capability availability for Claude (the only selected client):
  all 6 required capabilities confirmed present — enrich-us, specboot-verify, adversarial-review
  under `.claude/skills/`; propose/apply/archive via `.claude/skills/openspec-{propose,
  apply-change,archive-change}` (per the operator's `ADOPT-11` ruling). **One Minor finding**
  (does not block eligibility): `docs/backend-standards.md:259` and `docs/api-spec.yml:59` still
  quote the pre-rename method name in prose — a real, implementation-caused documentation-accuracy
  gap, but outside this change's own declared scope (`proposal.md`'s Impact section) and already
  self-surfaced by the implementer rather than hidden. No Blockers, no Majors, no unresolved
  questions.
Independent adversarial-review verdict (PASS / PASS WITH GAPS / FAIL): **PASS WITH GAPS**. Run by
  a freshly spawned subagent (cold-started, no conversation memory of the implementing agent or
  this orchestrating session) that independently re-derived the problem before reading design.md,
  inspected Hibernate's actual generated SQL log (`order by priceentit0_.priority desc,
  priceentit0_.id desc` — confirming the derived-query name parses as intended, not merely
  "looks right by convention"), independently re-ran `mvn test` (12/12, matching), independently
  started the app and issued live `curl` requests reproducing the tie-resolution behavior, and
  re-ran the new test class in isolation twice to check for cross-test leakage (none found).
  Findings: one Minor (the 3-row tied-at-top-priority test asserts an OR condition rather than
  repeated-call determinism — consistent with the spec's own scenario wording, not a spec
  violation, but a slightly weaker test than it could be) plus the already-known, out-of-scope
  stale-doc-citations gap (confirmed accurate, not re-flagged as new). No Blockers.
Independent adversarial-review provenance (reviewing session/client; cross-session, cross-client,
  or same-session-fallback): **self-flagged by the reviewing agent as a "same-session fallback,"
  not a genuinely independent review** — it reported having access to "the prior implementer's
  tasks.md report" despite being a cold-started subagent with no shared conversation memory with
  the implementing agent. This session's own assessment: the review was substantively rigorous
  (SQL-log inspection, live re-execution, isolated reruns — not merely re-reading prior claims),
  and only Claude is available as a client in this environment (no second client to run a
  cross-client review), so a stronger form of independence than "a separate, cold-started subagent
  with a skeptical, re-derive-from-scratch mandate" was not achievable here. Recorded exactly as
  the reviewing agent characterized it — not upgraded to "independent" by this session's own
  judgment — per this step's own explicit rule that a same-session fallback must be named, not
  silently treated as equivalent to true independence. This caveat is carried to the archive
  approval gate below for the operator's explicit consideration.
Post-review fix (operator-directed, 2026-08-19): the adversarial review's one Minor finding
  (tieAtTopPriorityOnly test asserted an OR condition, not repeated-call determinism) was
  addressed before archiving, per the operator's explicit choice ("Fix the Minor test-assertion
  gap first, then archive") rather than accepting it as a residual gap. Strengthened
  PriceRepositoryTest.tieAtTopPriorityOnly_returnsATiedTopPriorityRow_neverTheLowerOne to loop 3
  times and assert the exact deterministic winner (the higher-id tied row) on every call, matching
  the pattern already used in twoRowsTiedAtSamePriority. Re-ran `mvn test` after the change:
  Tests run: 12, Failures: 0, Errors: 0, Skipped: 0, BUILD SUCCESS — unchanged pass count, stronger
  assertion. This closes the adversarial review's only Minor finding; the specboot-verify Minor
  (stale out-of-scope doc citations) remains a deliberately out-of-scope, already-flagged
  follow-up, not addressed by this fix.
Archive approval (explicit human approval, both gates PASS/PASS WITH GAPS): **GRANTED** —
  operator (Landaone), 2026-08-19, via interactive approval, after directing the post-review fix
  above.
Archive result: **SUCCESS**. `openspec status` confirmed all 4 artifacts `done` and 0 incomplete
  tasks (`grep -c "\[ \]" tasks.md` → 0) before archiving. Delta spec existed
  (`specs/price-resolution/spec.md`); no main spec existed yet for `price-resolution` (new
  capability). Ran `/opsx:sync` inline: created `openspec/specs/price-resolution/spec.md`,
  copying the delta's `## Purpose` verbatim and its 3 `ADDED Requirements` (with all 5 scenarios)
  into the main spec's `## Requirements` section. Verified via `diff` that the synced main spec's
  requirements section is content-identical to the delta's `ADDED Requirements` section (modulo
  the header rename `## ADDED Requirements` → `## Requirements`, per the sync workflow's own
  format contract). Moved `openspec/changes/fix-price-priority-tie-break/` →
  `openspec/changes/archive/2026-08-19-fix-price-priority-tie-break/` (target path did not
  already exist, confirmed before the move). Post-archive `openspec validate --strict --all` →
  `✓ spec/price-resolution`, `Totals: 1 passed, 0 failed`.
Docs/spec sync: **DONE** — see Archive result above; `docs/data-model.md` was already updated
  during apply (task 5.1), separately from this OpenSpec spec/main-spec sync.
Commit message: "Fix nondeterministic priority tie-break in price resolution query" (full body in
  git log, commit `8b7df7b` on `feature/fix-price-priority-tie-break-backend`) — via the `commit`
  skill, staged scope explicitly limited to the pilot's own files (excluding the unrelated,
  concurrently-modified `.specboot/adoption/ADOPTION-RUN-LOG.md`, which belongs to this adoption's
  own branch/concern, not the pilot's). 12 files changed: `PriceRepository.java`,
  `PriceServiceImpl.java`, `PriceServiceImplTest.java`, new `PriceRepositoryTest.java`,
  `docs/data-model.md`, the archived change directory (6 files), new
  `openspec/specs/price-resolution/spec.md`.
PR title: N/A — deliberately not opened. The `commit` skill's default flow includes push + PR
  creation (steps 4-5); this run stopped before both, since `ADOPT-19`'s own text scopes this step
  to "orchestration and evidence recording," consumes only the pilot's own archive gate, and
  neither pushing this feature branch nor opening a PR was authorized. Recorded as a deliberate
  deviation from the skill's own default, not an oversight.
PR description: N/A — no PR opened.
Remote mutation attempted: NO — commit is local only; `feature/fix-price-priority-tie-break-backend`
  was never pushed.
Result: **PASS**. All six required capabilities exercised in order and reached their required
  outcome: `enrich-us` → READY FOR PROPOSAL; propose → all 4 artifacts created and validated;
  apply → all 8 tasks implemented, independently re-verified; tests → `mvn test` 12/12,
  independently re-run twice by this session; `specboot-verify` → PASS; `adversarial-review` →
  PASS WITH GAPS initially, its one Minor finding fixed per operator direction, re-verified
  (12/12 still passing with the strengthened assertion); docs/spec sync → done; archive → done,
  with explicit human approval obtained before archiving. This retires the guide's
  `PENDING END-TO-END VALIDATION` marker for this adoption.
Prompt corrections required: none — every canonical prompt (enrich-us, propose, apply,
  specboot-verify, archive) executed as documented, with the one process learning already
  captured above (the adversarial-review same-session-fallback caveat) rather than requiring a
  prompt-text correction.
```

---

## `ADOPT-20` — Pull-Request Readiness Gate

- Date: 2026-08-19. Verification only — this step created and modified nothing.
- Per-step confirmation from **recorded evidence** (read from this run log's own Step state table
  and each step's individual evidence block, not inferred or recalled):

  | Step | Recorded status | Evidence pointer |
  |---|---|---|
  | `ADOPT-00` | PASS | `ADOPT-00` evidence block (Bootstrap Client Discovery), this run log |
  | `ADOPT-01` | PASS | `ADOPT-01` evidence block (Install Prerequisites) |
  | `ADOPT-02` | PASS | `ADOPT-02` evidence block (OpenSpec install/init) |
  | `ADOPT-03` | PASS | `ADOPT-03` evidence block (Import SpecBoot) |
  | `ADOPT-04` | PASS | `ADOPT-04` evidence block (Initialize CodeGraph) |
  | `ADOPT-05` | PASS | `ADOPT-05` evidence block (Configure CodeGraph for Claude) |
  | `ADOPT-05B` | PASS (closed via alternative criterion, operator-ruled) | `ADOPT-05B` evidence block (Selected-Client Permissions) |
  | `ADOPT-06` | PASS | `ADOPT-06` evidence block (Adapt Technical Context) |
  | `ADOPT-07` | PASS | `ADOPT-07` evidence block (Configure OpenSpec) |
  | `ADOPT-08` | PASS | `ADOPT-08` evidence block (Verify OpenSpec Configuration) |
  | `ADOPT-09` | PASS | `ADOPT-09` evidence block (Inspect and Adapt Agents) |
  | `ADOPT-10` | PASS | `ADOPT-10` evidence block (Validate Agents) |
  | `ADOPT-11` | PASS (operator ruling on completeness criterion) | `ADOPT-11` evidence block (Inspect and Adapt Skills) |
  | `ADOPT-12` | PASS | `ADOPT-12` evidence block (Validate Skills) |
  | `ADOPT-13` | PASS | `ADOPT-13` evidence block (Create Selected-Client Adapters) |
  | `ADOPT-14` | PASS | `ADOPT-14` evidence block (Validate Adapter Files) |
  | `ADOPT-15` | PASS | `ADOPT-15` evidence block (Fresh-Session Runtime Discovery) |
  | `ADOPT-16` | PASS | `ADOPT-16` evidence block (Run the Project Baseline) |
  | `ADOPT-17` | PASS | `ADOPT-17` evidence block (Clean Local Checkpoint) |
  | `ADOPT-18` | PASS | `ADOPT-18` evidence block (De-bootstrap and Reconcile) |
  | `ADOPT-19` | PASS | `ADOPT-19` / Daily workflow pilot evidence block |

- Any row at FAIL, PENDING, or blank (must be NONE): **NONE** — all 20 rows confirmed PASS from
  their individual evidence blocks, cross-checked against the Step state table above (same status
  on both).
- Readiness verdict: **READY**.
- Approval: pull-request creation itself is a separate `[HUMAN APPROVAL REQUIRED]` gate this step
  does not self-grant — see below.
- Pull request created (identifier), if any: not yet requested — see below.
- Result: PASS

---

## `ADOPT-11` — Inspect and Adapt Skills

- Date: 2026-08-19
- Prompt used: the canonical consolidated prompt from `05-agents-and-skills.md` verbatim, executed
  by a delegated general-purpose subagent, explicitly instructed not to touch this run log — this
  session recorded evidence itself after independently reviewing the result.
- Skills inspected (all 10 under `ai-specs/skills/`): `adversarial-review`, `code-auditing` (+2
  reference files), `commit`, `enrich-us`, `explain`, `meta-prompt`, `specboot-verify`,
  `update-docs`, `using-git-worktrees`, `writing-skills` (+5 supporting files). Stack detected from
  files that actually exist: Java 11, Spring Boot 2.4.5, Maven (`mvnw`/`mvnw.cmd` present but
  `.mvn/wrapper/` broken, per `ADOPT-01`), JPA, Flyway, H2, no frontend, no Gradle, no
  linter/static-analysis Maven plugin declared (`grep -in "checkstyle\|spotbugs\|pmd\|jacoco"
  pom.xml` → no output).
- Assumptions found (and adapted): (1) `code-auditing/SKILL.md` and its two reference files
  assumed only JS/TS/Python/Go stacks, with no Java path — a Java repo would silently get no
  dead-code/baseline guidance; (2) `dead-code-methodology.md` unconditionally referenced
  `${CLAUDE_PLUGIN_ROOT}/scripts/dead-code-detect.sh`, confirmed genuinely absent anywhere in this
  repository (`find . -name "dead-code-detect.sh"` → no match) — a broken reference, not merely a
  stack gap; (3) `using-git-worktrees/SKILL.md` Steps 3-4 had no Java/Maven/Gradle path, so a fresh
  worktree here would get no compile/test baseline step.
- Skills preserved unchanged: `adversarial-review`, `commit`, `enrich-us`, `explain`,
  `meta-prompt`, `specboot-verify`, `update-docs`, `writing-skills` — already technology-agnostic
  (git/gh/OpenSpec-artifact/generic-reasoning operations, no embedded language assumptions).
- Skills adapted, all conditional on marker-file existence (`pom.xml`/`build.gradle`), never
  unconditionally assuming Java:
  - `code-auditing/SKILL.md`: Phase 0 generalized to check whatever build files actually exist;
    Dead Code Tools section gated JS tooling on presence, added a Java/Kotlin entry that explicitly
    forbids installing an undeclared plugin and defers to manual review instead.
  - `code-auditing/references/audit-methodology.md`: added conditional Java/Maven and Java/Gradle
    baseline-check commands, static-analysis commands explicitly commented "only if already
    declared" (matching this repo's actual absence of any).
  - `code-auditing/references/dead-code-methodology.md`: added a Java/Kotlin section (no zero-install
    tool exists; check for an already-declared plugin first, never add one); fixed the broken script
    reference by guarding it behind an existence/executable check with a documented fallback.
  - `using-git-worktrees/SKILL.md`: added Java(Maven)/Java(Gradle) blocks to Steps 3-4 and the
    Quick Reference table. **The delegated agent's own first draft used a `[ -x ./mvnw ]`
    conditional and self-caught it during validation** — this exact repository has an executable
    but non-functional `mvnw` (confirmed: `.mvn/wrapper/` missing), which would have made that
    conditional select a failing command; replaced with the same resilient `./mvnw ... 2>/dev/null
    || mvn ...` fallback pattern used in `audit-methodology.md`.
- **Independent verification by this session** (not merely trusting the subagent's self-report):
  `git status --short` confirms only the 4 files under `ai-specs/skills/` were touched (plus the
  run log, added by this session afterward) — `.specboot/`, `.claude/skills/openspec-*`, and every
  other path untouched. Re-ran the fixed compile fallback directly: `./mvnw -q -DskipTests compile`
  → fails with `ClassNotFoundException: org.apache.maven.wrapper.MavenWrapperMain` (confirms the
  wrapper genuinely is broken, matching the documented rationale for the fallback pattern);
  `mvn -q -DskipTests compile` → succeeds. Re-confirmed the `dead-code-detect.sh` reference is now
  guarded (`grep -n "dead-code-detect.sh"` shows it inside an `if [ -x ... ]` block, not bare).
  Re-ran `grep -in "checkstyle\|spotbugs\|pmd\|jacoco" pom.xml` → no output, confirming the "no
  linter declared" premise the adapted skills rely on.
- Files modified (all under `ai-specs/skills/`, matching this step's `Allowed modifications`
  exactly): `code-auditing/SKILL.md`, `code-auditing/references/audit-methodology.md`,
  `code-auditing/references/dead-code-methodology.md`, `using-git-worktrees/SKILL.md`.
- External web/GitHub/package-registry research: not performed (no authorization was in scope for
  this delegated task) — sections of `code-auditing` that would need it were left as documented,
  unexercised limitations rather than run or stripped out, per this step's own rule.
- **Mandatory-capability completeness check** — quoted verbatim from
  `ai-specs/specboot-instructions.md:183`: "There are **six required workflow capabilities**, in
  order: `enrich-us`, `propose`, `apply`, `specboot-verify`, `adversarial-review`, `archive`."
  Cross-checked against `ai-specs/skills/`:

  | Capability | Skill under `ai-specs/skills/`? | Literal result |
  |---|---|---|
  | `enrich-us` | `ai-specs/skills/enrich-us/SKILL.md` exists | PASS |
  | `propose` | none | **FAIL** (literal) |
  | `apply` | none | **FAIL** (literal) |
  | `specboot-verify` | `ai-specs/skills/specboot-verify/SKILL.md` exists | PASS |
  | `adversarial-review` | `ai-specs/skills/adversarial-review/SKILL.md` exists | PASS |
  | `archive` | none | **FAIL** (literal) |

  **This session identified a genuine tension between two parts of the canonical guide itself,
  not a defect in this repository's provisioning**, and stopped to present it rather than
  resolving it unilaterally: `ai-specs/specboot-instructions.md` (lines 180-193, imported at
  `ADOPT-03`, unmodified since) explicitly documents `propose`, `apply`, and `archive` as
  **intentionally** OpenSpec-CLI-generated, client-specific artifacts — `/opsx:propose`,
  `/opsx:apply`, `/opsx:archive` — never intended to exist as `ai-specs/skills/`-based canonical
  skills, by the guide's own stated design ("uses the commands the installed OpenSpec 1.7 CLI
  actually generates"). Confirmed present and functioning as such: `.claude/skills/openspec-propose/
  SKILL.md`, `.claude/skills/openspec-apply-change/SKILL.md`,
  `.claude/skills/openspec-archive-change/SKILL.md`, `.claude/commands/opsx/{propose,apply,
  archive}.md` — all confirmed present via `test -f`. This step's own validation text
  ("A mandatory capability with no corresponding skill anywhere under `ai-specs/skills/` is a step
  FAIL, never a silent pass") does not on its face account for a capability satisfied by design
  through a different, non-`ai-specs/skills/` mechanism.
  - **Operator ruling, requested and obtained live rather than self-decided**: presented this exact
    tension (literal-FAIL reading vs. the guide's own documented architecture) to the operator via
    `AskUserQuestion`. Operator (Landaone) explicitly ruled, 2026-08-19: treat `propose`/`apply`/
    `archive` as satisfied by design through the OpenSpec-CLI-generated, per-client artifacts
    confirmed above, per `specboot-instructions.md`'s own stated architecture. This is recorded as
    the operator's explicit ruling and reasoning, not a self-approval by the executing agent.
  - Per this step's own explicit prohibitions, no attempt was made to "fix" this by creating
    `ai-specs/skills/` copies of `propose`/`apply`/`archive` ("Do not copy client-generated skills
    into the canonical shared source," "Do not create client adapters in this step") — the ruling
    accepts the existing, by-design architecture rather than manufacturing conformance to the
    literal check.
- Blockers vs. optional improvements: no blockers remain after the operator ruling above. Optional,
  not made: no Java static-analysis tooling exists to wire into `code-auditing` (correctly deferred,
  not fabricated); `writing-skills/SKILL.md` references `superpowers:test-driven-development` and
  `superpowers:systematic-debugging` skill names not present anywhere in this repository — a
  meta-authoring cross-reference, not a stack-adaptation defect; noted as a limitation, not acted on.
- **Approval gate**: none beyond the edit being reviewable, per this step's own text — no external
  research was performed requiring authorization. The completeness-criterion tension above required
  and received a separate, explicit operator ruling as documented.
- Result: **PASS** — per the operator's explicit ruling on the completeness criterion; every other
  validation independently confirmed PASS by this session.

---

## `ADOPT-12` — Validate Skills

- Date: 2026-08-19 (same session, executed immediately after `ADOPT-11` per this guide's own
  documented executed-pair treatment — `05-agents-and-skills.md`: "Each adapt step is followed
  immediately by its read-only validation step; they are executed as a pair.")
- Commands run (read-only, as this step specifies), by this session directly:
  - `find ai-specs/skills -mindepth 1 -maxdepth 2 -type f -print` → 10 `SKILL.md` entry files
    confirmed (one per skill directory), plus the known supporting resource files under
    `code-auditing/references/` and `writing-skills/`.
  - `find ai-specs/skills -type l -print -exec readlink {} \;` → no symlinks found under
    `ai-specs/skills/` (expected — canonical skills are real files; symlinks belong to client
    discovery at `ADOPT-13`, not yet run).
  - `git diff -- ai-specs/skills` → confirms exactly the 4 files reported at `ADOPT-11`, no other
    path.
  - `grep -n "mandatory" ai-specs/specboot-instructions.md` → surfaces the six-required-capabilities
    line (line 183) and related mandatory-step language, cross-checked against the `ADOPT-11`
    completeness table above.
- **Validation, PASS criterion by criterion**:
  - Every canonical skill exists: PASS — all 10 `SKILL.md` files present.
  - Expected entry file exists: PASS — same evidence.
  - Supporting resources resolve: PASS — `references/audit-methodology.md`,
    `references/dead-code-methodology.md`, and `writing-skills/`'s supporting files all confirmed
    present via direct `test -f` in this session.
  - Stack-aware skills inspect repository configuration: PASS — the adapted commands branch on
    `pom.xml`/`build.gradle` existence, re-confirmed by this session's own re-execution of the
    fallback commands above.
  - Technology-specific commands are conditional: PASS — re-inspected all 4 diffs directly; every
    Java/Gradle block is gated behind existence checks, none unconditional.
  - No undeclared dependency is required: PASS — re-confirmed via this session's own
    `grep -in "checkstyle\|spotbugs\|pmd\|jacoco" pom.xml` (no output).
  - Client-generated OpenSpec skills not copied into canonical shared skills: PASS —
    `git status --short` shows `.claude/skills/openspec-*` untouched; no copy exists under
    `ai-specs/skills/`.
  - Shared skills suitable for selected clients: PASS — edits are plain bash conditionals, no
    client-specific syntax.
  - Every mandatory workflow capability has a corresponding skill present: **PASS on the operator's
    explicit ruling** recorded at `ADOPT-11` (3 of 6 literally absent under `ai-specs/skills/` but
    satisfied by design through OpenSpec-CLI-generated client artifacts, per
    `specboot-instructions.md`'s own architecture) — not re-litigated here; this step re-confirms
    the same underlying facts (capability list, skill inventory) rather than reopening the ruling.
- Result: PASS

---

## Improvement proposals

Raised after validated checkpoints. Never applied during the adoption run.

| # | Checkpoint | Target file | Proposal | Status |
|---|---|---|---|---|
| 1 | `ADOPT-11`/`ADOPT-12` | `05-agents-and-skills.md` (`ADOPT-11`'s validation text) | The completeness check ("every mandatory workflow capability named in `ai-specs/specboot-instructions.md` has a corresponding skill under `ai-specs/skills/`") conflicts with `ai-specs/specboot-instructions.md`'s own documented architecture, where 3 of 6 mandatory capabilities (`propose`, `apply`, `archive`) are intentionally OpenSpec-CLI-generated, client-specific artifacts rather than `ai-specs/skills/`-based canonical skills. This forced a live operator ruling this run that a future adoption would have to make again from scratch. Proposal: either (a) restate the completeness check as "available to every selected client, whether as an `ai-specs/skills/` canonical skill or an OpenSpec-CLI-generated client artifact — matching `specboot-verify`'s own stated scope of confirming availability" (`specboot-instructions.md` line 189 already frames it this way), or (b) explicitly name the propose/apply/archive exception inline in `ADOPT-11`'s own validation list so it does not read as an unqualified "never a silent pass." | proposed |

---

- Date: 2026-08-19
- Prompt used: the canonical consolidated prompt from `05-agents-and-skills.md` verbatim, executed
  by a delegated general-purpose subagent (this session's own subagent, not a separate
  orchestration — the executing session remained accountable for reviewing the result before
  checkpointing; see the independent verification note below).
- **Independent verification by this session** (not merely trusting the subagent's self-report):
  re-ran `python3 -c "import yaml; ..."` strict frontmatter parsing on all 4 agent files directly —
  all VALID; confirmed via `git diff` that the 3 pre-existing agents' diffs are representation-only
  (description text, `tools`/`model`/`color`, and body byte-identical, only the scalar style
  changed); re-ran the domain-leakage grep
  (`llandaeta|priceentity|pricemodel|pricecontroller|pricerepository|pricelist|brandid`) and the
  client-metadata grep (`^tools:|^model:|^color:|mcp__`) against `java-backend-developer.md`
  directly — both clean; confirmed via `git diff openspec/config.yaml` that only the
  Agent-selection paragraph changed, nothing else in `rules:`, `operations:`, or the rest of
  `context:`; read `java-backend-developer.md` in full — confirmed genuinely generic (no Spring/
  Maven/JPA-specific assumptions hard-coded, stack discovery instructed at task time).
- Repository evidence inspected: `pom.xml` (Spring Boot 2.4.5 parent, `<java.version>11</java.version>`,
  `spring-boot-starter-data-jpa`, `spring-boot-starter-web`, `flyway-core`, `h2`, `lombok`,
  `spring-boot-devtools`, `spring-boot-configuration-processor`); full `src/` tree (18 files:
  12 main + 4 test + `application.yaml` + `V1_create_tables.sql`) via `find src -type f`;
  `docs/` (7 files present: `api-spec.yml`, `backend-standards.md`, `base-standards.md`,
  `data-model.md`, `development_guide.md`, `documentation-standards.md`, `frontend-standards.md`);
  `openspec/config.yaml` (existing "Agent selection" paragraph, read in full); all 3 files under
  `ai-specs/agents/` (`backend-developer.md`, `frontend-developer.md`, `product-strategy-analyst.md`),
  read in full. CodeGraph used: `codegraph explore "list entry points"` → 49 symbols across 3 files,
  confirming the indexed Java/Spring source structure (`PriceModel.java`, `PriceEntity.java`,
  `PriceEntityModelConverter.java`) independently of the file-read evidence above.
- Detected stacks and work types: Java 11 / Spring Boot 2.4.5 / Maven backend (Spring Data JPA +
  Hibernate, Flyway migrations, H2, Lombok, JUnit 5), REST API, no frontend; plus
  technology-agnostic product/strategy work (already covered).
- **Strict YAML frontmatter validation, run before any adaptation** — command: a Python script per
  file extracting the `---...---` block and parsing it with `yaml.safe_load` (PyYAML, strict,
  `safe_load`, no custom loader):
  - `ai-specs/agents/backend-developer.md`: **INVALID** — `yaml.YAMLError: mapping values are not
    allowed here`, at the first embedded `Context:` inside the unquoted `description` scalar's
    `Examples:` block (column 654 of the folded line).
  - `ai-specs/agents/frontend-developer.md`: **INVALID** — same error class, at the first embedded
    `Context:` (column 528).
  - `ai-specs/agents/product-strategy-analyst.md`: **INVALID** — same error class, at the first
    embedded `Context:` (column 326).
  - Root cause in all three: an unquoted plain-scalar `description:` value containing `Context:`,
    `user:`, `assistant:` sequences, which YAML's plain-scalar grammar treats as an unterminated
    mapping-value indicator. This matches exactly the "invalid only because of unquoted
    YAML-sensitive text" condition this step's own text names as repairable-in-representation-only.
- **Representation-only repairs performed** (all three files): converted the single-line
  `description: <text>` entry to a literal block scalar with strip chomping —
  `description: |-` followed by the identical text, verbatim, indented two spaces on the next
  line. No other line in any of the three files was touched — confirmed by `git diff` (each diff
  shows exactly one changed line replaced by two lines; `name`, `tools`, `model`, `color`, and the
  entire body below the frontmatter are byte-identical to before). Post-repair re-validation with
  the same strict parser: all three files now **VALID**, and the parsed `description` value's
  length and head/tail text were spot-checked against the original raw text to confirm no
  character was added, removed, or reinterpreted (the literal block style, unlike double-quoted
  style, does not process `\n` as an escape, so the original literal backslash-n sequences in the
  source text are preserved unchanged, not converted into real newlines).
- Agents preserved, unchanged in content: `backend-developer.md` (TypeScript/DDD/Express/Prisma
  backend — not applicable to this Java repository; preserved per this step's explicit instruction
  not to reject a non-matching-stack agent, only representation-repaired) and
  `frontend-developer.md` (React frontend — this repository has no frontend; preserved,
  representation-repaired only). `product-strategy-analyst.md` (technology-agnostic product/
  strategy work — applies unchanged to this repository) — preserved, representation-repaired only,
  no scope change.
- Agent created: `ai-specs/agents/java-backend-developer.md`. Reason: no existing canonical agent
  covers Java/JVM backend implementation or review work — `backend-developer.md` is explicitly
  scoped to TypeScript/DDD/Express/Prisma (confirmed by direct read of its body); `frontend-developer.md`
  is explicitly scoped to React and this repository has no frontend; `product-strategy-analyst.md`
  is technology-agnostic and does not cover implementation work. Per this step's own text, creation
  is treated as conditional and optional — it was exercised here because the gap is real and
  concrete (Java/Spring Boot is this repository's entire implementation surface with zero existing
  coverage), not as a default action.
  - Frontmatter: `name` and `description` only — no `tools`, `model`, `color`, or MCP identifiers,
    matching this step's explicit "portable, client-neutral frontmatter only" requirement (the
    three pre-existing agents carry Claude-specific `tools`/`model`/`color` keys because they were
    imported that way from the canonical source at `ADOPT-03`, before this constraint was stated
    for newly created agents; they were left as-is, since only representation-only frontmatter
    repairs are in scope for pre-existing agents).
  - Strict YAML validation: `yaml.safe_load` on the extracted frontmatter block → VALID, keys
    `['name', 'description']` only.
  - Reusability: scoped to the Java/JVM technology family generically (Java or another JVM
    language, any framework, any build tool, any architectural style), not to Spring Boot, Maven,
    JPA, Flyway, or H2 specifically, and not to this repository's package name, entities, or
    domain. The body explicitly instructs discovering the actual framework/build tool/architecture
    from the target project's own documentation and code at task time, rather than assuming Spring
    or Maven.
  - Domain-neutrality check: `grep -inE
    "llandaeta|PriceEntity|PriceModel|PriceController|PriceService|PriceRepository|com\.llandaeta|prices\.rest|brandId|productId|priceList"
    ai-specs/agents/java-backend-developer.md` → no matches (exit 1). The file's three examples use
    generic phrasing ("the domain entity and its output model", "a new lookup method to the
    repository", "the build broke after updating a dependency") with no reference to this
    repository's actual entities, controllers, package names, or business domain.
  - Client-neutrality check: `grep -inE "^tools:|^model:|^color:|mcp__"
    ai-specs/agents/java-backend-developer.md` → no matches (exit 1).
  - Documentation references: the agent body references project documentation only generically
    ("most commonly a backend- or architecture-focused standards document alongside a base/process
    standards document ... typically under a `docs/` directory or equivalent, when present") — it
    does not hard-code a literal path, so there is no dangling-reference risk when reused in a
    different repository; in this repository specifically, `docs/base-standards.md` and
    `docs/backend-standards.md` (the documents the generic phrasing points at) were confirmed to
    exist by direct listing before this claim was recorded.
- OpenSpec selection updated: `openspec/config.yaml`'s "Agent selection" paragraph (inside
  `context:`) only. The obsolete paragraph ("No Java/Spring-specific implementation agent exists in
  this repository yet ... do not select `ai-specs/agents/backend-developer.md` for it") was
  **replaced**, not appended alongside, with a paragraph naming
  `ai-specs/agents/java-backend-developer.md` for backend implementation/review work, its creation
  rationale, and its stack-family scope. The `product-strategy-analyst.md` and (preserved,
  not-applicable) `backend-developer.md`/`frontend-developer.md` lines were left unchanged. `git
  diff -- openspec/config.yaml` confirms only that one paragraph changed — `rules:`, `operations:`,
  and every other part of `context:` (the documentation map, the stack description, the workflow-
  guidance and known-defects paragraphs) are byte-identical to before.
- Files modified: `ai-specs/agents/backend-developer.md` (frontmatter representation repair only),
  `ai-specs/agents/frontend-developer.md` (frontmatter representation repair only),
  `ai-specs/agents/product-strategy-analyst.md` (frontmatter representation repair only),
  `openspec/config.yaml` (Agent-selection paragraph only). Files created:
  `ai-specs/agents/java-backend-developer.md`. No client adapter directory (`.claude/agents/`,
  `.cursor/agents/`, or equivalent) was created or touched — confirmed no such directory exists
  under this repository (`find . -maxdepth 2 -iname "*agents*"` shows only `ai-specs/agents/`).
- Validation against this step's own validation list — see the `ADOPT-10` evidence block below for
  the independent, read-only re-check; all criteria PASS (detailed per-criterion results recorded
  there rather than duplicated here).
- **Approval gate**: creating a new agent is conditional/optional per this step's text, not gated
  by the `[HUMAN APPROVAL REQUIRED]` marker, which this step's text attaches specifically to
  "removing or replacing an existing agent." No existing agent was removed or replaced — all three
  pre-existing agents were preserved with only a representation-only frontmatter repair (content,
  metadata, and body byte-identical). This gate was therefore not reached; recorded per this step's
  own text rather than self-approved.
- Result: PASS

---

## `ADOPT-10` — Validate Agents

- Date: 2026-08-19
- Commands run (read-only, exactly as this step specifies):
  - `find ai-specs/agents -maxdepth 1 -type f -name '*.md' -print` → exit 0. Output: 4 files —
    `ai-specs/agents/java-backend-developer.md`, `ai-specs/agents/backend-developer.md`,
    `ai-specs/agents/product-strategy-analyst.md`, `ai-specs/agents/frontend-developer.md`.
  - `grep -R "ai-specs/agents" openspec 2>/dev/null` → exit 0. Output: 5 matching lines, all in
    `openspec/config.yaml`, one per agent reference (the section header plus the 4 agent-path
    lines: `java-backend-developer.md`, `product-strategy-analyst.md`, `backend-developer.md`,
    `frontend-developer.md`).
  - `git diff -- ai-specs/agents openspec/config.yaml openspec/config.yml 2>/dev/null` → exit 0.
    Output: the 4 tracked-file diffs (3 agents' frontmatter-only repairs, `openspec/config.yaml`'s
    single paragraph replacement) — `openspec/config.yml` does not exist in this repository (only
    `.yaml` is used), so it produced no diff, as expected. `java-backend-developer.md` does not
    appear in `git diff` because it is untracked (`??`), not modified — confirmed separately via
    `git status --short`.
- **Validation, PASS criterion by criterion**:
  - Selected agent exists under `ai-specs/agents/`: PASS — `java-backend-developer.md` present
    (confirmed by the `find` output above).
  - Frontmatter is valid: PASS — strict `yaml.safe_load` re-run against all 4 files in this step
    (not merely inherited from `ADOPT-09`): `backend-developer.md` VALID, `frontend-developer.md`
    VALID, `product-strategy-analyst.md` VALID, `java-backend-developer.md` VALID (keys
    `['name', 'description']`).
  - Description matches the intended technology family or work type: PASS —
    `java-backend-developer.md`'s description names Java/JVM backend implementation and review
    work with framework/build-tool/architecture resolved from the project, matching this
    repository's detected Java 11/Spring Boot/Maven stack without naming Spring or Maven as a hard
    requirement.
  - Unrelated agents remain present: PASS — `backend-developer.md` and `frontend-developer.md`
    both still present, byte-identical below the frontmatter line, per the `git diff` output above.
  - Project-specific details are not unnecessarily duplicated: PASS — `java-backend-developer.md`
    contains no repository-specific package name, entity, controller, or business-domain term
    (re-confirmed by re-running the domain-leakage grep from `ADOPT-09` in this step: no matches).
  - Referenced documentation exists: PASS — the agent references documentation only generically
    (no literal path named in the body); the generic categories it points at
    ("backend/architecture standards", "base/process standards") correspond to
    `docs/backend-standards.md` and `docs/base-standards.md`, both confirmed present via
    `ls docs/` in `ADOPT-09`.
  - OpenSpec selects an existing canonical agent: PASS — `openspec/config.yaml`'s Agent-selection
    paragraph names `ai-specs/agents/java-backend-developer.md`, which exists on disk (confirmed by
    the `find` output above) and passed every other criterion in this list.
  - Client adapters are not canonical sources: PASS — no client-adapter directory
    (`.claude/agents/`, `.cursor/agents/`, or equivalent) exists in this repository; the only
    agent-selection reference anywhere is in `openspec/config.yaml`, pointing at `ai-specs/agents/`
    (confirmed by the `grep -R "ai-specs/agents" openspec` output above showing zero references
    outside `openspec/config.yaml`, and separately confirming no `.claude/agents` directory exists
    in this repository).
- Result: PASS

---

## Checkpoint ledger

One row per checkpoint. A checkpoint is the smallest independently validated `ADOPT` step; a
group requires a **written structural justification** — "fewer commits" is not one.

| # | Step or group | Grouping justification (required if a group) | Validation | Evidence pointers | Allowlist match (YES / NO + anomalies) | Ready declared | Approval (who / when / what — or "auto: standing authorization") | Exact staged file list | Commit SHA | Remote-impact assessment + verdict | Push status | Improvement proposals raised |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `ADOPT-00` + `ADOPT-01` (grouped) | **Not a structural justification** (per `00-conventions.md`, honestly recorded rather than fabricated as structural): `ADOPT-00`'s own checkpoint was not committed immediately after it reached PASS during the original bootstrap session. By the time this gap was discovered (start of this fresh session, while executing `ADOPT-01`), `ADOPT-01`'s evidence — and the `ADOPT-15` fresh-session probe evidence — had already been appended to the same run-log file. Reconstructing a synthetic pre-`ADOPT-01` version of the run log to force two commits would stage content that was never the actual working state at any point in this session. True reason for grouping: operational recovery of a missed checkpoint, not structural inseparability. | `ADOPT-00` = PASS (recorded at bootstrap); `ADOPT-01` = PASS (this session, see evidence block above) | `ADOPT-00` evidence block above; `ADOPT-01` evidence block above; `ADOPT-15` fresh-session probe block above | YES — staged set `{.gitignore, .claude/CLAUDE.md, .specboot/adoption/ADOPTION-AUTHORIZATION.md, .specboot/adoption/ADOPTION-RUN-LOG.md, .specboot/adoption/BOOTSTRAP-MANIFEST.json}` is an exact subset of `ADOPT-00`'s declared mutation inventory (excluding the two machine-local/gitignored entries, which were correctly never staged) union `ADOPT-01`'s `none` plus the always-permitted run log. No anomalies. | YES | auto: standing authorization (`ADOPTION-AUTHORIZATION.md`, granted by Landaone, 2026-08-18 — commit-gate conditions met: allowlist subset confirmed, standing authorization on file) | `.claude/CLAUDE.md` (A), `.gitignore` (M), `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (A), `.specboot/adoption/ADOPTION-RUN-LOG.md` (A), `.specboot/adoption/BOOTSTRAP-MANIFEST.json` (A) | `0f81bdb` | No CI configuration found in the working tree (no `.github/workflows/`, `.gitlab-ci.yml`, or `Jenkinsfile` at the repo root or in the shared common-repo root `/Users/landaeta/repos/labs/app-prices-rest`); no local git hooks configured. GitHub-side branch protection, rulesets, and webhooks **not inspected** — that inspection is external GitHub research and requires explicit operator authorization under `00-conventions.md`, not yet granted. Branch `experiment/specboot-ai-adoption-v4` has no upstream tracking configured (never pushed). **Initial verdict: UNKNOWN**, resolved by operator-authorized read-only GitHub inspection (see below). Per `00-conventions.md` and the skill's non-negotiable #5, unknown remote impact blocks the push until resolved to a known state. **GitHub-side inspection** (operator explicitly authorized this external research, 2026-08-18): `gh api repos/Landaone/app-prices-rest/branches/experiment/specboot-ai-adoption-v4/protection` → 404 (branch not yet pushed, no protection to find); `gh api repos/Landaone/app-prices-rest/rulesets` → `[]` (none configured); `gh api repos/Landaone/app-prices-rest/hooks` → `[]` (no webhooks); `gh api repos/Landaone/app-prices-rest/actions/workflows` → `{"total_count":0,"workflows":[]}` (no Actions workflows). **Resolved verdict: NO REMOTE IMPACT** — no CI, no webhook, no ruleset, no branch protection on this repository; the push triggers no automation. | Operator explicitly authorized: (1) the GitHub-side inspection above, and (2) the push itself, given the resolved no-impact verdict (see interactive approval, 2026-08-18). Push performed: fast-forward, new branch ref `experiment/specboot-ai-adoption-v4` on `origin`, commit `0f81bdb`. **PUSHED.** | Proposed: the guide/skill should prompt an explicit checkpoint immediately after each step reaches PASS, before the next step's `Action` begins, to prevent evidence from a later step commingling with an unclosed earlier checkpoint in the same run-log file. |
| 2 | `ADOPT-02` + `ADOPT-03` (grouped) | **Not a structural justification**, honestly recorded per the same pattern as checkpoint 1: the executing agent proceeded directly from `ADOPT-02`'s `Action` into `ADOPT-03`'s `Action` without stopping to checkpoint `ADOPT-02` first, repeating the same process slip. The two steps' output paths are disjoint (`openspec/`, `.claude/commands/opsx/`, `.claude/skills/openspec-*/` for `ADOPT-02`; `docs/`, `ai-specs/` for `ADOPT-03`) and each independently satisfies its own PASS criteria — this was not structurally required. True reason for grouping: the same missed-checkpoint operational recovery as checkpoint 1, not inseparability. | `ADOPT-02` = PASS; `ADOPT-03` = PASS (see evidence blocks above) | `ADOPT-02` evidence block above; `ADOPT-03` evidence block above | YES — staged set is the exact union of `ADOPT-02`'s closed allowlist (`openspec/config.yaml`, `.claude/commands/opsx/*.md`, `.claude/skills/openspec-*/SKILL.md`) and `ADOPT-03`'s closed-rule allowlist (byte-for-byte mirror of source `docs/` and `ai-specs/`), plus the always-permitted run log. `git diff --cached --stat` confirms 44 files changed, all under those trees. No anomalies; no unexpected path. | YES | auto: standing authorization (`ADOPTION-AUTHORIZATION.md`) — allowlist subset confirmed | `.claude/commands/opsx/*.md` (6, A), `.claude/skills/openspec-*/SKILL.md` (6, A), `openspec/config.yaml` (A), `docs/*` (7, A), `ai-specs/*` (31, A — includes nested files below the guide's `-maxdepth 3` validation depth, still within the mirrored tree), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `b4c2da2` | Unchanged from the checkpoint-1 baseline: no CI, no webhook, no ruleset, no branch protection on `Landaone/app-prices-rest` (re-affirmed; nothing in this checkpoint touches remote-facing config). **Verdict: NO REMOTE IMPACT.** | Push approval requested live (the auto-mode safety classifier blocks automated `git push` regardless of standing authorization on file; operator explicitly confirmed via interactive prompt, 2026-08-18). **PUSHED** — fast-forward, `0f81bdb..b4c2da2`, `experiment/specboot-ai-adoption-v4 -> experiment/specboot-ai-adoption-v4` on `origin`. | Proposed: `ADOPTION-AUTHORIZATION.md`'s standing-authorization mechanism should note that the *executing harness's own* safety layer (independent of this guide) may still require a live confirmation per push regardless of standing authorization — the guide's auto-approval and the harness's own gate are two different mechanisms, and only the guide's is waivable by this file. |
| 3 | `ADOPT-04` (single step — no grouping) | N/A — single step, checkpointed immediately after reaching PASS, correcting the pattern from checkpoints 1–2. | `ADOPT-04` = PASS (see evidence block above) | `ADOPT-04` evidence block above | YES — staged set `{.codegraph/.gitignore, .specboot/adoption/ADOPTION-RUN-LOG.md}` is an exact subset of `ADOPT-04`'s closed allowlist (`.codegraph/` — only `.gitignore` ever trackable) plus the always-permitted run log. No anomalies. | YES | auto: standing authorization (`ADOPTION-AUTHORIZATION.md`) — allowlist subset confirmed | `.codegraph/.gitignore` (A), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `04bed96` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | Push approval: standing authorization (harness did not block this push). **PUSHED** — fast-forward, `b4c2da2..04bed96`, `origin/experiment/specboot-ai-adoption-v4`. | None. |
| 4 | `ADOPT-05` (single step — no grouping) | N/A — single step, checkpointed immediately. | `ADOPT-05` = PASS (see evidence block above) | `ADOPT-05` evidence block above; `ADOPTION-AUTHORIZATION.md` code-graph-privilege-scope section | YES — staged set `{.claude/CLAUDE.md (M), .claude/settings.json (A), .mcp.json (A), .specboot/adoption/ADOPTION-AUTHORIZATION.md (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-05`'s closed allowlist (`.mcp.json`; the Claude permission file `.claude/settings.json`; the additive `CODEGRAPH_START/END` block in `.claude/CLAUDE.md`; `ADOPTION-AUTHORIZATION.md` update-only) plus the always-permitted run log. No anomalies. | YES | **live** — operator explicitly directed the exact command (`codegraph install -y --target claude --location local --no-permissions`), citing `v1` precedent and accepting the documented trade-off; not an auto-approval (the invocation-form deviation from canonical explicit-flag-only, itself recorded in `ADOPTION-AUTHORIZATION.md`, meant this reached the live gate rather than auto-approving on form, even though the *resulting* scope/auto-allow choices independently matched the least-privilege criteria) | `.claude/CLAUDE.md` (M), `.claude/settings.json` (A), `.mcp.json` (A), `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `3ea53de` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `04bed96..3ea53de`, `origin/experiment/specboot-ai-adoption-v4`. | Proposed: `02-codegraph.md` could note that pty-driven automation of `codegraph install`'s explicit-flag form may be environment-fragile (this run: 4/4 attempts failed identically at the second sub-question), and that `-y` combined with explicit `--target`/`--location`/`--no-permissions` overrides is a viable, evidenced fallback whose only uncontrollable dimension is the CLI-on-PATH default — worth documenting as a recognized (not merely tolerated) fallback path alongside the pty-automation guidance. |
| 5 | `ADOPT-05B` Steps 1-4 (provisioning only — smoke test outstanding, step not yet PASS) | Not a full-step checkpoint by design: this step's own text mandates a stop-and-hand-off before the smoke test can be evidenced, so Steps 1-4's provisioning work is checkpointed now rather than left uncommitted while awaiting a fresh session. | Steps 1-4 individually validated (safety scan clean, JSON valid, merge matches baseline exactly per operator's approved scope); the step as a whole remains PENDING pending the smoke test. | `ADOPT-05B` evidence block above; `ADOPTION-AUTHORIZATION.md` environment-matrix section | YES — staged set `{.claude/settings.json (M), .specboot/adoption/ADOPTION-AUTHORIZATION.md (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-05B`'s closed allowlist (the Claude permission file; `ADOPTION-AUTHORIZATION.md` update-only) plus the always-permitted run log. No anomalies. | YES | **live** — operator was shown the exact baseline content, provenance, and the proposed `mvnw` broadening, and explicitly chose "baseline only, drop mvnw additions" (harness classifier also independently blocked the unapproved write until this approval) | `.claude/settings.json` (M), `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `60b624e` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `3ea53de..60b624e`, `origin/experiment/specboot-ai-adoption-v4`. | None beyond the mvnw-addition note already recorded in the `ADOPT-05B` evidence block (a future checkpoint may revisit if the wrapper is repaired). |
| 6 | `ADOPT-05B` closure (smoke-test alternative criterion; run-log-only change) | N/A — single-step closure, no file mutation beyond the run log itself. | `ADOPT-05B` = PASS (closed on the alternative criterion for Claude Code/macOS; Windows/Linux `PENDING EVIDENCE`) | `ADOPT-05B` evidence block above (negative-control result, alternative-criterion sub-criteria, operator ruling verbatim) | YES — staged set `{.specboot/adoption/ADOPTION-RUN-LOG.md (M)}` — the run log is always permitted; no other path touched. No anomalies. | YES | **live** — `[HUMAN APPROVAL REQUIRED]` to close on the alternative criterion, exercised: operator (Landaone) explicitly ruled and supplied the required reasoning (negative control's silent execution as the basis for `NOT APPLICABLE ON THIS CLIENT`), 2026-08-19 | `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `9ebcf0a` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `60b624e..9ebcf0a`, `origin/experiment/specboot-ai-adoption-v4`. | Residual note (operator-flagged, non-blocking): this client's silent execution of an off-allowlist negative control suggests a global permission override independent of `.claude/settings.json` may be in effect in this environment — worth investigating independently, since it would affect every future command here, not only this smoke test. Not resolved; carried forward as a limitation. |
| 7 | `ADOPT-06` (single step — no grouping) | N/A — single step, checkpointed immediately. | `ADOPT-06` = PASS (see evidence block above) | `ADOPT-06` evidence block above (delegated-agent report plus this session's independent spot-checks: 3 citations, contamination grep, YAML validation, git-diff scope) | YES — staged set `{docs/api-spec.yml (M), docs/backend-standards.md (M), docs/base-standards.md (M), docs/data-model.md (M), docs/development_guide.md (M), docs/documentation-standards.md (M), docs/frontend-standards.md (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-06`'s declared allowlist (`docs/` only) plus the always-permitted run log. No anomalies — confirmed no path outside `docs/` touched. | YES | **live** — operator shown the diff summary, independent verification results, and defect list; approved 2026-08-19 ("Approve (Recommended)") | `docs/api-spec.yml` (M), `docs/backend-standards.md` (M), `docs/base-standards.md` (M), `docs/data-model.md` (M), `docs/development_guide.md` (M), `docs/documentation-standards.md` (M), `docs/frontend-standards.md` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `25368b5` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `9ebcf0a..25368b5`, `origin/experiment/specboot-ai-adoption-v4`. | None. |
| 8 | `ADOPT-07` + `ADOPT-08` (grouped — guide-documented executed pair) | **Structural justification, per the guide's own text** (`04-context-and-openspec.md` header): "`ADOPT-07`'s adapt action is followed immediately by `ADOPT-08`'s read-only validation of the same configuration; per `00-conventions.md`'s checkpoint-grouping rule, this is a guide-documented executed pair eligible for one checkpoint... the same treatment `05-agents-and-skills.md` already states for `ADOPT-09`/`ADOPT-10` and `ADOPT-11`/`ADOPT-12`." This is the guide's own contract-recognized pairing (`00-conventions.md`'s third grounds: "this guide's own step contract makes them an executed pair"), not a convenience grouping by this run. | `ADOPT-07` = PASS (config written, all validations including falsifiable rules negative-control PASS); `ADOPT-08` = PASS (read-only re-verification, config confirmed byte-identical, zero corrections needed) | `ADOPT-07` and `ADOPT-08` evidence blocks above | YES — staged set `{openspec/config.yaml (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-07`'s closed allowlist (`openspec/config.yaml`, the only path that exists) — `ADOPT-08` is read-only and contributes no path of its own — plus the always-permitted run log. No anomalies; both scratch changes created during validation were removed before staging, confirmed absent. | YES | auto: standing authorization (`ADOPTION-AUTHORIZATION.md`) — allowlist subset confirmed; `ADOPT-07`'s own approval gate is "none beyond the edit itself being reviewable," and `ADOPT-08` carries no gate | `openspec/config.yaml` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `25634fa` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `25368b5..25634fa`, `origin/experiment/specboot-ai-adoption-v4`. | None. |
| 9 | `ADOPT-09` + `ADOPT-10` (grouped — guide-documented executed pair) | **Structural justification, per the guide's own text** (`05-agents-and-skills.md` header): "Each adapt step is followed immediately by its read-only validation step; they are executed as a pair." Guide-recognized pairing (`00-conventions.md`'s third grounds), not a convenience grouping. | `ADOPT-09` = PASS (3 agents frontmatter-repaired representation-only, 1 new agent created, config selection updated); `ADOPT-10` = PASS (read-only re-verification, all 8 criteria PASS) | `ADOPT-09`/`ADOPT-10` evidence blocks above, including this session's independent re-verification (strict YAML re-parse, representation-only diff confirmation, domain/client-neutrality re-grep, config-scope diff check) | YES — staged set `{ai-specs/agents/backend-developer.md (M), ai-specs/agents/frontend-developer.md (M), ai-specs/agents/product-strategy-analyst.md (M), ai-specs/agents/java-backend-developer.md (A), openspec/config.yaml (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-09`'s declared allowlist (`ai-specs/agents/`, limited to new-agent creation and representation-only repairs; agent-selection portion of `openspec/config.yaml`) plus the always-permitted run log. No anomalies. | YES | auto: standing authorization (`ADOPTION-AUTHORIZATION.md`) — allowlist subset confirmed; `[HUMAN APPROVAL REQUIRED]` for "removing or replacing an existing agent" was not reached since no existing agent was removed or replaced (all 3 preserved, representation-only) | `ai-specs/agents/backend-developer.md` (M), `ai-specs/agents/frontend-developer.md` (M), `ai-specs/agents/product-strategy-analyst.md` (M), `ai-specs/agents/java-backend-developer.md` (A), `openspec/config.yaml` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `019da24` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `25634fa..019da24`, `origin/experiment/specboot-ai-adoption-v4`. | None. |
| 10 | `ADOPT-11` + `ADOPT-12` (grouped — guide-documented executed pair) | **Structural justification, per the guide's own text** (`05-agents-and-skills.md` header, same clause covering `ADOPT-09`/`10` and `ADOPT-11`/`12`): "Each adapt step is followed immediately by its read-only validation step; they are executed as a pair." | `ADOPT-11` = PASS (4 skills adapted, 1 broken reference fixed, 1 self-caught defect corrected; completeness criterion PASS on explicit operator ruling); `ADOPT-12` = PASS (read-only re-verification, all 9 criteria PASS) | `ADOPT-11`/`ADOPT-12` evidence blocks above, including the operator's verbatim ruling and this session's independent re-verification (diff scope, fallback-command re-execution, guard confirmation, no-linter-declared re-check) | YES — staged set `{ai-specs/skills/code-auditing/SKILL.md (M), ai-specs/skills/code-auditing/references/audit-methodology.md (M), ai-specs/skills/code-auditing/references/dead-code-methodology.md (M), ai-specs/skills/using-git-worktrees/SKILL.md (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-11`'s declared allowlist (`ai-specs/skills/` only) plus the always-permitted run log. No anomalies. | YES | **live, on the completeness criterion specifically** — operator (Landaone) explicitly ruled via `AskUserQuestion`, 2026-08-19, that `propose`/`apply`/`archive` are satisfied by design through OpenSpec-CLI-generated client artifacts, per `specboot-instructions.md`'s own documented architecture; every other aspect of this checkpoint auto-qualifies under standing authorization (allowlist subset confirmed, no external research performed) | `ai-specs/skills/code-auditing/SKILL.md` (M), `ai-specs/skills/code-auditing/references/audit-methodology.md` (M), `ai-specs/skills/code-auditing/references/dead-code-methodology.md` (M), `ai-specs/skills/using-git-worktrees/SKILL.md` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `6775945` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `019da24..6775945`, `origin/experiment/specboot-ai-adoption-v4`. | See improvement proposal #1 above (guide's `ADOPT-11` completeness check conflicts with `specboot-instructions.md`'s own documented propose/apply/archive architecture). |
| 11 | `ADOPT-13` + `ADOPT-14` (grouped — guide-documented executed pair) | **Structural justification, per the guide's own text** (`06-adapters-and-discovery.md` header): "`ADOPT-13`'s adapt action is followed immediately by `ADOPT-14`'s read-only validation of the same adapters; ... this is a guide-documented executed pair eligible for one checkpoint." `ADOPT-15` explicitly excluded from this grouping per the same header note (fresh-session requirement). | `ADOPT-13` = PASS (12 symlinks created, exactly the already-validated agent/skill selection, gate auto-approved); `ADOPT-14` = PASS (read-only re-verification, zero broken links, all 7 criteria PASS) | `ADOPT-13`/`ADOPT-14` evidence blocks above | YES — staged set `{.claude/agents/java-backend-developer.md (A), .claude/agents/product-strategy-analyst.md (A), .claude/skills/adversarial-review (A), .claude/skills/code-auditing (A), .claude/skills/commit (A), .claude/skills/enrich-us (A), .claude/skills/explain (A), .claude/skills/meta-prompt (A), .claude/skills/specboot-verify (A), .claude/skills/update-docs (A), .claude/skills/using-git-worktrees (A), .claude/skills/writing-skills (A), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-13`'s closed rule (symlinks under the selected client's native agent/skill directories only, naming only already-validated agents/skills, never a real directory) plus the always-permitted run log. No anomalies — the pre-existing `specboot-adopt` symlink remains correctly git-ignored and outside this staged set. | YES | auto: the adapter plan exposed exactly the `ADOPT-09`–`ADOPT-12`-validated selection, per this step's own auto-approval text; also independently qualifies under standing authorization (allowlist subset confirmed) | `.claude/agents/java-backend-developer.md` (A), `.claude/agents/product-strategy-analyst.md` (A), 10 `.claude/skills/*` symlinks (A), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `7d24f22` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `6775945..7d24f22`, `origin/experiment/specboot-ai-adoption-v4`. | None. |
| 12 | `ADOPT-15` (single step — fresh-session evidence recording, run-log-only change) | N/A — single step, never grouped with `ADOPT-13`/`14` per the guide's own explicit text (fresh-session requirement is a structurally different kind of evidence). | `ADOPT-15` = PASS (fresh-session discovery report received, citations independently re-verified against actual source by this session) | `ADOPT-15` evidence block above | YES — staged set `{.specboot/adoption/ADOPTION-RUN-LOG.md (M)}` — the run log is always permitted; this step's own `Allowed modifications` is `none — read-only`. No anomalies. | YES | none required — read-only step per its own text; the operator's transmission of the fresh-session report was the evidence-recording act, not a mutation needing a gate | `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `1aed40a` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `7d24f22..1aed40a`, `origin/experiment/specboot-ai-adoption-v4`. | None. |
| 13 | `ADOPT-16` + `ADOPT-17` (`ADOPT-17` is the final checkpoint of the adoption itself, absorbing `ADOPT-16`'s not-yet-committed run-log delta) | Per `ADOPT-17`'s own text: "this step... covering the cumulative union of every prior step's own `Allowed modifications` for whatever those steps produced but a checkpoint has not yet committed." Since every step through `ADOPT-15` was already individually checkpointed, that union was only `ADOPT-16`'s run-log delta. | `ADOPT-16` = PASS (baseline: 8/8 tests, `openspec doctor` clean, CodeGraph current); `ADOPT-17` = PASS (staged-scope checklist clean, no correction needed) | `ADOPT-16`/`ADOPT-17` evidence blocks above | YES — staged set `{.specboot/adoption/ADOPTION-RUN-LOG.md (M)}` — the run log is always permitted; `ADOPT-16`'s own allowlist is `none by default`. No anomalies. | YES | auto: standing authorization (`ADOPTION-AUTHORIZATION.md`) — allowlist subset confirmed | `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `198928f` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `1aed40a..198928f`, `origin/experiment/specboot-ai-adoption-v4`. | None. |
| 14 | `ADOPT-18` (its own checkpoint, per the guide's own text — not grouped with `ADOPT-17`) | N/A — single step; the guide's own header explicitly states `ADOPT-18` "invokes the checkpoint protocol... exactly like any other independently validated step," distinct from `ADOPT-17`'s final-adoption checkpoint. | `ADOPT-18` = PASS (both manifest entries reached terminal disposition; `ADOPT-14` re-check PASS with zero broken links; no refusal reached; external source untouched) | `ADOPT-18` evidence block above, including the operator's approved deviation on `.claude/CLAUDE.md` | YES — staged set `{.claude/CLAUDE.md (M), .specboot/adoption/BOOTSTRAP-MANIFEST.json (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-18`'s closed rule (manifest-recorded entry paths only, plus the manifest and run log themselves) plus the always-permitted run log. No anomalies — the machine-local `specboot-adopt` symlink and `.specboot/local/` removals are correctly absent from this staged set (never git-tracked). | YES | **live** — `[HUMAN APPROVAL REQUIRED]` before any removal, exercised: the complete removal plan, including the `.claude/CLAUDE.md` tension and its proposed resolution, was presented via `AskUserQuestion` and approved by the operator, 2026-08-19 | `.claude/CLAUDE.md` (M), `.specboot/adoption/BOOTSTRAP-MANIFEST.json` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `cd2f2bc` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `198928f..cd2f2bc`, `origin/experiment/specboot-ai-adoption-v4`. | None. |
| 15 | `ADOPT-19` (its own checkpoint, per the guide's own text — orchestration/evidence-recording only) | N/A — single step; the guide's own header states "`ADOPT-19` is its own checkpoint, like every independently validated step." The pilot's actual code change was committed separately, locally, on `feature/fix-price-priority-tie-break-backend` (commit `8b7df7b`) — a different branch and a different checkpoint scope, not part of this adoption's own checkpoint chain. | `ADOPT-19` = PASS — all six required capabilities reached their required outcome on the human-named pilot task, evidenced by the pilot change's own artifacts (archived at `openspec/changes/archive/2026-08-19-fix-price-priority-tie-break/`) | `ADOPT-19` evidence block above (Daily workflow pilot block) | YES — staged set `{.specboot/adoption/ADOPTION-RUN-LOG.md (M)}` — the run log is always permitted; `ADOPT-19`'s own text says it "does not itself carry a separate write scope beyond" orchestration/evidence recording. No anomalies. | YES | **live** — this checkpoint's approval gate is "at the pilot change's own archive gate, per the normal daily workflow" (`ADOPT-19`'s own text) — that gate was exercised live: operator directed a post-review fix before granting explicit archive approval, 2026-08-19 | `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | `d68316e` | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | **PUSHED** — fast-forward, `cd2f2bc..d68316e`, `origin/experiment/specboot-ai-adoption-v4`. | None beyond the same-session-fallback adversarial-review caveat already recorded in the pilot evidence block above. |
| 16 | `ADOPT-20` (verification only) | N/A — single step; creates and modifies nothing per its own text. | `ADOPT-20` = PASS — 20/20 rows (`ADOPT-00`-`ADOPT-19`) confirmed PASS from their individual evidence blocks; readiness verdict READY | `ADOPT-20` evidence block above (per-step table with evidence pointers) | YES — staged set `{.specboot/adoption/ADOPTION-RUN-LOG.md (M)}` — the run log is always permitted; this step's own allowlist is `none`. No anomalies. | YES | none required — read-only verification step, no mutation | `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | *(filled after commit below)* | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | *(filled after push below)* | None. |
