# Enriched Work Item — `add-specboot-adoption-orchestrator`

**Type:** Feature (new canonical skill + new adoption artifacts + installer capability)
**Intended OpenSpec change name:** `add-specboot-adoption-orchestrator`
**Enriched on:** 2026-08-10 · **Revised:** 2026-08-11 — blocking questions OQ-1, OQ-2, OQ-4 and OQ-7 resolved by the requester; checkpoint granularity redefined. `## Original` is unchanged.
**Authoritative contract:** `SPECBOOT_ADOPTION_GUIDE.md` + `specboot-adoption/`
**Skill-authoring contract:** `ai-specs/skills/writing-skills/` (`SKILL.md`, `testing-skills-with-subagents.md`, `examples/CLAUDE_MD_TESTING.md`, `anthropic-best-practices.md`)

---

## Original

> I need a generic, client-neutral specboot-adopt orchestration skill and a portable bootstrap kit for AI-driven SpecBoot adoption.
>
> Use add-specboot-adoption-orchestrator as the intended OpenSpec change name.
>
> Use the project-local writing-skills skill, including its relevant examples and testing guidance, when defining how the future skill should be structured and validated.
>
> The authoritative adoption contract is SPECBOOT_ADOPTION_GUIDE.md plus specboot-adoption/.
>
> The solution must:
>
> bootstrap a repository that has no SpecBoot files or AI configuration;
>
> make the skill and guide discoverable by the selected AI client before adoption starts;
>
> execute and resume the ADOPT-nn workflow using a filled run log;
>
> stop at human-approval gates and never self-approve;
>
> treat failed or unexecuted commands as FAIL;
>
> require a code-graph capability, using CodeGraph or the company-approved equivalent;
>
> provision and reconcile the selected-client permission baseline;
>
> remain portable across Claude, Kiro, Codex, macOS, Linux, Windows, Bash, zsh, and PowerShell;
>
> record evidence, deviations, failures, recoveries, and client- or company-specific adaptations;
>
> propose guide and troubleshooting improvements after every validated checkpoint without applying them silently;
>
> declare when a checkpoint is ready for human review;
>
> after approval, commit and push each independent validated checkpoint to the working branch;
>
> never create a pull request until the complete adoption and one real project E2E task pass;
>
> remove bootstrap-only files and unused client-specific artifacts when permanent adoption is working.
>
> The canonical skill should live under ai-specs/skills/specboot-adopt/.
>
> Determine the correct canonical location and distribution mechanism for the portable bootstrap kit, how each supported client discovers it before SpecBoot exists, how temporary exposure is removed afterward, and how duplicated canonical sources are prevented.
>
> Execution mode and the user's active model selection are outside the skill's control and must not be changed by the skill.

---

## Enhanced

### 1. Summary

Create `specboot-adopt`: a client-neutral, stack-neutral **orchestration skill** that drives an
existing brownfield repository through the full SpecBoot adoption defined by
`SPECBOOT_ADOPTION_GUIDE.md` and `specboot-adoption/`, from a repository with **zero** SpecBoot
files and **zero** AI client configuration through to a pushed, PR-ready adoption validated by one
real end-to-end project task.

The skill does not restate the guide. The guide remains the single authoritative contract; the
skill is the **executor and evidence keeper** for it. Alongside the skill, deliver a **portable
bootstrap kit** that solves the chicken-and-egg problem the guide currently leaves open: the guide
tells an AI agent what to do, but nothing in a virgin repository lets an AI client discover either
the guide or the skill before `ADOPT-03` has copied SpecBoot in.

### 2. Problem statement / why now

Verified from the repository:

- `SPECBOOT_ADOPTION_GUIDE.md` addresses "If you are an AI agent" and defines a bounded per-step
  working set, gates, and evidence discipline — but there is **no executable skill** that
  implements it. Adoption today is a human reading a document and pasting canonical prompts.
- Adoption begins at `ADOPT-01` in a repository that "may have **no AI tooling installed at
  all**". At that moment nothing in the target repository is discoverable by any client: no
  `ai-specs/`, no `.claude/`, no `.kiro/`, no root instruction file. `ADOPT-03`
  (`cp -rn <SPECBOOT_SOURCE>/* .`) explicitly does **not** copy hidden client directories.
- `packages/specboot/bin/init.js` provisions **Claude and Cursor only**; `ai-specs/specboot-instructions.md`
  §"Installer Scope" states Kiro and every other client are configured separately. Codex is not
  provisioned by anything.
- The guide's own status markers are `PENDING END-TO-END VALIDATION` (daily workflow) and
  "A clean installation must be performed to validate and refine every step." A repeatable,
  evidence-producing orchestrator is the mechanism that turns those pending markers into evidence.

### 3. Confirmed repository facts used to ground this work item

| Fact | Source |
|---|---|
| Steps are `ADOPT-01` … `ADOPT-17`; IDs are "stable identities, not positions" and do not change when steps are inserted | `specboot-adoption/00-conventions.md` |
| Step contract fields: Condition / Purpose / Preconditions / Action / Approval gate / Validation / Evidence to record / On failure | `00-conventions.md` |
| `Action` may hold exactly one of four forms; never more than one labeled prompt; never a historical prompt | `00-conventions.md` |
| `On failure` resolves by Form A (inline), Form B (named `22-troubleshooting.md` entry), or Form C (named owning `ADOPT-nn`) | `00-conventions.md` |
| Bounded per-step working set is **exactly three files**: `00-conventions.md`, the current phase file, the filled run log | `00-conventions.md`, `SPECBOOT_ADOPTION_GUIDE.md` |
| An unexecuted or failed command is FAIL, never an inferred PASS from empty output | `00-conventions.md` |
| An agent must never self-approve; approval covers only the named mutation | `00-conventions.md` |
| CodeGraph is currently **the only optional branch**; `ADOPT-05B` is mandatory regardless | `SPECBOOT_ADOPTION_GUIDE.md`, `02-codegraph.md`, `03-client-permissions.md` |
| `ADOPT-17` states **"Do not push. Remote mutation is outside this guide entirely."** | `07-baseline-and-checkpoint.md` |
| Remote mutation "is outside this guide entirely and requires its own explicit approval under company policy" | `00-conventions.md` §Scope boundaries |
| Run log location is deliberately undecided — "your team's choice… committed… or kept local" | `run-template/ADOPTION-RUN-LOG.template.md` |
| Run-log step-state table is the documented resume source | `ADOPTION-RUN-LOG.template.md`, guide §"Where to start, resume, and record" |
| Unavailable supported environments are recorded `PENDING EVIDENCE`, never PASS | `03-client-permissions.md` |
| Shell list-expansion/word-splitting differs across shells; a recorded failure mode exists | `00-conventions.md` §Shell portability, `22-troubleshooting.md` |
| "Paths … are POSIX-style. Native Windows shell portability is documented but not yet validated." | `00-conventions.md` |
| `ADOPT-13` rule: on a name collision with a real client-generated directory, **preserve the real directory and skip the symlink** | `06-adapters-and-discovery.md` |
| `ADOPT-15` requires a **fresh client session**, once per selected client | `06-adapters-and-discovery.md` |
| Canonical source is `ai-specs/`; agent paths reference it by symlink; duplicated canonical artifacts across agent folders are a completion-gate failure | `CLAUDE.md` §6 |
| `.claude/skills/*` and `.kiro/skills/*` are already relative symlinks to `../../ai-specs/skills/<name>`; OpenSpec-generated `openspec-*` skills are real directories | filesystem (`ls -la .claude/skills`, `.kiro/skills`) |
| `.claude/CLAUDE.md` exists as a **real file** alongside the root `CLAUDE.md` **symlink** — proof that a client-scoped instruction file can coexist with the canonical root symlink | filesystem |
| `sync-agent-symlinks` mirrors **`.claude` and `.cursor` only**; `.cursor/` does not exist in this repository, `.kiro/` does | `ai-specs/skills/sync-agent-symlinks/SKILL.md`, filesystem |
| `packages/specboot/template/ai-specs/skills/` carries **real duplicate copies** of a subset of canonical skills, and `enrich-us/SKILL.md` **has already drifted** from `ai-specs/skills/enrich-us/SKILL.md` | `diff -q` returned "differ" |
| Installer `createSymlink` silently **skips** any path that already exists and records it as skipped | `packages/specboot/bin/init.js` |
| `.specboot/staging/` is git-ignored; `.specboot/` itself is not | `.gitignore`, `git check-ignore` |
| Existing E2E pilot evidence block ("Daily workflow pilot") already exists in the run-log template | `ADOPTION-RUN-LOG.template.md` |

Three of these facts describe the contract **as it stands today** and are deliberately amended by
this change: CodeGraph's optional branch (→ **D-1**), `ADOPT-17`'s "Do not push" (→ **D-2**), and
the undecided run-log location (→ **D-4**). They are recorded here as the pre-change baseline the
amendments must edit — not as constraints the design must respect.

### 4. Scope

**In scope**

1. New canonical skill `ai-specs/skills/specboot-adopt/` (+ supporting reference files).
2. New portable bootstrap kit (canonical location, packaging, per-client discovery, removal).
3. New adoption steps in the authoritative contract: `ADOPT-00` (bootstrap), `ADOPT-18`
   (de-bootstrap / artifact reconciliation), `ADOPT-19` (real-project E2E pilot gate),
   `ADOPT-20` (PR-readiness gate). Existing IDs `ADOPT-01…17` are unchanged, per the stable-ID rule.
4. **Amendments to the authoritative contract, delivered inside this change, not deferred:**
   `02-codegraph.md`'s decision node becomes a mandatory code-graph capability-selection step
   (**D-1**); `ADOPT-17` and `00-conventions.md` §Scope boundaries gain the checkpoint
   commit/push protocol with its remote-impact assessment (**D-2**); `00-conventions.md` gains
   the working-set rule for the orchestrator skill.
5. Checkpoint model: definition, granularity, ready-for-review declaration, approval, commit,
   remote-impact assessment, push.
6. Run-log and manifest extensions: checkpoint ledger, improvement proposals, adaptations,
   code-graph capability selection, remote-impact assessments, bootstrap dispositions.
7. Client-neutral discovery/exposure mechanics for Claude, Kiro, and Codex — with the Codex
   mechanism behind a mandatory verification gate (**D-3**, §9.6).
8. Skill exposure symlinks per `CLAUDE.md` §6, and extension of `sync-agent-symlinks` coverage.
9. Skill TDD test campaign per `writing-skills` (RED baseline → GREEN → REFACTOR).

**Out of scope**

- Changing execution mode, permission mode, or the user's active model selection — the skill must
  never write `model`, `permissions.defaultMode`, or equivalent client runtime settings. It may
  *report* that a mode/model is unsuitable and stop.
- Rewriting the daily workflow (`08-daily-workflow.md`) semantics or the six-capability gate rules.
- Modifying the installed OpenSpec archive command or any OpenSpec-generated resource.
- Making the SpecBoot installer fully client-aware (`make-specboot-installer-client-aware` is
  already named as a separate future change in `ai-specs/specboot-instructions.md`). This change
  adds only the **bootstrap** entry point, not general Kiro/Codex permanent provisioning.
- Fixing the pre-existing `packages/specboot/template/` drift for skills other than what the kit
  requires (see Open Question OQ-9).

### 5. Determined design decisions

The request asked for four determinations. Each is answered below with its rationale and the
alternatives rejected. Requester-confirmed decisions are collected as **D-1 … D-10** in §15; items
marked **(assumption)** are inferences, recorded again in `## Assumptions`.

#### 5.1 Canonical location and distribution mechanism for the bootstrap kit

**Canonical location: `specboot-adoption/bootstrap-kit/`, containing a manifest and per-client
discovery recipes — and no copies of any canonical artifact.**

- The kit belongs to the **adoption contract**, not to the product being installed. The user
  declared `SPECBOOT_ADOPTION_GUIDE.md` + `specboot-adoption/` authoritative; the kit is the
  contract's own delivery vehicle.
- `ai-specs/` is the canonical source for artifacts that are *installed into* a repository.
  Placing the kit there would mean every adopted repository permanently carries the machinery that
  adopted it.
- Rejected: `ai-specs/skills/specboot-adopt/bootstrap/`. The kit must ship the guide, the phase
  files, and the run-log template — all canonical elsewhere. Embedding them under the skill creates
  exactly the duplicated canonical source `CLAUDE.md` §6 forbids.
- The kit manifest (`specboot-adoption/bootstrap-kit/manifest.*`) is a **declarative list of
  canonical repository-relative paths** plus a payload/target mapping. It contains references, never
  content.

**Distribution: two supported channels, one payload assembly.**

| Channel | Command | When |
|---|---|---|
| Primary — npm | `npx @lidr/lidr-specboot bootstrap [target]` | default; no prior clone required |
| Secondary — source copy | operator already has a SpecBoot source clone (the existing `<SPECBOOT_SOURCE>` path `ADOPT-03` already assumes) | air-gapped, company mirror, or offline |

- `packages/specboot/bin/init.js` gains an explicit `bootstrap` subcommand. The current default
  behaviour (install `template/` + Claude/Cursor adapters) is unchanged and remains what `ADOPT-03`
  consumes.
- The npm payload is **assembled at pack time from the canonical paths named in the manifest**
  (`prepack` script or equivalent), so no second copy is checked into git. This is the direct
  countermeasure to the drift already present in `packages/specboot/template/ai-specs/skills/enrich-us/SKILL.md`.
- `packages/specboot/package.json` `files` must include the assembled payload directory.

**Landing zone: two directories with opposite lifetimes (D-4).**

| Path | Lifetime | Git | Contents |
|---|---|---|---|
| `.specboot/bootstrap/` | **transient** — exists only until `ADOPT-18` | **ignored** | the payload: guide copy, phase files, run template, skill body |
| `.specboot/adoption/` | **durable** — outlives the adoption | **committed** | `BOOTSTRAP-MANIFEST.json`, `ADOPTION-RUN-LOG.md` |

Separating them is what makes cleanup auditable: the payload disappears, the record of what the
payload did does not. A manifest living inside the directory it governs would be destroyed by its
own cleanup step, and an ignored manifest could not be reviewed in a diff or resumed from by another
operator.

**Transient payload — `.specboot/bootstrap/` (ignored):**

```text
.specboot/bootstrap/
  SPECBOOT_ADOPTION_GUIDE.md          # copy of the contract, bootstrap-only
  specboot-adoption/**                # phase files, conventions, troubleshooting, run template
  skills/specboot-adopt/**            # the orchestration skill body
  README.md                           # what this directory is, and that ADOPT-18 removes it
```

**Durable control record — `.specboot/adoption/` (committed):**

```text
.specboot/adoption/
  BOOTSTRAP-MANIFEST.json             # the control record; survives ADOPT-18
  ADOPTION-RUN-LOG.md                 # the filled run log; the resume source
```

`BOOTSTRAP-MANIFEST.json` is written by the bootstrap run and **updated, never deleted**, by
`ADOPT-18`. Per entry it records:

| Field | Meaning |
|---|---|
| `path` | the repository-relative path the bootstrap created or modified |
| `source` | the canonical path it came from, plus the delivery channel (npm / source copy) |
| `checksum` | checksum of the delivered content, so drift and tampering are detectable |
| `ownership` | `bootstrap-created` \| `pre-existing-modified` \| `pre-existing-untouched` |
| `mode` | `symlink` \| `copy` \| `appended-block` \| `real-file` |
| `intended-permanent-replacement` | the canonical path or symlink that supersedes it, or `none` |
| `cleanup-status` | `pending` \| `removed` \| `converted` \| `retained-with-reason` |
| `final-disposition` | what `ADOPT-18` actually did, and when |

`ADOPT-18` acts strictly on this inventory — never by path pattern or guesswork. `ownership`
is what prevents the cleanup from touching a file the repository already had.

#### 5.2 How each supported client discovers the skill and guide before SpecBoot exists

The rule that makes this safe: **bootstrap must never create a real file at a path that a later
adoption step needs to create as a symlink.** `cp -rn` skips existing paths, and
`init.js#createSymlink` skips existing paths — so a bootstrap-created real `CLAUDE.md` or
`AGENTS.md` would permanently block the canonical `-> docs/base-standards.md` symlink and be
recorded only as "skipped". The same trap exists for `.claude/skills/specboot-adopt/`: `ADOPT-13`
explicitly says a real directory colliding with a canonical skill name is **preserved** and the
symlink **skipped**.

| Client | Skill discovery path | Guide/instruction pointer | Notes |
|---|---|---|---|
| Claude Code | `.claude/skills/specboot-adopt/` → relative symlink to `../../.specboot/bootstrap/skills/specboot-adopt` | `.claude/CLAUDE.md` (real file, marked bootstrap block) | Root `CLAUDE.md` is **not** touched. `.claude/CLAUDE.md` coexisting with the root symlink is confirmed in this repository. |
| Kiro | `.kiro/skills/specboot-adopt/SKILL.md` — the file itself, or that path as a symlink to the canonical skill (**decided, D-3**) | the installed Kiro version's project-instruction path, confirmed at `ADOPT-00` before use | Mirrors the confirmed `.kiro/skills/*` symlink convention in this repository. Supported. |
| Codex | `.agents/skills/specboot-adopt/SKILL.md` — **candidate mechanism only, never assumed to work** (**D-3**) | root `AGENTS.md`: if absent, create as a **real bootstrap file** registered in the manifest so `ADOPT-18` converts it to the canonical symlink; if present, append a delimited bootstrap block and remove the block at `ADOPT-18` | Gated by §9.6. Until that gate passes, Codex is `PENDING EVIDENCE` or `unavailable` — **never PASS**. `writing-skills` documents only `~/.agents/skills/` (personal, outside repository scope), which is exactly why the project-scoped form must be verified rather than inferred. |

Windows fallback: where symlink creation fails (no Developer Mode / no privilege — `init.js`
already records this as an error rather than failing), bootstrap **copies** the skill directory as
real files and records `mode: "copy"` in the manifest. `ADOPT-18` then removes the copy instead of
unlinking, and records that disposition. Portability must never be achieved by silently degrading to
a copy that is later mistaken for canonical content.

Every discovery entry created must be verified by an actual fresh-session check at `ADOPT-00`'s
validation — filesystem presence is not discovery, exactly as `ADOPT-14` vs `ADOPT-15` already
separates them.

#### 5.3 How temporary exposure is removed afterwards

New step **`ADOPT-18` — De-bootstrap and Reconcile Client Artifacts**, placed after `ADOPT-17` and
before the E2E pilot.

**The governing rule: `ADOPT-18` removes the transient payload and *updates* the durable manifest
with final dispositions. It never deletes the evidence of what the bootstrap did.**

- **Precondition:** `ADOPT-17` = PASS (permanent adoption committed and working).
- **Action (structured written procedure, contract form 4):**
  1. Read `.specboot/adoption/BOOTSTRAP-MANIFEST.json`; build the disposition plan, entry by entry.
  2. **Verify the permanent replacement first.** For every entry with an
     `intended-permanent-replacement`, confirm that replacement exists and resolves **before**
     removing the transient entry — create it where the permanent adoption should have and did not.
     Removing a bootstrap entry whose replacement is missing is FAIL, not cleanup.
  3. For each entry: unlink symlink / remove copied directory / remove bootstrap real file /
     remove the delimited block from a pre-existing file. Entries with
     `ownership: pre-existing-untouched` are never touched.
  4. Convert any bootstrap-created real root instruction file (`AGENTS.md`, `CLAUDE.md`,
     `GEMINI.md`, `codex.md`) into the canonical relative symlink to `docs/base-standards.md`,
     matching `packages/specboot/bin/init.js` and `ADOPT-03`'s root-instruction rule.
  5. Remove the transient payload directory `.specboot/bootstrap/` in full.
  6. Remove client directories and adapters for clients **not** selected at `ADOPT-02`, and any
     client-specific artifact left `unavailable` by its verification gate (for example an unproven
     Codex `.agents/` entry — §9.6).
  7. Re-run the `ADOPT-14` filesystem checks and one `ADOPT-15` fresh-session discovery check per
     selected client, to prove nothing still needed was removed.
  8. **Write back** each entry's `cleanup-status` and `final-disposition`, plus the re-validation
     results, and commit the updated manifest as part of this checkpoint.
- **Approval gate:** `[HUMAN APPROVAL REQUIRED]` before any removal (deletion is a "high-risk
  operation, always requires explicit approval" — `19-permissions-policy.md`).
- **PASS criteria:** every manifest entry carries a terminal `cleanup-status` and a
  `final-disposition`; `.specboot/bootstrap/` absent; `.specboot/adoption/` present and committed;
  every `intended-permanent-replacement` exists and resolves; zero broken symlinks
  (`find -L … -type l` empty); root instruction symlinks all resolve to `docs/base-standards.md`;
  no adapter for an unselected or unverified client; `ADOPT-14` and `ADOPT-15` re-validate PASS.
- **On failure (Form A, inline):** restore the affected entries from the manifest before retrying.
  An entry left at `cleanup-status: pending` is FAIL, not a partial PASS — and because the manifest
  is committed, a failed `ADOPT-18` is resumable by a different operator or session.

#### 5.4 How duplicated canonical sources are prevented

Four enforced mechanisms, not conventions:

1. **Manifest-by-reference.** `specboot-adoption/bootstrap-kit/manifest.*` lists canonical paths.
   No canonical content is checked in twice.
2. **Pack-time assembly + drift check.** The npm payload is generated from canonical sources; a
   check (CI or `prepack`) fails the build when any assembled/checked-in payload file differs from
   its canonical source. Applied first to the kit; the pre-existing
   `packages/specboot/template/ai-specs/skills/enrich-us/SKILL.md` drift is a **confirmed existing
   defect** this check would catch (see OQ-9 for whether it is fixed here or separately).
3. **`ADOPT-18` single-copy assertion.** After de-bootstrap, every canonical artifact exists exactly
   once as content; all client-visible instances are symlinks (or, on Windows, are recorded as
   copies with the reason).
4. **`sync-agent-symlinks` coverage extension.** Its mirror list must become the **selected clients**
   of the repository rather than the hardcoded `.claude` + `.cursor`; `.kiro` is present in this
   repository and unmanaged by it today, and `.cursor` is absent. Without this, `ADOPT-18`'s
   reconciliation has no maintenance counterpart for the life of the repository.

### 6. Functional requirements

Grouped, each traceable to a request bullet.

**FR-1 — Bootstrap a repository with no SpecBoot files and no AI configuration (`ADOPT-00`).**
Detects: git repository or not; existing SpecBoot/AI artifacts (must not clobber any); selected
client (asked, never inferred); OS and shell. Materializes the transient payload under
`.specboot/bootstrap/` and the client discovery entries of §5.2, and writes the durable
`.specboot/adoption/BOOTSTRAP-MANIFEST.json`. Gate: `[HUMAN APPROVAL REQUIRED]` before the first
repository-local write. Validation includes a fresh-session discovery probe, not just file presence.

**FR-2 — Pre-adoption discoverability.** After `ADOPT-00`, a fresh session of the selected client
must surface `specboot-adopt` and reach `SPECBOOT_ADOPTION_GUIDE.md` **without the operator pasting
paths**. A resource manually supplied after session start is not discovery — the existing
`ADOPT-15` interpretation rules apply verbatim. Claude and Kiro use the decided paths in §5.2;
Codex may only be claimed after its verification gate (§9.6) passes, and is otherwise recorded
`PENDING EVIDENCE` or `unavailable`.

**FR-3 — Execute and resume the `ADOPT-nn` workflow from a filled run log.** On invocation the
skill reads the run log's step-state table first and names the next step. Resume rule from the
guide is normative: *an empty evidence block means "not known to have completed", never "completed
but unrecorded"* — on unexpected interruption the skill returns to the first step lacking complete
PASS evidence and re-runs its **full** validation. The skill must honour the **bounded per-step
working set** and must state explicitly how it counts itself against that three-file rule (see
OQ-3).

**FR-4 — Stop at gates; never self-approve.** At every `[HUMAN APPROVAL REQUIRED]` marker the skill
stops, states the exact mutation (paths, commands, reversibility), and waits. Approval is scoped to
the named mutation only — never to a later step, a broader command, or a repeat run. A recorded
prior approval for a different mutation is not approval.

**FR-5 — Failed or unexecuted commands are FAIL.** Every command is recorded with its exact text,
exit code, and output summary. Empty output is never PASS. Where a shell alias or function could
shadow a tool, validation uses absolute executable paths. Permission to run a command is not
evidence it ran; running it is not evidence it passed.

**FR-6 — A code-graph capability is mandatory; the orchestrator fails closed without one (D-1).**
The *capability* is required for every adoption; **CodeGraph is optional only as the product
choice** — a company-approved equivalent providing the required repository-graph capability is
equally acceptable. There is no waiver and no PASS without one: **no usable graph capability is
FAIL.**

This replaces the guide's current "CodeGraph is the only optional branch" rule. `02-codegraph.md`'s
decision node becomes a **mandatory capability-selection step**, amended inside this change:

1. Select the implementation (CodeGraph, or the named company-approved equivalent).
2. Establish and verify its availability with an executed command, not an assertion.
3. Record the selected implementation, its version, the validation evidence, and any coverage
   limitations (for example unsupported languages) in the run log.
4. If no implementation is usable, the step is **FAIL** and the adoption stops there. Absence is
   not a skip, not a waiver, and not a `PENDING EVIDENCE`.

Downstream steps that today say "use CodeGraph when available" (`ADOPT-06`, `ADOPT-09`, `ADOPT-11`)
become unconditional consumers of the selected capability.

**FR-7 — Provision and reconcile the selected-client permission baseline.** Executes `ADOPT-05B`
unchanged: locate the approved generic baseline; copy when absent, **merge when present, never
overwrite**; declare the team supported-environment matrix (clients / stacks / shells / OSes);
reconcile (remove out-of-matrix, **retain** supported variants absent from this machine, add only
what the real project needs); safety-check then syntax-check; smoke-test per available client/OS
combination; mark every unavailable supported combination `PENDING EVIDENCE`; leave the generic
source baseline unchanged.

**FR-8 — Portability.** Client-neutral across Claude, Kiro, Codex; OS-neutral across macOS, Linux,
Windows; shell-neutral across Bash, zsh, PowerShell. Concretely: derive loop syntax from the active
shell and prefer explicit per-item commands or a shell-native array over a space-separated scalar
loop; never assume POSIX-only tooling (`cp -rn`, `find -L`, `readlink`, `ln -s` all need declared
PowerShell equivalents); treat symlink creation as capability-detected, not assumed; keep every path
repository-relative.

**FR-9 — Evidence recording.** Records into the run log: evidence per step; deviations from the
guide; failures with exact command and exact error; recoveries with which `On failure` form (A/B/C)
resolved them; and client- or company-specific adaptations, each with the reason and its blast
radius.

**FR-10 — Improvement proposals after every validated checkpoint, never applied silently.**
After each validated checkpoint the skill proposes improvements to `SPECBOOT_ADOPTION_GUIDE.md`,
the phase files, and `22-troubleshooting.md`, written to a new run-log **Improvement proposals**
block with status `proposed | accepted | rejected | applied-in-change-<id>`. This encodes the
guide's existing rules: "Do not let the AI rewrite this guide during installation", "Update the
guide only after validating a step", and troubleshooting grows "one reviewed entry at a time, not by
editing it mid-adoption". Guide edits themselves go through the normal OpenSpec change workflow.

**FR-11 — Checkpoint readiness declaration.** The skill declares a checkpoint ready for human
review with: checkpoint id, steps covered, validation results, evidence pointers, open deviations,
proposed improvements, and the exact staged file list. It never declares readiness with any step in
the checkpoint at FAIL or PENDING.

**FR-12 — Commit and push each approved, independently validated checkpoint (D-2).** `ADOPT-17` and
`00-conventions.md` §Scope boundaries are amended inside this change so that push is **inside** the
contract, under gates, rather than "outside this guide entirely". Per checkpoint, in order:

1. Present the checkpoint evidence and the **exact Git scope** — the precise file list, not a
   summary.
2. Obtain explicit human approval of the checkpoint. `[HUMAN APPROVAL REQUIRED]`
3. Stage only intended files (never unconditional `git add -A`), apply the full `ADOPT-17`
   staged-scope checklist, and re-run a fresh independent review after any correction.
4. Commit.
5. **Determine and report the remote impact before pushing:** whether the repository's remote
   configuration will trigger CI, deployments, security scans, notifications, or any other
   automation. Derived from real evidence — workflow and pipeline configuration, branch protection,
   webhooks, required checks — never assumed.
6. Push to the **current working branch** only, after the impact is reported and accepted.
   `[HUMAN APPROVAL REQUIRED]`

**Unknown or unapproved remote impact blocks the push.** "No CI configuration found" is a finding
to report, not a licence to push; an undetermined impact is treated as unknown. The push gate is
separate from the commit gate — a commit approval is never a push approval, and neither carries
forward to the next checkpoint.

**FR-13 — No pull request before full adoption plus one real project E2E task.** PR creation is
blocked until `ADOPT-00…ADOPT-18` are all PASS **and** `ADOPT-19` (E2E pilot) is PASS. The E2E
pilot is the six-capability daily workflow on a **real project task chosen by the human**:
`enrich-us` (`READY FOR PROPOSAL`) → propose → apply → tests → `specboot-verify` (PASS / PASS WITH
GAPS) → independent `adversarial-review` (PASS / PASS WITH GAPS, ideally a different
session/client) → docs and spec sync → archive (both gates plus explicit human approval). The
existing "Daily workflow pilot" run-log block is the evidence sink.

**FR-14 — Remove bootstrap-only files and unused client artifacts (`ADOPT-18`).** As specified in
§5.3.

**FR-15 — Never change execution mode or model selection (D-10).** Model selection and
manual/auto execution mode remain **user-controlled and outside the skill's scope**. The skill must
not edit `model`, reasoning-effort, permission mode, or equivalent client runtime settings in any
settings file. It may verify and report a mismatch, then stop. The boundary is stated explicitly in
`SKILL.md`: the prohibition binds `specboot-adopt` itself; skills it invokes during the `ADOPT-19`
pilot (for example `enrich-us` under this repository's `CLAUDE.md` §5) retain their own documented
behaviour, and the orchestrator neither performs nor suppresses it.

### 7. Checkpoint model

**A checkpoint is the smallest independently validated `ADOPT` step (D-5).** The default is one
checkpoint per step. **A phase file is not automatically a checkpoint** — phase files are a
documentation boundary, not a validation boundary, and treating them as checkpoints would batch
independently verifiable work into one reviewable unit and delay the evidence.

Dependent steps may be grouped into a single checkpoint **only with an explicit written
justification** recorded in the checkpoint ledger, stating why the steps cannot be validated
independently. Legitimate grounds are structural, not convenience:

- the earlier step produces no independently observable end state (its only validation is the
  later step's); or
- the intermediate state is not reviewable or not safe to leave in place; or
- the guide's own step contract makes them an executed pair — for example an adapt step and its
  immediately following read-only validation step (`ADOPT-09`/`ADOPT-10`, `ADOPT-11`/`ADOPT-12`,
  which `05-agents-and-skills.md` already describes as "executed as a pair").

"Fewer commits", "they're in the same file", and "it's faster" are **not** justifications.
Grouping is a recorded exception each time, never a standing policy.

Per checkpoint, in order: validate → declare ready for human review → checkpoint approval →
stage and review the exact Git scope → commit → determine and report remote impact → push approval
→ push → propose guide/troubleshooting improvements → advance.

The **checkpoint ledger** (new run-log block) records per checkpoint: id; the `ADOPT` step or the
justified group with its justification; validation results; evidence pointers; ready-for-review
declaration; approval (who, when, what was approved); the exact staged file list; commit SHA;
remote-impact assessment and its verdict; push status; and improvement proposals raised.

### 8. Skill structure (per `writing-skills`)

```text
ai-specs/skills/specboot-adopt/
  SKILL.md                                  # < 500 words; orchestration contract only
  references/checkpoint-protocol.md         # checkpoint → review → approve → commit → push
  references/bootstrap-and-debootstrap.md   # per-client discovery, manifest, ADOPT-18
  references/portability-matrix.md          # client × OS × shell command equivalents
  references/evidence-and-run-log.md        # run-log field mapping, resume protocol
  references/rationalizations.md            # rationalization table + red flags (REFACTOR output)
```

Authoring constraints, all from `writing-skills`:

- Frontmatter: `name: specboot-adopt`, `description:` third person, starts with "Use when…",
  **triggering conditions only — no workflow summary** (a description that summarizes the workflow
  becomes a shortcut Claude takes instead of reading the skill). ≤ 500 characters, total
  frontmatter ≤ 1024 characters, letters/numbers/hyphens only.
- `SKILL.md` stays token-efficient; heavy reference goes to the `references/` files, loaded on
  demand. Verify with `wc -w`.
- Cross-reference other skills by name with explicit requirement markers
  (`**REQUIRED SUB-SKILL:** …`), never with `@` links, which force-load and burn context.
- Include: Overview with the core principle, When to Use, Quick Reference table, Common Mistakes,
  rationalization table, and a Red Flags list. Flowcharts only where a decision is non-obvious.
- No narrative storytelling; the reference run stays in `specboot-adoption/history/`.
- **The skill must not restate the guide.** Duplicating step content would create a second
  authority that drifts from the contract — the same defect §5.4 exists to prevent.

Exposure per `CLAUDE.md` §6: `.claude/skills/specboot-adopt` and `.kiro/skills/specboot-adopt` as
relative symlinks to `../../ai-specs/skills/specboot-adopt`, created via `sync-agent-symlinks`.

### 9. Testing expectations

**9.1 Skill TDD (`writing-skills` Iron Law — no skill without a failing test first).** Baseline
(RED) scenarios run with subagents **before** `SKILL.md` is written, with rationalizations captured
verbatim; then GREEN with the skill; then REFACTOR until compliant. Minimum baseline scenarios,
each with 3+ combined pressures (time / sunk cost / authority / exhaustion), following the format in
`examples/CLAUDE_MD_TESTING.md`:

| # | Discipline under test | Pressure shape |
|---|---|---|
| S-1 | Never self-approve a gate | Operator absent, deadline, "you clearly know what it will say" |
| S-2 | Unexecuted/failed command is FAIL | Empty output from a read-only check, 15 steps already green |
| S-3 | Do not edit the guide mid-adoption | An obviously wrong sentence in a phase file, one-word fix |
| S-4 | No PR before adoption + E2E pilot | Everything looks done, reviewer waiting, PR "just as a draft" |
| S-5 | Code-graph capability mandatory, fail closed | "Small repo, grep is fine, indexing takes 20 minutes — just note it as a limitation and continue" |
| S-6 | Merge, never overwrite, a permission file | Existing `.claude/settings.json` "looks outdated" |
| S-7 | Retain out-of-machine OS permission variants | Mac-only operator, Windows entries "are noise" |
| S-8 | Never change mode or model | A step fails and "switching model would fix it" |
| S-9 | Remove bootstrap files at `ADOPT-18` | "Harmless, and useful if we re-run adoption" |
| S-10 | Push is a separate approval from commit | Commit was just approved, "push is implied" |
| S-11 | Resume correctly after interruption | Step looks done, evidence block empty |
| S-12 | Unknown remote impact blocks push | No CI config found, "so nothing can trigger — safe to push" |
| S-13 | Checkpoint granularity is per step | Four steps validated at once, "one commit is tidier than four" |
| S-14 | Codex is never PASS unverified | Candidate path exists on disk, "the file is there, discovery obviously works" |

**9.2 Structural validation.** Strict YAML frontmatter parse; name charset; description is
trigger-only and within limits; `wc -w SKILL.md`; every referenced path resolves; no `@` force-load
links.

**9.3 Portability validation.** Bootstrap dry-run per client × OS × shell combination.
Combinations that cannot be exercised are recorded **`PENDING EVIDENCE`, never PASS**, with the
reason — following the `ADOPT-05B` precedent exactly. A claim of Windows/PowerShell support without
a Windows run is a defect.

**9.4 Integrity validation.** `find -L <adapter paths> -type l` returns empty (any result is FAIL);
no malformed symlink names (for example a name containing spaces — the recorded zsh/Bash
word-splitting failure mode); no adapter for an unselected client; the duplication drift check
passes; `ADOPT-18` leaves exactly one content copy per canonical artifact.

**9.5 End-to-end validation.** One complete adoption run in a genuinely clean repository, producing
a filled run log, one commit per validated checkpoint (or per justified group), a committed
`BOOTSTRAP-MANIFEST.json` with every entry at a terminal disposition, and a passing `ADOPT-19`
pilot. Per the guide's own final acceptance criteria, the guide is reusable only after this.

**9.6 Codex discovery verification gate (mandatory before any Codex support is claimed).**
`.agents/skills/specboot-adopt/SKILL.md` is a **candidate** mechanism (D-3). It is an
implementation gate, not an enrichment blocker: the change may be proposed and implemented without
it, but **Codex support may not be claimed until every task below passes**. All three are required,
in order:

1. **Official-documentation discovery.** Establish from current official Codex documentation what
   the project-scoped skill/instruction discovery mechanism actually is. Record the source and the
   date consulted. This is external research and therefore requires explicit user authorization
   first, per `00-conventions.md` §Scope boundaries.
2. **Isolated scratch-repository construction.** Build the mechanism first in a throwaway
   repository, never in the adopting repository. A discovery experiment must not leave artifacts
   in a repository under adoption.
3. **Fresh-session execution test.** Start a genuinely fresh Codex session with the candidate
   present **at session start**, and prove two distinct things: the skill is **discovered**
   (not pasted, not supplied after start) and its **canonical content executes**. Presence on disk
   is not discovery; discovery is not execution.

**Classification rule.** If any task cannot be completed or verified, Codex is recorded
`unavailable` or `PENDING EVIDENCE` — **never PASS**, and never quietly omitted. A Codex row with
no evidence is not a passing row. This mirrors the `ADOPT-05B` precedent for unavailable
client/OS combinations exactly.

### 10. Acceptance criteria

1. `ai-specs/skills/specboot-adopt/SKILL.md` exists with valid, trigger-only frontmatter, and is
   exposed by symlink to every selected client; `sync-agent-symlinks` reports zero blockers.
2. Baseline (RED) results for all scenarios in §9.1 are recorded **before** the skill body exists,
   and GREEN results are recorded after.
3. `npx @lidr/lidr-specboot bootstrap` (or the documented source-copy equivalent) turns a repository
   with no SpecBoot files and no AI configuration into one where a **fresh** session of the selected
   client discovers `specboot-adopt` and the guide with no operator-supplied paths.
4. No bootstrap-created real file occupies a path a later step must create as a symlink; if one
   must, it is recorded in `.specboot/adoption/BOOTSTRAP-MANIFEST.json` with an
   `intended-permanent-replacement`, and `ADOPT-18` converts it.
5. The skill resumes a partially completed adoption from a filled run log and names the correct next
   step, including after an unexpected interruption with an empty evidence block.
6. Every `[HUMAN APPROVAL REQUIRED]` gate stops execution; no self-approval occurs in any test run.
7. Every recorded command carries exact text, exit code, and output summary; no PASS is inferred
   from empty output.
8. The code-graph capability-selection step records the selected implementation, its availability
   evidence, and its limitations; and an adoption attempted with **no** usable graph capability
   halts at FAIL — no waiver path, no PASS, no `PENDING EVIDENCE`.
9. `ADOPT-05B` completes with the matrix declared, merge-not-overwrite honoured, safety and syntax
   checks passed, and unavailable combinations marked `PENDING EVIDENCE`.
10. The run log contains a checkpoint ledger, improvement proposals, deviations, failures,
    recoveries, and client/company adaptations.
11. Each checkpoint is one `ADOPT` step, or a group carrying a written justification in the ledger;
    no group exists without one.
12. Each approved checkpoint is committed and pushed to the current working branch under **two
    distinct approvals**, with a remote-impact assessment (CI, deployment, security, notification,
    other automation) reported between them; no push occurs where that impact is unknown or
    unapproved.
13. No PR is created before `ADOPT-00…ADOPT-19` are PASS.
14. `ADOPT-18` completes: `.specboot/bootstrap/` gone; `.specboot/adoption/BOOTSTRAP-MANIFEST.json`
    present, committed, and updated with a terminal `cleanup-status` and `final-disposition` for
    every entry; every `intended-permanent-replacement` resolving; zero broken symlinks; no
    unselected- or unverified-client artifacts; `ADOPT-14` + `ADOPT-15` re-validated.
15. Codex is claimed as supported only after §9.6 passes in full; otherwise it appears as
    `unavailable` or `PENDING EVIDENCE` in every artifact that reports client support.
16. The duplication drift check exists and passes for the kit payload.
17. `specboot-adopt` is absent from the adopting repository after `ADOPT-18`, while remaining
    canonical at `ai-specs/skills/specboot-adopt/` in the SpecBoot source repository.
18. No file under any client settings path had its `model`, reasoning, or permission-mode setting
    modified by the skill in any test run.

### 11. Affected files and interfaces

**New**

- `ai-specs/skills/specboot-adopt/SKILL.md` + `references/*.md` (canonical, SpecBoot source repo)
- `.claude/skills/specboot-adopt`, `.kiro/skills/specboot-adopt` (symlinks, SpecBoot source repo)
- `specboot-adoption/bootstrap-kit/` (manifest, per-client discovery recipes, README)
- `specboot-adoption/bootstrap-kit/BOOTSTRAP-MANIFEST.schema.json` — the durable manifest's schema
  (`path`, `source`, `checksum`, `ownership`, `mode`, `intended-permanent-replacement`,
  `cleanup-status`, `final-disposition`)
- `specboot-adoption/09-bootstrap.md` (`ADOPT-00`) — file numbering to confirm (OQ-8)
- `specboot-adoption/10-debootstrap.md` (`ADOPT-18`), `11-e2e-pilot-and-pr-gate.md`
  (`ADOPT-19`, `ADOPT-20`) — numbering to confirm (OQ-8)

**Modified**

- `SPECBOOT_ADOPTION_GUIDE.md` — step index, happy path, section-number map, "How this works",
  resume/record table, acceptance criteria
- `specboot-adoption/00-conventions.md` — working-set rule vs. the orchestrator skill; the mandatory
  code-graph capability; **amend §Scope boundaries** so push is inside the contract under gates
  rather than "outside this guide entirely"
- `specboot-adoption/02-codegraph.md` — **replace** the "is CodeGraph being adopted?" decision node
  with a mandatory capability-selection step; the file is no longer conditional, and the
  `SKIPPED`-when-not-adopted path is removed
- `specboot-adoption/07-baseline-and-checkpoint.md` — **amend `ADOPT-17`**: replace "Do not push"
  with the checkpoint commit → remote-impact assessment → push protocol, and its two distinct gates
- `specboot-adoption/08-daily-workflow.md` — pointer to `ADOPT-19`
- `specboot-adoption/22-troubleshooting.md` — new entries (bootstrap discovery failure; real file
  blocking a canonical symlink; Windows symlink privilege; partially consumed manifest)
- `specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md` — new blocks: `ADOPT-00`,
  `ADOPT-18`, `ADOPT-19`, Checkpoint ledger (with remote-impact assessment and push status),
  Improvement proposals, Client/company adaptations, Code-graph capability selection; step-state
  table rows; and the "where to keep the filled copy is your team's choice" paragraph replaced by
  the decided default `.specboot/adoption/ADOPTION-RUN-LOG.md`, committed. The `SKIPPED`-valid-for-
  `ADOPT-04`/`ADOPT-05` note is removed with the CodeGraph branch.
- `packages/specboot/bin/init.js` + `package.json` — `bootstrap` subcommand, payload assembly,
  `files`
- `ai-specs/skills/sync-agent-symlinks/SKILL.md` — selected-client mirror list instead of hardcoded
  `.claude` + `.cursor`
- `ai-specs/specboot-instructions.md` — bootstrap entry point, installer-scope note
- `README.md` — bootstrap quick start
- `.gitignore` — add `.specboot/bootstrap/` (transient, ignored). `.specboot/adoption/` stays
  **tracked**; the existing `.specboot/staging/` rule is unchanged. The installer's
  `ensureGitignoreStagingRule` gains the equivalent rule for the bootstrap path, using the same
  `git check-ignore` probe rather than a literal-line match.

**Explicitly unmodified:** application source and tests; `openspec/` generated resources and the
installed archive command; OpenSpec-generated client skill directories; the approved generic
permission baseline.

### 12. Non-functional requirements

- **Portability:** every command in the skill and kit has a declared equivalent for Bash, zsh, and
  PowerShell; symlink support is capability-detected with a documented copy fallback; all paths
  repository-relative and POSIX-style in documentation.
- **Security:** the kit contains no credentials and no machine-specific paths; the skill never
  widens a permission baseline without a gate; it never configures git credentials or remotes;
  pushes go only to the already-configured remote on the current branch; the `ADOPT-05B` safety scan
  (credentials, home directories, machine paths, unsafe broad patterns) runs before any permission
  file is committed. **Every push is preceded by the remote-impact assessment** — a push is an
  outward-facing action whose blast radius (pipelines, deployments, scanners, notifications) must be
  known and accepted before it happens, never discovered afterwards.
- **Observability:** the filled run log and the durable manifest are the evidence artifacts — no
  parallel logs. The manifest is the machine-readable half (what was created and what became of it);
  the run log is the narrative half (what happened, what failed, what was approved). Optional
  `script -a` terminal capture stays supported.
- **Performance:** the bounded per-step working set is the cost control; the skill must not load the
  whole guide, `history/`, or unrelated phase files. Reading ahead "to get oriented" is a defect.
- **Idempotence:** re-running `ADOPT-00` on a bootstrapped repository is a no-op that reports
  existing entries; re-running `ADOPT-18` on a de-bootstrapped repository is a clean no-op.

### 13. Compatibility, migration, operations

- Existing IDs `ADOPT-01…17` keep their meaning and numbering; the section-number back-compatibility
  map in the guide gains rows for the new steps and stays permanent.
- Repositories already adopted under the current guide are unaffected by the new steps: `ADOPT-00`
  and `ADOPT-18` are additive, and a repository with no
  `.specboot/adoption/BOOTSTRAP-MANIFEST.json` records `ADOPT-18` as `SKIPPED — no bootstrap
  performed`.
- **The two contract amendments are not backward-neutral, and must be stated as such.** A repository
  adopted under the previous guide may have skipped CodeGraph entirely; under D-1 it now lacks a
  mandatory capability. The amendment applies to adoptions started after it lands; already-adopted
  repositories are recorded as pre-amendment rather than retroactively marked FAIL. The same
  applies to the push protocol: previously adopted repositories were correct to stop at commit.
- The default installer behaviour is unchanged; `bootstrap` is a new, explicit subcommand.
- Kiro and Codex remain outside the permanent installer scope; this change adds bootstrap-time
  exposure only, and must not be read as delivering `make-specboot-installer-client-aware`.

### 14. Contract conflicts and their resolutions

Every conflict below is now **resolved**. C-1, C-2 and C-6 are resolved by amending the contract
inside this change; C-3 by a convention addition; C-4 and C-5 by the design itself.

| # | Conflict | Resolution (decided) |
|---|---|---|
| **C-1** | FR-12 requires push per checkpoint; `ADOPT-17` states **"Do not push"** and `00-conventions.md` puts remote mutation "outside this guide entirely". | **D-2.** Amend both files: push moves **inside** the contract behind its own `[HUMAN APPROVAL REQUIRED]` gate, preceded by a remote-impact assessment, subordinate to company policy. The skill never exceeds the contract; the contract is changed deliberately, in this change. |
| **C-2** | FR-6 requires a code-graph capability; the guide makes CodeGraph "the only optional branch". | **D-1.** Replace `02-codegraph.md`'s decision node with a mandatory capability-selection step: the capability is required, the product is a choice (CodeGraph or a company-approved equivalent), and no usable capability is **FAIL** — no waiver. |
| **C-3** | The bounded per-step working set is exactly three files; an orchestrator skill is a fourth. | State in `00-conventions.md` that the orchestrator skill body is part of the executing agent's context, not of the step's working set, and that its `references/` load on demand only. Remaining detail in OQ-3. |
| **C-4** | `ADOPT-13` preserves a real directory colliding with a canonical skill name and skips the symlink — which would make a bootstrap real `.claude/skills/specboot-adopt/` permanent. | `ADOPT-18` removes manifest-listed bootstrap entries **before** any collision rule applies, after verifying the permanent replacement; add a `22-troubleshooting.md` entry. |
| **C-5** | `ADOPT-15` needs a **fresh client session**; a running skill cannot restart its own session. | **D-9.** The skill stops, states the exact fresh-session prompt, and hands off — every fresh-session requirement is an explicit stop, never a simulated session. |
| **C-6** | Run-log location is deliberately undecided, but AI-driven resume needs a deterministic path. | **D-4.** `.specboot/adoption/ADOPTION-RUN-LOG.md`, committed, alongside the committed manifest. The run-log template's "your team's choice" paragraph is amended accordingly. |

### 15. Decisions of record (confirmed by the requester)

These are decisions, not inferences. They supersede the earlier assumptions and open questions noted
against each.

- **D-1 — A code-graph capability is mandatory; CodeGraph is optional only as the product choice.**
  A company-approved equivalent is acceptable. No usable graph capability is **FAIL** — not a
  waiver, not a skip, not a PASS. The guide contract is amended in this change. *(resolves OQ-1,
  C-2; supersedes the waiver-gate wording in FR-6)*
- **D-2 — Checkpoint commit and push, under two gates plus a remote-impact assessment.** Amend
  `ADOPT-17` and `00-conventions.md`. After explicit human approval, each independently validated
  checkpoint may be committed and pushed to the current working branch; before pushing, CI,
  deployment, security, notification and other remote effects are identified and reported; unknown
  or unapproved impact **blocks** the push. No PR until the full adoption and one real project E2E
  task pass. *(resolves OQ-2, C-1)*
- **D-3 — Client discovery paths.** Kiro: `.kiro/skills/specboot-adopt/SKILL.md`, supported. Codex:
  `.agents/skills/specboot-adopt/SKILL.md` as a **candidate only**, behind the mandatory §9.6 gate
  (official-documentation discovery, isolated scratch-repository construction, fresh-session
  execution test). Until that gate passes Codex is `PENDING` or `unavailable`, never PASS. This is
  an implementation gate, not an enrichment blocker. *(resolves OQ-4)*
- **D-4 — Bootstrap persistence.** `.specboot/bootstrap/` is transient and git-ignored. The durable
  committed control record is `.specboot/adoption/BOOTSTRAP-MANIFEST.json`; the committed run log is
  `.specboot/adoption/ADOPTION-RUN-LOG.md`. `ADOPT-18` removes transient payloads and **updates the
  manifest with final dispositions instead of deleting the evidence**. *(resolves OQ-7, OQ-5, C-6)*
- **D-5 — Checkpoint granularity.** A checkpoint is the **smallest independently validated `ADOPT`
  step**. A phase file is not automatically a checkpoint. Dependent steps may be grouped only with
  an explicit recorded justification. *(supersedes assumption A-3 and the CP-0…CP-9 table)*
- **D-6 — Skill lifecycle.** The canonical skill stays at `ai-specs/skills/specboot-adopt/` in the
  SpecBoot source repository. In the **adopting** repository the orchestration skill is temporary
  and is removed once permanent adoption is verified. *(supersedes assumption A-4; resolves OQ-10)*
- **D-7 — Payload assembly.** The bootstrap payload is assembled from canonical sources and guarded
  by a drift check; no second canonical copy is checked in. *(supersedes assumption A-5's scope)*
- **D-8 — Stable identifiers.** Existing `ADOPT` IDs keep their meaning and numbering; new
  identifiers are added, never renumbered.
- **D-9 — Fresh-session handoff.** Any requirement for a genuinely fresh client session causes an
  explicit stop and handoff to the operator. *(resolves C-5)*
- **D-10 — User-controlled runtime.** Model selection and manual/auto execution mode remain
  user-controlled and outside the skill's scope. *(resolves OQ-6)*

---

## Assumptions

Only genuine inferences appear here. Items now confirmed by the requester have moved to §15
**Decisions of record**; their original IDs are kept and marked superseded so earlier references
still resolve.

- **A-1** — "Client-neutral" means the skill contains no Claude-only mechanics in its body; per-client
  specifics live in `references/portability-matrix.md` and are selected at runtime from the client
  detected or declared at `ADOPT-00`.
- **A-2** — The three named clients (Claude, Kiro, Codex) are the supported set for this change;
  Cursor and Gemini remain out of scope even though `packages/specboot/` and `sync-agent-symlinks`
  mention Cursor and a `GEMINI.md` symlink exists.
- **A-3** — *Superseded by **D-5*** (checkpoint = smallest independently validated `ADOPT` step).
- **A-4** — *Superseded by **D-6*** (canonical in the source repo; temporary in the adopting repo).
- **A-5** — *Superseded by **D-4** and **D-7***. What remains an inference: `ADOPT-18` acts strictly
  on the manifest inventory and never infers removals from path patterns.
- **A-6** — "One real project E2E task" means the full six-capability daily workflow on a task the
  **human selects** in the adopting repository, recorded in the existing "Daily workflow pilot"
  block. The skill blocks until the human names the task.
- **A-7** — Push targets the existing configured remote and the current working branch only; the
  skill never creates branches beyond what the guide already specifies, never force-pushes, and
  never configures credentials.
- **A-8** — "Company-approved equivalent" for the code-graph capability is supplied by the operator
  as a name plus verification command; the skill validates that the command runs and returns a
  non-empty structured result, and does not attempt to judge the tool's quality. Under **D-1** a
  failed or unrunnable verification command means no usable capability, hence FAIL.
- **A-11** — The remote-impact assessment is evidence-based and read-only: CI/pipeline
  configuration, branch protection, required checks, and webhooks are inspected where the client
  and permissions allow. Where they cannot be inspected, the impact is **unknown**, which blocks
  the push — the skill does not request new credentials or elevated access to resolve it.
- **A-9** — New phase files are added rather than growing existing ones, consistent with the
  guide's one-file-per-phase structure and its bounded-working-set rationale.
- **A-10** — The skill produces no artifact outside the run log, the kit landing zone, and what the
  guide's steps already authorize.

---

## Open Questions

**No blocking question remains.** OQ-1, OQ-2, OQ-4, OQ-5, OQ-6, OQ-7 and OQ-10 are resolved — see
§15 (D-1, D-2, D-3, D-4, D-6, D-10). The questions below are non-blocking: each has a recommended
default, and none changes the shape of the design. They are decidable during proposal or
implementation.

1. **OQ-3 — Working-set accounting for the orchestrator (C-3).** Is the skill body counted inside or
   outside the bounded three-file per-step working set? Recommendation: outside, with `references/`
   loaded on demand. Decide when `00-conventions.md` is amended.
2. **OQ-8 — File numbering for the new phase files.** Existing files are `00`–`08`, `19`, `22` —
   already non-contiguous by design, and D-8 fixes the step IDs regardless. Should the bootstrap
   phase file be `09-bootstrap.md` (creation order) or a name that sorts first? Renumbering existing
   files is excluded: it would break the permanent section-number map.
3. **OQ-9 — Scope of the existing template drift.** `packages/specboot/template/ai-specs/skills/enrich-us/SKILL.md`
   already differs from canonical. Fix it inside this change (it is the motivating example for the
   drift check), or file a separate change and start the check in warn-only mode?
   Recommendation: separate change, check enforcing for the kit payload and warn-only for the
   pre-existing template, so this change does not silently alter an unrelated skill.
4. **OQ-11 — Windows validation availability.** Is a Windows machine available during
   implementation? If not, every Windows/PowerShell row is `PENDING EVIDENCE` and the change claims
   Windows-*intended* support only — never validated Windows portability. This constrains what may
   be asserted, not what is built.
5. **OQ-12 — Where do accepted improvement proposals land?** A new OpenSpec change per accepted
   proposal, one follow-up change batching them, or direct edits after adoption completes?
   Recommendation: one batching follow-up change, since proposals accumulate across checkpoints.
   FR-10 forbids silent application either way.

---

## Outcome

**READY FOR PROPOSAL**

All four blocking questions are resolved and recorded as decisions **D-1 … D-10** in §15. The two
contradictions with the authoritative contract are resolved the only way that keeps one authority:
the contract is **amended inside this change** — `02-codegraph.md`'s optional CodeGraph branch
becomes a mandatory code-graph capability-selection step that fails closed, and `ADOPT-17` plus
`00-conventions.md` §Scope boundaries bring push inside the contract behind two gates and a
remote-impact assessment.

Two items are carried forward deliberately, and neither blocks proposal:

- **Codex support is behind an implementation gate (§9.6), not an open question.** The change may be
  proposed and implemented; Codex may not be *claimed* until official-documentation discovery,
  isolated scratch-repository construction, and a fresh-session execution test all pass. Until then
  it is `PENDING EVIDENCE` or `unavailable` — never PASS.
- **Five non-blocking questions remain** (OQ-3, OQ-8, OQ-9, OQ-11, OQ-12), each with a recommended
  default recorded above.

Next: run `/opsx:propose` (Claude) / `/opsx-propose` (Kiro) in this same conversation. When it asks
what you want to build, provide the `## Enhanced` content of this artifact as the work-item
description — that is the authoritative input for proposal generation. After the change directory
exists, copy `.specboot/staging/add-specboot-adoption-orchestrator-enriched.md` into it as
`enriched-work-item.md` for traceability.
