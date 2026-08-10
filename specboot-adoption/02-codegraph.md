# Phase 2 — CodeGraph (Conditional)

Read [`00-conventions.md`](00-conventions.md) first.

Steps: `ADOPT-04`, `ADOPT-05`. Formerly section 4 and the CodeGraph-specific content of
section 5.

---

## Decision node — is CodeGraph being adopted?

**This entire file is conditional.** CodeGraph is a decision, not a mandatory link in the
adoption chain.

**Predicate:** CodeGraph is adopted for this repository when **both** hold:

1. the operator has explicitly decided to adopt it, and that decision is recorded in the
   run log; and
2. after `ADOPT-04`, a `.codegraph/` directory exists at the repository root.

Before `ADOPT-04` runs, only condition 1 is testable — the decision is the gate, and the
directory is its result.

**If the decision is no:** skip this entire file. Record the skip in the run log with the
reason. Go directly to [`03-client-permissions.md`](03-client-permissions.md).

This matches the guidance in a repository's own root instruction file: if there is no
`.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.

> **`03-client-permissions.md` is not part of this conditional.** Selected-client permission
> configuration is unconditionally mandatory and is never skipped alongside CodeGraph. It
> is a separate file precisely so that no "skip CodeGraph" path can reach past it.

---

## `ADOPT-04` — Initialize CodeGraph

**Condition:** CodeGraph adopted (see the decision node above)

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

**Condition:** CodeGraph adopted (see the decision node above)

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

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before project-local configuration changes.

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
