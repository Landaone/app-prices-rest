# Permission Recommendations (Ongoing Policy)

Read [`00-conventions.md`](00-conventions.md) first.

Formerly section 19. This is policy and reference material for ongoing operation.

**First-time permission configuration is not here.** It is a mandatory adoption step —
`ADOPT-05B` in [`03-client-permissions.md`](03-client-permissions.md) — performed early,
right after selected clients and their OpenSpec/CodeGraph resources are known.

---

First-time permission configuration for each selected client is performed early, in the [`ADOPT-05B` — Configure Selected-Client Permissions](03-client-permissions.md) subsection at the end of Section 5, right after selected clients and their OpenSpec/CodeGraph resources are known. This section is policy and reference material for ongoing operation, not where first-time setup should happen.

Approval behavior depends on client and company policy.

### Read-only repository operations

Examples:

```text
file listing
file reading
grep
find
readlink
git status
git diff
openspec doctor
OpenSpec help/schema inspection
CodeGraph exploration
```

These may be eligible for reduced prompting only after exact command patterns are verified.

### Controlled local validation

Repository-declared build and test commands may be included in a shared permission file after team review when they execute locally, write only ignored build/test artifacts, and do not install, deploy, publish, access credentials, or mutate remote systems. Examples include a repository's normal offline Maven validation or test commands. Automatic permission to execute a command does not establish that it ran successfully; exit codes and reported test results must still be checked explicitly.

### Project-local mutations

Examples:

```text
editing documentation
editing OpenSpec configuration
creating agents
editing skills
creating symlinks
staging files
creating a local commit
```

These must remain reviewable.

### High-risk operations

Always require explicit approval:

```text
software installation or upgrade
deletion
overwrite
destructive Git commands
changes outside the repository
push
pull-request creation or modification
merge
remote mutation
credential or secret changes
```

### Reference observations

- Read-only commands sometimes requested approval.
- `find`, `grep`, CodeGraph, and OpenSpec were not universally auto-allowed.
- Broad shell write permissions were not granted.
- Remote mutation remained out of scope.
- An earlier local Claude configuration executed 8 verified read-only commands with zero permission prompts and zero file modifications. The policy was later consolidated into the shared `.claude/settings.json`; that shared configuration must earn its own fresh-session and supported-OS evidence rather than inherit the earlier result.
- Kiro's project permission file contains no machine-specific paths, but native Windows shell portability remains pending live validation.


**Evidence to record:** run-log "Permission decisions" — client, mode, command, read-only or
mutation, prompted, decision, reason. Record one row per decision, as they arise.
