# Final gate records before archive — 2026-08-10

The last `/specboot-verify` verdict, the last `/adversarial-review` verdict, and the explicit human
archive approval, each with the provenance identifying **which state it judged**. Written
immediately before archiving, as the closing entry in this change's evidence trail.

**This record is report-only.** No guide file, no executable contract file, no planning artifact,
and no readiness claim was changed to produce it. Under the proposal's verification-evidence
persistence contract, persisting a byte-faithful gate record *after* the gate does not invalidate
that verdict when only the report record changes — the rule that exists so recording a verdict
cannot recursively invalidate the verdict being recorded.

---

## The state all three records identify

| Field | Value |
|---|---|
| Date | 2026-08-10 |
| Branch | `feature/restructure-specboot-adoption-guide` |
| `HEAD` | `0e6eb75d974d7851c948888225c0f252d05aac27` |
| Working-tree scope | 4 modified tracked files (`README.md`, `SPECBOOT_ADOPTION_GUIDE.md`, both `specboot-instructions.md` copies) + untracked `specboot-adoption/**` and the change directory. Nothing committed. |
| Guide set | 15 files / 3,222 lines / 18,399 words |
| Guide-set aggregate SHA-256 | `7789aee3065b5f28ef83656e8cb43e1c1abb412e47a6a39c04993330d5b82d7a` |
| Entry file SHA-256 | `0405b6bd8772eba122a516c4add3a05cce9d170e48710a2c935a79948f5fa1c0` (18,529 bytes / 287 lines) |
| `openspec validate --strict` | valid, exit `0` |
| Artifacts | `proposal` done · `specs` **skipped** (`skip_specs: true`) · `design` done · `tasks` done |
| Tasks | **129 complete / 0 incomplete** |

The entry-file hash is **identical** to the one agent attempt 3, the D20 human decision, and the
round-3 verify/review pair recorded. The state judged by every gate in this change's trail and the
state being archived are the same state.

Reproduce the state block:

```bash
git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
git status --short
find SPECBOOT_ADOPTION_GUIDE.md specboot-adoption -type f -name '*.md' | sort | xargs shasum -a 256 | shasum -a 256
find SPECBOOT_ADOPTION_GUIDE.md specboot-adoption -type f -name '*.md' | wc -l
cat SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/history/*.md specboot-adoption/run-template/*.md | wc -l
cat SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/history/*.md specboot-adoption/run-template/*.md | wc -w
shasum -a 256 SPECBOOT_ADOPTION_GUIDE.md
openspec validate restructure-specboot-adoption-guide --strict
grep -c '^\s*- \[x\]' openspec/changes/restructure-specboot-adoption-guide/tasks.md
grep -c '^\s*- \[ \]' openspec/changes/restructure-specboot-adoption-guide/tasks.md
```

Run from the repository root, **before** the archive move; afterwards the change path is
`openspec/changes/archive/2026-08-10-restructure-specboot-adoption-guide/`.

---

## Gate record 1 — final `/specboot-verify`, 2026-08-10

**Verdict: PASS WITH GAPS — 0 Blocker, 0 Major, 2 Minor.**

### Provenance

| Field | Value |
|---|---|
| Client | Claude Code (VSCode extension), model exposed by the client as Opus 5 (`claude-opus-5`) |
| Session lifecycle | New chat, no prior conversation context before the `/specboot-verify` invocation. Whether the client window was reloaded is not exposed to the client. |
| Invocation | `/specboot-verify restructure-specboot-adoption-guide` |
| Canonical skill | Resolved through `.claude/skills/specboot-verify` → `ai-specs/skills/specboot-verify` (`readlink` verified in-session); `SKILL.md` SHA-256 `a95fc1bedefa4ab1b753a2b761ffab5ab14ccd9960f8d81c7aa1578e68f3e00f`, identical across `ai-specs/`, `.claude/`, and `.kiro/` |
| Subagents / other skills / MCP | **None** invoked |
| Evidence classification | **Claude — live runtime** (the invocation actually executed). **Kiro — static filesystem/naming validation only** (files inspected; no Kiro invocation executed) |
| Limitation | Same-client with the implementing sessions. This is a verification gate, not an independent review. |

### Figures re-derived independently, not read from the reports

Every one reproduced exactly. Commands are literal and runnable from the repository root
(design D19).

| Check | Result | Command |
|---|---|---|
| Strict validation | valid, exit `0` | `openspec validate restructure-specboot-adoption-guide --strict` |
| Link and anchor checker | 15 files, 122 internal links, **0 broken**, exit `0` | `CMD-A8` in [`acceptance-criteria-verification.md`](acceptance-criteria-verification.md) |
| Verbatim fidelity | HEAD 586/1757/1774/1790 → `prompt-inventory.md` 57/74/90/153, SHA-256 equal, occurrences 1 each — **4/4** | `CMD-A7` in [`acceptance-criteria-verification.md`](acceptance-criteria-verification.md) |
| Approval gates | 20 markers; 11/11 preserved gates resolve to a live marker; 11 + 6 + 2 + 1 = 20 | `CMD-A5` in [`acceptance-criteria-verification.md`](acceptance-criteria-verification.md) |
| Step contract | 18 steps · 144 field labels · `Action` forms 10 shell / 6 prompt / 1 gated (`ADOPT-08`) / 1 written (`ADOPT-05B`) | `CMD-A4` in [`acceptance-criteria-verification.md`](acceptance-criteria-verification.md) |
| Other invariants | record blocks 20 · `LIVE VALIDATION REQUIRED` 1 · verbatim mentions 12 · consolidated 10 · reusable 7 · troubleshooting entries 18 · 18,399 words | `CMD-B4` and `CMD-B8` in [`invariant-reconciliation.md`](invariant-reconciliation.md) |
| Untouched paths / diff scope | 8/8 exit `0`; `4 files changed, 190 insertions(+), 1948 deletions(-)` | `CMD-A11` in [`acceptance-criteria-verification.md`](acceptance-criteria-verification.md) |
| Literal-command audit | 26 `CURRENT` rows, 16 command blocks, **AUDIT PASS**, exit `0` | the audit block under "Literal-command audit" in [`invariant-reconciliation.md`](invariant-reconciliation.md) |
| Two `specboot-instructions.md` copies | differ at line 204 only (image URL) — expected non-zero `diff`, evaluated by content | `diff ai-specs/specboot-instructions.md packages/specboot/template/ai-specs/specboot-instructions.md` |

Capability availability, re-derived from the filesystem: client roster `.claude/` and `.kiro/`
(no `.cursor/`, no `.codex/`); **6/6** required capabilities present and resolving for both.

### Findings

| ID | Severity | Finding | Disposition |
|---|---|---|---|
| **VF14** | Minor | `proposal.md:44` and `design.md:487` still describe the D20 human archive decision as outstanding ("is **pending**", "is recorded nowhere today"), while [`human-orientation-acceptance.md:280`](human-orientation-acceptance.md) records it as **DECIDED 2026-08-10**. Neither planning artifact carries the "state at the time" note that [`invariant-reconciliation.md`](invariant-reconciliation.md) gives its own preserved pre-decision text, so a reader of either alone gets a stale picture. | **Accepted, not corrected.** Task 10.21 deliberately scoped the D20 record to `reports/` ("report-only; no readiness claim changes"), and the finding understates progress rather than overstating approval — it can never be read as claiming an approval that does not exist. Carried forward as **AD-2** below. |
| — | Minor | Two live guide files still use retired numbering: `specboot-adoption/22-troubleshooting.md:157` and `specboot-adoption/19-permissions-policy.md:13` say "Section 5" where the live target is `ADOPT-05B`. | **Not a new finding** — this is accepted follow-up candidate 5 (5a/5b) restated, already recorded in [`followup-candidates.md`](followup-candidates.md) and already found cross-client as `VF13 ≡ AR15`. No action. |

---

## Gate record 2 — latest `/adversarial-review` (Codex Desktop, cross-client)

**Verdict: FAIL — 0 Blocker, 1 Major, 2 Minor, 0 unresolved questions.**

Full provenance and finding text are in [`invariant-reconciliation.md`](invariant-reconciliation.md)
§ "Verification and review findings VF13, AR14–AR16 (task 10.22)" and are not restated here. In
summary: run from **Codex Desktop**, read-only, no subagent and no fallback, against the same
branch and `HEAD` recorded above — the **first cross-client** review of this change, and therefore
stronger provenance than the two earlier same-client rounds.

| ID | Severity | Disposition |
|---|---|---|
| **AR14** | **Major** | Corrected under tasks 10.14, 10.15, 10.23 — literal-command standard added to design D19 and enforced by a mechanical audit. A **residual** limitation of that audit is accepted as **AD-1** below. |
| **AR15** | Minor | Corrected under task 10.18, jointly with VF13 — candidate 5 extended to both live stale references. |
| **AR16** | Minor | Corrected under task 10.22 — both verdicts persisted with provenance. |

**What this record does not do.** It does **not** convert the FAIL into a PASS. That verdict stands
as what that review found against the state it read. **No fresh independent adversarial review was
run after the AR14–AR16 corrections**, and the change is archived without one, under the explicit
human approval recorded next. The corrections' effect was instead confirmed by the independent
re-derivation in gate record 1 — a verification gate, not a substitute for independent review.

---

## Gate record 3 — explicit human archive approval, 2026-08-10

**Approval: GRANTED, with an accepted gap.** This is the separate, explicit final human approval
that design **D20** named as the only instrument that could authorize archive, and that the D20
decision of the same date explicitly did **not** itself grant.

### What was approved

Archive of `restructure-specboot-adoption-guide`, accepting this gap: *the D19 evidence inventory
contains a known limitation in its command-composition audit — some derived-figure rows depend on
explicitly referenced command blocks that the static audit does not inspect recursively. This
affects evidence-report reproducibility only. It does not invalidate the guide implementation, its
mechanical invariants, agent navigability, strict OpenSpec validation, or readiness for a
controlled pilot adoption.*

The gap is to be preserved as **deferred governance debt**. The guide implementation, the agent
acceptance gate, and a further verification-correction cycle are **not** to be reopened for it.

### Provenance

| Field | Value |
|---|---|
| Decision date | 2026-08-10 |
| Decided by | the human operator and requester of this change (git identity `Landaone`) |
| Recorded by | the archiving session (Claude Code, Opus 5), at the operator's explicit instruction, verbatim in substance |
| Instrument | the `/opsx:archive` invocation carrying the approval and the accepted gap in its arguments |
| State approved | the state in the table at the top of this file — entry file `0405b6bd…`, guide set `7789aee3…` |
| Scope limits set by the operator | no commit, no push, no pull request |

### What it grants and does not grant

| | |
|---|---|
| **Grants** | Archive of this change with the accepted gap, and with the last adversarial-review verdict standing as **FAIL** |
| **Does NOT grant** | Any widening of the readiness claim. The change remains **mechanically validated**, **agent-navigability validated** against this state, and **ready for a controlled pilot adoption** — never independent human usability, never end-to-end |
| **Does NOT close** | Task **16.20** — the future independent review by an unexposed developer |
| **Does NOT alter** | Human orientation attempt 1 (permanent **FAIL**) or attempt 2 (permanent **NOT RUN**) |

---

## Accepted debt carried forward

Named so it travels with the archive rather than dissolving into it.

| ID | Debt | Why accepted | What would discharge it |
|---|---|---|---|
| **AD-1** | The D19 literal-command audit is **non-recursive**: it validates each `CURRENT` row's Command field and the blocks its IDs resolve to, but does not follow a reference *inside* a resolved block to another block (for example `CMD-B8` and `CMD-A1` each defer one figure to `CMD-A8`). A row can therefore pass the audit while one of its figures is proven only by a block the audit never inspected. | Affects evidence-report reproducibility only. Every load-bearing figure was independently re-derived in gate record 1 and held, including the ones behind the deferrals. Explicitly accepted by the human approver, who directed that no further verification-correction cycle be opened for it. | Extending the audit to resolve command references transitively, in whatever change next touches these reports. Not to be done by reopening this change. |
| **AD-2** | `proposal.md:44` and `design.md:487` describe the D20 human archive decision as outstanding, though `reports/` records it as decided (finding **VF14**). | Report-only staleness in planning artifacts; understates progress and can never be read as claiming an approval that does not exist. | A one-line status pointer in each, if either artifact is ever revisited. |
| **AD-3** | Follow-up candidate 5 (5a/5b) — two live guide files still say "Section 5" where the live target is `ADOPT-05B`: `22-troubleshooting.md:157` and `19-permissions-policy.md:13`. | Already accepted, recorded in [`followup-candidates.md`](followup-candidates.md), and found cross-client (`VF13 ≡ AR15`). Editing either file would have reopened the bounded agent gate for a cosmetic reference. | The follow-up change that next edits those files. |
| **AD-4** | **No fresh independent adversarial review** was run after the AR14–AR16 corrections. The last review verdict on record is **FAIL**. | Explicit human approval to archive with this gap, recorded in gate record 3. | A fresh independent cross-client review, if the change is ever revisited. |
| **AD-5** | Independent human-orientation validation is **NOT RUN**; its only attempt stands as a permanent **FAIL** against a guide version that no longer exists. Task **16.20** stays open. | The D20 decision of 2026-08-10 accepted the gap and deferred the obligation; no independent reviewer was available. | A future independent review by an **unexposed** developer — not dischargeable by a pilot operator who has read this guide. |
| **AD-6** | **Not validated end-to-end.** The deferred-validation contract (design D18) is undischarged. | Bounded gates were never claimed to prove a complete real adoption. | The first real human-led adoption in another repository, recording operator exposure, the full evidence trail, every deviation, every failure and recovery, and proposed guide improvements. |

**None of AD-1 through AD-6 is a defect in the guide implementation.** Each is either an evidence-record
limitation, a validation obligation deliberately deferred, or a cosmetic reference already accepted.
The guide set's invariants were re-derived against this exact tree and hold.
