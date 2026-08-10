# Task 4.3 — §18 Pointer Reduction Verification

Each gate semantic in scope for the §18 pointer reduction was checked against the linked
canonical sources. No statement is unique to the reduced file.

**Column scope, corrected under AR11.** This column was previously headed "Rule in reduced
file", which overclaimed: **2 of the 8 rows** — "Archive performs sync-then-archive internally"
and "`openspec validate --strict` after archiving" — appear **nowhere** in
`specboot-adoption/08-daily-workflow.md`. They were semantics of the **old §18** that the
reduction delegated entirely to the canonical sources rather than summarizing. Criterion 10's
verdict is unchanged and the reasoning is recorded rather than left implicit: the criterion
requires that the reduced file state **no gate semantic absent from a linked source**, and a
semantic the reduced file does not state at all satisfies that *a fortiori*. Verify with
`grep -c 'sync-then-archive' specboot-adoption/08-daily-workflow.md` and
`grep -c 'validate --strict' specboot-adoption/08-daily-workflow.md` — both return 0.

| Gate semantic traced (rows 1–6 stated in the reduced file; rows 7–8 delegated, not stated there) | Confirmed present in |
|---|---|
| `enrich-us` returns `READY FOR PROPOSAL` / `NEEDS CLARIFICATION`; the latter blocks propose | `ai-specs/specboot-instructions.md`, `ai-specs/skills/enrich-us/SKILL.md`, `openspec/specs/specboot-verification-workflow/spec.md` |
| `specboot-verify` PASS/PASS WITH GAPS → eligible for adversarial review ONLY, never archive approval | `ai-specs/skills/specboot-verify/SKILL.md` (description + body), `openspec/specs/specboot-verification-workflow/spec.md` |
| `specboot-verify` FAIL blocks even requesting adversarial review | `ai-specs/skills/specboot-verify/SKILL.md` |
| `adversarial-review` PASS/PASS WITH GAPS does not by itself grant archive approval | `ai-specs/skills/adversarial-review/SKILL.md`, `openspec/specs/specboot-verification-workflow/spec.md` (named scenario) |
| Archive requires both gates plus explicit human approval | `openspec/specs/specboot-verification-workflow/spec.md` (named scenario + SHALL statement) |
| Gates are documented convention, not a technical modification of the archive command | `openspec/specs/specboot-verification-workflow/spec.md` |
| Archive performs sync-then-archive internally; no separate sync step beforehand | `openspec/specs/specboot-verification-workflow/spec.md` |
| `openspec validate --strict` after archiving | `openspec/specs/specboot-verification-workflow/spec.md` |

## Content unique to old §18, and where it went

| Old §18 content | Destination |
|---|---|
| Six per-capability entries with invocation syntax | Retained in reduced form (sequence + invocation table); detail delegated to canonical sources |
| Repeated per-entry "Stack/client conditionality" paragraph (6 copies) | Stated once in `00-conventions.md` and once in the reduced file |
| "Planned pilot request" (HttpErrorHandler) | `history/reference-run-java-maven.md` |
| "Pilot validation criteria" | `history/reference-run-java-maven.md` |
| "Live validation record" block | `run-template/ADOPTION-RUN-LOG.template.md` |
| `PENDING END-TO-END VALIDATION` status | Retained verbatim as a live status marker |

Nothing in old §18 was dropped without a destination. Line count: 135 → 100, with the
reduction coming from six repeated conditionality paragraphs and the transcribed gate
detail now reachable by link.
