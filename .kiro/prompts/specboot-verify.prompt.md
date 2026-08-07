---
description: "Verify a change's implementation against its OpenSpec artifacts before archiving"
---

Thin adapter for SpecBoot's canonical, client-neutral verification skill.

**Input**: Optionally specify a change name after `/specboot-verify` (e.g., `/specboot-verify add-auth`). If omitted, infer from conversation context; if still ambiguous, run `openspec list --json` and prompt for selection — never guess.

**Action**: Invoke the `specboot-verify` skill (canonical logic lives in `ai-specs/skills/specboot-verify/SKILL.md`, symlinked at `.kiro/skills/specboot-verify`) with the resolved change name. This file only resolves input and delegates — it does not duplicate the skill's verification logic.

**Namespace note**: this is a SpecBoot-owned prompt, not an OpenSpec-generated one. It uses the `specboot-` prefix instead of OpenSpec's own `opsx-` prefix, so it is distinguishable from, and unaffected by, `openspec update`/`openspec init` regenerating the `opsx-*` prompts.
