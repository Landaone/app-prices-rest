# Portability Matrix

**Client-agnostic** across Claude, Kiro, Codex — the canonical process names no client, and each
client has a peer recipe. That is not the same as every adoption exercising every client: an
adoption provisions and validates **only the clients declared `SELECTED` at `ADOPT-00`**.
OS-neutral across macOS, Linux, Windows. Shell-neutral across Bash, zsh, PowerShell.

## Selection and status are different axes

| State | Effect on the adoption |
|---|---|
| `SELECTED` + `PASS` | gate satisfied |
| `SELECTED` + `PENDING EVIDENCE` | **blocks** |
| `SELECTED` + `FAIL` | **blocks** |
| `NOT SELECTED` | nothing provisioned or validated; **never blocks** |

`NOT SELECTED` is **not** `PENDING EVIDENCE`. The latter means *supported, but this run could not
exercise it* — a claim nobody made about a client nobody chose. A `PASS` proves support for the
client that produced it and **for no other**; never report one client's PASS as multi-client
support.

**The rows below are recipe availability and gate evidence — never per-adoption status.** A row
here says nothing about whether any given adoption selected that client; that lives in the
adoption's run log, as one of the four states above.

| Client | Path | Recipe | Gate evidence |
|---|---|---|---|
| Claude | `.claude/skills/<name>` → symlink | available | mechanism matches this repository's existing convention; each adoption records its own fresh-session result |
| Kiro | `.kiro/skills/<name>` → symlink | available | mechanism matches the confirmed `.kiro/skills` convention; instruction path confirmed from the installed version at `ADOPT-00` |
| Codex | `.agents/skills/<name>/SKILL.md` | available | parts 1-2 complete (official documentation 2026-08-12; isolated scratch repository). **Part 3 not observed** — fresh-session discovery and execution |

An adoption that selects Codex is **blocked** by that outstanding evidence (`SELECTED` +
`PENDING EVIDENCE`). An adoption that does not select Codex records it `NOT SELECTED` and proceeds
unaffected. The recipe being available is not the client being selected.

Codex's path is documented-correct, not verified. Do not record it PASS on the strength of the
documentation or of the file existing on disk.

**Windows support is intended, not validated.** No Windows host was available during
implementation, so every Windows/PowerShell row **for a selected client** is `PENDING EVIDENCE`.
This is the **OS axis**, not the client axis: an unselected client produces no OS rows at all. Claiming validated Windows
portability without a Windows run is the inferred-PASS defect the contract forbids everywhere else.

## Command equivalents

| Purpose | Bash / zsh | PowerShell |
|---|---|---|
| Copy without clobbering | `cp -rn SRC DST` | `Copy-Item SRC DST -Recurse -ErrorAction SilentlyContinue` (pre-check existence) |
| Find broken symlinks | `find -L DIR -type l` | `Get-ChildItem DIR -Recurse \| Where-Object { $_.LinkType -and -not (Test-Path $_.Target) }` |
| Resolve a symlink | `readlink -f PATH` | `(Get-Item PATH).Target` |
| Create a relative symlink | `ln -s TARGET LINK` | `New-Item -ItemType SymbolicLink -Path LINK -Target TARGET` |
| Is a path ignored | `git check-ignore --quiet PATH` | identical (`git` is the same binary) |
| Checksum | `shasum -a 256 FILE` | `Get-FileHash FILE -Algorithm SHA256` |

Prefer `git` itself wherever a question can be asked of Git — its behaviour is identical across
shells, which removes a whole class of divergence.

## Symlinks are capability-detected

Probe; do not infer from the platform name. A Windows host **with** Developer Mode can create
symlinks; a POSIX host on some mounted filesystems cannot.

On failure: copy real files, record `mode: "copy"` **with the reason**. Never degrade silently — an
unrecorded copy is later mistaken for canonical content.

## The word-splitting failure mode

A space-separated scalar loop splits differently across shells, and a path containing a space then
produces a **malformed artifact name** — a recorded failure of this contract.

Use explicit per-item commands, or a shell-native array:

```bash
for f in "${files[@]}"; do ...; done     # bash/zsh array, quoted
```
```powershell
foreach ($f in $files) { ... }            # PowerShell array
```

Never `for f in $files`.

## Paths

Repository-relative everywhere, POSIX-style in documentation. Never absolute, never
machine-specific — those leak a developer's home directory into a committed artifact.

## Recording what you could not run

Every combination you cannot exercise **for a selected client** is `PENDING EVIDENCE` with its
reason. Never PASS. Never blank. A client that was never selected is `NOT SELECTED` — no rows, no
artifacts, no blocking effect — and is never downgraded into `PENDING EVIDENCE`.
