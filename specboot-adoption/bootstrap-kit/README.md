# Bootstrap Kit

The delivery vehicle for `ADOPT-00`. It solves the chicken-and-egg problem the adoption contract
would otherwise leave open: the guide tells an AI agent what to do, but in a repository with no
SpecBoot files and no AI client configuration, nothing lets any client discover the guide or the
`specboot-adopt` skill before `ADOPT-03` has already copied SpecBoot in.

## Start here: `ADOPTION-LAUNCHER.template.md`

[`ADOPTION-LAUNCHER.template.md`](ADOPTION-LAUNCHER.template.md) is the kit's **single human-pasted
entry point**, and the only file an operator ever copies. Fill in its one parameter —
`<SPECBOOT_SOURCE>` — and paste it into a session opened on the target repository.

[`ADOPTION-ENTRY-PROMPT.md`](ADOPTION-ENTRY-PROMPT.md) is the **canonical full cold-start
procedure**, and it is **loaded, never pasted**: the launcher reads it in full from the validated
source. The two are **one governed entry mechanism**, not a prompt plus corrective patches.

**Why a launcher rather than pasting the procedure.** The entry prompt runs to roughly 1,850 words.
Asking an operator to paste that into every new session makes transcription part of the contract,
and transcription fails silently — a truncated paste, a stale copy kept in someone's notes, or a
paragraph lost to a scrolling chat box all produce a run executing a procedure nobody can diff
against the canonical one. A loaded file cannot fail that way.

**The launcher does not inherit the source's trust; it establishes it.** A supplied path is a
*candidate*, not a source trusted because an operator typed it. Before loading any orchestration
instruction and before any target-repository write, the launcher verifies **read-only** that four
artifacts exist in the candidate: `SPECBOOT_ADOPTION_GUIDE.md`, `specboot-adoption/`, a readable
`ai-specs/skills/specboot-adopt/SKILL.md`, and a readable `ADOPTION-ENTRY-PROMPT.md`. A failure
**stops with zero target-repository writes**. Success is followed by exactly one instruction: read
the entry prompt **completely**, and follow it exactly, before any adoption action.

The launcher **duplicates no procedure** — no `ADOPT` step, no client-selection procedure, no
checkpoint protocol — and refers to the pre-write approval gate the loaded entry file defines rather
than defining one itself. The file operators copy is the file whose drift would spread fastest, so
it holds a validation gate and one instruction, and nothing more.

Neither file needs command infrastructure — no slash command, no installed package, no `/opsx:*`
command, no discoverable skill, no prior configuration of any kind in the target repository. Every
one of those is an *output* of the adoption, so none can be a precondition of starting it.

The entry prompt is **parameterized**: it takes the canonical source as already validated by the
launcher, and asks for the client selection at run time rather than carrying it. It concerns a
**source**, never a delivery mode — there is only one. It is complete in its **parameters and
gates** and deliberately silent on **procedure**, naming canonical rules by reference so this kit
and the guide stay the only statements of what the steps are.

**The runtime path stays out of the repository.** The committed template carries the
`<SPECBOOT_SOURCE>` placeholder; the real path exists only in the filled-in copy pasted into a
session, and is never written into any committed artifact.

## One delivery mode: source-linked. A validated source is a precondition, not a branch

| Condition | Outcome |
|---|---|
| A local canonical SpecBoot source is supplied **and validates** | **source-linked** — **no payload at all**: no copied guide, phase file, or skill body, and no `.specboot/bootstrap/`. Only durable state under `.specboot/adoption/`, plus the selected client's temporary discovery entries pointing at the external source |
| A source is supplied and **fails** validation | **fail closed** — rejected before the first write |
| **No** source is supplied | **fail closed** — the run stops and reports that a validated canonical source is required |

Source-linked is the delivered mode because a copied guide is a fork the moment the canonical
source changes, and a project holding a copy will eventually edit it. **Nothing canonical is ever
copied**, which is why the single-copy guarantee holds here without anything having to enforce it.

**Packaged-snapshot delivery is deferred in full** to `add-specboot-packaged-snapshot-delivery`. It
is not a fallback this kit offers, and no run may enter it. Deferring it whole rather than shipping
it half-built is the safer trade: a mode that has never been driven from a virgin repository to a
discovered skill is not a safety net but a path that fails *after* writing — the one failure shape
the preflight exists to prevent. The payload→target mapping in `manifest.json` and the pack-time
assembly are **retained as installer machinery** for that deferred change, clearly labelled, and no
current run reads them.

**The source location is runtime input, and the resolved path is never committed.** No file in this
kit records a machine-specific path, and neither does any artifact a run produces — not the
manifest, not the run log, not the handoff prompt. A resolved path lives only in ignored
`.specboot/local/` state; identity is the checksums. See
[`source-resolution.md`](source-resolution.md).

## Four refusals, all before the first write

Every one of them leaves the target repository **byte-for-byte unchanged**. A refusal is a clean
stop, never a degraded success, and none is resolved by the run choosing on the operator's behalf.

| Refusal | Owned by |
|---|---|
| No canonical source supplied, or the supplied one fails the three-artifact validation | [`source-resolution.md`](source-resolution.md) |
| No client selected | [`client-autodiscovery.md`](client-autodiscovery.md) |
| A selected client with no recipe, reported with the clients that are supported | [`client-autodiscovery.md`](client-autodiscovery.md) |
| The selected client cannot natively discover the external skill without symlinks | [`discovery/symlink-fallback.md`](discovery/symlink-fallback.md) |

## The kit is client-agnostic; it carries every recipe and provisions one

The kit contains **no client-specific logic of its own**. It carries a peer recipe for each
supported client — Claude, Kiro, Codex — and `ADOPT-00` provisions **only the recipe for the client
the human declares `SELECTED`**. Selection is declared, never inferred: a `.claude/` or `.kiro/`
directory already present on disk is not a selection.

Every client not declared is recorded **`NOT SELECTED`**. For those clients the kit provisions
nothing, validates nothing, and reports nothing — and they never block the adoption. `NOT SELECTED`
is deliberately **not** `PENDING EVIDENCE`: the latter asserts intended support that a run could not
exercise, which is a claim nobody made about a client nobody chose.

**No adoption is required to configure or validate more clients than it selected.** A single-client
adoption is a complete adoption. A `PASS` recorded for one client proves support for that client and
for no other — it is never reported as universal or multi-client support.

The canonical process the kit serves is itself client-agnostic (design D-Q): step order, the
run-log and evidence contract, status semantics, approval gates, the checkpoint/commit/push,
bootstrap, de-bootstrap, pilot and improvement rules, the mandatory code-graph capability, and the
fresh-session discovery-and-execution evidence contract name no client. Only the seven surfaces
listed in each `discovery/*.md` recipe are client-dependent.

## The kit is source-agnostic as well

The mirror of client-agnosticism. The kit **assumes no particular canonical source location**: the
source is supplied by the operator at run time and validated against three required artifacts
before anything is loaded or written. The resolved path is recorded in **no committed artifact at
all** — it exists only as machine-local, git-ignored state under `.specboot/local/`, which
`ADOPT-18` removes, and identity is carried entirely by the recorded checksums. A kit that
hard-codes a source is exactly as broken as one that hard-codes a client.

## This directory contains references, never content

`manifest.json` lists **canonical repository-relative paths**: the source-linked entry set a
discovery entry may point at, plus the payload→target mapping retained for the deferred mode. It
does not contain a copy of the guide, the phase files, the run-log template, or the skill. Those
are canonical elsewhere, and a second copy here would be exactly the duplicated canonical source
that `docs/base-standards.md` §6 makes a completion-gate failure.

A source-linked run assembles and consumes **nothing**, so the single-copy guarantee holds
trivially and there is no drift surface for it. The pack-time assembly and the drift check remain
in place as installer machinery for `add-specboot-packaged-snapshot-delivery`: the assembly builds
the payload from the canonical paths named here so no second copy is checked into version control,
and the drift check fails the build if an assembled payload file differs from its canonical source.
Retiring the deferred mode must not silently retire the drift protection the kit depends on.

## Files

| File | Role |
|---|---|
| `ADOPTION-LAUNCHER.template.md` | **the single human-pasted entry point** — one parameter, a read-only four-artifact validation, and one instruction: load the entry prompt |
| `ADOPTION-ENTRY-PROMPT.md` | **the canonical full cold-start procedure** — loaded in full from the validated source by the launcher, never pasted |
| `manifest.json` | the source-linked entry set, plus the payload→target mapping retained for the deferred mode |
| `source-resolution.md` | how the canonical source is supplied, validated, recorded, and checked for drift — and why its absence refuses |
| `client-autodiscovery.md` | the read-only probe route to client selection, which authorizes nothing |
| `BOOTSTRAP-MANIFEST.schema.json` | schema for the **durable** per-repository record that `ADOPT-00` writes and `ADOPT-18` closes out |
| `discovery/claude.md` | how Claude Code discovers the skill and guide before SpecBoot exists |
| `discovery/kiro.md` | the same for Kiro |
| `discovery/codex.md` | the same for Codex — peer recipe, gate part 3 outstanding |
| `discovery/symlink-fallback.md` | symlink-capability detection and the **fail-closed** answer where a client cannot discover an external skill without one |

## Two landing zones with opposite lifetimes

| Path | Lifetime | Git | Contents |
|---|---|---|---|
| `.specboot/bootstrap/` | transient — until `ADOPT-18` | ignored | the payload — **belongs to the deferred packaged-snapshot mode; never created by a source-linked run.** Its ignore rule is still provisioned unconditionally, as a property of the installer rather than a claim that the mode is available |
| `.specboot/local/` | transient — until `ADOPT-18` | ignored | the machine-local source-path store: the resolved path and nothing else |
| `.specboot/adoption/` | durable — outlives the adoption | committed | `BOOTSTRAP-MANIFEST.json`, `ADOPTION-RUN-LOG.md` |

Separating them is what makes cleanup auditable: the payload disappears, the record of what the
payload did does not. A manifest living inside the directory it governs would be destroyed by its
own cleanup step, and an ignored manifest could neither be reviewed in a diff nor resumed from by
another operator.

## The rule that makes bootstrap safe

**Bootstrap must never create a real file at a path a later adoption step needs to create as a
symlink.**

`ADOPT-03` uses `cp -rn` and the installer's symlink creation skips any path that already exists,
recording it only as *skipped*. `ADOPT-13` additionally preserves a real directory that collides
with a canonical skill name and skips the symlink. So a bootstrap-created real `CLAUDE.md`,
`AGENTS.md`, or `.claude/skills/specboot-adopt/` would permanently block the canonical symlink and
leave only a "skipped" line behind as evidence.

Where a real file is unavoidable, it is registered in the durable manifest with an
`intended-permanent-replacement`, and `ADOPT-18` converts it.

## Removal

`ADOPT-18` **updates** the durable manifest with each entry's final disposition rather than deleting
the evidence of what the bootstrap did. This directory itself is canonical in the SpecBoot source
repository and is not removed there.

There is no payload to remove: `ADOPT-18` removes only the project-local temporary discovery
entries and the machine-local `.specboot/local/` store, byte-restores any file it appended a block
to, and records the payload and container obligations as `SKIPPED — source-linked mode` — an
explicit outcome, never blank and never inferred as PASS. The committed `BOOTSTRAP-MANIFEST.json`
and run log are preserved. The external canonical source is left untouched, which is enforced by
its never being a manifest entry rather than by a promise.

A run that **failed closed** created nothing, so `ADOPT-18` has nothing to reconcile: the repository
it would clean up is one that was never bootstrapped.
