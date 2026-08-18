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
| `ADOPT-05B` | `03-client-permissions.md` (**mandatory**) | PENDING — provisioning (Steps 1-4) complete; mandatory fresh-session smoke test outstanding, see evidence block | 2026-08-19 |
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
| Claude Code / macOS | yes | not yet run | PENDING EVIDENCE — fresh-session smoke test not yet performed |
| Claude Code / Linux | not available on this adoption's hardware | — | `PENDING EVIDENCE` |
| Claude Code / Windows | not available on this adoption's hardware | — | `PENDING EVIDENCE` |

- Result: **PENDING** — Steps 1-4 complete and PASS on their own criteria; the step as a whole
  cannot close until the fresh-session smoke test (or, for `NOT APPLICABLE ON THIS CLIENT`, the
  alternative criterion with live operator ruling) closes at least the macOS/Claude Code row.

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
| 5 | `ADOPT-05B` Steps 1-4 (provisioning only — smoke test outstanding, step not yet PASS) | Not a full-step checkpoint by design: this step's own text mandates a stop-and-hand-off before the smoke test can be evidenced, so Steps 1-4's provisioning work is checkpointed now rather than left uncommitted while awaiting a fresh session. | Steps 1-4 individually validated (safety scan clean, JSON valid, merge matches baseline exactly per operator's approved scope); the step as a whole remains PENDING pending the smoke test. | `ADOPT-05B` evidence block above; `ADOPTION-AUTHORIZATION.md` environment-matrix section | YES — staged set `{.claude/settings.json (M), .specboot/adoption/ADOPTION-AUTHORIZATION.md (M), .specboot/adoption/ADOPTION-RUN-LOG.md (M)}` is an exact subset of `ADOPT-05B`'s closed allowlist (the Claude permission file; `ADOPTION-AUTHORIZATION.md` update-only) plus the always-permitted run log. No anomalies. | YES | **live** — operator was shown the exact baseline content, provenance, and the proposed `mvnw` broadening, and explicitly chose "baseline only, drop mvnw additions" (harness classifier also independently blocked the unapproved write until this approval) | `.claude/settings.json` (M), `.specboot/adoption/ADOPTION-AUTHORIZATION.md` (M), `.specboot/adoption/ADOPTION-RUN-LOG.md` (M) | *(filled after commit below)* | Unchanged from baseline: no CI, no webhook, no ruleset, no branch protection. **Verdict: NO REMOTE IMPACT.** | *(filled after push below)* | None beyond the mvnw-addition note already recorded in the `ADOPT-05B` evidence block (a future checkpoint may revisit if the wrapper is repaired). |
