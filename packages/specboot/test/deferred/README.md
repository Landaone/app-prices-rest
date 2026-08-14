# Deferred: packaged-snapshot delivery

These suites are **retired from the active test run, not deleted**.

`package.json` `scripts.test` runs `test/*.test.js`, which does not match this directory, so
nothing here executes today.

## Why

Packaged-snapshot delivery is deferred **in full** to `add-specboot-packaged-snapshot-delivery`
(design **D-W**). The CLI no longer exposes it: with no validated canonical source the run fails
closed with zero target-repository writes. Assertions that require the mode to exist therefore
cannot pass, and deleting them would destroy the record of what the mode did.

## What is here

| File | Was | Preserves |
|---|---|---|
| `packaged-snapshot-bootstrap.test.js` | task 4.3, in `test/bootstrap-subcommand.test.js` | the payload, manifest, symlink-safety, and idempotence assertions for the mode |
| `packaged-snapshot-regression.test.js` | task 4.21, top-level | the behavior-pinning baseline captured *before* source-linked mode was added |
| `fixtures-packaged-snapshot-baseline.json` | — | the captured end state that baseline compares against |

Task 4.4's default-invocation guarantee stayed active in `test/bootstrap-subcommand.test.js`: it is
mode-independent and still binding.

## Re-activating

The deferred change moves these back under `test/` and takes them as its starting point. Its scope
(D-W) is larger than making them pass again: entry-prompt distribution, read-only bootstrap
planning, explicit client selection, real client discovery entries, non-null payload identity,
verified resume, its own answer where symlinks are unavailable, and end-to-end cold-start evidence.
