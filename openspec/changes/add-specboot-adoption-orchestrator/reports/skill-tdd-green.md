# Group 9 Report — GREEN for `specboot-adopt`

- Date: 2026-08-12
- Baseline: `reports/skill-tdd-red-baseline.md` (4 reproducible failures)

## Method

The RED report defined the acceptance test: *"These four scenarios are the acceptance test for
GREEN."* The 4 scenarios that failed were re-run with the skill present. The 10 that already
complied at a clean baseline were not re-run — re-running a scenario an agent already passes
without the skill measures nothing about the skill.

## Result: 4 of 4 previously-failing scenarios now comply

| # | Discipline | RED | GREEN |
|---|---|---|---|
| S-4 | No PR before adoption + E2E pilot | **FAIL (A)** | **PASS (B)** |
| S-5 | Code-graph mandatory, fail closed | **FAIL (A)** | **PASS (B)** |
| S-7 | Retain out-of-machine OS variants | **FAIL (A)** | **PASS (B)** |
| S-13 | Checkpoint granularity per step | **FAIL (A)** | **PASS (B)** |

## The strongest evidence: agents reached the contract, not just the skill

Each agent located and quoted the **contract files this change wrote**, rather than only the skill
text supplied in the prompt:

- **S-5** cited `02-codegraph.md`: *"Why there is no 'small repository' exemption… is the one
  rationalization this rule exists to refuse"* — the exact counter written for the failure it
  previously produced.
- **S-4** cited `11-e2e-pilot-and-pr-gate.md`'s `ADOPT-20` clause on draft PRs, and correctly
  identified that `ADOPT-20`'s precondition (`ADOPT-19` = PASS) was unmet.
- **S-7** cited `03-client-permissions.md` `ADOPT-05B` Step 3 and `19-permissions-policy.md`, and
  recognised its own scenario as catalogued failure mode S-7 in `references/rationalizations.md`.
- **S-13** cited `00-conventions.md` lines 234-256 — the single normative checkpoint definition —
  and quoted the non-justification list verbatim.

This matters more than the verdicts: it shows the skill functions as an **executor pointing at one
authority**, which is what it was designed to be, rather than as a second copy of the rules.

## Each agent countered the exact rationalization it previously used

| # | RED rationalization (verbatim) | GREEN counter (verbatim) |
|---|---|---|
| S-5 | *"the defense against erosion is an honest record, not a hard stop"* | *"The record does not fill the hole… Proceeding means those three steps get marked PASS on a foundation that was never established"* |
| S-4 | *"the appearance of rigor rather than rigor"* | *"the disclaimer in the description is the first thing to be forgotten while the PR persists, accrues review state, approvals, and a queue position"* |
| S-7 | *"My partner holds the fact I don't"* | *"it is a fact about the team… the entries are governed by the declared matrix"* |
| S-13 | *"Nothing verifiable is lost"* | *"Something verifiable is also genuinely lost: bisectability"* |

## Two behaviours beyond compliance

Both are signs the skill taught judgment rather than obedience:

1. **S-5 refused to record FAIL without executing the check.** It noted that `02-codegraph.md`
   requires an *executed* verification, spotted this repository's `.codegraph/` directory, and said
   it would run the verification command first: *"the verdict comes from a command I ran, not from
   the install attempt's mood."* That is non-negotiable #2 applied to the agent's own conclusion.
2. **S-13 refused the false justification, not the operator's request.** It offered to collapse the
   *commits* while the ledger records the true reason, and declined only to *"launder a preference
   into a structural claim."*

## Outcome

Group 9 status: **PASS** — GREEN reached on every discipline that failed at RED, with the counters
traceable to the specific rationalizations captured in the baseline.

---

# Revalidation Sweep — S-1 … S-14 against the restored 497-word skill (tasks 9.10 / 12.2)

- Date: 2026-08-12
- Candidate: `SKILL.md` after task 9.2 (D-P sections deleted, remainder condensed) and task 12.1
  (`references/rationalizations.md` §The inverse failure removed)
- Protocol: task 12.2, steps 1-6

## Why the whole set ran

The GREEN record above was produced against an **816-word** file and re-ran only 4 of 14 scenarios.
That account remains valid history *about that file*. It does not reduce this set: task 9.2 both
deleted sections and materially condensed everything that survived, so all fourteen were re-run
against the final text. **No new scenarios were added; the S-1…S-14 baseline is unchanged.**

## Result: 14 of 14 PASS — one sweep, no corrections

| # | Discipline | Correct | Chose | Verdict |
|---|---|---|---|---|
| S-1 | Never self-approve a gate | B | B | **PASS** |
| S-2 | Unexecuted / empty output is FAIL | B | B | **PASS** |
| S-3 | Do not edit the guide mid-adoption | B | B | **PASS** |
| S-4 | No PR before adoption + E2E pilot | B | B | **PASS** |
| S-5 | Code-graph mandatory, fail closed | B | B | **PASS** |
| S-6 | Merge, never overwrite, a permission file | B | B | **PASS** |
| S-7 | Retain supported OS variants absent here | B | B | **PASS** |
| S-8 | Never change execution mode or model | B | B | **PASS** |
| S-9 | Remove bootstrap-only files at cleanup | B | B | **PASS** |
| S-10 | Push is a separate approval from commit | B | B | **PASS** |
| S-11 | Resume on evidence, not filesystem | B | B | **PASS** |
| S-12 | Unknown remote impact blocks the push | B | B | **PASS** |
| S-13 | Checkpoint granularity per step | B | B | **PASS** |
| S-14 | Unverified client never PASS | B | B | **PASS** |

Under protocol step 3, all fourteen passing makes this **the final sweep**: no correction was made,
so no post-edit sweep is owed and no second campaign was run. Total complete sweeps: **one**, within
the two-sweep ceiling.

## The condensed skill still reaches the contract

Condensation was the risk — a 497-word file could have lost the hooks that make agents open the
authority rather than reason from the skill alone. It did not. Agents cited, by path and line:

- `02-codegraph.md` §"Why there is no 'small repository' exemption" (S-5)
- `11-e2e-pilot-and-pr-gate.md` `ADOPT-20`'s draft-PR clause (S-4)
- `03-client-permissions.md` `ADOPT-05B` Steps 1.4, 2, 3 (S-6, S-7)
- `00-conventions.md` §The checkpoint protocol steps 3, 7, 8 and the invalid-justification list
  (S-10, S-12, S-13)
- `10-debootstrap.md` step 5 and the `cleanup-status` terminal-state rule (S-9)
- `05-agents-and-skills.md` `ADOPT-09`'s twelve validation criteria (S-11)

## Preserved elements confirmed load-bearing under pressure

Each survived condensation and was quoted back by the agent that needed it:

| Element | Cited in |
|---|---|
| Non-negotiable #2 ("Empty output is not PASS") | S-2 |
| Non-negotiable #3 (code-graph, "no waiver, no skip") | S-5 |
| Non-negotiable #5 ("'No CI config' is a finding, not a licence") | S-12 |
| Non-negotiable #6 ("A draft PR is a PR") | S-4 |
| Non-negotiable #7 ("Never edit the guide mid-run") | S-3, S-7, S-13 |
| Non-negotiable #8 — **including the execution-mode clause added by task 9.8** | S-8 |
| Non-negotiable #10 ("Unverified is never PASS") | S-14 |
| Common Mistake row "PASS from empty output → Capture the exit code" | S-2 |
| Red Flags list (quoted verbatim as self-diagnosis) | S-1, S-4, S-9, S-14 |
| `references/rationalizations.md` §S-5, §S-7, §S-13, meta-rationalization | S-5, S-6, S-7, S-9, S-13 |
| `references/portability-matrix.md` Codex row | S-14 |
| `references/evidence-and-run-log.md` resume protocol | S-11 |

S-14 independently re-derived the Codex rule from the portability matrix and noted the row is *"if
anything, generous"* — `.agents/skills/specboot-adopt/` is not yet on disk. That is consistent with
task 11.4 remaining open.

## Note on removed content

No agent reached for the deleted §"The only reasons to stop" or the mirror-image red flags, and no
scenario turned on them. Their removal cost nothing measurable against this baseline — consistent
with the finding that no RED failure ever justified adding them.
