# Adoption Authorization

## Client selection

```text
Selected client(s): Claude
Route (manual / autodiscovery): autodiscovery
```

## Declared team environment matrix

```text
Clients supported: Claude
Stacks supported: Java / Spring Boot / Maven (per pom.xml, mvnw)
Shells supported: zsh (observed); bash assumed compatible
Operating systems supported: macOS (observed)
Evidence used to derive this matrix, if any (or "none — declared directly"): pom.xml, mvnw,
mvnw.cmd present at repository root; OS/shell observed directly in this session
```

## OpenSpec version policy

```text
Policy: reuse an installed version that already meets the documented minimum; do not silently
upgrade a globally installed tool. Ask again only when the installed version is below the
documented minimum, or when the operator explicitly requests staying current.
Deviation from the default, if any: none
```

## Code-graph capability default privilege scope

```text
Policy: least-privilege default (project-local scope, automatic-allow disabled) unless the
operator explicitly requests broader scope.
Deviation from the default, if any: none
```

## Standing commit-and-push authorization

```text
Granted: YES
Scope: every checkpoint whose staged file list is a subset of its step's declared
  `Allowed modifications`, on branch: experiment/specboot-ai-adoption-v4
Conditions, all required for auto-approval:
  - fast-forward push only
  - remote-impact assessment unchanged from the `ADOPT-00` baseline (no new CI, ruleset, webhook,
    branch protection, force push, PR, deploy, or destructive Git operation)
Granted by: Landaone (luis.landaeta@gmail.com)
Granted when (date/time): 2026-08-18
Revoked when (date/time), if applicable, and why: N/A
```

## Notes

Any staged path outside a step's declared `Allowed modifications` is never covered by a standing
authorization above, regardless of how broadly this file is filled — it is `FAIL_CLOSED`, reported
by its exact unexpected path, per `00-conventions.md`.
