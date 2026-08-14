# Evidence and the Run Log

The filled run log lives at `.specboot/adoption/ADOPTION-RUN-LOG.md`, committed. It is the
documented resume source. The durable `BOOTSTRAP-MANIFEST.json` beside it is the machine-readable
half: the manifest records what was created and what became of it, the run log records what
happened, what failed, and what was approved. **No parallel logs.**

## Resume protocol

1. Read the step-state table **first**.
2. Name the next step before performing any repository mutation.
3. On unexpected interruption, return to the first step lacking complete PASS evidence and re-run
   its **full** validation.

**An empty evidence block means "not known to have completed" — never "completed but unrecorded".**

A filesystem that looks like the step succeeded is not evidence the step succeeded. A crash
mid-step is exactly the condition that produces convincing-but-incomplete state: a directory
created but never populated, a symlink never wired, a check never run.

## Recording a command

Exact text · exit code · output summary. All three.

- An unexecuted command is FAIL.
- A failed command is FAIL.
- Empty output is never PASS. Capture the exit status, because for many checks empty output and
  "the command never ran" are indistinguishable on stdout alone.
- Where a shell alias or function could shadow a tool, invoke by absolute path and record the path
  you invoked.
- Permission to run a command is not evidence it ran. Running it is not evidence it passed.

## What else the log must carry

Deviations from the guide · failures with exact command and exact error · recoveries naming which
`On failure` form resolved them (A inline, B a named troubleshooting entry, C a named owning step)
· client- and company-specific adaptations with reason and blast radius.

## Statuses

`PASS` · `FAIL` · `PENDING` · `PENDING EVIDENCE` · `SKIPPED` (only where the contract allows it,
with the reason recorded).

`PENDING EVIDENCE` is for a supported thing you could not exercise here — an OS you do not have, a
client not installed. It is never a softer way to say FAIL, and a blank cell is never acceptable:
a blank reads as "not applicable" to the next person, which is a claim you did not make.
