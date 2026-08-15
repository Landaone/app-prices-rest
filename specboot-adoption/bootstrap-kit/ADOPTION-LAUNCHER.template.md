# SpecBoot Adoption — Launcher

**This file is what you paste.** Fill in the one path below, copy everything under the line into a
new session opened on the repository you want to adopt SpecBoot into, and send it.

Do not paste `ADOPTION-ENTRY-PROMPT.md`. The run reads that file itself, in full, from the source
you name here — which is the point: a procedure that is loaded cannot be truncated, half-copied, or
served stale from someone's notes.

---

You are starting a **SpecBoot adoption** in the repository this session is rooted at.

Canonical SpecBoot source (candidate): `<SPECBOOT_SOURCE>`

Treat that path as a **candidate only**. It is not trusted because it was supplied to you. Until the
check below has passed, do not load any orchestration instruction from it, and do not create,
modify, or delete anything in this repository.

## Step 0 — Confirm this is not the canonical source's own repository

Before anything else — before the four-artifact check in Step 1 — confirm that the repository this
session is rooted at is **not** the same filesystem location as, and **not** the same Git
repository as, the candidate canonical source above.

**If they match: stop immediately.** Report that the target and the candidate source are the same
repository, and make **zero** changes to this repository. Adopting a repository into itself, or
running this launcher inside the canonical source's own working tree, is not a supported operation
— it is not diagnosed by, and does not need, the four-artifact check that follows, since a
self-referential candidate makes that check meaningless.

## Step 1 — Validate the candidate source, read-only

Without writing anything anywhere, confirm all four of these exist inside the candidate source:

1. `SPECBOOT_ADOPTION_GUIDE.md`
2. `specboot-adoption/`
3. `ai-specs/skills/specboot-adopt/SKILL.md` — present and **readable**
4. `specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md` — present and **readable**

**If any of the four is missing or unreadable: stop.** Report which check failed and that a
validated canonical SpecBoot source is required. Make **zero** changes to this repository — no
directory, no file, no configuration entry. There is nothing to undo, because nothing was created.

## Step 2 — Load the canonical procedure

Only after all four have been confirmed, read

`<SPECBOOT_SOURCE>/specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md`

**in full**, and follow it exactly. Read the complete file **before taking any adoption action** —
not the first section, not a summary, and not while already acting. It is the canonical procedure
for this adoption, and everything about how the adoption runs comes from it.

## What this launcher is not

This launcher defines no procedure of its own. It does not tell you how to adopt, how clients are
chosen, how work is committed, or what any individual step does. All of that is in the file you load
in Step 2 and in the guide that file refers to. If you find yourself needing an instruction that is
in neither, stop and report it — that is a gap to record, not one to improvise around.

No write to this repository is permitted before the human-approval gate defined by the file you load
in Step 2.

Keep the source path above in this session only. It must never be written into any committed file in
this repository.
