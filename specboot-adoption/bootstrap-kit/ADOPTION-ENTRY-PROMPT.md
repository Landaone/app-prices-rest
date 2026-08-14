# SpecBoot Adoption — Canonical Entry Prompt

**This file is the prompt.** Paste everything below the line into a session opened on the
repository you want to adopt SpecBoot into. It is the **sole initial prompt**: nothing else is
typed to start an adoption, and no corrective patch should be needed to keep one going.

It is **parameterized** — it asks for what it needs at run time and carries no answers. Do not
edit it to insert your source path, your client, or your task. If you found yourself wanting to,
that is a gap in the prompt: record it as an improvement proposal.

---

You are starting a **SpecBoot adoption** in the repository this session is rooted at. Follow this
prompt exactly. Ask the questions it tells you to ask, stop where it tells you to stop, and take
your procedure from the canonical skill rather than from memory.

## 0. Cold start — assume this repository has none of it

At this moment, the target repository has:

- **no SpecBoot files** — no adoption guide, no phase files, no run-log template;
- **no OpenSpec** installation and no `openspec` command;
- **no `/opsx:*` commands** and no other SpecBoot command infrastructure;
- **no discoverable `specboot-adopt` skill**;
- **no `.specboot/` directory** of any kind.

Every one of those is an **output** of the adoption, so none of them may be a precondition of
starting it. Their absence is the expected cold-start state, not a blocker and not an error to
report.

Three consequences bind everything below:

1. **This prompt is ordinary prompt text.** It runs as-is. It is not a slash command, not a skill
   invocation, and it requires no command infrastructure, no installed package, and no pre-existing
   configuration in the target repository.
2. **Never assume `specboot-adopt` is installed or discoverable here.** It is not. You will read it
   from the canonical source, by path, as described in §2.
3. **Do not reach for any tool the adoption has not installed yet.** See the embargo in §6.

## 1. The seven steps you will perform

This is the whole shape of this session, in order. Nothing here says *how* a step is performed —
that comes from the canonical skill and the guide. It says what happens, and where you stop.

| # | Step | Ends in |
|---|---|---|
| 1 | Ask for the canonical source; validate it | a validated source, or a refusal with zero writes |
| 2 | Read the validated `SKILL.md` directly, by source-relative path | the orchestration procedure, in context |
| 3 | Obtain an explicit, supported client selection | a named selection, or a refusal with zero writes |
| 4 | Run the preflight; present the exact mutation inventory | **[HUMAN APPROVAL REQUIRED]** |
| 5 | Provision exactly the approved inventory | discovery entries + durable state, or a clean restore |
| 6 | Stop, and generate the fresh-session handoff prompt | this session ends here |
| 7 | *(fresh session)* Resume, verify identity, discover natively | the discovery probe's evidence |

## 2. Step 1 — ask for the canonical source, and validate before you load or write

Ask this first, and wait for a real answer. Do not guess, and do not infer it from what you can see
on disk.

| # | Question | Notes |
|---|---|---|
| Q1 | **Canonical source path** — where is the local canonical SpecBoot source this adoption will link to? | Referred to below as `<SPECBOOT_SOURCE>`. Never invent, guess, or reuse a path from another run. |

> **There is no delivery-mode question.** This adoption links to a canonical source and copies
> nothing. A validated source is a **precondition of the run, not a branch within it** — see §7.

Then, in this order. The ordering is the contract, not a suggestion.

1. **Validate the canonical source.** Confirm all three exist inside `<SPECBOOT_SOURCE>`:
   - `SPECBOOT_ADOPTION_GUIDE.md`
   - `specboot-adoption/` (the phase directory)
   - `ai-specs/skills/specboot-adopt/SKILL.md` — a **readable file**, not merely a present
     directory
2. **Only then, read the orchestration procedure** (step 2 of §1). Read the validated
   `<SPECBOOT_SOURCE>/ai-specs/skills/specboot-adopt/SKILL.md` **directly, by that source-relative
   path**.

   > **This is a direct read, not native skill discovery.** Say so when you record it. Nothing in
   > this repository can discover that skill yet — making it discoverable is work the adoption has
   > not done. Do not describe this read as discovery, do not record it as discovery evidence, and
   > do not let it stand in for the fresh-session discovery probe in §8.

   Load the skill's `references/` only as the procedure calls for them.
3. **Only then, consider writing anything** — and even then, only after the approval gate in §4.

**If no source is supplied, or validation fails**, stop. See §7 — this is a refusal, not a fallback.

## 3. Step 3 — an explicit, supported client selection

Ask these, and wait for real answers.

| # | Question | Notes |
|---|---|---|
| Q2 | **Client-selection route** — do you want to name the clients yourself, or should I run a read-only autodiscovery probe and show you candidates first? | Both routes are available. Autodiscovery is optional and never required. |
| Q3 | **Selected clients** — which clients do you want provisioned? | Explicit selection, always from the human. Everything unselected is recorded `NOT SELECTED`. |

Reach the selection by whichever route Q2 chose:

- **Manual** — the human names the clients. Nothing else is needed.
- **Autodiscovery** — run the **read-only** probe, **display** the candidates, and **wait**. The
  probe writes nothing: no directory, no file, no permission entry, no discovery link. A finding is
  a candidate, never a selection and never authorization to configure anything. Finding nothing is
  also not authorization to proceed with no client — ask.

**An explicit, supported selection is required before any write.** If none is named, or a named
client has no recipe, stop — see §7. Never infer a selection from a `.claude/` or `.kiro/`
directory that happens to be on disk, never substitute the client you think most likely, and never
record a placeholder such as `undeclared`: a committed placeholder is a durable claim that a human
made a choice they did not make.

Provision only the clients explicitly selected. Record every other supported client
`NOT SELECTED` — never `PENDING EVIDENCE`, which would assert intended support nobody claimed.

Keep the canonical orchestration client-agnostic: the step order, evidence rules, gates and status
semantics name no client. Consult the **selected client's recipe** for the client-dependent actions
only.

Later, at the pilot step, you will also ask for **Q4 — the real project task** to exercise
end-to-end. Do not ask for it now; it is not needed to start.

## 4. Step 4 — preflight everything, then one gate on the exact mutations

**Preflight before you present anything.** Resolve **every** target path the selected client's
recipe and the durable state will occupy — discovery entries, instruction-file blocks,
`.specboot/adoption/`, the ignore rules, the machine-local source-path store — and classify each as
*absent*, *pre-existing and untouched*, or *colliding*.

Report **all** collisions together. Do not discover them one failed write at a time: presenting a
mutation set you already know is incomplete asks the human to approve something that will not
happen.

**Then the gate.** Present the **exact mutation inventory** — for every path: whether it will be
created or modified, by what mechanism, and whether the operation is reversible. Then stop.

> **[HUMAN APPROVAL REQUIRED]** — nothing is written until the human approves this exact set.

Autodiscovery findings do not shortcut this. They authorize nothing on their own: the gate is still
owed after an explicit human selection exists.

After approval, perform **exactly that inventory and nothing outside it**. If a path turns out to
need a different mechanism than the one approved, that is a **new gate**, not an adjustment.

## 5. Step 5 — provision all-or-nothing; step 6 — stop and hand off

Provision:

- the selected clients' **temporary** discovery entries, and
- the **durable** state: the bootstrap manifest and the adoption run log, initialized and validated
  against the canonical schema and template.

**If provisioning fails partway, restore the pre-provisioning state.** Leave no partial discovery
entry, no partial manifest, no partial run log, no orphaned ignore rule, and no orphaned
machine-local store. The end state of a failed bootstrap is a repository that was never
bootstrapped — which is also the only state a retry can safely start from.

Then **stop.**

Do not continue into the adoption steps from this session. What you have just provisioned *is*
client discovery, and discovery can only be evidenced by a session that started **after** it
existed. This session cannot produce that evidence no matter how carefully it tries.

Generate the **exact prompt** for the operator to run in a genuinely fresh session — complete,
copy-pasteable, and carrying no instruction the fresh session cannot resolve from the durable state
it will read. Do not leave the operator to compose it, and never simulate, assume, or claim a fresh
session you did not observe.

**The handoff prompt carries no source path.** The run's identity travels in durable state as
checksums — never as a path written into the prompt text, and never as a path in the committed
manifest, which records none. Writing one into the handoff would put a machine-specific value into
the one artifact most likely to be pasted somewhere else.

## 6. The OpenSpec embargo

**Use no OpenSpec command and no `/opsx:*` command** until both of these are true:

1. the documented installation step (`ADOPT-02`) has **completed**, and
2. OpenSpec availability has **explicitly passed** its documented check.

OpenSpec is installed *by* this adoption. Reaching for it earlier means depending on your own
output. Until that check passes, OpenSpec's absence is the expected state — never a blocker, never
an error, and never a reason to stop.

## 7. The four refusals

Each of these is a **clean stop, never a degraded success**. In every case: report what is listed,
and leave the target repository **byte-for-byte unchanged** — no `.specboot/` directory, no
discovery entry, no manifest, no run log, no ignore rule. There is nothing to clean up because
nothing was created.

None of the four is resolved by you choosing on the operator's behalf.

| # | When | Report |
|---|---|---|
| R1 | **No canonical source** was supplied | that a validated canonical source is required, and the three artifacts it must contain |
| R2 | The supplied source **fails validation** | which of the three artifacts is missing or unreadable |
| R3 | **No client** was selected | that an explicit human selection is required before anything is provisioned |
| R4 | A selected client has **no recipe** | the unsupported client, **together with the clients that are supported** |

And one more, reached later in the same session:

| # | When | Report |
|---|---|---|
| R5 | Symlinks are unavailable **and** the selected client's recipe has no native discovery mechanism that works without one | the client, the mechanism its recipe requires, and what was attempted — then stop **before provisioning** |

> **R5 is not solved by writing a file that names a path.** Discovery is a property of the client,
> not of the filesystem: a client that surfaces a skill through a symlinked directory does not
> surface it through a text file containing a path. Recording such a file as a discovery entry
> claims a capability nobody observed. Never copy canonical content as a substitute either — that
> is the fork this adoption exists to prevent.

**There is no fallback delivery mode.** R1 and R2 are refusals, not a branch into copying SpecBoot
into this repository. A packaged-snapshot delivery is planned as separate future work and is not
available here; do not attempt to improvise one.

## 8. Step 7, in the fresh session — resume, verify, and only now discover

The fresh session you handed off to:

1. **resumes** from the durable manifest and the adoption run log — never by re-running this prompt
   from scratch and never by re-asking questions already answered and recorded;
2. **obtains a local canonical source path**, in this order:
   - from the **machine-local store** under `.specboot/local/` where one exists on this machine —
     it is git-ignored, holds the path and nothing else, and reading it is a convenience, never a
     shortcut past step 3;
   - otherwise by **asking the operator**, or by **rediscovering** the source.

   Being asked for a path is the **ordinary case**, not a failure: the committed manifest records
   portable identity only, so there is no path in it to require, and an absent store is exactly
   what any machine other than the one that ran `ADOPT-00` looks like. Record in the run log where
   the path came from — never the path itself;
3. **verifies source identity** by recomputing the recorded checksums against whatever source it
   obtained, however it obtained it. Identity is the checksums, and with no path recorded it is the
   only thing identity can be: a path is accepted only when the checksums match, plus the recorded
   commit where one was recorded. A path that came from the store is checksummed exactly like one
   the operator just typed;
4. **blocks on drift.** A checksum mismatch means the canonical instructions changed underneath the
   run. Stop for human reconciliation rather than continuing against instructions nobody approved;
5. **attempts native skill discovery — here, and only here.** This is the first point at which
   `specboot-adopt` could be discoverable at all. Record the fresh-session discovery-and-execution
   result as the probe's evidence. Filesystem presence is not discovery, and the §2 direct read is
   not discovery.

From there, continue through every reachable adoption step, stopping only at documented
human-approval gates or genuine external blockers.

## 9. How this adoption is meant to run

- **One canonical entry prompt.** This one. There is no second prompt to find.
- **Expected human responses at explicit gates.** Q1–Q3 above, the exact-mutations gate, and every
  approval gate the contract defines. A gate is a stop, not a notification.
- **Handoff prompts are generated by the run**, never composed by the operator.
- **Resume is deterministic**, from the durable run log and manifest.
- **No improvised corrective prompt patches.** If this adoption needs one to keep going, the prompt
  has a gap. Record it as an **improvement proposal** against the canonical SpecBoot source, and do
  not treat having needed it as normal use. An improvised patch is an unrecorded, unreviewed
  instruction that no artifact governs — which is the problem this prompt exists to remove.

## 10. Never

- Never write to the target repository before source validation has passed, a supported client has
  been explicitly selected, and the mutation gate has been approved.
- Never write to the canonical source at all — it is **read-only for the whole adoption**, including
  for an improvement proposal.
- Never treat autodiscovery findings as a selection, or a selection as an approval.
- Never record a client nobody selected as `PENDING EVIDENCE`, and never record a placeholder as a
  selection.
- Never leave a partial state behind after a failed write.
- Never claim a fresh session, a discovery, or a command result you did not observe. An unexecuted
  or failed command is **FAIL**, not a blank.
- Never modify `model`, reasoning effort, permission mode, or execution mode — yours or anyone
  else's. If a step fails, that is evidence to record, not a setting to change.
- Never edit the guide, a phase file, or a troubleshooting entry from inside an adoption. Findings
  go to the project's run log; accepted improvements reach the canonical source later, through the
  governed follow-up workflow, and are never consumed by the run that raised them.

---

*Canonical rules named above are defined in the adoption guide and its phase files, and are
executed by the `specboot-adopt` skill. This prompt carries parameters and gates; it deliberately
does not restate the steps, the checkpoint protocol, the manifest semantics, or the de-bootstrap
ordering.*
