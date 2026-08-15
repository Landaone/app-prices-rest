## Context

See `proposal.md` — Why for motivation, and `enriched-work-item.md` for the full grounded analysis this design implements (decisions of record **D-1 … D-10**).

Constraints that shape the approach, all verified in this repository at `c900394`:

- **`ai-specs/` is the canonical source**; agent paths reference it by symlink, and a duplicated canonical artifact across agent folders is a completion-gate failure (`CLAUDE.md` §6). `.claude/skills/*` and `.kiro/skills/*` are already relative symlinks to `../../ai-specs/skills/<name>`; OpenSpec-generated `openspec-*` skills are real directories.
- **Skip-on-exist is the ambient failure mode.** `ADOPT-03` uses `cp -rn`, and `init.js#createSymlink` skips any path that already exists and records it only as *skipped*. `ADOPT-13` additionally preserves a real directory that collides with a canonical skill name and skips the symlink. A bootstrap that writes a real file at a canonical symlink path therefore creates a permanent, silently-recorded defect.
- **The bounded per-step working set is exactly three files** (`00-conventions.md`, the current phase file, the filled run log). Any design that requires the orchestrator to hold more is a contract violation.
- **The contract currently contradicts two requirements of this change**: `02-codegraph.md` opens with a decision node making the whole file conditional, and `ADOPT-17` states "**Do not push.** Remote mutation is outside this guide entirely." matched by `00-conventions.md` §Scope boundaries.
- **`.specboot/staging/` is git-ignored; `.specboot/` itself is not**, so a durable committed record can live under `.specboot/` without loosening the existing narrow rule.
- **Phase file numbering is already non-contiguous by design** (`00`–`08`, `19`, `22`), and step IDs are stable identities, not positions.
- **This machine is `Darwin 22.6.0`** with no Windows host, and the repository has **no `.github/workflows/`**.
- **The canonical SpecBoot source now lives outside the repositories that adopt it.** Its location is runtime input supplied at `ADOPT-00`, never a path recorded in a canonical artifact. A supplied source may legitimately not be a Git working tree, so an explicit "unavailable" provenance record is a first-class outcome rather than a gap someone fills in later — and a Git source with uncommitted changes is a *third* state, neither cleanly identified by its HEAD nor unavailable (D-S). **The pilot's source is additionally constrained**: it must be Git-backed and byte-match the final committed guide, phase files, and skill (D-W). `/Users/landaeta/repos/specboot` now satisfies the first condition — it is a clean Git sparse worktree at the committed base implementation `59690fc` — and satisfies the second only up to that commit, so it must be advanced and reverified once the launcher chain is committed.

## Goals / Non-Goals

**Goals:**

- Make the adoption contract self-starting in a repository with zero AI tooling, without ever creating a real file where a canonical symlink must later go.
- Let a project adopt from a canonical source it does not contain — without copying that source into itself, and without ever writing back to it.
- Make every refusal cheaper than every partial success: no source, no client, an unsupported client, a collision, or a client that cannot discover the skill each stop the run **before** the first target-repository write.
- Ship one delivery mode that has been driven end to end from a virgin repository, rather than two of which one has not.
- Make an adoption startable from **one** prompt, so the operator never has to discover a missing instruction mid-run and patch it in.
- Keep exactly one authority: the guide stays the contract, the skill executes it, and neither restates the other.
- Make cleanup auditable rather than best-effort — removal is driven by a committed inventory, not by path patterns.
- Bring push inside the contract behind evidence and two gates, rather than leaving it as an undocumented action operators take anyway.
- Produce a skill that survives adversarial pressure, validated by the repository's own `writing-skills` TDD discipline.

**Non-Goals:**

- Permanent client provisioning for Kiro or Codex (`make-specboot-installer-client-aware` remains separate future work).
- **Packaged-snapshot delivery**, deferred whole to `add-specboot-packaged-snapshot-delivery` with the scope D-W enumerates. This change neither ships it nor exposes it: with no validated canonical source the CLI fails closed.
- Validating any client other than Claude in this change's pilot. Kiro and Codex are `NOT SELECTED` for it; Codex's outstanding discovery-and-execution evidence is carried forward as a deferred recipe obligation (D-Q).
- Rewriting daily-workflow semantics or the six-capability gate rules.
- Repairing the pre-existing `packages/specboot/template/` drift.
- Any change to Java/Spring Boot service code, `docs/api-spec.yml`, or `docs/data-model.md` — this change is repository tooling, so `docs/backend-standards.md`'s layered-architecture and database-pattern rules have no applicable surface here.

## Decisions

Decision letters are stable identifiers, not positions — the same rule the adoption contract applies to `ADOPT` IDs. D-L, D-M, D-N, and D-O were added after D-K and are placed next to the decisions they elaborate (D-F, D-E, the step-numbering decisions, and D-M respectively) rather than appended, so the letters do not read in strict alphabetical order. D-R, D-S, D-T, and D-U were added later still, when the canonical source moved outside the adopting project, and are likewise placed beside what they elaborate (D-A, D-R, D-Q, and D-K). D-V follows D-T because it composes D-A, D-R, D-S, D-T, and D-U into a single invocation rather than elaborating any one of them. D-W and D-X were added last, when the change narrowed to source-linked-only delivery, and sit beside what they elaborate (D-R and D-D). **D-P is retired and is never reused**: it was withdrawn with the reverted second revision, and reissuing the letter would make a removed decision look like a current one. **D-Y and D-Z were added tenth**, from a completed pilot run's evidence, and sit beside what they elaborate (D-C, for `ADOPT-18`'s preconditions and re-validation scope, and D-X, for the exact-inventory principle it generalizes from bootstrap-only to every step).

### D-A. The kit lives in `specboot-adoption/bootstrap-kit/` and holds references, never content

The kit is the *contract's* delivery vehicle, not part of the product being installed. Putting it in `ai-specs/` would make every adopted repository permanently carry the machinery that adopted it.

*Alternative rejected:* `ai-specs/skills/specboot-adopt/bootstrap/`. The kit must deliver the guide, the phase files, and the run-log template — all canonical elsewhere — so embedding them under the skill creates exactly the duplicated canonical source `CLAUDE.md` §6 forbids.

The manifest lists canonical repository-relative paths plus a payload→target mapping. The npm payload is assembled at **pack time** from those paths (`prepack` or equivalent), so no second copy is checked into git. This is the direct countermeasure to drift that already exists in this repository — and the drift is broader than first recorded: `code-auditing`, `enrich-us`, and `using-git-worktrees` all differ between `packages/specboot/template/ai-specs/skills/` and canonical.

### D-R. Source-linked is the delivered mode, and an absent canonical source fails closed

The canonical SpecBoot source no longer lives inside the repositories that adopt it. An adoption therefore begins by resolving *where the contract is* — and that resolution is a **precondition of the run, not a branch within it**. This change delivers **source-linked adoption only**. A run with no validated canonical source does not silently pick a second mode; it stops.

A supplied path is a valid canonical SpecBoot source only when all three of these are present:

- `SPECBOOT_ADOPTION_GUIDE.md`
- `specboot-adoption/`
- a readable `ai-specs/skills/specboot-adopt/SKILL.md`

Validation is a **precondition of the first write, not a diagnosis after it**. An incomplete source, or no source at all, is rejected before anything is created in the project. A source that validates is treated as **read-only for the entire adoption** — no step writes to it, and that includes the improvement-proposal step (D-U).

| | source-linked (delivered) | no validated canonical source |
|---|---|---|
| reached when | a local canonical source is supplied and validates | the operator supplies none, or the supplied one fails validation |
| `.specboot/bootstrap/` | **never created** | never created — nothing is created |
| guide / phase files / skill body | referenced in place, never copied | not delivered |
| `.specboot/adoption/` | project-specific durable state only | not created |
| discovery entries | point at the external canonical paths | not provisioned |
| external source | read-only for the whole adoption | not applicable |
| outcome | the adoption proceeds | **fail closed**: the run reports that a canonical source is required and leaves the target repository byte-for-byte unchanged |

Source-linked is the delivered mode because **copying is the defect**. A copied guide is a fork the moment the canonical source changes, and a project holding a copy will eventually edit it — precisely the second-authority failure D-A rejects at repository scope, reappearing at project scope.

**Fail-closed is a stronger guarantee than a fallback nobody has driven end to end.** An earlier form of this decision paired source-linked with a packaged-snapshot fallback so that a project with no local source could still adopt. That fallback is deferred in full under D-W, and until it returns the CLI must not expose it: a mode that has never completed a cold start, has no client-discovery entry, and records null payload identity is not a safety net — it is a path that fails *after* writing, which is the one failure shape this change spends its preflight (D-X) preventing.

*Consequence for symlink-less environments:* source-linked exposure is a link to an external absolute path. Where the selected client cannot natively discover the external skill without a symlink, the run **fails closed before provisioning** and reports the capability limitation (D-D). A real pointer file is not a discovery mechanism and is never recorded as one, and degrading to a content copy is forbidden outright: it would recreate the fork this mode exists to prevent.

*The source path is runtime input.* No canonical artifact records a machine-specific source path. The path is supplied at `ADOPT-00`; it is never written into a committed artifact (D-S), and it is retained only in the ignored machine-local store.

*Alternative rejected:* a single copy-always mode. It is simpler, and it is the fork.

*Alternative rejected:* keeping packaged-snapshot as a live fallback in this change. See D-W — it survives as a deferred change with a defined scope, not as a partially implemented mode the CLI offers.

### D-W. Packaged-snapshot is deferred in full to `add-specboot-packaged-snapshot-delivery`

This change's first controlled pilot is **Claude-only, source-linked, and cold-start**. Packaged-snapshot cannot meet it. Its entry prompt is not distributed with the payload it would need to be pasted from, its bootstrap writes before it plans, its client selection is optional (`selectedClient: 'undeclared'` is a reachable committed value), it provisions no client-discovery entry at all, its manifest records `guide-checksum: null` and `skill-checksum: null`, its resume has never been exercised, and no run of it has ever started from a virgin repository and ended in a discovered skill. Every one of those is a real gap, and together they are a second mode's worth of work.

**So it is deferred as a whole, not trimmed.** The decision has three parts:

1. **Removed from the current change's claims and executable surface.** No readiness claim, entry-prompt question, active requirement, guide passage, README quick start, or CLI code path in this change offers packaged-snapshot. The CLI fails closed when no canonical source is supplied (D-R) rather than routing to a half-built mode.
2. **Its historical evidence is preserved, not deleted.** The RED/GREEN records, the 4.21 behavior-pinning baseline, and the reports that describe what packaged-snapshot did at the time they were written stay exactly as they are, labelled as history for a deferred mode. Rewriting evidence to match a later scope decision is the fabrication this contract forbids everywhere else.
3. **Its remaining design is owned by one named follow-up change: `add-specboot-packaged-snapshot-delivery`.** That change is not "finish the fallback"; it has an explicit scope that this change records so the deferral cannot quietly become an abandonment. It SHALL cover, at minimum:
   - **distribution of the entry prompt** — how `ADOPTION-ENTRY-PROMPT.md` reaches an operator who has no canonical source to read it from, which is the bootstrap problem of the bootstrap;
   - **read-only bootstrap planning** — the same preflight and exact-mutation gate D-X defines, applied before the payload is written;
   - **explicit client selection** — the same missing/unknown-client refusal D-T requires, with no `undeclared` value reachable;
   - **actual client discovery entries** — a payload the selected client can natively discover, not a payload on disk with nothing pointing at it;
   - **non-null payload identity** — real checksums over the delivered payload, since `null` identity cannot detect drift, cannot verify a resume, and cannot distinguish a payload from an empty directory;
   - **verified resume** — a resume path exercised end to end against recorded identity, with the same drift block source-linked has;
   - **a safe fallback where symlinks are unavailable** — resolved on its own terms rather than by inheriting source-linked's fail-closed answer;
   - **end-to-end cold-start evidence** — one complete virgin-repository run ending in a fresh-session discovery PASS, which is the evidence this change requires of source-linked and must equally require of any mode it later ships.

**Pilot precondition on the canonical source.** The pilot is source-linked, so the shared canonical source it links to is part of what the pilot proves. It SHALL be a **Git working tree** — otherwise the run can only ever record `unavailable` provenance, and the honest-provenance rule of D-S goes untested — and its `SPECBOOT_ADOPTION_GUIDE.md`, `specboot-adoption/` phase files, and `ai-specs/skills/specboot-adopt/SKILL.md` SHALL **byte-match** the final committed versions in this change. A pilot run against an older copy validates instructions that were superseded before the run started.

`/Users/landaeta/repos/specboot` now satisfies the **first** condition and only partly the second. It is a **clean Git sparse worktree at `59690fc`**, the committed base implementation, carrying the canonical guide, `specboot-adoption/`, and `ai-specs/skills/specboot-adopt/`, and its 36 files byte-matched the development worktree when it was created; the earlier stale non-Git copy is preserved separately at `/Users/landaeta/repos/specboot-stale-backup-2026-08-14`. What it does **not** yet match is the launcher work: the ninth revision's chain is uncommitted and `ADOPTION-LAUNCHER.template.md` does not exist in any commit, so a pilot run against that worktree today would validate a kit with no launcher in it — the same superseded-instructions failure this precondition exists to prevent, one revision later. **It must be advanced to the commit the launcher chain produces and reverified byte-for-byte before the pilot links to it.** That path is recorded here as *this change's* pilot evidence, in an OpenSpec planning artifact — it is not a canonical SpecBoot artifact, so D-R's no-hard-coded-path rule and the greps in tasks 3.9, 3.12, and 15.2 are unaffected, and the path must not appear in any canonical artifact.

### D-S. Source identity is checksums, not a path; drift stops the run

The manifest gains a `source` block recording **portable identity only**: `delivery-mode`
(`source-linked` | `packaged-snapshot`); `guide-checksum`; `skill-checksum`; `git`; and an explicit
statement that the local source path is resolved per machine and is **not stored in the committed
manifest**.

**The resolved absolute path is machine-local runtime state, and is never committed.** An earlier
form of this decision recorded it in the manifest as "execution evidence, explicitly labelled
machine-specific and non-portable". Implementation showed that label does not hold the line: the
manifest is committed by design, so recording the path there puts one operator's laboratory path
into every clone of the adopting repository — the exact leak every other artifact in this change is
forbidden to produce. A label describing a value as non-portable does not make committing it
portable.

So the path lives in **machine-local, git-ignored state** under `.specboot/local/`, alongside the
other transient paths and provisioned by the same ignore mechanism. That store is a **convenience
pointer, not provenance**: it holds the path and nothing else — no checksums, no commit, no mode —
it is never read as evidence, and its absence is never an error. There is exactly one provenance
mechanism, the committed manifest's `source` block, and this decision does not add a second.

**Identity is the checksums, and now it is the *only* thing identity can be.** On resume, the
orchestrator obtains a local source path — from the machine-local store when one exists on this
machine, otherwise by asking the operator or rediscovering it — and recomputes the checksums
against it:

- **Checksums match** (and the recorded Git commit matches, where one was recorded) → resume.
- **Checksums differ** → **drift**. Stop for human reconciliation. Never silently adopt changed
  instructions.
- **No local path known** → request or rediscover one. This is the ordinary case on any machine but
  the first, and it is not a failure.

The original machine's path is **never** required to exist, and there is no longer a recorded path
that could tempt an implementation to require it. What was previously a rule the code had to
remember to honour is now a property of the data.

`git` records the source commit when the source is a **clean** Git working tree, and otherwise an explicit unavailable record carrying its reason. Inferring or inventing a commit would be exactly the fabricated evidence the contract forbids everywhere else, and an absent field would be indistinguishable from an uncollected one.

**A dirty Git source is a third state, and recording its HEAD is a lie.** A working tree with uncommitted changes has content that no commit identifies: the HEAD names what was committed, and the run linked to something else. Reading a commit and writing it down as though it identified the source's exact content produces provenance that is *precisely wrong* — worse than absent, because a later reader can resolve the commit, diff nothing, and conclude the source matched. So the `git` block carries three dispositions, never two:

| Source state | `git` disposition | Rationale |
|---|---|---|
| not a Git working tree | `unavailable`, with the reason | no commit exists to record |
| Git working tree, clean | `recorded`, with the commit | the commit identifies the exact content |
| Git working tree, **uncommitted changes present** | `unavailable`, with the reason *and* the observed HEAD recorded as context only | the commit does **not** identify the content the run linked to |

In the dirty case the HEAD may be retained as **context**, explicitly labelled as not identifying the source content, and it SHALL NOT be written to the field a consumer reads as identity. **Identity remains the checksums in every case** — they are computed over the bytes actually read, so they are correct whether the source is clean, dirty, or not a repository at all. That is what makes the dirty case a provenance-honesty problem rather than an identity problem: nothing about drift detection depends on Git, and nothing about Git is allowed to overstate what it knows.

*Alternative rejected:* recording HEAD for a dirty tree and noting the dirtiness in a separate flag. It preserves the convenient field at the cost of making the convenient field wrong, and every consumer that reads `commit` without also reading the flag is misled by default.

**A running adoption does not consume canonical-source changes made after its recorded checksums.** Improvements landed on the canonical source mid-run are input to the *next* adoption, or to a deliberate re-baselining a human approves and the run log records — never a silent substitution of the instructions being executed.

*Alternative rejected:* identity by path, or by modification time. Both make identity a property of the machine rather than of the content, and neither can tell a moved source from a changed one.

*Alternative rejected:* keeping the resolved path in the committed manifest under its
machine-specific label, and narrowing the no-absolute-path rule to exempt that one field. It keeps
a real convenience — a same-machine resume needs no question — at the cost of committing a path
that resolves nowhere else, and of making "no machine-specific path in the committed tree" a rule
with an exception, which is a rule that erodes. The convenience survives anyway: the machine-local
store answers the same-machine case without anything reaching a commit.

### D-B. Two landing directories with opposite lifetimes

| Path | Lifetime | Git | Contents |
|---|---|---|---|
| `.specboot/bootstrap/` | transient, until `ADOPT-18` | ignored | guide copy, phase files, run template, skill body, README |
| `.specboot/adoption/` | durable, outlives adoption | committed | `BOOTSTRAP-MANIFEST.json`, `ADOPTION-RUN-LOG.md` |

Separating them is what makes cleanup auditable: the payload disappears, the record of what the payload did does not. A manifest inside the directory it governs would be destroyed by its own cleanup step, and an ignored manifest could neither be reviewed in a diff nor resumed from by another operator.

*Consequence for the installer:* the ignore rule must be provisioned per transient path using the same `git check-ignore` probe the staging rule already uses — not a literal-line match — and must never widen to a bare `.specboot/`, which would swallow the durable evidence.

**The `.specboot/bootstrap/` row describes the deferred packaged-snapshot mode (D-W) and is retained for when it returns.** In the delivered source-linked mode that directory is **never created**, `.specboot/adoption/` is the only landing directory, and every payload and container obligation in `ADOPT-18` is recorded `SKIPPED — source-linked mode` rather than passed or silently omitted. The **ignore rule** for `.specboot/bootstrap/` is nonetheless provisioned unconditionally: it is idempotent, it costs nothing when the path never appears, and it is a mode-independent property of the installer rather than a claim that the mode is available — which is also why the deferred change inherits a correct ignore rule instead of having to add one.

### D-C. The manifest is the cleanup authority

`BOOTSTRAP-MANIFEST.json` records per entry: `path`, `source` (canonical path + delivery channel), `checksum`, `ownership` (`bootstrap-created` | `pre-existing-modified` | `pre-existing-untouched`), `mode` (`symlink` | `copy` | `appended-block` | `real-file`), `intended-permanent-replacement`, `cleanup-status`, and `final-disposition`. **`pointer-file` is removed from the enumeration** — a pointer file is never a discovery entry (D-D), so a schema that can record one as an entry mode is a schema that can record the claim. Alongside the entries it carries the run-level `source` block of D-S and the selected-client record of D-T.

`ownership` is what prevents cleanup from touching a file the repository already had. `intended-permanent-replacement` is what makes the *verify-replacement-before-removal* ordering enforceable: removing a bootstrap entry whose replacement is missing is FAIL, not cleanup. `mode` is what lets a Windows copy fallback be removed correctly instead of being unlinked.

*Alternative rejected:* pattern-based cleanup (`rm -rf .specboot/bootstrap` plus known adapter paths). It cannot distinguish a bootstrap-created path from a pre-existing one, which is precisely the distinction that makes de-bootstrap safe.

**The container is removed by name, as a last act.** The manifest enumerates payload *entries*; it never enumerates the `.specboot/bootstrap/` directory holding them. An implementation that acts strictly on entries therefore leaves the container present but empty, failing the `.specboot/bootstrap/ is absent` acceptance criterion — a way to follow the inventory rule correctly and still produce a failing end state. Entries stay the **exclusive** authority for identifying removable *content*; the container is a separate final act, permitted only after every entry has reached a terminal `cleanup-status` and `final-disposition` and the container has been verified to hold nothing else.

**A non-empty container is FAIL, not a licence to recurse.** Anything remaining after the manifest is fully processed is by definition unrecorded, which is exactly the pre-existing content `ownership` exists to protect. The step stops for reconciliation rather than deleting what the manifest never described.

This is not a re-admission of the rejected alternative. `rm -rf .specboot/bootstrap` as a *first* act cannot distinguish bootstrap-created from pre-existing content; removing a **verified-empty** directory as a *last* act distinguishes nothing because nothing is left to distinguish. The durable `.specboot/adoption/` sibling is never in scope for this removal.

**In source-linked mode the entry set is smaller, and the authority rule is unchanged.** The only entries are the project-local temporary discovery entries — the client's skill link and its instruction-file block — plus the machine-local source-path store. There is no payload and no container, so those two obligations are recorded `SKIPPED — source-linked mode`, and the entries that do exist are dispositioned by exactly the same rules. **The external canonical source is never a manifest entry.** It was not created by the bootstrap, it is not owned by the project, and nothing in the inventory can therefore authorize touching it — which is what makes "never modify the source" enforceable by the same mechanism that already prevents cleanup from deleting a pre-existing project file, rather than by a separate promise.

**`ADOPT-18`'s written procedure and its executable behavior are one thing, and this decision is the single statement of it.** The de-bootstrap step is where a design that is only *described* diverges from one that is *run*, so the four rules below bind both the phase file and the implementation, with no clause that holds in one and not the other:

1. **Replacement before removal, always.** Every entry carrying an `intended-permanent-replacement` has that replacement verified to exist *and resolve* before the transient entry is removed. An unresolved replacement is **FAIL** and the entry is left in place — a removal that outruns its replacement leaves the repository worse than not running the step at all, and `ADOPT-13`'s skip-on-exist rule then makes the gap permanent.
2. **Terminal dispositions are mandatory and are written back.** Every entry ends at a terminal `cleanup-status` *and* `final-disposition`, written back into the committed manifest. An entry left `pending` is FAIL, not a partial PASS, and the obligations a mode does not exercise are recorded `SKIPPED — source-linked mode` rather than left blank or inferred as passed.
3. **Refusal beats guessing, in both directions.** Unrecorded content in scope for removal is a refusal (the non-empty container rule above); so is an unresolved replacement. Neither is resolved by the step making a choice — both stop for human reconciliation.
4. **A refused run is resumable and leaves no half-state.** Because the manifest is committed and every disposition is written back as it is reached, a step that refuses partway names exactly which entries are terminal and which are not, and a different session or operator can resume it.

### D-Y. Capability completeness gates de-bootstrap, and `ADOPT-18`'s mandatory re-validation is scoped to what actually changed

A completed pilot run (informal, not this change's Group 21 — a separate adoption exercised deliberately against this branch's committed guide, `9f08281`, to measure session-context cost) reached `ADOPT-19` `BLOCKED`: `ai-specs/specboot-instructions.md` and `08-daily-workflow.md` name six required workflow capabilities — `enrich-us`, `propose`, `apply`, `specboot-verify`, `adversarial-review`, `archive` — and state that `specboot-verify`'s canonical logic lives at `ai-specs/skills/specboot-verify/SKILL.md`. That skill, and `adversarial-review`, do not exist anywhere in `packages/specboot/template/ai-specs/skills/`, confirmed against `ADOPT-11`'s own delivered inventory (`code-auditing`, `commit`, `enrich-us`, `explain`, `meta-prompt`, `update-docs`, `using-git-worktrees`, `writing-skills` — eight skills, missing two of the six named capabilities). **This is not evidence about the pilot's target repository; it is a defect in the template this change's own `ADOPT-03` imports**, so it recurs identically for every future adoption, including this change's still-unexecuted Group 21 pilot — task `21.7` requires the `ADOPT-19` pilot to pass through the full six-capability workflow, and it cannot while two of the six do not exist to be invoked.

**The gap survived `ADOPT-00`–`ADOPT-18` because nothing before `ADOPT-19` invokes `specboot-verify` or `adversarial-review`.** `ADOPT-11`/`ADOPT-12` validate that the skills present are correctly stack-adapted; they do not validate that the skills *required* are *present*. Presence and adaptation are different properties, and only the second was checked.

**Correction, in two parts:**

1. **`packages/specboot/template/ai-specs/skills/` gains real `specboot-verify` and `adversarial-review` skills**, imported by `ADOPT-03` exactly like `enrich-us` — closing the template defect at its source rather than papering over it downstream.
2. **`ADOPT-11`/`ADOPT-12` gain a completeness check**, distinct from the existing stack-adaptation check: cross-validate the imported skill inventory against the six capabilities `ai-specs/specboot-instructions.md` names. A missing mandatory capability is a step `FAIL`, not a silent pass, and — because the whole point of catching this early is that `ADOPT-18` removes the only project-local pointer back to the canonical source (`.specboot/local/canonical-source-path`) that could otherwise self-repair it — **completeness becomes an additional precondition of `ADOPT-18`**, not only of `ADOPT-19`. De-bootstrap must not remove the self-repair path while a mandatory capability is still missing.

**`ADOPT-18`'s existing mandatory re-validation is also narrowed, on the same evidence.** `10-debootstrap.md` currently requires a *second, full* fresh-session `ADOPT-15` after de-bootstrap, unconditionally — closing a full client session and opening a genuinely new one, with a human relay, to prove nothing the temporary bootstrap entries provisioned was still needed. The pilot's own session-cost finding (context above roughly 150K tokens consuming most of a five-hour session) makes that unconditional second run the single most expensive step in the guide, run twice per selected client. What actually changes at de-bootstrap is narrow and known in advance: exactly the manifest's `bootstrap-created` entries (the temporary `specboot-adopt` discovery symlink and the `SPECBOOT-BOOTSTRAP` block), neither of which was ever part of the *permanent* discovery surface `ADOPT-13` provisions. **The full fresh-session `ADOPT-15` re-run is required only when `ADOPT-18`'s disposition touched anything beyond the manifest's exact `bootstrap-created` entries; otherwise `ADOPT-14`'s filesystem re-check is sufficient substitute evidence, explicitly recorded as such** — `ADOPT-14` and `ADOPT-15` remain distinct properties (filesystem presence is not discovery, per `ADOPT-00`'s own validation text), so this narrows *when* the expensive check is mandatory, not *what* it proves when it runs.

*Alternative rejected:* leave the second `ADOPT-15` unconditional, always. It is the safer default in isolation, but it prices every de-bootstrap at the cost of the guide's single most expensive step regardless of whether anything discoverable actually changed — exactly the kind of ceremony this revision's other corrections (D-Z) exist to stop charging for.

*Alternative rejected:* reconstruct the two missing skills locally, inside a repository already mid-adoption, as the pilot's operator was offered and declined. Recorded in that pilot's own decision log: the completed adoption itself failed to provision two capabilities its own workflow requires, so the correction belongs in the canonical recipe (here), not as a local workaround downstream of the defect.

### D-D. Bootstrap discovery uses the symlink shape each client already uses

Claude reaches the skill via `.claude/skills/specboot-adopt` → relative symlink into the transient payload, with the guide pointer in `.claude/CLAUDE.md` as a real file carrying a marked bootstrap block. The root `CLAUDE.md` is never touched — this repository already proves a client-scoped instruction file coexists with the canonical root symlink. Kiro mirrors the confirmed `.kiro/skills/*` convention.

Codex's project-scoped mechanism is a **candidate only**. `writing-skills` documents just `~/.agents/skills/` (personal, outside repository scope), which is exactly why the project-scoped form must be verified rather than inferred. It is gated behind official-documentation discovery → isolated scratch repository → fresh-session execution test, and stays `PENDING EVIDENCE` or `unavailable` until all three pass.

Where symlink creation fails (Windows without privilege), portability must never be achieved by silently degrading to a copy later mistaken for canonical content.

**In source-linked mode the answer to an unavailable symlink is to fail closed, not to substitute a file.** An earlier form of this decision produced a real "pointer file" naming the external path and recorded it `mode: pointer-file`, as though that satisfied discovery. It does not. **Discovery is a property of the client, not of the filesystem**: a client that surfaces a skill through a symlinked directory does not surface it through a text file that happens to contain a path. Calling that entry a discovery mechanism records a PASS for a capability nobody observed — which is the same defect as recording presence on disk as discovery, arrived at from the other side.

So where the selected client cannot natively discover the external skill without a symlink, the run **stops before provisioning** and reports the capability limitation: which client, which mechanism, and what was attempted. It is a clean refusal with zero writes (D-X), not a degraded success. A pointer file may still be written as **operator-facing context** where it helps a human, but it is never recorded as a discovery entry, never satisfies the discovery gate, and never lets the run continue as though discovery were provisioned.

*Alternative rejected:* treating the pointer file as a discovery entry and letting the fresh-session probe decide. The probe is exactly the expensive, human-in-the-loop step this refusal saves; failing at provisioning time reports the real constraint while nothing has been written yet.

**The shape is a symlink, and the target is the external canonical guide and skill.** Register it in the manifest, remove it at `ADOPT-18`. The transient-payload link target belongs to the deferred packaged-snapshot mode (D-W) and is not provisioned by this change.

**Source-linked discovery entries are machine-local and are never committed.** They name an absolute path that exists on one machine, so they are excluded from every checkpoint's staged scope and are ignored for the life of the adoption; `ADOPT-18` removes them, or byte-restores the file it appended to. A checkpoint that stages one is a FAIL, not a cosmetic problem: it would commit a path no other machine can resolve, into a repository whose whole point is that the contract lives elsewhere.

### D-X. One preflight decides everything before the first write, and provisioning is all-or-nothing

`ADOPT-00` has a human-approval gate before its first write, and the gate names the paths the run intends to create. That is necessary and it was not sufficient: the gate presented an *intention*, while collisions were discovered *during* provisioning, one path at a time. A run that hits its second collision after writing its first entry has already produced the state nobody approved — a discovery entry with no manifest, or a manifest with no run log — and skip-on-exist (the ambient failure mode this whole design is built against) makes exactly that state look like a success in the record.

So the write phase is preceded by a **complete preflight**, and the two properties below are what make the approval gate mean what it says:

**1. Every collision is detected before any of them is reported.** The preflight resolves every target path the selected client's recipe and the durable state will occupy — discovery entries, instruction-file blocks, `.specboot/adoption/`, the ignore rules, the machine-local store — and classifies each as *absent*, *pre-existing-untouched*, or *colliding*. It reports **all** of them at once. Discovering collisions incrementally means the operator approves a mutation set that the run already knows is incomplete.

**2. The approval gate presents the exact mutation inventory, and the run performs exactly that.** Each path, what will be created or modified, by what mechanism (symlink, appended block, new file), and whether the operation is reversible. Nothing outside the approved inventory is written. A path that turns out to need a different mechanism than the one approved is a new gate, not an adjustment — this is the same rule the contract already applies to approvals generally: an approval is scoped to the named mutation only.

**3. A failure leaves no partial state.** If provisioning fails after it has started, the run restores the target repository to its pre-provisioning state: no orphaned discovery entry, no orphaned `BOOTSTRAP-MANIFEST.json`, no orphaned run log, no orphaned ignore rule, no orphaned machine-local store. The end state of a failed bootstrap is a repository that was never bootstrapped, which is also the only end state a retry can start from safely.

This is the same guarantee D-R already gives for an invalid source — *stop with zero target-repository writes* — extended from the validation phase to the provisioning phase. Having it hold in one phase and not the other was the gap: the run refused cleanly when the *source* was wrong and wrote a half-state when the *target* was.

*Alternative rejected:* fail-forward with a documented cleanup procedure. It converts every failed bootstrap into a manual reconciliation task, in a repository whose operator has by definition never run this workflow before — and the artifact that would drive that reconciliation is the manifest, which is one of the things that may not have been written.

### D-Z. Human approval is mechanical wherever a per-step deterministic check already exists

The same pilot recorded roughly 39 human questions across one adoption run. Classified against its own evidence: ~27 were pure checkpoint ceremony (commit/push/inventory approvals on already-validated, unchanged content), 2 were process defects presented as questions (wrong-repository detection, fresh-session handoff) rather than automatic behavior, 1 was a duplicate (client selection asked twice), and 9 were decisions that genuinely require human authority. **The 27 are the direct cost of a gap between what this change already requires and what it automates**: `D-X` already requires every write to be preceded by a complete preflight and an *exact* mutation inventory; the checkpoint protocol (`D-L`) already requires *the exact staged file list* before every commit approval. Both already produce, as a side effect of doing their job correctly, everything a mechanical comparison needs — but the protocol still asks a human to read and re-approve that comparison every single time, even when the comparison could only ever come out one way.

**This decision generalizes `D-X`'s per-write exact-inventory principle from `ADOPT-00`'s bootstrap to every step, and adds a standing-authorization layer on top of it — never below the evidence discipline `D-X` and the checkpoint protocol already require, only above the question of whether a human has to re-approve evidence that already unambiguously resolves.**

**1. `Allowed modifications` becomes a ninth field of the step contract**, alongside Condition / Purpose / Preconditions / Action / Approval gate / Validation / Evidence to record / On failure (`00-conventions.md`). It is authored by whoever maintains the canonical guide, **in advance of any run** — never derived live by the executing agent, which would let the same execution both write and grade its own allowlist. Two shapes, chosen by whether the step's output is deterministic:

   - **Closed, exact path list**, for steps whose output the guide's author can enumerate without knowing anything about the adopting repository: `ADOPT-02` (`openspec init`'s fixed generated set), `ADOPT-03` (the pinned import), `ADOPT-05` (`codegraph install`'s fixed generated set), `ADOPT-06` (the fixed six `docs/*.md` targets). `ADOPT-00` already has the right shape to generalize from — `bootstrap-kit/discovery/<client>.md`'s `## Entries` table is exactly this, pre-written per client, already the thing an executing run reads rather than invents.
   - **Closed rule, not a list**, for steps whose exact output path depends on repository content discovered at runtime: `ADOPT-09` ("at most one new file matching `ai-specs/agents/*.md`; never `docs/`, `src/`, or another client's adapters"), `ADOPT-13` (symlinks named only from the already-validated `ADOPT-09`–`ADOPT-12` selection).

   A known stale entry in `bootstrap-kit/discovery/claude.md`'s `## Entries` table — `.claude/skills/specboot-adopt` still points at `../../.specboot/bootstrap/skills/specboot-adopt`, the deferred packaged-snapshot container path this change's own `D-R`/`D-W` never create — is corrected in the same pass this decision lands, since that table now becomes the literal source the mechanical check reads rather than an illustrative example.

**2a. The live instance is created at `ADOPT-00`, not left to whichever step first needs it.** The tenth revision defined the template and the mechanism that reads a run's instance, but never specified where or when a live adoption creates one — a gap invisible in planning and caught only by a genuinely fresh session's first real run reaching the checkpoint after `ADOPT-00`'s own provisioning with no such file to consult. `.specboot/adoption/ADOPTION-AUTHORIZATION.md` is created from the template as part of `ADOPT-00`'s own provisioning (added to its mutation inventory, alongside the durable manifest and run log it already creates), with the client-selection section filled from that same step's own client-selection outcome. **The standing commit-and-push authorization is requested in the same human-approval gate `ADOPT-00` already presents for its exact mutation inventory — one additional line in an existing gate, not a second question.** The remaining sections — the declared team environment matrix, the OpenSpec version policy, the code-graph capability's default privilege scope — are filled **progressively**, by updating this same file when `ADOPT-05B`, `ADOPT-02`, and `ADOPT-05` respectively are reached; no later step creates a second file.

**2. `ADOPTION-AUTHORIZATION.md` — one file per adoption run, never one per `ADOPT-nn` step.** A per-step file was considered and rejected: it would duplicate the canonical `Allowed modifications` field this decision already places in the phase file, and a duplicated canonical artifact drifting from its source is exactly the failure `D-A` and `D-L` already exist to prevent, one level down. The single file records what the human granted for *this* run: selected client(s); the declared team environment matrix (D-T's autodiscovery precedent extended: scan `.github/workflows/*.yml` `runs-on:` values, `mvnw.cmd`/`gradlew.bat` presence, Dockerfile, devcontainer.json, and CONTRIBUTING/README platform mentions, and present a derived-with-evidence matrix for confirm-or-correct rather than a blank question — absence of evidence is never read as absence of a platform, so the question stays human when nothing is found); and the standing commit-and-push authorization.

**3. The checkpoint protocol's two approval gates (`D-L` steps 3 and 8, today unconditional `[HUMAN APPROVAL REQUIRED]`) become conditional**: `staged_files ⊆ Allowed modifications(step)`, **and** `ADOPTION-AUTHORIZATION.md` grants a standing authorization whose conditions still hold (fast-forward push only, remote-impact unchanged from the `ADOPT-00` baseline assessment, no force push, no PR, no deploy, no destructive Git operation) → auto-approve, log the evidence, no live question. **Any staged path outside the step's declared `Allowed modifications` is not a question — it is `FAIL_CLOSED`**, reported as the specific unexpected path, because an out-of-scope file in the stage is evidence something went wrong, not a decision waiting on a human. The Checkpoint ledger (`D-L`'s evidence table, in the run-log template) gains an `Allowlist match (YES / NO + anomalies)` column so this comparison is itself recorded evidence, not a silent gate.

**4. The same mechanical-evidence principle closes `ADOPT-06`'s content-approval gate**, by a different route: `ADOPT-06`'s existing "Validation" section already runs structural comparisons (documented stack vs. `pom.xml`, package layout vs. `find src`, API fields vs. controller fields) to reach its own `PASS`. Extended to a **citation-check** — every factual claim in the generated docs, *including* narrative sections like "Known Risks and Defects," must resolve to a verifiable code citation (file:line, type, annotation) via the selected code-graph capability, not only structural facts — the same pilot's two real corrections (`ADOPT-06/1`, `ADOPT-06/2`) turn out to have been either fully derivable this way (a `LocalDateTime` field wrongly documented with an OpenAPI `date-time`/timezone claim; an `@ExceptionHandler(Exception.class)` method whose parameter type is narrower than its annotation, exactly the class of defect the selected code-graph capability already surfaces independently) or a fixed authoring convention with no project-specific judgment in it at all (documenting an online-first Maven default for a first clone). The convention is encoded once, in the canonical prompt, by whoever maintains the guide — never asked per adoption run. **This does not weaken `ADOPT-06`'s existing rule that the step documents known code defects and never resolves them** — `docs/backend-standards.md`'s own "Known Risks and Defects" section is exactly what the citation-check verifies *against*, not a target it corrects; the citation-check confirms an accurate description of a real defect, it does not authorize fixing the defect it describes.

**5. Two structurally identical step pairs are grouped for the same reason `D-F` already groups `ADOPT-09`/`ADOPT-10` and `ADOPT-11`/`ADOPT-12`.** `06-adapters-and-discovery.md` (`ADOPT-13`/`ADOPT-14`) and `04-context-and-openspec.md` (`ADOPT-07`/`ADOPT-08`) are the same "adapt, then read-only re-verify" shape `D-F` already names as a guide-documented executed pair — the phase files simply never said so for these two, an inconsistency rather than a deliberate distinction. This corrects the phase-file text under the existing `D-F` rule; it adds no new grouping policy.

**9. Advancing from one step to the next after a checkpoint reaches PASS is likewise never a decision to present to the operator — a gap part 8 closed for fresh-session handoffs specifically, generalized here to every ordinary step-to-step transition (fourteenth revision).** `00-conventions.md`'s checkpoint protocol already ends "record the checkpoint ledger entry and **advance**" — advancing was already the documented instruction, not a question. A live pilot's fresh session nonetheless stopped after `ADOPT-00` reached PASS to ask "continue into `ADOPT-01` now, or pause here?", with no named approval gate behind the question — `ADOPT-01`'s own gate exists specifically for the moment it actually installs or upgrades software, and an unbacked pause *before* even reaching that step duplicates it a step early while adding a stop the contract never asked for. The operational cost is not frequency: an unprompted stop with no backing gate can sit for as long as the operator is away from the session — the same coffee-break-scale cost the fresh-session handoff design already accounts for, reached here through a different door. `00-conventions.md` gains an explicit negative alongside its existing "and advance" instruction: this is not a decision to present to the operator, and a stop between steps not backed by that next step's own named approval gate is not part of this contract.

*Alternative rejected:* automate the literal act of opening the `ADOPT-15` fresh session (D-D, D-V) whenever the contract determines one is required. Considered and rejected: the fresh session's *freshness* is the evidence being tested, and a self-triggered subagent spawned from within the current, already-briefed session cannot produce that evidence without biasing the exact discovery test it exists to validate — the pilot's own decision log records this exact choice already being made correctly (a "blank subagent" path offered and declined in favor of a genuinely separate session). What this decision *does* automate is everything around that human action: recognizing the contract requires it with no "continue or hand off?" branch (`D-V` already specifies the session stops and hands off unconditionally — the pilot's friction here was a runtime deviation from `D-V`'s already-written text, not a gap in it, corrected by tightening `09-bootstrap.md`'s and the skill's wording rather than by a new decision), generating the exact handoff prompt, and committing/pushing the `PENDING` state.

*Alternative rejected:* a machine-readable decision catalog as a fourth working-set file, consulted before every question. Rejected on the same working-set-boundary grounds as `D-H`: a file outside the bounded three-file set either forces a fourth file open at every step or invites the rule to be restated per phase, which is how contracts drift. The classification already belongs, field by field, to the phase file that already sits in the working set (`Allowed modifications`) and to `00-conventions.md` (the checkpoint protocol), which already does.

**6. `ADOPT-02`, `ADOPT-05`, and `ADOPT-13` gain the same conditional treatment, closing a gap the tenth revision's own reasoning named but did not implement.** The tenth revision added policy fields to `ADOPTION-AUTHORIZATION.md` for the OpenSpec version and the code-graph capability's default privilege scope, and established that `ADOPT-13`'s exposure plan is fully derivable from `ADOPT-09`–`ADOPT-12`'s already-validated evidence — but never wired any of the three steps' own approval gates to consult that policy or evidence. These are distinct from the checkpoint protocol's commit/push gates the tenth revision's generic mechanism already covers: each of these three carries its own step-level gate.

   - `ADOPT-02`: where an already-installed OpenSpec version already supports the documented keys this guide requires (`ADOPT-01`'s own criterion), skip the install/upgrade command and its gate entirely — nothing is being installed or upgraded, so the high-risk software-installation approval rule (`19-permissions-policy.md`) never triggers. Where the installed version does not meet that bar, or none is installed, the install/upgrade command and its `[HUMAN APPROVAL REQUIRED]` gate remain exactly as they are today. This narrows *when* the rule's trigger condition is reached; it does not weaken the rule itself.
   - `ADOPT-05`: where the operator's `codegraph install` choices exactly match the step's own documented least-privilege defaults (project scope, automatic allow = No) and `ADOPTION-AUTHORIZATION.md`'s privilege-scope policy, the configuration gate auto-approves — the generated files remain fully diff-reviewable, only the live question is removed for the case where nothing deviates from what was already declared safe in advance. Any deviation toward broader scope requires the live gate exactly as today.
   - `ADOPT-13`: where the adapter plan exposes exactly the agents and skills `ADOPT-09`–`ADOPT-12` already validated — no different selection, nothing not already in that evidence — the gate auto-approves, since nothing new is being decided; the plan is still presented as evidence in the run log, just not as a live question. A plan that differs from that evidence requires the live gate exactly as today.

**7. A target repository that is the canonical source's own working directory fails closed before anything else runs — corrected in the twelfth revision to compare filesystem location only, never Git identity.** The pilot's own recorded defect: a run's first attempt resolved the SpecBoot source/development repository itself rather than the intended adoption target, caught only because the operator noticed. `ADOPTION-LAUNCHER.template.md` gains a check *before* its existing four-artifact validation, not after: the repository this session is rooted at must not be the same **filesystem location** — compared by resolved, symlink-free path, not a literal string — as the candidate `<SPECBOOT_SOURCE>`. A match stops the run immediately with zero writes.

   **The eleventh revision's original wording additionally compared Git identity — the same common Git directory, root commit, and origin — and that clause is removed here, not narrowed.** A real fresh-session run against this project exposed why: `/Users/landaeta/repos/specboot` (the canonical source) and every `app-prices-rest-specboot-*` adoption target are **linked worktrees of the same underlying repository** — `/Users/landaeta/repos/specboot/.git` is a worktree pointer file, not a directory, and every worktree in the set shares the same `--git-common-dir`, root commit, and `origin`. Under the eleventh revision's wording, every legitimate pairing in this project's own actual working setup was indistinguishable from genuine self-adoption, and the check failed closed on all of them — a systematic false positive, not an edge case.

   **Two worktrees of the same repository are not a self-reference, because each has its own independent working tree.** The operational risk this check exists to prevent is writing bootstrap artifacts into the exact files being read as the source — that risk is fully captured by filesystem location alone. Shared Git history, shared object storage, and a shared remote say nothing about whether two paths' *working trees* collide; only the resolved path does. Comparing Git identity therefore adds no protection beyond what the path comparison already provides, and it actively breaks the canonical worktree-based source pattern this very project uses. *Alternative rejected (again, on stronger evidence than the eleventh revision had):* keep the Git-identity comparison as a secondary signal, treated as a warning rather than a stop. A signal that fires on every legitimate case in this project's own topology is not a usable warning — it is noise that trains the operator to dismiss it, which is worse than not having it.

**8. The fresh-session handoff is tightened from an instruction an executing run could still treat as optional into one it cannot.** `09-bootstrap.md`'s step 9 already states the handoff as an instruction, not a question — the pilot's own recorded friction shows an executing run presenting "continue in this session, or hand off?" as a live decision anyway. Since `D-V` already establishes that native discovery can only be evidenced by a session that started after the discovery entries existed, there was never a valid "continue" branch. The wording gains an explicit negative — this is not a decision to present to the operator — applied identically to `ADOPT-18`'s equivalent re-validation requirement and to the skill's own reference material, so the same closed instruction reads the same way everywhere a fresh-session handoff is required.

**10. Every step needing the resolved canonical source path reuses the same machine-local store `ADOPT-00` already wrote — it is never re-derived, re-scanned for, or re-asked (fifteenth revision).** `ADOPT-03`'s `Action` uses `<SPECBOOT_SOURCE>` as a bare placeholder in its `cp -rn` command without stating where that value comes from — a real live pilot run reached this step and, with no cross-reference to follow, presented the operator with two *candidate* directories to choose between, **neither of which was the actual already-established source**: one was the development worktree (mixed with unrelated application files, never the canonical source), the other was `packages/specboot/template/` — the deferred packaged-snapshot mode's own payload path (`D-W`), not what source-linked mode reads at all. The correct value was sitting, already resolved and validated, in `.specboot/local/canonical-source-path`, exactly where `ADOPT-00` left it (`D-S`) — `ADOPT-03` simply never said to look there. `01-prerequisites-and-install.md` gains an explicit statement, ahead of `ADOPT-03`'s `cp -rn` command: `<SPECBOOT_SOURCE>` is the same canonical source `ADOPT-00` already resolved and validated; read it from the machine-local store, never re-derive it from a fresh scan and never re-ask the operator for it. A grep of every phase file confirms `<SPECBOOT_SOURCE>` is referenced only here, so this is the only step needing the correction — not a pattern spread across the guide.

*Alternative rejected, for all four of 6-9 (now composing with part 10 as a fifth instance of the same underlying principle):* leave these as documented rules and trust execution-time judgment to apply them correctly. Already tried, in the tenth revision's own text for parts 6 and 8 — stating the reasoning in `design.md` without a corresponding task or a tightened instruction in the phase file is exactly what let the gap survive one revision uncorrected.

### D-E. Amend the contract inside this change rather than have the skill exceed it

Two requirements contradict the contract as written. The only resolution that preserves a single authority is to change the contract deliberately, here:

- `02-codegraph.md`'s decision node → a mandatory capability-selection step. The capability is required; the product is a choice; no usable capability is FAIL with no waiver path. The file stops being conditional and its `SKIPPED` path is removed.
- `00-conventions.md` §Scope boundaries → push moves inside the contract behind its own gate, preceded by a remote-impact assessment, subordinate to company policy. `ADOPT-17` is amended to reuse the shared protocol defined by D-L rather than to define push behavior itself.

*Alternative rejected:* letting the skill push while the guide forbids it. That creates a second, contradicting authority — the failure mode this design exists to prevent.

Both amendments are **forward-applying**: repositories adopted earlier are recorded as pre-amendment, never retroactively failed.

### D-F. Checkpoint = smallest independently validated step

A phase file is a documentation boundary, not a validation boundary; treating it as a checkpoint would batch independently verifiable work into one reviewable unit and delay the evidence. Grouping is a recorded exception with a structural justification each time (no independently observable end state; unsafe/unreviewable intermediate state; or a guide-documented executed pair such as `ADOPT-09`/`ADOPT-10`). "Fewer commits" is not a justification.

Two distinct gates per checkpoint — commit and push — because they have different blast radii. A commit is local and revertible; a push is outward-facing and may trigger automation that cannot be recalled. Collapsing them into one approval would let a reviewer who assessed a diff implicitly authorize an unassessed remote effect.

### D-L. The checkpoint protocol is defined once in `00-conventions.md`, and `ADOPT-17` reuses it

A checkpoint occurs after **every** independently validated step or justified group, but `ADOPT-17` — the final adoption checkpoint — carries the precondition `ADOPT-16 = PASS`. Attaching the reusable protocol to `ADOPT-17` would therefore make every earlier checkpoint depend on a baseline run that has not happened yet: the precondition would be either violated or silently reinterpreted, and neither is acceptable in a contract whose whole discipline is that preconditions mean what they say.

The protocol therefore lives in `00-conventions.md` as a named, reusable procedure, and every checkpoint invokes it. `ADOPT-17` keeps its precondition, keeps its position after `ADOPT-16`, and keeps its role as the final checkpoint *of the adoption itself* — it simply invokes the shared procedure instead of defining one.

"Final checkpoint of the adoption" is not "last checkpoint of the workflow", and the artifacts say so explicitly because the difference is easy to misread. `ADOPT-18` commits the updated manifest and `ADOPT-19` is an independently validated step, so both form their own checkpoints under the same protocol. Reading `ADOPT-17` as the last checkpoint would leave the de-bootstrap and pilot commits ungated — precisely the outcome the two-gate model exists to prevent.

`00-conventions.md` is the correct home for a structural reason, not a filing-convenience one: it is one of the three files in the bounded per-step working set, always already loaded. A protocol placed in any phase file would sit **outside** the working set of every step in every other phase, so invoking it would either force a fourth file open — breaking the working-set rule this design is otherwise careful to honour (D-H) — or invite each phase to restate it locally, which is how contracts drift.

`references/checkpoint-protocol.md` in the skill accordingly changes role: it explains how the orchestrator *drives* the protocol and records ledger evidence, and points at the canonical definition. It does not restate the normative steps. A skill that restated them would become the second authority this design exists to prevent — the same defect as D-A's duplicated canonical content, in procedural form.

*Alternative rejected:* a new dedicated phase file for the protocol. It would be outside the working set for the same reason as any other phase file, and would add a fourth file to every checkpoint.

Unchanged by this placement: the two separate approvals, the remote-impact assessment between them, exact staging with no unconditional `git add -A`, the fresh independent review after any correction, the improvement-proposal step, and the checkpoint-ledger evidence.

### D-M. Installer tests are black-box CLI tests on `node:test`, with no new dependencies

`packages/specboot/bin/init.js` becomes executable logic worth testing the moment it gains a subcommand, payload assembly, and drift detection. The package currently has no test infrastructure, no `scripts`, and no dependencies of any kind.

Node's built-in `node:test` and `node:assert` (available on the declared `engines.node >= 18`, and on this machine's v24) give a runner with **zero** new dependencies — only a `scripts.test` entry, which is not a dependency.

The tests are **black-box**: they invoke the CLI as a child process against temporary fixture directories and assert on the resulting filesystem. This matters because `init.js` computes `target` from `process.argv[2]` at module load, so it has no importable surface today; black-box invocation tests the actual binary contract without restructuring executable code this change has no other reason to restructure. Packaged-file inclusion is asserted from `npm pack --dry-run --json`, which needs nothing beyond the npm already present.

*Alternative rejected:* refactoring `init.js` to export its internals for unit testing. It would enable finer assertions but changes the shape of the file under test as part of the same change, and the behaviors that must be proven — subcommand routing, unchanged default invocation, ignore provisioning, packaged files — are all observable from outside.

### D-O. Installer tests are order-independent, and no test repairs state for another

A first implementation attempt produced a suite that passed only on a **second** invocation. The defect is worth recording precisely, because the failure mode is subtle and the suite still looked green:

`bootstrap-payload/` is assembled by `prepack` and is git-ignored, so it does not exist in a clean checkout and goes stale the moment any canonical file is edited. The drift-check test therefore failed on the first `npm test` after a canonical edit — **correctly**, since the payload genuinely had drifted. Later in the same run, the `npm pack --dry-run` test invoked `prepack` as a side effect, which re-assembled the payload and repaired the state. The next invocation passed.

That is a green suite that proves nothing: its result depended on run order, on a *different* test's side effect, and on being run twice.

**The contract this design now imposes:**

1. **Every installer test is independently repeatable and order-independent.** Running any single test in isolation gives the same verdict as running it inside the suite.
2. **The suite passes on its first invocation** from a clean checkout (no `bootstrap-payload/` at all) *and* from an intentionally stale assembled-payload state.
3. **Any test needing an assembled payload assembles it explicitly in its own setup**, via a deterministic fixture step — never by relying on `prepack` having run, and never by relying on another test.
4. **The `npm pack` test does not repair state on behalf of anything else.** It runs with lifecycle scripts suppressed (`--ignore-scripts`) over an explicitly pre-assembled payload, so it asserts packaging and nothing more.
5. **The drift-detection test is not weakened by any of this.** It still assembles a known-good payload, mutates one file, and requires a non-zero exit. Determinism means it starts from a *known* state, not a forgiving one — a test that cannot distinguish "drifted" from "never assembled" was never testing drift.

*Alternative rejected:* a global setup hook that assembles once for the whole suite. It fixes first-run failure but leaves tests coupled to shared mutable state, so a test that mutates the payload (which the drift test must) still leaks into its neighbours. Per-test fixture setup is what makes isolation real.

*Alternative rejected:* committing `bootstrap-payload/`. It would make the state stable, at the cost of the second checked-in copy of every canonical artifact that D-A exists to prevent.

**RED must reproduce the defect first.** Before the correction, the campaign records an actual failing first invocation from a stale payload state, and the pass-on-second-run behaviour — otherwise the fix is unverified. GREEN then records a first-run pass, a repeated pass, exact counts, and zero skipped or weakened assertions.

### D-N. `ADOPT-20` is a separate gate step, not a clause inside the pilot

The pull-request block could have been written as a sentence inside `ADOPT-19`, but a gate that lives inside the step it gates is a gate that can be skipped along with it. `ADOPT-20` is therefore its own step whose entire job is to verify the recorded PASS evidence for `ADOPT-00`…`ADOPT-19` individually and declare readiness — the only step authorized to do so.

This also gives the block a testable surface: an empty evidence block for any step blocks readiness, which is the same rule the resume protocol already applies (an empty evidence block means "not known to have completed"). A gate that judged whether adoption "looks complete" would be exactly the inferred-PASS defect the contract forbids everywhere else.

### D-G. New phase files take the next free numbers: `09`, `10`, `11`

Existing numbering is already non-contiguous (`00`–`08`, `19`, `22`) and step IDs are stable identities independent of file position, so creation order is the least surprising choice and `09`/`10`/`11` are free. Renumbering existing files is excluded — it would break the permanent section-number back-compatibility map. *(OQ-8, recommended default; repository evidence confirms the numbers are available.)*

### D-H. The orchestrator sits outside the three-file working set

The skill body is part of the executing agent's context, not a member of the step's working set; its `references/` load on demand only. This keeps the per-step cost at one phase file while letting the orchestrator exist at all. Stated explicitly in `00-conventions.md` so it is a rule rather than an interpretation. *(OQ-3, recommended default.)*

### D-I. Drift check is enforcing for the kit, warn-only for the pre-existing template

Repository evidence *strengthens* this default: the drift spans three skills and at least five files, not the single `enrich-us/SKILL.md` originally recorded. Fixing them here would silently alter unrelated skills inside a change about adoption orchestration. The check therefore enforces on the kit payload it owns, and warns on the pre-existing template, which a separate change repairs. *(OQ-9, recommended default.)*

### D-J. Windows is intended-but-unvalidated; Codex is gated

No Windows host is available (`Darwin 22.6.0`). Every Windows/PowerShell row **for a selected client** is therefore `PENDING EVIDENCE` with its reason, and the change may claim Windows-*intended* support only. Asserting validated Windows portability without a Windows run would be exactly the inferred-PASS defect the contract forbids. *(OQ-11, recommended default, confirmed by direct evidence.)*

Under D-Q this is an OS-axis statement, not a client-axis one. A client that was never selected produces no rows at all — neither PASS nor `PENDING EVIDENCE` — because `PENDING EVIDENCE` is a claim about something someone chose to support. Codex's gate is the **Codex recipe's** instance of the canonical selected-client gate, not a special case in the process.

### D-K. Accepted improvement proposals batch into one follow-up change

Proposals accumulate across checkpoints, so one batching follow-up change avoids a proliferation of single-edit changes while keeping every edit inside the normal OpenSpec workflow. FR-10 forbids silent application either way. *(OQ-12, recommended default.)* D-U states where that batch lands now that the guide is no longer inside the adopting project.

### D-U. Improvements flow to the canonical source, never to a project-local copy

D-K settled that accepted proposals batch into one governed follow-up change. Once the guide lives outside the project, the remaining question is *which repository that change edits*, and there is only one defensible answer: the **canonical SpecBoot source**.

- Findings are recorded in the **project's** run log, as evidence of what that adoption observed.
- The project **never edits a guide, phase file, or troubleshooting entry**. In source-linked mode it holds no copy to edit at all, which is the whole reason the rule is enforceable rather than merely stated.
- Accepted proposals are applied **later, in one governed batch, to the canonical source**, through the normal OpenSpec workflow there.
- That batch is **not** consumed by the run that raised it. D-S already forbids a running adoption from picking up post-checksum changes, and this is the case it most obviously covers: an adoption must not improve its own instructions mid-execution and then report success against instructions nobody approved.

*Alternative rejected:* letting a project edit its local copy and pushing the diff upstream afterwards. Every adopting project becomes a divergent fork in the window before the diff lands, and the diff is against a copy rather than against the canonical source.

### D-Q. Two layers: a client-agnostic canonical process, and a per-client recipe

The adoption *process* and the *client* executing it are separable, and this change previously
conflated them: Codex carried a bespoke verification gate while the portability requirement read as
"client-neutral across Claude, Kiro, and Codex", which together imply every adoption must configure
and validate all three. That is wrong in both directions — it forces work for clients nobody
selected, and it makes an unselected client's absence look like missing evidence.

**Layer 1 — canonical orchestration, identical for every adoption and every client:** adoption-step
order; **canonical-source resolution and delivery-mode selection (D-R, D-S)**; **client selection,
including the read-only autodiscovery route (D-T)**; the run-log and evidence contract; `PASS` /
`FAIL` / `PENDING EVIDENCE` / `NOT SELECTED` semantics; human-approval gates; the checkpoint,
commit, push, bootstrap, de-bootstrap, pilot, and improvement-recording rules; the mandatory
code-graph capability; and the fresh-session discovery-and-execution evidence contract. Nothing in
this layer names a client.

**Layer 2 — the selected client's recipe, the only client-dependent surface:** the
project-instruction discovery path; the skill exposure mechanism; the permission-file format and its
reconciliation; native capability invocation; the fresh-session procedure; observable
model/reasoning evidence; the client's read-only autodiscovery probes; and client-specific bootstrap
and de-bootstrap operations, including how the source-linked discovery entry is created and
removed, and how the recipe reports that its client cannot discover an external skill without
symlinks (D-D).

Source selection and client selection are Layer 1 for the same reason: both are decisions *about*
the adoption rather than actions *within* a client. A recipe that chose its own source, or selected
itself, would be a client deciding the terms of its own configuration.

The human **declares the selected client at `ADOPT-00`**. The orchestrator then executes the same
canonical process, substituting that client's recipe wherever the process reaches a client-dependent
action. Selection is declared, never inferred from a directory on disk.

**`NOT SELECTED` is a first-class status, distinct from `PENDING EVIDENCE`.** `PENDING EVIDENCE`
means *supported, but this run could not exercise it* — a claim about a client someone chose.
`NOT SELECTED` means *nobody chose it*, so nothing is provisioned, nothing is validated, and nothing
is owed. Collapsing the two would make every adoption permanently incomplete for the clients it
never intended to use.

| Client state | Effect on the adoption |
|---|---|
| `SELECTED` + `PASS` | the client gate is satisfied |
| `SELECTED` + `PENDING EVIDENCE` | **blocks** that adoption |
| `SELECTED` + `FAIL` | **blocks** that adoption |
| `NOT SELECTED` | no artifacts provisioned or validated; **never blocks** |

**A PASS proves support for the client that produced it, and for no other.** Recipes are kept
separately for Claude, Kiro, and Codex so that a validated Claude adoption is exactly that — not
evidence of universal multi-client support. The Codex work already done (official-documentation
discovery, isolated scratch repository, and the pending fresh-session test) is retained as the
**Codex recipe's evidence**, and stops being the definition of the general gate.

**Codex is a deferred client-specific obligation, and it neither blocks nor unblocks the Claude-only
pilot.** This is the direct consequence of the two-layer split, and it needs stating because the
status table above is easy to misread in this case. Codex is `PENDING EVIDENCE` — its fresh-session
discovery-and-execution test has not been observed, and the absence of a `codex` CLI from `PATH` is
not evidence the client is unavailable. But the table's "`SELECTED` + `PENDING EVIDENCE` blocks the
adoption" row is about the adoption *that selected it*. The pilot selects **Claude only**, so Codex
is `NOT SELECTED` for that run: nothing provisioned, nothing validated, nothing owed, nothing
blocked.

The two statuses therefore coexist without contradiction, on different axes:

- **As a client of the pilot run**, Codex is `NOT SELECTED`. It cannot block a run that never chose it.
- **As a recipe this change ships**, Codex is `PENDING EVIDENCE`. That is a standing obligation on any
  *future* adoption that selects it, discharged when the gate is run — not a debt the Claude pilot
  can pay and not a reason the Claude pilot cannot finish.

So the obligation is **recorded and carried forward, never converted to PASS and never quietly
dropped**. Recording it as PASS would claim evidence nobody produced; treating it as a blocker on a
run that did not select Codex would make this change impossible to complete for a reason unrelated
to what it delivers. No artifact may report Codex as supported, and none may report the Claude
pilot as blocked by it.

### D-T. Client selection precedes client-specific configuration, and autodiscovery never authorizes it

Selection comes first, and it comes from a human. Two routes reach it:

1. **Manual** — the human names the clients.
2. **Autodiscovery** — the orchestrator runs a **read-only** probe, **displays** what it found, and **waits**. The human then selects from the findings, or names something else entirely.

**Autodiscovery is not authorization, and the ordering is what makes that true.** The probe writes nothing — no directory, no file, no permission entry, no discovery link — and it runs *before* any client-specific configuration exists to be justified by it. A found client is a **candidate**; a selected client is the only kind that gets configured. Everything not selected is `NOT SELECTED` under D-Q: nothing provisioned, nothing validated, nothing owed.

This closes a gap D-Q left open by implication. D-Q established that selection is declared and never inferred from a directory on disk, which reads as though scanning the disk were itself forbidden. It is not — scanning is useful, and an operator who wants to be shown their options should get them. **Acting on the scan** is what is forbidden, and separating the read from the decision is what keeps a convenience feature from quietly becoming consent.

**An explicit, supported selection is a precondition of *every* bootstrap write, and its absence fails closed.** Selection-before-configuration is only half a rule if a run can reach a write with no selection at all. Two refusals close it, both before the first write and both leaving the target repository byte-for-byte unchanged:

- **No client selected → refuse.** Not "provision nothing and continue", and above all not a placeholder value written into the committed manifest. A recorded selection of `undeclared` is worse than a refusal: it is a durable, committed claim that a human made a choice, and every later step that reads the manifest inherits it.
- **A client selected that has no recipe → refuse, naming what is supported.** An unknown client cannot be provisioned, and guessing the nearest supported one substitutes the orchestrator's judgment for the declaration D-T exists to require.

Both refusals precede the preflight of D-X, since there is nothing to preflight until the run knows whose recipe it is applying.

*Alternative rejected:* auto-selecting every discovered client, with the human declining the ones they do not want. It inverts the default that matters: the cost of an unnoticed omission is a prompt, and the cost of an unnoticed configuration is an artifact in a repository nobody asked for.

*Alternative rejected:* defaulting to the single supported client when only one recipe exists. It is convenient exactly once, and it makes the manifest's selection record indistinguishable from a real declaration on the day a second recipe lands.

### D-V. One governed entry mechanism: a short pasted launcher that loads the canonical entry prompt

An adoption today starts from whatever the operator types. That is the defect: an incomplete opening prompt produces a run that stalls at the first unstated decision — which source, which mode, which clients, which gate — and the operator repairs it with a corrective patch. Each patch is an unrecorded, unreviewed instruction that no artifact governs, and two operators starting the same adoption get different runs.

The fix is a single canonical entry prompt, `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`, **parameterized rather than specific**: it asks its questions at run time instead of carrying answers. It assumes only that it is invoked from the target repository.

**The canonical entry prompt is not the thing a human pastes.** The first form of this decision made the entry prompt itself the operator's opening message, which made the *transport* of the procedure the operator's problem: roughly 1,850 words re-pasted by hand into every new client session. That is a transcription mechanism, and transcription mechanisms fail in ways the contract cannot see — a truncated paste, a stale copy kept in someone's notes, a paragraph dropped because a chat box scrolled. None of those produce a visible error; they produce a run executing an entry prompt nobody can diff against the canonical one. **The entry prompt has to be *loaded* from the validated source, not retyped into the chat.**

So the mechanism is two files with strictly separated jobs, and it is **one** mechanism rather than a prompt plus corrective patches:

| | `ADOPTION-LAUNCHER.template.md` | `ADOPTION-ENTRY-PROMPT.md` |
|---|---|---|
| role | the **sole** artifact a human pastes | the canonical full cold-start procedure |
| length | short — a validation gate and one instruction | complete; unchanged by this amendment |
| how it reaches the session | copied into a new client session by the operator | **read from the validated source**, in full |
| parameters | exactly one: `<SPECBOOT_SOURCE>` | asks its questions at run time as before |
| procedure | **none** — it defines no adoption step | the parameters and gates, as D-V already required |

**The launcher does not inherit the source's trust; it establishes it.** An operator-supplied path is a *candidate*, and the launcher's whole reason to exist is that "the human typed this path" is not evidence the path holds SpecBoot. Blindly reading orchestration instructions out of an arbitrary directory is the failure this gate prevents, so before the launcher loads any instruction and before anything in the target repository is written, it verifies **read-only** that four artifacts are present in the candidate:

1. `SPECBOOT_ADOPTION_GUIDE.md`
2. `specboot-adoption/`
3. a **readable** `ai-specs/skills/specboot-adopt/SKILL.md`
4. a **readable** `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`

The fourth is new to this list and is what the amendment turns on: the launcher's next act is to read that file, so a source that cannot produce it is not a source the launcher can hand off to. The first three are D-R's existing validation set, unchanged — the launcher performs the same check earlier rather than a different one, which is why this is one gate moved forward, not a second gate competing with `ADOPT-00`'s.

**Failure is a stop with zero target-repository writes.** The launcher validates before it loads and before it writes, so a candidate that fails has produced nothing to clean up. It reports which artifacts were missing or unreadable and stops.

**Success is followed by exactly one instruction: read `ADOPTION-ENTRY-PROMPT.md` completely, and follow it exactly.** Not summarize it, not skim it for the next action, not begin adopting and consult it as questions arise. The complete file is loaded before any adoption action, because a partially read procedure is the same defect as a partially pasted one, arrived at from the other side.

**The launcher restates nothing.** It carries no adoption procedure, no client-selection procedure, no checkpoint protocol, and no `ADOPT` step. This is D-A and D-L applied to the one file that is most tempting to duplicate into: it is the file operators copy, so anything written in it is the version that spreads. It also states — without defining — that no target-repository write is permitted before the approval gate **the loaded entry file defines**, which is a pointer to an authority rather than a second statement of it.

**The runtime path lives in the chat and nowhere else.** `<SPECBOOT_SOURCE>` is filled in when the operator pastes the launcher, so the filled-in text exists in that session's transcript. It is never committed to the target repository — the same rule D-R and D-S already impose on every other artifact, applied to the one artifact that necessarily carries a real path at the moment it is used. The template itself, as committed, carries the placeholder and never a machine-specific value.

**Client-neutral plain text.** The launcher is pasted into whichever client the operator is using, at a moment when nothing has been installed. It therefore uses no Claude-specific `@` syntax, no slash commands, no OpenSpec commands, and assumes no pre-installed skill — the same cold-start discipline the entry prompt already follows, applied to the artifact that now runs first.

*Alternative rejected:* keeping the full paste and asking operators to be careful. Care is not a mechanism, and the failure is silent.

*Alternative rejected:* a launcher that also carries a condensed version of the procedure "in case the source is unreachable". A condensed procedure is a second authority that drifts, and an unreachable source is exactly the case the zero-write refusal already answers correctly.

*Alternative rejected:* a launcher that loads `SKILL.md` directly and skips the entry prompt. The entry prompt carries the parameters and gates the skill deliberately does not; skipping it would move that content into either the launcher or the skill, and both are places D-V and D-A already refused to put it.

**The tension this decision resolves.** The prompt has to be complete enough that no corrective patch is ever needed, and it must not become the second authority D-A and D-L exist to prevent. Those pull in opposite directions only if completeness is read as *procedural* completeness. It is not:

- **The prompt is complete in its *parameters and gates*** — every runtime input it needs (canonical source path, client-selection route, selected clients, pilot task), every approval gate the operator will meet, and every handoff it will generate.
- **The prompt is silent on *procedure*.** It does not restate an `ADOPT` step contract, the checkpoint protocol, the manifest semantics, or the de-bootstrap ordering. It **invokes** the `specboot-adopt` skill and names the canonical rules by reference, so the guide remains the only statement of what the steps are.

A prompt that restated the guide would drift from it exactly as a duplicated canonical artifact does, and would be worse: it would drift silently, because nobody diffs a prompt against a contract.

**The operating model the prompt makes explicit:** one short pasted launcher and the one canonical entry prompt it loads; expected human responses at explicit approval gates; fresh-session handoff prompts **generated by the run** rather than composed by the operator; deterministic resume from the durable run log; and no improvised corrective prompt patches. Stating the model inside the prompt is what lets an operator recognize a patch as a defect rather than as normal use — an adoption that needed one has found a gap in the launcher or the prompt, and that gap is an improvement proposal under D-U, not a habit.

**The cold-start contract: neither file may assume the state the adoption exists to create.** At the moment the **launcher** is pasted, the target repository has **no SpecBoot files, no OpenSpec installation, no `/opsx:*` commands, no discoverable `specboot-adopt` skill, and no `.specboot/` directory**. Every one of those is an *output* of the adoption, so none may be a precondition of starting it. The earlier statement of this decision said the prompt "invokes the `specboot-adopt` skill", which reads as a skill invocation and is therefore wrong at the only moment the mechanism is ever used. Three corrections follow, and they now bind the launcher first and the entry prompt after it:

1. **Both files are ordinary prompt text.** The launcher is pasted and run as-is, and the entry prompt is read and followed as-is — neither is a slash command or a skill invocation, and neither requires command infrastructure, an installed package, or prior configuration in the target repository.
2. **"Invokes the skill" means a direct read.** The initial session obtains the orchestration procedure by reading the *validated canonical* `ai-specs/skills/specboot-adopt/SKILL.md` at a **source-relative path** under the resolved source. This is a deliberate direct read and **explicitly not native skill discovery**; neither file assumes `specboot-adopt` is installed in, or discoverable from, the target repository. Because the initial session reads that file, source validation has to reach the file itself: under D-R a `specboot-adopt/` directory with no readable `SKILL.md` is an invalid source, not a technicality.
3. **Validation precedes loading as well as writing, and the launcher is where it now happens.** The launcher takes the candidate source, validates the guide, the `specboot-adoption/` phase directory, that `SKILL.md`, and the entry prompt itself, **before** it loads any orchestration instruction and before the first target-repository write. An invalid or absent source stops the run with **zero target-repository writes** — there is nothing to clean up because nothing was created. The entry prompt inherits an already-validated source rather than re-asking for one, and its own statement of the validation set remains the canonical definition the launcher is checked against.

**Where the initial session ends.** The initial session is bounded by design rather than by exhaustion. It resolves and validates the source, reaches client selection (manual, or read-only autodiscovery that displays candidates and authorizes nothing), presents the **exact project mutations** at a human-approval gate, and only then provisions the temporary discovery entries and the durable state — `BOOTSTRAP-MANIFEST.json` and the adoption run log. At that point it **stops** and generates the exact fresh-session handoff prompt. It cannot usefully continue: the thing it has just provisioned is client discovery, and discovery can only be evidenced by a session that started after it existed. **Native skill discovery is therefore attempted only in that fresh session**, which is also where `ADOPT-00`'s discovery probe is answered.

**The OpenSpec embargo.** No OpenSpec command and no `/opsx:*` command is used at any point before the documented installation step (`ADOPT-02`) has completed and OpenSpec availability has **explicitly passed** its documented check. OpenSpec is installed *by* the adoption; a prompt reaching for it earlier would be depending on its own output. Absence of OpenSpec at cold start is the expected state, never a blocker.

**Resume across the handoff.** The fresh session is a resume, not a restart: it reads the durable manifest and run log, re-verifies **source identity by checksum** (D-S), and **blocks on drift** rather than continuing against instructions nobody approved. The run's identity lives in that durable state, not in the prompt text — which is what lets the entry prompt stay parameterized and free of machine-specific paths while still surviving a session boundary.

**One mode, one sequence.** The prompt describes **source-linked adoption only** (D-R, D-W). It asks for the canonical source, not for a delivery mode: there is no second mode to choose between, and offering one the change does not deliver would be the most consequential possible place to advertise an unimplemented path — the prompt is the first thing an operator ever reads. Where no source is supplied or the supplied one fails validation, the prompt directs a **clean refusal with zero target-repository writes** and says so plainly, rather than routing to a fallback. When packaged-snapshot returns under D-W it brings its own distribution story, and the prompt gains its question then.

**The mechanism has to be executable from a virgin repository, end to end, and that is verified rather than assumed.** Being "complete in its parameters and gates" is a property of the entry prompt as *text*; being executable is a property of the mechanism as *run*. The seven-step spine below is what an operator can actually perform in a repository with no tooling, starting from the pasted launcher, and each step is a thing the launcher or the entry prompt must state well enough to be followed without a corrective patch:

1. **Launcher validation and handoff** — the pasted launcher takes the candidate `<SPECBOOT_SOURCE>`, verifies read-only that the guide, the phase directory, a readable `SKILL.md`, and a readable `ADOPTION-ENTRY-PROMPT.md` are all present, refuses with zero writes on failure, and otherwise reads the entry prompt **completely** before any adoption action is taken.
2. **Direct read of `SKILL.md`** — obtain the procedure by reading the validated file at a source-relative path, recorded as a direct read and never as discovery.
3. **Explicit client selection** — manual, or read-only autodiscovery followed by a human choice; a missing or unsupported selection refuses with zero writes (D-T).
4. **Preflight and exact-mutation approval** — every collision detected first, the complete inventory presented, the run stopping for approval (D-X).
5. **Provisioning** — exactly the approved inventory, all-or-nothing; a failure restores the pre-provisioning state.
6. **Stop and hand off** — the initial session ends and generates the exact fresh-session prompt.
7. **Fresh-session discovery and resume** — native discovery attempted for the first time, resuming from the durable manifest and run log with identity verified by checksum.

A gap at any one of those steps is a corrective patch waiting to happen, which is the defect this decision exists to remove.

**Placeholders, never laboratory paths.** Neither file embeds an absolute path, a machine-specific location, or a pilot-specific value. Under D-R the source is runtime input; a file carrying one operator's path would hard-code into the most-copied artifacts in the kit precisely what every other artifact is forbidden to record. The launcher template is now the most-copied of the two, and it holds the `<SPECBOOT_SOURCE>` placeholder as committed — the real path exists only in the filled-in copy the operator pastes into a session.

*Alternative rejected:* per-client or per-mode entry prompts. Four prompts drift in four directions, and the choice between them would itself have to be made before the prompt that explains the choice is read. One parameterized prompt asks instead.

*Alternative rejected:* leaving the entry prompt as operator tribal knowledge, documented in the README. It is already tribal knowledge, and the corrective-patch problem is the evidence that documentation of it does not survive contact with a real run.

## Risks / Trade-offs

- **A bootstrap real file permanently blocks a canonical symlink** (the `cp -rn` / `createSymlink` / `ADOPT-13` skip-on-exist trap) → Bootstrap prefers symlinks at every canonical path; any unavoidable real file is registered with an `intended-permanent-replacement`, and `ADOPT-18` verifies the replacement resolves *before* removing the entry. A dedicated `22-troubleshooting.md` entry covers the collision.
- **Amending the guide inside this change makes it non-backward-neutral** → Both amendments apply forward only; already-adopted repositories are recorded as pre-amendment. Stated explicitly in the compatibility section rather than left for a reader to infer.
- **Codex may have no usable project-scoped mechanism at all** → It is behind a verification gate from the start, never assumed; the change proposes and implements without it, and Codex simply stays `unavailable`. A Codex row with no evidence is not a passing row.
- **Windows portability may be wrong in ways only a Windows run reveals** → Claimed as intended, not validated; every unexercised combination is `PENDING EVIDENCE`, following the `ADOPT-05B` precedent exactly.
- **Push inside the contract widens the blast radius of an agent-driven workflow** → Two separate approvals, an evidence-based remote-impact assessment between them, current-branch-only pushes, no force push, no credential configuration, and unknown impact blocking the push. "No CI configuration found" is a finding, not a licence.
- **De-bootstrap could delete something the repository needs** → It acts only on manifest entries, never on patterns; `pre-existing-untouched` entries are never touched; deletion sits behind a `[HUMAN APPROVAL REQUIRED]` gate; and `ADOPT-14`/`ADOPT-15` re-validate afterwards to prove nothing still needed was removed.
- **The entry prompt becomes a second authority** → It carries parameters and gates, never procedure: it invokes the skill and names canonical rules by reference, and a dedicated verification task checks it against `ADOPT-00`, `ADOPT-18`, the manifest schema, the selected-client gate, and the drift rules rather than trusting it to agree with them.
- **The entry prompt drifts from the contract it invokes** → It is verified for consistency at implementation and exercised by the pilot through the launcher, where any corrective patch or additional procedural instruction the operator had to improvise is recorded as a FAIL and raised as an improvement proposal, not quietly typed and forgotten.
- **The entry prompt assumes the end state it exists to create** → Found in review of D-V's own wording: "invokes the `specboot-adopt` skill" describes a repository that has already been adopted, while the prompt only ever runs in one that has not — no SpecBoot, no OpenSpec, no `/opsx:*`, no discoverable skill, no `.specboot/`. Corrected in D-V: ordinary prompt text; a source-relative direct read of the *validated* canonical `SKILL.md` instead of discovery; validation before loading and before the first write; a zero-write stop on an invalid source; native discovery deferred to the handed-off fresh session; and no OpenSpec or `/opsx:*` use before `ADOPT-02` passes its availability check.
- **A laboratory path leaks into the most-copied file in the kit** → The launcher template and the prompt use placeholders and runtime questions only, and a mechanical grep for absolute paths is part of their acceptance. The launcher is filled in at paste time, so the real path lives in the session transcript and is verified to reach no committed artifact.
- **The operator pastes ~1,850 words of canonical procedure by hand** → The launcher replaces the paste with a load: the human copies a short template carrying one parameter, and the canonical entry prompt is read in full from the validated source. A truncated or stale paste cannot silently become the procedure a run executes, because the run no longer gets its procedure from the chat box (D-V).
- **The launcher executes instructions from an arbitrary path** → The supplied path is a *candidate*, not a trusted source. The launcher's read-only four-artifact check runs before any instruction is loaded and before any target-repository write, and a failure stops with zero writes — so a wrong or hostile path yields a refusal rather than an execution (D-V).
- **The launcher grows into a second procedure** → It carries no adoption step, no client-selection procedure, and no checkpoint protocol, and states the pre-approval-gate write prohibition by reference to the loaded entry file rather than by defining it. A verification task greps it for duplicated procedure, because the file operators copy is the file whose drift spreads fastest (D-A, D-L, D-V).
- **The skill drifts into restating the guide** → `SKILL.md` is capped under 500 words with heavy detail in on-demand `references/`, and the REFACTOR pass tests specifically for duplicated step content.
- **`sync-agent-symlinks` currently mirrors `.claude` + `.cursor`, where `.cursor/` does not exist here and `.kiro/` does** → Its mirror list becomes the repository's selected clients, so `ADOPT-18`'s reconciliation has a maintenance counterpart for the life of the repository.
- **A one-checkpoint-per-step model produces many commits** → Accepted deliberately: reviewable units and prompt evidence are worth more than a tidy history, and justified grouping remains available for genuine structural pairs.
- **A reusable protocol in `00-conventions.md` grows the file every step already loads** → Kept to a single named procedure that steps invoke by name, rather than inlined guidance; the alternative (restating it per phase) costs more in both tokens and drift.
- **A test suite can be green for the wrong reason** → Discovered in practice, not hypothetically: the first installer suite passed only on a second run, because one test's side effect repaired another test's precondition (D-O). Mitigated by per-test fixture assembly, `--ignore-scripts` on the pack test, and GREEN evidence that records a **first-run** pass from both a clean checkout and a deliberately stale payload.
- **The external canonical source could be modified by an adoption** → It is never a manifest entry (D-C), so no inventory-driven operation can reach it; the improvement path writes to the project run log only (D-U); and the source-linked de-bootstrap and portability checks assert the source is byte-identical before and after a full run.
- **The canonical source changes underneath a running adoption** → Identity is checksums, not a path (D-S). A mismatch on resume is drift and stops the run for human reconciliation, rather than the adoption silently switching to instructions nobody approved mid-execution.
- **A source-linked discovery entry gets committed** → It names an absolute path that resolves on exactly one machine. Such entries are excluded from every checkpoint's staged scope and ignored for the life of the adoption, `ADOPT-18` removes or byte-restores them, and staging one is a FAIL rather than a cosmetic slip (D-D).
- **Resume is attempted from a different machine** → No path is recorded in the committed manifest, so there is no original path that could be required. The orchestrator obtains a local source — from the machine-local `.specboot/local/` store where one exists on this machine, otherwise by asking the operator or rediscovering it — and accepts it only when the recorded guide and skill checksums match, plus the Git commit where one was recorded (D-S). An absent machine-local store is the ordinary cross-machine case, never a failure.
- **Two modes double the surface that can rot** → Resolved by narrowing rather than by bounding: this change ships **one** mode. Packaged-snapshot is deferred whole to `add-specboot-packaged-snapshot-delivery` (D-W) with its historical evidence intact, and the CLI fails closed rather than exposing it.
- **A deferred mode becomes an abandoned mode** → D-W names the follow-up change and enumerates its required scope — entry-prompt distribution, read-only bootstrap planning, explicit client selection, real discovery entries, non-null payload identity, verified resume, a symlink-less answer of its own, and cold-start evidence — so what was deferred is recoverable rather than reconstructed from memory.
- **A partially implemented mode stays reachable in the CLI** → The refusal is the countermeasure and it is tested: a missing source, a missing client, and an unknown client each fail closed with zero target-repository writes, which is a stronger property than any of them being documented as unsupported.
- **The pilot validates superseded instructions** → The pilot's canonical source must be Git-backed and byte-match the final committed guide, phase files, and skill (D-W). The Git-backed worktree that now exists is pinned to the committed base implementation and predates the launcher, so the requirement to advance and reverify it before the pilot is recorded rather than left to be discovered mid-run.
- **Provenance overstates what Git knows** → A dirty working tree records `unavailable` with its reason rather than a HEAD that does not identify the linked content, with the observed HEAD retained as labelled context only; identity stays with the checksums, which are computed over the bytes actually read (D-S).
- **A pointer file is mistaken for discovery** → It never satisfies the discovery gate. Where the selected client cannot natively discover the external skill without a symlink, the run fails closed before provisioning and reports the capability limitation (D-D).
- **Autodiscovery becomes a de-facto selection** → The probe is read-only and precedes configuration, findings are displayed rather than acted on, and a test asserts the fixture tree is byte-for-byte unchanged after autodiscovery and before human selection.
- **Black-box installer tests could pass while internals are subtly wrong** → Accepted: the assertions cover the externally observable contract that the specs actually constrain (subcommand routing, unchanged default behavior, per-path ignore provisioning, `.specboot/adoption/` never ignored, packaged files). Finer unit assertions remain available later if `init.js` is refactored for export on its own merits.

- **Standing authorization auto-approves a checkpoint the operator would have caught** → It cannot: auto-approval requires the staged set to already be a subset of the step's pre-authored `Allowed modifications`, so the check that would have caught an operator's objection (an unexpected path) is exactly what still fires; only a checkpoint whose content could never have differed from what was authorized skips the live question (D-Z).
- **A step's `Allowed modifications` is written too loosely and silently widens what auto-approves** → It is authored by the guide maintainer, in advance, through this change's own review — the same governance every other canonical artifact goes through — never derived by an executing run; a loose allowlist is a review defect in the canonical source, not a runtime one, and is caught the same way any other canonical-artifact defect is (D-A's duplicated-content guard, applied here to over-broad scope instead of duplicated content).
- **`ADOPT-06`'s citation-check misses a narrative claim a human would have caught** → Bounded, not eliminated: the check requires every claim resolve to a code citation via the selected code-graph capability, which is exactly the mechanism that already independently reproduced the pilot's `HttpErrorHandler` finding twice (once pre-, once post-de-bootstrap); a claim with no resolvable citation fails the check rather than passing silently, so the gate narrows rather than removes what a human would review (D-Z).
- **Narrowing `ADOPT-18`'s mandatory second `ADOPT-15` weakens the very re-validation it exists to provide** → Bounded by what changed, not skipped: the full fresh-session check remains mandatory whenever de-bootstrap's disposition touches anything beyond the manifest's exact `bootstrap-created` entries, and those entries were never part of the permanent discovery surface `ADOPT-13` provisions in the first place — the narrowed case is exactly the one where `ADOPT-14`'s filesystem re-check already has strong coverage (D-Y).

## Migration Plan

1. Land the new skill, kit, phase files, and contract amendments together — the amendments are what make the skill's behavior legal, so shipping them separately would leave a window where the skill contradicts the guide.
2. Extend the run-log template and manifest schema before the first real run, since the run log is the resume source and a mid-run schema change would strand an in-flight adoption.
3. Land **source-linked only**, with the CLI failing closed when no canonical source is supplied. Packaged-snapshot's existing implementation and its pinning regression are retired from the active surface and carried, with their evidence, into `add-specboot-packaged-snapshot-delivery` (D-W); nothing about source-linked's stricter preconditions depends on a fallback existing.
4. Existing adoptions need no migration: `ADOPT-00` and `ADOPT-18` are additive, and a repository with no `BOOTSTRAP-MANIFEST.json` records `ADOPT-18` as `SKIPPED — no bootstrap performed`. A manifest produced by an earlier packaged-snapshot run is read as history for the deferred mode and is not re-interpreted; absence of a `source` block is not drift.
5. Rollback is per checkpoint: each is an independently revertible commit, and the manifest allows a partially applied bootstrap to be restored entry by entry.

## Open Questions

None blocking. OQ-3, OQ-8, OQ-9, OQ-11, and OQ-12 are resolved above (D-H, D-G, D-I, D-J, D-K) at their recommended defaults; repository evidence confirmed rather than displaced each one, and strengthened the case for D-I and D-J. The Codex mechanism (§9.6 of the work item) is an implementation gate with a defined pass/fail procedure, not a deferred decision.
