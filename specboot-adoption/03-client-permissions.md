# Phase 3 — Configure Selected-Client Permissions (Mandatory)

Read [`00-conventions.md`](00-conventions.md) first.

Step: `ADOPT-05B`. Formerly the "Configure Selected-Client Permissions (Early, One-Time)"
subsection at the end of section 5.

> **This step is unconditionally mandatory for every selected client.** It has no
> dependency on CodeGraph and is never skipped alongside it. It lives in its own file so
> that no "CodeGraph not adopted" path can route past it.

Ongoing policy and reference material for permissions — as opposed to this one-time setup —
is in [`19-permissions-policy.md`](19-permissions-policy.md).

---

## `ADOPT-05B` — Configure Selected-Client Permissions (Early, One-Time)

**Condition:** always

**Purpose:** Once selected clients and their OpenSpec/CodeGraph resources are known, and
before the first AI-heavy adaptation step (`ADOPT-06`), configure one project-scoped,
team-reviewed permission file per selected client. This avoids repeated approval prompts
for verified inspection and controlled local-validation commands across every remaining
adoption step.

**Preconditions:** `ADOPT-02` = PASS (selected clients are known). `ADOPT-05` = PASS when
CodeGraph was adopted; otherwise not applicable.

**Action:**

### Step 1 — Provision the permission file

The permission file does not arrive on its own. `ADOPT-03`'s import uses `cp -rn <source>/* .`,
which does not match dot-prefixed names, so `.claude/`, `.kiro/`, and every other hidden client
directory are deliberately excluded. **This step is what puts the file in place.**

1. **Initialize or configure the selected client** so its project-local structure exists —
   `.claude/`, `.kiro/`, or the equivalent for the client selected in `ADOPT-02`. Do this only
   for clients actually selected.
2. **Locate the approved generic permission baseline** for that client: your organization's
   reviewed starting allowlist. Record where it came from.
3. **If the target permission file does not exist**, copy the baseline explicitly to the
   client's project-local path (for Claude Code, `.claude/settings.json`).
4. **If the target permission file already exists**, **merge** — never overwrite. Existing
   project configuration records decisions someone already made. Bring in baseline entries the
   target lacks, keep the target's own entries, and resolve any conflict deliberately and
   in the record, not by replacement.

Record the copy-or-merge decision and why. A blind overwrite is a defect, not a shortcut.

### Step 2 — Declare the supported-environment matrix

Before reconciling anything, declare what the adopting **project and team** support:

| Dimension | Declare |
|---|---|
| Clients | every AI client the team uses on this repository |
| Stacks | the language/build toolchains present |
| Shells | zsh, bash, PowerShell, … as used by the team |
| Operating systems | macOS, Ubuntu/Linux, Windows, … as used by the team |

**Declare the team's environments, not this machine's.** The matrix is the reconciliation
target for Step 3.

**Record this declared matrix into `.specboot/adoption/ADOPTION-AUTHORIZATION.md`'s
environment-matrix section** (created by `ADOPT-00`, design D-Z part 2a) — the same file, updated
here, not a second one.

### Step 3 — Reconcile the copy against the matrix

- **Remove** permissions outside the declared matrix — entries for clients, stacks, shells, or
  operating systems the project does not support.
- **Retain** every variant any supported environment requires, **including macOS,
  Ubuntu/Linux, and Windows where applicable, even when unused on the machine performing this
  adoption.** Stripping a Windows or Linux variant because the adopting machine is a Mac breaks
  a teammate later, on their machine, as an unexplained permission prompt — far from this step.
- **Add only** the additional permissions the real project actually needs, derived from its
  declared tooling.

### Step 4 — Verify safety, then syntax

Confirm the resulting **shared** file contains none of:

- credentials or secret-shaped text;
- personal absolute paths or home directories;
- machine-specific dependency locations;
- unsafe broad command patterns — generic shell loops, filesystem-wide globs, or wildcards that
  would auto-allow mutation.

Then validate the client-specific syntax: JSON for `.claude/settings.json`, YAML for
`.kiro/settings/permissions.yaml`, or the selected client's own format.

### Step 5 — The generic source baseline stays unchanged

Reconcile **only the copy incorporated into this project**. The approved generic baseline serves
every future adoption; editing it to suit one project silently redefines the standard for all of
them. This is the same distinction the illustrative YAML below carries: an example inside a
guide is not a real permission file.

### Rules

- Configure a permission file only for a client explicitly selected in `ADOPT-02`. Claude
  and Kiro are not mandatory; skip a client the repository does not use.
- A client's permission file existing does not show which process provisioned that client's
  other resources — see [`00-conventions.md`](00-conventions.md), "Capability availability
  is not installer provenance".
- Keep shared project permissions in the selected client's versionable project file. For
  Claude Code, use `.claude/settings.json`; do not maintain a duplicate
  `.claude/settings.local.json` allowlist.
- Allow verified, project-scoped, read-only patterns: repository file reading/listing,
  OpenSpec inspection (`--version`, `--help`, `doctor`, `context`, `schemas`, `templates`),
  CodeGraph exploration, and Git inspection (`status`, `diff`, `rev-parse`).
- Controlled local build/test commands may also be shared after team review when they use
  repository-declared tooling, produce only ignored local artifacts, and do not install,
  deploy, publish, or access external services. Permission to run a test never implies that
  its result is PASS.
- Keep every mutating or higher-risk operation reviewable or approval-gated: edits,
  arbitrary execution, installation/upgrade, deletion, overwrite, staging, commit, push,
  PR, merge, credential/secret changes, network access, and any other remote mutation.
- Do not include usernames, home directories, absolute machine paths, credentials, or
  machine-specific dependency locations in a shared permission file.
- Do not auto-allow generic shell loops, glob expansions, or filesystem-wide searches.
- Validate the file's syntax, then run a fresh-session smoke test on every supported
  client/OS combination before claiming portability.

Validated Claude Code location — `.claude/settings.json` (shared, versioned, and reviewed
with the repository). The file itself is the single source of truth for the current
allowlist; do not duplicate its evolving command list in this guide.
`.claude/settings.local.json` is reserved for exceptional personal overrides and must not
contain a second copy of the team allowlist.

Validated Kiro location — `.kiro/settings/permissions.yaml` (shared and versioned when
company policy permits). Illustrative example only; the real file is a separate, governed
artifact:

```yaml
rules:
  - capability: fs_read
    match:
      - "./**"
    effect: allow
  - capability: shell
    match:
      - "command -v openspec"
      - "npm root -g"
      - "openspec --version"
      - "openspec --help"
      - "openspec doctor"
      - "openspec doctor *"
      - "openspec context"
      - "openspec context *"
      - "openspec schemas"
      - "openspec schemas *"
      - "openspec templates"
      - "openspec templates *"
      - "openspec status *"
      - "codegraph explore *"
      - "git status"
      - "git status *"
      - "git -C * status *"
      - "git diff"
      - "git diff *"
      - "git rev-parse *"
      - "git check-ignore *"
      - "find . *"
      - "ls *"
      - "grep *"
      - "rg *"
      - "head *"
      - "tail *"
      - "wc *"
      - "readlink *"
      - "sed -n *"
    effect: allow
  - capability: mcp
    match:
      - "codegraph/codegraph_explore"
    effect: allow
```

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before creating the initial shared
permission file or broadening it with a new command family. Subsequent changes follow
normal repository review so the whole team receives the same policy.

**Validation:**

Check syntax (JSON/YAML parse), then run this read-only smoke test in a fresh session of
each configured client:

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Perform a read-only smoke test of this repository's project-local permissions.

Run these commands separately, without combining them with shell operators:
- `openspec --version`
- `openspec doctor --json`
- `openspec context --json`
- `openspec schemas`
- `openspec templates`
- `git status --short`
- `git diff -- <the actual generated OpenSpec config path>`
- one read-only CodeGraph exploration query, only when CodeGraph was adopted

Do not modify files.

For each command report:
- whether it executed;
- whether it requested permission;
- PASS or FAIL.

Treat an unexecuted or failed command as FAIL, never an inferred PASS from empty output.

Stop after reporting the permission behavior.
```

Use the actual generated OpenSpec config path (`openspec/config.yaml` or
`openspec/config.yml`). The historical form of this prompt, which hard-coded
`openspec/config.yaml` and an unconditional CodeGraph query, is preserved byte-for-byte in
[`history/prompt-inventory.md`](history/prompt-inventory.md).

Run this smoke test **once per supported client/OS combination that is actually available**,
in a fresh session of each.

**A combination you cannot exercise is recorded as `PENDING EVIDENCE`, never as PASS.** If the
team supports Windows and no Windows machine is available during this adoption, that row is
pending — not passing, not failing, and not quietly omitted. This follows the rule in
[`00-conventions.md`](00-conventions.md): an unexecuted command is FAIL, never an inferred PASS
from empty output, and an untested environment is not evidence of a working one.

| Client / OS | Available? | Result |
|---|---|---|
| e.g. Claude Code / macOS | yes | PASS / FAIL |
| e.g. Claude Code / Windows | no | `PENDING EVIDENCE` |

PASS criteria:

- Each client's permission file parses.
- Every listed command executed, in every available supported combination.
- Permission prompts triggered are recorded, whether zero or more.
- No file was modified during the smoke test.
- Every unavailable supported combination is recorded as `PENDING EVIDENCE`, with the reason.

**Evidence to record:** run-log `ADOPT-05B` — source baseline located; copy-or-merge decision
and why; entries removed as out-of-matrix; entries added for the real project; the declared
supported-environment matrix; safety-check and syntax-validation results; smoke-test results
per client/OS combination, with unavailable combinations marked `PENDING EVIDENCE`; confirmation
that the generic source baseline is unchanged; remaining limitations; plus the existing fields —
clients selected, per-client file present and valid, permission prompts triggered, file
modifications during smoke test, per-client provisioning provenance, result.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md), "Read-only commands
repeatedly request permission" and "YAML fails because a rule contains `:`".

---

**Next:** [`04-context-and-openspec.md`](04-context-and-openspec.md).
