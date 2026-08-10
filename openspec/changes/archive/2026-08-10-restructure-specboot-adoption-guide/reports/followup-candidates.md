# Follow-Up Candidates (Task 3.12)

Findings recorded during the restructure, deliberately **not** fixed inline. Per design
Non-Goals and `CLAUDE.md` §7, a defect discovered while reshaping a step is recorded here,
not corrected as part of a restructuring change.

## 1. One historical prompt was live in the execution path (resolved structurally, noted for the record)

The pre-restructure guide kept the Claude Code project-permission smoke-test prompt — labeled
`HISTORICAL PROMPT — VERIFIED VERBATIM` — live inside section 5, and its own section 20
inventory acknowledged this as "Still live in Section 5 — out of scope for this relocation."

This conflicts with the rule that every live step presents exactly one canonical prompt and
never a historical one (design D4). Resolution applied within scope: the historical block was
relocated byte-for-byte to `history/prompt-inventory.md`, and `ADOPT-05B` now presents a
consolidated form that additionally parameterizes the OpenSpec config path, makes the
CodeGraph query conditional on CodeGraph actually being adopted, and states the FAIL
discipline explicitly. No procedural meaning changed.

## 2. `codegraph sync` was unconditional in the baseline step

Section 16 listed `codegraph sync` alongside `openspec doctor` and `git status --short`
without conditioning it on CodeGraph adoption, which contradicts the CodeGraph-is-optional
framing the same guide establishes in sections 4 and 5. `ADOPT-16` now marks it conditional.
This is a consistency repair inside the scope of the conditionality work (design D7), not a
procedural change.

## 3. Section 19's "Reference observations" contain run-specific evidence

`19-permissions-policy.md` retains bullets describing what one particular Claude
configuration observed ("executed 8 verified read-only commands with zero permission
prompts"). Arguably this belongs in `history/reference-run-java-maven.md` alongside the other
reference-run evidence. Left in place: the surrounding bullets are policy rationale, and
splitting them would fragment an argument mid-list. Candidate for a future cleanup pass.

## 4. `Final Acceptance Criteria` still references "the runbook"

The closing criteria mention "The guide and runbook are physically present, versioned, and
reviewed." The runbook concept is superseded by the run-log template. The wording was left
unchanged because these are the guide's own acceptance criteria for company reuse, and
editing them would change what the guide claims about its own readiness — out of scope for a
restructure. Candidate for the next substantive guide revision.

## 5. Two live files still say "Section 5" where the live target is `ADOPT-05B` — **Minor, accepted, not fixed**

**Both** live occurrences, enumerated rather than sampled:

| # | Location | Text | Reached by |
|---|---|---|---|
| 5a | `specboot-adoption/22-troubleshooting.md:157` | "Configure the **Section 5** permission files early" — inside the "Read-only commands repeatedly request permission" entry, which is where `ADOPT-05B`'s `On failure` points | **agent attempt 3** (task 16.24) |
| 5b | `specboot-adoption/19-permissions-policy.md:13` | "…in the [`ADOPT-05B` — Configure Selected-Client Permissions](03-client-permissions.md) subsection **at the end of Section 5**" — describes a containing structure that no longer exists | **`/specboot-verify` VF13** and, independently, **Codex cross-client `/adversarial-review` AR15** |

Section 5 is retired numbering; the live target in both cases is `ADOPT-05B` in
`03-client-permissions.md`.

**Why 5b was missed when 5a was recorded.** The reproducing command for this figure was scoped to a
single file — `grep -n 'Section 5' specboot-adoption/22-troubleshooting.md` — so it could not
surface an instance anywhere else in the set. The command was literal and its output was correct;
its **scope** was narrower than the claim it was supporting. That is the same defect class as AR14,
in miniature, and it is why the replacement command below runs over the whole guide set.

Reproduce (repository root):

```bash
grep -rnE 'Section [0-9]+' SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/
```

Nine matches: the two live references above, and seven in
`specboot-adoption/history/prompt-inventory.md` (lines 20, 21, 22, 55, 72, 88, 104).

**The seven history matches are not stale references and must not be "fixed".** They are
**intentional historical aliases** — headings such as "Section 6 — Adapt the Repository Technical
Context (relocated historical prompt)" name the section a preserved verbatim prompt *originally*
came from, which is the whole point of a relocation record. The same protection covers the "formerly
§N" wording in `SPECBOOT_ADOPTION_GUIDE.md`'s permanent §-number → step-ID map and in the repaired
references in `README.md` and both `specboot-instructions.md` copies: design D3 retains §-numbers as
permanent aliases precisely so external citations keep resolving. Editing any of those would break
back-compatibility to fix nothing.

**Severity: Minor, for both.** Each is resolvable through the entry file's permanent §-number →
step-ID map (§5 permissions subsection → `ADOPT-05B`), so each is stale wording inside a live file,
**not** a dead-end pointer under design D13. No recovery instruction is wrong, and no step's failure
path fails to resolve because of either.

**Disposition: accepted as a follow-up, deliberately not fixed in this change, and no further
correction cycle opened — this now covers 5a *and* 5b.** Editing `22-troubleshooting.md` or
`19-permissions-policy.md` now would modify an implementation
file *after* the acceptance gate that judged it, invalidating attempt 3's PASS under the
proposal's verification-evidence persistence contract and requiring a fourth fresh attempt — for
a cosmetic reference. That trade is refused deliberately, and the finding is preserved here
rather than dropped. It is the same discipline the guide asks of its own operators: record the
diagnosis as a follow-up candidate and let the entry be corrected later through the normal change
workflow, one reviewed entry at a time, instead of editing the troubleshooting file mid-flight.

Candidate for the next substantive guide revision, alongside candidates 3 and 4.
