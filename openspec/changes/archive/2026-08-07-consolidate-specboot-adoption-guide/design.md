## Context

`SPECBOOT_ADOPTION_GUIDE.md` is 1,953 lines: a `Prompt Label Conventions` table, `Happy Path 1` (one-time adoption), `Happy Path 2` (daily workflow, marked `PENDING END-TO-END VALIDATION`), a Table of Contents, 22 numbered sections, and closing "Clean-Install Working Method" / "Final Acceptance Criteria" material. See `proposal.md` for why this needs to change. This document covers how.

Two structural facts shape every decision below:

- Sections 8, 9, 11, and 13 already show the target shape: exactly one `CANONICAL CONSOLIDATED PROMPT` in the live path, with any reference-run detail isolated under a separately headed `### Reference outcome` subsection. Sections 6, 7, and 15 are the outliers, still showing `### Historical prompt` immediately followed by `### Consolidated prompt for the clean run` inline in the same numbered section.
- Section 20 already contains a `### Historical prompt chains not recovered verbatim` subsection listing 22 named correction chains, with the explicit statement that they "are excluded from the clean reusable execution path and never appear as commands a clean adoption should execute in sequence." This mechanism already exists; it does not need to be invented.

## Goals

- Make every one-time-adoption section (1–17) match the single-consolidated-prompt shape Sections 8/9/11/13 already use.
- Make the daily workflow (`Happy Path 2`, §18, §20, §21) name and sequence the six current workflow capabilities, with gate semantics transcribed from — not re-derived from — the canonical sources.
- Close the smaller, evidence-confirmed gaps (Kiro permission YAML, CodeGraph gating, installer-provenance cross-reference) without expanding into work already deferred elsewhere.

## Non-Goals

- Executing a live adoption run against any repository, including a future Lovable-generated one.
- Adding any Lovable-specific (or other named-stack-specific) discovery hint, example, or special case. The guide must remain generic; a Lovable repository is handled the same way any other unfamiliar stack already is, through Section 1's existing evidence-inspection list.
- Implementing Kiro provisioning in `packages/specboot/bin/init.js` (`make-specboot-installer-client-aware`) or permission-prompt-efficiency work (`harden-shared-client-permissions`) — both already recorded as separate future changes by the archived `reconcile-specboot-workflow` change.
- Re-architecting the guide's overall section structure, numbering, or its historical/troubleshooting mechanism (Section 20/22) — this change extends that existing mechanism, it does not replace it.

## Decisions

### D1 — Relocate historical prompts into Section 20's existing framework, not a new section

**Decision**: Move Sections 6, 7, and 15's inline historical-prompt text (and, for Section 15, the "Observed Kiro result" correction narrative) into Section 20's existing "Historical prompt chains not recovered verbatim" subsection (or an equivalent, clearly non-executable historical entry immediately alongside it), cross-referenced by name from the section it came from. Each relocated `HISTORICAL PROMPT — VERIFIED VERBATIM` block is preserved byte-for-byte.

**Alternatives considered**:
- *Leave the historical prompt inline, only re-labeled more emphatically.* Rejected: it still leaves a reader following Sections 6/7/15 top-to-bottom in a different position than a reader following Sections 8/9/11/13, and the request explicitly asks that corrective chains "not appear as sequential steps in the clean execution path" — inline-but-relabeled is a smaller change but doesn't fully resolve that.
- *Create a brand-new "Historical Prompts Appendix" section.* Rejected: Section 20 already exists for exactly this purpose and already holds 22 other named chains; a second, parallel mechanism would fragment the guide's existing historical record instead of extending it, and would require renumbering or awkward insertion, which the request asks to avoid absent clear justification.
- *Delete the historical prompts entirely, keeping only the consolidated prompt.* Rejected: the request explicitly requires preserving historical failures/corrections/lessons, only relocated to a labeled section, not discarded — and Section 22 ("Prompt labeled verbatim was changed") already warns against losing or altering `VERIFIED VERBATIM` text.

### D2 — Author the six-capability content from canonical sources, not from the archived change's narrative

**Decision**: Every gate-semantics or workflow-capability statement newly added to `Happy Path 2` / §18 is transcribed from `ai-specs/specboot-instructions.md`, the three canonical skill files (`enrich-us`, `specboot-verify`, `adversarial-review`), and `openspec/specs/specboot-verification-workflow/spec.md` — never re-derived independently, and never copied from the archived `reconcile-specboot-workflow` change's `proposal.md`/`design.md`/`tasks.md`.

**Alternatives considered**:
- *Re-derive the six-capability sequence and gate wording independently from first principles.* Rejected: the canonical text already exists, is already correct, and independent re-derivation risks silent drift or reintroducing a mistake the canonical sources have already fixed.
- *Copy directly from the archived change's proposal/design narrative.* Rejected: that narrative spans 16 correction groups and contains several intermediate, since-corrected claims (e.g., an early, retracted "OpenSpec 1.7 dropped verify" statement, and a Claude command adapter `/specboot:verify` that was created and later removed) — it documents *how* the current state was reached, including its own mistakes, not the current state itself.

### D3 — Cross-reference the installer-provenance distinction rather than duplicate it

**Decision**: At each point the guide discusses client selection/adapter creation (Sections 2, 3, 5, 13), add a short cross-reference to `ai-specs/specboot-instructions.md`'s existing "Installer Scope: Claude/Cursor Provisioning Only (Kiro Configured Separately)" note, plus a one-line instruction in the relevant live-validation-record field to record actual per-client provisioning provenance observed during that adoption.

**Alternatives considered**:
- *Duplicate the full installer-scope explanation inline in the guide.* Rejected: creates a second copy that can drift from the canonical note if the installer's provisioning behavior changes again (as it already has once, per the archived change's Group 13 correction).
- *Leave the guide silent on this distinction.* Rejected: the guide's Section 13 already treats client selection as evidence-driven, and the six-capability content this change adds discusses `specboot-verify`'s own availability-vs-provenance check (Step 5) — leaving the guide silent here would make it inconsistent with content this same change is adding.

### D4 — Frame CodeGraph as a skippable decision point, without renumbering, and without over-scoping the skip to Section 5's permission content

**Decision**: Section 4 ("Initialize CodeGraph") is skippable *in its entirety* when CodeGraph is not being adopted for the target repository, matching this repository's own `.claude/CLAUDE.md` guidance ("If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision"). Section 5 is **not** uniformly skippable: only its CodeGraph-specific content (the `codegraph install` procedure and its client-configuration table/rules/validation) is conditional on the same CodeGraph decision. Section 5's `### Configure Selected-Client Permissions (Early, One-Time)` subsection is a separate, unconditionally mandatory step — first-time permission setup for every selected client — and remains required regardless of whether CodeGraph is adopted. `Happy Path 1`'s CodeGraph-related lines (`→ initialize CodeGraph`, `→ configure CodeGraph for selected clients`) get a conditional marker; its permission-configuration line does not. No section is renumbered or moved.

**Alternatives considered**:
- *State that Sections 4 and 5 can both be skipped entirely when CodeGraph is not adopted.* Rejected (this was the original, incorrect framing, corrected here): Section 5 contains the mandatory selected-client permission setup, which has no dependency on CodeGraph — skipping "Section 5 entirely" would incorrectly suggest permission configuration itself is optional, which it is not.
- *Move CodeGraph into a new, separate "optional steps" section.* Rejected: restructures the guide's 1–22 numbering for a framing change that doesn't require it, contradicting "preserve the guide's major 1–22 section structure unless a change is clearly justified."
- *Leave CodeGraph as an unconditional step.* Rejected: directly contradicts this repository's own root instruction file and would mislead an operator adopting a repository where CodeGraph is not desired.

### D5 — Patch the guide's illustrative Kiro YAML, not the real permission file

**Decision**: Add `openspec status *` and `git check-ignore *` (or equivalent) entries to the Kiro permission YAML **code block inside `SPECBOOT_ADOPTION_GUIDE.md`, Section 5** — an illustrative example for future adopters — not to this repository's actual `.kiro/settings/permissions.yaml`.

**Alternatives considered**:
- *Also update this repository's real `.kiro/settings/permissions.yaml`.* Rejected: out of scope for a guide-only change per the explicit request ("do not modify... permissions... as part of this guide-only change"); this repository's own Kiro file is a separate, already-governed artifact with its own review process.

## Risks / Trade-offs

- **Accidental historical-prompt replay** → relocating Sections 6/7/15's historical blocks could leave a stray duplicate behind, or subtly alter `VERIFIED VERBATIM` text during the move. Mitigation: byte-for-byte comparison of the relocated text against its pre-edit source as an explicit task step, plus a post-edit grep confirming no live numbered section still shows a historical prompt without an adjacent-and-only consolidated prompt.
- **Stack assumptions leaking into new content** → the six newly authored workflow-capability prompts are new text, not edits to already-stack-neutral existing content, so they carry a higher risk of accidentally encoding this repository's own Java/Maven/Spring Boot specifics (the only concrete example available while writing). Mitigation: ground every new prompt in the already-generic canonical sources (`ai-specs/specboot-instructions.md`, the skill files) rather than this repository's `openspec/config.yaml` context block.
- **Guide truncation/corruption** → the file is 1,953 lines; a careless large write could truncate or silently replace content, exactly the failure mode Section 22 already documents ("Large documentation write truncates or replaces content"). Mitigation: targeted edits only; verify physically before and after each edit (line count, heading list, tail) per that section's own existing recovery procedure, applied reflexively to editing the guide itself.
- **Divergence from canonical workflow sources** → the six-capability content must stay synchronized with `ai-specs/specboot-instructions.md` and the canonical spec as of this change; if those are edited again afterward, the guide could re-drift. Out of scope to solve structurally here (for example via a shared-source/include mechanism); flagged as a maintenance risk for a future change, not a defect in this one.
- **Permission-YAML edit crossing into real permission configuration** → D5's edit is confined to an illustrative code block inside the guide; the risk is an implementer conflating that block with the real `.kiro/settings/permissions.yaml` file during editing. Mitigation: explicit task-level scoping and a post-edit check that `.kiro/settings/permissions.yaml` is byte-unchanged.
- **Scope creep into deferred future changes** → touching Sections 2/3/5/13 (installer provenance) or Section 19 (permissions) risks pulling in `harden-shared-client-permissions` or `make-specboot-installer-client-aware` work. Mitigation: each task below is scoped to a cross-reference/documentation edit only, with an explicit non-goal statement above.

## Migration Plan

No migration — this is a documentation-only edit to a single Markdown file with no runtime component. Rollout is: implement the targeted edits, run this change through the repository's own six-capability workflow (`specboot-verify` → independent `adversarial-review` → explicit human approval → archive), then archive. No rollback mechanism beyond normal Git revert is needed, since nothing outside `SPECBOOT_ADOPTION_GUIDE.md` and this change's own OpenSpec artifacts changes.

## Open Questions

- Most candidates that could have been raised here — where to relocate historical prompts, whether a delta spec is needed, whether to add Lovable-specific content — are each resolved above by an existing repository convention (Section 20's existing mechanism, `openspec/config.yaml`'s own `skip_specs` rule, and the request's own explicit stack-neutral mandate), not left as deferred unknowns.
- **Future governance item (recorded, not implemented here):** `docs/openspec-tasks-mandatory-steps.md` currently has no documentation-only or `skip_specs`-aware exception, and its report-path convention (`specs/<change-name>/reports/`) assumes every change has a `specs/` directory, which this `skip_specs: true` change does not. `tasks.md` Group 10 works around this by placing its unit-test/database-verification report at `openspec/changes/<change-name>/reports/` directly. This is safely deferrable: it does not change this change's specs, approach, or task breakdown, but a future change should consider making the mandatory task-group rules change-type-aware (e.g., an explicit documentation-only/`skip_specs` profile) and reconcile the report-path convention accordingly.
