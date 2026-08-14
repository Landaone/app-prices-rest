# Step 17 — Unit Test and Database State Verification

Date **2026-08-14** · host `Darwin 22.6.0` · branch `feature/add-specboot-adoption-orchestrator`

Supersedes `2026-08-13-step-17-unit-test-and-db-verification.md`, which reported on an installer
suite this revision changed. That report is retained as history; this one describes the code as it
now stands.

## 17.1 — Pre-change baseline

| | |
|---|---|
| Branch | `feature/add-specboot-adoption-orchestrator` |
| `git status --short` | tracked modifications to the guide, phase files, kit, installer, docs and template; untracked planning directory, kit, phase files 09–11, skill, and installer tests |
| Last known baseline | `2026-08-13-step-17-…` — Java `mvn -o test` PASS; npm suite superseded |

## 17.2 — Java suite (`mvn -o test`)

**Carried forward from the 2026-08-13 report**, on the evidence its own rule requires:

```
$ git status --short -- src/    →  0 entries
$ git diff --name-only -- src/  →  0 files
```

No `src/main` or `src/test` path changed in this revision. This change is repository tooling: the
only executable code it touches is `packages/specboot/bin/init.js` and its JavaScript tests. The
recorded Java result therefore still describes the code under test.

## 17.3 — npm suite (`packages/specboot/`) — **re-executed**

```
$ cd packages/specboot
$ rm -rf bootstrap-payload          # clean checkout: payload absent, per design D-O
$ node --test --test-concurrency=1 --test-reporter=tap "test/"*.test.js
# tests      89
# pass       89
# fail        0
# cancelled   0
# skipped     0
# todo        0
```

**First invocation, exit 0.** Per-suite:

| Suite | pass | fail |
|---|---|---|
| `bootstrap-subcommand.test.js` | 3 | 0 |
| `cold-start.test.js` | 10 | 0 |
| `delivery-modes.test.js` | 31 | 0 |
| `help-flag.test.js` | 4 | 0 |
| `ignore-provisioning.test.js` | 10 | 0 |
| `no-symlink-discovery.test.js` | 5 | 0 |
| `payload-assembly.test.js` | 6 | 0 |
| `preflight.test.js` | 5 | 0 |
| `provenance.test.js` | 6 | 0 |
| `refusals.test.js` | 9 | 0 |

Order-independence (design D-O) is recorded in `installer-tdd-green.md`: 89/89 on a first invocation
from a clean checkout, from an intentionally stale assembled payload, and on repeat. No scenario
needed a second run.

`test/deferred/` — 3 suites, 15 blocks, 49 assertions — is outside the `test/*.test.js` glob and did
not execute. It is preserved evidence for `add-specboot-packaged-snapshot-delivery`, not part of this
suite.

## 17.4 — Database state verification — **N/A, with justification**

Recorded rather than omitted:

| Indicator | Value |
|---|---|
| External database used by the suite | none — no container, no fixture database, no migration is executed |
| Persistence code touched by this change | none |
| `docs/data-model.md` touched | no |
| Pre/post database state | **N/A** |

This change is repository tooling. The only executable code it modifies is a Node CLI that writes
files into a target repository, and its tests run against throwaway filesystem fixtures created
outside the working tree. There is no persistence surface for a pre/post comparison to describe.

## 17.5 / 17.6 — Completion

Both suites pass, this report exists on disk, and the npm result was re-executed rather than carried
forward. Group 17 is complete.
