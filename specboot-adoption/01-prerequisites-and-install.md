# Phase 1 — Prerequisites, OpenSpec Initialization, SpecBoot Import

Read [`00-conventions.md`](00-conventions.md) first: the step contract, approval-gate
semantics, and evidence discipline used below are defined there and not repeated here.

Steps: `ADOPT-01`, `ADOPT-02`, `ADOPT-03`. Formerly sections 1–3.

---

## `ADOPT-01` — Install Prerequisites

**Condition:** always

**Purpose:** Ensure every required tool is available before modifying the repository.

**Preconditions:** none — this is the first step.

**Action:**

Official sources:

| Tool | Source |
|---|---|
| Node.js | https://nodejs.org/ |
| OpenSpec | https://github.com/Fission-AI/OpenSpec |
| OpenSpec npm package | `@fission-ai/openspec` |
| CodeGraph | https://github.com/colbymchenry/codegraph |
| Git | https://git-scm.com/ |
| AI client | Vendor-specific official documentation |

Minimum and reference versions:

| Tool | Requirement | Reference experiment |
|---|---|---|
| Node.js | `>= 20.19.0` | `v24.18.0` |
| npm | Bundled with Node.js | `11.16.0` |
| OpenSpec | Installed version must support the documented keys | `1.7.0` |
| CodeGraph | Version with `init`, `install`, and exploration support | `1.5.0` |
| Git | Recent supported version | Verify locally |
| Project runtime/build tool | Derived from repository evidence | Java 11 + Maven 3.9.16 in the reference repo |

Inspect the target repository before assuming a runtime or build system:

```text
README.md
pom.xml
build.gradle
build.gradle.kts
package.json
requirements.txt
pyproject.toml
go.mod
Cargo.toml
Makefile
docs/
CI configuration
```

Then verify:

```bash
node --version
npm --version
git --version
```

After installation:

```bash
openspec --version
codegraph --version
```

`codegraph --version` applies only when CodeGraph is being adopted — see
[`02-codegraph.md`](02-codegraph.md) for that decision.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before installing or upgrading software.

**Validation:**

- Every required executable is available on `PATH`.
- Version commands return without error.
- Repository-specific toolchain is identified from project evidence.

**Evidence to record:** run-log `ADOPT-01` — date, machine, Node, npm, OpenSpec, CodeGraph,
Git, project runtime, project build tool, result.

**On failure:** recovery is **inline in this step** (contract form A, see
[`00-conventions.md`](00-conventions.md)) — the table below is the documented recovery for
these failures, not an absence of one:

| Failure | Recovery |
|---|---|
| Node.js missing or below 20.19.0 | Install a supported version from the official source or an approved version manager. |
| Global npm executables unavailable | Run `npm prefix -g` and add the appropriate executable directory to `PATH`. |
| Project build tool missing | Follow the repository development guide. |
| AI client unavailable | Install and authenticate the selected client before continuing. |

---

## `ADOPT-02` — Install and Initialize OpenSpec with Explicitly Selected Clients

**Condition:** always

**Purpose:** Install OpenSpec, initialize the repository, and explicitly select the clients
that will use the project.

**Preconditions:** `ADOPT-01` = PASS

**Action:**

```bash
npm install -g @fission-ai/openspec@latest
openspec --version
```

Then, from the repository root:

```bash
openspec init
```

During the interactive flow:

1. Inspect the available client options.
2. Select only the clients the repository will actually use.
3. Record every selection.
4. Do not accept defaults without review.

Capability availability on disk is not evidence of which process provisioned it — see
[`00-conventions.md`](00-conventions.md), "Capability availability is not installer
provenance".

The installed version may generate either `openspec/config.yaml` or `openspec/config.yml`.
Use the actual generated path.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before global installation or upgrade.

**Validation:**

```bash
openspec --version
openspec doctor
find openspec -maxdepth 3 -print
git status --short
```

PASS criteria:

- `openspec/` exists.
- A configuration file exists.
- Client-specific OpenSpec resources exist for selected clients.
- No resources are added for unselected clients unless the installed version requires them.

**Evidence to record:** run-log `ADOPT-02` — OpenSpec version, command, clients offered,
clients selected, generated config path, generated client resources, per-client
provisioning provenance, `openspec doctor` result, Git changes, result.

**On failure:** recovery is **inline in this step** (contract form A, see
[`00-conventions.md`](00-conventions.md)) — the table below is the documented recovery for
these failures, not an absence of one:

| Failure | Recovery |
|---|---|
| `openspec` not found | Check npm global prefix and `PATH`. |
| Wrong clients selected | Re-run initialization or use the installed version's client-management flow. |
| Config extension differs | Use the generated extension. |
| Unsupported config key later appears | Verify against the installed version before editing. |

---

## `ADOPT-03` — Import SpecBoot

**Condition:** always

**Purpose:** Copy the company-approved SpecBoot baseline into the brownfield repository
without overwriting existing project files.

**Preconditions:** `ADOPT-02` = PASS

**Action:**

```bash
cp -rn <SPECBOOT_SOURCE>/* <TARGET_REPOSITORY>/
```

Reference experiment command:

```bash
cp -rn <SPECBOOT_SOURCE>/* .
```

Important shell behavior:

- `*` does not copy hidden directories.
- `.claude/`, `.kiro/`, and other hidden client directories will not be copied by this command.
- `-n` prevents overwriting existing files.
- Hidden client resources must be created by OpenSpec, CodeGraph, or the adapter steps —
  **except the selected client's permission file**, which no earlier step provides.
- A hidden client directory existing later does not by itself show which process created
  it — see [`00-conventions.md`](00-conventions.md).

**Where the permission file comes from.** Because this copy excludes hidden client directories
by design, it does not deliver `.claude/settings.json`, `.kiro/settings/permissions.yaml`, or
any other client permission file. `ADOPT-05B` in
[`03-client-permissions.md`](03-client-permissions.md) is the **mandatory** step that provisions
or reconciles it afterward — copying the approved generic baseline when no target exists, or
merging safely when one does. Do not expect this step to have produced it, and do not hand-write
one here.

Expected content, depending on the approved SpecBoot source:

```text
docs/
ai-specs/
AGENTS.md
CLAUDE.md
GEMINI.md
codex.md
```

**Root instruction single source.** `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `codex.md`
should each be a relative symlink to `docs/base-standards.md` when the filesystem/client
supports it, matching `packages/specboot/bin/init.js`. This keeps a single source of truth
instead of four files that can drift apart.

```bash
test -L AGENTS.md && readlink AGENTS.md
test -L CLAUDE.md && readlink CLAUDE.md
test -L GEMINI.md && readlink GEMINI.md
test -L codex.md && readlink codex.md
```

Expect every command to print exactly `docs/base-standards.md`, and every symlink to resolve.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before repository-local writes.

**Validation:**

```bash
find docs -maxdepth 2 -type f -print
find ai-specs -maxdepth 3 -type f -print
git status --short
```

**Evidence to record:** run-log `ADOPT-03` — source, target, exact command, files added,
files skipped because they existed, hidden directories expected but not copied, root
instruction symlink resolution, per-client provisioning provenance, result.

**On failure:** recovery is **inline in this step** (contract form A, see
[`00-conventions.md`](00-conventions.md)) — the table below is the documented recovery for
these failures, not an absence of one:

| Failure | Recovery |
|---|---|
| Hidden directories missing | Expected; configure clients separately. |
| Existing files not replaced | Expected with `-n`; review whether a deliberate merge is needed. |
| Wrong source path | Verify `<SPECBOOT_SOURCE>` before copying. |
| Partial copy | Compare source and target inventories. |
| Root instruction file is a real file, not a symlink | Replace it with a relative symlink to `docs/base-standards.md`, matching `packages/specboot/bin/init.js`; do not let its content diverge from `docs/base-standards.md` first. |

---

**Next:** [`02-codegraph.md`](02-codegraph.md) if CodeGraph is being adopted, otherwise
[`03-client-permissions.md`](03-client-permissions.md), which is mandatory either way.
