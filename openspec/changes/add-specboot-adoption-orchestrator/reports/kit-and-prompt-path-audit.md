# Kit and Entry-Prompt Absolute-Path Audit

Evidence for tasks **3.9** (kit) and **3.12** (entry prompt), design **D-R**: the canonical source
location is runtime input, and no canonical artifact records a machine-specific path.

Date: 2026-08-13. Host: `Darwin 22.6.0`.

## Command (3.9) — every file in the kit

```bash
grep -rnE '(^|[^A-Za-z0-9_./-])(/(Users|home|var|opt|tmp|mnt|srv|private)/|[A-Za-z]:\\)' specboot-adoption/bootstrap-kit/
```

### Result

```text
(no matches — zero absolute filesystem paths in the kit)
```

## Command (3.12) — the entry prompt, additionally checked for laboratory and pilot values

```bash
grep -nE '(/(Users|home|var|opt|tmp|mnt|srv|private)/|[A-Za-z]:\\|app-prices|landaeta|labs/)' specboot-adoption/bootstrap-kit/ADOPTION-ENTRY-PROMPT.md
```

### Result

```text
(no matches — zero absolute paths, zero laboratory-specific or pilot-specific values)
```

## Runtime inputs the prompt obtains by asking

| Input | How it is obtained | Placeholder used |
|---|---|---|
| Delivery mode | question Q1 at run time | — |
| Canonical source path | question Q2 at run time | `<SPECBOOT_SOURCE>` |
| Client-selection route | question Q3 at run time | — |
| Selected clients | question Q4 at run time | — |
| Pilot task | question Q5, asked later at the pilot step | — |

## Verdict

**PASS.** Zero absolute filesystem paths across the kit and zero in the entry prompt; every
machine-specific value is a runtime question or a placeholder. The one placeholder,
`<SPECBOOT_SOURCE>`, is a name for an answer, not an answer.
