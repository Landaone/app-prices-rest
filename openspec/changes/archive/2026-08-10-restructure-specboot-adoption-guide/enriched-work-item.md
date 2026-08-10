# Enriched Work Item — Restructure `SPECBOOT_ADOPTION_GUIDE.md` into a Human- and Agent-Executable Guide Set

## Original

> Tengo esta guía `SPECBOOT_ADOPTION_GUIDE.md` y necesito mejorarla para que pueda ser utilizada por una persona o por una IA para realizar el proceso completo de adopción de SpecBoot. Me parece que mantener todo el contenido en un único archivo tan extenso podría no ser óptimo; evalúa esta hipótesis y determina, con base en la estructura y el contenido actuales, cuál sería la organización más usable y mantenible.

(Translated for the English-only requirement of `docs/documentation-standards.md` / `CLAUDE.md` §2: "I have this `SPECBOOT_ADOPTION_GUIDE.md` guide and I need to improve it so it can be used by a person or by an AI to perform the complete SpecBoot adoption process. Keeping all the content in a single, very long file may not be optimal; evaluate that hypothesis and determine, based on the current structure and content, the most usable and maintainable organization.")

---

## Enhanced

### Problem statement

`SPECBOOT_ADOPTION_GUIDE.md` is the repository's operational source for SpecBoot adoptions, but it is not reliably executable end-to-end by either audience it targets:

- **For a human operator**, the live procedure is interleaved with historical prompts, reference-run evidence from one Java/Maven repository, permission policy, and troubleshooting — so following it top-to-bottom means repeatedly skipping non-executable material.
- **For an AI agent**, there is no uniform per-step contract, no stable step identifier, no explicit resume/state mechanism, and no instruction on what to load. An agent must ingest ~87 KB to execute any single step, and each step's shape varies (some have `Expected result` + `Common failures`, others `Checks` + `Commands`, others `Checklist`), so step handling cannot be generalized.

### Verdict on the user's hypothesis

**The hypothesis is correct, but for a secondary reason.** File length (2,045 lines / 87,106 bytes / ~11,786 words) is a symptom. The primary defect is that **four documents with different consumption modes, lifecycles, and update triggers are fused into one file**:

| Document type | Current location | Lifecycle |
|---|---|---|
| **A. Reusable procedure** — the executable path | §1–§17 (~1,240 lines) + §18 (135 lines) | Changes when the adoption method changes |
| **B. Per-run evidence capture** — 20 `Live validation record` fill-in blocks + §21's `Clean-run status` column | Embedded inside every section | Changes on **every run**, per repository |
| **C. Historical record** — §20 prompt inventory, relocated verbatim prompts, per-section `Reference outcome` blocks | §20 (124 lines) + scattered | Append-only; must never be edited (§22: "Prompt labeled verbatim was changed") |
| **D. Support material** — §19 permission policy, §22 troubleshooting, `Clean-Install Working Method`, `Final Acceptance Criteria` | §19 (85), §22 (137), closing (47) | Consulted on failure, not executed in sequence |

Type B in particular does not belong in a reusable document at all: the guide's own `Clean-Install Working Method` **already prescribes** five separate companion files (`SPECBOOT_ADOPTION_RUNBOOK.md`, `SPECBOOT_PROMPT_LOG.md`, `SPECBOOT_COMMAND_LOG.md`, `SPECBOOT_DECISION_LOG.md`, `specboot-terminal-session.log`), **none of which exist anywhere in this repository's git history** (confirmed by the archived `2026-08-07-consolidate-specboot-adoption-guide` change's own recorded evidence). The separation is already documented as intended and simply was never implemented.

A second structural argument, independent of length: §5 currently contains two steps with **opposite conditionality** — CodeGraph client configuration (skippable) and selected-client permission setup (unconditionally mandatory). The previous change had to defend that boundary with three separate prose warnings ("**never** skipped alongside", "unconditionally mandatory", "not uniformly skippable"). Splitting them into two files enforces structurally what prose currently enforces by repetition.

### Resolved decisions

Confirmed with the requester before proposal; these are settled inputs, not assumptions:

| # | Decision | Consequence |
|---|---|---|
| D1 | Split set lives at **`specboot-adoption/` in the repository root**, and is **not** added to the npm template | Stays outside `ai-specs/`, so `CLAUDE.md` §6 symlink-integrity obligations do not apply. `packages/specboot/package.json` `files: ["bin/","template/"]` is unchanged; the guide remains read-from-this-repo, as today |
| D2 | **Document set only** — no `ai-specs/skills/specboot-adopt/` skill | Change stays documentation-only. No symlink creation, no `sync-agent-symlinks` pass, no multi-agent exposure work. A skill remains a viable follow-up after the set is proven in a real run |
| D3 | **§18 shrinks to a pointer** at the canonical sources | Resolves the drift risk the archived change's `design.md` recorded as unsolved and deferred. Verified safe: `openspec/specs/specboot-verification-workflow/spec.md` (372 lines) already carries the gate semantics densely — `PASS WITH GAPS` ×14, `archive approval` ×8, `Blocker` ×16, `READY FOR PROPOSAL` ×4 — reinforced by `ai-specs/skills/specboot-verify/SKILL.md` and `ai-specs/skills/adversarial-review/SKILL.md`. No gate semantic is lost by pointing rather than transcribing |
| D4 | **Split and step contract land in one change** | Delivers the "executable by an AI" goal in one pass. Accepts harder fidelity verification, since prose is reshaped rather than only moved — mitigated by the mechanical verification plan below |

### Scope

Restructure the adoption guide from one file into a small, navigable document set, and add the per-step contract that makes it executable by an agent. **Content is relocated and reshaped, not rewritten**: no procedural rule, approval gate, validation criterion, or historical prompt is dropped, weakened, or invented.

#### In scope

1. **Split by consumption mode**, using a thin entry file that preserves the existing path so no external reference breaks:

```
SPECBOOT_ADOPTION_GUIDE.md              # ENTRY (path unchanged): scope, prompt-label conventions,
                                        # Happy Path 1 + 2, how-to-use-this-guide for humans AND agents,
                                        # step index, and a stable §-number -> file map for back-compat
specboot-adoption/
  00-conventions.md                     # cross-cutting rules every step assumes: prompt labels,
                                        # approval-gate protocol, PASS/FAIL evidence discipline
                                        # ("unexecuted or failed command is FAIL, never inferred PASS"),
                                        # shell-portability rule, capability-availability-vs-provisioning
  01-prerequisites-and-install.md       # current §1-§3      (~267 lines)
  02-codegraph.md                       # current §4 + §5 CodeGraph-specific content - CONDITIONAL (~150)
  03-client-permissions.md              # current §5's "Configure Selected-Client Permissions" - MANDATORY (~110)
  04-context-and-openspec.md            # current §6-§8      (~261)
  05-agents-and-skills.md               # current §9-§12     (~234)
  06-adapters-and-discovery.md          # current §13-§15    (~219)
  07-baseline-and-checkpoint.md         # current §16-§17    (~152)
  08-daily-workflow.md                  # current §18, REDUCED to a pointer (~25, was ~135)
  19-permissions-policy.md              # current §19        (~85)
  22-troubleshooting.md                 # current §22        (~137)
  history/
    prompt-inventory.md                 # current §20, including relocated VERBATIM blocks, byte-for-byte
    reference-run-java-maven.md         # every per-section "Reference outcome" + §21's clean-run column
  run-template/
    ADOPTION-RUN-LOG.template.md        # all 20 "Live validation record" blocks as one per-run artifact,
                                        # plus a step-state checklist for resume
```

   Rationale for phase-level grouping rather than one file per section: sections range from 24 to 185 lines; one file per section would produce 39-line files (§12) alongside 185-line files (§5). Grouping the adapt-then-validate pairs the guide already executes together (§9+§10, §11+§12, §13+§14) yields **~14 files of ~25–270 lines each** — small enough for an agent to load exactly one phase, large enough that a human reads a coherent unit.

2. **Impose a uniform per-step contract** on every executable step, replacing today's inconsistent subheadings (`Expected result` / `Common failures` in §1 vs. `Checks` / `Commands` in §10 vs. `Checklist` in §14):

```
### <STEP-ID> - <Title>
**Condition:** always | testable predicate for conditional steps
**Purpose:** ...
**Preconditions:** prior step IDs that must be PASS
**Action:** exact shell command(s) OR exactly one labeled canonical prompt
**Approval gate:** none | [HUMAN APPROVAL REQUIRED] before <specific mutation>
**Validation:** commands + explicit PASS criteria
**Evidence to record:** field list, matching the run-log template
**On failure:** link into 22-troubleshooting.md
```

3. **Introduce stable step IDs** decoupled from ordinal position (for example `ADOPT-01` … `ADOPT-17`), so a future insertion or reordering never invalidates a cross-reference, a run log, or an agent's resume state. Retain the existing §-numbers as aliases in the entry file's map.

4. **Add an explicit agent-execution preamble** to the entry file stating: load `00-conventions.md` plus the single phase file for the current step — do not load the whole set; never self-approve an `[HUMAN APPROVAL REQUIRED]` gate (11 such gates exist today); record evidence into the run log after each step; treat an unexecuted or failed command as FAIL.

5. **Make conditional steps machine-decidable.** Today CodeGraph's conditionality is prose spanning §4, §5, Happy Path 1, and §21. Replace with one decision node carrying a testable predicate and a recorded operator decision, referenced by both conditional files.

6. **Extract per-run evidence** (the 20 `Live validation record` blocks, the `Live permission record`, and §21's `Clean-run status` column) into `ADOPTION-RUN-LOG.template.md`, leaving each step with only a pointer to the fields it must fill. §21's reference-run PASS values move to `history/reference-run-java-maven.md`, preserving the existing caveat that a future run must re-earn PASS rather than inherit it.

7. **Reduce §18 to a pointer** (per D3): `08-daily-workflow.md` keeps the six-capability sequence as an ordered list and the "this is a separate workflow from one-time adoption" framing, then directs the reader to `ai-specs/specboot-instructions.md` and `openspec/specs/specboot-verification-workflow/spec.md` as the canonical, non-duplicated source of gate semantics. Happy Path 2 stays in the entry file as the at-a-glance sequence. The `PENDING END-TO-END VALIDATION` status marker is preserved.

8. **Repair every reference**, internal and external:
   - 32 internal anchor links (`](#…)`) across 25 distinct targets must be rewritten to cross-file links and verified to resolve.
   - External referencing files, all of which cite the guide **by section number**: `README.md:101` (§2, §13), `ai-specs/specboot-instructions.md:101,177` (§2, §13, §5 subsection, §19), `packages/specboot/template/ai-specs/specboot-instructions.md:101,177` (same), `packages/specboot/bin/init.js:160` (by filename only). The two `specboot-instructions.md` copies currently differ only by one image URL (line 204) and must be updated in lockstep.

9. **Preserve `HISTORICAL PROMPT — VERIFIED VERBATIM` blocks byte-for-byte** through relocation, per §22's own "Prompt labeled verbatim was changed" rule, and verify fidelity by diffing relocated text against `git show HEAD:SPECBOOT_ADOPTION_GUIDE.md`.

#### Out of scope

- Executing a live adoption run against this or any other repository.
- Changing any adoption **procedure**, approval boundary, validation criterion, or gate semantic. This is a restructuring, not a methodology revision.
- Creating an `ai-specs/skills/specboot-adopt/` skill, any client symlink, or any multi-agent exposure work (D2).
- Adding the guide to `packages/specboot/template/` or changing `packages/specboot/package.json` (D1).
- Modifying application source/tests, `ai-specs/agents/*`, `ai-specs/skills/*`, client adapters/symlinks, `openspec/config.yaml`, `.gitignore`, or any real permission file (`.claude/settings.json`, `.kiro/settings/permissions.yaml`).
- Adding stack-specific (Lovable, Java, Node) special cases — the guide stays evidence-driven and stack-neutral.
- Staging, committing, pushing, or archiving.

### Acceptance criteria

1. `SPECBOOT_ADOPTION_GUIDE.md` still exists at the repository root and functions as the entry point; no external reference to it breaks.
2. Every one of the current 22 sections plus the four front-matter blocks and two closing blocks is accounted for in the new set — verified by an explicit source-section → destination-file mapping table produced during implementation, with zero unmapped sections.
3. No working file exceeds ~300 lines.
4. Every executable step conforms to the uniform step contract in scope item 2, with a stable step ID.
5. All 11 `[HUMAN APPROVAL REQUIRED]` gates survive relocation, each still attached to the specific mutation it guards.
6. All 20 `Live validation record` blocks (plus the permission record) appear exactly once, in the run-log template, and nowhere else.
7. Every `HISTORICAL PROMPT — VERIFIED VERBATIM` block is byte-identical to its pre-edit source, proven by diff against `git show HEAD:SPECBOOT_ADOPTION_GUIDE.md`.
8. Every internal link resolves (no dangling anchors, no links to removed headings), verified mechanically, not by inspection.
9. CodeGraph conditionality is expressed once, as a decision node with a testable predicate; the selected-client permission step is a separate file and is not reachable by any "skip CodeGraph" path.
10. `08-daily-workflow.md` names all six capabilities in order and preserves the `PENDING END-TO-END VALIDATION` marker, while stating no gate semantic that is not already in a linked canonical source.
11. `README.md`, both copies of `ai-specs/specboot-instructions.md`, and `packages/specboot/bin/init.js` point at correct, existing locations.
12. Both `specboot-instructions.md` copies remain in sync except for their known image-URL difference at line 204.
13. All content is in English.
14. `git diff --stat` shows changes confined to the guide, the new `specboot-adoption/` set, and the reference-repair files listed in scope item 8 — with `packages/specboot/package.json`, `.gitignore`, and every permission file provably unchanged.

### Edge cases

- **Anchor drift**: a `##`-level heading that becomes `#`-level in its new file silently changes its anchor. Every moved heading's anchor must be re-derived, not assumed.
- **Duplicate headings across files**: `### Validation`, `### Expected result`, `### Live validation record`, and `### Common failures and recovery` repeat many times today; once split, identical headings in *different* files are fine, but any *within-file* duplicate breaks anchor uniqueness.
- **Partial-read failure mode**: an agent that loads only a phase file loses the cross-cutting rules. Mitigated by requiring `00-conventions.md` alongside every phase file, and by each phase file opening with a one-line "read `00-conventions.md` first" directive.
- **Pointer-reduction over-reach (§18)**: shrinking §18 must not silently drop the *ordering* and *blocking* semantics an adopter needs at a glance (enrich-us blocks on `NEEDS CLARIFICATION`; both gates plus explicit human approval precede archive). Keep those as the summary; point out only the detailed transcription.
- **Guide truncation during the edit** — §22's own documented failure mode ("Large documentation write truncates or replaces content"). Apply that section's recovery procedure reflexively: physically verify each file after writing (`wc -l`, heading list, tail check) rather than trusting an edit tool's success signal.
- **Kiro/Windows path handling**: the guide already flags native Windows shell portability as pending; the split must not introduce OS-specific path syntax in links.
- **Run-log placement vs. `.gitignore`**: the *template* is committed under `specboot-adoption/run-template/`. A *filled* run log is a per-run artifact; the guide documents both committing it as adoption evidence and keeping it local, and does not change `.gitignore` (which today ignores `.specboot/staging/` specifically, not `.specboot/` broadly).

### Affected files and interfaces

| File | Change |
|---|---|
| `SPECBOOT_ADOPTION_GUIDE.md` | Reduced to entry/index/conventions pointer; path preserved |
| `specboot-adoption/**` (new) | New document set, ~14 files |
| `README.md:101` | Section-number references repointed |
| `ai-specs/specboot-instructions.md:101,177` | Section-number references repointed |
| `packages/specboot/template/ai-specs/specboot-instructions.md:101,177` | Same, kept in sync |
| `packages/specboot/bin/init.js:160` | Console message references the guide by filename — verify still correct (expected: no change needed) |

### Testing and verification expectations

No automated test suite covers documentation. Verification is mechanical and must be scripted, not eyeballed — this matters more than usual because D4 reshapes prose rather than only moving it:

- Source-section → destination-file mapping table with zero unmapped sections.
- Link checker over the new set: every relative link and anchor resolves.
- `git show HEAD:SPECBOOT_ADOPTION_GUIDE.md` diff for every `VERIFIED VERBATIM` block.
- Grep counts before/after for invariants: `HUMAN APPROVAL REQUIRED` (11), `Live validation record` + `Live permission record` (20), `HISTORICAL PROMPT — VERIFIED VERBATIM`, `CANONICAL CONSOLIDATED PROMPT`, `CANONICAL REUSABLE PROMPT`.
- Word-count reconciliation: total across the new set ≈ 11,786 words, minus the deliberate §18 reduction and de-duplication, with any remaining delta explained rather than absorbed.
- Provable non-change: `git diff --exit-code` on `packages/specboot/package.json`, `.gitignore`, `.claude/settings.json`, `.kiro/settings/permissions.yaml`, `openspec/config.yaml`, `ai-specs/agents/`, `ai-specs/skills/`.
- **Agent dry-run**: a fresh session given only the entry file must correctly identify the first step, its approval gate, and which file to load next — the direct test of the "usable by an AI" requirement, and the only acceptance criterion that tests the actual goal rather than the mechanics.
- `mvn -o test` baseline is unaffected (documentation-only) but should be confirmed unchanged before the checkpoint.

### Documentation impact

The change *is* documentation. Beyond the files above, `docs/documentation-standards.md` may warrant a short note on the entry-file + phase-files pattern if this becomes the repository's convention for long operational documents — a judgment call for the proposal, not a requirement.

### Non-functional concerns

- **Maintainability** (the user's explicit criterion): today a workflow-semantics change touches §18, §20, §21, and Happy Path 2 in one file. After the split, each concern has one home, and D3 removes the largest remaining duplication against the canonical workflow sources.
- **Merge-conflict surface**: one 2,045-line file conflicts on any concurrent edit; phase files localize conflicts.
- **Agent context cost**: currently ~22–25k tokens to read any step; after the split, ~2–4k (conventions + one phase).
- **Discoverability regression risk**: a single file is greppable in one place and shareable as one link. Mitigated by the entry file's index plus the §-number → file map.
- **`git log --follow` continuity**: preserved for the entry file by keeping its path; new files start fresh history, which is acceptable and expected.
- **Security**: no credentials, machine paths, or permission files are touched. The illustrative Kiro YAML block moves verbatim into `03-client-permissions.md`; the real `.kiro/settings/permissions.yaml` is untouched.

---

## Assumptions

1. **Documentation-only change.** No application code, canonical agent, canonical skill, adapter, symlink, OpenSpec config, `.gitignore`, or real permission file is modified — except the reference-repair files explicitly listed, whose edits are limited to pointer/path corrections.
2. **Content preservation over rewriting.** Every procedural rule, approval gate, validation criterion, historical prompt, and reference-run data point survives; wording changes only where the uniform step contract requires reshaping, and where D3 replaces a transcription with a pointer. Nothing is invented.
3. **English-only deliverable**, despite the request being written in Spanish.
4. **Step numbering semantics 1–22 are preserved as aliases**, because three external files cite them by number; only the physical file boundaries change.
5. **Section-number back-compatibility policy**: update all external references to the new locations **and** keep a permanent §-number → file map in the entry file for at least one release. Low-stakes and reversible; flagged rather than escalated.
6. **Run-log lifecycle**: the template is committed; a filled run log's fate (committed as adoption evidence vs. kept local) is documented as an operator/team choice inside the guide, not enforced by this change and not encoded in `.gitignore`.
7. **Entry filename `SPECBOOT_ADOPTION_GUIDE.md` is retained** at the root — the lowest-risk option, since `packages/specboot/bin/init.js:160` prints it by name to every installer user.
8. **Both `specboot-instructions.md` copies are updated together**; their single known difference (image URL, line 204) is preserved deliberately.
9. **This change is executed through the repository's own workflow** — `opsx:propose` → `opsx:apply` → `specboot-verify` → independent `adversarial-review` → explicit human approval → `opsx:archive` — i.e. the guide's own six-capability sequence is dogfooded on the guide itself.
10. **Verification is mechanical.** Because there is no test suite for documentation, every acceptance criterion above is written to be checkable by a command rather than by reading.

---

## Open Questions

None. The four material questions (set location and npm distribution; document set vs. invocable skill; §18 duplication; single-change vs. split-then-contract) were resolved with the requester and are recorded under **Resolved decisions**. The two remaining lower-stakes choices — section-number back-compatibility policy and filled-run-log lifecycle — are recorded as Assumptions 5 and 6 with their trade-offs stated, and can be overridden during proposal review without changing the shape of the work.

---

## Outcome

**READY FOR PROPOSAL**
