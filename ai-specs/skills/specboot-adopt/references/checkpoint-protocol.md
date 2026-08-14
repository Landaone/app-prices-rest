# Driving the Checkpoint Protocol

**The protocol itself is defined once, in `00-conventions.md` §The checkpoint protocol.** That is
the authority. This file explains how *you* drive it and record its evidence — it deliberately does
not restate the normative steps, because a second statement of the same procedure becomes a rival
authority that drifts.

Read the canonical definition each time. Do not work from memory of it.

## When you invoke it

After **every** independently validated `ADOPT` step, or a justified group. Including checkpoints
reached long before `ADOPT-16`. `ADOPT-17` is the final checkpoint *of the adoption itself*, not
the last checkpoint of the workflow — `ADOPT-18` and `ADOPT-19` each form their own.

## Assembling the ready-for-review declaration

State all of: checkpoint id · steps covered · validation results · evidence pointers · open
deviations · improvement proposals raised · **the exact staged file list**.

The file list is a list. Not a count, not a summary, not "the usual adoption files". A reviewer
approves what they can see.

Do not declare readiness while any step in the checkpoint is FAIL or PENDING.

## Grouping

Default is one checkpoint per step. A group needs a **structural** justification recorded in the
ledger: no independently observable end state, an unreviewable or unsafe intermediate state, or a
guide-documented executed pair.

If the real reason is history readability, the ledger says that — and it is not a valid grouping
justification, so the steps stay separate. **Never write a justification claiming steps could not
be validated independently when you just validated them independently.** That is a false statement
in the record, and the record's whole value is that a later reader can trust it.

## The remote-impact assessment

Read-only, evidence-based, before the push gate. Inspect workflow and pipeline configuration,
branch protection, webhooks, required checks.

Report what you **observed**, not what you concluded. "No CI configuration found in the working
tree" is an observation. "Nothing will trigger" is a conclusion you cannot support — automation
lives in org-level rules, webhooks, mirrors, and platform integrations that leave no trace in the
repository.

Where you cannot inspect, the impact is **unknown**, and unknown blocks the push. Do not request
credentials or elevated access to resolve it.

## Filling the ledger

One row per checkpoint, with every column the run-log template names. The commit SHA and the exact
staged file list are what make the row auditable later; an entry without them records that
something happened but not what.

## Two gates, every time

Ask for the push approval separately, even when the commit approval was granted seconds ago and
the operator plainly knows the work is destined for the branch. The discomfort of asking again is
not evidence of authorization.
