# Source Resolution, Provenance, and Drift

*Loaded on demand. This explains how the orchestrator **drives** the canonical rules; the rules
themselves are defined in `09-bootstrap.md` (`ADOPT-00`) and
`specboot-adoption/bootstrap-kit/source-resolution.md`. Nothing here is a second authority — where
this file and the contract differ, the contract wins and this file is corrected.*

## The cold start you are actually in

When an adoption begins, the target repository has no SpecBoot files, no OpenSpec, no `/opsx:*`
commands, no discoverable `specboot-adopt` skill, and no `.specboot/`. Every one of those is an
output of the adoption.

So: **you were not discovered — you were read.** The initial session obtains this skill by reading
the validated canonical `SKILL.md` directly, at a source-relative path. Record that as a direct
read. It is not native skill discovery, it is not discovery evidence, and it does not satisfy the
fresh-session probe.

**Use no OpenSpec command and no `/opsx:*` command** until `ADOPT-02` has completed and its
availability check has explicitly passed. Reaching for OpenSpec earlier means depending on your own
output; its absence before then is expected, not a blocker.

## Ask, validate, then load — in that order

1. Ask for the canonical source path. There is no delivery-mode question — there is one mode.
2. Validate three artifacts inside it: `SPECBOOT_ADOPTION_GUIDE.md`, `specboot-adoption/`, and a
   **readable `ai-specs/skills/specboot-adopt/SKILL.md`** — the file, not just the directory.
3. Only then load orchestration instructions. Only then write anything, and only after the
   exact-mutations approval gate.

A failed validation stops with **zero target-repository writes**. Do not create a manifest and then
report the problem: that leaves state to reconcile that should never have existed.

## A validated source is a precondition, not a branch

| Supplied source | Outcome |
|---|---|
| present and valid | **source-linked** — the delivered mode |
| supplied and invalid | **fail closed** — stop, report which artifact was missing, write nothing |
| none supplied | **fail closed** — stop, report that a validated canonical source is required |

Packaged-snapshot delivery is deferred to `add-specboot-packaged-snapshot-delivery`. Do not enter
it, do not improvise it, and do not treat a missing source as selecting it.

## Refuse before you write — five times

Each leaves the target repository **byte-for-byte unchanged**. A refusal is a clean stop, never a
degraded success, and none is resolved by you choosing on the operator's behalf.

| Refusal | Report |
|---|---|
| no canonical source | that one is required, and the three artifacts it must contain |
| source fails validation | which artifact is missing or unreadable |
| no client selected | that an explicit human selection is required — never a placeholder, never inferred from a directory on disk |
| selected client has no recipe | the unsupported client **and** the ones that are supported; never substitute the nearest match |
| symlinks unavailable and the client cannot discover without one | the client, the mechanism its recipe requires, and what was attempted |

All five precede the preflight: there is nothing to preflight until you know the source and whose
recipe applies.

## Preflight before the first write

Resolve **every** target path — discovery entries, instruction-file blocks, `.specboot/adoption/`,
the ignore rules, the machine-local store — classify each as absent, `pre-existing-untouched`, or
colliding, and report **all** collisions together. Present the exact mutation inventory (path,
operation, mechanism, reversibility) at the gate, perform exactly that, and restore the
pre-provisioning state on any failure. A path needing a different mechanism than the one approved is
a **new gate**, not an adjustment.

## Provenance you must record, and the one you must not invent

Write the run-level `source` block: `delivery-mode`, `local-path-resolution` (the fixed statement),
`guide-checksum`, `skill-checksum`, and `git`. **There is no `path` field** — the resolved path is
never committed, and the schema rejects one.

`git` carries **three** dispositions, never two. Read the working-tree state *before* deciding
anything about HEAD:

| Source state | `worktree` | `status` | Also record |
|---|---|---|---|
| not a Git working tree | `not-a-repository` | `unavailable` | the reason |
| Git working tree, **clean** | `clean` | `recorded` | the commit |
| Git working tree, **uncommitted changes** | `dirty` | `unavailable` | the reason; optionally `observed-head` as labelled context |

A dirty tree has content no commit identifies: HEAD names what was committed, and you read something
else. Writing it into the identity field is *precisely wrong* — worse than absent, because a reader
can resolve it, diff nothing, and conclude the source matched. Never infer a commit, never invent
one, never leave the field out. **The checksums stay correct in all three cases**, because they are
computed over the bytes you actually read.

## Drift: what it is, and what you do

Identity is the **checksums**, never the path.

| On resume | Do |
|---|---|
| checksums match | continue |
| a checksum differs | **stop for human reconciliation**; report which artifact drifted |
| recorded path missing (different machine) | ask for a new local source; accept only on matching checksums, plus the recorded commit where one exists |

A recorded path that does not exist is **not** drift and **not** a failure. Treating it as one makes
a run resumable on exactly one machine.

Never re-baseline on your own initiative. A human approves it, and the run log records the decision
and the new checksums.

## The source is read-only, and improvements do not go there

No step creates, modifies, or deletes anything inside the resolved source — including an
improvement proposal you are confident about. Findings go in the **project's** run log. Accepted
improvements reach the canonical source later, through the governed follow-up workflow, and are
never consumed by the run that raised them.

A step that wrote to the source is **FAIL**.

## Where your session ends

Once the temporary discovery entries and the durable state exist, **stop and hand off**. Generate
the exact fresh-session prompt; do not continue into the adoption steps. What you just provisioned
is client discovery, and discovery can only be evidenced by a session that started after it
existed. Native skill discovery is attempted only there.

Never simulate, assume, or claim a fresh session you did not observe.
