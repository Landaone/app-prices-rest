# Client Autodiscovery Recipe

The **read-only** route to client selection. It shows the operator what is on disk; it never
decides anything. The canonical rule it serves — selection precedes client-specific configuration,
and autodiscovery never authorizes it — is stated in [`../09-bootstrap.md`](../09-bootstrap.md) and
is not restated here as a second authority.

## The guarantee

**The probe writes nothing.** No directory, no file, no permission entry, no discovery link, no
manifest, no run log — nothing, anywhere, before a human selection exists. The repository tree is
byte-for-byte unchanged when the findings are displayed.

The ordering is what makes the guarantee real: the probe runs *before* any client-specific
configuration exists to be justified by it. Scanning is useful; **acting on the scan** is what is
forbidden.

## Probes, per client recipe

Each client recipe contributes read-only probes. Every probe below is an existence or content read.

| Client | Read-only probes |
|---|---|
| Claude | `.claude/` present; `.claude/skills/` present; `.claude/settings.json` present; root `CLAUDE.md` present and whether it is a symlink |
| Kiro | `.kiro/` present; `.kiro/skills/` present; `.kiro/settings/` present |
| Codex | `.agents/` or `.agents/skills/` present; root `AGENTS.md` or `codex.md` present and whether it is a symlink |

A probe that would need to create a temporary file to answer its question is **not** run at this
stage. Symlink capability is detected later, at provisioning time, inside the approved mutation set
— see [`discovery/symlink-fallback.md`](discovery/symlink-fallback.md).

## Display format

Findings are reported as candidates, with the evidence that produced them and nothing more:

```text
  Autodiscovery (read-only — nothing has been written)

    Claude    candidate    .claude/ present; .claude/settings.json present
    Kiro      candidate    .kiro/ present
    Codex     not found    no .agents/, no AGENTS.md, no codex.md

  These are candidates, not a selection. Which client(s) do you want provisioned?
```

The prompt is part of the output. A findings list displayed without a question invites the reader
to treat the list as the answer.

## Findings are candidates, not authorization

- A discovered client is a **candidate**. Only an explicitly selected client is provisioned.
- Every client not selected is recorded `NOT SELECTED` — nothing provisioned, nothing validated,
  nothing owed, and no blocking effect. Never `PENDING EVIDENCE`, which asserts intended support a
  run could not exercise; nobody made that claim about a client nobody chose.
- **Finding nothing is not authorization to proceed with no client.** An empty result is a finding,
  not a decision: the manual route remains available, and the operator names the client they intend
  to use. A run with no selected client has nothing to provision and no discovery to validate.
- Autodiscovery is never required. The manual route — the human names the clients — reaches
  selection directly and needs no probe to confirm it.

## What is recorded

The durable manifest's `clientSelection` block records the route (`autodiscovery`), the candidates
displayed, the clients selected, and the clients recorded `NOT SELECTED`. **A finding alone is
never written as a selection**: `candidatesDisplayed` and `selected` are separate fields precisely
so that the difference between what was seen and what was chosen survives in the record.
