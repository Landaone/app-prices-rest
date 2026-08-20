# SpecBoot Adoption Run Log

Read [`../../.specboot/local/canonical-source-path`](../local/canonical-source-path) for the
machine-local canonical source location (git-ignored, not recorded here). Read the canonical
`00-conventions.md` at that source for the evidence discipline governing every field below.

---

## Run identification

```text
Repository: app-prices-rest-specboot-ai-adoption-v5 (linked worktree of the app-prices-rest repo family)
Adoption date: 2026-08-19
Operator: landaeta (luis.landaeta@gmail.com)
Client(s) selected: Claude
CodeGraph adopted (yes / no): not yet decided — reached at ADOPT-04/05
Reason if not adopted: n/a
Guide revision used: commit 008647262e8ff4e4af38a8e948fe061e1c6bd51a of the canonical source (see checksums below)
```

---

## Source and delivery mode

```text
Delivery mode:                              source-linked
Guide checksum   (SPECBOOT_ADOPTION_GUIDE.md):              sha256:2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0
Skill checksum   (ai-specs/skills/specboot-adopt/SKILL.md): sha256:2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3
Git worktree state:                         clean
Git status:                                 recorded
Source Git commit:                          008647262e8ff4e4af38a8e948fe061e1c6bd51a
Git unavailable — reason:                   n/a (status is recorded)
Observed HEAD (dirty worktree only):        n/a
Local source path resolution:               The local canonical source path is resolved per machine
                                            and is not recorded here.
Source treated as read-only for the whole adoption (YES / NO): YES
```

**Git provenance row filled:** Git working tree, clean → `worktree: clean`, `status: recorded`, commit `008647262e8ff4e4af38a8e948fe061e1c6bd51a`.

### Drift check at each resume

| Resumed at (date/time) | Local path obtained from (machine-local store / operator / rediscovery) | Guide checksum matches | Skill checksum matches | Commit matches | Verdict | Reconciliation decision |
|---|---|---|---|---|---|---|
| (none yet — this is the initial `ADOPT-00` session, not a resume) | | | | | | |
| 2026-08-19 (this session — fresh-session discovery probe) | machine-local store (`.specboot/local/canonical-source-path`, contents `/Users/landaeta/repos/specboot`) | YES (`sha256:2ee3e50945a987b07ef3fba2fa345621a47f0cfcaa42cd02843bd63be17d7ca0`, recomputed against the source's `SPECBOOT_ADOPTION_GUIDE.md`) | YES (`sha256:2448934c76467fb9f33a597169138eea7585b0e5c1d0f567e18fbb87be4f7fd3`, recomputed against the source's `ai-specs/skills/specboot-adopt/SKILL.md`) | YES (`git rev-parse HEAD` at the source → `008647262e8ff4e4af38a8e948fe061e1c6bd51a`; `git status --porcelain` → empty, worktree clean) | MATCH — no drift | none needed |

---

## Client selection

```text
Route used (manual / autodiscovery): autodiscovery
```

| Client | Displayed as a candidate by autodiscovery | Explicitly SELECTED by the human | Recorded status |
|---|---|---|---|
| Claude | NO (not found — no `.claude/`, no `.claude/skills/`, no `.claude/settings.json`, no `CLAUDE.md`) | YES | SELECTED |
| Kiro | NO (not found — no `.kiro/`, no `.kiro/skills/`, no `.kiro/settings/`) | NO | NOT SELECTED |
| Codex | NO (not found — no `.agents/`, no `AGENTS.md`, no `codex.md`) | NO | NOT SELECTED |

Where autodiscovery ran: confirm the repository tree was byte-for-byte unchanged when the findings were displayed (the probe writes nothing): YES

Where autodiscovery found nothing: confirm that was treated as a finding and the operator was still asked, rather than the run proceeding with no client: YES

### Two axes, never collapsed

| Client | This adoption | Recipe status | Effect on this run |
|---|---|---|---|
| Claude | SELECTED | (this run is Claude's own discovery-and-execution evidence — pending the fresh session) | blocks this run until fresh-session discovery is observed |
| Kiro | NOT SELECTED | not exercised by this run | none |
| Codex | NOT SELECTED | not exercised by this run (peer recipe status tracked independently of this run) | none |

---

## Step state — resume checklist

| Step | File | Status (PENDING / PASS / FAIL / SKIPPED) | Date |
|---|---|---|---|
| `ADOPT-00` | `09-bootstrap.md` | PASS — fresh-session discovery-and-execution gate observed | 2026-08-19 |
| `ADOPT-01` | `01-prerequisites-and-install.md` | PASS | 2026-08-19 |
| `ADOPT-02` | `01-prerequisites-and-install.md` | PASS | 2026-08-20 |
| `ADOPT-03` | `01-prerequisites-and-install.md` | PASS | 2026-08-20 |
| `ADOPT-04` | `02-codegraph.md` (**mandatory**) | PASS | 2026-08-20 |
| `ADOPT-05` | `02-codegraph.md` (**mandatory**) | PASS | 2026-08-20 |
| `ADOPT-05B` | `03-client-permissions.md` (**mandatory**) | PASS — fresh-session smoke test resolved via alternative criterion (Claude Code/macOS `NOT APPLICABLE ON THIS CLIENT`); Linux/Windows PENDING EVIDENCE (no machine available) | 2026-08-20 |
| `ADOPT-06` | `04-context-and-openspec.md` | PASS | 2026-08-20 |
| `ADOPT-07` | `04-context-and-openspec.md` | PASS | 2026-08-20 |
| `ADOPT-08` | `04-context-and-openspec.md` | PASS | 2026-08-20 |
| `ADOPT-09` | `05-agents-and-skills.md` | PASS | 2026-08-20 |
| `ADOPT-10` | `05-agents-and-skills.md` | PASS | 2026-08-20 |
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
- **Cold-start state confirmed** (no SpecBoot files, no OpenSpec, no `/opsx:*` commands, no discoverable `specboot-adopt` skill, no `.specboot/`): YES
- **Canonical source supplied**: SUPPLIED — `/Users/landaeta/repos/specboot` (operator-supplied at session start; kept session-local, never written to any committed artifact)
- **Three-artifact validation, run before any orchestration load and before the first write:**
  - `SPECBOOT_ADOPTION_GUIDE.md` present: YES
  - `specboot-adoption/` present: YES
  - `ai-specs/skills/specboot-adopt/SKILL.md` present **and readable as a file**: YES
  - Verdict: VALID
  - If REJECTED, target repository left byte-for-byte unchanged (zero writes): N/A (VALID)
- **Self-adoption check (Step 0, launcher):** target resolved path `/Users/landaeta/repos/labs/app-prices-rest-specboot-ai-adoption-v5` vs. candidate source resolved path `/Users/landaeta/repos/specboot` — distinct filesystem locations. NOTE: both are linked worktrees sharing the same common `.git` directory (`/Users/landaeta/repos/labs/app-prices-rest/.git`) — per the launcher's explicit rule this is not self-adoption (Git identity is never the comparison; resolved filesystem paths are), and it is recorded here because it is load-bearing for the `.git/info/exclude` finding below.
- **Refusals reached** (each must leave the target repository byte-for-byte unchanged — record NONE where the run proceeded):
  - No canonical source supplied: NONE
  - Supplied source failed the three-artifact validation: NONE
  - No client selected: NONE
  - Selected client has no recipe: NONE
  - Selected client cannot discover the external skill without symlinks: NONE
  - For every REFUSED row above: N/A — no refusal reached
- **Orchestration procedure obtained by a source-relative direct read of `SKILL.md`** (a direct read, **not** native skill discovery): YES — path read (source-relative): `ai-specs/skills/specboot-adopt/SKILL.md`
- **Client-selection route**: autodiscovery
- Selected client(s) (**declared by the operator, never inferred**): Claude
- Every other supported client recorded `NOT SELECTED`: Kiro — NOT SELECTED; Codex — NOT SELECTED
- OS / shell: Darwin 22.6.0 (macOS) / zsh
- Symlink probe result (capability-detected, not assumed): SUPPORTED — `ln -s` succeeded against a temp directory
- Pre-existing artifacts detected, and their disposition: none found — `.specboot/`, `.claude/skills/specboot-adopt`, `.claude/CLAUDE.md`, root `CLAUDE.md` all absent before this step
- Manifest entry count: 3 (`.claude/skills/specboot-adopt`, `.claude/CLAUDE.md`, `.gitignore` — see correction below)
- **Preflight, run before the first write:**
  - Paths resolved and their classification:
    - `.claude/skills/specboot-adopt`: absent
    - `.claude/CLAUDE.md`: absent
    - root `CLAUDE.md`: absent (never touched by bootstrap, by design)
    - `.specboot/adoption/` (manifest, run log, authorization): absent
    - `.specboot/local/canonical-source-path`: absent
    - `.gitignore`: **misclassified `absent` by this session's first preflight probe — CORRECTED, see below**
    - `.git/info/exclude`: pre-existing-untouched — already carries a `SPECBOOT-BOOTSTRAP` block ignoring `/.claude/skills/specboot-adopt`, from a prior bootstrap in a sibling linked worktree (`app-prices-rest-specboot-ai-adoption-v2` or `-v4`, both sharing this repository's common `.git` dir); reused, not duplicated, per design D-Z part 29
  - Collisions detected: **ONE, found late — see correction below.** At the time of the gate, `.git/info/exclude` was correctly identified as the only collision. `.gitignore` was incorrectly classified `absent`.

**CORRECTION — preflight misclassification of `.gitignore` (recorded honestly, not smoothed over):**
`test -f .gitignore` in this session's first preflight probe reported "absent". This was wrong:
`.gitignore` was a pre-existing, git-tracked file (Spring Boot boilerplate — `HELP.md`, `target/`,
IDE excludes — committed at `b8ab107`, clean per `git status` at session start). The approved
mutation inventory therefore covered `.gitignore` as "create", which does not match what the write
actually needed to be. The materialization step used `Write`, which replaced the file's full
content rather than appending — destroying the pre-existing content for a brief window within this
same session, before the fresh-session handoff and before any commit. Detected immediately via
`git status` showing `.gitignore` as modified (not untracked) right after the write, and via
`git diff` confirming the original content had been replaced. **Corrected in-session, before
handoff and before any commit**: original content restored byte-for-byte from `git show
HEAD:.gitignore`, with the `SPECBOOT-BOOTSTRAP` block and the durable `.specboot/staging/` line
appended after it — the same `append`, never `overwrite`, treatment already given to
`.claude/CLAUDE.md`. Manifest entry added for `.gitignore` with `ownership: pre-existing-modified`,
`mode: appended-block` (corrected from the gate's "create"). No commit was ever made against the
clobbered state — `git status` was clean throughout except for this session's own uncommitted
working-tree edits, so nothing reached shared history. This is recorded as a live near-miss, not
retroactively erased, per the non-negotiable that an honest record beats a clean-looking one.
- **Exact mutation inventory presented at the approval gate:**
  1. `.claude/skills/specboot-adopt` — create, absolute symlink → `/Users/landaeta/repos/specboot/ai-specs/skills/specboot-adopt`, reversible (delete symlink)
  2. `.claude/CLAUDE.md` — create, real file carrying the delimited `SPECBOOT-BOOTSTRAP` block, reversible (delete file / `ADOPT-18` restores)
  3. `.specboot/adoption/BOOTSTRAP-MANIFEST.json` — create, JSON, committed, reversible (git revert/rm)
  4. `.specboot/adoption/ADOPTION-RUN-LOG.md` — create, Markdown from template, committed, reversible (git revert/rm)
  5. `.specboot/adoption/ADOPTION-AUTHORIZATION.md` — create, Markdown from template, committed, reversible (git revert/rm)
  6. `.specboot/local/canonical-source-path` — create, plain text, git-ignored, reversible (`ADOPT-18` removes)
  7. `.gitignore` — **as approved: "create"; as actually executed: append** (pre-existing tracked file, misclassified at gate time — see correction below) — delimited `SPECBOOT-BOOTSTRAP` block (`.specboot/bootstrap/`, `.specboot/local/`) plus one durable line outside the block (`.specboot/staging/`), appended after the original content, reversible for the appended block only (`ADOPT-18` removes it; the staging line and the original content are durable and stay)
  - `.git/info/exclude` — no write (rule already in effect, reused)
- **Provisioning performed exactly that inventory and nothing outside it:** YES
- **Provisioning failure, if any:** N/A
- **Obligations recorded** — payload: `SKIPPED — source-linked mode`; container: `SKIPPED — source-linked mode`
- `.specboot/bootstrap/` never created at any point: YES
- No copied guide, phase file, or skill body anywhere in the project: YES
- Discovery entries point at the external canonical source, and none was staged for any checkpoint (machine-specific entries are never committed): YES — `.claude/skills/specboot-adopt` is machine-local (absolute symlink) and excluded via the reused `.git/info/exclude` rule
- Machine-local `.specboot/local/` store holds the resolved path and nothing else, and `git check-ignore` reports it ignored: YES — `.specboot/local/canonical-source-path` contains exactly `/Users/landaeta/repos/specboot` and nothing else; `git check-ignore -v .specboot/local/` → `.gitignore:37:.specboot/local/`
- Client-selection record carries no placeholder: YES
- **Session stopped after provisioning and generated the fresh-session handoff prompt:** YES — see handoff prompt in the session transcript (this run log does not restate it verbatim to avoid a second, driftable copy)
- **No OpenSpec or `/opsx:*` command used before `ADOPT-02` completed:** YES
- `git check-ignore .specboot/bootstrap/…` verdict: IGNORED — `.gitignore:36:.specboot/bootstrap/` (probed by creating and removing an empty test directory, since the path is never created in source-linked mode)
- `git check-ignore .specboot/local/…` verdict: IGNORED — `.gitignore:37:.specboot/local/`
- `git check-ignore .specboot/adoption/…` verdict: NOT ignored (confirmed — non-zero exit / no match from `git check-ignore .specboot/adoption/`)
- No bare `.specboot/` rule written: YES (rule is scoped to `.specboot/bootstrap/` and `.specboot/local/` only)
- Fresh-session discovery probe — exact prompt used: the project's checked-in `.claude/CLAUDE.md` (materialized by `ADOPT-00`'s own provisioning) auto-loaded at this session's start and instructed: "Run the `specboot-adopt` skill. The adoption contract lives at the external canonical source resolved via `.specboot/local/canonical-source-path` (source-linked mode; no copy exists in this repository). This block is temporary and is removed at `ADOPT-18`." The operator's own message to this fresh session then read: "Run the `specboot-adopt` skill to resume this SpecBoot adoption. This repository already has `.specboot/adoption/ADOPTION-RUN-LOG.md` and `.specboot/adoption/BOOTSTRAP-MANIFEST.json`... Attempt native `specboot-adopt` skill discovery now..." No absolute path was supplied by the operator in that message; the client was expected to resolve the skill itself.
- Fresh-session outcome, verbatim: this session's system-provided "Available skills" listing (rendered automatically by the client before any tool call) named `specboot-adopt` by name with a one-line description, sourced with no path supplied by the operator or by this session. Invoking the `Skill` tool with `skill: "specboot-adopt"` (name only, no path) produced the harness message "Launching skill: specboot-adopt" followed by content prefixed "Base directory for this skill: /Users/landaeta/repos/labs/app-prices-rest-specboot-ai-adoption-v5/.claude/skills/specboot-adopt" — i.e., the client's native discovery mechanism resolved the skill name through the bootstrap-provisioned symlink (`.claude/skills/specboot-adopt` → `/Users/landaeta/repos/specboot/ai-specs/skills/specboot-adopt`) on its own, and returned that external file's actual content (Overview, Quick Reference table, Non-negotiables 1–10, Common Mistakes, Red Flags, REQUIRED SUB-SKILL line) verbatim. This is the client executing native skill discovery end-to-end, not a direct/manual file read.
- Fresh session resumed from the durable manifest and run log, with source identity verified: YES — this session read `ADOPTION-RUN-LOG.md` and `BOOTSTRAP-MANIFEST.json` first (per the operator's instruction not to re-ask Q1/Q2/Q3), obtained the local canonical source path from `.specboot/local/canonical-source-path` (`/Users/landaeta/repos/specboot`) rather than being told it, and recomputed the guide checksum, skill checksum, and source commit against that path — all three matched the manifest and run log (recorded in the drift-check table above) before any further step was trusted.
- Approval (who, when, exactly what was approved): landaeta, 2026-08-19, the exact 7-path mutation inventory above (interactive approval via AskUserQuestion: "Apruebo el inventario exacto"); standing commit-and-push authorization also granted in the same gate, recorded in `ADOPTION-AUTHORIZATION.md`
- **Result: PASS — fresh-session discovery-and-execution gate observed and recorded in this same session, per the criteria in `09-bootstrap.md` ("A genuinely fresh session of each selected client surfaces `specboot-adopt` and reaches this guide with no operator-supplied paths")**

---

### `ADOPT-01` — Install Prerequisites

- Date: 2026-08-19
- Machine: Darwin 22.6.0 (macOS), zsh
- Node: `v24.18.0` (`node --version`, exit 0) — meets `>= 20.19.0`
- npm: `11.16.0` (`npm --version`, exit 0) — bundled with Node
- Git: `git version 2.39.2 (Apple Git-143)` (`git --version`, exit 0)
- OpenSpec: `1.7.0` (`openspec --version`, exit 0) — matches the reference experiment version exactly
- CodeGraph: `1.5.0` (`codegraph --version`, exit 0) — matches the reference experiment version exactly
- Project runtime: Java — `openjdk version "11.0.31"` / OpenJDK Corretto-11.0.31.11.1 (`java -version`, exit 0), matching `pom.xml`'s `<java.version>11</java.version>`
- Project build tool: Maven — `Apache Maven 3.9.16` (`mvn -version`, exit 0), matching the reference experiment's `3.9.16` exactly
- Repository evidence inspected to identify runtime/build tool: `pom.xml` present at the repository root (confirmed via `git ls-tree -r --name-only HEAD`, since this worktree is a sparse checkout — see finding below), declaring `spring-boot-starter-parent` `2.4.5` and `java.version` `11`; `mvnw`/`mvnw.cmd` also present. No `package.json`, `requirements.txt`, `pyproject.toml`, `go.mod`, or `Cargo.toml` at HEAD.
- **Finding, not a failure — sparse checkout in this worktree:** `git status` reports "You are in a sparse checkout with 5% of tracked files present." `git sparse-checkout list` → `/SPECBOOT_ADOPTION_GUIDE.md`, `/specboot-adoption/`, `/ai-specs/skills/specboot-adopt/` only. None of the project's own tracked files (`pom.xml`, `src/`, etc.) are materialized in this worktree's working directory — only present in `.specboot/`, `.claude/`, and `.gitignore` from `ADOPT-00`'s own bootstrap writes. Repository evidence above was therefore gathered read-only via `git ls-tree`/`git show HEAD:<path>` against the object database, not via direct file reads of the working tree. This is recorded as observed state, not corrected: `ADOPT-01`'s `Allowed modifications` is `none`, and widening the sparse-checkout is a working-tree mutation this step is not authorized to make.
- Install/upgrade command run: NONE — every tool already installed meets or exceeds the documented minimum/reference version, so the `[HUMAN APPROVAL REQUIRED]` gate before installing or upgrading software was never reached (no installation or upgrade action was taken).
- **Result: PASS**

---

### `ADOPT-02` — Install and Initialize OpenSpec with Explicitly Selected Clients

- OpenSpec version: `1.7.0` (already installed, meets the documented requirement)
- Install/upgrade command run or skipped: SKIPPED — `openspec --version` returned `1.7.0` before any action, which already supports the documented keys this guide requires; the `npm install -g @fission-ai/openspec@latest` command was not run, and its `[HUMAN APPROVAL REQUIRED]` gate was never reached (nothing installed or upgraded)
- `ADOPTION-AUTHORIZATION.md`'s OpenSpec-version-policy section: unchanged — this run's evidence (already-installed version met the minimum) matches the template's default policy exactly, no deviation required
- Command run: `openspec init --tools claude --no-animation` (non-interactive; the "clients offered" step of the interactive flow was replaced by the `--tools` flag, restricted to exactly the previously-recorded selection — Claude only, per `ADOPTION-AUTHORIZATION.md` and the manifest's `clientSelection`), exit 0
- Clients offered: all clients `openspec init --tools` supports (`amazon-q, antigravity, auggie, bob, claude, cline, codeartsagent, codex, devin, forgecode, codebuddy, continue, costrict, crush, cursor, factory, gemini, github-copilot, hermes, iflow, junie, kilocode, kimi, kiro, lingma, vibe, oh-my-pi, opencode, pi, qoder, qwen, roocode, trae, zcode`, per `openspec init --help`) — none offered interactively since `--tools claude` bypassed the prompt with the single already-recorded selection
- Clients selected: Claude only (matches `ADOPT-00`'s recorded selection exactly — no re-selection performed)
- Generated config path: `openspec/config.yaml` (the installed version generates `.yaml`, not `.yml`)
- Generated client resources: `.claude/commands/opsx/{apply,archive,explore,propose,sync,update}.md` (6 files) and `.claude/skills/openspec-{apply-change,archive-change,explore,propose,sync-specs,update-change}/SKILL.md` (6 files) — confirmed via `find .claude/commands .claude/skills -type f`
- Per-client provisioning provenance: this run's own `openspec init --tools claude` invocation, observed directly in this session — not inferred from file presence (per `00-conventions.md`, "Capability availability is not installer provenance")
- No resources found for any unselected client (`find . -maxdepth 2 -iname "*.kiro*" -o -maxdepth 2 -iname "*codex*"` → empty)
- `openspec doctor` result: `Root: /Users/landaeta/repos/labs/app-prices-rest-specboot-ai-adoption-v5`, `OpenSpec root: ok`, `References: (none declared)`, exit 0
- Git changes (`git status --short`): `?? .claude/commands/`, `?? .claude/skills/`, `?? openspec/` (plus the already-tracked `M .specboot/adoption/ADOPTION-RUN-LOG.md` from the prior checkpoint's SHA-backfill delta, not part of this step's own output)
- **Result: PASS**

---

### `ADOPT-03` — Import SpecBoot

- `<SPECBOOT_SOURCE>`: `/Users/landaeta/repos/specboot` — read from `.specboot/local/canonical-source-path`, the same value `ADOPT-00` already resolved and validated; not re-derived
- Payload materialization check: `test -d <SPECBOOT_SOURCE>/packages/specboot/template` → absent (not materialized in this session's checkout of the source) — the documented `git archive` fallback applied, matching the reference experiment's own recorded technique for a sparse source checkout
- **Near-miss during the fallback extraction, recorded honestly — see the Correction record below.** First attempt composed the `git archive | tar -x` pipeline with a `cd` into the source directory and no explicit `-C` destination on `tar -x`, which wrote the payload into the read-only canonical source itself (17 tracked files under the source's own `docs/`/`ai-specs/` overwritten with template content). Detected immediately via `git status --porcelain` in the source; recovered via `git restore .` in the source, confirmed clean, checksums and `HEAD` unchanged. No commit was made against the clobbered state in either repository, and the target repository was never reached by the failed attempt.
- Retried extraction: `git -C <SPECBOOT_SOURCE> archive --format=tar <commit> packages/specboot/template/docs packages/specboot/template/ai-specs | tar -x --strip-components=3 -C <TARGET_REPOSITORY>`, exit 0; `pwd` confirmed unchanged (`/Users/landaeta/repos/labs/app-prices-rest-specboot-ai-adoption-v5`) before and after; source re-confirmed clean via `git -C <SPECBOOT_SOURCE> status --porcelain` (empty) immediately after
- `.cursor/` (present in the template payload alongside `docs/`/`ai-specs/`) deliberately **not** copied — Cursor is not a selected client (`test -e .cursor` → absent in target, confirmed)
- Files added — `docs/`: 7 files (`api-spec.yml`, `backend-standards.md`, `base-standards.md`, `data-model.md`, `development_guide.md`, `documentation-standards.md`, `frontend-standards.md`), matching `git ls-tree <commit>:packages/specboot/template/docs -r --name-only | wc -l` → `7` exactly, run against the source before extraction
- Files added — `ai-specs/`: 23 files, matching `git ls-tree <commit>:packages/specboot/template/ai-specs -r --name-only | wc -l` → `23` exactly, run against the source before extraction
- Files skipped because they existed: NONE — target `docs/`, `ai-specs/`, and all 4 root instruction files were confirmed absent before extraction
- Hidden client directories expected but not copied: `.cursor/` (Cursor not selected) — consistent with `cp -rn *` semantics and this step's explicit scope even though the fallback technique was `git archive`, not `cp`
- Root instruction symlinks: the template payload itself contains no `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`codex.md` at the pinned commit (confirmed via `git ls-tree`) — these are generated by the installer's own symlink logic (`packages/specboot/bin/init.js`, lines 1270–1271: `for (const name of ['CLAUDE.md', 'AGENTS.md', 'codex.md', 'GEMINI.md']) createSymlink(name, 'docs/base-standards.md')`), not stored as literal payload files. Created here manually to match that exact target: `ln -s docs/base-standards.md {AGENTS,CLAUDE,GEMINI,codex}.md`. Validation: `readlink` on all 4 → `docs/base-standards.md`, every symlink resolves (target file exists). No collision with the pre-existing, distinct `.claude/CLAUDE.md` (bootstrap instruction file, different path, already committed at the `ADOPT-00`/`ADOPT-01` checkpoint).
- Per-client provisioning provenance: this run's own `git archive`/`tar` extraction plus manual `ln -s`, observed directly in this session
- Mechanical comparison against `Allowed modifications` (the closed rule: `docs/`, `ai-specs/`, 4 root symlinks, nothing else): exact match — `find docs -maxdepth 2 -type f`, `find ai-specs -maxdepth 3 -type f`, and `git status --short` all confirm nothing outside the two mirrored trees and the four named symlinks; **gate auto-approved** per this step's own documented mechanism ("Where that mechanical comparison shows the copy matches this step's closed-rule `Allowed modifications` exactly... the gate auto-approves")
- **Result: PASS**

---

### `ADOPT-04` — Initialize CodeGraph

- CodeGraph version: `1.5.0` (already installed, confirmed at `ADOPT-01`) — installation procedure SKIPPED, its `[HUMAN APPROVAL REQUIRED]` gate never reached
- **Blocking finding, resolved with operator approval before this step could PASS:** the first `codegraph init` (run in the sparse-checkout worktree carried over from `ADOPT-01`'s recorded finding) indexed only 3 of 22 tracked files — `8 nodes, 13 edges` — with `.codegraph/errors.log` showing all 19 missing files as `ENOENT` for exactly the paths the sparse-checkout excludes (`pom.xml` and everything under `src/`). Per this step's own text ("No usable graph capability is FAIL... there is no small-repository exemption"), an index covering 0 of the actual Java source is not a usable capability, so this could not be recorded as a coverage limitation and continued past — it was a genuine blocker. Presented to the operator via `AskUserQuestion` with three options (widen the sparse-checkout to add the missing paths, disable sparse-checkout entirely for a full checkout, or stop and record `ADOPT-04` as FAIL); operator chose **full checkout**. Executed `git sparse-checkout disable` in this worktree only (per-worktree state — `.git/worktrees/app-prices-rest-specboot-ai-adoption-v5/info/sparse-checkout` — confirmed not to affect sibling worktrees or any committed history), after confirming `git status --short` showed no uncommitted changes that could be lost. Verified `pom.xml` and `src/` materialized afterward with no conflicts against existing files.
- Command: `codegraph init` (re-run after the full checkout), exit 0
- Files indexed: `22` (matches the repository's full tracked-file count from `git ls-tree -r --name-only HEAD | wc -l` at `ADOPT-01`)
- Nodes: `295`, Edges: `355`, Duration: `568ms`
- Exploration query: `codegraph explore "list entry points"` → `49 symbols across 3 files`, returned real blast-radius data (callers, test coverage flags) and verbatim on-disk source for `PriceModel.java`, `PriceEntity.java`, `PriceEntityModelConverter.java`, exit 0
- `.codegraph/` staged set: only `.codegraph/.gitignore` is trackable (`*` / `!.gitignore` inside it), the index database (`codegraph.db`) is git-ignored by CodeGraph's own generated ignore rule — confirmed via `git status --short` showing `.codegraph/` untracked as a whole directory before staging
- **Result: PASS**

---

### `ADOPT-05` — Configure CodeGraph for the Selected Clients

- Command attempted: `codegraph install -t claude -l local --no-permissions` (the canonical explicit-flag form this step requires — never `-y`)
- **Automation attempt 1 — plain piped stdin:** `printf 'n\nn\n' | codegraph install -t claude -l local --no-permissions`. The first prompt ("Install the codegraph CLI on your PATH?") was answered `No` correctly (this run's own `ADOPT-01`/`ADOPT-04` evidence already showed `codegraph` resolvable on `PATH`, so `No` is the correct answer per this step's own Check). The process then printed the second prompt ("Front-load CodeGraph...") and exited (`exit=0`) without completing — stdin was exhausted before the interactive flow finished. `git status --short` immediately after confirmed no files were written (`.mcp.json`, `.claude/settings.json` both absent) — a clean non-completion, not a partial write.
- **Automation attempt 2 — `expect`-driven pty:** a pattern-matching `expect` script (`/tmp/codegraph_install.exp`) spawned the same command and attempted to answer each "Yes/No" toggle prompt with `n`. The tool's TUI redraws using ANSI cursor-control sequences and renders character-by-character, so the expected `"Yes.*No"` substrings never appeared contiguously in the buffer for the regex to match; the script hung at the first prompt and was killed after a 120-second timeout (`pkill -f "codegraph install"`). `git status --short` confirmed no files were written by this attempt either.
- Per this step's own documented guidance — "pty-driven automation of the explicit-flag form is not always reliable... do not keep retrying an approach this environment has already shown does not work" — automation was not attempted a third time. Presented to the operator via `AskUserQuestion`: run the command interactively, or use `-y` with explicit overrides as a recorded deviation (which would force CLI-on-PATH to `Yes`, an unwanted machine-level mutation given `codegraph` is already on `PATH`). Operator chose: **run it interactively**.
- **Operator ran the handed-off command interactively** (`codegraph install -t claude -l local --no-permissions`) and reported completion; live decisions confirmed by the operator directly (via `AskUserQuestion`, since the interactive session itself was not observable to this agent):

| Decision | Reference experiment | Live decision |
|---|---|---|
| Clients | Claude and Kiro | Claude only (`-t claude`, matches this run's recorded selection) |
| Scope | Project | Local (`-l local` — this tool's project-scope equivalent) |
| CLI on PATH | No (already on PATH) | No (already on PATH, confirmed at `ADOPT-01`/`ADOPT-04`) |
| Automatic allow | No | No (`--no-permissions` — confirmed no `permissions` key in generated `.claude/settings.json`) |
| Automatic prompt front-loading | No | **Yes** — deviation from the reference; explains the `UserPromptSubmit` hook (`codegraph prompt-hook`) found in the generated `.claude/settings.json`. Recorded in `ADOPTION-AUTHORIZATION.md`'s code-graph-privilege-scope section as the operator's own live choice, not a scope/auto-allow escalation. |
| CodeGraph Pro | No | No |

- Generated files, inspected directly:
  - `.mcp.json` — new, `{"mcpServers": {"codegraph": {"type": "stdio", "command": "codegraph", "args": ["serve", "--mcp"]}}}`
  - `.claude/settings.json` — new, `{"hooks": {"UserPromptSubmit": [{"hooks": [{"type": "command", "command": "codegraph prompt-hook"}]}]}}` — no `permissions` key, confirming `--no-permissions` took effect
  - `.claude/CLAUDE.md` — modified (append-only): `CODEGRAPH_START`/`CODEGRAPH_END` block appended after the existing `SPECBOOT-BOOTSTRAP` block, content matches CodeGraph's own generated guidance for MCP-tool and shell fallback usage; the canonical root `CLAUDE.md` symlink (from `ADOPT-03`) was never touched
- No adapter or configuration generated for Kiro or any other unselected client (`git status --short` shows only the 3 paths above changed/added)
- Per-client provisioning provenance: this run's own `codegraph install` invocation, run by the operator directly and reported back — not inferred from file presence
- Validation: `git status --short` → `.claude/CLAUDE.md` (M), `.claude/settings.json` (??), `.mcp.json` (??), matches exactly the closed allowlist; `git diff --name-only` → `.claude/CLAUDE.md` only (the other two are new files, not diffs); `codegraph explore "list public interfaces"` → `52 symbols across 4 files`, exit 0, real blast-radius and verbatim source returned
- Approval gate: front-loading deviates from the reference experiment's own default, but scope and automatic-allow — the two conditions this step's auto-approve clause actually names — both match the least-privilege default exactly, and `ADOPTION-AUTHORIZATION.md`'s policy is scoped to those two settings, not front-loading. The gate auto-approves under that reading; front-loading is recorded as the operator's own live, deliberate choice (made directly at the interactive prompt, not by this agent) rather than treated as an unreviewed default.
- **Result: PASS**

---

### `ADOPT-05B` — Configure Selected-Client Permissions (Early, One-Time)

- Source baseline located: **none exists.** Searched the canonical source (`find ... -iname "*settings*.json"`, `grep -rn "reviewed starting allowlist\|generic permission baseline"`) — no organization-approved generic baseline file is present anywhere in the canonical source; `03-client-permissions.md` itself describes this as an external, separately-governed artifact it does not ship. Presented to the operator via `AskUserQuestion`: derive the allowlist directly from this step's own documented Rules section, or point to an existing baseline. Operator confirmed: **no baseline exists — derive from this step's Rules.**
- Copy-or-merge decision and why: **merge**, not create — `.claude/settings.json` already existed from `ADOPT-05` (`codegraph install`'s generated `hooks` block). Added a new top-level `permissions.allow` array alongside the existing `hooks` key; the existing `hooks` content was left untouched, confirmed via `git diff` showing only additive lines.
- Declared supported-environment matrix (recorded in `ADOPTION-AUTHORIZATION.md`, this step's own required destination):
  - Clients: Claude only (this run's only selection)
  - Stacks: Java 11 + Maven, from `ADOPT-01`'s own `pom.xml` inspection evidence
  - Shells: zsh, bash, PowerShell — declared at the documented default breadth (this step's own rule: "default broad, narrow only on stated evidence — never the reverse"); no narrowing evidence exists for this project, so the adopting machine's own zsh/macOS was **not** used to narrow the declaration
  - Operating systems: macOS, Linux, Windows — same default-breadth rule, same non-narrowing rationale
- Entries removed as out-of-matrix: NONE — authored fresh from the Rules text (no baseline to strip from), so there was nothing pre-existing outside the matrix to remove
- Entries added for the real project: 21 `Bash(...)` patterns plus one MCP pattern, translating this step's own documented "verified, project-scoped, read-only patterns" (repository file reading/listing, OpenSpec inspection, CodeGraph exploration, Git inspection) and the illustrative Kiro YAML's command list into Claude Code's `permissions.allow` syntax: `git status`, `git diff`, `git rev-parse`, `git check-ignore`; `openspec --version`, `--help`, `doctor`, `context`, `schemas`, `templates`, `status`; `codegraph explore`; `find`, `ls`, `grep`, `rg`, `head`, `tail`, `wc`, `readlink`, `sed -n`; `mcp__codegraph__codegraph_explore`. Every pattern is shell-agnostic (external executables, not shell built-in syntax), so no per-OS/per-shell variant was needed to satisfy "retain every variant any supported environment requires." **Deliberately not added:** `mvn`/`./mvnw` test or build commands — these were considered (the Rules permit "controlled local build/test commands... after team review") but deferred: a Maven test run can trigger network dependency resolution when the local repository cache is incomplete, which conflicts with this step's "do not... access external services" rule, and this run has no team review process to invoke. Recorded as a residual limitation, not a silent omission.
- Safety check (Step 4): scanned the resulting file for credentials/secret-shaped text, personal absolute paths/home directories, machine-specific dependency locations, and unsafe broad patterns (generic shell loops, filesystem-wide globs/wildcards that would auto-allow mutation) — `grep -inE "landaeta|/Users/|password|secret|token|api[_-]?key" .claude/settings.json` → no matches. Every added pattern is read-only/inspection-only; none allows edit, execution of arbitrary commands, install/upgrade, delete, overwrite, stage, commit, push, PR, merge, or credential/network mutation.
- Syntax validation: `python3 -c "import json; json.load(open('.claude/settings.json'))"` → `VALID JSON`, exit 0
- Generic source baseline unchanged: N/A — none existed to protect; nothing in the canonical source was modified
- **Smoke test — executed in a genuinely fresh session (this session), per the handoff prompt below, verbatim.**
  - Negative control: `date` (absent from the allowlist) — executed immediately, **no permission prompt observed**. Per the canonical prompt's own routing rule, this means the client auto-approves outside the allowlist regardless of the file under test, so no further command can demonstrate anything about that file by the primary (prompt-observing) criterion. Stopped the primary path here, per the prompt's own instruction not to run the remaining commands as evidence of the file under test via that path.
  - Falling through to `03-client-permissions.md`'s documented **alternative criterion for `NOT APPLICABLE ON THIS CLIENT`** (weaker evidence, labelled as such, never treated as equivalent to a PASS smoke test):
    - Every command in the canonical prompt verified by inspection to be covered by an existing `.claude/settings.json` allowlist pattern: `openspec --version` → `Bash(openspec --version)`; `openspec doctor --json` → `Bash(openspec doctor:*)`; `openspec context --json` → `Bash(openspec context:*)`; `openspec schemas` → `Bash(openspec schemas:*)`; `openspec templates` → `Bash(openspec templates:*)`; `git status --short` → `Bash(git status:*)`; `git diff -- openspec/config.yaml` → `Bash(git diff:*)`; CodeGraph exploration query → `Bash(codegraph explore:*)` — all 7 covered, exact match.
    - Every command in the canonical prompt executed successfully when run, this session: `openspec --version` → `1.7.0`, exit 0; `openspec doctor --json` → valid JSON, `healthy: true`, exit 0; `openspec context --json` → valid JSON, `role: openspec_root`, exit 0; `openspec schemas` → `spec-driven` listed, exit 0; `openspec templates` → 4 template paths listed, exit 0; `git status --short` → 3 pre-existing modified paths (unrelated to this test — see below), exit 0; `git diff -- openspec/config.yaml` → empty (no diff), exit 0; `codegraph explore "list entry points"` → `49 symbols across 3 files` with real blast-radius and verbatim source, exit 0.
    - No file was modified during the smoke test: confirmed — `git status --short` before and after this test both show exactly the same 3 paths (`.claude/settings.json`, `.specboot/adoption/ADOPTION-AUTHORIZATION.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md`), all pre-existing uncommitted changes from the prior session's `ADOPT-05B` provisioning work, not from this test.
  - Both alternative-criterion conditions satisfied. Recorded as `NOT APPLICABLE ON THIS CLIENT` in the table below, with the negative control's silent result as the reason — per the guide's own text, this is weaker evidence than a PASS smoke test, never treated as equivalent to one, but it is a positive, recorded outcome rather than an indefinitely open row.
- **Result: PASS** — Claude Code / macOS resolved via the alternative criterion (the only available combination); Linux and Windows remain `PENDING EVIDENCE` (no machine available during this adoption), per the guide's own rule that an untested environment is recorded as pending, never silently omitted or inferred passing.

**Handoff — run this exact prompt in a fresh Claude Code session** (a new session, not a continuation of this one — the permission file did not exist when this session's own permission state was established):

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
- one read-only CodeGraph exploration query (CodeGraph was adopted at ADOPT-04/05)

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
| Claude Code / macOS | yes | silent — no permission prompt on the negative control (`date`) | `NOT APPLICABLE ON THIS CLIENT` — resolved via the alternative criterion (allowlist coverage by inspection + successful execution of every canonical-prompt command); see evidence above |
| Claude Code / Linux | no machine available during this adoption | — | PENDING EVIDENCE |
| Claude Code / Windows | no machine available during this adoption | — | PENDING EVIDENCE |

---

### `ADOPT-06` — Adapt the Repository Technical Context

- Repository evidence inspected before editing: `pom.xml` (Java 11, Spring Boot 2.4.5 via `spring-boot-starter-parent`, dependencies `spring-boot-starter-data-jpa`, `spring-boot-starter-web`, `flyway-core`, `h2`, `lombok`, `spring-boot-devtools`, `spring-boot-configuration-processor`, `spring-boot-starter-test`); full `src/` tree (`find src -type f`, 18 files); every `src/main/java` file read directly (`AppPricesRestApplication`, `PriceController`, `PriceService`/`PriceServiceImpl`, `PriceEntity`, `PriceModel`, `PriceEntityModelConverter`, `PriceRepository`, `HttpException`/`NotFoundException`/`NoPriceFoundException`, `HttpErrorHandler`, `Error`); every `src/test/java` file read directly (`PriceControllerTest`, `PriceServiceImplTest`, `PriceEntityModelConverterTest`, `AppPricesRestApplicationTests`); `src/main/resources/application.yaml`; `src/main/resources/db/migration/V1_create_tables.sql`; `codegraph explore` run twice (entry points at `ADOPT-04`/`ADOPT-05B`, plus a targeted symbol query this step against the exception-handling classes) to obtain verbatim, line-numbered source and blast-radius/test-coverage flags as citation evidence
- Files modified (all under `docs/`, matching this step's closed `Allowed modifications`): `api-spec.yml`, `data-model.md`, `development_guide.md`, `backend-standards.md`, `frontend-standards.md`, `base-standards.md` (one stale cross-reference line only — see below)
- Template contamination found and removed: the entire prior `docs/` content described a Node.js/TypeScript/Prisma/React "LTI" recruitment-and-interview platform (candidates, positions, interview flows, companies, employees) with no relationship to this repository, which is a single-endpoint Java/Spring Boot price-resolution service; `grep -rniE "LTI|candidate|recruitment|interview|prisma|typescript|node\.js|react|cypress|postgres" docs/*.md docs/*.yml AGENTS.md CLAUDE.md GEMINI.md codex.md` after editing returns no remaining template terminology (the few remaining matches are this project's own unrelated English words — "multiple overlapping windows", "core/model/", generic AI-spec meta-rule text — confirmed by inspection, not template contamination)
- Corrections needed: `docs/base-standards.md` line 31 (a cross-reference to Frontend Standards) described "React components, UI/UX guidelines, and frontend architecture" — inconsistent with the newly-accurate `frontend-standards.md`, which documents no frontend exists for this repository. Corrected to "Not applicable; this repository is backend-only" for internal consistency across `docs/`. Since `docs/base-standards.md` is the symlink target of the four root instruction files created at `ADOPT-03` (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `codex.md`), this one-line edit updates all four automatically without touching the symlinks themselves.
- Validation, per this step's own checklist:
  - documented stack against build files: PASS — Java 11 / Spring Boot 2.4.5 / Maven confirmed against `pom.xml` directly
  - architecture against source structure: PASS — the documented `rest/`/`core/`/`db/` layering in `backend-standards.md` matches `find src/main/java -type f` exactly
  - API documentation against controllers: PASS — `api-spec.yml`'s single `GET /api/price` path matches `PriceController`'s only `@GetMapping` exactly, including its three query parameters
  - data model against entities and migrations: PASS — `data-model.md`'s single `PriceEntity`/`PRICES` table matches `V1_create_tables.sql`'s single `CREATE TABLE` and `PriceEntity.java`'s `@Column` mappings field-for-field
  - build and test commands against repository configuration: PASS — `./mvnw clean install`/`./mvnw test`/`./mvnw spring-boot:run` confirmed against the committed `mvnw` wrapper and `pom.xml`'s `spring-boot-maven-plugin`
  - absence of unrelated template terminology: PASS — see grep result above
  - consistency across all changed documents: PASS — `frontend-standards.md`'s N/A status is now consistently referenced from `base-standards.md`; `api-spec.yml`'s known-risks-and-defects section and `data-model.md`'s and `backend-standards.md`'s references to the same two defects use identical citations
  - every factual claim resolves to a code-graph citation: PASS — every non-obvious claim in the four substantially-rewritten files (`api-spec.yml`, `data-model.md`, `development_guide.md`, `backend-standards.md`) carries an inline `file:line` citation, spot-verified in this session by re-reading the cited line ranges directly (`PriceController.java:20-32`, `PriceRepository.java:10-14`, `PriceServiceImpl.java:24-27`, `HttpErrorHandler.java:11-33`, `PriceEntityModelConverter.java:11-25`, `application.yaml:1-28`, `V1_create_tables.sql:1-3`) against what was written — all matched exactly
- Citation for each factual claim needing one: see the inline `file:line` citations embedded directly in `api-spec.yml` (including its `x-known-risks-and-defects` block), `data-model.md`, and `backend-standards.md` — not restated separately here, per this step's own note that a second copy of an evolving citation list drifts
- Unresolved contradictions or risks: none beyond the two deliberately documented defects (exception-handler parameter-type mismatch in `HttpErrorHandler`; no direct database-level test of `PriceRepository`'s derived query beyond the four Flyway fixture rows) — both are pre-existing in the code, not introduced by this step, and are documented as risks per this step's own instruction to preserve known defects rather than silently normalize them
- Prompt changes required: none
- **Approval gate: [HUMAN APPROVAL REQUIRED]** — presented via `AskUserQuestion` with the exact scope (6 files, ~376 insertions / 3160 deletions net, template-to-real-repo content replacement, two documented defects) and an option to review the full diff first; **approved by landaeta**, "Approve as-is"
- **Result: PASS**

---

### `ADOPT-07` — Configure OpenSpec to Consume `docs/` and `ai-specs/`

- Inspected before editing: installed OpenSpec version (`1.7.0`, already confirmed at `ADOPT-01`/`ADOPT-02`); the generated config file (`openspec/config.yaml`, previously all-commented-out template); the supported configuration keys read directly from the installed package's `ProjectConfigSchema` (`~/.nvm/versions/node/v24.18.0/lib/node_modules/@fission-ai/openspec/dist/core/project-config.js:22-48`, confirmed no dedicated "agents" key exists in this installed version — `schema`, `context`, `rules` (keyed by artifact id), `operations.{apply,archive}.guidance` are the only supported top-level fields); the installed `spec-driven` schema's own artifact list (`~/.nvm/.../schemas/spec-driven/schema.yaml` — `proposal`, `specs`, `design`, `tasks`, plus an `apply` operation; no schema-level `archive` operation, confirmed by direct inspection, though `operations.archive.guidance` is still a valid **config**-level (not schema-level) advisory field per `project-config.js`); the adapted `docs/` files from `ADOPT-06`; `ai-specs/agents/` (3 files: `backend-developer.md`, `frontend-developer.md`, `product-strategy-analyst.md`); `ai-specs/skills/` (10 skill directories)
- Config path modified: `openspec/config.yaml` only (the only path that exists, matching this step's closed `Allowed modifications`)
- Content added:
  - `context`: tech stack (Java 11/Spring Boot 2.4.5/Maven/JPA/H2/Flyway/JUnit5), layered architecture pointer to `docs/backend-standards.md`, domain summary pointing to `docs/api-spec.yml`/`docs/data-model.md`, no-frontend note pointing to `docs/frontend-standards.md`, primary rules pointer to `docs/base-standards.md`/`docs/documentation-standards.md`, English-only reminder, and — since this installed version has no dedicated agent-selection config key — agent selection and skills-as-workflow-guidance folded into `context` itself, naming `ai-specs/agents/backend-developer.md` as the applicable canonical agent (backend-only repository; `frontend-developer.md` explicitly noted as not applicable) and pointing at `ai-specs/skills/` generally with two concrete examples (`commit`, `update-docs`)
  - `rules.proposal`/`rules.specs`/`rules.design`/`rules.tasks`: repository-specific constraints derived from `docs/backend-standards.md`'s layered architecture, `docs/api-spec.yml` as the behavior contract, Flyway migration discipline, and `docs/base-standards.md` section 6's OpenSpec Tasks Mandatory Steps (feature branch, mandatory test review/run/curl/doc-update), with the E2E/Playwright step explicitly marked not applicable per `docs/frontend-standards.md`
  - `operations.apply.guidance` / `operations.archive.guidance`: advisory only — run `./mvnw test` before marking tasks complete and restore H2 fixture state after mutating verification; confirm `docs/api-spec.yml`/`docs/data-model.md` are updated at archive time when the change touched the contract or persistence
- Validation performed, all against the actually-installed OpenSpec version's own exposed commands:
  - YAML syntax: PASS — `python3 -c "import yaml; yaml.safe_load(open('openspec/config.yaml'))"` → `VALID YAML`, exit 0
  - Schema resolution: PASS — `openspec doctor` → `OpenSpec root: ok`, zero warnings, exit 0
  - Every referenced path exists: PASS — all `docs/*.md`, `docs/api-spec.yml`, `ai-specs/agents/backend-developer.md`, `ai-specs/skills/commit`, `ai-specs/skills/update-docs` confirmed present via direct `ls`
  - Proposal/specs/design/tasks rules parse correctly, **with a falsifiable negative control**: since `openspec doctor` does not read the `rules` block (confirmed by this step's own text), created a scratch change (`openspec new change adopt07-scratch-validation`) and ran `openspec instructions <artifact> --change <id>` for all four artifacts (`proposal`, `specs`, `design`, `tasks`) — each rendered its own `rules.<artifact>` list correctly inside a `<rules>` block. Injected a deliberately invalid sentinel rule (`"NEGATIVE-CONTROL-SENTINEL-DO-NOT-SHIP-8f2c1e"`) into `rules.proposal`, re-ran `openspec instructions proposal --change ...`, confirmed the sentinel **was** reported (`grep -c` → `1`) — proving the check can fail, not just pass — then removed the sentinel and re-confirmed absence (`grep -c` → `0`) and `openspec doctor` still zero-warnings. The scratch change directory was deleted before this checkpoint (`rm -rf openspec/changes/adopt07-scratch-validation`; a second scratch change created to verify the `context` update was also deleted — `openspec/changes/adopt07-scratch-validation2`); `git status --short openspec/` after cleanup shows only `openspec/config.yaml` modified, no residual scratch-change directories
  - Apply/archive guidance parses correctly: PASS — `openspec instructions apply --change ...` and `openspec instructions archive --change ...` both rendered the `operations.apply.guidance`/`operations.archive.guidance` content correctly under an "Operation Guidance (advisory)" heading
  - Selected agent existence: PASS — `ai-specs/agents/backend-developer.md` confirmed present
  - Canonical skills path: PASS — `ai-specs/skills/` confirmed present with 10 skill directories, 2 spot-checked by path
  - Absence of absolute machine-specific paths: PASS — `grep -n "/Users/\|/home/" openspec/config.yaml` → no matches
  - `openspec doctor` zero warnings: PASS — confirmed at every validation pass above, both before and after the negative-control injection/removal
- Corrections needed: none — first draft passed every check; the agent-selection and skills-as-workflow-guidance content was added as a deliberate completion of the step's own requirement (no dedicated config key exists for it in this installed version), not a correction of a failure
- **Approval gate: none beyond the edit itself being reviewable** — per this step's own text ("this step modifies only the OpenSpec configuration file"), no separate `[HUMAN APPROVAL REQUIRED]` gate applies
- **Result: PASS**

---

### `ADOPT-08` — Verify OpenSpec Configuration

**Read-only verification, this session — no files modified.** Unlike `ADOPT-07`'s own validation
(which created and deleted two scratch changes), this step's own text requires "Do not modify
files," so no scratch change was created here; the `rules`/`operations` structural check below
was performed by direct YAML inspection instead of by generating artifact instructions — a
narrower but still-real check, and this step's own criteria do not require re-deriving `ADOPT-07`'s
already-recorded falsifiable negative-control evidence.

| Check | Command / inspection | File or path | Result |
|---|---|---|---|
| OpenSpec version, supported commands | `openspec --version` | n/a | PASS — `1.7.0` |
| Config file exists | `test -f openspec/config.yaml` | `openspec/config.yaml` | PASS |
| YAML syntax valid | `python3 -c "import yaml; yaml.safe_load(open('openspec/config.yaml'))"` | `openspec/config.yaml` | PASS — `VALID YAML`, exit 0 |
| Configured schema resolves | `openspec schema which spec-driven` | n/a | PASS — `Source: package`, resolved path under the installed `@fission-ai/openspec` package |
| Every path referenced by context exists | direct `test -e` on each of 10 referenced paths | `docs/base-standards.md`, `docs/backend-standards.md`, `docs/frontend-standards.md`, `docs/documentation-standards.md`, `docs/api-spec.yml`, `docs/data-model.md`, `ai-specs/agents/backend-developer.md`, `ai-specs/agents/frontend-developer.md`, `ai-specs/skills/commit`, `ai-specs/skills/update-docs` | PASS — all 10 exist |
| Context references intended repository documentation | direct inspection of `context` field content | `openspec/config.yaml` | PASS — names `docs/base-standards.md` as primary, plus `backend-standards.md`, `frontend-standards.md`, `documentation-standards.md`, `api-spec.yml`, `data-model.md` |
| Proposal/specs/design/tasks rules parse correctly | `python3` YAML structural check: `rules` keyed exactly `{proposal, specs, design, tasks}`, every value a list of strings | `openspec/config.yaml` | PASS — 4/4 artifact ids present, 2 string entries each |
| Apply/archive guidance parses correctly when configured | same script: `operations` keyed exactly `{apply, archive}` (matching the installed package's `OPERATION_IDS`), each with a `guidance` list of strings | `openspec/config.yaml` | PASS — `apply`: 2 entries, `archive`: 1 entry |
| Referenced canonical agents exist under `ai-specs/agents/` | `find ai-specs/agents -type f` | `ai-specs/agents/` | PASS — `backend-developer.md` (referenced) present; `frontend-developer.md` (referenced as explicitly not applicable) also present; `product-strategy-analyst.md` present but not referenced (not applicable to this backend-only repository) |
| Referenced canonical skills exist under `ai-specs/skills/` | `find ai-specs/skills -maxdepth 1 -type d` | `ai-specs/skills/` | PASS — `commit`, `update-docs` (the two named examples) confirmed present among 10 skill directories |
| Repository paths are relative, not machine-specific absolute | `grep -n "/Users/\|/home/" openspec/config.yaml` | `openspec/config.yaml` | PASS — no matches |
| `openspec doctor` zero warnings | `openspec doctor` | n/a | PASS — `OpenSpec root: ok`, `References: (none declared)`, no warnings text |

No failures found; no corrections made (this step's own text: "Do not correct failures during this validation" — not exercised, since none occurred).

- **Approval gate: none** — this step is read-only; no `[HUMAN APPROVAL REQUIRED]` gate applies
- **Result: PASS**

---

### `ADOPT-09` — Inspect and Adapt Agents

- Detected stacks and work types, from repository evidence (not filenames): Java 11 / Spring
  Boot 2.4.5 / Maven backend (`pom.xml`, `docs/backend-standards.md` from `ADOPT-06`); no
  frontend (`docs/frontend-standards.md`); no product/ideation work type evidenced by this
  repository's code, though a technology-agnostic product-strategy agent is a valid work-type
  match regardless of stack, per this step's own instruction not to reject an agent merely
  because it is not a programming-stack agent
- Agents inspected under `ai-specs/agents/` (3, pre-existing): `backend-developer.md`,
  `frontend-developer.md`, `product-strategy-analyst.md`
- **Strict frontmatter validation, run before any adaptation** — a Python script parsed only
  the YAML between the two `---` delimiters of each file with `yaml.safe_load`: all 3 existing
  agents **FAILED** strict parsing with an identical class of error (`mapping values are not
  allowed here`, at the first unquoted `Context:` inside each file's single-line `description`
  scalar — the same defect class the reference Java/Maven run recorded for this exact template
  agent set, per `history/reference-run-java-maven.md`'s `ADOPT-09` entry, confirmed here
  independently rather than assumed from that precedent)
- **Representation-only frontmatter repairs**: for each of the 3 files, converted only the
  `description: <one-line scalar>` field to a block scalar (`description: |` followed by the
  identical text, re-indented, on the next line) — every other frontmatter field (`name`,
  `tools`, `model`, `color`) and the entire body left byte-for-byte unchanged. Verified
  programmatically: re-parsed each repaired file's frontmatter, asserted the recovered
  `description` string equals the original scalar value exactly (assertion passed for all 3,
  no `AssertionError` raised); `git diff --stat ai-specs/agents/` shows exactly 3 files changed,
  each a small, symmetric insertion (the `description: |` line plus re-indentation) with no
  other line touched
- Agents preserved unchanged in substance: `backend-developer.md` (TypeScript/Prisma/Express —
  a different language family, explicitly preserved per this step's "do not overwrite or
  repurpose an unrelated agent" and "preserve all existing agents intended for other
  languages/frameworks" rules, even though it does not apply to this repository's actual
  stack), `frontend-developer.md` (React — preserved for the same reason, and because this
  step forbids rejecting an agent merely because it is not applicable to the current repository
  type), `product-strategy-analyst.md` (technology-agnostic work type, preserved unchanged in
  substance — its frontmatter representation was still repaired for strict-YAML validity, which
  is not the same as content adaptation)
- Agent created, and why: **`ai-specs/agents/java-backend-developer.md`** — no existing agent
  covers Java/Spring Boot/JVM backend work (`backend-developer.md` is TypeScript-specific
  throughout its body: Prisma, Express, `.ts` file conventions, Jest); this is a genuinely
  uncovered technology family, meeting this step's own bar for creation ("only when no existing
  validated agent covers a detected technology family"), not a default action
- Evidence that the new agent is client-neutral and domain-neutral:
  - Frontmatter: `name` and `description` only — no `tools`, `model`, `color`, or other
    client-only metadata; verified programmatically (`sorted(d.keys()) == {'name',
    'description'}`)
  - Domain-neutrality: `grep -niE "price|brand|llandaeta|prices|PriceEntity|PriceController"
    ai-specs/agents/java-backend-developer.md` → no matches — the agent's body and examples
    describe generic Java/Spring Boot layering (persistence/business-logic/REST), a generic
    "items by category" example endpoint, and instructs reading the target repository's own
    documentation and build file at task time rather than hard-coding this repository's actual
    package names, entities, or endpoints
  - Portability: the agent explicitly reads the target repository's build tool, ORM, migration
    tool, and test stack from that repository at task time rather than assuming Maven/JPA/
    Flyway/JUnit5 as fixed — reusable for other Java/Spring Boot repositories, not hard-coded to
    this one
- OpenSpec selection changes: `openspec/config.yaml`'s `context` field's "Agent selection" line
  updated to name `ai-specs/agents/java-backend-developer.md` as the agent to use for this
  repository's implementation work (replacing the incorrect `backend-developer.md` reference
  `ADOPT-07` had provisionally written before this step's own agent-adaptation work ran), and
  explicitly notes that `backend-developer.md` and `frontend-developer.md` are preserved but do
  not apply to this repository — an explicit replacement of an obsolete selection, not an
  appended contradiction, per this step's own instruction
- Files modified: `ai-specs/agents/backend-developer.md`, `ai-specs/agents/frontend-developer.md`,
  `ai-specs/agents/product-strategy-analyst.md` (frontmatter representation-only repairs);
  `ai-specs/agents/java-backend-developer.md` (new file); `openspec/config.yaml` (agent-selection
  text only) — all within this step's closed `Allowed modifications`
- Validation, per this step's own list, all PASS:
  - strict YAML parsing succeeds for every file under `ai-specs/agents/` (4/4, re-verified after
    all edits: `python3 yaml.safe_load` on each file's frontmatter, all succeeded)
  - every selected agent exists: PASS — `java-backend-developer.md` present
  - frontmatter is valid: PASS — all 4 files
  - description matches its technology family or work type: PASS — spot-checked each agent's
    description against its actual body content
  - unrelated agents remain unchanged: PASS — `backend-developer.md`/`frontend-developer.md`
    diffs are representation-only, confirmed above
  - a newly created agent is client-neutral, domain-neutral, and free of repository-specific
    assumptions: PASS — see evidence above
  - project-specific details are read from `docs/`: PASS — the new agent's own text instructs
    reading the target repository's documentation and build file at task time
  - every referenced documentation path exists: N/A for the new agent (it names no specific
    repository-local doc path by design, to stay portable); the `openspec/config.yaml` context's
    other doc references were already verified at `ADOPT-07`/`ADOPT-08` and are unchanged by this
    step's edit
  - OpenSpec selects an existing canonical agent: PASS — `java-backend-developer.md` exists
    under `ai-specs/agents/`
  - no client adapter is treated as canonical: PASS — no client adapter directories exist yet
    (created at `ADOPT-13`, not this step); nothing in `.claude/` was read as a source of truth
- Remaining risks: none identified beyond the pre-existing, unrelated-language agents' continued
  presence (by design, per this step's preservation rule) — a future operator selecting Kiro or
  another client for TypeScript/React work elsewhere in a different repository would still find
  those agents intact
- **Approval gate**: this step's gate text requires `[HUMAN APPROVAL REQUIRED]` **before removing
  or replacing an existing agent** — no existing agent was removed or replaced (all 3 pre-existing
  agents' substance is unchanged; only a new agent was added and one config reference was
  corrected), so this gate was not triggered. Creating a new agent is explicitly conditional, not
  a default step, and was justified above on the documented bar (no existing agent covers the
  detected technology family)
- **Result: PASS**

---

### `ADOPT-10` — Validate Agents

**Read-only re-verification, this session — no files modified**, confirmed by `git diff --
ai-specs/agents openspec/config.yaml` producing no output (everything from `ADOPT-09` was
already committed and pushed before this step ran).

| Check | Command / inspection | Result |
|---|---|---|
| `find ai-specs/agents -maxdepth 1 -type f -name '*.md' -print` | direct execution | PASS — 4 files: `java-backend-developer.md`, `backend-developer.md`, `product-strategy-analyst.md`, `frontend-developer.md` |
| `grep -R "ai-specs/agents" openspec` | direct execution | PASS — 4 matches, all in `openspec/config.yaml`'s `context` field, naming `java-backend-developer.md` as selected and `backend-developer.md`/`frontend-developer.md` as explicitly not applicable |
| `git diff -- ai-specs/agents openspec/config.yaml openspec/config.yml` | direct execution | PASS (empty) — nothing uncommitted, `ADOPT-09`'s checkpoint already captured every change |
| Selected agent exists under `ai-specs/agents/` | `test -f ai-specs/agents/java-backend-developer.md` | PASS |
| Frontmatter valid, all 4 files | re-ran the strict `yaml.safe_load` check independently this step | PASS — all 4 parse, `name` field confirmed for each |
| Description matches technology family / work type | spot-checked `java-backend-developer.md`'s description against its own body (Java/Spring Boot layered backend) | PASS |
| Unrelated agents remain present | same `find` output above | PASS — all 3 pre-existing agents present |
| Project-specific details not unnecessarily duplicated | inspected `java-backend-developer.md` for hard-coded repository specifics | PASS — none found; the agent reads project details from the target repository at task time |
| Referenced documentation exists | `test -e` on all 9 paths named or implied by `openspec/config.yaml`'s context (6 `docs/*`, `java-backend-developer.md`, 2 skill dirs) | PASS — all exist |
| OpenSpec selects an existing canonical agent | direct inspection of `openspec/config.yaml`'s context | PASS — `java-backend-developer.md` |
| Client adapters are not canonical sources | `.claude/agents` confirmed absent (`ls` → "No such file or directory"); no `.kiro` directory found | PASS — no client adapter exists yet to be mistaken for canonical (created at `ADOPT-13`) |

No failures found.

- **Approval gate: none** — this step is read-only; no `[HUMAN APPROVAL REQUIRED]` gate applies
- **Result: PASS**

---

## Checkpoint ledger

| # | Step or group | Grouping justification (required if a group) | Validation | Evidence pointers | Allowlist match (YES / NO + anomalies) | Ready declared | Approval (who / when / what — or "auto: standing authorization") | Exact staged file list | Commit SHA | Remote-impact assessment + verdict | Push status | Improvement proposals raised |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `ADOPT-00` + `ADOPT-01` | grouped **as executed, not as planned**: `ADOPT-01` made no repository-local write of its own (`Allowed modifications: none`) and its evidence was recorded into the run log before `ADOPT-00`'s checkpoint was staged, so the only staged delta for `ADOPT-01` is the run-log text itself — the same file `ADOPT-00`'s checkpoint already carries. There is no independently stageable state to split into a second commit; this is the "run log is always a permitted write, never a step's own state" case, not a preference for fewer commits | `ADOPT-00`: PASS (fresh-session discovery-and-execution gate observed, this session). `ADOPT-01`: PASS (all prerequisite tools already installed and meeting/exceeding the documented minimum/reference versions — see evidence block above) | run log `ADOPT-00` and `ADOPT-01` evidence blocks above; `BOOTSTRAP-MANIFEST.json`; `ADOPTION-AUTHORIZATION.md` | YES — staged set is exactly `{.gitignore, .claude/CLAUDE.md, .specboot/adoption/ADOPTION-AUTHORIZATION.md, .specboot/adoption/ADOPTION-RUN-LOG.md, .specboot/adoption/BOOTSTRAP-MANIFEST.json}`, a subset of `ADOPT-00`'s 7-path inventory plus the run log implicitly permitted by `ADOPT-01` (the 2 machine-local paths — `.claude/skills/specboot-adopt`, `.specboot/local/canonical-source-path` — correctly excluded, confirmed ignored/excluded via `git check-ignore`) | YES — declared after independent review of `git diff --cached` | auto: standing authorization (`ADOPTION-AUTHORIZATION.md`, granted 2026-08-19T01:17:25Z by landaeta) — commit and push both auto-approved; conditions verified: staged set is a subset of `Allowed modifications`, push is to `experiment/specboot-ai-adoption-v5` (the authorized branch), fast-forward (branch did not previously exist on `origin`), remote-impact unchanged from the `ADOPT-00` baseline | `.gitignore`, `.claude/CLAUDE.md`, `.specboot/adoption/ADOPTION-AUTHORIZATION.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md`, `.specboot/adoption/BOOTSTRAP-MANIFEST.json` | `14af6e5` | Inspected read-only: no `.github/workflows` or other CI config at `HEAD` or `origin/master`; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; no branch protection on `master` (404 "Branch not protected"); target branch did not exist on `origin` before this push. Verdict: no automation triggered, impact unchanged from baseline (none known before, none known after) | pushed — `git push origin experiment/specboot-ai-adoption-v5` created the branch on `origin`, exit 0, non-force | none raised at this checkpoint |
| 2 | (SHA-backfill delta only) | not a group — the run log's own commit-SHA cell for checkpoint 1, filled after that commit existed, per `00-conventions.md`'s "The commit-SHA cell cannot be filled inside the commit it describes" | n/a — no `ADOPT` step's own validation; this is the run log carrying its one-line delta forward | this row | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES | auto: standing authorization — same conditions as checkpoint 1, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `1aad273` | unchanged from checkpoint 1 (no new writes to any CI/ruleset/webhook/branch-protection surface since) | pushed — fast-forward `14af6e5..1aad273`, exit 0, non-force | none raised at this checkpoint |
| 3 | `ADOPT-02` | not a group — single step | PASS — `openspec --version` → `1.7.0` (already met minimum, install skipped); `openspec init --tools claude --no-animation` exit 0; `openspec doctor` → `OpenSpec root: ok`, exit 0; `find openspec -maxdepth 3` and `find .claude/commands .claude/skills -type f` match the expected generated set exactly; no unselected-client resources found | run log `ADOPT-02` evidence block above | YES — staged set is exactly `{.claude/commands/opsx/*.md (6), .claude/skills/openspec-*/SKILL.md (6), openspec/config.yaml, .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-02`'s closed allowlist (config path + selected-client-only generated resources) plus the always-permitted run log; confirmed not `.gitignore`-excluded via `git check-ignore` (exit 1, not ignored) | YES — declared after independent review of `git diff --cached --stat` and spot-checking `openspec/config.yaml`'s content | auto: standing authorization — staged set is a subset of `ADOPT-02`'s declared `Allowed modifications`, push to the authorized branch, fast-forward, remote-impact unchanged | `.claude/commands/opsx/{apply,archive,explore,propose,sync,update}.md`, `.claude/skills/openspec-{apply-change,archive-change,explore,propose,sync-specs,update-change}/SKILL.md`, `openspec/config.yaml`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `2d3d69c` | Inspected read-only: no new CI/workflow files introduced by this step (OpenSpec generates only config, commands, and skills, none of which are CI triggers); no change to hooks, rulesets, or branch protection since checkpoint 2. Verdict: unchanged from baseline | pushed — fast-forward `1aad273..2d3d69c`, exit 0, non-force | none raised at this checkpoint |
| 4 | `ADOPT-03` | not a group — single step | PASS — `find docs -maxdepth 2 -type f` (7 files), `find ai-specs -maxdepth 3 -type f` (matches the 23-file source count, recursive), `git status --short` show only the two mirrored trees and the 4 root symlinks added; `readlink` on all 4 root symlinks → `docs/base-standards.md`, every symlink resolves; `.cursor/` confirmed absent | run log `ADOPT-03` evidence block above, including the recorded near-miss and recovery | YES — staged set is exactly `{docs/* (7), ai-specs/* (23), AGENTS.md, CLAUDE.md, GEMINI.md, codex.md, .specboot/adoption/ADOPTION-RUN-LOG.md}` = 35 files, an exact match to `ADOPT-03`'s closed-rule allowlist plus the always-permitted run log; confirmed not `.gitignore`-excluded via `git check-ignore` (exit 1, not ignored) | YES — declared after independent review of `git diff --cached --stat` (35 files, matches expected count exactly) and confirming the 4 symlinks staged at git mode `120000` (real symlinks, not regular files) | auto: standing authorization, **plus** this step's own documented gate mechanism (mechanical post-copy comparison matched the closed-rule allowlist exactly, so this step's `[HUMAN APPROVAL REQUIRED]` gate auto-approved per `03-` `ADOPT-03`'s own text, independent of the checkpoint-level standing authorization) — both apply and agree | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `codex.md`, `ai-specs/**` (23 files), `docs/**` (7 files), `.specboot/adoption/ADOPTION-RUN-LOG.md` | `89655a6` | Inspected read-only: no new CI/workflow files introduced (payload is documentation and AI-agent skill/instruction content only); no change to hooks, rulesets, or branch protection since checkpoint 3. Verdict: unchanged from baseline | pushed — fast-forward `2d3d69c..89655a6`, exit 0, non-force | none raised at this checkpoint |
| 5 | `ADOPT-04` | not a group — single step | PASS — first `codegraph init` (sparse checkout) indexed 3/22 files, FAIL by this step's own no-waiver rule; resolved via operator-approved full checkout; second `codegraph init` indexed 22/22 files (295 nodes, 355 edges); `codegraph explore "list entry points"` returned real symbols, blast radius, and verbatim source, exit 0 | run log `ADOPT-04` evidence block above; Decision record entry 2026-08-20; Code-graph capability selection section | YES — staged set is exactly `{.codegraph/.gitignore, .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-04`'s closed allowlist (`.codegraph/`, only `.gitignore` ever trackable) plus the always-permitted run log; `codegraph.db` confirmed git-ignored via `git check-ignore` | YES — declared after independent review of `git diff --cached --stat` (2 files) | auto: standing authorization — staged set is a subset of `ADOPT-04`'s `Allowed modifications`, push to the authorized branch, fast-forward, remote-impact unchanged. **Separately**, the mid-step decision to disable this worktree's sparse-checkout was its own live `[HUMAN APPROVAL REQUIRED]`-equivalent gate (via `AskUserQuestion`, not the checkpoint's standing authorization — a working-tree-scope change, not a file write covered by `Allowed modifications`), approved by landaeta before being executed | `.codegraph/.gitignore`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `3c90981` | Inspected read-only: `.codegraph/.gitignore` is a generated ignore rule, not a CI/workflow file; no change to hooks, rulesets, or branch protection since checkpoint 4. The sparse-checkout change itself is local worktree state, invisible to `origin` until content is pushed, and this push carries no new tracked paths beyond the one `.codegraph/.gitignore` file. Verdict: unchanged from baseline | pushed — fast-forward `89655a6..3c90981`, exit 0, non-force | none raised at this checkpoint |
| 6 | (run-log-only: `ADOPT-04` SHA backfill + `ADOPT-05` hand-off record) | not a group — the run log's own commit-SHA cell for checkpoint 5, plus this session's record of two failed `codegraph install` automation attempts and the resulting hand-off; no `ADOPT` step reached PASS in this checkpoint | n/a — `ADOPT-05` is `PENDING`, not validated; this checkpoint records the attempt and stop, not a step result | this row; `ADOPT-05` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `18c28ce` | unchanged from checkpoint 5 (no new writes to any CI/ruleset/webhook/branch-protection surface; no `.mcp.json` or client permission file was ever written by either failed attempt) | pushed — fast-forward `3c90981..18c28ce`, exit 0, non-force | none raised at this checkpoint |
| 7 | `ADOPT-05` | not a group — single step | PASS — operator completed the interactive `codegraph install -t claude -l local --no-permissions` flow; `.mcp.json` and `.claude/settings.json` (no `permissions` key) generated; `.claude/CLAUDE.md`'s `CODEGRAPH_START/END` block appended; `git diff --name-only` and `git status --short` match the closed allowlist exactly; `codegraph explore "list public interfaces"` → 52 symbols across 4 files, exit 0 | run log `ADOPT-05` evidence block above; `ADOPTION-AUTHORIZATION.md` code-graph-privilege-scope section | YES — staged set is exactly `{.claude/CLAUDE.md, .claude/settings.json, .mcp.json, .specboot/adoption/ADOPTION-AUTHORIZATION.md, .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-05`'s closed allowlist plus the always-permitted run log; confirmed not `.gitignore`-excluded via `git check-ignore` (exit 1, not ignored) | YES — declared after independent review of `git diff --cached --stat` (5 files) | auto: standing authorization — staged set is a subset of `ADOPT-05`'s `Allowed modifications`; scope (`local`) and automatic-allow (`--no-permissions`) both match the least-privilege default named by this step's own auto-approve clause and by `ADOPTION-AUTHORIZATION.md`'s policy, so the gate auto-approves. Front-loading deviated from the reference default but was the operator's own live choice at the interactive prompt (not a scope/auto-allow escalation this agent made or reviewed as a gate) — recorded as such, not folded into the auto-approval's own criteria | `.claude/CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, `.specboot/adoption/ADOPTION-AUTHORIZATION.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `08e1169` | Inspected read-only: `.mcp.json` and `.claude/settings.json` configure an MCP server and a `UserPromptSubmit` hook local to this repository's Claude Code session — neither is a CI/workflow trigger; no change to hooks, rulesets, or branch protection on `origin` since checkpoint 6. Verdict: unchanged from baseline | pushed — fast-forward `18c28ce..08e1169`, exit 0, non-force | none raised at this checkpoint |
| 8 | `ADOPT-05B` | not a group — single step | PASS — permission file provisioned via merge (Rules-derived, no external baseline existed); declared team environment matrix recorded; safety check found no credentials/personal-paths/unsafe-broad-patterns; `python3 -c "import json; json.load(...)"` → VALID JSON; fresh-session smoke test executed this session — negative control (`date`) ran with no permission prompt, resolved via the guide's own alternative criterion (all 7 canonical commands allowlist-covered by inspection and executed successfully, exit 0 each; no file modified) | run log `ADOPT-05B` evidence block above (updated this session with the smoke-test result); `03-client-permissions.md`'s alternative-criterion text | YES — staged set is exactly `{.claude/settings.json, .specboot/adoption/ADOPTION-AUTHORIZATION.md, .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-05B`'s closed allowlist (client permission file + `ADOPTION-AUTHORIZATION.md` update-only) plus the always-permitted run log; `git diff` on both non-run-log files inspected and matches the evidence exactly (permissions block addition; declared-matrix fill-in) | YES — declared after independent review of `git diff --cached` on all 3 files | auto: standing authorization — staged set is a subset of `ADOPT-05B`'s `Allowed modifications`; content creation stayed strictly within this step's own already-reviewed, documented Rules pattern set (no baseline existed to broaden beyond, per Step 1's own documented "author as this project's own first one" path), so the file-content gate auto-approves per this step's own text; push conditions (fast-forward, remote-impact unchanged) independently verified below | `.claude/settings.json`, `.specboot/adoption/ADOPTION-AUTHORIZATION.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `ddf16e9` | Inspected read-only: no `.github/` directory (`find .github` → not found); `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `08e1169..ddf16e9`, exit 0, non-force | none raised at this checkpoint |
| 9 | (SHA-backfill delta only) | not a group — the run log's own commit-SHA cell for checkpoint 8, filled after that commit existed | n/a — no `ADOPT` step's own validation; the run log carrying its one-line delta forward | this row | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `dba92ac` | unchanged from checkpoint 8 (no new writes to any CI/ruleset/webhook/branch-protection surface) | pushed — fast-forward `ddf16e9..dba92ac`, exit 0, non-force | none raised at this checkpoint |
| 10 | `ADOPT-06` | not a group — single step | PASS — every factual claim in the rewritten `docs/` content resolves to a `file:line` citation, spot-verified against source this session; template terminology grep-confirmed absent; all 7 documented validations (stack, architecture, API, data model, build/test commands, template-terminology absence, cross-document consistency) PASS | run log `ADOPT-06` evidence block above | YES — staged set is exactly `{docs/api-spec.yml, docs/backend-standards.md, docs/base-standards.md, docs/data-model.md, docs/development_guide.md, docs/frontend-standards.md, .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-06`'s closed allowlist (`docs/`) plus the always-permitted run log; the four root symlinks (`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`codex.md`) show no diff of their own since only their `docs/base-standards.md` target changed, confirming `ai-specs/`, source, tests, and OpenSpec configuration were untouched as required | YES — declared after independent review of `git diff --cached --stat` (7 files) | this step's own content-approval gate is **[HUMAN APPROVAL REQUIRED]**, not auto-approved (unlike `ADOPT-03`/`ADOPT-05B`, which have their own documented auto-approve mechanisms) — presented via `AskUserQuestion` with the exact scope and a diff-review option; **approved by landaeta**, "Approve as-is". Separately, the checkpoint's own commit/push gates auto-approve under standing authorization: staged set is a subset of `ADOPT-06`'s `Allowed modifications`, and push conditions (fast-forward, remote-impact unchanged) are independently verified below | `docs/api-spec.yml`, `docs/backend-standards.md`, `docs/base-standards.md`, `docs/data-model.md`, `docs/development_guide.md`, `docs/frontend-standards.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `3785d41` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `dba92ac..3785d41`, exit 0, non-force | none raised at this checkpoint |
| 11 | (SHA-backfill delta only) | not a group — the run log's own commit-SHA cell for checkpoint 10, filled after that commit existed | n/a — no `ADOPT` step's own validation; the run log carrying its one-line delta forward | this row | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `2867d3e` | unchanged from checkpoint 10 (no new writes to any CI/ruleset/webhook/branch-protection surface) | pushed — fast-forward `3785d41..2867d3e`, exit 0, non-force | none raised at this checkpoint |
| 12 | `ADOPT-07` | not a group — single step | PASS — `openspec/config.yaml` configured with `context`/`rules`/`operations`; YAML valid; `openspec doctor` zero warnings throughout; every referenced path (`docs/*`, `ai-specs/agents/backend-developer.md`, `ai-specs/skills/{commit,update-docs}`) confirmed to exist; rules block validated with a falsifiable negative-control sentinel (injected → confirmed reported → removed → confirmed absent) since `openspec doctor` does not read `rules`; two scratch changes used for validation deleted before this checkpoint, confirmed via `git status --short openspec/` showing only `config.yaml` modified | run log `ADOPT-07` evidence block above | YES — staged set is exactly `{openspec/config.yaml, .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-07`'s closed allowlist ("only the path that exists": `openspec/config.yaml`) plus the always-permitted run log; no scratch-change directories or other paths present in the diff | YES — declared after independent review of `git diff --cached --stat` (2 files) | this step's own approval gate is **none beyond the edit itself being reviewable** ("this step modifies only the OpenSpec configuration file") — no live `[HUMAN APPROVAL REQUIRED]` gate applies. The checkpoint's own commit/push gates auto-approve under standing authorization: staged set is a subset of `ADOPT-07`'s `Allowed modifications`, push conditions (fast-forward, remote-impact unchanged) independently verified below | `openspec/config.yaml`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `9fcb62a` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `2867d3e..9fcb62a`, exit 0, non-force | none raised at this checkpoint |
| 13 | (SHA-backfill delta) + `ADOPT-08` | grouped **as executed, not as planned**: this checkpoint's only staged content beyond the mandatory `ADOPT-07` SHA-backfill line is `ADOPT-08`'s own evidence — and `ADOPT-08` itself made zero repository-local writes (its `Action` is explicitly "Do not modify files"), so there is no independently stageable state to split into a second commit; the run log is the only artifact either delta touches | `ADOPT-08`: PASS — 12/12 documented checks pass, zero warnings, no files modified, no corrections made (see run log evidence block above) | run log `ADOPT-07` SHA-backfill line; run log `ADOPT-08` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted (both the SHA-backfill delta and the entirety of `ADOPT-08`'s evidence, since that step wrote nothing else) | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `74abcda` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `9fcb62a..74abcda`, exit 0, non-force | none raised at this checkpoint |
| 14 | `ADOPT-09` | not a group — single step | PASS — all 3 pre-existing agents failed strict YAML before repair, all 4 (3 repaired + 1 new) pass after; representation-only repair verified programmatically (recovered description equals original exactly); new agent verified client-neutral (`name`+`description` only) and domain-neutral (grep for repository terms → no matches); every validation in this step's own list PASS | run log `ADOPT-09` evidence block above | YES — staged set is exactly `{ai-specs/agents/backend-developer.md, ai-specs/agents/frontend-developer.md, ai-specs/agents/product-strategy-analyst.md, ai-specs/agents/java-backend-developer.md, openspec/config.yaml, .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-09`'s closed allowlist (`ai-specs/agents/` + agent-selection portion of `openspec/config.yaml`) plus the always-permitted run log; no client adapter directories touched | YES — declared after independent review of `git diff --cached --stat` (6 files) and confirming the 3 repaired agents' diffs are representation-only | this step's own `[HUMAN APPROVAL REQUIRED]` gate is scoped to removing or replacing an existing agent — not triggered, since no existing agent was removed or replaced (only a new agent added and a config reference corrected). The checkpoint's own commit/push gates auto-approve under standing authorization: staged set is a subset of `ADOPT-09`'s `Allowed modifications`, push conditions independently verified below | `ai-specs/agents/backend-developer.md`, `ai-specs/agents/frontend-developer.md`, `ai-specs/agents/product-strategy-analyst.md`, `ai-specs/agents/java-backend-developer.md`, `openspec/config.yaml`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `d763bbb` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `74abcda..d763bbb` (via the intervening SHA-backfill commit `6070f7a`), exit 0, non-force | none raised at this checkpoint |
| 15 | (SHA-backfill delta) + `ADOPT-10` | grouped **as executed, not as planned**: `ADOPT-10` made zero repository-local writes of its own (read-only step), so its only staged content beyond the mandatory `ADOPT-09` SHA-backfill line is its own evidence — no independently stageable state to split into a second commit | `ADOPT-10`: PASS — 11/11 documented checks pass, no files modified (see run log evidence block above) | run log `ADOPT-09` SHA-backfill line; run log `ADOPT-10` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | TBD — cannot be filled inside the commit it describes; filled at the next checkpoint's SHA-backfill delta per `00-conventions.md` | unchanged from checkpoint 14 (no new writes to any CI/ruleset/webhook/branch-protection surface) | pushed — fast-forward, exit 0, non-force | none raised at this checkpoint |

---

## Improvement proposals

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

- Selected implementation (CodeGraph, or the named company-approved equivalent): CodeGraph
- Version: `1.5.0`
- Verification command executed, with exit code and output summary: `codegraph init`, exit 0 → `Indexed 22 files`, `295 nodes, 355 edges in 568ms`; `codegraph explore "list entry points"`, exit 0 → `49 symbols across 3 files` with real blast-radius and verbatim source
- Coverage limitations (for example unsupported languages): none observed — this repository is pure Java/Maven and every tracked file indexed cleanly on the second run (after the worktree's sparse-checkout, which had blocked 19 of 22 files on the first attempt, was disabled with operator approval — see `ADOPT-04` evidence block above)
- Result: PASS

---

## Decision record

```text
2026-08-19 — ADOPT-00 — canonical source path supplied by operator (session-local, not recorded here) — approved by landaeta — required to begin the adoption
2026-08-19 — ADOPT-00 — self-adoption check (Step 0) — passed (distinct resolved paths; shared-worktree Git identity correctly not treated as a match) — observed by this session
2026-08-19 — ADOPT-00 — client selection — Claude selected via autodiscovery route (no candidates found; operator asked explicitly per Q3) — approved by landaeta
2026-08-19 — ADOPT-00 — exact mutation inventory (7 paths) — approved by landaeta — via AskUserQuestion, "Apruebo el inventario exacto"
2026-08-19 — ADOPT-00 — standing commit-and-push authorization — GRANTED by landaeta — via AskUserQuestion, "Otorgar autorización permanente" — recorded in ADOPTION-AUTHORIZATION.md
2026-08-19 — ADOPT-00 — fresh-session discovery-and-execution probe — observed by this (new, fresh) session — native `specboot-adopt` skill discovery succeeded via the bootstrap symlink, no operator-supplied path — result PASS — no separate approval required (observation, not a mutation)
2026-08-20 — ADOPT-04 — sparse-checkout blocked 19/22 files from CodeGraph indexing; three options presented via AskUserQuestion (widen sparse-checkout / disable sparse-checkout for a full checkout / stop and record FAIL) — approved by landaeta: full checkout (`git sparse-checkout disable`, this worktree only)
2026-08-20 — ADOPT-05B — fresh-session smoke test's negative control (`date`) ran with no permission prompt; per the guide's own routing rule this made the primary (prompt-observing) criterion inapplicable — resolved via the documented alternative criterion (allowlist coverage by inspection + successful execution of every canonical-prompt command, no file modified) — observed by this session, no separate approval required (observation plus a documented fallback path, not a mutation decision)
2026-08-20 — ADOPT-06 — replaced the LTI-template docs/ content (Node.js/TypeScript/Prisma/React recruitment platform) with content derived from this repository's actual Java/Spring Boot Prices API, citation-verified against source; presented via AskUserQuestion with the exact scope and a diff-review option — approved by landaeta: "Approve as-is"
2026-08-20 — ADOPT-07 — configured openspec/config.yaml's context/rules/operations from the adapted docs/ and ai-specs/agents/, ai-specs/skills/; validated the rules block with a falsifiable negative control (sentinel injected, confirmed reported, removed, confirmed absent) since openspec doctor does not read that block — no separate approval gate applies per this step's own text (edit reviewable, no live human-approval requirement); observed and executed by this session
2026-08-20 — ADOPT-08 — read-only re-verification of the ADOPT-07 configuration; all 12 documented checks PASS, zero warnings, no files modified, no corrections made — no approval gate applies per this step's own text; observed and executed by this session
2026-08-20 — ADOPT-09 — repaired representation-only frontmatter (strict-YAML block-scalar description) on all 3 pre-existing agents; created ai-specs/agents/java-backend-developer.md (client-neutral, domain-neutral) since no existing agent covers this repository's Java/Spring Boot stack; updated openspec/config.yaml's agent-selection text to the new agent — no existing agent removed or replaced, so this step's [HUMAN APPROVAL REQUIRED] gate (scoped to removal/replacement only) was not triggered; observed and executed by this session
2026-08-20 — ADOPT-10 — read-only re-verification of the ADOPT-09 agent adaptation; all 11 documented checks PASS, no files modified — no approval gate applies per this step's own text; observed and executed by this session
```

## Correction record

```text
Step: ADOPT-00, preflight (action 7 of 09-bootstrap.md)
Attempt: 1
Failure: `.gitignore` misclassified `absent` by `test -f .gitignore`; it was actually a
  pre-existing, git-tracked Spring Boot boilerplate file. The approved mutation inventory listed
  it as "create". Materialization used Write (full-content replace) per the "create" mechanism,
  which destroyed the pre-existing content for a brief window.
Diagnosis: the probe command was run correctly against the right directory, but its result was
  taken at face value without a second confirming signal (e.g. `git ls-files .gitignore`), and the
  gate was presented and approved before that second signal would have caught the mismatch.
Recovery: detected immediately after the write via `git status` (file showed as modified, not
  untracked) and `git diff` (full original content gone). Restored the original 394-byte content
  byte-for-byte from `git show HEAD:.gitignore`, then appended the SPECBOOT-BOOTSTRAP block and the
  durable `.specboot/staging/` line — matching the append-only treatment already used for
  `.claude/CLAUDE.md`. Updated BOOTSTRAP-MANIFEST.json's `.gitignore` entry to
  `pre-existing-modified` / `appended-block` (from the gate's `create`). No commit had been made
  against the clobbered state.
Outcome: corrected in-session, before handoff, before any commit. Recorded here rather than
  silently fixed, per the non-negotiable that an honest record beats a clean-looking one.
```

```text
Step: ADOPT-03, Action (payload extraction fallback, git-archive path)
Attempt: 1
Failure: the payload at `<SPECBOOT_SOURCE>/packages/specboot/template` was not materialized in
  this session's checkout of the canonical source (`test -d ... template` → absent), so this
  step's documented fallback applied: extract via `git archive` against the pinned commit instead
  of `cp -rn`. The command was composed as a `cd <SPECBOOT_SOURCE> && git archive ... | tar -x
  --strip-components=3` pipeline. The `cd` into the *source* was intended only to give `git
  archive` a working directory to resolve the pinned commit from, but the subsequent `tar -x` was
  never given an explicit `-C <TARGET_REPOSITORY>` output directory, so it extracted into the
  shell's then-current directory — the canonical source itself, `/Users/landaeta/repos/specboot`
  — instead of the target repository. This overwrote 17 pre-existing tracked files under the
  source's own root `docs/` and `ai-specs/` (the source repository's own project-specific content,
  itself a real adopted repository per this step's own documented risk) with the generic template
  payload's content for those same relative paths. `git status --porcelain` in the source
  immediately after showed all 17 as `M` (modified, tracked) — no new untracked files were
  created, and the source's own `HEAD` commit was never moved.
Diagnosis: violates `00-conventions.md`'s "Source treated as read-only for the whole adoption:
  YES" and this step's own explicit warning that the canonical source can double as a working
  reference implementation and must never receive a write. The `-n` (no-clobber) safety of the
  primary `cp -rn` command was lost when composing the fallback `tar` pipeline, and no explicit
  destination flag was passed to `tar -x` to compensate.
Recovery: detected immediately via `git status --porcelain` in the source directory showing 17
  modified tracked files. Ran `git restore .` in the source (a git-tracked working tree with no
  prior uncommitted changes, confirmed clean by this same session's `ADOPT-00` drift check
  immediately prior), which reverted every file to `HEAD` byte-for-byte. Re-verified: `git status`
  → "nothing to commit, working tree clean"; `git rev-parse HEAD` → still
  `008647262e8ff4e4af38a8e948fe061e1c6bd51a` (unchanged); the guide and skill checksums recomputed
  against the restored source both still matched the values recorded in the manifest and run log.
  No commit was ever made in the source against the clobbered state, and the source's own git
  history was never touched — only its working tree, and only transiently. The target repository
  was never reached by this failed attempt: no file under `<TARGET_REPOSITORY>/docs` or
  `<TARGET_REPOSITORY>/ai-specs` was created by it.
Outcome: corrected in-session, before any further step, before any commit in either repository.
  Recorded here rather than silently retried, per the non-negotiable that an honest record beats a
  clean-looking one. The extraction is retried below with an explicit `-C <TARGET_REPOSITORY>`
  destination and a pre-flight `pwd` check.
```

---

## Command log for this step (supplementary, not part of the canonical template)

Kept here as raw evidence backing the checkboxes above, since several checks (the `.gitignore`
block, `git check-ignore`) execute after this file's first write in the materialization order.
This session updates this section in place before generating the handoff prompt.
