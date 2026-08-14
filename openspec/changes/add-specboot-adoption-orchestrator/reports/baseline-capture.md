# Group 1 Report — Pre-Change Baseline Capture and Amendment Mapping

- Date: 2026-08-12
- Change: add-specboot-adoption-orchestrator
- Branch: `feature/add-specboot-adoption-orchestrator`
- HEAD at capture: `c900394104ca1be31d59684d31b2b2aa63fbd2f1`
- Working tree at capture: only `openspec/changes/add-specboot-adoption-orchestrator/` untracked (matches task 0.2's expected state)

## 1.1 Verbatim pre-change text of every amended passage

### (a) `specboot-adoption/02-codegraph.md` — decision node (lines 10-33)

> ## Decision node — is CodeGraph being adopted?
>
> **This entire file is conditional.** CodeGraph is a decision, not a mandatory link in the
> adoption chain.
>
> **Predicate:** CodeGraph is adopted for this repository when **both** hold:
>
> 1. the operator has explicitly decided to adopt it, and that decision is recorded in the
>    run log; and
> 2. after `ADOPT-04`, a `.codegraph/` directory exists at the repository root.
>
> Before `ADOPT-04` runs, only condition 1 is testable — the decision is the gate, and the
> directory is its result.
>
> **If the decision is no:** skip this entire file. Record the skip in the run log with the
> reason. Go directly to [`03-client-permissions.md`](03-client-permissions.md).
>
> This matches the guidance in a repository's own root instruction file: if there is no
> `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.
>
> > **`03-client-permissions.md` is not part of this conditional.** Selected-client permission
> > configuration is unconditionally mandatory and is never skipped alongside CodeGraph. It
> > is a separate file precisely so that no "skip CodeGraph" path can reach past it.

Also captured: the file title is `# Phase 2 — CodeGraph (Conditional)`.

### (b) `specboot-adoption/07-baseline-and-checkpoint.md` line 157 — `ADOPT-17` approval gate

> **Approval gate:** **[HUMAN APPROVAL REQUIRED]** immediately before creating the local
> commit. **Do not push.** Remote mutation is outside this guide entirely.

### (c) `specboot-adoption/00-conventions.md` line 205 — §Scope boundaries

> - Remote mutation — push, pull-request creation, merge — is outside this guide entirely and
>   requires its own explicit approval under company policy.

## 1.2 `ADOPT-17` precondition (evidence for design D-L)

`specboot-adoption/07-baseline-and-checkpoint.md`, `## \`ADOPT-17\` — Review and Create a Clean Local Checkpoint`:

> **Condition:** always
>
> **Preconditions:** `ADOPT-16` = PASS

**Why this matters.** `ADOPT-17` is gated on the project baseline having passed. Attaching the
reusable checkpoint protocol to `ADOPT-17` would therefore make every earlier checkpoint depend
on a baseline run that has not happened yet — the precondition would be either violated or
silently reinterpreted. This is the direct evidence for design D-L placing the protocol in
`00-conventions.md` instead.

## 1.3 Phase-file inventory (evidence for design D-G)

Present in `specboot-adoption/`:

`00-conventions.md`, `01-prerequisites-and-install.md`, `02-codegraph.md`,
`03-client-permissions.md`, `04-context-and-openspec.md`, `05-agents-and-skills.md`,
`06-adapters-and-discovery.md`, `07-baseline-and-checkpoint.md`, `08-daily-workflow.md`,
`19-permissions-policy.md`, `22-troubleshooting.md`, plus `history/` and `run-template/`.

Numbering is `00`–`08`, `19`, `22` — already non-contiguous by design. **`09`, `10`, and `11`
are free**, confirming design D-G. Renumbering existing files is excluded: it would break the
permanent section-number back-compatibility map.

## 1.4 Pre-existing `packages/specboot/template/` drift (warn-only baseline, design D-I)

Comparison of `packages/specboot/template/ai-specs/skills/<name>` against canonical
`ai-specs/skills/<name>`:

| Skill | Result |
|---|---|
| `code-auditing` | **DIFFER** — `SKILL.md`, `references/audit-methodology.md`, `references/dead-code-methodology.md` |
| `commit` | same |
| `enrich-us` | **DIFFER** — `SKILL.md` |
| `explain` | same |
| `meta-prompt` | same |
| `update-docs` | same |
| `using-git-worktrees` | **DIFFER** — `SKILL.md` |
| `writing-skills` | same |

Three skills drift across at least five files — broader than the single `enrich-us/SKILL.md`
recorded in the enriched work item. This **strengthens** design D-I: repairing it inside this
change would silently alter three unrelated skills. The drift check is therefore **enforcing**
for the kit payload and **warn-only** for this pre-existing template drift, which a separate
change repairs.

**This change does not fix the drift.**

## 1.5 Environment constraints bounding what may be claimed

| Constraint | Evidence | Consequence |
|---|---|---|
| Host OS is macOS | `uname -sr` → `Darwin 22.6.0` | No Windows host available |
| No Windows/PowerShell execution possible | same | Every Windows/PowerShell row is `PENDING EVIDENCE`; only Windows-*intended* support may be claimed (design D-J) |
| No CI configuration | `.github/workflows/` does not exist | "No CI configuration found" is a finding the remote-impact assessment must report — never a licence to push |
| Node available for installer tests | `node --version` → `v24.18.0`; `require('node:test')` succeeds | `node:test` usable with zero new dependencies (design D-M) |

## Outcome

Group 1 status: **PASS**. All baseline text captured verbatim before any amendment.
