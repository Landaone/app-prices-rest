# Invariant and Word-Count Reconciliation (Tasks 10.3–10.5)

**Re-run 2 — against the corrected guide (post-D12/D13).** The first run of this suite
validated a guide state that the attempt-1 remediation changed. Every count below is
re-derived, not carried forward. Deltas introduced by the remediation are listed in the
final section.

Raw string counts are not expected to match one-for-one across a restructure that adds
navigation and a step contract. Every delta below is explained; none is absorbed silently.

## Task 10.5 — the 11 approval gates, mapped 1:1

All 11 pre-edit occurrences survive, each still attached to the mutation it guarded.

| # | Pre-edit (source line) | Mutation guarded | Post-edit location |
|---|---|---|---|
| 1 | 46 | (explanatory — Happy Path 1 note) | `SPECBOOT_ADOPTION_GUIDE.md:137` |
| 2 | 159 | installing or upgrading software | `01-prerequisites-and-install.md:77` (`ADOPT-01`) |
| 3 | 205 | global installation or upgrade | `01-prerequisites-and-install.md:137` (`ADOPT-02`) |
| 4 | 304 | repository-local writes | `01-prerequisites-and-install.md:236` (`ADOPT-03`) |
| 5 | 386 | software installation | `02-codegraph.md:74` (`ADOPT-04`) |
| 6 | 468 | project-local configuration changes | `02-codegraph.md:144` (`ADOPT-05`) |
| 7 | 533 | creating/broadening the shared permission file | `03-client-permissions.md:178` (`ADOPT-05B`) |
| 8 | 692 | accepting documentation changes | `04-context-and-openspec.md:76` (`ADOPT-06`) |
| 9 | 1160 | adapter plan, before any directory or symlink | `06-adapters-and-discovery.md:56` (inside the canonical prompt, byte-identical) |
| 10 | 1192 | creating symlinks or modifying client directories | `06-adapters-and-discovery.md:88` (`ADOPT-13`) |
| 11 | 1458 | creating the local commit | `07-baseline-and-checkpoint.md:156` (`ADOPT-17`) |

**Result: 11/11 preserved, each still bound to its specific mutation. PASS.**

## Why the raw count is 20, not 11

| Category | Count | Detail |
|---|---|---|
| Preserved gates (table above) | 11 | unchanged in meaning; all 11 `file:line` references re-derived against the final tree (task 10.5) |
| Explanatory mentions (navigation + human operating model) | 6 | entry file's agent/human instructions, human operating model, and orientation table (**4** — `SPECBOOT_ADOPTION_GUIDE.md` lines 21, 31, 71, 112); `00-conventions.md`'s step-contract field definition and gate semantics (**2** — lines 64, 125). **All six re-derived (AR7), not only the two that were stale**: 102 was a horizontal rule and 77 unrelated prose. Reproduce with `grep -rn 'HUMAN APPROVAL REQUIRED' SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/` and subtract the 11 preserved gates, the 2 formalized, and the 1 from D13 |
| **Formalized from existing prose requirements** | 2 | see below |
| **New gate from D13 remediation** | 1 | renewed approval before reinstall or environment mutation, in `22-troubleshooting.md`'s "OpenSpec command not found" entry (line 88) |
| **Total** | **20** | +1 explanatory mention in the entry file's human operating model (D15) |

### The two formalized gates — a presentation change, recorded deliberately

The step contract requires every step to state an `Approval gate` value. Two steps carried an
explicit approval requirement in prose but no `[HUMAN APPROVAL REQUIRED]` marker. Writing
`none` would have contradicted the source text, so the existing requirement was stated using
the standard marker:

1. **`ADOPT-16`** (`07-baseline-and-checkpoint.md:78`) — before removing or relocating
   generated build output. Source §16: "obtain explicit approval and prefer moving the
   generated output to a recoverable location over deleting it".
2. **`ADOPT-09`** (`05-agents-and-skills.md:81`) — before removing or replacing an existing
   agent. Source §22, "Agent overwrites another stack, or a new agent is too narrow": "only
   after explicit human approval, remove it and create the replacement".

Neither adds a new approval requirement; both make an existing one machine-detectable in the
same format as the other 11. Recorded here because the invariant check exists precisely to
surface changes like this rather than let them pass unnoticed.

## Task 10.3 — other invariants

| Invariant | Pre | Post | Explanation |
|---|---|---|---|
| Record blocks | 20 | 20 | All 20 in `run-template/ADOPTION-RUN-LOG.template.md`, each exactly once, nowhere else. **PASS.** |
| `LIVE VALIDATION REQUIRED` | 1 | 1 | Unchanged. |
| `HISTORICAL PROMPT — VERIFIED VERBATIM` (labeled blocks) | 4 | 4 | Each byte-identical, each appearing exactly once — proven in `verbatim-fidelity.txt`. |
| `HISTORICAL PROMPT — VERIFIED VERBATIM` (string mentions) | 10 | 12 | 4 labels + inventory table rows, plus 2 new explanatory mentions in `history/prompt-inventory.md`'s header and the relocation note, and the `00-conventions.md` label table. |
| `CANONICAL CONSOLIDATED PROMPT` | 9 | 10 | +1: `ADOPT-05B` now presents a consolidated smoke-test prompt where the source presented a historical one (see `followup-candidates.md` item 1). |
| `CANONICAL REUSABLE PROMPT` | 13 | 7 | −6: the six per-capability labels in §18 are gone with the pointer reduction (design D6). The six inventory table rows in §20 survive in `history/prompt-inventory.md`, plus one prose mention. Fully accounted for. |

## Remediation deltas (re-run 2)

Changes introduced by the D12/D13 fixes after attempt 1, over and above the original
restructure:

| Invariant | Run 1 | Run 2 | Cause |
|---|---|---|---|
| `HUMAN APPROVAL REQUIRED` | 18 | **19** | +1: D13's renewed-approval gate before reinstall or environment mutation. This is a genuinely new gate, not a relocation — the pre-restructure guide had no recovery for this failure at all, so it had no gate to preserve. It guards an environment mutation of exactly the class `ADOPT-01`/`ADOPT-02` already gate. |
| Troubleshooting entries | 17 | **18** | +1: "OpenSpec command not found". The other 17 remain byte-preserved from §22. |
| Relative links | 97 | **104** | +7: D12's working-set links in the entry file and `00-conventions.md`; D13's pointers from `ADOPT-08` and the new entry; `ADOPT-17`'s four named entries replacing a generic pointer. |
| Record blocks | 20 | 20 | unchanged |
| Word count | 15,216 | **15,988** | +772: the working-set section (~180), the troubleshooting entry (~400), the `ADOPT-08` and `ADOPT-17` pointer expansions (~120), and the mapping's net-new section is outside the guide corpus. |

`ADOPT-17`'s pointer expansion was **not** part of the requested remediation — it was found by
task 5.6's audit, which checked every step's `On failure` pointer rather than only `ADOPT-08`'s.
It had a generic pointer to `22-troubleshooting.md` naming no entry, the same defect class D13
addresses. Recorded here rather than left silent.

## Re-run 3 — after the D14/D15/D16 human operating model and D17 permission provisioning

| Invariant | Run 2 | Run 3 | Cause |
|---|---|---|---|
| `HUMAN APPROVAL REQUIRED` | 19 | **20** | +1: an explanatory mention in the entry file's plain-language human operating model ("They are marked `[HUMAN APPROVAL REQUIRED]`"), required by D15's role model. Not a new gate — the 11 real gates are unchanged and still bound to their mutations. |
| Record blocks | 20 | 20 | unchanged |
| Troubleshooting entries | 18 | 18 | unchanged |
| Relative links | 104 | **107** | +3: the person-section link to the plain-language model, and `ADOPT-03`'s two links to `03-client-permissions.md` and `00-conventions.md` |
| Prompt-label classes | 10 / 7 / 1 | 10 / 7 / 1 | unchanged |
| Word count | 15,988 | **17,566** | +1,578: human operating model (~700), `ADOPT-05B` provisioning Steps 1–5 (~600), run-log `ADOPT-05B` evidence fields (~200), `ADOPT-03` import-relationship paragraph (~80) |

**Task 10.9 — agent-evidence regression: PASS.** All seven protected fragments are
byte-identical after these edits: agent preamble, three-file working set statement, step index,
§-number map, all 18 `On failure` pointers, `ADOPT-05B`'s unconditionally-mandatory statement,
and the run log's step-state table. The human operating model was inserted **after** the agent
preamble and before "Where to start", and the `ADOPT-05B` work touched only its `Action`,
PASS-criteria, and `Evidence to record` blocks. Agent tasks 16.1–16.7 and 16.16 therefore remain
valid; the agent gate does not reopen.

Two fragments flagged on the first extraction pass and were re-checked with a sound method
before the verdict was recorded: the agent-preamble extraction had used a hardcoded end-heading
that the new section displaced, and the `On failure` extraction had used a fixed `grep -A6`
context window that shifted when the two edited files grew. Re-extracted per-step and per-field,
both proved unchanged — the flags were measurement artifacts, not content drift.

## Verification findings VF1–VF5

Five Minor findings were raised by a canonical `/specboot-verify` run against this change and
corrected in the reports below. The IDs are recorded here so every `VF` reference in this
change resolves without the originating session's transcript.

**Namespace note.** Three prefixes are in use and never overlap. `F1`–`F5` are reserved for the
five pre-restructure front-matter blocks in `section-mapping.md`. `VF` marks findings raised by a
canonical `/specboot-verify` run. `AR` marks findings raised by an independent
`/adversarial-review`. **`RF` marks a Reproducibility Finding** — a defect surfaced by the design
D19 reproduction inventory itself (tasks 10.14/10.15), by executing a figure's command rather than
reading the figure. `RF` is deliberately not folded into `AR`: an `AR` finding is evidence about
what a reviewer caught, and an `RF` finding is evidence about what the mechanism caught after every
reviewer had finished. Collapsing them would erase exactly the distinction D19 exists to create.

| ID | Original finding | Correction applied | Closing evidence |
|---|---|---|---|
| **VF1** | The `## Clean-Install Working Method` heading was dropped when the closing blocks were relocated into the entry file | Heading restored inside the closing block, clear of every agent-facing fragment | `SPECBOOT_ADOPTION_GUIDE.md:225`; word count 17,566 → 17,570 (+4), itemized in the re-run table below |
| **VF2** | Stale figures in `acceptance-criteria-verification.md`: criterion 8 recorded 104 links, criterion 5 recorded 19 markers with a 5-explanatory breakdown, criterion 3's exception recorded a 391-line run-log template | All three re-derived against the tree and the breakdown corrected to 11 preserved + 6 explanatory + 2 formalized + 1 from D13 | `reports/acceptance-criteria-verification.md` — relative-link count **107**, approval markers **20**, run-log template **424** |
| **VF3** | Stale approval-gate `file:line` references: four phase files gained lines after the 11-gate table was written, so references into them had shifted | All 11 gate references re-derived against the current tree and the stale ones corrected | The task 10.5 table below — 11/11 resolve to a live `[HUMAN APPROVAL REQUIRED]` marker, each still bound to its named mutation |
| **VF4** | Stale/incorrect occurrence evidence in `verbatim-fidelity.txt`: the proof had been generated against an intermediate tree, so its per-block occurrence counts no longer evidenced the final one | Proof regenerated against the final restructured tree, comparing each block to `git show HEAD:SPECBOOT_ADOPTION_GUIDE.md` | `reports/verbatim-fidelity.txt` — 4/4 byte-identical, `occurrences: 1` on each, all in `history/prompt-inventory.md` only; `OVERALL: PASS` |
| **VF5** | Stale status in `PENDING-acceptance-gate-requests.md`: the file still read as two open requests after Request A had been run | Disposition header added, preserving both reusable prompts and their expected-results tables verbatim | `reports/PENDING-acceptance-gate-requests.md` § Status — Request A **RUN → agent attempt 2 PASS**; Request B **NOT RUN**, deferred and undischarged under design D18 |

Correcting VF1–VF5 changed report prose and one entry-file heading. It changed no adoption
procedure, no approval boundary, no validation criterion, and no gate semantic.

## Re-run 4 — after the five verification Minor corrections (VF1-VF5)

| Invariant | Re-run 3 | Re-run 4 | Cause |
|---|---|---|---|
| Relative links | 107 | 107 | unchanged |
| `HUMAN APPROVAL REQUIRED` | 20 | 20 | unchanged; the 11 real gates re-derived and 3 stale `file:line` references corrected (VF3) |
| Record blocks | 20 | 20 | unchanged |
| Troubleshooting entries | 18 | 18 | unchanged |
| Word count | 17,566 | 17,570 | +4: the restored `## Clean-Install Working Method` heading (VF1) |

**Task 10.9 - agent-evidence regression: PASS.** All seven protected fragments byte-identical after VF1-VF5. The VF1 heading was restored inside the closing block, well clear of the agent preamble, working-set statement, step index, section map, `On failure` pointers, `ADOPT-05B`'s mandatory statement, and the run-log step-state table. Agent tasks 16.1-16.7 and 16.16 remain valid; the agent gate does not reopen.

## Re-run 5 — after the criterion-3 line-count re-derivation and the VF namespace separation

Triggered by a canonical `/specboot-verify` FAIL raising one Major and three Minor findings
against the evidence reports themselves. No file under `specboot-adoption/` and no line of
`SPECBOOT_ADOPTION_GUIDE.md` was touched; only report prose changed. Every figure below is
re-derived against the current tree, not carried forward from re-run 4.

| Invariant | Re-run 4 | Re-run 5 | Cause |
|---|---|---|---|
| Relative links | 107 | 107 | unchanged — guide set untouched |
| `HUMAN APPROVAL REQUIRED` | 20 | 20 | unchanged; all 11 gate `file:line` references re-derived again and all 11 resolve to a live marker |
| Record blocks | 20 | 20 | unchanged |
| Troubleshooting entries | 18 | 18 | unchanged |
| Labeled verbatim blocks | 4 | 4 | unchanged |
| `ADOPT-nn` steps | 18 | 18 | unchanged |
| Word count | 17,570 | 17,570 | unchanged — no guide prose was edited |

**What re-run 5 corrected, all inside the reports:**

1. `acceptance-criteria-verification.md` — the re-run header, criterion 3's row, and five rows
   of the per-file line-count table had been left at pre-D14/D17 values. Re-derived: max
   working file **262** (`04-context-and-openspec.md`), entry file **277**,
   `01-prerequisites-and-install.md` **259**, `03-client-permissions.md` **254**,
   `22-troubleshooting.md` **193**. All 14 rows now match `wc -l` on the current tree.
   **No criterion verdict changed** — the largest working file is still under the ~300-line
   target and the run-log template's stated exception is still **424** lines.
2. This file — the section heading `Why the raw count is 18, not 11` was stale after re-runs 2
   and 3 moved the raw count 18 → 19 → 20, and the explanatory-mention breakdown understated
   the entry file's contribution as 3 rather than 4.
3. Both files — the verification findings were renamed `F1`–`F5` → `VF1`–`VF5`, because
   `section-mapping.md` already uses `F1`–`F5` for the pre-restructure front-matter blocks.
   `section-mapping.md` is byte-unchanged; the namespace rule is stated once, above.

**Task 10.9 — agent-evidence regression, re-confirmed: PASS.** All 15 files of the guide set
plus `section-mapping.md` and `enriched-work-item.md` verified byte-identical by SHA-256
before and after re-run 5. The seven protected agent-facing fragments are therefore unchanged,
agent tasks 16.1–16.7 and 16.16 remain valid, and the agent gate does not reopen. The recorded
limitation is unchanged and restated here: this byte-identity proof is **not independently
reproducible** by a third party while `specboot-adoption/**` remains untracked, because no
pre-edit form exists in git to re-diff against.

## Task 10.4 — word-count reconciliation

Pre: **11,786** words in one file. Post (re-run 2): **15,988** words across 14 files. Delta: **+4,202** — of which **+3,430** is the original restructure (itemized below) and **+772** is the D12/D13 remediation (itemized above).

The restructure was never expected to be word-neutral: it adds navigation and a uniform
contract. Sources of the increase:

| Source of delta | Approx. words | Detail |
|---|---|---|
| Step-contract field labels | ~600 | **144** field labels across 18 steps (18 × 8), plus the `PASS criteria` framing each step now states explicitly. Corrected from 145 (AR9 / VF11); the invariant row in re-run 6 already carried 144, and this word-count source row had been left stale |
| Entry file navigation | ~900 | Step index (18 rows), §-number map (23 rows), how-to-use sections for both audiences, orientation table — all net-new scaffolding |
| `00-conventions.md` | ~700 | Cross-cutting rules that were previously implicit or scattered across sections, now stated once |
| Run-log resume checklist and headings | ~350 | The step-state table and per-block headings around the 20 preserved record blocks |
| Per-file headers and navigation footers | ~300 | 14 files × header, "read conventions first", and "Next:" pointers |
| History file framing | ~250 | Historical-record-only warnings and provenance headers |
| **§18 pointer reduction** | **−350** | Six repeated conditionality paragraphs and transcribed gate detail replaced by links (design D6) |
| Cross-reference expansion in repaired external refs | ~30 | §-number citations became step-ID + file paths |

Net: roughly +3,780 added, −350 removed, consistent with the observed +3,430.

**No source prose was deleted without a destination.** The mapping table in
`section-mapping.md` accounts for all 28 source blocks; the extraction table there accounts
for the recurring content moved out of them. The increase is scaffolding, not restatement.

## Re-run 6 — after the D4/D13 contract corrections (AR1, AR2) and VF6–VF9

Triggered by an independent `/adversarial-review` returning **FAIL** on one Major (AR1) plus
four Minor findings, and by the preceding `/specboot-verify` **PASS WITH GAPS** whose four
accepted Minor findings (VF6–VF9) had never been persisted. Every figure below is re-derived
against the current tree, not carried forward.

| Invariant | Re-run 5 | Re-run 6 | Cause |
|---|---|---|---|
| Relative links | 107 | **122** | +15: each of the 8 form-A/form-C steps now links `00-conventions.md` where it declares its `On failure` form; the entry file's three-way failure explanation links `22-troubleshooting.md`; `ADOPT-16`'s rewritten pointer adds two |
| `HUMAN APPROVAL REQUIRED` | 20 | 20 | unchanged; all 11 preserved gates re-derived again and 5 stale `file:line` references corrected in the table above |
| Record blocks | 20 | 20 | unchanged |
| Troubleshooting entries | 18 | 18 | unchanged — **no inline or owning-step recovery was relocated into `22-troubleshooting.md`**, per design D13 |
| `ADOPT-nn` steps | 18 | 18 | unchanged |
| Labeled verbatim blocks | 4 | 4 | unchanged; `history/prompt-inventory.md` row 4's *status text* changed (AR3), the block itself did not |
| Contract field labels | 145 (recorded) | **144** | VF6: the recorded figure was wrong, not the tree. 18 steps × 8 fields = 144 in the phase files. Three further matches exist in prose (entry file, `08-daily-workflow.md`, `19-permissions-policy.md`) and were never part of the contract count |
| Word count | 17,570 | **18,399** | +829: `00-conventions.md`'s two new field-definition sections (~430), the entry file's three-way failure explanation (~150), 8 per-step form declarations (~200), `ADOPT-16`'s named-guidance pointer (~50) |

### What changed in the guide set, and what deliberately did not

`00-conventions.md` gains **What `Action` may hold** (four forms) and **Where `On failure` may
lead** (three forms). Both replace a one-line table cell that asserted a universal the steps do
not satisfy. The entry file's failure prose and orientation row now state the same three forms.
Each of the 18 steps declares its own form at the point of use.

**No recovery content was moved, duplicated, or deleted.** The 6 `Failure`/`Recovery` tables,
`ADOPT-16`'s stale-output guidance, and the 2 owning-step returns are the same text they were;
what changed is that each now says which contract form it is. This is the D13 decision applied
literally — uniformity of *form* was never the goal, and forcing form A and C into
`22-troubleshooting.md` would have produced exactly the duplication D6 exists to remove.

### Contract conformance, re-derived across all 18 steps

| Contract | Distribution | Verified |
|---|---|---|
| Field order (8 fields, fixed order) | 18/18 | uniform, no omission, no duplicate |
| `Action` form 1 — shell commands | 10 — `ADOPT-01/-02/-03/-04/-05/-10/-12/-14/-16/-17` | matches D4 |
| `Action` form 2 — one labeled canonical prompt | 6 — `ADOPT-06/-07/-09/-11/-13/-15` | matches D4 |
| `Action` form 3 — commands then one prompt | 1 — `ADOPT-08` | matches D4 |
| `Action` form 4 — structured written procedure | 1 — `ADOPT-05B` | matches D4 |
| `On failure` form A — inline, same step | 7 — `ADOPT-01/-02/-03/-04/-05/-07` (tables), `ADOPT-16` (named guidance) | matches D13 |
| `On failure` form B — named troubleshooting entry | 9 — `ADOPT-05B/-06/-08/-09/-11/-12/-13/-15/-17` | matches D13; all 19 named entries resolve |
| `On failure` form C — explicit owning step | 2 — `ADOPT-10` → `ADOPT-09`, `ADOPT-14` → `ADOPT-13` | matches D13 |

No step carries more than one labeled prompt; no live `Action` carries a historical prompt.

**Task 10.9 — agent-evidence regression: the gate is REOPENED, by design.** The protected set
is extended per the corrected task to include the human operating model's failure, approval, and
evidence prose and `00-conventions.md`'s step-contract field table. Two of those protected
fragments **changed** — the entry file's failure paragraph and orientation row, and the field
table's `Action` and `On failure` rows. That is not an incidental delta to be waved through: it
is the correction itself. Agent attempt 2's PASS therefore stops covering the current state, and
task 16.24 requires a fresh attempt 3 unconditionally. The remaining protected fragments — agent
preamble, three-file working-set statement, step index, §-number map, `ADOPT-05B`'s
unconditionally-mandatory statement, and the run log's step-state table — are byte-identical.

**Gate closed by attempt 3.** The required fresh attempt ran against the changed state — entry
file SHA-256 `0405b6bd…` (18,529 bytes / 287 lines), `00-conventions.md` SHA-256 `f761f5d5…`
(10,790 bytes / 208 lines) — and returned **PASS** on tasks 16.24–16.26, exercising precisely the
two fragments that changed: the corrected `On failure` three-form rule (forms A, B, and C each
demonstrated, plus the escalation path where none applies) and the corrected `Action` four-form
rule (`ADOPT-08` form 3, `ADOPT-05B` form 4). The regression check therefore did its job in both
directions — it refused to carry stale evidence forward, and the re-earned evidence covers the
fragments whose change triggered it.

## Verification and review findings VF6–VF9, AR1–AR5 (task 10.12)

**Namespaces.** `F1`–`F5` are the pre-restructure front-matter blocks in `section-mapping.md`.
`VF` identifiers are `/specboot-verify` findings. `AR` identifiers are `/adversarial-review`
findings. The three namespaces never overlap and are never renumbered.

### Provenance (task 10.12.1)

The reviewed tree is untracked, so a date is not provenance. Both records below identify the
state they judged.

| | `/specboot-verify` | `/adversarial-review` |
|---|---|---|
| Verdict | **PASS WITH GAPS** — 0 Blocker, 0 Major, 4 accepted Minor | **FAIL** — 1 Major, 4 Minor |
| Branch | `feature/restructure-specboot-adoption-guide` | `feature/restructure-specboot-adoption-guide` |
| `HEAD` | `0e6eb75` | `0e6eb75` |
| Working-tree scope | 4 modified tracked files + untracked `specboot-adoption/**` and the change directory | identical scope; `SPECBOOT_ADOPTION_GUIDE.md` 277 lines / 17,776 bytes, guide set 17,570 words |
| Client / session | canonical `/specboot-verify`, fresh session | Claude Code (Opus 5), session distinct from the implementing session, `cross-session`; no subagent fallback used |
| Findings | VF6–VF9 below | AR1–AR5 below |

The adversarial reviewer recorded one limitation on its own provenance, preserved here rather
than smoothed over: session distinctness rested on that conversation's empty prior context, not
on an externally attested identity — weaker than a cross-client review, stronger than a
same-session fallback.

### Findings

| ID | Finding | Disposition |
|---|---|---|
| **VF6** | A criterion records 145 contract-field labels; the actual count is 144 | Corrected — `acceptance-criteria-verification.md` criterion 4; re-derived as 18 × 8 |
| **VF7** | The claim-integrity audit records an inaccurate artifact/report scope count | Corrected — `human-orientation-acceptance.md`; the change holds 16 files, not 12 |
| **VF8** | `PENDING-acceptance-gate-requests.md` contains stale unchecked-task wording | Corrected — disposition restated; both reusable prompts and expected-results tables preserved verbatim per task 16.23 |
| **VF9** | `section-mapping.md` records source range 2032–2046 although the source ends at 2045 | Corrected — C2 row now 2032–2045 |
| **AR1** | The failure-path universal contradicts 9 of 18 steps | **Major.** Fixed — three-form contract in D13, `00-conventions.md`, the entry file, and every step |
| **AR2** | The `Action` contract excludes `ADOPT-08` and `ADOPT-05B` | Fixed — four-form contract in D4, `00-conventions.md`, task 3.9 |
| **AR3** | `prompt-inventory.md` row 4 has stale relocation status | Fixed — row 4 states the block was relocated; `ADOPT-05B` carries the consolidated form |
| **AR4** | The distributed template points to guide files it does not ship | Recorded as a limitation — see `acceptance-criteria-verification.md` criterion 11 |
| **AR5** | The latest `specboot-verify` verdict and accepted findings are absent from `reports/` | Fixed — this section |

### The recording rule, and why it does not loop (task 10.12.2)

Every `specboot-verify` or `adversarial-review` verdict that informs corrections, accepted gaps,
or archive eligibility is persisted here before archive, with the provenance above. Persisting a
byte-faithful gate record **after** the gate does not invalidate that verdict when only the
report record and its task checkbox change — otherwise recording a verdict would destroy the
verdict being recorded, and no gate could ever be closed.

Applying that test to this re-run: the VF6–VF9 and AR1–AR5 corrections changed implementation
files (`00-conventions.md`, the entry file, 8 phase-file steps, `prompt-inventory.md`) and design
semantics (D4, D13, D18). That is **not** a report-only change, so the affected gates are
genuinely invalidated and are reopened rather than carried forward: the group-10 suite,
tasks 16.10 and 16.21, and the agent gate via 16.24.

### VF9's carve-out against task 10.10 (task 10.12.3)

Task 10.10 requires `section-mapping.md` to stay byte-unchanged, and VF9's correction edits it.
10.10 protects the `F1`–`F5` **identifiers** from being reused or renamed — it does not freeze a
factual line range that is simply wrong. The C2 range was corrected to end at 2045, matching that
file's own header (`2045 lines, 11786 words, 87106 bytes`); every `F` identifier is untouched;
the namespace rule stands as stated above.

## Verification and review findings VF10–VF12, AR6–AR13 (task 10.12.4)

Persisted before archive under the proposal's verification-evidence persistence contract. Both
verdicts reviewed the **same guide-set state**, and that state is unchanged as of this record —
entry file SHA-256 `0405b6bd8772eba122a516c4add3a05cce9d170e48710a2c935a79948f5fa1c0`
(18,529 bytes / 287 lines), `00-conventions.md` SHA-256 `f761f5d5…` (10,790 bytes / 208 lines),
with all 15 guide-set files fingerprinted before and after the corrections recorded here (task 10.17).

### Provenance

| | `/specboot-verify` | `/adversarial-review` |
|---|---|---|
| Branch | `feature/restructure-specboot-adoption-guide` | `feature/restructure-specboot-adoption-guide` |
| `HEAD` | `0e6eb75` | `0e6eb75` |
| Working-tree scope | 4 modified tracked files + untracked `specboot-adoption/**` and the change directory | identical scope; guide set 15 files / 3,222 lines / 18,399 words |
| Client / session | canonical `/specboot-verify`, fresh session | Claude Code (Opus 5), session distinct from the implementing session, `cross-session`; no subagent fallback used |
| Verdict | **PASS WITH GAPS** — 0 Blocker, 0 Major, 3 Minor | **FAIL** — 1 Major, 6 Minor, 1 unresolved Question/assumption |

**Reviewer-provenance limitation, recorded rather than smoothed over.** The adversarial review
stated a limitation on itself: session distinctness rested on that conversation's empty prior
context, not on an externally attested identity, and the reviewing client was the **same** as the
implementing session's. Weaker than a cross-client review, stronger than a same-session fallback.
This is the same limitation the AR1–AR5 review recorded, and it is not diminishing with repetition.

### Findings — fixed identifiers, not to be renumbered

| ID | Category | Finding | Disposition |
|---|---|---|---|
| **VF10** | Minor | Stale Criterion 3 worst-case line counts: 160/262 instead of 208/265, with the 424-line run log omitted from the complete working-set figure | Corrected — `acceptance-criteria-verification.md`, Criterion 3; worst case now stated as the complete three-file set, 208 + 265 + 424 = 897 |
| **VF11** | Minor | `invariant-reconciliation.md` still records 145 field labels where the actual count is 144 | Corrected — the word-count source row now reads 144 (18 × 8), matching the invariant row that already carried 144 |
| **VF12** | Minor | Design D6 does not state the case-insensitive matching-line counting method | Corrected in `design.md` D6 — `grep -ci`, with the two rejected methods and their differing results recorded |
| **AR6** | **Major** | Persisted derived figures have no reproducible regeneration mechanism | Fixed structurally — design **D19**; every derived-figure block in this file and in `acceptance-criteria-verification.md` now carries its reproducing command, and tasks 10.14/10.15 require an executed inventory rather than a transcription |
| **AR7** | Minor | Stale explanatory-marker line references: entry 102→112 and conventions 77→125 | Corrected — all **six** explanatory references re-derived, not only the two known-stale ones |
| **AR8** | Minor | Stale Criterion 3 operands and omitted run-log contribution | Corrected — same fix as VF10 |
| **AR9** | Minor | Remaining 145→144 inconsistency | Corrected — same fix as VF11 |
| **AR10** | Minor | D6 counting method unstated | Corrected — same fix as VF12 |
| **AR11** | Minor | `daily-workflow-pointer-verification.md` column label incorrectly claims all eight semantics occur in the reduced file | Corrected — column retitled; 2 of 8 rows are delegated semantics absent from the reduced file, and criterion 10's verdict is unchanged *a fortiori* |
| **AR12** | Minor | Latest `specboot-verify` verdict and findings are not persisted | Fixed — this section |
| **AR13** | Question / assumption | Human archive decision with the orientation gate undischarged remains unresolved | **Resolved 2026-08-10 by recorded human decision** — the only instrument design **D20** admits. The gap is accepted, the obligation deferred to a future review by an unexposed developer, and task 16.20 stays open. See [`human-orientation-acceptance.md`](human-orientation-acceptance.md) § "Human decision under design D20" for scope and provenance. **Resolving AR13 does not grant archive approval**, and does not convert the adversarial review's **FAIL** into a PASS — that verdict stands as what that review found against the state it read; only a fresh review can supersede it |

**Three equivalences, recorded rather than merged:** VF10 ≡ AR8, VF11 ≡ AR9, VF12 ≡ AR10 — the
same three defects reached independently by both gates. **AR7, AR11 and AR12 were reached only by
the adversarial review**, and **AR6 only by aggregating across cycles**. That overlap-plus-remainder
pattern is deliberately **not** flattened into a single merged list, because it is itself the
evidence for AR6: two gates run against the same tree agreed on three figure defects and diverged
on four more, which is what an evidence record maintained by transcription rather than derivation
produces.

### Why this correction does not reopen the agent gate

The corrections recorded here changed **evidence reports and planning artifacts only** —
`design.md` (D6 clause, D19, D20, one risk bullet), `proposal.md` (two extended bullets),
`tasks.md` (group 10), and three files under `reports/`. Under task 10.12.2's rule the
invalidation is scoped to the **affected** gate. The bounded agent gate tests what a fresh agent
reads and does; neither `design.md` nor `proposal.md` nor any file under `reports/` is in that set.
Task 10.17 proves the boundary by SHA-256 over all 15 guide-set files before and after, rather
than asserting it — and unlike a `git diff --exit-code` against `HEAD`, which would fail trivially
here because every one of those 15 files is already modified or untracked relative to `HEAD` by
this change, a checksum comparison actually tests the property claimed.

## Verification and review findings VF13, AR14–AR16 (task 10.22)

Persisted before archive under the proposal's verification-evidence persistence contract. This is
the **third** recorded round, appended — the VF6–VF9 / AR1–AR5 and VF10–VF12 / AR6–AR13 rounds above
stand unchanged. Both verdicts in this round reviewed the **same guide-set state** as the round
above, and that state is still unchanged as of this record: entry file SHA-256
`0405b6bd8772eba122a516c4add3a05cce9d170e48710a2c935a79948f5fa1c0` (18,529 bytes / 287 lines),
`00-conventions.md` SHA-256 `f761f5d5bd9dc8a55038346ac3e8eda0cdb8ed2a71179f096dd3bd5cbb495a49`
(10,790 bytes / 208 lines), all 15 guide-set files fingerprinted before and after the corrections
recorded here (task 10.17).

### Provenance

| | `/specboot-verify` | `/adversarial-review` |
|---|---|---|
| Branch | `feature/restructure-specboot-adoption-guide` | `feature/restructure-specboot-adoption-guide` |
| `HEAD` (full) | `0e6eb75d974d7851c948888225c0f252d05aac27` | `0e6eb75d974d7851c948888225c0f252d05aac27` |
| Working-tree scope | 4 modified tracked files + untracked `specboot-adoption/**` and the change directory; guide set 15 files / 3,222 lines / 18,399 words | identical scope and identical guide-set fingerprint |
| Client / session | Claude Code (Opus 5), canonical `/specboot-verify` invoked directly via `.claude/skills/specboot-verify`; live runtime for Claude, static filesystem validation only for Kiro; no subagent invoked | **Codex Desktop — cross-client**, read-only, **no subagent and no fallback** |
| Verdict | **PASS WITH GAPS** — 0 Blocker, 0 Major, 1 Minor | **FAIL** — 0 Blocker, **1 Major**, 2 Minor, 0 unresolved questions |

**This is the first cross-client review of this change, and that is the point.** Both prior
adversarial reviews recorded the same self-stated limitation: session distinctness rested on an
empty prior context rather than an externally attested identity, and the reviewing client was the
**same** as the implementing session's. This round removes that limitation — the review ran from
Codex Desktop, a different client entirely, so its independence is a property of the setup rather
than of a conversation's history. It is therefore stronger provenance than either prior review, and
the finding it reached first (AR14) is exactly the kind the same-client rounds kept missing.

### Findings — fixed identifiers, not to be renumbered

| ID | Category | Finding | Disposition |
|---|---|---|---|
| **VF13** | Minor | Accepted follow-up candidate 5 records only `specboot-adoption/22-troubleshooting.md:157`, while a **second** live stale "Section 5" reference exists at `specboot-adoption/19-permissions-policy.md:13` | Corrected under task 10.18 — candidate 5 extended to both live references; guide files untouched |
| **AR14** | **Major** | The D19 reproduction inventories use non-literal or incomplete command fields — ellipses, placeholders, pseudo-commands, prose stand-ins, and vague cross-references — so the reproduction mechanism D19 introduced remains incomplete | Corrected under tasks 10.14, 10.15, 10.23 — literal-command standard added to design D19 and enforced by a mechanical audit |
| **AR15** | Minor | Candidate 5 omits the second live stale reference at `19-permissions-policy.md:13` | Corrected under task 10.18, jointly with VF13 |
| **AR16** | Minor | The latest `specboot-verify` verdict and the Codex cross-client `adversarial-review` verdict are not yet persisted under `reports/` | Corrected by this section |

**`VF13 ≡ AR15` — recorded as an equivalence, with provenance kept separate.** The two are the same
defect. They are **not** merged into one entry, because two reviewers reached it independently from
**different clients** — Claude Code via `/specboot-verify`, and Codex Desktop via
`/adversarial-review` — and that cross-client corroboration is itself evidence. Flattening the pair
into a single finding would delete the only thing that distinguishes it from a defect one reviewer
happened to notice twice.

**AR14 was reached only by the cross-client review**, and only it carries Major severity. That
asymmetry is the round's most informative result: the same-client rounds had every opportunity to
find it — the inventories were in front of them, and D19 was written by the same lineage of sessions
that wrote the non-literal entries — and did not. It is the sixth consecutive cycle of this defect
class (design D19), and the first found from outside the implementing client.

**What AR14 does not say.** It does not claim any load-bearing figure is wrong. The
`/specboot-verify` run in this same round independently re-derived them against the tree — 122
internal links with 0 broken, 4 verbatim blocks byte-identical against `git show HEAD:`, 144 contract
fields in fixed order across 18 steps, all 18 `On failure` pointers resolving, all 11 preserved
approval gates mapping 1:1, and the untouched-file proof at exit 0 — and every one held. The Major
is about whether the **record reproduces** its figures, not whether the figures are right. That
distinction is why the change's mechanical-validation claim survives the FAIL, and why archive
eligibility does not.

## Deliberately not corrected here (task 10.18)

**Two** live files still use retired "Section 5" numbering where the live target is `ADOPT-05B` in
`03-client-permissions.md`:

- `specboot-adoption/22-troubleshooting.md:157` — "Configure the **Section 5** permission files early"
- `specboot-adoption/19-permissions-policy.md:13` — "…subsection **at the end of Section 5**"

Reproduce (repository root):

```bash
grep -rnE 'Section [0-9]+' SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/
```

Nine matches: the two live references above, plus seven in
`specboot-adoption/history/prompt-inventory.md` (lines 20, 21, 22, 55, 72, 88, 104) that are
**intentional historical aliases** naming the section a relocated verbatim prompt came from. Those
seven, and the "formerly §N" wording in the entry file's §-number map and in the repaired external
references, are protected by design D3 and are not defects.

**Both live references are already accepted** as follow-up candidate 5 in
`reports/followup-candidates.md`, and the disposition is confirmed unchanged for both: **accepted,
not fixed, no new correction cycle opened.** Correcting either would edit an implementation file
*after* the acceptance gate that judged it, invalidating attempt 3's PASS under the
verification-evidence persistence contract and requiring a fourth fresh agent attempt — for a
cosmetic reference that is resolvable through the entry file's permanent §-number → step-ID map, and
that leaves no recovery instruction wrong and no step's failure path unresolved under design D13.

**What changed in this round, and what did not.** `22-troubleshooting.md:157` was already recorded
and is restated here as a scope boundary, not as a new finding. `19-permissions-policy.md:13` **is**
new to the record, carried by **VF13 ≡ AR15**: candidate 5 previously claimed agent attempt 3 was
"the only reviewer to reach it", which was true of the one instance it recorded and false of the
pair. The prior command scoped this figure to a single file, so it could not have surfaced the
second instance — the command was correct and its scope was not, which is AR14's defect class in
miniature and the reason the replacement command above runs over the whole guide set. **No guide
file is edited by this correction**; the record is what changed.

## Pending human archive decision (task 10.19, design D20)

**Status: DECIDED 2026-08-10 — accepted gap, obligation deferred. NOT archive approval.**

> The human decision D20 called for has been made and is recorded in full, with its scope and
> provenance, in [`human-orientation-acceptance.md`](human-orientation-acceptance.md) § "Human
> decision under design D20". In summary: independent human-orientation validation is **accepted as
> `NOT RUN`** and the obligation is **deferred to a future review by an unexposed developer**, on the
> verified ground that this change claims only mechanical validation, agent navigability, and
> readiness for a controlled pilot — never independent human usability or end-to-end adoption.
> **This resolves AR13.** It does **not** grant archive approval: archive still requires a fresh
> `specboot-verify`, a fresh independent `adversarial-review`, and a separate explicit final human
> approval. Task 16.20 stays open.

The record below states the position as it stood **before** that decision, and is preserved
unedited as the evidence D20 was applied to.

- The human orientation and self-description gate is **self-declared blocking** (design D11).
- It is recorded as **`NOT RUN`** — no independent reviewer was available.
- Its only human attempt stands as a **permanent FAIL** (human attempt 1), against a guide version
  that no longer exists.
- **No human archive approval exists in any artifact of this change.**

The decision to archive with that gate undischarged **belongs to a human, is pending, and may never
be inferred** — not from a `specboot-verify` PASS WITH GAPS, not from agent attempt 3's PASS, not
from design D18's sanctioned narrowing of the readiness claim, not from the absence of open
findings after this correction, and not from elapsed time. D18 governs what may be **claimed** about
the evidence; it does not govern what may be **done** with the change.

**What would discharge it**, and nothing else: a human statement recorded under `reports/` that
either (a) accepts archive with the orientation gate undischarged — in which case task 16.20's
undischarged obligation for a future independent review by an unexposed developer travels forward
unchanged — or (b) defers archive until an unexposed reviewer is available.

**Claim-integrity check re-run (extending task 16.21).** Every artifact of this change was searched
for any statement asserting or implying that archive has been approved:
`grep -rn 'archive approv' proposal.md design.md tasks.md reports/` — every match is either a
statement that approval is *required*, that a gate verdict does *not* grant it, or this record
stating it is pending. No artifact asserts or implies approval.

## Reproduction inventory (task 10.15, design D19)

Every derived-figure block in this file, with the command that reproduces it. Every command was
**executed** against the working tree when this inventory was written and its output compared to
the persisted figure. All commands run from the repository root. The `CURRENT` / `HISTORICAL`
scoping rule is stated in `acceptance-criteria-verification.md`'s inventory and applies identically
here — a `HISTORICAL` block is preserved as record and may never be updated to match the present
tree, because that would destroy the evidence about the state it scopes.

| # | Section | Scope | Figures | Command | Exit | Comparison |
|---|---|---|---|---|---|---|
| B1 | Task 10.5 — the 11 approval gates | CURRENT | 11 gates, each `file:line` bound to its mutation | `CMD-B1` | 0 | **AGREES** — 11/11 resolve to a live `[HUMAN APPROVAL REQUIRED]`. Re-executed under AR14 with all 11 `sed` commands written out |
| B2 | Why the raw count is 20, not 11 | CURRENT | 20 = 11 preserved + 6 explanatory + 2 formalized + 1 from D13; explanatory refs entry 21/31/71/112 and conventions 64/125 | `CMD-B2` | 0 | **DISAGREED → corrected as AR7** (entry 102, conventions 77 were stale), then re-run: **AGREES** — all six re-derived. Re-executed under AR14 with the six `sed` commands written out |
| B3 | The two formalized gates | CURRENT | `07-baseline-and-checkpoint.md:78`, `05-agents-and-skills.md:81` | `CMD-B3` | 0 | **AGREES** — both resolve to a live marker; the D13 gate at `22-troubleshooting.md:88` is covered by B2's decomposition. Re-executed under AR14 with the ellipses removed |
| B4 | Task 10.3 — other invariants | CURRENT | record blocks 20 · `LIVE VALIDATION REQUIRED` 1 · labeled verbatim 4 · verbatim string mentions 12 · `CANONICAL CONSOLIDATED PROMPT` 10 · `CANONICAL REUSABLE PROMPT` 7 | `CMD-B4` | 0 | **AGREES** — all six post-values. Re-executed under AR14 with each label written out in place of `<label>` |
| B5 | Remediation deltas (re-run 2), re-run 3, re-run 4, re-run 5 | **HISTORICAL** | prior-state columns: 18/19 markers, 97/104/107 links, 15,216 / 15,988 / 17,566 / 17,570 words, run-log 391 | — not reproducible by construction: every one describes a tree that no longer exists | — | **HISTORICAL** — preserved unchanged. These are the evidence that the deltas were explained rather than absorbed; updating them to present values would erase that |
| B6 | Task 10.4 — word-count reconciliation | CURRENT (pre + post) | pre 11,786 words / 2,045 lines / 87,106 bytes; post 18,399 words | `git show HEAD:SPECBOOT_ADOPTION_GUIDE.md \| wc -lwc`; `cat SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/*/*.md \| wc -w` | 0 | **AGREES** — 2045 / 11786 / 87106 and 18,399 |
| B7 | Word-count source table | CURRENT (one row) / estimate | 144 field labels; the `~600`, `~900`, `~700`, `~350`, `~300`, `~250`, `−350`, `~30` columns are explicitly **estimates**, marked `~` | `CMD-B7` | 0 | **DISAGREED → corrected as AR9 / VF11** (row read 145), then re-run: **AGREES** — 144. Re-executed under AR14 with the alternation written out in place of the ellipsis. The `~` columns are attributions of a measured total, not independent measurements |
| B8 | Re-run 6 invariant table | CURRENT | 122 links · 20 markers · 20 record blocks · 18 troubleshooting entries · 18 steps · 4 verbatim · 144 fields · 18,399 words | `CMD-B8` | 0 | **AGREES** — all eight rows. Re-executed under AR14; the prior entry deferred to other rows and to an unsupplied "link checker" |
| B9 | Contract conformance across 18 steps | CURRENT | 18 steps · field order uniform · `Action` forms 10 / 6 / 1 / 1 | `CMD-B9` | 0 | **AGREES** — 18 steps, field order uniform on every one, 144 fields, form 3 = `ADOPT-08` alone and form 4 = `ADOPT-05B` alone, matching D4. Re-executed under AR14; the prior entry described a parse rather than supplying one |
| B10 | VF1–VF5 table | **HISTORICAL** | closing evidence citing states at the time (link count 107, entry `:225`) | — scopes verdicts already closed | — | **HISTORICAL** — preserved unchanged |
| B11 | VF6–VF9 / AR1–AR5 provenance | **HISTORICAL** | entry file 277 lines / 17,776 bytes, guide set 17,570 words | — fingerprints the tree that review reviewed, which the AR1/AR2 corrections then changed | — | **HISTORICAL** — preserved unchanged. It is *supposed* to differ from the current 287 / 18,529 / 18,399; that difference is what makes it a valid scope record |
| B12 | VF10–VF12 / AR6–AR13 provenance and findings | CURRENT | entry SHA-256 `0405b6bd…` / 18,529 bytes / 287 lines; `00-conventions.md` `f761f5d5…` / 208 lines; guide set 15 files / 3,222 lines / 18,399 words | `CMD-B12` | 0 | **AGREES** — both verdicts reviewed the state that is still present. Re-executed under AR14 with the 15-file list written out |
| B13 | Task 10.18 — Section 5 wording | CURRENT | one match, `22-troubleshooting.md:157` | `grep -n 'Section 5' specboot-adoption/22-troubleshooting.md` | 0 | **AGREES** — one match, line 157, disposition unchanged |
| B14 | Task 10.19 — claim-integrity check | CURRENT | zero artifacts asserting archive approval | `CMD-B14` | 0 | **AGREES** — exactly 2 matches, both **negations**, printed by the command itself: `design.md:483` ("no artifact in this change may state, imply, or infer that archive has been approved") and `reports/invariant-reconciliation.md:534` ("for any statement asserting or implying that archive has been approved:"). Re-executed under AR14; the prior entry hid the judgement behind "with the negating-context matches excluded" |

**Result: 14 of 14 derived-figure blocks inventoried; 0 without an entry; 0 remaining disagreements.**
Two blocks disagreed when first run — B2 (AR7) and B7 (AR9 / VF11) — and both were corrected under
task 10.16 and re-run against the corrected text. Three blocks are `HISTORICAL` (`B5`, `B10`, `B11`)
and carry that disposition with the reason, rather than being force-fitted to the present tree.

**Re-executed in full under AR14.** Every `CURRENT` command above was run again from the repository
root at the time of this correction, and its actual output and exit status compared against the
persisted figure. Nine rows carried non-literal commands and were rewritten to design D19's literal
standard: `B1`, `B2`, `B3`, `B4`, `B7`, `B8`, `B9`, `B12`, `B14`. `B6` and `B13` were already
literal and are untouched. `B5`, `B10`, `B11` remain `HISTORICAL` and exempt — they fingerprint
trees that no longer exist, and updating them to match the present tree would destroy the evidence
they scope.

**`B14` is the clearest illustration of what AR14 was about.** Its previous command was a real
`grep`, followed by the phrase "with the negating-context matches excluded" — an instruction to the
*reader* to perform a judgement the command never performed. Re-running it here produced two
matches that a naive automated filter classifies as **non-negated**, because one of them negates
with "no artifact … may" rather than with the word the filter looked for. The figure ("zero
artifacts asserting archive approval") was correct throughout; the command could not establish it.
The fix is not a cleverer filter but a command that **prints its two matches** so the reader judges
them directly against the quoted text.

## Command blocks

Each block is copy-paste executable from the repository root and resolves one-to-one from the
Command column above. Paths are given relative to the repository root, so the blocks referencing
files inside the change directory spell that path out in full.

`CMD-B1` — the 11 preserved approval gates:

```bash
sed -n '77p'  specboot-adoption/01-prerequisites-and-install.md
sed -n '137p' specboot-adoption/01-prerequisites-and-install.md
sed -n '236p' specboot-adoption/01-prerequisites-and-install.md
sed -n '74p'  specboot-adoption/02-codegraph.md
sed -n '144p' specboot-adoption/02-codegraph.md
sed -n '178p' specboot-adoption/03-client-permissions.md
sed -n '76p'  specboot-adoption/04-context-and-openspec.md
sed -n '56p'  specboot-adoption/06-adapters-and-discovery.md
sed -n '88p'  specboot-adoption/06-adapters-and-discovery.md
sed -n '156p' specboot-adoption/07-baseline-and-checkpoint.md
sed -n '137p' SPECBOOT_ADOPTION_GUIDE.md
```

Output: 11 lines, each containing a live `[HUMAN APPROVAL REQUIRED]` marker. Exit `0`.

`CMD-B2` — the raw count and the six explanatory references:

```bash
grep -rn 'HUMAN APPROVAL REQUIRED' SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
sed -n '21p'  SPECBOOT_ADOPTION_GUIDE.md
sed -n '31p'  SPECBOOT_ADOPTION_GUIDE.md
sed -n '71p'  SPECBOOT_ADOPTION_GUIDE.md
sed -n '112p' SPECBOOT_ADOPTION_GUIDE.md
sed -n '64p'  specboot-adoption/00-conventions.md
sed -n '125p' specboot-adoption/00-conventions.md
```

Output: `20`, then six lines each carrying an explanatory mention (not a gate). Exit `0`.
Decomposition: 20 = 11 preserved (`CMD-B1`) + these 6 + 2 formalized (`CMD-B3`) + 1 from D13
(`22-troubleshooting.md:88`).

`CMD-B3` — the two formalized gates:

```bash
sed -n '78p' specboot-adoption/07-baseline-and-checkpoint.md
sed -n '81p' specboot-adoption/05-agents-and-skills.md
sed -n '88p' specboot-adoption/22-troubleshooting.md
```

Output: three lines, each carrying a live `[HUMAN APPROVAL REQUIRED]` marker — the two formalized
gates and the D13 gate. Exit `0`.

`CMD-B4` — the other invariants, every label written out:

```bash
grep -roh 'Live validation record'                  SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
grep -roh 'Live permission record'                  SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
grep -roh 'LIVE VALIDATION REQUIRED'                SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
grep -roh 'HISTORICAL PROMPT — VERIFIED VERBATIM'   SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
grep -roh 'CANONICAL CONSOLIDATED PROMPT'           SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
grep -roh 'CANONICAL REUSABLE PROMPT'               SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
grep -c '^### ' specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md
```

Output: `0`, `0`, `1`, `12`, `10`, `7`, `20`. The first two are `0` by design — the 20 record blocks
moved into the run-log template under `### ADOPT-nn` headings (final line), which is the same 20.
Exit `0`.

`CMD-B7` — contract field labels:

```bash
grep -h -oE '^\*\*(Condition|Purpose|Preconditions|Action|Approval gate|Validation|Evidence to record|On failure):\*\*' specboot-adoption/0[1-7]*.md | wc -l
```

Output: `144`. Exit `0`.

`CMD-B8` — the re-run 6 invariant table, all eight figures:

```bash
grep -c '^### ' specboot-adoption/22-troubleshooting.md
grep -rhcE '^## `ADOPT-[0-9]+B?`' specboot-adoption/0[1-7]*.md | awk '{s+=$1} END {print s}'
grep -roh '\[HUMAN APPROVAL REQUIRED\]' SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
grep -c '^### ' specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md
grep -h -oE '^\*\*(Condition|Purpose|Preconditions|Action|Approval gate|Validation|Evidence to record|On failure):\*\*' specboot-adoption/0[1-7]*.md | wc -l
cat SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/history/*.md specboot-adoption/run-template/*.md | wc -w
# 122 links / 0 broken: run CMD-A8 in acceptance-criteria-verification.md
# 4 byte-identical verbatim blocks: run CMD-A7 in acceptance-criteria-verification.md
```

Output: `18`; `18`; `20`; `20`; `144`; `18399`. Exit `0`.

`CMD-B9` — contract conformance including field order:

```bash
python3 - <<'PY'
import re,glob
FIELDS=["Condition","Purpose","Preconditions","Action","Approval gate","Validation","Evidence to record","On failure"]
steps=[];bad=[]
for f in sorted(glob.glob('specboot-adoption/0[1-7]*.md')):
    lines=open(f,encoding='utf-8').read().split('\n')
    idx=[i for i,l in enumerate(lines) if re.match(r'^## `ADOPT-[0-9]+B?`',l)]
    for n,i in enumerate(idx):
        end=idx[n+1] if n+1<len(idx) else len(lines)
        sid=re.search(r'ADOPT-[0-9]+B?',lines[i]).group(0); body=lines[i:end]
        names=[m.group(1) for m in (re.match(r'^\*\*([A-Za-z ]+):\*\*',l) for l in body) if m and m.group(1) in FIELDS]
        steps.append(sid)
        if names!=FIELDS: bad.append((sid,names))
print("steps:",len(steps))
print("field order uniform across all steps:","YES" if not bad else "NO")
for b in bad: print(" ",b)
print("total fields:",len(steps)*8)
PY
```

Output: `steps: 18`; `field order uniform across all steps: YES`; `total fields: 144`. Exit `0`.
The `Action`-form distribution 10 / 6 / 1 / 1 is produced by `CMD-A4` in
`acceptance-criteria-verification.md`.

`CMD-B12` — the reviewed-state fingerprint, all 15 files written out:

```bash
shasum -a 256 SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/00-conventions.md specboot-adoption/01-prerequisites-and-install.md specboot-adoption/02-codegraph.md specboot-adoption/03-client-permissions.md specboot-adoption/04-context-and-openspec.md specboot-adoption/05-agents-and-skills.md specboot-adoption/06-adapters-and-discovery.md specboot-adoption/07-baseline-and-checkpoint.md specboot-adoption/08-daily-workflow.md specboot-adoption/19-permissions-policy.md specboot-adoption/22-troubleshooting.md specboot-adoption/history/prompt-inventory.md specboot-adoption/history/reference-run-java-maven.md specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md
wc -l SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/history/*.md specboot-adoption/run-template/*.md | tail -1
cat SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/history/*.md specboot-adoption/run-template/*.md | wc -w
```

Output: 15 checksum lines, the first two being
`0405b6bd8772eba122a516c4add3a05cce9d170e48710a2c935a79948f5fa1c0  SPECBOOT_ADOPTION_GUIDE.md` and
`f761f5d5bd9dc8a55038346ac3e8eda0cdb8ed2a71179f096dd3bd5cbb495a49  specboot-adoption/00-conventions.md`;
then `3222 total`; then `18399`. Exit `0`.

`CMD-B14` — claim integrity, printing every match rather than filtering silently:

```bash
grep -rniE 'archive (is |has been )?(approved|granted)|approval (is )?granted' openspec/changes/restructure-specboot-adoption-guide/proposal.md openspec/changes/restructure-specboot-adoption-guide/design.md openspec/changes/restructure-specboot-adoption-guide/tasks.md openspec/changes/restructure-specboot-adoption-guide/reports/
```

Output: exactly two lines, both negations —
`design.md:483:**Decision**: no artifact in this change may state, imply, or infer that archive has been approved.`
and
`reports/invariant-reconciliation.md:534:for any statement asserting or implying that archive has been approved:`.
Exit `0`.

## Literal-command audit (task 10.23, design D19, AR14)

The standard is enforced by a command, not by review — a standard checked only by reading is how
the first five cycles were passed. The audit examines the **Command** field of every `CURRENT` row
in both inventories, and the command-ID blocks those fields resolve to. It ignores the Figures
column, where abbreviation is legal, and skips `HISTORICAL` rows, which are exempt by D19's scoping
rule.

It **fails** on any of: a command ID resolving to zero blocks or to more than one; a row naming more
than one command ID; a prohibited token in a literal Command field; or a Command field carrying
neither a literal command nor an ID.

```bash
python3 - <<'PY'
import re,sys
BASE='openspec/changes/restructure-specboot-adoption-guide/reports/'
SPECS=[(BASE+'acceptance-criteria-verification.md','A',3),(BASE+'invariant-reconciliation.md','B',4)]
BANNED=[('ellipsis',r'…|\.\.\.'),('placeholder',r'<[a-z][a-z ]*>'),
        ('prose',r'link checker|per-step parse|extract each|commands below|combined|the B1|same over|resolved with|then each|excluded|for each of')]
fail=[]
for path,pref,ci in SPECS:
    txt=open(path,encoding='utf-8').read(); lines=txt.split('\n')
    decl=re.findall(r'^`(CMD-'+pref+r'\d+)`\s+—',txt,re.M)
    dup=[d for d in set(decl) if decl.count(d)>1]
    if dup: fail.append((path,'duplicate command-block declaration',dup))
    rows=[l for l in lines if re.match(r'^\|\s*'+pref+r'\d+\s*\|',l)]
    cur=0
    for l in rows:
        cols=[c.strip() for c in l.strip().strip('|').split('|')]
        ident=cols[0]
        if 'HISTORICAL' in l: continue
        cur+=1
        cmd=cols[ci] if len(cols)>ci else ''
        ids=re.findall(r'CMD-'+pref+r'\d+',cmd)
        if ids:
            if len(set(ids))!=1: fail.append((path,ident,'row names %d command IDs, must be exactly 1'%len(set(ids))))
            for i in set(ids):
                if decl.count(i)!=1: fail.append((path,ident,'command ID %s resolves to %d blocks'%(i,decl.count(i))))
        else:
            for name,pat in BANNED:
                if re.search(pat,cmd,re.I): fail.append((path,ident,'prohibited token (%s) in literal Command field'%name))
            if '`' not in cmd: fail.append((path,ident,'Command field carries neither a literal command nor a command ID'))
    print(f"{path}: CURRENT rows audited={cur}  command blocks declared={len(decl)}")
print()
if fail:
    print("AUDIT FAIL:",len(fail))
    for f in fail: print("  ",f)
else:
    print("AUDIT PASS — every CURRENT Command field is literal or resolves one-to-one; no prohibited tokens")
sys.exit(1 if fail else 0)
PY
```

Output:

```text
openspec/changes/restructure-specboot-adoption-guide/reports/acceptance-criteria-verification.md: CURRENT rows audited=15  command blocks declared=7
openspec/changes/restructure-specboot-adoption-guide/reports/invariant-reconciliation.md: CURRENT rows audited=11  command blocks declared=9

AUDIT PASS — every CURRENT Command field is literal or resolves one-to-one; no prohibited tokens
```

Exit `0`. **26 `CURRENT` rows audited across both files; 16 command blocks; zero violations.**

**What the audit proves, and what execution proves.** The audit is a static check: it establishes
that no Command field is vague, and that every ID resolves to exactly one block. It cannot establish
that a command's *output* proves the figures its row claims — that is what re-running all 26
commands did, with each result compared against the persisted figure and recorded in the Comparison
column. Both were required by task 10.23, and they catch different things: the audit would never
have found **RF2** (a fully literal command, one glob too wide), and execution alone would never
have flagged `B14`'s "with the negating-context matches excluded", whose figure was correct all
along. Recording the distinction rather than letting "audited" stand for both is the point.

**What this inventory changes about the failure mode.** Five prior cycles found stale figures because
the only way to check one was to re-derive it by hand and notice the difference. With the command
recorded beside each figure, checking the whole file is a re-run rather than a rediscovery — and the
inventory earned that claim on its first execution, by surfacing **RF1**, a seventh figure defect
that neither the `/specboot-verify` run nor the `/adversarial-review` had found.

## Reproducibility findings RF1– (design D19, tasks 10.14–10.16)

Findings surfaced by the reproduction inventory itself — that is, by **executing** a derived
figure's command rather than reading the figure. Neither RF1 nor RF2 was found by any
`/specboot-verify` run or by any `/adversarial-review`.

**RF2 is the case for AR14's execution requirement, made by AR14's own correction round.** The
cross-client review found the non-literal commands by *reading* the inventories, and its list of
eight `A`-row violators is exactly right about what it covers. `A13` is not on that list, and could
not have been: its command was fully literal, carried no prohibited token, and would pass any
lint of the Command column. It was wrong only in **scope** — one glob too wide for the figure it
supported — and nothing but running it and comparing the output against the persisted table could
reveal that. A literalness standard checked by reading would have closed this round with RF2 still
in the file.

| ID | Finding | Reproducing command | Exit | Correction | Closing comparison |
|---|---|---|---|---|---|
| **RF2** | `acceptance-criteria-verification.md`'s `A13` command globbed `specboot-adoption/run-template/*.md` as well, producing **15** line-count values for a table that claims **14 rows**. The 14 values were right; the command reached one file further than the figure it was supporting | `wc -l SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/history/*.md` → 14 files, values `287 265 264 254 245 244 208 193 189 179 175 111 100 84` | 0 | `run-template/` glob dropped from `A13`; the run-log template's 424 lines stay inventoried separately at `A12`, where the Criterion 3 exception already accounts for them | Re-run after correction: 14 files, 14 values, matching the table exactly. **AGREES** |
| **RF1** | `section-mapping.md` lists **five** front-matter rows (`F1`–`F5`) under a heading reading "(4 blocks)", and computes `4 + 22 + 2 = 28`, carried into criterion 2 as "28/28 mapped". Actual mapped total is **29** | `grep -cE '^\| F[0-9]+ \|' reports/section-mapping.md` → `5`; `grep -cE '^\| [0-9]+[ab]? \|' reports/section-mapping.md` → `23` (23 rows covering 22 sections; §5 splits 5a/5b); `grep -cE '^\| C[0-9]+ \|' reports/section-mapping.md` → `2` | 0 | Heading corrected to "(5 blocks)"; arithmetic split into **28 required** vs **29 actually mapped**; criterion 2 restated as **29/29 mapped, zero unmapped**; `F1`–`F5` identifiers preserved exactly | Re-run after correction: `5 + 23 → 22 sections + 2 = 29`, matching the corrected text. **AGREES** |

**Why the mapping was more complete than the contract, and why that is not a defect in itself.** The
contract required four front-matter blocks by name — `Prompt Label Conventions`, `Happy Path 1`,
`Happy Path 2`, `Table of Contents` (task 1.4, `enriched-work-item.md`, design D8). Implementation
additionally mapped **F1** (Title, Scope, Purpose, Reference status, Status of the daily workflow),
which nothing required. Mapping more than contracted is over-delivery, not error; leaving the
arithmetic at the contracted number while listing the delivered rows is the error, and it is what
RF1 corrects.

**No verdict changes.** Criterion 2's operative clause is **zero unmapped**, which held before and
holds now, more strongly at 29 than at 28.

**Scope of the RF1 correction, and its precedent.** RF1 edits `reports/section-mapping.md`, which
task 10.10 requires to stay byte-unchanged. This applies the carve-out **VF9 already established**
in the same file: 10.10 protects the `F1`–`F5` **identifiers** from being reused or renamed — every
one is untouched — not a factual figure that is simply wrong. `enriched-work-item.md` remains
**byte-identical** (SHA-256 `07f4ad77…`, unchanged), and the original four-required-block contract
stands unedited in task 1.4 and design D8 as historical requirement evidence: those record what was
required, which genuinely was four.

## Scope boundary, proven by checksum (task 10.17)

**Why not `git diff --exit-code`.** Every one of the 15 guide-set files is already modified or
untracked relative to `HEAD` by this change, so a diff against `HEAD` would report a difference
unconditionally and prove nothing about whether *this* correction touched them. The property that
needs proving is narrower: that the evidence-only work of tasks 10.12.4 and 10.14–10.16 left the
guide set byte-identical. That is a before/after comparison, so it needs a before/after instrument.

**Method.** SHA-256 over all 15 guide-set files captured **immediately before** the evidence work
began, captured again after it finished, and compared; plus a full recursive path listing of
`specboot-adoption/` and the entry file, before and after, to catch a file created or removed
rather than modified.

**Re-proven for the AR14–AR16 round (task 10.17, reopened).** The earlier capture pair scoped the
10.12.4 / 10.14–10.16 window, which has closed; a boundary claim inherited from a previous window
proves nothing about this one. The capture below was taken immediately before the AR14–AR16 work
began and again after it finished.

```bash
shasum -a 256 SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/history/*.md specboot-adoption/run-template/*.md
find SPECBOOT_ADOPTION_GUIDE.md specboot-adoption -type f | sort
```

Run before the round, again after, and compared with `diff`. Both comparisons exited `0`.

**Result: all 15 byte-identical. Path set unchanged — 15 paths, none created, none removed.**

```text
0405b6bd8772eba122a516c4add3a05cce9d170e48710a2c935a79948f5fa1c0  SPECBOOT_ADOPTION_GUIDE.md
f761f5d5bd9dc8a55038346ac3e8eda0cdb8ed2a71179f096dd3bd5cbb495a49  specboot-adoption/00-conventions.md
a9138b7e1e76f9b6e6138a2d82612d03d6ac316f5c55d2a768bdf403090b3910  specboot-adoption/01-prerequisites-and-install.md
16d714df23cca4cfa490cd01ba08bf736dca5a511d82e2f0bec15be573532117  specboot-adoption/02-codegraph.md
a3091f54afa3a7d018456e6b739dd7249ea5bb20ebe8d782c170d9d516b4de57  specboot-adoption/03-client-permissions.md
409f87c45f9a5fd234ab9c6c7d542e190cde283861890f3286556c66336e6c56  specboot-adoption/04-context-and-openspec.md
7bfb9725fd23dfa838d6fe4de1831daf88e39712b6e4779f238c908066cb7035  specboot-adoption/05-agents-and-skills.md
e993a8ace635dfcfd59ac1490747c8e71873b2a9636b1735e625459bcd979b9d  specboot-adoption/06-adapters-and-discovery.md
0cb32bd992d08d239baebfb43185809f1d1cb343e17c27e5610f1787df9ef794  specboot-adoption/07-baseline-and-checkpoint.md
1e5ad2a48c5350c23d6c06aefce659af036c3aeb5d149cb87c263cf78848082e  specboot-adoption/08-daily-workflow.md
5b565cb88c5280a0b8a4021c64a5451e8e756f89a3e4b84c5075321f91bd27d0  specboot-adoption/19-permissions-policy.md
2ab5021757eabee8408a416c7772ca883abb2ea830efcaac828e6d0cb3a361c0  specboot-adoption/22-troubleshooting.md
ae2944dacc046fcb2ed57418ee685ddbb8285e09bd719af06d16de75ceb56ee8  specboot-adoption/history/prompt-inventory.md
00f19f5eeda0362c78e059d1386d04c5c42ad62eb5a8046453d95b9b2c180103  specboot-adoption/history/reference-run-java-maven.md
ff12485173102535b67e2900e8d53557fa8e01ae44a61d62689e5acafaed43f6  specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md
```

Identical before and after. The entry file's `0405b6bd…` is the same value agent attempt 3 was
scored against, and `00-conventions.md`'s `f761f5d5…` likewise — so the two agent-facing files the
bounded gate actually reads are provably the ones it read.

**Scope of the AR14–AR16 round, for the record.** Files changed: `proposal.md`, `design.md`,
`tasks.md`, `reports/invariant-reconciliation.md`, `reports/acceptance-criteria-verification.md`,
`reports/followup-candidates.md`. Files **not** changed: all 15 guide-set files, `enriched-work-item.md`,
`reports/agent-acceptance.md`, `reports/human-orientation-acceptance.md`, and every path outside the
change directory.

**What this establishes.** No guide file and no executable contract file changed —
`SPECBOOT_ADOPTION_GUIDE.md`, `00-conventions.md`, the seven phase files, the two support files,
the two history files and the run-log template are the same bytes the acceptance gates judged.
Therefore, under task 10.12.2's rule that invalidation is scoped to the **affected** gate:

- the bounded agent gate — tasks 16.1–16.7, 16.16, 16.24–16.27, **including agent attempt 3's PASS** — is **not** reopened;
- the mechanically validated implementation tasks 10.1–10.9 are **not** reopened;
- `enriched-work-item.md` is byte-identical (SHA-256 `07f4ad77…`, verified before and after).

Had any checksum differed or any path appeared or disappeared, this correction would have left its
scope, and the affected gate would have been reopened rather than the difference explained away.

## Strict validation after the correction (task 10.20)

`openspec validate restructure-specboot-adoption-guide --strict` → **`Change
'restructure-specboot-adoption-guide' is valid`**, exit status **0**, run after tasks 10.12.4 and
10.14–10.19 were applied. Task 10.13 stays checked as the historical record of the earlier strict
validation; this is a separate, later run against the corrected artifacts.

**Re-run for the AR14–AR16 round.** After tasks 10.14, 10.15, 10.17, 10.18, 10.22 and 10.23 were
applied:

```bash
openspec validate restructure-specboot-adoption-guide --strict
```

Output: `Change 'restructure-specboot-adoption-guide' is valid`. Exit status **0**. The earlier
records above stay as they are — each scopes the round it validated, and none is rewritten to stand
for a later one.
