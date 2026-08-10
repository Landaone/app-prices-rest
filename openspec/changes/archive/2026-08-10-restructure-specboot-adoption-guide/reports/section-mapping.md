# Source-Section → Destination-File Mapping (Task 1.4 / 1.5)

Completeness contract for the restructure. Source: `SPECBOOT_ADOPTION_GUIDE.md` at
`git rev-parse HEAD` before any edit (2045 lines, 11786 words, 87106 bytes).

Every source block below names exactly one primary destination. Blocks whose content
splits across destinations name each, with the split rule stated.

## Front matter (5 blocks)

> **Corrected under RF1.** This heading read "(4 blocks)" while listing five rows, `F1`–`F5`.
> The original contract (task 1.4, `enriched-work-item.md`, design D8) required **four**
> front-matter blocks — `Prompt Label Conventions`, `Happy Path 1`, `Happy Path 2`,
> `Table of Contents`. Implementation additionally mapped **F1** (Title, Scope, Purpose,
> Reference status, Status of the daily workflow), which the contract never required, so the
> mapping is **more** complete than contracted and only the arithmetic was left stale. The
> `F1`–`F5` identifiers are preserved exactly, per task 10.10; this correction applies the
> carve-out VF9 already established — 10.10 protects the identifiers, not a figure that is wrong.

| # | Source block | Lines | Destination |
|---|---|---|---|
| F1 | Title, Scope, Purpose, Reference status, Status of the daily workflow | 1–12 | `SPECBOOT_ADOPTION_GUIDE.md` (entry) |
| F2 | `Prompt Label Conventions` | 13–25 | `specboot-adoption/00-conventions.md` |
| F3 | `Happy Path 1 — One-Time Repository Adoption` | 26–49 | `SPECBOOT_ADOPTION_GUIDE.md` (entry) |
| F4 | `Happy Path 2 — Daily Request-to-PR-Ready Workflow` | 50–73 | `SPECBOOT_ADOPTION_GUIDE.md` (entry) |
| F5 | `Table of Contents` | 74–100 | `SPECBOOT_ADOPTION_GUIDE.md` (entry) — becomes the step index + §-number map |

## Numbered sections (22)

| § | Source section | Lines | Destination | Step ID |
|---|---|---|---|---|
| 1 | Install Prerequisites | 101–193 | `01-prerequisites-and-install.md` | `ADOPT-01` |
| 2 | Install and Initialize OpenSpec with Explicitly Selected Clients | 194–279 | `01-prerequisites-and-install.md` | `ADOPT-02` |
| 3 | Import SpecBoot | 280–367 | `01-prerequisites-and-install.md` | `ADOPT-03` |
| 4 | Initialize CodeGraph | 368–442 | `02-codegraph.md` | `ADOPT-04` |
| 5a | Configure CodeGraph for the Selected Clients (CodeGraph-specific content) | 443–514 | `02-codegraph.md` | `ADOPT-05` |
| 5b | Configure Selected-Client Permissions (Early, One-Time) + its record | 515–627 | `03-client-permissions.md` | `ADOPT-05B` |
| 6 | Adapt the Repository Technical Context | 628–716 | `04-context-and-openspec.md` | `ADOPT-06` |
| 7 | Configure OpenSpec to Consume docs/ and ai-specs/ | 717–812 | `04-context-and-openspec.md` | `ADOPT-07` |
| 8 | Verify OpenSpec Configuration | 813–888 | `04-context-and-openspec.md` | `ADOPT-08` |
| 9 | Inspect and Adapt Agents | 889–969 | `05-agents-and-skills.md` | `ADOPT-09` |
| 10 | Validate Agents | 970–1011 | `05-agents-and-skills.md` | `ADOPT-10` |
| 11 | Inspect and Adapt Skills | 1012–1083 | `05-agents-and-skills.md` | `ADOPT-11` |
| 12 | Validate Skills | 1084–1122 | `05-agents-and-skills.md` | `ADOPT-12` |
| 13 | Create Selected-Client Adapters | 1123–1218 | `06-adapters-and-discovery.md` | `ADOPT-13` |
| 14 | Validate Adapter Files, Symlinks, and Generated Directories | 1219–1266 | `06-adapters-and-discovery.md` | `ADOPT-14` |
| 15 | Validate Runtime Discovery in a Fresh Client Session | 1267–1341 | `06-adapters-and-discovery.md` | `ADOPT-15` |
| 16 | Run the Project Baseline | 1342–1419 | `07-baseline-and-checkpoint.md` | `ADOPT-16` |
| 17 | Review and Create a Clean Local Checkpoint | 1420–1493 | `07-baseline-and-checkpoint.md` | `ADOPT-17` |
| 18 | Daily Request-to-PR-Ready Workflow | 1494–1628 | `08-daily-workflow.md` (reduced to pointer, D6) | — |
| 19 | Permission Recommendations | 1629–1713 | `19-permissions-policy.md` | — |
| 20 | Prompt Inventory | 1714–1837 | `history/prompt-inventory.md` | — |
| 21 | Validation Status Table | 1838–1861 | `history/reference-run-java-maven.md` | — |
| 22 | Troubleshooting and Recovery | 1862–1998 | `22-troubleshooting.md` | — |

## Closing blocks (2)

| # | Source block | Lines | Destination |
|---|---|---|---|
| C1 | `Clean-Install Working Method` | 1999–2031 | `SPECBOOT_ADOPTION_GUIDE.md` (entry), companion-files list updated to the run-log template |
| C2 | `Final Acceptance Criteria` | 2032–2045 | `SPECBOOT_ADOPTION_GUIDE.md` (entry) |

## Cross-cutting extractions (content lifted out of the sections above)

These do not add source blocks; they relocate recurring content that appears *inside*
the sections already mapped. Each is listed so no reader assumes it was dropped.

| Extraction | Source | Destination | Count |
|---|---|---|---|
| `Live validation record` blocks | inside §§1–18 | `run-template/ADOPTION-RUN-LOG.template.md` | 19 |
| `Live validation record — Permissions` | inside §5b | `run-template/ADOPTION-RUN-LOG.template.md` | 1 |
| `Live permission record` | inside §19 | `run-template/ADOPTION-RUN-LOG.template.md` | 1 (of the 20 total; §19's record is the permission-log form) |
| `Reference outcome` blocks | inside §9, §11, §13 | `history/reference-run-java-maven.md` | 3 |
| §21 `Clean-run status` column | §21 | `history/reference-run-java-maven.md` | 1 table |
| Relocated `HISTORICAL PROMPT — VERIFIED VERBATIM` blocks | §20 | `history/prompt-inventory.md` | preserved byte-for-byte |
| Prompt-label conventions table | F2 | `00-conventions.md` | 1 |
| PASS/FAIL evidence discipline, shell-portability rule, availability-vs-provisioning note | recurring across §§5, 11, 12, 13, 18 | `00-conventions.md` (stated once, referenced thereafter) | — |

## Net-new content with no source block (task 5.5)

Added after the first fresh-session agent acceptance attempt exposed two guide defects. These
have **no counterpart in the pre-restructure guide** and are therefore not mapped from any
source section — recorded here so the mapping stays a complete account of what each
destination file contains.

| Destination | Net-new content | Origin |
|---|---|---|
| `00-conventions.md` | "The bounded per-step working set" section | Design D12, after attempt 1 |
| `SPECBOOT_ADOPTION_GUIDE.md` | Agent preamble's three-file working set (replaces the former two-file wording) | Design D12, after attempt 1 |
| `22-troubleshooting.md` | "OpenSpec command not found" entry (18th entry; the other 17 are mapped from §22) | Design D13, after attempt 1 |
| `04-context-and-openspec.md` | `ADOPT-08` `On failure` pointer extended to name the new entry | Design D13, after attempt 1 |
| `07-baseline-and-checkpoint.md` | `ADOPT-17` `On failure` pointer extended to name four applicable entries (was a generic pointer) | Found by task 5.6's audit |

Source-block accounting is unaffected: all 29 mapped pre-restructure blocks remain mapped, and none
of the above replaces mapped content.

## Verification (task 1.5)

- Source blocks **required** by the contract: 4 front-matter + 22 numbered + 2 closing = **28**.
- Source blocks **actually mapped**: 5 front-matter (`F1`–`F5`) + 22 numbered + 2 closing = **29**.
- Blocks with a named destination: **29**. Unmapped: **0**. Mapped-but-not-required: **1** (`F1`).
- Reproduce: `grep -cE '^\| F[0-9]+ \|' reports/section-mapping.md` = 5; `grep -cE '^\| [0-9]+[ab]? \|' reports/section-mapping.md` = 23 rows covering 22 sections (§5 splits into 5a/5b); `grep -cE '^\| C[0-9]+ \|' reports/section-mapping.md` = 2. Corrected under **RF1**; the completeness contract is unaffected and holds more strongly at 29 than at 28.
- Destination files with no source: **0** — every file in the target layout draws from a
  mapped block, except `00-conventions.md`, which draws from F2 plus the cross-cutting
  extractions listed above, and the run-log template, which draws from the record blocks.
- §5 is the only section split across two destinations; the split rule is the
  conditionality boundary from design D7 (CodeGraph-specific → `02-codegraph.md`;
  permissions → `03-client-permissions.md`).

## Measured correction to task 1.3's estimate

`tasks.md` 1.3 estimated "32 links across 25 distinct targets". Measured actual:
**39 anchor links across 25 distinct targets**. The 25 is confirmed; the link count
was an undercount in the task text. The measured value governs.
