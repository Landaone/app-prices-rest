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
| `ADOPT-11` | `05-agents-and-skills.md` | PASS | 2026-08-20 |
| `ADOPT-12` | `05-agents-and-skills.md` | PASS | 2026-08-20 |
| `ADOPT-13` | `06-adapters-and-discovery.md` | PASS | 2026-08-20 |
| `ADOPT-14` | `06-adapters-and-discovery.md` | PASS | 2026-08-20 |
| `ADOPT-15` | `06-adapters-and-discovery.md` (once per client) | PASS | 2026-08-20 |
| `ADOPT-16` | `07-baseline-and-checkpoint.md` | PASS | 2026-08-20 |
| `ADOPT-17` | `07-baseline-and-checkpoint.md` | PASS | 2026-08-20 |
| `ADOPT-18` | `10-debootstrap.md` | PASS | 2026-08-20 |
| `ADOPT-19` | `11-e2e-pilot-and-pr-gate.md` | PASS | 2026-08-25 |
| `ADOPT-20` | `11-e2e-pilot-and-pr-gate.md` | PASS — READY, PR creation approval pending | 2026-08-25 |

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

### `ADOPT-11` — Inspect and Adapt Skills

- Skills inspected under `ai-specs/skills/` (10, pre-existing): `adversarial-review`,
  `code-auditing`, `commit`, `enrich-us`, `explain`, `meta-prompt`, `specboot-verify`,
  `update-docs`, `using-git-worktrees`, `writing-skills`
- Assumptions found: `code-auditing/SKILL.md` (and its `references/audit-methodology.md`)
  assumed a Node.js/TypeScript-first tech stack in 3 places — Phase 0's config-file check
  named only `package.json`/`tsconfig.json`; the "Type Safety" analysis category was headed
  and scoped as "TypeScript/Type Safety" only; the Dead Code detection tools list covered only
  JavaScript/TypeScript (`knip`) and Python (`deadcode`), with no Java/JVM entry and no
  explicit "don't install an undeclared tool" guard on the JS/TS entry. `references/
  audit-methodology.md`'s baseline-checks example block showed JS/TS, Python, and Go commands
  but no Java/Maven equivalent, despite already being otherwise stack-aware elsewhere in the
  same file (package-file detection at line 10 and file-type identification at line 49 both
  already listed Java/`pom.xml`)
- Skills preserved unchanged (9 of 10): `adversarial-review`, `commit`, `enrich-us`, `explain`,
  `meta-prompt`, `specboot-verify`, `update-docs` — grep for `npm|npx|jest|eslint|tsc|
  typescript|node_modules|package\.json|prisma` (case-insensitive) across every `SKILL.md`
  found zero matches in these 7, confirming they are already technology-agnostic;
  `using-git-worktrees/SKILL.md` already detects the stack conditionally (`if [ -f
  package.json ]; then npm install; fi`, and separately lists `npm test / cargo test / pytest
  / go test ./...` as parallel alternatives, plus explicitly skips dependency install when no
  manifest is found) — reviewed and confirmed it already correctly derives its dependency
  step from files that actually exist rather than assuming Node.js, so left unchanged;
  `writing-skills/SKILL.md`'s one "Testing techniques → TypeScript/JavaScript" line is
  meta-guidance for choosing an illustrative example language when authoring a *new* skill, not
  an assumption about this repository's own stack when running a skill against this
  repository's code — confirmed by reading its surrounding context, left unchanged
- Skills adapted, and why: `code-auditing/SKILL.md` — Phase 0 step 1 generalized to name
  Java/JVM (`pom.xml`/`build.gradle`), Python, and Go alongside Node/TS config files, detected
  from what actually exists; step 4 made explicit that only the project's own already-configured
  commands run, never an installed-for-this-audit tool; the "TypeScript/Type Safety" section
  renamed "Type Safety" with per-language subsections (TypeScript, Java/JVM, Python, other
  statically-typed languages); the Dead Code Tools list gained an explicit Java/JVM entry
  (compiler warnings and already-configured static analysis only, no new dependency) and an
  explicit "use only when already a declared dependency" guard on the JS/TS `knip` entry;
  Phase 5's library-search step gained an explicit external-research-requires-authorization
  note, matching this step's own stated requirement. `references/audit-methodology.md` gained
  one additional Java/Maven example command block (`./mvnw compile`/`./mvnw test`) alongside
  the existing JS/TS/Python/Go examples in the baseline-checks section, plus an explicit
  "run only commands the project's own build configuration already exposes" line — for
  consistency with the file's own already-present Java awareness elsewhere (package-file and
  file-type detection already listed Java before this step touched the file)
- Detected tooling actually used to validate the above: none beyond direct file inspection and
  `grep` — no new tool was installed, downloaded, or resolved; this step's own dependency-safety
  rule was itself followed while executing this step
- External web, GitHub, or package-registry research: **not performed** — not needed for this
  adaptation (stack detection was possible entirely from repository evidence already gathered
  at `ADOPT-06`), and no explicit user authorization was sought or required as a result
- Mandatory-capability completeness check, per `ai-specs/specboot-instructions.md`'s "six
  required workflow capabilities" list (`enrich-us`, `propose`, `apply`, `specboot-verify`,
  `adversarial-review`, `archive`):
  - SpecBoot-owned capabilities requiring a skill under `ai-specs/skills/` — `enrich-us`,
    `specboot-verify`, `adversarial-review`: PASS — all 3 present as directories with a
    `SKILL.md` entry file (`ai-specs/skills/enrich-us/SKILL.md`,
    `ai-specs/skills/specboot-verify/SKILL.md`, `ai-specs/skills/adversarial-review/SKILL.md`)
  - OpenSpec-CLI-generated capabilities — `propose`, `apply`, `archive`: PASS — confirmed
    actually generated by the installed OpenSpec 1.7.0 CLI for the selected client (Claude) at
    `ADOPT-02`, re-confirmed here: `find .claude/skills -maxdepth 1 -iname "openspec-*"` →
    `openspec-propose`, `openspec-apply-change`, `openspec-archive-change` (plus
    `openspec-explore`, `openspec-update-change`, `openspec-sync-specs`, not part of the
    mandatory six but also generated) — checked at the right location for this capability's
    own documented architecture (`.claude/skills/openspec-*`), not under `ai-specs/skills/`
  - No SpecBoot-owned mandatory capability was found missing; no CLI-generated one was found
    ungenerated — both would have been a step FAIL per this step's own text, neither occurred
- Files modified: `ai-specs/skills/code-auditing/SKILL.md`,
  `ai-specs/skills/code-auditing/references/audit-methodology.md` — both within this step's
  closed `Allowed modifications` (`ai-specs/skills/` only)
- Blockers versus optional improvements: none blocking; the Java dead-code-tool gap noted in
  `code-auditing/SKILL.md`'s Tools list (no bundled Java equivalent to `knip`/`deadcode` is
  listed) is recorded as a documented limitation, not a blocker — the skill still functions
  correctly for this repository by falling through to compiler-warnings guidance
- Validation, per this step's own list, all PASS: every canonical skill has its required entry
  file; supporting resources (`code-auditing/references/*.md`) exist; referenced paths resolve;
  stack-aware skills (`using-git-worktrees`, now also `code-auditing`) derive commands from
  repository configuration; technology-specific checks are conditional; no undeclared tool or
  dependency is required; no generated client directory (`.claude/skills/openspec-*`) is
  confused with a canonical skill; shared skills remain suitable for the selected client
  (Claude); the mandatory-capability completeness check (above) passed for every named
  capability
- **Approval gate: none beyond the edit being reviewable** — modifications limited to
  `ai-specs/skills/`; no external research was performed, so the authorization-first rule for
  that case was not triggered
- **Result: PASS**

---

### `ADOPT-12` — Validate Skills

**Read-only re-verification, this session — no files modified**, confirmed by `git diff --
ai-specs/skills` producing no output (everything from `ADOPT-11` was already committed and
pushed before this step ran).

| Check | Command / inspection | Result |
|---|---|---|
| `find ai-specs/skills -mindepth 1 -maxdepth 2 -type f -print` | direct execution | PASS — every one of the 10 canonical skills has its `SKILL.md` entry file present, plus `code-auditing`'s 2 reference files and `writing-skills`' 5 supporting files |
| `find ai-specs/skills -type l -print -exec readlink {} \;` | direct execution | PASS (empty) — no symlinks exist yet under `ai-specs/skills/` itself (client adapters are created at `ADOPT-13`, not before) |
| `git diff -- ai-specs/skills` | direct execution | PASS (empty) — nothing uncommitted |
| `grep -n "mandatory" ai-specs/specboot-instructions.md` | direct execution | PASS — surfaced the "six required workflow capabilities" text naming `enrich-us`, `propose`, `apply`, `specboot-verify`, `adversarial-review`, `archive`, cross-checked against the `find` output above |
| Every canonical skill exists | same `find` output | PASS — 10/10 |
| Expected entry file exists | same `find` output | PASS — every skill directory has a `SKILL.md` |
| Supporting resources resolve | `test -e` on `code-auditing/references/{audit-methodology.md,dead-code-methodology.md}` and `writing-skills/{testing-skills-with-subagents.md,render-graphs.js,anthropic-best-practices.md,persuasion-principles.md,graphviz-conventions.dot}` | PASS — all present |
| Stack-aware skills inspect repository configuration | re-read `code-auditing/SKILL.md` and `using-git-worktrees/SKILL.md` independently this step | PASS — both now derive commands from files that actually exist rather than assuming Node/TS |
| Technology-specific commands are conditional | same re-read | PASS |
| No undeclared dependency is required | re-read `code-auditing/SKILL.md`'s Tools section and Phase 0 step 4 | PASS — explicit "never install... merely to perform this audit" language present |
| Client-generated OpenSpec skills not copied into canonical shared skills | `find ai-specs/skills -iname "openspec-*"` → empty; `.claude/skills/openspec-*` confirmed to live only under `.claude/`, never under `ai-specs/skills/` | PASS |
| Shared skills suitable for selected clients | Claude is the only selected client (`ADOPT-00`); nothing in `ai-specs/skills/` assumes a different client | PASS |
| Mandatory workflow capability completeness | re-verified independently this step: `test -d ai-specs/skills/{enrich-us,specboot-verify,adversarial-review}` → all present; `find .claude/skills -maxdepth 1 -iname "openspec-*"` → `openspec-propose`, `openspec-apply-change`, `openspec-archive-change` (plus 3 others) present | PASS — no missing mandatory capability found |

No failures found.

- **Approval gate: none** — this step is read-only; no `[HUMAN APPROVAL REQUIRED]` gate applies
- **Result: PASS**

---

### `ADOPT-13` — Create Selected-Client Adapters

- Inspected before creating anything: OpenSpec-generated client configuration
  (`.claude/commands/opsx/*`, `.claude/skills/openspec-*` — 6 real directories, confirmed at
  `ADOPT-02`); CodeGraph client configuration (`.mcp.json`, `.claude/settings.json`'s hooks
  block — confirmed at `ADOPT-05`); root instruction files (`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/
  `codex.md`, symlinked to `docs/base-standards.md` — confirmed at `ADOPT-03`); `ai-specs/agents/`
  (4 files, validated at `ADOPT-09`/`ADOPT-10`); `ai-specs/skills/` (10 directories, validated at
  `ADOPT-11`/`ADOPT-12`); existing client agent/skill directories — `.claude/agents/` confirmed
  absent, `.claude/skills/` confirmed to already hold 6 real OpenSpec-generated directories plus
  one pre-existing, machine-local, absolute-path symlink (`specboot-adopt`, from `ADOPT-00`'s
  bootstrap — untouched by this step, not a canonical `ai-specs/skills/` entry this step governs)
- Selected clients detected: **Claude only** — `ADOPT-00`'s recorded selection, re-confirmed:
  no `.kiro/` directory exists (`find . -maxdepth 1 -iname ".kiro"` → empty)
- Canonical agents and skills determined for exposure: from `ADOPT-09`'s OpenSpec
  agent-selection evidence (`java-backend-developer.md`, the only agent OpenSpec's
  `openspec/config.yaml` context names for this repository's implementation work) **plus**
  `product-strategy-analyst.md` on an actual-applicability basis — technology-agnostic,
  applicable to any repository's ideation-phase/product work regardless of stack, and this
  step's own text forbids skipping an agent "merely because it is not tied to a programming
  stack." Since exposing `product-strategy-analyst.md` was not literally already recorded as
  an OpenSpec "selection" in `ADOPT-09`'s evidence, this was treated as **not** meeting the
  narrow auto-approve criterion ("no different selection, nothing not already in that
  evidence") and was presented to the operator as a live gate rather than assumed
- **Adapter plan presented via `AskUserQuestion`**, exact scope: create `.claude/agents/`
  (new) with 2 relative symlinks (`java-backend-developer.md`, `product-strategy-analyst.md`,
  both `-> ../../ai-specs/agents/...`); add 10 relative symlinks under the existing
  `.claude/skills/` (`adversarial-review`, `code-auditing`, `commit`, `enrich-us`, `explain`,
  `meta-prompt`, `specboot-verify`, `update-docs`, `using-git-worktrees`, `writing-skills`,
  each `-> ../../ai-specs/skills/...`); explicitly **not** exposed: `backend-developer.md`
  (TypeScript/Prisma/Express — wrong stack) and `frontend-developer.md` (React — no frontend
  exists), both preserved in `ai-specs/agents/` untouched; no adapters for any unselected
  client
- **Approval**: landaeta, 2026-08-20, "Approve as-is" (option offered but not chosen: "Skip
  product-strategy-analyst")
- Pre-creation collision check: `comm -12 <(ls ai-specs/skills | sort) <(ls .claude/skills |
  sort)` → empty — no canonical skill name collides with any of the 6 existing real
  OpenSpec-generated directories; **zero collisions, zero symlinks skipped**
- Symlinks created (12 total, all relative, all pointing into `ai-specs/`):
  - `.claude/agents/java-backend-developer.md` → `../../ai-specs/agents/java-backend-developer.md`
  - `.claude/agents/product-strategy-analyst.md` → `../../ai-specs/agents/product-strategy-analyst.md`
  - `.claude/skills/{adversarial-review,code-auditing,commit,enrich-us,explain,meta-prompt,
    specboot-verify,update-docs,using-git-worktrees,writing-skills}` → the matching
    `../../ai-specs/skills/<name>` each
- Real directories preserved, untouched: `.claude/skills/openspec-{apply-change,archive-change,
  explore,propose,sync-specs,update-change}` (6, OpenSpec-generated); `.claude/skills/
  specboot-adopt` (1, `ADOPT-00`'s pre-existing machine-local absolute symlink, not a target of
  this step)
- Existing files unchanged: confirmed via `git status --short` — every entry for this step's
  work is `??` (new, untracked), nothing pre-existing shows as modified
- Unselected clients checked: no `.kiro/` directory exists to create adapters under; none created
- Files modified: `.claude/agents/` (2 new symlinks), `.claude/skills/` (10 new symlinks) — both
  within this step's closed `Allowed modifications` (symlinks under the selected client's native
  agent/skill directories, naming only already-validated agents/skills, never a real directory)
- Per-client provisioning provenance: this session's own `ln -s` invocations, observed directly
  — not inferred from file presence
- Validation, per this step's own list, all PASS (re-run after creation, this session):
  - agent symlinks and recorded targets: PASS — `find .claude/agents -type l -print -exec
    readlink {} \;` → both symlinks, both targets as planned
  - shared skill symlinks and recorded targets: PASS — `find .claude/skills -maxdepth 1 -type l
    -print -exec readlink {} \;` → 10 new symlinks (plus the pre-existing `specboot-adopt`,
    correctly untouched) with correct relative targets
  - target existence under `ai-specs/`: PASS — `test -e` on all 12 new symlinks → all resolve
  - real OpenSpec-generated skill directories: PASS — all 6 confirmed still real directories
    (`find .claude/skills -mindepth 1 -maxdepth 1 -type d -print`)
  - absence of broken symlinks: PASS — `find -L .claude/agents .claude/skills -type l -print` →
    empty
  - absence of malformed symlink names: PASS — `find .claude/agents .claude/skills -type l -name
    "* *" -print` → empty
  - absence of adapters for unselected clients: PASS — no `.kiro/` directory exists
- **Approval gate**: presented and approved as documented above — the live gate, not the
  auto-approve path, since the plan's `product-strategy-analyst.md` exposure was a genuinely
  new decision beyond `ADOPT-09`'s literal OpenSpec-selection evidence
- **Result: PASS** — filesystem validation only; runtime discovery has **not** been claimed and
  requires `ADOPT-15`

---

### `ADOPT-14` — Validate Adapter Files, Symlinks, and Generated Directories

**Read-only re-verification, this session — no files modified**, confirmed by `git diff --
.claude/agents .claude/skills` producing no output (everything from `ADOPT-13` was already
committed and pushed before this step ran). No Kiro paths exist to substitute in per this
step's own "for Claude and Kiro when selected" instruction — Kiro is not selected.

| Check | Command | Result |
|---|---|---|
| `find .claude/agents -type l -print -exec readlink {} \;` | direct execution | PASS — 2 symlinks, targets `../../ai-specs/agents/java-backend-developer.md` and `../../ai-specs/agents/product-strategy-analyst.md` |
| `find .claude/skills -type l -print -exec readlink {} \;` | direct execution | PASS — 11 symlinks total: the 10 new canonical-skill symlinks with correct `../../ai-specs/skills/<name>` targets, plus the pre-existing `specboot-adopt` (absolute, machine-local, from `ADOPT-00`, correctly untouched) |
| `find .claude/skills -mindepth 1 -maxdepth 1 -type d -print` | direct execution | PASS — the 6 real OpenSpec-generated directories, unchanged |
| `find -L .claude/agents .claude/skills -type l -print` | direct execution | PASS (empty) — no broken symlinks |
| Agent adapters point to canonical files | same `readlink` output above | PASS — both resolve into `ai-specs/agents/` |
| Skill adapters point to canonical directories | same `readlink` output above | PASS — all 10 resolve into `ai-specs/skills/` |
| Targets exist | `test -e` on all 12, re-run independently this step | PASS |
| Generated directories remain real | same `find -type d` above | PASS |
| No broken links | same `find -L` above | PASS |
| No malformed symlink names | `find .claude/agents .claude/skills -type l -name "* *" -print` | PASS (empty) |
| No adapters for unselected clients | no `.kiro/` directory exists | PASS |

Total staged symlink count for this repository: 12 client adapter symlinks (2 agent + 10
skill) — the reference run's "26 adapter symlinks... illustrative evidence, not a fixed
target" note applies here too; this repository's own count is smaller because it exposes
only 2 of the 4 canonical agents (the other 2 are wrong-stack/not-applicable) and has only 10
canonical skills to begin with, not 12. Plus the 4 root-instruction symlinks from `ADOPT-03`
(`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`codex.md`), for 16 total across the repository.

No failures found.

- **Approval gate: none** — this step is read-only; no `[HUMAN APPROVAL REQUIRED]` gate applies
- **Result: PASS**

---

### `ADOPT-15` — Validate Runtime Discovery in a Fresh Client Session

**Stop-and-hand-off, per this step's own explicit shape** — the same one `ADOPT-00`'s
discovery probe and `ADOPT-05B`'s permission smoke test already used. This session provisioned
the client adapters at `ADOPT-13`/`ADOPT-14`; its own permission/discovery state was established
before those adapters existed, so this session cannot evidence their runtime discovery. This is
not a decision to present to the operator — there is no "continue in this session instead"
option. Generating the exact fresh-session prompt below and stopping.

**Handoff — run this exact prompt in a fresh Claude Code session** (a new session, not a
continuation of this one):

```text
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
```

Procedure for that fresh session: close this session, open a new one at the repository root,
use Claude's default mode, submit the prompt above verbatim, and record automatic discovery (1)
separately from explicit invocation (2), normal manual reading during task execution (3 — not a
discovery failure), and prohibited manual injection (4 — the only thing that actually fails
this step). Repeat once per selected client — Claude only, in this run.

| Client | Status |
|---|---|
| Claude | PASS — see evidence below |

**Fresh-session evidence obtained**, second attempt (the first, same-session attempt was
correctly refused and is recorded in the Correction record below). The operator opened a
genuinely separate Claude Code window (VSCode extension) at this same repository path and ran
the exact handoff prompt verbatim; its full report was relayed back to this session verbatim.
Authenticity cross-checks performed on the relayed transcript before trusting it: the reported
primary risk (the `HttpErrorHandler.unhandledExceptions` parameter-type mismatch) matches this
repository's own already-documented, citation-backed defect from `ADOPT-06`
(`docs/api-spec.yml`'s `x-known-risks-and-defects`), confirming the fresh session actually
inspected this repository rather than producing a generic answer; the reported file set
(`PriceController.java`, `PriceEntity.java`, `V1_create_tables.sql`, `HttpErrorHandler.java`)
and line citations are consistent with this repository's real structure.

- **Client and active agent/mode**: Claude Code (VSCode extension); no subagent or slash-command
  mode active — the review ran in the main session
- **Root repository instruction files automatically loaded** (1 — automatic discovery):
  `/Users/landaeta/.claude/CLAUDE.md` (user-global), project-root `CLAUDE.md` (the `ADOPT-03`
  symlink to `docs/base-standards.md`), `.claude/CLAUDE.md` (the `.claude`-scoped bootstrap
  instruction file)
- **Canonical/adapted agent definitions automatically discovered** (1): the full agent-type
  listing surfaced automatically and included `java-backend-developer` and
  `product-strategy-analyst` — the exact two agents `ADOPT-13` exposed, and only those two (no
  `backend-developer`/`frontend-developer`/`backend-implementer`, matching `ADOPT-09`'s decision
  not to expose them). **Invocation (2)**: neither was invoked — correctly reported separately,
  not a discovery failure, since this was read-only analysis
- **Skills automatically discovered** (1): the full skill catalog surfaced automatically,
  including `specboot-adopt` and the 10 canonical skills exposed at `ADOPT-13`. **Invocation
  (2)**: none invoked. Notably, the fresh session caught a real tension and reported it rather
  than silently resolving it either way: `.claude/CLAUDE.md`'s bootstrap instruction block
  (`ADOPT-00`'s own provisioning, "Run the `specboot-adopt` skill... This block is temporary and
  is removed at `ADOPT-18`") unconditionally directs running an adoption/bootstrap workflow that
  can write files, which conflicts with this step's own explicit read-only/no-modification
  constraint. The session correctly did **not** run it, and flagged the conflict instead of
  choosing silently — the right call, and exactly the kind of prohibited-manual-injection
  temptation interpretation rule (4) exists to catch, avoided here in the direction of *not*
  running something, not toward fabricating discovery
- **Project documentation consumed**: `docs/base-standards.md`, `docs/backend-standards.md`,
  `openspec/config.yaml`, `.specboot/adoption/*` (listing only) — manual reading (3), normal task
  execution, not a discovery failure
- **CodeGraph tools or commands used**: the `UserPromptSubmit` hook (`codegraph prompt-hook`,
  `.claude/settings.json`) fired automatically (1) before any action was taken, returning
  verbatim source for `PriceService`/`PriceRepository`/`PriceServiceImpl`/`PriceModel`; no manual
  `codegraph_explore` call was made — the rest of the review used direct `Read`/`Bash` because
  the actual risk lived in files (`PriceController`, `HttpErrorHandler`) outside what the hook
  happened to auto-match on the prompt text
- **Resources opened manually because automatic discovery didn't reach them**:
  `PriceController.java`, `PriceEntity.java`, `V1_create_tables.sql`, `HttpErrorHandler.java`,
  `docs/base-standards.md`, `openspec/config.yaml`, `.claude/settings.json` — reported explicitly
  as manual (3), not claimed as automatic
- **Primary implementation risk reported**: the global fallback exception handler
  (`HttpErrorHandler.unhandledExceptions`) cannot actually run for the one input-validation gap
  the controller already has — `PriceController.java:28`'s fixed-pattern `LocalDateTime.parse`
  throws a plain `DateTimeParseException` (not `HttpException`) on malformed input, and
  `HttpErrorHandler.java:24-25`'s `@ExceptionHandler(Exception.class)` method declares its
  parameter as `HttpException`, so Spring MVC cannot bind the actual thrown type and falls
  through to its own default error resolution instead of this handler's structured body — the
  intended "anything unhandled" safety net is unreachable for the most likely unhandled case on
  this service's only endpoint. This is the same defect this run already documented at `ADOPT-06`
  (`docs/api-spec.yml`'s `x-known-risks-and-defects`, `unhandled-exception-handler-parameter-type-mismatch`),
  independently rediscovered here rather than fed to the session
- **Files modified**: none — confirmed both by the fresh session's own report and by this
  session's own `git status --short` after relay, showing no working-tree change attributable to
  that session
- **PASS/FAIL for automatic runtime discovery, per this step's own interpretation rules**: PASS
  — (1) automatic instruction/catalog/CodeGraph discovery genuinely happened (root instructions,
  agent roster, skill catalog, CodeGraph hook, all before any agent action); (4) prohibited
  manual injection did not occur (the session explicitly refused to front-load or force-run
  anything to manufacture a pass, including declining the bootstrap skill instruction it was
  handed). Neither of this step's two actual failure conditions ("(1) did not happen or the
  operator had to perform (4)") occurred
- **Approval gate: none** — read-only, and the prompt forbade file modification; confirmed
  followed
- **Result: PASS**

---

### `ADOPT-16` — Run the Project Baseline

- Command determined from repository evidence: `pom.xml` (Java 11, Spring Boot 2.4.5, Maven —
  confirmed at `ADOPT-01`) names Maven as the build tool. The repository's own `mvnw`/`mvnw.cmd`
  wrapper exists but is **broken in this checkout**: `.mvn/wrapper/` is entirely absent (`find
  .mvn -type f` → "No such file or directory"; not tracked in git either), so `./mvnw test`
  failed attempting to download the wrapper jar over the network
  (`org.apache.maven.wrapper.MavenWrapperMain` `ClassNotFoundException`) — a pre-existing
  repository defect, not something this adoption introduced or is scoped to fix. Fell back to
  the globally installed Maven already confirmed at `ADOPT-01` (`Apache Maven 3.9.16`), per this
  step's own "do not assume a build system... determine from repository evidence" combined with
  `ADOPT-01`'s prior finding that this exact Maven version is the reference-matching, already
  validated toolchain
- **Failed attempt 1**: `./mvnw -q test` — exit reported `0` from the wrapper's own curl/java
  invocation chain but produced no test execution at all, only the wrapper-jar-download failure
  above. Diagnosis: broken `.mvn/wrapper/` directory, unrelated to the "stale build output" this
  step's own named guidance addresses — no `target/` reuse was involved, since this was a
  complete tooling failure before any compilation began. Recovery: switched to the system `mvn`
  binary rather than attempting to repair or download wrapper files (network access for a
  wrapper-jar fetch is exactly the kind of unscoped mutation this adoption avoids without cause)
- **Final command**: `mvn test`, exit `0`
- Tests reported: `Tests run: 8, Failures: 0, Errors: 0, Skipped: 0` — `[INFO] BUILD SUCCESS`,
  total time 9.980s (per-class breakdown: `PriceEntityModelConverterTest` 1, `PriceServiceImplTest`
  1, `AppPricesRestApplicationTests` 1, `PriceControllerTest` 5)
- Warnings: none observed in the build output beyond ordinary Spring Boot startup `INFO` logging
- Stale-build-output check: `target/` did not exist before this run (confirmed by its own
  directory timestamp matching this run's execution time) — this was a genuinely clean rebuild,
  not a reused stale one; the reference run's `mvn -o clean test`/offline-cache complication
  never arose here since `mvn test` (no `-o`, no prior `target/`) was used directly
- `openspec doctor`: `OpenSpec root: ok`, `References: (none declared)`, no warnings, exit 0
- `git status --short`: empty — clean working tree after the baseline run (`target/` is
  git-ignored, confirmed by its absence from `git status` output)
- `codegraph sync`: `Already up to date` — CodeGraph's index required no refresh after this
  session's own prior work (last indexed at `ADOPT-04`, no source changes since that would
  invalidate it)
- **Approval gate**: not reached — no generated build output was removed or relocated; `target/`
  was created fresh by this run's own build, never pre-existing, so the removal/relocation gate
  never applied
- **Result: PASS**

---

### `ADOPT-17` — Review and Create a Clean Local Checkpoint

- Branch: `experiment/specboot-ai-adoption-v5`
- `git status --short`: **empty**. `git diff`: **empty**. `git diff --stat`: **empty**.
  `git status --porcelain=v1 --untracked-files=all`: **empty** — no untracked files exist either
  (`target/` is present but git-ignored, confirmed already at `ADOPT-16`)
- **Nothing to stage.** This is not a step failure or a skipped review — it is the direct,
  expected consequence of this run's own discipline throughout `ADOPT-00`–`ADOPT-16`: every
  single step, including every read-only validation step, was checkpointed individually
  (commit + push) immediately upon reaching PASS, per the checkpoint protocol's own instruction
  to checkpoint "before starting the next step's `Action`, not merely at some point after this
  one's." `ADOPT-17`'s own stated purpose — "Preserve the adoption as a reviewable local
  checkpoint before starting product work" — is therefore already satisfied, distributed across
  the 24 prior checkpoints this run recorded rather than concentrated into one final commit here.
  There is no single "the adoption's changes" diff left unpreserved for this step to capture.
- Staged diff: N/A — nothing was staged, so no `staged.diff` was created, reviewed, or needed
  deletion; the staged-scope checklist has no staged content to check against it
- `git diff --cached --check`: N/A — nothing staged
- Verification that the local branch and `origin` already agree, so "clean local checkpoint"
  and "already pushed" are the same state here: `git rev-parse HEAD` →
  `87dcebd7e614102f2c8001cd5ceed14105e3fb25`; `git rev-parse
  origin/experiment/specboot-ai-adoption-v5` → identical — confirmed exact match
- Acceptance criteria, evaluated against this step's own list:
  - Baseline passes: PASS — `ADOPT-16`
  - OpenSpec passes: PASS — `ADOPT-16`'s `openspec doctor`, re-confirmed unchanged (no writes
    since)
  - CodeGraph is current: PASS — `ADOPT-16`'s `codegraph sync` → "Already up to date"
  - Diff contains only intended adoption changes: vacuously PASS — the diff is empty; every
    intended change already went through its own step's own review and staged-scope discipline
    at the checkpoint that actually introduced it
  - Staged diff reviewed and saved: N/A, nothing staged — recorded as N/A rather than silently
    omitted
  - `git diff --cached --check` triaged: N/A, nothing staged
  - Staged-scope checklist: N/A, nothing staged
  - Independent final validation after any correction: N/A — no correction occurred in this
    step
  - Checkpoint protocol steps followed in order, both approvals recorded separately: N/A for
    this specific checkpoint (no commit/push act exists here to gate) — already true for every
    prior checkpoint that did act, each recorded individually above
  - Remote-impact assessment performed and reported before push approval: N/A — no push to
    perform; `origin` and `HEAD` already agree
  - Push targeted the current working branch, non-force: N/A — no push performed by this step
- **Approval gate**: not reached — there is no commit or push act for either gate to cover
- **Result: PASS** — the adoption's clean local checkpoint already exists, incrementally, and is
  already fully pushed

---

### `ADOPT-18` — De-bootstrap and Reconcile Client Artifacts

- **Precondition check, before any removal**: `ADOPT-17` = PASS (above); mandatory-capability
  completeness (`ADOPT-11`/`ADOPT-12`) re-confirmed PASS immediately before the first removal —
  `test -d ai-specs/skills/{enrich-us,specboot-verify,adversarial-review}` → all present;
  `find .claude/skills -maxdepth 1 -iname "openspec-*"` → all 6 present
- Delivery mode read from the manifest: `source-linked`. Both `modeObligations` (`payload`,
  `container`) already recorded `SKIPPED — source-linked mode` from `ADOPT-00` — re-confirmed
  unchanged, never re-interpreted
- Pre-cleanup entry count by `ownership`/`mode`: 3 entries total — 2 `bootstrap-created`
  (`.claude/skills/specboot-adopt`, mode `symlink`; `.claude/CLAUDE.md`, mode `real-file`), 1
  `pre-existing-modified` (`.gitignore`, mode `appended-block`)
- Replacement verification (step 2): all 3 entries carry `intended-permanent-replacement: null` —
  none require a replacement to exist before removal; verified this is correct for each (the
  orchestration skill has no permanent equivalent by design; `.claude/CLAUDE.md`'s and
  `.gitignore`'s bootstrap content is meant to disappear entirely, not be replaced by anything).
  No "unresolved replacement" refusal condition was reached
- **Disposition plan presented via `AskUserQuestion`** with the exact 4 actions (3 manifest
  entries + the machine-local store), **approved by landaeta**, "Approve as-is", before any
  removal — per this step's `[HUMAN APPROVAL REQUIRED]` gate
- Actions taken, per entry, by `mode` (step 3):
  - `.claude/skills/specboot-adopt` (`symlink`) → **unlinked**. Verified absent:
    `ls .claude/skills/specboot-adopt` → "No such file or directory"
  - `.claude/CLAUDE.md` (`real-file` at `ADOPT-00`, but no longer matching that shape) →
    **its actual current content was read before acting**, per this step's own explicit
    instruction for exactly this case: `ADOPT-05` had appended its own permanent, non-bootstrap
    `CODEGRAPH_START`/`CODEGRAPH_END` block into this same file after `ADOPT-00` created it.
    Treated as `appended-block` in practice despite the manifest's recorded `mode: real-file`:
    removed **only** the `<!-- SPECBOOT-BOOTSTRAP:BEGIN -->`...`<!-- SPECBOOT-BOOTSTRAP:END -->`
    block (5 lines plus its trailing blank line), leaving the CodeGraph block — and the file
    itself — intact. `git diff .claude/CLAUDE.md` confirms exactly that 6-line removal, nothing
    else touched
  - `.gitignore` (`appended-block`) → removed **only** the `# SPECBOOT-BOOTSTRAP:BEGIN`...`#
    SPECBOOT-BOOTSTRAP:END` block (4 lines: header, 2 ignore rules, footer). The durable
    `.specboot/staging/` line — placed outside the block by `ADOPT-00` precisely so this removal
    would never touch it — and every pre-existing Spring Boot boilerplate line are byte-unchanged.
    `git diff .gitignore` confirms exactly that 4-line removal
- Step 4 (convert bootstrap-created root instruction files to canonical symlinks): **N/A** —
  none of the 4 root instruction files (`AGENTS.md`/`CLAUDE.md`/`GEMINI.md`/`codex.md`) are
  manifest entries; they were created at `ADOPT-03` (the import step), already as the canonical
  relative symlinks to `docs/base-standards.md`, and remain so — re-verified via `readlink` on
  all 4, unchanged
- Step 5 (transient payload container): **N/A, `SKIPPED — source-linked mode`** — `.specboot/bootstrap/`
  was never created at any point in this run; re-confirmed absent (`ls .specboot/bootstrap/` →
  "No such file or directory")
- Step 5b (machine-local source-path store): `.specboot/local/` **removed** by name —
  `rm -rf .specboot/local/`, re-confirmed absent via `ls .specboot/` (only `adoption/` remains).
  The external canonical source it pointed at (`/Users/landaeta/repos/specboot`) was never
  touched — removing a pointer never follows what it named
- Step 6 (unselected-client artifact removal): **N/A** — `find . -maxdepth 1 -iname ".kiro" -o
  -maxdepth 1 -iname ".agents"` → empty; no artifacts existed for Kiro or Codex to remove
- Step 7 (re-validation): `ADOPT-14`'s filesystem checks re-run in full, PASS — agent symlinks
  (2) and skill symlinks (10) all resolve correctly into `ai-specs/`; `.claude/skills/specboot-adopt`
  correctly no longer present; the 6 real OpenSpec-generated directories unchanged; zero broken
  symlinks (`find -L .claude/agents .claude/skills -type l -print` → empty); zero malformed
  names; all 4 root symlinks still resolve to `docs/base-standards.md`; no unselected-client
  adapters. **Second `ADOPT-15` fresh-session check determination**: disposition touched
  `.gitignore`, whose `ownership` is `pre-existing-modified` — **outside** the manifest's exact
  `bootstrap-created` set (`{.claude/skills/specboot-adopt, .claude/CLAUDE.md}`) — so per this
  step's own rule, the `ADOPT-14` filesystem re-check alone is **not** a sufficient substitute
  here; the full fresh-session check is **mandatory**. This is not a decision to present to the
  operator, per this step's own explicit text — the exact fresh-session prompt is generated and
  this step stops below, exactly as `ADOPT-15` and `ADOPT-05B` already did
- Step 8 (write-back): `.specboot/adoption/BOOTSTRAP-MANIFEST.json` updated in place — all 3
  entries now carry `cleanup-status: "removed"` and an explicit `final-disposition` string
  documenting exactly what was done and why (including the appended-block-in-practice reasoning
  for `.claude/CLAUDE.md`); a new `debootstrap` block records the machine-local store's removal,
  the unselected-client-artifacts finding, the completeness-check-before-first-removal
  confirmation, the `ADOPT-14` re-validation result, and the second-fresh-session-check
  requirement and reason. Valid JSON confirmed (`python3 -c "import json; json.load(...)"`)
- **Refusals reached**: none — no unresolved replacement, no unrecorded content found in scope
  for removal (both refusal conditions this step names were never triggered)
- **Broken-symlink scan**: `find -L .claude/agents .claude/skills -type l -print` → empty
- **Approval**: landaeta, 2026-08-20, "Approve as-is" (the exact 4-item disposition plan above),
  via `AskUserQuestion`
- **Result: PENDING** — every removal/conversion is complete and terminal, the manifest is
  written back, but this step's own acceptance criteria require the mandatory second
  `ADOPT-15` fresh-session re-validation to PASS before this step itself can be marked PASS.
  Handed off below, stop-and-hand-off, exactly as `ADOPT-15` and `ADOPT-05B` already used.

**Handoff — run this exact prompt in a fresh Claude Code session** (a new session, not a
continuation of this one, opened at this same repository path — same requirement `ADOPT-15`
already established, including that this session cannot self-evidence it):

```text
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
```

This re-check specifically confirms: `specboot-adopt` no longer appears in the discovered skill
catalog (it was removed by this step); `.claude/CLAUDE.md`'s surviving `CodeGraph` guidance is
still discovered automatically; nothing else regressed as a side effect of the `.gitignore` and
`.claude/CLAUDE.md` edits.

| Client | Status |
|---|---|
| Claude | PASS — see evidence below |

**Fresh-session evidence obtained.** The operator opened a genuinely separate Claude Code window
at this repository path and ran the exact handoff prompt verbatim; its full report was relayed
back verbatim. Authenticity cross-checks before trusting it: the agent roster it discovered is
exactly the 2 `ADOPT-13`-exposed agents (`java-backend-developer`, `product-strategy-analyst`),
with no mention of `specboot-adopt` among the skills it lists as discovered — consistent with
this step's own removal of that skill; the reported primary risk (the untested
`PriceRepository` derived query and its undocumented `PRIORITY` tie-break) matches this run's own
already-documented, citation-backed risk from `ADOPT-06`
(`docs/api-spec.yml`'s `x-known-risks-and-defects`,
`no-covering-test-for-repository-query-method`) and CodeGraph's own blast-radius flag
(`⚠️ no covering tests found`) — genuine repository-specific findings, not a generic answer.

- **Client and active agent/mode**: Claude Code (VSCode extension), default `claude` agent,
  interactive session — no subagent or slash-command mode active
- **Root repository instruction files automatically loaded** (1): `/Users/landaeta/.claude/CLAUDE.md`
  (user-global), project-root `CLAUDE.md` (symlink to `docs/base-standards.md`), `.claude/CLAUDE.md`
  (now carrying only the `CodeGraph` guidance, confirmed — the `SPECBOOT-BOOTSTRAP` block this
  step removed is gone from what the fresh session reports)
- **Agent definitions discovered, not invoked** (1, correctly reported separately from
  invocation): `java-backend-developer.md`, `product-strategy-analyst.md` — exactly the 2 agents
  `ADOPT-13` exposed, confirming the adapter symlinks this step's removals ran alongside are
  intact and unaffected
- **Skills discovered, none invoked** (1): full roster surfaced automatically; the session
  explicitly named `code-auditing`, `specboot-verify`, `adversarial-review` as present, and did
  **not** name `specboot-adopt` — the intended, direct confirmation that this step's removal of
  `.claude/skills/specboot-adopt` succeeded and did not somehow leave a stale roster entry behind
- **Project documentation consumed**: `docs/base-standards.md` (auto-loaded via the `CLAUDE.md`
  symlink) — manual reading (3), reported honestly as not extending to the other `docs/*` files
  since they weren't needed for this finding
- **CodeGraph tools used**: the `UserPromptSubmit` hook fired automatically (1) before any
  action, returning 32 symbols across 4 files including the same "no covering tests" blast-radius
  flag this run's own `ADOPT-06` evidence already cites — confirms the hook (and by extension
  `.claude/CLAUDE.md`'s surviving CodeGraph guidance) still functions correctly after this step's
  edit to that file
- **Resources opened manually**: `PriceController.java`, `PriceEntity.java`,
  `PriceServiceImplTest.java`, plus `ls`/`find` over `.claude/`, `.codegraph/`, `ai-specs/`,
  `openspec/`, `docs/`, `src/`, `.specboot/` — reported explicitly as manual (3), not claimed as
  automatic
- **Primary implementation risk reported**: `PriceRepository`'s derived query
  (`findFirstBy...OrderByPriorityDesc`, `PriceRepository.java:13`) is the sole gate on pricing
  correctness with zero repository-level test coverage (`PriceServiceImplTest` mocks the
  repository entirely) and an undocumented tie-break when two rows share equal `PRIORITY` — the
  same risk already documented at `ADOPT-06`, independently rediscovered here
- **Files modified**: none — confirmed both by the fresh session's own report and by this
  session's `git status --short` after relay, showing no working-tree change attributable to it
- **PASS/FAIL for automatic runtime discovery**: PASS — (1) genuinely happened (root
  instructions, agent roster, skill catalog, CodeGraph hook, all automatic and all consistent
  with this step's changes); (4) did not occur
- **Approval gate: none** — read-only, and the prompt forbade file modification; confirmed
  followed
- **Result: PASS** — both `ADOPT-18` acceptance criteria that depended on this evidence
  (`ADOPT-14` re-check PASS, second `ADOPT-15` fresh-session re-check PASS) are now satisfied;
  every other acceptance criterion was already satisfied at the time of the removals above.
  **`ADOPT-18` is PASS.**

---

### `ADOPT-19` — Real-Project End-to-End Pilot

- **Pilot task, named by the human**: "Add validation/error handling for a malformed
  `applicationDate` parameter on `GET /api/price`... This should instead return a proper 400
  Bad Request with the project's standard Error response shape, not a raw stack trace." The
  orchestrator did not select this task — presented three candidates surfaced by the two
  `ADOPT-15` fresh-session discovery reviews and the operator chose and refined one of them,
  explicitly deferring the exact validation approach and acceptance criteria to `enrich-us`.
- **Pilot change name**: `validate-application-date-parameter`
- `enrich-us` → `READY FOR PROPOSAL`: **PASS** — persisted to
  `.specboot/staging/validate-application-date-parameter-enriched.md` (confirmed ignored via
  `git check-ignore -q`, exit 0, before writing); 2 open questions raised (fixing the separate
  `unhandledExceptions` bug; handling missing vs. malformed params), both resolved with a stated
  recommendation to keep scope narrow, not silently assumed
- propose: **PASS** — `proposal.md`, `specs/price-lookup-request-validation/spec.md` created;
  `design.md` deliberately skipped as not needed (single new class following an existing
  pattern, no new dependency, no data-model change, the one technical decision already resolved
  in the proposal) — reasoned through this step's own conditional-artifact rule, not skipped by
  default
- apply: **PASS** — 13/13 tasks complete (11 original + 1 added mid-implementation for the
  adversarial-review fix, plus its own test-coverage sub-item folded into 3.2); feature branch
  `feature/validate-application-date-parameter-backend` created first per
  `docs/base-standards.md` section 6.2
- tests: **PASS** — `mvn test` (the `ADOPT-16`-validated fallback for this checkout's broken
  `./mvnw`): 12/12 tests pass, 0 failures/errors/skipped, final run after the adversarial-review
  fix; `openspec validate --strict validate-application-date-parameter` → valid
- `specboot-verify`: **PASS** — full report persisted at
  `openspec/changes/archive/2026-08-25-validate-application-date-parameter/specboot-verify-report.md`
  (now under the archived change directory); every completed task checked against disk evidence,
  every requirement/scenario checked, all 6 workflow capabilities confirmed available for Claude
- `adversarial-review`: **PASS** (after one fix) — reviewer provenance:
  - **Pass 1 — genuinely independent**: a subagent spawned via the Agent tool with
    `isolation: worktree` (separate git worktree, no shared context with the implementing
    session's own reasoning) — found a real **Major**: the `applicationDate` formatter's default
    `ResolverStyle.SMART` silently corrected nonexistent calendar dates (e.g. `2020-02-30`) to a
    nearby valid one instead of rejecting them, confirmed live via `curl`, defeating the
    validation's own purpose for a plausible real input. Verdict: PASS WITH GAPS.
  - **Fix applied**: task 2.3 — `ResolverStyle.STRICT`, with the pattern's year field changed
    from `yyyy` to `uuuu` (the well-known Java gotcha where `yyyy` + `STRICT` requires an era and
    would otherwise reject every date, not just invalid ones); new regression test added; spec
    gained a corresponding scenario
  - **Pass 2 — same-session fallback, named explicitly**: continued the pass-1 subagent (same
    reviewing context, re-read the current file state fresh rather than trusting a description)
    rather than spawning a newly isolated worktree — the reviewing agent itself flagged this
    distinction unprompted, and it is recorded here exactly as it flagged it, not smoothed into
    an unqualified "independent" claim. Independently re-ran `mvn -Dtest=PriceControllerTest
    test` and a live `curl` reproduction; confirmed the Major resolved, no regressions on the 5
    original happy-path dates or the 3 previously-passing error cases; found one Minor
    (`docs/api-spec.yml`'s 400 description didn't name the nonexistent-calendar-date case
    explicitly) — fixed. Verdict: PASS.
  - Full report persisted at
    `openspec/changes/archive/2026-08-25-validate-application-date-parameter/adversarial-review-report.md`
- docs and spec sync: **PASS** — `docs/api-spec.yml` (new `400` response, revised `500`
  description, revised known-risk entry, Minor fix from pass 2) and `docs/backend-standards.md`
  (new exception cited) updated as part of implementation; delta spec synced to
  `openspec/specs/price-lookup-request-validation/spec.md` (first-time capability — new main
  spec created from the delta's `ADDED Requirements`, verified byte-identical below the header
  via `diff` before the change directory was moved)
- archive (both verdicts plus explicit human approval): **PASS** — both `specboot-verify` and
  `adversarial-review` at PASS; archive plan (full pilot summary, including the adversarial-review
  Major and its fix) presented via `AskUserQuestion`; **approved by landaeta**, "Approve archive"
  — `openspec/changes/validate-application-date-parameter/` moved to
  `openspec/changes/archive/2026-08-25-validate-application-date-parameter/`, no target-exists
  collision
- **Deviations encountered and their recovery**:
  1. `operationGuidance` from `openspec instructions apply` advised running `./mvnw test`, which
     conflicts with the already-established fact (`ADOPT-16`) that `./mvnw` is broken in this
     checkout — advisory guidance yielded to the controlling, already-established fact; `mvn
     test` used throughout instead, per the apply skill's own rule that guidance conflicting
     with a controlling input is not followed, with the reason explained (recorded here and in
     the implementation transcript)
  2. Adversarial review's first pass found a real Major not caught by `specboot-verify` or the
     implementer — this is not a deviation from the workflow, but the workflow's own two-gate
     design working exactly as intended (plan-conformance checking cannot see "is the plan
     itself sufficient"); recorded as the clearest possible evidence this pilot actually proves
     the workflow functions, not merely that its steps can be executed
- **Result: PASS**

> Evidence for the six capabilities is recorded in the **Daily workflow pilot** block below —
> that block is the sink for this step, not a parallel record.

---

### `ADOPT-20` — Pull-Request Readiness Gate

**Verification only — this step creates nothing and modifies nothing.** Confirmed from recorded
evidence, step by step, individually — not inferred from "looks done."

| Step | Recorded status | Evidence pointer |
|---|---|---|
| `ADOPT-00` | PASS — fresh-session discovery-and-execution gate observed | run log line 107 |
| `ADOPT-01` | PASS | run log line 194 |
| `ADOPT-02` | PASS | run log line 212 |
| `ADOPT-03` | PASS | run log line 230 |
| `ADOPT-04` | PASS (mandatory) | run log line 248 |
| `ADOPT-05` | PASS (mandatory) | run log line 261 |
| `ADOPT-05B` | PASS — resolved via the alternative criterion for the one available client/OS (Claude/macOS); Linux/Windows legitimately `PENDING EVIDENCE` (no machine available, permanent residual per this step's own "every unavailable supported combination is recorded as PENDING EVIDENCE" PASS criterion — not a blocker) | run log line 290 |
| `ADOPT-06` | PASS | run log line 358 |
| `ADOPT-07` | PASS | run log line 381 |
| `ADOPT-08` | PASS | run log line 405 |
| `ADOPT-09` | PASS | run log line 436 |
| `ADOPT-10` | PASS | run log line 536 |
| `ADOPT-11` | PASS | run log line 563 |
| `ADOPT-12` | PASS | run log line 650 |
| `ADOPT-13` | PASS | run log line 679 |
| `ADOPT-14` | PASS | run log line 757 |
| `ADOPT-15` | PASS — second-attempt evidence; first attempt correctly refused, recorded in the Correction record, never counted as PASS | run log line 792 |
| `ADOPT-16` | PASS | run log line 918 |
| `ADOPT-17` | PASS | run log line 960 |
| `ADOPT-18` | PASS — second-pass evidence; disposition complete, second fresh-session re-check PASS | run log line 1008 |
| `ADOPT-19` | PASS | run log line 1187; Daily workflow pilot block |

- **Any row at FAIL, PENDING, or blank (must be NONE)**: **NONE** — every one of the 20 rows above
  reads a recorded `PASS`. (`ADOPT-05B`'s internal per-client-OS sub-table carries two `PENDING
  EVIDENCE` rows for unavailable machines, which is that step's own documented, non-blocking PASS
  path — not the step-level status this gate checks.)
- **Readiness verdict: READY**
- **Approval**: presented below via `AskUserQuestion`, before any pull request is created — per
  this step's own `[HUMAN APPROVAL REQUIRED]` gate, separate from any prior approval
- **Pull request created (identifier), if any**: none yet — awaiting the approval above
- **Result: PASS** (readiness confirmed; PR creation itself is gated separately, immediately below)

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
| 15 | (SHA-backfill delta) + `ADOPT-10` | grouped **as executed, not as planned**: `ADOPT-10` made zero repository-local writes of its own (read-only step), so its only staged content beyond the mandatory `ADOPT-09` SHA-backfill line is its own evidence — no independently stageable state to split into a second commit | `ADOPT-10`: PASS — 11/11 documented checks pass, no files modified (see run log evidence block above) | run log `ADOPT-09` SHA-backfill line; run log `ADOPT-10` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `0b36bfc` | unchanged from checkpoint 14 (no new writes to any CI/ruleset/webhook/branch-protection surface) | pushed — fast-forward `ded9224..0b36bfc`, exit 0, non-force | none raised at this checkpoint |
| 16 | `ADOPT-11` | not a group — single step | PASS — `code-auditing/SKILL.md` and its `audit-methodology.md` reference adapted to detect Java/JVM alongside JS/TS/Python/Go; 9/10 skills confirmed already technology-agnostic or stack-detecting (grep-verified, `using-git-worktrees` and `writing-skills` individually reasoned through); mandatory-capability completeness check PASS for all 6 required capabilities | run log `ADOPT-11` evidence block above | YES — staged set is exactly `{ai-specs/skills/code-auditing/SKILL.md, ai-specs/skills/code-auditing/references/audit-methodology.md, .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-11`'s closed allowlist (`ai-specs/skills/` only) plus the always-permitted run log; no client-generated skill directory touched | YES — declared after independent review of `git diff --cached --stat` (3 files) | this step's own approval gate is **none beyond the edit being reviewable**; modifications limited to `ai-specs/skills/`, and no external research was performed so the authorization-first rule for that case was not triggered. The checkpoint's own commit/push gates auto-approve under standing authorization: staged set is a subset of `ADOPT-11`'s `Allowed modifications`, push conditions independently verified below | `ai-specs/skills/code-auditing/SKILL.md`, `ai-specs/skills/code-auditing/references/audit-methodology.md`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `cfedf57` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `0b36bfc..cfedf57`, exit 0, non-force | none raised at this checkpoint |
| 17 | `ADOPT-12` | not a group — single step | PASS — all 12 documented checks pass, no files modified, no failures found (see run log evidence block above) | run log `ADOPT-12` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `cfb27c4` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `cfedf57..cfb27c4`, exit 0, non-force | none raised at this checkpoint |
| 18 | `ADOPT-13` | not a group — single step | PASS — 12 relative symlinks created (2 agents, 10 skills), all resolve, zero broken links, zero malformed names, zero collisions with the 6 real OpenSpec-generated skill directories (all preserved untouched), no adapters for any unselected client | run log `ADOPT-13` evidence block above | YES — staged set is exactly `{.claude/agents/ (2 new symlinks), .claude/skills/ (10 new symlinks), .specboot/adoption/ADOPTION-RUN-LOG.md}`, matching `ADOPT-13`'s closed rule (symlinks under the selected client's native agent/skill directories, naming only already-validated agents/skills, never a real directory) plus the always-permitted run log; `.claude/skills/specboot-adopt` (pre-existing, machine-local) and the 6 real `openspec-*` directories confirmed untouched | YES — declared after independent review of `git status --short` (all new entries `??`, nothing pre-existing modified) | this step's own content-approval gate was **live** — `product-strategy-analyst.md`'s exposure was a new decision beyond `ADOPT-09`'s literal OpenSpec-selection evidence, not eligible for the narrow auto-approve criterion; presented via `AskUserQuestion`, approved by landaeta ("Approve as-is"). The checkpoint's own commit/push gates auto-approve separately under standing authorization: staged set is a subset of `ADOPT-13`'s `Allowed modifications`, push conditions independently verified below | `.claude/agents/java-backend-developer.md`, `.claude/agents/product-strategy-analyst.md`, `.claude/skills/{adversarial-review,code-auditing,commit,enrich-us,explain,meta-prompt,specboot-verify,update-docs,using-git-worktrees,writing-skills}`, `.specboot/adoption/ADOPTION-RUN-LOG.md` | `9d776e3` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `cfb27c4..9d776e3`, exit 0, non-force | none raised at this checkpoint |
| 19 | `ADOPT-14` | not a group — single step | PASS — all 11 documented checks pass, no files modified, no failures found (see run log evidence block above) | run log `ADOPT-14` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `ffb5786` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `9d776e3..ffb5786`, exit 0, non-force | none raised at this checkpoint |
| 20 | (SHA-backfill delta) + `ADOPT-15` hand-off | grouped **as executed, not as planned**: `ADOPT-15`'s own text requires a stop-and-hand-off with no repository-local write beyond generating the prompt in the run log itself — no independently stageable state to split from the mandatory `ADOPT-14` SHA-backfill line | `ADOPT-15`: PENDING at this point (stop-and-hand-off is the documented action, not a step result) | run log `ADOPT-14` SHA-backfill line; run log `ADOPT-15` hand-off block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `a6f147c` | unchanged from checkpoint 19 (no new writes to any CI/ruleset/webhook/branch-protection surface) | pushed — fast-forward `ffb5786..a6f147c`, exit 0, non-force | none raised at this checkpoint |
| 21 | `ADOPT-15` first-attempt correction (near-miss record) | not a group — a single, self-contained correction record, distinct from checkpoint 20's hand-off and from checkpoint 22's eventual PASS | n/a — no step reached PASS in this checkpoint; this is the documented refusal to fabricate evidence | run log `ADOPT-15` Correction record entry above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `0e37478` | unchanged from checkpoint 20 (no new writes to any CI/ruleset/webhook/branch-protection surface) | pushed — fast-forward `a6f147c..0e37478`, exit 0, non-force | none raised at this checkpoint |
| 22 | `ADOPT-15` | not a group — single step | PASS — genuinely fresh, separate Claude Code session's transcript relayed back and cross-checked (primary risk matches this run's own `ADOPT-06` citation; file set matches the real repository structure); both of this step's actual failure conditions ((1) not happening, or (4) occurring) absent | run log `ADOPT-15` evidence block above (fresh-session-evidence section) | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `2fb2eb9` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `0e37478..2fb2eb9`, exit 0, non-force | proposal #1 raised at this checkpoint (see Improvement proposals) |
| 23 | (SHA-backfill delta) + `ADOPT-16` | grouped **as executed, not as planned**: this checkpoint's only staged content beyond the mandatory checkpoint-22 SHA-backfill line is `ADOPT-16`'s own evidence; `ADOPT-16`'s `Allowed modifications` is "none by default" (its command's own output — `target/` — is git-ignored, never staged), so there is no independently stageable state to split into a second commit | `ADOPT-16`: PASS — `mvn test` (after the broken `./mvnw` fallback), 8/8 tests, 0 failures/errors/skipped, `openspec doctor` and `codegraph sync` both clean, `git status` empty (see run log evidence block above) | run log checkpoint-22 SHA-backfill line; run log `ADOPT-16` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted (both the SHA-backfill delta and the entirety of `ADOPT-16`'s evidence, since that step wrote no other tracked file) | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `58bd8c2` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `4ab1753..58bd8c2`, exit 0, non-force | none raised at this checkpoint |
| 24 | (SHA-backfill delta) + `ADOPT-17` | grouped **as executed, not as planned**: `ADOPT-17` itself staged nothing (working tree and index were already empty when this step ran — see its own evidence block), so its only staged content is its own evidence text plus the mandatory checkpoint-23 SHA-backfill line; no independently stageable state exists to split from that backfill | `ADOPT-17`: PASS — `git status`/`diff`/`diff --stat` all empty; `HEAD` already equals `origin/experiment/specboot-ai-adoption-v5` before this checkpoint's own commit; every acceptance criterion this step names is either satisfied by a prior checkpoint or correctly recorded N/A given nothing to stage (see run log evidence block above) | run log checkpoint-23 SHA-backfill line; run log `ADOPT-17` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified. **This checkpoint's own commit is itself what closes `ADOPT-17`**: since the working tree was empty when `ADOPT-17`'s Action ran, there was no separate commit/push act for `ADOPT-17` to gate beyond this evidence-recording one, which follows the same standing-authorization path as every other run-log-only delta in this run | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `3978872` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `87dcebd..3978872`, exit 0, non-force | none raised at this checkpoint |
| 25 | `ADOPT-18` | not a group — single step | PENDING — all 4 removals/conversions complete and terminal, manifest written back, `ADOPT-14` re-check PASS, but this step's own acceptance criteria require the mandatory second `ADOPT-15` fresh-session re-check to PASS before the step itself is PASS (see run log evidence block above) | run log `ADOPT-18` evidence block above; updated `BOOTSTRAP-MANIFEST.json` | YES — staged set is exactly `{.claude/CLAUDE.md, .gitignore, .specboot/adoption/ADOPTION-RUN-LOG.md, .specboot/adoption/BOOTSTRAP-MANIFEST.json}`, matching `ADOPT-18`'s closed rule (only manifest-recorded entries, plus the manifest and run log themselves) exactly; `.claude/skills/specboot-adopt`'s removal produces no git diff since it was never tracked (machine-local, git-ignored) — correctly not appearing in the staged set | YES — declared after independent review of `git diff --cached --stat` (4 files) and confirming each diff matches exactly the approved disposition (6-line and 4-line block removals only, nothing else touched) | this step's own content gate was **live**: the exact 4-item disposition plan presented via `AskUserQuestion`, approved by landaeta ("Approve as-is") before any removal. The checkpoint's own commit/push gates auto-approve separately under standing authorization: staged set is a subset of `ADOPT-18`'s `Allowed modifications`, push conditions independently verified below | `.claude/CLAUDE.md`, `.gitignore`, `.specboot/adoption/ADOPTION-RUN-LOG.md`, `.specboot/adoption/BOOTSTRAP-MANIFEST.json` | `00c6270` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `3978872..00c6270`, exit 0, non-force | none raised at this checkpoint |
| 26 | (SHA-backfill delta) + `ADOPT-18` closing | grouped **as executed, not as planned**: this checkpoint's only staged content beyond the mandatory checkpoint-24 SHA-backfill line is `ADOPT-18`'s own closing evidence and manifest update — no independently stageable state exists to split from that backfill | `ADOPT-18`: PASS — second fresh-session re-check confirmed (agent roster matches `ADOPT-13`, `specboot-adopt` correctly absent, risk matches `ADOPT-06`'s own citation), zero files modified by that session (see run log evidence block above) | run log checkpoint-24 SHA-backfill line; run log `ADOPT-18` closing evidence; updated `BOOTSTRAP-MANIFEST.json` `debootstrap` block | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md, .specboot/adoption/BOOTSTRAP-MANIFEST.json}`, both always-permitted adoption-tracking artifacts | YES — declared after independent review of `git diff --cached --stat` (2 files) | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md`, `.specboot/adoption/BOOTSTRAP-MANIFEST.json` | `32aba70` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward `a20510c..32aba70`, exit 0, non-force | none raised at this checkpoint |
| 27 | (SHA-backfill delta only) | not a group — the run log's own commit-SHA cell for checkpoint 26, filled after that commit existed | n/a — no `ADOPT` step's own validation; the run log carrying its one-line delta forward | this row | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted | YES | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `7730282` | unchanged from checkpoint 26 (no new writes to any CI/ruleset/webhook/branch-protection surface) | pushed — fast-forward `32aba70..7730282`, exit 0, non-force | none raised at this checkpoint |
| 28 | `ADOPT-19` | not a group — single step | PASS — human-named pilot task run through the full six-capability daily workflow (enrich-us → propose → apply → tests → specboot-verify → independent adversarial-review → archive), all reaching their required outcome; independent adversarial review found and the pilot fixed a real Major (silent lenient date parsing), proving the two-gate design works, not merely that its steps execute (see run log `ADOPT-19` evidence block and Daily workflow pilot block above) | run log `ADOPT-19` evidence block; Daily workflow pilot block; pilot implementation on branch `feature/validate-application-date-parameter-backend` (commits `d01f3a5`, `2dc636e`, not on this branch) | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}` on this branch (`experiment/specboot-ai-adoption-v5`); `ADOPT-19` itself carries no separate write scope beyond orchestration and evidence recording per its own text — the pilot's actual code/doc/artifact changes live on the pilot's own feature branch, reviewed and approved through that change's own OpenSpec/checkpoint machinery, not this adoption branch's | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified | `.specboot/adoption/ADOPTION-RUN-LOG.md` | `cf02737` | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline — note this row covers only the adoption run log's own delta; the pilot's separate feature-branch commits were never pushed to `origin` (no remote mutation attempted, per the Daily workflow pilot block) | pushed — fast-forward `7730282..cf02737`, exit 0, non-force | none raised at this checkpoint |
| 29 | `ADOPT-20` | not a group — single step | PASS — verification only, no files created or modified; every `ADOPT-00`–`ADOPT-19` row confirmed PASS from recorded evidence, readiness verdict READY (see run log `ADOPT-20` evidence block above) | run log `ADOPT-20` evidence block above | YES — staged set is exactly `{.specboot/adoption/ADOPTION-RUN-LOG.md}`, the run log, always permitted (`ADOPT-20`'s own `Allowed modifications` is "none — verification only," so the run log is the only content this checkpoint could ever carry) | YES — declared after independent review of `git diff --cached` | auto: standing authorization — same conditions as prior checkpoints, re-verified. This checkpoint covers the readiness verification only, not PR creation — that carries its own separate `[HUMAN APPROVAL REQUIRED]` gate, presented after this commit | `.specboot/adoption/ADOPTION-RUN-LOG.md` | (filled at the next checkpoint's SHA-backfill delta) | Inspected read-only: no `.github/` directory; `gh api .../hooks` → `[]`; `gh api .../rulesets` → `[]`; branch protection → 404 "Branch not protected"; matches the `ADOPT-00` baseline exactly. Verdict: unchanged from baseline | pushed — fast-forward, exit 0, non-force | none raised at this checkpoint |

---

## Improvement proposals

| # | Checkpoint | Target file | Proposal | Status (`proposed` / `accepted` / `rejected` / `applied-in-change-<id>`) |
|---|---|---|---|---|
| 1 | `ADOPT-15` (fresh-session probe) | `09-bootstrap.md` (the `.claude/CLAUDE.md` bootstrap-instruction content it generates) | The bootstrap instruction block unconditionally directs every fresh session to "Run the `specboot-adopt` skill," with no carve-out for a session whose actual task is explicitly read-only (for example `ADOPT-15`'s own runtime-discovery probe, or any other read-only request an operator might send to a fresh session before `ADOPT-18` removes the block). The `ADOPT-15` fresh session correctly caught this and refused to run it rather than silently picking a side, but a less careful session might not. Consider having the generated block name an explicit exception for read-only/no-modification requests, or note that a conflicting explicit instruction from the operator takes precedence. | proposed |

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

### Daily workflow pilot (not part of one-time adoption)

```text
Request: Add validation/error handling for a malformed applicationDate parameter on GET
  /api/price, returning a proper 400 Bad Request with the project's standard Error response
  shape instead of a raw stack trace. Named by the human (landaeta), not selected by the
  orchestrator.
Change ID: validate-application-date-parameter
Artifacts: proposal.md, specs/price-lookup-request-validation/spec.md, tasks.md (design.md
  deliberately skipped — not needed for this change's scope)
Implementation: InvalidRequestParameterException (new HttpException subtype, 400) added;
  PriceController.searchPriceForBrandTime validates applicationDate via a STRICT-resolver,
  uuuu-year-pattern DateTimeFormatter and throws the new exception on failure; docs/api-spec.yml
  and docs/backend-standards.md updated
Tests: mvn test — 12/12 pass, 0 failures/errors/skipped (final run, after the adversarial-review
  fix); openspec validate --strict — valid
enrich-us outcome (READY FOR PROPOSAL / NEEDS CLARIFICATION): READY FOR PROPOSAL — 2 open
  questions raised and resolved with a stated narrow-scope recommendation, not silently assumed
Proposal approval: implicit in the operator's "let enrich-us work out the exact validation
  approach" instruction; no separate live gate reached since propose's own content-approval
  criteria (matching what enrich-us already validated) were met
Apply result: PASS — 13/13 tasks complete, feature branch
  feature/validate-application-date-parameter-backend
specboot-verify verdict (PASS / PASS WITH GAPS / FAIL): PASS
Independent adversarial-review verdict (PASS / PASS WITH GAPS / FAIL): PASS WITH GAPS (pass 1),
  then PASS (pass 2, after the fix)
Independent adversarial-review provenance (reviewing session/client; cross-session,
  cross-client, or same-session-fallback): pass 1 — genuinely independent, a subagent spawned
  via the Agent tool with isolation: worktree (separate git worktree, no shared context with
  the implementing session). pass 2 — same-session fallback, named explicitly (continued the
  pass-1 agent rather than spawning a new isolated worktree; the reviewing agent itself flagged
  this distinction unprompted)
Archive approval (explicit human approval, both gates PASS/PASS WITH GAPS): both gates
  satisfied; full pilot summary (including the adversarial-review Major and its fix) presented
  via AskUserQuestion; approved by landaeta, "Approve archive"
Archive result: moved to
  openspec/changes/archive/2026-08-25-validate-application-date-parameter/, no collision
Docs/spec sync: PASS — openspec/specs/price-lookup-request-validation/spec.md created
  (first-time capability), verified byte-identical to the delta's ADDED Requirements via diff
  before the change directory was moved
Commit message: two commits — "Return 400 Bad Request for a malformed applicationDate on GET
  /api/price" (d01f3a5, implementation) and "Archive validate-application-date-parameter, sync
  price-lookup-request-validation spec" (2dc636e, archive)
PR title: not created — this pilot's own scope is proving the workflow, not opening a PR; the
  feature branch and both commits exist and are reviewable
PR description: n/a — no PR created
Remote mutation attempted: NO
Result: PASS
Prompt corrections required: none — the canonical enrich-us/specboot-verify/adversarial-review
  prompts were used verbatim via the Skill tool and Agent tool, no deviation needed
```


### Permission decisions (ongoing, one row per decision)

```text
Client: Claude Code
Mode: interactive, project-local permission allowlist from ADOPT-05B
Command: mvn test / mvn spring-boot:run / curl (localhost) / git / openspec CLI — all used
  throughout ADOPT-19's pilot implementation
Read-only or mutation: mixed — mvn test and curl are read-only against the running app; git
  commit and file edits are local mutations within this repository, all within the standing
  authorization's scope (no remote mutation)
Prompted: no additional prompts beyond ADOPT-05B's established allowlist and this run's own
  live approval gates (archive plan, ADOPT-18 disposition plan)
Decision: proceeded — all commands were either already-allowlisted read-only inspection or
  local, non-remote mutations consistent with the pilot's own approved scope
Reason: implementing and verifying the human-named pilot task through the standard daily
  workflow, per ADOPT-19's own action
```


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
2026-08-20 — ADOPT-11 — adapted code-auditing/SKILL.md and its audit-methodology.md reference to detect Java/JVM alongside the Node/TS-first assumptions found (Phase 0 config-file check, Type Safety section, Dead Code tools list, baseline-check examples); 9 of 10 skills confirmed already technology-agnostic or already stack-detecting, preserved unchanged; mandatory-capability completeness check passed for all 6 required workflow capabilities (3 SpecBoot-owned skills present, 3 OpenSpec-CLI-generated capabilities confirmed actually generated); no external research performed; observed and executed by this session
2026-08-20 — ADOPT-12 — read-only re-verification of the ADOPT-11 skill adaptation; all 12 documented checks PASS, no files modified — no approval gate applies per this step's own text; observed and executed by this session
2026-08-20 — ADOPT-13 — adapter plan (2 agent symlinks, 10 skill symlinks, all relative, all into ai-specs/) presented via AskUserQuestion since exposing product-strategy-analyst.md was a new decision beyond ADOPT-09's literal OpenSpec-selection evidence, not eligible for this step's narrow auto-approve criterion — approved by landaeta: "Approve as-is"; zero collisions with the 6 existing real OpenSpec-generated skill directories, zero symlinks skipped
2026-08-20 — ADOPT-14 — read-only re-verification of the ADOPT-13 client adapters; all 11 documented checks PASS, no broken links, no malformed names, no files modified — no approval gate applies per this step's own text; observed and executed by this session
2026-08-20 — ADOPT-15 — stop-and-hand-off: this session provisioned the client adapters and cannot evidence their runtime discovery for itself; generated the exact fresh-session prompt and stopped, per this step's own explicit shape (same as ADOPT-00/ADOPT-05B) — no approval required (observation/hand-off, not a mutation)
2026-08-20 — ADOPT-15 — first fresh-session attempt landed in this same continuing conversation instead of an isolated session (see Correction record); refused before fabricating evidence, no PASS claimed, no file modified — operator opened a genuinely separate window and reran the exact prompt there — observed by this session, no approval required
2026-08-20 — ADOPT-15 — second attempt: a genuinely fresh, separate Claude Code session's transcript relayed back and cross-checked (primary risk matches this run's own ADOPT-06 citation, file set matches the real repository structure) — result PASS, both automatic-discovery conditions (1)/(4) satisfied — no approval required (observation, not a mutation)
2026-08-20 — ADOPT-16 — ./mvnw test failed (broken .mvn/wrapper/, pre-existing repository defect, not fixed as out of scope); fell back to the already-validated system mvn 3.9.16 from ADOPT-01 — mvn test passed clean on first attempt with the fallback, 8 tests/0 failures/0 errors/0 skipped, openspec doctor and codegraph sync both clean, git status empty — no approval required (no build output removed or relocated)
2026-08-20 — ADOPT-17 — git status/diff all empty; this run's own discipline of checkpointing every step individually throughout ADOPT-00-ADOPT-16 already satisfies this step's "clean, reviewable local checkpoint" purpose, distributed across 24 prior checkpoints rather than one final commit here — no commit or push act exists for this step to gate; result PASS, no approval required
2026-08-20 — ADOPT-18 — de-bootstrap disposition plan (unlink .claude/skills/specboot-adopt; remove only the SPECBOOT-BOOTSTRAP block from .claude/CLAUDE.md and .gitignore; remove .specboot/local/) presented via AskUserQuestion — approved by landaeta: "Approve as-is"; all 3 manifest entries reached terminal cleanup-status=removed with recorded final-disposition text; ADOPT-14 re-check PASS; second ADOPT-15 fresh-session re-check determined mandatory (disposition touched .gitignore, outside the exact bootstrap-created set) and handed off — step result PENDING until that evidence arrives
2026-08-20 — ADOPT-18 — second fresh-session re-check evidence relayed and cross-checked (agent roster matches ADOPT-13 exactly, specboot-adopt correctly absent from discovered skills, primary risk matches this run's own ADOPT-06 citation) — result PASS; ADOPT-18 marked PASS; manifest's debootstrap block updated with the result — observed by this session, no approval required
2026-08-25 — ADOPT-19 — human named the pilot task (fix malformed applicationDate → 400, not 500); ran enrich-us → propose → apply → specboot-verify (PASS) → independent adversarial-review (genuinely isolated worktree agent, PASS WITH GAPS — found a real Major, invalid calendar dates silently corrected via ResolverStyle.SMART) → fixed (STRICT + uuuu pattern) → re-reviewed (same-session fallback, named explicitly) PASS → archive plan presented via AskUserQuestion, approved by landaeta ("Approve archive") → archived with spec sync verified byte-identical before the move — result PASS
2026-08-25 — ADOPT-20 — verified every ADOPT-00 through ADOPT-19 evidence block individually, all recorded PASS, no FAIL/PENDING/blank rows — readiness verdict READY; PR-creation approval gate presented separately below, not yet exercised at the time this line was recorded — observed by this session, no approval required for the readiness verification itself
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

```text
Step: ADOPT-15, first attempt at obtaining the fresh-session runtime-discovery probe
Attempt: 1
Failure: the operator sent the exact `ADOPT-15` handoff prompt (with an added routing
  instruction to relay the result back to "the original v5 window") into what turned out to be
  the *same* continuing conversation as the one that ran `ADOPT-00` through `ADOPT-14` and wrote
  this hand-off, not a genuinely new, isolated session. This was detected before any evidence was
  fabricated: the responding turn had the entire `ADOPT-00`–`ADOPT-14` conversation directly in
  its own context (including having itself created `.claude/agents/java-backend-developer.md`
  and the other adapters `ADOPT-15` exists to test discovery of), and `pwd`/`git rev-parse HEAD`
  confirmed it was running in this exact worktree at `a6f147c` — the precise commit this
  hand-off left off at. `ListAgents` showed only sibling-experiment peer sessions
  (`app-prices-rest-specboot-ai-adoption-v5-b5`, `-cf`, `-15`, and a `-v1` experiment) — different
  worktrees entirely, none a bare "v5" peer session — so there was no separate "original v5
  window" to relay a result to either; the responding turn concluded it was likely that window
  itself, continuing.
Diagnosis: violates this step's own explicit requirement ("a new session, not a continuation of
  this one") and the skill's non-negotiable "A fresh session is a stop-and-hand-off. Never claim
  one you didn't observe." A session that remembers building the adapters cannot honestly report
  whether a client would discover them cold — any "PASS" produced here would be exactly the kind
  of self-invalidating evidence `ADOPT-05B`'s own smoke-test rule already warned against
  ("a same-session run of this smoke test is diagnostic data only, never smoke-test evidence").
Recovery: the responding turn did not perform the review as claimable `ADOPT-15` evidence, did
  not mark the step PASS, and did not modify any file. It surfaced the discrepancy to the
  operator directly via `AskUserQuestion` rather than silently proceeding or asking a
  rationalized "would they mind" question. Operator chose: open a genuinely new, separate Claude
  Code window at this same repository path and run the exact hand-off prompt there, then bring
  that transcript back for this session to register.
Outcome: no evidence recorded for `ADOPT-15` from this attempt; the step remains `PENDING`,
  awaiting a transcript from an actually-isolated session. Recorded here rather than silently
  discarded, per the same non-negotiable as the correction above.
```

---

## Command log for this step (supplementary, not part of the canonical template)

Kept here as raw evidence backing the checkboxes above, since several checks (the `.gitignore`
block, `git check-ignore`) execute after this file's first write in the materialization order.
This session updates this section in place before generating the handoff prompt.
