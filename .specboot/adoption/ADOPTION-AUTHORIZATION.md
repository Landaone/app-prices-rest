# Adoption Authorization

One file per adoption run. Records only what the human granted for *this* run; read against the
canonical phase file's `Allowed modifications` field, never a duplicate of it.

---

## Client selection

```text
Selected client(s): Claude
Route (manual / autodiscovery): autodiscovery
```

## Declared team environment matrix

```text
Clients supported: Claude (this run selected Claude only; no claim is made about Kiro or Codex support)
Stacks supported: Java 11 + Maven (from pom.xml: spring-boot-starter-parent 2.4.5, java.version 11; mvnw/mvnw.cmd present)
Shells supported: zsh, bash, PowerShell — default broad per this step's own rule ("default broad, narrow only on stated evidence"); no narrowing evidence exists for this project
Operating systems supported: macOS, Linux, Windows — default broad per the same rule; no narrowing evidence exists for this project
Evidence used to derive this matrix, if any (or "none — declared directly"): Stacks declared from ADOPT-01's repository-evidence inspection (pom.xml). Shells/OS declared directly at the documented default breadth, not narrowed by this single adopting machine's own platform (macOS/zsh) per the step's explicit anti-narrowing rule — this machine's evidence describes itself, not the team.
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
Deviation from the default, if any: `ADOPT-05` — scope (local) and automatic-allow (disabled,
via --no-permissions) both match the least-privilege default; front-loading was explicitly
enabled by the operator (reference experiment used No) — not a scope or auto-allow escalation,
recorded as the operator's own live choice at the interactive prompt.
```

## Standing commit-and-push authorization

```text
Granted: YES
Scope: every checkpoint whose staged file list is a subset of its step's declared
  Allowed modifications, on branch: experiment/specboot-ai-adoption-v5
Conditions, all required for auto-approval:
  - fast-forward push only
  - remote-impact assessment unchanged from the ADOPT-00 baseline (no new CI, ruleset, webhook,
    branch protection, force push, PR, deploy, or destructive Git operation)
Granted by: landaeta (luis.landaeta@gmail.com)
Granted when (date/time): 2026-08-19T01:17:25Z
Revoked when (date/time), if applicable, and why: n/a
```

## Notes

Any staged path outside a step's declared `Allowed modifications` is never covered by this standing
authorization, regardless of how broadly this file is filled — it is `FAIL_CLOSED`, reported by its
exact unexpected path, per `00-conventions.md`.

This authorization was granted in the same gate as the `ADOPT-00` exact-mutation-inventory approval
(one gate, two lines — per `09-bootstrap.md` action 7), not as a separate approval.
