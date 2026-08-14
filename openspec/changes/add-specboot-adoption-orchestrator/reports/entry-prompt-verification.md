# Entry-Prompt Verification (tasks 15.6–15.9)

Subject: `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`. Date 2026-08-13, host
`Darwin 22.6.0`. Every divergence found was corrected **in the prompt**, never by changing the
contract to match it.

## 15.6 — consistency with the contract the prompt invokes — **PASS**

Each statement checked against its canonical definition:

| Prompt statement | Canonical definition | Verdict |
|---|---|---|
| Three-artifact validation: guide, phase directory, readable `SKILL.md` | `09-bootstrap.md` `ADOPT-00` action 1; `bootstrap-kit/source-resolution.md` | consistent |
| Validation runs before any orchestration load and before the first write | `ADOPT-00` action 1; delta spec *A canonical SpecBoot source is resolved and validated before the first project write* | consistent |
| Source-linked preferred; packaged-snapshot fallback | `ADOPT-00` action 2 mode table | consistent |
| Exact mutations at `[HUMAN APPROVAL REQUIRED]` before provisioning | `ADOPT-00` action 6 and its Approval gate field | consistent |
| Two client-selection routes; autodiscovery read-only and non-authorizing | `ADOPT-00` action 5; `bootstrap-kit/client-autodiscovery.md` | consistent |
| Unselected clients recorded `NOT SELECTED`, never `PENDING EVIDENCE` | `ADOPT-00` status table | consistent |
| Per-mode cleanup and `SKIPPED — source-linked mode` | `10-debootstrap.md` `ADOPT-18` obligation table | consistent |
| Manifest carries the run-level `source` block and the client-selection record | `BOOTSTRAP-MANIFEST.schema.json` (`source`, `clientSelection` both in `required`) | consistent |
| Identity is the checksums; drift stops for reconciliation; recorded path never a precondition | delta spec *Source drift blocks resume*; `source-resolution.md` | consistent |
| Fresh-session discovery gate; the direct read is not discovery | `ADOPT-00` validation; delta spec *Pre-adoption discoverability* | consistent |

**One divergence found and corrected in the prompt.** Nothing else diverged.

## 15.7 — mechanical coverage — **PASS**

| Required property | Located in the prompt | Occurrences |
|---|---|---|
| Both delivery modes reachable | §1 Q1, §2, §6 | `source-linked` ×4, `packaged-snapshot` ×4 |
| Both client-selection routes offered | §1 Q3, §3 (Manual / Autodiscovery bullets) | ×1 / ×3 |
| Autodiscovery neither writes nor authorizes | §3 — "The probe writes nothing"; "never authorization to configure anything" | ×1 / ×1 |
| Generated fresh-session handoff prompts named | §4, §7 | `fresh session` ×5, `handoff` ×2 |
| Resume path described | §7, §8 | `resume` ×3 |
| Drift blocks | §7 item 3 | ×1 |
| Exact-mutations approval gate | §3 | `exact mutations` ×2, `[HUMAN APPROVAL REQUIRED]` ×1 |

## 15.8 — the cold-start contract against a bare fixture — **PASS**

Fixture: a freshly `git init`-ed directory containing nothing but `.git/` — no SpecBoot files, no
OpenSpec installation in the project, no `/opsx:*` commands, no discoverable `specboot-adopt`
skill, no `.specboot/`.

| Check | Result |
|---|---|
| Every instruction in the prompt executable in that state | yes — §0–§4 require only reading a supplied source path and writing to the target after approval |
| Delivery-mode question precedes everything | §1 Q1 is the first action; §2 step 1 repeats the ordering |
| Three-artifact validation precedes orchestration load | §2 step 2 before step 3, stated as an explicit ordering contract |
| Three-artifact validation precedes every write | §2 step 4 — "Only then, write anything" |
| Invalid source leaves the target byte-for-byte unchanged | **verified live**: a source missing `SKILL.md` was rejected with exit 1 and the fixture tree was identical before and after |
| The `SKILL.md` read is stated as a direct read | §2 step 3 — `direct read` ×2, with an explicit call-out block |
| Nowhere described or recorded as native skill discovery | "This is a direct read, not native skill discovery… do not record it as discovery evidence"; §7 item 4 places native discovery in the fresh session only |

Live rejection output:

```text
  ! the supplied path is not a canonical SpecBoot source.
    Missing: ai-specs/skills/specboot-adopt/SKILL.md
    Nothing was written to the target repository.
exit=1
TARGET BYTE-FOR-BYTE UNCHANGED
```

Note on the fixture: `openspec` is on this host's `PATH`, which is a property of the *machine*, not
of the target repository. The embargo is about what the run *uses*, and the prompt's rule is
unconditional — availability on the host does not license use before `ADOPT-02`.

## 15.9 — OpenSpec embargo and handoff boundary — **PASS**

Every `openspec` / `/opsx:` mention in the prompt, with its gating:

| Line | Mention | Gated? |
|---|---|---|
| 22 | "**no OpenSpec** installation and no `openspec` command" | statement of cold-start absence |
| 23 | "**no `/opsx:*` commands**" | statement of cold-start absence |
| 128 | §5 heading "The OpenSpec embargo" | the gate itself |
| 130 | "Use no OpenSpec command and no `/opsx:*` command until both of these are true" | the gate itself |
| 132–133 | "(1) `ADOPT-02` has completed, and (2) OpenSpec availability has **explicitly passed** its documented check" | both conditions stated |
| 135–136 | "absence is the expected state — never a blocker" | consequence |

**No ungated use appears anywhere in the prompt.**

Handoff boundary, all four required elements present:

| Element | Location |
|---|---|
| The stop point after provisioning | §4 — "Then **stop.**" |
| The generated fresh-session handoff prompt | §4 — "Generate the **exact prompt**… Do not leave the operator to compose it" |
| The fresh session as the only place native discovery is attempted | §7 item 4 — "attempts native skill discovery — here, and only here" |
| Resume from manifest and run log, with the drift block | §7 items 1–3 |

**One sequence, both modes:** §6 states the modes differ only in what provisioning does and that
"there is no second sequence to follow and no per-mode variant of this prompt". The cold-start
sequence appears once, in §0–§4.

## Divergence corrected during this verification

`client-autodiscovery.md` linked `symlink-fallback.md` at the kit root; the file lives in
`discovery/`. Corrected to `discovery/symlink-fallback.md`. Full sweep of the guide, all phase
files, the kit, and the skill references afterwards: **143 relative links checked, 0 broken**.

---

# 15.6 re-verification against the design D-S option B contract

Date 2026-08-14, after tasks 3.3, 5.13, 5.19, 8.8 and 3.17 landed. The previous consistency check
was taken against the superseded contract, in which the committed manifest recorded a labelled
resolved path.

## Clause-by-clause result

| Contract clause | Where the contract states it | Where the prompt states it | Verdict |
|---|---|---|---|
| Source resolution — the path is runtime input, validated before any load or write | `09-bootstrap.md` steps 1–2 | §1 Q1/Q2, §2 order of operations | **CONSISTENT** |
| Three-artifact validation, incl. a **readable** `SKILL.md` | `09-bootstrap.md` step 1 | §2 | **CONSISTENT** |
| Delivery-mode selection follows from that result | `09-bootstrap.md` step 2 | §1 Q1, §6 | **CONSISTENT** |
| Client selection by exactly two routes; autodiscovery writes nothing and authorizes nothing | `09-bootstrap.md` step 5 | §1 Q3/Q4, §3, §9 | **CONSISTENT** |
| Pre-write approval gate on the exact mutations | `09-bootstrap.md` approval gate | §3 `[HUMAN APPROVAL REQUIRED]` | **CONSISTENT** |
| Unselected clients recorded `NOT SELECTED`, never `PENDING EVIDENCE` | `09-bootstrap.md` evidence block | §3, §9 | **CONSISTENT** |
| `ADOPT-18` per-mode cleanup, and `SKIPPED — source-linked mode` on both obligations | `10-debootstrap.md` obligation table | §6 | **CONSISTENT** |
| Manifest schema — run-level `source` block carries portable identity and **no** resolved path | `BOOTSTRAP-MANIFEST.schema.json` (`local-path-resolution` required and `const`; no `path` property; `additionalProperties: false`) | §4 "the handoff prompt carries no source path… never as a path in the committed manifest, which records none"; §7.3 | **CONSISTENT** |
| Manifest schema — client-selection record (route / selected / notSelected) | schema `clientSelection` | §1 Q3/Q4, §3 | **CONSISTENT** |
| Selected-client discovery-and-execution gate — native discovery attempted only in the fresh session | `09-bootstrap.md` fresh-session clause | §4, §7.5 | **CONSISTENT** |
| Source-drift rules — checksums are identity; a mismatch stops for human reconciliation | `specs/…/spec.md`, `bootstrap-kit/source-resolution.md` | §7.3, §7.4 | **CONSISTENT** |
| **How a resume acquires a local source path** — machine-local store → ask → rediscover, and an absent store is the ordinary case, never a failure | `spec.md` §resume, `source-resolution.md` §Identity | §7.2 (added by task 3.17) | **CONSISTENT** |

No statement in the prompt was found to diverge from the schema, the specs, or the installer, so no
correction to the prompt was required by this pass.

## Two contract passages remain on the superseded contract — **flagged, not corrected here**

Task 15.6's rule is that a divergence is corrected **in the prompt, never by changing the contract
to match it**. These are the inverse case: the prompt agrees with the schema, the delta specs and
the implementation, and it is the phase-file passages that still describe the pre-option-B
contract. Correcting the prompt to match them would re-introduce a committed machine-specific path,
which design D-S option B, `spec.md` and task 3.3 all forbid — so the prompt was left as it is and
the passages are recorded here.

| # | Passage | What it still says | What option B requires |
|---|---|---|---|
| A | `specboot-adoption/09-bootstrap.md`, `ADOPT-00` **Evidence to record** | "the run-level source provenance (**resolved path with its machine-specific label**, guide and skill checksums, …)" | No resolved path is recorded in any committed artifact; the block carries the fixed per-machine-resolution statement instead |
| B | `specboot-adoption/10-debootstrap.md`, `ADOPT-18` obligation table | Silent on the machine-local `.specboot/local/` store | `ADOPT-18` removes the store alongside the other project-local temporary state (implemented, and verified under 13.11) |
| C | `specboot-adoption/22-troubleshooting.md`, "Resume on a different machine…" | "The **recorded** `path` is labelled machine-specific and non-portable" | There is no recorded path; the resume *acquires* one from the store, the operator, or rediscovery |

All three sit in the phase-file set, whose tasks (groups 6, 7 and 14) are closed, and all three are
**documentation-only**: no implementation reads them, and the installer, schema, run-log template,
kit recipe and entry prompt are already coherent with option B. Under the project's OpenSpec rule
that a post-`apply` correction is a spec update first, they need reopened phase-file tasks rather
than an in-place edit inside this bounded run.

**15.6 therefore remained open at that point**: every clause of the prompt verified, and the check
against `ADOPT-18`'s store-removal clause could not complete while `ADOPT-18` did not carry that
clause.

---

# 15.6 close-out, after the phase-file corrections landed — **PASS**

Date 2026-08-14, after tasks 6.1, 6.2 and 7.14 corrected the three flagged passages. The check is
now taken against a contract that is coherent with design D-S option B end to end.

## The three flagged passages, re-read

| # | Passage | State now |
|---|---|---|
| A | `09-bootstrap.md` action 2 and **Evidence to record** | Both name **portable evidence only** — mode, guide checksum, skill checksum, Git commit or an explicit `unavailable` record with its reason, and the per-machine-resolution statement. Neither asks for the resolved path; the path is named as machine-local `.specboot/local/` state, and the manifest acceptance criterion now states that a recorded machine-specific path is a **FAIL** |
| B | `10-debootstrap.md` obligation table, new **step 5b**, acceptance criteria and evidence field | `ADOPT-18` removes `.specboot/local/` by name in source-linked mode as project-local temporary state, **preserves** the committed manifest and run log, and never touches the external source the store named. Packaged-snapshot records it *not applicable* — no external path is resolved in that mode |
| C | `22-troubleshooting.md`, entry retitled *Resume with no local source path on this machine* | Presumes **no** recorded path. Acquisition is store → ask → rediscover; verification against the recorded checksums plus the recorded commit is unconditional and applies to a stored path exactly as to a typed one; mismatch blocks as drift; an absent store is the ordinary cross-machine case, never a failure |

## Clause-by-clause re-check against the corrected contract

| Contract clause | Where the contract states it | Where the prompt states it | Verdict |
|---|---|---|---|
| Source resolution — runtime input, validated before any load or write | `09-bootstrap.md` steps 1–2 | §1 Q1/Q2, §2 | **CONSISTENT** |
| Delivery-mode selection, source-linked preferred | `09-bootstrap.md` step 2 mode table | §1 Q1, §6 | **CONSISTENT** |
| Client selection by exactly two routes; autodiscovery writes nothing, authorizes nothing | `09-bootstrap.md` step 5 | §1 Q3/Q4, §3, §9 | **CONSISTENT** |
| Pre-write `[HUMAN APPROVAL REQUIRED]` gate on the exact mutations | `09-bootstrap.md` step 6 + Approval gate | §3 | **CONSISTENT** |
| Provenance written is portable identity only; no resolved path in any committed artifact | `09-bootstrap.md` action 2 and Evidence to record (**corrected**) | §4 "never as a path in the committed manifest, which records none"; §7.2 "Record… where the path came from — never the path itself" | **CONSISTENT** — the passage that diverged was the contract's, and it is corrected |
| `ADOPT-18` per-mode cleanup and `SKIPPED — source-linked mode` on both obligations | `10-debootstrap.md` obligation table | §6 | **CONSISTENT** |
| `ADOPT-18` removes the machine-local `.specboot/local/` store, preserving durable state | `10-debootstrap.md` step 5b (**added**) | §7.2 describes the store as machine-local, git-ignored, path-only; the prompt makes no claim about its lifetime | **CONSISTENT** — no statement to correct |
| Manifest schema — run-level `source` block, portable identity, no resolved path | schema `local-path-resolution` `const`; no `path` property; `additionalProperties: false` | §4, §7.3 | **CONSISTENT** |
| Manifest schema — client-selection record | schema `clientSelection` | §1 Q3/Q4, §3 | **CONSISTENT** |
| Selected-client discovery-and-execution gate; native discovery only in the fresh session | `09-bootstrap.md` fresh-session clause | §2 call-out, §4, §7.5 | **CONSISTENT** |
| Source-drift rules — checksums are identity, mismatch stops for human reconciliation | `22-troubleshooting.md` *Source drift detected on resume*; `source-resolution.md` | §7.3, §7.4 | **CONSISTENT** |
| **How a resume acquires a local source path** — store → ask → rediscover, absent store is ordinary | `22-troubleshooting.md` acquisition table (**corrected**); `spec.md` §resume | §7.2 | **CONSISTENT** |

## Result

**No divergence remains, and `ADOPTION-ENTRY-PROMPT.md` was not changed by this pass.** Every
divergence recorded earlier was one where the prompt already matched design D-S option B, the
schema, the delta specs and the installer, and the phase-file contract did not. Correcting them in
the prompt would have re-introduced a committed machine-specific path, which 15.6's own rule — a
divergence is corrected in the prompt, never by changing the contract to match it — does not
license, because the prompt was not the divergent artifact. The corrections landed in the contract
under reopened tasks 6.1, 6.2 and 7.14, and this pass verifies the prompt against the result.

*Scope note:* `ai-specs/skills/specboot-adopt/references/source-resolution.md` still contains the
pre-option-B phrasing "recorded path missing (different machine)". It is outside the three passages
this pass corrected and outside 15.6's subject, which is the entry prompt; it is recorded here so it
is not lost.

---

# Re-verification — seventh revision (tasks 15.6–15.9)

**Additive.** Everything above describes the two-mode prompt and the contract as it stood on
2026-08-13. That prompt no longer exists: it was rewritten under tasks 3.10/3.13/3.15/3.16/3.18/3.19
when the change narrowed to source-linked-only delivery (design **D-W**). The sections above are
retained as the record of what was checked then — **including their own divergence findings** — and
are superseded by this one.

Subject: `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md` (281 lines). Date 2026-08-14,
host `Darwin 22.6.0`. Every divergence was corrected **in the prompt**, never by changing the
contract to match it.

## Why the previous record could not stand

Its own consistency table listed **"Source-linked preferred; packaged-snapshot fallback → consistent"**
as a PASS. That is now the opposite of the requirement: the prompt describes one mode, asks for a
source rather than a delivery mode, and refuses rather than falling back. The earlier record was
accurate about a superseded contract, which is exactly what makes it evidence for nothing today.

## 15.6 — consistency with the contract the prompt invokes — **PASS**

| Prompt statement | Canonical definition | Verdict |
|---|---|---|
| Source question, no delivery-mode question | `09-bootstrap.md` `ADOPT-00` action 1; `bootstrap-kit/source-resolution.md` | consistent |
| Three-artifact validation before any load or write | `ADOPT-00` action 1; delta spec *A canonical SpecBoot source is resolved and validated before the first project write* | consistent |
| No validated source → refuse with zero writes, no fallback | `ADOPT-00` action 1; `source-resolution.md` §*A validated source is a precondition* | consistent |
| Explicit supported client required; no placeholder; nearest match never substituted | `ADOPT-00` action 5; manifest schema `clientSelection.selected` (rejects `undeclared`) | consistent |
| Preflight resolves every path, reports all collisions together | `ADOPT-00` action 7; delta spec *A complete preflight precedes every write* | consistent |
| Exact mutation inventory: path, operation, mechanism, reversibility | `ADOPT-00` approval-gate field | consistent |
| Mechanism change requires a new gate | `ADOPT-00` action 8 | consistent |
| Provisioning all-or-nothing; failure restores pre-provisioning state | `ADOPT-00` action 8 + validation criteria | consistent |
| No-symlink discovery unsupported → fail closed before provisioning | `ADOPT-00` action 6; `discovery/symlink-fallback.md` | consistent |
| A pointer file is never a discovery entry | schema `entries.items.mode` enum — `pointer-file` **absent** | consistent |
| `ADOPT-18` removes discovery entries **and** the machine-local store; manifest and run log preserved | `10-debootstrap.md` steps 3, 5b, 8 | consistent |
| Run-level `source` block: portable identity, **no** resolved path | schema `source` — no `path` property, `additionalProperties: false` | consistent |
| Resume acquires a local path (store → operator → rediscovery), verifies checksums, blocks on drift | `source-resolution.md` §*Identity is the checksums*; `22-troubleshooting.md` §*Resume with no local source path* | consistent |
| Handoff prompt carries no source path | `ADOPT-00` action 9; delta spec entry-prompt requirement | consistent |
| Selected-client discovery-and-execution gate; direct read is not discovery | `ADOPT-00` validation; delta spec *Pre-adoption discoverability* | consistent |

**Zero divergences.** No contract statement was changed to accommodate the prompt.

## 15.7 — coverage, mechanically located — **PASS**

| Property | Located | Count |
|---|---|---|
| Canonical-source question asked; **no** delivery-mode question | §2 Q1 | 1 / **0** |
| Both client-selection routes offered | §3, `**Manual**` + `**Autodiscovery**` | 1 + 1 |
| Autodiscovery writes nothing and authorizes nothing | §3 | 1 + 1 |
| All five refusals stated with what each reports | §7 table rows R1–R5 | **5** |
| Preflight named | §4 "Preflight before you present anything" | 1 |
| Exact mutation inventory named | §4, §5 | 2 |
| Generated fresh-session handoff named | §5 "Generate the **exact prompt**" | 1 |
| Resume path described | §8 "**resumes** from the durable manifest" | 1 |

## 15.8 — cold-start contract against a virgin fixture — **PASS**

Executed as `test/cold-start.test.js` against a fixture holding no SpecBoot files, no OpenSpec, no
`/opsx:*` commands, no discoverable `specboot-adopt` skill, and no `.specboot/`: **10 tests, 10
pass, 0 fail.**

| Clause | Evidence |
|---|---|
| Every instruction executable in that state | the run completes end to end from the virgin fixture |
| All seven spine steps performable from what the prompt states | §1 spine table; each step exercised by the fixture run |
| Source question and validation precede every load and write | refusal cases leave the tree byte-for-byte unchanged |
| Invalid source → tree unchanged | asserted |
| **Absent** source → tree unchanged | asserted (test 10) |
| **Missing** client → tree unchanged | `test/refusals.test.js`, verified separately |
| **Unknown** client → tree unchanged | `test/refusals.test.js`, verified separately |
| Source-relative `SKILL.md` read stated as a direct read, never recorded as discovery | §2 blockquote; test 9 asserts no discovery is claimed by the provisioning session |

## 15.9 — OpenSpec embargo and handoff boundary — **PASS**

Seven `OpenSpec` / `/opsx:` mentions, all accounted for:

| Line | Context | Gated |
|---|---|---|
| 22, 23 | cold-start state: their absence is expected | n/a — states absence |
| 172, 174 | §6 embargo heading and rule | the rule itself |
| 177 | availability check must explicitly pass | the gate |
| 179, 180 | rationale; absence is never a blocker | n/a |

No mention permits use before `ADOPT-02` completes **and** its availability check passes.

| Boundary clause | Located |
|---|---|
| Stop point after provisioning | §5 "Then **stop.**" |
| Generated fresh-session handoff prompt | §5 |
| Fresh session is the only place native discovery is attempted | §5 and §8 step 5 |
| Resume from manifest and run log, with drift block | §8 steps 1–4 |
| Cold-start sequence stated **once** | §1 spine table, single occurrence |
| No per-mode branch in the sequence | zero occurrences of a packaged-snapshot procedural branch |
