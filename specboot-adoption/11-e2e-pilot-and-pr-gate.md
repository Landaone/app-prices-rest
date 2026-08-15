# Phase 11 — End-to-End Pilot and Pull-Request Readiness (Mandatory)

Read [`00-conventions.md`](00-conventions.md) first.

Steps: `ADOPT-19`, `ADOPT-20`. New in this phase file; they do not renumber any existing step.

These two steps are what turn "every file is in place" into "this adoption demonstrably works".
Installation evidence is self-reported; the pilot is the only check that the workflow functions on
real work.

> **`ADOPT-19` is its own checkpoint**, like every independently validated step. `ADOPT-17` is the
> final checkpoint *of the adoption*, not the last checkpoint of the workflow.

---

## `ADOPT-19` — Real-Project End-to-End Pilot

**Condition:** always

**Purpose:** Prove the installed workflow works end to end on **one real project task**, not on its
own scaffolding. This is what retires the guide's `PENDING END-TO-END VALIDATION` marker.

**Preconditions:** `ADOPT-18` = PASS, or `SKIPPED — no bootstrap performed`.

**Action:** structured written procedure.

1. **The human names the task.** Stop and wait for it. The orchestrator does **not** select the
   pilot task — a task chosen by the agent tends to be one the agent already knows how to do, which
   is precisely the task that proves nothing.

2. **Run the full six-capability daily workflow on that task**, in order:

   | # | Capability | Required outcome |
   |---|---|---|
   | 1 | `enrich-us` | reaches `READY FOR PROPOSAL` |
   | 2 | propose | all artifacts created |
   | 3 | apply | tasks implemented |
   | 4 | tests | project test suite passes |
   | 5 | SpecBoot verify | PASS or PASS WITH GAPS |
   | 6 | adversarial review | PASS or PASS WITH GAPS, independent |
   | — | docs and spec sync | completed |
   | — | archive | both verdicts plus explicit human approval |

3. **Run the adversarial review independently** — ideally in a different session or client. A
   review performed by the session that did the work is not independent, and recording it as such
   is a FAIL.

**Allowed modifications:** not enumerable in advance — this step orchestrates the six-capability
daily workflow on a real, human-named project task, and each capability in that workflow
(`enrich-us`, propose, apply, `specboot-verify`, `adversarial-review`, archive) is its own gated
step with its own scope, reviewed and approved through the normal OpenSpec change and checkpoint
machinery as that pilot change proceeds. This step's own role is orchestration and evidence
recording in the run log; it does not itself carry a separate write scope beyond that.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** at the pilot change's own archive gate, per the
normal daily workflow. This step adds no separate approval of its own — it consumes the workflow's.

**Validation:** every capability above reached its required outcome, evidenced by the pilot change's
own artifacts. A capability that could not be exercised is `PENDING EVIDENCE`, never PASS, and
leaves `ADOPT-19` short of PASS.

**Evidence to record:** the pilot task, named by the human; the pilot change's name; each
capability's verdict with a pointer to its artifact; the reviewer provenance for the adversarial
review; and any deviation encountered, with its recovery. The existing **Daily workflow pilot**
block in the run-log template is the evidence sink — do not create a parallel one.

**On failure:** Form C — the owning step is whichever adoption step provisioned the failing
capability. A pilot failure is evidence about the **adoption**, not about the pilot task: fix the
adoption step, re-validate it, and re-run the pilot.

---

## `ADOPT-20` — Pull-Request Readiness Gate

**Condition:** always

**Purpose:** Be the single place that decides whether this adoption may become a pull request, and
the only step authorized to declare that readiness.

**Preconditions:** `ADOPT-19` = PASS.

**Action:** verification only. This step creates nothing and modifies nothing.

Confirm from **recorded evidence** that every step from `ADOPT-00` through `ADOPT-19` is PASS —
step by step, individually. Read each step's evidence block in the run log.

**An empty evidence block blocks readiness.** It means "not known to have completed", never
"completed but unrecorded" — the same rule the resume protocol already applies. A step that *looks*
done is not a step that *is* recorded done.

A step legitimately recorded `SKIPPED` with its reason (for example `ADOPT-18` in a repository that
was never bootstrapped) satisfies this gate. A step recorded `PENDING EVIDENCE` does not.

**Allowed modifications:** none — verification only, this step creates and modifies nothing.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before any pull request is created. Pull-request
creation is remote mutation and is subject to the same company policy as the push protocol.

**Validation:** a per-step PASS/SKIPPED table covering `ADOPT-00` … `ADOPT-19` with an evidence
pointer for each row, and no row at FAIL, PENDING, or blank.

**Evidence to record:** the per-step table with its evidence pointers; the readiness verdict; the
approval; and, if a pull request is then created, its identifier.

**On failure:** Form C — the owning step is the first one whose evidence does not support PASS.
Return to it. Do not create a pull request "as a draft" in the meantime: a draft pull request is
still a pull request, it accumulates review and approval state, and the draft label decays while
the artifact persists. Where a reviewer needs to read the work early, give them the branch and the
run log.

---

## After this step

The adoption is complete and PR-ready. Ongoing use is
[`08-daily-workflow.md`](08-daily-workflow.md).
