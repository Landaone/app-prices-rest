## Purpose

Defines the behavior of AI-driven SpecBoot adoption: how a short canonical launcher validates a candidate source read-only and loads the canonical entry prompt that starts a run from the target repository with every parameter and gate it needs, how a canonical SpecBoot source is resolved and validated at run time so the contract is linked in place and never copied — and how a run with no validated source fails closed rather than falling back — how every write is preceded by a complete preflight and one exact-mutation approval, how a repository with no SpecBoot files and no AI client configuration is bootstrapped into one where the selected client discovers the adoption contract on its own, how the `ADOPT-nn` workflow is executed and resumed from a filled run log under human approval gates and strict evidence rules, how each independently validated checkpoint reaches a commit and a gated push, how a real end-to-end project task gates pull-request creation, and how every bootstrap-only artifact is later removed against a committed manifest without destroying the record of what it did.

## ADDED Requirements

### Requirement: Adoption starts from a short canonical launcher that loads the canonical entry prompt

The bootstrap kit SHALL provide exactly one canonical launcher template at `specboot-adoption/bootstrap-kit/ADOPTION-LAUNCHER.template.md`, and that launcher SHALL be the **sole artifact a human pastes** to start an adoption. The bootstrap kit SHALL provide exactly one canonical entry prompt at `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`, which SHALL remain the complete canonical cold-start procedure and SHALL be **read from the validated canonical source** rather than pasted into a session. Together they SHALL constitute **one governed entry mechanism**, not an initial prompt supplemented by corrective patches.

The launcher SHALL accept **exactly one runtime parameter**, `<SPECBOOT_SOURCE>`, and SHALL treat the supplied path as a **candidate** source that is not trusted merely because an operator supplied it. Before loading any orchestration instruction and before any write to the target repository, the launcher SHALL verify **read-only** that all four of the following exist in that candidate source: `SPECBOOT_ADOPTION_GUIDE.md`; `specboot-adoption/`; a readable `ai-specs/skills/specboot-adopt/SKILL.md`; and a readable `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`. Where any of the four is absent or unreadable, the launcher SHALL stop with **zero target-repository writes** and SHALL report what failed validation.

Where validation passes, the launcher SHALL instruct that `ADOPTION-ENTRY-PROMPT.md` be read **completely** and followed exactly, and that complete read SHALL occur **before any adoption action is taken**. The launcher SHALL NOT duplicate the adoption procedure, the client-selection procedure, the checkpoint protocol, or any `ADOPT` step; it SHALL state that no target-repository write is permitted before the approval gate **defined by the loaded entry file**, by reference to that file rather than by defining the gate itself. The launcher SHALL be **client-neutral plain prompt text**, using no client-specific `@` include syntax, no slash command, and no OpenSpec command, and assuming no pre-installed skill.

The committed launcher template SHALL carry the `<SPECBOOT_SOURCE>` placeholder and SHALL embed no machine-specific absolute path. The resolved path an operator fills in SHALL exist only in the chat or runtime session and SHALL NEVER be committed to the target repository.

The entry prompt SHALL assume only that it is followed from the target repository. It SHALL be **parameterized**: it SHALL obtain the client-selection route, the selected clients, and every other runtime input by asking at run time, SHALL take the canonical source as already validated by the launcher rather than requiring the operator to supply it again, and SHALL embed no machine-specific absolute path, no laboratory-specific location, and no pilot-specific value. It SHALL describe **source-linked adoption only**, SHALL NOT ask the operator to choose a delivery mode, and SHALL NOT offer packaged-snapshot as a reachable path.

The prompt SHALL be complete in its **parameters and gates** and silent on **procedure**. It SHALL take its procedure from the `specboot-adopt` skill and refer to canonical rules by name, and SHALL NOT restate an `ADOPT` step contract, the checkpoint protocol, the manifest semantics, or the de-bootstrap ordering, since a second statement of the procedure would drift from the contract without anyone diffing it.

**Cold start.** Both the launcher and the prompt SHALL assume a target repository containing no SpecBoot files, no OpenSpec installation, no `/opsx:*` commands, no discoverable `specboot-adopt` skill, and no `.specboot/` directory, since each of those is an output of the adoption rather than a precondition of it. Both SHALL therefore be usable as **ordinary prompt text**: the launcher pasted and run as-is and the prompt read and followed as-is, requiring no slash command, no skill invocation, no command infrastructure, no installed package, and no pre-existing configuration in the target repository. Neither SHALL assume that `specboot-adopt` is already installed in, or discoverable from, the target repository.

The mechanism SHALL be **executable end to end from a virgin repository**, and the launcher and the prompt together SHALL state each of the following well enough to be performed without a corrective prompt patch or any additional procedural instruction: **(1)** the pasted launcher validates the candidate source read-only — `SPECBOOT_ADOPTION_GUIDE.md`, the `specboot-adoption/` phase directory, a readable `ai-specs/skills/specboot-adopt/SKILL.md`, and a readable `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md` — and, on success, reads that entry prompt completely before any adoption action; **(2)** obtain the orchestration procedure by **reading the validated `SKILL.md` directly, at a source-relative path** under the resolved source; **(3)** obtain an explicit, supported client selection; **(4)** run the complete preflight and present the exact mutation inventory at a human-approval gate; **(5)** provision exactly the approved inventory; **(6)** stop and generate the exact fresh-session handoff prompt; **(7)** attempt native discovery for the first time in that fresh session, resuming from the durable manifest and run log with source identity verified. No orchestration instruction SHALL be loaded and nothing SHALL be written to the target repository until step 1 has passed. The direct read in step 2 SHALL be stated and recorded as a direct read, never as native skill discovery.

Where no canonical source is supplied, or the supplied one fails validation, the run SHALL stop with **zero target-repository writes** and SHALL report that a validated canonical source is required. It SHALL NOT fall back to another delivery mode.

Before provisioning anything, the prompt SHALL present the **exact project mutations** it intends to make — every path to be created or modified — and SHALL stop at a human-approval gate. Where autodiscovery is used it SHALL remain read-only and SHALL NEVER authorize configuration; displayed findings are candidates, and the approval gate is still owed after a human selection exists.

The initial session SHALL be bounded: once the temporary discovery entries and the durable state (`BOOTSTRAP-MANIFEST.json` and the adoption run log) are provisioned, it SHALL stop and SHALL generate the exact fresh-session handoff prompt rather than continuing into the adoption steps. **Native skill discovery SHALL be attempted only in that fresh session.** The fresh session SHALL resume from the durable manifest and run log, SHALL obtain a local canonical source path — from the machine-local store where one exists, otherwise by asking or rediscovering — SHALL verify source identity against the recorded checksums, and SHALL block on source drift instead of continuing. The handoff prompt SHALL NOT embed the resolved source path, since it is machine-local and the fresh session resolves it for itself.

No OpenSpec command and no `/opsx:*` command SHALL be used at any point before the documented installation step (`ADOPT-02`) has completed and OpenSpec availability has **explicitly passed** its documented check. The absence of OpenSpec at cold start SHALL be the expected state rather than a blocker.

The cold-start sequence SHALL be stated once. Nothing in it SHALL restate the adoption guide or the skill body, and it SHALL remain parameterized and free of machine-specific paths.

The prompt SHALL direct a run that: requires a validated local canonical SpecBoot source and fails closed without one; validates the guide, the phase directory, and the `specboot-adopt` skill **before the first project write**; offers exactly two client-selection routes, explicit manual selection and read-only autodiscovery followed by explicit human selection; states that autodiscovery neither writes nor authorizes configuration; refuses with zero writes when no client is selected or a selected client has no recipe; provisions only explicitly selected clients and records all others `NOT SELECTED`; keeps canonical orchestration client-agnostic and delegates client-dependent actions to the selected client's recipe; presents the exact intended mutations and stops for human approval before writing; initializes and validates the durable manifest and the adoption run log; runs the complete preflight, presents the exact mutation inventory for approval, and performs exactly that inventory; provisions temporary discovery entries for selected clients only; generates the exact fresh-session handoff prompts the discovery-and-execution evidence requires; continues through every reachable adoption step, stopping only at documented human-approval gates or genuine external blockers; resumes deterministically from the durable run log; detects canonical-source drift and blocks rather than consuming changed content; records failures, deviations, recoveries, and improvement proposals without editing the canonical source during the active adoption; routes accepted improvements back to the canonical shared source through the governed follow-up workflow; and never modifies model, reasoning effort, permission mode, or execution mode.

The prompt SHALL state the intended operating model explicitly: one short pasted launcher and the one canonical entry prompt it loads; expected human responses at explicit approval gates; fresh-session handoff prompts generated by the run rather than composed by the operator; deterministic resume from the run log; and **no improvised corrective prompt patches**. An adoption that required a corrective patch or any additional procedural instruction SHALL be treated as having found a gap in the launcher or the entry prompt, and that gap SHALL be recorded as an improvement proposal rather than accepted as normal use.

#### Scenario: No canonical source is supplied

- **WHEN** an operator starts an adoption with the launcher and supplies no local canonical SpecBoot source
- **THEN** the run stops, reports that a validated canonical source is required, leaves the target repository byte-for-byte unchanged, and offers no alternative delivery mode

#### Scenario: The launcher is the only thing the human pastes

- **WHEN** an operator starts an adoption in a new client session
- **THEN** the only text they paste is the launcher template filled in with the canonical source path, the canonical entry prompt is read from the validated source rather than pasted, and no part of the entry prompt's content had to be transcribed into the session

#### Scenario: The launcher validates the candidate source before loading anything

- **WHEN** the launcher receives a candidate `<SPECBOOT_SOURCE>`
- **THEN** it verifies read-only that the guide, the phase directory, a readable `SKILL.md`, and a readable `ADOPTION-ENTRY-PROMPT.md` are all present in that source before it loads any orchestration instruction and before it writes anything to the target repository

#### Scenario: An invalid candidate source stops the launcher with zero writes

- **WHEN** any one of the four required artifacts is missing or unreadable in the candidate source
- **THEN** the launcher stops, reports which artifact failed validation, loads no orchestration instruction, and leaves the target repository byte-for-byte unchanged with no `.specboot/` directory, discovery entry, manifest, or run log created

#### Scenario: A valid source causes the complete entry prompt to be loaded

- **WHEN** the launcher's four-artifact validation passes
- **THEN** `ADOPTION-ENTRY-PROMPT.md` is read in full from the validated source and followed exactly, and that complete read happens before any adoption action is taken

#### Scenario: The launcher duplicates no procedure

- **WHEN** the launcher template is inspected for what it states
- **THEN** it contains no adoption step, no client-selection procedure, no checkpoint protocol, and no `ADOPT` step contract, and its statement that no target-repository write precedes the approval gate refers to the gate the loaded entry file defines rather than defining it

#### Scenario: The launcher takes exactly one runtime parameter

- **WHEN** the launcher template's parameters are enumerated
- **THEN** `<SPECBOOT_SOURCE>` is the only one, and every other input the adoption needs is obtained by the loaded entry prompt at run time

#### Scenario: The launcher is client-neutral plain text

- **WHEN** the launcher template is inspected for client-specific syntax
- **THEN** it contains no client-specific `@` include syntax, no slash command, and no OpenSpec command, and nothing in it assumes a pre-installed skill

#### Scenario: The runtime source path never reaches a committed artifact

- **WHEN** an operator fills the launcher's `<SPECBOOT_SOURCE>` placeholder with a real path and runs an adoption
- **THEN** that path exists only in the chat or runtime session, the committed launcher template still carries the placeholder, and no committed artifact in the target repository records the resolved path

#### Scenario: The prompt offers no delivery-mode choice

- **WHEN** the entry prompt is inspected for the questions it asks
- **THEN** it asks for a canonical source rather than for a delivery mode, and nowhere presents packaged-snapshot as a path the operator can take

#### Scenario: Both client-selection routes are offered

- **WHEN** the run reaches client selection
- **THEN** the prompt offers exactly the two routes — explicit manual selection, and read-only autodiscovery followed by explicit human selection — and states that autodiscovery neither writes nor authorizes configuration

#### Scenario: Autodiscovery invoked from the entry prompt writes nothing

- **WHEN** the operator chooses the autodiscovery route offered by the entry prompt
- **THEN** the findings are displayed with the repository tree byte-for-byte unchanged, and configuration begins only after the human selects

#### Scenario: The prompt carries no machine-specific path

- **WHEN** the entry prompt is inspected for embedded locations
- **THEN** it contains no absolute filesystem path and no laboratory-specific or pilot-specific value, and every such input is obtained by a runtime question or represented by a placeholder

#### Scenario: The prompt agrees with the contract it invokes

- **WHEN** the entry prompt's statements are checked against `ADOPT-00`, `ADOPT-18`, the manifest schema, the selected-client discovery-and-execution gate, and the source-drift rules
- **THEN** each statement is consistent with its canonical definition, and any divergence is corrected in the prompt rather than in the contract

#### Scenario: The prompt does not duplicate the guide or the skill

- **WHEN** the entry prompt would describe how a step is performed
- **THEN** it invokes the `specboot-adopt` skill and names the canonical rule instead, and no `ADOPT` step contract, checkpoint protocol, manifest procedure, or de-bootstrap ordering is restated within it

#### Scenario: The mechanism is sufficient on its own

- **WHEN** an adoption is started using only the filled-in launcher, with no additional operator instruction
- **THEN** the run reaches its first documented approval gate without requiring a corrective prompt patch, and any patch or additional procedural instruction that proves necessary is recorded as a gap in the launcher or the entry prompt and raised as an improvement proposal

#### Scenario: Handoff prompts are generated, not composed by the operator

- **WHEN** the run reaches a step requiring a genuinely fresh client session
- **THEN** it generates the exact prompt to run in that session, and the operator is never left to compose one

#### Scenario: Resume needs no new prompt

- **WHEN** an interrupted adoption is resumed
- **THEN** the same launcher and the entry prompt it loads resume it deterministically from the durable run log, and a drift detection blocks the resume rather than silently continuing against changed content

#### Scenario: The mechanism runs as ordinary text in a repository with no tooling

- **WHEN** the launcher is pasted into a session opened on a target repository that has no SpecBoot files, no OpenSpec installation, no `/opsx:*` commands, no discoverable `specboot-adopt` skill, and no `.specboot/` directory
- **THEN** it and the entry prompt it loads run as-is with no slash command, skill invocation, command infrastructure, installed package, or prior configuration required, and the absent tooling is treated as the expected cold-start state rather than a blocker

#### Scenario: The source is validated before anything is loaded or written

- **WHEN** the run begins
- **THEN** the launcher validates `SPECBOOT_ADOPTION_GUIDE.md`, the `specboot-adoption/` phase directory, a readable `ai-specs/skills/specboot-adopt/SKILL.md`, and a readable `ADOPTION-ENTRY-PROMPT.md` in the candidate source, and no orchestration instruction is loaded and no target-repository write occurs until that validation has passed

#### Scenario: The initial session reads the canonical skill by source-relative path

- **WHEN** the initial session needs the orchestration procedure
- **THEN** it reads the validated canonical `ai-specs/skills/specboot-adopt/SKILL.md` at a source-relative path under the resolved source, and the run records that as a direct read rather than as native skill discovery

#### Scenario: An installed or discoverable skill is never assumed

- **WHEN** the prompt refers to `specboot-adopt`
- **THEN** it refers to it as an artifact of the validated canonical source, and no statement in the prompt depends on the skill being installed in or discoverable from the target repository

#### Scenario: Invalid source leaves the target repository untouched

- **WHEN** source validation fails on any of the three required artifacts
- **THEN** the run stops and the target repository is byte-for-byte unchanged, with no `.specboot/` directory, no discovery entry, no manifest, and no run log created

#### Scenario: Exact mutations are shown before provisioning

- **WHEN** provisioning is about to begin
- **THEN** the exact set of paths to be created or modified is presented and the run stops at a human-approval gate, and nothing is provisioned until the human approves

#### Scenario: Autodiscovery findings do not authorize provisioning

- **WHEN** autodiscovery has displayed candidate clients
- **THEN** nothing has been written, no configuration is performed for any candidate, and provisioning still requires both an explicit human selection and the exact-mutations approval gate

#### Scenario: The initial session stops after provisioning and hands off

- **WHEN** the temporary discovery entries and the durable manifest and run log have been provisioned
- **THEN** the initial session stops rather than continuing into the adoption steps, and generates the exact fresh-session handoff prompt for the operator to run

#### Scenario: Native discovery is attempted only in the fresh session

- **WHEN** the discovery-and-execution evidence for the selected client is produced
- **THEN** it comes from the fresh session started after provisioning, and no native skill discovery is attempted, simulated, or claimed in the initial session

#### Scenario: No OpenSpec or command-infrastructure use before installation passes

- **WHEN** the run is at any point before the documented installation step (`ADOPT-02`) has completed and OpenSpec availability has explicitly passed its documented check
- **THEN** no OpenSpec command and no `/opsx:*` command has been used, and OpenSpec being absent is recorded as the expected cold-start state rather than a failure

#### Scenario: The fresh session resumes from durable state and blocks on drift

- **WHEN** the operator runs the generated handoff prompt in a fresh session
- **THEN** it resumes from `BOOTSTRAP-MANIFEST.json` and the adoption run log, obtains a local source path from the machine-local store or by asking, verifies source identity against the recorded checksums, and blocks for human reconciliation when the source has drifted — and the handoff prompt itself carries no source path

#### Scenario: The mechanism is executable end to end from a virgin repository

- **WHEN** an operator pastes the filled-in launcher, and nothing else, in a repository with no SpecBoot files and no AI client configuration, against a valid canonical source
- **THEN** every one of the seven steps — the launcher's validation and complete load of the entry prompt, the direct `SKILL.md` read, explicit client selection, the exact-mutation approval, provisioning, stop-and-handoff, and fresh-session discovery — is performable from what the launcher and the loaded prompt state, with no step requiring an instruction the operator had to supply themselves

#### Scenario: The cold-start sequence is stated once

- **WHEN** the cold-start sequence is read
- **THEN** it appears once, covers source validation, the approval gate, the stop-and-handoff, and the OpenSpec embargo, and restates neither the guide nor the skill body

### Requirement: A canonical SpecBoot source is resolved and validated before the first project write

Adoption SHALL resolve the location of the canonical SpecBoot source as **runtime input** supplied by the operator, and SHALL NOT read that location from a value hard-coded in any canonical artifact. A supplied path SHALL be accepted as a canonical SpecBoot source only when all three of `SPECBOOT_ADOPTION_GUIDE.md`, `specboot-adoption/`, and `ai-specs/skills/specboot-adopt/SKILL.md` are present within it. The skill artifact SHALL be validated as a **readable `SKILL.md` file**, not merely as a present directory, because the initial session obtains its orchestration procedure by reading that file directly at a source-relative path. The validation SHALL run **before** the first repository-local write, so that an incomplete source is rejected rather than diagnosed after artifacts already exist. Where a local canonical source is supplied and validates, adoption SHALL proceed in **source-linked** mode, which is the only delivery mode this capability provides. Where no local canonical source is supplied, or the supplied one fails validation, adoption SHALL **fail closed**: it SHALL stop, SHALL report that a validated canonical source is required, SHALL leave the target repository byte-for-byte unchanged, and SHALL NOT fall back to any other delivery mode or expose one. A validated source SHALL be treated as read-only for the entire adoption: no step SHALL create, modify, or delete anything within it.

#### Scenario: Supplied source is complete

- **WHEN** the operator supplies a local path containing the adoption guide, the `specboot-adoption/` phase files, and a readable `ai-specs/skills/specboot-adopt/SKILL.md`
- **THEN** the source validates, source-linked mode is selected and recorded, and the adoption proceeds against the external source in place

#### Scenario: Skill directory exists without a readable SKILL.md

- **WHEN** the supplied source contains `ai-specs/skills/specboot-adopt/` but no readable `SKILL.md` within it
- **THEN** the source is rejected before any repository-local write, because the initial session obtains its procedure by reading that file directly and a directory alone cannot satisfy it

#### Scenario: Supplied source is missing a required artifact

- **WHEN** the operator supplies a path that lacks any one of the three required artifacts
- **THEN** the source is rejected before any repository-local write, nothing is created in the project, and the run stops until a complete source is supplied

#### Scenario: No local canonical source is supplied

- **WHEN** no local canonical SpecBoot source is available to the adoption
- **THEN** the run fails closed with zero target-repository writes and reports that a validated canonical source is required, and no alternative delivery mode is selected or offered

#### Scenario: Source location is never hard-coded

- **WHEN** a canonical artifact — the guide, a phase file, the kit manifest, the skill, or a recipe — refers to the canonical source
- **THEN** it refers to it as runtime input, and no machine-specific source path appears in it; the resolved path appears in no committed artifact at all, and is retained only in ignored machine-local state

#### Scenario: A later step reuses the resolved source rather than re-deriving it

- **WHEN** a step other than `ADOPT-00` needs the resolved canonical source path
- **THEN** it reads the same value from the machine-local store `ADOPT-00` wrote, and does not scan for candidate directories or ask the operator to name the source again

#### Scenario: The external source is never written to

- **WHEN** any adoption step would create, modify, or delete a file inside the resolved canonical source
- **THEN** the step does not perform it and is recorded FAIL, because the source is read-only for the whole adoption

### Requirement: A target repository that is the canonical source's own working directory fails closed before validation

Before the three-artifact source validation runs, the launcher SHALL compare the repository the current session is rooted at against the candidate canonical source **by resolved, symlink-free filesystem path only**. Where the two resolve to the same location, the run SHALL stop immediately with zero target-repository writes, reporting that the target and the candidate source are the same working directory — adopting a repository into itself is not a supported operation. This check SHALL run **before**, not after, the existing four-artifact validation, since a matched location makes that validation meaningless.

**This comparison SHALL NOT extend to Git identity** — the common Git directory, root commit, or remote origin. Two directories that are separate linked worktrees of the same underlying repository SHALL NOT be treated as a match: each worktree has its own independent working tree, so no self-reference exists between them regardless of shared history. A check that compares Git identity produces a false positive for this legitimate, common topology and provides no protection the path comparison does not already provide.

#### Scenario: The launcher is pasted inside the canonical source's own working directory

- **WHEN** the repository the session is rooted at resolves to the same filesystem location as the candidate `<SPECBOOT_SOURCE>`
- **THEN** the run stops with zero target-repository writes, reports the location match, and does not proceed to the four-artifact validation

#### Scenario: Target and source are distinct working directories, even as worktrees of the same repository

- **WHEN** the repository the session is rooted at resolves to a different filesystem location than the candidate source, even where both are linked worktrees sharing the same Git common directory, root commit, and origin
- **THEN** this check passes — a shared Git identity between two distinct working trees is never treated as a match — and the existing four-artifact validation proceeds as before

#### Scenario: A symlinked path resolves to the same location as the candidate source

- **WHEN** the session's working directory is reached through a symlink that resolves to the same real path as the candidate source
- **THEN** the comparison is made on resolved paths, so the match is still detected and the run stops

### Requirement: A step-level approval gate auto-approves when a deterministic policy or prior evidence already answers it

Where a step's own approval gate would otherwise ask a live question, and a deterministic policy recorded in `ADOPTION-AUTHORIZATION.md` or prior validated evidence from an earlier step already answers it unambiguously, the gate SHALL auto-approve and record the answer as evidence rather than asking. This SHALL apply narrowly, to exactly the conditions each step's own text defines, and SHALL NEVER apply where the actual choice deviates from the recorded policy or evidence — a deviation SHALL always reach the live gate.

#### Scenario: An already-sufficient tool version needs no install decision

- **WHEN** a step's action would install or upgrade a tool, and the already-installed version already meets the step's own documented requirement
- **THEN** the install/upgrade command and its approval gate are skipped entirely, and the reused version is recorded as evidence

#### Scenario: A configuration choice matches the documented default

- **WHEN** a step's configuration choices exactly match that step's own documented least-privilege defaults and the corresponding `ADOPTION-AUTHORIZATION.md` policy
- **THEN** the step's approval gate auto-approves, and the generated configuration remains fully diff-reviewable evidence

#### Scenario: An exposure plan matches prior validated evidence exactly

- **WHEN** a step's proposed plan exposes exactly what an earlier step already validated and recorded, with nothing different or additional
- **THEN** the step's approval gate auto-approves, recording the plan as evidence rather than presenting it as a live question

#### Scenario: A deviation always reaches the live gate

- **WHEN** an install choice, a configuration choice, or an exposure plan differs in any way from the recorded policy or prior evidence
- **THEN** the step's approval gate is presented as a live `[HUMAN APPROVAL REQUIRED]` question, exactly as it would be without this mechanism

### Requirement: Source-linked mode copies no canonical content into the adopting project

In source-linked mode the adoption SHALL NOT copy the adoption guide, the phase files, the run-log template, or the orchestration skill body into the project, and SHALL NOT create `.specboot/bootstrap/` at all. It SHALL store only project-specific durable state under `.specboot/adoption/`. It SHALL provision only the declared client's **temporary** discovery entries, each pointing at the external canonical guide and skill rather than at a local copy. Those entries name an absolute path valid on one machine only: they SHALL be excluded from every checkpoint's staged scope, SHALL NEVER be committed, and SHALL be removed — or the file they were appended to byte-restored — by `ADOPT-18`. The same rule SHALL apply to the machine-local source-path store under `.specboot/local/`. No committed artifact produced by a source-linked run SHALL contain an absolute external path.

#### Scenario: No canonical content is copied

- **WHEN** source-linked bootstrap completes
- **THEN** the project contains no copied guide, no copied phase files, no copied skill body, and no `.specboot/bootstrap/` directory, and the only durable state written is under `.specboot/adoption/`

#### Scenario: Discovery entries point outward

- **WHEN** the selected client's discovery entries are provisioned in source-linked mode
- **THEN** they resolve to the external canonical guide and skill, and no local copy of either is created to resolve them against

#### Scenario: A machine-specific entry is never staged

- **WHEN** a checkpoint stages its intended files while source-linked discovery entries are present
- **THEN** those entries are excluded from the staged scope and remain uncommitted, and staging one is recorded FAIL rather than accepted as a cosmetic difference

#### Scenario: The selected client cannot discover the external skill without a symlink

- **WHEN** the environment cannot create a symlink to the external source, and the selected client's recipe provides no native discovery mechanism that works without one
- **THEN** the run stops before provisioning, reports the capability limitation naming the client, the mechanism, and what was attempted, leaves the target repository byte-for-byte unchanged, and creates neither a content copy nor a pointer file recorded as a discovery entry

#### Scenario: A pointer file is not a discovered skill

- **WHEN** a real file naming the external path exists at a client's expected skill location
- **THEN** it is not recorded as a discovery entry, does not satisfy the discovery-and-execution gate, and does not permit the run to continue as though discovery had been provisioned

### Requirement: The manifest records the delivery mode and the source provenance

`.specboot/adoption/BOOTSTRAP-MANIFEST.json` SHALL record, for the run as a whole, **portable source identity only**: the `delivery-mode`; the `guide-checksum`; the `skill-checksum`; the source Git commit or its explicit unavailable record; and an **explicit statement that the local source path is resolved per machine and is not stored in the committed manifest**.

The resolved absolute source path SHALL NOT be written to the committed manifest, to the committed run log, or to any other committed artifact. It is machine-local runtime state. Where a run needs it after the fact — most commonly to resume on the same machine without re-asking — it SHALL be stored **only** in machine-local, git-ignored state under `.specboot/local/`, which SHALL receive an ignore rule by the same per-path probe mechanism as the other transient paths, and which `ADOPT-18` SHALL remove.

That machine-local store SHALL be a **convenience pointer, not a second provenance mechanism**: it SHALL hold the path and nothing else — no checksum, no commit, no delivery mode — it SHALL NEVER be read as evidence of identity, and its absence SHALL NEVER be an error. The committed manifest's `source` block remains the single provenance record.

Git provenance SHALL carry exactly one of three dispositions, and SHALL NEVER be inferred, invented, or omitted — an absent field is indistinguishable from an uncollected one:

- Where the source is a Git working tree with **no uncommitted changes**, the commit SHALL be recorded.
- Where the source is **not** a Git working tree, or the commit cannot be determined, provenance SHALL be recorded as explicitly **unavailable together with its reason**.
- Where the source **is** a Git working tree but has **uncommitted changes**, provenance SHALL be recorded as **unavailable together with that reason**, because the HEAD commit does not identify the content the run actually read. The observed HEAD MAY be retained as **context explicitly labelled as not identifying the source content**, and SHALL NOT be written to the field a consumer reads as identity.

Identity SHALL remain the checksums in all three cases, since they are computed over the bytes actually read and are therefore correct whether the source is clean, dirty, or not a repository at all. The external canonical source SHALL NEVER appear as a manifest entry, since manifest entries are the authority for what may be removed and the source is never removable.

#### Scenario: Provenance is recorded for a clean Git source

- **WHEN** the resolved canonical source is a Git working tree with no uncommitted changes
- **THEN** the manifest records the delivery mode, both checksums, the source commit, and the statement that the local source path is resolved per machine and is not stored in it — and it records no absolute source path

#### Scenario: Git source has uncommitted changes

- **WHEN** the resolved canonical source is a Git working tree whose working directory has uncommitted changes
- **THEN** Git provenance is recorded as unavailable with that reason, no commit value is written to the identity field, any retained HEAD is labelled as not identifying the source content, and the checksums still record what was actually read

#### Scenario: No absolute source path reaches a committed artifact

- **WHEN** a source-linked run's committed artifacts are inspected after `ADOPT-00`
- **THEN** neither the manifest nor the run log nor any other committed file contains the resolved absolute source path, and the committed tree contains no absolute external path at all

#### Scenario: The machine-local path store is ignored and is not provenance

- **WHEN** a run stores the resolved source path for later reuse on the same machine
- **THEN** it is written under `.specboot/local/`, `git check-ignore` reports that path ignored, the store holds the path and no checksum, commit, or delivery mode, and deleting it causes no failure beyond the run asking for a source path again

#### Scenario: Source is not a Git repository

- **WHEN** the resolved canonical source is not a Git working tree
- **THEN** Git provenance is recorded as unavailable with the reason that the source is not a Git repository, and no commit value is inferred or invented

#### Scenario: The source is not an entry

- **WHEN** the manifest is written in source-linked mode
- **THEN** its entries are the project-local discovery entries only, and no entry describes the external canonical source or any path inside it

### Requirement: Source drift blocks resume and stops for human reconciliation

On resume the orchestrator SHALL obtain a local canonical source path — from the machine-local store under `.specboot/local/` where one exists on this machine, otherwise by asking the operator or rediscovering it — and SHALL recompute the guide and skill checksums against it, comparing them with the values recorded in the manifest. Identity SHALL be established by those checksums, and by the recorded Git commit where one is available. **No path is recorded in the committed manifest, so no path can be, or be treated as, identity.** A mismatch SHALL be treated as **drift**: the orchestrator SHALL stop for human reconciliation and SHALL NOT continue against changed instructions. Where no local path is known — the ordinary case on any machine but the first — the orchestrator SHALL request or rediscover one and SHALL accept it only when the recorded checksums, and the recorded commit where one exists, match. It SHALL NEVER require any previously used absolute path to exist, and an absent machine-local store SHALL NOT be treated as a failure. A running adoption SHALL NOT consume changes made to the canonical source after its recorded checksums; such changes SHALL become input to a later adoption or to a re-baselining the human explicitly approves and the run log records.

#### Scenario: Canonical source changed mid-adoption

- **WHEN** the orchestrator resumes and the recomputed guide or skill checksum differs from the recorded value
- **THEN** it stops for human reconciliation and does not proceed, rather than silently adopting the changed instructions

#### Scenario: Resume from a different machine

- **WHEN** the orchestrator resumes on a machine that has no machine-local source-path store
- **THEN** it requests or rediscovers a local source path and resumes only if the recorded checksums and any recorded commit match, and the absence of a known path is not itself treated as a failure

#### Scenario: Resume on the same machine reuses the machine-local path

- **WHEN** the orchestrator resumes on the machine that ran `ADOPT-00`, where `.specboot/local/` still holds the resolved path
- **THEN** it reuses that path without asking, still verifies the recorded checksums against it before continuing, and blocks on a mismatch exactly as it would for a path the operator supplied

#### Scenario: Improvements land upstream during a run

- **WHEN** an accepted improvement is applied to the canonical source while an adoption is in progress
- **THEN** the running adoption continues against its recorded checksums, and the change is taken up by a later adoption or by an approved re-baselining rather than absorbed silently

### Requirement: Bootstrap a repository with no SpecBoot files and no AI configuration

The adoption workflow SHALL provide a bootstrap step (`ADOPT-00`) that prepares a repository which may contain no SpecBoot files and no AI client configuration. The step SHALL resolve and validate the canonical SpecBoot source before its first repository-local write and SHALL fail closed where none validates, detect whether the target is a Git repository, detect any pre-existing SpecBoot or AI artifacts, obtain the selected clients from an explicit human selection rather than by inference, and detect the operating system and shell. It SHALL materialize a durable control record under `.specboot/adoption/` and SHALL NOT create `.specboot/bootstrap/` at all. It SHALL NOT overwrite or clobber any pre-existing repository file. The first repository-local write SHALL be preceded by a `[HUMAN APPROVAL REQUIRED]` gate presenting the exact mutation inventory produced by the preflight, and the paths named at that gate SHALL be exactly those the run will create or modify.

#### Scenario: Virgin repository is bootstrapped

- **WHEN** `ADOPT-00` runs against a repository with no `ai-specs/`, no client directory, and no root instruction file
- **THEN** it records the detected environment, the resolved source, and the operator-supplied client selection, stops at the approval gate naming the exact paths it will create, and only after approval writes the durable `BOOTSTRAP-MANIFEST.json` and the temporary discovery entries, creating no `.specboot/bootstrap/` at any point

#### Scenario: Client selection is never inferred

- **WHEN** `ADOPT-00` needs to know which AI client is being adopted and a client directory happens to be present on disk
- **THEN** it still asks the operator to declare the selected client, and records the declared selection as the authority, rather than inferring selection from the presence of a directory

#### Scenario: Pre-existing artifact is preserved

- **WHEN** `ADOPT-00` finds a file already present at a path its payload would occupy
- **THEN** it does not overwrite that file, records it in the manifest with `ownership: pre-existing-untouched` or `pre-existing-modified` as applicable, and reports the conflict

#### Scenario: Re-running bootstrap is a no-op

- **WHEN** `ADOPT-00` runs a second time against an already-bootstrapped repository
- **THEN** it reports the existing manifest entries and makes no further change

### Requirement: Bootstrap never occupies a path a later step must create as a symlink

Bootstrap SHALL NOT create a real file or directory at a path that a later adoption step must create as a symlink, because both `cp -rn` and the installer's symlink creation skip paths that already exist and record them only as skipped, and `ADOPT-13` preserves a real directory that collides with a canonical skill name. Where a bootstrap-created real file at such a path is unavoidable, it SHALL be registered in `.specboot/adoption/BOOTSTRAP-MANIFEST.json` with an `intended-permanent-replacement`, and `ADOPT-18` SHALL convert it to the canonical symlink.

#### Scenario: Root instruction file must not be shadowed

- **WHEN** bootstrap needs a root instruction pointer and no root `AGENTS.md` exists
- **THEN** it creates `AGENTS.md` as a real file registered in the manifest with `intended-permanent-replacement` naming the canonical `docs/base-standards.md` symlink, so `ADOPT-18` converts it rather than leaving it to block the canonical symlink permanently

#### Scenario: Existing root instruction file receives a delimited block

- **WHEN** bootstrap needs a root instruction pointer and a root instruction file already exists
- **THEN** it appends a delimited bootstrap block recorded in the manifest with `mode: appended-block`, and `ADOPT-18` removes only that block, leaving the rest of the file unchanged

#### Scenario: Client skill path uses a symlink, not a real directory

- **WHEN** bootstrap exposes the orchestration skill to a client whose skill directory convention is a relative symlink
- **THEN** it creates a symlink rather than a real directory, so that `ADOPT-13`'s collision rule (preserve the real directory, skip the symlink) cannot make the bootstrap artifact permanent

### Requirement: Pre-adoption discoverability by the selected client

After `ADOPT-00` completes, a genuinely fresh session of the selected client SHALL surface the `specboot-adopt` skill and reach `SPECBOOT_ADOPTION_GUIDE.md` without the operator pasting any path. A resource supplied manually after session start SHALL NOT be counted as discovery. Validation of this requirement SHALL be a fresh-session discovery probe; filesystem presence alone SHALL NOT be recorded as discovery. Discovery SHALL be validated only in a session that started **after** the discovery entries were provisioned, and the provisioning session's direct read of a canonical file at a source-relative path SHALL NOT be counted as discovery.

#### Scenario: Fresh session discovers the skill and guide

- **WHEN** a fresh session of the selected client starts in a bootstrapped repository and is asked to adopt SpecBoot
- **THEN** it reaches `specboot-adopt` and the adoption guide through the client's own discovery mechanism, with no operator-supplied paths, and the probe is recorded as PASS

#### Scenario: Presence on disk is not discovery

- **WHEN** the discovery entry exists on disk but a fresh session does not surface it without the operator pasting the path
- **THEN** the check is recorded as FAIL, not PASS, and the bootstrap discovery mechanism is corrected before adoption proceeds

#### Scenario: The provisioning session's direct read is not discovery

- **WHEN** the initial session reads the canonical `SKILL.md` by source-relative path in order to perform the bootstrap
- **THEN** that read is recorded as a direct read and the discovery probe remains outstanding until a fresh session surfaces the skill through the client's own mechanism

### Requirement: Client selection precedes client-specific configuration, and autodiscovery never authorizes it

Client selection SHALL be completed before any client-specific configuration is performed, and SHALL reach the orchestrator by one of exactly two routes: the human names the clients manually, or the orchestrator performs a **read-only** autodiscovery of candidate clients, displays the findings, and waits for the human to select from them. Autodiscovery SHALL perform no write of any kind — no directory, no file, no permission entry, no discovery link — before a human selection exists, and its findings SHALL NEVER be treated as authorization to configure anything. A discovered client SHALL be a candidate only. The adoption SHALL provision artifacts exclusively for clients the human explicitly selected, and every client not selected SHALL be recorded `NOT SELECTED`. Where autodiscovery finds no candidate, the manual route SHALL remain available, and finding nothing SHALL NOT be treated as an instruction to proceed with no client.

#### Scenario: Autodiscovery writes nothing before selection

- **WHEN** the orchestrator runs autodiscovery against a repository
- **THEN** the repository tree is byte-for-byte unchanged when the findings are displayed, and no configuration has been performed for any discovered client

#### Scenario: A discovered client is not a selected client

- **WHEN** autodiscovery reports two candidate clients and the human selects one
- **THEN** only the selected client is provisioned, the other is recorded `NOT SELECTED`, and its presence on disk does not cause any artifact to be created for it

#### Scenario: Manual selection needs no autodiscovery

- **WHEN** the human names the clients directly
- **THEN** the adoption proceeds with that selection, and no autodiscovery is required to confirm it

#### Scenario: Configuration is never attempted before selection exists

- **WHEN** a client-specific configuration action is reached and no human selection has been recorded
- **THEN** the orchestrator stops and obtains the selection first, rather than configuring the client it considers most likely

### Requirement: An explicit supported client selection precedes every bootstrap write

The adoption SHALL require an explicit human client selection naming at least one **supported** client before it performs any bootstrap write, and both failure modes SHALL be refusals that leave the target repository byte-for-byte unchanged.

Where **no client has been selected**, the run SHALL stop and report that a selection is required. It SHALL NOT provision nothing and continue, SHALL NOT infer a selection from a directory present on disk, and SHALL NOT record a placeholder value — `undeclared` or equivalent — into the committed manifest, since a committed placeholder is a durable claim that a human made a choice they did not make.

Where a **selected client has no recipe**, the run SHALL stop, SHALL report the unknown client together with the clients that are supported, and SHALL NOT substitute the nearest supported client.

Both refusals SHALL occur before the preflight, since there is nothing to preflight until the run knows whose recipe applies, and therefore before any path is created or modified.

#### Scenario: Bootstrap is attempted with no client selected

- **WHEN** a bootstrap write is reached and no explicit human client selection has been recorded
- **THEN** the run stops and reports that a selection is required, the target repository is byte-for-byte unchanged, and no manifest, run log, discovery entry, ignore rule, or machine-local store was created

#### Scenario: An unknown client is selected

- **WHEN** the operator selects a client for which no recipe exists
- **THEN** the run stops, names the unsupported client and lists the supported ones, writes nothing, and does not provision the nearest supported client in its place

#### Scenario: A placeholder selection is never committed

- **WHEN** the committed manifest's client-selection record is inspected after any bootstrap
- **THEN** it names the clients a human explicitly selected, and contains no placeholder, default, or `undeclared` value standing in for a selection that was never made

### Requirement: A complete preflight precedes every write, and provisioning is all-or-nothing

Before the first target-repository write, the adoption SHALL run a preflight that resolves **every** path the selected client's recipe and the durable state will occupy — discovery entries, instruction-file blocks, `.specboot/adoption/`, the ignore rules, and the machine-local source-path store — and classifies each as absent, `pre-existing-untouched`, or colliding. It SHALL report **all** detected collisions together, and SHALL NOT discover them incrementally as individual writes fail.

The `[HUMAN APPROVAL REQUIRED]` gate SHALL then present the **exact mutation inventory**: each path, whether it will be created or modified, by what mechanism, and whether the operation is reversible. The run SHALL perform exactly that inventory and nothing outside it. A path that turns out to require a different mechanism than the one approved SHALL require a new approval rather than an adjustment.

Where provisioning fails after it has begun, the run SHALL restore the target repository to its pre-provisioning state. It SHALL leave **no** partial discovery entry, no partial `BOOTSTRAP-MANIFEST.json`, no partial run log, no orphaned ignore rule, and no orphaned machine-local store. The end state of a failed bootstrap SHALL be a repository that was never bootstrapped.

#### Scenario: Every collision is reported at once

- **WHEN** the preflight runs against a repository where three of the paths the recipe would occupy already exist
- **THEN** all three collisions are reported together before the approval gate, rather than the first being reported after a write has already been performed for another

#### Scenario: The approval gate names the exact mutations

- **WHEN** the run reaches the pre-provisioning approval gate
- **THEN** it lists each path with the operation, the mechanism, and the reversibility, and after approval it creates or modifies exactly those paths and nothing else

#### Scenario: A failure leaves nothing behind

- **WHEN** provisioning fails partway through, after some paths have been written
- **THEN** the target repository is restored to its pre-provisioning state, with no discovery entry, manifest, run log, ignore rule, or machine-local store left behind, and a retry begins from a repository that was never bootstrapped

#### Scenario: An unapproved mechanism requires a new gate

- **WHEN** a path approved for creation as a symlink can only be created by another mechanism
- **THEN** the run stops and requests a new approval naming the new mechanism, rather than substituting it under the existing approval

### Requirement: Client selection is declared, and per-client status governs the adoption

The adoption process SHALL be client-agnostic; only its client-dependent actions SHALL consult a per-client recipe. The canonical layer — adoption-step order, the run-log and evidence contract, status semantics, human-approval gates, the checkpoint, commit, push, bootstrap, de-bootstrap, pilot, and improvement-recording rules, the mandatory code-graph capability, and the fresh-session discovery-and-execution evidence contract — SHALL name no client. The recipe layer SHALL carry the project-instruction discovery path, the skill exposure mechanism, the permission-file format and its reconciliation, native capability invocation, the fresh-session procedure, observable model/reasoning evidence, and client-specific bootstrap and de-bootstrap operations.

The human SHALL declare the selected client or clients at `ADOPT-00`, either by naming them or by selecting from displayed read-only autodiscovery findings; selection SHALL NEVER be inferred from a client directory present on disk, and displaying a discovered directory SHALL NEVER stand in for selecting it. The orchestrator SHALL then execute the canonical process, substituting the selected client's recipe at each client-dependent action. Each client SHALL carry exactly one of these states, and the state SHALL determine its effect on the adoption: `SELECTED` with `PASS` satisfies that client's gate; `SELECTED` with `PENDING EVIDENCE` SHALL block the adoption; `SELECTED` with `FAIL` SHALL block the adoption; `NOT SELECTED` SHALL provision and validate no artifacts for that client and SHALL NEVER block the adoption. `NOT SELECTED` SHALL NOT be recorded as `PENDING EVIDENCE`, since `PENDING EVIDENCE` asserts intended support that a run could not exercise, which is a claim nobody made about an unselected client. A `PASS` recorded for one client SHALL prove support for that client only and SHALL NEVER be reported as universal or multi-client support.

#### Scenario: Only the selected client is provisioned

- **WHEN** the human declares one client at `ADOPT-00` and the repository contains directories for others
- **THEN** the adoption provisions and validates artifacts for the declared client only, records the others as `NOT SELECTED`, and the unselected clients neither block nor contribute evidence

#### Scenario: A selected client cannot be exercised

- **WHEN** a client is selected but its discovery-and-execution gate cannot be run in this environment
- **THEN** it is recorded `SELECTED` + `PENDING EVIDENCE` and the adoption is blocked, rather than proceeding on the basis that the artifacts exist on disk

#### Scenario: One client's pass is not another's

- **WHEN** an adoption completes with one selected client at `PASS`
- **THEN** support is reported for that client alone, and no artifact states or implies that the other clients are supported

### Requirement: The selected client passes a discovery-and-execution gate before support is claimed

Support for a selected client SHALL NOT be claimed until its recipe passes a gate of three parts, in order: discovery of the client's project-scoped mechanism from that client's current official documentation, with the source and consultation date recorded (external research requiring explicit user authorization first); construction of the mechanism in an isolated throwaway repository rather than in the repository under adoption; and a fresh-session test proving both that the skill is **discovered** without being pasted or supplied after session start and that its **canonical content executes**. Presence on disk SHALL NOT be recorded as discovery, and discovery SHALL NOT be recorded as execution. Until the gate passes in full for a selected client, that client SHALL be recorded as `PENDING EVIDENCE` or `unavailable` in every artifact that reports client support, SHALL NEVER be recorded as PASS, and SHALL NEVER be quietly omitted. The gate SHALL be applied to whichever client is selected; the Codex gate SHALL be retained as the Codex recipe's instance of it rather than as the definition of the gate itself.

**An outstanding gate is an obligation on the recipe, not on every adoption.** Where a shipped recipe's gate has not been run, that client SHALL be recorded `PENDING EVIDENCE` as a **standing client-specific obligation** carried forward to any future adoption that selects it. An adoption that did not select that client SHALL record it `NOT SELECTED` and SHALL NOT be blocked by the outstanding obligation, because `SELECTED` + `PENDING EVIDENCE` blocks the adoption *that selected it* and no other. The obligation SHALL NOT be discharged, converted to PASS, or quietly dropped by a run that never exercised it, and no artifact SHALL report such a client as supported or report an unrelated adoption as blocked by it.

#### Scenario: An unrun gate does not block an adoption that did not select its client

- **WHEN** a shipped recipe's discovery-and-execution gate has not been run, and an adoption selects a different client
- **THEN** the unrun client is recorded `NOT SELECTED` for that adoption and does not block it, while remaining `PENDING EVIDENCE` as a standing obligation for any adoption that later selects it

#### Scenario: An unrun gate is not discharged by an unrelated pass

- **WHEN** an adoption completes successfully with a different client at `PASS`
- **THEN** the outstanding client's `PENDING EVIDENCE` status is unchanged, is not converted to `PASS`, and is not removed from the artifacts that record it

#### Scenario: Candidate path exists but is unverified

- **WHEN** the candidate skill path for a selected client exists on disk but no fresh-session execution test has been performed
- **THEN** that client is recorded as `PENDING EVIDENCE`, and no artifact states or implies that it is supported

#### Scenario: Discovery experiment stays out of the adopting repository

- **WHEN** a client's discovery mechanism is being established
- **THEN** it is built first in a throwaway repository, and no experimental artifact is left in the repository under adoption

#### Scenario: Discovery without execution is not a pass

- **WHEN** a fresh session surfaces the skill but its canonical content does not execute
- **THEN** the gate is not passed, because presence is not discovery and discovery is not execution

### Requirement: Execution and resume driven by the filled run log

On invocation the orchestrator SHALL read the filled run log's step-state table first and name the next step before acting. An empty evidence block SHALL mean "not known to have completed", never "completed but unrecorded". After an unexpected interruption the orchestrator SHALL return to the first step lacking complete PASS evidence and re-run that step's full validation rather than resuming past it. The filled run log SHALL live at the deterministic committed path `.specboot/adoption/ADOPTION-RUN-LOG.md`.

#### Scenario: Resume after interruption with an empty evidence block

- **WHEN** the orchestrator resumes and finds a step whose state suggests completion but whose evidence block is empty
- **THEN** it treats that step as not known to have completed, returns to it, and re-runs its full validation

#### Scenario: Next step is named before any action

- **WHEN** the orchestrator is invoked against a partially completed adoption
- **THEN** it reads the step-state table and states which step is next before performing any repository mutation

### Requirement: Approval gates stop execution and are never self-approved

At every `[HUMAN APPROVAL REQUIRED]` marker the orchestrator SHALL stop, state the exact mutation including the affected paths, the commands to be run, and the reversibility of the operation, and wait for a human response. It SHALL NEVER self-approve. An approval SHALL be scoped to the named mutation only and SHALL NOT extend to a later step, a broader command, or a repeat run. A recorded prior approval for a different mutation SHALL NOT be treated as approval.

#### Scenario: Operator is absent at a gate

- **WHEN** the orchestrator reaches an approval gate and no human is available to respond
- **THEN** it stops and waits, and does not proceed on the basis that the outcome of the approval is predictable

#### Scenario: Prior approval is not reused

- **WHEN** a mutation was approved at an earlier step and a later step proposes a different mutation
- **THEN** the orchestrator requests a new approval naming the new mutation, rather than treating the earlier approval as covering it

### Requirement: Unexecuted or failed commands are FAIL

Every command the orchestrator relies on SHALL be recorded with its exact text, its exit code, and a summary of its output. An unexecuted command SHALL be FAIL. A failed command SHALL be FAIL. Empty output SHALL NEVER be inferred as PASS. Where a shell alias or function could shadow a tool, validation SHALL use absolute executable paths. Permission to run a command SHALL NOT be recorded as evidence that it ran, and running a command SHALL NOT be recorded as evidence that it passed.

#### Scenario: Read-only check returns empty output

- **WHEN** a validation command produces no output and its exit status was not captured
- **THEN** the step is recorded as FAIL, not PASS, because empty output is not evidence of success

#### Scenario: Command was never executed

- **WHEN** a step's validation command was not run
- **THEN** the step is recorded as FAIL, regardless of how many prior steps already passed

#### Scenario: Alias shadowing is neutralized

- **WHEN** a validation command names a tool that a shell alias or function could shadow
- **THEN** the orchestrator invokes it by absolute executable path and records the exact invoked path

### Requirement: A code-graph capability is mandatory and the workflow fails closed without one

Adoption SHALL require a code-graph capability. CodeGraph SHALL be optional only as the product choice: a company-approved equivalent providing the required repository-graph capability is equally acceptable. The capability-selection step SHALL record the selected implementation, its version, executed availability evidence, and any coverage limitations. If no implementation is usable, the step SHALL be **FAIL** and adoption SHALL stop there — absence SHALL NOT be recorded as a skip, a waiver, or `PENDING EVIDENCE`. Downstream steps that previously consumed CodeGraph conditionally SHALL become unconditional consumers of the selected capability.

#### Scenario: No usable graph capability

- **WHEN** neither CodeGraph nor a company-approved equivalent can be established and verified
- **THEN** the capability-selection step is FAIL and adoption stops, with no waiver path and no `PENDING EVIDENCE` classification available

#### Scenario: Availability is proven by execution, not assertion

- **WHEN** an operator states that a code-graph capability is available
- **THEN** the step still requires an executed verification command returning a non-empty structured result, and records that evidence

#### Scenario: Company-approved equivalent is selected

- **WHEN** the operator supplies a named company-approved equivalent together with its verification command
- **THEN** the orchestrator validates that the command runs and returns a non-empty structured result, records the name, version, and limitations, and does not attempt to judge the tool's quality

#### Scenario: Small repository is not an exemption

- **WHEN** an operator argues the repository is small enough that text search suffices and indexing is too slow
- **THEN** the requirement is unchanged: no usable graph capability is FAIL, and the adoption does not continue with the gap recorded as a limitation

### Requirement: Selected-client permission baseline is provisioned and reconciled without overwriting

The permission-baseline step SHALL locate the approved generic baseline, copy it when absent and **merge** it when present — never overwrite. It SHALL declare the team supported-environment matrix across clients, stacks, shells, and operating systems; reconcile by removing out-of-matrix entries, **retaining** supported variants that are absent from the current machine, and adding only what the real project needs; run a safety check for credentials, home directories, machine-specific paths, and unsafe broad patterns before any permission file is committed; run a syntax check; and smoke-test each available client/OS combination. Every supported combination that cannot be exercised SHALL be marked `PENDING EVIDENCE`. The generic source baseline SHALL be left unchanged.

#### Scenario: Existing permission file is merged

- **WHEN** a client permission file already exists and appears outdated
- **THEN** the step merges the baseline into it and never overwrites it

#### Scenario: Out-of-machine supported variants are retained

- **WHEN** the operator's machine is macOS and the matrix declares Windows support
- **THEN** the Windows entries are retained rather than removed as noise, and their smoke test is marked `PENDING EVIDENCE`

#### Scenario: Safety check precedes commit

- **WHEN** a permission file is about to be committed
- **THEN** the credential, home-directory, machine-path, and broad-pattern safety scan has already run and passed

### Requirement: Portability across client, operating system, and shell

The orchestrator and the bootstrap kit SHALL be client-agnostic, carrying separate recipes for Claude, Kiro, and Codex without requiring any single adoption to configure or validate more than the clients it selected; operating-system-neutral across macOS, Linux, and Windows; and shell-neutral across Bash, zsh, and PowerShell. Client-neutrality SHALL mean that the canonical process names no client, not that every adoption exercises every client. Loop syntax SHALL be derived from the active shell, preferring explicit per-item commands or a shell-native array over a space-separated scalar loop. POSIX-only tooling SHALL NOT be assumed: every such command SHALL have a declared PowerShell equivalent. Symlink creation SHALL be capability-detected rather than assumed. Where symlinks are unavailable and the selected client's recipe offers no native discovery mechanism that works without one, the run SHALL fail closed before provisioning and report the capability limitation; it SHALL NOT record a content copy or a pointer file as a discovery entry. All paths SHALL be repository-relative.

#### Scenario: Symlink creation is unavailable

- **WHEN** the environment cannot create symlinks, for example on Windows without the required privilege
- **THEN** the kit copies the affected content as real files, records `mode: copy` with the reason in the manifest, and `ADOPT-18` removes the copy rather than attempting to unlink it

#### Scenario: Combination that cannot be exercised

- **WHEN** a **selected** client × OS × shell combination cannot actually be run during implementation
- **THEN** it is recorded as `PENDING EVIDENCE` with the reason, and is never recorded as PASS

#### Scenario: Combination for a client nobody selected

- **WHEN** a client was not selected at `ADOPT-00`
- **THEN** its rows are recorded `NOT SELECTED` rather than `PENDING EVIDENCE`, no artifacts are provisioned or validated for it, and it does not block the adoption

#### Scenario: Word-splitting failure mode is avoided

- **WHEN** the orchestrator iterates over a list of paths in a shell whose list expansion and word-splitting semantics differ
- **THEN** it uses explicit per-item commands or a shell-native array, so that a path containing a space cannot produce a malformed artifact name

### Requirement: Evidence, deviations, failures, recoveries, and adaptations are recorded

The run log SHALL record, per step: the evidence the step's contract requires; every deviation from the guide; every failure with its exact command and exact error; every recovery identifying which `On failure` form (inline, a named troubleshooting entry, or a named owning `ADOPT-nn`) resolved it; and every client-specific or company-specific adaptation with its reason and its blast radius. The filled run log and the durable manifest SHALL be the evidence artifacts, with no parallel log: the manifest is the machine-readable record of what was created and what became of it, and the run log is the narrative record of what happened, what failed, and what was approved.

#### Scenario: Failure and recovery are both recorded

- **WHEN** a step fails and is then resolved by following a named troubleshooting entry
- **THEN** the run log records the exact failing command, the exact error, the troubleshooting entry that resolved it, and the resolution form used

#### Scenario: Adaptation carries its blast radius

- **WHEN** a client-specific or company-specific adaptation is applied
- **THEN** the run log records the adaptation, its reason, and which other steps or artifacts it affects

### Requirement: Checkpoint granularity is the smallest independently validated step

A checkpoint SHALL be the smallest independently validated `ADOPT` step, defaulting to one checkpoint per step. A phase file SHALL NOT be treated as automatically constituting a checkpoint, since a phase file is a documentation boundary rather than a validation boundary. Dependent steps MAY be grouped into a single checkpoint only with an explicit written justification recorded in the checkpoint ledger, on structural grounds: the earlier step produces no independently observable end state, or the intermediate state is not reviewable or not safe to leave in place, or the guide's own step contract makes the steps an executed pair. Convenience grounds such as fewer commits, shared file location, or speed SHALL NOT be accepted as justification, and grouping SHALL be a recorded exception each time rather than a standing policy.

#### Scenario: Four validated steps are not merged for tidiness

- **WHEN** four steps have been validated and merging them into one checkpoint would produce a tidier history
- **THEN** they remain four checkpoints, because tidiness is not a structural justification

#### Scenario: Checkpoint reached at an early step

- **WHEN** a checkpoint is reached after an early adoption step, long before the project baseline has been run
- **THEN** the checkpoint protocol applies in full at that point, and its applicability does not depend on the precondition of any single later step

#### Scenario: Documented executed pair is grouped with justification

- **WHEN** an adapt step and its immediately following read-only validation step are described by the guide as executed as a pair
- **THEN** they may form one checkpoint, and the ledger records the written structural justification

### Requirement: Checkpoint readiness is declared with complete evidence

The orchestrator SHALL declare a checkpoint ready for human review with: the checkpoint id, the steps covered, the validation results, the evidence pointers, any open deviations, the improvement proposals raised, and the exact staged file list. It SHALL NOT declare readiness while any step in the checkpoint is at FAIL or PENDING.

#### Scenario: Checkpoint contains a pending step

- **WHEN** one step in a proposed checkpoint is still PENDING
- **THEN** the orchestrator does not declare the checkpoint ready for review

#### Scenario: Staged file list is exact

- **WHEN** a checkpoint is declared ready
- **THEN** the declaration lists the exact files staged, not a summary or a count

### Requirement: Each approved checkpoint is committed and pushed under two distinct gates

Each independently validated checkpoint SHALL proceed in this order: present the checkpoint evidence and the exact Git scope as a precise file list rather than a summary; obtain explicit human approval of the checkpoint at a `[HUMAN APPROVAL REQUIRED]` gate; stage only the intended files, never an unconditional `git add -A`, apply the full staged-scope checklist, and re-run a fresh independent review after any correction; commit; determine and report the remote impact; and push to the current working branch only, after a second, separate `[HUMAN APPROVAL REQUIRED]` gate. A commit approval SHALL NOT be treated as a push approval, and neither SHALL carry forward to a subsequent checkpoint.

**Both gates MAY auto-approve, mechanically, when every one of these holds**: the exact staged file list is a subset of the checkpoint's step's declared `Allowed modifications`; a standing authorization recorded in `ADOPTION-AUTHORIZATION.md` for this run covers the checkpoint's class; the push, if reached, is fast-forward; and the remote-impact assessment is unchanged from the `ADOPT-00` baseline (no new CI, ruleset, webhook, branch protection, force push, pull request, deployment, or destructive Git operation). Auto-approval SHALL be recorded as evidence — including an explicit `Allowlist match: YES` result — in the checkpoint ledger exactly as a live approval is, and SHALL NOT be presented as though a human reviewed it. Any staged path that is not a member of the step's declared `Allowed modifications` SHALL NOT be treated as a pending question: it SHALL be `FAIL_CLOSED`, reported by its exact unexpected path, and SHALL block the checkpoint until resolved.

This protocol SHALL be defined **once** as a reusable procedure in canonical adoption-contract content that is already inside the bounded per-step working set, so that any step can invoke it without loading an additional file. Every independently validated step or justified group SHALL invoke that one definition. The step that captures the completed permanent adoption — the final checkpoint of the adoption itself (`ADOPT-17`) — SHALL retain its own precondition and its own position in the step sequence, and SHALL reuse the shared protocol rather than defining a competing copy of it; its precondition SHALL NOT be treated as a precondition of the protocol itself. Being the final checkpoint *of the adoption* SHALL NOT be read as being the last checkpoint of the workflow: the steps that follow it — de-bootstrap (`ADOPT-18`), which commits the updated manifest, and the end-to-end pilot (`ADOPT-19`) — are themselves independently validated steps and SHALL each form their own checkpoint under this protocol. The orchestration skill's reference material MAY explain how the orchestrator drives the protocol and records its evidence, but SHALL NOT restate or redefine the protocol's normative steps, since a second statement of the same procedure would become a competing authority that drifts from the contract.

#### Scenario: Protocol is defined once and invoked many times

- **WHEN** the adoption contract specifies the checkpoint procedure
- **THEN** the normative steps exist in exactly one canonical location reachable within the bounded working set, and each checkpoint invokes that definition rather than carrying its own copy

#### Scenario: Final adoption checkpoint reuses the shared protocol

- **WHEN** the final checkpoint of the adoption itself (`ADOPT-17`) runs after the project baseline has passed
- **THEN** it keeps its own precondition and sequence position, and executes the shared protocol rather than defining a separate one

#### Scenario: Checkpoints continue after the final adoption checkpoint

- **WHEN** de-bootstrap or the end-to-end pilot runs after `ADOPT-17`
- **THEN** each is treated as its own checkpoint under the same protocol, and `ADOPT-17` being the adoption's final checkpoint does not exempt them

#### Scenario: Skill reference does not become a second authority

- **WHEN** the orchestration skill's reference material describes checkpoint handling
- **THEN** it explains orchestration and evidence recording while pointing to the canonical protocol, and does not restate the normative steps as an independent source

#### Scenario: Push approval is requested separately from commit approval

- **WHEN** a checkpoint commit has just been approved and created
- **THEN** the orchestrator requests a separate push approval, and does not treat the push as implied by the commit approval

#### Scenario: Staging is explicit

- **WHEN** the orchestrator stages a checkpoint
- **THEN** it stages the enumerated intended files and never runs an unconditional stage-everything command

#### Scenario: Correction triggers a fresh review

- **WHEN** the staged scope is corrected after review
- **THEN** a fresh independent review of the corrected staged diff runs before commit approval is requested, and the reviewer that made the correction is not treated as the last check

#### Scenario: Staged content matches the step's allowlist and a standing authorization is granted

- **WHEN** a checkpoint's exact staged file list is a subset of the step's declared `Allowed modifications`, and `ADOPTION-AUTHORIZATION.md` grants a standing authorization covering it whose conditions still hold
- **THEN** the commit and push gates auto-approve, and the checkpoint ledger records the auto-approval as evidence, including an `Allowlist match: YES` result

#### Scenario: An unexpected path appears in the staged set

- **WHEN** a checkpoint's staged file list contains a path outside the step's declared `Allowed modifications`
- **THEN** the checkpoint is `FAIL_CLOSED`, naming the exact unexpected path, and is never presented as a routine approval question

#### Scenario: Standing authorization does not cover a force push, deployment, or destructive operation

- **WHEN** a checkpoint would require a force push, a pull request, a deployment, or any destructive Git operation
- **THEN** auto-approval never applies regardless of the staged file list, and the checkpoint proceeds through a live `[HUMAN APPROVAL REQUIRED]` gate

### Requirement: Every step declares its allowed modifications in advance, authored by the guide maintainer

Every `ADOPT` step SHALL carry an `Allowed modifications` field as part of its step contract, alongside Condition, Purpose, Preconditions, Action, Approval gate, Validation, Evidence to record, and On failure. The field SHALL be authored in the canonical phase file by whoever maintains the guide, before any run exists to execute the step, and SHALL NEVER be derived or asserted live by the executing orchestrator — an executing run SHALL read this field, never write it. For a step whose output paths are fully determined by the step's own action (an installer command, a pinned import, a fixed documentation-file set), the field SHALL be a closed, exact list of paths. For a step whose output depends on repository content discovered at run time (creating at most one new agent, exposing an adapter selected from prior validated evidence), the field SHALL be a closed rule — a path glob, a cardinality bound, and explicit exclusions — rather than an exact list, since no enumerable list can be authored in advance for it.

#### Scenario: A deterministic step's allowlist is an exact list

- **WHEN** a step's action is an installer command or a pinned import whose resulting paths are the same regardless of the adopting repository
- **THEN** its `Allowed modifications` field is a closed, exact list of those paths, not a rule

#### Scenario: A conditional step's allowlist is a closed rule

- **WHEN** a step's action creates at most one new file whose exact name depends on content discovered in the adopting repository
- **THEN** its `Allowed modifications` field states the path glob, the cardinality bound, and explicit exclusions, and is never left as an open-ended pattern

#### Scenario: The field is never derived by the executing run

- **WHEN** an orchestrator executes a step
- **THEN** it reads the step's already-authored `Allowed modifications` field from the phase file; it never computes or asserts a new allowlist for that execution

### Requirement: A per-run authorization file records standing grants, never one file per step

**`ADOPT-00` SHALL create `.specboot/adoption/ADOPTION-AUTHORIZATION.md` from the canonical template as part of its own provisioning**, adding it to that step's mutation inventory. The standing commit-and-push authorization SHALL be requested within `ADOPT-00`'s own existing human-approval gate — the one already presenting the exact mutation inventory — and SHALL NOT be a separate question. `ADOPT-02`, `ADOPT-05`, and `ADOPT-05B` SHALL each update this same file's corresponding section when reached (OpenSpec version policy, code-graph privilege scope, and the declared environment matrix respectively), and SHALL NOT create a second file.

Each adoption run MAY have exactly one `ADOPTION-AUTHORIZATION.md`, recording what the human granted for that run: the selected client or clients; the declared team environment matrix; the OpenSpec version policy; the code-graph capability's default privilege scope; and the standing commit-and-push authorization with its conditions. A separate authorization file per `ADOPT` step SHALL NOT be created, since the per-step allowlist already lives in the canonical phase file and a second per-step file would duplicate it, drifting from the canonical source it was meant to mirror. Where the declared team environment matrix cannot be derived from repository evidence — CI workflow `runs-on` values, a Windows-wrapper script's presence, container or devcontainer configuration, CONTRIBUTING or README platform statements — the orchestrator SHALL present a derived-with-evidence matrix for the human to confirm or correct rather than asking a blank question, and SHALL NOT infer a narrower matrix merely from an absence of evidence.

#### Scenario: One authorization file for the whole run

- **WHEN** an adoption run records its granted authorizations
- **THEN** they live in exactly one `ADOPTION-AUTHORIZATION.md`, never in a file created per `ADOPT` step

#### Scenario: The file is created by ADOPT-00, not left for a later step to discover missing

- **WHEN** `ADOPT-00` provisions its mutation inventory
- **THEN** `.specboot/adoption/ADOPTION-AUTHORIZATION.md` is among the paths created, and the standing commit-and-push authorization is requested in that same step's existing approval gate

#### Scenario: Later steps update the same file rather than creating a new one

- **WHEN** `ADOPT-02`, `ADOPT-05`, or `ADOPT-05B` reaches the point where its corresponding policy becomes known
- **THEN** it updates the relevant section of the already-existing `ADOPTION-AUTHORIZATION.md`, and no second authorization file is created

#### Scenario: Environment matrix is proposed from evidence, not asked blank

- **WHEN** the orchestrator reaches the environment-matrix declaration and the repository contains CI workflow configuration, a Windows-wrapper script, or platform statements in CONTRIBUTING or README
- **THEN** it presents the matrix derived from that evidence for the human to confirm or correct, rather than asking the human to compose it from nothing

#### Scenario: No evidence found does not narrow the matrix

- **WHEN** the orchestrator finds no CI configuration, no Windows-wrapper script, and no platform statement in the repository
- **THEN** it asks the human directly rather than inferring that only the current machine's platform is supported

### Requirement: Advancing to the next step after a checkpoint reaches PASS is never presented as a live question

Once a checkpoint reaches PASS and its ledger entry is recorded, the orchestrator SHALL proceed directly to the next step's Action. It SHALL NOT stop to ask whether to continue, and a stop between steps that is not backed by that next step's own named approval gate SHALL NOT be treated as part of this contract.

#### Scenario: A checkpoint completes and no further step-specific gate applies yet

- **WHEN** a checkpoint reaches PASS, is committed, and is pushed
- **THEN** the orchestrator proceeds to the next step's Action without asking whether to continue

#### Scenario: The next step has its own approval gate

- **WHEN** the next step's own Action reaches a point requiring `[HUMAN APPROVAL REQUIRED]` (for example, installing or upgrading software)
- **THEN** that step's own gate is presented at that point — never earlier, and never as a generic "continue?" question preceding it

### Requirement: Remote impact is assessed from evidence and unknown impact blocks the push

Before any push, the orchestrator SHALL determine and report whether the repository's remote configuration will trigger continuous integration, deployments, security scans, notifications, or any other automation. The assessment SHALL be derived from real evidence — workflow and pipeline configuration, branch protection, webhooks, and required checks — inspected read-only, and SHALL NEVER be assumed. Where the impact cannot be inspected or determined, it SHALL be treated as unknown, and unknown or unapproved impact SHALL block the push. The absence of a discovered CI configuration SHALL be reported as a finding, not treated as a licence to push. The orchestrator SHALL NOT request new credentials or elevated access to resolve an unknown impact.

#### Scenario: No CI configuration is found

- **WHEN** the assessment finds no continuous-integration configuration in the repository
- **THEN** that absence is reported as a finding requiring acceptance, and is not treated as proof that nothing can be triggered

#### Scenario: Impact cannot be inspected

- **WHEN** branch protection or webhook configuration cannot be inspected with the available permissions
- **THEN** the impact is recorded as unknown, the push is blocked, and no request for elevated access is made to resolve it

#### Scenario: Push targets only the current working branch

- **WHEN** a push is approved
- **THEN** it targets the already-configured remote and the current working branch only, and is never a force push

### Requirement: No pull request before full adoption and one real-project end-to-end task

Pull-request creation SHALL be blocked until every adoption step from `ADOPT-00` through `ADOPT-18` is PASS **and** the end-to-end pilot step (`ADOPT-19`) is PASS. This block SHALL be enforced by a dedicated pull-request-readiness gate step (`ADOPT-20`), which SHALL verify each of those steps' PASS state from recorded evidence rather than from an assertion that adoption "looks complete", and SHALL be the only step authorized to declare pull-request readiness. The pilot SHALL be the full six-capability daily workflow performed on a real project task chosen by the human: enrichment reaching `READY FOR PROPOSAL`, propose, apply, tests, SpecBoot verify reaching PASS or PASS WITH GAPS, an independent adversarial review reaching PASS or PASS WITH GAPS and ideally run in a different session or client, documentation and spec sync, and archive gated by both verdicts plus explicit human approval. The orchestrator SHALL block until the human names the pilot task.

#### Scenario: Adoption looks complete but the pilot has not run

- **WHEN** every adoption step is PASS but no end-to-end pilot has been performed
- **THEN** no pull request is created, including as a draft

#### Scenario: Pilot task is chosen by the human

- **WHEN** the pilot step begins
- **THEN** the orchestrator waits for the human to name the real project task and does not select one itself

#### Scenario: Readiness gate checks recorded evidence, not impression

- **WHEN** the pull-request-readiness gate (`ADOPT-20`) runs
- **THEN** it confirms the recorded PASS evidence for `ADOPT-00` through `ADOPT-19` individually, and a step whose evidence block is empty blocks readiness rather than being assumed complete

### Requirement: De-bootstrap reconciles against the committed manifest without destroying evidence

The de-bootstrap step (`ADOPT-18`) SHALL act strictly on the inventory in `.specboot/adoption/BOOTSTRAP-MANIFEST.json` and SHALL NEVER infer removals from path patterns or guesswork. It SHALL run only after the final checkpoint of the adoption itself (`ADOPT-17`) is PASS, behind a `[HUMAN APPROVAL REQUIRED]` gate. For every entry carrying an `intended-permanent-replacement` it SHALL verify that the replacement exists and resolves **before** removing the transient entry; removing an entry whose replacement is missing SHALL be FAIL rather than cleanup. Entries with `ownership: pre-existing-untouched` SHALL never be touched. In **source-linked** mode — the only mode this capability delivers — there is no payload and no container, so the step SHALL remove only the project-local temporary discovery entries and the machine-local source-path store under `.specboot/local/` — unlinking each link and byte-restoring each file it appended a block to — SHALL leave the external canonical source entirely untouched, and SHALL record the payload and container obligations as `SKIPPED — source-linked mode` rather than as passed, failed, or silently omitted. The container procedure described below governs the deferred packaged-snapshot mode and SHALL NOT be exercised by a source-linked run. In both modes the step SHALL remove artifacts for clients that were not selected and for clients left unverified by their verification gate, re-run the filesystem and fresh-session discovery validations, and **write back** each entry's `cleanup-status` and `final-disposition` into the durable manifest, which SHALL be updated and committed rather than deleted. An entry left at `cleanup-status: pending` SHALL be FAIL, not a partial PASS. Manifest entries SHALL remain the exclusive authority for identifying removable payload content. Because the manifest enumerates entries and not the `.specboot/bootstrap/` container holding them, the step SHALL — where a container exists at all, and only after every recorded entry has had its replacement verified, its disposition written back, and its content removed — verify that the container holds no unrecorded or unresolved content, and then remove the now-empty container by name. A container that is not empty once the manifest has been fully processed SHALL be FAIL: the step SHALL stop for reconciliation and SHALL NEVER delete content the manifest does not describe. The durable `.specboot/adoption/BOOTSTRAP-MANIFEST.json` SHALL NEVER be removed together with the transient container and SHALL remain committed. The external canonical source SHALL NEVER be modified by this step: it is not a manifest entry, so nothing in the inventory can authorize touching it, and a step that wrote to it SHALL be FAIL.

The step's written procedure and its executable behavior SHALL be the same thing, with no clause holding in one and not the other. Specifically: **replacement before removal** — no entry carrying an `intended-permanent-replacement` is removed until that replacement is verified to exist and resolve, and an unresolved replacement is FAIL with the entry left in place; **terminal dispositions written back** — every entry ends at a terminal `cleanup-status` *and* `final-disposition` in the committed manifest, with a mode's unexercised obligations recorded `SKIPPED — source-linked mode` rather than left blank or inferred as passed; **refusal over guessing** — an unresolved replacement and unrecorded content in scope for removal both stop the step for human reconciliation rather than being resolved by a choice the step makes; and **resumability** — because dispositions are written back as they are reached, a refused run names exactly which entries are terminal and which are not, and another session or operator can resume it.

**De-bootstrap SHALL additionally require the capability-completeness check (see the dedicated requirement below) to be PASS before it removes the project-local discovery entries.** Removing the temporary `specboot-adopt` discovery pointer and the machine-local canonical-source path is what makes an in-repository self-repair of a missing mandatory capability impossible; the step SHALL NOT proceed past that removal while a mandatory workflow capability is still missing.

**The mandatory fresh-session re-validation this step performs is scoped to what the step actually changed.** A full second fresh-session discovery-and-execution test SHALL be required only when this step's disposition touched any entry beyond the manifest's exact `bootstrap-created` entries. Where the step's disposition touched only those exact entries — the temporary discovery symlink and the temporary instruction-file block, neither of which was ever part of the permanent discovery surface a prior step provisions — a filesystem-only re-check of the permanent discovery surface SHALL be sufficient substitute evidence, explicitly recorded as such, and SHALL NOT be silently read as equivalent to an unexercised fresh-session test.

#### Scenario: Permanent replacement is missing

- **WHEN** a manifest entry names an `intended-permanent-replacement` that does not exist or does not resolve
- **THEN** the step creates the missing permanent replacement, or records FAIL, and does not remove the transient entry first

#### Scenario: Durable manifest survives its own cleanup

- **WHEN** de-bootstrap completes
- **THEN** the transient payload directory is absent, and the durable manifest remains present and committed with a terminal `cleanup-status` and `final-disposition` on every entry

#### Scenario: Empty container is removed once every entry is dispositioned

- **WHEN** every manifest entry has reached a terminal `cleanup-status` and `final-disposition`, and `.specboot/bootstrap/` holds nothing else
- **THEN** the step removes the container by name, the acceptance check that the transient area is absent passes, and `.specboot/adoption/BOOTSTRAP-MANIFEST.json` remains present and committed

#### Scenario: Container still holds a file the manifest never recorded

- **WHEN** the manifest has been fully processed and an unrecorded file remains inside `.specboot/bootstrap/`
- **THEN** the step records FAIL and stops for reconciliation, and removes neither the container nor the unrecorded file

#### Scenario: Bootstrap files are not retained for convenience

- **WHEN** an operator argues the bootstrap files are harmless and would be useful if adoption is re-run
- **THEN** they are still removed, because retention is governed by the manifest's dispositions and not by convenience

#### Scenario: Failed de-bootstrap is resumable

- **WHEN** de-bootstrap fails partway through
- **THEN** the affected entries are restored from the manifest before retrying, and because the manifest is committed, a different operator or session can resume the step

#### Scenario: Source-linked de-bootstrap leaves the external source untouched

- **WHEN** `ADOPT-18` runs after a source-linked adoption
- **THEN** it removes the project-local temporary discovery entries and the machine-local source-path store, byte-restores any file it appended a block to, records the payload and container obligations as `SKIPPED — source-linked mode`, and the external canonical source is byte-identical to its state before the adoption began

#### Scenario: An entry's permanent replacement does not resolve

- **WHEN** the step reaches an entry whose `intended-permanent-replacement` is missing or does not resolve
- **THEN** it records FAIL, leaves that transient entry in place, and stops for human reconciliation rather than removing the entry and leaving the repository with neither

#### Scenario: A refused de-bootstrap is resumable from the manifest

- **WHEN** the step refuses partway through, after some entries have reached terminal dispositions
- **THEN** the committed manifest names exactly which entries are terminal and which are still pending, and another session or operator resumes from that record without re-deriving it

#### Scenario: Source-linked run never created the transient container

- **WHEN** `ADOPT-18` reaches the container step in source-linked mode
- **THEN** it records `SKIPPED — source-linked mode`, and the absence of `.specboot/bootstrap/` is the expected end state rather than a missing removal or an unrecorded gap

#### Scenario: Repository that was never bootstrapped

- **WHEN** the de-bootstrap step runs in a repository with no `BOOTSTRAP-MANIFEST.json`
- **THEN** it is recorded as `SKIPPED — no bootstrap performed`, and is a clean no-op

#### Scenario: De-bootstrap is blocked while a mandatory capability is missing

- **WHEN** the capability-completeness check has not reached PASS
- **THEN** de-bootstrap does not remove the project-local discovery entries or the machine-local canonical-source path, since doing so would remove the only path to an in-repository self-repair

#### Scenario: Only temporary bootstrap entries were removed

- **WHEN** de-bootstrap's disposition touched only the manifest's exact `bootstrap-created` entries
- **THEN** a filesystem-only re-check of the permanent discovery surface is recorded as sufficient substitute evidence, explicitly labelled as such, in place of a second full fresh-session test

#### Scenario: De-bootstrap touched something beyond the bootstrap-created entries

- **WHEN** de-bootstrap's disposition touches any entry other than the manifest's exact `bootstrap-created` set
- **THEN** the full fresh-session discovery-and-execution re-validation remains mandatory, and a filesystem-only re-check is not treated as sufficient on its own

### Requirement: Skill completeness is verified against the required-capability list before de-bootstrap

`ADOPT-11`/`ADOPT-12`'s skill validation SHALL include a completeness check, distinct from and in addition to the existing stack-adaptation check: the imported skill inventory under `ai-specs/skills/` SHALL be cross-validated against the workflow capabilities `ai-specs/specboot-instructions.md` names as mandatory. A mandatory capability with no corresponding skill present SHALL be a step FAIL, never a silent pass, and SHALL be recorded as such before `ADOPT-13` or any later step is reached. `ADOPT-03`'s canonical import source SHALL carry every mandatory capability's skill, so that the completeness check is ordinarily a confirmation rather than a discovery.

#### Scenario: A mandatory capability's skill is present

- **WHEN** every workflow capability `ai-specs/specboot-instructions.md` names as mandatory has a corresponding skill under `ai-specs/skills/`
- **THEN** the completeness check is PASS, distinct from and in addition to the stack-adaptation check already performed

#### Scenario: A mandatory capability's skill is missing

- **WHEN** a workflow capability named as mandatory has no corresponding skill anywhere under `ai-specs/skills/`
- **THEN** the completeness check is FAIL, is recorded before `ADOPT-13` runs, and is never inferred as PASS because the skills that are present are individually well-formed

### Requirement: Generated documentation content is validated by citation against source evidence, not by human read alone

The step that adapts repository technical documentation (`ADOPT-06`) SHALL extend its existing structural validation with a citation-check: every factual claim in the generated documentation — including narrative sections describing known code risks or defects — SHALL resolve to a verifiable citation (file, line, type, or annotation) obtained via the selected code-graph capability, not only the structural comparisons the step already performs. A claim with no resolvable citation SHALL fail the check rather than pass silently. An authoring convention with no project-specific judgment in it (for example, defaulting first-clone build instructions to an online rather than offline invocation) SHALL be fixed once in the canonical prompt by the guide maintainer, and SHALL NOT be asked as a per-run decision. This citation-check SHALL NOT be read as authorizing the step to alter the source code a documented risk describes: the step documents an existing, cited defect, and SHALL NEVER resolve it.

#### Scenario: Every claim resolves to a citation

- **WHEN** every factual claim in the generated documentation, including a "Known Risks and Defects" narrative claim, resolves to a code citation obtained via the selected code-graph capability
- **THEN** the content-approval gate auto-approves, and the citation evidence is recorded

#### Scenario: A claim has no resolvable citation

- **WHEN** a generated documentation claim does not resolve to a verifiable citation
- **THEN** the citation-check fails that claim, and the content-approval gate does not auto-approve

#### Scenario: A cited risk is documented, not fixed

- **WHEN** the citation-check confirms a documented code defect against its source citation
- **THEN** the step's output describes the defect accurately and makes no change to the source code the citation points at

### Requirement: Improvement proposals are recorded after every validated checkpoint and never applied silently

After each validated checkpoint the orchestrator SHALL propose improvements to the adoption guide, the phase files, and the troubleshooting file, written into the **project's** run-log improvement-proposals block with a status of `proposed`, `accepted`, `rejected`, or `applied-in-change-<id>`. It SHALL NOT edit the guide, a phase file, or the troubleshooting file during an adoption run — neither in the external canonical source, which is read-only for the whole adoption, nor in any local copy, since a source-linked project holds none at all. Accepted proposals SHALL be applied later, through the normal OpenSpec change workflow, batched into a single governed follow-up change **against the canonical SpecBoot source**, since proposals accumulate across checkpoints. That batch SHALL NOT be consumed by the run that raised it.

#### Scenario: An obviously wrong sentence is found mid-adoption

- **WHEN** the orchestrator finds an incorrect sentence in a phase file during adoption, even one correctable in a single word
- **THEN** it records an improvement proposal in the project run log and does not edit the file during the run, in the external source or anywhere else

#### Scenario: Accepted proposals reach a follow-up change

- **WHEN** proposals have been accepted across several checkpoints
- **THEN** they are applied through one batching follow-up OpenSpec change against the canonical SpecBoot source, the run-log entries are updated to `applied-in-change-<id>`, and the adoption that raised them does not switch to the improved instructions mid-run

### Requirement: The orchestrator never changes execution mode or model selection

The orchestrator SHALL NOT write or modify a client's `model`, reasoning-effort, permission-mode, or equivalent runtime setting in any settings file. Model selection and manual or automatic execution mode SHALL remain user-controlled and outside the skill's scope. The orchestrator MAY verify and report that a mode or model is unsuitable, and SHALL then stop. This prohibition SHALL bind the orchestrator itself; skills the orchestrator invokes during the end-to-end pilot retain their own documented behavior, which the orchestrator SHALL neither perform on their behalf nor suppress.

#### Scenario: A step fails and a model change would plausibly fix it

- **WHEN** a step fails and switching the active model appears likely to resolve it
- **THEN** the orchestrator reports the mismatch and stops, and does not modify any model or mode setting

#### Scenario: Invoked skill retains its own documented behavior

- **WHEN** the pilot invokes a skill whose own documentation requires a particular planning model
- **THEN** the orchestrator neither performs that skill's setting change on its behalf nor prevents it

### Requirement: Fresh-session requirements are handed off, never simulated

Where the adoption contract requires a genuinely fresh client session, the orchestrator SHALL stop, state the exact prompt to run in the fresh session, and hand off to the operator. It SHALL NEVER simulate, assume, or claim a fresh session it did not observe. **This handoff SHALL NEVER be presented as a choice.** The orchestrator SHALL NOT ask whether to continue in the current session instead of handing off — once the contract determines a fresh session is required, generating the handoff prompt and stopping is the only action, not one of two options offered to the operator.

#### Scenario: Fresh-session discovery check is required

- **WHEN** a step requires a fresh client session to validate discovery
- **THEN** the orchestrator stops with an explicit handoff naming the prompt to run, and records the result only after the operator reports it

#### Scenario: A required handoff is never framed as optional

- **WHEN** the contract determines a fresh session is required (an initial `ADOPT-00` handoff, or a mandatory `ADOPT-18` re-validation)
- **THEN** the orchestrator generates the exact handoff prompt and stops; it does not ask the operator whether to continue in the current session instead

### Requirement: The bootstrap kit contains no duplicated canonical content

The bootstrap kit SHALL be defined by a manifest listing canonical repository-relative paths, and SHALL contain references rather than content. **No source-linked run assembles or consumes a payload**, so the single-copy guarantee holds trivially and the drift surface does not exist for it. The assembled-payload rules below govern the payload-to-target mapping retained as installer machinery for the deferred packaged-snapshot mode: the distributed payload SHALL be assembled at pack time from those canonical sources so that no second copy is checked into version control, and a drift check SHALL fail when an assembled or checked-in payload file differs from its canonical source. After de-bootstrap, every canonical artifact SHALL exist exactly once as content, with all client-visible instances being symlinks, or recorded copies carrying the reason where symlinks are unavailable.

Because the assembled payload is generated and version-control-ignored, it is absent from a clean checkout and becomes stale whenever a canonical source changes. Any automated check over that payload SHALL therefore establish the payload state it requires **explicitly, in its own setup**, and SHALL NOT depend on a packaging or lifecycle step having run beforehand. A check whose verdict depends on execution order, on another check's side effect, or on being run more than once SHALL NOT be treated as evidence.

#### Scenario: Payload file drifts from canonical

- **WHEN** a payload file differs from the canonical source it was assembled from
- **THEN** the drift check fails

#### Scenario: Drift check runs against a clean checkout

- **WHEN** a drift check runs where the assembled payload has never been generated
- **THEN** it assembles the payload it needs as part of its own setup, and its verdict reflects genuine drift rather than mere absence

#### Scenario: Drift check runs against a stale payload

- **WHEN** a canonical source has changed since the payload was last assembled and a drift check runs for the first time
- **THEN** it reaches the same verdict it would reach on a repeated run, because it re-establishes the payload state it requires rather than inheriting whatever state was left behind

#### Scenario: A check does not repair state for another check

- **WHEN** one automated check would, as a side effect, regenerate the assembled payload
- **THEN** that side effect is suppressed, so no other check's precondition is satisfied by it and no check passes because a different one ran first

#### Scenario: Kit does not embed canonical documents

- **WHEN** the kit needs to deliver the guide, the phase files, and the run-log template
- **THEN** it references their canonical paths in the manifest rather than checking second copies into the kit directory

### Requirement: Skill exposure and maintenance follow the canonical-source symlink policy

The orchestration skill SHALL be canonical under `ai-specs/skills/specboot-adopt/` and SHALL be exposed to each selected client through a relative symlink to that canonical directory, with no duplicated canonical copy in any client-specific folder. The symlink-maintenance workflow SHALL mirror the repository's selected clients rather than a hardcoded client list, so that a selected client present in the repository is not left unmanaged and an absent client is not assumed. No exposure SHALL be created for a client that was not selected, and the change SHALL leave no broken symlink.

#### Scenario: Selected client present in the repository is managed

- **WHEN** the repository has a selected client directory that the maintenance workflow's previous hardcoded list omitted
- **THEN** that client is included in the mirror list, and its skill exposure is maintained

#### Scenario: Absent client is not assumed

- **WHEN** a client named in the previous hardcoded list does not exist in the repository
- **THEN** no exposure is created for it

#### Scenario: No broken symlinks remain

- **WHEN** exposure symlinks are validated after the change
- **THEN** a broken-symlink scan over the adapter paths returns no results, and any result is a FAIL

### Requirement: The orchestrator respects the bounded per-step working set

Executing one adoption step SHALL continue to use exactly three working files: the conventions file, the single phase file containing the current step, and the filled run log. The orchestrator skill body SHALL be accounted for as part of the executing agent's context rather than as a member of the step's working set, and its reference files SHALL be loaded on demand only. The orchestrator SHALL NOT load the whole guide, the history directory, or unrelated phase files; reading ahead to get oriented SHALL be a defect.

#### Scenario: Reference file is loaded on demand

- **WHEN** the orchestrator needs the checkpoint protocol detail
- **THEN** it loads that reference file at the point of need rather than at skill load time

#### Scenario: Reading ahead is refused

- **WHEN** the orchestrator would benefit from reading later phase files for orientation
- **THEN** it does not load them, because the current step's documented path did not send it there

### Requirement: Existing adoption step identifiers keep their meaning and numbering

Existing `ADOPT` step identifiers SHALL keep their meaning and numbering, consistent with the rule that step IDs are stable identities rather than positions. New steps SHALL be added as new identifiers and SHALL NOT cause renumbering. The guide's permanent section-number back-compatibility map SHALL gain rows for the new steps rather than being rewritten.

#### Scenario: New steps are inserted around existing ones

- **WHEN** bootstrap, de-bootstrap, pilot, and pull-request-readiness steps are added before and after the existing range
- **THEN** every existing identifier retains its current number and meaning, and the section-number map gains rows for the new identifiers

### Requirement: Contract amendments apply forward and do not retroactively fail adopted repositories

The mandatory code-graph capability and the in-contract push protocol SHALL apply to adoptions started after the amendments land. Repositories already adopted under the previous contract SHALL be recorded as pre-amendment rather than retroactively marked FAIL, including a repository that skipped CodeGraph entirely and a repository that correctly stopped at commit without pushing.

#### Scenario: Previously adopted repository skipped CodeGraph

- **WHEN** a repository adopted under the previous contract is assessed after the amendment lands
- **THEN** it is recorded as pre-amendment, not retroactively marked FAIL for lacking the now-mandatory capability

#### Scenario: Previously adopted repository stopped at commit

- **WHEN** a repository adopted under the previous contract stopped at commit and never pushed
- **THEN** that behavior is recorded as correct for the contract in force at the time
