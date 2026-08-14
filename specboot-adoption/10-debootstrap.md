# Phase 10 — De-bootstrap and Reconcile Client Artifacts (Mandatory)

Read [`00-conventions.md`](00-conventions.md) first.

Step: `ADOPT-18`. New in this phase file; it does not renumber any existing step.

> **This step is its own checkpoint.** `ADOPT-17` is the final checkpoint *of the adoption itself*,
> not the last checkpoint of the workflow. `ADOPT-18` commits the updated manifest, so it invokes
> the checkpoint protocol in [`00-conventions.md`](00-conventions.md) exactly like any other
> independently validated step.

---

## `ADOPT-18` — De-bootstrap and Reconcile Client Artifacts

**Condition:** always when `.specboot/adoption/BOOTSTRAP-MANIFEST.json` exists. When it does not,
record `SKIPPED — no bootstrap performed` and go to `ADOPT-19`. Repositories adopted before
`ADOPT-00` existed take that path, and it is a clean no-op.

**Purpose:** Remove the temporary discovery entries and the machine-local source-path store, remove
every artifact for a client that was not selected or was never verified, and **update** the durable
manifest with what actually happened to each entry — without destroying the record of what the
bootstrap did.

**This procedure and the executable behavior are one thing.** Every clause below holds in both, and
four rules bind them together: **replacement before removal**; **terminal dispositions written
back**; **refusal over guessing**; and **resumability**. A written procedure that says one thing
while the implementation does another is the defect this step is most exposed to, because nobody
diffs a phase file against a program.

**Preconditions:** `ADOPT-17` = PASS. The permanent adoption is committed and working.

**Action:** structured written procedure. It acts **strictly on the manifest inventory**, never by
path pattern and never by guesswork. Guessing is what makes a cleanup step dangerous; the inventory
is what makes this one auditable.

**Read the delivery mode first — it decides which obligations exist at all.** The manifest's
run-level `source` block records it. Adoption delivers **source-linked** and nothing else, so that
is what a current manifest records. A manifest produced by an earlier run may record
`packaged-snapshot`; it is read as **history for the deferred mode** and is not re-interpreted, and
absence of the block is not drift.

| Obligation | Disposition |
|---|---|
| Project-local discovery entries | removed, or the file they were appended to **byte-restored** |
| Transient payload (step 5 content) | **`SKIPPED — source-linked mode`** — none was ever created |
| Payload container `.specboot/bootstrap/` (step 5 container act) | **`SKIPPED — source-linked mode`** — it was never created |
| Machine-local source-path store `.specboot/local/` (step 5b) | **removed** — project-local temporary state |
| External canonical source | **untouched, byte-identical** |
| Durable `.specboot/adoption/` | **preserved**, updated, never deleted |

`SKIPPED — source-linked mode` is written explicitly on both obligations. It is never left blank,
and a blank is never read as PASS.

**A run that failed closed created nothing**, so this step has nothing to reconcile: the repository
it would clean up is one that was never bootstrapped, and it takes the
`SKIPPED — no bootstrap performed` path.

**The external canonical source is read-only for the whole adoption.** No step creates, modifies,
or deletes anything inside it — including this one, and including for an improvement proposal. A
step that wrote to it is **FAIL**.

**Why it cannot be reached from here.** It is never a manifest entry. Since this step's only
authority for removing anything is the inventory, there is no operation in it that could touch the
source — the guarantee rests on that rule, not on a separate promise to be careful.

1. **Read** `.specboot/adoption/BOOTSTRAP-MANIFEST.json` and build the disposition plan entry by
   entry.

2. **Verify the permanent replacement first.** For every entry carrying an
   `intended-permanent-replacement`, confirm that replacement **exists and resolves** *before*
   removing the transient entry. Where the permanent adoption should have created it and did not,
   create it now.
   **Removing a bootstrap entry whose replacement is missing is FAIL, not cleanup.**

3. **Act per entry, by `mode`:**

   | `mode` | Action |
   |---|---|
   | `symlink` | unlink |
   | `copy` | remove the copied directory |
   | `appended-block` | remove **only** the delimited block, leaving the rest of the file unchanged |
   | `real-file` | remove, or **convert** to the canonical symlink where an `intended-permanent-replacement` names one |

   There is no `pointer-file` mode: a real file naming an external path is never a discovery entry,
   so the manifest schema cannot record one and this step never encounters one.

   These are the **only** entries that exist, and processing them is the whole of the removal work.
   A `symlink` entry names an absolute external path: removing the entry unlinks it and **never
   follows it**.

   Entries with `ownership: pre-existing-untouched` are **never touched**. That field is the whole
   reason this step cannot damage a file the repository already had.

4. **Convert** any bootstrap-created root instruction file (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`,
   `codex.md`) into the canonical relative symlink to `docs/base-standards.md`, matching
   `ADOPT-03`'s root-instruction rule and the installer's own behaviour.

5. **The transient payload container** `.specboot/bootstrap/`.

   **This sub-step does not run.** No payload and no container is ever created, so there is nothing
   to remove: record both the payload and container obligations as `SKIPPED — source-linked mode`
   and continue at step 5b. Recording them as PASS would claim a cleanup that never happened, and
   leaving them blank would be indistinguishable from an omission.

   The container procedure below is **retained deliberately**, and governs the deferred
   packaged-snapshot mode. It is not exercised by a source-linked run, and it is kept rather than
   deleted because the reasoning in it — why a verified-empty container may be removed by name when
   pattern-based cleanup may not — is what the deferred change inherits.

   Steps 1-4 are the only authority for removing *content*: an entry is removed because the
   manifest records it, never because of where it sits. The manifest enumerates payload **entries**
   and never the container that holds them, so processing every entry leaves `.specboot/bootstrap/`
   present but empty — which fails this step's own `.specboot/bootstrap/ is absent` criterion. The
   container is therefore removed **by name**, under these conditions, in this order:

   1. Every manifest entry has reached a **terminal** `cleanup-status` (`removed`, `converted`, or
      `retained-with-reason`) and a `final-disposition`. An entry still at `pending` blocks this
      sub-step.
   2. `.specboot/bootstrap/` is **verified to hold no content** — no files anywhere beneath it,
      including none left by a `retained-with-reason` entry.

      *Empty directories are not content.* Removing a recorded entry such as
      `.specboot/bootstrap/skills/specboot-adopt/` necessarily leaves its parent `skills/` behind,
      because the manifest enumerates entries and never their intermediate parents. Those empty
      skeletons are part of the container and go with it. The check that matters is **files**: a
      single file beneath the container that no entry describes is the failure this sub-step exists
      to catch.
   3. Only then, remove the empty container by its exact path.

   **A non-empty container is FAIL.** Anything still inside after the manifest is fully processed is
   by definition unrecorded, which is exactly the pre-existing content `ownership` exists to
   protect. Stop and reconcile: identify what the residue is, why the manifest never described it,
   and whether it predates the bootstrap. **Never recurse into the container and never delete what
   the manifest does not describe** — that is the pattern-based cleanup this step exists to avoid,
   and it cannot tell a bootstrap-created path from one the repository already had.

   Removing a **verified-empty** directory as the last act is not pattern-based cleanup: there is
   nothing left to misidentify. `.specboot/adoption/` is a sibling and is **never** in scope for
   this removal — see step 8, which commits it.

**Step 5b — remove the machine-local source-path store** `.specboot/local/`, when one exists. It is
**project-local temporary state, not provenance**: git-ignored, machine-specific, and holding the
resolved source path and nothing else — no checksum, no commit, no delivery mode. It goes for the
same reason the temporary discovery entries do, and it is removed **by name**, exactly like the
payload container.

| Path | Disposition |
|---|---|
| `.specboot/local/` | **removed** |
| `.specboot/adoption/BOOTSTRAP-MANIFEST.json` | **preserved and committed** — the one provenance mechanism |
| `.specboot/adoption/ADOPTION-RUN-LOG.md` | **preserved and committed** |
| The external canonical source the store pointed at | **never touched** — removing a pointer never follows what it named |

Removing the store destroys no evidence, because identity was never in it: the committed `source`
block carries the portable identity, and an absent store is the ordinary state of every machine that
did not run `ADOPT-00`. An absent store is therefore never a failure here either — record it as
already absent and continue.

*It is lettered, not renumbered.* `ADOPT-18`'s step numbers are referenced elsewhere in this
contract; adding a step in the middle would silently move `5`, `6`, `7` and `8` underneath those
references.

6. **Remove artifacts for clients that were not selected at `ADOPT-02`**, and for any client left
   `unavailable` or `PENDING EVIDENCE` by its verification gate — an unproven Codex `.agents/` entry
   is removed exactly like an unselected client's adapter. A client is not supported because a file
   exists for it.

7. **Re-validate.** Re-run the `ADOPT-14` filesystem checks and one `ADOPT-15` fresh-session
   discovery check per selected client, to prove nothing still needed was removed. The
   fresh-session check is a stop-and-hand-off, never simulated.

8. **Write back** each entry's `cleanup-status` and `final-disposition`, plus the re-validation
   results, and commit the updated manifest as part of this checkpoint.

   **Dispositions are written back as they are reached**, not batched at the end. That is what makes
   a refused run resumable: the committed manifest already names which entries are terminal and
   which are still `pending`, so another operator or session continues from the record instead of
   re-deriving it.

### The two refusals, and what they leave behind

This step **refuses rather than guesses**. Two conditions stop it, and neither is resolved by the
step making a choice on the operator's behalf:

| Refusal | Condition | What the step does |
|---|---|---|
| **Unresolved replacement** | an entry's `intended-permanent-replacement` is missing or does not resolve, and the permanent adoption cannot supply it | record **FAIL**, **leave that transient entry in place**, and stop for human reconciliation |
| **Unrecorded content in scope for removal** | the manifest has been fully processed and content remains that no entry describes | record **FAIL**, remove **neither** the container nor the unrecorded content, name the residue, and stop for human reconciliation |

A removal that outruns its replacement leaves the repository worse than not running this step at
all: `ADOPT-13`'s skip-on-exist rule then makes the gap permanent, and the only trace is a *skipped*
line. Deleting unrecorded content is the pattern-based cleanup the inventory rule exists to prevent
— it cannot tell a bootstrap-created path from one the repository already had.

**A refusal is a clean stop, not a partial success.** Entries already dispositioned keep their
terminal values; entries not reached stay `pending`; the durable manifest and run log are
**preserved** either way; and the external canonical source is untouched, because it is not an entry
and no operation here can reach it.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before any removal. Deletion is a high-risk
operation and always requires explicit approval — see
[`19-permissions-policy.md`](19-permissions-policy.md). The approval names the exact entries to be
removed, converted, or retained.

**Validation:** acceptance criteria, all required:

- Every manifest entry carries a **terminal** `cleanup-status` (`removed`, `converted`, or
  `retained-with-reason`) and a `final-disposition`. An entry left at `pending` is **FAIL**, not a
  partial PASS.
- **A run that refused at `ADOPT-00`** — no validated source, no client selected, an unknown client,
  or a selected client that cannot discover the external skill without symlinks — wrote nothing, so
  there is no manifest and this step records `SKIPPED — no bootstrap performed`. That target
  repository is **byte-for-byte unchanged**, and a de-bootstrap that found anything to remove there
  would mean the refusal leaked.
- `.specboot/bootstrap/` was **never created at any point in the run**, and the payload and
  container obligations both read `SKIPPED — source-linked mode` as an explicit recorded outcome —
  never left blank, and a blank never read as PASS.
- The external canonical source is **byte-identical** to its pre-run state, file for file, and no
  manifest entry describes the source or any path inside it.
- Every file a delimited block was appended to is **byte-restored**, not merely trimmed.
- The machine-local `.specboot/local/` store is **absent**, while
  `.specboot/adoption/BOOTSTRAP-MANIFEST.json` and the adoption run log are **preserved** and the
  external canonical source the store named is untouched. A run that removed the store but not the
  discovery entries, or that removed durable state alongside it, is **FAIL**.
- **Where the step refused**, it left the correct state: an unresolved replacement left its transient
  entry in place; unrecorded content and its container were both left alone with the residue named;
  entries already dispositioned kept their terminal values; and the durable manifest and run log
  were preserved so another session can resume. A refusal that removed anything is **FAIL**.
- `.specboot/adoption/` is present, committed, and updated.
- Every `intended-permanent-replacement` exists and resolves.
- `find -L <adapter paths> -type l` returns empty — any result is FAIL.
- Every root instruction symlink resolves to `docs/base-standards.md`.
- No adapter exists for an unselected or unverified client.
- `ADOPT-14` and `ADOPT-15` re-validate PASS.
- Every canonical artifact exists exactly **once** as content; all client-visible instances are
  symlinks, or are recorded copies carrying their reason.

**Evidence to record:** the **delivery mode** read from the manifest and the recorded value of both
obligations; **any refusal reached**, with its condition, the entry or residue that triggered it,
and the confirmation of what was left in place; the disposition of the machine-local `.specboot/local/` store (removed, or
absent already) alongside the confirmation that the durable state was preserved; the pre-cleanup
entry count by `ownership` and `mode`; the replacement
verification result per entry; what was removed, converted, or retained and why; the re-validation
outcomes including the verbatim fresh-session result; the broken-symlink scan output; and the
approval.

**On failure:** Form A, inline. Restore the affected entries from the manifest before retrying —
the manifest records `source`, `mode`, and `checksum` for exactly this purpose. Because it is
committed, a failed `ADOPT-18` is resumable by a different operator or session. Do not retry by
re-running the whole step blindly: re-read the manifest and act only on entries still at `pending`.

---

## After this step

Go to [`11-e2e-pilot-and-pr-gate.md`](11-e2e-pilot-and-pr-gate.md) and continue at `ADOPT-19`.

The orchestration skill is itself a bootstrap artifact in the adopting repository and is removed
here. It remains canonical at `ai-specs/skills/specboot-adopt/` in the SpecBoot **source**
repository — that copy is not affected by this step.
