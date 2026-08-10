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

