# Symlink Capability Detection and the Fail-Closed Answer

**Symlink creation is capability-detected, never assumed.** Windows without Developer Mode or the
required privilege cannot create symlinks; the existing installer records that condition as an
error rather than failing outright.

## Detection

Probe by attempting a symlink in a temporary location inside the target repository and removing it.
Do not infer capability from the platform name — a Windows host **with** Developer Mode can create
symlinks, and a POSIX host on some mounted filesystems cannot.

| Shell | Probe |
|---|---|
| Bash / zsh | `ln -s . .specboot-symlink-probe && rm .specboot-symlink-probe` |
| PowerShell | `New-Item -ItemType SymbolicLink -Path .specboot-symlink-probe -Target . ; Remove-Item .specboot-symlink-probe` |

Record the result in the durable manifest as `environment.symlinksSupported`, and how it was
arrived at as `environment.symlinkDetermination`, so a policy-forced fallback is never mistaken for
a probe failure.

## When the probe fails: consult the recipe, then fail closed

A failed probe is not itself the answer. Ask the **selected client's recipe** one question:

> Does this client have a native discovery mechanism that surfaces an **external** skill without a
> symlink?

- **Yes** — provision that mechanism. It is a recipe-defined discovery entry like any other, and it
  is recorded with its own `mode`.
- **No** — **stop before provisioning.** Report the capability limitation and leave the target
  repository byte-for-byte unchanged.

There is no third branch. The run does not substitute a file for the mechanism it could not create.

### Discovery is a property of the client, not of the filesystem

A client that surfaces a skill through a symlinked directory does **not** surface it through a text
file that happens to contain a path. Recording such a file as a discovery entry claims a client
capability nobody observed — the same defect as recording presence on disk as discovery, arrived at
from the other side. So:

- `pointer-file` is **removed from the manifest `mode` enumeration**. The schema cannot record one,
  which is what stops the claim from being made by accident.
- A real file naming the external path may still be written as **operator-facing context** where it
  helps a human orient. It is not a discovery entry, it does not satisfy the discovery-and-execution
  gate, and its presence never permits the run to continue as though discovery were provisioned.
- **A content copy is forbidden outright.** There is no local content to copy in the first place —
  the canonical guide, phase files, and skill body live in an external source the adoption never
  duplicates — and manufacturing some would recreate the fork this mode exists to prevent, silently,
  since a copied file carries no record that it is a copy.

### What the refusal must report

The stop is a **clean refusal, never a degraded success**, and it names enough for the operator to
act on it:

| Reported | Why it is needed |
|---|---|
| the selected client | the limitation is client-specific; another client may be fine here |
| the discovery mechanism its recipe requires | says what would have been provisioned |
| what was attempted, and the probe's result | distinguishes "cannot" from "was not tried" |
| that the repository is byte-for-byte unchanged | tells the operator there is nothing to clean up |

Failing at provisioning time rather than at the fresh-session probe is deliberate: the probe is the
expensive, human-in-the-loop step, and the constraint is already knowable before anything is
written.

## Consequences at `ADOPT-18`

| `mode` | Cleanup action |
|---|---|
| `symlink` | unlink |
| `copy` | remove the copied directory *(payload entries only; see the deferred packaged-snapshot mode)* |
| `appended-block` | remove only the delimited block, leaving the rest of the file unchanged |
| `real-file` | remove, or **convert** to the canonical symlink where `intended-permanent-replacement` names one |

A run that failed closed created no entry, so `ADOPT-18` has nothing to reconcile: the repository it
would clean up is one that was never bootstrapped.

## Path handling under both shells

All paths stay repository-relative. Derive loop syntax from the **active shell** and prefer
explicit per-item commands or a shell-native array over a space-separated scalar loop — the
recorded word-splitting failure mode is a path containing a space producing a malformed artifact
name. See `references/portability-matrix.md` in the orchestration skill for the full command table.
