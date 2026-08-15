# SpecBoot Adoption Run Log

Read `00-conventions.md` from the verified canonical source (resolve its path per
`.specboot/local/` or by asking the operator — never hardcode it here) for the evidence
discipline that governs every field below.

---

## Run identification

```text
Repository:                                 app-prices-rest-specboot-ai-adoption-v1
Adoption date:                               2026-08-15
Operator:                                    luis.landaeta@gmail.com
Client(s) selected:                          Claude
CodeGraph adopted (yes / no):                (not yet reached — ADOPT-04/05)
Reason if not adopted:                       n/a
Guide revision used:                         checksum-identified — see Source and delivery mode below
```

---

## Source and delivery mode

```text
Delivery mode:                              source-linked
Guide checksum   (SPECBOOT_ADOPTION_GUIDE.md): 2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0
Skill checksum   (ai-specs/skills/specboot-adopt/SKILL.md): 2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3
Git worktree state:                         clean
Git status:                                 recorded
Source Git commit:                          9f08281dae42eb65d0a349c1876e6b584fe6e791
Git unavailable — reason:                   n/a
Observed HEAD (dirty worktree only):        n/a
Local source path resolution:               The local canonical source path is resolved per machine
                                            and is not recorded here.
Source treated as read-only for the whole adoption (YES / NO): YES
```

### Drift check at each resume

| Resumed at (date/time) | Local path obtained from (machine-local store / operator / rediscovery) | Guide checksum matches | Skill checksum matches | Commit matches | Verdict | Reconciliation decision |
|---|---|---|---|---|---|---|
| 2026-08-15 (fresh session, post-provisioning) | machine-local store — `.specboot/local/canonical-source-path` (resolved value intentionally not recorded here; see `00-conventions.md` / `09-bootstrap.md` on portable-identity-only evidence) | YES — `shasum -a 256 SPECBOOT_ADOPTION_GUIDE.md` = `2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0` | YES — `shasum -a 256 ai-specs/skills/specboot-adopt/SKILL.md` = `2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3` | YES — `git rev-parse HEAD` = `9f08281dae42eb65d0a349c1876e6b584fe6e791`, worktree clean (`git status --porcelain` empty) | NO DRIFT | none needed — proceed |

---

## Client selection

```text
Route used (manual / autodiscovery):        autodiscovery
```

| Client | Displayed as a candidate by autodiscovery | Explicitly SELECTED by the human | Recorded status |
|---|---|---|---|
| Claude | NO (probe: not found — no .claude/, no .claude/skills/, no .claude/settings.json, no CLAUDE.md) | YES | SELECTED |
| Kiro | NO (probe: not found — no .kiro/, no .kiro/skills/, no .kiro/settings/) | NO | NOT SELECTED |
| Codex | NO (probe: not found — no .agents/, no .agents/skills/, no AGENTS.md, no codex.md) | NO | NOT SELECTED |

Where autodiscovery ran: confirm the repository tree was byte-for-byte unchanged when the findings
were displayed (the probe writes nothing): YES

Where autodiscovery found nothing: confirm that was treated as a finding and the operator was still
asked, rather than the run proceeding with no client: YES

### Two axes, never collapsed

| Client | This adoption | Recipe status | Effect on this run |
|---|---|---|---|
| Claude | SELECTED | this run's own discovery-and-execution gate: PASS (fresh-session native discovery confirmed 2026-08-15) | satisfied |
| Kiro | NOT SELECTED | | none |
| Codex | NOT SELECTED | **`PENDING EVIDENCE`** — gate parts 1–2 complete; part 3, the fresh-session discovery-and-execution test, not observed | none when NOT SELECTED |

---

## Step state — resume checklist

| Step | File | Status (PENDING / PASS / FAIL / SKIPPED) | Date |
|---|---|---|---|
| `ADOPT-00` | `09-bootstrap.md` | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-01` | `01-prerequisites-and-install.md` | PASS — no repo-local writes, no checkpoint needed | 2026-08-15 |
| `ADOPT-02` | `01-prerequisites-and-install.md` | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-03` | `01-prerequisites-and-install.md` | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-04` | `02-codegraph.md` (**mandatory**) | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-05` | `02-codegraph.md` (**mandatory**) | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-05B` | `03-client-permissions.md` (**mandatory**) | PASS — checkpoint committed and pushed (smoke-test rows correctly PENDING EVIDENCE, not blocking) | 2026-08-15 |
| `ADOPT-06` | `04-context-and-openspec.md` | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-07` | `04-context-and-openspec.md` | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-08` | `04-context-and-openspec.md` | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-09` | `05-agents-and-skills.md` | PASS — checkpoint committed and pushed (grouped with ADOPT-10) | 2026-08-15 |
| `ADOPT-10` | `05-agents-and-skills.md` | PASS — checkpoint committed and pushed (grouped with ADOPT-09) | 2026-08-15 |
| `ADOPT-11` | `05-agents-and-skills.md` | PASS — checkpoint committed and pushed (grouped with ADOPT-12) | 2026-08-15 |
| `ADOPT-12` | `05-agents-and-skills.md` | PASS — checkpoint committed and pushed (grouped with ADOPT-11) | 2026-08-15 |
| `ADOPT-13` | `06-adapters-and-discovery.md` | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-14` | `06-adapters-and-discovery.md` | PASS — checkpoint committed and pushed | 2026-08-15 |
| `ADOPT-15` | `06-adapters-and-discovery.md` (once per client) | PASS — genuinely fresh session's turn-1 transcript ran the canonical prompt verbatim with zero adoption-process framing; see evidence block | 2026-08-15 |
| `ADOPT-16` | `07-baseline-and-checkpoint.md` | PASS — `mvn clean test` exit 0, 8/8 tests passing, `openspec doctor` ok, CodeGraph current | 2026-08-15 |
| `ADOPT-17` | `07-baseline-and-checkpoint.md` | PENDING | |
| `ADOPT-18` | `10-debootstrap.md` | PENDING | |
| `ADOPT-19` | `11-e2e-pilot-and-pr-gate.md` | PENDING | |
| `ADOPT-20` | `11-e2e-pilot-and-pr-gate.md` | PENDING | |

---

## Evidence blocks

### `ADOPT-00` — Bootstrap Client Discovery

- Repository had SpecBoot files / AI configuration before this step: NO
- **Cold-start state confirmed** (no SpecBoot files, no OpenSpec, no `/opsx:*` commands, no
  discoverable `specboot-adopt` skill, no `.specboot/`): YES — verified by direct filesystem probe
  of `.specboot`, `CLAUDE.md`, `AGENTS.md`, `.claude`, `.kiro`, `ai-specs`, `openspec`, `.codex`,
  `.cursor`, `.windsurf`, all absent
- **Canonical source supplied** (runtime input; checksums and Git disposition recorded in the
  *Source and delivery mode* block above): SUPPLIED
- **Three-artifact validation, run before any orchestration load and before the first write:**
  - `SPECBOOT_ADOPTION_GUIDE.md` present: YES
  - `specboot-adoption/` present: YES
  - `ai-specs/skills/specboot-adopt/SKILL.md` present **and readable as a file**: YES
  - Verdict: VALID
  - If REJECTED, target repository left byte-for-byte unchanged (zero writes): n/a — not rejected
- **Refusals reached** (each must leave the target repository byte-for-byte unchanged):
  - No canonical source supplied: NONE
  - Supplied source failed the three-artifact validation: NONE
  - No client selected: NONE
  - Selected client has no recipe: NONE
  - Selected client cannot discover the external skill without symlinks: NONE
  - For every REFUSED row above: n/a — no refusal reached
- **Orchestration procedure obtained by a source-relative direct read of `SKILL.md`** (a direct
  read, **not** native skill discovery): YES — path read (source-relative):
  `ai-specs/skills/specboot-adopt/SKILL.md`
- **Client-selection route** (record the detail in the *Client selection* block above): autodiscovery
- Selected client(s): Claude
- Every other supported client recorded `NOT SELECTED`: YES — Kiro, Codex
- OS / shell: Darwin 22.6.0 (x86_64) / zsh
- Symlink probe result (capability-detected, not assumed): SUPPORTED — `ln -s . .specboot-symlink-probe && rm .specboot-symlink-probe` succeeded, exit 0, no trace left (confirmed with `test -e` and `git status --porcelain`)
- Pre-existing artifacts detected, and their disposition: NONE detected; every target path (`.claude/`, `.claude/skills/`, `.claude/skills/specboot-adopt`, `.claude/CLAUDE.md`, `.specboot/`, `.specboot/adoption/`, `.specboot/local/`, `.specboot/bootstrap/`) classified `absent` at preflight
- Manifest entry count: 2
- **Preflight, run before the first write:**
  - Paths resolved and their classification: `.claude/skills/specboot-adopt` absent; `.claude/CLAUDE.md` absent; `.specboot/adoption/BOOTSTRAP-MANIFEST.json` absent; `.specboot/adoption/ADOPTION-RUN-LOG.md` absent; `.specboot/local/` absent; `.gitignore` pre-existing-untouched (to be modified by append); `.git/info/exclude` absent (to be modified)
  - Collisions detected: NONE
- **Exact mutation inventory presented at the approval gate:**
  `.claude/skills/specboot-adopt` (create, symlink to external absolute path, reversible);
  `.claude/CLAUDE.md` (create, real file with delimited block, reversible);
  `.specboot/adoption/BOOTSTRAP-MANIFEST.json` (create, durable);
  `.specboot/adoption/ADOPTION-RUN-LOG.md` (create, durable);
  `.specboot/local/canonical-source-path` (create, machine-local, git-ignored, reversible);
  `.gitignore` (modify — append `.specboot/bootstrap/` and `.specboot/local/`, reversible);
  `.git/info/exclude` (modify — add `.claude/skills/specboot-adopt`, reversible, never committed)
- **Provisioning performed exactly that inventory and nothing outside it:** YES
- **Provisioning failure, if any:** N/A
- **Obligations recorded** — payload: `SKIPPED — source-linked mode`; container: `SKIPPED — source-linked mode`
- `.specboot/bootstrap/` never created at any point: YES
- No copied guide, phase file, or skill body anywhere in the project: YES
- Discovery entries point at the external canonical source, and none was staged for any checkpoint: YES — nothing staged or committed this session
- Machine-local `.specboot/local/` store holds the resolved path and nothing else, and
  `git check-ignore` reports it ignored: YES (see verdict below)
- Client-selection record carries no placeholder: YES
- **Session stopped after provisioning and generated the fresh-session handoff prompt:** YES — see handoff prompt delivered to the operator at the end of this session
- **No OpenSpec or `/opsx:*` command used before `ADOPT-02` completed:** YES
- `git check-ignore .specboot/bootstrap/…` verdict: IGNORED
- `git check-ignore .specboot/local/…` verdict: IGNORED
- `git check-ignore .specboot/adoption/…` verdict: NOT ignored
- No bare `.specboot/` rule written: YES
- Fresh-session discovery probe — exact prompt used: operator's session-opening message in the new
  session, verbatim in relevant part: "Resume the SpecBoot adoption already bootstrapped in this
  repository. Do NOT re-run the bootstrap entry prompt or re-ask any question already answered —
  this is a resume, not a restart. 1. Attempt native skill discovery: invoke the `specboot-adopt`
  skill by name. This is the first point at which it could be discoverable at all — record exactly
  how it was surfaced (or wasn't) as the discovery-and-execution evidence for `ADOPT-00`. [steps
  2–5: read run log/manifest, resolve source via `.specboot/local/`, recompute checksums and
  compare, record result and continue]" — no path to the skill or guide was supplied by the
  operator anywhere in this prompt.
- Fresh-session outcome, verbatim: the harness's own system-reminder listing of available skills
  (generated by the client, not supplied by the operator or by this agent) included the row:
  "specboot-adopt: Use when adopting SpecBoot into a repository, resuming an interrupted adoption
  from a filled run log, bootstrapping a repository with no SpecBoot files and no AI client
  configuration, or de-bootstrapping or checkpointing an adoption." Invoking the `Skill` tool with
  `skill: "specboot-adopt"` (name only, no path) returned "Launching skill: specboot-adopt"
  followed by a "Base directory for this skill" line reporting the project-local path
  `.claude/skills/specboot-adopt` (its resolved absolute value is machine-local runtime state and
  intentionally not recorded here), followed by the full body of that directory's `SKILL.md` (the
  "SpecBoot Adopt" orchestration procedure, `## Overview` through `## Common Mistakes`). The base
  directory is the bootstrap-created symlink target (`.claude/skills/specboot-adopt` → external
  canonical `ai-specs/skills/specboot-adopt`), confirming native resolution through the symlink
  rather than a manually supplied path.
- Fresh session resumed from the durable manifest and run log, with source identity verified: YES —
  `.specboot/adoption/ADOPTION-RUN-LOG.md` and `BOOTSTRAP-MANIFEST.json` read first; canonical
  source path obtained solely from `.specboot/local/canonical-source-path` (its resolved value is
  machine-local runtime state and is intentionally omitted from this committed record); recomputed
  checksums
  (`shasum -a 256 SPECBOOT_ADOPTION_GUIDE.md` = `2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0`,
  `shasum -a 256 ai-specs/skills/specboot-adopt/SKILL.md` = `2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3`)
  and `git rev-parse HEAD` (`9f08281dae42eb65d0a349c1876e6b584fe6e791`, worktree clean) all matched
  the manifest exactly — see the drift-check row above. Verdict: NO DRIFT.
- Approval (who, when, exactly what was approved): luis.landaeta@gmail.com, 2026-08-15, the exact
  7-path mutation inventory listed above, approved via explicit confirmation before any write
- Result: PASS — provisioning (steps 1–8) and the fresh-session discovery-and-execution validation
  (step 9) both complete; checkpoint committed (`afbfce4d18dde8d0810dba2d3c07bbc9bf1b91c7`) and
  pushed to `origin/experiment/specboot-ai-adoption-v1` (new branch) — see checkpoint ledger

---

### `ADOPT-01` — Install Prerequisites

```text
Date: 2026-08-15
Machine: Darwin 22.6.0 (x86_64) / zsh
Node: v24.18.0 (`node --version`) — meets >= 20.19.0
npm: 11.16.0 (`npm --version`)
OpenSpec: 1.7.0 (`openspec --version`) — already installed, matches reference experiment version
CodeGraph: 1.5.0 (`codegraph --version`) — already installed, matches reference experiment version
Git: 2.39.2 (Apple Git-143) (`git --version`)
Project runtime: Java 11 — `openjdk version "11.0.31"` (Corretto), matches `<java.version>11</java.version>` in pom.xml
Project build tool: Maven — identified from `pom.xml` (Spring Boot 2.4.5 parent) at repo root; system `mvn` = Apache Maven 3.9.16 (resolved via `which mvn` from an sdkman-managed install; machine-local install path intentionally not recorded here), matches reference experiment version exactly. NOTE: the repo's own `./mvnw` wrapper is broken — `.mvn/wrapper/maven-wrapper.properties` and `maven-wrapper.jar` are absent from the git tree (confirmed via `git ls-tree -r HEAD --name-only | grep -i mvn` = empty), so `./mvnw --version` fails with `ClassNotFoundException: org.apache.maven.wrapper.MavenWrapperMain`. This is a pre-existing repository gap, out of this step's scope to fix (ADOPT-01 only inspects/verifies prerequisites); ADOPT-16's baseline will use the system `mvn` instead of `./mvnw`.
Result: PASS
Notes: No installation or upgrade performed — every tool was already present at or above the required version, so the ADOPT-01 approval gate ("before installing or upgrading software") did not trigger.
```


### `ADOPT-02` — Install and Initialize OpenSpec with Explicitly Selected Clients

```text
OpenSpec version: 1.7.0 (global upgrade to registry-latest 1.9.0 offered and explicitly declined
  by the operator — see decision record; 1.7.0 already meets the guide's documented requirement
  and matches the reference-experiment version, so `npm install -g @fission-ai/openspec@latest`
  was not run)
Command: `openspec init --tools claude --no-animation` (run from repository root; `--tools claude`
  used for non-interactive, explicit, single-client selection instead of the interactive flow, per
  ADOPT-00's client-selection record — Claude is the only SELECTED client)
Clients offered (per `openspec init --help`'s `--tools` option): amazon-q, antigravity, auggie,
  bob, claude, cline, codeartsagent, codex, devin, forgecode, codebuddy, continue, costrict, crush,
  cursor, factory, gemini, github-copilot, hermes, iflow, junie, kilocode, kimi, kiro, lingma,
  vibe, oh-my-pi, opencode, pi, qoder, qwen, roocode, trae, zcode (windsurf accepted as alias for
  devin)
Clients selected: claude (only — matches ADOPT-00's SELECTED client exactly)
Generated config path: `openspec/config.yaml` (schema: spec-driven)
Generated client resources: `.claude/skills/openspec-apply-change/SKILL.md`,
  `.claude/skills/openspec-archive-change/SKILL.md`, `.claude/skills/openspec-explore/SKILL.md`,
  `.claude/skills/openspec-propose/SKILL.md`, `.claude/skills/openspec-sync-specs/SKILL.md`,
  `.claude/skills/openspec-update-change/SKILL.md` (6 skills); `.claude/commands/opsx/apply.md`,
  `.claude/commands/opsx/archive.md`, `.claude/commands/opsx/explore.md`,
  `.claude/commands/opsx/propose.md`, `.claude/commands/opsx/sync.md`,
  `.claude/commands/opsx/update.md` (6 commands); `openspec/specs/`, `openspec/changes/`,
  `openspec/changes/archive/` (empty directories, not tracked by git until populated). Confirmed
  no resources were added for any unselected client.
Per-client provisioning provenance (installer-provisioned vs. separately configured): all 6
  `.claude/skills/openspec-*` entries and all 6 `.claude/commands/opsx/*.md` entries were
  installer-provisioned by this step's `openspec init --tools claude` command — confirmed by their
  absence before the command ran and presence immediately after, in the same working-tree scan.
  `.claude/skills/specboot-adopt` (the bootstrap-provisioned discovery symlink from `ADOPT-00`) is
  a separate, pre-existing entry, untouched by this step, and remains excluded from git via
  `.git/info/exclude` — confirmed with `git add -n .claude/skills`, which lists only the 6
  `openspec-*/SKILL.md` files and not `specboot-adopt`.
openspec doctor result: exit 0 — "OpenSpec root: ok" at the repository root; "References: (none
  declared)" (expected — `ADOPT-07` configures references to `docs/` and `ai-specs/`, not yet
  reached)
Git changes (`git status --porcelain=v1 --untracked-files=all`, excluding the pre-existing run-log
  modification): `?? .claude/commands/opsx/apply.md`, `?? .claude/commands/opsx/archive.md`,
  `?? .claude/commands/opsx/explore.md`, `?? .claude/commands/opsx/propose.md`,
  `?? .claude/commands/opsx/sync.md`, `?? .claude/commands/opsx/update.md`,
  `?? .claude/skills/openspec-apply-change/SKILL.md`,
  `?? .claude/skills/openspec-archive-change/SKILL.md`, `?? .claude/skills/openspec-explore/SKILL.md`,
  `?? .claude/skills/openspec-propose/SKILL.md`, `?? .claude/skills/openspec-sync-specs/SKILL.md`,
  `?? .claude/skills/openspec-update-change/SKILL.md`, `?? openspec/config.yaml`. No other paths
  changed; `.claude/skills/specboot-adopt` does not appear (excluded, as designed).
Result: PASS
```


### `ADOPT-03` — Import SpecBoot

```text
Source: `packages/specboot/template/` inside the canonical SpecBoot source repository, pinned at
  commit `9f08281dae42eb65d0a349c1876e6b584fe6e791` — confirmed as the true `<SPECBOOT_SOURCE>` by
  reading `packages/specboot/bin/init.js`'s `TEMPLATE_DIR = path.join(__dirname, '..', 'template')`
  constant and its `copyRecursive(TEMPLATE_DIR, target)` call (via `git show`, no working-tree
  checkout). The source repository is itself a sparse checkout (only
  `SPECBOOT_ADOPTION_GUIDE.md`, `specboot-adoption/`, `ai-specs/skills/specboot-adopt/` are
  materialized on disk, per `git sparse-checkout list`), so the `docs/` and `ai-specs/` subtrees
  needed here were not present in the source working tree. To read them without ever writing to
  the read-only source, they were extracted with `git -C <source> archive
  9f08281dae42eb65d0a349c1876e6b584fe6e791 packages/specboot/template | tar -x -C <scratch>` into
  a scratch directory outside the source repository; the source's own working tree and
  sparse-checkout state were never touched, confirmed by `git -C <source> status --porcelain`
  reporting clean immediately after extraction and again after the copy below.
Target: repository root (`/`, i.e. this project's checkout root)
Exact command: `cp -rn <scratch>/packages/specboot/template/* .` (functionally identical to the
  documented `cp -rn <SPECBOOT_SOURCE>/* <TARGET_REPOSITORY>/`, run against the scratch
  extraction of the pinned source tree rather than the source's own, incompletely-materialized
  working directory); then 4 `ln -s docs/base-standards.md <name>` calls, each preceded by an
  existence check (skip if present) per the step's documented symlink behavior.
Files added: 28 total — `docs/` (7: `api-spec.yml`, `backend-standards.md`, `base-standards.md`,
  `data-model.md`, `development_guide.md`, `documentation-standards.md`, `frontend-standards.md`)
  and `ai-specs/` (21: 3 under `agents/`, 1 under `scripts/`, 16 under `skills/` across
  `code-auditing/`, `commit/`, `enrich-us/`, `explain/`, `meta-prompt/`, `update-docs/`,
  `using-git-worktrees/`, `writing-skills/`, plus `ai-specs/specboot-instructions.md`). Count
  independently verified against the pinned source commit with `git ls-tree -r --name-only
  9f08281d... -- packages/specboot/template/docs packages/specboot/template/ai-specs` = 28, and
  against the target working tree with `find docs ai-specs -type f | wc -l` = 28. A first-draft
  approval-gate presentation miscounted `ai-specs/` as 15 (arithmetic error over an already-correct
  file listing); caught by the operator before any write, recorded as correction `ADOPT-03/1` below,
  and the gate was re-presented with the corrected 7 + 21 = 28 total before proceeding.
Files skipped because they existed: none — `docs/`, `ai-specs/`, and all four root instruction
  paths were confirmed absent from the target before the copy (`for f in docs ai-specs AGENTS.md
  CLAUDE.md GEMINI.md codex.md; do [ -e "$f" ] ...`, all reported absent)
Hidden directories expected but not copied: `packages/specboot/template/.cursor/`
  (`rules/use-base-rules.mdc`, 1 file) — expected and correct: the unquoted `*` glob in `cp -rn
  <SPECBOOT_SOURCE>/* <TARGET_REPOSITORY>/` does not expand dotfiles/dot-directories, matching this
  step's documented behavior ("`*` does not copy hidden directories"); Cursor was not selected as a
  client in `ADOPT-00` in any case, so this is doubly expected.
Root instruction symlinks resolve to docs/base-standards.md: YES — `readlink AGENTS.md`,
  `readlink CLAUDE.md`, `readlink GEMINI.md`, `readlink codex.md` each printed exactly
  `docs/base-standards.md`; all four created fresh (none pre-existed, so none needed the
  real-file-to-symlink recovery path)
Per-client provisioning provenance (installer-provisioned vs. separately configured): separately
  configured — this step ran the documented `cp -rn` / `ln -s` procedure directly (an AI-agent
  orchestrated execution of the adoption guide's structured written procedure), not the packaged
  `lidr-specboot` npm CLI installer (`packages/specboot/bin/init.js`) end-to-end. The baseline
  content (`docs/`, `ai-specs/`, root symlinks) is client-agnostic and not itself attributable to
  any single selected client; `ADOPT-13` is where client-specific adapter provenance is recorded.
Result: PASS
```


### `ADOPT-04` — Initialize CodeGraph

```text
CodeGraph version: 1.5.0 (`codegraph --version`; already installed and verified in `ADOPT-01`,
  matches the reference-experiment version — no new install performed, so the "before software
  installation" approval gate did not trigger)
Command: `codegraph init` (from repository root)
Files indexed: 22
Nodes: 295
Edges: 355
Duration: 659ms (`time codegraph init` measured 1.559s total wall time including process
  startup/shutdown overhead; the tool's own reported indexing duration is 659ms)
Exploration query: `codegraph explore "list entry points"` — returned a structured, non-empty
  result: 49 symbols across 3 files, including blast-radius/caller data (e.g. `getPriceList` in
  `PriceModel.java` and `PriceEntity.java`, with caller/test-coverage annotations) and verbatim
  source excerpts for `PriceModel.java`, `PriceEntity.java`, `PriceEntityModelConverter.java`.
  Confirms the index is queryable, not merely present.
`.codegraph/` disposition: contains `codegraph.db` (the index, 844K total directory size) and its
  own `.gitignore` (provisioned by CodeGraph itself: `*` then `!.gitignore`, so only
  `.codegraph/.gitignore` is ever trackable and `codegraph.db` — the version-dependent internal
  data — is never committed). Verified with `git check-ignore -v .codegraph/codegraph.db` (ignored,
  by `.codegraph/.gitignore:4:*`) and `git check-ignore -v .codegraph/.gitignore` (NOT ignored, by
  its own `!.gitignore` exception) — matches this step's "Internal `.codegraph/` files are treated
  as version-dependent" criterion by construction, not by a rule this adoption had to author.
Result: PASS
```


### `ADOPT-05` — Configure CodeGraph for the Selected Clients

```text
Command: `codegraph install -y --target claude --location local --no-permissions`. First attempted
  interactively (`codegraph install --target claude --location local --no-permissions`), which
  stopped at a TUI sub-prompt ("Install the codegraph CLI on your PATH?") that could not be driven
  reliably by piping raw bytes to a non-TTY stdin (an attempted `printf '\n'` toggled the selection
  to "No" rather than confirming the shown default "Yes" — a TUI rendering/input mismatch, not a
  deliberate choice); aborted that attempt without letting it complete, then re-ran fully
  non-interactively with `-y` added alongside the same explicit `--target`/`--location`/
  `--no-permissions` overrides, which the tool honored in place of `-y`'s own defaults
  (`--location=global --target=auto`).
Clients selected: claude (only — matches ADOPT-00)
Scope: local (project) — matches the guide's "Prefer project scope for repository-specific
  adoption"
PATH: Yes — `codegraph` was already confirmed on `PATH` in `ADOPT-01`/`ADOPT-04`
  (`codegraph --version` = 1.5.0); the non-interactive run's PATH-install sub-question resolved to
  its shown default (Yes) since it completed without error and without prompting
Automatic allow: No — `--no-permissions` passed, matching the guide's "Do not enable automatic
  allow until exact command patterns are reviewed"
Prompt front-loading: Yes (tool default) — the install created a `UserPromptSubmit` hook in
  `.claude/settings.json` running `codegraph prompt-hook`; `--no-permissions` only suppresses the
  auto-allow *permissions* list (confirmed via `codegraph install --help`), not this hook, and no
  separate flag exists to opt out of it. Recorded transparently as a deviation from the "Automatic
  prompt front-loading: No" reference-experiment value; the guide treats this decision as
  "optional", not a required disable, so this was not treated as a blocking failure.
Pro: No — not enabled, not requested, no evidence of Pro-only output
Generated files: `.mcp.json` (new — MCP stdio server pointing at `codegraph serve --mcp`, no
  absolute paths, no secrets); `.claude/settings.json` (new — the `UserPromptSubmit` hook above;
  ADOPT-05B, the mandatory selected-client-permissions step, has not run yet and will reconcile
  this file against the project's permission baseline); `.claude/CLAUDE.md` (modified — a new,
  separately delimited `<!-- CODEGRAPH_START -->...<!-- CODEGRAPH_END -->` block appended after
  the existing `<!-- SPECBOOT-BOOTSTRAP:BEGIN/END -->` block, confirmed via `git diff` to leave the
  bootstrap block byte-for-byte untouched — no corruption of ADOPT-00's discovery mechanism).
  `git status --short` / `git diff --name-only` confirm no files outside this set changed.
Per-client provisioning provenance (installer-provisioned vs. separately configured):
  `.mcp.json`, `.claude/settings.json`, and the CodeGraph block in `.claude/CLAUDE.md` were all
  installer-provisioned by this step's `codegraph install` command — confirmed by their
  absence/unmodified state immediately before the command ran and their presence/modification
  immediately after, in the same working-tree scan. No unselected client (Cursor, Codex CLI,
  opencode, Hermes Agent) received any generated files — confirmed by `git status --short`
  reporting only the 3 Claude-attributable paths above as new/changed.
Result: PASS
```


### `ADOPT-05B` — Selected-Client Permissions

```text
Clients selected:

-- Provisioning (ADOPT-05B Step 1) --
Source baseline located (where it came from): the canonical SpecBoot source repository's own
  root `.claude/settings.json`, at the pinned commit (`9f08281dae42eb65d0a349c1876e6b584fe6e791`),
  read via `git show <commit>:.claude/settings.json` (no working-tree checkout — the source's own
  sparse checkout was never widened). That repository is itself a SpecBoot-adopted, Java/Maven
  project (same stack as this target repository), so its reviewed root permission file is a
  directly applicable organizational baseline, not an illustrative example.
Target file existed before this step? (yes) — `.claude/settings.json` was created in `ADOPT-05` by
  `codegraph install`, containing only a `hooks.UserPromptSubmit` entry (`codegraph prompt-hook`)
Decision: MERGE, and why: the target file already existed with a real entry from `ADOPT-05`
  (`00-conventions.md` and this step's own rules both require merge-never-overwrite for an
  existing file, since it "records decisions someone already made")
Merge conflicts resolved, and how (none if COPY): no key-level conflicts — the baseline contributes
  `$schema`, `enabledMcpjsonServers: ["codegraph"]`, and `permissions.allow` (63 entries); the
  existing file contributed `hooks.UserPromptSubmit`. All four top-level keys coexist in the
  merged file with no overlapping keys to reconcile.

-- Supported-environment matrix (Step 2) --
Clients supported by the project/team: Claude only (Kiro and Codex explicitly NOT SELECTED,
  per `ADOPT-00` and reconfirmed by the operator for this step)
Stacks supported: Java 11 + Maven (matches `ADOPT-01`'s identified project toolchain)
Shells supported: zsh, bash, PowerShell (operator-declared)
Operating systems supported: macOS, Ubuntu Linux, Windows (operator-declared) — this is a
  **team-declared** matrix, not limited to the adopting machine (macOS/zsh only), per this step's
  explicit instruction not to declare only the current machine's environment

-- Reconciliation (Step 3) --
Entries removed as out-of-matrix: none — every baseline entry (git/openspec/codegraph inspection,
  `mvn`/`java` availability and offline validate/test, generic read-only POSIX utilities) is
  relevant to the Claude-only, Java+Maven matrix; nothing Kiro-specific or otherwise
  out-of-matrix was present in the source (the Kiro baseline lives in a separate file,
  `.kiro/settings/permissions.yaml`, not copied here since Kiro is NOT SELECTED)
Entries retained for supported environments not present on this machine: all 63 baseline entries
  are Claude Code's own `Bash(<pattern>)` permission-matcher syntax, which is not OS- or
  shell-specific text (Claude Code normalizes Bash-tool command matching independent of host
  shell) — so there is no separate "Ubuntu variant" or "Windows variant" of the *syntax* to add or
  remove. This is a claim about the permission file's textual portability only; it is NOT a claim
  that the permission *behavior* has been verified on Ubuntu or Windows — that is a distinct,
  unmet evidence requirement, recorded honestly below rather than inferred from syntax portability
  (a correction the operator made explicitly during this step: an untested environment is not
  evidence of a working one).
Entries added for the real project: none needed — the baseline's `mvn -v`, `mvn -o validate`,
  `mvn -o test`, `mvn -o -q -Dtest=* test`, `command -v mvn`, `command -v java` entries already
  match this project's actual toolchain exactly (Spring Boot / Maven / Java 11), because the
  baseline's source repository uses the same stack.

-- Safety and syntax (Step 4) --
Credentials / secret-shaped text found: none
Personal absolute paths or home directories found: none
Machine-specific dependency locations found: none
Unsafe broad command patterns found: none — every `Bash(...)` entry is read-only inspection
  (`git status/diff/show/log/ls-files/ls-tree/check-ignore/rev-parse/...`, `find .`, `ls`, `grep`,
  `rg`, `sed -n`, `test -f/-d/-L/-e`, etc., all scoped to the working directory, no in-place edit
  flags) or a controlled, offline (`-o`), non-mutating Maven validate/test invocation; nothing
  installs, deploys, publishes, or reaches an external service, and nothing auto-allows a generic
  filesystem-wide glob or shell loop.
Client-specific syntax validation (JSON / YAML / other): JSON — validated with
  `python3 -c "import json; json.load(open('.claude/settings.json')); print('VALID JSON')"`,
  printed `VALID JSON`, exit 0. No YAML file created (Kiro not selected).

-- Smoke tests (one row per supported client/OS combination) --
Client / OS | Available? | Result (PASS / FAIL / PENDING EVIDENCE) | Reason if pending
Claude Code / macOS (zsh) | yes (this machine) | PENDING EVIDENCE | All 8 documented smoke-test
  commands (`openspec --version`, `openspec doctor --json`, `openspec context --json`,
  `openspec schemas`, `openspec templates`, `git status --short`, `git diff -- openspec/config.yaml`,
  one CodeGraph exploration query) were run individually in this session and each executed
  successfully (exit 0) with no file modification — a genuine **functional** pre-check. But this
  step's own validation requires the smoke test to run in a **fresh session**, because permission
  behavior (whether a command triggers an approval prompt) depends on `.claude/settings.json` as
  loaded at session start, and this session was already active before the merged file was written.
  A continuing session cannot demonstrate the absence of prompts a fresh session would show.
  Genuinely fresh-session validation is deferred to `ADOPT-15`, which this guide designates as the
  dedicated fresh-session discovery/runtime gate; recorded here as PENDING EVIDENCE rather than an
  inferred PASS, per this step's own rule that an untested condition is never a PASS.
Claude Code / Ubuntu Linux (bash) | no (not available on this machine) | PENDING EVIDENCE | no
  Linux machine available during this adoption run
Claude Code / Windows (PowerShell) | no (not available on this machine) | PENDING EVIDENCE | no
  Windows machine available during this adoption run
Permission prompts triggered: not applicable to the functional pre-check above (same continuing
  session; prompt behavior for previously-unapproved patterns in this session was already resolved
  earlier via this conversation's own tool-approval flow, before this merged file existed) — a
  fresh session's prompt behavior is exactly what remains unverified, per the PENDING EVIDENCE rows
  above.
File modifications during smoke test: NONE — confirmed via `git status --short` immediately after
  the pre-check commands, showing only this step's own already-in-progress edits
  (`.claude/settings.json`, `ADOPTION-RUN-LOG.md`), nothing new.

-- Integrity and provenance --
Generic source baseline unchanged (confirmed): YES — `git -C <source> status --porcelain` reported
  clean (no output) immediately after reading the baseline via `git show`, confirming the read-only
  `git show` access left the source's working tree untouched.
Per-client provisioning provenance (installer-provisioned vs. separately configured): separately
  configured — this step performed the documented structured written procedure (locate baseline,
  merge, reconcile, validate) directly; no installer CLI performs this merge automatically.

Remaining limitations: fresh-session smoke-test evidence for all three declared OS/shell
  combinations is outstanding (see PENDING EVIDENCE rows above); Ubuntu and Windows are additionally
  blocked on machine availability, not just session freshness.
Result: PASS — provisioning, reconciliation, and safety/syntax validation all complete and
  verified; the smoke-test validation table correctly records PENDING EVIDENCE (not PASS, not
  FAIL) for every client/OS combination per this step's own rule that an unexercised combination is
  never inferred as passing. This step's PASS reflects the file being correctly provisioned, not a
  claim that fresh-session prompt behavior has been observed.
```


### `ADOPT-06` — Adapt the Repository Technical Context

```text
Prompt used: this guide's `CANONICAL CONSOLIDATED PROMPT` for `ADOPT-06`, executed directly by this
  agent (single-agent session, not a separate sub-agent invocation) against repository evidence
  gathered first: full `src/` tree, `pom.xml`, `HELP.md`, `application.yaml`,
  `db/migration/V1_create_tables.sql`, and all 4 test classes, read in full before any doc edit.
Files changed: `docs/backend-standards.md` (full rewrite), `docs/frontend-standards.md` (full
  rewrite, replaced with a Not Applicable notice), `docs/api-spec.yml` (full rewrite),
  `docs/data-model.md` (full rewrite), `docs/development_guide.md` (full rewrite),
  `docs/base-standards.md` (one-line fix: stale cross-reference to frontend-standards.md's old
  content, needed for cross-document consistency). `docs/documentation-standards.md` inspected and
  left unchanged — already generic, no LTI/stack-specific contamination found.
Template contamination found: `backend-standards.md` (Node.js/TypeScript/Express/Prisma/
  PostgreSQL/AWS Lambda/Serverless, full DDD tutorial content for a "Candidate" domain),
  `frontend-standards.md` (React/TypeScript/Cypress/Bootstrap), `api-spec.yml` (candidate/position/
  interview-flow/recruitment OpenAPI schema, `LIDR-academy` GitHub org reference),
  `data-model.md` (12-entity recruitment/ATS data model with no relation to this repository),
  `development_guide.md` (Docker Compose + PostgreSQL + Node/npm setup, a `git clone` URL pointing
  at `LIDR-academy/AI4Devs-LTI-extended`, `.env` template with `DB_PASSWORD`/`LTIdb` placeholders).
  Verified fully removed with `grep -rniE "LTI|candidate|prisma|typescript|react|node\.js|express|
  postgres|cypress|serverless|aws lambda|LIDR-academy" docs/` — the only remaining hits after the
  rewrite are false positives (substring matches inside unrelated words like "reactive", and this
  agent's own prose explaining what was removed) or correct negative statements ("No Docker,
  Node.js... is required").
Corrections needed: two, both caught by the operator before the content-approval gate was granted
  (recorded as run-log corrections `ADOPT-06/1` and `ADOPT-06/2`): (1) the drafted build
  instructions defaulted to offline `mvn -o` even for a first run after cloning, when a first run
  needs network access — corrected to show online `mvn validate`/`mvn test` first, `-o` as an
  optional once-cached speedup, in both `development_guide.md` and `backend-standards.md`;
  (2) the drafted `api-spec.yml` used OpenAPI `format: date-time` for fields that are actually
  timezone-free `LocalDateTime` values, and unconditionally promised the custom `Error` schema for
  500 responses despite this step's own documented `HttpErrorHandler` defect making that
  unreliable, with no 400 category documented at all — corrected to document the real
  `yyyy-MM-ddTHH:mm:ss` shape, to state the 500 body shape is not guaranteed (citing the Known
  Risks section), and to add a 400 response describing Spring's own default error body for
  parameter-binding failures.
Validation:
  - documented stack vs. `pom.xml`: PASS — Java 11, Spring Boot 2.4.5 parent, Maven, confirmed by
    direct comparison (`grep -E "java.version|spring-boot-starter-parent" pom.xml`)
  - architecture vs. source structure: PASS — package listing in `backend-standards.md` matches
    `find src -type f` exactly (rest/controllers, rest/dto, rest/exception, core/services(+impl),
    core/converters, core/model, core/exception, db/entities, db/repositories)
  - API docs vs. controller: PASS — `api-spec.yml`'s `PriceModel` properties match
    `PriceModel.java`'s fields field-for-field (`brandId, startDate, endDate, productId,
    priceList, priority, price, curr`); confirmed by direct side-by-side comparison
  - data model vs. entities/migrations: PASS — `data-model.md`'s `PRICES` column list matches
    `PriceEntity.java`'s `@Column` mappings and `V1_create_tables.sql`'s `CREATE TABLE` column-for-
    column
  - build/test commands vs. repository configuration: PASS — `mvn`/`mvn spring-boot:run`/
    `mvn -Dtest=...` commands match the Maven/Spring Boot project type; the "system `mvn`, not
    `./mvnw`" note matches `ADOPT-01`'s finding that `.mvn/wrapper/` is absent from this repo
  - absence of unrelated template terminology: PASS — see the grep result above
  - frontend correctly marked not applicable, no frontend/Playwright/E2E requirements introduced:
    PASS — `frontend-standards.md` states Not Applicable with the concrete evidence (no
    `frontend/`, no `package.json`, no `.js`/`.jsx`/`.ts`/`.tsx` anywhere in the repo);
    `base-standards.md`'s pre-existing conditional Playwright/E2E guidance was left as-is (already
    scoped to "when applicable" / frontend workflows, never triggered by this repository) rather
    than introduced by this step
  - consistency across all changed documents: PASS after the operator-flagged base-standards.md
    cross-reference fix — no other cross-document inconsistencies found on review
Prompt changes required: none — the canonical prompt's requirements were followable as written;
  the two corrections were content-accuracy defects in this agent's execution, not gaps in the
  prompt itself.
Result: PASS
```


### `ADOPT-07` — Configure OpenSpec to Consume docs/ and ai-specs/

```text
Prompt used: this guide's `CANONICAL CONSOLIDATED PROMPT` for `ADOPT-07`, executed directly.
  Before editing, inspected: installed OpenSpec version (`openspec --version` = 1.7.0), the
  generated config file (`openspec/config.yaml`, present from `ADOPT-02`), the supported
  configuration keys — read directly from the installed package's schema source
  (`node_modules/@fission-ai/openspec/dist/core/project-config.js`'s `ProjectConfigSchema`, a Zod
  schema: `schema` (required), `context`, `rules` (record of artifact-id → string[]),
  `operations.{apply,archive}.guidance`, `references`, `store` — no `agents` key exists in this
  installed version, so "agent selection" is expressed as prose in `context`, not a dedicated
  key), and the actual artifact IDs for the `spec-driven` schema (`openspec schemas --json` /
  `openspec templates` = `proposal`, `specs`, `design`, `tasks`) — and the existing files under
  `docs/`, `ai-specs/agents/`, `ai-specs/skills/`.
Config path: `openspec/config.yaml` (the only OpenSpec config file present; no `.yml` variant
  exists)
OpenSpec version: 1.7.0
Rules: added for all 4 real artifact IDs (`proposal`, `specs`, `design`, `tasks`) — grounding
  proposals/specs/design in the actual Java/Spring Boot/JPA/Flyway stack and the real single-table
  data model, keeping specs consistent with the documented `GET /api/price` contract, requiring
  design notes to acknowledge the 4 documented Known Risks rather than silently working around
  them, and requiring tasks to include a test-run step and a docs-update step
Operations: `apply` guidance (use system `mvn`, not the broken `./mvnw`) and `archive` guidance
  (confirm `docs/api-spec.yml` and `docs/data-model.md` still match the implementation before
  archiving) — both operation IDs (`apply`, `archive`) confirmed supported by this installed
  version's `OPERATION_IDS` constant before use
Warnings: NONE — `openspec doctor` exited 0 with "OpenSpec root: ok" and no warnings;
  `openspec context` exited 0 and resolved the root cleanly with no errors
Corrections: none required this step
Additional validation performed: `python3 -c "import yaml; yaml.safe_load(...)"` confirmed valid
  YAML with the 4 expected top-level keys (`schema`, `context`, `rules`, `operations`); every
  path referenced in `context` (`docs/base-standards.md`, `docs/backend-standards.md`,
  `docs/api-spec.yml`, `docs/data-model.md`, `docs/frontend-standards.md`,
  `ai-specs/agents/backend-developer.md`, `ai-specs/skills/`) confirmed to exist with individual
  `test -f`/`test -d` checks; `grep -n "/Users/" openspec/config.yaml` confirmed no absolute
  machine-specific paths (only repository-relative paths used)
Result: PASS
```


### `ADOPT-08` — Verify OpenSpec Configuration

```text
Commands (all read-only, none corrected any failure found — none were found):
  `openspec --version`, `openspec doctor`, `python3 -c "import yaml; yaml.safe_load(...)"`,
  `openspec schemas --json`, per-path `test -f`/`test -d` for every path referenced in
  `openspec/config.yaml`'s `context`, a Python set-membership check of `rules` keys against the
  real artifact IDs (`proposal`, `specs`, `design`, `tasks`) and `operations` keys against the
  real operation IDs (`apply`, `archive`), and `grep -n "/Users/|C:\\\\" openspec/config.yaml`
Exit codes: every command above exited 0
Schema: `spec-driven` resolves (`openspec schemas --json` lists it; matches `config.yaml`'s
  `schema:` value)
Context: present, non-empty, all 7 referenced paths confirmed to exist
  (`docs/base-standards.md`, `docs/backend-standards.md`, `docs/api-spec.yml`,
  `docs/data-model.md`, `docs/frontend-standards.md`, `ai-specs/agents/backend-developer.md`,
  `ai-specs/skills/`)
Rules: all 4 keys (`proposal`, `specs`, `design`, `tasks`) are valid artifact IDs for the
  `spec-driven` schema — confirmed programmatically, not by inspection alone
Operations: both keys (`apply`, `archive`) are valid operation IDs — confirmed programmatically
Agent references: `ai-specs/agents/backend-developer.md` (the agent named in `context`) exists
Skill references: `ai-specs/skills/` exists and contains all 8 skills imported in `ADOPT-03`
  (`code-auditing`, `commit`, `enrich-us`, `explain`, `meta-prompt`, `update-docs`,
  `using-git-worktrees`, `writing-skills`)
Warnings: NONE — `openspec doctor` reported zero warnings; no absolute machine-specific path found
  in `openspec/config.yaml`
Result: PASS
```


### `ADOPT-09` — Inspect and Adapt Agents

```text
Detected stacks and work types: Java 11 / Spring Boot backend (per `ADOPT-01`/`ADOPT-06`
  evidence) — no frontend, no other backend language. Work types present: backend
  implementation/review. No evidence of a distinct "product strategy" work type in this
  repository, but that is a work-type-neutral capability, not stack-bound (see below).
Existing agents (3, all imported unchanged by `ADOPT-03`): `backend-developer.md` (TypeScript /
  Express / Prisma DDD backend — wrong stack for this repository's actual backend),
  `frontend-developer.md` (React — no frontend exists in this repository),
  `product-strategy-analyst.md` (technology-agnostic product/ideation agent — work type, not
  stack, so not disqualified by this repository lacking a frontend or using Java).
  Strict-YAML frontmatter check (`python3 -c "import yaml; yaml.safe_load(...)"` against each
  file's frontmatter block) — all 3 **FAILED** before repair: "mapping values are not allowed
  here" at the point each file's single-line `description:` scalar contains an embedded
  `Context:` (or similar) colon-space pattern from its own worked examples.
Representation-only frontmatter repairs: all 3 existing agents repaired identically — the
  `description` field converted from a single physical line containing literal `\n`
  (backslash-n) separators to a YAML block scalar (`description: |-`) with real newlines,
  everything else in the frontmatter (`name`, `tools`, `model`, `color`) and the entire body
  below the closing `---` left untouched. Verified byte-for-byte: (1) each file's body content
  (everything after the frontmatter) is identical before/after (Python string-equality check);
  (2) every non-description frontmatter key/value is identical before/after; (3) the description
  text itself round-trips exactly — replacing real newlines back with literal `\n` in the parsed,
  repaired value reproduces the original single-line string byte-for-byte. Re-parsed with strict
  YAML after repair: all 3 now **PASS**.
Agents preserved: `backend-developer.md`, `frontend-developer.md`, `product-strategy-analyst.md`
  — content and purpose unchanged (frontmatter representation repair only); none overwritten or
  repurposed, despite `backend-developer` and `frontend-developer` targeting stacks absent from
  this repository (they remain valid canonical agents for other repositories/work).
Agents created: `java-backend-developer.md` — no existing agent covers Java/JVM backend work, so
  creation is warranted per this step's explicit (conditional, non-default) creation criterion.
  Client-neutral frontmatter: only `name` and `description` (no `tools`, `model`, `color`, or MCP
  identifiers) — confirmed programmatically
  (`set(parsed.keys()) == {'name','description'}`). Domain-neutral: confirmed by
  `grep -inE "PriceModel|PriceController|PriceEntity|PriceService|PriceRepository|llandaeta|
  Flyway|H2 |JPA|Maven|Spring Boot 2\.4\.5|Lombok" ai-specs/agents/java-backend-developer.md` = no
  matches — the agent body speaks only in generic layered-architecture terms (controllers,
  services, repositories/entities, a centralized error-handling mechanism) and instructs reading
  the repository's own `docs/backend-standards.md` (confirmed to exist) for actual specifics,
  rather than hard-coding this repository's stack, package names, or business domain. Strict YAML
  valid.
Agents modified: none beyond the 3 representation-only frontmatter repairs above (no content or
  scope changes to any existing agent).
OpenSpec selection: `openspec/config.yaml`'s `context` block updated to replace the obsolete
  `backend-developer` reference with `java-backend-developer` (an existing, wrong-stack selection
  replaced, not appended alongside a contradictory one, per this step's requirement) — updated
  only after `java-backend-developer.md` passed the validation checks above.
  `openspec doctor` re-run after the edit: exit 0, zero warnings.
Corrections: none needed this step (the frontmatter repair was the step's own designed work, not
  a correction of this step's output)
Result: PASS
```


### `ADOPT-10` — Validate Agents

```text
Commands run (read-only): `find ai-specs/agents -maxdepth 1 -type f -name '*.md' -print`;
  `grep -R "ai-specs/agents" openspec 2>/dev/null`; `git diff -- ai-specs/agents
  openspec/config.yaml`. All exited 0.
Agent: `ai-specs/agents/java-backend-developer.md` exists (confirmed by the `find` output above,
  alongside the 3 pre-existing agent files, none removed)
Frontmatter: valid — re-confirmed by re-running the same strict `yaml.safe_load` check used in
  `ADOPT-09` against all 4 files (3 repaired + 1 new): all PASS
Description: matches the intended technology family (Java/JVM backend, layered architecture) —
  re-read against the actual detected stack (Java 11 / Spring Boot, per `ADOPT-01`/`ADOPT-06`)
Referenced docs: `docs/backend-standards.md`, the only documentation path named in the new
  agent's body, re-confirmed to exist
OpenSpec selection: `grep -R "ai-specs/agents" openspec` shows exactly one match, in
  `openspec/config.yaml`'s `context`, pointing at `ai-specs/agents/java-backend-developer.md` —
  an existing canonical agent under `ai-specs/agents/`, not a client-adapter path
Unrelated agents preserved: `git diff -- ai-specs/agents` shows only the 3 expected
  representation-only frontmatter diffs (description scalar style change) for
  `backend-developer.md`, `frontend-developer.md`, `product-strategy-analyst.md` — no content,
  name, tools, model, or color changed on any of them; `find` confirms all 3 still present on
  disk alongside the new agent
Adapter not canonical: no client adapters exist yet (`ADOPT-13` has not run) — nothing to
  mistake for canonical; `openspec/config.yaml`'s reference resolves only to the canonical
  `ai-specs/agents/` path
Result: PASS
```


### `ADOPT-11` — Inspect and Adapt Skills

```text
Skills found: 8, all under `ai-specs/skills/` — `code-auditing`, `commit`, `enrich-us`, `explain`,
  `meta-prompt`, `update-docs`, `using-git-worktrees`, `writing-skills`. Every file read in full
  before deciding preserve vs. adapt (no external web/GitHub/registry research performed or
  needed).
Skills preserved unchanged: `enrich-us` (already technology-agnostic — Jira/staging/proposal
  workflow, no stack assumptions), `explain` (technology-agnostic teaching skill),
  `meta-prompt` (technology-agnostic prompt rewriting), `update-docs` (references
  `docs/documentation-standards.md`, confirmed to exist, no stack assumptions),
  `writing-skills` (+ its 5 support files `anthropic-best-practices.md`,
  `graphviz-conventions.dot`, `persuasion-principles.md`, `render-graphs.js`,
  `testing-skills-with-subagents.md` — a meta-skill about *authoring* skills, not about this
  repository's stack; one illustrative `"npm run build"` diagram-label example in
  `graphviz-conventions.dot` is a style-guide example of literal command-text formatting, not an
  executable assumption about this project's build tool, so left as-is)
Skills adapted (3):
  - `code-auditing/SKILL.md`: Phase 0 step 1 generalized from a Node/TS-only file check
    (`package.json, tsconfig.json, etc.`) to explicitly detect Java/Maven/Gradle, Node/TypeScript,
    and Python configuration files, whichever the repository actually has; the unconditional
    "TypeScript/Type Safety" analysis category renamed "Static Type Safety (conditional on the
    detected language)" with a parallel statically-typed-language (e.g. Java) bullet added; the
    Dead Code "Tools:" list reframed as explicitly conditional-on-detected-language and
    never-install-undeclared-tools, with an honest statement that this repository (Java, no
    configured dead-code plugin in `pom.xml`) has no automated tool assumed — manual/IDE-assisted
    review or `codegraph explore` instead, unless the project's own build later declares one.
    `references/audit-methodology.md` and `references/dead-code-methodology.md` (632 lines
    combined) were inspected and found extensively JS/TS/Python-specific (an entire "Phase 3.5:
    TypeScript Types Verification" section, `knip` tool walkthroughs, etc.) but already
    self-conditioning by clearly-labeled per-language section headings (e.g. "### Knip
    (JavaScript/TypeScript)", "### Deadcode (Python)") that a reader would not apply to a Java
    project by default — left unmodified as a deliberate scope decision (rewriting 632 lines of
    supplementary reference detail for full multi-language parity goes beyond "adapt only skills
    whose assumptions would select incorrect tools"; the SKILL.md entry point, which actually
    drives tool/command selection, is what was adapted).
  - `commit/SKILL.md`: two references to a "Git Workflow" section in `docs/frontend-standards.md`
    were stale — `ADOPT-06` replaced that file's entire content with a Not Applicable notice, so
    it no longer has that section. Both references corrected to cite only
    `docs/backend-standards.md` (confirmed to still have a Git Workflow section) and to explain
    why `frontend-standards.md` is excluded.
  - `using-git-worktrees/SKILL.md`: Step 3 (Project Setup) and Step 4 (Verify Clean Baseline) had
    conditional auto-detect branches for Node.js, Rust, Python, and Go, but no Java/Kotlin branch
    at all — meaning this skill would silently skip project setup and baseline testing for this
    repository's actual stack. Added `pom.xml` → `mvn validate` and
    `build.gradle`/`build.gradle.kts` → `gradle help` branches to Step 3 (matching the exact
    conditional-`if`-per-ecosystem style already used for the other four), and added `mvn test` /
    `gradle test` to Step 4's baseline-test command list. Both additions use only the project's
    own already-declared build tool (`mvn`, confirmed present and declared via `pom.xml`
    throughout this adoption) — no new dependency introduced; the Gradle branch is dormant for
    this specific repository (no `build.gradle` here) but correct for the generic, reusable
    canonical skill.
Assumptions found (that would have selected incorrect tools/commands/languages for this
  repository, or silently skipped correct ones): Node/TS-only stack detection in `code-auditing`;
  a now-nonexistent frontend Git Workflow section cited by `commit`; missing Java/Gradle branches
  in `using-git-worktrees`'s auto-detect logic. All three corrected as above.
New dependencies: NONE — every added/changed command resolves to a tool already declared by this
  repository's own build (`mvn`, via `pom.xml`) or is conditionally dormant (the Gradle branch,
  inert here) or explicitly declines to assume an undeclared tool (the Java dead-code-tool case in
  `code-auditing`).
Corrections: none needed to this step's own output (the fixes above are this step's designed
  work, not corrections of a prior mistake within `ADOPT-11` itself).
Result: PASS
```


### `ADOPT-12` — Validate Skills

```text
Commands run, with absolute executable paths (checked first: `find` is shell-shadowed on this
  machine — `type -a find` shows a shell function from a Claude Code shell snapshot wrapping its
  own `bfs`-based implementation, wrapping `/usr/bin/find`; `git` is not shadowed, `/usr/bin/git`
  directly): `/usr/bin/find ai-specs/skills -mindepth 1 -maxdepth 2 -type f -print`;
  `/usr/bin/find ai-specs/skills -type l -print -exec readlink {} \;`;
  `/usr/bin/git diff -- ai-specs/skills`. All exited 0.
Canonical skill count: 8 entry files (`SKILL.md`) found, matching `ADOPT-11`'s inventory exactly
  — `code-auditing`, `commit`, `enrich-us`, `explain`, `meta-prompt`, `update-docs`,
  `using-git-worktrees`, `writing-skills`
Missing entry files: NONE
Missing resources: NONE — `writing-skills`'s 5 supporting files
  (`anthropic-best-practices.md`, `graphviz-conventions.dot`, `persuasion-principles.md`,
  `render-graphs.js`, `testing-skills-with-subagents.md`) all present in the same `find` listing;
  `code-auditing`'s 2 reference files (`references/audit-methodology.md`,
  `references/dead-code-methodology.md`, at depth 3, outside this command's `-maxdepth 2` scope
  by design) independently confirmed present and untouched via the `git diff` output below
  (neither appears, meaning no changes — and they were already known to exist from `ADOPT-03`'s
  import evidence)
Unconditional stack assumptions: NONE remaining — `git diff -- ai-specs/skills` shows exactly 3
  changed files (`code-auditing/SKILL.md`, `commit/SKILL.md`, `using-git-worktrees/SKILL.md`),
  matching `ADOPT-11`'s adaptation list exactly; no unexpected file changed, no unrelated skill
  touched
Undeclared dependencies: NONE — re-confirms `ADOPT-11`'s finding; every changed command resolves
  to a tool this repository's own build already declares (`mvn`) or is conditionally dormant
Symlinks: NONE found under `ai-specs/skills` — correct and expected, since `ADOPT-13` (client
  adapter creation) has not run yet
Generated-client content confused with canonical: N/A — no client-generated skill directories
  exist yet to confuse with the canonical source (`ADOPT-13` not yet run)
Result: PASS
```


### `ADOPT-13` — Create Selected-Client Adapters

```text
Selected clients: Claude only (per `ADOPT-00`; Kiro and Codex NOT SELECTED, reconfirmed
  `.kiro` absent before and after this step)
Canonical agents exposed (2, via relative symlink): `java-backend-developer.md` (matches this
  repository's actual Java/Spring Boot stack), `product-strategy-analyst.md` (technology-agnostic
  — exposed per this step's explicit rule not to skip a non-programming-stack agent, applicable
  to product/scoping questions for any project including this one). NOT exposed:
  `backend-developer.md` (TypeScript/Express/Prisma — wrong stack), `frontend-developer.md`
  (React — no frontend exists) — both preserved unchanged and un-symlinked in `ai-specs/agents/`,
  per the reasoning already recorded in `ADOPT-09`.
Canonical skills exposed (8, via relative directory symlink — all canonical skills; none excluded
  by applicability): `code-auditing`, `commit`, `enrich-us`, `explain`, `meta-prompt`,
  `update-docs`, `using-git-worktrees`, `writing-skills`
Symlinks (10 total, all created after explicit approval of the complete plan presented via
  `AskUserQuestion`): `.claude/agents/java-backend-developer.md` ->
  `../../ai-specs/agents/java-backend-developer.md`; `.claude/agents/product-strategy-analyst.md`
  -> `../../ai-specs/agents/product-strategy-analyst.md`; `.claude/skills/{code-auditing, commit,
  enrich-us, explain, meta-prompt, update-docs, using-git-worktrees, writing-skills}` ->
  `../../ai-specs/skills/<same-name>` respectively (8 skill symlinks). All 10 confirmed resolving
  (`test -e` on every symlink path, individually) and none broken (`find -L .claude/agents
  .claude/skills -type l -print` returned empty, exit 0 — no symlink under either directory
  dangles). `.claude/agents/` did not exist before this step; created only as the parent of these
  2 symlinks.
Real directories preserved (6, untouched — confirmed no collision with any of the 8 exposed
  skill names): `.claude/skills/openspec-apply-change`, `openspec-archive-change`,
  `openspec-explore`, `openspec-propose`, `openspec-sync-specs`, `openspec-update-change`
  (all OpenSpec-generated in `ADOPT-02`). `.claude/skills/specboot-adopt` (the `ADOPT-00`
  bootstrap discovery symlink, pointing at the external absolute source, a separate concern this
  step did not touch) also confirmed still present and unmodified.
Unselected clients checked: `.kiro/` confirmed absent both before and after this step — no Kiro
  adapters created, none possible to accidentally create since no Kiro configuration exists
Per-client provisioning provenance (installer-provisioned vs. separately configured): separately
  configured — this step created the symlinks directly (an AI-agent orchestrated execution of the
  documented plan-then-approve-then-create procedure), not via an automated client-adapter
  installer CLI.
Corrections: none needed this step
Result: PASS
```


### `ADOPT-14` — Validate Adapter Files, Symlinks, and Generated Directories

```text
Commands run, with absolute executable paths (per this step's own instruction; `find` confirmed
  shell-shadowed on this machine in `ADOPT-12`):
  `/usr/bin/find .claude/agents -type l -print -exec readlink {} \;`
  `/usr/bin/find .claude/skills -type l -print -exec readlink {} \;`
  `/usr/bin/find .claude/skills -mindepth 1 -maxdepth 1 -type d -print`
  `/usr/bin/find -L .claude/agents .claude/skills -type l -print`
  `/usr/bin/find .claude/agents .claude/skills -name "* *"` (malformed-name check)
  (`.kiro/agents`, `.kiro/skills` omitted from all commands — Kiro NOT SELECTED, `.kiro/` absent)
  All exited 0.
Agent symlinks: 2 — `.claude/agents/java-backend-developer.md` ->
  `../../ai-specs/agents/java-backend-developer.md`; `.claude/agents/product-strategy-analyst.md`
  -> `../../ai-specs/agents/product-strategy-analyst.md`. Both point to canonical files under
  `ai-specs/agents/`.
Skill symlinks: 8 canonical (`code-auditing`, `commit`, `enrich-us`, `explain`, `meta-prompt`,
  `update-docs`, `using-git-worktrees`, `writing-skills`, each -> `../../ai-specs/skills/<name>`)
  plus 1 pre-existing, separate bootstrap-discovery symlink (`specboot-adopt`, pointing at the
  external absolute source — an `ADOPT-00` concern, not an `ADOPT-13` adapter, correctly left
  untouched and not counted among "canonical skills exposed"). All 8 canonical symlinks point to
  canonical directories under `ai-specs/skills/`.
Real directories: 6 — `.claude/skills/openspec-apply-change`, `openspec-archive-change`,
  `openspec-explore`, `openspec-propose`, `openspec-sync-specs`, `openspec-update-change`; all
  remain real directories (not symlinks), confirmed by the `-mindepth 1 -maxdepth 1 -type d`
  listing above.
Root-instruction symlinks: 4, from `ADOPT-03` (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `codex.md`
  -> `docs/base-standards.md`) — re-confirmed present and unaffected by this step (not modified;
  see `ADOPT-03`'s own validation for their original evidence). Combined with this step's 10
  adapter symlinks: 14 total staged (committed) symlinks for this repository — illustrative count,
  not compared against the reference run's unrelated 30-symlink, two-client figure.
Broken links: NONE — `find -L .claude/agents .claude/skills -type l -print` returned empty
  output with exit 0 (a real command execution and confirmed-empty result, not an inferred pass)
Malformed symlink names: NONE — the space-containing-name check returned empty output with exit 0
Unselected client adapters: NONE — `.kiro/` confirmed absent (no Kiro directory exists to hold
  adapters, and none were created)
Result: PASS
```


### `ADOPT-15` — Validate Runtime Discovery in a Fresh Client Session

```text
Status: PENDING — awaiting a genuinely fresh Claude Code session. This session cannot perform its
  own fresh-session validation: it was already active before `ADOPT-13`/`ADOPT-14` created the
  adapters being validated, so it could not distinguish "discovered automatically" from "already
  knew because I built it" — the same reasoning already applied to `ADOPT-05B`'s deferred
  smoke-test rows.
Exact handoff prompt for the next fresh session (verbatim, per this step's canonical prompt):

  Perform a read-only architecture review of this repository and identify the most important
  implementation risk.

  Use the repository's configured agents, skills, project instructions, documentation, and
  CodeGraph integration where appropriate.

  Do not modify files.
  Do not access the web or any external service.

  Before giving the architecture finding, report:
  - the client and active agent or mode;
  - root repository instruction files automatically loaded;
  - canonical or adapted agent definitions automatically discovered or used;
  - skills automatically discovered or used;
  - project documentation consumed;
  - CodeGraph tools or commands used;
  - resources that had to be opened manually because automatic discovery failed.

  Then report:
  - the primary implementation risk;
  - repository evidence supporting it;
  - files modified, which must be none;
  - PASS or FAIL for automatic runtime discovery.

  Do not claim automatic discovery for a resource that was manually supplied or explicitly loaded
  after the session started.

Procedure for the operator: close this session, open a new Claude Code session at the repository
  root, use Claude's default mode, submit the prompt above verbatim, then record the reported
  results into this evidence block (replacing this PENDING placeholder) before continuing to
  `ADOPT-16`. Run once — only Claude is SELECTED (Kiro and Codex are NOT SELECTED, so no
  additional per-client repetition is needed).
Result: PENDING — not evaluable until a fresh session runs the prompt above and its output is
  recorded here

Session note (2026-08-15, resume session, no step-state change): this session opened with a
  "resume the adoption" instruction that also asked to retroactively record "the complete result
  of the read-only architecture review from your immediately preceding response" as ADOPT-15
  evidence. No such preceding response existed — this was the first turn of the session. The only
  attached content was an auto-injected CodeGraph context block (mechanical symbol-matching
  against the prompt's text, self-labeled "Structural context from CodeGraph for this prompt"),
  which addresses none of this step's seven required report items and was not a deliberate,
  unbiased architecture-risk review. Separately, even a review performed later in this same
  session would not qualify: the opening prompt already named `ADOPT-15`, the run log, and the
  adoption process directly, which defeats the organic-discovery test this step exists to capture
  (the step's own canonical prompt requires zero SpecBoot framing). Flagged to the operator via
  `AskUserQuestion` with three options (spawn a blank subagent with the verbatim prompt; stop and
  hand off for a literal new session; accept the CodeGraph block as-is). Operator selected "stop,
  hand off manually." No evidence fabricated or recorded; status remains PENDING, unchanged from
  before this session.

Fresh-session run (2026-08-15, separate session from the one above): this session's first-ever
  user turn was the exact canonical `ADOPT-15` prompt, submitted verbatim with no SpecBoot,
  `ADOPT-15`, run-log, or adoption-process framing anywhere in it — confirmed directly from this
  session's own transcript (turn 1 text compared word-for-word against the canonical prompt in
  `06-adapters-and-discovery.md`: identical). The instruction to record this run as `ADOPT-15`
  evidence and resume the adoption arrived only in a second, later turn, submitted after the
  review had already been fully performed and reported to the operator — so the review itself was
  not biased by any adoption-process framing, satisfying the organic-discovery test the prior
  attempt (above) failed. This is a first-hand within-session observation of the session's own
  turn-1 transcript, not a secondhand self-report trusted across sessions. Only Claude is
  SELECTED (Kiro, Codex NOT SELECTED per `ADOPT-00`), so one run satisfies "once per selected
  client."

  - Client and active agent/mode: Claude Code, VSCode native extension, primary interactive
    session, default mode — no subagent spawned, no Plan mode.
  - Root repository instruction files automatically loaded: `/CLAUDE.md` (symlink →
    `docs/base-standards.md`) and `.claude/CLAUDE.md` — both injected verbatim via the harness's
    own system-reminder ("claudeMd" block) at conversation start, before any tool call.
  - Canonical/adapted agent definitions automatically discovered: the system-reminder's `Agent`
    subagent-type listing surfaced `java-backend-developer` automatically (the `ADOPT-13`
    adapter). Discovered, not invoked — the review was performed directly rather than delegated,
    since it is read-only analysis, not code authoring. (2) explicit invocation did not occur;
    per this step's interpretation rules that alone does not fail discovery.
  - Skills automatically discovered: the full project skill catalog (including `code-auditing`,
    `specboot-adopt`, the `openspec-*` set) was surfaced automatically via system-reminder. None
    was formally invoked via the `Skill` tool for the review itself — `code-auditing` was read
    manually afterward only to confirm it was not a closer fit; per the interpretation rules this
    is category (3) normal task reading, not a discovery failure.
  - CodeGraph: automatic — the `UserPromptSubmit` hook (`codegraph prompt-hook`, from
    `.claude/settings.json`, `ADOPT-05`) fired on the very first prompt, before any tool call,
    injecting `PriceService`/`PriceModel`/`PriceRepository` source and blast-radius data. Manual,
    additive — one explicit `codegraph_explore` call tracing the `PriceController` →
    `HttpErrorHandler` exception-dispatch path, which flagged `searchPriceForBrandTime` with "no
    covering tests found."
  - Project documentation consumed: `docs/base-standards.md` (auto-loaded); manually read —
    `docs/backend-standards.md` (pointed at by `base-standards.md` §3; contains the "Known Risks
    and Defects" section corroborating the finding below) and `docs/data-model.md`. Per the
    interpretation rules this is category (3) — normal reading of documentation the base
    instructions point at, not category (4) prohibited injection; no path was supplied by the
    operator.
  - Resources manually opened (all category (3), no operator-supplied paths, no category (4)
    injection): `docs/backend-standards.md`, `docs/data-model.md`,
    `ai-specs/skills/code-auditing/SKILL.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md` (read for
    extra adoption-state context, not required by the review prompt), and source files
    (`PriceController.java`, `HttpErrorHandler.java`, `HttpException.java`,
    `PriceControllerTest.java`, `V1_create_tables.sql`).
  - Primary implementation risk reported: `HttpErrorHandler.unhandledExceptions`
    (`src/main/java/com/llandaeta/prices/rest/exception/HttpErrorHandler.java:24-25`) is
    annotated `@ExceptionHandler(Exception.class)` but its parameter is typed `HttpException`,
    not `Exception` — Spring selects the method for any thrown exception but cannot bind a
    non-`HttpException` instance to it, so the intended catch-all does not reliably produce the
    documented structured error response. Directly reachable: `PriceController` parses
    `applicationDate` with `LocalDateTime.parse(...)` and no try/catch
    (`PriceController.java:28`), so a malformed date throws `DateTimeParseException` — exactly
    the case the broken handler mis-handles. Independently corroborated by
    `docs/backend-standards.md`'s own "Known Risks and Defects" §1 and §4 (pre-existing,
    already-documented defects, not a new finding), by `PriceControllerTest.java` containing only
    5 happy-path tests with zero error-path coverage, and by `codegraph_explore` flagging
    `searchPriceForBrandTime` with "no covering tests found."
  - Files modified during the review: none.
  - PASS/FAIL for automatic runtime discovery, as reported by the session: PASS.

Result: PASS — `ADOPT-15` fresh-session discovery-and-execution evidence recorded above,
  observed first-hand from this session's own unbiased turn-1 transcript; validated per client
  (Claude only, per `ADOPT-00`).
```


### `ADOPT-16` — Run the Project Baseline

```text
Pre-inspection: no README, no CI configuration (`.github/` absent) in this repository;
  baseline command derived from `docs/backend-standards.md`'s own "Development Workflow"
  section and `ADOPT-01`'s finding that `./mvnw` is broken (`.mvn/wrapper/` absent from the
  git tree) — system `mvn` used, confirmed on PATH via `command -v mvn` (resolved via the
  same sdkman-managed install identified in `ADOPT-01`; machine-local install path
  intentionally not recorded here), Apache Maven 3.9.16, Java 11.0.31 (Corretto), matching
  `ADOPT-01`'s recorded toolchain exactly. `~/.m2/repository` confirmed present (dependencies
  already cached from earlier steps in this adoption).
Failed attempts and diagnosis: none — `target/` already contained compiled output from
  2026-08-13 (predating this session), so per this step's own inline guidance ("Stale build
  output can invalidate the baseline" / "Prefer a clean rebuild when the build tool supports
  one"), `mvn clean test` (not bare `mvn test`) was chosen as the baseline command from the
  start, avoiding the reference run's stale-`target/classes`-missing-Lombok-members failure
  mode preemptively rather than hitting it and recovering. This is Maven's own built-in
  `clean` goal removing its own `target/` output, not a manual deletion or relocation outside
  the build tool — the `[HUMAN APPROVAL REQUIRED]` gate (which guards removing/relocating
  generated output when normal build-tool cleanup is blocked and manual intervention is
  needed) was not triggered.
Recovery performed: n/a — no failure occurred.
Baseline command: `mvn clean test` (online — no `-o`; matches
  `docs/backend-standards.md`'s documented first-run guidance)
Exit code: 0 (captured in the same shell invocation as the command, via `echo "MVN_EXIT_CODE=$?"`
  immediately after — not inferred from a separate later shell)
Tests: `Tests run: 8, Failures: 0, Errors: 0, Skipped: 0` — `BUILD SUCCESS`, total time 14.136s.
  Matches this step's own reference evidence exactly ("8 tests, 0 failures, 0 errors, 0
  skipped").
Warnings: none observed in the build output beyond routine Spring Boot/Hibernate/HikariCP
  startup and shutdown INFO logging.
OpenSpec doctor: `openspec doctor` — exit 0, "OpenSpec root: ok", "References: (none
  declared)" (expected — no `references` key configured; unchanged from `ADOPT-02`'s finding)
CodeGraph refresh: `codegraph sync` — exit 0, "Already up to date" (index already current
  from the automatic file-watcher; no re-scan needed)
Git status: `git status --short` — only `.specboot/adoption/ADOPTION-RUN-LOG.md` modified
  (this run's own in-progress evidence writes, including the `ADOPT-15` checkpoint-ledger row
  added after that checkpoint's commit/push, per the established cumulative-run-log pattern
  used at checkpoint 2/`ADOPT-02`); `target/` untracked and gitignored, does not appear.
Result: PASS
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
- **Delivery mode read from the manifest:** source-linked
- **Payload obligation:** `SKIPPED — source-linked mode`
- **Container obligation:** `SKIPPED — source-linked mode`
- `.specboot/bootstrap/` never created at any point in the run: YES / NO
- Project-local discovery entries removed, and every file a delimited block was appended to
  **byte-restored**: YES / NO
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
- Every entry carries a terminal `cleanup-status` and `final-disposition`: YES / NO
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

---

### `ADOPT-20` — Pull-Request Readiness Gate

| Step | Recorded status | Evidence pointer |
|---|---|---|
| `ADOPT-00` … `ADOPT-19` | | |

- Any row at FAIL, PENDING, or blank (must be NONE):
- Readiness verdict: READY / BLOCKED — reason:
- Approval:
- Pull request created (identifier), if any:

---

## Checkpoint ledger

| # | Step or group | Grouping justification (required if a group) | Validation | Evidence pointers | Ready declared | Approval (who / when / what) | Exact staged file list | Commit SHA | Remote-impact assessment + verdict | Push status | Improvement proposals raised |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `ADOPT-00` | n/a — single step | PASS on all criteria in `09-bootstrap.md` (see step's evidence block above); one correction applied pre-commit (resolved absolute paths removed from run log evidence, correction record `ADOPT-00/2`) | `ADOPT-00` evidence block, this run log, above | YES — commit-gate declaration presented via `AskUserQuestion`, re-presented after correction | luis.landaeta@gmail.com, 2026-08-15, commit gate: approved on second presentation (first presentation returned a correction, not approval); push gate: approved separately after the remote-impact assessment was presented | `.gitignore`, `.claude/CLAUDE.md`, `.specboot/adoption/BOOTSTRAP-MANIFEST.json`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `afbfce4d18dde8d0810dba2d3c07bbc9bf1b91c7` | No `.github/workflows/` in the tracked tree; `gh api repos/Landaone/app-prices-rest/rulesets` = `[]`; `gh api .../hooks` = `[]`; `master` branch unprotected; target branch had no upstream and did not yet exist on `origin`. Verdict: no CI/automation trigger detected | PUSHED — new branch `experiment/specboot-ai-adoption-v1` created on `origin`, upstream tracking set | proposal #1 (see Improvement proposals) |
| 2 | `ADOPT-02` | n/a — single step (operator explicitly chose one-checkpoint-per-step as the cadence for this run; `ADOPT-01` produced no repo-local writes so has no checkpoint of its own) | PASS on all criteria in `01-prerequisites-and-install.md` (see step's evidence block above) | `ADOPT-02` evidence block, this run log | YES — commit-gate declaration presented via `AskUserQuestion`, approved on first presentation | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `.claude/commands/opsx/apply.md`, `.claude/commands/opsx/archive.md`, `.claude/commands/opsx/explore.md`, `.claude/commands/opsx/propose.md`, `.claude/commands/opsx/sync.md`, `.claude/commands/opsx/update.md`, `.claude/skills/openspec-apply-change/SKILL.md`, `.claude/skills/openspec-archive-change/SKILL.md`, `.claude/skills/openspec-explore/SKILL.md`, `.claude/skills/openspec-propose/SKILL.md`, `.claude/skills/openspec-sync-specs/SKILL.md`, `.claude/skills/openspec-update-change/SKILL.md`, `openspec/config.yaml`, `.specboot/adoption/ADOPTION-RUN-LOG.md` (cumulative state at commit time, honestly including already-written `ADOPT-03` evidence marked "checkpoint pending" — `ADOPT-03`'s own deliverable files were deliberately left unstaged for its own checkpoint, see row 3) | `3dceab527ca96fb22ee3a91bdc75c1a6ad5eebea` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged from `ADOPT-00`'s assessment. Verdict: no CI/automation trigger detected | PUSHED — fast-forward to the already-existing `origin/experiment/specboot-ai-adoption-v1` | none this checkpoint |
| 3 | `ADOPT-03` | n/a — single step (one-checkpoint-per-step cadence) | PASS on all criteria in `01-prerequisites-and-install.md` (see step's evidence block above), including the corrected 28-file inventory | `ADOPT-03` evidence block, this run log | YES — commit-gate declaration presented via `AskUserQuestion` | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `codex.md`, all 7 `docs/*` files, all 21 `ai-specs/*` files (see `ADOPT-03` evidence block for the full list), `.specboot/adoption/ADOPTION-RUN-LOG.md` | `a0278d953abf9af21c2e35026bbb44eaf7daa022` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged from `ADOPT-00`'s assessment. Verdict: no CI/automation trigger detected | PUSHED — fast-forward to `origin/experiment/specboot-ai-adoption-v1` | none this checkpoint |
| 4 | `ADOPT-04` | n/a — single step | PASS on all criteria in `02-codegraph.md` (see step's evidence block and the code-graph capability selection section above) | `ADOPT-04` evidence block, code-graph capability selection, this run log | YES | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `.codegraph/.gitignore`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `b9f9a249a71b22c993637ca415885967bb66763a` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 5 | `ADOPT-05` | n/a — single step | PASS on all criteria in `02-codegraph.md` (see step's evidence block above) | `ADOPT-05` evidence block, this run log | YES | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `.mcp.json`, `.claude/settings.json`, `.claude/CLAUDE.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `5aeb307c6bfe15b0844607e4131649ab0e148eea` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 6 | `ADOPT-05B` | n/a — single step | PASS — provisioning/reconciliation/safety complete; smoke-test table correctly PENDING EVIDENCE (see step's evidence block above) | `ADOPT-05B` evidence block, this run log | YES | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `.claude/settings.json`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `03845b5ced51d69bbe7aa1ac77e49751b31f3f54` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | proposal #2 (see Improvement proposals) |
| 7 | `ADOPT-06` | n/a — single step | PASS on all criteria in `04-context-and-openspec.md` (see step's evidence block above); two corrections applied pre-approval (`ADOPT-06/1` build-command online/offline ordering, `ADOPT-06/2` OpenAPI date-time format and response-schema honesty) | `ADOPT-06` evidence block, this run log | YES — content-approval gate presented via `AskUserQuestion`, first presentation interrupted (accidental empty response, treated as neither approval nor rejection, not proceeded on), re-presented and approved after corrections | luis.landaeta@gmail.com, 2026-08-15, content-approval gate, commit gate, and push gate each approved separately | `docs/api-spec.yml`, `docs/backend-standards.md`, `docs/base-standards.md`, `docs/data-model.md`, `docs/development_guide.md`, `docs/frontend-standards.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `ba7fa3faf3dbc919ee85f5c6d5740adccb780a0b` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 8 | `ADOPT-07` | n/a — single step | PASS on all criteria in `04-context-and-openspec.md` (see step's evidence block above); `openspec doctor`/`openspec context` both zero warnings | `ADOPT-07` evidence block, this run log | YES | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately (no separate content-approval gate — the phase file specifies none for `ADOPT-07`) | `openspec/config.yaml`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `c21da332fff9049ff684baabd9b548bf2dadf748` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 9 | `ADOPT-08` | n/a — single step | PASS — read-only re-verification, zero warnings, nothing corrected (see step's evidence block above) | `ADOPT-08` evidence block, this run log | YES | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `52b7531fb5f576fb536476e02d80d40e0a13afbd` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 10 | `ADOPT-09` + `ADOPT-10` | grouped — `05-agents-and-skills.md` states explicitly: "Each adapt step is followed immediately by its read-only validation step; they are executed as a pair," and `00-conventions.md` names this exact pair as one of its own worked examples of a structurally-justified group | PASS on all criteria in `05-agents-and-skills.md` for both steps (see each step's evidence block above); one correction applied pre-commit (checkpoint file count, `ADOPT-09/1`) | `ADOPT-09` and `ADOPT-10` evidence blocks, this run log | YES — commit-gate declaration presented via `AskUserQuestion`, first presentation returned a correction (not approval), re-presented and approved | luis.landaeta@gmail.com, 2026-08-15, commit gate: approved on second presentation; push gate: approved separately | `ai-specs/agents/backend-developer.md`, `ai-specs/agents/frontend-developer.md`, `ai-specs/agents/product-strategy-analyst.md`, `ai-specs/agents/java-backend-developer.md`, `openspec/config.yaml`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `c60dffdecd5510b0b59b3ec208e9d0b84398213b` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 11 | `ADOPT-11` + `ADOPT-12` | grouped — same structural justification as row 10 (`00-conventions.md`'s documented executed pair) | PASS on all criteria in `05-agents-and-skills.md` for both steps (see each step's evidence block above) | `ADOPT-11` and `ADOPT-12` evidence blocks, this run log | YES | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `ai-specs/skills/code-auditing/SKILL.md`, `ai-specs/skills/commit/SKILL.md`, `ai-specs/skills/using-git-worktrees/SKILL.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `d9b1b04bf58a6b0402f9e1ab323367d5cea3153d` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 12 | `ADOPT-13` | n/a — single step (`06-adapters-and-discovery.md` does not describe `ADOPT-13`/`ADOPT-14` as an executed pair the way `05-agents-and-skills.md` does for `09`/`10` and `11`/`12`, so the one-checkpoint-per-step default applies) | PASS on all criteria in `06-adapters-and-discovery.md` (see step's evidence block above) | `ADOPT-13` evidence block, this run log | YES — plan presented and approved via `AskUserQuestion` before any symlink was created | luis.landaeta@gmail.com, 2026-08-15, adapter-plan approval, commit gate, and push gate each approved separately | `.claude/agents/java-backend-developer.md`, `.claude/agents/product-strategy-analyst.md`, `.claude/skills/code-auditing`, `.claude/skills/commit`, `.claude/skills/enrich-us`, `.claude/skills/explain`, `.claude/skills/meta-prompt`, `.claude/skills/update-docs`, `.claude/skills/using-git-worktrees`, `.claude/skills/writing-skills`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `ca374ca14a83e7aabb2d8f2a35cfdfaf0e1408af` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 13 | `ADOPT-14` | n/a — single step | PASS — read-only re-verification, zero broken links/malformed names (see step's evidence block above) | `ADOPT-14` evidence block, this run log | YES | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `6c0d592342822cb18e4c909f1a188daaa1d527fd` | No new `.github/workflows/`; rulesets `[]`; webhooks `[]`; unchanged. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |
| 14 | `ADOPT-15` | n/a — single step | PASS — fresh-session evidence recorded and validated per `06-adapters-and-discovery.md`'s interpretation rules (see step's evidence block above) | `ADOPT-15` evidence block, this run log | YES — commit-gate declaration presented via `AskUserQuestion`, approved on first presentation | luis.landaeta@gmail.com, 2026-08-15, commit gate and push gate each approved separately | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `2c5858695e8af4dd0087b1f9327ca7be4d591968` | No `.github/workflows/` in tracked tree; rulesets `[]`; webhooks `[]`; branch unprotected. Verdict: no CI/automation trigger detected | PUSHED — fast-forward | none this checkpoint |

---

## Improvement proposals

| # | Checkpoint | Target file | Proposal | Status (`proposed` / `accepted` / `rejected` / `applied-in-change-<id>`) |
|---|---|---|---|---|
| 1 | ADOPT-00 (this run) | `specboot-adoption/bootstrap-kit/discovery/claude.md` | The Entries table's "Points to" column (`../../.specboot/bootstrap/skills/specboot-adopt`) and the verbatim `SPECBOOT-BOOTSTRAP` block text (`.specboot/bootstrap/SPECBOOT_ADOPTION_GUIDE.md`) still describe the deferred packaged-snapshot container path. `.specboot/bootstrap/` is never created under the current, sole source-linked delivery mode (per `09-bootstrap.md`, `bootstrap-and-debootstrap.md`, and `bootstrap-kit/README.md`, all of which state entries "point at the external source"). This run resolved the discrepancy by pointing the symlink directly at the external absolute source path and rewriting the CLAUDE.md block to resolve the source via `.specboot/local/` instead of a hardcoded container path. Recipe should be updated to match the source-linked-only mode so future runs don't have to re-derive this. | proposed |
| 2 | ADOPT-05B (this run) | `.claude/settings.json` (canonical source's own root permission baseline, used as this run's `ADOPT-05B` source) | The canonical permission baseline was authored and, as far as this run could determine, only ever exercised on macOS/zsh: every allowed pattern is POSIX-style (`test -f`, `sed -n`, `find .`, `command -v`), and the Maven-related entries reference only `mvn` (system Maven), never `mvnw.cmd` (the Windows Maven-wrapper entry point) even though `03-client-permissions.md`'s Step 2/3 explicitly requires declaring and retaining Windows/PowerShell variants when a team supports them. Nothing in the baseline or its surrounding docs demonstrates PowerShell-native equivalents or `mvnw.cmd` coverage were ever validated. This run could not close that gap either (no Windows machine available — recorded as `PENDING EVIDENCE` in `ADOPT-05B`'s smoke-test table), so the gap is structural to the canonical baseline, not specific to this adoption. Recipe should either demonstrate a validated Windows/PowerShell smoke-test pass somewhere in its history, or explicitly document that Windows coverage is unvalidated rather than implying parity through silence. | proposed |

---

## Client- and company-specific adaptations

| # | Adaptation | Reason | Blast radius (which steps or artifacts it affects) |
|---|---|---|---|
| | | | |

---

## Code-graph capability selection

- Selected implementation (CodeGraph, or the named company-approved equivalent): CodeGraph
- Version: 1.5.0
- Verification command executed, with exit code and output summary: `codegraph explore "list
  entry points"` (`ADOPT-04`) exited 0 and returned a non-empty structured result — 49 symbols
  across 3 files, with blast-radius/caller data and verbatim numbered source; re-run in `ADOPT-05`
  as `codegraph explore "list public interfaces"`, also exit 0, 52 symbols across 4 files. Index
  build: `codegraph init` exited 0 — 22 files indexed, 295 nodes, 355 edges in 659ms.
- Coverage limitations (for example unsupported languages): none observed — this is a
  single-language (Java/Maven) repository and the index covered the full `src/` tree (22 files);
  no unsupported-file warnings were emitted.
- Result: PASS

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

```text
2026-08-15 / ADOPT-00 Step 3 (client selection) / decision: run read-only autodiscovery probe / who: luis.landaeta@gmail.com / reason: wanted to see what's on disk before naming a client
2026-08-15 / ADOPT-00 Step 3 (client selection) / decision: select Claude; Kiro and Codex NOT SELECTED / who: luis.landaeta@gmail.com / reason: autodiscovery found no candidates; Claude named explicitly as the client in use for this session
2026-08-15 / ADOPT-00 Step 4 (mutation gate) / decision: approved the exact 7-path mutation inventory / who: luis.landaeta@gmail.com / reason: reviewed and approved at the [HUMAN APPROVAL REQUIRED] gate
2026-08-15 / ADOPT-00 checkpoint, commit gate, first presentation / decision: correction requested, not approval — resolved absolute paths must be removed from committed run-log evidence / who: luis.landaeta@gmail.com / reason: portable-evidence contract in 09-bootstrap.md applies to all committed evidence, not only the manifest; three occurrences fixed and recorded as correction ADOPT-00/2
2026-08-15 / ADOPT-00 checkpoint, commit gate, second presentation / decision: approved staging and commit of exactly 4 files / who: luis.landaeta@gmail.com / reason: correction verified (zero absolute-path leaks across all 4 files), diff reviewed clean
2026-08-15 / ADOPT-00 checkpoint, push gate / decision: approved push of commit afbfce4 to origin/experiment/specboot-ai-adoption-v1 / who: luis.landaeta@gmail.com / reason: remote-impact assessment showed no CI, no rulesets, no webhooks, no branch protection; new branch, no overwrite risk
2026-08-15 / ADOPT-02 (global install/upgrade gate) / decision: decline the global upgrade of `@fission-ai/openspec` from 1.7.0 to registry-latest 1.9.0 / who: luis.landaeta@gmail.com / reason: 1.7.0 already meets this guide's documented minimum and matches the reference-experiment version; `openspec init` proceeded with 1.7.0
2026-08-15 / ADOPT-03 (repository-local write gate), first presentation / decision: correction requested, not approval — `ai-specs/` file count stated as 15 must be re-derived from the pinned source commit / who: luis.landaeta@gmail.com / reason: independent `git ls-tree` recount showed 21, not 15; corrected count (28 total) recorded as correction ADOPT-03/1
2026-08-15 / ADOPT-03 (repository-local write gate), second presentation / decision: approved copying the 28-file `docs/` + `ai-specs/` baseline and creating the 4 root instruction symlinks / who: luis.landaeta@gmail.com / reason: corrected count verified against the pinned source commit, no collisions, `.cursor/` correctly excluded
2026-08-15 / checkpoint cadence for the remainder of the run / decision: one checkpoint (commit + push, each separately gated) per independently-validated `ADOPT-nn` step, the checkpoint protocol's documented default / who: luis.landaeta@gmail.com / reason: explicitly asked and chose the protocol default over phase-file grouping or a deferred-push milestone scheme, prioritizing maximum reviewability over fewer approval round-trips
2026-08-15 / ADOPT-02 checkpoint, commit gate / decision: approved staging and commit of the 13 OpenSpec-generated files plus the run log / who: luis.landaeta@gmail.com / reason: diff reviewed clean (no secrets, no absolute paths after a self-caught correction to the ADOPT-01 evidence's `mvn` path)
2026-08-15 / ADOPT-02 checkpoint, push gate / decision: approved push of commit 3dceab5 / who: luis.landaeta@gmail.com / reason: remote-impact re-check unchanged from ADOPT-00 (no CI, no rulesets, no webhooks)
2026-08-15 / ADOPT-03 checkpoint, commit gate / decision: approved staging and commit of the 28-file baseline plus 4 root symlinks plus the run log / who: luis.landaeta@gmail.com / reason: diff reviewed clean — whitespace and "secret-shaped" grep hits were confirmed to be pre-existing prose/placeholders inside copied baseline content, not real absolute paths or credentials
2026-08-15 / ADOPT-03 checkpoint, push gate / decision: approved push of commit a0278d9 / who: luis.landaeta@gmail.com / reason: remote-impact re-check unchanged from ADOPT-00
2026-08-15 / ADOPT-05 (project-local configuration gate) / decision: approved `codegraph install --target claude --location local --no-permissions` as proposed / who: luis.landaeta@gmail.com / reason: matches the guide's stated defaults (project scope, automatic-allow off); ran into a TUI input-piping issue on the first interactive attempt (recorded in the ADOPT-05 evidence block), resolved by adding `-y` alongside the same explicit overrides
2026-08-15 / ADOPT-04 checkpoint, commit and push gates / decision: approved both separately / who: luis.landaeta@gmail.com / reason: diff reviewed clean, remote-impact unchanged from ADOPT-00
2026-08-15 / ADOPT-05B (supported-environment matrix, Step 2) / decision: declare Claude-only client, Java 11 + Maven stack, zsh/bash/PowerShell shells, macOS/Ubuntu/Windows operating systems / who: luis.landaeta@gmail.com / reason: team-declared matrix supplied directly, since this is project/team information not derivable from the repository or this machine
2026-08-15 / ADOPT-05B (permission-file creation gate) / decision: approved merging the canonical source's root `.claude/settings.json` baseline into the existing file, no removals or additions / who: luis.landaeta@gmail.com / reason: corrected the evidence before writing — declined to accept "syntax is OS-agnostic" as a substitute for actual fresh-session validation on Ubuntu/Windows; those combinations recorded PENDING EVIDENCE rather than PASS, and an improvement proposal (#2) was recorded about the baseline's own unvalidated Windows/PowerShell coverage
2026-08-15 / ADOPT-15 (fresh-session evidence gate) / decision: decline to record this session's auto-injected CodeGraph context, or a review performed later in this same already-briefed session, as ADOPT-15 evidence; stop and hand off for a genuinely separate new session instead / who: luis.landaeta@gmail.com / reason: no actual preceding-response review existed to record, and this session's opening prompt already named the adoption process, which would bias any review performed here and defeat the step's organic-discovery test; offered three paths via `AskUserQuestion` (blank subagent / manual handoff / accept as-is), operator chose manual handoff
2026-08-15 / ADOPT-15 (fresh-session evidence gate, handoff session) / decision: accept this session's turn-1 architecture review as valid ADOPT-15 evidence and record PASS / who: this agent, recording a first-hand observation of the session's own transcript, not a self-approval of a gated mutation — ADOPT-15's own approval gate is `none` (read-only) / reason: turn 1 was verbatim-identical to the canonical prompt in `06-adapters-and-discovery.md` with zero SpecBoot/adoption framing; the resume-and-record instruction arrived only in turn 2, after the review was already complete, so the review itself was not biased — satisfying the organic-discovery test the prior handoff session's declined attempt could not meet
```

## Correction record

```text
Step / attempt / failure / diagnosis / recovery / outcome:
ADOPT-00 / 1 / discovery/claude.md's Entries table and delimited block reference a `.specboot/bootstrap/…` container path that the sole source-linked delivery mode never creates / diagnosis: recipe file predates or was not updated alongside the source-linked-only deferral documented in 09-bootstrap.md, bootstrap-and-debootstrap.md, and bootstrap-kit/README.md / recovery: pointed the symlink and CLAUDE.md block at the external source directly instead of the never-created container path, per the authoritative phase-file and reference-doc statements; recorded as improvement proposal #1 rather than editing the canonical source / outcome: provisioning proceeded correctly, discrepancy preserved as a proposal for the canonical source's maintainers
ADOPT-00 / 2 / fresh-session evidence written into this run log recorded three resolved absolute machine paths (the canonical source path in the drift-check row and resume evidence; this project's own absolute checkout path in the fresh-session discovery outcome) / diagnosis: `09-bootstrap.md`'s evidence-to-record clause ("the statement that the local source path is resolved per machine and is not committed. Never the resolved absolute path... never manifest content") and the run log's own pre-existing "Local source path resolution" field state the principle applies to portable, committed evidence generally, not only to the manifest file narrowly — the run log is equally committed (`.specboot/adoption/` is not git-ignored) and equally travels into every clone; the drafting agent applied the rule too narrowly on first pass / recovery: the operator flagged it before the commit gate was approved (correction caught pre-commit, not post-commit); all three occurrences replaced with mechanism-only descriptions (how the path was obtained, that identity was verified) with resolved values omitted, consistent with the pre-existing "Local source path resolution" field / outcome: run log now carries portable evidence only; commit gate re-presented after this correction
ADOPT-03 / 1 / the first ADOPT-03 approval-gate presentation stated the `ai-specs/` portion of the import inventory as 15 files, when the actual count at the pinned source commit (`9f08281dae42eb65d0a349c1876e6b584fe6e791`) is 21 / diagnosis: arithmetic error made while summarizing the already-correct raw file listing (the listing itself, obtained via `find` on the `git archive`-extracted scratch copy, was complete and accurate — the error was only in the count stated in the approval-gate summary) / recovery: recounted independently with `git ls-tree -r --name-only <source-commit> -- packages/specboot/template/docs packages/specboot/template/ai-specs`, confirming 7 + 21 = 28 files total; gate re-presented with the corrected count before any write / outcome: caught before any write occurred; no file was copied under the incorrect count
ADOPT-06 / 1 / the first drafted `docs/development_guide.md` and `docs/backend-standards.md` recommended `mvn -o` (offline) as the primary build/test command even for a first run after cloning, when a first run needs network access to download dependencies into an empty local Maven repository / diagnosis: `-o` was copied from the reviewed `ADOPT-05B` permission baseline (which allowlists exactly `mvn -o validate`/`mvn -o test`, correctly, since that baseline assumes a warm cache) without separately checking whether the *documentation* should present offline as the default for a reader's very first run / recovery: both files corrected to show plain `mvn validate`/`mvn test` first, with `-o` presented as an optional speed-up "once dependencies are already cached" / outcome: caught by the operator before the ADOPT-06 content gate was approved (the gate's first presentation was interrupted by an accidental empty response, not an approval); corrected in the same drafted-but-uncommitted state
ADOPT-06 / 2 / the first drafted `docs/api-spec.yml` used OpenAPI `format: date-time` for `PriceModel.startDate`/`endDate`, and unconditionally pointed both the 404 and 500 responses at the custom `Error` schema / diagnosis: `format: date-time` in OpenAPI implies an RFC 3339 timestamp with a timezone/offset, but the actual field is a Java `LocalDateTime` serialized without one (confirmed against `PriceModel.java` and `PriceControllerTest`'s own assertions, e.g. `"2020-06-14T15:00:00"`) — copying the OpenAPI convention wholesale mismatched the real serialization; separately, the 500 response claimed the `Error` schema without accounting for the documented `HttpErrorHandler` defect (`ADOPT-06`'s own Known Risks section) that makes that handler unable to bind non-`HttpException` exceptions, and no 400 category was documented at all for Spring's own parameter-binding rejections (missing/non-numeric `brandId`/`productId`) / diagnosis root cause: the spec was written to look like a conventional OpenAPI document before being checked against the specific defects already documented in `backend-standards.md`'s own Known Risks section written moments earlier in the same step / recovery: removed `format: date-time`, documented the real `yyyy-MM-ddTHH:mm:ss` shape with examples; reworded the 500 response to state the body shape is not guaranteed, citing the same Known Risks section; added a 400 response describing Spring's default (non-custom) error body for parameter-binding failures / outcome: caught by the operator before the gate was approved; corrected in the same drafted-but-uncommitted state; YAML re-validated (`python3 -c "import yaml; yaml.safe_load(...)"`) after the fix
ADOPT-09 / 1 / the first ADOPT-09+10 checkpoint gate presentation described the staged inventory as "5 files" while separately naming the run log as a 6th "plus" item, undercounting the true 6-path inventory by describing it inconsistently rather than as one flat count / diagnosis: enumeration slip while summarizing an already-correct file list (all 6 paths were named correctly in the text, but the stated count of "5" excluded the run log despite it being staged) / recovery: re-derived the exact inventory directly from `git status --porcelain` (6 paths: 3 repaired agents, 1 new agent, `openspec/config.yaml`, the run log), corrected count used in the re-presented gate / outcome: caught before any commit; no incorrect count reached a commit or the ledger
```
