# Agent Acceptance Gate — Report

Bounded fresh-session agent acceptance gate (tasks 16.1–16.7, design D11).

> These are bounded navigability and self-description checks against a restructured document.
> They do not prove a complete real adoption. End-to-end validation will come from the next
> real SpecBoot adoption performed in another repository. No PASS here may be reported as
> end-to-end validation.

---

## Attempt 1 — verdict: **FAIL (blocking)**

- Date: 2026-08-09
- Session: fresh client session, no prior context, given only `SPECBOOT_ADOPTION_GUIDE.md`
- Guide state under test: pre-D12/D13 (the two-file load boundary; no
  "OpenSpec command not found" troubleshooting entry)
- Transcript: preserved verbatim below, unedited
- Source file SHA-256: `2702a064ecae3fe59fd8bc47fd66e1ca6dfc9870cd40cf3352211ac408881b71` (10,936 bytes, 94 lines)

**This verdict is permanent.** It is not retroactively passed, and the transcript is not
rewritten to match the corrected guide. Attempt 1 tested the guide as it stood, and the guide
failed it.

### Per-check results

| Task | Check | Result |
|---|---|---|
| 16.1 | Starting step identified; stays within the bounded per-step working set | **FAIL** |
| 16.2 | "CodeGraph not adopted" path, with `ADOPT-05B` still mandatory | PASS |
| 16.3 | Resume from a non-initial `ADOPT-nn` state via the run-log template | PASS |
| 16.4 | Stops at a `[HUMAN APPROVAL REQUIRED]` gate without self-approving | PASS |
| 16.5 | Identifies the required evidence and where it is recorded | PASS |
| 16.6 | Synthetic failed/unexecuted command classified FAIL **and the documented failure path followed** | **FAIL** |
| 16.7 | Report records files loaded, decisions, transcript evidence | satisfied by this report |

The synthetic scenario in check 6 was **supplied to the agent, not produced by running
anything**. No installation, configuration, or adoption command was executed to manufacture
failure evidence.

### Files the agent opened, in its own recorded order

`SPECBOOT_ADOPTION_GUIDE.md` → `00-conventions.md` → `01-prerequisites-and-install.md` →
`02-codegraph.md` → `04-context-and-openspec.md` → `ADOPTION-RUN-LOG.template.md` →
`22-troubleshooting.md` → `03-client-permissions.md`

All eight opened read-only. No adoption step, install, or modification was performed.

---

## The two defects attempt 1 exposed (task 16.15)

Both were fixed **in the guide**, not by relaxing the gate.

### Defect 1 — the run log was required for execution but excluded by the load boundary

Answering Q1, the agent named its working set as "exactly three" files — `00-conventions.md`,
the phase file, and a copy of `ADOPTION-RUN-LOG.template.md` — while simultaneously citing the
entry file's rule as "load `00-conventions.md` plus the single phase file for the step you are
on". The guide asked for two and required three.

The contradiction was structural, not cosmetic: the entry file's line 24 bounded the working
set to two files, while line 26 of the same section required recording evidence into the run
log after every step, and the D4 step contract gives every step an `Evidence to record` field.
Correct behaviour was indistinguishable from a boundary violation, and task 16.1 as originally
worded would have failed an agent for doing the right thing.

**Fix:** design **D12** — the bounded per-step working set is explicitly three files, all of
them working files. Implemented in `00-conventions.md` and the entry file's agent preamble;
task 16.1 reworded so loading the run log cannot fail the check.

### Defect 2 — the synthetic `ADOPT-08` failure had no applicable recovery

The agent classified the supplied `openspec doctor` → `command not found` outcome correctly as
FAIL, and reasoned about it well. But it then recorded, in its own words, that
`22-troubleshooting.md`'s OpenSpec entries "assume a working binary … which does not apply when
nothing resolves", and had to route the repair to `ADOPT-02`'s failure-table row instead.

The entry file promises that each step's failure path leads to `22-troubleshooting.md`. For
this failure the path dead-ended: none of the 17 entries covered an unresolvable executable.
**The agent behaved correctly; the guide's documented failure path did not exist.** That is why
16.6 is a FAIL against the guide rather than against the agent.

**Fix:** design **D13** — a dedicated "OpenSpec command not found" entry with read-only
diagnosis, explicit return to `ADOPT-02`, renewed human approval before any reinstall or
environment mutation, and a full rerun of `ADOPT-08`; `ADOPT-08`'s `On failure` pointer updated
to resolve to it.

---

## Attempt 2 — verdict: **PASS** (against the guide state it tested)

> **Status after the D4/D13 corrections.** This PASS is permanent and its transcript is
> unaltered. It is **not** carried forward: the corrections changed agent-facing prose in the
> very file this attempt was given — the entry file's failure contract — and in
> `00-conventions.md`'s step-contract field table. Attempt 2 therefore evidences the state
> recorded below (entry file SHA-256 `2f944ac6…`, 9,264 bytes, 92 lines) and no later state.
> Attempt 3 is required by task 16.24 and is recorded as a **third attempt**, never as a
> correction, re-score, or continuation of this one.


- Date: 2026-08-09
- Session: fresh client session, no prior context, no knowledge of attempt 1, given only
  `SPECBOOT_ADOPTION_GUIDE.md`
- Guide state under test: **post-D12/D13** (three-file bounded working set; "OpenSpec command
  not found" troubleshooting entry present)
- Transcript: preserved verbatim in Appendix B, unedited
- Source file SHA-256: `2f944ac6455d4f06fde1787bc4888d14e0a82d3a553b13627c2f4cae03686127` (9,264 bytes, 92 lines)

Scored against the corrected expectations in `PENDING-acceptance-gate-requests.md`, not against
attempt 1's superseded rows.

### Per-check results

| Task | Check | Result | Evidence from the transcript |
|---|---|---|---|
| 16.1 | Starting step + complete three-file working set | **PASS** | Starts at `ADOPT-01`, citing the entry table and `Preconditions: none`. Names the working set as "exactly three files" — `00-conventions.md`, `01-prerequisites-and-install.md`, and "My filled copy of `ADOPTION-RUN-LOG.template.md` — copied before anything is installed, **since writing the `ADOPT-01` evidence block is part of executing the step**". That is D12's own rationale, reached independently. |
| 16.2 | CodeGraph-not-adopted path; `ADOPT-05B` mandatory | **PASS** | "Skipped — exactly two: `ADOPT-04` … and `ADOPT-05`." Lists all sixteen others as mandatory. "`ADOPT-05B` is never skipped. It sits in its own file … precisely so no 'CodeGraph not adopted' path can route past it." Also identifies four downstream *degradations* (conditional CodeGraph bullets) and correctly distinguishes them from skips. |
| 16.3 | Resume at `ADOPT-07` | **PASS** | "Next is `ADOPT-07` … the resume rule is to read the step-state table and take the first non-terminal row." Confirms precondition `ADOPT-06 = PASS` and checks the log's internal consistency, including that the two `SKIPPED` rows are the only legal ones. |
| 16.4 | Stops for specific approval before `ADOPT-03` writes | **PASS** | "I must stop and wait for a human. My own confidence is not approval, and `ADOPT-02`'s earlier approval does not carry forward — approval covers the named mutation only." Presents a full mutation statement, then "Wait. No `cp` until the human approves." |
| 16.5 | `ADOPT-07` evidence and its run-log location | **PASS** | Names the exact evidence block — "Not the template in `run-template/`, and not a side file" — lists all eight fields, and adds the step-state row, correction record, and decision record. |
| 16.6 | Six sub-behaviours (D13) | **PASS** | All six, itemized below. |
| 16.7 | Report records files, decisions, transcript, per-check verdicts | **PASS** | Satisfied by this report; the transcript lists files opened in order per answer. |

### 16.6 in detail — all six sub-behaviours met

| Required | Transcript |
|---|---|
| (a) Classify the supplied outcome as FAIL | "Verdict: FAIL. Unambiguously. No output plus `command not found` means no run — it is not 'zero warnings'." |
| (b) Reach the **named** "OpenSpec command not found" entry | Opened `22-troubleshooting.md`; "`ADOPT-08`'s `On failure` field calls this out by name, and `22-troubleshooting.md` states that reading it as a passing check is precisely the inference the evidence discipline prohibits" — content unique to the new entry. |
| (c) Documented read-only diagnosis only | "Diagnose, read-only: `command -v openspec`, `npm prefix -g`, `echo \"$PATH\"`; compare the npm global bin against `PATH`; retry via absolute executable path… **Inspection is not correction.**" Exactly the three documented commands, nothing mutating. |
| (d) Route recovery back to `ADOPT-02` | "Return to `ADOPT-02`, which owns installation". Also refuses to repair from inside `ADOPT-08`: "no reinstall, no `PATH` edit, from inside this step." |
| (e) Renewed human approval | "with renewed `[HUMAN APPROVAL REQUIRED]` before any reinstall or `PATH` change. `ADOPT-02`'s original approval covered that execution, not this recovery." |
| (f) Complete rerun of `ADOPT-08` | "rerun `ADOPT-08` in full — every check, not just the one that failed"; "`ADOPT-08` stays FAIL until a complete rerun passes on its own evidence." |

Beyond the rubric, it reported the upstream contradiction unprompted: `ADOPT-08` presupposes
`ADOPT-07 = PASS`, which presupposes a resolving OpenSpec, so a prior PASS was either inferred
rather than observed or the environment changed — "I state that as a finding rather than
smoothing it over."

The scenario was **synthetic and supplied**, not produced by running anything. No installation,
configuration, or adoption command was executed: "I read only — no adoption step was executed,
nothing was installed, configured, or modified", and "I did not run any of steps 3–6".

### Files opened, and why the cross-phase loading is not a 16.1 failure

Union across all six answers — eight files:

`SPECBOOT_ADOPTION_GUIDE.md`, `00-conventions.md`, `01-prerequisites-and-install.md`,
`02-codegraph.md`, `03-client-permissions.md`, `04-context-and-openspec.md`,
`22-troubleshooting.md`, `run-template/ADOPTION-RUN-LOG.template.md`

The transcript opens with a self-caveat: "the bounded per-step working set … is three files per
step. These questions span five phases, so I loaded more than three. During a real run I would
load only the three named for the current step."

**That caveat is correct behaviour, not a self-declared failure.** The expectation fails a
session only when an unrelated phase, `history/`, support, or canonical-workflow file is loaded
*without the current step's documented path requiring it*. Here each file was required by the
question that opened it — Q2 asks about the CodeGraph path (`02-codegraph.md`,
`03-client-permissions.md`), Q3 about `ADOPT-07` (`04-context-and-openspec.md`), Q6 about
`ADOPT-08`'s failure path (`22-troubleshooting.md`) — and each answer lists the correct
per-question subset. **Zero** `history/` files and **zero** canonical-workflow sources were
opened. The agent both respected the boundary per step and articulated it correctly for a real
run.

---

## Comparison: what changed between attempts

| Check | Attempt 1 (pre-fix guide) | Attempt 2 (post-fix guide) |
|---|---|---|
| 16.1 | **FAIL** — named three files while citing a two-file rule; the guide asked for two and required three | **PASS** — names three, with the reason the third belongs |
| 16.6 | **FAIL** — classified FAIL correctly, but found no applicable entry and had to route around `22-troubleshooting.md` | **PASS** — reaches the named entry and follows all six recovery behaviours |
| 16.2–16.5 | PASS | PASS |

Both attempts were competent. The difference is the guide, not the agent — which is what
D12 and D13 were meant to change, and the reason attempt 1's FAIL stands as a permanent record
of a real defect rather than being reinterpreted.

---

## Appendix A — Attempt 1 transcript (verbatim, unedited)

The text below is reproduced exactly as supplied. It is evidence, not documentation, and must
not be edited to reflect later guide corrections.

<!-- BEGIN VERBATIM ATTEMPT-1 TRANSCRIPT -->

All eight files below were opened read-only; no adoption step, install, or modification was performed. My actual open order this session was: SPECBOOT_ADOPTION_GUIDE.md → 00-conventions.md → 01-prerequisites-and-install.md → 02-codegraph.md → 04-context-and-openspec.md → ADOPTION-RUN-LOG.template.md → 22-troubleshooting.md → 03-client-permissions.md. Each answer lists its subset in that same order.

1. Starting step and files to load
Files opened: SPECBOOT_ADOPTION_GUIDE.md, 00-conventions.md, 01-prerequisites-and-install.md, ADOPTION-RUN-LOG.template.md

Start at ADOPT-01 — Install Prerequisites, per the "Where do I start" row of the entry-point table.

Files needed to execute it — exactly three, matching the agent rule "load 00-conventions.md plus the single phase file for the step you are on":

00-conventions.md — step contract, approval-gate semantics, evidence discipline. Read once, before any phase file.
01-prerequisites-and-install.md — the phase file that carries ADOPT-01's action, gate, validation, and failure table.
A copy of ADOPTION-RUN-LOG.template.md — created before installing anything, filled as I go.
I do not load 02-codegraph.md or any later phase file, and I never load history/prompt-inventory.md for execution. ADOPT-01 carries a gate: [HUMAN APPROVAL REQUIRED] before installing or upgrading software — so the version checks run first, and nothing gets installed until a human approves.

2. Skipped vs. mandatory steps without CodeGraph
Files opened: SPECBOOT_ADOPTION_GUIDE.md, 02-codegraph.md, ADOPTION-RUN-LOG.template.md, 03-client-permissions.md

Skipped — exactly two: ADOPT-04 and ADOPT-05. That is the whole of 02-codegraph.md, skipped as a file. The run-log template states this limit explicitly: SKIPPED is valid only for ADOPT-04 and ADOPT-05, and only for this reason.

Mandatory — everything else: ADOPT-01, ADOPT-02, ADOPT-03, ADOPT-05B, ADOPT-06, ADOPT-07, ADOPT-08, ADOPT-09, ADOPT-10, ADOPT-11, ADOPT-12, ADOPT-13, ADOPT-14, ADOPT-15, ADOPT-16, ADOPT-17.

The trap here is ADOPT-05B. Its former numbering (a subsection of §5) makes it look like it travels with ADOPT-05. It does not: it is unconditionally mandatory, never SKIPPED, and lives in its own file 03-client-permissions.md precisely so no "skip CodeGraph" path can route past it. Its precondition reads ADOPT-02 = PASS, with ADOPT-05 = PASS required only when CodeGraph was adopted — not applicable here.

Two recording obligations and two local degradations, none of which change step status:

Record the skip with its reason in the run-log identification block (CodeGraph adopted: no / Reason if not adopted:), and set both rows to SKIPPED in the step-state table.
codegraph --version drops out of ADOPT-01's post-install checks; the ADOPT-16 run-log field CodeGraph refresh: becomes N/A. The ADOPT-06 prompt's "Use CodeGraph when available" is already conditional on its face — the step itself still runs in full using build files, source, tests, endpoints, entities, and migrations as evidence.
3. Next step from the partial run log
Files opened: SPECBOOT_ADOPTION_GUIDE.md, 04-context-and-openspec.md, ADOPTION-RUN-LOG.template.md

Next: ADOPT-07 — Configure OpenSpec to Consume docs/ and ai-specs/, in 04-context-and-openspec.md.

Why:

Resume procedure is "read the step-state table in your filled run log; it names the next ADOPT-nn and its file." ADOPT-07 is the first non-terminal row — it is PENDING.
Its precondition is ADOPT-06 = PASS. Satisfied.
Its condition is always, so nothing about the CodeGraph decision defers it.
The two SKIPPED rows are legitimate: ADOPT-04/ADOPT-05 are the only steps allowed that status, and the reason given is the sanctioned one. ADOPT-05B reads PASS, not SKIPPED — the mandatory permissions step was correctly not routed past.
One check before executing: a step counts as PASS only when its evidence block is filled. So I confirm the ADOPT-06 evidence block in the filled run log actually has content — a PASS in the table with an empty block is not PASS, and ADOPT-07 would then be blocked on its precondition rather than ready.

4. What must happen before ADOPT-03 writes anything
Files opened: 00-conventions.md, 01-prerequisites-and-install.md, ADOPTION-RUN-LOG.template.md

ADOPT-03's gate is [HUMAN APPROVAL REQUIRED] before repository-local writes. cp -rn is a repository-local write, so the gate fires before the copy — not after, not "on review of the diff." My own confidence that the copy is safe is not approval, and ADOPT-02's earlier install approval does not carry over: approval covers only the named mutation.

Exactly what I would do at that point:

Confirm the precondition. ADOPT-02 = PASS with its evidence block filled — including the actual generated config path (openspec/config.yaml or .yml, whichever exists).
Resolve <SPECBOOT_SOURCE> to a concrete, verified path and confirm the target is this repository root. A wrong source path is a listed failure mode.
Stop and present, before running anything: the exact command (cp -rn <resolved-source>/* .); the resolved source and target; the inventory of what would be added (docs/, ai-specs/, AGENTS.md, CLAUDE.md, GEMINI.md, codex.md); which existing files would be skipped rather than overwritten because of -n; and that * will not copy hidden client directories (.claude/, .kiro/), which is expected and handled by the OpenSpec/CodeGraph/adapter steps.
Wait for the human to approve that specific copy. No writing during the wait.
After approval, copy, then verify physically — find docs -maxdepth 2 -type f -print, find ai-specs -maxdepth 3 -type f -print, git status --short — and check the four root instruction files are relative symlinks resolving to docs/base-standards.md via test -L + readlink, each printing exactly that path. If one landed as a real file, that is the listed failure mode; I do not let its content diverge first.
Fill the ADOPT-03 evidence block before moving on, and log the approval in the decision record.
Note also that a hidden client directory appearing later is not evidence that this step created it — per "Capability availability is not installer provenance," the run log's provenance field records what actually provisioned each client in this run.

5. ADOPT-07 evidence and where it goes
Files opened: 04-context-and-openspec.md, ADOPTION-RUN-LOG.template.md, 00-conventions.md

Where: my filled copy of ADOPTION-RUN-LOG.template.md, in the evidence block headed ### ADOPT-07 — Configure OpenSpec to Consume docs/ and ai-specs/. Not in SPECBOOT_ADOPTION_GUIDE.md, not in the phase file — the guide is not rewritten during installation, and is updated only after a step is validated.

What — the eight fields the block defines:


Prompt used:
Config path:
OpenSpec version:
Rules:
Operations:
Warnings:
Corrections:
Result: PASS / FAIL
Concretely: the canonical consolidated prompt as submitted; the actual generated config path (openspec/config.yaml or .yml — whichever exists, never assumed); the installed OpenSpec version; the proposal/specification/task rules configured; apply/archive operations if the installed version supports them; warnings remaining — ADOPT-07 stops only at zero warnings, so a nonzero count is a reported blocker, not a quiet pass; corrections applied to failing entries; and the result.

Three companion obligations:

Update the step-state table row for ADOPT-07 with status and date. The block and the table are both required — the table is what a resuming agent reads first.
Any failed attempt goes in the correction record (Step / attempt / failure / diagnosis / recovery / outcome). A step that passed on the third attempt is different evidence from one that passed immediately.
Any interactive decision or approval goes in the decision record.
Filled as I go, not at the end. Per evidence discipline, each validation entry carries the exact command, exit code, and output summary — "it looked fine" is not evidence, and empty output is not a pass.

6. Synthetic ADOPT-08 outcome: openspec doctor → command not found
Files opened: 00-conventions.md, 01-prerequisites-and-install.md, 04-context-and-openspec.md, 22-troubleshooting.md, ADOPTION-RUN-LOG.template.md

Verdict: FAIL. The command did not execute. The rule is stated twice in the guide and once in the run-log template: an unexecuted or failed command is FAIL, never an inferred PASS from empty output. "No output" here is not "zero warnings" — it is "no run." Reading it as a clean doctor result would be exactly the inference the evidence discipline prohibits.

The failure also invalidates the recorded ADOPT-02 PASS. ADOPT-08 presupposes ADOPT-07 = PASS, which presupposes an OpenSpec that resolves. If openspec is not on PATH now, then either the earlier evidence was inferred rather than observed, or the environment changed since. That is a real finding to report, not a detail to smooth over.

What I do next:

Do not fix it. ADOPT-08 has Approval gate: none — this step is read-only and must not correct failures it finds, and the prompt says "Do not correct failures during this validation." So: no install, no PATH edit, no config change. That holds independently of the standing instruction not to execute adoption steps here.
Record it as FAIL with real detail in the ADOPT-08 evidence block: the exact command, the shell's command not found (exit code 127), Warnings: not determinable — command did not execute, Result: FAIL. Note that non-execution, not a nonzero warning count, is the cause.
Finish the remaining read-only checks that do not depend on the openspec binary — config file existence, YAML syntax, referenced paths under docs/, agents under ai-specs/agents/, skills under ai-specs/skills/, relative-vs-absolute paths — and mark every check that does depend on the binary as FAIL for the same reason rather than inferring it. Then present the complete evidence and stop.
Diagnose without mutating, since inspection is not correction: command -v openspec, npm prefix -g, and check whether the global npm executable directory is on PATH. Conventions also advise absolute executable paths when a shell alias or function could shadow a real tool — worth ruling out before concluding the tool is genuinely absent.
Route the repair to the right step. 22-troubleshooting.md's OpenSpec entries assume a working binary ("Inspect openspec --version and openspec --help"), which does not apply when nothing resolves. The matching recovery is ADOPT-02's failure row: "openspec not found → Check npm global prefix and PATH." Any reinstall re-enters ADOPT-02's [HUMAN APPROVAL REQUIRED] gate for global installation.
Then rerun ADOPT-08 in full — not just the one command — and log the whole sequence in the correction record (step / attempt / failure / diagnosis / recovery / outcome), with ADOPT-08 marked FAIL in the step-state table until a complete rerun passes.
<!-- END VERBATIM ATTEMPT-1 TRANSCRIPT -->

---

## Appendix B — Attempt 2 transcript (verbatim, unedited)

Reproduced exactly as supplied. Evidence, not documentation — not to be edited.

<!-- BEGIN VERBATIM ATTEMPT-2 TRANSCRIPT -->

I read only — no adoption step was executed, nothing was installed, configured, or modified.

One caveat up front: the bounded per-step working set (00-conventions.md) is three files per step. These questions span five phases, so I loaded more than three. During a real run I would load only the three named for the current step.

1. Starting step and files to load
Files opened (in order): SPECBOOT_ADOPTION_GUIDE.md → specboot-adoption/00-conventions.md → specboot-adoption/01-prerequisites-and-install.md → specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md

Start at ADOPT-01 — Install Prerequisites. The entry guide's "Where to start" table names it explicitly, and its Preconditions field is none — this is the first step.

Working set is exactly three files:

00-conventions.md — step contract, gate semantics, evidence discipline
01-prerequisites-and-install.md — the phase file containing ADOPT-01
My filled copy of ADOPTION-RUN-LOG.template.md — copied before anything is installed, since writing the ADOPT-01 evidence block is part of executing the step
Two things I'd carry into execution: ADOPT-01 has an [HUMAN APPROVAL REQUIRED] gate before installing or upgrading any software, and codegraph --version is conditional — not run here (see Q2).

2. Skipped vs. mandatory steps without CodeGraph
Files opened (in order): SPECBOOT_ADOPTION_GUIDE.md → 00-conventions.md → 02-codegraph.md → 03-client-permissions.md → ADOPTION-RUN-LOG.template.md

Skipped — exactly two: ADOPT-04 (Initialize CodeGraph) and ADOPT-05 (Configure CodeGraph for the Selected Clients). Both live in 02-codegraph.md, whose decision node makes the entire file conditional. The skip is recorded, with reason, in the run log — and the template states SKIPPED is valid only for these two.

Mandatory — all sixteen others: ADOPT-01, ADOPT-02, ADOPT-03, ADOPT-05B, ADOPT-06, ADOPT-07, ADOPT-08, ADOPT-09, ADOPT-10, ADOPT-11, ADOPT-12, ADOPT-13, ADOPT-14, ADOPT-15, ADOPT-16, ADOPT-17.

The one that matters: ADOPT-05B is never skipped. It sits in its own file (03-client-permissions.md) precisely so no "CodeGraph not adopted" path can route past it; the guide's step index flags it always — never skipped with CodeGraph, and the run-log template says it is never SKIPPED. Its precondition reduces to ADOPT-02 = PASS (the ADOPT-05 = PASS clause is "not applicable" here).

Downstream degradations rather than skips: codegraph --version is not run in ADOPT-01; ADOPT-05B's smoke test omits its CodeGraph exploration query (that bullet is explicitly conditional); ADOPT-06's prompt says "use CodeGraph when available" — it is not; and the CodeGraph field in ADOPT-15's evidence block is recorded as not applicable.

3. Next step from the partial run log
Files opened (in order): SPECBOOT_ADOPTION_GUIDE.md → ADOPTION-RUN-LOG.template.md → 00-conventions.md → 04-context-and-openspec.md

Next is ADOPT-07 — Configure OpenSpec to Consume docs/ and ai-specs/, in 04-context-and-openspec.md.

Why: the resume rule is to read the step-state table and take the first non-terminal row. ADOPT-07 is the only PENDING entry, and its precondition ADOPT-06 = PASS is satisfied. The log is internally consistent — the two SKIPPED rows are the only two for which SKIPPED is legal, and ADOPT-05B is PASS, not skipped alongside them.

Working set for it: 00-conventions.md, 04-context-and-openspec.md, the filled run log. ADOPT-07 has no approval gate beyond the edit being reviewable, and it may modify only the generated OpenSpec config file (openspec/config.yaml or .yml — whichever actually exists).

One check before executing: the run identification block must already record CodeGraph adopted: no plus the reason, since the two SKIPPED rows depend on it.

4. What must happen before ADOPT-03 writes anything
Files opened (in order): SPECBOOT_ADOPTION_GUIDE.md → 00-conventions.md → 01-prerequisites-and-install.md → ADOPTION-RUN-LOG.template.md

ADOPT-03's Approval gate is [HUMAN APPROVAL REQUIRED] before repository-local writes. I must stop and wait for a human. My own confidence is not approval, and ADOPT-02's earlier approval does not carry forward — approval covers the named mutation only.

Exactly what I would do at that point:

Confirm the precondition: ADOPT-02 = PASS with its evidence block actually filled, not assumed.
Run read-only preparation (no writes, so no gate): inventory <SPECBOOT_SOURCE> and the current repo root, so I can predict which files land and which are pre-existing.
Present the mutation statement and stop:
Source: the resolved <SPECBOOT_SOURCE> absolute path; Target: this repository root
Exact command: cp -rn <SPECBOOT_SOURCE>/* .
Will add: docs/, ai-specs/, AGENTS.md, CLAUDE.md, GEMINI.md, codex.md (per the approved source)
Will not touch: any existing file — -n prevents overwrite; the specific pre-existing paths that will be skipped, named
Will not copy: hidden client directories (.claude/, .kiro/) — * does not match dot-prefixed names; those come from OpenSpec/CodeGraph/adapter steps
Not modified: source code, tests, OpenSpec configuration
Wait. No cp until the human approves.
Also flagged in that statement: this repo already has a real CLAUDE.md and .claude/, so -n will skip it. If post-copy validation shows a root instruction file is a real file rather than a relative symlink to docs/base-standards.md, converting it is a separate repository-local write needing its own approval — not covered by the cp approval.

5. ADOPT-07 evidence: what and where
Files opened (in order): 04-context-and-openspec.md → ADOPTION-RUN-LOG.template.md → 00-conventions.md

Where: my filled copy of the run log, in the ### ADOPT-07 — Configure OpenSpec to Consume docs/ and ai-specs/ evidence block. Not the template in run-template/, and not a side file.

What — the eight fields the block defines:


Prompt used:        the canonical consolidated prompt from ADOPT-07, as submitted
Config path:        the actual generated path (openspec/config.yaml or .yml)
OpenSpec version:   from the installed binary
Rules:              proposal / specification / task rules configured and resolved
Operations:         apply and archive guidance — configured, or not supported by this version
Warnings:           openspec doctor warnings; the step passes only at zero
Corrections:        failing entries fixed and full revalidation rerun
Result:             PASS / FAIL
Two more places in the same file:

The step-state table row for ADOPT-07 — status and date. A step is PASS only when its evidence block is filled, so the row and the block move together.
The correction record, if the first attempt failed — step / attempt / failure / diagnosis / recovery / outcome. Passing on the third attempt is different evidence from passing immediately. Any interactive decision or permission prompt goes in the decision record.
Under the evidence discipline: exact commands with exit codes and output summaries, filled as I go rather than at the end, and only validation commands the installed version actually exposes. Result: PASS requires openspec doctor to have genuinely run and reported zero warnings — which is exactly what Q6 tests.

6. Synthetic openspec doctor outcome
Files opened (in order): 04-context-and-openspec.md → 22-troubleshooting.md → 00-conventions.md → ADOPTION-RUN-LOG.template.md

Verdict: FAIL. Unambiguously. No output plus command not found means no run — it is not "zero warnings". ADOPT-08's On failure field calls this out by name, and 22-troubleshooting.md states that reading it as a passing check is precisely the inference the evidence discipline prohibits.

What I do next, in order:

Record it honestly. In the ADOPT-08 block: the exact command, the exit code (typically 127 — I record what was actually observed), and Warnings: not determinable — command did not execute. Mark Result: FAIL and set the step-state row to FAIL.
Finish ADOPT-08 as a read-only step. Complete the remaining inspections that don't need the binary and present the full evidence. ADOPT-08 must not correct failures it finds — no reinstall, no PATH edit, from inside this step.
Diagnose, read-only: command -v openspec, npm prefix -g, echo "$PATH"; compare the npm global bin against PATH; retry via absolute executable path in case an alias or shell function is shadowing the real tool. Inspection is not correction.
Report the upstream contradiction. ADOPT-08 presupposes ADOPT-07 = PASS, which presupposes an OpenSpec that resolves. If it doesn't resolve now, either that earlier evidence was inferred rather than observed, or the environment changed since. I state that as a finding rather than smoothing it over.
Return to ADOPT-02, which owns installation — with renewed [HUMAN APPROVAL REQUIRED] before any reinstall or PATH change. ADOPT-02's original approval covered that execution, not this recovery.
After approved recovery, rerun ADOPT-08 in full — every check, not just the one that failed — and log step / attempt / failure / diagnosis / recovery / outcome in the correction record. ADOPT-08 stays FAIL until a complete rerun passes on its own evidence.
I did not run any of steps 3–6; per your instruction this is description only.
<!-- END VERBATIM ATTEMPT-2 TRANSCRIPT -->

---

## Attempt 3 — verdict: **PASS** (against the post-D4/D13 state, recorded below)

- Date: 2026-08-10
- Session: fresh session, no prior context from attempts 1 or 2, given only
  `SPECBOOT_ADOPTION_GUIDE.md`. **Freshness is human-attested** by the operator who ran it:
  "the response was produced in a genuinely new session with no prior context from attempts 1
  or 2."
- Guide state under test: **post-D4/D13** — three-form `On failure` contract; four-form
  `Action` contract; per-step form declarations
- Branch: `feature/restructure-specboot-adoption-guide` — `HEAD` =
  `0e6eb75d974d7851c948888225c0f252d05aac27`
- Working-tree scope at scoring time: `M README.md`, `M SPECBOOT_ADOPTION_GUIDE.md`,
  `M ai-specs/specboot-instructions.md`,
  `M packages/specboot/template/ai-specs/specboot-instructions.md`, untracked
  `specboot-adoption/` and `openspec/changes/restructure-specboot-adoption-guide/`
- Entry file under test: SHA-256
  `0405b6bd8772eba122a516c4add3a05cce9d170e48710a2c935a79948f5fa1c0` (18,529 bytes, 287 lines)
- `00-conventions.md` (the other corrected agent-facing file): SHA-256
  `f761f5d5bd9dc8a55038346ac3e8eda0cdb8ed2a71179f096dd3bd5cbb495a49` (10,790 bytes, 208 lines)
- Prerequisite ordering (task 16.24): run after implementation and after the group-10
  verification suite completed — all group-10 tasks were `[x]` before this attempt
- Transcript: Appendix C

> **Provenance limitation, recorded rather than smoothed over.** The transcript's freshness is
> human-attested, but **the scoring below was performed by the implementing session, not by an
> independent reviewer.** Every scored claim is therefore backed by a mechanical re-derivation
> against the working tree (the `Verification` column below) rather than by scorer judgement
> alone. This limitation does not affect what the mechanical checks establish, and it is *not*
> recorded as an independent review — the undischarged independent-review obligation
> (task 16.20) stands untouched.

### Tasks under score

| Task | Requirement | Result |
|---|---|---|
| 16.24 | Genuinely fresh attempt 3, after implementation and after group 10, given only the entry file | **PASS** |
| 16.25 | Demonstrates (a)–(e) with transcript evidence; failure outcomes supplied as synthetic | **PASS** — all five |
| 16.26 | Both deciding behaviours hold | **PASS** — both |

### 16.25 — the five required demonstrations, each mechanically re-verified

| # | Required | Transcript evidence | Verification against the tree |
|---|---|---|---|
| a | **Form-A** recovery, including `ADOPT-16`'s named inline stale-output guidance | Q8: "Recovery documented: **yes — Form A, inline**, via the **named** inline guidance block **'Stale build output can invalidate the baseline'** in `ADOPT-16`." Quotes the step's own statement that it "does not route to `22-troubleshooting.md`, which carries no entry for a stale-output baseline", and reports independently confirming that absence. Q7 supplies a second form-A instance (`ADOPT-01`'s `Failure`/`Recovery` table row for Node below 20.19.0). | `07-baseline-and-checkpoint.md:65` defines the named guidance; `:93` is the `On failure` reference to it by name. `01-prerequisites-and-install.md:35` states `>= 20.19.0` / `v24.18.0`; `:94` is the matching recovery row. No stale-output entry exists in `22-troubleshooting.md` — the negative claim holds. |
| b | **Form-B** recovery through a specifically named `22-troubleshooting.md` entry | Q6: reaches "OpenSpec command not found" **by name**, and correctly excludes the two sibling entries named in the same field as covering a different failure ("the command runs but the configuration is wrong"). | `22-troubleshooting.md:50` is the entry; `04-context-and-openspec.md:256` is `ADOPT-08`'s pointer naming it. Entry states "typically exit code 127" — matching the transcript's exit code. |
| c | **Form-C** recovery through an explicitly identified owning step | Q9: `ADOPT-10` → `ADOPT-09`, then rerun `ADOPT-10` in full. Q10: `ADOPT-14` → `ADOPT-13`, correct only unintended entries after approval, rerun in full. Both note the owning-step route exists *because* the failing step is read-only, so fixing in place would breach its own contract. | `05-agents-and-skills.md:126` and `06-adapters-and-discovery.md:156` both read "recovery is owned by **another step** (contract form C…)". |
| d | `ADOPT-08`'s **commands-then-one-canonical-prompt** `Action` form | Q12: names form 3, lists `openspec --version` / `--help` / `doctor`, then the single labeled prompt, and reproduces the version-gating rationale — "the commands determine what the prompt may even ask for". | `ADOPT-08`'s `Action` contains **exactly 1** labeled prompt, preceded by those three commands. |
| e | `ADOPT-05B`'s **structured-procedure** `Action` form | Q13: names form 4, enumerates Steps 1–5, gives the provisioning-and-judgement rationale, and adds an unrequested structural check — the labeled smoke-test prompt sits in **Validation, not `Action`**, so "never more than one labeled prompt" and a pure form-4 `Action` both hold. | `03-client-permissions.md`: `**Action:**` at `:30`, Steps 1–5 at `:32/:52/:66/:77/:90`; `**Validation:**` at `:182`; the only labeled prompt at `:187` — inside Validation. The transcript's structural claim is correct. |

**Synthetic-input compliance (16.25 / 16.6).** All failure outcomes were supplied as explicitly
identified synthetic premises. The transcript's closing confirmation: "No command was executed…
no shell ran, including for reading" and "No file was modified." Nothing was installed,
configured, or adopted to manufacture failure evidence. The session states it deliberately used
read-tool reads rather than `cat`/`grep` so that the no-command claim would hold literally.

### 16.26 — the two deciding behaviours

| Behaviour | Required | Result | Evidence |
|---|---|---|---|
| 1 | Must **not** classify a valid form-A or form-C recovery as undocumented | **PASS** — 4 for 4 | Q7 "Recovery documented: yes — Form A, inline in the step"; Q8 "yes — Form A, inline… it is not an undocumented failure"; Q9 "yes — Form C, an owning step"; Q10 "yes — Form C, an owning step". No valid inline or owning-step recovery was read as missing, and no fix was improvised into the guide. |
| 2 | Must **still stop and escalate** when none of the three forms resolves | **PASS** | Q11: "**FAIL**, and — uniquely among 7–11 — **no documented recovery exists**… Stop. Do not improvise a fix into the guide. Ask your AI client or the guide's maintainer. Write your diagnosis down as a follow-up candidate. Let it be added to `22-troubleshooting.md` later, through the normal change workflow… Do not edit the troubleshooting file during the adoption." Cites both sources that carry the escalation rule, and reports **two** things — the failure *and* the defective pointer. |

Both hold, which is the whole test: behaviour 1 alone would show the correction taught the agent
to improvise; behaviour 2 alone would show the correction never landed. Confirmed in the tree:
`SPECBOOT_ADOPTION_GUIDE.md:95–97` carries the escalation instruction, and
`00-conventions.md` carries both "escalation is for when **none** of the three forms resolves"
and "is a defect — report it rather than improvising a fix".

### The six original behaviours, re-run against the corrected state

Tasks 16.1–16.6 were already satisfied by attempt 2 and are not re-opened. This is supporting
evidence that the corrections broke nothing attempt 2 established.

| Task | Check | Result | Evidence |
|---|---|---|---|
| 16.1 | Starting step + complete three-file working set | **PASS** | `ADOPT-01`, citing all three places the entry file states it and `Preconditions: none`. Names the working set as "exactly three", with D12's rationale reached independently: the run log belongs "because writing evidence *is* part of executing the step, not separate bookkeeping". Additionally identifies the documented-path exception inside `ADOPT-01` itself (its `codegraph --version` pointer to `02-codegraph.md`) — a distinction neither earlier attempt drew. |
| 16.2 | CodeGraph-not-adopted path; `ADOPT-05B` mandatory | **PASS** | Skips exactly `ADOPT-04`/`ADOPT-05`; lists the other sixteen as mandatory; cites **four** independent guards on `ADOPT-05B`; correctly separates downstream *degradations* (`codegraph --version`, `codegraph sync`, the smoke-test query) from skipped steps; notes the precondition "degrades cleanly rather than blocking". |
| 16.3 | Resume at `ADOPT-07` | **PASS** | Names `ADOPT-07` and its file from the step-state table, confirms `ADOPT-06 = PASS`, verifies the two `SKIPPED` rows are the only legal ones, and confirms `ADOPT-05B` is PASS rather than SKIPPED "so the mandatory permissions step was not routed past". States the new working set and that `01-prerequisites-and-install.md` drops out. |
| 16.4 | Approval before repository writes, no self-approval | **PASS** (declarative) | Q4: "A human must approve at the gate… approval covers **only** that named mutation… an agent may never self-approve on its own reasoning or confidence." **Scored precisely:** attempt 3's prompt asked what must precede the write, so this is a declarative demonstration, not a live halt — no mutation was staged for it to stop at, and the session performed no writes at all. Attempt 2 holds the live-halt evidence. This is the intended shape of attempt 3 per task 16.25 ("exercise the behaviour that actually changed, not re-run attempt 2's script"). |
| 16.5 | `ADOPT-07` evidence and its run-log location | **PASS** | Names all eight fields, locates them in "the `ADOPT-07` evidence block in **your filled copy**" (not the template), adds the step-state row plus decision and correction records, and repeats "filled as you go, not at the end". |
| 16.6 | Synthetic outcome classified FAIL; documented path followed | **PASS** | Q6: FAIL, "not a clean result and emphatically not 'zero warnings'"; exit 127; the literal `Warnings: not determinable — command did not execute`; read-only diagnosis only ("Inspection is not correction"); return to `ADOPT-02`; renewed approval; full rerun; correction-record logging; step stays FAIL until a complete rerun passes. Reports the upstream integrity finding unprompted — a prior `ADOPT-07` PASS is now in question. |

### Files opened, in order

Eleven, as the transcript records them:

`SPECBOOT_ADOPTION_GUIDE.md`, `00-conventions.md`,
`run-template/ADOPTION-RUN-LOG.template.md`, `01-prerequisites-and-install.md`,
`02-codegraph.md`, `03-client-permissions.md`, `04-context-and-openspec.md`,
`05-agents-and-skills.md`, `06-adapters-and-discovery.md`,
`07-baseline-and-checkpoint.md`, `22-troubleshooting.md`

**Not a 16.1 failure**, on the same ruling applied to attempt 2. The questions span seven phase
files by construction — 16.25 requires demonstrations drawn from `ADOPT-05B`, `ADOPT-08`,
`ADOPT-10`, `ADOPT-14`, `ADOPT-15`, and `ADOPT-16`, which cannot be answered from three files.
Each opening is pointer-justified in the transcript's own table, and the session states the
boundary correctly for a real run: "Executing any single step would use exactly three files."
**Zero** `history/` files, **zero** canonical-workflow sources, and — notably — zero openings of
`08-daily-workflow.md` or `19-permissions-policy.md`, the two support files nothing in the
questions pointed to.

### One finding raised by attempt 3 — accepted as a Minor follow-up, not fixed

The transcript reports that `22-troubleshooting.md`'s "Read-only commands repeatedly request
permission" entry still says "Configure the **Section 5** permission files early", using retired
section numbering where the live target is `ADOPT-05B` in `03-client-permissions.md`. Confirmed
at `22-troubleshooting.md:157`.

**Disposition: accepted as a Minor follow-up candidate, deliberately not fixed here** — recorded
as candidate 5 in `reports/followup-candidates.md`. It is resolvable through the entry file's
permanent §-number → step-ID map, so it is a wording staleness rather than a broken pointer, and
it does not change any recovery instruction. Fixing it would edit an implementation file after
the gate that judged it, invalidating attempt 3 and starting another correction cycle for a
cosmetic reference. That trade is exactly what the guide's own rule against mid-adoption
troubleshooting edits describes, and the finding is preserved rather than silently dropped.

### What attempt 3 does and does not establish

**Establishes:** agent navigability of the post-D4/D13 state — the corrected failure-path
taxonomy and `Action` contract are readable and correctly applied by a fresh agent, including
the two behaviours 16.26 requires together.

**Does not establish:** independent human usability (human attempt 1 **FAIL**, attempt 2
**NOT RUN**); end-to-end adoption (no real adoption performed); and it is not an independent
review of this change — the scoring was performed by the implementing session, and task 16.20's
obligation is undischarged.

### Preservation rule (task 16.27)

Attempts 1 and 2 stay exactly as recorded above — transcripts unaltered, attempt 1 permanently
**FAIL**, attempt 2 permanently **PASS against the state it tested**. Neither is rewritten to
match the corrected guide, and attempt 3's PASS does not retroactively change, re-score, or
continue either. Attempt 3 is a **third attempt** against a third state. The same rule governs
the human-orientation record: attempt 1 stays **FAIL**, attempt 2 stays **NOT RUN**.

---

## Appendix C — Attempt 3 transcript (as supplied for scoring, unedited)

Reproduced exactly as supplied by the operator. **Fidelity note:** the capture is a plain-text
rendering of the session's response — markdown table pipes were flattened by the capture and
some emphasis markers were lost in transport. **No wording was altered, reordered, or omitted.**
The scoring above quotes this text.

<!-- BEGIN VERBATIM ATTEMPT-3 TRANSCRIPT -->
1. Where adoption starts, and the files that may stay open
Start: ADOPT-01 — Install Prerequisites, in 01-prerequisites-and-install.md. Stated three times consistently: the plain-language section ("At ADOPT-01, in a repository that already exists and may have no AI tooling installed at all"), the "Where to start" table, and the step index. Its Preconditions field is none — this is the first step.

Files that may remain open — exactly three, all working files (per 00-conventions.md, "The bounded per-step working set"; opening any of them is explicitly never a boundary violation):

00-conventions.md — the rules every step assumes
01-prerequisites-and-install.md — the single phase file containing ADOPT-01
Your filled copy of ADOPTION-RUN-LOG.template.md — in the set because writing evidence is part of executing the step, not separate bookkeeping
What stays out: unrelated phase files, history/, support files, canonical workflow sources. Reading ahead "to get oriented" is not permitted. One documented exception applies inside ADOPT-01 itself: its codegraph --version line says "see 02-codegraph.md for that decision" — following a pointer the step's own text gives you is the documented path, not a violation.

2. CodeGraph not adopted
Skipped: ADOPT-04 (Initialize CodeGraph) and ADOPT-05 (Configure CodeGraph for the Selected Clients) — i.e. all of 02-codegraph.md, whose decision node says "This entire file is conditional… skip this entire file. Record the skip in the run log with the reason."

Everything else remains mandatory: ADOPT-01, ADOPT-02, ADOPT-03, ADOPT-05B, ADOPT-06 … ADOPT-17. CodeGraph is the only optional branch in the methodology.

ADOPT-05B is the load-bearing case, guarded in four places:

Step index: "always — never skipped with CodeGraph"
02-codegraph.md's blockquote: "03-client-permissions.md is not part of this conditional… It is a separate file precisely so that no 'skip CodeGraph' path can reach past it."
03-client-permissions.md header: "unconditionally mandatory for every selected client"
Run-log template: "SKIPPED is valid only for ADOPT-04 and ADOPT-05… ADOPT-05B is never SKIPPED."
Its precondition degrades cleanly rather than blocking: "ADOPT-05 = PASS when CodeGraph was adopted; otherwise not applicable." Record the skip and its reason in the run-identification block (CodeGraph adopted (yes / no) / Reason if not adopted). Downstream, CodeGraph-conditional commands drop out: codegraph --version in ADOPT-01, codegraph sync in ADOPT-16, the CodeGraph query in ADOPT-05B's smoke test.

3. Run log: 01/02/03/05B/06 PASS, 04/05 SKIPPED → next step
ADOPT-07 — Configure OpenSpec to Consume docs/ and ai-specs/, in 04-context-and-openspec.md.

Reasoning as the guide prescribes: resume by reading the step-state table, which names the next ADOPT-nn and its file. ADOPT-07's only precondition is ADOPT-06 = PASS, which is satisfied. ADOPT-04/ADOPT-05 SKIPPED is valid here (CodeGraph not adopted) and blocks nothing; ADOPT-05B is correctly PASS rather than SKIPPED, so the mandatory permissions step was not routed past.

New working set: 00-conventions.md + 04-context-and-openspec.md + the run log. 01-prerequisites-and-install.md drops out.

4. ADOPT-03, before repository writes
A human must approve at the gate: [HUMAN APPROVAL REQUIRED] before repository-local writes. Under 00-conventions.md that approval covers only that named mutation — it does not extend to a later step, a broader command, or a repeat run — and an agent may never self-approve on its own reasoning or confidence.

Also required before writing: ADOPT-02 = PASS (the step's precondition), the <SPECBOOT_SOURCE> path verified, and the copy performed as cp -rn so nothing existing is overwritten. Two expectations must be set before the write, not discovered after it: * does not match dot-prefixed names, so .claude/, .kiro/, and other hidden client directories are deliberately not copied; and the client permission file is not this step's job — ADOPT-05B provisions it, and the step says explicitly "do not hand-write one here."

5. ADOPT-07 evidence
Named by the step's Evidence to record field: prompt used, config path, OpenSpec version, rules, operations, warnings, corrections, result. ("Operations" corresponds to the apply/archive guidance configured only when the installed version supports it.)

Where: the ADOPT-07 evidence block in your filled copy of ADOPTION-RUN-LOG.template.md — whose fields match one-for-one — filled as you go, not at the end. Also update that step's row in the step-state table (PASS only when the evidence block is filled), and add rows to the decision record / correction record if the step produced an interactive decision or a failed attempt. ADOPT-07's validation is the prompt's own validation list run to completion with zero warnings.

6. Synthetic — ADOPT-08: no output plus "command not found"
Classification: FAIL. Not a clean result and emphatically not "zero warnings." Both 00-conventions.md ("An unexecuted or failed command is FAIL. It is never an inferred PASS from empty output") and the troubleshooting entry ("No output here means no run") make reading this as a pass the exact prohibited inference.

Recovery is documented — Form B, via ADOPT-08's On failure, which names the specific entry "OpenSpec command not found" in 22-troubleshooting.md for the case where the executable does not resolve. (The same field names two other entries — "OpenSpec key unsupported by installed version" and "YAML fails because a rule contains :" — for the different case where the command runs but the configuration is wrong. Those do not apply here.)

Recovery sequence:

Record it as FAIL: exact command, exit code (typically 127), and literally Warnings: not determinable — command did not execute.
Diagnose read-only, mutating nothing: command -v openspec, npm prefix -g, echo "$PATH". Compare the npm global prefix's bin against PATH; re-run with an absolute executable path in case an alias or function is shadowing the real tool. Inspection is not correction — diagnose fully before concluding the tool is absent.
Report the integrity finding: ADOPT-08 presupposes ADOPT-07 = PASS, which presupposes a resolving OpenSpec. So either the earlier evidence was inferred rather than observed, or the environment changed. Report it; do not smooth it over.
Return to ADOPT-02, which owns installation and client selection. Do not repair installation from inside ADOPT-08 — that step is read-only and must not correct failures it finds.
Obtain renewed [HUMAN APPROVAL REQUIRED] before any reinstall or environment mutation. ADOPT-02's original approval covered that execution only; it does not carry forward to a reinstall or a PATH edit.
Rerun ADOPT-08 in full — every check, not just the failed command — and require it to pass on its own evidence.
Log the whole sequence in the correction record, keeping the step FAIL in the step-state table until a complete rerun passes.
7. Synthetic — ADOPT-01 reports Node.js 18.4.0
Outcome: FAIL. The requirement is >= 20.19.0 (reference experiment v24.18.0); 18.4.0 is below the floor.

Recovery documented: yes — Form A, inline in the step. ADOPT-01's On failure says recovery is inline and that its table "is the documented recovery for these failures, not an absence of one." The matching row: Node.js missing or below 20.19.0 → Install a supported version from the official source or an approved version manager.

Source: the Failure/Recovery table inside ADOPT-01 in 01-prerequisites-and-install.md. No escalation, and no trip to 22-troubleshooting.md.

Constraints: installing or upgrading is gated — [HUMAN APPROVAL REQUIRED] before installing or upgrading software — so stop and state what will change. Afterward rerun ADOPT-01's whole validation (all three executables on PATH, all version commands returning without error, repository toolchain identified from project evidence), not merely node --version. Record the failed attempt and recovery, not just the passing end state.

8. Synthetic — ADOPT-16 missing generated members after skipped recompilation
Outcome: FAIL — and specifically a false baseline, not a source defect: source may be correct while previously generated output is stale and silently missing generated members.

Recovery documented: yes — Form A, inline, via the named inline guidance block "Stale build output can invalidate the baseline" in ADOPT-16. The step is explicit that this "is the documented recovery for this failure — it is not an undocumented failure, and it does not route to 22-troubleshooting.md, which carries no entry for a stale-output baseline." I confirmed that absence by reading the troubleshooting file.

Recovery: work through that guidance before assuming a source defect. Prefer a clean rebuild where the build tool supports one. If cleanup is blocked and removing generated output is genuinely required for a trustworthy baseline, obtain explicit approval — [HUMAN APPROVAL REQUIRED] before removing or relocating generated build output — and prefer moving the generated output to a recoverable location over deleting it, then retry. The reference Java/Maven chain (stale target/classes, clean blocked by a missing offline maven-clean-plugin, target/ moved recoverably, then 8 tests passing) is evidence, not a command to copy.

Source: the named inline guidance section within ADOPT-16 in 07-baseline-and-checkpoint.md.

Evidence obligation is unusually strict here: record every failed attempt with its diagnosis and recovery — "a baseline that passed on the third try is different evidence from one that passed immediately."

9. Synthetic — ADOPT-10 finds an agent scoped too narrowly
Outcome: FAIL — the PASS criterion "Description matches the intended technology family or work type" is not met.

Recovery documented: yes — Form C, an owning step. ADOPT-10's On failure: return to ADOPT-09 and correct there, then rerun ADOPT-10 in full. The step states outright: "That is the documented recovery — it is not an undocumented failure." This matters because ADOPT-10 is read-only; fixing in place would violate its own contract.

The substance of the fix arrives one documented hop further, from ADOPT-09's own On failure (Form B): the entry "Agent overwrites another stack, or a new agent is too narrow" in 22-troubleshooting.md — restore the original agent; for an overly narrow agent, restore any OpenSpec selection that referenced it, then only after explicit human approval remove it and create the replacement scoped to the technology family, reading framework-specific detail from docs/ at task time, and validate it before updating OpenSpec selection. ADOPT-09 independently gates this: [HUMAN APPROVAL REQUIRED] before removing or replacing an existing agent.

Sources: ADOPT-10's On failure in 05-agents-and-skills.md (Form C) → ADOPT-09's On failure in the same file → the named troubleshooting entry.

10. Synthetic — ADOPT-14 finds an adapter for an unselected client
Outcome: FAIL — the PASS criterion "No adapters for unselected clients" is violated. It also breaches a standing scope boundary from 00-conventions.md: "Never create adapters or configuration for a client the repository did not explicitly select."

Recovery documented: yes — Form C, an owning step. ADOPT-14's On failure: return to ADOPT-13, correct only the unintended entries after approval, then rerun ADOPT-14 in full — again labelled "the documented recovery — it is not an undocumented failure." ADOPT-14 is read-only, so the removal belongs in ADOPT-13.

Substance again one documented hop on, from ADOPT-13's On failure (Form B): the entry "Adapter created for an unselected client" in 22-troubleshooting.md — remove only the unintended adapter after review, then rerun client detection. Note the deletion needs its own approval: ADOPT-13's gate covers creating symlinks and modifying client directories, and approval covers the named mutation only, so the original create-approval does not authorize this removal.

Sources: ADOPT-14's On failure in 06-adapters-and-discovery.md (Form C) → ADOPT-13's On failure in the same file → the named troubleshooting entry.

11. Synthetic — ADOPT-15 failure covered by nothing
Outcome: FAIL, and — uniquely among 7–11 — no documented recovery exists. For the record, ADOPT-15's On failure does point somewhere: "Filesystem validation passes but runtime discovery fails." The premise here is that neither that entry nor any inline table, named guidance block, or owning step covers the actual failure, so all three forms are exhausted.

This is the escalation path, and it is itself documented:

Stop. Do not improvise a fix into the guide.
Ask your AI client or the guide's maintainer.
Write your diagnosis down as a follow-up candidate.
Let it be added to 22-troubleshooting.md later, through the normal change workflow — "one reviewed entry at a time, not by editing it mid-adoption."
Do not edit the troubleshooting file during the adoption.
Sources — two, agreeing: the "When something fails" plain-language section of SPECBOOT_ADOPTION_GUIDE.md (reinforced by its "What do I do on failure?" table row: "escalate only when none of them applies"), and "Where On failure may lead" in 00-conventions.md — "escalation is for when none of the three forms resolves to something applicable," and "A pointer that names no destination, or names one that does not cover the failure, is a defect — report it rather than improvising a fix."

So under this premise there are two things to report: the failure itself, and the defective pointer. Also note what does not count as failure here: per ADOPT-15's interpretation rules, normal manual reading of repository evidence during task execution is expected behavior, and front-loading documentation into the prompt to force a PASS is itself the prohibited manual injection.

12. ADOPT-08's Action structure
Form 3 of the four permitted forms: shell commands that establish or version-gate the prompt's preconditions, followed by exactly one labeled canonical prompt.

Concretely: openspec --version, openspec --help, openspec doctor, then the single CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS.

Why: 00-conventions.md names ADOPT-08 as form 3's own example — "the commands determine what the prompt may even ask for… because the prompt must use only validation commands that version exposes." The order is causal, not cosmetic: the installed version's surface is unknown until inspected, and the prompt would otherwise be free to invoke a command the version does not expose — which under this guide's evidence discipline produces a FAIL (an unexecuted command), not a graceful degradation. The prompt itself restates the constraint internally ("First inspect the installed OpenSpec version and its supported commands. Use only validation commands exposed by that version"), so the gate holds even if the operator skims. Consistently, the step is read-only, its Approval gate is none, and it "must not correct failures it finds" — corrections belong to ADOPT-07.

13. ADOPT-05B's Action structure
Form 4: a structured written procedure — five ordered steps plus a Rules block:

Provision the permission file (initialize the client's project-local structure; locate the approved generic baseline and record its origin; copy if no target exists, merge — never overwrite if one does)
Declare the supported-environment matrix (clients, stacks, shells, operating systems — the team's, not this machine's)
Reconcile the copy against that matrix (remove out-of-matrix entries; retain macOS/Linux/Windows variants any supported environment needs even if unused on the adopting machine; add only what the real project needs)
Verify safety, then syntax (no credentials, personal absolute paths, machine-specific dependency locations, or unsafe broad patterns; then JSON/YAML parse)
Keep the generic source baseline unchanged
Why: 00-conventions.md names ADOPT-05B as form 4's own example — used "where the work is provisioning and judgement rather than a command to run or a prompt to issue: ADOPT-05B locates a baseline, copies or merges it, declares a support matrix, and reconciles against it." None of that is mechanizable. Copy-versus-merge depends on what already exists and encodes decisions someone previously made; the matrix is a declaration about the team; reconciliation is a judgement each removal must justify. Step 3's retain rule shows why prose is required — the failure it prevents (stripping a Windows variant because the adopting machine is a Mac) surfaces on a teammate's machine much later, as an unexplained permission prompt far from this step.

One structural detail worth noting: ADOPT-05B does carry a labeled canonical prompt — the read-only smoke test — but it sits in Validation, not in Action. So both absolutes hold: never more than one labeled prompt in a step, and the Action stays a pure form 4. Its verdict rule is likewise judgement-bearing: an unavailable supported combination is PENDING EVIDENCE, never PASS, and never quietly omitted.

Ordered file list — every file opened
#	File	Why it was opened
1	SPECBOOT_ADOPTION_GUIDE.md	Entry file, as instructed
2	specboot-adoption/00-conventions.md	Entry file, "If you are a person" step 1 / working-set item 1
3	specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md	Entry step 2 / working-set item 3; needed for Q3, Q5
4	specboot-adoption/01-prerequisites-and-install.md	Entry step 3 — start at ADOPT-01; Q1, Q4, Q7
5	specboot-adoption/02-codegraph.md	Entry table "Which path applies to me?" → the decision node; also ADOPT-01's own CodeGraph pointer; Q2
6	specboot-adoption/03-client-permissions.md	Step index for ADOPT-05B, and the Next: pointers from files 4 and 5; Q13
7	specboot-adoption/04-context-and-openspec.md	Next: from file 6; step index for ADOPT-07/ADOPT-08; Q3, Q5, Q6, Q12
8	specboot-adoption/05-agents-and-skills.md	Next: from file 7; step index for ADOPT-09/ADOPT-10; Q9
9	specboot-adoption/06-adapters-and-discovery.md	Next: from file 8; step index for ADOPT-14/ADOPT-15; Q10, Q11
10	specboot-adoption/07-baseline-and-checkpoint.md	Next: from file 9; step index for ADOPT-16; Q8
11	specboot-adoption/22-troubleshooting.md	On failure pointers from ADOPT-08, ADOPT-09, ADOPT-13, ADOPT-15 — the documented path
Deliberately not opened: specboot-adoption/history/ (both files), 08-daily-workflow.md, 19-permissions-policy.md, any OpenSpec artifact or tasks.md, git diffs, and all prior acceptance evidence. Every file above was reached through the entry file's step index/tables or a pointer inside a file already open — no reading ahead "to get oriented."

One scope note, stated plainly: answering questions spanning ADOPT-01–ADOPT-16 required reading more than the three-file per-step working set. That is this acceptance test's reading, not step execution; each opening was pointer-justified above. Executing any single step would use exactly three files.

Confirmation
No command was executed. Every file was read with the read tool; no shell ran, including for reading. I deviated from this session's auto-mode preference for cat/grep precisely so this claim would hold literally.
No file was modified. No write, no edit, no file created — including in the scratchpad.
No adoption step was performed, no approval gate was crossed, and no run log was filled.
Two observations from the pass
The failure-path taxonomy is internally consistent. I tested five failure scenarios against it and each resolved as the contract predicts: Form A inline (ADOPT-01 table, ADOPT-16 named guidance), Form B named entry (ADOPT-08), Form C owning step (ADOPT-10, ADOPT-14), and escalation only under Q11's premise. Notably, ADOPT-16 claims 22-troubleshooting.md "carries no entry for a stale-output baseline" — I verified that negative claim by reading the file, and it holds. The read-only steps (ADOPT-08, ADOPT-10, ADOPT-14) all route corrections to a mutating owner rather than fixing in place, which keeps "read-only" true rather than aspirational.

One minor stale reference. The troubleshooting entry "Read-only commands repeatedly request permission" — the entry ADOPT-05B's On failure points to — says "Configure the Section 5 permission files early." Section 5 is retired numbering; the live target is ADOPT-05B in 03-client-permissions.md. It is resolvable via the permanent section-number map (§5 permissions subsection → ADOPT-05B), so it is not a broken pointer, but it is the one place where a live recovery instruction speaks in the old numbering rather than a step ID. Worth a follow-up candidate; I made no edit.
<!-- END VERBATIM ATTEMPT-3 TRANSCRIPT -->
