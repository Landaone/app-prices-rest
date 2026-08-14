# Phase 8 — Daily Request-to-PR-Ready Workflow

Read [`00-conventions.md`](00-conventions.md) first.

> **First run of this workflow during an adoption is `ADOPT-19`.** The end-to-end pilot in
> [`11-e2e-pilot-and-pr-gate.md`](11-e2e-pilot-and-pr-gate.md) runs exactly the sequence below, on
> one real project task chosen by the human, and is what gates pull-request readiness. The
> semantics here are unchanged by that step.

**Status:** `PENDING END-TO-END VALIDATION`

This is **not** part of the one-time adoption (`ADOPT-01` … `ADOPT-17`). It is the workflow a
repository uses afterwards, every day, and it is documented canonically elsewhere. This
file gives the sequence and the blocking rules; it deliberately does not transcribe the
detail.

---

## The six required capabilities, in order

```text
developer request
→ enrich-us
→ propose
→ apply
→ tests
→ specboot-verify
→ independent adversarial-review
→ affected documentation and canonical-spec synchronization
→ archive
→ commit message and pull-request content prepared
→ STOP before push or pull-request creation
→ human approval
→ authorized remote operation according to company policy
```

| # | Capability | Invocation |
|---|---|---|
| 1 | `enrich-us` | skill, by request/description match — identical on both clients |
| 2 | propose | `/opsx:propose` (Claude) / `/opsx-propose` (Kiro) |
| 3 | apply | `/opsx:apply` (Claude) / `/opsx-apply` (Kiro) |
| 4 | `specboot-verify` | `/specboot-verify` — identical on both clients |
| 5 | `adversarial-review` | skill, by request/description match; run from a different session or client than the one that implemented the change when possible |
| 6 | archive | `/opsx:archive` (Claude) / `/opsx-archive` (Kiro) |

## Blocking rules you need before reading further

These four rules determine whether the sequence may advance. They are summarized here
because getting them wrong is expensive; everything else lives in the canonical sources.

1. **`enrich-us` returns exactly one outcome.** `READY FOR PROPOSAL` allows proceeding.
   `NEEDS CLARIFICATION` blocks proceeding to propose until the listed questions are
   resolved.
2. **A `specboot-verify` PASS or PASS WITH GAPS makes a change eligible for independent
   adversarial review only.** It never grants archive approval by itself. A FAIL blocks even
   requesting adversarial review.
3. **An `adversarial-review` PASS or PASS WITH GAPS does not grant archive approval either.**
   Explicit human approval remains independently required.
4. **Archive requires both gates at PASS or PASS WITH GAPS, plus explicit human approval.**
   Commit and push remain separate, later, explicit approvals — see `ADOPT-17` in
   [`07-baseline-and-checkpoint.md`](07-baseline-and-checkpoint.md) for that boundary.

This gate is enforced by documented convention and human/agent discipline, not by a
technical modification: the selected client's installed OpenSpec archive command is
unmodified.

## Canonical sources — read these for the detail

Do not rely on this file for gate semantics, verdict mappings, or per-capability procedure.
It is a pointer by design, so that it cannot drift from the sources below:

- **`ai-specs/specboot-instructions.md`** — the full workflow, per-client invocation syntax,
  and permission setup cross-references.
- **`openspec/specs/specboot-verification-workflow/spec.md`** — the synchronized
  specification: verdict definitions, the exhaustive Blocker/Major/Minor/unresolved-question
  mapping, and the eligibility-versus-approval distinction.
- **`ai-specs/skills/enrich-us/SKILL.md`**, **`ai-specs/skills/specboot-verify/SKILL.md`**,
  **`ai-specs/skills/adversarial-review/SKILL.md`** — the canonical logic of the three
  skill-invoked capabilities.

Every technology-specific instruction in those sources is conditional on repository
evidence. An unknown client, an uncommon stack, or an unrecognized build system falls back
to the target repository's README, CI configuration, documentation, and real file evidence
rather than assuming Node.js or failing closed. An unexecuted or failed command is FAIL —
see [`00-conventions.md`](00-conventions.md).

## Capability availability versus installer provenance

`specboot-verify`'s capability-availability check reflects only that a capability's paths
currently exist and resolve on disk for the selected client. It is never a claim about which
installer or process provisioned them — see [`00-conventions.md`](00-conventions.md).

## Status

This workflow has not completed a full end-to-end live cycle in this guide's reference runs.
The `PENDING END-TO-END VALIDATION` marker above is current, not historical.

**Evidence to record:** run-log "Daily workflow pilot" — request, change ID, artifacts,
implementation, tests, `enrich-us` outcome, proposal approval, apply result,
`specboot-verify` verdict, independent `adversarial-review` verdict and provenance, archive
approval, archive result, docs/spec sync, commit message, PR title, PR description, remote
mutation attempted (must be NO), result.

The reference run's planned pilot request and its validation criteria are preserved in
[`history/reference-run-java-maven.md`](history/reference-run-java-maven.md).
