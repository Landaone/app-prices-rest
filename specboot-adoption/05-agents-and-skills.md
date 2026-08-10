# Phase 5 — Canonical Agents and Skills

Read [`00-conventions.md`](00-conventions.md) first.

Steps: `ADOPT-09`, `ADOPT-10`, `ADOPT-11`, `ADOPT-12`. Formerly sections 9–12. Each adapt
step is followed immediately by its read-only validation step; they are executed as a pair.

Reference-run outcomes for these steps — what the Java/Maven reference repository actually
produced — are in
[`history/reference-run-java-maven.md`](history/reference-run-java-maven.md). They are
evidence, not expectations for your repository.

---

## `ADOPT-09` — Inspect and Adapt Agents

**Condition:** always

**Purpose:** Ensure canonical agents match the work types and technology families present
without overwriting agents for other stacks.

**Preconditions:** `ADOPT-08` = PASS

**Action:**

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Inspect, adapt, and validate the canonical agents for this repository.

Use CodeGraph when available. Read the repository build configuration, source structure, `docs/`, existing OpenSpec configuration, and every agent under `ai-specs/agents/`.

Requirements:
- Keep `ai-specs/agents/` as the canonical, client-neutral agent source.
- Preserve all existing agents intended for other languages, frameworks, clients, or work types, including technology-agnostic product or strategy agents; do not reject an agent merely because it is not a programming-stack agent — judge it by its work type.
- Do not overwrite or repurpose an unrelated agent.
- Validate every existing agent's frontmatter with a strict YAML parser before adapting agents. When frontmatter is invalid only because an unquoted description scalar contains YAML-sensitive text (for example embedded `Context:`, `user:`, or `assistant:` patterns), repair only the YAML representation (convert to a block scalar) while preserving the description text, metadata, and body exactly.
- Determine which technology stacks and work types are actually present from repository evidence, not from a hardcoded filename.
- Reuse an existing agent when its validated description and scope appropriately cover the work.
- Create a new stack-specific agent only when no existing validated agent covers a detected technology family or work type; treat creation as explicitly conditional and optional, never a default step.
- A new agent must remain reusable for its technology family rather than hard-code this repository's domain, architecture, frameworks, build tool, database, or package names.
- The agent must read the relevant repository documentation at task time to obtain project-specific details.
- Give a newly created agent portable, client-neutral frontmatter only; do not embed Claude/Kiro model names, tool allowlists, colors, MCP identifiers, or other client-only metadata unless the canonical format demonstrably requires it.
- Any reusable example in a newly created agent must be domain-neutral: it must not leak this repository's entities, fields, controllers, repositories, business domain, package names, or an unrelated imported template's domain.
- Reference only documentation files that actually exist.
- Update the agent-selection portion of OpenSpec configuration only after the selected or newly created agent has passed the validation checks below; replace an obsolete selection rather than appending a contradictory one.
- Do not create client adapters in this step.

Allowed modifications:
- `ai-specs/agents/`, limited to creating a new agent when required and representation-only frontmatter repairs;
- the agent-selection portion of `openspec/config.yaml` or `openspec/config.yml`, only when required.

Validation:
- strict YAML parsing succeeds for every file under `ai-specs/agents/`;
- every selected agent exists;
- frontmatter is valid;
- description matches its technology family or work type;
- unrelated agents remain unchanged;
- a newly created agent is client-neutral, domain-neutral, and free of repository-specific assumptions;
- project-specific details are read from `docs/`;
- every referenced documentation path exists;
- OpenSpec selects an existing canonical agent;
- no client adapter is treated as canonical.

Report:
- detected stacks and work types;
- agents inspected and strict frontmatter results;
- representation-only frontmatter repairs;
- agents preserved;
- agents created or adapted, and why;
- evidence that any new agent is client-neutral and domain-neutral;
- OpenSpec selection changes;
- files modified;
- PASS or FAIL for every validation;
- remaining risks.

Stop after the canonical agents and selection references validate. Do not create client adapters.
```

**Approval gate:** creating a new agent is explicitly conditional and optional, never a
default step. **[HUMAN APPROVAL REQUIRED]** before removing or replacing an existing agent.

**Validation:** the prompt's own validation list. Then run `ADOPT-10`.

**Evidence to record:** run-log `ADOPT-09` — detected stacks, existing agents, agents
preserved, agents created, agents modified, OpenSpec selection, corrections, result.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md), "Agent overwrites
another stack, or a new agent is too narrow" and "Agent is too project-specific, or its
examples leak this repository's domain".

---

## `ADOPT-10` — Validate Agents

**Condition:** always

**Purpose:** Perform a read-only verification of canonical agents and OpenSpec selection.

**Preconditions:** `ADOPT-09` = PASS

**Action:**

```bash
find ai-specs/agents -maxdepth 1 -type f -name '*.md' -print
grep -R "ai-specs/agents" openspec 2>/dev/null
git diff -- ai-specs/agents openspec/config.yaml openspec/config.yml 2>/dev/null
```

**Approval gate:** none — read-only.

**Validation:** PASS criteria:

- Selected agent exists under `ai-specs/agents/`.
- Frontmatter is valid.
- Description matches the intended technology family or work type.
- Unrelated agents remain present.
- Project-specific details are not unnecessarily duplicated.
- Referenced documentation exists.
- OpenSpec selects an existing canonical agent.
- Client adapters are not canonical sources.

**Evidence to record:** run-log `ADOPT-10` — agent, frontmatter, description, referenced
docs, OpenSpec selection, unrelated agents preserved, adapter not canonical, result.

**On failure:** recovery is owned by **another step** (contract form C, see
[`00-conventions.md`](00-conventions.md)): return to `ADOPT-09` and correct there, then rerun
this step in full. That is the documented recovery — it is not an undocumented failure.

---

## `ADOPT-11` — Inspect and Adapt Skills

**Condition:** always

**Purpose:** Ensure canonical skills detect the repository stack rather than assuming a
specific ecosystem.

**Preconditions:** `ADOPT-10` = PASS

**Action:**

`CANONICAL CONSOLIDATED PROMPT — DERIVED FROM EXECUTED PROMPTS AND CORRECTIONS`

```text
Inspect, adapt, and validate the canonical skills for this repository.

Use CodeGraph when available. Read the repository documentation, build configuration, test configuration, and every skill under `ai-specs/skills/`.

Requirements:
- Keep `ai-specs/skills/` as the canonical shared skill source.
- Preserve skills that are already technology-agnostic or correctly detect the repository stack.
- Adapt only skills whose assumptions would select incorrect tools, commands, languages, build systems, or workflows.
- Detect languages, build systems, test tools, linters, static-analysis tools, and repository conventions from files that actually exist.
- Make technology-specific commands conditional.
- Detect existing tooling first, and use only tools and dependencies already configured by the repository's normal build or dependency workflow; do not install or download an undeclared tool merely to perform inspection, and distinguish resolving a dependency the project already declares (allowed) from introducing a new, undeclared dependency merely to satisfy a skill (not allowed).
- External web, GitHub, or package-registry research requires explicit user authorization before it is performed.
- Do not modify client-specific OpenSpec-generated skill directories.
- Do not copy client-generated skills into the canonical shared source.
- Do not create client adapters in this step.

Allowed modifications:
- files under `ai-specs/skills/` only.

Validation:
- every canonical skill has its required entry file;
- supporting resources exist;
- referenced paths resolve;
- stack-aware skills derive commands from repository configuration;
- technology-specific checks are conditional;
- no undeclared tool or dependency is required;
- no generated client directory is confused with a canonical skill;
- shared skills remain suitable for the selected AI clients;
- independent validation treats any unexecuted or failed command as FAIL, never an inferred PASS from empty output.

Report:
- skills inspected;
- assumptions found;
- skills preserved;
- skills adapted and why;
- files modified;
- blockers versus optional improvements;
- PASS or FAIL for every validation.

Stop after presenting the complete skill validation evidence.
```

**Approval gate:** none beyond the edit being reviewable; modifications are limited to
`ai-specs/skills/`. External web, GitHub, or package-registry research requires explicit
user authorization first.

**Validation:** the prompt's own validation list. Then run `ADOPT-12`.

**Evidence to record:** run-log `ADOPT-11` — skills found, skills preserved, skills adapted,
assumptions, new dependencies, corrections, result.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md), "Skill assumes the
wrong ecosystem".

---

## `ADOPT-12` — Validate Skills

**Condition:** always

**Purpose:** Verify canonical skill structure, resources, stack detection, and dependency
safety.

**Preconditions:** `ADOPT-11` = PASS

**Action:**

```bash
find ai-specs/skills -mindepth 1 -maxdepth 2 -type f -print
find ai-specs/skills -type l -print -exec readlink {} \;
git diff -- ai-specs/skills
```

Run these with absolute executable paths when a shell alias or function could shadow the
real tool; treat an unexecuted or failed command as FAIL, never an inferred PASS from empty
output.

**Approval gate:** none — read-only.

**Validation:** PASS criteria:

- Every canonical skill exists.
- Expected entry file exists.
- Supporting resources resolve.
- Stack-aware skills inspect repository configuration.
- Technology-specific commands are conditional.
- No undeclared dependency is required.
- Client-generated OpenSpec skills are not copied into canonical shared skills.
- Shared skills are suitable for selected clients.

**Evidence to record:** run-log `ADOPT-12` — canonical skill count, missing entry files,
missing resources, unconditional stack assumptions, undeclared dependencies,
generated-client content confused with canonical, result.

**On failure:** see [`22-troubleshooting.md`](22-troubleshooting.md), "OpenSpec-generated
skill directories replaced by symlinks".

---

**Next:** [`06-adapters-and-discovery.md`](06-adapters-and-discovery.md).
