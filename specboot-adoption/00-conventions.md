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
- Remote mutation — push, pull-request creation, merge — is outside this guide entirely and
  requires its own explicit approval under company policy.
- External web, GitHub, or package-registry research requires explicit user authorization
  before it is performed.
