# Bootstrap Discovery — Claude Code

**Status: supported.** The mechanism mirrors the relative-symlink convention this repository
already uses for `.claude/skills/*`.

## When this recipe applies

Only when **Claude** is declared `SELECTED` at `ADOPT-00`. Selection is **declared by the human, never
inferred** from a directory on disk. If Claude is `NOT SELECTED`, nothing in this file executes: no
entry is provisioned, no validation runs, and Claude neither contributes evidence nor blocks the
adoption. `NOT SELECTED` is not `PENDING EVIDENCE` — the latter asserts intended support a run could
not exercise, which is a claim nobody made about a client nobody chose.

While Claude is `SELECTED`: `PASS` satisfies its gate; `PENDING EVIDENCE` **blocks** the adoption;
`FAIL` **blocks** the adoption. A `PASS` here proves support for Claude and for no other client.

## Recipe surface — the client-dependent actions only

The canonical process is client-agnostic (design D-Q): step order, the run-log and evidence
contract, status semantics, approval gates, the checkpoint/commit/push, bootstrap, de-bootstrap,
pilot and improvement rules, the mandatory code-graph capability, and the fresh-session
discovery-and-execution evidence contract all live outside this file and name no client. This
recipe carries only the seven surfaces below. Claude, Kiro, and Codex are **peer recipes**; no
adoption configures or validates more clients than it selected.

| Surface | Claude |
|---|---|
| Project-instruction discovery path | root `CLAUDE.md` (canonical symlink to `docs/base-standards.md`, never replaced by a real file) plus client-scoped `.claude/CLAUDE.md` |
| Skill exposure mechanism | `.claude/skills/<name>` as a **relative symlink** to `../../ai-specs/skills/<name>` |
| Permission-file format and reconciliation | `.claude/settings.json`, JSON, shared and versioned — **merge, never overwrite**; `.claude/settings.local.json` never holds a second copy of the team allowlist |
| Native capability invocation | skills invoked **by name**; MCP servers declared in `.mcp.json` |
| Fresh-session procedure | a genuinely fresh Claude Code session started at the repository root; the orchestrator stops and hands off, never simulating one |
| Observable model/reasoning evidence | model and reasoning effort are visible in the session and recorded as observed — **never modified** by the orchestrator |
| Bootstrap / de-bootstrap operations | bootstrap writes the `.claude/skills/specboot-adopt` symlink and the `.claude/CLAUDE.md` pointer block; `ADOPT-18` repoints the symlink to `ai-specs/` and removes only the delimited block |

## Entries

| Target | Mode | Points to | Manifest `intended-permanent-replacement` |
|---|---|---|---|
| `.claude/skills/specboot-adopt` | `symlink` | the external canonical source's `ai-specs/skills/specboot-adopt`, resolved relative to the runtime-supplied `<SPECBOOT_SOURCE>` (source-linked mode never creates `.specboot/bootstrap/`) | `.claude/skills/specboot-adopt -> ../../ai-specs/skills/specboot-adopt` |
| `.claude/CLAUDE.md` | `real-file` or `appended-block` | n/a — carries a delimited bootstrap block pointing at the external canonical guide | `none` (block removed at `ADOPT-18`) |

## Why a symlink and not a real directory

`ADOPT-13` preserves a **real** directory that collides with a canonical skill name and skips
creating the symlink. A bootstrap that wrote `.claude/skills/specboot-adopt/` as a real directory
would therefore make itself permanent and be recorded only as "skipped". The symlink form is
replaced cleanly at `ADOPT-18`.

## Why the root `CLAUDE.md` is never touched

The canonical root instruction file is a symlink to `docs/base-standards.md`. Creating a real root
`CLAUDE.md` would permanently block that symlink, because both `cp -rn` and the installer's
symlink creation skip existing paths.

`.claude/CLAUDE.md` is the correct home for the bootstrap pointer: this repository already proves a
client-scoped instruction file coexists with the canonical root symlink.

- If `.claude/CLAUDE.md` **does not exist**: create it as a real file, `ownership:
  bootstrap-created`, `mode: real-file`.
- If it **exists**: append a delimited block, `ownership: pre-existing-modified`, `mode:
  appended-block`. `ADOPT-18` removes only the block.

Block delimiters, used verbatim so removal is exact:

```text
<!-- SPECBOOT-BOOTSTRAP:BEGIN -->
Run the `specboot-adopt` skill. The adoption contract lives at the external canonical source
resolved via `.specboot/local/canonical-source-path` (source-linked mode; no copy exists in this
repository). This block is temporary and is removed at `ADOPT-18`.
<!-- SPECBOOT-BOOTSTRAP:END -->
```

## Validation

Filesystem presence is **not** discovery. `ADOPT-00`'s validation requires a genuinely fresh Claude
session that surfaces `specboot-adopt` and reaches the guide with **no operator-supplied paths**.
The orchestrator stops and hands off for this check — it never simulates a fresh session.
