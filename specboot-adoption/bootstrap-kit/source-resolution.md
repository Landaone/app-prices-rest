# Source Resolution Recipe

How an adoption finds, validates, and records the canonical SpecBoot source, and why a run without
one refuses rather than falling back. This is a **recipe** — the mechanics. The rules it serves are canonical in
[`../09-bootstrap.md`](../09-bootstrap.md) (`ADOPT-00`) and are not restated here as a second
authority.

## The source location is runtime input

The operator supplies the canonical source path **at run time**. No canonical artifact — not this
recipe, not the kit manifest, not a phase file, not the schema, not the entry prompt — records a
machine-specific path, and **no committed artifact records the resolved path either**: not the
manifest, not the run log, not the handoff prompt. A resolved path exists only as machine-local,
git-ignored state under `.specboot/local/`, which `ADOPT-18` removes. Identity is carried entirely
by the recorded checksums.

A kit that hard-codes a source is exactly as broken as one that hard-codes a client.

## Validation: three artifacts, all required

A supplied path is accepted as a canonical SpecBoot source only when **all three** are present:

| Artifact | Path within the source | Why it is required |
|---|---|---|
| Adoption guide | `SPECBOOT_ADOPTION_GUIDE.md` | the contract every step is judged against |
| Phase directory | `specboot-adoption/` | the step definitions the guide indexes |
| Orchestration skill | `ai-specs/skills/specboot-adopt/SKILL.md` | the procedure the initial session reads directly |

The skill artifact is validated as a **readable `SKILL.md` file**, not merely as a present
directory. The initial session obtains its procedure by reading that file at a source-relative
path, so a `specboot-adopt/` directory with no readable `SKILL.md` cannot satisfy the adoption and
is rejected as an invalid source.

### Ordering: validation precedes loading and writing

Validation runs **before any orchestration instruction is loaded** and **before the first
project-local write**. Both orderings matter, and for different reasons:

- *Before loading* — the instructions the run will follow come from the source. Loading them before
  proving the source is complete means executing unvalidated instructions.
- *Before writing* — an incomplete source must be **rejected**, not diagnosed after artifacts
  already exist. A run that creates a manifest and then reports the problem has already failed:
  there is now state to reconcile that should never have existed.

A failed validation stops with **zero target-repository writes**. Nothing to clean up, because
nothing was created.

## A validated source is a precondition, not a branch

There is **one** delivery mode. A validated source is what the adoption runs on; its absence is not
an alternative route.

| Condition | Outcome |
|---|---|
| A local canonical source is supplied **and validates** | **source-linked** — nothing canonical is copied; discovery entries point at the external source |
| A source is supplied and **fails** validation | **fail closed** — rejected before the first write; the operator supplies a complete source |
| **No** source is supplied | **fail closed** — the run stops and reports that a validated canonical source is required |

Source-linked is the delivered mode because a copied guide is a fork the moment the canonical
source changes, and a project holding a copy will eventually edit it.

**Failing closed is deliberate, and it is stronger than a fallback.** Packaged-snapshot delivery is
**deferred in full** to `add-specboot-packaged-snapshot-delivery`; until it returns with its own
distribution story, read-only planning, client selection, real discovery entries, and cold-start
evidence, no run may enter it. A mode that has never been driven from a virgin repository to a
discovered skill is not a safety net — it is a path that fails *after* writing, which is the one
failure shape the preflight exists to prevent.

## Provenance capture

Record on the run-level `source` block of the durable manifest
([`BOOTSTRAP-MANIFEST.schema.json`](BOOTSTRAP-MANIFEST.schema.json)):

- `delivery-mode` — `source-linked`. (`packaged-snapshot` remains readable so an earlier run's
  manifest is read as history, but no current run writes it.)
- `local-path-resolution` — the fixed statement that the local source path is resolved per
  machine and is **not stored in the committed manifest**. There is no field for a resolved
  absolute path, and `additionalProperties: false` rejects one
- `guide-checksum` — checksum of `SPECBOOT_ADOPTION_GUIDE.md`
- `skill-checksum` — checksum of `ai-specs/skills/specboot-adopt/SKILL.md`
- `git` — the observed `worktree` state, plus one of **three** dispositions below

### Git provenance has three dispositions, not two

| Source state | `worktree` | `status` | Also recorded |
|---|---|---|---|
| Not a Git working tree | `not-a-repository` | `unavailable` | `reason` |
| Git working tree, **clean** | `clean` | `recorded` | `commit` |
| Git working tree, **uncommitted changes** | `dirty` | `unavailable` | `reason`, and optionally `observed-head` as labelled context |

**A dirty working tree has content that no commit identifies.** HEAD names what was committed; the
run read something else. Writing that commit into the identity field produces provenance that is
*precisely wrong* — worse than absent, because a later reader can resolve the commit, diff nothing,
and conclude the source matched. So the dirty case records `unavailable` with its reason. Where the
observed HEAD is retained at all it goes in `observed-head`, explicitly labelled as not identifying
the source content, and never in `commit`; the schema enforces this rather than leaving it to
discipline.

**The Git record is never inferred, invented, or omitted.** `unavailable` is a representable value,
not an absent field: leaving a gap invites a later reader — human or agent — to fill it with
something plausible.

**Identity survives all three cases**, because identity is the checksums and they are computed over
the bytes actually read. That is what makes the dirty case a provenance-honesty problem rather than
an identity problem: nothing about drift detection depends on Git.

**The external source is never a manifest entry.** That is what puts it out of reach of every
inventory-driven operation, including cleanup. The guarantee rests on the inventory rule, not on a
promise to be careful.

**The resolved absolute path is never committed** (design D-S, option B). The manifest is committed
by design, so a path recorded there would travel into every clone of the adopting repository — a
label describing a value as non-portable does not make committing it portable. Where a run needs
the path afterwards, keep it **only** in machine-local, git-ignored state under `.specboot/local/`:
a convenience pointer holding the path and nothing else — no checksum, no commit, no delivery mode
— provisioned with an ignore rule by the same per-path probe as the other transient paths, never
read as evidence of identity, never an error when absent, and removed by `ADOPT-18`. There is
exactly one provenance mechanism, and it is the committed `source` block.

## Identity is the checksums, not the path

On resume, recompute both checksums against the source the run is given and compare them with the
recorded values.

| Situation | Outcome |
|---|---|
| Checksums match | resume normally |
| Either checksum differs | **drift** — stop for human reconciliation; do not continue against changed instructions |
| No local path is known here (different machine, or the store was deleted) | obtain one — from `.specboot/local/` where it exists on this machine, otherwise by asking the operator or rediscovering it — and accept it only when the checksums match, plus the recorded commit where one exists |

**Obtaining the local path is a step of resume, not a precondition of it.** No path is recorded
in the committed manifest, so none can be required to exist; an absent machine-local store is
the ordinary case on any machine but the one that ran `ADOPT-00`, and is never a failure.
Reading the store is a convenience, never a shortcut: the checksums are recomputed and compared
on **every** resume, including one that reused a stored path.

A running adoption does not consume changes made to the canonical source after its recorded
checksums. Such changes become input to a later adoption, or to a re-baselining the human
explicitly approves and the run log records.

## Refusals this recipe owns

Two of the run's four fail-closed refusals belong here, and both leave the target repository
byte-for-byte unchanged:

| Refusal | Reported |
|---|---|
| No canonical source supplied | that a validated canonical source is required, and what the three required artifacts are |
| Supplied source fails the three-artifact validation | which artifact or artifacts are missing, and that nothing was written |

The other two — no client selected, and an unsupported client — belong to
[`client-autodiscovery.md`](client-autodiscovery.md) and the client recipes; the no-symlink refusal
belongs to [`discovery/symlink-fallback.md`](discovery/symlink-fallback.md). All four are clean
stops, never degraded successes, and none is resolved by the run choosing on the operator's behalf.

## The source is read-only for the whole adoption

No step creates, modifies, or deletes anything inside the resolved source — including an
improvement proposal. Findings are recorded in the **project's** run log; accepted improvements
reach the canonical source later, through the governed follow-up workflow, and are never consumed
by the run that raised them.

A step that wrote to the source is **FAIL**.
