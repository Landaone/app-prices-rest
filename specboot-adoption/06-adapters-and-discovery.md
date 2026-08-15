# Phase 6 — Client Adapters and Runtime Discovery

Read [`00-conventions.md`](00-conventions.md) first.

Steps: `ADOPT-13`, `ADOPT-14`, `ADOPT-15`. Formerly sections 13–15. `ADOPT-13`'s adapt action is
followed immediately by `ADOPT-14`'s read-only validation of the same adapters; per
`00-conventions.md`'s checkpoint-grouping rule, this is a guide-documented executed pair eligible
for one checkpoint with a recorded structural justification — the same treatment
`05-agents-and-skills.md` already states for `ADOPT-09`/`ADOPT-10` and `ADOPT-11`/`ADOPT-12`.
`ADOPT-15` is not part of that pair: it requires a genuinely fresh client session, a structurally
different kind of evidence than a read-only filesystem re-check, and is never grouped into the
same checkpoint as the step it follows.

An adapter or generated resource existing for a client shows current capability
availability only — see [`00-conventions.md`](00-conventions.md), "Capability availability
is not installer provenance".

Reference-run outcomes are in
[`history/reference-run-java-maven.md`](history/reference-run-java-maven.md).

---

## `ADOPT-13` — Create Selected-Client Adapters

**Condition:** always

**Purpose:** Expose canonical agents and shared skills to selected clients while preserving
OpenSpec-generated resources.

**Preconditions:** `ADOPT-12` = PASS

**Action:**

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Create and validate the minimum project-local adapters needed by the AI clients explicitly selected for this repository.

First inspect:
- OpenSpec-generated client configuration;
- CodeGraph client configuration;
- root instruction files;
- `ai-specs/agents/`;
- `ai-specs/skills/`;
- existing client agent and skill directories.

Requirements:
- Detect selected clients from real client configuration generated in the repository; do not assume Claude, Kiro, Cursor, or any other client is selected.
- Keep `ai-specs/agents/` and `ai-specs/skills/` as the canonical sources.
- Create adapters only for selected clients.
- Determine exposed agents from active OpenSpec agent-selection rules plus actual applicability, including technology-agnostic agents (for example a product/strategy agent) selected for applicable business/product work; do not skip an agent merely because it is not tied to a programming stack. Preserve canonical agents for other stacks without exposing them when configuration explicitly rejects them.
- Use the client's native agent directory for agents and native skill directory for skills.
- Prefer relative symlinks for shared canonical resources when the client supports them.
- Do not place agent definitions inside skill directories.
- Preserve all OpenSpec-generated client skill directories as real directories. If a canonical skill name collides with an existing real client-generated directory, preserve the real directory and skip that symlink; report the collision explicitly.
- Do not replace, move, delete, or convert OpenSpec-generated directories into symlinks.
- Preserve existing client configuration and unrelated adapters.
- Do not create adapters for unselected clients.
- Do not modify canonical agents or skills during this step.
- Do not modify source code, tests, project documentation, or OpenSpec planning artifacts.
- Make shell examples safe for the detected shell: do not iterate over a space-separated scalar assuming Bash-style word splitting under zsh; use explicit per-item commands or a shell-native array.

Before creating any directory or symlink, present the complete adapter plan — selected clients and evidence, directories to create, every symlink path and exact relative target, real directories to preserve, collisions and skipped entries, and agents not exposed and why — and obtain explicit human approval. **[HUMAN APPROVAL REQUIRED]**

After approved creation, validate for each selected client:
- agent symlinks and their recorded targets;
- shared skill symlinks and their recorded targets;
- target existence under `ai-specs/`;
- real OpenSpec-generated skill directories;
- absence of broken symlinks;
- absence of malformed symlink names (for example a name containing spaces);
- absence of adapters for unselected clients.

For clients with `.claude/` or `.kiro/` paths, use read-only checks equivalent to:
- `find <client-agent-paths> -type l -print -exec readlink {} \;`
- `find <client-skill-paths> -type l -print -exec readlink {} \;`
- `find <client-skill-paths> -mindepth 1 -maxdepth 1 -type d -print`
- `find -L <all-adapter-paths> -type l -print`

Interpret a non-empty final broken-link result as FAIL.

Report:
- selected clients detected;
- canonical agents and skills exposed;
- symlinks created;
- real directories preserved;
- existing files unchanged;
- unselected clients checked;
- PASS or FAIL for agents, skills, real directories, and broken links;
- files modified.

Stop after filesystem validation. Do not claim runtime discovery has passed; that requires a fresh client session.
```

**Allowed modifications:** a closed rule, not an exact list — symlinks under the selected client's
native agent and skill directories only (for example `.claude/agents/`, `.claude/skills/` when
Claude is selected), naming only agents and skills already validated by `ADOPT-09`–`ADOPT-12`, and
never a real directory, never source code, tests, project documentation, or OpenSpec planning
artifacts, and never an adapter path for a client not recorded `SELECTED`.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before creating symlinks or modifying
client directories. The prompt above additionally requires presenting the complete adapter
plan and obtaining explicit approval before any directory or symlink is created — that is
the same gate, stated at the point of mutation.

**Validation:** the prompt's own per-client filesystem validation. Then run `ADOPT-14`.
Do not claim runtime discovery has passed; that requires `ADOPT-15`.

**Evidence to record:** run-log `ADOPT-13` — selected clients, canonical agents exposed,
canonical skills exposed, symlinks, real directories preserved, unselected clients checked,
per-client provisioning provenance, corrections, result.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md), "Adapter created for
an unselected client", "OpenSpec-generated skill directories replaced by symlinks", and
"Shell-specific list expansion or word-splitting produces one malformed entry".

---

## `ADOPT-14` — Validate Adapter Files, Symlinks, and Generated Directories

**Condition:** always

**Purpose:** Distinguish canonical symlinks, real OpenSpec directories, and broken links.

**Preconditions:** `ADOPT-13` = PASS

**Action:** for Claude and Kiro when selected — substitute the actual selected clients'
paths:

```bash
find .claude/agents .kiro/agents -type l -print -exec readlink {} \;
find .claude/skills .kiro/skills -type l -print -exec readlink {} \;
find .claude/skills .kiro/skills -mindepth 1 -maxdepth 1 -type d -print
find -L .claude/agents .kiro/agents .claude/skills .kiro/skills -type l -print
```

Interpretation:

- `readlink` shows each recorded target.
- Directory search lists real directories.
- OpenSpec-generated skill directories remain real.
- Final `find -L ... -type l` should return no broken symlinks.
- `find -L ... -type f` alone is insufficient.

The total staged symlink count normally combines client agent/skill adapters with any
root-instruction symlinks from `ADOPT-03` (see that step for their own validation). In the
reference clean run this was 26 adapter symlinks (4 agent + 22 skill) plus 4
root-instruction symlinks, for 30 total — illustrative evidence, not a fixed target for
every repository.

**Allowed modifications:** none — read-only.

**Approval gate:** none — read-only.

**Validation:** PASS criteria:

- Agent adapters point to canonical files.
- Skill adapters point to canonical directories.
- Targets exist.
- Generated directories remain real.
- No broken links.
- No malformed symlink names (for example a name containing spaces).
- No adapters for unselected clients.

A non-empty final broken-link result is FAIL.

**Evidence to record:** run-log `ADOPT-14` — agent symlinks, skill symlinks, real
directories, root-instruction symlinks, broken links, malformed symlink names, unselected
client adapters, result.

**On failure:** recovery is owned by **another step** (contract form C, see
[`00-conventions.md`](00-conventions.md)): return to `ADOPT-13`, correct only the unintended
entries after approval, then rerun this step in full. That is the documented recovery — it is
not an undocumented failure.

---

## `ADOPT-15` — Validate Runtime Discovery in a Fresh Client Session

**Condition:** always, once per selected client

**Purpose:** Prove that a new client session discovers and uses repository instructions,
agents, skills, docs, and CodeGraph integration.

**Preconditions:** `ADOPT-14` = PASS

**Action:**

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Perform a read-only architecture review of this repository and identify the most important implementation risk.

Use the repository's configured agents, skills, project instructions, documentation, and CodeGraph integration where appropriate.

Do not modify files.
Do not access the web or any external service.

Before giving the architecture finding, report:
- the client and active agent or mode;
- root repository instruction files automatically loaded;
- canonical or adapted agent definitions automatically discovered or used;
- skills automatically discovered or used;
- project documentation consumed;
- CodeGraph tools or commands used;
- resources that had to be opened manually because automatic discovery failed.

Then report:
- the primary implementation risk;
- repository evidence supporting it;
- files modified, which must be none;
- PASS or FAIL for automatic runtime discovery.

Do not claim automatic discovery for a resource that was manually supplied or explicitly loaded after the session started.
```

Procedure:

1. Close the current client session.
2. Open a new session at the repository root.
3. Use the client default mode unless client documentation requires another mode.
4. Submit the prompt.
5. Record automatic discovery separately from manual loading and from invocation.
6. Repeat for every selected client.

**Interpretation rules.** Distinguish four separate concepts when judging the result:
(1) automatic instruction/catalog/profile discovery — root instructions, agent roster,
skill catalog loaded without being told to; (2) explicit agent or skill
activation/invocation; (3) normal manual reading of relevant repository evidence during
task execution, which is expected task behavior, not a discovery failure; (4) prohibited
manual injection of resources the client did not discover on its own. A session fails
automatic discovery only when (1) did not happen or the operator had to perform (4). Do not
fail a session merely because it exhibited (3), and do not front-load project documentation
into the prompt merely to force a PASS — that is itself (4). Report invocation (2)
separately; a client that judges direct read-only analysis sufficient and never formally
invokes an agent or skill has not failed discovery.

**Allowed modifications:** none — read-only, and the prompt forbids file modification.

**Approval gate:** none — read-only, and the prompt forbids file modification.

**Validation:** PASS per client under the interpretation rules above.

Reference status — evidence from the reference run, not a claim about your repository:

| Client | Status |
|---|---|
| Kiro | Validated |
| Claude | Validated |
| Other selected clients | Pending live validation |

**Evidence to record:** run-log `ADOPT-15`, once per client — client, mode, root
instructions, agent, skills, docs, CodeGraph, manual loading, primary risk, files modified,
result.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md), "Filesystem validation
passes but runtime discovery fails".

---

**Next:** [`07-baseline-and-checkpoint.md`](07-baseline-and-checkpoint.md).
