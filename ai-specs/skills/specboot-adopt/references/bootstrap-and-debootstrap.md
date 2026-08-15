# Bootstrap and De-bootstrap

Step contracts: `09-bootstrap.md` (`ADOPT-00`) and `10-debootstrap.md` (`ADOPT-18`). Discovery
recipes: `specboot-adoption/bootstrap-kit/discovery/`. This file is orchestration guidance, not a
restatement of either step.

## The rule that governs every bootstrap write

**Never create a real file or directory at a path a later step must create as a symlink.**

`cp -rn` and the installer's symlink creation both **skip** existing paths and record them only as
*skipped*. `ADOPT-13` preserves a real directory colliding with a canonical skill name. So a
bootstrap-created real `CLAUDE.md`, `AGENTS.md`, or `.claude/skills/specboot-adopt/` becomes
permanent, and the only trace is one word in a summary.

Where a real file is unavoidable, register it with an `intended-permanent-replacement` so
`ADOPT-18` converts it.

## One delivery mode decides what exists at all

Read the mode from the manifest's run-level `source` block **before** planning any cleanup. Adoption
delivers **source-linked** and nothing else. A manifest recording `packaged-snapshot`, or carrying
no `source` block at all, predates the deferral: read it as **history** and do not re-interpret it.

| | What exists |
|---|---|
| Entries | the selected clients' discovery entries only |
| Entry `mode` values seen | `symlink`, `appended-block` |
| `.specboot/bootstrap/` | **never created** |
| `.specboot/local/` | the machine-local source-path store — **removed by `ADOPT-18`** |
| Payload obligation | `SKIPPED — source-linked mode` |
| Container obligation | `SKIPPED — source-linked mode` |
| External source | never an entry; **byte-identical** before and after |

`SKIPPED — source-linked mode` is written explicitly on both obligations. Never blank, and a blank
is never read as PASS — the two are indistinguishable to a later reader, which is exactly what an
explicit value prevents.

**There is no `pointer-file` mode.** A real file naming an external path is not a discovered skill,
so the schema cannot record one and you will never meet one. Where symlinks are unavailable and the
selected client's recipe has no native mechanism without them, `ADOPT-00` **failed closed before
provisioning** — so there is nothing to de-bootstrap.

**The container procedure below governs the deferred packaged-snapshot mode.** It is retained
because its reasoning is what that change inherits, and it is **not exercised**: there is no payload
and no container, so nothing to verify empty and nothing to remove by name. De-bootstrap removes the
project-local discovery entries and the machine-local store, and **byte-restores** any file a
delimited block was appended to — restored, not merely trimmed.

**The external source is never an entry.** Since the only authority for removing anything is the
inventory, there is no operation here that could reach the source. That is the guarantee — not a
separate promise to be careful.

For source resolution, validation, provenance and drift, see
[`source-resolution.md`](source-resolution.md).

## Two landing zones, opposite lifetimes

| Path | Lifetime | Git |
|---|---|---|
| `.specboot/bootstrap/` | never created — belongs to the deferred mode; its ignore rule is still provisioned | ignored |
| `.specboot/local/` | transient, until `ADOPT-18` — the resolved path and nothing else | ignored |
| `.specboot/adoption/` | durable, outlives the adoption | **committed** |

The temporary state disappears; the record of what the bootstrap did does not. Never write a bare
`.specboot/` ignore rule — it would swallow the durable evidence.

## Manifest fields, and what each one prevents

| Field | Prevents |
|---|---|
| `ownership` | cleanup touching a file the repository already had (`pre-existing-untouched` is never touched) |
| `intended-permanent-replacement` | removing a transient entry whose replacement is missing — that is FAIL, not cleanup |
| `mode` | unlinking something that is actually a copy or an appended block rather than a symlink |
| `checksum` | undetected drift or tampering |
| `cleanup-status` | a half-finished `ADOPT-18` reading as complete |

## Client selection

**Declared by the operator, never inferred.** A `.claude/` or `.kiro/` directory on disk is not a
selection — a repository can carry a client directory nobody chose.

Two routes reach it: the human names the clients, or a **read-only** autodiscovery probe displays
candidates and waits. The probe writes nothing and authorizes nothing; a finding is a candidate,
and finding nothing is a finding rather than permission to proceed with no client.

## Discovery is not presence

Filesystem presence proves nothing. `ADOPT-00`'s validation is a **fresh-session probe**: the
client surfaces the skill and reaches the guide with no operator-supplied paths. You cannot restart
your own session — stop, state the exact prompt, hand off, and record the operator's verbatim
result.

Codex stays `PENDING EVIDENCE` until its three-part gate passes. A candidate path existing on disk
is not support.

## De-bootstrap ordering

Four rules bind the written procedure in `10-debootstrap.md` and the executable behavior together.
Drive both the same way:

1. **Replacement before removal.** Verify every `intended-permanent-replacement` exists *and
   resolves* before removing its transient entry. An unresolved one is **FAIL**: leave the entry in
   place and stop. A removal that outruns its replacement leaves the repository worse than not
   running the step, because `ADOPT-13`'s skip-on-exist rule then makes the gap permanent.
2. **Terminal dispositions, written back as you reach them.** Every entry ends at a terminal
   `cleanup-status` *and* `final-disposition` in the committed manifest. `pending` is FAIL, not a
   partial PASS. Unexercised obligations read `SKIPPED — source-linked mode`.
3. **Refuse rather than guess.** An unresolved replacement and unrecorded content in scope for
   removal both stop for human reconciliation. Neither is resolved by you making a choice.
4. **A refusal is resumable and leaves no half-state.** Because dispositions are written back as
   they are reached, the committed manifest already names which entries are terminal and which are
   not — another session continues from the record rather than re-deriving it.

## Capability completeness gates removal, and re-validation is scoped to what changed

**Before step 1 of `ADOPT-18`, confirm `ADOPT-11`/`ADOPT-12`'s mandatory-capability completeness
check is PASS.** Removing the temporary discovery entries and the machine-local source-path store
is what makes an in-repository self-repair of a missing mandatory workflow capability impossible —
this is a precondition failure if the check is not PASS, checked before any entry is read, not one
of the two refusals discovered mid-processing. Report which capability is missing and stop.

**The mandatory second `ADOPT-15` fresh-session re-run is conditional, not automatic.** Drive step
7 this way: always re-run the `ADOPT-14` filesystem checks. Re-run the full fresh-session `ADOPT-15`
check per selected client **only when this step's disposition touched any entry beyond the
manifest's exact `bootstrap-created` set** — those entries were never part of the permanent
discovery surface `ADOPT-13` provisions. Where disposition touched only the `bootstrap-created`
entries, record `ADOPT-14`'s re-check as the explicit substitute evidence rather than leaving the
fresh-session field blank or silently treating filesystem presence as equivalent to discovery —
`ADOPT-00`'s own validation text already draws that line, and this narrowing does not blur it.
**When the full fresh-session check is required, it is not a decision to present to the operator.**
Generate the exact prompt and stop; do not ask whether to continue in this session instead — the
same rule `09-bootstrap.md`'s own handoff states, applied here rather than restated with different
wording.

Also remove the machine-local `.specboot/local/` store, and **preserve** the committed manifest and
run log. Act only on manifest entries — never on path patterns, never on what looks like a bootstrap
file — **except for the container itself, in the deferred mode, which is removed by name as the
final act.**

*The paragraphs below describe that container act. They govern the deferred packaged-snapshot mode
and are not exercised here.*

The exception is not a loosening of the entries-only rule; read them apart and you produce a failing
end state. The manifest enumerates payload **entries**, never `.specboot/bootstrap/` itself, so
acting purely on entries leaves the container present but empty — and `ADOPT-18` requires it
**absent**. Entries govern *content*; the container is removed only after every entry is terminal
and the directory is **verified to hold no files**. Empty directories are not content — removing the
entry `…/skills/specboot-adopt/` leaves `skills/` behind, since the manifest never enumerates
intermediate parents, and those skeletons go with the container.

**A non-empty container is FAIL.** Whatever remains was never recorded, which is precisely the
pre-existing content `ownership` protects. Stop and reconcile — never recurse, never delete what the
manifest does not describe. Removing a verified-empty directory misidentifies nothing, because
nothing is left to misidentify. `.specboot/adoption/` is a sibling and is never in scope.
