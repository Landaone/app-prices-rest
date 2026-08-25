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
Selected client(s): claude
Route (manual / autodiscovery): autodiscovery
```

Every other supported client is recorded NOT SELECTED: kiro, codex.

## Declared team environment matrix

Team-declared, not limited to the adopting machine. Where derived from repository evidence (CI
workflow `runs-on` values, a Windows-wrapper script, container configuration, CONTRIBUTING/README
platform statements), record the evidence pointer alongside each confirmed or corrected row.

```text
Clients supported:                PENDING — declared at ADOPT-05B, not yet asked
Stacks supported:                 PENDING — declared at ADOPT-05B, not yet asked
Shells supported:                 PENDING — declared at ADOPT-05B, not yet asked
Operating systems supported:      PENDING — declared at ADOPT-05B, not yet asked
Evidence used to derive this matrix, if any: PENDING — ADOPT-05B derives it; repository evidence
  observed so far at ADOPT-00 is limited to mvnw / mvnw.cmd (POSIX + Windows wrappers present)
  and pom.xml, recorded here as a pointer only, not as a declared matrix.
```

## OpenSpec version policy

```text
Policy: reuse an installed version that already meets the documented minimum; do not silently
upgrade a globally installed tool. Ask again only when the installed version is below the
documented minimum, or when the operator explicitly requests staying current.
Deviation from the default, if any: none
Outcome of the ADOPT-02 check (recorded 2026-08-25T18:31:59Z): `openspec --version` → `1.7.0`, exit 0.
  That already meets ADOPT-01's documented requirement ("installed version must support the
  documented keys") and equals the reference experiment's version, so
  `npm install -g @fission-ai/openspec@latest` was **NOT run** and the install/upgrade approval
  gate was **never presented** — nothing was being installed or upgraded (09-bootstrap/01 phase
  file, design D-Z part 6). The default policy above applied unchanged; this run required no
  deviation, and no question was owed to the operator.
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
  `Allowed modifications`, on branch: experiment/specboot-ai-adoption-v7
Conditions, all required for auto-approval:
  - fast-forward push only
  - remote-impact assessment unchanged from the `ADOPT-00` baseline (no new CI, ruleset, webhook,
    branch protection, force push, PR, deploy, or destructive Git operation)
Granted by: Landaone (operator, in the ADOPT-00 approval gate)
Granted when (date/time): 2026-08-25T18:12:48Z
Revoked when (date/time), if applicable, and why: n/a
```

### Amendment 1 — checkpoint-1 push gate, and the baseline the push condition now names

Granted by: Landaone (operator), at the checkpoint-1 push gate
Granted when: 2026-08-25T18:27:42Z

Two things were granted in one answer, and they are recorded separately because they are separate
grants:

1. **This push, explicitly.** The operator approved pushing checkpoint 1 (`fb4d2f0`) to
   `origin`, **creating** the remote branch `experiment/specboot-ai-adoption-v7`, having been shown
   the determined remote-impact assessment and both findings attached to it — that the remote ref
   does not yet exist (so the push creates rather than fast-forwards) and that the repository is
   **public** (so the adoption record becomes public). No force push, no pull request, no other
   branch.

2. **The standing push authorization is extended to later checkpoints on this branch**, against the
   assessment recorded in the checkpoint ledger's row 1 as the **`ADOPT-00` remote-impact
   baseline**. From checkpoint 2 onward the push gate auto-approves only when all of the original
   conditions hold *and* the assessment is re-checked as unchanged from that baseline:

   - the checkpoint's exact staged file list is a subset of its step's declared
     `Allowed modifications` (unchanged from the original grant);
   - the push is **fast-forward** — from checkpoint 2 onward the remote ref exists, so this is a
     real test again, not a vacuous one;
   - the remote-impact assessment is **unchanged from the baseline**: still zero Actions workflows,
     zero webhooks, zero rulesets, no branch protection or required check on this branch, zero
     deploy keys, zero environments, no Pages site — and no new CI, ruleset, webhook, branch
     protection, force push, pull request, deployment, or destructive Git operation;
   - the branch is still `experiment/specboot-ai-adoption-v7`.

   **Re-checking is not optional and reuse is not trust.** Any one of those probes coming back
   different is not a variance to note and continue past — it is a **changed baseline**, the
   auto-approval lapses, and the push gate is presented live to the operator again.

   **What this amendment does not grant:** pull-request creation (gated separately by `ADOPT-20`),
   merges, force pushes, any branch other than the one named, remote or credential configuration,
   and any write call against the GitHub API. Read-only GitHub inspection is authorized only for
   the remote-impact assessment this protocol requires.

Both gates (commit and push) are covered. The operator selected "Sí, commit y push" at the
`ADOPT-00` mutation gate, in the same gate that approved the exact mutation inventory.

## Notes

Any staged path outside a step's declared `Allowed modifications` is never covered by a standing
authorization above, regardless of how broadly this file is filled — it is `FAIL_CLOSED`, reported
by its exact unexpected path, per `00-conventions.md`.
