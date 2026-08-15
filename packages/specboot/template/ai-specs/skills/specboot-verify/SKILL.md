---
name: specboot-verify
description: Client-neutral post-apply verification gate. Validates an implemented OpenSpec change against its own proposal, specs, and tasks, and confirms every required daily-workflow capability is available to every selected client. Run after apply and before requesting independent adversarial review; never substitutes for it.
author: LIDR.co
version: 1.0.0
---
# specboot-verify Skill

`specboot-verify` is this team's mandatory post-apply verification gate. It runs **after** `opsx:apply` (Claude) / `opsx-apply` (Kiro) and **before** `adversarial-review`, for every change regardless of size. It never substitutes for `adversarial-review`: this is a structured self-check against the change's own recorded plan, not an independent read.

## Two things this skill checks, and only these two

1. **Implementation matches the change's own artifacts.** The applied code, tests, and documentation are checked against `proposal.md`, every `specs/**/*.md` requirement and scenario, `design.md`'s decisions, and every task in `tasks.md` marked complete. A task marked `[x]` with no corresponding change on disk is a defect this skill exists to catch, not an assumption to trust.
2. **Every required daily-workflow capability is available to every selected client.** Read `ai-specs/specboot-instructions.md`'s required-capability list for this project and confirm each capability's paths exist and resolve for each client this project has selected. This is an **availability** check, never a claim about which process provisioned the capability — a capability existing on disk says nothing about how it got there.

Do not expand scope beyond these two. Style preferences, refactoring opportunities, and architectural second-guessing belong to a different review, not to this gate.

## Instructions

1. **Identify the change** being verified and read its full artifact set: `proposal.md`, every `specs/**/*.md` file, `design.md`, `tasks.md`.
2. **Walk every task marked complete** and confirm the corresponding change exists on disk, matches the task's description, and did not silently expand or narrow scope beyond what the task named.
3. **Walk every requirement and scenario** in the change's specs and confirm the implementation satisfies it — not merely that a plausible-looking change exists nearby.
4. **Confirm capability availability.** For each of this project's required daily-workflow capabilities, confirm its paths exist and resolve for each selected client. Record `available` or `missing`, per capability, per client — never inferred from one client's presence.
5. **Classify every finding**:
   - **Blocker** — implementation contradicts a requirement, a scenario is unmet, a completed task has no corresponding change, or a required capability is missing for a selected client.
   - **Major** — a requirement is only partially satisfied, or evidence for a scenario is thin enough that a reasonable reviewer would ask for it before trusting the change.
   - **Minor** — a defect that does not block eligibility for adversarial review but should be recorded (a stale comment, an inconsistent naming choice already flagged elsewhere).
   - **Unresolved question** — something this skill cannot determine from the artifacts and the code alone; name exactly what evidence would resolve it.
6. **Render one verdict**: `PASS` (no Blockers, no Majors), `PASS WITH GAPS` (no Blockers, one or more Majors or unresolved questions, each named), or `FAIL` (one or more Blockers).

## What the verdict does and does not grant

- `PASS` or `PASS WITH GAPS` makes the change **eligible for independent adversarial review only**. It never grants archive approval by itself, and it is never presented as though it did.
- `FAIL` blocks even **requesting** adversarial review — a change with an open Blocker is not ready for a second reviewer's time.
- Neither this skill nor `adversarial-review` grants archive approval on its own. Archive requires both gates at `PASS` or `PASS WITH GAPS`, **plus** explicit human approval — a rule this skill states but does not itself enforce; enforcement belongs to the archive step.

## Report

For every run, report: the change verified; every task checked and its disk-evidence result; every requirement/scenario checked and its result; the per-client capability-availability table; every finding with its classification and location; and the final verdict with its reasoning. A verdict with no findings listed for a `PASS WITH GAPS` or `FAIL` result is not evidence — name what was found.

## Common Mistakes

- **Treating a checked task box as evidence.** The box is a claim; this skill's job is to verify the claim, not repeat it.
- **Skipping the capability-availability check because "nothing about this change touches the workflow."** Run it every time — a capability going missing is exactly the kind of defect that has no other check surfacing it before the pilot task that needs it.
- **Rendering PASS WITH GAPS as though it were PASS.** The two are different eligibility states; the gaps must be named to whoever reviews next, including `adversarial-review` and the human approving archive.
- **Treating this skill's PASS as archive approval.** It is not, on its own, ever.
