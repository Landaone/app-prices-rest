# `ADOPT-18` Replacement-Before-Removal Refusal — Verification (task 13.12)

Date **2026-08-14** · host `Darwin 22.6.0` · executed against the **real** `debootstrap` command.

This is the negative half of task 13.4's single-copy assertion. 13.4 proves the step cleans up
correctly; this proves it **refuses** correctly — and that the refusal leaves recoverable state
rather than a dead end. Neither 13.4 nor 13.6's container-refusal case was re-run: their evidence is
unaffected by this correction.

## Method

Fixture bootstrapped normally (source-linked, Claude, Git-initialised), then **exactly one** entry —
`.claude/skills/specboot-adopt` — given an `intended-permanent-replacement` of
`docs/base-standards.md`, which does not exist. Every other entry untouched, so a failure cannot be
mistaken for a whole-run abort.

## Refusal half — **PASS**

| Check | Result |
|---|---|
| exit code | **1** (non-zero) |
| transient entry still present | **YES** — still a symlink |
| transient entry still resolves | **YES** — a surviving but broken entry is not a survival |
| sibling `.claude/CLAUDE.md` | **PRESENT** — this is the one the defect used to delete |
| durable manifest present | **YES** |
| adoption run log present | **YES** |
| that entry's `cleanup-status` | **`pending`** — not `removed`, and no successful `final-disposition` |
| report names the entry | yes |
| report names the replacement it waited on | yes (`docs/base-standards.md`) |
| report stops for reconciliation | yes |
| unrelated paths removed | **none** — 3 top-level entries remain, as before the run |

The `cleanup-status: pending` result is the load-bearing one. An entry left on disk that reads
`removed` is worse than either outcome alone, because the manifest then disagrees with the
filesystem and a later reader trusts the manifest.

## Resume half — **PASS**

The refusal must leave state a human can repair and continue from, not a dead end. Repairing the
replacement and re-running, with no other intervention:

| Check | Result |
|---|---|
| exit code | **0** |
| that entry's `cleanup-status` | **`removed`** — terminal |
| entry removed from disk | **YES** |
| durable manifest still present | **YES** |
| every entry terminal | **True** (2 of 2) |

The previously refused entry reached a terminal disposition on the retry. Nothing had to be undone
first, because the refusal removed nothing.

## What this closes

The requirement *De-bootstrap reconciles against the committed manifest* and its scenario *Permanent
replacement is missing* had a written rule in `10-debootstrap.md` step 2 and design **D-C**, and no
executable check behind it. `runDebootstrap()` contained zero references to
`intended-permanent-replacement`. That gap is now covered by
`test/debootstrap-replacement.test.js` (6 blocks) and by this end-to-end verification.
