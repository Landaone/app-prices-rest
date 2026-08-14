# Task 13.4 — `ADOPT-18` Single-Copy Assertion

- Date: 2026-08-12
- Method: bootstrap → de-bootstrap in a throwaway git fixture, plus a structural check of the
  installed end state and of this repository as canonical source.

## Result: PASS

### 1. De-bootstrap end state (fixture)

`init.js bootstrap .` produced 4 manifest entries, all `ownership: bootstrap-created`, all under
`.specboot/bootstrap/`, and **none** carrying an `intended-permanent-replacement` — consistent with
the rule that bootstrap never occupies a path a later step must create as a symlink.

| Acceptance criterion (`10-debootstrap.md`) | Result |
|---|---|
| `.specboot/bootstrap/` is absent | **PASS** |
| durable `.specboot/adoption/BOOTSTRAP-MANIFEST.json` retained | **PASS** |
| every entry at a terminal `cleanup-status` (none `pending`) | **PASS** (4/4) |
| every `intended-permanent-replacement` resolves | **PASS** (none declared) |
| manifest not git-ignored | **PASS** (`git check-ignore` exit 1) |

### 2. Single-copy, installed end state

A default install (`init.js <target>`) was walked, hashing every real file and recording every
symlink:

- real content files: **30**
- client-visible symlinks: **26**
- **content duplicated at more than one path (same bytes): 0**
- canonical content under `ai-specs/`: 21
- real files under client directories: 1 — `.cursor/rules/use-base-rules.mdc`

That single real file is **not** a violation: it is Cursor-native content with no canonical
counterpart, confirmed unique by hash. The assertion is that no canonical artifact exists twice as
content, and it holds.

### 3. Single-copy, this repository as canonical source

Walking `ai-specs/`, `.claude/`, `.kiro/`: **62 real content files, 30 client symlinks, 0
duplicated canonical content.** Every client-visible instance is a symlink to `ai-specs/`.

## One observation worth recording

A cleanup driven **strictly** by manifest entries alone leaves `.specboot/bootstrap/` present but
empty (an orphaned `skills/` subdirectory), which fails the `.specboot/bootstrap/ is absent`
acceptance criterion. The manifest enumerates payload *entries*, not the payload *directory*.

This is not a contradiction in the guide — `10-debootstrap.md` step 5 separately and explicitly
instructs "Remove the transient payload directory `.specboot/bootstrap/` in full", which is a named
instruction rather than the path-pattern guesswork the "act only on manifest entries" rule forbids.
Executing step 5 as written produces the required end state, as recorded above.

It is nonetheless a place where a careful implementer can produce a failing end state while
believing they followed the inventory rule, so it is raised as an **improvement proposal** (never a
mid-run guide edit): `10-debootstrap.md` step 5 and the "act only on manifest entries" rule in
`references/bootstrap-and-debootstrap.md` should state explicitly that the transient directory
itself is removed by name after its entries are processed. Routed to the D-K batch at task 21.10.

---

## Re-verification against the corrected procedure (tasks 13.4 + 13.6)

- Date: 2026-08-13
- Procedure under test: `10-debootstrap.md` step 5 as revised by task 6.2

Single-copy evidence above is **retained unchanged** — `SKILL.md` did not change, no canonical
artifact moved, and only the container half was re-run.

### 13.4 — positive case: PASS

Fresh git fixture, `init.js bootstrap .`, 4 manifest entries, 23 payload files.

| Check | Result |
|---|---|
| every entry reached a terminal `cleanup-status` | **true** (4/4) |
| unrecorded **files** beneath the container after processing | **0** |
| empty directory skeletons left by recorded removals | 2 (`.specboot/bootstrap`, `…/skills`) |
| container removed by exact name, after the emptiness check | **yes** |
| `.specboot/bootstrap/` absent — removed, not merely emptied | **true** |
| `.specboot/adoption/BOOTSTRAP-MANIFEST.json` present | **true** |
| entries preserved in the durable manifest | **4** |

### 13.6 — refusal case: PASS

Same fixture, every entry dispositioned, then one unrecorded file (`operator-notes.md`) placed
inside the container.

| Check | Result |
|---|---|
| unrecorded file detected and **named** | `.specboot/bootstrap/operator-notes.md` |
| verdict | **FAIL — stop for reconciliation** |
| container removed | **no (refused)** |
| unrecorded file deleted | **no (refused)** |
| unrecorded file contents intact | **true** |
| durable manifest untouched | **true** |
| recursive deletion occurred | **no** |

This is the check that separates a correct implementation from an unconditional
`rm -rf .specboot/bootstrap`, which would pass 13.4 while destroying content the manifest never
described.

## A defect this validation found in its own step text

The first 13.4 run **failed**, and the fault was in the wording task 6.2 had just written: it
defined the emptiness precondition as "no files, no directories, no residue". Removing the recorded
entry `.specboot/bootstrap/skills/specboot-adopt/` necessarily leaves its parent `skills/` behind —
the manifest enumerates entries, never their intermediate parents — so under that phrasing the
container could never be verified empty and the step was **unsatisfiable**.

The requirement's own wording was already correct ("no unrecorded or unresolved **content**"): an
empty directory is not content. Design and specification were therefore left unchanged, and only
the phase file and the skill reference were corrected, to define the precondition as **no files
anywhere beneath the container**, with empty skeletons explicitly named as part of the container.

The FAIL condition is unchanged in substance: a single unrecorded **file** stops the step, which is
exactly what 13.6 exercises.
