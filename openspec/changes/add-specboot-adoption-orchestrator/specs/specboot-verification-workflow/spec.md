## MODIFIED Requirements

### Requirement: Portable, idempotent staging-ignore provisioning
`packages/specboot/bin/init.js` SHALL ensure, on every run against a target directory, that each SpecBoot **transient** path is ignored by Git. The transient path set SHALL be exactly `.specboot/staging/`, `.specboot/bootstrap/`, and `.specboot/local/`, and the rules below SHALL be applied independently to each path in that set. The **durable** path `.specboot/adoption/` SHALL NOT be ignored and SHALL NOT have an ignore rule provisioned for it, since the bootstrap manifest and the filled adoption run log it holds are committed evidence. When running inside a Git repository and Git's own ignore evaluation can be executed, the installer SHALL use Git's own evaluation (for example `git check-ignore` against a probe path) to determine whether the path is already ignored by any existing rule — exact, broader, or otherwise — rather than implementing a custom `.gitignore` pattern parser; if Git reports the probe as already ignored, `.gitignore` SHALL NOT be modified for that path (a byte-for-byte no-op). If Git reports the probe as not ignored, or if Git's evaluation cannot be executed (not a Git repository, `git` unavailable, or evaluation otherwise fails to run cleanly), the installer SHALL fall back to a conservative check: if `.gitignore` does not exist, it SHALL be created containing the exact narrow rule for that path; if `.gitignore` exists and already contains that exact rule (as a standalone line, ignoring surrounding whitespace), no change SHALL be made; otherwise the rule SHALL be appended without altering, reordering, or removing any pre-existing line. The resulting `.gitignore` SHALL always end with a trailing newline whenever it is written. The provisioned rule SHALL NEVER be a broader pattern (for example a bare `.specboot/` line) than the exact narrow rule — a broader pattern would additionally ignore the durable `.specboot/adoption/` evidence, which SHALL remain tracked. Ignore provisioning SHALL be a property of the installer rather than of any adoption decision taken later: the `.specboot/bootstrap/` rule SHALL be provisioned unconditionally in every run even though a source-linked adoption never creates that path — it is idempotent, it costs nothing, and provisioning it SHALL NOT be read as a claim that packaged-snapshot delivery is available. `.specboot/adoption/` SHALL remain tracked in every run. This requirement applies independently of, and in addition to, this repository's own already-provisioned root `.gitignore` rule (Group 11), which SHALL remain unchanged by this requirement.

#### Scenario: No existing .gitignore
- **WHEN** the installer runs against a target directory with no `.gitignore` file
- **THEN** a `.gitignore` file is created containing the exact rule for each transient path (`.specboot/staging/`, `.specboot/bootstrap/`, and `.specboot/local/`), ending with a trailing newline

#### Scenario: Existing .gitignore with unrelated content
- **WHEN** the installer runs against a target directory whose `.gitignore` already exists and contains unrelated rules but not the transient-path rules
- **THEN** every pre-existing line is preserved unchanged, in its original order, and the exact rule for each not-yet-ignored transient path is appended, with the file ending in a trailing newline

#### Scenario: Existing .gitignore already containing the rule
- **WHEN** the installer runs against a target directory whose `.gitignore` already contains the exact rule for every transient path
- **THEN** the file's content is left byte-for-byte unchanged

#### Scenario: Repeated execution is idempotent
- **WHEN** the installer is run against the same target directory more than once
- **THEN** the second and subsequent runs produce no further change to `.gitignore` beyond what the first run already produced — no duplicate rule, no duplicate header comment

#### Scenario: Broader rule is never written
- **WHEN** the installer provisions a transient-path ignore rule under any of the above scenarios
- **THEN** it never writes a bare `.specboot/` line or any pattern broader than the exact narrow rule for that path

#### Scenario: Existing broader rule already ignores the staging path (Git available)
- **WHEN** the installer runs inside a Git repository whose `.gitignore` already contains a broader rule (for example a bare `.specboot/` line) that causes Git to report a probe path under `.specboot/staging/` as ignored
- **THEN** `.gitignore` is left byte-for-byte unchanged for that path — no exact narrow rule is appended, since Git's own evaluation already confirms the staging path is ignored

#### Scenario: Existing broader rule with a negation that un-ignores the staging path (Git available)
- **WHEN** the installer runs inside a Git repository whose `.gitignore` contains a broader rule followed by a negation that re-includes (un-ignores) the staging path specifically, such that Git reports the probe as not ignored
- **THEN** the installer appends the exact narrow `.specboot/staging/` rule, exactly as it would for any other not-ignored case, since Git's own evaluation — not the mere textual presence of a `.specboot/` pattern — determines whether an append is needed

#### Scenario: Git evaluation unavailable falls back to exact-line detection only
- **WHEN** the installer cannot execute Git's ignore evaluation (not a Git repository, `git` is not available, or the evaluation does not complete cleanly) and the target's `.gitignore` contains a broader rule but not the exact transient-path line
- **THEN** the installer falls back to the conservative exact-line check, does not attempt to interpret the broader rule itself, and appends the exact narrow rule — a documented, accepted limitation of operating without Git's evaluation, not a broadening or destructive change

#### Scenario: Bootstrap path is provisioned by the same probe mechanism
- **WHEN** the installer provisions the ignore rule for `.specboot/bootstrap/`
- **THEN** it uses the same `git check-ignore` probe and the same conservative fallback as the staging path, rather than a literal-line match applied only to the staging rule

#### Scenario: Bootstrap rule is provisioned even though no run creates the path
- **WHEN** the installer provisions ignore rules and every adoption it serves runs in source-linked mode, where `.specboot/bootstrap/` is never created
- **THEN** the rule was still provisioned, its presence causes no change to the repository, and its presence is not a claim that packaged-snapshot delivery is available

#### Scenario: Machine-local store path is provisioned by the same probe mechanism
- **WHEN** the installer provisions the ignore rule for `.specboot/local/`
- **THEN** it uses the same `git check-ignore` probe and the same conservative fallback as the other transient paths, so the resolved source path a run may store there is never committable

#### Scenario: Durable adoption path remains tracked
- **WHEN** the installer completes its ignore provisioning
- **THEN** `.specboot/adoption/` is not ignored and has no ignore rule provisioned for it, so the bootstrap manifest and the filled run log remain committable evidence

### Requirement: Documentation distinguishes capability availability from installer provisioning
Live workflow documentation (`README.md`, `ai-specs/specboot-instructions.md`, and its template counterpart) SHALL distinguish a workflow capability's *current availability* in a given repository's filesystem from *provisioning* by the SpecBoot npm installer (`packages/specboot/bin/init.js`). A capability's paths existing and resolving in a repository SHALL NOT be documented, or allowed to be read, as proof that the installer created them. Documentation SHALL state explicitly which clients the current installer provisions (Claude and Cursor) and which it does not (Kiro), and SHALL NOT remove accurate, working guidance for a client already configured in a given repository merely because the installer does not provision that client. Documentation SHALL additionally disclose the installer's `bootstrap` subcommand and SHALL state that the exposure it creates is **temporary adoption-time exposure**, removed by the de-bootstrap step, and SHALL NOT be described or allowed to be read as permanent provisioning of any client. Documentation SHALL disclose that the subcommand delivers **source-linked adoption only** — it copies no canonical content and creates no `.specboot/bootstrap/` — and that it requires both a validated local canonical SpecBoot source and an explicitly selected supported client, **failing closed with zero target-repository writes** when either is absent. It SHALL NOT document, offer, or imply a packaged-snapshot delivery mode. Documentation SHALL state that the canonical source location is runtime input, and SHALL NOT record a machine-specific source path. Where documentation refers to the resolved source path at all, it SHALL state that no committed artifact records it and that any retained path lives only in ignored machine-local state.

#### Scenario: Installer-provisioned clients stated explicitly
- **WHEN** a live workflow document describes what `npx @lidr/lidr-specboot` / `packages/specboot/bin/init.js` provisions
- **THEN** it states that the installer provisions shared Claude and Cursor adapters and does not currently provision Kiro

#### Scenario: Existing capability is not conflated with installer provenance
- **WHEN** a repository has working Kiro paths (skills, prompts, settings)
- **THEN** documentation does not state or imply that the SpecBoot npm installer created them, and instead discloses that they were configured separately

#### Scenario: Valid client guidance is qualified, not removed
- **WHEN** a repository has a separately configured, working client setup (for example Kiro) that the installer does not provision
- **THEN** documentation retains that client's guidance, qualified with a note that it applies only where that client has been separately configured, rather than deleting it

#### Scenario: Bootstrap exposure is disclosed as temporary
- **WHEN** documentation describes the `bootstrap` subcommand
- **THEN** it states that the client exposure the subcommand creates is temporary, is inventoried in the bootstrap manifest, and is removed by the de-bootstrap step — and does not present it as permanent client provisioning

#### Scenario: Source-linked delivery is disclosed as the only mode
- **WHEN** documentation describes what the `bootstrap` subcommand does
- **THEN** it describes source-linked delivery against a supplied canonical source, states that no canonical content is copied and no transient payload is created, and offers no packaged-snapshot alternative

#### Scenario: The fail-closed preconditions are documented
- **WHEN** documentation describes how to invoke the `bootstrap` subcommand
- **THEN** it states that a validated canonical source and an explicitly selected supported client are both required, and that the command writes nothing to the target repository when either is missing

#### Scenario: No machine-specific source path is documented
- **WHEN** documentation refers to the canonical SpecBoot source
- **THEN** it describes it as runtime input supplied at adoption time, and records no absolute path from any particular machine

### Requirement: Selected-client-aware installer redesign is a future non-goal
Extending `packages/specboot/bin/init.js` to provision additional clients (including Kiro) conditionally, based on explicit client selection, remains out of scope. The installer's existing default install path SHALL NOT add unconditional provisioning for a client to its existing `.claude`/`.cursor` loop or otherwise alter which clients that default path provisions. Adding the `bootstrap` subcommand SHALL NOT be treated as delivering the selected-client-aware installer redesign: the subcommand creates temporary, manifest-inventoried, adoption-time exposure that the de-bootstrap step removes, it is invoked explicitly rather than as part of the default install path, and it leaves the default path's client-provisioning loop unchanged. The `bootstrap` subcommand requiring an explicitly selected supported client SHALL NOT be read as the default install path gaining client selection; the two paths are separate, and the default path's loop is unchanged. A properly scoped selected-client-aware installer redesign SHALL remain separate future work.

#### Scenario: No unconditional Kiro provisioning added
- **WHEN** documentation and verifier wording about installer-provisioned clients is corrected, or the `bootstrap` subcommand is added
- **THEN** `packages/specboot/bin/init.js`'s default client-provisioning loop remains unchanged — no client is unconditionally added to it

#### Scenario: Future selected-client-aware installer work is recorded, not implemented
- **WHEN** a properly scoped installer redesign (explicit client selection, conditional per-client adapter generation, Windows portability, idempotent upgrades/migration) becomes necessary
- **THEN** it is planned and implemented as a separate, future OpenSpec change, not folded into this documentation/provenance correction or into the bootstrap subcommand

#### Scenario: Bootstrap subcommand does not run by default
- **WHEN** the installer is invoked without the `bootstrap` subcommand
- **THEN** its behavior is exactly the current default install behavior, and no bootstrap exposure or transient payload is created

#### Scenario: Bootstrap client selection does not change default provisioning
- **WHEN** the `bootstrap` subcommand requires and acts on an explicit client selection
- **THEN** the default install path's client-provisioning loop is unchanged, and the selection governs only the temporary adoption-time exposure the subcommand creates
