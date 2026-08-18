# Adoption Authorization

## Client selection

```text
Selected client(s): Claude
Route (manual / autodiscovery): autodiscovery
```

## Declared team environment matrix

```text
Clients supported: Claude
Stacks supported: Java 11 / Spring Boot / Maven (per pom.xml, mvnw, mvnw.cmd)
Shells supported: zsh, bash, PowerShell (default-broad per `03-client-permissions.md` Step 2 — "default
  broad, narrow only on stated evidence — never the reverse"; no stated reason to narrow exists for
  this project. Supersedes the ADOPT-00 evidence-derived draft below, which recorded only this
  machine's own observed shell.)
Operating systems supported: macOS, Linux, Windows (same default-broad rule; supersedes the ADOPT-00
  draft, which recorded only this machine's own observed OS)
Evidence used to derive this matrix, if any (or "none — declared directly"): Clients/Stacks rows
  still corroborated by repository evidence (pom.xml, mvnw, mvnw.cmd at repository root; ADOPT-02's
  recorded client selection). Shells/Operating systems rows are a declaration per the guide's own
  default, not a derivation from this machine or repository — no single adopting machine or
  repository can evidence a whole team's heterogeneity, and this matrix governs only read-only,
  project-scoped, low-risk command patterns (`19-permissions-policy.md`), so declaring broadly is
  not a privilege increase.
Recorded at ADOPT-05B (2026-08-19), superseding the ADOPT-00 bootstrap draft in place — same file,
  not a second one.
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
Deviation from the default, if any: none on the resulting scope (`ADOPT-05` actual choices —
location=local/project, automatic-allow=disabled — match this policy exactly, verified against
generated `.mcp.json`/`.claude/settings.json`).
Deviation from the canonical *invocation form* (recorded separately from scope, since the guide
treats them as distinct): YES — the operator explicitly directed use of `codegraph install -y
--target claude --location local --no-permissions` instead of the guide's canonical explicit-flag
form (`02-codegraph.md` calls `-y` "forbidden... not merely discouraged," citing that its bundled
defaults are `--location=global --target=auto`, automatic-allow on). The operator's own explicit
`--target`/`--location`/`--no-permissions` flags were verified to still override `-y`'s bundled
defaults for those three dimensions (confirmed from actual generated file contents, not assumed);
only the two sub-questions with no flag equivalent (CLI-on-PATH, front-loading) fell through to
`-y`'s internal default. Rationale (operator's own words): known trade-off, accepted deliberately,
citing this adoption's own `v1` precedent for the same command form. Outcome verified: no PATH-level
machine mutation actually occurred (see `ADOPT-05` evidence — `~/.local/bin/codegraph` symlink and
all shell rc files unchanged), so the anticipated residual scope deviation did not materialize in
practice this run. Granted by: Landaone (luis.landaeta@gmail.com), 2026-08-19, via interactive
instruction.
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
