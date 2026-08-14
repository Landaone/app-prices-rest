# Bootstrap Discovery — Kiro

**Status: supported.** Mirrors the confirmed `.kiro/skills/*` relative-symlink convention already
present in this repository.

## When this recipe applies

Only when **Kiro** is declared `SELECTED` at `ADOPT-00`. Selection is **declared by the human, never
inferred** from a directory on disk. If Kiro is `NOT SELECTED`, nothing in this file executes: no
entry is provisioned, no validation runs, and Kiro neither contributes evidence nor blocks the
adoption. `NOT SELECTED` is not `PENDING EVIDENCE` — the latter asserts intended support a run could
not exercise, which is a claim nobody made about a client nobody chose.

While Kiro is `SELECTED`: `PASS` satisfies its gate; `PENDING EVIDENCE` **blocks** the adoption;
`FAIL` **blocks** the adoption. A `PASS` here proves support for Kiro and for no other client.

## Recipe surface — the client-dependent actions only

The canonical process is client-agnostic (design D-Q): step order, the run-log and evidence
contract, status semantics, approval gates, the checkpoint/commit/push, bootstrap, de-bootstrap,
pilot and improvement rules, the mandatory code-graph capability, and the fresh-session
discovery-and-execution evidence contract all live outside this file and name no client. This
recipe carries only the seven surfaces below. Claude, Kiro, and Codex are **peer recipes**; no
adoption configures or validates more clients than it selected.

| Surface | Kiro |
|---|---|
| Project-instruction discovery path | Kiro's project-instruction path, **confirmed from the installed version** at `ADOPT-00`, never assumed or copied from another repository |
| Skill exposure mechanism | `.kiro/skills/<name>` as a **relative symlink** to `../../ai-specs/skills/<name>` |
| Permission-file format and reconciliation | Kiro's project permission file — merge, never overwrite; it carries no machine-specific paths, and native Windows shell portability remains pending live validation |
| Native capability invocation | skills invoked by name through Kiro's own skill surface |
| Fresh-session procedure | a genuinely fresh Kiro session at the repository root; stop-and-hand-off, never simulated |
| Observable model/reasoning evidence | recorded as observed in the session; **never modified** by the orchestrator |
| Bootstrap / de-bootstrap operations | bootstrap writes the `.kiro/skills/specboot-adopt` symlink and an appended instruction block; `ADOPT-18` repoints the symlink and removes only the block |

## Entries

| Target | Mode | Points to | Manifest `intended-permanent-replacement` |
|---|---|---|---|
| `.kiro/skills/specboot-adopt` | `symlink` | `../../.specboot/bootstrap/skills/specboot-adopt` | `.kiro/skills/specboot-adopt -> ../../ai-specs/skills/specboot-adopt` |
| Kiro project-instruction path | `appended-block` | n/a | `none` (block removed at `ADOPT-18`) |

## Confirm the instruction path before using it

Kiro's project-instruction path varies by installed version. `ADOPT-00` **confirms the path from
the installed version** before writing anything to it. It is not assumed, and it is not copied from
another repository's layout.

If the path cannot be confirmed, the instruction pointer is skipped and recorded as such — the
skill symlink alone may still be sufficient, and the fresh-session probe is what decides.

## Same real-file prohibition as Claude

Never create a real directory at `.kiro/skills/specboot-adopt/`; `ADOPT-13`'s collision rule would
make it permanent. Never create a real root instruction file.

## Validation

A genuinely fresh Kiro session must surface the skill and reach the guide with no operator-supplied
paths. Filesystem presence is not discovery.
