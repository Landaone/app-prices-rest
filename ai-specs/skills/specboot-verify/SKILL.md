---
name: specboot-verify
description: Verify an OpenSpec change's implementation against its artifacts before it becomes eligible for adversarial review. Use before requesting adversarial review, or when the user asks to verify, check, or validate a change. Verification PASS does NOT permit archive approval by itself.
author: LIDR.co
version: 1.1.0
---

# specboot-verify Skill

Verify that an implementation matches its OpenSpec change artifacts (proposal, specs, design, tasks). A PASS here makes the change **eligible for independent adversarial review** — nothing more. Archive approval is a separate, later gate that also requires an adversarial-review PASS and explicit human approval; this skill never grants it.

This skill is **client-neutral and canonical**, invoked as `/specboot-verify` on both currently selected clients: Claude reaches it directly through its own skill registration at `.claude/skills/specboot-verify` (no separate command file — no adapter is needed there); Kiro reaches it through the thin delegating adapter `.kiro/prompts/specboot-verify.prompt.md`. Any adapter file MUST delegate here rather than duplicating this logic — the report format, severity taxonomy, and gate rules below are canonical and live only in this file.

Adapted from the OpenSpec 1.3.1 `openspec-verify-change` skill (found in the historical `AI4Devs-LTI-extended` adoption). That skill's report structure is reused as a starting point; its data-gathering step is rewritten below against the OpenSpec 1.7 CLI's actual `status` JSON shape, since the 1.3.1 skill's `instructions apply --json` → `contextFiles` map assumption is not how 1.7 exposes this data. This skill calls `openspec status --change <name> --json` only — it does not call `openspec instructions ...` for anything.

## Inputs

- Optionally, a change name (e.g. `add-auth`). If omitted, infer from conversation context.
- If no change name is given or inferable, run `openspec list --json` and ask the user to select one (never guess).

## Step 1 — Resolve the change and load status

```bash
openspec status --change "<name>" --json
```

Real exit status is authoritative: if this command fails to execute, exits non-zero, or returns invalid JSON, the result is **FAIL** — do not infer a PASS or skip the check silently. From the JSON, read:

- `schemaName` — the workflow schema in use
- `artifactPaths.<artifact>.existingOutputPaths` — the actual file(s) written for `proposal`, `specs`, `design`, `tasks` (use this list directly; do not infer paths, and do not assume the 1.3.1 `contextFiles` shape)
- `artifacts` — each artifact's `status` (`done`, `blocked`, `ready`, `skipped`)

Read every file named in `existingOutputPaths` for each artifact that exists.

## Step 2 — Verify Completeness

**Task completion** (if `artifactPaths.tasks.existingOutputPaths` is non-empty):
- Read the tasks file(s). Parse `- [ ]` (incomplete) vs `- [x]` (complete) with a deterministic count (e.g. `grep -c`), not a manual read-through estimate.
- Every incomplete task is a **Blocker** finding: "Incomplete task: `<task text>`".

**Spec coverage** (if `artifactPaths.specs.existingOutputPaths` is non-empty):
- Extract every `### Requirement:` from each delta spec file.
- For each, search the codebase for evidence of implementation.
- An apparently-unimplemented requirement is a **Blocker** finding: "Requirement not found: `<requirement name>`".

## Step 3 — Verify Correctness

**Requirement-to-implementation mapping**: for each requirement in the delta specs, note the file(s)/line(s) that implement it (if found) and assess whether the implementation matches the requirement's intent. A mismatch is a **Major** finding: "Implementation may diverge from spec: `<detail>`", with a `file:line` reference.

**Scenario coverage**: for each `#### Scenario:` in the delta specs, check whether the condition is handled and, where applicable, tested. An uncovered scenario is a **Major** finding: "Scenario not covered: `<scenario name>`".

## Step 4 — Verify Coherence

**Design adherence** (if `artifactPaths.design.existingOutputPaths` is non-empty): extract key decisions from `design.md` and check the implementation follows them, and that `design.md` itself makes no factual claim about the implementation that the implementation doesn't actually do (e.g. a claimed command call that isn't in the code). A contradiction either way is a **Major** finding: "Design decision not followed" or "Design claims behavior the implementation does not have: `<detail>`". If there is no `design.md`, skip this check and note it was skipped.

**Code pattern consistency**: check new code against this repo's existing conventions (naming, file layout, style). A significant deviation is a **Minor** finding.

## Step 5 — Required workflow capability availability (per selected client)

Derive the selected-client roster from what actually exists in the repo — check for `.claude/`, `.kiro/`, `.cursor/`, `.codex/` (or equivalent) at the repo root. Do not hardcode "Claude and Kiro"; re-derive every run.

For each of the **six** required workflow capabilities, in sequence — `enrich-us`, `propose`, `apply`, `specboot-verify`, `adversarial-review`, `archive` (with its built-in sync) — confirm, for **every currently selected client**, that a corresponding command, skill, or adapter file exists, and record that client's **exact native invocation string** (e.g. Claude: `enrich-us` skill, `/opsx:propose`, `/opsx:apply`, `/specboot-verify`, `/opsx:archive`; Kiro: `enrich-us` skill, `/opsx-propose`, `/opsx-apply`, `/specboot-verify`, `/opsx-archive`; `adversarial-review` and `enrich-us` are skills invoked by description match on both clients, not slash commands).

- A capability missing for any selected client is a **Blocker** finding: "Capability `<capability>` missing for client `<client>`".
- Clients are **not** required to expose an identical command name for the same capability — differing invocation syntax across clients for a capability (e.g. `/opsx:propose` vs `/opsx-propose`) is not itself a finding.
- Jira is **not** part of this matrix. Do not validate, require, or report on Jira availability — Phase-1 `enrich-us` is self-contained and Jira-free by design.
- **This check is availability, not provenance.** Capability availability is determined by inspecting the current repository filesystem only — does the path exist and resolve, right now. A PASS means the required capability paths currently exist and resolve for the selected client. A PASS does **not** assert, and must never be reported or read as asserting, which installer, person, or process created those paths — a client's paths can be valid and fully available whether they were provisioned by `packages/specboot/bin/init.js`, hand-configured, or created by some other adoption step. Installer-provenance validation (proving *how* a path came to exist) is a separate, unimplemented concern this check does not attempt.

## Step 6 — Adapter placement safety (only when verifying this change or any change that adds a client adapter)

Using only already-installed, already-documented, read-only commands (no install/download/upgrade):

```bash
openspec --help
openspec init --help
openspec update --help
openspec doctor --json
```

And inspect the installed OpenSpec package's own `README.md` (locate via `npm root -g`). Confirm the adapter's path and name (e.g. `.kiro/prompts/specboot-verify.prompt.md`, the `specboot-verify` skill name used under `.claude/skills/` and `.kiro/skills/`) does not match any path or name these sources document OpenSpec's CLI as generating. A match is a **Blocker** finding: "Adapter `<path>` collides with an OpenSpec-generated path/name — rename or relocate before proceeding."

## Verified shell-execution rules (apply to every command run in this skill)

- An unexecuted or failed command is **never** recorded as PASS. If a command cannot run, the check it belongs to is FAIL.
- When a command's output is piped into another command, the result reflects the **original** command's exit status, not the exit status of the last stage in the pipeline (e.g. capture and check `PIPESTATUS[0]`/`pipefail`, not the pipe's overall status alone).
- `npx --yes` (or any equivalent auto-confirm installer) must **never** be used as a fallback when a tool is missing. Report the missing tool and stop that check instead.
- Shell-specific list/word-splitting behavior must not be assumed portable — do not write loops over unquoted, space-separated variables; use explicit per-item commands or a shell-native array.
- An expected non-zero result from a `diff`-style comparison (e.g. comparing a delta spec against a main spec, or a template against its distributed copy) is evaluated by its **content**, not auto-marked FAIL merely because the comparison command exited non-zero.

## Severity taxonomy and the next-gate rule

Findings use exactly three severities — **Blocker**, **Major**, **Minor**. Do not introduce or report an alternative taxonomy (e.g. CRITICAL/WARNING/SUGGESTION) alongside or instead of these three.

- **Blocker** — incomplete tasks, missing requirement implementations, missing required workflow capability for any selected client, adapter placement collisions.
- **Major** — spec/implementation divergence, uncovered scenarios, design decisions not followed (or design claiming behavior the implementation lacks).
- **Minor** — code-pattern deviations and similarly low-risk items.

**Verdict (exactly one applies):**
- Any Blocker or Major finding → **FAIL**
- Only Minor findings (zero Blocker, zero Major) → **PASS WITH GAPS**
- No findings at all → **PASS**

**This verdict governs eligibility for the next gate only — it never grants archive approval.** PASS or PASS WITH GAPS makes the change **eligible to proceed to independent adversarial review** — nothing more. Archive approval remains prohibited regardless of this skill's verdict, until adversarial review separately reaches its own PASS/PASS WITH GAPS **and** explicit human approval is given. A FAIL here blocks even requesting adversarial review: findings must be corrected and verification re-run — in a fresh session, consistent with the workflow's independent-review requirement — before proceeding.

This gate is enforced entirely by documented workflow instructions and by whoever is asked to grant the next step — it is **not** a code change to, and does **not** technically block, the installed, OpenSpec-generated archive command for either selected client (`/opsx:archive` for Claude, `/opsx-archive` for Kiro). Both remain unmodified and, per their own guardrails ("Don't block archive on warnings - just inform and confirm" — exact quote, plain hyphen), will still run if invoked directly regardless of this skill's verdict — the gate only works if this skill's result is honored by the human/agent before the next step is requested.

## Generate Verification Report

```markdown
## Verification Report: <change-name>

### Summary
| Dimension    | Status              |
|--------------|---------------------|
| Completeness | X/Y tasks, N reqs    |
| Correctness  | M/N reqs covered     |
| Coherence    | Followed/Issues      |
| Capability availability | OK / N missing |
| Adapter placement safety | OK / N collisions (only if applicable) |
| Provenance recorded | PASS/FAIL |

### Findings

| Severity | Area | Finding | Evidence | Suggested fix |
|----------|------|---------|----------|----------------|
| Blocker / Major / Minor | | | | |

### Execution provenance

- **Client**: <Claude / Kiro / other>
- **Session lifecycle**: <fresh client start | window/session reload | new chat only, no reload | resumed session>
- **Active agent or mode**: <name/mode actually reported by the client, or "not exposed by client">
- **Agents/subagents actually invoked**: <list, or "None">
- **Canonical verification skill invoked**: <confirmed — `ai-specs/skills/specboot-verify/SKILL.md` was read/executed this run | not confirmed>
- **Client adapter/invocation used**: <exact string actually typed/triggered — for this skill itself, `/specboot-verify` on either client>
- **Other skills actually invoked**: <list, or "None">
- **MCP servers/integrations actually used**: <list, or "None">
- **Repository instruction files loaded automatically**: <list what the client itself surfaced without being asked, or "not observed"/"not exposed by client">
- **Resources opened manually**: <list files read by explicit tool call in this session>
- **Evidence classification for this client**: <live runtime (the invocation actually executed) | static filesystem/naming validation only (files inspected, invocation not executed) | not validated>

### Verdict
PASS | PASS WITH GAPS | **FAIL**

### Next gate
- PASS or PASS WITH GAPS → "Next gate: independent adversarial review. Archive approval is NOT yet permitted."
- FAIL → "Next gate blocked. Correct findings and rerun verification in a fresh session."
```

## Guardrails

- Prefer Minor over Major, Major over Blocker, when uncertain — false positives should degrade towards the lower severity, not the higher one.
- Every finding needs a specific, actionable recommendation with a `file:line` reference where applicable. No vague "consider reviewing."
- If only `tasks.md` exists, verify task completion only and note the other checks were skipped because their artifacts don't exist. If specs also exist, add correctness. If design also exists, add coherence. Always state which checks ran and which were skipped, and why.
- Never claim a command executed, or a file exists, without having actually run/read it in this session.
- **Provenance is mandatory, not optional.** Never omit the Execution provenance section, and never leave a field blank — use "None" or "not observed"/"not exposed by client" instead.
- Do not list an agent, subagent, or skill as invoked merely because it appeared in a catalog, system listing, or "available skills" reminder — report it only if it was actually called in this session.
- Distinguish three different things and never conflate them: automatic discovery (the client surfaced something without being asked), explicit invocation (a skill/agent/command was actually called), and manual reading (a file was opened by an explicit tool call, not discovered).
- Do not infer or guess a model name or identity the client does not itself expose.
- Classify per-client evidence honestly: a client whose files were only inspected (no live invocation actually executed) gets "static filesystem/naming validation only", never "live runtime" — even when the files look correct.
- This report format, its severity taxonomy, and its gate logic are canonical and live only here. The Kiro adapter (`.kiro/prompts/specboot-verify.prompt.md`) must delegate to this skill and must never duplicate or restate this logic; Claude has no separate adapter file and reaches this skill directly through `.claude/skills/specboot-verify`.
