# Group 4 Report — RED Baseline for the Installer

- Date: 2026-08-12
- Command: `npm test` in `packages/specboot/` (`node --test "test/*.test.js"`)
- Node: v24.18.0 — `node:test` built in, **zero new dependencies** (design D-M)
- `package.json`: `scripts.test` added; **no** `dependencies`, **no** `devDependencies`

## Result: 22 tests, 11 pass, 11 FAIL

A suite that passed here would prove the tests assert nothing. It does not pass.

### The 11 FAILING tests — the behaviors group 5 must implement

| Test | Why it fails today |
|---|---|
| creates the transient payload under `.specboot/bootstrap/` | no `bootstrap` subcommand exists; `argv[2]` is treated as a target directory |
| writes the durable `BOOTSTRAP-MANIFEST.json` | no durable record is written |
| no existing `.gitignore`: exact rule for **every** transient path | only `.specboot/staging/` is provisioned; `.specboot/bootstrap/` is not |
| existing `.gitignore`: rules appended | same — the bootstrap rule is never appended |
| repeated execution is idempotent for every transient path | same |
| bootstrap path uses the `git check-ignore` probe | the probe is hardcoded to the staging path only |
| after a bootstrap run, durable path NOT ignored | bootstrap does not run at all |
| every assembled payload file byte-identical to canonical | no pack-time assembly exists |
| drift check FAILS on kit payload drift | no `drift-check` subcommand exists |
| drift check WARNS on pre-existing template drift | same |
| `npm pack` includes the assembled payload directory | `files` does not list it |

### The 11 PASSING tests — regression guards, correct to pass now

These assert behavior that **already works and must not change**. Their passing is the baseline
that proves group 5 did not break the default path:

- default install copies the template and creates Claude + Cursor adapters
- default invocation creates no bootstrap payload, no durable record, no skill exposure
- default path provisions exactly `.claude` + `.cursor` — no client added to the loop
- exact staging rule already present is a byte-for-byte no-op
- broader pre-existing rule Git already honours leaves `.gitignore` unchanged
- no broader `.specboot/` pattern is ever written
- after a default install the durable path is not ignored
- no ignore rule targets the durable path
- kit manifest holds references, never content
- bootstrap creates no real file where a later step needs a symlink (vacuously true — nothing runs)
- re-running bootstrap is a no-op (vacuously true — nothing runs)

Two of these pass **vacuously** because the subcommand does not exist yet; they become meaningful
assertions in group 5 and are re-checked there.

## Fixture safety

`test/helpers.js` creates fixtures in the OS temp directory and asserts they are **not** inside the
repository working tree. A fixture under the repo would inherit the repo's own `.gitignore` and
make every `git check-ignore` assertion meaningless.

## Outcome

Group 4 status: **PASS** — RED established. 11 tests fail for the documented reasons; group 5 may
now proceed.

---

# Addendum — RED for the order-dependence defect (tasks 4.11, 4.12)

- Date: 2026-08-12
- Captured **before** any correction to the test helper, per the Group 4 execution order.

## 4.11 — The defect reproduces

**Precondition induced:** the assembled payload was made stale by appending a marker to
`packages/specboot/bootstrap-payload/SPECBOOT_ADOPTION_GUIDE.md`. Only the **generated,
git-ignored** payload was mutated — no canonical source file was touched.

```
stale payload sha   2ceda4a2654abe70...
canonical sha       0405b6bd8772eba1...
```

**Two consecutive `npm test` invocations, no action between them:**

| Invocation | Exit | tests | pass | fail | Failing test |
|---|---|---|---|---|---|
| **Run 1** | **1** | 22 | 21 | **1** | `every assembled payload file is byte-identical to its canonical source` |
| **Run 2** | **0** | 22 | 22 | 0 | — |

**The defect is confirmed exactly as reported.** Run 1 fails legitimately — the payload really had
drifted. During run 1 the `npm pack --dry-run` test invoked `prepack`, which re-assembled the
payload and repaired the precondition of a *different* test. Run 2 then passed.

A suite whose verdict flips between two identical invocations is not evidence.

## 4.12 — The two RED preconditions

### Precondition A — intentionally stale assembled payload

**Result: FAIL on first invocation** (exit 1), pass on the second. Recorded above. This is the
behaviour the correction must eliminate: the first invocation must produce the same verdict as
every later one.

### Precondition B — clean checkout, `bootstrap-payload/` absent entirely

**Result: exit 0, 22/22 — and this pass is NOT trustworthy.** Two independent reasons, both
discovered while capturing this evidence:

1. **The assembly test passes vacuously.** `resolveKitSource()` in `bin/init.js` falls back to the
   repository root when `bootstrap-payload/` does not exist:

   ```js
   function resolveKitSource() {
     if (pathExists(PAYLOAD_DIR)) return { root: PAYLOAD_DIR, channel: 'npm' };
     const repoRoot = path.resolve(__dirname, '..', '..', '..');
     if (pathExists(path.join(repoRoot, KIT_MANIFEST_REL))) {
       return { root: repoRoot, channel: 'source-copy' };
     }
     return null;
   }
   ```

   With no payload present the test compares **canonical against canonical** and cannot fail. It
   never exercises the assembled payload at all.

2. **The payload was regenerated mid-run.** `bootstrap-payload/` existed again after the clean run
   finished, because the `npm pack` test's `prepack` recreated it partway through.

**A false green is worse than the stale-state failure.** Precondition A fails loudly; precondition
B passes while testing nothing. Both must be fixed by the same correction: the test must assemble
the payload it intends to test, in its own setup, and the pack test must stop regenerating state
for anyone else.

## Restoration (verified)

The mutation was confined to the generated payload and reverted immediately after capture:

- baseline checksums of all **18** payload files recorded before mutation;
- payload re-assembled from canonical after capture;
- `diff` of before/after checksum manifests: **identical, all 18 files**;
- stale marker: **0 occurrences** remaining;
- `git status --porcelain SPECBOOT_ADOPTION_GUIDE.md`: **empty** — the canonical guide was never
  modified.

## What GREEN must now show (5.8)

- a **first-invocation** pass from a clean checkout, where the assembly test is *not* vacuous;
- a **first-invocation** pass from an intentionally stale payload;
- a **repeated** pass;
- exact counts for each, and zero skipped or weakened assertions.

---

## Task 4.13 — RED: flag arguments are treated as a target directory

- Date: 2026-08-12
- Suite: `packages/specboot/test/help-flag.test.js` (new)
- Result: **4 of 4 new tests FAIL** against the current `bin/init.js`. Pre-existing suite: 24 pass,
  28 tests total.

### The defect

`bin/init.js` performs **no flag handling at all**. Its argv parsing checks a fixed subcommand set
and treats everything else as the target path:

```js
const SUBCOMMANDS = new Set(['bootstrap', 'drift-check']);
const rawArg = process.argv[2];
const subcommand = SUBCOMMANDS.has(rawArg) ? rawArg : null;
const targetArg = subcommand ? process.argv[3] : rawArg;
const target = targetArg ? path.resolve(targetArg) : process.cwd();
```

`--help` is not in `SUBCOMMANDS`, so it becomes `targetArg` and is resolved against the process cwd.

### Reproduced directly

```
$ cd <empty dir> && node bin/init.js --help
exit=0
stdout:
    lidr-specboot
    Augmented Spec-driven development powered by OpenSpec
$ ls -a
--help
$ find ./--help -type f | wc -l
30
```

A full 30-file SpecBoot tree — `.claude/`, `.cursor/`, `ai-specs/`, `docs/`, `CLAUDE.md`,
`AGENTS.md`, `.gitignore` — installed into a directory named `--help`. The same happens for `-h`.
This is the mechanism that produced the stray `--help/` directory in this repository's working tree.

### Failing assertions

| Test | Failure |
|---|---|
| `` `--help` exits 0 and prints usage `` | exits 0, but stdout is the install banner; no usage text matches `/usage/i` |
| `` `--help` creates no files or directories `` | fixture gains 57 entries under `--help/`; `deepEqual` names each one |
| `` `-h` exits 0 and prints usage `` | same as `--help` |
| `` `-h` creates no files or directories `` | fixture gains 57 entries under `-h/` |

Recorded before any change to `bin/init.js`. Task 5.10 makes these pass.


---

# RED — Delivery-Mode Campaign (tasks 4.14–4.22)

Recorded 2026-08-13, host `Darwin 22.6.0`. Command: `npm test` in `packages/specboot/`.

## Order

**4.21 ran first**, exactly as the group note requires. Its baseline
(`test/fixtures-packaged-snapshot-baseline.json`) was captured from a live packaged-snapshot run
**before any source-linked code existed**, so "packaged-snapshot is preserved unchanged" is measured
against a state recorded first rather than asserted afterwards. 4.14–4.20 and 4.22 followed.

## Two RED-integrity corrections made before this record was taken

A failing suite is not automatically honest evidence. Two blocks initially failed — or passed — for
the wrong reason, and both were corrected **before** this baseline was recorded:

1. **Vacuous passes in 4.17, 4.19 and 4.20.** Against an implementation that provisions nothing,
   "the discovery entry is gone", "the appended block is byte-restored" and "the unselected client
   has no artifact" are all trivially true, and `resume` exiting 0 because the argument was silently
   treated as a target directory looks like a successful resume. Preconditions were added
   (bootstrap must have provisioned the entry and appended the block) and the positive resume cases
   now require the run to **state that it verified source identity**. A silent exit 0 is no longer a
   pass.
2. **A payload race between test files.** `node --test` runs files in parallel by default, and
   several call `assemblePayload()`, which removes and rebuilds the shared `bootstrap-payload/`.
   One file's rebuild was deleting the payload another file was reading mid-run, producing four
   failures unrelated to any assertion under test. `scripts.test` now runs
   `node --test --test-concurrency=1`. This does not weaken design **D-O**: each test still
   establishes its own state, none repairs another's, and every one must pass on a first
   invocation — serial execution removes a shared-mutable-state race, it does not create an
   ordering dependency.

## Result — the suite FAILS for the expected reasons

```text
ℹ tests 57
ℹ suites 16
ℹ pass 32
ℹ fail 17
ℹ cancelled 8
ℹ skipped 0
ℹ todo 0
```

### Failing tests

```text
✖ bootstrap subcommand — packaged-snapshot mode (no canonical source supplied) (518.093198ms)
✖ 4.14 source-linked mode creates no copied canonical content (229.603884ms)
✖ 4.15 an incomplete source is rejected before any write (877.615636ms)
✖ 4.16 the manifest records source provenance and checksums (519.116851ms)
✖ 4.17 only selected clients get discovery entries (207.380917ms)
✖ 4.18 autodiscovery performs no write before human selection (365.053032ms)
✖ 4.19 source drift blocks resume (1072.964096ms)
✖ 4.20 source-linked de-bootstrap leaves the external source byte-identical (210.224292ms)
✖ packaged-snapshot behavior is preserved unchanged (4.21) (461.74695ms)
✖ records packaged-snapshot as the delivery mode it took (0.620879ms)
✖ the transient container is never created — absent, not merely empty (2.120484ms)
✖ no copied guide, phase file, or skill body exists anywhere in the project (1.790418ms)
✖ durable state is written under .specboot/adoption/ only (1.57715ms)
✖ the payload and container obligations are recorded SKIPPED, never blank (0.429465ms)
✖ missing SPECBOOT_ADOPTION_GUIDE.md is rejected and the target is unchanged (259.643051ms)
✖ missing specboot-adoption/ is rejected and the target is unchanged (203.794538ms)
✖ missing ai-specs/skills/specboot-adopt/SKILL.md is rejected and the target is unchanged (208.926783ms)
✖ a skill directory without a readable SKILL.md is an invalid source (204.721371ms)
✖ a Git working-tree source records its commit (311.130505ms)
✖ a non-Git source records an explicit unavailable value with its reason (207.702206ms)
✖ the selected client's entries exist and point at the external canonical source
✖ the unselected client has no artifact created anywhere
✖ the manifest records the unselected client NOT SELECTED, never PENDING EVIDENCE
✖ 4.17 only selected clients get discovery entries (207.380917ms)
✖ a tree with candidates is byte-for-byte unchanged while findings are reported (173.121457ms)
✖ finding nothing is not authorization to proceed with no client (191.730582ms)
✖ a mutated canonical guide stops the resume for reconciliation (375.99509ms)
✖ an unchanged source resumes normally (341.414932ms)
✖ a source moved to a new path with matching checksums resumes (355.225519ms)
✖ the project-local discovery entries are gone
✖ an appended instruction block is byte-restored
✖ the durable manifest survives with terminal dispositions on every entry
✖ the external canonical source is byte-identical, file for file
✖ no manifest entry describes the source or any path inside it
✖ 4.20 source-linked de-bootstrap leaves the external source byte-identical (210.224292ms)
✖ still records packaged-snapshot as its delivery mode once modes exist (1.221901ms)
```

### Why each fails

| Task | Failing behavior | Cause in the current implementation |
|---|---|---|
| 4.21 | packaged-snapshot run records no `source` block | the manifest has no run-level provenance at all |
| 4.14 | `.specboot/bootstrap/` is created; guide, phase files and skill body are copied | there is only one delivery path, and it is the payload path |
| 4.15 | an incomplete source is accepted; the target is written to | no source is resolved, so nothing is validated |
| 4.16 | no `delivery-mode`, `path`, checksums, or `git` record | the manifest has no `source` block |
| 4.17 | the selected client gets no discovery entry at all | client-scoped discovery provisioning does not exist |
| 4.18 | `autodiscover` is not a subcommand | the read-only probe does not exist |
| 4.19 | drift is never detected; `resume` is not a subcommand | resume-time checksum comparison does not exist |
| 4.20 | `debootstrap` is not a subcommand | source-linked de-bootstrap does not exist |

## Suite inventory at RED (the 5.18 comparison baseline)

| Measure | Value |
|---|---|
| Test files | 6 — bootstrap-subcommand.test.js, delivery-modes.test.js, help-flag.test.js, ignore-provisioning.test.js, packaged-snapshot-regression.test.js, payload-assembly.test.js |
| `test(...)` blocks | 53 |
| `assert.*` calls | 168 |
| Skipped / `.todo` | 0 / 0 |

Any GREEN record that shows fewer test files, fewer `test(...)` blocks, fewer `assert.*` calls, or a
non-zero skipped count has reached green by weakening the suite rather than by fixing the code.

---

# Partial RED — design D-S option B revision (tasks 4.16, 4.23, 4.22)

Recorded 2026-08-14, on branch `feature/add-specboot-adoption-orchestrator`, before any of the
GREEN changes for this revision (3.3, 5.4, 5.13, 5.19, 8.8) was implemented.

**This is a PARTIAL RED, not a full-suite RED.** The delivery-mode campaign is already GREEN. Only
the assertions **introduced by 4.23** and **reversed by 4.16** may fail here; every other test must
stay PASS, and an unexpected failure among them is a regression that blocks GREEN.

## What was written or reversed before the run

| # | Location | Change | Driver |
|---|---|---|---|
| 1 | `delivery-modes.test.js` — 4.16 block | Rewritten. Was: `source.path.value` is a string and `source.path.portability === 'machine-specific-non-portable'`. Now: the block carries `local-path-resolution` (the fixed statement), carries **no** `path` field, contains the source path nowhere in its JSON, and the **schema** rejects a path (`additionalProperties: false`, no `path` property, none required) | Reversed by 4.16 |
| 2 | `delivery-modes.test.js` — 4.14 "durable state" | Was: `readdirSync('.specboot/')` deep-equals `['adoption']`. Now: deep-equals `['adoption', 'local']`, plus the durable root is not ignored and the store **is** | Reversed by 4.23 — the machine-local store is a new legitimate member of `.specboot/` |
| 3 | `delivery-modes.test.js` — 4.23 blocks | New: 7 tests over no-path-in-any-committable-file, the store's location/ignore status/exclusive content, and the three resume cases | Introduced by 4.23 |
| 4 | `packaged-snapshot-regression.test.js` — provenance test | Was: `m.source.path === null`. Now: no `path` property exists in either mode, and `local-path-resolution` is carried in packaged-snapshot too | Reversed by 4.16 |

Corrections 2 and 4 both **tighten** their assertions (an exact set instead of a single name; the
absence of a field instead of its presence holding `null`). Neither relaxes a 4.14/4.21 guarantee:
the transient container is still asserted absent, and the 4.21 payload, entry-inventory, durable-
artifact and ignore-rule pins are untouched. The 4.21 baseline's own scope note already places the
run-level `source` block outside the packaged-snapshot behavior it pins.

## Half one — the expected failures

`npm test` in `packages/specboot/`, first invocation from a clean checkout (`bootstrap-payload/`
removed beforehand):

```
ℹ tests 66
ℹ suites 18
ℹ pass 54
ℹ fail 12
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

All 12 failures, with the pre-implementation reason for each:

| Test | Why it fails now |
|---|---|
| 4.14 · durable state is written under `.specboot/adoption/` only | `.specboot/local/` does not exist yet — `['adoption']` ≠ `['adoption','local']`, and `git check-ignore` reports the store path **not** ignored |
| 4.16 · a Git working-tree source records its commit, its checksums, and no path | `local-path-resolution` is `undefined`; `source.path` still exists and its `value` is the fixture source path |
| 4.16 · a non-Git source records an explicit unavailable value with its reason | Git half passes; fails on the same missing statement and the surviving `path` field |
| 4.16 · the schema REJECTS a resolved path rather than merely omitting one | The schema still defines `path`, still **requires** it, and still carries `machine-specific-non-portable` |
| 4.23 · no committable file the run wrote contains the resolved absolute path | `.specboot/adoption/BOOTSTRAP-MANIFEST.json` is committable and contains the resolved path |
| 4.23 · the manifest and the run log specifically carry none | Same: the manifest carries `source.path.value` |
| 4.23 · the retained path is written under `.specboot/local/` and git reports it ignored | No store is written and no `.specboot/local/` rule is provisioned |
| 4.23 · the store holds the path and nothing else | `ENOENT` on `.specboot/local/` — there is no store to inspect |
| 4.23 · same-machine resume reuses the store without asking, and still recomputes the checksums | Resume succeeds, but by reading `source.path.value` from the manifest; stdout names no machine-local store |
| 4.23 · a deleted store causes no failure beyond asking for a source path again | Resume exits 0 instead of asking — it still has the committed path to fall back on |
| 4.23 · ADOPT-18 removes the machine-local store | Precondition fails: there is no store to remove |
| 4.21 · still records packaged-snapshot as its delivery mode once modes exist | `hasOwnProperty('path')` is still `true` in packaged-snapshot mode |

No 4.16 or 4.23 assertion passed prematurely. Every one of them fails for the reason the reversal
predicts, which is what makes them evidence rather than decoration.

## Half two — the unaffected tests remain PASS

54 passes, and every suite outside the reversal set is fully green:

| Suite | Result |
|---|---|
| bootstrap subcommand — packaged-snapshot mode | 5 / 5 PASS |
| default invocation is unchanged | 3 / 3 PASS |
| 4.14 (other three tests) | 3 / 3 PASS |
| 4.15 an incomplete source is rejected before any write | 4 / 4 PASS |
| 4.17 only selected clients get discovery entries | 3 / 3 PASS |
| 4.18 autodiscovery performs no write | 2 / 2 PASS |
| 4.19 source drift blocks resume | 3 / 3 PASS |
| 4.20 source-linked de-bootstrap | 5 / 5 PASS |
| 4.13 help flags | 4 / 4 PASS |
| 4.7 / 4.8 ignore provisioning + durable protection | 10 / 10 PASS |
| 4.21 packaged-snapshot regression (other five tests) | 5 / 5 PASS |
| payload assembly / drift check / packaged files | 7 / 7 PASS |

**No regression.** Nothing outside the reversal set failed, so GREEN implementation is unblocked.

## Suite inventory at this RED (the 5.18 comparison baseline)

| Measure | Value |
|---|---|
| Test files | 6 — bootstrap-subcommand.test.js, delivery-modes.test.js, help-flag.test.js, ignore-provisioning.test.js, packaged-snapshot-regression.test.js, payload-assembly.test.js |
| `test(...)` blocks | 62 (was 53; +9 — seven new 4.23 tests, and the 4.16 block went from 2 tests to 3) |
| `assert.*` calls | 216 (was 168) |
| Skipped / `.todo` / removed | 0 / 0 / 0 |

The GREEN record for 5.17–5.18 is compared against **this** table, not the pre-revision one.

---

# RED baseline — seventh revision (tasks 4.24–4.31)

**Additive. Nothing above this line is modified.** The sections above describe what was true when
they were written; this one records a separate campaign against a narrowed scope (design **D-W**:
source-linked delivery only, packaged-snapshot deferred whole to
`add-specboot-packaged-snapshot-delivery`).

Date 2026-08-14 · host `Darwin 22.6.0` · Node built-in test runner · **first invocation from a
clean checkout** (`rm -rf bootstrap-payload` before each run, per design D-O).

## Command and result

```
$ rm -rf bootstrap-payload
$ node --test --test-concurrency=1 --test-reporter=tap "test/"*.test.js
# tests 90
# pass  70
# fail  20
```

## Half one — the new assertions FAIL, each for its expected pre-implementation reason

| # | Task | Failing assertion | Why it fails today |
|---|---|---|---|
| 1 | 4.24 | NO source and NO client refuses — no placeholder selection is ever written | the packaged-snapshot branch never validates a client; it writes a full payload and a manifest |
| 2 | 4.24 | no committed artifact anywhere records a placeholder selection | `selectedClient: 'undeclared'` is written into the committed manifest ([`init.js:919`](../../../packages/specboot/bin/init.js)) |
| 3 | 4.25 | the refusal lists the clients that ARE supported | the unknown-client error names the bad client only; the operator is not told what to use instead |
| 4 | 4.26 | all collisions are reported together, and nothing is written | there is no preflight: collisions surface during provisioning, one failed write at a time |
| 5 | 4.26 | the mutation inventory names path, operation, mechanism, and reversibility | no inventory is produced; the gate presents an intention |
| 6 | 4.26 | a failure partway through leaves nothing behind | no restore exists; the run throws mid-provisioning |
| 7 | 4.26 | no orphaned discovery entry survives a failed provisioning | `.claude/skills/specboot-adopt` and `.claude/CLAUDE.md` are left behind |
| 8 | 4.26 | a retry starts from a repository that was never bootstrapped | the retry trips over the leftovers from the failed run |
| 9 | 4.27 | worktree clean, status recorded, the commit present | `git.worktree` does not exist — the block is two-state |
| 10 | 4.27 | worktree not-a-repository, status unavailable, reason, no commit | same: no `worktree` field to record |
| 11 | 4.27 | worktree dirty, status unavailable, with the reason | `readSourceGitProvenance` reads HEAD with no working-tree check and records `status: recorded` |
| 12 | 4.27 | the HEAD commit never reaches the identity field | a dirty tree's HEAD is written to `commit`, the field a consumer reads as identity |
| 13 | 4.27 | no commit value is inferred anywhere in the source block | same root cause |
| 14 | 4.28 | the run stops and the target is byte-for-byte unchanged | the run proceeds and provisions a degraded entry |
| 15 | 4.28 | NO pointer-file discovery entry is created | `provisionSourceLinkedClient` writes `mode: 'pointer-file'` and treats it as discovery |
| 16 | 4.29 | the run STOPS after provisioning and emits a fresh-session handoff | no handoff is emitted by the CLI |
| 17 | 4.29 | the same virgin repository refuses when no source is supplied | falls through to the packaged-snapshot branch |
| 18 | 4.30 | bootstrap with no `--source` fails closed with zero writes | writes a 17-file payload plus manifest and run log |
| 19 | 4.30 | no payload is assembled, and no `.specboot/bootstrap/` is created | same |
| 20 | 4.30 | no copied guide, phase file, or skill body appears anywhere | same — the guide, all 13 phase files, and `SKILL.md` are copied in |

**No premature PASS.** Every assertion introduced by 4.24–4.30 that asserts corrected behavior
fails. Assertions that pass in these files are pre-existing correct behavior, recorded here so the
RED evidence is not overstated:

- 4.24 — a validated source with no `--client` already refuses (the source-linked branch checks it);
- 4.25 — an unknown client already refuses, and the nearest supported client is not substituted;
- 4.28 — no content copy is made, and the schema no longer admits `pointer-file` (task **3.3**,
  landed earlier in this group's recorded order);
- 4.27 — the checksums already reflect the working-tree bytes, which is exactly why the dirty case
  is a provenance-honesty problem and not an identity one;
- 4.29 — 8 of 10, because source-linked provisioning was already largely correct. The two that fail
  are the two the cold-start gap actually consisted of.

## Half two — every unaffected regression remains PASS

Measured per suite, each from a clean checkout:

| Suite | Tasks | tests | pass | fail |
|---|---|---|---|---|
| `delivery-modes.test.js` | 4.14–4.20, 4.23 | 31 | **31** | 0 |
| `payload-assembly.test.js` | 4.5, 4.6, 4.9 | 7 | **7** | 0 |
| `ignore-provisioning.test.js` | 4.7, 4.8 | 10 | **10** | 0 |
| `help-flag.test.js` | 4.13 | 4 | **4** | 0 |
| `bootstrap-subcommand.test.js` | 4.4 | 3 | **3** | 0 |
| `cold-start.test.js` | 4.29 | 10 | 8 | **2** |
| `no-symlink-discovery.test.js` | 4.28 | 5 | 3 | **2** |
| `preflight.test.js` | 4.26 | 5 | 0 | **5** |
| `provenance.test.js` | 4.27 | 6 | 1 | **5** |
| `refusals.test.js` | 4.24, 4.25, 4.30 | 9 | 3 | **6** |

**No unexpected failure in an unaffected test.** Every failure is in a suite this revision added.

## Retirements recorded (task 4.30)

Retired from the active suite, **not deleted**, and preserved verbatim as prior evidence for the
deferred change. `package.json` `scripts.test` runs `test/*.test.js`, which does not match
`test/deferred/`, so these no longer execute:

| Moved to `test/deferred/` | Was | Task |
|---|---|---|
| `packaged-snapshot-bootstrap.test.js` | the packaged-snapshot `describe` in `test/bootstrap-subcommand.test.js` | 4.3 |
| `packaged-snapshot-regression.test.js` | top-level | 4.21 |
| `fixtures-packaged-snapshot-baseline.json` | top-level | 4.21's captured end state |

`test/deferred/README.md` records why and how they are re-activated. **Task 4.4's
default-invocation guarantee stayed active** — it is mode-independent and still binding.

**One adaptation, not a retirement.** `ignore-provisioning.test.js`'s two bootstrap-invoking tests
were changed from `runCli(['bootstrap', dir])` to a source-linked invocation with an explicit
client, because the bare form now fails closed. The **requirement is unchanged** — the durable path
stays tracked, the transient paths stay ignored — and the coverage was *extended*: the run now also
asserts `.specboot/local/` is ignored.

**No historical report was modified.** `reports/installer-tdd-green.md` and everything above this
line are untouched.

---

# RED baseline — eighth revision (task 4.32)

**Additive. Nothing above this line is modified.** One bounded correction for one confirmed defect.

Date 2026-08-14 · host `Darwin 22.6.0` · `test/debootstrap-replacement.test.js`.

## The defect

`10-debootstrap.md` step 2 and design **D-C** both require the permanent replacement to be verified
**before** the transient entry is removed, and an unresolved replacement to record **FAIL** with the
entry left in place. The implementation does neither:

```
$ sed -n '/^function runDebootstrap/,/^}/p' bin/init.js | grep -c 'intended-permanent-replacement'
0
```

The entry-processing loop removes unconditionally and records success:

```js
} else if (e.mode === 'symlink' || e.mode === 'pointer-file' || e.mode === 'real-file' || e.mode === 'copy') {
  if (pathExists(abs)) fs.rmSync(abs, { recursive: true, force: true });
  e['cleanup-status'] = 'removed';
```

**No active test block exercised this refusal.** The de-bootstrap coverage in
`delivery-modes.test.js` walks the success path only; task 13.6's evidence is the *container*
refusal, recorded against the earlier procedure.

## Method

The test drives the **real `debootstrap` command** as a child process — reimplementing its logic in
the test would prove only that the test agrees with itself. It bootstraps a fixture normally, then
sabotages **exactly one** entry (`.claude/skills/specboot-adopt`) by setting its
`intended-permanent-replacement` to `docs/base-standards.md`, which does not exist. Every other entry
is left untouched, so a failure cannot be mistaken for a whole-run abort.

Two setup guards keep the result from being vacuous: the entry is asserted to start with
`intended-permanent-replacement: null`, and the sabotaged path is asserted **not to resolve**.

## Result — 4 of 6 FAIL, each for its expected pre-implementation reason

```
$ node --test --test-concurrency=1 --test-reporter=tap test/debootstrap-replacement.test.js
# tests 6
# pass  2
# fail  4
```

| # | Assertion | Verbatim failure |
|---|---|---|
| a | the run exits non-zero and reports the reconciliation | `an unresolved replacement is FAIL, not cleanup: the run must exit unsuccessfully` — `expected: 0, actual: 0, operator: notStrictEqual` |
| b | the transient entry is still present, still a symlink, still resolving | `the entry whose replacement is missing must be left in place` — `expected: true, actual: false` |
| c | nothing was removed, and the only modified path is the manifest | `a refusal removes nothing: a step that deleted a sibling while refusing fails here` — actual removed set: `['.claude/CLAUDE.md', '.claude/skills/specboot-adopt', …]` |
| d | the refused entry has no terminal successful disposition | `an entry left on disk must not be recorded as removed — a manifest disagreeing with the filesystem is worse than either outcome alone` — `expected: 'removed', actual: 'removed', operator: notStrictEqual` |

**The two that pass are recorded rather than claimed as RED**, so the evidence is not overstated:

- **e — durable evidence survives.** The manifest and run log are already preserved; this defect
  destroys the *entry*, not the record. The assertion is kept because a fix must not regress it.
- **the resolving-replacement control.** An entry whose replacement genuinely resolves is already
  processed correctly. This guards the GREEN change against over-correction — a fix that refused
  everything would fail here.

Failure **c** is the one that shows the real blast radius: the refusal did not merely mis-handle its
own entry, it removed the whole inventory including `.claude/CLAUDE.md`.

## Scope

RED only. No implementation file was changed by this task, and no historical section above this line
was touched.
