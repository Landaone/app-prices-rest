# Conventions

Cross-cutting rules that every step in this guide assumes. Read this file before any
phase file; each phase file repeats the pointer, not the content.

Entry point and step index: [`SPECBOOT_ADOPTION_GUIDE.md`](../SPECBOOT_ADOPTION_GUIDE.md).

---

## Prompt label conventions

| Label | Meaning |
|---|---|
| `HISTORICAL PROMPT — VERIFIED VERBATIM` | Exact prompt text recovered from the reference adoption and confirmed as executed. |
| `CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS` | Reusable prompt assembled from verified outcomes and observed correction chains. It was not necessarily executed as one historical block. |
| `CANONICAL REUSABLE PROMPT — PENDING END-TO-END VALIDATION` | Reusable prompt intended for the daily change workflow. It has not yet completed a full live cycle. |
| `LIVE VALIDATION REQUIRED` | The step is documented but must be re-run in a clean installation before being considered fully validated. |

Prompts without one of these labels are shell commands, human actions, or explanatory text.

**Historical prompts are not part of the execution path.** Every step in this guide
presents exactly one canonical prompt. Historical prompts are preserved for the record in
[`history/prompt-inventory.md`](history/prompt-inventory.md) and must never be executed as
a step. If a step appears to offer two prompts, the historical one is the one not to run.

---

## The bounded per-step working set

Executing one step uses exactly **three** files. All three are *working* files: opening any of
them is correct behaviour, never a boundary violation.

| File | Role |
|---|---|
| `00-conventions.md` | this file — the rules every step assumes |
| The single phase file containing the current step | that step's action, gate, validation, and failure path |
| Your filled copy of [`run-template/ADOPTION-RUN-LOG.template.md`](run-template/ADOPTION-RUN-LOG.template.md) | where the step's evidence is recorded |

The run log is in the set because writing it **is part of executing the step**, not separate
bookkeeping: every step carries an `Evidence to record` field, and evidence is filled as you go,
not at the end.

**What stays out.** Unrelated phase files, `history/`, the support files, and the canonical
workflow sources are not loaded to execute a step — *unless the current step's documented path
sends you there*. Following an `On failure` pointer into
[`22-troubleshooting.md`](22-troubleshooting.md), or a link a step's own text tells you to
follow, is that documented path and is expected. Reading ahead "to get oriented" is not.

This boundary is what keeps one step's cost to one phase file rather than the whole guide.

**The orchestrator skill is not a fourth file.** Where a `specboot-adopt` skill is executing this
guide, its body is part of the executing agent's context, not a member of the step's working set,
and its `references/` load **on demand only** — at the point of need, never at skill load time. The
three-file rule is unchanged: an orchestrated step still opens this file, one phase file, and the
run log.

---

## The step contract

Every executable step uses the same fields, in this order. An agent can parse them; a
human can skim them.

| Field | Meaning |
|---|---|
| **Condition** | `always`, or a testable predicate. A step whose predicate is false is skipped, and the skip is recorded. |
| **Purpose** | What the step establishes. |
| **Preconditions** | Step IDs that must be PASS before this step runs. |
| **Action** | One of four forms — see [What `Action` may hold](#what-action-may-hold) below. Never more than one labeled prompt; never a historical prompt. |
| **Approval gate** | `none`, or `[HUMAN APPROVAL REQUIRED]` before a named mutation. |
| **Validation** | Commands to run, and the explicit criteria that make the result PASS. |
| **Evidence to record** | The run-log fields this step fills. |
| **On failure** | Where the recovery is — see [Where `On failure` may lead](#where-on-failure-may-lead) below. |
| **Allowed modifications** | The exact paths this step may write to — see [Allowed modifications](#allowed-modifications) below. |

## What `Action` may hold

Exactly one of four forms. The form is a property of the step's work, not a style choice.

1. **Shell commands.** The step's work is running commands.
2. **Exactly one labeled canonical prompt.** The step's work is issued to an AI client.
3. **Shell commands that establish or version-gate the prompt's preconditions, followed by
   exactly one labeled canonical prompt.** Used where the commands determine what the prompt
   may even ask for — `ADOPT-08` inspects the installed OpenSpec version and its supported
   commands before the verification prompt runs, because the prompt must use only validation
   commands that version exposes.
4. **A structured written procedure.** Used where the work is provisioning and judgement
   rather than a command to run or a prompt to issue — `ADOPT-05B` locates a baseline, copies
   or merges it, declares a support matrix, and reconciles against it.

Two absolutes hold across all four: **never more than one labeled prompt in a step**, and
**never a historical prompt in a live `Action`**. A historical prompt is record, not
instruction; it lives in [`history/prompt-inventory.md`](history/prompt-inventory.md).

---

## Allowed modifications

Every step's `Allowed modifications` field is written by whoever maintains this guide, **before
any run exists to execute the step** — never derived, asserted, or widened by the orchestrator
while it executes. An executing run reads this field; it never writes it. This is what makes the
field trustworthy enough to gate an automatic approval later (see the checkpoint protocol's
standing-authorization clause below): the same execution that is being checked never gets to
grade its own allowlist.

The field takes one of two shapes, chosen by whether the step's output is deterministic:

- **Closed, exact path list** — for a step whose output paths are the same regardless of which
  repository is adopting (an installer command's fixed generated set, a pinned import, a fixed
  documentation-file target list). `ADOPT-00`'s per-client discovery recipes already have the
  right shape to model this on: each `bootstrap-kit/discovery/<client>.md`'s `## Entries` table is
  a closed, exact list, authored per client in advance of any run.
- **Closed rule, not a list** — for a step whose exact output path depends on content discovered
  in the adopting repository at run time (creating at most one new file matching a pattern,
  exposing an adapter selected from already-validated prior evidence). State the path glob, the
  cardinality bound, and explicit exclusions — never leave a conditional step's field as an
  open-ended pattern with no bound.

A checkpoint's exact staged file list is compared against the covered step's `Allowed
modifications` as part of the checkpoint protocol below. A staged path outside the declared
allowlist is never treated as a pending question — it is `FAIL_CLOSED`, reported by its exact
unexpected path, because an out-of-scope file in the stage is evidence something went wrong, not
a decision waiting on a human.

---

## Where `On failure` may lead

`On failure` must resolve to a recovery that **actually applies to that failure**, by exactly
one of three forms:

- **Form A — inline, in this same step.** Specifically identified applicable recovery
  instructions within the step itself: a `Failure` / `Recovery` table, or a **named** inline
  guidance section the `On failure` field points to by name.
- **Form B — a specifically named entry** in [`22-troubleshooting.md`](22-troubleshooting.md).
  Naming the file alone is not enough; the entry must be named and must cover the failure.
- **Form C — an explicitly identified owning step.** The step that owns the thing that broke,
  named by its `ADOPT-nn` ID, which you return to and then rerun this step in full.

**All three are documented recoveries.** A recovery given inline or by owning step is not
"undocumented" and does not trigger the escalation path — escalation is for when **none** of
the three forms resolves to something applicable.

Working inline or owning-step recovery is deliberately **not** copied into
`22-troubleshooting.md` to make the form uniform. That would duplicate live content and cause
the two copies to drift. Uniformity of form is not the goal; resolving to an applicable
recovery is.

A pointer that names no destination, or names one that does not cover the failure, is a
defect — report it rather than improvising a fix.

---

Step IDs (`ADOPT-01` … `ADOPT-17`) are stable identities, not positions. They do not change
if steps are inserted or reordered later. The entry file maps former section numbers to
step IDs and files.

---

## Approval gates

A gate marked **`[HUMAN APPROVAL REQUIRED]`** stops execution until a human approves the
specific mutation named in that gate.

- **Identification.** A gate is always written as the literal marker `[HUMAN APPROVAL
  REQUIRED]`, in the step's `Approval gate` field and again inline at the point of the
  mutation. Nothing else in this guide grants approval.
- **Location.** Gates live in the phase file of the step they guard. This file states the
  semantics; it deliberately does not list the individual gates, which would duplicate the
  phase files and drift from them.
- **Scope.** Approval covers the named mutation only. It does not extend to a later step, a
  broader command, or a repeat run.
- **An agent must never self-approve.** An agent's own reasoning, confidence, or a prior
  approval for a different mutation is not approval. Stop, present what will change, and
  wait for the human.

Roughly: installation and upgrade, repository-local writes, symlink or client-directory
changes, staging, and commit each sit behind a gate. The authoritative list is the set of
markers in the phase files, not this summary.

---

## Evidence discipline

**An unexecuted or failed command is FAIL. It is never an inferred PASS from empty
output.** Empty output means the command did not run, or ran and found nothing — those are
different results, and neither is evidence of success.

- Record the exact command, its exit code, and its output summary. "It looked fine" is not
  evidence.
- Permission to run a command does not establish that it ran, and running it does not
  establish that it passed. Check exit codes and reported results explicitly.
- When a shell alias or function could shadow a real tool, run the validation with absolute
  executable paths.
- Never claim a file exists until the filesystem confirms it. After any large write, verify
  physically — existence, line count, headings, tail — rather than trusting the writing
  tool's own success signal.
- **A count or enumeration presented at an approval gate is the literal, raw output of a
  mechanical command run against the actual source, never a recalled, estimated, or
  summarized figure.** Where a step's approval gate proposes copying, importing, or otherwise
  acting on a set of paths, run the enumeration command (for example `find <path> -type f |
  wc -l`, or the equivalent listing) **before** presenting that gate, and quote its output
  directly. A human approves what a command printed, not what an agent remembers counting —
  recalling a count from an earlier read is exactly how a plausible-looking number turns out
  wrong.
- Do not claim automatic discovery for a resource that was manually supplied or explicitly
  loaded after the session started.

Every step's `Evidence to record` field names the run-log fields it fills. Fill them as you
go, not at the end: see [`run-template/ADOPTION-RUN-LOG.template.md`](run-template/ADOPTION-RUN-LOG.template.md).

---

## Shell portability

Shell examples in this guide are illustrative, not universal. List expansion and word
splitting differ across shells: an unquoted, space-separated variable that a Bash loop
iterates item by item is a single unsplit word under zsh, so a loop written for one shell
can silently iterate once instead of once per item.

Derive loop syntax from the actual active shell. Prefer explicit per-item commands or a
shell-native array over a space-separated scalar loop. This failure mode has a recorded
recovery in [`22-troubleshooting.md`](22-troubleshooting.md).

Paths in this guide are repository-relative and POSIX-style. Native Windows shell
portability is documented but not yet validated.

---

## Capability availability is not installer provenance

A client's resources existing and resolving on disk shows only that the capability is
currently available. It is **not** evidence of which process provisioned it — the SpecBoot
npm installer, `openspec init`'s own client selection, `codegraph install`, or manual
configuration.

See `ai-specs/specboot-instructions.md`'s "Installer Scope: Claude/Cursor Provisioning Only
(Kiro Configured Separately)" note for the canonical statement. Where a step's run-log
fields ask for per-client provisioning provenance, record what actually provisioned each
client in this run — do not infer it from the files being present.

---

## Scope boundaries that hold across every step

- Modify only what the current step's `Action` names. A step that says it edits `docs/`
  does not edit source code, tests, OpenSpec configuration, agents, skills, or adapters.
- Never create adapters or configuration for a client the repository did not explicitly
  select.
- Remote mutation is **inside** this guide, under gates, and subject to company policy.
  Pushing a validated checkpoint to the current working branch is performed by
  [the checkpoint protocol](#the-checkpoint-protocol) below, behind its own
  `[HUMAN APPROVAL REQUIRED]` gate and preceded by a remote-impact assessment. Pull-request
  creation is gated separately by `ADOPT-20`. **Merge, force-push, branch creation beyond what a
  step names, and remote or credential configuration remain outside this guide entirely** and
  require their own explicit approval under company policy.
- External web, GitHub, or package-registry research requires explicit user authorization
  before it is performed.

---

## The checkpoint protocol

**This is the single normative definition of a checkpoint.** It lives here because this file is
already one of the three files in every step's working set — a protocol placed in a phase file
would sit outside the working set of every step in every other phase, so invoking it would either
force a fourth file open or invite each phase to restate it locally, which is how contracts drift.

Every step or justified group invokes **this** definition. No phase file restates it.

### What a checkpoint is

**A checkpoint is the smallest independently validated `ADOPT` step.** The default is one
checkpoint per step.

A phase file is **not** automatically a checkpoint. A phase file is a documentation boundary; a
checkpoint is a validation boundary. Treating them as the same thing batches independently
verifiable work into one reviewable unit and delays the evidence.

Dependent steps may be grouped into one checkpoint **only with an explicit written justification
recorded in the checkpoint ledger**, on structural grounds:

- the earlier step produces no independently observable end state (its only validation is the later
  step's); or
- the intermediate state is not reviewable, or not safe to leave in place; or
- this guide's own step contract makes them an executed pair — for example `ADOPT-09`/`ADOPT-10` and
  `ADOPT-11`/`ADOPT-12`, which [`05-agents-and-skills.md`](05-agents-and-skills.md) already
  describes as executed as a pair.

**"Fewer commits", "they are in the same file", and "it is faster" are not justifications.** A
tidier history is a preference, not a structural fact. Grouping is a recorded exception each time,
never a standing policy. An operator may ask for a group; the justification recorded must still be
the true reason, and if the true reason is history readability, that is what the ledger says — not
a fabricated claim that the steps could not be validated independently.

### When it applies

After **every** independently validated step or justified group — including checkpoints reached
long before `ADOPT-16`. The protocol's applicability does not depend on the precondition of any
single later step.

`ADOPT-17` is the final checkpoint **of the adoption itself** and carries its own precondition
(`ADOPT-16` = PASS). That is not the same as being the last checkpoint of the workflow:
`ADOPT-18` commits the updated bootstrap manifest and `ADOPT-19` is independently validated, so each
forms its own checkpoint under this protocol. `ADOPT-17`'s precondition is a precondition of
`ADOPT-17`, never of this protocol.

### The procedure, in order

1. **Validate.** Every step in the checkpoint reaches PASS on its own criteria.

2. **Declare ready for human review**, stating: the checkpoint id; the steps covered; validation
   results; evidence pointers; any open deviations; improvement proposals raised; and **the exact
   staged file list**. Never declare readiness while any step in the checkpoint is at FAIL or
   PENDING. A summary or a file count is not the exact list.

3. **Checkpoint approval.** **[HUMAN APPROVAL REQUIRED]**, unless the standing-authorization exception below applies, in which case the checkpoint auto-approves.

4. **Stage only the intended files.** Never `git add -A` or any unconditional stage-everything
   command. Apply the full `ADOPT-17` staged-scope checklist.

5. **Independent review of the staged diff.** After any correction, re-run a fresh independent
   review of the corrected staged diff. The reviewer that made the correction is not the last
   check.

6. **Commit.**

7. **Determine and report the remote impact.** Whether the push will trigger continuous
   integration, deployments, security scans, notifications, or any other automation — derived from
   real evidence (workflow and pipeline configuration, branch protection, webhooks, required
   checks), inspected read-only. **Never assumed.**

   Where the impact cannot be inspected or determined, it is **unknown**, and unknown or unapproved
   impact **blocks the push**. "No CI configuration found" is a finding to report, not a licence to
   push — automation can live in org-level rules, webhooks, mirrors, and platform integrations that
   leave no trace in the working tree. Do not request new credentials or elevated access to resolve
   an unknown; report it and stop.

8. **Push approval.** **[HUMAN APPROVAL REQUIRED]** — separate from step 3, unless the same standing-authorization exception applies to the push as well.

9. **Push** to the **current working branch** only, on the already-configured remote. Never a force
   push. Never a branch this guide did not name.

10. **Propose improvements** to this guide, the phase files, and
    [`22-troubleshooting.md`](22-troubleshooting.md) into the run log's improvement-proposals block.
    Never apply them during the run.

11. **Record the checkpoint ledger entry** and advance.

**Advancing is not a decision to present to the operator.** Once a checkpoint reaches PASS and its
ledger entry is recorded, proceed directly to the next step's `Action` — do not stop to ask
whether to continue. A stop between steps that is not backed by that next step's own named
`[HUMAN APPROVAL REQUIRED]` gate is not part of this contract. Where the next step does carry its
own gate (for example, `ADOPT-01`'s gate before installing or upgrading software), that gate is
presented when its own step's action reaches it — never earlier, and never disguised as a generic
"continue?" question preceding it.

### The two approvals are distinct

A commit approval is **not** a push approval. Neither carries forward to the next checkpoint. A
commit is local and cheap to undo; a push is outward-facing and may trigger automation that cannot
be recalled. Collapsing them would let a reviewer who assessed a diff implicitly authorize an
unassessed remote effect.

That the operator approved the content 30 seconds ago, and knows it is destined for the branch, is
not the push approval. Ask.

### Standing authorization — when a gate auto-approves instead of asking

A checkpoint's commit gate, its push gate, or both, auto-approve **only** when every one of these
holds:

- the checkpoint's exact staged file list is a subset of its step's declared `Allowed
  modifications` (see [Allowed modifications](#allowed-modifications) above);
- `ADOPTION-AUTHORIZATION.md` — one file per adoption run, authored by the human at or near the
  start of the run, never one file per `ADOPT` step — records a standing authorization covering
  this checkpoint's class;
- for a push specifically: the push is fast-forward, and the remote-impact assessment is
  unchanged from the `ADOPT-00` baseline (no new CI, ruleset, webhook, branch protection, force
  push, pull request, deployment, or destructive Git operation).

Where all of these hold, the gate auto-approves, and the auto-approval is recorded as evidence —
including an explicit `Allowlist match: YES` result in the checkpoint ledger — exactly as a live
approval is recorded, never presented as though a human reviewed it in the moment. **Any staged
path outside the step's declared `Allowed modifications` is never a question**: it is
`FAIL_CLOSED`, reported by its exact unexpected path, and blocks the checkpoint until resolved —
an unexpected path is evidence something went wrong, not a decision pending a human.

A single `ADOPTION-AUTHORIZATION.md` per run — never a file per step — is what keeps this
mechanism from becoming a second canonical source: the per-step allowlist already lives in the
canonical phase file, which this file only ever reads against, never restates.

### Applies forward

Bringing push inside the contract binds adoptions **started after this amendment lands**.
Repositories adopted under the previous contract, which stated "Do not push. Remote mutation is
outside this guide entirely.", were **correct to stop at commit**. They are recorded as
pre-amendment and are never retroactively marked FAIL.

The same rule governs the mandatory code-graph capability in
[`02-codegraph.md`](02-codegraph.md): a repository adopted before that amendment may have skipped
CodeGraph entirely, and is recorded as pre-amendment rather than retroactively failed.

### Ledger evidence, per checkpoint

id; the step or the justified group with its written justification; validation results; evidence
pointers; the ready-for-review declaration; the approval (who, when, what was approved); the exact
staged file list; the commit SHA; the remote-impact assessment and its verdict; push status; and
the improvement proposals raised.
