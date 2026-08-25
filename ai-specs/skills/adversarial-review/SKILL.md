---
name: adversarial-review
description: Independent red-team review of an implemented OpenSpec change, run after specboot-verify reaches PASS or PASS WITH GAPS and before requesting archive approval. Ideally run from a different session or client than the one that implemented the change; the same-session fallback must be named explicitly when used.
author: LIDR.co
version: 1.0.0
---
# adversarial-review Skill

`adversarial-review` is this team's mandatory pre-archive red-team review. It runs **after** `specboot-verify` reaches `PASS` or `PASS WITH GAPS` (a `FAIL` there blocks even requesting this review) and **before** archive approval is requested. It is deliberately not the same check as `specboot-verify`: that skill confirms the implementation matches its own plan; this skill assumes the plan and the implementation could both be wrong, and looks for reasons to reject the change rather than reasons to accept it.

## Independence is the point

Run this review from a **different session or client** than the one that implemented the change, whenever that is possible — a fresh context has no investment in the change being right and no memory of the reasoning that produced it, which is exactly what a red-team review needs. Where a genuinely separate session or client is not available, the review may proceed in the same session, but its output **must name the same-session fallback explicitly** — never silently presented as though it were independent. A reviewer that already wrote the code under review is not this review's intended reviewer.

## What this review looks for

Unlike `specboot-verify`, this review is not bounded to "does the code match the plan." It actively probes:

1. **Whether the plan itself was right** — does the proposal solve the actual problem, or a plausible-sounding adjacent one; does the design's chosen approach hold up against an alternative a reasonable engineer would raise; are there requirements the specs never captured because nobody thought to ask.
2. **Whether the implementation has defects the plan wouldn't surface** — edge cases, error paths, concurrency, security, and performance characteristics that a plan-conformance check does not probe by construction.
3. **Whether the change's own evidence is trustworthy** — a passing test suite that doesn't actually exercise the changed behavior, a claimed verification that wasn't really run, a scenario marked satisfied on the strength of adjacent-but-different evidence.
4. **Whether the change is complete relative to its stated scope** — not scope creep, but scope *gaps*: something the proposal implies but the tasks never captured.

## Instructions

1. **Confirm `specboot-verify`'s verdict** is `PASS` or `PASS WITH GAPS` before proceeding; if `FAIL`, stop and report that this review cannot start.
2. **Read the change's artifacts** (`proposal.md`, `specs/**/*.md`, `design.md`) as context, not as the checklist — this review's job is to question them, not confirm them.
3. **Independently re-derive** what the change should do, before reading how it claims to have done it, so the review is not anchored by the implementer's own framing.
4. **Actively try to break the change**: construct the inputs, states, and sequences most likely to expose a defect, rather than sampling the happy path a second time.
5. **Classify every finding** using the same Blocker / Major / Minor / unresolved-question scheme `specboot-verify` uses, so the two reviews' output is comparable.
6. **Render one verdict**: `PASS`, `PASS WITH GAPS`, or `FAIL`, using the same criteria as `specboot-verify` (no Blockers for `PASS`/`PASS WITH GAPS`; any Blocker is `FAIL`).

## What the verdict does and does not grant

- `PASS` or `PASS WITH GAPS` here, **together with** `specboot-verify`'s own `PASS`/`PASS WITH GAPS`, is a precondition of requesting archive approval — never a substitute for the explicit human approval archive still requires.
- `FAIL` blocks requesting archive approval outright.
- This review does not re-run `specboot-verify`'s plan-conformance check from scratch; it assumes that check already ran and focuses its own effort on what that check cannot see by construction.

## Report

Report: the reviewing session/client's relationship to the implementing one (genuinely independent, or the named same-session fallback); every angle probed (plan correctness, defect classes, evidence trustworthiness, scope completeness) with what was found or explicitly ruled out; every finding with its classification and location; and the final verdict.

## Common Mistakes

- **Reviewing the diff instead of the problem.** A change can be internally consistent and still solve the wrong problem; this review checks the problem first.
- **Treating same-session review as equivalent to independent review without saying so.** The fallback is allowed; the silence about using it is not.
- **Re-running `specboot-verify`'s checklist instead of adding a genuinely different lens.** If this review's findings would have been caught by `specboot-verify`, this review has not done its job.
- **Letting a `PASS` here be read as archive approval.** It never is, on its own — explicit human approval remains independently required.
