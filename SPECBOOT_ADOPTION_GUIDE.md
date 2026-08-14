# SpecBoot Adoption Guide

**Scope:** Reusable procedure for adopting SpecBoot, OpenSpec, and CodeGraph in an existing company brownfield repository.

**Purpose:** Provide a reproducible, evidence-driven path from an existing repository to a spec-driven AI workflow. This document is the entry point; the procedure itself lives in [`specboot-adoption/`](specboot-adoption/), one file per phase.

**Reference status:** Reconstructed from the verified prompts and outcomes of the reference adoption. A clean installation must be performed to validate and refine every step.

**Status of the daily workflow:** `PENDING END-TO-END VALIDATION`

---

## How to use this guide

### If you are a person

0. **Starting an adoption?** Use [`specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`](specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md) — the single canonical entry prompt. Paste it, as ordinary prompt text, into a session opened on the target repository. It asks for the canonical source and the client selection at run time; you do not edit it and you do not need any tooling installed first.
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

**How the contract reaches your project: source-linked delivery.** Canonical SpecBoot lives in its
own source, supplied to an adoption at run time. `ADOPT-00` asks for it and validates it **before
writing anything**. There is one mode, and a validated source is a **precondition of the run, not a
branch within it**:

| Condition | What happens |
|---|---|
| you supply a local canonical SpecBoot source and it validates | **source-linked** — **nothing canonical is copied**: no guide, no phase files, no skill body, and no `.specboot/bootstrap/`. Your project gets durable adoption state plus temporary discovery entries pointing at the external source |
| you supply none, or the one you supply fails validation | the run **stops and writes nothing**. There is no fallback that copies SpecBoot into your project |

**Why refusing beats falling back.** A packaged-snapshot delivery — copying a transient payload in
when no source is available — is planned as separate future work
(`add-specboot-packaged-snapshot-delivery`) and is deliberately **not** offered here. A mode that
has never been driven from an empty repository through to a working, discoverable skill is not a
safety net: it is a path that fails *after* writing to your project, which is the one failure shape
`ADOPT-00`'s preflight exists to prevent.

**Five ways `ADOPT-00` stops before touching your repository.** Each one leaves your project
**byte-for-byte unchanged** — nothing to undo, because nothing was created:

| Stops when | It tells you |
|---|---|
| you supplied no canonical source | that one is required, and the three artifacts it must contain |
| the source you supplied is incomplete | which artifact is missing or unreadable |
| you named no client | that an explicit choice is required — it never guesses from a `.claude/` or `.kiro/` directory it happens to find |
| you named a client it has no recipe for | which client, and which ones it does support |
| your environment cannot create symlinks and the client you chose needs one to find the skill | the client, the mechanism it needs, and what was tried |

Source-linked is preferred because a copied guide is a fork the moment the canonical source
changes, and a project holding a copy will eventually edit it. A source is accepted only when it
carries all three of `SPECBOOT_ADOPTION_GUIDE.md`, `specboot-adoption/`, and a readable
`ai-specs/skills/specboot-adopt/SKILL.md` — checked **before the first write**, so an incomplete
source is rejected rather than diagnosed afterwards.

**The source location is runtime input, and nothing records it.** No canonical artifact holds a
machine-specific path, and **no committed artifact records the resolved path either** — not the
manifest, not the run log, not the handoff prompt. It lives only in machine-local, git-ignored state
under `.specboot/local/`, which `ADOPT-18` removes. Identity is the recorded **checksums**, not the path —
which is what lets a run resume on a different machine, and what makes a changed source *drift*
rather than a silent instruction swap.

**Where you begin.** At `ADOPT-00` when the repository has no SpecBoot files and no AI client
configuration — bootstrap makes this guide and the `specboot-adopt` skill discoverable before
anything else can run. Otherwise at `ADOPT-01`, in a repository that already exists and may have **no AI
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
| Where do I start? | `ADOPT-00` in [`09-bootstrap.md`](specboot-adoption/09-bootstrap.md) if the repository has no SpecBoot files and no AI configuration; otherwise `ADOPT-01` in [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md) |
| Which path applies to me? | Every step is unconditional. A code-graph **capability** is mandatory — [`02-codegraph.md`](specboot-adoption/02-codegraph.md) selects the implementation (CodeGraph or a company-approved equivalent); no usable capability is FAIL. |
| How do I start one? | Paste [`bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`](specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md) into a session opened on the target repository. It is the sole initial prompt and needs no tooling installed first. |
| What do I need before `ADOPT-00` will write anything? | A local canonical SpecBoot source that validates, and an explicit choice of which AI client to provision. Without either, the run stops and your repository is untouched. |
| What if my source is a Git repo with uncommitted changes? | The run records provenance as **unavailable, with that reason**, rather than writing down a commit that does not describe what it actually read. Your checksums still identify the source exactly. |
| How do I resume a partial adoption? | Read the step-state table in your filled run log; it names the next `ADOPT-nn` and its file. Resume happens in a **fresh session**, which re-verifies source identity before continuing. |
| What if the canonical source changed while I was away? | That is **drift**, and it stops the resume. The run recomputes the guide and skill checksums against the source it is given and compares them with the manifest. A mismatch stops for human reconciliation rather than silently adopting changed instructions. |
| I am resuming on a different machine and it is asking me for the source path. Is something broken? | No — that is the ordinary case. No path is recorded anywhere committed, so there is none to be missing. Supply a local source and it is accepted when the checksums match. |
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
| `ADOPT-00` | Bootstrap Client Discovery | [`09-bootstrap.md`](specboot-adoption/09-bootstrap.md) | repository has no SpecBoot files or AI configuration |
| `ADOPT-01` | Install Prerequisites | [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md) | always |
| `ADOPT-02` | Install and Initialize OpenSpec with Explicitly Selected Clients | [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md) | always |
| `ADOPT-03` | Import SpecBoot | [`01-prerequisites-and-install.md`](specboot-adoption/01-prerequisites-and-install.md) | always |
| `ADOPT-04` | Initialize the Code-Graph Capability | [`02-codegraph.md`](specboot-adoption/02-codegraph.md) | always |
| `ADOPT-05` | Configure the Code-Graph Capability for the Selected Clients | [`02-codegraph.md`](specboot-adoption/02-codegraph.md) | always |
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
| `ADOPT-18` | De-bootstrap and Reconcile Client Artifacts | [`10-debootstrap.md`](specboot-adoption/10-debootstrap.md) | a bootstrap manifest exists |
| `ADOPT-19` | Real-Project End-to-End Pilot | [`11-e2e-pilot-and-pr-gate.md`](specboot-adoption/11-e2e-pilot-and-pr-gate.md) | always |
| `ADOPT-20` | Pull-Request Readiness Gate | [`11-e2e-pilot-and-pr-gate.md`](specboot-adoption/11-e2e-pilot-and-pr-gate.md) | always |

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
| — (new) | `ADOPT-00` | `specboot-adoption/09-bootstrap.md` |
| — (new) | `ADOPT-18` | `specboot-adoption/10-debootstrap.md` |
| — (new) | `ADOPT-19`, `ADOPT-20` | `specboot-adoption/11-e2e-pilot-and-pr-gate.md` |
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
