# Phase 2 — Code-Graph Capability (Mandatory)

Read [`00-conventions.md`](00-conventions.md) first.

Steps: `ADOPT-04`, `ADOPT-05`. Formerly section 4 and the CodeGraph-specific content of
section 5.

---

## Capability selection — which code-graph implementation is being used?

**A code-graph capability is mandatory for every adoption. This file is not conditional.**

CodeGraph is optional only as the **product choice**. A company-approved equivalent that provides
the required repository-graph capability — symbol lookup, call paths, and blast-radius over the
real codebase — is equally acceptable.

**There is no waiver and no PASS without one. No usable graph capability is FAIL.** Absence is not
a skip, not a waiver, and not `PENDING EVIDENCE`. The adoption stops.

Select and record, in this order:

1. **Select the implementation** — CodeGraph, or the named company-approved equivalent.
2. **Establish and verify its availability with an executed command**, not an assertion. An
   operator stating that a capability is available is not evidence that it is.
3. **Record** the selected implementation, its version, the verification command with its exit code
   and output summary, and any coverage limitations (for example unsupported languages).
4. **If no implementation is usable, this step is FAIL and the adoption stops here.**

A supplied company-approved equivalent is validated only to the extent that its verification
command runs and returns a non-empty structured result. This guide does not judge the tool's
quality — but a verification command that fails or cannot be run means no usable capability, hence
FAIL.

> **Why there is no "small repository" exemption.** The argument that a repository is small enough
> for text search, and that the gap can be recorded as a known limitation, is the one rationalization
> this rule exists to refuse. An honest FAIL record does not restore the missing capability, and the
> downstream steps that consume it (`ADOPT-06`, `ADOPT-09`, `ADOPT-11`) are unconditional consumers.
> Recording the gap and continuing produces an adoption whose later steps rest on a capability that
> was never established.

> **`03-client-permissions.md` was never part of any conditional.** Selected-client permission
> configuration is unconditionally mandatory and is a separate file precisely so that no routing
> decision here can reach past it. That remains true.

**Applies forward.** Repositories adopted before this amendment may have skipped CodeGraph
entirely. They are recorded as **pre-amendment**, never retroactively marked FAIL. This rule binds
adoptions started after it lands.

---

## `ADOPT-04` — Initialize CodeGraph

**Condition:** always — the selected code-graph implementation from the capability selection above

**Purpose:** Build a repository index for grounded source navigation and call-graph
exploration.

**Preconditions:** `ADOPT-03` = PASS

**Action:**

Official source:

```text
https://github.com/colbymchenry/codegraph
```

Follow the official installation procedure, then verify:

```bash
codegraph --version
```

Then initialize:

```bash
codegraph init
```

Reference result — evidence from the reference repository, not a universal expectation:

```text
25 files indexed
314 nodes
389 edges
1.0 second
```

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before software installation.

**Validation:**

```bash
test -d .codegraph
codegraph explore "list entry points"
```

PASS criteria:

- `.codegraph/` exists.
- An indexing summary reports files, nodes, and edges.
- The index is queryable.
- Internal `.codegraph/` files are treated as version-dependent.

**Evidence to record:** run-log `ADOPT-04` — CodeGraph version, command, files indexed,
nodes, edges, duration, exploration query, result.

**On failure:** recovery is **inline in this step** (contract form A, see
[`00-conventions.md`](00-conventions.md)) — the table below is the documented recovery for
these failures, not an absence of one:

| Failure | Recovery |
|---|---|
| `codegraph` not on `PATH` | Review installation and shell configuration. |
| Zero files indexed | Confirm the command ran from the repository root. |
| Unsupported language coverage | Record the limitation; do not claim full graph coverage. |
| Empty exploration result | Re-run initialization or the installed version's refresh command. |

---

## `ADOPT-05` — Configure CodeGraph for the Selected Clients

**Condition:** always — the selected code-graph implementation from the capability selection above

**Purpose:** Integrate CodeGraph with every explicitly selected client.

**Preconditions:** `ADOPT-04` = PASS

**Action:**

```bash
codegraph install
```

Record the interactive choices. Reference choices are evidence, not universal defaults:

| Decision | Reference experiment | Live decision |
|---|---|---|
| Clients | Claude and Kiro | |
| Scope | Project | |
| CLI on PATH | Yes | |
| Automatic allow | No | |
| Automatic prompt front-loading | No | |
| CodeGraph Pro | No | |

Rules:

- Select only clients used by the repository.
- Prefer project scope for repository-specific adoption.
- Do not enable automatic allow until exact command patterns are reviewed.
- Treat prompt front-loading as optional.
- Do not hand-author MCP configuration as the primary path when `codegraph install`
  supports the selected client.
- Inspect all generated files.
- Do not create adapters for unselected clients.
- Generated files existing for a client only prove current availability, not which process
  provisioned them — see [`00-conventions.md`](00-conventions.md).

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before project-local configuration changes,
**unless the actual choices exactly match the least-privilege defaults documented in the Rules
above (project scope, automatic allow = No) and `ADOPTION-AUTHORIZATION.md`'s code-graph
privilege-scope policy** — in that case the gate auto-approves, and the generated files remain
fully diff-reviewable evidence rather than a live question. Any deviation toward broader scope or
automatic allow reaches the live gate exactly as documented (design D-Z, part 6).

**Update `.specboot/adoption/ADOPTION-AUTHORIZATION.md`'s code-graph-privilege-scope section**
(created by `ADOPT-00`, design D-Z part 2a) with this step's actual choices. This updates the
existing file; it does not create a second one.

**Validation:**

```bash
git status --short
git diff --name-only
codegraph explore "list public interfaces"
```

Runtime discovery is validated later, in `ADOPT-15`, in a fresh session — filesystem
configuration passing here does not establish it.

**Evidence to record:** run-log `ADOPT-05` — command, clients selected, scope, PATH,
automatic allow, prompt front-loading, Pro, generated files, per-client provisioning
provenance, result.

**On failure:** recovery is **inline in this step** (contract form A, see
[`00-conventions.md`](00-conventions.md)) — the table below is the documented recovery for
these failures, not an absence of one:

| Failure | Recovery |
|---|---|
| Selected client not configured | Re-run `codegraph install` with the correct selection. |
| Unselected client configured | Remove only the unintended generated configuration after review. |
| Client cannot launch CodeGraph | Confirm the executable is visible in the client environment. |
| Excessive approval prompts | Adjust only verified read-only patterns; do not broadly auto-allow writes. |

---

**Next:** [`03-client-permissions.md`](03-client-permissions.md) — mandatory, whether or not
this file was executed.
