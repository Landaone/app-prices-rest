# Group 11 Report — The Codex Recipe's Pass Through the Selected-Client Gate

> **Scope (design D-Q).** The gate is **canonical and client-agnostic**: official-documentation
> discovery → isolated scratch repository → fresh-session discovery-and-execution test. Claude,
> Kiro, and Codex are peer recipes answering to the same gate. This report is the **Codex recipe's
> evidence**, never the definition of the gate.
>
> The verdict below is a statement about the **recipe**, not about any adoption. Per-adoption
> effect depends on selection: a run that declares Codex `SELECTED` is **blocked** by this
> `PENDING EVIDENCE`; a run that does not select Codex records it **`NOT SELECTED`** — nothing
> provisioned, nothing validated, no blocking effect — and never as `PENDING EVIDENCE`.

- Date: 2026-08-12
- Authorization for read-only external research: **granted by the user**, recorded per
  `00-conventions.md` §Scope boundaries (task 11.1)

## VERDICT: `PENDING EVIDENCE` — **not** PASS

The candidate mechanism is now **confirmed by official documentation** and built to spec in an
isolated repository. It is **not verified**: no fresh Codex session was started during
implementation, so neither discovery nor execution was observed. The `codex` CLI was absent from
`PATH`, which is **not** evidence the client is unavailable — Codex Desktop is a valid host for
part 3. The verdict is "not observed", never "unavailable".

Per the gate's own classification rule, if any of its three tasks cannot be completed or verified,
Codex is recorded `unavailable` or `PENDING EVIDENCE` — **never PASS, never quietly omitted**.
Documentation is not discovery, and discovery is not execution.

| Task | Status |
|---|---|
| 11.1 Authorization for external research | **COMPLETE** — granted |
| 11.2 Official-documentation discovery | **COMPLETE** — mechanism confirmed |
| 11.3 Isolated scratch-repository construction | **COMPLETE** — built, conformant, isolated |
| 11.4 Fresh-session execution test | **NOT PERFORMED** — Codex not installed on this machine |
| 11.5 Record the verdict | **COMPLETE** — this report |
| 11.6 Reconcile artifacts to the verdict | **COMPLETE** |

## 11.2 — What the official documentation establishes

**Sources consulted (official only), 2026-08-12:**

| Source | Establishes |
|---|---|
| https://learn.chatgpt.com/docs/customization/overview (from `developers.openai.com/codex/concepts/customization`, 308 redirect) | the personal/repository scope split |
| https://learn.chatgpt.com/docs/build-skills.md (from `developers.openai.com/codex/skills.md`, 308 redirect) | scan path, required structure, discovery vs. loading |
| https://developers.openai.com/codex/guides/agents-md | `AGENTS.md` project-instruction chain and precedence |

No unofficial source was used for any conclusion. Nothing was installed or downloaded, no
credentials were touched, and no model, reasoning, permission-mode, or execution-mode setting was
modified.

**Verbatim findings:**

> "Codex scans `.agents/skills` in every directory from your current working directory up to the
> repository root."

> Skills can be "global (in your user directory, for you as a developer) or repo-specific (checked
> into `.agents/skills`, for your team)."

> "The `SKILL.md` file must include `name` and `description`."

> "ChatGPT and Codex start with each skill's name and description, then load the full `SKILL.md`
> instructions when they decide to use that skill." — discovery is capped at "at most 2% of the
> model's context window, or 8,000 characters when the context window is unknown", and "when Codex
> selects a skill, it still reads the full SKILL.md instructions for that skill."

### This materially upgrades the candidate's standing

The enriched work item recorded that `writing-skills` documents **only** `~/.agents/skills/` — a
personal, home-directory location outside repository scope — and that the project-scoped form was
therefore an inference requiring verification.

**Official documentation now confirms the project-scoped form exists and names the exact path this
change guessed: `.agents/skills`.** The design's candidate path
`.agents/skills/specboot-adopt/SKILL.md` matches the documented contract exactly, including the
directory-per-skill layout and the `name`/`description` frontmatter.

**That resolves the mechanism question. It does not resolve the gate.** The gate exists to prove a
fresh session *actually* surfaces and *executes* the skill in a real repository — behaviour that
documentation predicts but does not evidence.

## 11.3 — Isolated scratch repository

Built at a scratchpad path **outside** the adopting repository, and verified as such
programmatically before anything was written:

```
codex-gate-repo/
  AGENTS.md
  .agents/skills/specboot-adopt/SKILL.md
  .agents/skills/specboot-adopt/references/{5 files}
```

No artifact from this experiment exists inside
`/Users/landaeta/repos/labs/app-prices-rest-specboot-claude-v1`.

**Conformance to the documented contract:**

| Requirement | Result |
|---|---|
| `.agents/skills` scan path | PRESENT |
| directory-per-skill containing `SKILL.md` | PRESENT |
| frontmatter `name` | `specboot-adopt` |
| frontmatter `description` | 278 chars, trigger-only, starts "Use when" |
| name + description within the discovery budget | 292 chars — well inside 8,000 |

## 11.4 — Why the fresh-session test was not performed

```
$ command -v codex
(not found)
```

Codex is not installed on this machine, so a genuinely fresh Codex session cannot be started from
this session. This is a **fresh-session requirement**, which the contract handles by explicit
stop-and-hand-off — the orchestrator never simulates, assumes, or claims a session it did not
observe.

## Consolidated handoff prompt for the external Codex session

Run this **once**, in a genuinely fresh Codex session, started **inside the scratch repository**
with the skill already present at session start.

> **Repository path:**
> `/private/tmp/claude-501/-Users-landaeta-repos-labs-app-prices-rest-specboot-claude-v1/ae39addd-203d-43ca-986f-cca161748a86/scratchpad/codex-gate-repo`
>
> **Candidate path under test:** `.agents/skills/specboot-adopt/SKILL.md`
>
> **Start a brand-new Codex session with that directory as the working directory. Do not paste the
> skill, do not open the file first, and do not name the path in your first message.**
>
> **Check 1 — discovery.** Ask: *"What skills are available in this repository?"*
> PASS only if `specboot-adopt` is listed **without** you having supplied its path.
>
> **Check 2 — execution.** In the same fresh session ask: *"I need to adopt SpecBoot into this
> repository. What are your non-negotiables, and what is the first thing you do?"*
> PASS only if the reply reflects the skill's **canonical content** — specifically that it reads
> the run log's step-state table and names the next step first, and that a code-graph capability is
> mandatory with no waiver. A generic answer that does not reflect the skill body is a FAIL.
>
> **Evidence format** — record verbatim, into `reports/codex-discovery-gate.md`:
> Codex version · session start confirmation (fresh, not resumed) · the exact prompts used · the
> verbatim replies · a PASS/FAIL per check.
>
> **Stopping condition.** Both checks PASS → Codex may be recorded **supported**. Either check
> fails, or cannot be run → Codex stays `PENDING EVIDENCE` or `unavailable`. **Never record PASS
> from the file merely existing on disk.** Presence is not discovery; discovery is not execution.

## 11.6 — Artifact reconciliation

Every artifact reporting client support has been reconciled to this verdict:

| Artifact | State |
|---|---|
| `specboot-adoption/bootstrap-kit/discovery/codex.md` | `PENDING EVIDENCE`; candidate now documented-confirmed, gate still open |
| `specboot-adoption/bootstrap-kit/manifest.json` | `clientSupport.codex: "PENDING EVIDENCE"` |
| `ai-specs/skills/specboot-adopt/references/portability-matrix.md` | Codex listed, unverified |
| `openspec/.../specs/specboot-adoption-orchestration/spec.md` | requirement unchanged — it already forbids claiming Codex without the gate |

No artifact claims Codex support. `ADOPT-18` removes any Codex artifact left unverified, exactly as
it removes artifacts for a client that was never selected.
