# Human Orientation and Self-Description Acceptance Gate — Report

Bounded gate, tasks 16.8–16.12 and 16.17–16.19 (design D11, D14, D15, D16).

> These are bounded navigability and self-description checks against a restructured document.
> They do not prove a complete real adoption. End-to-end validation will come from the next
> real SpecBoot adoption performed in another repository. No PASS here may be reported as
> end-to-end validation.

> This report evidences entry-file orientation and self-description only. It does not prove
> complete human usability of the guide, nor successful human execution of an adoption.

---

## Human attempt 1 — verdict: **FAIL (blocking), all six checks FAIL**

- Guide state under test: pre-D14/D15/D16 entry file, whose orientation table answered each
  question with a **location** rather than an explanation
- Reviewer responses: preserved verbatim below, in the language given, unedited

**This verdict is permanent and is a defect in the guide, not in the reviewer.** The responses
are not reinterpreted into the expected answers, not scored as partially correct, and the
failure is not attributed to the reviewer. A reviewer who has to supply the operating model from
general knowledge is evidence that the document did not supply it.

### Status of this verdict — historical, not a current release blocker

**The FAIL is permanent. The word "blocking" in it is historical.**

Attempt 1 was blocking **at the time it was run**, against the **pre-D14/D15/D16** entry file.
It halted that version of the guide, which is exactly what the gate is for. Every one of its six
failures was then remediated — see "How the remediation addresses each failure" below; tasks
8.7–8.10 implementing that remediation are complete and were re-verified by the group-10 suite.

**It is not a current release blocker.** The guide version attempt 1 failed no longer exists.
What remains unverified is a different, narrower thing: whether the **corrected** guide passes an
independent human-orientation check. That is attempt 2, recorded as `NOT RUN` because no
independent reviewer was available — and it is handled by narrowing the readiness claim under
design **D18**, not by treating attempt 1 as unresolved.

The agent gate followed the identical shape and makes the distinction concrete: agent attempt 1
was also a blocking FAIL, was remediated by D12/D13, and agent attempt 2 passed. Nobody treats
agent attempt 1 as a current blocker. The human case differs in exactly one respect — attempt 2
could not be run, so the corrected guide carries **no** independent human verification either
way, neither a pass nor a fail.

Attempt 1 is therefore preserved as **historical defect evidence**: the record of two genuine
guide defects (six failed checks) that the gate caught and the remediation fixed.

### Reviewer responses (verbatim)

<!-- BEGIN VERBATIM HUMAN ATTEMPT-1 RESPONSES -->

1. "desde cero, si son adopciones de AI, los proyectos no tienen instalado nada referente a AI."

2. "para eso es la guia paso a paso, el humano va haciendo los pasos uno detras de otro."

3. "lo normal si se debe interrumpir la adopcion un humano terminaria un paso completo, para saber donde continuar"

4. "cual evidencia?"

5. "el humano necesita aprobacion humana ?"

6. "en principio el humano lo consultaria en su cliente AI y a medida que se hagan adopciones debe ir alimentandose una trobleshotting guide para que los errores ya vayan documentandose con su solucion"

<!-- END VERBATIM HUMAN ATTEMPT-1 RESPONSES -->

### Per-check results, and what the entry file failed to supply

| # | Orientation question | Response | Result | What the entry file failed to supply |
|---|---|---|---|---|
| 1 | Where do I start? | R1 | **FAIL** | The answer given was "`ADOPT-01` in `01-prerequisites-and-install.md`" — a step ID and a file path, which presume the reader already knows what `ADOPT-01` is. The file never stated the **starting condition**: an existing repository that may have no AI tooling installed at all. |
| 2 | How do I select the applicable path? | R2 | **FAIL** | The answer pointed at a decision node in another file. The entry file never stated that a branch exists, what choosing it means (`ADOPT-04`/`ADOPT-05` skipped), or — critically — that `ADOPT-05B` remains mandatory regardless. |
| 3 | How do I resume a partial adoption? | R3 | **FAIL** | The answer was "read the step-state table in your filled run log", which is correct **only when the table is current**. The entry file never distinguished a planned pause from an unexpected interruption, so the case where the table cannot be trusted was unaddressed. |
| 4 | Where do I record evidence? | R4 | **FAIL** | The answer named a location. The entry file never defined **what evidence is** — commands, exit statuses, output, files changed, approvals, validation results, recovery attempts — nor why it is recorded. The response is a question, which is the clearest possible signal that the term was undefined. |
| 5 | When is human approval required? | R5 | **FAIL** | The answer said gates are marked and the semantics live in `00-conventions.md`. The entry file never identified **who the actors are**: whether the reader is the approver, what an agent may not do, or what happens when the operator lacks authority. The response is again a question. |
| 6 | What do I do on failure? | R6 | **FAIL** | The answer was "each step's `On failure` field points into `22-troubleshooting.md`". The entry file never told a human what to actually do — mark FAIL, record the command and error, follow the pointer, continue only after full validation — nor what to do when the failure is **undocumented**. |

Six answers, six locations, zero explanations. That is the pattern, and it is the defect design
D14 records.

One observation, recorded as evidence about the guide and explicitly **not** as partial credit
for the reviewer: R6 describes growing a troubleshooting guide as adoptions accumulate, which is
substantially the governed-growth mechanism the remediation later specified (task 8.10 — record
the diagnosis as a follow-up candidate, add it through the normal change workflow). The
reviewer's instinct was sound; the document simply never met it.

### How the remediation addresses each failure

| Check | Fixed by |
|---|---|
| 1 | D14 — "Where you begin", stating the no-AI-tooling starting condition |
| 2 | D14 — "How you move through it", naming CodeGraph as the only branch and `ADOPT-05B` as still mandatory |
| 3 | D16 — planned pause vs. unexpected interruption; never infer completion |
| 4 | D14 — "What 'evidence' means", enumerated in plain language with its purpose |
| 5 | D15 — the four-part operator/approver role model |
| 6 | D14 — "When something fails", including the undocumented-failure path |

---

## Task 16.9 — objective verification of the entry file's approval content

Verified by inspection of the entry file, independent of any reviewer. This is an objective
property of the document; it does **not** substitute for the reviewer's own Q5 determination,
which remains part of tasks 16.8 and 16.10.

| Required | Present? | Where |
|---|---|---|
| General approval semantics explained | **Yes** | "Who approves what" in the plain-language section: an AI agent can never approve its own change; an authorized human operator approves and records personally; an operator without authority obtains approval from the designated repository owner or approver |
| How an approval gate is identified | **Yes** | Stated as the literal marker `[HUMAN APPROVAL REQUIRED]`, in both the plain-language section and the orientation table |
| Where step-specific gates are found | **Yes** | Orientation table: "the individual gates live in the phase files, deliberately not duplicated here" |
| Does **not** duplicate individual gates | **Yes** | The entry file names no specific step's gate. The 11 real gates remain solely in the phase files; the entry file's mentions are all explanatory |
| Scope of approval stated | **Yes** | "covers only the specific change named at that gate — not the next step, not a broader command, not a repeat run later. Record it either way" |

**16.9: PASS** on the objective criteria.

---

## Independent human attempt 2 — **NOT RUN** (task 16.8)

| Field | Value |
|---|---|
| Status | **`NOT RUN`** |
| Reason | No independent reviewer was available |
| Guide state it would have tested | post-D14/D15/D16 (corrected) entry file |
| Prerequisites | Met — remediation (tasks 8.7–8.10) and group-10 re-verification both complete |

**`NOT RUN` is the accurate record and the only permitted one here.** It is **not** PASS, **not**
N/A, and **not** blank:

- **PASS** would assert evidence that does not exist.
- **N/A** would assert the check does not apply. It applies — the guide needs it.
- **Blank or omitted** would let a later reader assume it passed.

This is the same principle `ADOPT-05B` applies to an unavailable client/OS combination
(`PENDING EVIDENCE`, never PASS), turned on this change's own acceptance. The implementing
session may not serve as the reviewer, and no response may be self-supplied.

---

## Bounded readiness claim (task 16.10)

Matches `proposal.md`. This is the complete claim; nothing beyond it is asserted.

**Claimed — supported by recorded evidence:**

| Claim | Evidence |
|---|---|
| **Mechanically validated** | Group 10 re-run 6: 122 links resolve, no duplicate headings, invariant counts reconciled, 11 approval gates mapped 1:1 with every `file:line` re-derived, byte-for-byte verbatim fidelity, untouched-file proof across 8 paths, diff scope confined to 4 tracked files, contract conformance across all 18 steps |
| **Agent-navigability validated against the current state** — restored, on new evidence | Agent **attempt 3** (tasks 16.24–16.26), fresh session, human-attested, given only the entry file at SHA-256 `0405b6bd…` (18,529 bytes / 287 lines): **PASS** on all five required demonstrations — form A including `ADOPT-16`'s named inline stale-output guidance, form B via a named `22-troubleshooting.md` entry, form C via an explicitly identified owning step, `ADOPT-08`'s form-3 `Action`, `ADOPT-05B`'s form-4 `Action` — and on **both** deciding behaviours of 16.26. Each scored row re-derived mechanically against the tree. See `reports/agent-acceptance.md`. **Limitation carried with the claim:** scored by the implementing session, not independently. |
| **Ready for a controlled pilot adoption** | Follows from the two rows above, and no further. A pilot is a controlled first real adoption whose operator records prior exposure — not a substitute for the independent review below. |

**Not claimed — no supporting evidence exists for the current state:**

- **Independent human usability** — attempt 2 `NOT RUN`.
- **End-to-end adoption** — no real adoption has been performed with this guide.

**Why the claim narrowed rather than the evidence widening — and how it was restored.** The
alternative, when the corrections landed, was to argue that attempt 2's PASS still "essentially"
held because they only clarified what was already meant. That is precisely the inference design
D18 exists to forbid: it converts "we have not tested this state" into "this state passed". The
correction made the guide better and the evidence older; only one of those is a reason to keep
claiming. So the claim was withdrawn, and then **restored the only admissible way — by running
attempt 3 against the state that actually exists.** The row above rests on that attempt, not on
attempt 2. The cost was one additional fresh session; that is the whole price of never taking the
shortcut, and it is why the withdrawal was recorded rather than argued around.

**Task 16.9 does not extend this claim.** Its PASS verifies that the entry file *contains* the
required approval content — general semantics, how a gate is identified, where step-specific
gates live, and no duplication of individual gates. That is a property of the document, **not**
evidence that a reader comprehends it. It must never be reported as human validation.

---

## Deferred validation contract (task 16.19)

The two unverified properties transfer to the **first real human-led adoption in another
repository**. That pilot must record all five of:

| # | Required record |
|---|---|
| a | The operator's **prior exposure** to this guide — had they read it before, and how much |
| b | The **full evidence trail** — the completed run log, per the step contract's `Evidence to record` fields |
| c | Every **deviation** from the documented procedure, and why it was necessary |
| d | Every **failure** encountered and the **recovery** applied, including failures with no documented recovery |
| e | Proposed **improvements to the guide** and to **`22-troubleshooting.md`**, routed through the governed change workflow rather than edited mid-adoption |

Items (d) and (e) are how `22-troubleshooting.md` is intended to grow: one reviewed entry at a
time, from real failures, exactly as `ADOPT-05B`'s undocumented-failure path specifies.

## Retained obligation — independent review by an unexposed developer (task 16.20)

**Still required. Not discharged by the pilot.**

A pilot operator reads this guide in order to run it. Their success is evidence that the
*procedure works* — not evidence that the document *explains itself to a newcomer*. Prior
exposure is precisely the variable the orientation gate controls for, which is why the pilot
must record it under (a) above.

These are therefore two separate, independent obligations:

| Obligation | Discharged by | Status |
|---|---|---|
| End-to-end adoption validation | The first real human-led pilot adoption | **Deferred** |
| Independent human-orientation validation | A developer with **no prior exposure** to this guide, answering the six orientation questions from the entry file alone | **Deferred, undischarged** |

Neither is satisfied by this change. Both are carried forward explicitly rather than closed.

---

## Claim-integrity audit (task 16.21)

Every mention of human usability or end-to-end validation across all **16** files of this change
— `proposal.md`, `design.md`, `tasks.md`, `enriched-work-item.md`, `.openspec.yaml`, and the
**11** files under `reports/` — was enumerated and
classified **by reading**, not by pattern match. A regex pass flagged 9 candidates that proved to
be line-splitting artifacts; rather than tune the pattern until it reported PASS, each of the 23
distinct forms was classified individually. Tuning a check until it passes is the same failure
this change's evidence discipline rejects everywhere else.

**32 occurrences, 23 distinct forms, 0 asserting validation.**

| Class | Count | Example |
|---|---|---|
| **Deferral** — states the validation has *not* happened and where it will | 7 | "End-to-end validation will come from the next real SpecBoot adoption performed in another repository." |
| **Prohibition** — forbids reporting a PASS as validation | 5 | "No PASS here may be reported as end-to-end validation." |
| **Explicit negation** — denies the claim outright | 5 | "It is explicitly **not** claimed as validated for independent human usability, and **not** validated end-to-end."; "It does not prove complete human usability of the guide, nor successful human execution of an adoption." |
| **Status marker** — `PENDING END-TO-END VALIDATION`, which asserts non-validation | 3 | The daily-workflow marker, retained verbatim |
| **Risk / rejected alternative** — warns against the claim | 4 | "Over-claiming what the acceptance gates prove…"; "*Name the human gate a 'usability' gate* — rejected" |
| **Check definition** — the audit tasks themselves | 3 | Tasks 16.11, 16.12, 16.21 |
| **Future-change item** — names E2E validation as out of scope here | 1 | "Real project-task E2E validation in a separate branch…" |
| **Bounded-claim table** — lists it under *not claimed* | 4 | This report's "Not claimed" section |

**16.21: PASS.** No artifact asserts human-usability validation or end-to-end validation. Every
mention either denies it, defers it, forbids claiming it, marks it pending, warns against it, or
defines the check for it.

### Re-audit after the D4/D13 corrections

Re-run because those corrections edited `proposal.md`, `design.md`, `tasks.md`, and four report
files, and because the bounded claim itself changed. Two findings, both corrected here:

1. **VF7 — the scope count was wrong.** The audit claimed coverage of "all 12 change artifacts";
   the change holds 16 files. The enumeration itself had been complete; the count describing it
   was not. Corrected above.
2. **A third unvalidated property now exists.** Agent navigability moved from *claimed* to *not
   claimed*, so the audit's subject widened: no artifact may now assert agent-navigability
   validation either. Re-grepped across all 16 files — `proposal.md`'s bounded-claim bullet,
   design D18, task 16.10, and this report's table all state it as withdrawn and pending attempt
   3. The single surviving phrase "agent-navigability validated" appears in design D18 inside a
   narration of what the claim *used to be*, explicitly marked as superseded in the same
   sentence.

**Re-audit verdict: PASS.** No artifact asserts human-usability validation, end-to-end
validation, or — as of this re-run — current agent-navigability validation.

### Third audit — after agent attempt 3 restored the agent claim

Re-run because attempt 3's PASS restored one claim, and a restoration is exactly where a bounded
claim is most likely to be overstated. Scope: `proposal.md`, `design.md`, `tasks.md`, and all
files under `reports/`.

- **Agent navigability is now claimed, and the claim is bounded three ways** wherever it appears:
  to the **current post-D4/D13 state** (identified by entry-file SHA-256, byte count, and line
  count), to **attempt 3's evidence** rather than attempt 2's, and with the **scoring-provenance
  limitation** stated in the same place — scored by the implementing session, not independently.
- **Finding 2 above is now closed** by evidence rather than reinterpreted. Attempt 2's PASS is
  still described only as evidence about the state it read; nothing carries it forward.
- **Human usability and end-to-end validation remain unclaimed and explicitly negated.** Human
  attempt 1 stays **FAIL**, human attempt 2 stays **NOT RUN**, and task 16.20's independent-review
  obligation stays open — attempt 3 is an agent gate and does not touch either.
- **No artifact presents attempt 3 as an independent review, a usability study, or end-to-end
  validation.**

**Third-audit verdict: PASS.** Every claim in every artifact is bounded to the evidence that
supports it, and the two properties that remain unvalidated are still named as unvalidated.

---

## Human decision under design D20 — recorded 2026-08-10

**Decision: ACCEPTED GAP, with the obligation deferred — not archive approval.**

The human operator of this change explicitly accepts that **independent human-orientation
validation remains `NOT RUN`**, and **defers that obligation to a future review by an unexposed
developer**.

### Scope of what is accepted

**Accepted:** that this change ships without independent human-orientation validation. Human
attempt 1 stands as a permanent FAIL against a guide version that no longer exists; human attempt 2
was never run, because no independent reviewer was available.

**Grounds, verified against the artifacts rather than asserted.** The accepted gap does not block
archive eligibility because the change claims only **mechanical validation**, **agent
navigability**, and **readiness for a controlled pilot adoption**. It does **not** claim independent
human usability, and does **not** claim end-to-end adoption. That premise was checked against
`proposal.md` at the moment of recording, not taken on trust — the proposal reads: "claimed as
**mechanically validated** and **agent-navigability validated against the current post-D4/D13
state**, and therefore **ready for a controlled pilot adoption**", and "It is explicitly **not**
claimed as validated for independent human usability, and **not** validated end-to-end." The
decision's stated boundary and the proposal's claim boundary are the same boundary.

**Deferred, not discharged:** the obligation itself. A **future independent review by an unexposed
developer** remains required and remains open. Task 16.20 is **not** closed by this decision, and
the deferred-validation contract (design D18) travels forward unchanged: the first real human-led
adoption in another repository must still record the operator's prior exposure, the full evidence
trail, every deviation, every failure and recovery, and proposed improvements — and a pilot
operator who has read this guide cannot also be its independent reviewer.

### What this decision does and does not do

| | |
|---|---|
| **Resolves** | **AR13** — the unresolved `Question / assumption` from the independent adversarial review. It is resolved by a recorded human decision, which is exactly and only what design D20 specified would discharge it |
| **Does NOT grant** | **Archive approval.** This is explicitly not immediate archive approval |
| **Still required before archive** | (1) a **fresh `specboot-verify`**; (2) a **fresh independent `adversarial-review`**; (3) a **separate, explicit final human approval** |
| **Does NOT close** | task **16.20** — the future independent review by an unexposed developer |
| **Does NOT alter** | any readiness claim. The decision accepts the claim as already written; it does not widen it |

### Provenance

| Field | Value |
|---|---|
| Decision date | 2026-08-10 |
| Decided by | the human operator and requester of this change (git identity `Landaone`) |
| Recorded by | the implementing session, at the operator's explicit instruction, verbatim in substance |
| Branch | `feature/restructure-specboot-adoption-guide` |
| `HEAD` | `0e6eb75d974d7851c948888225c0f252d05aac27` |
| Guide-set state | 15 files, all byte-identical to the state the acceptance gates judged; entry file SHA-256 `0405b6bd8772eba122a516c4add3a05cce9d170e48710a2c935a79948f5fa1c0` (18,529 bytes / 287 lines) |
| Artifact state | after the D19/D20 evidence-reproducibility correction (tasks 10.12.4, 10.14–10.20); `openspec validate --strict` valid |
| Decision instrument | design **D20**, which specified a human statement recorded under `reports/` as the only thing that could discharge this |

**Why this record exists in this form.** D20 exists because a reader could otherwise assemble a
`specboot-verify` PASS WITH GAPS, an agent-gate PASS, and D18's sanctioned narrowing into
"approved". This record is the countermeasure working as designed: the one approval that is still
missing is named, the accepted gap is named, and the deferred obligation is named — separately,
so that none of the three can be read as either of the others.
