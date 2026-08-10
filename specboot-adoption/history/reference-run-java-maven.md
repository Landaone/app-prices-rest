# Reference Run — Java/Maven Repository

Read [`00-conventions.md`](../00-conventions.md) first.

**Historical record only.** Everything below is evidence from the reference adoption of one
specific Java 11 / Maven 3.9.16 / Spring Boot repository. None of it is an expectation for
your repository, and none of it may be inherited as a status.

A future run must re-earn every PASS with its own recorded evidence.

---

## Reference outcome — `ADOPT-09` (Inspect and Adapt Agents)

- Original TypeScript backend, React frontend, and product-strategy agents preserved; each had frontmatter invalid under strict YAML solely because its unquoted description scalar contained YAML-sensitive colon patterns (for example `Context:`, `user:`, `assistant:` inside the examples text), repaired to a block scalar with description, metadata, and body preserved exactly.
- No existing agent covered Java/JVM backend work, so `java-backend-developer.md` was created: client-neutral frontmatter (name and description only), generic across the Java/JVM family, domain-neutral examples, reading project details from `docs/` at task time.
- OpenSpec selected the Java agent for Java backend work and the product-strategy agent for applicable product/ideation work, only after both passed validation.


## Reference outcome — `ADOPT-11` (Inspect and Adapt Skills)

- Twelve canonical skills inspected; eleven preserved unchanged because they were already technology-agnostic or already detected the repository stack correctly.
- `code-auditing` adapted to detect the stack, no longer assumed Node.js/TypeScript tooling, made technology-specific checks conditional, and required explicit authorization before any web/GitHub/registry research. No new tools introduced.
- `using-git-worktrees` was reviewed and left unchanged: its dependency-bootstrap commands resolve dependencies the target repository already declares, which is not the same as introducing an undeclared dependency.
- Independent validation used absolute executable paths after an initial pass produced false PASS results caused by shell-resolved commands that had actually failed to run.


## Reference outcome — `ADOPT-13` (Create Selected-Client Adapters)

- Claude and Kiro selected.
- Two agents exposed to each client — `java-backend-developer.md` and `product-strategy-analyst.md` — for four agent symlinks total; the TypeScript backend and frontend agents were preserved but not exposed because they do not apply to this repository.
- Eleven of twelve canonical skills exposed per client, for twenty-two shared skill symlinks total; the twelfth (`openspec-sync-specs`) collided with an existing real OpenSpec-generated directory, so the real directory was preserved and its symlink was skipped and reported.
- Six OpenSpec-generated skill directories per client (twelve total) remained real.
- No Cursor adapters created.
- A first attempt looped over a space-separated client list, which zsh treats as one unsplit word; it produced one malformed symlink per client. Only those two malformed entries were removed, then the approved symlinks were created explicitly.


---

## Validation status table (formerly section 21)

The `Clean-run status` column reflects the `experiment/specboot-adoption-clean` run. A
future run must re-earn PASS with its own evidence rather than inherit this one. A status
may be upgraded only after observed evidence is recorded.

| Capability | Reference status | Clean-run status |
|---|---|---|
| Prerequisite discovery | Partially validated | PASS |
| OpenSpec initialization for Claude Code and Kiro | Validated in reference repo | PASS |
| SpecBoot import | Validated with hidden-directory caveat | PASS |
| CodeGraph initialization and selected-client configuration | Validated for Claude and Kiro | PASS when CodeGraph is adopted for the target repository; N/A when CodeGraph is not adopted |
| Selected-client permission configuration | Not previously tracked | PARTIAL — shared Claude configuration and native Windows portability require fresh validation |
| Technical-context adaptation | Validated after corrections | PASS |
| OpenSpec configuration | Validated after corrections | PASS |
| Canonical agent adaptation/validation | Validated after corrections | PASS |
| Canonical skill adaptation/validation | Validated after corrections | PASS |
| Claude/Kiro adapter filesystem validation | Validated for Claude and Kiro | PASS |
| Claude fresh-session discovery | Pending | PASS |
| Kiro fresh-session discovery | Validated | PASS |
| Project baseline | Pending | PASS, 8 tests with zero failures/errors/skips |
| Local checkpoint | Pending | READY, explicit human commit approval still required |
| Daily request-to-PR-ready workflow (six capabilities: `enrich-us`, propose, apply, `specboot-verify`, independent `adversarial-review`, archive) | `PENDING END-TO-END VALIDATION` | Still pending end-to-end validation of the six-capability sequence specifically |

A status may be upgraded only after observed evidence is recorded. The clean-run column reflects the `experiment/specboot-adoption-clean` run; a future run must re-earn PASS with its own evidence rather than inherit this one.

---


---

## Reference-run baseline evidence

From `ADOPT-16` in the reference repository: `mvn -o test` initially reused stale
`target/classes` missing Lombok-generated members; `mvn -o clean test` failed because the
offline plugin cache lacked `maven-clean-plugin`; after explicit approval, `target/` was
moved recoverably outside the repository, and `mvn -o test` then passed with 8 tests, 0
failures, 0 errors, 0 skipped.

From `ADOPT-04`: 25 files indexed, 314 nodes, 389 edges, 1.0 second.

From `ADOPT-14`: 26 adapter symlinks (4 agent + 22 skill) plus 4 root-instruction symlinks,
30 total.

---

## Daily-workflow pilot (planned, not executed end-to-end)

The reference run planned this pilot request for the six-capability workflow. It is recorded
here as historical intent; the workflow remains `PENDING END-TO-END VALIDATION` — see
[`../08-daily-workflow.md`](../08-daily-workflow.md).

```text
Fix the fallback handler in `HttpErrorHandler` so generic exceptions are handled by the declared `Exception.class` handler.

Add regression coverage proving that an unexpected exception returns HTTP 500 using the project's `Error` JSON structure.

Do not expand the scope to redesign all validation behavior or convert malformed input to HTTP 400 unless the OpenSpec artifacts explicitly justify that as a separate requirement.
```

### Pilot validation criteria

- OpenSpec artifacts created.
- Scope remains focused.
- Handler parameter corrected.
- Regression test proves unexpected exception returns 500 with project error JSON.
- Existing tests pass.
- Review completed.
- Docs/specs updated only if contracts changed.
- Commit and PR content prepared.
- No remote mutation without approval.

