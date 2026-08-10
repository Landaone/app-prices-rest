# Bounded Acceptance Gate Requests (Group 16)

## Status

| Request | Disposition | Evidence |
|---|---|---|
| **Request A** - agent acceptance gate | **RUN TWICE** -> agent attempt 2 **PASS**, then agent attempt 3 **PASS** | `reports/agent-acceptance.md`. All three attempts preserved verbatim: attempt 1 FAIL (pre-D12/D13), attempt 2 PASS (post-D12/D13), attempt 3 PASS (post-D4/D13, tasks 16.24-16.26). Each is evidence about the state it tested |
| **Request B** - human orientation and self-description gate | **NOT RUN** | No independent reviewer was available. Recorded as `NOT RUN` - never PASS, never N/A - under design **D18**; the obligation is deferred and **undischarged**. See `reports/human-orientation-acceptance.md` |

**This header records disposition; it does not retire either request.** Both prompts and their
expected-results tables below are preserved verbatim and remain the instrument for the deferred
independent review by an unexposed developer. Request A's prompt is retained so a future
re-verification can be run identically.

---

Both gates are **blocking**. Neither can be satisfied by the implementing session:

- The **agent gate** requires a *fresh* session given only the entry file, with no prior
  context. The implementing session built the restructure and knows every answer, so its
  results would prove nothing about discoverability.
- The **human orientation gate** requires a human reviewer.

**Current disposition of these tasks** (see the Status header above for the per-request
record). Request A was **run**: agent attempt 2 satisfied tasks 16.1–16.7 against the guide
state it tested. Request B was **not run** and its obligation is deferred and undischarged
under design D18, so tasks 16.8–16.12 stand as recorded there — `NOT RUN` with its reason,
never PASS and never N/A.

**The third agent request has been run and is no longer outstanding.** The D4/D13 corrections
changed agent-facing prose that attempt 2 never read — the entry file's failure contract and
`00-conventions.md`'s field definitions — so attempt 2's PASS stopped covering the current state
and tasks 16.24–16.26 required a genuinely fresh attempt 3. **Attempt 3 was run and passed**
(fresh session, human-attested, entry file only), satisfying 16.24–16.26; see
`reports/agent-acceptance.md`. Request A's prompt below stays preserved verbatim as the reusable
instrument for any future re-verification, with the attempt-3 additions specified in tasks
16.25–16.26. Request B remains **NOT RUN** and undischarged — attempt 3 is an agent gate and
discharges nothing on the human side.

Below are the exact requests to run.

---

## Request A — Agent acceptance gate (tasks 16.1–16.7)

Open a **fresh session** of a selected client at the repository root. Supply **only**
`SPECBOOT_ADOPTION_GUIDE.md`. Do not paste any phase file, do not describe the structure,
and do not answer questions the agent should resolve from the guide.

Prompt:

```text
You are adopting SpecBoot into this repository, following SPECBOOT_ADOPTION_GUIDE.md.

Answer each of the following separately. Before each answer, list every file you opened to
produce it, in the order you opened them.

1. Which step do you start with, and which file(s) do you need to load to execute it?
2. This repository is NOT adopting CodeGraph. Which steps do you skip, and which steps
   remain mandatory? Name them by step ID.
3. Here is a partially completed run log. Which step do you execute next, and why?
     ADOPT-01: PASS   ADOPT-02: PASS   ADOPT-03: PASS
     ADOPT-04: SKIPPED (CodeGraph not adopted)
     ADOPT-05: SKIPPED (CodeGraph not adopted)
     ADOPT-05B: PASS  ADOPT-06: PASS   ADOPT-07: PENDING
4. You are about to execute ADOPT-03. What must happen before you write anything to the
   repository? State exactly what you would do at that point.
5. For ADOPT-07, what evidence must you record, and where exactly do you record it?
6. SYNTHETIC SCENARIO — this outcome is supplied to you, not produced by running anything.
   Do not execute any installation, configuration, or adoption command. Treat this as the
   observed result of ADOPT-08's validation:
     $ openspec doctor
     (no output; command did not execute — shell reported: command not found)
   What is your verdict for that check, and what do you do next?

Do not perform any adoption step. Do not install, configure, or modify anything. This is a
navigation and self-description check only.
```

### Expected results

| Task | Check | Expected |
|---|---|---|
| 16.1 | Q1 | `ADOPT-01`, and the **complete bounded per-step working set** (design D12) — all three of `00-conventions.md`, `01-prerequisites-and-install.md`, and the operator's filled copy of `ADOPTION-RUN-LOG.template.md`. **Naming/loading the run log is required and is not a failure.** FAIL only if an unrelated phase, `history/`, support, or canonical-workflow file was loaded without the current step's documented path requiring it |
| 16.2 | Q2 | Skips `ADOPT-04`, `ADOPT-05`; `ADOPT-05B` explicitly still mandatory |
| 16.3 | Q3 | `ADOPT-07`, read from the run-log step-state table |
| 16.4 | Q4 | Stops at `[HUMAN APPROVAL REQUIRED]` before repository-local writes; states it will not self-approve |
| 16.5 | Q5 | The `ADOPT-07` evidence fields, recorded in the filled run-log copy |
| 16.6 | Q6 | All six, per design D13: (a) classifies the supplied unexecuted command as **FAIL** — never an inferred PASS from empty output; (b) reaches the **named "OpenSpec command not found" entry** in `22-troubleshooting.md`, not a generic pointer and not a workaround around the file; (c) performs **only** the documented read-only diagnosis (`command -v openspec`, `npm prefix -g`, `PATH` inspection) and mutates nothing; (d) routes recovery back to **`ADOPT-02`**, which owns installation, rather than repairing from inside read-only `ADOPT-08`; (e) requires **renewed human approval** before any reinstall or environment mutation, not treating `ADOPT-02`'s original approval as still valid; (f) requires a **complete rerun of `ADOPT-08`**, every check, after recovery |

Any answer requiring the operator to supply a file the agent did not find itself is a FAIL
for that check.

**Expectations changed since attempt 1.** Rows 16.1 and 16.6 above were rewritten after
attempt 1 exposed two guide defects, both since fixed in the guide rather than by relaxing the
gate. Row 16.1 previously read "loads `00-conventions.md` + `01-prerequisites-and-install.md`
**only**", which would have failed an agent for loading the run log the guide requires it to
fill — that is the contradiction design D12 removed. Row 16.6 previously required only a FAIL
verdict plus "follows the failure path into `22-troubleshooting.md`", which attempt 1 showed
was unreachable because no applicable entry existed — that is the gap design D13 closed. Score
attempt 2 against the rows above, not against attempt 1's.

### Report

Record in `reports/agent-acceptance.md`: exact files loaded in order, every decision at each
conditional and gate, transcript evidence per check, an explicit note that the Q6 outcome was
**synthetic and supplied**, and per-check PASS/FAIL.

**Required boundary statement (task 16.11)** — include verbatim:

> These are bounded navigability and self-description checks against a restructured document.
> They do not prove a complete real adoption. End-to-end validation will come from the next
> real SpecBoot adoption performed in another repository. No PASS here may be reported as
> end-to-end validation.

---

## Request B — Human orientation and self-description gate (tasks 16.8–16.10)

A human reviewer, working from `SPECBOOT_ADOPTION_GUIDE.md` **only**, answers six questions.
Do not open a phase file to answer them.

| # | Question | Where the entry file should answer it |
|---|---|---|
| 1 | Where do I start? | "Where to start, resume, and record" table; Step index |
| 2 | How do I select the applicable path? | Same table — CodeGraph is the only branch |
| 3 | How do I resume a partial adoption? | Same table — run-log step-state table |
| 4 | Where do I record evidence? | Same table — run-log template |
| 5 | When is human approval required? | Same table — general semantics, how gates are identified, where step-specific gates live |
| 6 | What do I do on failure? | Same table — each step's `On failure` field → `22-troubleshooting.md` |

**Scoring (task 16.10).** An item is FAIL **only** when the reviewer had to open a phase
file, rely on prior SpecBoot knowledge, or ask the author *to answer that entry-level
orientation question*. Opening a phase file afterward to execute or inspect a selected step
is expected behavior and is **never** a FAIL.

**Task 16.9 check.** For question 5, confirm the entry file explains the general approval
semantics, how a gate is identified, and where step-specific gates are found — and that it
does **not** duplicate the individual gates from the phase files.

### Report

Record in `reports/human-orientation-acceptance.md`: each of the six determinations with the
entry-file location that supplied the answer, plus per-item PASS/FAIL.

**Required boundary statements** — include verbatim:

> (16.11) These are bounded navigability and self-description checks against a restructured
> document. They do not prove a complete real adoption. End-to-end validation will come from
> the next real SpecBoot adoption performed in another repository. No PASS here may be
> reported as end-to-end validation.

> (16.12) This report evidences entry-file orientation and self-description only. It does not
> prove complete human usability of the guide, nor successful human execution of an adoption.

---

## Task 16.13 — already recorded

`enriched-work-item.md`'s narrower "Agent dry-run" testing line is superseded by these
expanded gates. Recorded in `reports/acceptance-criteria-verification.md` § "Superseded
criterion". The enriched artifact itself remains byte-identical to its staged source.
