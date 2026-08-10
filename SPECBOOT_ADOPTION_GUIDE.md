# SpecBoot Adoption Guide

**Scope:** Reusable procedure for adopting SpecBoot, OpenSpec, and CodeGraph in an existing company brownfield repository.

**Purpose:** Provide a reproducible, evidence-driven path from an existing repository to a spec-driven AI workflow. This document is the entry point; the procedure itself lives in [`specboot-adoption/`](specboot-adoption/), one file per phase.

**Reference status:** Reconstructed from the verified prompts and outcomes of the reference adoption. A clean installation must be performed to validate and refine every step.

**Status of the daily workflow:** `PENDING END-TO-END VALIDATION`

---

## How to use this guide

### If you are a person

0. New to SpecBoot adoption? Read **[How this works, in plain language](#how-this-works-in-plain-language)** below first — it explains where you start, how you resume, what evidence is, who approves what, and what to do when a step fails, without assuming you know any of this guide's terms.
1. Read [`specboot-adoption/00-conventions.md`](specboot-adoption/00-conventions.md) once. It defines the step contract, approval-gate semantics, and evidence discipline that every step assumes.
2. Copy [`specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md`](specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md) and keep it open. Fill it as you go, not at the end.
3. Work through the phase files in order, starting at [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md).
4. Stop at every `[HUMAN APPROVAL REQUIRED]` marker.

### If you are an AI agent

- **Your working set for one step is exactly three files**, all of them working files — loading any of them is correct, never a boundary violation:
  1. [`00-conventions.md`](specboot-adoption/00-conventions.md);
  2. the single phase file containing the current step;
  3. your filled copy of [`ADOPTION-RUN-LOG.template.md`](specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md).

  The run log belongs in the set because every step has an `Evidence to record` field — writing it is part of executing the step. **Do not load the whole guide.** Unrelated phase files, `history/`, the support files, and the canonical workflow sources stay out unless the current step's documented path sends you there (for example an `On failure` pointer). See [the bounded per-step working set](specboot-adoption/00-conventions.md) for the full rule.
- **Never self-approve an `[HUMAN APPROVAL REQUIRED]` gate.** Your own reasoning is not approval. Stop, state exactly what will change, and wait for the human.
- **Record evidence after each step**, into the run log, before moving on.
- **An unexecuted or failed command is FAIL** — never an inferred PASS from empty output.
- **Never execute a prompt from [`history/prompt-inventory.md`](specboot-adoption/history/prompt-inventory.md).** It is a historical record. Each live step carries exactly one canonical prompt in its own phase file.

### How this works, in plain language

If you have never run a SpecBoot adoption, read this section first. It answers the six
questions operators actually ask, before any file reference matters.

**Where you begin.** At `ADOPT-01`, in a repository that already exists and may have **no AI
tooling installed at all**. That is the normal starting point: adoption is what installs and
configures it. You do not need anything set up beforehand beyond the repository itself and
permission to work on it.

**How you move through it.** Step by step, in order. Each step must finish and be recorded
before the next begins. Under the methodology this guide currently documents, **CodeGraph is the
only optional branch**: if your project is not adopting it, you skip `ADOPT-04` and `ADOPT-05`
entirely — and `ADOPT-05B`, which configures your AI client's permissions, is **still mandatory
and still follows**. Nothing else is optional.

**Stopping and picking up again.** These are two different situations.

- *Planned pause* — finish the step you are on, record its evidence, then stop. You resume at
  the next step.
- *Unexpected interruption* — crash, closed laptop, someone else took over. **Never assume a
  step finished just because it looks like it ran.** Go back to the first step without complete
  PASS evidence, look at what it partially changed, and run its validation again from the start.
  A step with an empty evidence block is "not known to have completed" — never "completed but
  unrecorded".

**What "evidence" means.** It is the written record of what you actually did: the commands you
ran, whether each succeeded or failed (the exit status), the output that mattered, which files
changed, which approvals were asked for and given, what each validation returned, and any failed
attempt with how you recovered. You write it into your copy of the run log as you go. The point
is that **someone else — another person or an AI agent — can open your run log, see exactly what
happened, verify it, and continue the adoption from where you stopped.** "It worked" is not
evidence.

**Who approves what.** Some steps change things that need a human decision first. They are
marked `[HUMAN APPROVAL REQUIRED]`.

- An **AI agent can never approve its own change.** It must stop and ask.
- If **you are the human operator and you have the authority** to approve that change, you
  approve it yourself and write down that you did.
- If **you do not have that authority**, you get approval from the repository's designated owner
  or approver before continuing.
- Approval covers **only the specific change named at that gate** — not the next step, not a
  broader command, not a repeat run later. Record it either way.

**When something fails.** Mark the step FAIL and write down the exact command and the exact
error. Then follow that step's `On failure` field. It leads to the recovery in one of three
ways, and **all three are documented recoveries**:

- **In the step itself** — a `Failure` / `Recovery` table, or a named guidance block the field
  points to by name. The recovery is right there; you do not go looking elsewhere.
- **In [`22-troubleshooting.md`](specboot-adoption/22-troubleshooting.md)** — the field names
  the specific entry to read.
- **In another step** — the field names the `ADOPT-nn` that owns what broke. Go back, fix it
  there, then rerun the step you were on in full.

Only continue once you have actually recovered and the step's full validation passes — not the
one command that failed, the whole validation.

If **none of those three leads to something that applies** — the failure is not documented
anywhere — stop. Do not improvise a fix into the guide. Ask
your AI client or the guide's maintainer, write your diagnosis down as a follow-up candidate,
and let it be added to the troubleshooting file later through the normal change workflow. The
troubleshooting file grows that way deliberately — one reviewed entry at a time, not by editing
it mid-adoption.

---

### Where to start, resume, and record

| Question | Answer |
|---|---|
| Where do I start? | `ADOPT-01` in [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md) |
| Which path applies to me? | The only branch is CodeGraph — see the decision node at the top of [`02-codegraph.md`](specboot-adoption/02-codegraph.md). Everything else is unconditional. |
| How do I resume a partial adoption? | Read the step-state table in your filled run log; it names the next `ADOPT-nn` and its file. |
| Where do I record evidence? | The evidence block for that step in your filled copy of [`ADOPTION-RUN-LOG.template.md`](specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md). Each step's `Evidence to record` field names its fields. |
| When is human approval required? | At any step whose `Approval gate` field is not `none`. Gates are written as the literal marker `[HUMAN APPROVAL REQUIRED]`, in the step's field and again at the point of mutation. The semantics are in [`00-conventions.md`](specboot-adoption/00-conventions.md); the individual gates live in the phase files, deliberately not duplicated here. |
| What do I do on failure? | Mark it FAIL, then follow that step's `On failure` field. It resolves in one of three ways — inline in the step, a named entry in [`22-troubleshooting.md`](specboot-adoption/22-troubleshooting.md), or the `ADOPT-nn` that owns what broke. All three are documented recoveries; escalate only when none of them applies. An unexecuted or failed command is FAIL. |

---

## Happy Path 1 — One-Time Repository Adoption

```text
existing brownfield repository
→ install prerequisites
→ initialize OpenSpec with explicitly selected clients
→ import SpecBoot
→ initialize CodeGraph (conditional — skip entirely if CodeGraph is not being adopted)
→ configure CodeGraph for selected clients (conditional — same CodeGraph decision as above)
→ configure selected-client permissions (not conditional — always mandatory)
→ adapt repository technical context
→ configure and verify OpenSpec
→ inspect, adapt, and validate agents
→ inspect, adapt, and validate skills
→ create and validate client adapters
→ validate fresh-session runtime discovery
→ run project baseline
→ review and create a clean local checkpoint
```

Approval boundaries are marked **[HUMAN APPROVAL REQUIRED]** in the phase files.

---

## Happy Path 2 — Daily Request-to-PR-Ready Workflow

`PENDING END-TO-END VALIDATION`

Six required workflow capabilities, in order: `enrich-us`, propose, apply, `specboot-verify`, independent `adversarial-review`, archive. This is **not** part of the one-time adoption. See [`08-daily-workflow.md`](specboot-adoption/08-daily-workflow.md) for the sequence, the blocking rules, and pointers to the canonical sources.

```text
developer request
→ enrich-us (mandatory pre-proposal refinement gate; READY FOR PROPOSAL required, NEEDS CLARIFICATION blocks proceeding)
→ propose (create OpenSpec change artifacts: proposal / specifications / design / tasks, from the enriched artifact)
→ apply (implement tasks one by one)
→ tests
→ specboot-verify (PASS or PASS WITH GAPS required; makes the change eligible for independent adversarial-review only, never archive approval by itself)
→ independent adversarial-review (ideally a different session/client than implementation; PASS or PASS WITH GAPS required)
→ affected documentation and canonical-spec synchronization
→ archive (requires both gates' PASS/PASS WITH GAPS plus explicit human approval)
→ commit message and pull-request content prepared
→ STOP before push or pull-request creation
→ human approval
→ authorized remote operation according to company policy
```

---

## Step index

| Step | Title | File | Condition |
|---|---|---|---|
| `ADOPT-01` | Install Prerequisites | [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md) | always |
| `ADOPT-02` | Install and Initialize OpenSpec with Explicitly Selected Clients | [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md) | always |
| `ADOPT-03` | Import SpecBoot | [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md) | always |
| `ADOPT-04` | Initialize CodeGraph | [`02-codegraph.md`](specboot-adoption/02-codegraph.md) | CodeGraph adopted |
| `ADOPT-05` | Configure CodeGraph for the Selected Clients | [`02-codegraph.md`](specboot-adoption/02-codegraph.md) | CodeGraph adopted |
| `ADOPT-05B` | Configure Selected-Client Permissions (Early, One-Time) | [`03-client-permissions.md`](specboot-adoption/03-client-permissions.md) | **always — never skipped with CodeGraph** |
| `ADOPT-06` | Adapt the Repository Technical Context | [`04-context-and-openspec.md`](specboot-adoption/04-context-and-openspec.md) | always |
| `ADOPT-07` | Configure OpenSpec to Consume `docs/` and `ai-specs/` | [`04-context-and-openspec.md`](specboot-adoption/04-context-and-openspec.md) | always |
| `ADOPT-08` | Verify OpenSpec Configuration | [`04-context-and-openspec.md`](specboot-adoption/04-context-and-openspec.md) | always |
| `ADOPT-09` | Inspect and Adapt Agents | [`05-agents-and-skills.md`](specboot-adoption/05-agents-and-skills.md) | always |
| `ADOPT-10` | Validate Agents | [`05-agents-and-skills.md`](specboot-adoption/05-agents-and-skills.md) | always |
| `ADOPT-11` | Inspect and Adapt Skills | [`05-agents-and-skills.md`](specboot-adoption/05-agents-and-skills.md) | always |
| `ADOPT-12` | Validate Skills | [`05-agents-and-skills.md`](specboot-adoption/05-agents-and-skills.md) | always |
| `ADOPT-13` | Create Selected-Client Adapters | [`06-adapters-and-discovery.md`](specboot-adoption/06-adapters-and-discovery.md) | always |
| `ADOPT-14` | Validate Adapter Files, Symlinks, and Generated Directories | [`06-adapters-and-discovery.md`](specboot-adoption/06-adapters-and-discovery.md) | always |
| `ADOPT-15` | Validate Runtime Discovery in a Fresh Client Session | [`06-adapters-and-discovery.md`](specboot-adoption/06-adapters-and-discovery.md) | always, once per client |
| `ADOPT-16` | Run the Project Baseline | [`07-baseline-and-checkpoint.md`](specboot-adoption/07-baseline-and-checkpoint.md) | always |
| `ADOPT-17` | Review and Create a Clean Local Checkpoint | [`07-baseline-and-checkpoint.md`](specboot-adoption/07-baseline-and-checkpoint.md) | always |

Supporting material, not executed in sequence:

| File | Contents |
|---|---|
| [`00-conventions.md`](specboot-adoption/00-conventions.md) | Prompt labels, step contract, approval semantics, evidence discipline, shell portability, availability-vs-provenance |
| [`08-daily-workflow.md`](specboot-adoption/08-daily-workflow.md) | The six-capability daily workflow — sequence, blocking rules, canonical-source pointers |
| [`19-permissions-policy.md`](specboot-adoption/19-permissions-policy.md) | Ongoing permission policy and reference material |
| [`22-troubleshooting.md`](specboot-adoption/22-troubleshooting.md) | Symptom → cause → recovery for every recorded failure mode |
| [`history/prompt-inventory.md`](specboot-adoption/history/prompt-inventory.md) | Prompt inventory and every `VERIFIED VERBATIM` historical prompt — never executed |
| [`history/reference-run-java-maven.md`](specboot-adoption/history/reference-run-java-maven.md) | Reference-run outcomes and the validation status table — evidence, never inherited |
| [`run-template/ADOPTION-RUN-LOG.template.md`](specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md) | Per-run evidence capture and the resume checklist |

---

## Section-number map (back-compatibility)

This guide previously numbered its content as sections 1–22 in a single file. External
references may still cite those numbers. The mapping is permanent:

| Former § | Step ID | File |
|---|---|---|
| §1 | `ADOPT-01` | `specboot-adoption/01-prerequisites-and-install.md` |
| §2 | `ADOPT-02` | `specboot-adoption/01-prerequisites-and-install.md` |
| §3 | `ADOPT-03` | `specboot-adoption/01-prerequisites-and-install.md` |
| §4 | `ADOPT-04` | `specboot-adoption/02-codegraph.md` |
| §5 (CodeGraph client config) | `ADOPT-05` | `specboot-adoption/02-codegraph.md` |
| §5 (permissions subsection) | `ADOPT-05B` | `specboot-adoption/03-client-permissions.md` |
| §6 | `ADOPT-06` | `specboot-adoption/04-context-and-openspec.md` |
| §7 | `ADOPT-07` | `specboot-adoption/04-context-and-openspec.md` |
| §8 | `ADOPT-08` | `specboot-adoption/04-context-and-openspec.md` |
| §9 | `ADOPT-09` | `specboot-adoption/05-agents-and-skills.md` |
| §10 | `ADOPT-10` | `specboot-adoption/05-agents-and-skills.md` |
| §11 | `ADOPT-11` | `specboot-adoption/05-agents-and-skills.md` |
| §12 | `ADOPT-12` | `specboot-adoption/05-agents-and-skills.md` |
| §13 | `ADOPT-13` | `specboot-adoption/06-adapters-and-discovery.md` |
| §14 | `ADOPT-14` | `specboot-adoption/06-adapters-and-discovery.md` |
| §15 | `ADOPT-15` | `specboot-adoption/06-adapters-and-discovery.md` |
| §16 | `ADOPT-16` | `specboot-adoption/07-baseline-and-checkpoint.md` |
| §17 | `ADOPT-17` | `specboot-adoption/07-baseline-and-checkpoint.md` |
| §18 | — | `specboot-adoption/08-daily-workflow.md` |
| §19 | — | `specboot-adoption/19-permissions-policy.md` |
| §20 | — | `specboot-adoption/history/prompt-inventory.md` |
| §21 | — | `specboot-adoption/history/reference-run-java-maven.md` |
| §22 | — | `specboot-adoption/22-troubleshooting.md` |

---

## Clean-Install Working Method

For the clean validation run:

1. Create this guide and the logs before installing anything.
2. Save each prompt before submitting it.
3. Save each command before executing it.
4. Record every interactive decision immediately.
5. Record every permission prompt.
6. Record PASS, FAIL, and RECOVERY separately.
7. Do not let the AI rewrite this guide during installation.
8. Update the guide only after validating a step.
9. Preserve failed prompts in the runbook.
10. Replace a consolidated prompt only when live evidence proves a correction is needed.

Companion artifact:

Earlier revisions of this guide recommended five separate companion files
(`SPECBOOT_ADOPTION_RUNBOOK.md`, `SPECBOOT_PROMPT_LOG.md`, `SPECBOOT_COMMAND_LOG.md`,
`SPECBOOT_DECISION_LOG.md`, `specboot-terminal-session.log`). They are superseded by a
single structured artifact that covers the same ground and adds a resume checklist:

```text
specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md
```

Copy it per run. Its evidence blocks replace the runbook and prompt/command logs; its
decision and correction records replace the decision log. Optional terminal capture below
remains useful alongside it.

Optional terminal capture:

```bash
script -a specboot-terminal-session.log
```

---


## Final Acceptance Criteria

The guide is ready for company reuse only when:

- Every one-time adoption step has been executed in a clean repository.
- Exact commands and interactive decisions are recorded.
- Every AI-driven step has a validated prompt.
- Prompt corrections are incorporated into the consolidated prompt.
- Kiro and Claude discovery are independently verified when both are selected.
- The project baseline passes after adoption.
- A clean local checkpoint is created.
- The daily workflow completes the HttpErrorHandler pilot through PR-ready evidence.
- No remote mutation occurs without explicit approval.
- The guide and runbook are physically present, versioned, and reviewed.
