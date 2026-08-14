# Group 5 Report — GREEN for the Installer

- Date: 2026-08-12
- Command: `npm test` in `packages/specboot/`

## Result: 22 tests, 22 pass, 0 fail

All 11 tests that failed at RED now pass. The 11 regression guards still pass — the default
install path is unchanged.

## What was implemented

| Task | Change in `packages/specboot/` |
|---|---|
| 5.1 | `bin/init.js`: subcommand-aware argv parsing (`bootstrap`, `drift-check`). The default path is untouched — `init.js <dir>` and `init.js` resolve the target from `argv[2]` exactly as before, and the `.claude`/`.cursor` provisioning loop is byte-for-byte unchanged |
| 5.2 | `scripts/assemble-payload.js` + `prepack`: assembles `bootstrap-payload/` from the canonical paths named in the kit manifest at pack time |
| 5.3 | `drift-check` subcommand: **enforcing** (exit 1) for kit payload drift, **warn-only** (exit 0) for pre-existing `template/` drift |
| 5.4 | `ensureGitignoreTransientRules()` replaces `ensureGitignoreStagingRule()`: the same `git check-ignore` probe and conservative fallback applied **per path** over `{.specboot/staging/, .specboot/bootstrap/}` |
| 5.5 | `DURABLE_DIR` is documented and never provisioned a rule; no broader `.specboot/` pattern is written |
| 5.6 | `package.json` `files` gains `bootstrap-payload/` |
| 5.7 | repo `.gitignore`: `.specboot/bootstrap/` and `packages/specboot/bootstrap-payload/` ignored; `.specboot/staging/` unchanged; `.specboot/adoption/` verified tracked |

Verified ignore verdicts in this repository:

```
IGNORED    .specboot/staging/x
IGNORED    .specboot/bootstrap/x
TRACKED    .specboot/adoption/BOOTSTRAP-MANIFEST.json
IGNORED    packages/specboot/bootstrap-payload/manifest.json
```

## Two test corrections, and why neither is a weakening (task 5.9)

**1. The negation scenario asserted an outcome Git cannot produce.** The test used
`.specboot/` + `!.specboot/bootstrap/` and expected Git to report the probe as *not* ignored. Git
cannot re-include a file whose **parent directory** is excluded, so the negation is inert:

```
$ git check-ignore -v .specboot/bootstrap/.specboot-probe
.gitignore:2:.specboot/    .specboot/bootstrap/.specboot-probe   # exit 0 = ignored
```

The implementation was correct — it trusts Git's verdict. The test was rewritten to use
`.specboot/*` + `!.specboot/bootstrap/`, where the negation *is* reachable (`exit 1 = not
ignored`) and the exact narrow rule must therefore be appended. This makes the test assert the real
`check-ignore`-not-literal-match behavior instead of an impossible one.

**2. `npm pack --json` parsing exposed a real implementation bug.** The test failed because
`prepack` logged to **stdout**, corrupting the JSON document `npm pack --json` emits there. The fix
was to the *script*, not the test: `assemble-payload.js` now logs to stderr. The test was
additionally made robust by parsing from the first `[`, so it asserts packaging rather than npm's
logging behavior.

## Evidence that nothing was weakened

| Metric | RED | GREEN |
|---|---|---|
| test files | 3 | 3 |
| `test(...)` blocks | 22 | 22 |
| `assert.*` calls | 72 | 72 |
| `.skip` / `.todo` markers | 0 | 0 |

No test was deleted, skipped, or had assertions removed.

---

# Addendum — GREEN for the order-dependence correction (tasks 5.8, 5.9)

- Date: 2026-08-12
- Correction implemented in the documented order: 4.11 → 4.12 → 4.2 → 4.5 → 4.6 → 4.9 → 4.10

## 5.8 — First-invocation pass from both preconditions, plus a repeat

| Precondition | Invocation | Exit | tests | pass | fail |
|---|---|---|---|---|---|
| **Clean checkout** — `bootstrap-payload/` absent entirely | **first** | **0** | 24 | 24 | 0 |
| **Intentionally stale** — payload deliberately mutated away from canonical | **first** | **0** | 24 | 24 | 0 |
| Same state, run again | repeat | **0** | 24 | 24 | 0 |

Compare with the RED addendum, where the same stale precondition produced **exit 1, 21/22 on the
first invocation** and only passed on the second. The order dependence is gone: the first
invocation now produces the same verdict as every later one, from either starting state.

## What made it deterministic

| Task | Change |
|---|---|
| 4.2 | `test/helpers.js` gains `assemblePayload()` — regenerates `bootstrap-payload/` from canonical on demand — and `removePayload()` for reproducing a clean checkout |
| 4.5 | the assembly suite calls `assemblePayload()` in its own `before()`, and a **new** test asserts the CLI reports `Channel: npm`, proving the assembled payload is under test rather than the source-copy fallback |
| 4.6 | the drift suite calls `assemblePayload()` in its own `before()` to reach a known-good state, and a **new** test asserts a freshly assembled payload reports **no** drift |
| 4.9 | the pack test assembles explicitly and runs `npm pack --dry-run --json --ignore-scripts`, so `prepack` can no longer regenerate the payload as a side effect and repair another test's precondition |

## 5.9 — Nothing weakened

| Metric | RED (original) | GREEN (now) |
|---|---|---|
| test files | 3 | 3 |
| `test(...)` blocks | 22 | **24** (+2) |
| `assert.*` calls | 72 | **77** (+5) |
| `.skip` / `.todo` markers | 0 | **0** |

Counts moved **up**. No test was deleted, skipped, or had assertions removed.

### The drift assertion still bites

Determinism made the drift test start from a *known* state, not a forgiving one. Two proofs:

1. **Genuine drift still fails.** `FAILS when a kit payload file drifts from its canonical source`
   passes in isolation — it assembles a known-good payload, mutates one file, and requires a
   non-zero exit:
   ```
   node --test --test-name-pattern "FAILS when a kit payload file drifts" test/payload-assembly.test.js
   ℹ tests 1   ℹ pass 1   ℹ fail 0
   ```
2. **The check can distinguish clean from drifted.** The new companion test asserts a freshly
   assembled payload reports *no* drift. Before the correction the check could not tell "drifted"
   from "never assembled" — that ambiguity is what allowed the vacuous clean-checkout pass.

### Order independence, demonstrated

Three consecutive isolated runs of the payload/drift/pack file alone:

```
run 1 exit=0  ℹ pass 7
run 2 exit=0  ℹ pass 7
run 3 exit=0  ℹ pass 7
```

Identical verdict every time, running only that file — so no test in it depends on another file
having run first.

---

## Task 5.10 — GREEN: flag arguments no longer become target directories

- Date: 2026-08-12
- Suite: `packages/specboot/test/help-flag.test.js`
- Result: **28 tests, 28 pass, 0 fail** — on a **first invocation from a clean checkout**
  (`bootstrap-payload/` removed beforehand) and again on a repeat run. No test required a second
  invocation, per design D-O.

### The fix

`bin/init.js` now handles help **before** the target is resolved, so help can have no filesystem
side effect:

- `--help` / `-h` anywhere in argv → print usage, `process.exit(0)`, write nothing. Scanning all of
  `argv.slice(2)` means `bootstrap --help` is also help, not a bootstrap into a `--help` directory.
- Any other `targetArg` beginning with `-` → `Unknown option`, `process.exit(1)`. This is the
  "never silently accepted as a target path" clause: unknown flags now fail loudly instead of
  becoming directory names.

### Verified behaviour

| Invocation | Exit | Output | Filesystem |
|---|---|---|---|
| `init.js --help` | 0 | usage block | **0 entries created** |
| `init.js -h` | 0 | usage block | no `-h` directory |
| `init.js --bogus` | 1 | `Unknown option: --bogus` | nothing written |
| `init.js ./def` | 0 | install summary | 56 files + symlinks — unchanged |

The default and `bootstrap` paths are untouched: the guard sits between `targetArg` computation and
`path.resolve()`, and every pre-existing test (24 of the 28) still passes.

### Evidence directory not deleted

The stray `--help/` directory in this repository's working tree is **left in place**, per task
5.10. It is the artifact of the defect, and its removal is a separate operator decision recorded in
the run log — not a side effect of the fix.


---

# GREEN — Delivery-Mode Campaign (tasks 5.11–5.18)

Recorded 2026-08-13, host `Darwin 22.6.0`. Command: `npm test` in `packages/specboot/`
(`node --test --test-concurrency=1 "test/*.test.js"`).

## What was implemented

| Task | Implementation in `bin/init.js` |
|---|---|
| 5.1 | long-option parsing (`--source`, `--client`, `--route`) separated from positionals, so a flag is never mistaken for a target; `autodiscover`, `resume` and `debootstrap` added to the subcommand set. The default install path's client-provisioning loop is untouched. |
| 5.11 | `validateCanonicalSource()` — three artifacts, with the skill validated as a **readable `SKILL.md`**, run before any load and before the first write; mode selected from whether a source was supplied and validated; a rejected source exits non-zero having written nothing. |
| 5.12 | `provisionSourceLinkedClient()` — discovery entries pointing at the external source, `mode: pointer-file` where symlinks are unavailable, durable state under `.specboot/adoption/` only, no `.specboot/bootstrap/` and no canonical copy. |
| 5.13 | `buildSourceBlock()` / `readSourceGitProvenance()` — delivery mode, machine-specific-labelled path, both checksums, and either the commit or `unavailable` **with its reason**. Never inferred, never omitted. The source is never an entry. |
| 5.14 | `probeClients()` / `runAutodiscover()` — read-only probe, display-and-wait, empty result still asks; only explicitly selected clients are provisioned, all others recorded `NOT SELECTED`. |
| 5.15 | `runResume()` — recomputes both checksums against the source supplied at resume, stops for reconciliation on mismatch, and accepts a new local path on matching checksums without requiring the recorded path to exist. |
| 5.16 | `runDebootstrap()` — removes project-local entries, byte-restores appended blocks, records the payload and container obligations `SKIPPED — source-linked mode`, writes back terminal dispositions, and leaves the external source untouched. |

## 5.17 — D-O evidence: first-invocation passes

Both preconditions from task 4.12 were exercised, each on a **first** invocation. A pass that
required a second invocation is not GREEN.

### Run A — clean checkout (no `bootstrap-payload/` present at all)

```text
$ rm -rf bootstrap-payload && ls bootstrap-payload
ls: bootstrap-payload: No such file or directory
$ npm test
ℹ tests 57
ℹ pass 57
ℹ fail 0
ℹ skipped 0
ℹ todo 0
exit=0
```

### Run B — intentionally stale assembled payload

The payload was assembled, then a canonical source (`SPECBOOT_ADOPTION_GUIDE.md`) was mutated so
the assembled copy no longer matched it. Staleness was confirmed by diff before the run, and the
canonical file was restored afterwards.

```text
$ node scripts/assemble-payload.js && <mutate canonical guide>
confirmed stale
$ npm test
ℹ tests 57
ℹ pass 57
ℹ fail 0
ℹ skipped 0
ℹ todo 0
exit=0
```

### Run C — repeated invocation

```text
ℹ tests 57
ℹ pass 57
ℹ fail 0
```

### A concurrency defect fixed on the way, and why it is not a weakening

`node --test` runs test files in parallel by default. Several files call `assemblePayload()`, which
removes and rebuilds the shared `bootstrap-payload/` directory — so one file's rebuild was deleting
the payload another file was mid-way through reading, producing failures unrelated to any assertion
under test. `scripts.test` now passes `--test-concurrency=1`.

This satisfies design **D-O** rather than evading it: every test still establishes its own state in
its own setup, no test repairs state for another, and each passes on a first invocation. D-O
prohibits *order dependence*; removing a shared-mutable-state race does not introduce one.

## 5.18 — no test was weakened, deleted, or skipped

| Measure | RED (4.22) | GREEN | Verdict |
|---|---|---|---|
| Test files | 6 | 6 | unchanged |
| `test(...)` blocks | 53 | 53 | unchanged |
| `assert.*` calls | 168 | 168 | unchanged |
| Skipped | 0 | 0 | unchanged |
| `.todo` | 0 | 0 | unchanged |
| Removed assertions | — | 0 | none |

**The packaged-snapshot regression (4.21) was not relaxed.** It still asserts the full captured end
state: the exact payload tree (23 files), the exact durable artifact set, the entry inventory field
for field (path, ownership, mode, cleanup-status, canonical source, intended replacement), the exact
ignore rules, `.specboot/adoption/` never ignored, and no bare `.specboot/` pattern. The one
assertion added to it — that a packaged-snapshot run records `delivery-mode: packaged-snapshot`
with a null resolved path — **tightens** the regression; nothing in it was removed or loosened to
accommodate source-linked mode.

Two blocks were **strengthened** rather than weakened during RED, because they would otherwise have
passed vacuously: 4.17 and 4.20 gained preconditions asserting that the selected client was actually
provisioned before asserting what de-bootstrap removed, and 4.19's positive resume cases now require
the run to state that it verified source identity rather than accepting a silent exit 0.

---

# GREEN — design D-S option B revision (tasks 5.13, 5.19, 5.4, 5.17, 5.18)

Recorded 2026-08-14. Compared against the **partial RED baseline** of task 4.22 in
`installer-tdd-red-baseline.md`, not against the superseded pre-revision record.

## What was implemented

| Task | Change |
|---|---|
| 3.3 | `BOOTSTRAP-MANIFEST.schema.json`: the `source` block drops `path` entirely and gains `local-path-resolution`, a **required** field pinned by `const` to the fixed per-machine-resolution statement. With `additionalProperties: false` already in place, a resolved path is now unrecordable rather than merely discouraged |
| 5.4 | `.specboot/local/` joins the transient rule set as `LOCAL_STORE_RULE`, with its own `git check-ignore` probe and the same conservative fallback. `ensureGitignoreTransientRules(rules)` takes the set to provision, so the rule is written by the runs that can produce a store — never widening to a bare `.specboot/`, and never changing the ignore set of a run that resolves no external source |
| 5.13 | `buildSourceBlock()` writes `local-path-resolution` in **both** modes and no `path` in either. Checksums and the Git record (or an explicit `unavailable` with its reason) are unchanged |
| 5.19 | `writeLocalSourceStore()` / `readLocalSourceStore()` / `removeLocalSourceStore()`. Source-linked bootstrap provisions the ignore rule **before** writing the store, so the path is never momentarily committable. Resume reads the store when it resolves here, otherwise asks; it recomputes the checksums on every resume regardless of where the path came from; the store is never read as evidence and its absence is never a failure. De-bootstrap removes it alongside the other project-local temporary state |
| 8.8 | The run log's *Source and delivery mode* block loses its resolved-path line and gains the per-machine-resolution statement; the drift table's `Source path used` column becomes *Local path obtained from* |
| 3.17 | The entry prompt's handoff boundary states that the handoff carries no source path, and the fresh session's resume now **acquires** a local path (store → ask → rediscover) before verifying identity |

## 5.17 — D-O evidence: first-invocation passes

### Run A — clean checkout (no `bootstrap-payload/` present at all)

```text
$ rm -rf bootstrap-payload && ls bootstrap-payload
ls: bootstrap-payload: No such file or directory
$ npm test
ℹ tests 66
ℹ suites 18
ℹ pass 66
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
exit=0
```

### Run B — intentionally stale assembled payload

The payload was assembled, then the canonical `SPECBOOT_ADOPTION_GUIDE.md` was mutated so the
assembled copy no longer matched it. Staleness was confirmed by `diff` before the run
(`Files bootstrap-payload/SPECBOOT_ADOPTION_GUIDE.md and ../../SPECBOOT_ADOPTION_GUIDE.md differ`),
and the canonical file was byte-restored afterwards.

```text
$ npm test
ℹ tests 66
ℹ suites 18
ℹ pass 66
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
exit=0
```

Both are **first** invocations. Neither needed a second run to reach green.

### Every test named by 5.17 passes

| Block | Tests | Result |
|---|---|---|
| 4.14 source-linked copies nothing canonical | 4 | PASS |
| 4.15 an incomplete source is rejected before any write | 4 | PASS |
| 4.16 portable source identity and no path | 3 | PASS |
| 4.17 only selected clients get discovery entries | 3 | PASS |
| 4.18 autodiscovery performs no write | 2 | PASS |
| 4.19 source drift blocks resume | 3 | PASS |
| 4.20 source-linked de-bootstrap | 5 | PASS |
| 4.21 packaged-snapshot preserved unchanged | 6 | PASS |
| **4.23 no committed artifact holds the path** | 4 | PASS |
| **4.23 resume against the machine-local store** | 3 | PASS |

All 12 assertions that failed at the 4.22 partial RED now pass, and none of the 54 that passed
there regressed.

## 5.18 — no test was weakened, deleted, or skipped

| Measure | 4.22 RED record | Now | Verdict |
|---|---|---|---|
| Test files | 6 | 6 (same names) | unchanged |
| `test(...)` blocks | 62 | 62 | unchanged |
| `assert.*` calls | 216 | 216 | unchanged |
| Skipped | 0 | 0 | none introduced |
| `.todo` | 0 | 0 | none introduced |
| `.only` | 0 | 0 | no suite narrowed |
| Removed assertions | — | 0 | none |

Counts are identical because every test change of this revision was made **before** the RED run and
is already inside the RED baseline. Nothing was touched between RED and GREEN except `bin/init.js`,
the schema, the run-log template, the kit's source-resolution recipe, and the entry prompt.

### 4.21 still asserts the full captured end state

The packaged-snapshot regression keeps all six of its tests, and the five that pin **behavior** are
byte-for-byte untouched: the baseline payload superset, the exact canonical-projection payload, the
exact durable artifacts, the field-for-field entry inventory, and the exact ignore rules
(`['.specboot/staging/', '.specboot/bootstrap/']`, with `.specboot/adoption/` not ignored and no
bare `.specboot/` rule). Adding `.specboot/local/` to the transient set did **not** change a
packaged-snapshot run's ignore rules — it is provisioned only where a store can exist — so that
assertion still holds at its original strength rather than having been relaxed to accommodate it.

The sixth test, on run-level provenance, was **tightened**: `m.source.path === null` became "no
`path` property exists in any mode" plus "the per-machine-resolution statement is carried in
packaged-snapshot too". The 4.21 baseline's own scope note already places the run-level `source`
block outside the packaged-snapshot behavior it pins.

### And the drift detection still fails on genuine drift

`payload-assembly.test.js` retains both halves — a freshly assembled payload has no drift, and a
mutated payload file **fails** the check — so the drift assertion was not relaxed to accommodate
the fixture or schema change. Run B above is the same property observed end to end: a stale payload
produced a first-invocation pass because the suite assembles what it needs, not because drift
stopped being detected.

---

# GREEN — seventh revision (tasks 5.20–5.26)

**Additive. Nothing above this line is modified.** The RED baseline this closes is the
correspondingly additive section at the end of `installer-tdd-red-baseline.md`.

Date 2026-08-14 · host `Darwin 22.6.0` · Node built-in test runner.

## Result — order-independent, first-invocation pass in every scenario (design D-O)

| Scenario | tests | pass | fail |
|---|---|---|---|
| **Clean checkout**, `bootstrap-payload/` absent, **first invocation** | 89 | **89** | 0 |
| **Intentionally stale** assembled payload, **first invocation** | 89 | **89** | 0 |
| **Repeated** invocation | 89 | **89** | 0 |

No scenario required a second invocation. The stale-payload scenario was produced by assembling the
payload and then appending to `bootstrap-payload/SPECBOOT_ADOPTION_GUIDE.md`, so the run began from
genuinely drifted state rather than from a clean one relabelled.

## What each GREEN task changed

| Task | Change in `bin/init.js` | Closes |
|---|---|---|
| 5.20 | `runBootstrap` refuses R3 (no client) and R4 (unknown client, **listing the supported ones**) before the preflight; the `selectedClient: 'undeclared'` placeholder is gone — there is no code path that writes an unmade selection | 4.24, 4.25 |
| 5.21 | `WriteJournal` + `planSourceLinkedBootstrap` + `printMutationInventory`: every path resolved and classified before any write, **all** collisions reported together, the exact inventory printed at the gate, and a `rollback()` on any failure | 4.26 |
| 5.22 | `readSourceGitProvenance` reads `git status --porcelain` **before** deciding anything about HEAD, and returns one of three dispositions; a dirty tree records `unavailable` with its reason and puts any HEAD under `observed-head` with a fixed note, never under `commit` | 4.27 |
| 5.23 | The pointer-file branch is **deleted**. Recipes declare `discoversWithoutSymlink`; where it is false and symlinks are unavailable, the run refuses before provisioning and names the client, the mechanism, and what was attempted | 4.28 |
| 5.24 | `runBootstrap` refuses R1 (no source) and R2 (invalid source); the packaged-snapshot branch is removed from the user-reachable surface | 4.30 |
| 5.25 | The above, driven end to end: `printFreshSessionHandoff()` stops the initial session and emits the generated prompt, carrying no source path | 4.29 |

## One gap execution surfaced, and how it was closed

**5.24 says to retain the drift check as installer machinery — and retiring packaged-snapshot would
have made it dead code.** The enforcing branch of `drift-check` only ever compared a **staged**
`.specboot/bootstrap/` payload, which only packaged-snapshot creates. With that mode deferred,
nothing would have exercised it: the assembled `bootstrap-payload/` that `prepack` produces and npm
actually ships was never drift-checked at all.

Two corrections, both inside 5.24's stated scope:

1. The enforcing branch now checks **both** payload roots — the staged one (deferred mode) and the
   assembled one — accounting for their different layouts: the assembly mirrors `canonicalSource`
   paths, a staged payload mirrors the manifest's `payloadTarget` mapping.
2. Canonical is now read from the **repository**, never from `resolveKitSource()`. That function
   prefers the assembled payload, so reading canonical from it compared the payload against itself
   — a vacuous pass reporting zero drift no matter what had drifted.

Verified by injecting drift into `bootstrap-payload/SPECBOOT_ADOPTION_GUIDE.md`: the check now exits
1 and names the path. Before correction 2 it exited 0.

## No test was weakened, deleted, or skipped

| Measure | Active suite | Retired to `test/deferred/` | Total |
|---|---|---|---|
| test files | 10 | 3 | 13 |
| `test(...)` blocks | 82 | 15 | 97 |
| `assert.*` calls | 247 | 49 | 296 |
| `.skip` / `.todo` / skipped | **0** | 0 | **0** |

**Every removal from the active suite is accounted for by name, with its reason** (task 4.30):

| Retired | From | Why |
|---|---|---|
| `packaged-snapshot-bootstrap.test.js` (5 blocks) | `bootstrap-subcommand.test.js`, task 4.3 | asserts packaged-snapshot delivery, which the CLI no longer exposes |
| `packaged-snapshot-regression.test.js` (6 blocks) | top level, task 4.21 | the behavior-pinning baseline for the deferred mode |
| `packaged-snapshot-payload.test.js` (2 blocks) | `payload-assembly.test.js`, tasks 4.5/4.6 | staged a payload by invoking `bootstrap` with no source |

**Nothing was deleted.** All three files, plus
`fixtures-packaged-snapshot-baseline.json`, are preserved verbatim under `test/deferred/` with a
`README.md` recording why and how they are re-activated. `test/deferred/` is outside the
`test/*.test.js` glob, so they do not run.

**Two adaptations, not weakenings.** Both are invocation changes forced by new *required* behavior,
with the requirement under test unchanged:

- `ignore-provisioning.test.js` (2 blocks): `runCli(['bootstrap', dir])` → a source-linked
  invocation with an explicit client, because the bare form now fails closed. Coverage was
  **extended**: the run additionally asserts `.specboot/local/` is ignored.
- `delivery-modes.test.js` (14 invocations) and `preflight.test.js` (6): gained `--yes`, because the
  D-X approval gate is now a stop rather than a notification. A run that provisions must approve the
  printed inventory.

**Coverage was net-added, not moved around.** `payload-assembly.test.js` gained two assertions the
suite never had — the assembled payload is byte-identical to canonical, and genuine drift in it
**fails** — replacing two that could only be reached through a packaged-snapshot bootstrap.

**The packaged-snapshot regression (4.21) was not relaxed to accommodate anything.** It was retired
whole, with its captured end state intact, and re-activating it is the deferred change's starting
point.

---

# GREEN — eighth revision (tasks 5.27, 5.26)

**Additive. Nothing above this line is modified.** Closes the correspondingly additive RED section at
the end of `installer-tdd-red-baseline.md`.

Date 2026-08-14 · host `Darwin 22.6.0`.

## 5.27 — what changed in `runDebootstrap()`

A **discrete verification pass, placed before the entry-processing loop**, mirroring
`10-debootstrap.md` step 2 and design **D-C**. Every entry carrying an
`intended-permanent-replacement` is checked before *any* entry is acted on.

The ordering is the whole fix, and it is not incidental. Checking inline, per entry, would already
have removed earlier entries by the time the unresolved one is reached — which is exactly what RED
failure **c** measured: the defective run removed `.claude/CLAUDE.md` as well as the sabotaged entry.
D-C's wording is "no entry … is removed **until** that replacement is verified", and a pre-pass is
the only shape that satisfies it.

Resolution uses `fs.realpathSync` rather than a presence check: **a dangling symlink exists and
resolves to nothing, so it is not a replacement.**

On an unresolved replacement the step now:

| Requirement (5.27) | Implementation |
|---|---|
| record **FAIL** | `m.debootstrap = { completedAt: null, revalidation: { filesystemChecks: 'FAIL' }, unresolvedReplacements, reason }` |
| **preserve the entry** | the entry-processing loop is never entered |
| **preserve durable evidence** | manifest and run log both untouched apart from the FAIL record |
| **report reconciliation** | each entry named with the replacement it is waiting on, plus why removal would be worse than refusing |
| **exit unsuccessfully** | `process.exit(1)` |

**No entry is dispositioned on the refusal path.** An entry left on disk must never read as
`removed`: a manifest that disagrees with the filesystem is worse than either outcome alone.

Entries whose replacements resolve keep their existing behavior — verified by the control test
below, which guards against over-correcting into a step that refuses everything.

## 5.27 — target test

```
$ node --test --test-concurrency=1 --test-reporter=tap test/debootstrap-replacement.test.js
# tests 6
# pass  6
# fail  0
```

All four previously-failing assertions now pass; the two that already passed still do.

## 5.26 — full suite, first invocation from a clean checkout

```
$ rm -rf bootstrap-payload
$ node --test --test-concurrency=1 --test-reporter=tap "test/"*.test.js
# tests      95
# pass       95
# fail        0
# skipped     0
# todo        0
```

| Suite | pass | fail |
|---|---|---|
| `bootstrap-subcommand.test.js` | 3 | 0 |
| `cold-start.test.js` | 10 | 0 |
| **`debootstrap-replacement.test.js`** | **6** | **0** |
| `delivery-modes.test.js` | 31 | 0 |
| `help-flag.test.js` | 4 | 0 |
| `ignore-provisioning.test.js` | 10 | 0 |
| `no-symlink-discovery.test.js` | 5 | 0 |
| `payload-assembly.test.js` | 6 | 0 |
| `preflight.test.js` | 5 | 0 |
| `provenance.test.js` | 6 | 0 |
| `refusals.test.js` | 9 | 0 |

**No pre-existing suite regressed.** The pre-pass is a no-op for any manifest whose entries carry no
replacement or whose replacements resolve, which is every fixture the other ten suites build.

## No test was weakened, deleted, or skipped

| Measure | Seventh revision | Eighth revision | Δ |
|---|---|---|---|
| active test files | 10 | **11** | +1 |
| `test(...)` blocks | 82 | **88** | +6 |
| `assert.*` calls | 247 | **273** | +26 |
| `.skip` / `.todo` / skipped | 0 | **0** | — |

Purely additive: one new file, six new blocks, twenty-six new assertions, nothing removed or
relaxed. The 4.30 retirements are unchanged — `test/deferred/` still holds 3 files, 15 blocks, and
49 assertions, and was not touched by this revision.

## Scope

`packages/specboot/bin/init.js` and `test/debootstrap-replacement.test.js` only. No planning
artifact, no historical report section, no phase file, and no `SKILL.md` was changed.
