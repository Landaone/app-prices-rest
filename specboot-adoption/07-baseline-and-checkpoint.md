# Phase 7 — Project Baseline and Clean Local Checkpoint

Read [`00-conventions.md`](00-conventions.md) first.

Steps: `ADOPT-16`, `ADOPT-17`. Formerly sections 16–17. These are the last steps of the
one-time adoption.

---

## `ADOPT-16` — Run the Project Baseline

**Condition:** always

**Purpose:** Establish a known-good project state after adoption and before the first
product change.

**Preconditions:** `ADOPT-15` = PASS for every selected client

**Action:**

Determine the command from repository evidence. Inspect:

```text
README
development guide
build files
CI configuration
test configuration
```

Do not assume a build system. Examples only:

```bash
mvn test
```

```bash
./gradlew test
```

```bash
npm ci && npm test
```

```bash
pytest
```

Also run:

```bash
openspec doctor
git status --short
```

And, only when CodeGraph was adopted:

```bash
codegraph sync
```

If `codegraph sync` is unsupported, inspect help and use the installed version's refresh
command.

**Inline guidance — "Stale build output can invalidate the baseline".** A build tool that skips recompilation
when it believes output is current can produce a false baseline: source may be correct
while previously generated output is stale and silently missing generated members. Prefer a
clean rebuild when the build tool supports one. If cleanup is blocked and removing
generated output is required for a trustworthy baseline, obtain explicit approval and
prefer moving the generated output to a recoverable location over deleting it, then retry.

Reference evidence, not a universal command: in the reference Java/Maven repository,
`mvn -o test` reused stale `target/classes` missing Lombok-generated members; `mvn -o clean
test` failed because the offline plugin cache lacked `maven-clean-plugin`; after approval,
`target/` was moved recoverably outside the repository, and `mvn -o test` then passed with
8 tests, 0 failures, 0 errors, 0 skipped.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before removing or relocating generated
build output.

**Validation:** the baseline command completes with a passing exit code and reported test
results; `openspec doctor` passes; CodeGraph is current when adopted.

**Evidence to record:** run-log `ADOPT-16` — every failed attempt with its diagnosis and
recovery, exact final command, exit code, tests reported, warnings, OpenSpec result,
CodeGraph result, Git status, result.

Record every failed attempt, not only the successful final one. A baseline that passed on
the third try is different evidence from one that passed immediately.

**On failure:** recovery is **inline in this step** (contract form A, see
[`00-conventions.md`](00-conventions.md)): work through the named guidance
**"Stale build output can invalidate the baseline"** above before assuming a source defect.
That guidance is the documented recovery for this failure — it is not an undocumented
failure, and it does not route to [`22-troubleshooting.md`](22-troubleshooting.md), which
carries no entry for a stale-output baseline.

---

## `ADOPT-17` — Review and Create a Clean Local Checkpoint

**Condition:** always

**Purpose:** Preserve the adoption as a reviewable local checkpoint before starting product
work.

**Preconditions:** `ADOPT-16` = PASS

**Action:**

```bash
git status --short
git diff
git diff --stat
```

Stage only intended files. Do not use unconditional `git add -A`.

Then inspect:

```bash
git diff --cached
git diff --cached --stat
git diff --cached --check
```

Save the complete staged diff so the reviewed content is reproducible:
`git diff --cached > <RUN_LOG_DIR>/staged.diff`.

**Staged-scope checklist.** Check the staged diff and staged file list explicitly for:
application source/test code the adoption did not intentionally change; build outputs or
other generated artifacts; personal client overrides accidentally staged; intentional
shared client settings omitted from review; CodeGraph runtime/database files; secret- or
credential-shaped text; machine-specific absolute paths; unexpected file modes (in
particular a symlink staged as a regular file, or vice versa); symlink targets resolving to
the expected canonical path; broken symlinks; adapters for unselected clients; unstaged
changes left after staging; and untracked files that reveal an incomplete step.

`git diff --cached --check` reports whitespace problems. Imported canonical SpecBoot/template
material may already contain inherited, non-semantic formatting that predates this
adoption — record that as a non-blocking warning and do not edit canonical imports just to
normalize it. Treat a warning as a blocking defect only if it changes meaning or could
affect runtime behavior in a file this adoption modified. Record the decision explicitly
rather than silently normalizing every warning.

Whenever a review step above produces a correction, rerun a fresh, independent read-only
review of the corrected staged diff against the full checklist above before requesting
commit approval; do not treat the reviewer that made the correction as the last check.

Suggested message:

```text
chore: adopt SpecBoot workflow
```

**Approval gate:** this step invokes
[the checkpoint protocol](00-conventions.md#the-checkpoint-protocol) and takes its gates from
there — **[HUMAN APPROVAL REQUIRED]** immediately before creating the local commit, and a
**second, separate [HUMAN APPROVAL REQUIRED]** before pushing, with the remote-impact assessment
reported between them. A commit approval is not a push approval.

> **`ADOPT-17` reuses the protocol; it does not define it.** This step is the final checkpoint *of
> the adoption itself*, which is why it carries the `ADOPT-16` = PASS precondition. That
> precondition belongs to this step, **not** to the protocol: earlier checkpoints invoke the same
> protocol long before the baseline has run, and `ADOPT-18` and `ADOPT-19` each form their own
> checkpoint after this one.

**Validation:** acceptance criteria:

- Baseline passes.
- OpenSpec passes.
- CodeGraph is current, when adopted.
- Diff contains only intended adoption changes.
- Staged diff reviewed and saved.
- `git diff --cached --check` results triaged as blocking or non-blocking, with the decision
  recorded.
- Every staged-scope checklist item above checked.
- An independent final validation ran after any correction.
- The checkpoint protocol's steps were followed in order, with both approvals recorded separately.
- The remote-impact assessment was performed from real evidence and reported before the push
  approval was requested; an unknown or unapproved impact blocked the push.
- The push, if performed, targeted the current working branch on the already-configured remote,
  and was not a force push.

**Evidence to record:** run-log `ADOPT-17` — branch, status, files staged, files excluded,
staged diff path, staged diff reviewed, `git diff --cached --check` result, blocking vs.
non-blocking decisions, independent final validation performed, commit approval, commit SHA,
remote-impact assessment and its verdict, push approval, push status, result — plus the
checkpoint ledger entry the protocol requires.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md) — "AI says a file exists,
but it does not" when the staged inventory disagrees with the filesystem; "Adapter created for
an unselected client" and "OpenSpec-generated skill directories replaced by symlinks" when the
staged-scope checklist finds an unintended adapter or a generated directory staged as a
symlink; "Shell-specific list expansion or word-splitting produces one malformed entry" when a
malformed symlink name appears in the staged list. Correct only the unintended entries, then
rerun a fresh independent review of the corrected staged diff before requesting commit
approval.

---

**One-time adoption ends here.** The daily workflow that follows is a separate
concern — see [`08-daily-workflow.md`](08-daily-workflow.md).
