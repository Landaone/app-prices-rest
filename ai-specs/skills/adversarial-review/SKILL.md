---
name: adversarial-review
description: Use when the user requests an adversarial review, red-team review, devil's advocate check, or independent verification pass before archiving an OpenSpec change.
author: LIDR.co
version: 1.0.0
---

# adversarial-review Skill

Act as an **independent adversarial reviewer**: assume gaps, flaws, or unsafe behavior may exist until you have argued against them with evidence.

This skill is intended for the **verification window** of spec-driven development (after implementation, **before** archiving), when the human runs a **different agent or session** than the one that implemented the change.

Do **not** prescribe which agent, model, or IDE to use. That is the human's choice.

## Inputs

- Optional context from user (same style as `show-spec-working`):
  - Direct ticket id in text (for example: `SCRUM-10`)
  - Feature or change name
  - Endpoint(s)
  - Frontend route(s)
  - **Pull request**: URL, or host owner/repo and number (for example: `https://github.com/org/repo/pull/42` or `owner/repo#42`)
- If missing, infer from the current session (active change, branch, or OpenSpec folder).

Resolve scope in this order: explicit ticket or change name → PR when given → current active work.

## Mindset (adversarial review)

Borrowed from common red-team / adversarial practice:

- **Try to break the system**, not only to confirm happy paths.
- **Hunt incorrect assumptions** about data shape, timing, ordering, authz, idempotency, and error handling.
- **Trace cross-boundary and composition risks**: pieces that look fine in isolation but fail together (multi-file, API plus UI, retries plus side effects).
- **Treat the diff as incomplete context**: missing tests, missing negative paths, or spec drift can hide issues.
- **Calibrate depth** to risk: auth, payments, PII, privilege boundaries, and data mutation deserve stricter scrutiny.

## Workflow

### Step 1 — Load the specification side first

1. Identify the OpenSpec change directory and read the relevant artifacts (proposal, design, specs, scenarios, `tasks.md`).
2. Extract **acceptance criteria and explicit non-goals**. List what must be true for "done."
3. Note anything **underspecified** (ambiguous acceptance, missing error cases, missing security constraints).

### Step 2 — Load the implementation side

1. If a **PR** was provided, treat it as the primary implementation surface:
   - Read the PR description and review the full diff scope (not only the default file ordering).
   - Map **files and changes** to spec sections and tasks.
2. If no PR: use `git diff` against the merge base or the branch associated with the change, per project convention.

### Step 3 — Adversarial pass (refute, do not rubber-stamp)

For each acceptance criterion or scenario:

1. State how the implementation **could still fail** while the author believed it passed (wrong input, partial failure, double-submit, stale cache, wrong role, race, empty state, oversized payload).
2. Check **negative and abuse cases** where relevant (validation bypass strings, IDOR-style access patterns, replay, conflict handling).
3. Check **tests and verification artifacts**: do they **prove** the criterion, or only the happy path?
4. Record **spec vs code mismatches** (spec says X, code does Y) as first-class findings.

### Step 4 — Severity and recommendations

Classify each finding:

- **Blocker**: incorrect behavior, security/privacy issue, or spec violation that should stop archive.
- **Major**: likely bug or significant gap; fix or spec update required before archive.
- **Minor**: clarity, maintainability, or low-risk gap; can follow up.
- **Question / assumption**: needs human or author confirmation.

For each finding, state whether the fix belongs in **code**, **tests**, **OpenSpec artifacts** (scenarios, specs, tasks), or **documentation**.

### Step 5 — Verdict (deterministic mapping — apply mechanically)

This is a **two-phase** procedure, applied immediately before writing the verdict. Do not skip phase 1 and jump straight to counting — an unresolved `Question / assumption` row left in the table by phase 1 is what phase 2's mapping depends on to be exhaustive.

**Phase 1 — Resolve every `Question / assumption` row.** For each `Question / assumption` finding still in the table, decide using only what was actually investigated during this read-only review:
- **Resolved with recorded evidence** (you found the answer in the spec, code, tests, PR, or an explicit confirmation already on record): remove the row from the final Findings table, and record what resolved it — either inline in the table (e.g. a "Resolved" note with the evidence) or in the surrounding narrative. Never remove a row without recording the evidence that resolved it.
- **Still genuinely open**: leave the row in the table, unresolved. Do **not** remove it because it seems "probably fine," "likely not material," or because resolving it would be inconvenient — an unresolved question is exactly the kind of thing a human approving archive needs to see, not a detail to quietly drop.

**Phase 2 — Count what remains, then apply the mapping.** The mapping is exact, exhaustive over every category that can appear in the table (Blocker, Major, Minor, and unresolved `Question / assumption`), and admits no exceptions:

1. **Blocker count + Major count > 0** → verdict is **FAIL**. This applies no matter how many Minor findings or unresolved questions/assumptions also exist — a single open Blocker or Major always forces FAIL, it is never averaged or outweighed by unrelated lower-category findings.
2. **Else, Minor count > 0 OR unresolved `Question / assumption` count > 0** (zero Blocker, zero Major) → verdict is **PASS WITH GAPS**. A Findings table containing *only* unresolved questions — no Blocker, no Major, no Minor — still lands here, never in branch 3. `Question / assumption` is a finding category needing confirmation, not a fourth severity — it is folded into this same branch as Minor, not given its own branch or its own consequence.
3. **Else** (the table has nothing left in it — no Blocker, no Major, no Minor, and every question was resolved with recorded evidence in phase 1) → verdict is **PASS**.

An open Blocker or Major finding means the change is **not archive-eligible** on the basis of this review — do not record PASS or PASS WITH GAPS while one remains open, even if the overall implementation otherwise looks solid. Recount the table at the moment of writing the verdict; do not rely on an earlier impression of overall severity formed while drafting findings, and do not rely on an earlier impression of how many questions were "basically resolved" — only phase 1's recorded evidence counts.

### Step 6 — Reviewer provenance

Report, for every review performed:

- **Implementing session**: the session/agent identity (or conversation) that implemented the change being reviewed.
- **Reviewing session or mechanism**: a distinct session, a distinct client, or — when neither is available — a real subagent invocation within the same session. Never leave this implicit.
- **Client used for review**: which AI client (Claude, Kiro, etc.) performed this review.
- **Cross-client status**: whether the reviewing client/session differs from the implementing one (`cross-session`, `cross-client`, or `same-session-fallback`).
- **Documented fallback**: when no second independent session or client is available, name the fallback mechanism explicitly (e.g. "same-session subagent invocation via the Agent tool") rather than silently reviewing as if independence were achieved. A same-session fallback is weaker evidence than a genuinely independent session or client — say so plainly so the reader can judge the review's strength instead of assuming an independence that wasn't achieved.

## Output format

Use this structure in chat:

```markdown
## Adversarial review

**Scope**: <ticket / change / PR>
**Sources**: <list spec paths + PR or diff reference>

### Reviewer provenance
- **Implementing session**: <identity/description of the session that implemented the change>
- **Reviewing session/mechanism**: <distinct session / distinct client / same-session subagent invocation>
- **Client used**: <Claude / Kiro / other>
- **Cross-client status**: <cross-session | cross-client | same-session-fallback>
- **Fallback used (if any)**: <none | explicit description of the fallback mechanism>

### Spec and task alignment
- ...

### Findings

| Severity | Area | Finding | Evidence | Suggested fix (code / spec / tests) |
|----------|------|---------|----------|--------------------------------------|
| Blocker / Major / Minor / Question / assumption | | | | |

Any `Question / assumption` row still in this table when the verdict is written is **unresolved** — it was not removed because no recorded evidence resolved it. A row only disappears from this table between drafts if a "Resolved" note with its evidence is recorded (here or in the narrative above); it is never silently dropped.

### Verdict
<derived strictly from the Findings table above, exhaustively over every row present: any Blocker or Major present → FAIL; else any Minor present OR any unresolved Question/assumption present → PASS WITH GAPS; else (table empty) → PASS. A Question/assumption-only table is PASS WITH GAPS, never PASS.>
PASS | PASS WITH GAPS | FAIL

### Recommended next steps (before archive)
- ...
```

## Guardrails

- **Do not** praise implementation to "balance" criticism unless a strength **directly mitigates a documented risk**.
- **Do not** skip reading OpenSpec artifacts when they exist in the repo.
- If you cannot access the PR or diff, say so and list exactly what is needed to continue.
- **The verdict-severity mapping is mechanical, not a judgment call.** Never record PASS or PASS WITH GAPS while an open Blocker or Major finding exists anywhere in the Findings table — recount before writing the verdict rather than trusting an earlier impression.
- **Never record PASS while an unresolved `Question / assumption` remains in the Findings table.** A table with only unresolved questions (no Blocker/Major/Minor) is PASS WITH GAPS, not PASS — the mapping is exhaustive over all four finding categories, not just the three severities. A `Question / assumption` row may be removed only when phase 1 of Step 5 actually resolved it with recorded evidence — never because it was inconvenient, seemed minor, or was simply forgotten to carry forward.

## Completion

Always end with the verdict and whether archiving is **advisable** in the current state.

A PASS or PASS WITH GAPS verdict here does **not**, by itself, grant archive approval — it only means this review does not block the workflow's next step. Explicit human approval is still independently required before archive approval may be requested or granted, symmetric to how a SpecBoot verify PASS alone does not grant archive approval either.
