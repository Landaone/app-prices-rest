<!-- SPECBOOT-BOOTSTRAP:BEGIN -->
Run the `specboot-adopt` skill. This repository is bootstrapping a SpecBoot adoption in
**source-linked** mode: no adoption content is copied locally.

To find the canonical guide and continue the adoption:

1. Resolve the canonical SpecBoot source path from `.specboot/local/` (git-ignored,
   machine-local) if it exists on this machine; otherwise ask the operator for it, or
   rediscover it.
2. Verify the resolved source's `SPECBOOT_ADOPTION_GUIDE.md` and
   `ai-specs/skills/specboot-adopt/SKILL.md` checksums against the ones recorded in
   `.specboot/adoption/BOOTSTRAP-MANIFEST.json`. A mismatch is drift — stop for human
   reconciliation rather than continuing against changed instructions.
3. Read `SPECBOOT_ADOPTION_GUIDE.md` from that verified source, and resume from the
   step-state table in `.specboot/adoption/ADOPTION-RUN-LOG.md`.

This block is temporary and is removed at `ADOPT-18`.
<!-- SPECBOOT-BOOTSTRAP:END -->

<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.
<!-- CODEGRAPH_END -->
