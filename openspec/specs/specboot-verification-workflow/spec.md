# specboot-verification-workflow Specification

## Purpose
Defines the mandatory pre-archive verification sequence for SpecBoot/OpenSpec changes in this repository as two separate, sequential gates (verify → adversarial review → human approval → archive), the behavior the canonical, SpecBoot-owned verify skill must exhibit, the reviewer-provenance, execution-provenance, shell-execution-integrity, capability-availability, and adapter-placement-safety rules that make its result trustworthy without touching any OpenSpec-generated file, its coexistence policy with OpenSpec's own official (machine-global, optionally enabled) `/opsx:verify` workflow, `adversarial-review`'s own deterministic verdict mapping, and the accuracy of live workflow documentation across this repository's root and `docs/` locations. It also defines the mandatory pre-proposal refinement gate (`enrich-us`), its Jira-free Phase-1 input model, the enriched-artifact handoff into OpenSpec proposal generation, the six-capability workflow-availability matrix, portable installer/documentation guidance for the full sequence, and the distinction between a capability's current filesystem availability and its provisioning by the SpecBoot npm installer.
## Requirements
### Requirement: Mandatory pre-archive sequence
The system SHALL require the sequence apply complete → SpecBoot verify PASS → independent adversarial review PASS → explicit human approval → archive (using the archive command's own built-in sync-then-archive path) → post-archive strict validation, for any change before it is considered fully closed, and SHALL NOT provide a documented path that skips a stage of this sequence. The sequence SHALL NOT require a separate sync operation immediately before an archive operation that already performs sync and re-verifies delta/main-spec equivalence internally.

#### Scenario: Change reaches archive readiness
- **WHEN** a change has all tasks marked complete
- **THEN** the documented workflow requires running SpecBoot verify and obtaining a PASS, then an independent adversarial review with a PASS verdict, then explicit human approval, then archiving via the selected client's own built-in sync-then-archive path (`/opsx:archive` for Claude, `/opsx-archive` for Kiro — confirmed behaviorally identical for both), then running `openspec validate --strict` after the move

#### Scenario: A stage is skipped
- **WHEN** a change attempts to move from apply directly to archive without a recorded SpecBoot verify PASS
- **THEN** the documented workflow treats this as a violation of the mandatory sequence, not an accepted shortcut

#### Scenario: Redundant sync avoided
- **WHEN** a change is ready to archive and the selected client's own archive command (`/opsx:archive` for Claude, `/opsx-archive` for Kiro) performs its own sync-then-verify step internally before moving the change
- **THEN** the documented workflow does not instruct running a separate sync command immediately beforehand, and instead treats archive's own internal sync-and-equivalence-check as satisfying that stage of the sequence

### Requirement: Verification severity gate and next-gate eligibility
SpecBoot verify and `adversarial-review` SHALL each use exactly the severities Blocker, Major, and Minor (SpecBoot verify) or Blocker, Major, Minor, and Question/assumption (`adversarial-review`) — no alternative severity system (for example CRITICAL/WARNING/SUGGESTION) SHALL be used alongside or instead of these. Each skill SHALL treat any Blocker or Major finding it raises as an unambiguous FAIL for its own verdict. SpecBoot verify and `adversarial-review` gate two **separate, sequential** steps, not one combined gate: a SpecBoot verify PASS or PASS WITH GAPS (zero Blocker/Major findings) SHALL make the change eligible for independent adversarial review ONLY — it SHALL NOT, by itself, permit requesting or granting archive approval. Archive approval SHALL additionally require `adversarial-review` to reach its own PASS or PASS WITH GAPS verdict, plus explicit human approval. Both gates SHALL be implemented as documented workflow guidance; neither SHALL be represented as a technical modification of the installed, OpenSpec-generated archive command, which remains unmodified and functionally unaffected by either gate.

#### Scenario: Verify Blocker or Major finding recorded
- **WHEN** SpecBoot verify records at least one Blocker or Major finding
- **THEN** its verdict is FAIL, and its report states that findings must be corrected and verification re-run (in a fresh session) before requesting independent adversarial review

#### Scenario: Verify has only Minor findings
- **WHEN** SpecBoot verify records only Minor findings, with zero Blocker or Major findings
- **THEN** its verdict is PASS WITH GAPS, and its report states the change is eligible for independent adversarial review

#### Scenario: Verify has no findings
- **WHEN** SpecBoot verify records no findings at all
- **THEN** its verdict is PASS, and its report states the change is eligible for independent adversarial review

#### Scenario: Verification PASS enables adversarial review only, not archive approval
- **WHEN** SpecBoot verify reaches PASS or PASS WITH GAPS
- **THEN** its report explicitly states the change is eligible for independent adversarial review, and explicitly states that archive approval is **not yet permitted** — it never states or implies that archive approval may now be requested

#### Scenario: Archive approval requires both gates plus human approval
- **WHEN** both SpecBoot verify and `adversarial-review` have separately reached PASS or PASS WITH GAPS for the same change
- **THEN** the documented workflow states that explicit human approval is still additionally required before archive approval may be requested or granted — passing both automated gates is necessary but not sufficient

#### Scenario: Adversarial-review PASS alone does not grant archive approval
- **WHEN** `adversarial-review` reaches PASS or PASS WITH GAPS
- **THEN** its own output does not state or imply that archive approval may now be requested or granted on that basis alone — explicit human approval remains independently required, symmetric to how a SpecBoot verify PASS alone does not grant archive approval either

#### Scenario: Adversarial-review Blocker or Major finding recorded
- **WHEN** `adversarial-review` records at least one Blocker or Major finding
- **THEN** its verdict is FAIL, and the workflow instructions state that archive approval must not be requested or granted while the finding is open

#### Scenario: Gate is procedural, not technical
- **WHEN** a Blocker or Major finding exists in either skill and someone nonetheless runs the selected client's archive command (`/opsx:archive` for Claude, `/opsx-archive` for Kiro)
- **THEN** the installed archive command itself does not refuse to run — the gate depends entirely on the documented workflow and human discipline, and the workflow instructions explicitly state this distinction so the gate is never mistaken for a code-level block

### Requirement: Adversarial-review deterministic verdict mapping
The `adversarial-review` skill SHALL map its findings to a verdict deterministically and exhaustively over every finding category that can appear in its Findings table — Blocker, Major, Minor, and `Question / assumption` — without introducing a fourth severity: any Blocker or Major finding SHALL produce verdict FAIL; otherwise, any Minor finding OR any unresolved `Question / assumption` finding SHALL produce verdict PASS WITH GAPS; only when no findings of any category remain in the table SHALL the verdict be PASS. This mapping SHALL be unambiguous and checkable, not left to informal, unstructured description, and SHALL NOT have any combination of finding categories that falls outside its three branches. An open Blocker or Major finding SHALL block archive eligibility exactly as it blocks `adversarial-review`'s own verdict from being PASS or PASS WITH GAPS — a review report SHALL NOT record a verdict of PASS or PASS WITH GAPS while a Blocker or Major finding remains open. A `Question / assumption` row SHALL be removed from the final Findings table only when it was actually investigated and resolved with recorded evidence during the read-only review itself; it SHALL NOT be silently treated as resolved, or silently omitted, without that evidence being recorded.

#### Scenario: Any Blocker or Major produces FAIL
- **WHEN** `adversarial-review` records at least one Blocker or Major finding, regardless of how many Minor findings or questions/assumptions also exist
- **THEN** the recorded verdict is FAIL, never PASS or PASS WITH GAPS

#### Scenario: Only Minor findings produce PASS WITH GAPS
- **WHEN** `adversarial-review` records one or more Minor findings and zero Blocker or Major findings
- **THEN** the recorded verdict is PASS WITH GAPS

#### Scenario: No findings produce PASS
- **WHEN** `adversarial-review` records no findings of any severity
- **THEN** the recorded verdict is PASS

#### Scenario: Open Blocker or Major blocks archive eligibility
- **WHEN** a Blocker or Major finding is open (unresolved) at the time a verdict is recorded
- **THEN** the change is not archive-eligible on the basis of that review, and the verdict recorded reflects this (FAIL) rather than a PASS-family verdict that would imply otherwise

#### Scenario: Question/assumption-only findings produce PASS WITH GAPS
- **WHEN** `adversarial-review`'s Findings table contains one or more unresolved `Question / assumption` rows and zero Blocker, Major, or Minor findings
- **THEN** the recorded verdict is PASS WITH GAPS, never PASS — an unresolved question is not "no findings of any severity"

#### Scenario: Minor plus unresolved question produces PASS WITH GAPS
- **WHEN** `adversarial-review`'s Findings table contains at least one Minor finding and at least one unresolved `Question / assumption` finding, with zero Blocker or Major findings
- **THEN** the recorded verdict is PASS WITH GAPS, the same branch as either category alone would produce

#### Scenario: Resolved question with recorded evidence and nothing else outstanding produces PASS
- **WHEN** a `Question / assumption` finding was actually investigated and resolved with recorded evidence during the read-only review, that resolution (and its evidence) is recorded, the row is removed from the final Findings table on that basis, and no Blocker, Major, Minor, or other unresolved finding remains
- **THEN** the recorded verdict is PASS

#### Scenario: Question/assumption is never silently dropped
- **WHEN** a `Question / assumption` finding remains genuinely unresolved at the time the verdict is written
- **THEN** it stays in the Findings table and its category counts toward the PASS WITH GAPS branch — it is never removed from the table, and never excluded from the count, without recorded resolution evidence

### Requirement: Reviewer provenance for adversarial review
The `adversarial-review` skill SHALL report, for every review it performs: the identity of the implementing session, the identity or mechanism of the reviewing session (a distinct session, a distinct client, or a real subagent invocation), the client used for the review, whether the review was cross-client relative to implementation, and the documented fallback used when a second independent session or client was not available.

#### Scenario: Cross-client review available
- **WHEN** the reviewing session runs in a different client or a different session than the one that implemented the change
- **THEN** the adversarial review output records both identities, the client used, and states the review was cross-session/cross-client

#### Scenario: No independent session or client available
- **WHEN** no second independent session or client can be used for the review
- **THEN** the adversarial review output explicitly names the fallback mechanism used (for example, a real subagent invocation within the same session) instead of silently reviewing as if independence were achieved

### Requirement: Verified shell-execution rules for verification commands
Any command run by SpecBoot verify or by a workflow step it documents SHALL follow these rules: an unexecuted or failed command is never recorded as PASS; a command run through a pipeline SHALL have its real exit status preserved and inspected, not the exit status of a later stage in the pipeline; `npx --yes` SHALL NOT be used as a fallback to install a missing tool; list or word-splitting behavior SHALL NOT be assumed identical across shells; an expected non-zero result from a `diff`-style comparison SHALL NOT, by itself, be recorded as a failed validation.

#### Scenario: A required command fails or does not run
- **WHEN** a command required for verification fails to execute or returns a non-zero exit status for a reason other than an expected comparison difference
- **THEN** the verification result for that check is FAIL, never an inferred PASS

#### Scenario: Command run through a pipeline
- **WHEN** a verification command's output is piped into another command (for example, a filter or formatter)
- **THEN** the recorded result reflects the original command's exit status, not the exit status of the last command in the pipeline

#### Scenario: Missing tool encountered during verification
- **WHEN** a tool required for a verification step is not installed
- **THEN** the workflow reports the missing tool and stops that check, and does not invoke `npx --yes` (or an equivalent auto-confirm install) to install it

#### Scenario: Expected diff during verification
- **WHEN** a comparison step (for example, comparing a delta spec against a main spec, or a template against its generated copy) produces a non-zero/non-empty result that the check documents as an expected form of difference to classify, not an unconditional failure
- **THEN** the verification result is derived from evaluating that difference's content, not automatically marked FAIL merely because the comparison command exited non-zero

### Requirement: Required workflow capability availability per selected client
SpecBoot verify SHALL validate, for every required workflow capability it documents (enrich-us, propose, apply, SpecBoot verify, adversarial review, archive-with-sync — six capabilities, `enrich-us` first in sequence), that the capability is available to every currently selected client through that client's own native mechanism, and SHALL document each client's exact invocation syntax. A capability missing for any selected client SHALL be reported as a FAIL finding identifying the missing capability and the affected client. Clients are not required to expose an identical command name for the same capability. Jira availability is explicitly excluded from this matrix — it SHALL NOT be validated or required as a capability.

#### Scenario: Capability missing for a selected client
- **WHEN** a required workflow capability has no corresponding command, skill, or adapter for a currently selected client
- **THEN** SpecBoot verify records this as a FAIL finding identifying the missing capability and the affected client

#### Scenario: All required capabilities available
- **WHEN** every required workflow capability has a corresponding command, skill, or adapter for every currently selected client
- **THEN** SpecBoot verify records this check as passed

#### Scenario: Six-capability matrix includes enrich-us; Jira is not a capability
- **WHEN** SpecBoot verify runs the capability-availability check
- **THEN** it validates exactly six capabilities (`enrich-us`, `propose`, `apply`, `specboot-verify`, `adversarial-review`, `archive`), in that order, for every currently selected client, and does not validate, require, or report on Jira availability as a capability

#### Scenario: Different invocation names across clients is not a failure
- **WHEN** two selected clients happen to expose the same required capability under different invocation strings
- **THEN** this naming difference alone is not reported as a finding, since the requirement is capability availability and documented invocation, not identical command names across clients (in this repo, both currently selected clients converge on `/specboot-verify`, but the requirement does not depend on that coincidence)

#### Scenario: Official verify coexistence is not a failure
- **WHEN** an official `/opsx:verify` capability is also present for a selected client (for example because that machine's global OpenSpec profile enables it)
- **THEN** SpecBoot verify does not report this coexistence as a FAIL finding, since `opsx:verify` and `specboot-verify` occupy non-colliding names — it instead records the coexistence and states that `/specboot-verify` remains the authoritative gate

### Requirement: Client-neutral verification skill exposed through a SpecBoot-owned name, with no redundant per-client entry points
The verification behavior SHALL be implemented once as a canonical, client-neutral skill under `ai-specs/skills/`, and SHALL be exposed to each currently selected client under a single SpecBoot-owned name (`specboot-verify`) distinct from any name or namespace OpenSpec's own CLI generates or documents for that client, so it cannot collide with, or be mistaken for, OpenSpec-generated content. A client SHALL be given a separate adapter file only when the skill's own client-side registration is not independently sufficient to expose it; a client SHALL NOT be given both a separate adapter file and rely on the skill's own registration for the same invocation name unless evidence shows the client needs both. No adapter SHALL be created for a client that is not currently selected, and no OpenSpec-generated client directory or file SHALL be modified to add this behavior.

#### Scenario: Selected client requests verify
- **WHEN** a currently selected client (Claude or Kiro) is asked to run verification
- **THEN** it reaches the canonical skill under `ai-specs/skills/` — either directly through the skill's own client registration, or through a thin adapter that delegates to it and contains no duplicated verification logic — using the single invocation name `specboot-verify`

#### Scenario: Redundant adapter identified and removed
- **WHEN** evidence shows a client's skill symlink alone is discoverable and is what a fresh session actually invokes, while a separate command/prompt adapter registered under a different name was never the path actually used
- **THEN** the redundant adapter is removed rather than left in place as a second, differently-named entry point to the same capability

#### Scenario: Unselected client
- **WHEN** a client is not currently selected in this repository (for example Cursor or Codex)
- **THEN** no adapter file for SpecBoot verify is created for that client

### Requirement: Mandatory execution provenance reporting
Every SpecBoot verify report SHALL include an Execution provenance section reporting: the client; the session lifecycle (fresh client start, window/session reload, new chat only with no reload, or resumed session); the active agent or mode (or a statement that the client does not expose one); every agent or subagent actually invoked, or "None"; confirmation that the canonical `specboot-verify` skill itself was invoked; the exact client adapter/invocation string used; every other skill actually invoked, or "None"; every MCP server/integration actually used, or "None"; repository instruction files the client loaded automatically; resources opened manually; and a per-client evidence classification of live runtime, static filesystem/naming validation only, or not validated. The Summary section SHALL include a `Provenance recorded: PASS/FAIL` line. An agent, subagent, or skill SHALL NOT be reported as invoked merely because it appeared in a catalog or availability listing; automatic discovery, explicit invocation, and manual file reading SHALL be reported as distinct facts, never conflated.

#### Scenario: Provenance section present and complete
- **WHEN** SpecBoot verify completes a run
- **THEN** its report includes a complete Execution provenance section with every required field populated (using "None" or "not observed"/"not exposed by client" where nothing applies), and the Summary includes `Provenance recorded: PASS`

#### Scenario: Catalog listing is not usage
- **WHEN** an agent or skill appears in an available-agents/available-skills system listing but was not actually invoked during the run
- **THEN** the report does not list it under "agents/subagents actually invoked" or "other skills actually invoked" — those fields report "None" or only what was genuinely invoked

#### Scenario: Live runtime vs. static validation classification
- **WHEN** a client's adapter files were inspected on disk but the client's own invocation of the capability was not executed or observed in this run
- **THEN** that client's evidence classification is "static filesystem/naming validation only", never "live runtime"

### Requirement: Adapter placement safety validation
Before a SpecBoot-owned adapter is considered complete, the workflow SHALL validate, using only documented or read-only checks (for example the installed OpenSpec CLI's own help output, `openspec doctor`, and the installed package's README), that the adapter's path and name do not overwrite or occupy any path or name OpenSpec's CLI currently generates or documents as its own, and SHALL record what evidence was checked. This validation SHALL NOT depend on undocumented internals, and SHALL NOT require installing, downloading, or upgrading any tool.

#### Scenario: Read-only evidence gathered
- **WHEN** validating adapter placement safety
- **THEN** the checks performed are limited to already-installed, already-documented commands and files (CLI help, `doctor`, package README), and no install/download/upgrade is performed

#### Scenario: Adapter name collides with a generated name
- **WHEN** a proposed adapter path or name matches one OpenSpec's CLI currently generates or documents
- **THEN** the validation records this as a FAIL, and the adapter must be renamed or relocated before being considered complete

### Requirement: Live workflow documentation accuracy across root and doc locations
Every live, present-tense reference to a retired or unavailable workflow name (for example `/new`, `/ff`, `/continue`, `/verify` as a slash command, `opsx:ff`, `opsx:continue`, `openspec-ff-change`, `openspec-continue-change`) in this repository's root and `docs/` documentation SHALL be updated to describe the currently available capability and the selected clients' real native invocation names, using client-neutral wording where invocation differs. This requirement SHALL NOT be satisfied by editing a symlink/alias file directly when a canonical target exists; edits SHALL be made to the canonical source only. A reference SHALL be exempt from this requirement only when it is clearly labeled as a historical record (for example, a change artifact's "Note on..." explanatory text describing what a prior state was) rather than presented as a live instruction.

#### Scenario: Root document with no symlink relationship is corrected directly
- **WHEN** a root document (for example `README.md`) contains live references to retired workflow names and is not itself a symlink or alias of another file
- **THEN** that document is edited directly

#### Scenario: Symlinked alias is never edited directly
- **WHEN** a root file (for example `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `codex.md`) is a symlink to a canonical source (for example `docs/base-standards.md`)
- **THEN** only the canonical source is edited; the symlink/alias files are left untouched, since editing the canonical target already updates every alias

#### Scenario: Historical record is left untouched
- **WHEN** a reference to a retired workflow name appears inside text that is clearly labeled as a historical record of what was previously true (for example an explanatory "Note on `/new`, `/ff`, and `/continue`" already describing that these were retired)
- **THEN** that reference is left unchanged, since it correctly documents history rather than instructing live use of a retired command

#### Scenario: Portable template counterpart uses client/version-neutral wording
- **WHEN** correcting a stale reference inside a distributable template file (for example `packages/specboot/template/docs/base-standards.md`) meant for adoption by other, unrelated projects
- **THEN** the correction uses generic, client/version-neutral wording describing the currently-equivalent capability, rather than hardcoding this specific repository's exact current skill or command names

### Requirement: Mandatory pre-proposal refinement via enrich-us
`enrich-us` SHALL be a mandatory structured refinement pass that runs before OpenSpec proposal generation for every work item — features, bug fixes, refactors, technical tasks, spikes, and documentation changes alike. It SHALL NOT be documented as optional. It SHALL inspect relevant repository technical context and identify missing scope, acceptance criteria, edge cases, affected interfaces/files, testing expectations, documentation impact, security, performance, observability, compatibility, migration, and operational concerns. Its output SHALL explicitly distinguish confirmed facts, inferred assumptions, and unresolved questions, and SHALL NOT invent a material product or business decision. It SHALL preserve the original work item's meaning and SHALL NOT expand it unnecessarily when the input is already sufficiently detailed. It SHALL produce a concrete enriched Markdown work-item artifact and SHALL return exactly one explicit outcome: `READY FOR PROPOSAL` or `NEEDS CLARIFICATION`. `NEEDS CLARIFICATION` SHALL block proceeding to proposal generation until resolved. This requirement is a procedural quality gate and structured first review; it SHALL NOT be treated as, or substitute for, `adversarial-review`'s independent-review role.

#### Scenario: Work item enters without enrich-us
- **WHEN** a work item is used to invoke OpenSpec proposal generation directly, without having passed through `enrich-us`
- **THEN** the documented workflow treats this as a violation of the mandatory sequence, not an accepted shortcut, regardless of the work item's type (feature, bug fix, refactor, technical task, spike, or documentation change)

#### Scenario: Already-detailed work item passes through without padding
- **WHEN** a work item already contains full scope, acceptance criteria, edge cases, and the other elements `enrich-us` checks for
- **THEN** `enrich-us` preserves its meaning, does not pad or unnecessarily expand it, and still returns an explicit `READY FOR PROPOSAL` outcome

#### Scenario: Material clarification remains unresolved
- **WHEN** `enrich-us` identifies at least one unresolved question about a material product or business decision that it cannot infer without inventing it
- **THEN** its outcome is `NEEDS CLARIFICATION`, it lists the unresolved question(s) explicitly, and proceeding to proposal generation is blocked until they are resolved

#### Scenario: enrich-us never invents a material decision
- **WHEN** `enrich-us` cannot determine a material product or business decision from the input or repository context
- **THEN** it records the gap as an unresolved question rather than inventing or assuming an answer

### Requirement: Enriched-artifact handoff to OpenSpec proposal generation
`enrich-us` SHALL persist its enriched Markdown artifact to a deterministic, project-local, gitignored staging location, and SHALL state the exact next invocation or action needed to pass that artifact into OpenSpec proposal generation as its authoritative input. This mechanism SHALL work without Jira, SHALL work identically for every currently selected client, SHALL NOT depend solely on unspecified conversation memory, and SHALL NOT modify or duplicate OpenSpec's own proposal-generation command/skill logic (`.claude/commands/opsx/propose.md`, `.kiro/prompts/opsx-propose.prompt.md`). Where practical, source-work-item traceability SHALL be preserved in or alongside the resulting OpenSpec change directory.

#### Scenario: READY FOR PROPOSAL states the exact next action
- **WHEN** `enrich-us` returns `READY FOR PROPOSAL`
- **THEN** its output explicitly names the next invocation (the selected client's own propose command, invoked in the same conversation) and identifies the enriched artifact — both the in-conversation content and its staged file path — as the authoritative work-item description to provide

#### Scenario: Staged artifact survives independent of conversation memory
- **WHEN** an enriched artifact has been produced by `enrich-us`
- **THEN** its content exists as a file at a deterministic, gitignored, project-local path, independent of whether the conversation that produced it is later compacted, summarized, or handed off

#### Scenario: Traceability preserved alongside the resulting change
- **WHEN** OpenSpec proposal generation creates a new change directory from an enriched artifact
- **THEN** the enriched artifact is copied into that change directory (for example as `enriched-work-item.md`) as a documented, manual step, without modifying or duplicating the proposal-generation command/skill's own logic

#### Scenario: Handoff mechanism does not touch OpenSpec-generated proposal files
- **WHEN** the enriched-artifact handoff mechanism is implemented or exercised
- **THEN** `.claude/commands/opsx/propose.md` and `.kiro/prompts/opsx-propose.prompt.md` remain byte-for-byte unmodified

### Requirement: Phase-1 work-item input is self-contained and Jira-free
`enrich-us` SHALL accept, in Phase 1, only the following work-item input sources: text pasted directly into the conversation, a screenshot attached to the conversation, or a readable attached document/text artifact. It SHALL NOT require Jira MCP, automatic ticket retrieval, Jira write-back, or ticket-status transitions to function. When the input cannot be reliably extracted from an attachment or image, `enrich-us` SHALL request the missing text or clarification from the user and SHALL NOT invent content to fill the gap. Historical Jira-centric behavior MAY be documented as a labeled historical record or a named future phase, but current, live guidance SHALL NOT state or imply that Jira is available or required.

#### Scenario: Direct chat text input
- **WHEN** a user pastes work-item text directly into the conversation
- **THEN** `enrich-us` uses that text as its input without requiring or requesting Jira access

#### Scenario: Screenshot input
- **WHEN** a user attaches a screenshot containing work-item information to the conversation
- **THEN** `enrich-us` extracts the relevant content from the screenshot as its input, or asks for the missing text if extraction is not reliable

#### Scenario: Unreadable or ambiguous attachment
- **WHEN** `enrich-us` cannot reliably extract work-item content from an attached image or document
- **THEN** it asks the user for the missing text or clarification instead of inventing or guessing the content

#### Scenario: Jira is named only as historical or future, never as current
- **WHEN** `enrich-us`'s own documentation, or this repository's other live workflow documentation, mentions Jira
- **THEN** the mention is either clearly labeled as a historical record of a prior adoption's behavior, or clearly labeled as a separately approved future phase — never presented as a currently available or currently required integration

### Requirement: Installer and documentation portray the real capability sequence without hard-coded client-specific syntax
`packages/specboot/bin/init.js` and this repository's live workflow documentation SHALL describe the real, current capability sequence (`enrich-us` through archive) and the enriched-artifact handoff, using portable, client-neutral wording. A shared, multi-client installer SHALL NOT hard-code a single client's slash-command syntax as if it were universal.

#### Scenario: Installer next-steps are client-neutral
- **WHEN** `packages/specboot/bin/init.js` prints its post-install next-steps
- **THEN** the printed text names the real capability sequence starting with `enrich-us` and does not hard-code a single client's specific slash-command invocation syntax as if every client used it

#### Scenario: Installer text does not name a retired command
- **WHEN** `packages/specboot/bin/init.js` prints its post-install next-steps
- **THEN** the printed text does not name `/ff`, `/new`, or `/continue` as a live command to run

### Requirement: Portable, idempotent staging-ignore provisioning
`packages/specboot/bin/init.js` SHALL ensure, on every run against a target directory, that a path under `.specboot/staging/` is ignored by Git. When running inside a Git repository and Git's own ignore evaluation can be executed, the installer SHALL use Git's own evaluation (for example `git check-ignore` against a probe path) to determine whether the staging path is already ignored by any existing rule — exact, broader, or otherwise — rather than implementing a custom `.gitignore` pattern parser; if Git reports the probe as already ignored, `.gitignore` SHALL NOT be modified (a byte-for-byte no-op). If Git reports the probe as not ignored, or if Git's evaluation cannot be executed (not a Git repository, `git` unavailable, or evaluation otherwise fails to run cleanly), the installer SHALL fall back to a conservative check: if `.gitignore` does not exist, it SHALL be created containing the exact narrow rule `.specboot/staging/`; if `.gitignore` exists and already contains that exact rule (as a standalone line, ignoring surrounding whitespace), no change SHALL be made; otherwise the rule SHALL be appended without altering, reordering, or removing any pre-existing line. The resulting `.gitignore` SHALL always end with a trailing newline whenever it is written. The provisioned rule SHALL NEVER be a broader pattern (for example a bare `.specboot/` line) than the exact narrow rule. This requirement applies independently of, and in addition to, this repository's own already-provisioned root `.gitignore` rule (Group 11), which SHALL remain unchanged by this requirement.

#### Scenario: No existing .gitignore
- **WHEN** the installer runs against a target directory with no `.gitignore` file
- **THEN** a `.gitignore` file is created containing the exact rule `.specboot/staging/`, ending with a trailing newline

#### Scenario: Existing .gitignore with unrelated content
- **WHEN** the installer runs against a target directory whose `.gitignore` already exists and contains unrelated rules but not the staging rule
- **THEN** every pre-existing line is preserved unchanged, in its original order, and the exact rule `.specboot/staging/` is appended, with the file ending in a trailing newline

#### Scenario: Existing .gitignore already containing the rule
- **WHEN** the installer runs against a target directory whose `.gitignore` already contains the exact rule `.specboot/staging/`
- **THEN** the file's content is left byte-for-byte unchanged

#### Scenario: Repeated execution is idempotent
- **WHEN** the installer is run against the same target directory more than once
- **THEN** the second and subsequent runs produce no further change to `.gitignore` beyond what the first run already produced — no duplicate rule, no duplicate header comment

#### Scenario: Broader rule is never written
- **WHEN** the installer provisions the staging ignore rule under any of the above scenarios
- **THEN** it never writes a bare `.specboot/` line or any pattern broader than `.specboot/staging/`

#### Scenario: Existing broader rule already ignores the staging path (Git available)
- **WHEN** the installer runs inside a Git repository whose `.gitignore` already contains a broader rule (for example a bare `.specboot/` line) that causes Git to report a probe path under `.specboot/staging/` as ignored
- **THEN** `.gitignore` is left byte-for-byte unchanged — no exact narrow rule is appended, since Git's own evaluation already confirms the staging path is ignored

#### Scenario: Existing broader rule with a negation that un-ignores the staging path (Git available)
- **WHEN** the installer runs inside a Git repository whose `.gitignore` contains a broader rule followed by a negation that re-includes (un-ignores) the staging path specifically, such that Git reports the probe as not ignored
- **THEN** the installer appends the exact narrow `.specboot/staging/` rule, exactly as it would for any other not-ignored case, since Git's own evaluation — not the mere textual presence of a `.specboot/` pattern — determines whether an append is needed

#### Scenario: Git evaluation unavailable falls back to exact-line detection only
- **WHEN** the installer cannot execute Git's ignore evaluation (not a Git repository, `git` is not available, or the evaluation does not complete cleanly) and the target's `.gitignore` contains a broader rule but not the exact `.specboot/staging/` line
- **THEN** the installer falls back to the conservative exact-line check, does not attempt to interpret the broader rule itself, and appends the exact narrow rule — a documented, accepted limitation of operating without Git's evaluation, not a broadening or destructive change

### Requirement: enrich-us verifies the staging path is ignored before writing
Before persisting an enriched artifact to `.specboot/staging/`, `enrich-us` SHALL verify that the path is actually ignored by version control. If the path cannot be confirmed ignored — because `.gitignore` does not contain the rule, the working directory is not a git repository, or the check cannot otherwise be completed — `enrich-us` SHALL NOT write the artifact to disk. Instead, it SHALL report the missing one-time setup (naming the exact rule to add) and present the enriched artifact's content in its chat response only. This requirement applies identically to the canonical and template `enrich-us` skills.

#### Scenario: Staging path confirmed ignored
- **WHEN** `enrich-us` is about to persist an enriched artifact and confirms `.specboot/staging/` is ignored
- **THEN** it writes the artifact to `.specboot/staging/<slug>-enriched.md` as normal

#### Scenario: Staging path not ignored
- **WHEN** `enrich-us` is about to persist an enriched artifact and cannot confirm `.specboot/staging/` is ignored
- **THEN** it does not write the file, reports the missing one-time `.gitignore` setup by name, and presents the enriched artifact's content in the chat response only

#### Scenario: Non-git working directory
- **WHEN** `enrich-us` runs in a directory that is not a git repository
- **THEN** it treats the staging path as not confirmed ignored and follows the fail-safe behavior above

### Requirement: Documentation distinguishes capability availability from installer provisioning
Live workflow documentation (`README.md`, `ai-specs/specboot-instructions.md`, and its template counterpart) SHALL distinguish a workflow capability's *current availability* in a given repository's filesystem from *provisioning* by the SpecBoot npm installer (`packages/specboot/bin/init.js`). A capability's paths existing and resolving in a repository SHALL NOT be documented, or allowed to be read, as proof that the installer created them. Documentation SHALL state explicitly which clients the current installer provisions (Claude and Cursor) and which it does not (Kiro), and SHALL NOT remove accurate, working guidance for a client already configured in a given repository merely because the installer does not provision that client.

#### Scenario: Installer-provisioned clients stated explicitly
- **WHEN** a live workflow document describes what `npx @lidr/lidr-specboot` / `packages/specboot/bin/init.js` provisions
- **THEN** it states that the installer provisions shared Claude and Cursor adapters and does not currently provision Kiro

#### Scenario: Existing capability is not conflated with installer provenance
- **WHEN** a repository has working Kiro paths (skills, prompts, settings)
- **THEN** documentation does not state or imply that the SpecBoot npm installer created them, and instead discloses that they were configured separately

#### Scenario: Valid client guidance is qualified, not removed
- **WHEN** a repository has a separately configured, working client setup (for example Kiro) that the installer does not provision
- **THEN** documentation retains that client's guidance, qualified with a note that it applies only where that client has been separately configured, rather than deleting it

### Requirement: Kiro invocation guidance applies only where Kiro is separately configured
Every place in live workflow documentation that shows Kiro command syntax or invocation examples SHALL be understandable as applying only to a repository where Kiro adapters/prompts have already been separately generated or configured — not as a universal consequence of running the current SpecBoot npm installer.

#### Scenario: Kiro example carries its own applicability caveat
- **WHEN** a document shows a Kiro command example (for example the "Kiro syntax" end-to-end flow block)
- **THEN** the example is presented as applying only in a repository where Kiro has been separately configured, either via an inline note or a clear cross-reference to the document's installer-scope disclosure

### Requirement: Distributed templates accurately disclose installer-provisioned clients
`packages/specboot/template/`'s own copies of live workflow documentation SHALL accurately disclose which clients the shipped installer (`packages/specboot/bin/init.js`) actually provisions, using the same distinction required of this repository's own documentation, so an adopting project reading only the distributed template is not misled about what a fresh install will create.

#### Scenario: Template copy matches the installer's real behavior
- **WHEN** `packages/specboot/template/ai-specs/specboot-instructions.md` describes installer-provisioned clients
- **THEN** it states the same Claude/Cursor-provisioned, Kiro-not-provisioned distinction as the canonical copy, since both describe the same shipped installer script

### Requirement: Verifier capability checks report availability, not provisioning provenance
`ai-specs/skills/specboot-verify/SKILL.md`'s required-workflow-capability-availability check (Step 5) SHALL determine and report capability availability from the current repository filesystem only. A PASS on this check SHALL mean the required capability paths currently exist and resolve for the selected client. A PASS SHALL NOT assert, and SHALL NOT be interpreted as asserting, which installer, person, or process provisioned those paths. Installer-provenance validation SHALL be treated as a separate, unimplemented concern that this requirement does not attempt to satisfy.

#### Scenario: PASS reflects current filesystem state only
- **WHEN** `specboot-verify` Step 5 reports a capability as available for a selected client
- **THEN** the report reflects only that the capability's paths currently exist and resolve on disk, not how or by what process they were created

#### Scenario: PASS is not read as an installer-provisioning claim
- **WHEN** a reader reviews a `specboot-verify` report showing all six capabilities available for a client whose adapters were configured separately from the SpecBoot npm installer (for example Kiro in this repository)
- **THEN** the skill's own Step 5 wording makes clear that this PASS does not mean, and must not be read as meaning, that the installer provisioned those paths

### Requirement: Selected-client-aware installer redesign is a future non-goal
Extending `packages/specboot/bin/init.js` to provision additional clients (including Kiro) conditionally, based on explicit client selection, is explicitly out of scope for this change. This change SHALL NOT add unconditional provisioning for a client to the installer's existing `.claude`/`.cursor` loop or otherwise alter which clients the installer provisions.

#### Scenario: No unconditional Kiro provisioning added
- **WHEN** this change corrects documentation and verifier wording about installer-provisioned clients
- **THEN** `packages/specboot/bin/init.js`'s client-provisioning loop remains unchanged — no client is unconditionally added to it

#### Scenario: Future selected-client-aware installer work is recorded, not implemented
- **WHEN** a properly scoped installer redesign (explicit client selection, conditional per-client adapter generation, Windows portability, idempotent upgrades/migration) becomes necessary
- **THEN** it is planned and implemented as a separate, future OpenSpec change, not folded into this documentation/provenance correction

