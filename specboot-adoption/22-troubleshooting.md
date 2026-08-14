# Troubleshooting and Recovery

Read [`00-conventions.md`](00-conventions.md) first.

Formerly section 22. Consulted on failure, not executed in sequence. Each step's
`On failure` field points here.

---

### Shell wildcard omits hidden directories

**Symptom:** Hidden client directories are missing after import.

**Cause:** `*` does not match dot-prefixed names.

**Recovery:** Configure client resources through OpenSpec, CodeGraph, and adapter steps.

---

### `cp -n` preserves an incompatible existing file

**Symptom:** Expected SpecBoot content does not appear.

**Cause:** `-n` prevents overwrite.

**Recovery:** Compare source and target and merge deliberately.

---

### Template stack or domain appears in docs

**Symptom:** Documentation contains unrelated TypeScript, LTI, frontend, Playwright, or template terminology.

**Recovery:** Re-run the consolidated technical-context prompt with CodeGraph, build files, source, tests, endpoints, entities, and migrations as evidence.

---

### Frontend requirements appear in a backend-only repository

**Recovery:** Preserve the frontend document but mark it not applicable. Remove unsupported browser/E2E requirements.

---

### YAML fails because a rule contains `:`

**Recovery:** Quote the affected scalar without changing its meaning, then rerun full validation.

---

### OpenSpec command not found

**Symptom:** An `openspec` command produces no output and the shell reports `command not
found` (typically exit code 127). Any step that invokes `openspec` can hit this — `ADOPT-02`,
`ADOPT-07`, `ADOPT-08`, `ADOPT-16`.

**This is FAIL, not a clean result.** No output here means *no run*, not "zero warnings".
Reading it as a passing check is exactly the inference
[`00-conventions.md`](00-conventions.md)'s evidence discipline prohibits. Record the exact
command, the exit code, and `Warnings: not determinable — command did not execute`.

**Cause:** The executable does not resolve on `PATH` in this shell — never installed, installed
to an npm global prefix not on `PATH`, a `PATH` that changed since the earlier step, or a shell
alias or function shadowing the real tool.

**Diagnose first — these are read-only and mutate nothing:**

```bash
command -v openspec
npm prefix -g
echo "$PATH"
```

Compare the npm global prefix's `bin` directory against `PATH`. Run the check with an absolute
executable path when an alias or function could be shadowing the real tool. Inspection is not
correction: diagnose fully before concluding the tool is genuinely absent.

**A prior `ADOPT-02` PASS is now in question.** `ADOPT-08` presupposes `ADOPT-07` = PASS, which
presupposes an OpenSpec that resolves. If it does not resolve now, either that earlier evidence
was inferred rather than observed, or the environment changed since. Report that as a finding;
do not smooth it over.

**Recovery:**

1. **Return to [`ADOPT-02`](01-prerequisites-and-install.md)**, which owns installation and
   client selection. Do not repair installation from inside a later step — `ADOPT-08` in
   particular is read-only and must not correct failures it finds.
2. **Obtain renewed human approval before any reinstall or environment mutation.**
   **[HUMAN APPROVAL REQUIRED]** — `ADOPT-02`'s original approval covered that execution, not
   this recovery. Approval covers the named mutation only; it does not carry forward to a
   later reinstall, a `PATH` edit, or any other environment change.
3. After the approved recovery, **rerun `ADOPT-08` in full** — every check, not only the command
   that failed — and require it to pass on its own evidence.
4. Log the whole sequence in the run log's correction record: step, attempt, failure, diagnosis,
   recovery, outcome. Keep the step marked FAIL in the step-state table until a complete rerun
   passes.

---

### OpenSpec key unsupported by installed version

**Recovery:** Inspect `openspec --version` and `openspec --help`. Use only supported keys.

---

### Agent overwrites another stack, or a new agent is too narrow

**Symptom:** An unrelated agent was overwritten, or a newly created agent names one specific framework instead of its whole technology/runtime family.

**Recovery:** Restore the original agent. For an overly narrow agent, restore any OpenSpec selection that referenced it, then, only after explicit human approval, remove it and create the replacement scoped to the technology family instead, reading framework-specific detail from `docs/` at task time, and validate it before updating OpenSpec selection.

---

### Agent is too project-specific, or its examples leak this repository's domain

**Recovery:** Move project details into `docs/`; make the agent read them at task time. Replace only leaking example scenarios with domain-neutral examples for that technology family, preserving the agent's generic behavior, client-neutral frontmatter, and body.

---

### Skill assumes the wrong ecosystem

**Recovery:** Adapt it to detect tools from repository files and make technology-specific commands conditional.

---

### OpenSpec-generated skill directories replaced by symlinks

**Recovery:** Restore them as real directories. Use symlinks only for shared canonical skills.

---

### Filesystem validation passes but runtime discovery fails

**Cause:** Filesystem structure and runtime discovery are separate capabilities.

**Recovery:** Run the fresh-session validation and inspect root instructions, mode, native paths, and client config.

---

### Adapter created for an unselected client

**Recovery:** Remove only the unintended adapter after review, then rerun client detection.

---

### Shell-specific list expansion or word-splitting produces one malformed entry

**Symptom:** A single symlink or directory is created with a name containing spaces, instead of one per intended target.

**Cause:** List/word-splitting behavior for an unquoted, space-separated variable differs across shells (for example zsh, Bash, and PowerShell); a loop written for one shell's rules can silently iterate once instead of once per item under another.

**Recovery:** Derive loop syntax from the actual active shell, and prefer explicit per-item commands or a shell-native array/list over a space-separated scalar loop. After explicit human approval, remove only the malformed entry, then create each intended entry explicitly.

---

### Read-only commands repeatedly request permission

**Recovery:** Record exact patterns. Configure the Section 5 permission files early, and reduce prompting only for verified read-only commands.

---

### AI says a file exists, but it does not

Verify physically:

```bash
test -f <FILE>
wc -l <FILE>
grep '^## ' <FILE>
git status --short -- <FILE>
```

Never claim persistence until the filesystem confirms it.

---

### Large documentation write truncates or replaces content

**Recovery:**

1. Reject unsafe replacement when valid content exists.
2. Verify the current file physically.
3. Write from a durable source.
4. Check existence, line count, headings, and tail.
5. Commit only after full review.

---

### Prompt labeled verbatim was changed

**Recovery:** Compare character-for-character against the authoritative source. Use historical labels only for exact text.

---

### Fresh session does not discover the skill after `ADOPT-00`

The payload is on disk but a fresh client session does not surface `specboot-adopt` without the
operator pasting a path.

**Recovery:**

1. Record the check as **FAIL**. Presence on disk is not discovery — do not record PASS.
2. Confirm the discovery entry matches the selected client's recipe in
   `bootstrap-kit/discovery/`, and that the symlink resolves (`readlink` / `Get-Item`).
3. Confirm the client's project-instruction path for the **installed version**, rather than one
   copied from another repository.
4. Re-probe in a genuinely fresh session. A reloaded window or a new chat in the same session is
   not a fresh session.
5. If the mechanism cannot be made to work, record that client `PENDING EVIDENCE` or `unavailable`
   — never PASS — and stop rather than proceeding on an unproven discovery path.

---

### A real file blocks a canonical symlink

A later step reports a path as *skipped* rather than linked, because a real file or directory
already occupies it. Both `cp -rn` and the installer's symlink creation skip existing paths, and
`ADOPT-13` preserves a real directory that collides with a canonical skill name.

**Recovery:**

1. Read `.specboot/adoption/BOOTSTRAP-MANIFEST.json` and find the entry for that path.
2. If `ownership` is `bootstrap-created`, it must carry an `intended-permanent-replacement`. Add
   one if it is missing, then let `ADOPT-18` convert it.
3. If `ownership` is `pre-existing-untouched`, **do not remove it**. The repository owned that file
   before the adoption. Record the collision and escalate.
4. Never resolve this by deleting an unlisted path. `ADOPT-18` acts only on the manifest inventory.

---

### Symlink creation fails on Windows

`EPERM` or a privilege error when creating a symlink. Windows requires Developer Mode or elevated
privilege.

**Recovery:**

1. Record `environment.symlinksSupported: false` in the manifest.
2. Use the documented copy fallback and record `mode: "copy"` **with the reason** on every affected
   entry. `ADOPT-18` then removes the copy rather than attempting to unlink it.
3. Do not silently proceed as if the copy were canonical content — an unrecorded copy is later
   mistaken for the real artifact.
4. Any Windows/PowerShell validation that cannot actually be executed stays `PENDING EVIDENCE`,
   never PASS.

---

### Supplied canonical source fails the three-artifact validation

**Symptom.** `ADOPT-00` rejects the supplied source path and reports one or more of
`SPECBOOT_ADOPTION_GUIDE.md`, `specboot-adoption/`, or `ai-specs/skills/specboot-adopt/SKILL.md`
as missing.

**Why this is correct behavior, not a bug.** Validation runs **before any orchestration instruction
is loaded and before the first project write**, so an incomplete source is rejected rather than
diagnosed after artifacts exist. The target repository is byte-for-byte unchanged — there is
nothing to clean up because nothing was created.

**The most common cause is the third artifact.** The skill is validated as a **readable `SKILL.md`
file**, not merely a present `specboot-adopt/` directory. A source that carries the directory with
references but no skill body is invalid: the initial session reads that file directly to obtain its
procedure, so a directory alone cannot satisfy the adoption.

**Recovery.**

1. Confirm you supplied the SpecBoot **source root**, not a subdirectory of it and not the target
   repository.
2. Confirm `SKILL.md` exists and is readable, not just the directory around it.
3. Supply a complete source and re-run. There is **no fallback**: supplying no source at all is
   itself a refusal, not an alternative route — see *`ADOPT-00` refused before writing anything*.

Do not "fix" this by copying the missing artifact into the source from elsewhere. The source is
read-only for the whole adoption, and an adoption that repaired its own canonical source would be
validating something nobody reviewed.

---

### Source drift detected on resume

**Symptom.** A resume stops with a drift report: the recomputed guide or skill checksum does not
match the value recorded in `.specboot/adoption/BOOTSTRAP-MANIFEST.json`.

**What it means.** The canonical source changed after this run recorded its identity. Continuing
would mean executing instructions the run never approved and the evidence does not describe.

**This is a stop for human reconciliation, not an error to retry past.** Options, all explicit:

| Situation | Action |
|---|---|
| The change is unrelated and unwanted here | point the resume at a source matching the recorded checksums |
| The change is wanted | **re-baseline deliberately**: a human approves it, the run log records the decision and the new checksums, and the run continues under the new baseline |
| You are unsure what changed | diff the source against the recorded commit where one exists, before deciding |

A running adoption never consumes changes made to the source after its recorded checksums by
default. Improvements raised during a run reach the source later, through the governed follow-up
workflow, and are never absorbed by the run that raised them.

---

### Resume with no local source path on this machine

**Symptom.** A resume needs the canonical source and no local path is known here — the machine-local
`.specboot/local/` store is absent because this is a different machine, a fresh clone, or a run
whose store was already removed.

**This is the ordinary cross-machine case — not drift, and not a failure.** The committed manifest
records **portable identity only**: the checksums, the Git commit or an explicit `unavailable`
record, and the statement that the local source path is resolved per machine. **No path is recorded
anywhere in the committed tree**, so there is no recorded location that could be missing, and
nothing for the resume to report as absent. Being asked for a path is expected on every machine but
the one that ran `ADOPT-00`.

**How a resume acquires a local source path**, in this order:

| # | Where the path comes from |
|---|---|
| 1 | The ignored `.specboot/local/` store, **when it is present on this machine** — it holds the path and nothing else, and reading it is a convenience, never evidence |
| 2 | Otherwise, **ask the operator** for a local canonical source |
| 3 | Otherwise, **rediscover** a source |

**Then verify the candidate against the portable identity — always, and however it was obtained.**
Recompute the guide and skill checksums against it and compare them with the recorded values, plus
the recorded Git commit where one was recorded. **Accept only on a match; block on mismatch** and
handle it as drift (previous entry). A path that came from the store is checksummed exactly like one
the operator just typed — the store is a pointer, never a shortcut past verification.

**Recovery.** Supply a local source with `--source <path>`, or answer the prompt for it. Requiring
any previously used absolute path would make a run resumable on exactly one machine, which is the
opposite of what durable state is for.

**Never** treat an absent store as an error, and never write the acquired path into the manifest,
the run log, or any other committed artifact. If it is retained at all, it is retained only in
`.specboot/local/`, which `ADOPT-18` removes.

---

### Symlinks unavailable, and the selected client needs one to find the skill

**Symptom.** The symlink capability probe fails (or `--no-symlinks` forced it off), and the selected
client's recipe has no native discovery mechanism that works without a symlink. `ADOPT-00` stops
**before provisioning** and reports the client, the mechanism its recipe requires, and what was
attempted. Your repository is byte-for-byte unchanged.

**This is the correct outcome, not a defect to work around.** Discovery is a property of the
**client**, not of the filesystem. A client that surfaces a skill through a symlinked directory does
not surface it through a text file that happens to contain a path — so writing one and recording it
as a discovery entry would claim a capability nobody observed. That is the same error as recording
presence on disk as discovery, reached from the other side.

**What not to do:**

- **Do not write a pointer file and call it discovery.** `pointer-file` is not a valid entry `mode`;
  the manifest schema rejects it, which is what stops the claim being made by accident. A real file
  naming the external path may still be useful to orient a human, but it satisfies no gate and does
  not let the run continue.
- **Do not copy the guide or skill body.** There is no local content to copy in the first place, and
  manufacturing some recreates the fork source-linked delivery exists to prevent — silently, since a
  copied file carries no record that it is a copy. A content copy is **FAIL**.

**What to do instead**, in order of preference:

1. **Enable symlink creation.** On Windows, enable Developer Mode or grant the create-symlink
   privilege — see *Symlink creation fails on Windows* above. On a POSIX host, check whether the
   filesystem the repository sits on supports them.
2. **Select a client whose recipe can discover without one**, if your environment offers a choice.
3. **Adopt on a host that supports symlinks**, and treat the constraint as an environment finding to
   record — not something the adoption may route around.

Failing here rather than at the fresh-session discovery probe is deliberate: the probe is the
expensive, human-in-the-loop step, and this constraint is already knowable before anything is
written.

---
### `ADOPT-00` refused before writing anything

**Symptom.** `ADOPT-00` stopped and reported a problem, and your repository is unchanged — no
`.specboot/`, no discovery entry, no manifest, no run log, no `.gitignore` change.

**This is a clean refusal, and there is nothing to clean up.** Every one of these is checked
*before* the first write, precisely so that a stop leaves no state to reconcile. There are five:

| Reported | What it means | What to supply |
|---|---|---|
| a validated canonical source is required | you supplied none | `--source <path>`, or answer the entry prompt's source question |
| the supplied path is not a canonical SpecBoot source | it is missing `SPECBOOT_ADOPTION_GUIDE.md`, `specboot-adoption/`, or a **readable** `ai-specs/skills/specboot-adopt/SKILL.md` | a complete source — the message names what was missing |
| no client was selected | selection is declared by a human, never inferred from a directory on disk | `--client <name[,name]>`, or answer the prompt's client question |
| no recipe for client(s) | the client you named is not supported | one of the clients the message lists — the run never substitutes the nearest match |
| symlinks unavailable and no native discovery mechanism | see the entry above | a symlink-capable environment |

**There is no fallback delivery mode.** A missing or invalid source is not a signal to copy SpecBoot
into your project instead. If you have no canonical source available, obtain one first; adoption
against a source that does not validate is adoption against instructions nobody checked.

**A refusal that left something behind is a defect.** Record it and raise it as an improvement
proposal: the guarantee is byte-for-byte, not approximately.

---
### `ADOPT-18` stopped partway and the manifest is partially consumed

Some entries are terminal, others still read `cleanup-status: pending`.

**Recovery:**

1. This is **FAIL**, not a partial PASS. Do not record `ADOPT-18` as complete.
2. The manifest is committed, so the state is recoverable by any operator or session. Re-read it
   and act **only** on entries still at `pending`.
3. For any entry already removed whose `intended-permanent-replacement` turns out to be missing,
   restore it from `source` and `checksum`, then create the replacement before retrying.
4. Do not re-run the whole step blindly — re-running removal over terminal entries is how a
   `pre-existing-untouched` file gets damaged.

---
