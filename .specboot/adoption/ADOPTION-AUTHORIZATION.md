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
Selected client(s): Claude
Route (manual / autodiscovery): autodiscovery
```

## Declared team environment matrix

Team-declared, not limited to the adopting machine. Where derived from repository evidence (CI
workflow `runs-on` values, a Windows-wrapper script, container configuration, CONTRIBUTING/README
platform statements), record the evidence pointer alongside each confirmed or corrected row.

```text
Clients supported: Claude
Stacks supported: this repository's observed stack (see repository root for language/build tooling)
Shells supported: zsh
Operating systems supported: macOS
Evidence used to derive this matrix, if any (or "none — declared directly"): none — declared
  directly. Single-operator lab/experiment repository; operator confirmed this scope explicitly
  when asked at ADOPT-00's gate rather than a broader team scope. Subject to confirmation/correction
  when ADOPT-05B is reached, per that step's own procedure.
```

## OpenSpec version policy

```text
Policy: reuse an installed version that already meets the documented minimum; do not silently
upgrade a globally installed tool. Ask again only when the installed version is below the
documented minimum, or when the operator explicitly requests staying current.
Deviation from the default, if any: none. ADOPT-02 (2026-08-15) found OpenSpec 1.7.0 already
  installed, meeting ADOPT-01's "installed version must support the documented keys" criterion, so
  the install/upgrade command was skipped entirely per the default policy — no live gate was
  reached, consistent with design D-Z part 6.
```

## Code-graph capability default privilege scope

```text
Policy: least-privilege default (project-local scope, automatic-allow disabled) unless the
operator explicitly requests broader scope.
Deviation from the default, if any: none recorded yet — confirmed default at ADOPT-00's gate;
  ADOPT-05 updates this section when reached.
```

## Standing commit-and-push authorization

```text
Granted: YES
Scope: every checkpoint whose staged file list is a subset of its step's declared
  `Allowed modifications`, on branch: experiment/specboot-ai-adoption-v2
Conditions, all required for auto-approval:
  - fast-forward push only
  - remote-impact assessment unchanged from the `ADOPT-00` baseline (no new CI, ruleset, webhook,
    branch protection, force push, PR, deploy, or destructive Git operation)
Granted by: Landaone
Granted when (date/time): 2026-08-15
Revoked when (date/time), if applicable, and why: n/a — not revoked
```

## Notes

Any staged path outside a step's declared `Allowed modifications` is never covered by a standing
authorization above, regardless of how broadly this file is filled — it is `FAIL_CLOSED`, reported
by its exact unexpected path, per `00-conventions.md`.
