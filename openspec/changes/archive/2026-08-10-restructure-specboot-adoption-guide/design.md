## Context

See `proposal.md` — Why. This document covers how.

The change is documentation-only, so `docs/backend-standards.md`'s Architecture Overview, Coding Standards, and Database Patterns sections (the configured design rule for this repository) have no applicable content here: no Java, no Spring Boot layer, no persistence, no HTTP contract is touched. The governing standard is `docs/documentation-standards.md` instead. This is recorded explicitly rather than silently skipped.

Four properties of the current file shape every decision below:

- **The entry path is load-bearing.** `packages/specboot/bin/init.js:160` prints `SPECBOOT_ADOPTION_GUIDE.md` by name to every installer user, and three Markdown files cite it by section number (`README.md:101` → §2/§13; both copies of `ai-specs/specboot-instructions.md:101,177` → §2/§13/§5-subsection/§19). Any rename or renumber breaks a reference that is out of this repository's control once published.
- **Section sizes are uneven**: 24 lines (§21) to 185 lines (§5), median ~78. Neither one-file-per-section nor fixed-size chunking produces coherent units.
- **The verbatim blocks are immutable by rule.** §22's "Prompt labeled verbatim was changed" recovery says to compare character-for-character and use historical labels only for exact text. Relocation must therefore be provably byte-exact, not approximately faithful.
- **The file is its own cautionary tale.** §22 documents "Large documentation write truncates or replaces content" as a real observed failure. That recovery procedure — verify existence, line count, headings, and tail physically rather than trusting the tool's success signal — applies reflexively to this change.

## Goals / Non-Goals

**Goals:**

- Produce a set where a human executes one coherent phase per file, and an agent loads ~2–4k tokens (conventions + one phase) instead of ~22–25k.
- Make every step machine-parseable: same field order, stable ID, testable condition, explicit approval gate, explicit PASS criteria.
- Make completeness and fidelity *provable by command*, not by review — the only defensible verification standard when there is no test suite.
- Leave the adoption methodology bit-for-bit intact in meaning while changing its container.

**Non-Goals:**

- Any change to what the adoption procedure *does*. If implementation discovers a genuine defect in a step, it is recorded as a follow-up candidate in this design's terms, not fixed inline (`CLAUDE.md` §7 governs post-apply requests).
- Building committed tooling (a link checker, a lint rule) as part of this change. Verification scripts are scratch artifacts under the session scratchpad; making them permanent repository tooling is a separate change with its own maintenance cost.
- Introducing any content that did not exist before, beyond navigational scaffolding (the entry index, the §-number map, per-file "read conventions first" directives) and the step-contract field labels themselves.

## Decisions

### D1 — Keep `SPECBOOT_ADOPTION_GUIDE.md` at the root as the entry file

The entry point retains its exact path and becomes a thin index: scope, prompt-label conventions, both Happy Paths, the human/agent how-to-use section, the step index, and the permanent §-number → file map.

**Alternatives considered.** *Rename to `specboot-adoption/README.md`* — rejected: breaks the installer's printed reference and every external citation, for a purely cosmetic gain. *Keep the full guide and add a separate agent-facing index alongside it* — rejected: creates two sources that drift, which is the exact failure D6 exists to eliminate. *Leave a stub that only says "moved"* — rejected: the front matter (label conventions, Happy Paths) is genuinely cross-cutting and has no better home; a stub would force every reader through two hops to reach it.

### D2 — Group at phase level, not section level or fixed size

Files follow the guide's own execution rhythm, pairing each adapt step with the validate step that always immediately follows it (§9+§10, §11+§12, §13+§14) and grouping the install-and-verify sequence (§1–§3, §6–§8, §16–§17). Result: ~14 files of ~25–270 lines.

**Alternatives considered.** *One file per section (22+ files)* — rejected: produces 39-line files (§12) beside 185-line ones (§5), and splits pairs the operator always runs together, so an agent would load two files per logical step for no benefit. *Fixed ~200-line chunks* — rejected: boundaries would fall mid-step, which is the one place a boundary must never fall. *Three files by document type only (procedure / history / support)* — rejected: leaves the procedure file at ~1,240 lines, solving the lifecycle-mixing problem but not the agent-context problem.

### D3 — Stable step IDs, with §-numbers retained as aliases

Executable steps get `ADOPT-01` … `ADOPT-17`, decoupled from ordinal position. The entry file carries a permanent §-number → step-ID → file map.

**Rationale.** Today §-numbers serve three incompatible roles at once: ordering, identity, and external citation. Insert a step and all three break together. Separating identity (`ADOPT-nn`) from ordering (file sequence) from citation (the map) makes each independently changeable. The map is retained permanently rather than for one release, because the external citations live in a published npm package's template and cannot be assumed to update in lockstep.

**Alternatives considered.** *Renumber freely and update all references* — rejected: cannot reach already-published copies. *Keep §-numbers as the only identifier* — rejected: preserves exactly the coupling that makes the guide brittle.

### D4 — One uniform step contract, applied to every executable step

`Condition` / `Purpose` / `Preconditions` / `Action` / `Approval gate` / `Validation` / `Evidence to record` / `On failure`, in that fixed order.

**What `Action` may hold.** Exactly one of four forms, which is what the eighteen steps actually need:

1. **Shell commands** — 10 steps (`ADOPT-01`, `-02`, `-03`, `-04`, `-05`, `-10`, `-12`, `-14`, `-16`, `-17`).
2. **Exactly one labeled canonical prompt** — 6 steps (`ADOPT-06`, `-07`, `-09`, `-11`, `-13`, `-15`).
3. **Shell commands that establish or version-gate the prompt's preconditions, followed by exactly one labeled canonical prompt** — `ADOPT-08`, where `openspec --version` / `--help` / `doctor` determine which validation commands the installed version even exposes before the prompt may run. Splitting this into two steps would separate a gate from the thing it gates.
4. **A structured written procedure** — `ADOPT-05B`, whose work is provisioning and judgement (locate a baseline, copy or merge, declare a support matrix, reconcile against it) rather than a command to run or a prompt to issue.

Two absolutes hold across all four: never more than one labeled prompt in a step, and never a historical prompt in a live `Action`. The earlier formulation — "either shell commands or exactly one labeled canonical prompt, never both" — described forms 1 and 2 only and excluded the two steps that legitimately need forms 3 and 4; it is superseded here rather than enforced against them.

**Rationale.** The field set is not invented; it is the union of what the existing sections already provide under inconsistent names, plus two genuinely missing fields (`Preconditions` and `Evidence to record`) that an agent needs to sequence and resume. `Condition` makes conditionality a field rather than a paragraph.

**Trade-off accepted.** This is the decision that makes the change harder to verify: reshaping prose means a diff cannot be checked by `diff` alone. Mitigated by D8's invariant-count checks and by confining reshaping to headings and field labels, leaving sentence-level content untouched wherever the existing text already fits a field.

**Alternatives considered.** *Relocation-only now, contract later* (the two-change split) — considered and explicitly rejected by the requester: the guide would not be agent-executable until the second change landed, and the second change would re-open every file the first one just settled.

### D5 — Extract per-run evidence into a committed template; leave the filled log's lifecycle to the operator

`run-template/ADOPTION-RUN-LOG.template.md` collects all 20 `Live validation record` blocks plus the `Live permission record`, adds a step-state checklist keyed by `ADOPT-nn` for resume, and is committed as a template. Each step keeps only a pointer to the fields it must fill. A *filled* log's fate — committed as adoption evidence or kept local — is documented as an operator choice inside the guide.

**Rationale.** This finally implements the separation the guide's own `Clean-Install Working Method` already prescribes. Deliberately **not** encoded in `.gitignore`: the current rule ignores `.specboot/staging/` specifically, and broadening it is a policy change affecting other artifacts, out of scope here.

**Alternatives considered.** *Create the five companion files the guide names* — rejected: they were named for one specific clean run, and four of the five (prompt log, command log, decision log, terminal capture) are transcripts, not templates; a single structured run log with a state checklist serves the resume requirement better. *Delete the record blocks as unused* — rejected: they encode which evidence each step must produce, which is procedural content.

### D6 — Reduce §18 to a pointer, after verifying the canonical sources actually carry the semantics

`08-daily-workflow.md` keeps the ordered six-capability list, the blocking semantics summary (`enrich-us` blocks on `NEEDS CLARIFICATION`; both gates plus explicit human approval precede archive), and the `PENDING END-TO-END VALIDATION` marker — then points at `ai-specs/specboot-instructions.md` and `openspec/specs/specboot-verification-workflow/spec.md` rather than transcribing them.

**Evidence gathered before proposing, not assumed:** `openspec/specs/specboot-verification-workflow/spec.md` is 372 lines containing `PASS WITH GAPS` ×14, `archive approval` ×8, `Blocker` ×16, `READY FOR PROPOSAL` ×4 — all four counted as **matching lines, case-insensitively** (`grep -ci '<term>' openspec/specs/specboot-verification-workflow/spec.md`). The method is stated here because it was previously left to inference (findings VF12 / AR10): the figures are reproducible, but case-sensitive counting yields 7 rather than 8 for `archive approval`, and counting occurrences rather than matching lines yields 17 / 11 / 22 / 4. `ai-specs/skills/specboot-verify/SKILL.md` (161 lines) and `ai-specs/skills/adversarial-review/SKILL.md` (147 lines) reinforce them. Nothing §18 states is unique to §18.

**Rationale.** The archived `consolidate-specboot-adoption-guide` change recorded this drift risk and explicitly deferred it: "if those are edited again afterward, the guide could re-drift. Out of scope to solve structurally here… flagged as a maintenance risk for a future change." This is that change.

**Alternatives considered.** *Keep the full transcription* — rejected: preserves the known drift risk against the user's explicit maintainability criterion. *Drop §18 and Happy Path 2 entirely* — rejected: an adopter needs to know the daily workflow exists and in what order, and `Final Acceptance Criteria` references it; a summary-plus-pointer keeps orientation without duplication.

### D7 — Split §5 by conditionality, and express the CodeGraph decision once

`02-codegraph.md` (conditional) and `03-client-permissions.md` (unconditionally mandatory) become separate files. CodeGraph conditionality is stated once as a decision node with a testable predicate and a recorded operator decision, referenced by both conditional files — replacing prose currently spread across §4, §5, Happy Path 1, and §21.

**Rationale.** The previous change needed three prose warnings to stop a reader from skipping mandatory permission setup along with optional CodeGraph. A file boundary makes that structurally impossible: no "skip CodeGraph" path reaches `03-client-permissions.md`. The safety property stops depending on the reader noticing a warning.

### D8 — Verification is mechanical, and the mapping table is the completeness contract

Implementation produces an explicit source-section → destination-file mapping table covering all 22 sections plus the four front-matter and two closing blocks, with zero unmapped entries. On top of it: a link checker over the new set; byte-for-byte diffs of every `VERIFIED VERBATIM` block against `git show HEAD:SPECBOOT_ADOPTION_GUIDE.md`; before/after invariant counts (`HUMAN APPROVAL REQUIRED` = 11, record blocks = 20, each prompt-label class); word-count reconciliation against ~11,786 with the §18 reduction explained rather than absorbed; `git diff --exit-code` proving the untouched-file list; and the two bounded acceptance gates specified in D11.

**Rationale.** Everything in this list except the D11 gates confirms nothing was lost; only those gates test whether something was gained. See D11 for what they cover and, equally important, what they do not.

**Alternatives considered.** *Human review of the diff* — rejected as the primary mechanism: a ~2,000-line restructuring diff is precisely where review attention fails, and the guide's own §17 already insists an independent check follow any correction. Review remains, but on top of mechanical proof, not instead of it.

### D9 — Build by extraction from `git show HEAD:`, in dependency order, verifying each file physically

New files are produced by extracting line ranges from the committed source rather than by retyping, then reshaped in place. Order: `00-conventions.md` first (everything references it), then phase files in execution order, then history and run-template, then the entry file last (it indexes what now exists), then external reference repairs. Each write is followed by a physical check — `wc -l`, heading list, tail — per §22's own recovery procedure.

**Rationale.** Extraction preserves the verbatim blocks by construction rather than by care. Writing the entry file last means its index and §-map are built against real files, so a wrong path is a broken link caught by D8's checker rather than a plausible-looking error.

### D10 — Repair references in lockstep, preserving the known two-copy difference

`ai-specs/specboot-instructions.md` and `packages/specboot/template/ai-specs/specboot-instructions.md` are updated together at lines 101 and 177. They currently differ **only** at line 204 (a Google Drive image URL); that single difference is preserved deliberately, and a post-edit `diff` must show exactly that one hunk and nothing else. `packages/specboot/bin/init.js:160` cites the guide by filename only and is expected to need no edit — verified, not assumed.

### D11 — Bounded acceptance gates, and what they deliberately do not prove

Two blocking gates replace the single first-step dry-run originally planned.

The **agent gate** puts a fresh session, given only the entry file, through six behaviours the restructure is supposed to enable: correct starting step with only `00-conventions.md` plus the required phase file loaded; the "CodeGraph not adopted" path taken while `ADOPT-05B` selected-client permissions remain mandatory; resumption from a non-initial `ADOPT-nn` state carried solely by a partially filled run-log template; a full stop at a `[HUMAN APPROVAL REQUIRED]` gate with no self-approval; identification and recording of the step's required evidence; and classification of an explicitly synthetic failed-or-unexecuted command outcome as FAIL, with the documented troubleshooting path followed. That last check is deliberately synthetic: the outcome is supplied to the agent rather than produced by running anything, because executing an installation, configuration, or adoption command merely to manufacture a failure would begin a real adoption this change has no mandate to perform. The report carries the exact files loaded in order, the decision made at each conditional and gate, transcript evidence per check, and an explicit note that the failure outcome was supplied.

The **human orientation and self-description gate** requires a reviewer working from the entry file alone to answer six entry-level orientation questions — where to start, how to select the applicable path, how to resume, where to record evidence, when approval is required, what to do on failure. For approval specifically, the entry file must convey the general approval semantics, how a gate is identified, and where step-specific gates live; it must not restate the individual gates, which belong in the phase files and would re-create the duplication D6 exists to remove. An item fails only when the reviewer needed a phase file, prior SpecBoot knowledge, or the author *to answer that orientation question*; opening a phase file afterward to execute or inspect the selected step is the intended workflow, not a failure.

**Rationale.** The original single check — "identifies the first step, its approval gate, and the next file" — tested discovery only. Discovery is the easiest property of the restructure to get right and the least informative when it passes: it would have passed against the unsplit guide too. The behaviours above are chosen because each maps to a specific structural decision that could silently fail: D2/D9's load-only-what-you-need boundary, D7's conditionality split, D5's resume mechanism, the D4 contract's `Approval gate` and `Evidence to record` fields, and `00-conventions.md`'s FAIL discipline. A gate that only proves discovery cannot support the claim this change is built on.

**Boundary, stated rather than implied.** These are checks of a document's navigability and self-description. They are not a real adoption: no software is installed, no repository is adapted, no client is configured, no baseline is run. The human gate evidences entry-file orientation only — it does not establish complete human usability of the guide, nor that a human successfully executed an adoption with it. End-to-end validation will come from the next real SpecBoot adoption performed in another repository. Neither report may present a PASS as end-to-end validation, and the guide's own `PENDING END-TO-END VALIDATION` markers stay as they are.

**Alternatives considered.** *Keep the single first-step dry-run* — rejected above. *Perform a full live adoption against a scratch repository as part of this change* — rejected: that is a live adoption run, explicitly out of scope in the proposal and the enriched work item, and it would make a documentation restructure depend on installing software and configuring clients. *Make the gates advisory* — rejected: a restructure justified by agent-executability that ships without a blocking check of agent-executability has no evidence for its central claim. *Name the human gate a "usability" gate* — rejected: one reviewer answering six orientation questions is not a usability study, and the name would license a claim the evidence cannot support.

### D12 — The bounded per-step working set is three files, not two

**Decision**: an agent executing a step loads exactly `00-conventions.md`, the single phase
file containing that step, and the operator's filled copy of `ADOPTION-RUN-LOG.template.md`.
All three are *working* files. Loading any of them is correct behaviour and can never fail
the agent gate's load-boundary check. Loading an unrelated phase, history, support, or
canonical-workflow file remains disallowed unless the current step's documented path
requires it — for example an `On failure` pointer into `22-troubleshooting.md`.

**Why the original two-file wording was wrong.** The entry file said "load `00-conventions.md`
plus the single phase file for the step you are on. Do not load the whole set," while four
lines later requiring "record evidence after each step, into the run log." The D4 contract
makes this structural, not incidental: every step carries an `Evidence to record` field, so
*writing the run log is part of executing the step*, not a separate bookkeeping activity. An
agent obeying the boundary literally could not satisfy the contract. Worse, task 16.1 as
originally worded would have failed an agent for the correct behaviour.

**Evidence**: the first fresh-session agent attempt (attempt 1) returned a blocking FAIL on
this contradiction. That is the gate doing its job on its first run — the defect was in the
guide, not in the agent, and it is exactly the class of defect no mechanical check in D8
could have caught.

**Alternatives considered**: *Drop the run log from the working set and batch evidence at the
end.* Rejected: it contradicts `00-conventions.md`'s "fill them as you go, not at the end",
and an adoption interrupted mid-run would lose everything not yet written — the resume
mechanism in D5 depends on the log being current. *Leave the boundary vague and let agents
infer.* Rejected: the boundary is the load-cost claim this restructure is justified by; a
vague boundary is unverifiable, and an unverifiable claim cannot be gated.

### D13 — An `On failure` pointer that resolves to nothing applicable is a defect

**Decision**: every step's `On failure` field must resolve to a recovery that actually covers that failure
mode, by exactly one of three forms:

- **Form A — inline, in the same step.** Specifically identified applicable recovery instructions within the
  step itself, whether expressed as a `Failure` / `Recovery` table (`ADOPT-01`, `-02`, `-03`, `-04`, `-05`,
  `-07`) or as a **named** inline guidance section (`ADOPT-16`'s stale-build-output guidance).
- **Form B — a specifically named entry** in `22-troubleshooting.md`.
- **Form C — an explicitly identified owning step** the operator returns to (`ADOPT-10` → `ADOPT-09`;
  `ADOPT-14` → `ADOPT-13`).

Where the guide promises a failure path, the path must exist. A pointer that names no destination, or names
one that does not cover the failure, is a defect.

**Stated identically in both places an executing agent reads it.** The contract must appear in the same form
in `00-conventions.md`'s step-contract field table and in the entry file's human operating model, because
those are the two documents a bounded working set puts in front of an agent. A universal asserted in either
place that the steps do not satisfy is the same defect class as a dead-end pointer — it tells the operator to
look somewhere the recovery is not.

**Why working inline recovery is not relocated.** Forcing forms A and C into `22-troubleshooting.md` for
uniformity's sake would copy live, correct content into a second file, producing exactly the duplication D6
exists to remove and exactly the drift that duplication causes. Uniformity of *form* is not the goal;
resolving to an applicable recovery is.

`22-troubleshooting.md` gains a dedicated "OpenSpec command not found" entry, and `ADOPT-08`'s pointer is
updated to resolve to it.

The entry follows the established symptom/cause/recovery shape and specifies: read-only
diagnosis first (executable resolution, npm global prefix, `PATH`) before any conclusion;
explicit return to `ADOPT-02`, which owns installation; **renewed** human approval before any
reinstall or environment mutation, because `ADOPT-02`'s original approval covered that
execution, not a later recovery; and a full rerun of `ADOPT-08` after recovery rather than
resuming mid-step.

**Evidence**: attempt 1's synthetic `ADOPT-08` scenario — `openspec doctor` reporting
`command not found` — found no applicable entry. The nearest existing entries are "OpenSpec
key unsupported by installed version" (a different failure: the command runs) and "Read-only
commands repeatedly request permission" (unrelated). The entry file states every step's
failure path leads to `22-troubleshooting.md`; for this failure it dead-ended.

**Why renewed approval, specifically.** Reinstalling or mutating `PATH` is an environment
mutation of exactly the class `ADOPT-01`/`ADOPT-02` gate. Treating the original installation
approval as still valid during a later recovery would let an agent reinstall software on the
strength of an approval given for a different action at a different time — precisely what
`00-conventions.md`'s "approval covers the named mutation only" forbids.

**Alternatives considered**: *Point `ADOPT-08` at the generic troubleshooting file without a
specific entry.* Rejected: that is the dead-end attempt 1 found. *Handle it inside `ADOPT-08`'s
own text.* Rejected: the failure can occur at any step invoking `openspec`; the troubleshooting
file is the single place recoveries live, and duplicating it per step would drift.

### D14 — Orientation answers are explanations, not locations

**Decision**: the entry file must answer each of the six orientation questions in plain
language, self-containedly. A link may follow the answer to supply execution detail; it may not
*be* the answer.

**Why the pointer form failed.** Every row of the entry file's orientation table named a
location: "`ADOPT-01` in `01-prerequisites-and-install.md`", "the step-state table in your
filled run log", "at any step whose `Approval gate` field is not `none`", "each step's
`On failure` field". Each is accurate and each presumes the reader already has the operating
model the table was supposed to convey. A pointer answers "where is this documented"; the
question asked was "what do I do".

**Evidence**: human attempt 1 failed all six checks. The reviewer's answers were coherent and
reasonable — they simply came from general knowledge of how step-by-step adoptions work rather
than from the guide. Two responses locate the gap precisely: "cual evidencia?" (the table names
where evidence goes without ever defining what evidence is) and "el humano necesita aprobacion
humana ?" (the table says human approval is required without saying who approves what, or who
the human is in relation to the gate). This is a defect in the guide, recorded as such; the
reviewer is not at fault and their responses are not reinterpreted into the expected answers.

**Alternatives considered**: *Add a glossary.* Rejected: it relocates the definitions without
making the six answers self-contained, and a reader who does not know a term does not know to
look it up. *Point to `00-conventions.md` for the definitions.* Rejected: that is the pointer
form again, one level deeper, and `00-conventions.md` is written for step execution, not
orientation. *Treat the reviewer's model as close enough.* Rejected: their model diverged on
approval authority and on what to do with an undocumented failure — exactly where a wrong model
is expensive.

### D15 — Operator and approver roles are stated, not assumed

**Decision**: the entry file names who may approve a mutation:

- an **AI agent** can never approve its own mutation;
- an **authorized human operator** may make and record the decision personally;
- a **human operator without sufficient authority** must obtain approval from the designated
  repository owner or approver;
- approval remains limited to the **named mutation** and must be **recorded**.

**Why.** The guide's gates were written from the agent's perspective — "never self-approve" —
which leaves a human operator reading "[HUMAN APPROVAL REQUIRED]" with no idea whether they are
the human in question. Attempt 1's "el humano necesita aprobacion humana ?" is that ambiguity
surfacing. The four-part model resolves it without weakening any gate: the same marker, the same
per-mutation scope, the same recording requirement, now with the actor identified.

**Alternatives considered**: *Say "the operator approves".* Rejected: it silently grants
authority the operator may not hold, which is worse than ambiguity. *Require a named approver
per gate in the phase files.* Rejected: that is repository policy, varies per adopting
organization, and would duplicate across every gate — the entry file states the model; the
organization supplies the names.

### D16 — Planned pause and unexpected interruption are different, and only one is safe to assume

**Decision**: the entry file distinguishes them. For a **planned pause**, finish and record the
current step first, then stop at a step boundary. After an **unexpected interruption**, never
infer completion from a step appearing to have run: resume from the first step lacking complete
PASS evidence, inspect that step's partial effects, and rerun its validation in full.

**Why.** The existing resume answer — read the step-state table — is correct only when the
table is current, which is exactly what an unexpected interruption breaks. Attempt 1's response
("lo normal si se debe interrumpir la adopcion un humano terminaria un paso completo") describes
the planned-pause case only, which is the natural reading and leaves the dangerous case
unaddressed. The distinction also follows directly from the evidence discipline already in
`00-conventions.md`: a step is PASS only when its evidence block is filled, so an unfilled block
after an interruption means "not known to have completed", never "completed but unrecorded".

**Alternatives considered**: *Treat every resume as an unexpected interruption.* Rejected:
it makes the common case needlessly expensive and would train operators to skip the check.
*Leave it to the run log's step-state table.* Rejected: that is the mechanism the interruption
compromises; the guidance has to sit above it.

### D17 — `ADOPT-05B` provisions the permission file; it does not assume one

**Decision**: `ADOPT-05B` owns the whole lifecycle of the selected client's permission file —
arrival, reconciliation, and validation — as an explicit operation rather than an assumption.

**The gap.** `03-client-permissions.md` states what the file must contain and where it lives
("for Claude Code, use `.claude/settings.json`"), and `19-permissions-policy.md` states the
ongoing policy. Neither says how that file comes to exist in a repository that does not have
one. `ADOPT-03`'s import cannot supply it: `cp -rn <source>/* .` deliberately does not match
dot-prefixed names, and that step's own text routes hidden client resources to "OpenSpec,
CodeGraph, or the adapter steps" — a list that omits permissions entirely. So the guide
requires a file that no documented step produces.

**Copy versus merge is the load-bearing distinction.** A fresh repository needs the baseline
copied; a repository that already has client configuration must not have it overwritten. The
step therefore branches on target existence and, in the merge case, forbids blind replacement —
existing project configuration is evidence of decisions someone already made.

**Reconciliation is against a declared matrix, not the adopting machine.** The operator
declares which clients, stacks, shells, and operating systems the project and team support, and
the copy is reconciled against that declaration. Permissions outside the matrix are removed;
permissions required by any supported environment are retained **even when unused on the
machine performing the adoption**. Reconciling against the adopting machine instead would
silently strip the Windows or Linux variants a teammate needs, and the failure would surface
later, on someone else's machine, as an unexplained permission prompt.

**Unavailable combinations are pending, never PASS.** Smoke tests run for every supported
client/OS combination that is actually available. A combination that cannot be exercised is
recorded as pending evidence — consistent with `00-conventions.md`'s rule that an unexecuted
command is FAIL, never an inferred PASS, and with the guide's existing note that native Windows
portability remains unvalidated.

**The generic source baseline is read-only.** Only the copy incorporated into the adopting
project is reconciled. The approved baseline serves every future adoption; editing it to suit
one project would silently redefine the standard for all of them.

**Alternatives considered**: *Extend `ADOPT-03` to copy hidden client directories.* Rejected:
it would copy resources for unselected clients, contradicting the selected-client-only rule
this guide holds throughout, and it fires before client selection is even settled.
*Leave provisioning implicit and let the operator improvise.* Rejected: that is the current
state, and it produces either a missing file or an unreconciled copy carrying another
project's machine-specific paths. *Reconcile against the adopting machine's environment.*
Rejected above — it optimizes for the operator at the expense of the team.

### D18 — When the reviewer is unavailable, narrow the claim; never widen the evidence

**Decision**: independent human-orientation attempt 2 is recorded as **NOT RUN**, with its
reason. The change's readiness claim is bounded to what evidence actually supports, and is re-narrowed
whenever the evidence stops covering the current state. It began as *mechanically validated,
agent-navigability validated, ready for a controlled pilot adoption*; the D4/D13 corrections
changed agent-facing prose that agent attempt 2 never read, so **agent navigability returned to
unclaimed** and pilot readiness with it, pending a fresh attempt 3 (task 16.24). **Attempt 3 then
ran and passed against the corrected state, so both are restored — by new evidence, not by
re-reading the old.** The still-unverified properties are moved to a binding deferred-validation
contract rather than left as indefinitely blocked tasks.

**The narrowing and the restoration are the same rule.** A claim tracks the state its evidence
actually covers, in both directions: withdraw it the moment the judged thing changes, restore it
only when a fresh run covers the new state. What is never permitted is the shortcut between those
two — arguing that the old PASS "essentially" still holds because the change was only a
clarification. Attempt 3 cost one more fresh session; that is the entire price of never making
that inference. Its two recorded limitations travel with the restored claim rather than being
absorbed by it: the attempt was **scored by the implementing session**, not independently, so its
scored rows are each backed by a mechanical re-derivation against the tree, and it is **not** an
independent review of this change — task 16.20's obligation is untouched by it.

**This principle applies to more than an unavailable reviewer.** Its first application was human
attempt 2's absence; its second is evidence that has been *superseded* rather than never gathered.
Both resolve the same way — say what is validated about the state that actually exists, and never
carry a PASS forward across a change to the thing it judged.

**The three options, and why this one.** With no independent reviewer available: (a) leave
16.8/16.10/16.19 blocked and the change frozen indefinitely; (b) let the implementing session,
or an already-exposed reviewer, stand in and report a PASS; (c) state precisely what is and is
not validated, and defer the rest with a recorded obligation. (a) wastes work that is already
verified and useful. (b) is the failure mode this entire gate structure exists to prevent — it
would convert "we could not test this" into "this passed", which is the same inference the
evidence discipline forbids everywhere else in the guide. (c) is the only option that keeps
every claim backed by its evidence.

**`NOT RUN` is not `N/A`, and not a soft PASS.** `N/A` would assert the check does not apply;
it does apply, and the guide needs it. A blank or an omission would let a later reader assume it
passed. `NOT RUN` with a reason is the accurate record, and it is exactly parallel to
`ADOPT-05B`'s rule that an unavailable client/OS combination is `PENDING EVIDENCE`, never PASS —
the same principle applied to this change's own acceptance rather than to an adopting project's.

**What the bounded claim rests on.** Mechanical validation: link integrity, invariant counts,
approval-gate mapping, byte-for-byte verbatim fidelity, untouched-file proof, and the Java 11
baseline. Agent navigability: **attempt 3's PASS** against the current post-D4/D13 state — five
demonstrations plus both deciding behaviours — with attempt 2's PASS standing as evidence about
the state it read and attempt 1's FAIL preserved as the record of two real defects it found.
Task 16.9's objective check on the entry
file's approval content also stands — but it verifies the document's content, not a reader's
comprehension, and must not be reported as human validation.

**Why the pilot cannot discharge the independent review.** The first human-led adoption is run
by someone who has read this guide to run it; their success is evidence the procedure works, not
evidence that it explains itself to a newcomer. Prior exposure is precisely what the orientation
gate controls for. So the pilot and the independent review are separate obligations, and the
pilot must record its operator's prior exposure so that distinction stays visible.

**A permanent FAIL is not a permanent blocker.** Human attempt 1's verdict stays FAIL forever,
and its "blocking" is historical: it blocked the pre-D14/D15/D16 guide, which is what the gate
exists to do, and all six of its failures were remediated (tasks 8.7–8.10). Preserving it as
historical defect evidence is not the same as leaving the change blocked by it. The agent gate
shows the pattern cleanly — agent attempt 1 was a blocking FAIL, was remediated by D12/D13, and
agent attempt 2 passed; nobody treats agent attempt 1 as outstanding. The human case differs
only in that attempt 2 could not be run, so the corrected guide carries no independent human
verification in either direction. That absence — not attempt 1 — is what this decision bounds.

**Alternatives considered**: *Mark the tasks complete with a note.* Rejected: a checked box is
read as evidence. *Delete the human gate.* Rejected: it found a real defect on its first run;
removing it would discard the mechanism that caught six failures. *Wait indefinitely.* Rejected:
the mechanically and agent-validated work is usable for a controlled pilot now, and holding it
back produces no additional evidence.

### D19 — A derived figure in a persisted evidence report carries the command that reproduces it

**Decision**: every block of derived figures in `reports/acceptance-criteria-verification.md` and
`reports/invariant-reconciliation.md` states the exact command that reproduces it, runnable from the
repository root against the working tree. The figure is a point-in-time snapshot of a tree; the
**command** is the durable artifact. A reader who doubts a figure re-derives it rather than trusting
it or disproving it by hand.

**Amended after the cross-client review (AR14).** The formulation above — "states the exact
command" — proved satisfiable by prose and by placeholder sketches, so reproduction never actually
transferred to the reader: the next reviewer still had to build their own tooling before they could
check a figure. That is this defect class's **sixth** consecutive cycle, and the first found by a
**cross-client** reviewer rather than by the implementing client. The standard below supersedes the
looser reading rather than being enforced against it, following D4's precedent.

**The literal-command standard.** A `CURRENT` inventory row satisfies D19 only when it either:

1. **contains the complete literal executable command**, copy-paste runnable from the repository
   root exactly as written; or
2. **references exactly one stable command ID** whose complete copy-paste executable command
   appears in an adjacent fenced command block in the same report.

A command-ID reference is valid only when it resolves **one-to-one**. Prohibited in either form:

- **ellipses** (`…`, `...`) standing in for any part of a command;
- **placeholders** — `<n>`, `<file>`, `<label>`, `<path>`, or any other unbound operand;
- **pseudo-commands and prose stand-ins** — "link checker", "per-step parse", "extract each
  labeled block", "re-derived per step";
- **vague cross-references used in place of a command** — "commands below combined", "same over
  the guide set", "the B1/B4/B6 commands";
- **unstated manual filtering** — "with the negating-context matches excluded".

Multi-step checks carry an **explicit ordered sequence** of literal commands. A check that
genuinely needs a script carries that script **inline as a heredoc**, so the row stays copy-paste
executable without reference to a scratch path. Every operand must be present, and the row's
command set must prove **every figure the row claims** — a row claiming four figures and
reproducing one is incomplete, not literal-but-partial. That last clause is what makes `A4` a
violator despite carrying a real command.

Abbreviation stays legal in the **Figures** field, where a truncated hash such as `0405b6bd…`
names a value the command prints in full. The standard governs the **Command** field and the
blocks its IDs resolve to — which is why `A2` is clean and `B12` is not.

**Why correcting instances was not enough.** D8 asserts that verification is mechanical. The checks
were; their transcription into the reports was not. Five consecutive verification cycles found stale
derived figures in these same two files — VF2/VF3/VF4, re-run 5's Major-plus-three-Minor, VF6–VF9,
the `/specboot-verify` **PASS WITH GAPS** recorded as VF10–VF12, and the `/adversarial-review`
**FAIL** recorded as AR6–AR13. Each cycle corrected the instances it found and left the mechanism
alone, so the next cycle found new ones. AR7 is the clearest case: a recurrence of VF3's exact
defect class inside the very table VF3 corrected and re-run 5 edited again — both passes re-derived
the 11 preserved gate references and skipped the 6 explanatory ones. The verification-evidence
persistence contract compounds this by design, because every verdict persisted under `reports/`
adds more hand-transcribed figures to the same two files.

**What this decision does not claim.** It does not claim any load-bearing figure is wrong. The
adversarial review re-derived every one against the tree — 122 links with zero broken, 20 approval
markers with all 11 preserved gates resolving, 20 record blocks, 4 byte-identical verbatim blocks,
18 × 8 = 144 contract fields, max working file 265 — and all of them hold. No criterion verdict
changes. The defect is in the reproducibility of the evidence record, not in the guide it certifies.

The same holds for **AR14**. The fresh `specboot-verify` run that preceded the cross-client review
re-derived the load-bearing figures independently — 122 links with zero broken, 4 verbatim blocks
byte-identical against `git show HEAD:`, 144 contract fields in fixed order, all 18 `On failure`
pointers resolving, all 11 preserved gates mapping 1:1, the untouched-file proof at exit 0 — and
every one held. AR14 says those figures are not *reproducible from the record*; it does not say
they are wrong. The distinction is load-bearing in both directions: it is why the change's
mechanical-validation claim survives the FAIL, and why the FAIL is nonetheless a Major that blocks
archive eligibility until the inventories are corrected.

**Scope boundary, and why the agent gate stays closed.** This correction touches evidence reports
and planning artifacts only. It changes no guide file and no executable contract file — not
`SPECBOOT_ADOPTION_GUIDE.md`, not `00-conventions.md`, not any phase file, history file, support
file, or the run-log template. The bounded agent gate tests what a fresh agent reads and does;
`design.md` and `proposal.md` are not in that set. The persistence contract's invalidation rule
(task 10.12.2) is scoped to the **affected** gate, not to every gate, so a change to design or
proposal semantics that no gate under test can observe reopens nothing. Task 10.17 proves the
boundary rather than asserting it, by SHA-256 over all 15 guide-set files before and after.

**Alternatives considered.** *Correct the figures again and stop* — rejected: that is exactly what
the four preceding cycles did, and each was followed by another. *Add a regeneration script* —
rejected: it introduces an executable artifact this change's scope excludes, and it would need its
own verification, for the same reproducibility a command written beside its figure already gives.
*Delete the derived figures* — rejected: they are the evidence, and removing them would leave the
criteria unsupported. *Mark the reports as approximate* — rejected: an evidence record that
disclaims its own accuracy is not evidence.

### D20 — The human archive decision is pending, and may never be inferred

**Decision**: no artifact in this change may state, imply, or infer that archive has been approved.
The human orientation and self-description gate (D11) is self-declared **blocking**, is recorded as
`NOT RUN`, and its only human attempt stands as a permanent FAIL. D18 narrows the readiness claim
when the reviewer is unavailable — but narrowing a claim is not the same as approving an archive.
The decision to archive with that gate undischarged belongs to a human, is recorded nowhere today,
and must be recorded explicitly — as an accept or as a defer — before archive.

**Why this is stated as a decision rather than left implicit.** The change now carries a
`/specboot-verify` **PASS WITH GAPS**, an agent gate **PASS** on attempt 3, and a design decision
(D18) that sanctions deferring the human gate. A reader could assemble those three into "approved".
None of them is an approval, and two of this change's own rules already say so in adjacent
contexts: a verify PASS grants eligibility for review only, and an adversarial-review PASS does not
grant archive approval by itself. D20 closes the remaining path by naming the one approval that is
missing, so that its absence is a recorded fact rather than a gap a reader has to notice.

**What discharges it.** A human statement, recorded under `reports/`, either accepting archive with
the orientation gate undischarged — in which case the undischarged obligation in task 16.20 travels
forward unchanged — or deferring archive until an unexposed reviewer is available. Nothing else:
not a gate verdict, not a re-run, not the passage of time.

**Alternatives considered.** *Treat D18's narrowed claim as sufficient* — rejected: D18 governs what
may be **claimed** about the evidence, not what may be **done** with the change. *Mark the human
gate N/A* — rejected, and already refused by task 16.8. *Let the adversarial review's verdict decide*
— rejected: that skill's own completion rule states a PASS-family verdict does not by itself grant
archive approval, so delegating the decision to it would contradict the instrument being delegated to.

## Risks / Trade-offs

- **Prose reshaping (D4) silently drops a rule** → the highest-consequence risk, since a lost approval gate or validation criterion is invisible in a large diff. Mitigation: D8's invariant counts are checked per-file *and* in aggregate, and the mapping table forces every source section to name its destination before any file is written.
- **Verbatim block altered during relocation** → mitigated structurally by D9 (extract, don't retype) and proven by explicit byte-for-byte diff, which is a task step, not a review habit.
- **Truncation or silent replacement during a large write** → the failure §22 already documents. Mitigation: physical verification after every write; no single write produces more than one file.
- **Anchor drift** → a `##` heading becoming `#` in its new file changes its anchor silently. Mitigation: the link checker resolves every anchor against the actual heading set rather than against expectation; within-file duplicate headings are checked separately, since `### Validation` and `### Expected result` repeat many times today and only *within-file* duplication breaks uniqueness.
- **§18 pointer loses orientation for a reader who only has the guide** → mitigated by keeping the ordered list, the blocking summary, and the status marker locally; only the detailed transcription is replaced by a link. Residual trade-off accepted: a reader offline from the canonical sources gets less detail than today.
- **Human discoverability regression** → one file is greppable in one place and shareable as one link; 14 are not. Mitigation: the entry file's index and §-map. Residual trade-off accepted deliberately, since the agent-context and lifecycle-mixing gains dominate and `grep -r` over a directory is a small step down from `grep` over a file.
- **Scope creep into methodology revision** → discovering a genuine defect in a step while reshaping it is likely, and fixing it inline would violate `CLAUDE.md` §7. Mitigation: an explicit task instruction to record such findings as follow-up candidates and leave the step's meaning unchanged.
- **Re-drift after this change** → D6 removes the largest duplication, but the guide still restates repository facts (client lists, paths) that could age. Not solved structurally here; no include mechanism exists for Markdown in this repository, and introducing one is a larger change than this one warrants. Flagged, as the archived change flagged its own predecessor.
- **Over-claiming what the acceptance gates prove** → a PASS on bounded navigability and self-description checks could later be read as evidence the guide is validated end-to-end, or that human usability was demonstrated. Mitigation: the boundary statements are required report lines (tasks 16.11–16.12), not conventions; the human gate is named for orientation and self-description rather than usability; and the guide's own `PENDING END-TO-END VALIDATION` markers stay untouched.
- **Bounded gates catching only what they were designed to catch** → attempt 1 found two real defects, which is evidence the gates work, but also a reminder that a passing attempt 2 proves only what D11 says it proves. Mitigation: D11's boundary statement is unchanged and still required verbatim in both reports; attempt 2 does not upgrade the evidence class, only the result.
- **Re-verification drift after remediation** → group 10's suite validated a guide state that these fixes change (new heading, new links, an added approval marker, altered word count). Mitigation: all eight group-10 tasks are unchecked and re-run as a unit rather than partially trusted, and the invariant baseline is re-derived rather than carried forward.
- **Entry file growing past its role as a thin index** → D14–D16 add prose to a file whose value is being short enough to read whole. Mitigation: the human operating model is orientation only — no step detail, no gate list, no procedure duplicated from the phase files — and the ~300-line guideline still applies to it.
- **Agent evidence gathered against a superseded entry file** → agent attempt 2 read the pre-D14/D16 entry file, and task 10.9's byte-identity check kept its evidence applicable through the D14–D17 edits. That condition **no longer holds**: the D13 failure-path correction changes the entry file's failure prose and `00-conventions.md`'s field definitions, which are agent-facing. The gate is therefore reopened, not assumed harmless — a genuinely fresh attempt 3 is required (task 16.24), attempt 2's PASS stands only as evidence about the state it tested, and the readiness claim narrows in the meantime rather than being carried forward. **Resolved:** attempt 3 ran against the corrected state and passed on tasks 16.24–16.26, so the claim is restored on its evidence; attempt 2 remains evidence about its own state only. The residual limitation is recorded, not resolved — attempt 3 was scored by the implementing session rather than an independent reviewer.
- **A regression check that only protects known fragments** → task 10.9 proves *named* agent-facing fragments byte-identical, which by construction cannot detect **newly added** text that contradicts the step set. That is precisely how the entry file's failure paragraph came to assert a universal nine of the eighteen steps do not satisfy, while every protected fragment stayed unchanged and the check reported PASS. Mitigation: 10.9's protected set is extended to the human operating model's failure, approval, and evidence prose, and 5.6 audits all 18 steps against the contract rather than only the pointers that already exist. Residual limit stated plainly: a fragment-identity check can never be a substitute for re-reading what was added.
- **Human attempt 2 reusing attempt 1's reviewer** → prior exposure makes a PASS partly a memory test. Mitigation: a different reviewer is preferred; if unavoidable, the prior exposure is recorded as an explicit limitation and the result is not presented as a usability study.
- **Permission reconciliation widening into a security review** → the safety check (no credentials, personal absolute paths, machine-specific dependency locations, unsafe broad patterns) is a bounded inspection of one file, not an audit of the repository's security posture. Mitigation: the checklist is fixed and enumerated in the task; anything beyond it is a follow-up candidate.
- **Editing the approved generic baseline instead of the project copy** → the same conflation `ADOPT-05B` already warns about for `.kiro/settings/permissions.yaml`. Mitigation: an explicit task asserting the source baseline is byte-unchanged, mirroring the existing check that this repository's real permission files stay untouched.
- **A bounded claim being read as a full one** → "ready for a controlled pilot adoption" could be quoted later as "validated". Mitigation: the unverified properties are named explicitly in `proposal.md`, in design D18, and in the human-orientation report; a task requires checking that no artifact claims human usability or end-to-end validation.
- **The deferred obligation quietly lapsing** → deferred validation that nobody owns never happens. Mitigation: the pilot's required record is enumerated (prior exposure, evidence, deviations, failures, recoveries, proposed guide and troubleshooting improvements), and the future independent review by an unexposed developer is retained as a separate, undischarged obligation.
- **The reproducing command itself going stale (D19)** → a command written beside a figure can rot as surely as the figure did, and a wrong command is worse than none because it manufactures false confidence. Mitigation: every command is written to run from the repository root against the working tree with no intermediate files, no fixed line numbers, and no dependency on a scratch path; task 10.14/10.15 requires each one to be executed and its output compared against the persisted figure at the moment it is written, so a command that does not reproduce its figure fails the task rather than being recorded. **Extended after AR14**: staleness was never the only failure mode — a command can also be *unrunnable as written*, and a prose description of a check ("link checker", "per-step parse") reads like a command while transferring none of its reproducibility. The literal-command standard closes that, and task 10.23 audits it mechanically rather than by review, because a standard checked only by reading is how the first five cycles were passed.

## Migration Plan

No runtime component, no data migration, no rollback mechanism beyond `git revert`. Rollout is: implement per `tasks.md` on `feature/restructure-specboot-adoption-guide`; run the D8 verification suite; then take the change through this repository's own workflow — `specboot-verify` → independent `adversarial-review` (ideally a different session or client than the one that implemented it) → explicit human approval → `opsx:archive`. Commit and push remain separate, later, explicit approvals.

The change is self-hosting in an unusual way worth stating: it restructures the guide that documents the workflow being used to restructure it. The pilot value is real — if the six-capability workflow cannot carry a documentation change of this size cleanly, that is itself a finding worth recording in the run. Note the limit of that pilot value: it exercises the workflow, not the restructured guide. End-to-end validation of the guide itself will come from the next real SpecBoot adoption performed in another repository, not from this change.

## Open Questions

None. The four material decisions (set location and npm distribution; document set vs. invocable skill; §18 duplication; single-change vs. split-then-contract) were resolved with the requester before proposal and are recorded in `enriched-work-item.md` under "Resolved decisions". The two lower-stakes choices — §-number back-compatibility policy and filled-run-log lifecycle — are settled in D3 and D5 respectively.

Five separately approved methodology changes are recorded in `proposal.md` as future-change
items and are **not** implemented here: mandatory provider-neutral code-graph capability;
conditional creation of missing client adapters; pre/post adoption baseline comparison; commit
and push after each validated independent checkpoint; and real project-task E2E validation in a
separate branch before the adoption PR. Each would alter the adoption methodology this change
deliberately preserves — the last two would change `ADOPT-16`/`ADOPT-17` and this guide's
"STOP before push" boundary directly — so each needs its own proposal, design, and acceptance
evidence rather than riding along with a restructure.

One further item is deliberately deferred rather than left open: whether `docs/documentation-standards.md` should record the entry-file-plus-phase-files pattern as a repository convention for long operational documents. That depends on whether the pattern proves itself in a real adoption run, so it is a follow-up candidate, not a task here.
