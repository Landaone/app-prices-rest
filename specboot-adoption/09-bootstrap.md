# Phase 9 — Bootstrap a Repository With No SpecBoot and No AI Configuration (Mandatory)

Read [`00-conventions.md`](00-conventions.md) first.

Step: `ADOPT-00`. New in this phase file; it does not renumber any existing step.

> **`ADOPT-00` runs before `ADOPT-01`.** Its number reflects that position, not this file's
> number — step IDs are stable identities, not positions, and phase-file numbering is already
> non-contiguous by design.

This step exists because the adoption contract could not previously start itself. Adoption begins
in a repository that may have **no AI tooling installed at all**, and `ADOPT-03`'s `cp -rn` does not
copy hidden client directories — so nothing in a virgin repository lets any AI client discover
either this guide or the `specboot-adopt` skill before the step that installs them has already run.

The kit that solves this is documented in
[`bootstrap-kit/README.md`](bootstrap-kit/README.md).

---

## `ADOPT-00` — Bootstrap Client Discovery

**Condition:** always, when the repository does not yet contain SpecBoot files or AI client
configuration. In a repository that already carries them, record `SKIPPED — already provisioned`
with the evidence and go to `ADOPT-01`.

**Purpose:** Make this guide and the `specboot-adopt` skill discoverable by the selected AI client
in a repository that has neither, so the adoption can begin at all — while creating nothing that a
later step must be able to create as a symlink.

**Preconditions:** none. This is the first step of the adoption.

**Action:** structured written procedure.

1. **Resolve and validate the canonical SpecBoot source.** The source location is **runtime
   input**, supplied by the operator; no canonical artifact records it. A supplied path is a
   canonical SpecBoot source only when all three are present:

   | Artifact | Path within the source |
   |---|---|
   | Adoption guide | `SPECBOOT_ADOPTION_GUIDE.md` |
   | Phase directory | `specboot-adoption/` |
   | Orchestration skill | `ai-specs/skills/specboot-adopt/SKILL.md` |

   The skill is validated as a **readable `SKILL.md` file**, not merely a present directory: the
   initial session reads that file directly, at a source-relative path, to obtain its procedure.
   That read is a **direct read, not native skill discovery** — nothing in a virgin repository can
   discover the skill yet, and the fresh-session probe in this step's validation is what proves it
   became discoverable.

   **This validation runs before any orchestration instruction is loaded and before the first
   repository-local write.** An incomplete source is *rejected*, not diagnosed after artifacts
   already exist, and a rejection leaves the target byte-for-byte unchanged — there is nothing to
   clean up because nothing was created. See
   [`bootstrap-kit/source-resolution.md`](bootstrap-kit/source-resolution.md).

   **A validated source is a precondition of this step, not a branch within it.** There is one
   delivery mode — **source-linked** — and no fallback to select between. Where no source is
   supplied, or the supplied one fails the three-artifact validation, the step **fails closed**:
   it stops, reports that a validated canonical source is required, and leaves the target
   repository byte-for-byte unchanged. Packaged-snapshot delivery is deferred in full to
   `add-specboot-packaged-snapshot-delivery`; no run enters it, and offering it would expose a
   path that fails *after* writing — the one failure shape step 6 exists to prevent.

2. **Record the run-level provenance** in the manifest as **portable identity only**: the delivery
   mode; the guide checksum; the skill checksum; the Git disposition below; and the fixed statement
   that the local canonical source path is resolved per machine and is **not stored in the committed
   manifest**. Identity is the checksums, and with no path recorded it is the only thing identity
   can be.

   **Git provenance has three dispositions, never two.** Read the source's working-tree state
   *before* deciding anything about its HEAD:

   | Source state | `worktree` | `status` | Also recorded |
   |---|---|---|---|
   | not a Git working tree | `not-a-repository` | `unavailable` | the reason |
   | Git working tree, **clean** | `clean` | `recorded` | the commit |
   | Git working tree, **uncommitted changes** | `dirty` | `unavailable` | the reason, and optionally the observed HEAD as labelled context |

   **A dirty working tree has content that no commit identifies.** HEAD names what was committed;
   the run read something else. Writing that commit into the field a consumer reads as identity
   produces provenance that is *precisely wrong* — worse than absent, because a later reader can
   resolve the commit, diff nothing, and conclude the source matched. Where the observed HEAD is
   retained at all it is labelled as not identifying the source content, and never recorded as the
   commit. Never infer, invent, or omit any of the three. **Identity survives all three cases**,
   because the checksums are computed over the bytes actually read.

   **The resolved absolute path is never recorded here.** The manifest is committed by design, so a
   path written into it would travel into every clone of the adopting repository, and a label
   describing a value as non-portable does not make committing it portable. Where this run needs the
   path afterwards, keep it **only** in machine-local, git-ignored state under `.specboot/local/` —
   a convenience pointer holding the path and nothing else, never read as evidence of identity,
   never an error when absent, and removed by `ADOPT-18`.

3. **Detect the environment and record it.** Whether the target is a Git repository; the operating
   system; the active shell; and whether symlink creation actually works — probe it, never infer it
   from the platform name. See
   [`bootstrap-kit/discovery/symlink-fallback.md`](bootstrap-kit/discovery/symlink-fallback.md).

4. **Detect pre-existing SpecBoot or AI artifacts.** Record every path the payload would occupy
   that is already present. Nothing found here is ever overwritten.

5. **Reach client selection, by one of exactly two routes.** Selection is **declared, never
   inferred**. The presence of a `.claude/` or `.kiro/` directory is not a selection — a repository
   can carry a client directory nobody chose.

   | Route | Procedure |
   |---|---|
   | **Manual** | the human names the clients |
   | **Autodiscovery** | run the **read-only** probe, **display** the candidates, and **wait** for the human to select from them or name something else |

   **Autodiscovery writes nothing and authorizes nothing.** No directory, no file, no permission
   entry, no discovery link exists before a human selection does, and the repository tree is
   byte-for-byte unchanged when the findings are displayed. A found client is a **candidate**;
   only a selected client is provisioned. Finding no candidate is a finding, not authorization to
   proceed with no client. See
   [`bootstrap-kit/client-autodiscovery.md`](bootstrap-kit/client-autodiscovery.md).

   **An explicit, supported selection is a precondition of every write in this step.** Two
   refusals, both before the preflight — there is nothing to preflight until the step knows whose
   recipe applies — and both leaving the repository byte-for-byte unchanged:

   | Refusal | Reported |
   |---|---|
   | **No client selected** | that an explicit human selection is required. Not "provision nothing and continue", and above all **not a placeholder** — a committed `undeclared` is a durable claim that a human made a choice they did not make |
   | **A selected client has no recipe** | the unsupported client, **together with the clients that are supported**. The nearest supported client is never substituted: that would put the orchestrator's judgement where a declaration belongs |

   Record every supported client's state explicitly. There are exactly four, and they are not
   interchangeable:

   | State | Meaning | Effect on this adoption |
   |---|---|---|
   | `SELECTED` + `PASS` | the client's discovery-and-execution gate passed | satisfied |
   | `SELECTED` + `PENDING EVIDENCE` | chosen, but its gate could not be exercised here | **blocks** |
   | `SELECTED` + `FAIL` | chosen, and its gate failed | **blocks** |
   | `NOT SELECTED` | nobody chose it | nothing provisioned or validated; **never blocks** |

   **`NOT SELECTED` is never written as `PENDING EVIDENCE`.** `PENDING EVIDENCE` asserts intended
   support that this run could not exercise — a claim nobody made about a client nobody chose.
   Recording an unselected client as `PENDING EVIDENCE` would leave every adoption permanently
   incomplete for clients it never intended to use.

   **A `PASS` proves support for the client that produced it and for no other.** A single-client
   adoption is a complete adoption; it is never reported as universal or multi-client support. No
   adoption configures or validates more clients than it selected.

   The process from here is **client-agnostic**: the steps, evidence contract, gates, and checkpoint
   rules name no client. Only the seven surfaces in that client's
   [`bootstrap-kit/discovery/`](bootstrap-kit/) recipe are client-dependent — project-instruction
   discovery path, skill exposure mechanism, permission-file format and reconciliation, native
   capability invocation, fresh-session procedure, observable model/reasoning evidence, and
   client-specific bootstrap/de-bootstrap operations. Claude, Kiro, and Codex are **peer recipes**;
   whichever is selected answers to the same canonical gate.

6. **Check that the selected clients can actually be given discovery.** Where symlink creation is
   unavailable, ask each selected client's recipe whether it has a native discovery mechanism that
   works without one. Where it has none, **stop before provisioning** and report the capability
   limitation: the client, the mechanism its recipe requires, and what was attempted. Discovery is
   a property of the **client**, not of the filesystem — a real file naming the external path is
   not a discovered skill, is never recorded as a discovery entry, and never satisfies the
   discovery gate. A content copy as a substitute is forbidden outright.

7. **Run the complete preflight, then present the exact mutation inventory and stop at the approval
   gate below.**

   **The exact mutation inventory includes `.specboot/adoption/ADOPTION-AUTHORIZATION.md`**,
   assembled from `run-template/ADOPTION-AUTHORIZATION.template.md` with its client-selection
   section filled from step 5's outcome. This is the run's one standing-authorization file — never
   one per `ADOPT` step — and later steps (`ADOPT-02`, `ADOPT-05`, `ADOPT-05B`) update its remaining
   sections when reached rather than creating a second file. **The approval gate below additionally
   asks whether to grant this run's standing commit-and-push authorization** — one line within the
   same gate, not a second question — and records the answer (granted or declined, and its exact
   conditions) into the file before provisioning completes.

   **Preflight resolves every target path before any of them is written** — discovery entries,
   instruction-file blocks, `.specboot/adoption/`, the ignore rules, and the machine-local
   source-path store — and classifies each as *absent*, `pre-existing-untouched`, or *colliding*.
   It reports **all** collisions together. Discovering them incrementally, one failed write at a
   time, means the human approved a mutation set the run already knew was incomplete.

   The **exact mutation inventory** the gate presents names, for every path: whether it will be
   created or modified, by what mechanism, and whether the operation is reversible. The paths named
   must be exactly those the run will touch — omitting a discovery entry it will create, or naming
   one it will not, makes the approval cover something other than what happens.

8. **After approval**, materialize exactly that inventory and nothing outside it:

   | | What lands in the project |
   |---|---|
   | Transient payload | **never created** — `.specboot/bootstrap/` belongs to the deferred mode |
   | Durable record | `.specboot/adoption/` (committed) — `BOOTSTRAP-MANIFEST.json`, the filled `ADOPTION-RUN-LOG.md`, and `ADOPTION-AUTHORIZATION.md` |
   | Discovery entries | point at the **external** canonical guide and skill; nothing canonical is copied |
   | Machine-local store | `.specboot/local/` (git-ignored) — the resolved path and nothing else |

   Provision the selected clients' discovery entries per each client's recipe in
   [`bootstrap-kit/discovery/`](bootstrap-kit/), and no others. A path that turns out to need a
   different mechanism than the one approved requires a **new gate**, never an adjustment: an
   approval is scoped to the named mutation only.

   **Provisioning is all-or-nothing.** Where it fails after it has begun, restore the
   pre-provisioning state: no partial discovery entry, no partial `BOOTSTRAP-MANIFEST.json`, no
   partial run log, no orphaned ignore rule, and no orphaned machine-local store. The end state of a
   failed bootstrap is a repository that **was never bootstrapped** — which is also the only state
   a retry can safely start from.

9. **Stop and hand off.** Once the discovery entries and the durable state exist, this session's
   work is done: what it just provisioned *is* client discovery, and discovery can only be
   evidenced by a session that started **after** it existed. Generate the exact fresh-session
   prompt and hand off. Native skill discovery is attempted only in that fresh session.
   **This is not a decision to present to the operator.** There is no "continue in this session
   instead" option to offer — a continuing session cannot evidence what it just provisioned, so
   presenting the handoff as a choice between two valid paths misstates the situation. Generate
   the prompt and stop.

   **No OpenSpec command and no `/opsx:*` command is used** at any point before `ADOPT-02` has
   completed and its OpenSpec availability check has explicitly passed. OpenSpec is installed *by*
   this adoption; its absence here is the expected state, never a blocker.

**The rule that governs every write in this step:** never create a real file or directory at a path
a later step must create as a symlink. Both `cp -rn` and the installer's symlink creation **skip**
any path that already exists and record it only as *skipped*, and `ADOPT-13` preserves a real
directory that collides with a canonical skill name. A bootstrap-created real `CLAUDE.md`,
`AGENTS.md`, or `.claude/skills/specboot-adopt/` would therefore be permanent, and the only trace
would be a "skipped" line. Where a real file is genuinely unavoidable, register it in the manifest
with an `intended-permanent-replacement` so `ADOPT-18` converts it.

**Allowed modifications:** a closed rule, not an exact list, since the paths depend on which client
is selected — the selected client's `bootstrap-kit/discovery/<client>.md` `## Entries` table (a
pre-authored, per-client exact list), plus the fixed durable-state paths every client shares:
`.specboot/adoption/BOOTSTRAP-MANIFEST.json`, `.specboot/adoption/ADOPTION-RUN-LOG.md`,
`.specboot/adoption/ADOPTION-AUTHORIZATION.md` (design D-Z, part 2a), `.specboot/local/` (the
machine-local source-path store), and the two ignore-rule edits (`.gitignore`,
`.git/info/exclude`). Never a path outside the selected client's discovery-recipe table plus this
fixed set.

**Approval gate:** **[HUMAN APPROVAL REQUIRED]** before the first repository-local write. What is
approved is the **exact mutation inventory** the preflight produced in action 7 — every path, its
operation, its mechanism, and its reversibility. The approval covers those paths and mechanisms
only: it does not extend to any later step, and a path needing a mechanism other than the one
approved requires a new gate rather than an adjustment.

**Validation:** acceptance criteria, all required.

| Criterion | Required end state |
|---|---|
| `.specboot/bootstrap/` | **never created at any point** — absent, not merely emptied |
| Copied canonical content | **none anywhere in the project** — no guide, no phase file, no skill body |
| Payload obligation | recorded `SKIPPED — source-linked mode` |
| Container obligation | recorded `SKIPPED — source-linked mode` |
| Discovery entries | resolve to the external canonical guide and skill |
| External canonical source | **byte-identical** before and after |

`SKIPPED — source-linked mode` is an **explicit recorded outcome**. It is never left blank, and a
blank is never read as PASS.

**Refusal criteria.** Four refusals end the step before the first write, and each is judged the
same way: the target repository is **byte-for-byte unchanged**, with no `.specboot/` directory, no
discovery entry, no manifest, no run log, no ignore rule, and no machine-local store. A refusal
that left anything behind is a **FAIL**, and so is one that continued in a degraded form.

| Refusal | Reported |
|---|---|
| No canonical source supplied | that a validated canonical source is required, and the three artifacts it must contain |
| The supplied source fails the three-artifact validation | which artifact is missing or unreadable |
| No client selected | that an explicit human selection is required |
| A selected client has no recipe | the unsupported client, together with the supported ones |
| The selected client cannot discover the external skill without symlinks | the client, the mechanism its recipe requires, and what was attempted |

**The external canonical source is read-only for the whole adoption.** No step creates, modifies,
or deletes anything inside it — including for an improvement proposal. A step that wrote to it is
**FAIL**. The guarantee rests on the inventory rule, not on care: the source is never a manifest
entry, so no inventory-driven operation can reach it.

Mode-independent criteria, all required:

- `.specboot/adoption/BOOTSTRAP-MANIFEST.json` exists, validates against
  [`bootstrap-kit/BOOTSTRAP-MANIFEST.schema.json`](bootstrap-kit/BOOTSTRAP-MANIFEST.schema.json),
  and carries every field on every entry — including the run-level `source` block and the
  `clientSelection` record. That `source` block carries **portable identity only**; the schema
  defines no resolved-path field and rejects one, so a manifest recording a machine-specific path is
  a **FAIL**.
- `git check-ignore` reports `.specboot/bootstrap/` and `.specboot/local/` **ignored**, and
  `.specboot/adoption/` **not ignored**. A bare `.specboot/` rule is a FAIL: it would swallow the
  durable evidence. The bootstrap rule is provisioned even though no run creates that path — the
  rule is a property of the installer, not a claim that the deferred mode is available.
- The committed `clientSelection` record names the clients a human explicitly selected, and carries
  **no placeholder** — `undeclared` or equivalent is a FAIL.
- A provisioning failure left **nothing** behind: no partial discovery entry, manifest, run log,
  ignore rule, or machine-local store. A retry begins from a repository that was never bootstrapped.
- Only clients recorded `SELECTED` have artifacts; every other supported client is recorded
  `NOT SELECTED` with none.
- In source-linked mode, no discovery entry naming an absolute external path is staged for any
  checkpoint. Those entries are machine-local; staging one is a **FAIL**, not a cosmetic slip.
- No path the manifest lists as `pre-existing-untouched` was modified.
- **A genuinely fresh session of each selected client surfaces `specboot-adopt` and reaches this
  guide with no operator-supplied paths.** This is the canonical discovery-and-execution gate, and
  it is the same gate for every client — only the recipe's fresh-session procedure differs. Clients
  recorded `NOT SELECTED` are not probed and produce no rows.

**Filesystem presence is not discovery.** The fresh-session probe is the validation, exactly as
`ADOPT-14` and `ADOPT-15` already separate presence from discovery. The orchestrator cannot restart
its own session: it stops, states the exact prompt to run, and hands off. A simulated or assumed
fresh session is a FAIL.

**Evidence to record:** the **delivery mode** and the run-level source provenance, which is
**portable evidence only** — the guide checksum, the skill checksum, the Git disposition (the
observed `worktree` state, plus the commit for a clean tree **or** an explicit `unavailable` record
with its reason for a non-repository **and** for a tree with uncommitted changes), and the statement
that the local source path is resolved per machine and is not committed. **Never the resolved absolute path**: it is machine-local
runtime state under the ignored `.specboot/local/` store, never manifest content. Then: the
**client-selection route** used and, where
autodiscovery ran, the candidates displayed alongside the clients actually selected; the declared
client or clients, **and the recorded state of every other supported client** (`NOT SELECTED`, never blank and never `PENDING EVIDENCE`); OS, shell, and the symlink-probe result; every
detected pre-existing artifact and its disposition; the delivery channel; the manifest entry count;
the `git check-ignore` verdicts for the `.specboot/` subpaths; the **preflight findings** —
every path resolved, its classification, and every collision detected; the **exact mutation
inventory** presented at the gate; any **refusal** reached, with its reason and the confirmation
that nothing was written; the exact fresh-session prompt used and its verbatim outcome; and the
approval (who, when, what was approved).

**On failure:** Form B — see the bootstrap entries in
[`22-troubleshooting.md`](22-troubleshooting.md) for discovery failure, a real file blocking a
canonical symlink, Windows symlink privilege, and a partially written manifest.

A failed `ADOPT-00` is resumable: the manifest is committed, so a different operator or session can
read what was created and continue. An entry written with no `cleanup-status` is a FAIL, not a
partial PASS.

---

## After this step

Go to [`01-prerequisites-and-install.md`](01-prerequisites-and-install.md) and continue at
`ADOPT-01`. The temporary discovery entries and the machine-local store stay in place for the whole
adoption and are removed by `ADOPT-18` ([`10-debootstrap.md`](10-debootstrap.md)) once the permanent
adoption is verified. The committed manifest and run log are **preserved** by that step, not
removed: they are the record of what the bootstrap did.
