# Installer Test Suite — Spec Coverage Review (task 16.1)

Date 2026-08-13. A review, not a decision about whether tests are warranted: the suite already
exists (groups 4 and 5). Each scenario in the modified `specboot-verification-workflow`
requirements, and each delivery-mode scenario in `specboot-adoption-orchestration` that the
installer can exercise, is matched to an assertion.

## `specboot-verification-workflow` — *Portable, idempotent staging-ignore provisioning*

| Scenario | Assertion |
|---|---|
| No existing `.gitignore` | `ignore-provisioning.test.js` — rule created from nothing |
| Existing `.gitignore` with unrelated content | unrelated lines preserved in order |
| Rule already present | byte-for-byte no-op |
| Repeated execution is idempotent | second run leaves the file unchanged |
| Broader rule is never written | asserts no bare `.specboot/` line |
| Broader pre-existing rule already ignoring the path (Git available) | `git check-ignore` probe path, file left unchanged |
| Negation that un-ignores the staging path | probe path re-provisions |
| Git evaluation unavailable → exact-line fallback | non-Git fixture |
| Bootstrap path uses the same probe mechanism | `.specboot/bootstrap/` provisioned by the same code path |
| **Bootstrap rule provisioned regardless of delivery mode** | packaged-snapshot: `packaged-snapshot-regression.test.js`; source-linked: `delivery-modes.test.js` 4.14 fixture reaches `ensureGitignoreTransientRules()` and the rules assertion holds |
| Durable adoption path remains tracked | `git check-ignore .specboot/adoption/` reports **not ignored**, asserted in two files |

## `specboot-verification-workflow` — *Documentation distinguishes capability from provisioning*

Documentation scenarios are prose obligations, verified by inspection under tasks 14.1–14.3 and
15.2, not by the installer suite. Recorded here so the gap is deliberate rather than unnoticed.

| Scenario | Where verified |
|---|---|
| Installer-provisioned clients stated explicitly | `README.md`, task 14.2 |
| Existing capability not conflated with installer provenance | `ai-specs/specboot-instructions.md`, task 14.1 |
| Valid client guidance qualified, not removed | task 14.2 |
| Bootstrap exposure disclosed as temporary | both docs, tasks 14.1–14.2 |
| **Both delivery modes disclosed** | both docs, tasks 14.1–14.2 |
| **No machine-specific source path documented** | task 15.2 grep — 34 canonical artifacts, 0 hits |

## `specboot-verification-workflow` — *Selected-client-aware installer redesign is a future non-goal*

| Scenario | Assertion |
|---|---|
| No unconditional Kiro provisioning added | `bootstrap-subcommand.test.js` — default install provisions exactly `.claude` + `.cursor` |
| Future work recorded, not implemented | prose; no test claims client-aware installation |
| Bootstrap subcommand does not run by default | default invocation creates no `.specboot/bootstrap/` and no `.specboot/adoption/` |
| **Delivery mode does not change client provisioning** | the default-invocation block runs with no `--source` and no `--client`; its client-set assertion is unchanged by either mode |

## Delivery-mode campaign (4.14–4.21, 5.11–5.18)

| Task | Test block | Assertions |
|---|---|---|
| 4.21 | *packaged-snapshot behavior is preserved unchanged* | baseline superset; exact canonical projection; exclusions by name; durable artifacts; entry inventory field-for-field; ignore rules; mode recorded |
| 4.14 | *source-linked mode creates no copied canonical content* | container absent (not empty); no copied guide/phase/skill; `.specboot/` holds `adoption/` only; obligations `SKIPPED` |
| 4.15 | *an incomplete source is rejected before any write* | one case per required artifact + the skill-directory-without-`SKILL.md` case; each asserts non-zero exit, the named missing artifact, and an unchanged tree |
| 4.16 | *the manifest records source provenance* | Git and non-Git fixtures; label, both checksums, commit format, `unavailable` + reason, and **no inferred commit key** |
| 4.17 | *only selected clients get discovery entries* | entry points at the external source; unselected client empty; `NOT SELECTED` and no `PENDING EVIDENCE` |
| 4.18 | *autodiscovery performs no write* | checksum-tree equality with candidates present; same with none found, plus the run still asks |
| 4.19 | *source drift blocks resume* | drift stops with a reconciliation message; unchanged source resumes **and says it verified identity**; moved source resumes on matching checksums |
| 4.20 | *source-linked de-bootstrap* | preconditions asserted first; entries gone; block byte-restored; terminal dispositions; source byte-identical; source never an entry |

## Verdict

**Every scenario the installer can exercise has a corresponding assertion.** The documentation
scenarios are verified by inspection, and that split is recorded above rather than left implicit.
Suite state at review: 58 tests, 58 pass, 0 skipped, 0 todo.

---

# Coverage review — seventh revision (task 16.1)

**Additive.** The review above covered the two-mode surface. This one covers the surface as it now
stands: source-linked delivery only, with packaged-snapshot deferred whole to
`add-specboot-packaged-snapshot-delivery` (design **D-W**).

Date 2026-08-14. Active suite: **10 files, 82 `test(...)` blocks, 247 `assert.*` calls, 0 skipped.**

## Requirements added this revision, and what asserts them

| Requirement | Suite | Blocks |
|---|---|---|
| *An explicit supported client selection precedes every bootstrap write* | `refusals.test.js` | 9 |
| *A complete preflight precedes every write, and provisioning is all-or-nothing* | `preflight.test.js` | 5 |
| *The manifest records the delivery mode and the source provenance* — three-state Git | `provenance.test.js` | 6 |
| *Source-linked mode copies no canonical content* — no-symlink fail-closed scenarios | `no-symlink-discovery.test.js` | 5 |
| *A canonical SpecBoot source is resolved and validated before the first project write* — fail-closed | `refusals.test.js`, `cold-start.test.js` | included above |

Each scenario in the two added requirements has a corresponding assertion; the three-disposition
Git table and the two no-symlink scenarios likewise.

## Requirements changed this revision, and their coverage after the change

| Requirement | Change | Covering suite |
|---|---|---|
| *Portable, idempotent staging-ignore provisioning* | transient set gained `.specboot/local/` | `ignore-provisioning.test.js` — assertion added |
| *Documentation distinguishes capability availability from installer provisioning* | source-linked only + fail-closed preconditions | doc-only; verified under 14.1, 14.2, 14.3 |
| *Selected-client-aware installer redesign is a future non-goal* | de-moded | `bootstrap-subcommand.test.js` (kept active) |
| *De-bootstrap reconciles against the committed manifest* | machine-local store, refusal behavior | `delivery-modes.test.js` |
| *The bootstrap kit contains no duplicated canonical content* | payload rules now retained machinery | `payload-assembly.test.js` |

## The 4.30 retirements left no requirement uncovered

| Retired | What it asserted | Where that requirement is covered now |
|---|---|---|
| `packaged-snapshot-bootstrap.test.js` (4.3) | packaged-snapshot delivery | **the requirement is deferred with the mode** (D-W); nothing is uncovered because nothing is claimed |
| `packaged-snapshot-regression.test.js` (4.21) | the mode's pinned end state | same — preserved as the deferred change's starting baseline |
| `packaged-snapshot-payload.test.js` (4.5/4.6, staged-payload halves) | assembly and drift **observed through a bootstrap run** | `payload-assembly.test.js`, rewritten against the **assembled** payload — the one `prepack` produces and npm ships |

The third row is the one that mattered. Retiring the mode would have left the enforcing drift check
unreachable, because it only ever compared a *staged* payload. It now checks both payload roots, and
reads canonical from the repository rather than from `resolveKitSource()` — which prefers the
payload and so compared it against itself. Verified by injecting drift: exit 1 with the path named,
where it previously exited 0. Recorded in `installer-tdd-green.md`.

## Verdict

**PASS.** Every requirement the installer suite is responsible for has at least one corresponding
assertion; no requirement lost coverage to a retirement; and no assertion was weakened, skipped, or
deleted to reach it.

---

# Coverage review — eighth revision (task 16.1)

**Additive.** Date 2026-08-14. Active suite: **11 files, 88 blocks, 273 assertions, 0 skipped.**

## What the previous review got wrong

It recorded *De-bootstrap reconciles against the committed manifest* as covered by the de-bootstrap
blocks in `delivery-modes.test.js`. Those blocks are real, and they walk the **success path only**:
entries gone, appended block byte-restored, terminal dispositions written, external source
byte-identical, machine-local store removed.

That requirement's **refusal** scenario — *Permanent replacement is missing* — had **no assertion at
all**. Neither did the rule in design D-C and `10-debootstrap.md` step 2 that it implements. A
written rule with nothing executing it is exactly what a coverage review exists to catch, and
recording the requirement as "covered" on the strength of its success path is how it was missed.

## Coverage after this revision

| Requirement | Scenario | Covering assertion |
|---|---|---|
| *De-bootstrap reconciles against the committed manifest* | *Permanent replacement is missing* | **`debootstrap-replacement.test.js`** — exit non-zero, entry intact and resolving, nothing removed, no terminal successful disposition, durable evidence survives |
| same | *Failed de-bootstrap is resumable* | **`debootstrap-replacement.test.js`** + `reports/debootstrap-replacement-refusal.md` resume half — repair, re-run, entry reaches terminal disposition |
| same | success path (entries removed, block byte-restored, dispositions written) | `delivery-modes.test.js` — **unchanged, still passing** |
| same | *Container still holds a file the manifest never recorded* | task 13.6 evidence — **unaffected, not re-run** |

## The retirements still leave no requirement uncovered

Re-confirmed against the 4.30 record: `payload-assembly.test.js` covers assembly and drift over the
**assembled** payload; `bootstrap-subcommand.test.js` covers the default-install guarantee; and
packaged-snapshot delivery is a **deferred requirement**, so nothing is uncovered because nothing is
claimed.

## Verdict

**PASS.** Every requirement the installer suite is responsible for now has at least one corresponding
assertion, including the refusal scenario this review previously reported as covered when it was
not. Counts moved 82 → 88 blocks and 247 → 273 assertions; nothing was weakened, skipped, or
deleted.
