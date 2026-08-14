# Bootstrap Discovery — Codex

> **STATUS: gate part 3 outstanding. `PENDING EVIDENCE` while `SELECTED`; otherwise `NOT SELECTED`.**
>
> Codex is a **peer recipe**, not a lesser one: the three-part gate below is the canonical
> selected-client discovery-and-execution gate, and Claude and Kiro answer to the same one. What
> differs is only this recipe's *evidence*, whose third part has not been observed.
>
> Codex support **MUST NOT** be claimed in any artifact until the gate passes in full. A Codex row
> with no evidence is not a passing row — **never PASS**, never quietly omitted. Which status
> applies depends on **selection, not on the gate**:
>
> - **`SELECTED`** → `PENDING EVIDENCE`, and that **blocks** the adoption until part 3 passes.
> - **`NOT SELECTED`** → `NOT SELECTED`. Nothing is provisioned, nothing is validated, and Codex
>   does **not** block. It is never recorded `PENDING EVIDENCE` in this case, because no one claimed
>   support for it.

## When this recipe applies

Only when **Codex** is declared `SELECTED` at `ADOPT-00`. Selection is **declared by the human, never
inferred** from a directory on disk. If Codex is `NOT SELECTED`, nothing in this file executes: no
entry is provisioned, no validation runs, and Codex neither contributes evidence nor blocks the
adoption. `NOT SELECTED` is not `PENDING EVIDENCE` — the latter asserts intended support a run could
not exercise, which is a claim nobody made about a client nobody chose.

While Codex is `SELECTED`: `PASS` satisfies its gate; `PENDING EVIDENCE` **blocks** the adoption;
`FAIL` **blocks** the adoption. A `PASS` here proves support for Codex and for no other client.

## Recipe surface — the client-dependent actions only

The canonical process is client-agnostic (design D-Q): step order, the run-log and evidence
contract, status semantics, approval gates, the checkpoint/commit/push, bootstrap, de-bootstrap,
pilot and improvement rules, the mandatory code-graph capability, and the fresh-session
discovery-and-execution evidence contract all live outside this file and name no client. This
recipe carries only the seven surfaces below. Claude, Kiro, and Codex are **peer recipes**; no
adoption configures or validates more clients than it selected.

| Surface | Codex |
|---|---|
| Project-instruction discovery path | root `AGENTS.md` (canonical symlink to `docs/base-standards.md`; a bootstrap-created real file is registered with an `intended-permanent-replacement` so `ADOPT-18` converts it) |
| Skill exposure mechanism | `.agents/skills/<name>/SKILL.md`, scanned from the working directory up to the repository root — symlink, or `copy` with its reason recorded |
| Permission-file format and reconciliation | Codex's own project permission surface — merge, never overwrite; **not yet exercised**, so it carries no validated evidence |
| Native capability invocation | skills invoked by name; `SKILL.md` must carry `name` and `description` |
| Fresh-session procedure | a genuinely fresh Codex task rooted at the **isolated throwaway test repository**, never at the repository under adoption |
| Observable model/reasoning evidence | recorded as observed; **never modified** by the orchestrator |
| Bootstrap / de-bootstrap operations | bootstrap writes the `.agents/skills/specboot-adopt` entry and the `AGENTS.md` pointer; `ADOPT-18` converts or removes it, and removes it outright if the client was left unverified or unselected |

## Mechanism: confirmed by official documentation, 2026-08-12

Official OpenAI/Codex documentation confirms the project-scoped path this recipe uses:

> "Codex scans `.agents/skills` in every directory from your current working directory up to the
> repository root."

> Skills can be "global (in your user directory, for you as a developer) or repo-specific (checked
> into `.agents/skills`, for your team)."

> "The `SKILL.md` file must include `name` and `description`."

Sources: `learn.chatgpt.com/docs/customization/overview`, `learn.chatgpt.com/docs/build-skills.md`
(both reached via 308 redirects from `developers.openai.com/codex/...`). Consulted 2026-08-12 under
explicit user authorization for external research.

This supersedes the earlier position that only `~/.agents/skills/` (personal) was documented. The
project-scoped form exists, and this recipe's path matches it exactly.

**The gate remains open.** Documentation predicts the behaviour; it does not evidence it. Codex is
still `PENDING EVIDENCE` until a fresh session is observed discovering *and* executing the skill.

## Entries — structurally conformant, behaviourally unverified

| Target | Mode | Notes |
|---|---|---|
| `.agents/skills/specboot-adopt/SKILL.md` | `symlink` (or `copy` fallback) | **candidate path only** |
| root `AGENTS.md` | `real-file` or `appended-block` | if absent, create as a real file registered with `intended-permanent-replacement` naming the canonical `docs/base-standards.md` symlink, so `ADOPT-18` converts it; if present, append a delimited block and remove the block at `ADOPT-18` |

## The gate — all three, in order

**1. Official-documentation discovery. — COMPLETE (2026-08-12).**
Mechanism established from current official Codex documentation and recorded above with sources and
date. Authorization for the external research was granted.

**2. Isolated scratch-repository construction. — COMPLETE (2026-08-12).**
Built in a throwaway repository outside the adopting repository, verified isolated before any write,
and confirmed conformant to the documented contract. No artifact was left in the adopting
repository. See `reports/codex-discovery-gate.md`.

**3. Fresh-session execution test. — NOT PERFORMED.**
Not yet observed. The `codex` CLI was absent from `PATH` on the implementation machine, which is
**not** evidence the client is unavailable — Codex Desktop is a valid host for this gate. The check
is outstanding because it has not been run, never because a CLI lookup failed. A consolidated handoff prompt is recorded in
`reports/codex-discovery-gate.md`. This check must prove two distinct things:
- the skill is **discovered** — not pasted, not supplied after start; and
- its **canonical content executes**.

Presence on disk is not discovery. Discovery is not execution.

## Classification rule

If any task above cannot be completed or verified, Codex is recorded `unavailable` or
`PENDING EVIDENCE`. `ADOPT-18` removes any Codex artifact left unverified, exactly as it removes
artifacts for a client that was never selected.

## What `PENDING EVIDENCE` means here, on two axes

This status belongs to **the recipe**, not to any particular adoption, and the two must not be
collapsed:

| Axis | Codex today |
|---|---|
| **As a shipped recipe** | `PENDING EVIDENCE` — a standing obligation carried forward to any adoption that selects Codex, discharged only when the fresh-session test above is observed |
| **As a client of an adoption that did not select it** | `NOT SELECTED` — nothing provisioned, nothing validated, nothing owed, **nothing blocked** |

The status table's rule that `SELECTED` + `PENDING EVIDENCE` **blocks** applies to the adoption
*that selected it*. An adoption that chose a different client is not blocked by this recipe's
outstanding gate, and completing successfully does not discharge it.

**Neither direction may be taken.** Recording Codex as PASS because an unrelated adoption succeeded
would claim evidence nobody produced. Treating this obligation as a blocker on a run that never
selected Codex would make that run impossible to complete for a reason unrelated to what it
delivers. The obligation is **recorded and carried forward** — never converted, never dropped.

No artifact may report Codex as supported, and none may report a Claude-only adoption as blocked
by it.
