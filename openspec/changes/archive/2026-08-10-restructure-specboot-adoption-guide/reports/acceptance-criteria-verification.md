# Acceptance Criteria Verification (Task 10.8)

**Re-run 6 — after the D4/D13 contract corrections (AR1, AR2) and the verify findings VF6–VF9.** Re-derived against the current tree; not carried forward. Link count **122**, all resolve. Approval markers **20**, of which the 11 real gates are unchanged and all 11 `file:line` references re-derived again (5 had shifted). Max working file **265** lines
(`01-prerequisites-and-install.md`); entry file **287**; run-log template **424** under the stated exception. Contract field labels **144**, correcting VF6's recorded 145.

**Task 10.9 no longer supports carrying agent evidence forward.** Two protected agent-facing
fragments changed — the entry file's failure prose and `00-conventions.md`'s step-contract field
table — because changing them *is* the AR1 correction. Agent attempt 2's PASS stands as evidence
about the state it tested and no further; task 16.24 requires a fresh attempt 3, and criterion
verdicts below that depend on agent navigability are marked accordingly.

**Resolved by agent attempt 3.** That fresh attempt ran against the state recorded here — entry
file SHA-256 `0405b6bd…`, 18,529 bytes, 287 lines — and returned **PASS** on tasks 16.24–16.26,
so the criteria depending on agent navigability are satisfied by attempt 3's evidence rather than
by attempt 2's. Nothing above is rewritten: attempt 2's PASS still covers only the state it read,
and the restoration is recorded as new evidence, not as a re-reading of old evidence. The one
limitation travelling with it: attempt 3 was scored by the implementing session, not
independently.

Each criterion from `enriched-work-item.md` § "Acceptance criteria", with the command that
checked it. `enriched-work-item.md` itself is unmodified — where a criterion is superseded,
the supersession is recorded here, not by editing that file.

| # | Criterion | Command / evidence | Verdict |
|---|---|---|---|
| 1 | Entry file at root, functions as entry point, no external reference breaks | `test -f SPECBOOT_ADOPTION_GUIDE.md`; link checker; `git diff` on the 4 referencing files | **PASS** |
| 2 | All 22 sections + 4 front-matter + 2 closing blocks mapped, zero unmapped | `reports/section-mapping.md` — **29/29 mapped, zero unmapped**. The criterion **requires 28** (4 front-matter + 22 numbered + 2 closing); the mapping **actually covers 29**, because implementation additionally mapped `F1` (Title, Scope, Purpose, Reference status, Status of the daily workflow), which the contract never required. Corrected under **RF1**: this row previously read "28/28", conflating required with mapped and undercounting the five `F1`–`F5` rows as four | **PASS** — the operative clause is **zero unmapped**, which holds, and holds more strongly at 29 than at 28 |
| 3 | No working file exceeds ~300 lines | `wc -l` — max working file 265 (`01-prerequisites-and-install.md`) | **PASS with one stated exception** — see below |
| 4 | Every executable step conforms to the step contract, with a stable step ID | 18 steps; **144** contract field labels (18 × 8 — correcting VF6's recorded 145; 3 further matches are prose outside the step contract); field order uniform across all 18; `Action` form distribution 10/6/1/1 matches D4's four forms, no step carrying more than one labeled prompt and none carrying a historical prompt | **PASS** — re-derived against the corrected four-form contract, which admits `ADOPT-08` (form 3) and `ADOPT-05B` (form 4) that the superseded two-form rule excluded (AR2) |
| 5 | All 11 approval gates survive, each bound to its specific mutation | `reports/invariant-reconciliation.md` — 11/11 mapped 1:1; total now **20** markers (11 preserved + 6 explanatory + 2 formalized + 1 new from D13); the additional explanatory mention is in the entry file's human operating model (D15) and is not a new gate | **PASS** |
| 6 | All 20 record blocks appear exactly once, in the run-log template, nowhere else | `grep -c '^### '` on the template = 20; no record heading elsewhere | **PASS** |
| 7 | Every `VERIFIED VERBATIM` block byte-identical, proven by diff vs `git show HEAD:` | `reports/verbatim-fidelity.txt` — 4/4 byte-identical, each exactly once | **PASS** |
| 8 | Every internal link resolves, verified mechanically | Link checker: **122** relative links, 0 broken (re-run 6; +15 from the per-step `On failure` form declarations and the entry file's three-way failure explanation) | **PASS** |
| 9 | CodeGraph conditionality expressed once as a testable predicate; permissions unreachable by any skip path | Decision node in `02-codegraph.md`; `ADOPT-05B` in its own file `03-client-permissions.md` | **PASS** |
| 10 | `08-daily-workflow.md` names six capabilities, keeps `PENDING END-TO-END VALIDATION`, states no gate semantic absent from a linked source | `reports/daily-workflow-pointer-verification.md` — 8/8 semantics traced to canonical sources | **PASS** |
| 11 | `README.md`, both `specboot-instructions.md` copies, `init.js` point at correct existing locations | `grep` + link checker + `test -f` | **PASS in this repository, with a recorded limitation** — see "Criterion 11 — the distributed-template limitation" below (AR4) |
| 12 | Both `specboot-instructions.md` copies in sync except the known image-URL difference | `diff` — exactly one hunk, line 204 | **PASS** |
| 13 | All content in English | Review of all 14 new files | **PASS** |
| 14 | `git diff --stat` confined to the guide, `specboot-adoption/**`, and the reference-repair files; `package.json`, `.gitignore`, permission files provably unchanged | `git diff --exit-code` on 8 paths (all UNCHANGED); `git diff --stat` = 4 files | **PASS** |

## Criterion 3 — the stated exception

`run-template/ADOPTION-RUN-LOG.template.md` is **424 lines**, above the ~300 guideline. This
is recorded as a deliberate exception rather than reported as a pass.

**Why it is not split.** The ~300-line guideline exists to bound the context an agent loads
*to execute a step* (design D2, and the agent-context goal). The run-log template is never
loaded to execute a step: it is copied once per adoption run, and thereafter only the block
for the current step is read or written. Splitting it into per-phase logs would produce
several files a single run must keep synchronized, and would break the step-state resume
table — the one thing that must be readable in one place for `ADOPT-nn` resumption to work.

**What it is made of.** 20 preserved record blocks (the substance, unchanged from source),
the resume checklist table, and per-block headings. There is no prose to trim; reducing it
would mean deleting evidence fields.

Every file an agent actually loads per step is within the guideline:

| File | Lines |
|---|---|
| `SPECBOOT_ADOPTION_GUIDE.md` (entry) | 287 |
| `01-prerequisites-and-install.md` | 265 |
| `04-context-and-openspec.md` | 264 |
| `03-client-permissions.md` | 254 |
| `05-agents-and-skills.md` | 245 |
| `06-adapters-and-discovery.md` | 244 |
| `00-conventions.md` | 208 |
| `22-troubleshooting.md` | 193 |
| `07-baseline-and-checkpoint.md` | 189 |
| `history/prompt-inventory.md` | 179 |
| `02-codegraph.md` | 175 |
| `history/reference-run-java-maven.md` | 111 |
| `08-daily-workflow.md` | 100 |
| `19-permissions-policy.md` | 84 |

Worst-case per-step load under the corrected D12 working set is the **complete three-file set**:
`00-conventions.md` (**208**) + the largest phase file (**265**, `01-prerequisites-and-install.md`)
+ the run log (**424**) = **897 lines**, against the pre-restructure 2,045-line single file — the
comparison that matters. Corrected under AR8 / VF10: the operands previously read 160 and 262,
stale against this file's own line-count table above, and the run log was named but its 424 lines
were omitted from the figure, which understated the working set the D12 decision actually defines.
The run log remains a per-run artifact the operator fills, not guide prose; it is counted here
because D12 puts it in the per-step working set, and a worst case that omits a member of that set
is not a worst case.

Reproduce: `wc -l specboot-adoption/00-conventions.md specboot-adoption/01-prerequisites-and-install.md specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md`

## Superseded criterion

`enriched-work-item.md`'s "Testing and verification expectations" describes the agent check
as: "a fresh session given only the entry file must correctly identify the first step, its
approval gate, and which file to load next". That narrower dry-run is **superseded** by the
expanded bounded acceptance gates in `tasks.md` group 16 (design D11), agreed after the
enriched artifact was written. The enriched artifact is preserved byte-identically as the
historical input record; the supersession is recorded here.

## Criterion 11 — the distributed-template limitation (task 9.7, finding AR4)

`packages/specboot/template/` contains **only** `ai-specs/` and `docs/`. It ships neither
`SPECBOOT_ADOPTION_GUIDE.md` nor `specboot-adoption/`, by this change's own decision that the
guide stays undistributed.

The group-9 repair therefore leaves `packages/specboot/template/ai-specs/specboot-instructions.md`
pointing at `specboot-adoption/03-client-permissions.md` and
`specboot-adoption/19-permissions-policy.md` — paths that **do not resolve in an adopting
repository**.

**This is not a regression.** The text those pointers replaced cited the same undistributed guide
by section number and was equally unresolvable there; the new text additionally names
`SPECBOOT_ADOPTION_GUIDE.md` as the entry point, which is marginally more findable. The
correction here is to the *evidence*, not the file: criterion 11's `test -f` and link-checker
proof was gathered in this repository, which is not the context where the template copy is read.

**Not fixed by adding the guide to the template** — the proposal excludes that explicitly. The
limitation is recorded so a future reader does not mistake criterion 11's PASS for a guarantee
that holds after `npx @lidr/lidr-specboot` runs elsewhere.

## Reproduction inventory (task 10.14, design D19)

Every derived-figure block in this file, with the command that reproduces it. **The figure is a
point-in-time snapshot of a tree; the command is the durable artifact.** Every command below was
**executed** against the working tree at the time this inventory was written — not transcribed —
and its output compared against the persisted figure. All commands run from the repository root.

**Scoping rule, stated so it cannot be used as a loophole.** A block is `CURRENT` when it asserts a
property of the present tree, and it must reproduce exactly. A block is `HISTORICAL` when it
asserts a property of a superseded tree — a prior re-run column, or a state fingerprint recorded to
scope a past verdict. A `HISTORICAL` block is **not reproducible by construction** and is preserved
as record; it still gets an inventory entry, and it may never be silently updated to match the
present tree, because doing so would destroy the evidence about the state it scopes.

**Literal-command standard (design D19, added after AR14).** Every `CURRENT` row's **Command** field
either contains the complete literal executable command, copy-paste runnable from the repository
root exactly as written, or names exactly **one** command ID that resolves **one-to-one** to a
fenced block in "Command blocks" below. No ellipses, placeholders, pseudo-commands, prose
stand-ins, vague cross-references, or unstated manual filtering. A row's commands must prove
**every** figure that row claims. Abbreviation stays legal in the **Figures** column — a truncated
hash names a value the command prints in full — and never in the Command column.

| # | Section | Figures | Command | Exit | Comparison |
|---|---|---|---|---|---|
| A1 | Re-run 6 header | 122 links · 20 markers · 265 max working file · 287 entry · 424 run-log · 144 field labels | `CMD-A1` | 0 | **AGREES** (all six) — re-executed under AR14 |
| A2 | Attempt-3 state paragraph | entry SHA-256 `0405b6bd…` · 18,529 bytes · 287 lines | `shasum -a 256 SPECBOOT_ADOPTION_GUIDE.md; wc -lc SPECBOOT_ADOPTION_GUIDE.md` | 0 | **AGREES** — state unchanged, so attempt 3's evidence still covers the current tree |
| A3 | Criterion 2 | 29 mapped / 29 with a destination / 0 unmapped (28 required) | `grep -cE '^\| F[0-9]+ \|' openspec/changes/restructure-specboot-adoption-guide/reports/section-mapping.md` = 5; `grep -cE '^\| [0-9]+[ab]? \|' openspec/changes/restructure-specboot-adoption-guide/reports/section-mapping.md` = 23 rows / 22 sections; `grep -cE '^\| C[0-9]+ \|' openspec/changes/restructure-specboot-adoption-guide/reports/section-mapping.md` = 2 | 0 | **DISAGREED → corrected as RF1**, then re-run: **AGREES**. Re-executed under AR14 with full paths in place of the ellipsis |
| A4 | Criterion 4 | 18 steps · 144 contract field labels · 3 further prose matches · `Action` forms 10/6/1/1 | `CMD-A4` | 0 | **AGREES** — 18 steps, 144 labels, 147 across the guide set (difference 3), forms shell 10 / prompt 6 / gated 1 (`ADOPT-08`) / written 1 (`ADOPT-05B`). Re-executed under AR14; the prior entry proved only the 144 |
| A5 | Criterion 5 | 20 markers · 11/11 gates · 11 + 6 + 2 + 1 | `CMD-A5` | 0 | **AGREES** — 20 markers; all 11 gate `file:line` refs resolve to a live marker; decomposition sums to 20. Re-executed under AR14 with the 11 `sed` commands written out |
| A6 | Criterion 6 | 20 record blocks | `grep -c '^### ' specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md` | 0 | **AGREES** |
| A7 | Criterion 7 | 4/4 byte-identical, each exactly once | `CMD-A7` | 0 | **AGREES** — HEAD source lines 586 / 1757 / 1774 / 1790 map to `prompt-inventory.md` lines 57 / 74 / 90 / 153; SHA-256 equal on all four; occurrences 1 each. Re-executed under AR14 |
| A8 | Criterion 8 | 122 internal links, 0 broken | `CMD-A8` | 0 | **AGREES** — 15 files, 122 internal links, 0 broken. Re-executed under AR14; the prior entry named a checker it did not supply |
| A9 | Criterion 10 | 8 semantics traced | `CMD-A9` | 0 | **AGREES** — 8 semantics rows; `sync-then-archive` 0 and `validate --strict` 0 in the reduced file, which is what exposed AR11: 2 of the 8 are delegated, not stated there. Re-executed under AR14 |
| A10 | Criterion 12 | exactly one diff hunk, line 204 | `diff ai-specs/specboot-instructions.md packages/specboot/template/ai-specs/specboot-instructions.md` | 1 (diff found, expected) | **AGREES** — one hunk, `204c204`, the known image-URL difference |
| A11 | Criterion 14 | 8 paths UNCHANGED · `git diff --stat` = 4 files | `CMD-A11` | 0 | **AGREES** — 8/8 exit 0; `4 files changed, 190 insertions(+), 1948 deletions(-)`. Re-executed under AR14 with all 8 paths written out |
| A12 | Criterion 3 exception | run-log template 424 lines | `wc -l specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md` | 0 | **AGREES** |
| A13 | Per-file line-count table (14 rows) | 287 / 265 / 264 / 254 / 245 / 244 / 208 / 193 / 189 / 179 / 175 / 111 / 100 / 84 | `wc -l SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/*.md specboot-adoption/history/*.md` | 0 | **DISAGREED → corrected as RF2**, then re-run: **AGREES** — 14 files, 14 values. The prior command also globbed `run-template/`, yielding 15 values for a 14-row table; the run-log template is inventoried separately at A12 |
| A14 | Worst-case per-step load | 208 + 265 + 424 = 897, against 2,045 | `wc -l specboot-adoption/00-conventions.md specboot-adoption/01-prerequisites-and-install.md specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md`; `git show HEAD:SPECBOOT_ADOPTION_GUIDE.md \| wc -l` = 2045 | 0 | **DISAGREED → corrected as AR8 / VF10** (was 160 + 262, run log omitted), then re-run: **AGREES** |
| A15 | Criterion 11 limitation | template ships only `ai-specs/` and `docs/` | `ls packages/specboot/template/` | 0 | **AGREES** — neither the guide nor `specboot-adoption/` is shipped |

**Result: 15 of 15 derived-figure blocks inventoried; 0 without an entry; 0 remaining disagreements.**
Three blocks disagreed when first run — A3 (RF1), A13 (RF2), and A14 (AR8 / VF10) — and all three
were corrected under task 10.16 and the command re-run against the corrected text. None was
reconciled by editing the inventory to match the figure.

**Re-executed in full under AR14.** Every command above was run again from the repository root at
the time of this correction, and its actual output and exit status compared against the persisted
figure. Eight rows carried non-literal commands and were rewritten to the literal standard: `A1`,
`A3`, `A4`, `A5`, `A7`, `A8`, `A9`, `A11`. `A2` was **not** rewritten — its abbreviated hash sits in
the Figures column, where abbreviation is legal. `A6`, `A10`, `A12`, `A14`, `A15` were already
literal and are left untouched. `A13` was not on AR14's list and was found by **execution**: see RF2.

## Command blocks

Each block is copy-paste executable from the repository root and resolves one-to-one from the
Command column above.

`CMD-A1` — Re-run 6 header, six figures, explicit ordered sequence:

```bash
grep -roh '\[HUMAN APPROVAL REQUIRED\]' SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
wc -l < SPECBOOT_ADOPTION_GUIDE.md
wc -l < specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md
wc -l specboot-adoption/0[1-7]*.md | grep -v total | sort -rn | head -1
grep -hcE '^\*\*(Condition|Purpose|Preconditions|Action|Approval gate|Validation|Evidence to record|On failure):\*\*' specboot-adoption/0[1-7]*.md | awk '{s+=$1} END {print s}'
# figure 6 (122 internal links, 0 broken): run CMD-A8 below
```

Output: `20`; `287`; `424`; `265 specboot-adoption/01-prerequisites-and-install.md`; `144`. Exit `0`.

`CMD-A4` — Criterion 4, four figures:

```bash
python3 - <<'PY'
import re,glob
FIELDS=["Condition","Purpose","Preconditions","Action","Approval gate","Validation","Evidence to record","On failure"]
files=sorted(glob.glob('specboot-adoption/0[1-7]*.md'))
steps=0; labels=0; forms={'shell':[],'prompt':[],'gated':[],'written':[]}
for f in files:
    lines=open(f,encoding='utf-8').read().split('\n')
    idx=[i for i,l in enumerate(lines) if re.match(r'^## `ADOPT-[0-9]+B?`',l)]
    steps+=len(idx)
    for n,i in enumerate(idx):
        end=idx[n+1] if n+1<len(idx) else len(lines)
        sid=re.search(r'ADOPT-[0-9]+B?',lines[i]).group(0); body=lines[i:end]
        labels+=len([l for l in body if re.match(r'^\*\*('+'|'.join(FIELDS)+r'):\*\*',l)])
        a=[j for j,l in enumerate(body) if re.match(r'^\*\*Action:\*\*',l)][0]
        g=[j for j,l in enumerate(body) if re.match(r'^\*\*Approval gate:\*\*',l)][0]
        act=body[a:g]
        lab=len([l for l in act if re.match(r'^`(CANONICAL|HISTORICAL|LIVE)',l.strip())])
        sh=len([l for l in act if l.startswith('```bash')])
        if lab==0 and sid!='ADOPT-05B': forms['shell'].append(sid)
        elif lab==0: forms['written'].append(sid)
        elif sh>0: forms['gated'].append(sid)
        else: forms['prompt'].append(sid)
allmd=['SPECBOOT_ADOPTION_GUIDE.md']+sorted(glob.glob('specboot-adoption/*.md'))+sorted(glob.glob('specboot-adoption/*/*.md'))
tot=sum(len([l for l in open(f,encoding='utf-8').read().split('\n') if re.match(r'^\*\*('+'|'.join(FIELDS)+r'):\*\*',l)]) for f in allmd)
print("steps:",steps); print("labels:",labels); print("guide-set matches:",tot,"further prose:",tot-labels)
print("forms: shell=%d prompt=%d gated=%s written=%s"%(len(forms['shell']),len(forms['prompt']),forms['gated'],forms['written']))
PY
```

Output: `steps: 18`; `labels: 144`; `guide-set matches: 147 further prose: 3`;
`forms: shell=10 prompt=6 gated=['ADOPT-08'] written=['ADOPT-05B']`. Exit `0`.

`CMD-A5` — Criterion 5, marker count plus all 11 preserved gate references:

```bash
grep -roh '\[HUMAN APPROVAL REQUIRED\]' SPECBOOT_ADOPTION_GUIDE.md specboot-adoption/ | wc -l
sed -n '77p'  specboot-adoption/01-prerequisites-and-install.md
sed -n '137p' specboot-adoption/01-prerequisites-and-install.md
sed -n '236p' specboot-adoption/01-prerequisites-and-install.md
sed -n '74p'  specboot-adoption/02-codegraph.md
sed -n '144p' specboot-adoption/02-codegraph.md
sed -n '178p' specboot-adoption/03-client-permissions.md
sed -n '76p'  specboot-adoption/04-context-and-openspec.md
sed -n '56p'  specboot-adoption/06-adapters-and-discovery.md
sed -n '88p'  specboot-adoption/06-adapters-and-discovery.md
sed -n '156p' specboot-adoption/07-baseline-and-checkpoint.md
sed -n '137p' SPECBOOT_ADOPTION_GUIDE.md
```

Output: `20`, then 11 lines each containing a live `[HUMAN APPROVAL REQUIRED]` marker. Exit `0`.

`CMD-A7` — Criterion 7, verbatim fidelity against `HEAD`:

```bash
python3 - <<'PY'
import subprocess,hashlib
head=subprocess.run(['git','show','HEAD:SPECBOOT_ADOPTION_GUIDE.md'],capture_output=True,text=True).stdout.split('\n')
new=open('specboot-adoption/history/prompt-inventory.md',encoding='utf-8').read().split('\n')
def blocks(lines):
    out=[]
    for i,l in enumerate(lines):
        if l.strip()=='`HISTORICAL PROMPT — VERIFIED VERBATIM`':
            j=i+1
            while j<len(lines) and not lines[j].startswith('```'): j+=1
            k=j+1
            while k<len(lines) and not lines[k].startswith('```'): k+=1
            out.append((i+1,'\n'.join(lines[j+1:k])))
    return out
h,n=blocks(head),blocks(new)
print("HEAD lines:",[x[0] for x in h]); print("new lines:",[x[0] for x in n])
ok=0
for ln,b in h:
    d=hashlib.sha256(b.encode()).hexdigest()
    c=sum(1 for _,b2 in n if hashlib.sha256(b2.encode()).hexdigest()==d)
    print(f"HEAD:{ln} sha={d[:16]} occurrences={c}")
    ok+= (c==1)
print(f"byte-identical, exactly once: {ok}/{len(h)}")
PY
```

Output: `HEAD lines: [586, 1757, 1774, 1790]`; `new lines: [57, 74, 90, 153]`; four `occurrences=1`
lines; `byte-identical, exactly once: 4/4`. Exit `0`.

`CMD-A8` — Criterion 8, link and anchor checker (code fences stripped, anchors resolved per file):

```bash
python3 - <<'PY'
import os,re,sys
files=['SPECBOOT_ADOPTION_GUIDE.md']
for d,_,fs in os.walk('specboot-adoption'):
    files+=[os.path.join(d,f) for f in sorted(fs) if f.endswith('.md')]
files=sorted(set(files))
def strip_fences(t):
    out=[];inf=False
    for l in t.split('\n'):
        if l.startswith('```'): inf=not inf; out.append(''); continue
        out.append('' if inf else l)
    return out
def slug(h):
    s=re.sub(r'^#+\s*','',h).strip().lower()
    s=re.sub(r'[^\w\s-]','',s); return re.sub(r'\s+','-',s)
heads={f:[slug(l) for l in strip_fences(open(f,encoding='utf-8').read()) if re.match(r'^#{1,6}\s',l)] for f in files}
link=re.compile(r'\[([^\]]*)\]\(([^)]+)\)')
tot=0;broken=[]
for f in files:
    base=os.path.dirname(f)
    for i,l in enumerate(strip_fences(open(f,encoding='utf-8').read()),1):
        for m in link.finditer(l):
            t=m.group(2).strip()
            if t.startswith(('http://','https://','mailto:')): continue
            tot+=1
            p,_,anc=t.partition('#')
            tgt=f if p=='' else os.path.normpath(os.path.join(base,p))
            if p and not os.path.exists(tgt): broken.append((f,i,t,'path missing')); continue
            if anc and tgt in heads and anc not in heads[tgt]: broken.append((f,i,t,'anchor missing'))
print("files:",len(files),"internal links:",tot,"broken:",len(broken))
for b in broken: print(" ",b)
sys.exit(1 if broken else 0)
PY
```

Output: `files: 15 internal links: 122 broken: 0`. Exit `0`.

`CMD-A9` — Criterion 10, eight semantics and the two delegated ones:

```bash
awk 'f&&/^\|/{n++} /Gate semantic traced/{f=1} f&&!/^\|/{exit} END{print "semantics rows:",n-1}' openspec/changes/restructure-specboot-adoption-guide/reports/daily-workflow-pointer-verification.md
grep -c 'sync-then-archive' specboot-adoption/08-daily-workflow.md
grep -c 'validate --strict' specboot-adoption/08-daily-workflow.md
```

Output: `semantics rows: 8`; `0`; `0`. Exit `0`.

`CMD-A11` — Criterion 14, all eight untouched paths written out, plus the diff scope:

```bash
git diff --exit-code --quiet -- packages/specboot/package.json;      echo "packages/specboot/package.json=$?"
git diff --exit-code --quiet -- .gitignore;                          echo ".gitignore=$?"
git diff --exit-code --quiet -- .claude/settings.json;               echo ".claude/settings.json=$?"
git diff --exit-code --quiet -- .kiro/settings/permissions.yaml;     echo ".kiro/settings/permissions.yaml=$?"
git diff --exit-code --quiet -- openspec/config.yaml;                echo "openspec/config.yaml=$?"
git diff --exit-code --quiet -- openspec/specs;                      echo "openspec/specs=$?"
git diff --exit-code --quiet -- ai-specs/agents;                     echo "ai-specs/agents=$?"
git diff --exit-code --quiet -- ai-specs/skills;                     echo "ai-specs/skills=$?"
git diff --stat | tail -1
```

Output: eight `=0` lines, then `4 files changed, 190 insertions(+), 1948 deletions(-)`. Exit `0`.
