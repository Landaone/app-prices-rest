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
| `ADOPT-02` | `01-prerequisites-and-install.md` | PASS — checkpoint pending | 2026-08-15 |
| `ADOPT-03` | `01-prerequisites-and-install.md` | PASS — checkpoint pending | 2026-08-15 |
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

---

## Improvement proposals

| # | Checkpoint | Target file | Proposal | Status (`proposed` / `accepted` / `rejected` / `applied-in-change-<id>`) |
|---|---|---|---|---|
| 1 | ADOPT-00 (this run) | `specboot-adoption/bootstrap-kit/discovery/claude.md` | The Entries table's "Points to" column (`../../.specboot/bootstrap/skills/specboot-adopt`) and the verbatim `SPECBOOT-BOOTSTRAP` block text (`.specboot/bootstrap/SPECBOOT_ADOPTION_GUIDE.md`) still describe the deferred packaged-snapshot container path. `.specboot/bootstrap/` is never created under the current, sole source-linked delivery mode (per `09-bootstrap.md`, `bootstrap-and-debootstrap.md`, and `bootstrap-kit/README.md`, all of which state entries "point at the external source"). This run resolved the discrepancy by pointing the symlink directly at the external absolute source path and rewriting the CLAUDE.md block to resolve the source via `.specboot/local/` instead of a hardcoded container path. Recipe should be updated to match the source-linked-only mode so future runs don't have to re-derive this. | proposed |

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
- Result: PASS / **FAIL — adoption stops**

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
```

## Correction record

```text
Step / attempt / failure / diagnosis / recovery / outcome:
ADOPT-00 / 1 / discovery/claude.md's Entries table and delimited block reference a `.specboot/bootstrap/…` container path that the sole source-linked delivery mode never creates / diagnosis: recipe file predates or was not updated alongside the source-linked-only deferral documented in 09-bootstrap.md, bootstrap-and-debootstrap.md, and bootstrap-kit/README.md / recovery: pointed the symlink and CLAUDE.md block at the external source directly instead of the never-created container path, per the authoritative phase-file and reference-doc statements; recorded as improvement proposal #1 rather than editing the canonical source / outcome: provisioning proceeded correctly, discrepancy preserved as a proposal for the canonical source's maintainers
ADOPT-00 / 2 / fresh-session evidence written into this run log recorded three resolved absolute machine paths (the canonical source path in the drift-check row and resume evidence; this project's own absolute checkout path in the fresh-session discovery outcome) / diagnosis: `09-bootstrap.md`'s evidence-to-record clause ("the statement that the local source path is resolved per machine and is not committed. Never the resolved absolute path... never manifest content") and the run log's own pre-existing "Local source path resolution" field state the principle applies to portable, committed evidence generally, not only to the manifest file narrowly — the run log is equally committed (`.specboot/adoption/` is not git-ignored) and equally travels into every clone; the drafting agent applied the rule too narrowly on first pass / recovery: the operator flagged it before the commit gate was approved (correction caught pre-commit, not post-commit); all three occurrences replaced with mechanism-only descriptions (how the path was obtained, that identity was verified) with resolved values omitted, consistent with the pre-existing "Local source path resolution" field / outcome: run log now carries portable evidence only; commit gate re-presented after this correction
ADOPT-03 / 1 / the first ADOPT-03 approval-gate presentation stated the `ai-specs/` portion of the import inventory as 15 files, when the actual count at the pinned source commit (`9f08281dae42eb65d0a349c1876e6b584fe6e791`) is 21 / diagnosis: arithmetic error made while summarizing the already-correct raw file listing (the listing itself, obtained via `find` on the `git archive`-extracted scratch copy, was complete and accurate — the error was only in the count stated in the approval-gate summary) / recovery: recounted independently with `git ls-tree -r --name-only <source-commit> -- packages/specboot/template/docs packages/specboot/template/ai-specs`, confirming 7 + 21 = 28 files total; gate re-presented with the corrected count before any write / outcome: caught before any write occurred; no file was copied under the incorrect count
```
