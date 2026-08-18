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
| 10 | `ADOPT-11` + `ADOPT-12` (grouped — guide-documented executed pair) | **Structural justification, per the guide's own text** (`05-agents-and-skills.md` header, same clause covering `ADOPT-09`/`10` and `ADOPT-11`/`12`): "Each adapt step is followed immediately by its read-only validation step; they are executed as a pair." | `ADOPT-11` = PASS (4 skills adapted, 1 broken reference fixed, 1 self-caught defect corrected; completeness criterion PASS on explicit operator ruling); `ADOPT-12` = PASS (read-only re-verification, all 9 criteria PASS) | `ADOPT-11`/`ADOPT-12` evidence blocks above, including the operator's verbatim ruling and this session's independent re-verification (diff scope, fallback-command re-execution, guard confirmation, no-linter-declared re-check) | YES — staged set `{ai-specs/skills/code-auditing/SKILL.md (M), ai-specs/skills/code-auditing/references/audit-methodology.md (M), ai-specs/skills/code-auditing/references/dead-code-methodology.md (M), ai-specs/skills/using-git-worktrees/SKILL.md (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-11`'s declared allowlist (`ai-specs/skills/` only) plus the always-permitted run log. No anomalies. | YES | **live, on the completeness criterion specifically** — operator (Landaone) explicitly ruled via `AskUserQuestion`, 2026-08-19, that `propose`/`apply`/`archive` are satisfied by design through OpenSpec-CLI-generated client artifacts, per `specboot-instructions.md`'s own documented architecture; every other aspect of this checkpoint auto-qualifies under standing authorization (allowlist subset confirmed, no external research performed) | `ai-specs/skills/code-auditing/SKILL.md` (M), `ai-specs/skills/code-auditing/references/audit-methodology.md` (M), `ai-specs/skills/code-auditing/references/dead-code-methodology.md` (M), `ai-specs/skills/using-git-worktrees/SKILL.md` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | *(filled after commit below)* | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | *(filled after push below)* | See improvement proposal #1 above (guide's `ADOPT-11` completeness check conflicts with `specboot-instructions.md`'s own documented propose/apply/archive architecture). |
