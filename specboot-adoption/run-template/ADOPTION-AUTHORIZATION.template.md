# Adoption Authorization

One file per adoption run. Never one file per `ADOPT` step — the per-step allowlist already lives
in the canonical phase file's `Allowed modifications` field (`00-conventions.md`); this file
records only what the human granted for *this* run, and is read against that canonical field, never
a duplicate of it.

Filled once, near the start of the run, and consulted by the checkpoint protocol's
standing-authorization clause (`00-conventions.md`) at every checkpoint. Revoke or narrow any
authorization below at any time by editing this file and recording the reason; a revoked
authorization takes effect immediately for every checkpoint reached after the edit.

---

## Client selection

```text
Selected client(s):
Route (manual / autodiscovery):
```

## Declared team environment matrix

Team-declared, not limited to the adopting machine. Where derived from repository evidence (CI
workflow `runs-on` values, a Windows-wrapper script, container configuration, CONTRIBUTING/README
platform statements), record the evidence pointer alongside each confirmed or corrected row.

```text
Clients supported:
Stacks supported:
Shells supported:
Operating systems supported:
Evidence used to derive this matrix, if any (or "none — declared directly"):
```

## OpenSpec version policy

```text
Policy: reuse an installed version that already meets the documented minimum; do not silently
upgrade a globally installed tool. Ask again only when the installed version is below the
documented minimum, or when the operator explicitly requests staying current.
Deviation from the default, if any:
```

## Code-graph capability default privilege scope

```text
Policy: least-privilege default (project-local scope, automatic-allow disabled) unless the
operator explicitly requests broader scope.
Deviation from the default, if any:
```

## Standing commit-and-push authorization

```text
Granted: YES / NO
Scope: every checkpoint whose staged file list is a subset of its step's declared
  `Allowed modifications`, on branch: ____________________
Conditions, all required for auto-approval:
  - fast-forward push only
  - remote-impact assessment unchanged from the `ADOPT-00` baseline (no new CI, ruleset, webhook,
    branch protection, force push, PR, deploy, or destructive Git operation)
Granted by:
Granted when (date/time):
Revoked when (date/time), if applicable, and why:
```

## Notes

Any staged path outside a step's declared `Allowed modifications` is never covered by a standing
authorization above, regardless of how broadly this file is filled — it is `FAIL_CLOSED`, reported
by its exact unexpected path, per `00-conventions.md`.
