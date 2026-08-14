---
name: specboot-adopt
description: Use when adopting SpecBoot into a repository, resuming an interrupted adoption from a filled run log, bootstrapping a repository with no SpecBoot files and no AI client configuration, or de-bootstrapping or checkpointing an adoption.
---

# SpecBoot Adopt

## Overview

**You execute `SPECBOOT_ADOPTION_GUIDE.md` and keep its evidence — never a second copy.**
A second copy drifts.

**Every claim you record must be observed**, never inferred.

Start at the run log's step-state table; **name the next step** first.

## Quick Reference

| You need to | Read |
|---|---|
| Run a step | `00-conventions.md` + phase file + run log — **exactly three** |
| Checkpoint / commit / push | `00-conventions.md` §The checkpoint protocol |
| Drive a checkpoint | `references/checkpoint-protocol.md` |
| Bootstrap / de-bootstrap | `references/bootstrap-and-debootstrap.md` |
| Shell / OS equivalent | `references/portability-matrix.md` |
| Resume, map evidence | `references/evidence-and-run-log.md` |
| Counter a rationalization | `references/rationalizations.md` |

## Non-negotiables

1. **Never self-approve.** At `[HUMAN APPROVAL REQUIRED]`, state the exact mutation and stop;
   approval covers that mutation only.
2. **Unexecuted or failed is FAIL.** Empty output is not PASS. Record command, exit code, output.
3. **A code-graph capability is mandatory.** None usable is **FAIL** — no waiver, no skip, no
   `PENDING EVIDENCE`.
4. **Two distinct gates per checkpoint**: commit, then push. Neither carries forward.
5. **Unknown remote impact blocks the push.** "No CI config" is a finding, not a licence.
6. **No PR until `ADOPT-00`…`ADOPT-19` are PASS** on recorded evidence. A draft PR is a PR.
7. **Never edit the guide mid-run.** Record an improvement proposal.
8. **Never change `model`, reasoning effort, permission mode, or execution mode.** Report and stop.
   Binds you only; invoked skills keep theirs.
9. **A fresh session is a stop-and-hand-off.** Never claim one you didn't observe.
10. **Unverified is never PASS.** Record `PENDING EVIDENCE` or `unavailable`, never blank.

## Common Mistakes

| Mistake | Instead |
|---|---|
| Reading ahead | Load only the step's three files |
| PASS from empty output | Capture the exit code |
| Phase file treated as a checkpoint | Checkpoint = smallest validated step |
| Grouping for tidier history | Needs a recorded *structural* justification |
| Pushing on the commit approval | Push is a separate gate |
| Cleaning up by path pattern | `ADOPT-18` acts only on the manifest |

## Red Flags — stop if you think

- "The gate protects a purpose, and that purpose is met here."
- "An honest FAIL record is enough; continue and note the limitation."
- "They'd obviously approve — I know what they'd say."
- "It's only a draft / only local / only two lines."
- "Blocking this would be caution theater."
- "The human said so, so the written contract doesn't apply."
- "Nothing verifiable is lost."

Each is a real baseline failure — **stop, don't proceed.** Counters:
`references/rationalizations.md`.

**REQUIRED SUB-SKILL:** in the `ADOPT-19` pilot invoke `enrich-us`, `specboot-verify`,
`adversarial-review` by name; never reimplement.
