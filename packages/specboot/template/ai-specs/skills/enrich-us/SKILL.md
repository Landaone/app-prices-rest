---
name: enrich-us
description: Mandatory pre-proposal refinement gate. Enriches any work item (feature, bug fix, refactor, technical task, spike, or documentation change) with complete, implementation-ready technical detail from direct chat text, a screenshot, or a readable attachment, then hands the result to OpenSpec proposal generation.
author: LIDR.co
version: 2.0.0
---
# enrich-us Skill

`enrich-us` is this team's mandatory pre-proposal refiner. It runs **before** `opsx:propose` (Claude) / `opsx-propose` (Kiro) for every work item — it is not optional, and it is not limited to features: bug fixes, refactors, technical tasks, spikes, and documentation changes all pass through it too.

It is a **procedural quality gate and structured first review** — it is not `adversarial-review`, and it never substitutes for that independent, post-implementation check.

## Phase-1 input model (no Jira dependency)

Accept exactly one of these as the work item's source, in this order of preference:

1. **Direct chat text** — the user pastes or types the work item directly.
2. **Screenshot** — an image attached to the conversation containing the work item.
3. **Readable attachment** — an attached document or text artifact.

Do not require Jira MCP, automatic ticket retrieval, Jira write-back, or ticket-status transitions to function — these are a separately approved future phase, not implemented here. If a user explicitly references Jira (a ticket id/key, or "the one in progress") and a Jira MCP happens to be configured, that remains a historical/optional path, but never assume or request it by default.

If the input cannot be reliably read or extracted (an unreadable screenshot, a garbled attachment, a short reference with no content) — **ask the user for the missing text or clarification**. Never invent content to fill the gap.

## Instructions

1. **Determine the input source** using the Phase-1 model above.
2. **Act as a product expert with technical knowledge.** Understand the problem the work item describes.
3. **Inspect relevant repository technical context** (`docs/`, `ai-specs/`, and the affected code) needed to ground the enrichment in this project's actual stack and conventions.
4. **Identify what's missing**, across:
   - Scope and acceptance criteria
   - Edge cases
   - Affected interfaces/files
   - Testing expectations
   - Documentation impact
   - Security, performance, observability
   - Compatibility, migration, and operational concerns
5. **Separate three things explicitly** in the output — never blend them:
   - **Confirmed facts** — stated directly in the input or verified in the repository
   - **Inferred assumptions** — reasonable inferences, labeled as such
   - **Unresolved questions** — anything that must be asked, never assumed
6. **Never invent a material product or business decision.** If one is missing, record it as an unresolved question instead of guessing an answer.
7. **Preserve meaning; do not pad.** If the input already has full scope, acceptance criteria, and the other elements from step 4, keep it as-is (light editing only) rather than expanding it for its own sake.
8. **Produce the enriched Markdown artifact** with this structure:
   - `## Original` — the input as given
   - `## Enhanced` — the refined work item (scope, acceptance criteria, edge cases, affected files/interfaces, testing expectations, documentation impact, non-functional concerns)
   - `## Assumptions` — every inferred assumption from step 5, or "None"
   - `## Open Questions` — every unresolved question from step 5, or "None"
9. **Verify the staging path is ignored, then persist — or fail safely:**
   - Before writing anything to disk, verify `.specboot/staging/` is actually ignored: if this is a git repository, run `git check-ignore -q .specboot/staging/<slug>-enriched.md` and require exit status `0`; if this is not a git repository, or the check does not cleanly confirm ignored, treat the path as **not confirmed ignored**.
   - **If confirmed ignored:** persist the artifact to `.specboot/staging/<slug>-enriched.md`, where `<slug>` is a kebab-case derivation of the work item's title (append a numeric suffix if the file already exists, to avoid overwriting a prior run). This staged file is the durable, authoritative copy of the artifact — the chat output is a convenience copy of the same content, not a separate source of truth.
   - **If not confirmed ignored:** do **not** write the file. Report the missing one-time setup instead: "One-time setup missing: `.gitignore` does not ignore `.specboot/staging/`. Add the line `.specboot/staging/` to this project's `.gitignore` (the SpecBoot installer does this automatically on install/re-install), then re-run `enrich-us` to get a persisted, traceable artifact." Present the `## Enhanced` content in this chat response only — a chat-only artifact is the safe fallback, never a silently unignored file on disk.
10. **Return an explicit outcome:**
    - **`READY FOR PROPOSAL`** — no unresolved material question remains.
    - **`NEEDS CLARIFICATION`** — at least one unresolved material question remains; list them explicitly. Do not proceed to proposal generation until they are resolved (re-run `enrich-us` after clarification, or have the user confirm answers directly).
11. **On `READY FOR PROPOSAL`, state the exact next action:**
    > Next: run `/opsx:propose` (Claude) / `/opsx-propose` (Kiro) in this same conversation. When it asks what you want to build, provide the `## Enhanced` content above (also saved at `.specboot/staging/<slug>-enriched.md`, if the staging path was confirmed ignored) as the work-item description — that is the authoritative input for proposal generation.
    >
    > If the staging path was confirmed ignored: after `opsx:propose`/`opsx-propose` creates the change directory, copy `.specboot/staging/<slug>-enriched.md` into it as `enriched-work-item.md` for traceability. This is a manual step you (or the agent) perform — it does not modify `opsx:propose`/`opsx-propose` itself. If it was not confirmed ignored, no staged file exists to copy — resolve the one-time setup reported in step 9 and re-run `enrich-us` first if traceability is needed.

## Notes

- Jira is named here only as a historical or future-phase option — never as a currently required or currently recommended path.
- This skill produces the artifact `opsx:propose`/`opsx-propose` consumes; it does not create the OpenSpec change itself, and it does not read or write `.claude/commands/opsx/propose.md` / `.kiro/prompts/opsx-propose.prompt.md`.
- If the user gives a short reference with no real content (for example, only a ticket id and no Jira access), ask for the full work-item text rather than guessing.
- The ignored-path check in step 9 is a safety guard, not an optimization to skip when inconvenient — never write to `.specboot/staging/` without first confirming it is ignored.
- If your project uses a different OpenSpec workflow-command naming than `opsx:propose`/`opsx-propose`, substitute your own client's propose/new-change command in step 11 — check your installed OpenSpec CLI's own command list rather than assuming this exact name.
