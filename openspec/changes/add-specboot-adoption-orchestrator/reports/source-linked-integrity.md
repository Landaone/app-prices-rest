# Source-Linked Integrity Validation (tasks 13.8–13.11)

Date 2026-08-13. Host `Darwin 22.6.0`, zsh. Method: a fixture canonical source and a virgin Git
target, both outside the repository working tree; a full source-linked bootstrap → de-bootstrap
cycle; checksums taken before and after.

## 13.8 — the external source is unmodified by a full source-linked run — **PASS**

| Check | Result |
|---|---|
| Every file in the fixture canonical source checksummed before `ADOPT-00` and after `ADOPT-18` | **IDENTICAL**, file for file |
| Manifest entries naming the source or any path inside it | `[]` — none |

The second row is the one that matters. The guarantee does not rest on the step being careful: the
source is never a manifest entry, and the inventory is the only authority for removing anything, so
there is no operation in `ADOPT-18` that could reach it.

## 13.9 — the source-linked end state — **PASS**

| Check | Result |
|---|---|
| `.specboot/bootstrap/` created at any point | **never** — absent at every observation, not merely absent at the end |
| Copied guide, phase file, or skill body anywhere in the project | none |
| `.specboot/` contents | `adoption/` only |
| Payload obligation | `SKIPPED — source-linked mode` |
| Container obligation | `SKIPPED — source-linked mode` |
| `.specboot/adoption/BOOTSTRAP-MANIFEST.json` present after de-bootstrap | yes |
| Every entry at a terminal `cleanup-status` with a `final-disposition` | yes |
| Appended block byte-restored | **BYTE-RESTORED** (sha256 of the pre-existing file matches exactly) |

## 13.10 — the symlink-unavailable fallback — **PASS (policy-forced); probe-failure path PENDING EVIDENCE**

Forced through `--no-symlinks`, an operator affordance for hosts where symlinks are forbidden by
policy:

```text
symlinkDetermination: forced off by --no-symlinks
  .claude/skills/specboot-adopt -> pointer-file
  .claude/CLAUDE.md             -> real-file
```

The pointer file names the external canonical path and states why it is not a copy. A search of the
whole fallback run for `SKILL.md` or `SPECBOOT_ADOPTION_GUIDE.md` returns **none — no content copy**.

`symlinkDetermination` exists so a policy-forced fallback is never mistaken for a probe failure.
**A genuine probe failure was not exercised**: no host available here can fail the symlink probe, so
that path is `PENDING EVIDENCE` with that reason — the same treatment as the Windows rows under
task 13.2. It is never recorded as PASS.

## 13.11 — no source-linked discovery entry is staged or committed — **PARTIAL; one clause blocked on an artifact decision**

### Clause 1 — machine-specific discovery entries absent from every staged file list — **PASS**

The first run of this check **FAILED** and the failure was real: `git add -A` staged
`.claude/skills/specboot-adopt` (a symlink to an absolute external path), and the staged diff
carried the laboratory path three times. Two corrections followed.

1. **Machine-local entries are now excluded through `.git/info/exclude`, not `.gitignore`.**
   `.gitignore` is committed, so a rule written there would travel to every clone and would keep
   ignoring `.claude/skills/specboot-adopt` long after `ADOPT-13` creates the *permanent* canonical
   symlink at that same path. `.git/info/exclude` is itself machine-local and never committed —
   the correct lifetime for an exclusion covering a machine-local artifact. `ADOPT-18` removes the
   block.
2. **The appended instruction block no longer names an absolute path.** A client instruction file
   is exactly the kind of artifact that gets committed, so the block now points at
   `.specboot/adoption/BOOTSTRAP-MANIFEST.json` — where a machine-specific value belongs — instead
   of carrying the resolved source path itself.

After both corrections, the staged file list is:

```text
.claude/CLAUDE.md                              0 occurrences of the external path
.gitignore                                     0
.specboot/adoption/ADOPTION-RUN-LOG.md         0
.specboot/adoption/BOOTSTRAP-MANIFEST.json     1
```

No discovery entry is stageable. Clause 1 passes.

### Clause 2 — "the committed tree contains no absolute external path" — **BLOCKED**

One occurrence remains, and it is **required by design D-S**:

```json
"path": {
  "value": "<resolved source path>",
  "portability": "machine-specific-non-portable"
}
```

D-S and the proposal both required the durable manifest to record the resolved path as *execution
evidence, explicitly labelled machine-specific and non-portable*, and the kit manifest marks
`.specboot/adoption/BOOTSTRAP-MANIFEST.json` `committed: true`. Task 13.11's second clause requires
the committed tree to contain **no** absolute external path.

> **RESOLVED — superseded by design D-S option B.** The two requirements above could not both hold,
> and the conflict was resolved in favour of the clause, not the field: **the resolved absolute path
> is machine-local runtime state and is never committed.** The manifest `source` block now carries
> portable identity only; it defines no `path` property and `additionalProperties: false` rejects
> one, so the occurrence recorded above — `source.path.value` — is a field that **no longer exists**.
> Where a run needs the path it is kept only in ignored `.specboot/local/` state, which `ADOPT-18`
> removes.
>
> The block quoted above is **retained as the record of what was found**, not as a current
> requirement. Task 13.11's re-verification against the corrected artifacts supersedes this section.

**These cannot both hold.** Either the manifest records the path and the committed tree therefore
contains one, or the path is not recorded and D-S's provenance requirement is not met.

This is a planning-artifact conflict, not an implementation defect, so it is recorded here rather
than resolved unilaterally. The two coherent resolutions:

| Option | Effect |
|---|---|
| **A — narrow 13.11's second clause** to "no absolute external path outside the manifest's labelled `source.path` field" | keeps D-S intact; the labelled field is the single, deliberate, reviewable exception |
| **B — stop committing the resolved path** | satisfies 13.11 literally; D-S must then be amended, and resume on the same machine loses its convenience default |

Option A is the smaller change and preserves the property D-S exists for — provenance that survives
a session boundary. The decision is the user's; 13.11 stays open until it is made.

---

## 13.11 re-verification after design D-S option B — **PASS, both clauses**

Date 2026-08-14, after tasks 3.3, 5.13, 5.19 and 8.8 landed. The conflict recorded above is
resolved: design **D-S takes option B** — the resolved path is removed from the committed manifest
entirely and retained only in machine-local, git-ignored `.specboot/local/` state — so clause 2
stands exactly as written, with no exception carved for a labelled field.

Method: a fixture canonical source (a Git working tree) and a virgin Git target, both outside the
repository working tree; a source-linked bootstrap → resume → de-bootstrap cycle with a **real
checkpoint commit at each step** (`git add -A`, staged list inspected, then committed).

### Per-checkpoint staged file lists, and occurrences of the external source path in each

| Checkpoint | Staged files | Occurrences of the external path | Discovery entries staged | `.specboot/local/` staged |
|---|---|---|---|---|
| After `ADOPT-00` bootstrap | `.claude/CLAUDE.md`, `.gitignore`, `.specboot/adoption/ADOPTION-RUN-LOG.md`, `.specboot/adoption/BOOTSTRAP-MANIFEST.json` | 0, 0, 0, **0** | 0 | 0 |
| After resume | *(none — clean tree)* | — | 0 | 0 |
| After `ADOPT-18` de-bootstrap | `.claude/CLAUDE.md`, `.specboot/adoption/BOOTSTRAP-MANIFEST.json` | 0, **0** | 0 | 0 |

The manifest row is the one that changed. At the previous run it read `1`, and that single
occurrence was `source.path.value` — a field that no longer exists.

### Clause 1 — no source-linked discovery entry staged or committed — **PASS**

`.claude/skills/specboot-adopt` appears in no staged file list at any checkpoint; it stays excluded
through `.git/info/exclude`, which is itself machine-local and never committed. The appended
instruction block still names no absolute path.

### Clause 2 — no absolute external path in the committed tree — **PASS**

Every blob of every commit was scanned, not just the final tree:

```text
total committed occurrences of the external source path: 0
```

`BOOTSTRAP-MANIFEST.json` and `ADOPTION-RUN-LOG.md` are included in that scan and are both clean.

### Clause 3 — the machine-local store is ignored and never staged — **PASS**

```text
.specboot/local/                             -> IGNORED
.specboot/local/source-path                  -> IGNORED
.specboot/adoption/BOOTSTRAP-MANIFEST.json   -> not ignored (committed evidence)
.specboot/adoption/ADOPTION-RUN-LOG.md       -> not ignored (committed evidence)
```

The store held exactly one file, `source-path`, containing the resolved path and nothing else — no
checksum, no commit, no delivery mode. It appears in no staged file list at any checkpoint, and
`ADOPT-18` removed it (`store present after ADOPT-18: NO`) while the durable manifest survived
(`manifest present after ADOPT-18: YES`).

The narrow rule did its job in both directions: `.specboot/local/` is ignored, and
`.specboot/adoption/` is not. No bare `.specboot/` rule was written.
