# Driving Mechanical Checkpoint Approval

**The rule itself is defined once, in `00-conventions.md` §Standing authorization — when a gate
auto-approves instead of asking**, and the `Allowed modifications` field is defined in
`00-conventions.md` §Allowed modifications. Those are the authority. This file explains how *you*
drive both — it does not restate either.

Read both canonical sections each time. Do not work from memory of them.

## What you check, before presenting a checkpoint gate

1. **Read the checkpoint's step's `Allowed modifications` field**, from its phase file. This is
   authored in advance by whoever maintains the guide — you read it, you never write it, and you
   never widen it to accommodate what a given run happened to produce.
2. **Compare the exact staged file list against it.** Every staged path must be a member of the
   declared allowlist (a member of the exact list, or matching the closed rule, depending on the
   step's shape).
3. **Read `ADOPTION-AUTHORIZATION.md`** for this run — one file, never one per step — and check
   whether it grants a standing authorization covering this checkpoint's class, with its
   conditions still holding.
4. **For a push specifically**, additionally confirm: fast-forward, and the remote-impact
   assessment is unchanged from the `ADOPT-00` baseline.

## The two outcomes

- **Every staged path is in the allowlist, and a standing authorization covers it with its
  conditions holding** → auto-approve. Record the auto-approval as evidence in the checkpoint
  ledger — including `Allowlist match: YES` — exactly as you would record a live approval. Never
  present it as though a human reviewed it in the moment; state plainly that it auto-approved and
  why.
- **Any staged path is outside the declared allowlist** → this is never a question you ask. It is
  `FAIL_CLOSED`. Report the exact unexpected path, stop the checkpoint, and record `Allowlist
  match: NO` with the anomaly named. An out-of-scope file in the stage is evidence something went
  wrong in the step that produced it — investigate that, do not ask whether to proceed past it.
- **Everything else** — the allowlist matches but no standing authorization covers this checkpoint,
  or a push condition (fast-forward, unchanged remote impact) is not met — proceeds through the
  live `[HUMAN APPROVAL REQUIRED]` gate exactly as it always has. Standing authorization narrows
  when you ask; it never removes the gate itself.

## What this does not change

The checkpoint protocol's other steps are unchanged: the complete preflight and exact mutation
inventory (`ADOPT-00`'s own gate, and every step's own approval gate) still run; staging is still
exact, never `git add -A`; a correction still triggers a fresh independent review; the remote-impact
assessment is still evidence-based and read-only; and the improvement-proposal step still runs. This
mechanism only changes whether the commit and push gates themselves are a live question or a logged,
mechanical auto-approval — it changes nothing about what gets checked before either.

## Populating and revising `ADOPTION-AUTHORIZATION.md`

Fill it once, near the start of the run, from `run-template/ADOPTION-AUTHORIZATION.template.md`.
Where the declared team environment matrix can be derived from repository evidence — CI workflow
`runs-on` values, a Windows-wrapper script, container configuration, CONTRIBUTING/README platform
statements — present the derived matrix for the operator to confirm or correct, rather than asking a
blank question; where no such evidence exists, ask directly rather than inferring a narrower matrix
from its absence. A revision to this file — narrowing or revoking an authorization — takes effect
immediately, at the next checkpoint reached after the edit.
