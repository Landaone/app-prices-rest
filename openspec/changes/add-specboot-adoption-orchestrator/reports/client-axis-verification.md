# Task 13.7 — Selection Axis vs OS/Shell Axis

- Date: 2026-08-13
- Scope: every artifact that reports client support (design D-Q)

## Result: PASS, after correcting two defects this check found

### The two axes

| Axis | Statuses | Applies to |
|---|---|---|
| **Client selection** | `SELECTED` (+ `PASS` / `PENDING EVIDENCE` / `FAIL`) · `NOT SELECTED` | whether a client was declared at `ADOPT-00` |
| **OS / shell** | `PASS` · `FAIL` · `PENDING EVIDENCE` | combinations for an *already selected* client |

`PENDING EVIDENCE` on the client axis is reserved for a **selected** client whose gate could not be
exercised — it blocks. A client nobody selected is `NOT SELECTED`: nothing provisioned, nothing
validated, never blocking, and never downgraded into `PENDING EVIDENCE`.

### Checks

| # | Check | Result |
|---|---|---|
| A | every artifact reporting client support carries `NOT SELECTED` | **PASS** — 8/8 artifacts |
| B | no artifact records an unselected client as `PENDING EVIDENCE` | **PASS** — 9 statements mention both; all 9 *distinguish* them, 0 conflate |
| C | OS/shell `PENDING EVIDENCE` is scoped to a selected client | **PASS** — Windows rows qualified "for a selected client" |
| D | schema can express all four states | **PASS** — see defect 1 |
| E | no universal-support claim from one client's PASS | **PASS** — 4 explicit "proves support for the client that produced it and for no other" assertions |

Artifacts covered: `09-bootstrap.md` · `bootstrap-kit/README.md` · `bootstrap-kit/manifest.json` ·
`bootstrap-kit/BOOTSTRAP-MANIFEST.schema.json` · the three `bootstrap-kit/discovery/*.md` recipes ·
`references/portability-matrix.md` · `reports/codex-discovery-gate.md`.

## Defect 1 — the manifest schema could not express `NOT SELECTED`

`BOOTSTRAP-MANIFEST.schema.json`'s `debootstrap.revalidation.freshSessionDiscovery` enumerated only
`["PASS", "FAIL", "PENDING EVIDENCE"]`. A manifest therefore had **no legal value** for an
unselected client, forcing the exact conflation D-Q forbids: the only non-blocking-looking option
available was `PENDING EVIDENCE`, which blocks.

Corrected to `["PASS", "FAIL", "PENDING EVIDENCE", "NOT SELECTED"]` with a description stating which
status belongs to which axis. JSON re-validated.

## Defect 2 — the portability matrix conflated recipe evidence with per-adoption status

The client table's single `Status` column mixed two different things: Claude and Kiro read
"supported" (a recipe-availability claim) while Codex read `PENDING EVIDENCE` (a per-adoption
blocking status). A reader could not tell whether the Codex row meant "this recipe lacks evidence"
or "your adoption is blocked" — and under D-Q those differ entirely, because an adoption that never
selected Codex is unaffected.

Split into `Recipe` and `Gate evidence` columns, with an explicit note that rows are recipe
availability and **never** per-adoption status, and that per-adoption status lives in that
adoption's run log. Codex's row now states parts 1-2 complete and part 3 not observed, followed by
the selection-dependent consequence: `SELECTED` blocks, `NOT SELECTED` proceeds unaffected.

## Note on the Codex evidence

Reframed, not weakened. The gate is canonical and client-agnostic; Codex's report is now scoped as
**the Codex recipe's evidence** rather than the definition of the gate. Its verdict remains "part 3
not observed" — and explicitly *not* "unavailable", since the `codex` CLI's absence from `PATH` is
not evidence about the client.
