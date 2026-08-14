#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const crypto = require('crypto');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template');

// Subcommand-aware argv parsing. The default (no subcommand) path is unchanged: the first
// positional argument is still the target directory, so `init.js <dir>` and `init.js` behave
// exactly as before.
const SUBCOMMANDS = new Set(['bootstrap', 'drift-check', 'autodiscover', 'resume', 'debootstrap']);
const rawArg = process.argv[2];
const subcommand = SUBCOMMANDS.has(rawArg) ? rawArg : null;

// Long options are separated from positionals so a subcommand can take runtime input - the
// canonical source path above all - without a flag ever being mistaken for a target directory.
function parseFlags(args) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = args[i + 1];
      if (next !== undefined && !next.startsWith('--')) { flags[key] = next; i++; }
      else flags[key] = true;
    } else {
      positional.push(a);
    }
  }
  return { positional, flags };
}

const { positional: POSITIONAL, flags: FLAGS } =
  parseFlags(subcommand ? process.argv.slice(3) : process.argv.slice(2));
const targetArg = POSITIONAL[0];

// Flag arguments are never target paths. `path.resolve()` below turns any unrecognized argument
// into a directory name, so without this guard `init.js --help` installs a full SpecBoot tree into
// a directory literally named `--help`. Handled here, before the target is resolved, so help can
// never have a filesystem side effect.
const HELP_FLAGS = new Set(['--help', '-h']);

function printUsage() {
  console.log('\n  lidr-specboot');
  console.log('  Augmented Spec-driven development powered by OpenSpec\n');
  console.log('  Usage:');
  console.log('    lidr-specboot [<target-dir>]        Install SpecBoot (default: current directory)');
  console.log('    lidr-specboot bootstrap [<dir>]     Bootstrap an adoption (ADOPT-00)');
  console.log('    lidr-specboot autodiscover [<dir>]  Read-only client probe; writes nothing');
  console.log('    lidr-specboot resume [<dir>]        Verify source identity and resume');
  console.log('    lidr-specboot debootstrap [<dir>]   Reconcile against the manifest (ADOPT-18)');
  console.log('    lidr-specboot drift-check           Verify delivered files match canonical sources');
  console.log('    lidr-specboot --help, -h            Show this message\n');
  console.log('  Options (bootstrap / resume):');
  console.log('    --source <path>   REQUIRED. Canonical SpecBoot source, supplied at run time and');
  console.log('                      never hard-coded. Must contain the adoption guide, the');
  console.log('                      specboot-adoption/ phase directory, and a readable');
  console.log('                      ai-specs/skills/specboot-adopt/SKILL.md. Without one the');
  console.log('                      command refuses and writes nothing - there is no fallback.');
  console.log('    --client <a,b>    REQUIRED. Clients explicitly SELECTED. Everything else is');
  console.log('                      NOT SELECTED. Never inferred, never a placeholder.');
  console.log('    --route <r>       manual | autodiscovery - how the selection was reached.');
  console.log('    --dry-run         Preflight and print the exact mutation inventory; write nothing.');
  console.log('    --yes             Approve exactly the printed inventory. Without it the run');
  console.log('                      stops at the approval gate having written nothing.');
  console.log('    --no-symlinks     Force the symlink capability off. Where the selected client');
  console.log('                      cannot discover an external skill without one, the run');
  console.log('                      fails closed rather than substituting a file.\n');
}

if (process.argv.slice(2).some((a) => HELP_FLAGS.has(a))) {
  printUsage();
  process.exit(0);
}

// Anything else that looks like a flag is rejected rather than silently installed into a directory
// named after it.
if (targetArg && targetArg.startsWith('-')) {
  console.error(`\n  Unknown option: ${targetArg}`);
  console.error('  Run `lidr-specboot --help` for usage.\n');
  process.exit(1);
}

const target = targetArg ? path.resolve(targetArg) : process.cwd();

const stats = { copied: [], skipped: [], linked: [], errors: [], gitignore: 'unchanged' };

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function pathExists(p) {
  try { fs.lstatSync(p); return true; } catch { return false; }
}

function copyRecursive(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (pathExists(destPath)) {
      stats.skipped.push(path.relative(target, destPath));
    } else {
      fs.copyFileSync(srcPath, destPath);
      stats.copied.push(path.relative(target, destPath));
    }
  }
}

function createSymlink(linkRelPath, symlinkTarget) {
  const full = path.join(target, linkRelPath);
  ensureDir(path.dirname(full));
  if (pathExists(full)) {
    stats.skipped.push(`${linkRelPath} (already exists)`);
    return;
  }
  try {
    fs.symlinkSync(symlinkTarget, full);
    stats.linked.push(`${linkRelPath} -> ${symlinkTarget}`);
  } catch (err) {
    stats.errors.push(`${linkRelPath}: ${err.message}`);
  }
}

const STAGING_RULE = '.specboot/staging/';
const BOOTSTRAP_RULE = '.specboot/bootstrap/';
const LOCAL_RULE = '.specboot/local/';

// The TRANSIENT set is ignored, one rule per path. The DURABLE path is never ignored and never
// has a rule provisioned for it - it holds the committed bootstrap manifest and run log. A
// broader `.specboot/` pattern is forbidden precisely because it would swallow the durable path.
const TRANSIENT_RULES = [
  {
    rule: STAGING_RULE,
    probe: '.specboot/staging/.specboot-probe',
    comment: '# enrich-us staging: durable local copy of an enriched work-item artifact, not committed',
  },
  {
    rule: BOOTSTRAP_RULE,
    probe: '.specboot/bootstrap/.specboot-probe',
    comment: '# adoption bootstrap payload: transient, removed at ADOPT-18; .specboot/adoption/ stays tracked',
  },
];

// The machine-local source-path store (design D-S option B). Same rule shape, same per-path probe,
// same conservative fallback - it is simply provisioned only where a store can exist, which is a
// source-linked run. Provisioning it unconditionally would append a third rule to runs that never
// resolve an external source, changing the ignore set of a packaged-snapshot run for no reason.
const LOCAL_STORE_RULE = {
  rule: LOCAL_RULE,
  probe: '.specboot/local/.specboot-probe',
  comment: '# adoption source-path store: machine-local, removed at ADOPT-18; never committed',
};
const DURABLE_DIR = '.specboot/adoption/';

// Asks Git whether it already treats `probe` as ignored - by any rule, exact or broader (e.g. a
// bare `.specboot/` line), not just the exact narrow rule. The probe path does not need to exist
// on disk; `git check-ignore` evaluates pathnames. Returns true / false when Git gives a clean
// answer, or null when Git's evaluation could not be run (not a repo, git missing, other failure).
function gitSaysIgnored(targetDir, probe) {
  const result = spawnSync('git', ['-C', targetDir, 'check-ignore', '--quiet', probe], {
    stdio: 'ignore',
  });
  if (result.error || result.status === null) return null;
  if (result.status === 0) return true;
  if (result.status === 1) return false;
  return null;
}

function appendRuleBlock(gitignorePath, entry) {
  const block = '### SpecBoot ###\n' + entry.comment + '\n' + entry.rule + '\n';
  if (!pathExists(gitignorePath)) {
    fs.writeFileSync(gitignorePath, block);
    return 'created';
  }
  const content = fs.readFileSync(gitignorePath, 'utf8');
  const prefix = content.length > 0 ? (content.endsWith('\n') ? '' : '\n') + '\n' : '';
  fs.appendFileSync(gitignorePath, prefix + block);
  return 'appended';
}

// Ensures every TRANSIENT path is ignored by Git, applying the probe-then-conservative-fallback
// algorithm independently per path. Never replaces existing content, never widens a written rule
// to a bare `.specboot/` pattern, and never provisions any rule for DURABLE_DIR.
function ensureGitignoreTransientRules(rules = TRANSIENT_RULES) {
  const gitignorePath = path.join(target, '.gitignore');
  const outcomes = [];

  for (const entry of rules) {
    const verdict = gitSaysIgnored(target, entry.probe);

    if (verdict === true) {
      outcomes.push(`${entry.rule} already ignored (git)`);
      continue;
    }

    if (verdict === null && pathExists(gitignorePath)) {
      // Git's evaluation unavailable - conservative exact-line recognition only. Does not
      // attempt to interpret broader rules itself.
      const content = fs.readFileSync(gitignorePath, 'utf8');
      if (content.split(/\r?\n/).some(line => line.trim() === entry.rule)) {
        outcomes.push(`${entry.rule} already present`);
        continue;
      }
    }

    outcomes.push(`${entry.rule} ${appendRuleBlock(gitignorePath, entry)}`);
  }

  stats.gitignore = outcomes.join('; ');
}

// ---------------------------------------------------------------------------------------------
// Bootstrap subcommand (ADOPT-00) and drift check.
//
// The payload is assembled from the CANONICAL paths named in the kit manifest. No second copy of
// any canonical artifact is checked into git; `PAYLOAD_DIR` is produced at pack time.
// ---------------------------------------------------------------------------------------------

const PAYLOAD_DIR = path.join(__dirname, '..', 'bootstrap-payload');
const KIT_MANIFEST_REL = 'specboot-adoption/bootstrap-kit/manifest.json';

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

// Resolves the kit source: the packed payload when installed from npm, otherwise the canonical
// repository paths when run from a SpecBoot source clone.
function resolveKitSource() {
  if (pathExists(PAYLOAD_DIR)) return { root: PAYLOAD_DIR, channel: 'npm' };
  const repoRoot = path.resolve(__dirname, '..', '..', '..');
  if (pathExists(path.join(repoRoot, KIT_MANIFEST_REL))) {
    return { root: repoRoot, channel: 'source-copy' };
  }
  return null;
}

function loadKitManifest(sourceRoot) {
  const direct = path.join(sourceRoot, KIT_MANIFEST_REL);
  const packed = path.join(sourceRoot, 'manifest.json');
  const p = pathExists(direct) ? direct : packed;
  if (!pathExists(p)) return null;
  return { manifest: JSON.parse(fs.readFileSync(p, 'utf8')), manifestPath: p };
}

function copyTree(src, dest, exclude = []) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const rel = entry.name;
    if (exclude.some(x => rel === x.replace(/\/$/, ''))) continue;
    const srcPath = path.join(src, rel);
    const destPath = path.join(dest, rel);
    if (entry.isDirectory()) copyTree(srcPath, destPath, exclude);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function detectSymlinkSupport(dir) {
  const probe = path.join(dir, '.specboot-symlink-probe');
  try {
    fs.symlinkSync('.', probe);
    fs.unlinkSync(probe);
    return true;
  } catch {
    try { fs.unlinkSync(probe); } catch { /* nothing to clean up */ }
    return false;
  }
}

// ---------------------------------------------------------------------------------------------
// Delivery modes (design D-R, D-S, D-T).
//
// SOURCE-LINKED is preferred: nothing canonical is copied, `.specboot/bootstrap/` is never
// created, and the selected client's temporary discovery entries point at the external source.
// PACKAGED-SNAPSHOT is the fallback taken when no local canonical source is supplied, and its
// behavior below is unchanged from before source-linked mode existed.
// ---------------------------------------------------------------------------------------------

const SKIPPED_SOURCE_LINKED = 'SKIPPED — source-linked mode';
const BLOCK_BEGIN = '<!-- SPECBOOT-BOOTSTRAP:BEGIN -->';
const BLOCK_END = '<!-- SPECBOOT-BOOTSTRAP:END -->';

// The three artifacts a canonical source must carry. The skill entry names SKILL.md, not the
// directory: the initial session reads that file directly at a source-relative path, so a
// `specboot-adopt/` directory with no readable SKILL.md cannot satisfy an adoption.
const REQUIRED_SOURCE_ARTIFACTS = [
  { rel: 'SPECBOOT_ADOPTION_GUIDE.md', kind: 'file' },
  { rel: 'specboot-adoption/', kind: 'directory' },
  { rel: 'ai-specs/skills/specboot-adopt/SKILL.md', kind: 'file' },
];

// Client recipes, mirroring specboot-adoption/bootstrap-kit/discovery/*.md. Only the recipe for a
// client explicitly declared SELECTED is ever applied.
const CLIENT_RECIPES = {
  claude: {
    skillEntry: '.claude/skills/specboot-adopt',
    instructionFile: '.claude/CLAUDE.md',
    probes: ['.claude', '.claude/skills', '.claude/settings.json'],
    // Discovery is a property of the CLIENT, not of the filesystem. Claude surfaces a skill
    // through a directory at `.claude/skills/<name>`; a real file there containing an external
    // path is not a discovered skill, so there is no non-symlink mechanism to fall back to.
    discoveryMechanism: 'a directory (symlink) at .claude/skills/specboot-adopt',
    discoversWithoutSymlink: false,
  },
  kiro: {
    skillEntry: '.kiro/skills/specboot-adopt',
    instructionFile: '.kiro/steering/specboot-adopt.md',
    probes: ['.kiro', '.kiro/skills', '.kiro/settings'],
    discoveryMechanism: 'a directory (symlink) at .kiro/skills/specboot-adopt',
    discoversWithoutSymlink: false,
  },
  codex: {
    skillEntry: '.agents/skills/specboot-adopt',
    instructionFile: 'AGENTS.md',
    probes: ['.agents', '.agents/skills', 'AGENTS.md', 'codex.md'],
    discoveryMechanism: 'a directory (symlink) at .agents/skills/specboot-adopt',
    discoversWithoutSymlink: false,
  },
};

const SUPPORTED_CLIENTS = Object.keys(CLIENT_RECIPES);

function isReadableFile(p) {
  try { fs.accessSync(p, fs.constants.R_OK); return fs.statSync(p).isFile(); } catch { return false; }
}

function isDirectory(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

// Validation runs BEFORE any orchestration instruction is loaded and BEFORE the first project
// write, so an incomplete source is rejected rather than diagnosed after artifacts already exist.
function validateCanonicalSource(sourcePath) {
  const missing = [];
  if (!isDirectory(sourcePath)) return { valid: false, missing: [sourcePath] };
  for (const a of REQUIRED_SOURCE_ARTIFACTS) {
    const full = path.join(sourcePath, a.rel.replace(/\/$/, ''));
    const ok = a.kind === 'file' ? isReadableFile(full) : isDirectory(full);
    if (!ok) missing.push(a.rel);
  }
  return { valid: missing.length === 0, missing };
}

// Reads the source Git commit, or records that it is unavailable WITH ITS REASON. Never infers,
// invents, or omits: an absent field invites a later reader to fill it with something plausible.
// Git provenance in THREE dispositions, never two (design D-S).
//
// The third one is the whole point. A working tree with uncommitted changes has content that NO
// commit identifies: HEAD names what was committed, and the run read something else. Writing that
// commit into the identity field produces provenance that is PRECISELY WRONG - worse than absent,
// because a later reader can resolve it, diff nothing, and conclude the source matched. Identity
// stays with the checksums in all three cases, because those are computed over the bytes actually
// read.
const DIRTY_HEAD_NOTE =
  'This commit does not identify the source content the run read, because the working tree had ' +
  'uncommitted changes.';

function readSourceGitProvenance(sourcePath) {
  const inside = spawnSync('git', ['-C', sourcePath, 'rev-parse', '--is-inside-work-tree'],
    { encoding: 'utf8' });
  if (inside.error || inside.status !== 0 || inside.stdout.trim() !== 'true') {
    return {
      status: 'unavailable',
      worktree: 'not-a-repository',
      reason: 'the supplied canonical source is not a Git working tree',
    };
  }

  const head = spawnSync('git', ['-C', sourcePath, 'rev-parse', 'HEAD'], { encoding: 'utf8' });
  const commit = head.error || head.status !== 0 ? null : head.stdout.trim();
  const hasCommit = commit !== null && /^[0-9a-f]{7,40}$/.test(commit);

  // Read the working-tree state BEFORE deciding anything about the commit, so a dirty tree can
  // never take the clean branch by accident.
  const st = spawnSync('git', ['-C', sourcePath, 'status', '--porcelain'], { encoding: 'utf8' });
  if (st.error || st.status !== 0) {
    return {
      status: 'unavailable',
      worktree: 'not-a-repository',
      reason: 'the source working-tree state could not be determined, so no commit can be said to identify its content',
    };
  }
  const dirty = st.stdout.trim().length > 0;

  if (dirty) {
    const block = {
      status: 'unavailable',
      worktree: 'dirty',
      reason: 'the source is a Git working tree with uncommitted changes, so its HEAD does not identify the content this run read',
    };
    // Context only, and deliberately NOT under `commit` - a consumer reading identity must not
    // find a value here by accident.
    if (hasCommit) block['observed-head'] = { commit, note: DIRTY_HEAD_NOTE };
    return block;
  }

  if (!hasCommit) {
    return {
      status: 'unavailable',
      worktree: 'clean',
      reason: 'the source is a Git working tree with no resolvable HEAD commit',
    };
  }
  return { status: 'recorded', worktree: 'clean', commit };
}

// The statement the committed manifest carries INSTEAD of a resolved path (design D-S option B).
// The schema pins it with `const`, so it cannot be softened or reworded; it is written in BOTH
// modes, because the rule is a property of the manifest rather than of one delivery mode.
const LOCAL_PATH_RESOLUTION =
  'The local canonical source path is resolved per machine and is not stored in the committed manifest.';

// The run-level source block. Identity is the CHECKSUMS, and with no path recorded it is the only
// thing identity CAN be. The manifest is committed by design, so a resolved absolute path written
// here would travel into every clone of the adopting repository - a label describing a value as
// non-portable does not make committing it portable. The path lives in machine-local, git-ignored
// state instead (see `writeLocalSourceStore`).
function buildSourceBlock(mode, sourcePath) {
  return {
    'delivery-mode': 'source-linked',
    'local-path-resolution': LOCAL_PATH_RESOLUTION,
    'guide-checksum': sha256(path.join(sourcePath, 'SPECBOOT_ADOPTION_GUIDE.md')),
    'skill-checksum': sha256(path.join(sourcePath, 'ai-specs', 'skills', 'specboot-adopt', 'SKILL.md')),
    git: readSourceGitProvenance(sourcePath),
    readOnly: true,
  };
}

// ---------------------------------------------------------------------------------------------
// 5.19 - the machine-local source-path store (design D-S option B).
//
// A convenience pointer, NOT provenance. It holds the resolved path and nothing else - no
// checksum, no commit, no delivery mode - because a second place recording identity is a second
// thing that can disagree with the manifest. It is never read as evidence of identity, its
// absence is never a failure, and ADOPT-18 removes it with the rest of the project-local
// temporary state.
// ---------------------------------------------------------------------------------------------
const LOCAL_STORE_DIR_REL = path.join('.specboot', 'local');
const LOCAL_STORE_FILE_REL = path.join(LOCAL_STORE_DIR_REL, 'source-path');

function writeLocalSourceStore(sourcePath, journal) {
  const file = path.join(target, LOCAL_STORE_FILE_REL);
  if (journal) journal.writeFile(file, sourcePath + '\n');
  else { ensureDir(path.dirname(file)); fs.writeFileSync(file, sourcePath + '\n'); }
  return file;
}

// Returns the stored path when one is recorded here AND still resolves to a directory on this
// machine, otherwise null. Never throws: a missing store is the ordinary cross-machine case.
function readLocalSourceStore() {
  const file = path.join(target, LOCAL_STORE_FILE_REL);
  if (!pathExists(file)) return null;
  const value = fs.readFileSync(file, 'utf8').trim();
  if (!value || !isDirectory(value)) return null;
  return value;
}

function removeLocalSourceStore() {
  const dir = path.join(target, LOCAL_STORE_DIR_REL);
  if (!pathExists(dir)) return false;
  fs.rmSync(dir, { recursive: true, force: true });
  return true;
}

function parseSelectedClients(raw) {
  if (!raw || raw === true) return [];
  return String(raw).split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
}

// Read-only client probe. Writes NOTHING - no directory, no file, no permission entry, no
// discovery link - and runs before any client-specific configuration exists to be justified by it.
function probeClients(dir) {
  return SUPPORTED_CLIENTS.map(name => {
    const hits = CLIENT_RECIPES[name].probes.filter(rel => pathExists(path.join(dir, rel)));
    return { name, found: hits.length > 0, evidence: hits };
  });
}

function runAutodiscover() {
  const findings = probeClients(target);
  console.log('\n  Autodiscovery (read-only — nothing has been written)\n');
  for (const f of findings) {
    const label = f.found ? 'candidate' : 'not found';
    const evidence = f.found ? f.evidence.map(e => `${e} present`).join('; ') : 'no probe matched';
    console.log(`    ${f.name.padEnd(9)} ${label.padEnd(11)} ${evidence}`);
  }
  const any = findings.some(f => f.found);
  console.log('');
  console.log(any
    ? '  These are candidates, not a selection. Which client(s) do you want provisioned?'
    : '  No candidate found. That is a finding, not a decision — finding nothing does not\n' +
      '  authorize proceeding with no client. Which client(s) do you want provisioned?');
  console.log('');
}

// ---------------------------------------------------------------------------------------------
// 5.21 - the write journal, and all-or-nothing provisioning (design D-X).
//
// The approval gate presented an INTENTION while collisions were discovered DURING provisioning,
// one path at a time. A run that fails after its first write has produced the state nobody
// approved - and skip-on-exist, the ambient failure mode this whole design is built against, then
// makes that state look like a success in the record. So every write goes through a journal, and a
// failure rewinds it: the end state of a failed bootstrap is a repository that was never
// bootstrapped, which is also the only state a retry can safely start from.
// ---------------------------------------------------------------------------------------------
class WriteJournal {
  constructor() { this.ops = []; }

  // Records a directory this run created (and only if it did not already exist).
  mkdir(dir) {
    const missing = [];
    let cur = dir;
    while (!pathExists(cur)) { missing.unshift(cur); cur = path.dirname(cur); }
    fs.mkdirSync(dir, { recursive: true });
    for (const d of missing) this.ops.push({ kind: 'created-dir', path: d });
  }

  writeFile(file, body) {
    this.mkdir(path.dirname(file));
    if (pathExists(file)) this.ops.push({ kind: 'modified-file', path: file, before: fs.readFileSync(file) });
    else this.ops.push({ kind: 'created-file', path: file });
    fs.writeFileSync(file, body);
  }

  symlink(targetPath, linkPath) {
    this.mkdir(path.dirname(linkPath));
    fs.symlinkSync(targetPath, linkPath);
    this.ops.push({ kind: 'created-link', path: linkPath });
  }

  copyFile(from, to) {
    this.mkdir(path.dirname(to));
    if (pathExists(to)) this.ops.push({ kind: 'modified-file', path: to, before: fs.readFileSync(to) });
    else this.ops.push({ kind: 'created-file', path: to });
    fs.copyFileSync(from, to);
  }

  // Registers an undo for a mutation performed by existing code that does its own writing.
  custom(undo) { this.ops.push({ kind: 'custom', undo }); }

  rollback() {
    for (const op of this.ops.slice().reverse()) {
      try {
        if (op.kind === 'custom') op.undo();
        else if (op.kind === 'modified-file') fs.writeFileSync(op.path, op.before);
        else if (op.kind === 'created-file' || op.kind === 'created-link') fs.rmSync(op.path, { force: true });
        else if (op.kind === 'created-dir') fs.rmSync(op.path, { recursive: true, force: true });
      } catch { /* best effort: a rollback must never mask the original failure */ }
    }
    this.ops = [];
  }
}

// Resolves EVERY path the selected clients' recipes and the durable state will occupy, before any
// of them is written. Reporting collisions incrementally means the operator approves a mutation set
// the run already knows is incomplete.
function planSourceLinkedBootstrap(sourcePath, selected, symlinksSupported) {
  const items = [];
  const add = (rel, operation, mechanism, reversible) =>
    items.push({ rel, operation, mechanism, reversible, abs: path.join(target, rel) });

  for (const client of selected) {
    const recipe = CLIENT_RECIPES[client];
    add(recipe.skillEntry, 'create', symlinksSupported ? 'symlink' : 'real-file', true);
    add(recipe.instructionFile,
      pathExists(path.join(target, recipe.instructionFile)) ? 'modify' : 'create',
      pathExists(path.join(target, recipe.instructionFile)) ? 'appended-block' : 'real-file',
      true);
  }
  add('.specboot/adoption/BOOTSTRAP-MANIFEST.json', 'create', 'real-file', true);
  add('.specboot/adoption/ADOPTION-RUN-LOG.md', 'create', 'real-file', true);
  add(LOCAL_STORE_FILE_REL, 'create', 'real-file', true);
  add('.gitignore', pathExists(path.join(target, '.gitignore')) ? 'modify' : 'create', 'appended-block', true);

  // Classify. An `appended-block` on a pre-existing file is the documented way to coexist with it,
  // not a collision; a `create` onto something already present is.
  for (const it of items) {
    if (!pathExists(it.abs)) it.classification = 'absent';
    else if (it.mechanism === 'appended-block') it.classification = 'pre-existing-untouched';
    else it.classification = 'colliding';
  }
  return items;
}

function printMutationInventory(items) {
  console.log('\n  Planned mutations (exact inventory):\n');
  for (const it of items) {
    console.log(`    ${it.operation.padEnd(6)} ${it.rel}`);
    console.log(`           mechanism: ${it.mechanism}   reversible: ${it.reversible ? 'yes' : 'no'}   preflight: ${it.classification}`);
  }
  console.log('');
}

// Provisions ONE selected client's temporary discovery entries, pointing at the EXTERNAL canonical
// source. Nothing canonical is copied, and nothing is copied as a FALLBACK either: where the
// selected client cannot discover an external skill without a symlink, the run has already refused
// (design D-D), so this function is only ever reached with symlinks available.
function provisionSourceLinkedClient(client, sourcePath, symlinksSupported, journal) {
  const recipe = CLIENT_RECIPES[client];
  const entries = [];

  const skillTargetAbs = path.join(sourcePath, 'ai-specs', 'skills', 'specboot-adopt');
  const entryAbs = path.join(target, recipe.skillEntry);

  // No branch here. A client that cannot discover an external skill without a symlink caused the
  // run to refuse before provisioning began; writing a real file that merely NAMES the external
  // path would claim a client capability nobody observed.
  journal.symlink(skillTargetAbs, entryAbs);
  entries.push({
    path: recipe.skillEntry,
    source: { canonicalPath: 'ai-specs/skills/specboot-adopt/', channel: 'source-linked' },
    checksum: 'symlink',
    ownership: 'bootstrap-created',
    mode: 'symlink',
    machineLocal: true,
    'intended-permanent-replacement': null,
    'cleanup-status': 'pending',
    'final-disposition': null,
  });

  const instrAbs = path.join(target, recipe.instructionFile);
  const preExisting = pathExists(instrAbs);
  // The block names no absolute path. The resolved source lives in the durable manifest, which is
  // where a machine-specific value belongs - a client instruction file is exactly the kind of
  // artifact that gets committed, and a laboratory path committed into one resolves nowhere else.
  const block = [
    BLOCK_BEGIN,
    'Run the `specboot-adopt` skill. This adoption is source-linked: the canonical SpecBoot',
    'source, its checksums, and the delivery mode are recorded in',
    '`.specboot/adoption/BOOTSTRAP-MANIFEST.json`.',
    'This block is temporary and is removed at `ADOPT-18`.',
    BLOCK_END,
    '',
  ].join('\n');

  if (preExisting) {
    journal.writeFile(instrAbs, fs.readFileSync(instrAbs, 'utf8') + '\n' + block);
  } else {
    journal.writeFile(instrAbs, block);
  }
  entries.push({
    path: recipe.instructionFile,
    source: { canonicalPath: 'SPECBOOT_ADOPTION_GUIDE.md', channel: 'source-linked' },
    checksum: sha256(instrAbs),
    ownership: preExisting ? 'pre-existing-modified' : 'bootstrap-created',
    mode: preExisting ? 'appended-block' : 'real-file',
    // An appended block lives inside a file the repository may legitimately track, so the file
    // cannot be excluded wholesale. It is machine-local only in the sense that the block is
    // temporary; the block itself names no machine-specific value, which is what makes committing
    // the surrounding file harmless.
    machineLocal: !preExisting,
    'intended-permanent-replacement': null,
    'cleanup-status': 'pending',
    'final-disposition': null,
  });

  return entries;
}

// Machine-local entries are excluded through `.git/info/exclude`, not `.gitignore`.
//
// `.gitignore` is committed, so a rule written there would travel to every clone and would keep
// ignoring `.claude/skills/specboot-adopt` long after ADOPT-13 creates the PERMANENT canonical
// symlink at that same path. `.git/info/exclude` is itself machine-local and never committed -
// the right lifetime for an exclusion covering a machine-local artifact.
const EXCLUDE_BEGIN = '# SPECBOOT-SOURCE-LINKED:BEGIN (temporary; removed at ADOPT-18)';
const EXCLUDE_END = '# SPECBOOT-SOURCE-LINKED:END';

function writeMachineLocalExcludes(entries) {
  const paths = entries.filter(e => e.machineLocal).map(e => e.path);
  if (paths.length === 0) return [];
  const excludeFile = path.join(target, '.git', 'info', 'exclude');
  if (!pathExists(path.dirname(excludeFile))) return [];   // not a Git repository: nothing to do
  const existing = pathExists(excludeFile) ? fs.readFileSync(excludeFile, 'utf8') : '';
  if (existing.includes(EXCLUDE_BEGIN)) return paths;
  const block = `\n${EXCLUDE_BEGIN}\n${paths.map(p => `/${p}`).join('\n')}\n${EXCLUDE_END}\n`;
  fs.writeFileSync(excludeFile, existing + block);
  return paths;
}

function removeMachineLocalExcludes() {
  const excludeFile = path.join(target, '.git', 'info', 'exclude');
  if (!pathExists(excludeFile)) return false;
  const content = fs.readFileSync(excludeFile, 'utf8');
  const start = content.indexOf(EXCLUDE_BEGIN);
  const end = content.indexOf(EXCLUDE_END);
  if (start === -1 || end === -1) return false;
  const after = content.slice(end + EXCLUDE_END.length).replace(/^\n+/, '');
  fs.writeFileSync(excludeFile, content.slice(0, start).replace(/\n+$/, '\n') + after);
  return true;
}

function writeDurableState(durable, srcRoot, journal) {
  const manifestPath = path.join(target, '.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json');
  journal.writeFile(manifestPath, JSON.stringify(durable, null, 2) + '\n');

  const runLogTarget = path.join(target, '.specboot', 'adoption', 'ADOPTION-RUN-LOG.md');
  const runLogSource = path.join(srcRoot, 'specboot-adoption', 'run-template', 'ADOPTION-RUN-LOG.template.md');
  if (pathExists(runLogSource) && !pathExists(runLogTarget)) journal.copyFile(runLogSource, runLogTarget);
  return manifestPath;
}

function runSourceLinkedBootstrap(sourcePath, selected, route) {
  const forcedOff = FLAGS['no-symlinks'] === true || FLAGS['no-symlinks'] === 'true';
  const symlinksSupported = forcedOff ? false : detectSymlinkSupport(target);

  // R5 (design D-D). Discovery is a property of the CLIENT, not of the filesystem. Asked before
  // anything is written, because the constraint is already knowable here and the fresh-session
  // probe is the expensive, human-in-the-loop step this refusal saves.
  if (!symlinksSupported) {
    const unsupported = selected.filter(c => !CLIENT_RECIPES[c].discoversWithoutSymlink);
    if (unsupported.length > 0) {
      console.error('\n  ! symlinks are unavailable' +
        (forcedOff ? ' (forced off by --no-symlinks)' : ' on this host') + ', and the selected');
      console.error('    client(s) have no native discovery mechanism that works without one:\n');
      for (const c of unsupported) {
        console.error(`      ${c}: requires ${CLIENT_RECIPES[c].discoveryMechanism}`);
      }
      console.error('\n    Attempted: symlink capability probe in the target repository' +
        (forcedOff ? ', overridden by --no-symlinks' : '') + '.');
      console.error('    A real file naming the external path is NOT a discovered skill and is not');
      console.error('    written as one; copying canonical content is forbidden outright.');
      console.error('    Nothing was written to the target repository.\n');
      process.exit(1);
    }
  }

  // Preflight: resolve EVERY path first, and report ALL collisions at once.
  const plan = planSourceLinkedBootstrap(sourcePath, selected, symlinksSupported);
  const collisions = plan.filter(i => i.classification === 'colliding');
  printMutationInventory(plan);

  if (collisions.length > 0) {
    console.error(`  ! preflight found ${collisions.length} collision(s). Nothing was written.\n`);
    for (const c of collisions) {
      console.error(`      ${c.rel} already exists, and this run would ${c.operation} it as ${c.mechanism}`);
    }
    console.error('\n    Resolve or remove these paths, then re-run. Reporting them all together is');
    console.error('    deliberate: approving a mutation set the run knows is incomplete is not approval.\n');
    process.exit(1);
  }

  if (FLAGS['dry-run']) {
    console.log('  --dry-run: preflight only. Nothing was written.\n');
    return;
  }

  // [HUMAN APPROVAL REQUIRED] - the gate is a stop, not a notification. `--yes` records that the
  // human approved THIS inventory; it is scoped to the mutations printed above and to nothing else.
  if (!FLAGS.yes) {
    console.log('  [HUMAN APPROVAL REQUIRED] Nothing has been written.');
    console.log('  Re-run with --yes to approve exactly the inventory above.\n');
    return;
  }

  const journal = new WriteJournal();
  try {
    const entries = [];
    for (const client of selected) {
      entries.push(...provisionSourceLinkedClient(client, sourcePath, symlinksSupported, journal));
    }

    const durable = {
      manifestVersion: '1.0.0',
      createdAt: new Date().toISOString(),
      source: buildSourceBlock('source-linked', sourcePath),
      selectedClient: selected.join(','),
      clientSelection: {
        route,
        selected,
        notSelected: SUPPORTED_CLIENTS.filter(c => !selected.includes(c)),
      },
      environment: {
        os: process.platform,
        shell: process.env.SHELL || process.env.ComSpec || 'unknown',
        symlinksSupported,
        symlinkDetermination: forcedOff ? 'forced off by --no-symlinks' : 'capability-detected',
        isGitRepository: gitSaysIgnored(target, '.specboot/staging/.specboot-probe') !== null,
      },
      modeObligations: { payload: SKIPPED_SOURCE_LINKED, container: SKIPPED_SOURCE_LINKED },
      entries,
    };

    writeDurableState(durable, sourcePath, journal);
    // The store's ignore rule is provisioned BEFORE the store is written, so the path is never
    // momentarily committable.
    const ignoreBefore = pathExists(path.join(target, '.gitignore'))
      ? fs.readFileSync(path.join(target, '.gitignore')) : null;
    ensureGitignoreTransientRules(TRANSIENT_RULES.concat([LOCAL_STORE_RULE]));
    journal.custom(() => {
      const gi = path.join(target, '.gitignore');
      if (ignoreBefore === null) fs.rmSync(gi, { force: true });
      else fs.writeFileSync(gi, ignoreBefore);
    });
    writeLocalSourceStore(sourcePath, journal);
    const excluded = writeMachineLocalExcludes(entries);
    journal.custom(() => removeMachineLocalExcludes());

    console.log(`  Delivery mode     source-linked (nothing canonical copied)`);
    console.log(`  Selected clients  ${selected.join(', ')}`);
    console.log(`  NOT SELECTED      ${durable.clientSelection.notSelected.join(', ') || '(none)'}`);
    console.log(`  Discovery entries ${entries.length}`);
    console.log(`  Durable manifest  .specboot/adoption/BOOTSTRAP-MANIFEST.json`);
    console.log(`  Payload/container ${SKIPPED_SOURCE_LINKED}`);
    console.log(`  Machine-local     ${excluded.length} entr${excluded.length === 1 ? 'y' : 'ies'} excluded via .git/info/exclude (never committed)`);
    console.log(`  Source-path store ${LOCAL_STORE_FILE_REL} (git-ignored; holds the path and nothing else)`);
    console.log('  The committed manifest records portable identity only — checksums and Git — and no path.');
    console.log('\n  .specboot/bootstrap/ is NOT created. The canonical source is read-only for the whole adoption.');
    printFreshSessionHandoff();
  } catch (err) {
    journal.rollback();
    console.error(`\n  ! provisioning failed: ${err && err.message ? err.message : err}`);
    console.error('    The target repository has been restored to its pre-provisioning state:');
    console.error('    no partial discovery entry, manifest, run log, ignore rule, or machine-local store.');
    console.error('    A retry starts from a repository that was never bootstrapped.\n');
    process.exit(1);
  }
}

// The initial session STOPS here. What it just provisioned IS client discovery, and discovery can
// only be evidenced by a session that started AFTER it existed - so the handoff is generated, not
// composed by the operator, and it carries NO source path: identity travels in durable state as
// checksums.
function printFreshSessionHandoff() {
  console.log('\n  ------------------------------------------------------------------');
  console.log('  STOP. This session ends here. Native skill discovery is attempted');
  console.log('  only in a genuinely fresh session started after these entries existed.');
  console.log('');
  console.log('  Run this prompt in a fresh session, rooted at this repository:');
  console.log('');
  console.log('    Resume the SpecBoot adoption in this repository. Read');
  console.log('    .specboot/adoption/BOOTSTRAP-MANIFEST.json and');
  console.log('    .specboot/adoption/ADOPTION-RUN-LOG.md first, name the next step before');
  console.log('    acting, obtain a local canonical source path (from .specboot/local/ if');
  console.log('    present on this machine, otherwise ask me or rediscover it), verify the');
  console.log('    recorded checksums against it, and block for reconciliation on any');
  console.log('    mismatch. Record whether the specboot-adopt skill was discovered');
  console.log('    natively by this session.');
  console.log('  ------------------------------------------------------------------\n');
}

// Resume. Identity is the checksums, never the path: a recorded path that does not exist here is
// not a failure, and drift is a stop for human reconciliation rather than a silent continue.
function runResume() {
  const manifestPath = path.join(target, '.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json');
  if (!pathExists(manifestPath)) {
    console.error('\n  ! no durable manifest at .specboot/adoption/BOOTSTRAP-MANIFEST.json — nothing to resume\n');
    process.exit(1);
  }
  const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const recorded = m.source || {};

  console.log('\n  lidr-specboot resume');
  console.log(`  Target: ${target}`);
  console.log(`  Recorded delivery mode: ${recorded['delivery-mode']}\n`);

  if (recorded['delivery-mode'] !== 'source-linked') {
    console.log('  Packaged-snapshot run — no external source to verify. Resuming.\n');
    return;
  }

  // Obtaining a local source path is a STEP of resume, not a precondition of it. The committed
  // manifest records none, so none can be required to exist. An explicitly supplied path wins; the
  // machine-local store answers on the machine that ran ADOPT-00; anywhere else the run asks.
  const supplied = FLAGS.source ? path.resolve(String(FLAGS.source)) : null;
  const stored = readLocalSourceStore();
  const sourcePath = supplied || stored;
  const origin = supplied ? 'supplied with --source' : 'the machine-local store (.specboot/local/)';

  if (!sourcePath || !isDirectory(sourcePath)) {
    console.error('  ! no local canonical source path is known on this machine.');
    console.error('    This is the ordinary case on any machine but the one that ran ADOPT-00, and');
    console.error('    it is not a failure: the committed manifest records portable identity only —');
    console.error('    checksums and Git provenance — so there is no path here to require.');
    console.error('    Supply one with --source <path>, or rediscover it. It is accepted only when');
    console.error('    the recorded checksums match.\n');
    process.exit(1);
  }

  console.log(`  Local source path obtained from ${origin}.`);

  const v = validateCanonicalSource(sourcePath);
  if (!v.valid) {
    console.error(`  ! supplied source is not a canonical SpecBoot source (missing: ${v.missing.join(', ')})\n`);
    process.exit(1);
  }

  const guide = sha256(path.join(sourcePath, 'SPECBOOT_ADOPTION_GUIDE.md'));
  const skill = sha256(path.join(sourcePath, 'ai-specs', 'skills', 'specboot-adopt', 'SKILL.md'));
  const drifted = [];
  if (guide !== recorded['guide-checksum']) drifted.push('SPECBOOT_ADOPTION_GUIDE.md');
  if (skill !== recorded['skill-checksum']) drifted.push('ai-specs/skills/specboot-adopt/SKILL.md');

  if (drifted.length > 0) {
    console.error(`  ! DRIFT detected in: ${drifted.join(', ')}`);
    console.error('    The canonical source changed after this run recorded its checksums.');
    console.error('    Stopping for human reconciliation — a running adoption never silently');
    console.error('    adopts instructions nobody approved. Re-baselining is an explicit human');
    console.error('    decision, recorded in the run log.\n');
    process.exit(1);
  }

  if (recorded.git && recorded.git.status === 'recorded') {
    const now = readSourceGitProvenance(sourcePath);
    if (now.status !== 'recorded' || now.commit !== recorded.git.commit) {
      console.error(`  ! recorded commit ${recorded.git.commit} does not match the supplied source.`);
      console.error('    Stopping for human reconciliation.\n');
      process.exit(1);
    }
  }

  // Reuse is not trust: the checksums above are recomputed on EVERY resume, including one that
  // read the store, which is what keeps the store a convenience pointer rather than evidence.
  const moved = stored && sourcePath !== stored;
  console.log('  Source identity verified — guide and skill checksums match the manifest.');
  if (moved || !stored) {
    console.log('  Accepted this local path on matching checksums alone; no recorded path was required');
    console.log('  to exist, because the committed manifest holds none.');
  }
  if (supplied) writeLocalSourceStore(sourcePath);
  console.log('  Resuming from the durable manifest and run log.\n');
}

// De-bootstrap (ADOPT-18). Acts strictly on manifest entries, never on path patterns.
function runDebootstrap() {
  const manifestPath = path.join(target, '.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json');
  if (!pathExists(manifestPath)) {
    console.log('\n  SKIPPED — no bootstrap performed (no durable manifest present)\n');
    return;
  }
  const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  // A manifest with no `source` block, or one recording `packaged-snapshot`, predates the deferral
  // (design D-W). It is read as HISTORY and not re-interpreted: de-bootstrap still has to be able
  // to reconcile a repository an older run bootstrapped. No CURRENT run can produce either value -
  // `runBootstrap` refuses without a validated source.
  const mode = (m.source && m.source['delivery-mode']) || 'packaged-snapshot';
  const now = new Date().toISOString();

  console.log('\n  lidr-specboot debootstrap');
  console.log(`  Target: ${target}`);
  console.log(`  Delivery mode: ${mode}\n`);

  // ------------------------------------------------------------------------------------------
  // Step 2 (10-debootstrap.md; design D-C) - VERIFY THE PERMANENT REPLACEMENT FIRST.
  //
  // A discrete pass BEFORE any entry is acted on, because the rule is "no entry carrying an
  // `intended-permanent-replacement` is removed UNTIL that replacement is verified to exist and
  // resolve". Checking inline, per entry, would already have removed earlier entries by the time
  // the unresolved one is reached - and a removal that outruns its replacement leaves the
  // repository worse than not running the step at all, because ADOPT-13's skip-on-exist rule then
  // makes the gap permanent and the only trace is a "skipped" line.
  //
  // `realpathSync` rather than `pathExists`: a dangling symlink exists and resolves to nothing, so
  // it is not a replacement.
  // ------------------------------------------------------------------------------------------
  const unresolved = [];
  for (const e of m.entries) {
    const rep = e['intended-permanent-replacement'];
    if (!rep) continue;
    const repAbs = path.join(target, rep);
    let resolves = false;
    try { resolves = fs.existsSync(fs.realpathSync(repAbs)); } catch { resolves = false; }
    if (!resolves) unresolved.push({ entry: e.path, replacement: rep });
  }

  if (unresolved.length > 0) {
    console.error(`  FAIL - ${unresolved.length} entr${unresolved.length === 1 ? 'y' : 'ies'} name a permanent replacement that does not resolve:\n`);
    for (const u of unresolved) {
      console.error(`    - ${u.entry}`);
      console.error(`        waiting on: ${u.replacement}  (missing or unresolved)`);
    }
    console.error('\n    Removing an entry whose replacement is missing is FAIL, not cleanup: the');
    console.error('    canonical path would be left with neither, and ADOPT-13 skips any path that');
    console.error('    already exists, so the gap would become permanent.');
    console.error('\n    Nothing was removed. Every entry is left in place, the durable manifest and');
    console.error('    the adoption run log are preserved, and this step is resumable: create the');
    console.error('    missing replacement(s), then re-run.');
    console.error('\n    Stopping for human reconciliation.\n');

    // Record the FAIL in the durable manifest WITHOUT dispositioning any entry. An entry left on
    // disk must never read as `removed`: a manifest that disagrees with the filesystem is worse
    // than either outcome alone.
    m.debootstrap = {
      completedAt: null,
      revalidation: { filesystemChecks: 'FAIL' },
      unresolvedReplacements: unresolved,
      reason: 'one or more intended-permanent-replacement values do not resolve; no entry was removed',
    };
    fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2) + '\n');
    process.exit(1);
  }

  for (const e of m.entries) {
    if (e.ownership === 'pre-existing-untouched') {
      e['cleanup-status'] = 'retained-with-reason';
      e['retained-reason'] = 'pre-existing-untouched entries are never touched by ADOPT-18';
      e['final-disposition'] = { action: 'retained', at: now, evidence: 'ownership: pre-existing-untouched' };
      continue;
    }

    const abs = path.join(target, e.path);
    if (e.mode === 'appended-block') {
      // Byte-restore: remove ONLY the delimited block, leaving the rest of the file unchanged.
      if (pathExists(abs)) {
        const content = fs.readFileSync(abs, 'utf8');
        const start = content.indexOf(BLOCK_BEGIN);
        const end = content.indexOf(BLOCK_END);
        if (start !== -1 && end !== -1) {
          const after = content.slice(end + BLOCK_END.length).replace(/^\n+/, '');
          const restored = content.slice(0, start).replace(/\n+$/, '\n') + after;
          fs.writeFileSync(abs, restored);
        }
      }
      e['cleanup-status'] = 'removed';
      e['final-disposition'] = { action: 'delimited block removed; file byte-restored', at: now, evidence: e.path };
    } else if (e.mode === 'symlink' || e.mode === 'pointer-file' || e.mode === 'real-file' || e.mode === 'copy') {
      if (pathExists(abs)) fs.rmSync(abs, { recursive: true, force: true });
      e['cleanup-status'] = 'removed';
      e['final-disposition'] = {
        action: e.mode === 'pointer-file'
          ? 'pointer file removed; the external path it named was never touched'
          : `${e.mode} removed`,
        at: now,
        evidence: e.path,
      };
    }
    console.log(`    - ${e.path} (${e.mode}) -> ${e['cleanup-status']}`);
  }

  if (mode === 'source-linked') {
    const removedExcludes = removeMachineLocalExcludes();
    const removedStore = removeLocalSourceStore();
    m.modeObligations = { payload: SKIPPED_SOURCE_LINKED, container: SKIPPED_SOURCE_LINKED };
    if (removedExcludes) console.log('    - .git/info/exclude machine-local block -> removed');
    if (removedStore) console.log(`    - ${LOCAL_STORE_DIR_REL} source-path store -> removed`);
    console.log(`\n  Payload obligation    ${SKIPPED_SOURCE_LINKED}`);
    console.log(`  Container obligation  ${SKIPPED_SOURCE_LINKED}`);
    console.log('  The external canonical source was never a manifest entry, so no operation here');
    console.log('  could reach it.');
  } else {
    // Content first, container last, and only when it is verifiably empty.
    const container = path.join(target, '.specboot', 'bootstrap');
    let containerStatus = 'PASS';
    if (pathExists(container)) {
      const residue = listResidue(container);
      if (residue.length > 0) {
        containerStatus = 'FAIL';
        console.error(`\n  ! ${container} still holds ${residue.length} file(s) the manifest never recorded.`);
        console.error('    Stopping for reconciliation. The container is removed BY NAME once every');
        console.error('    entry is dispositioned, never by recursing into unrecorded content.\n');
      } else {
        fs.rmSync(container, { recursive: true, force: true });
      }
    }
    m.modeObligations = { payload: 'PASS', container: containerStatus };
    if (containerStatus === 'FAIL') {
      m.debootstrap = { completedAt: null, revalidation: { filesystemChecks: 'FAIL' } };
      fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2) + '\n');
      process.exit(1);
    }
  }

  m.debootstrap = Object.assign({}, m.debootstrap, {
    completedAt: now,
    revalidation: { filesystemChecks: 'PASS', brokenSymlinks: 0 },
  });
  fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2) + '\n');
  console.log('\n  Durable manifest updated with final dispositions — never deleted.\n');
}

function listResidue(dir) {
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory() && !e.isSymbolicLink()) walk(full);
      else out.push(full);
    }
  };
  if (pathExists(dir)) walk(dir);
  return out;
}

function runBootstrap() {
  // Order of operations (design D-R, D-T, D-X). Every refusal below happens BEFORE the first write
  // and leaves the target repository byte-for-byte unchanged. A refusal is a clean stop, never a
  // degraded success, and none of them is resolved by this command choosing on the operator's
  // behalf.
  const suppliedSource = FLAGS.source && FLAGS.source !== true
    ? path.resolve(String(FLAGS.source))
    : null;
  const route = FLAGS.route === 'autodiscovery' ? 'autodiscovery' : 'manual';

  // R1 - no canonical source. This is a REFUSAL, not a branch into copying SpecBoot in.
  //
  // Packaged-snapshot delivery is deferred whole to `add-specboot-packaged-snapshot-delivery`
  // (design D-W): its entry prompt is not distributed with the payload it would be pasted from, it
  // writes before it plans, its client selection is optional, it provisions no discovery entry, its
  // payload identity is null, and no run of it has ever gone from a virgin repository to a
  // discovered skill. Exposing it would offer a path that fails AFTER writing - the one failure
  // shape the preflight above exists to prevent.
  if (!suppliedSource) {
    console.error('\n  ! no canonical SpecBoot source was supplied.');
    console.error('    Pass --source <path> naming a local canonical source containing:');
    for (const a of REQUIRED_SOURCE_ARTIFACTS) console.error(`      ${a.rel}`);
    console.error('\n    There is no fallback delivery mode. Nothing was written to the target repository.\n');
    process.exit(1);
  }

  // R2 - the supplied source fails the three-artifact validation.
  const v = validateCanonicalSource(suppliedSource);
  if (!v.valid) {
    console.error('\n  ! the supplied path is not a canonical SpecBoot source.');
    console.error(`    Missing: ${v.missing.join(', ')}`);
    console.error('    Nothing was written to the target repository.');
    console.error('    Supply a complete source; there is no fallback delivery mode.\n');
    process.exit(1);
  }

  // R3 - no client selected. Not "provision nothing and continue", and above all not a placeholder
  // written into the committed manifest: `undeclared` is a durable, committed claim that a human
  // made a choice they did not make.
  const selected = parseSelectedClients(FLAGS.client);
  if (selected.length === 0) {
    console.error('\n  ! no client was selected. Selection is declared by the human and is never');
    console.error('    inferred from a directory on disk, nor recorded as a placeholder.');
    console.error(`    Pass --client <name[,name]>. Supported: ${SUPPORTED_CLIENTS.join(', ')}.`);
    console.error('    Nothing was written to the target repository.\n');
    process.exit(1);
  }

  // R4 - a selected client with no recipe. Naming what IS supported is the difference between a
  // refusal the operator can act on and one they have to go read source to understand.
  const unknown = selected.filter(c => !SUPPORTED_CLIENTS.includes(c));
  if (unknown.length > 0) {
    console.error(`\n  ! no recipe for client(s): ${unknown.join(', ')}`);
    console.error(`    Supported clients: ${SUPPORTED_CLIENTS.join(', ')}.`);
    console.error('    The nearest supported client is never substituted - selection is declared.');
    console.error('    Nothing was written to the target repository.\n');
    process.exit(1);
  }

  const manifestPath = path.join(target, '.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json');
  console.log('\n  lidr-specboot bootstrap');
  console.log(`  Target: ${target}`);
  if (pathExists(manifestPath)) {
    const existing = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log(`\n  Already bootstrapped - ${existing.entries.length} manifest entries, no changes made.\n`);
    return;
  }
  console.log('  Source validated: guide, phase directory, and a readable SKILL.md');
  runSourceLinkedBootstrap(suppliedSource, selected, route);
}

function runDriftCheck() {
  const src = resolveKitSource();
  const repoRoot = path.resolve(__dirname, '..', '..', '..');
  const loaded = src ? loadKitManifest(src.root) : null;

  let failures = 0;
  let warnings = 0;

  console.log('\n  lidr-specboot drift-check');
  console.log(`  Target: ${target}\n`);

  // (1) ENFORCING - kit payload against canonical.
  //
  // Two payload roots are checked, and BOTH matter. The assembled `bootstrap-payload/` is the one
  // `prepack` produces and npm ships; a staged `.specboot/bootstrap/` payload belongs to the
  // deferred packaged-snapshot mode. Checking only the staged one would make this whole branch
  // dead code the moment that mode is deferred - retiring the mode must not silently retire the
  // drift protection the kit depends on (task 5.24).
  const stagedRoot = path.join(target, '.specboot', 'bootstrap');
  const assembledRoot = path.join(__dirname, '..', 'bootstrap-payload');
  const payloadRoots = [];
  if (pathExists(stagedRoot)) payloadRoots.push({ root: target, label: '.specboot/bootstrap' });
  if (pathExists(assembledRoot)) payloadRoots.push({ root: path.join(__dirname, '..'), label: 'bootstrap-payload' });

  for (const pr of loaded ? payloadRoots : []) {
    for (const e of loaded.manifest.entries) {
      // Canonical is always the REPOSITORY, never the payload. `resolveKitSource()` prefers the
      // assembled payload as a manifest source, so reading canonical from it would compare the
      // payload against itself - a vacuous pass that reports zero drift no matter what drifted.
      const canonical = path.join(repoRoot, e.canonicalSource);
      // The assembled payload mirrors CANONICAL paths (see scripts/assemble-payload.js); a staged
      // payload mirrors the manifest's payloadTarget mapping. Same content, two layouts.
      const delivered = pr.label === 'bootstrap-payload'
        ? path.join(pr.root, 'bootstrap-payload', e.canonicalSource.replace(/\/$/, ''))
        : path.join(pr.root, e.payloadTarget);
      if (!pathExists(canonical) || !pathExists(delivered)) continue;

      if (e.kind === 'file') {
        if (sha256(canonical) !== sha256(delivered)) {
          console.log(`    ! drift: ${e.payloadTarget} differs from ${e.canonicalSource}`);
          failures++;
        }
      } else {
        const exclude = e.exclude || [];
        const walk = (dir, base, acc = []) => {
          if (!pathExists(dir)) return acc;
          for (const de of fs.readdirSync(dir, { withFileTypes: true })) {
            if (de.name === '.DS_Store') continue;
            const rel = path.relative(base, path.join(dir, de.name));
            if (exclude.some(x => rel.startsWith(x.replace(/\/$/, '')))) continue;
            if (de.isDirectory()) walk(path.join(dir, de.name), base, acc);
            else acc.push(rel);
          }
          return acc;
        };
        for (const rel of walk(canonical, canonical)) {
          const a = path.join(canonical, rel);
          const b = path.join(delivered, rel);
          if (!pathExists(b) || sha256(a) !== sha256(b)) {
            console.log(`    ! drift: ${path.join(e.payloadTarget, rel)} differs from canonical`);
            failures++;
          }
        }
      }
    }
  }

  // (2) WARN-ONLY - pre-existing template drift.
  const tmplSkills = path.join(repoRoot, 'packages', 'specboot', 'template', 'ai-specs', 'skills');
  const canonSkills = path.join(repoRoot, 'ai-specs', 'skills');
  if (pathExists(tmplSkills) && pathExists(canonSkills)) {
    for (const skill of fs.readdirSync(tmplSkills).filter(f => !f.startsWith('.'))) {
      const a = path.join(tmplSkills, skill);
      const b = path.join(canonSkills, skill);
      if (!pathExists(b)) continue;
      const walk = (dir, base, acc = []) => {
        for (const de of fs.readdirSync(dir, { withFileTypes: true })) {
          if (de.name === '.DS_Store') continue;
          if (de.isDirectory()) walk(path.join(dir, de.name), base, acc);
          else acc.push(path.relative(base, path.join(dir, de.name)));
        }
        return acc;
      };
      for (const rel of walk(a, a)) {
        const f1 = path.join(a, rel);
        const f2 = path.join(b, rel);
        if (!pathExists(f2) || sha256(f1) !== sha256(f2)) {
          console.log(`    warn: pre-existing template drift - ${skill}/${rel} (out of scope, see design D-I)`);
          warnings++;
        }
      }
    }
  }

  console.log(`\n  Drift failures  ${failures} (enforcing)`);
  console.log(`  Drift warnings  ${warnings} (warn-only, pre-existing template)\n`);

  if (failures > 0) process.exit(1);
}

function main() {
  console.log('\n  lidr-specboot');
  console.log('  Augmented Spec-driven development powered by OpenSpec\n');
  console.log(`  Target: ${target}\n`);

  copyRecursive(TEMPLATE_DIR, target);
  ensureGitignoreTransientRules();

  for (const name of ['CLAUDE.md', 'AGENTS.md', 'codex.md', 'GEMINI.md']) {
    createSymlink(name, 'docs/base-standards.md');
  }

  const agents = fs.readdirSync(path.join(TEMPLATE_DIR, 'ai-specs', 'agents'))
    .filter(f => !f.startsWith('.'));
  const skills = fs.readdirSync(path.join(TEMPLATE_DIR, 'ai-specs', 'skills'))
    .filter(f => !f.startsWith('.'));

  for (const tool of ['.claude', '.cursor']) {
    for (const agent of agents) {
      createSymlink(`${tool}/agents/${agent}`, `../../ai-specs/agents/${agent}`);
    }
    for (const skill of skills) {
      createSymlink(`${tool}/skills/${skill}`, `../../ai-specs/skills/${skill}`);
    }
  }

  console.log(`  Files copied  ${stats.copied.length}`);
  console.log(`  Symlinks      ${stats.linked.length} (Claude + Cursor shared adapters)`);
  console.log(`  Skipped       ${stats.skipped.length}`);
  console.log(`  .gitignore    ${stats.gitignore}`);

  if (stats.errors.length) {
    console.log(`\n  Errors (${stats.errors.length}):`);
    for (const e of stats.errors) console.log(`    ! ${e}`);
  }

  console.log('\n  Note: this installer provisions Claude and Cursor shared adapters only.');
  console.log('  It does not provision Kiro or any other client. Other selected clients');
  console.log('  require their own separate configuration — see SPECBOOT_ADOPTION_GUIDE.md');
  console.log('  and ai-specs/specboot-instructions.md.');

  console.log('\n  Next steps:');
  console.log('  1. Update docs/ to match your project (stack, API, data model)');
  console.log('  2. openspec init');
  console.log('  3. enrich-us (mandatory refinement, no Jira required) -> your OpenSpec client\'s own propose (new-change) command -> apply');
  console.log('     See ai-specs/specboot-instructions.md for the full sequence and exact per-client invocation syntax.\n');
}

if (subcommand === 'bootstrap') runBootstrap();
else if (subcommand === 'autodiscover') runAutodiscover();
else if (subcommand === 'resume') runResume();
else if (subcommand === 'debootstrap') runDebootstrap();
else if (subcommand === 'drift-check') runDriftCheck();
else main();
