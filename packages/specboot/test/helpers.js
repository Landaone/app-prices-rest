'use strict';

// Black-box test helpers for the SpecBoot installer CLI.
//
// The CLI is invoked as a child process against a throwaway fixture directory. `bin/init.js`
// computes its target from `process.argv[2]` at module load and exports nothing, so it has no
// importable surface; black-box invocation tests the real binary contract without restructuring
// executable code this change has no other reason to restructure.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const crypto = require('crypto');

const CLI = path.join(__dirname, '..', 'bin', 'init.js');
const PKG_DIR = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PKG_DIR, '..', '..');
const PAYLOAD_DIR = path.join(PKG_DIR, 'bootstrap-payload');
const ASSEMBLE = path.join(PKG_DIR, 'scripts', 'assemble-payload.js');

// Fixtures live in the OS temp dir, never inside the repository working tree - a fixture created
// under the repo would be picked up by the repo's own .gitignore rules and would make
// `git check-ignore` assertions meaningless.
function makeFixture(prefix = 'specboot-test-') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  const real = fs.realpathSync(dir);
  if (real.startsWith(REPO_ROOT + path.sep)) {
    throw new Error(`fixture ${real} must not live inside the repository working tree`);
  }
  return real;
}

function removeFixture(dir) {
  if (!dir) return;
  fs.rmSync(dir, { recursive: true, force: true });
}

function gitInit(dir) {
  const r = spawnSync('git', ['-C', dir, 'init', '--quiet'], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`git init failed: ${r.stderr}`);
  return dir;
}

// Runs the installer CLI. `args` are passed verbatim after the script path, so a caller can
// exercise both `init.js <target>` and `init.js bootstrap <target>`.
function runCli(args, opts = {}) {
  const r = spawnSync(process.execPath, [CLI, ...args], {
    encoding: 'utf8',
    cwd: opts.cwd || os.tmpdir(),
    env: { ...process.env, ...(opts.env || {}) },
  });
  return { status: r.status, stdout: r.stdout || '', stderr: r.stderr || '', error: r.error };
}

// Asks Git whether it treats `relPath` as ignored inside `dir`.
// Returns true / false, or null when Git could not give a clean answer.
function gitSaysIgnored(dir, relPath) {
  const r = spawnSync('git', ['-C', dir, 'check-ignore', '--quiet', relPath], { stdio: 'ignore' });
  if (r.error || r.status === null) return null;
  if (r.status === 0) return true;
  if (r.status === 1) return false;
  return null;
}

function exists(p) {
  try { fs.lstatSync(p); return true; } catch { return false; }
}

function readIfExists(p) {
  return exists(p) ? fs.readFileSync(p, 'utf8') : null;
}

// Every non-empty, non-comment line of a .gitignore, trimmed.
function gitignoreRules(dir) {
  const content = readIfExists(path.join(dir, '.gitignore'));
  if (content === null) return [];
  return content.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#'));
}

// Recursively lists files relative to `root`, skipping .git.
function listFiles(root, base = root, acc = []) {
  if (!exists(root)) return acc;
  for (const e of fs.readdirSync(root, { withFileTypes: true })) {
    if (e.name === '.git') continue;
    const full = path.join(root, e.name);
    if (e.isDirectory() && !e.isSymbolicLink()) listFiles(full, base, acc);
    else acc.push(path.relative(base, full));
  }
  return acc;
}

// Deterministic fixture step (design D-O).
//
// Any test that needs an assembled payload calls this in its OWN setup. Two failure modes make
// this mandatory rather than convenient:
//
//   1. `bootstrap-payload/` is generated and git-ignored, so it is ABSENT in a clean checkout.
//      With it absent, `resolveKitSource()` falls back to the repository root and the assembly
//      test compares canonical against canonical - a vacuous pass that tests nothing.
//   2. It goes STALE the moment any canonical source changes, so the first invocation after an
//      edit fails while a later one passes, once some other test's `prepack` has repaired it.
//
// Assembling here makes each test start from a known state that it established itself, so its
// verdict never depends on run order, on another test, or on a second invocation.
function assemblePayload() {
  const r = spawnSync(process.execPath, [ASSEMBLE], { encoding: 'utf8', cwd: PKG_DIR });
  if (r.status !== 0) {
    throw new Error(`assemble-payload failed (${r.status}): ${r.stderr || r.stdout}`);
  }
  if (!exists(PAYLOAD_DIR)) {
    throw new Error('assemble-payload reported success but produced no bootstrap-payload/');
  }
  return PAYLOAD_DIR;
}

// -----------------------------------------------------------------------------------------------
// Delivery-mode fixtures (design D-R / D-S / D-T).
//
// A canonical SpecBoot source is built in the calling test's OWN setup, per D-O. `omit` drops
// exactly one of the three required artifacts so the invalid-source cases can be exercised one at
// a time rather than as a single undifferentiated "bad source".
// -----------------------------------------------------------------------------------------------

const REQUIRED_ARTIFACTS = {
  guide: 'SPECBOOT_ADOPTION_GUIDE.md',
  phases: 'specboot-adoption/',
  skill: 'ai-specs/skills/specboot-adopt/SKILL.md',
};

function makeCanonicalSource({ omit = null, git = false, prefix = 'specboot-source-' } = {}) {
  const root = makeFixture(prefix);
  const write = (rel, body) => {
    const full = path.join(root, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, body);
  };

  if (omit !== 'guide') write('SPECBOOT_ADOPTION_GUIDE.md', '# Adoption Guide\n\nfixture canonical guide\n');
  if (omit !== 'phases') {
    write('specboot-adoption/00-conventions.md', '# Conventions\n\nfixture\n');
    write('specboot-adoption/09-bootstrap.md', '# ADOPT-00\n\nfixture\n');
    write('specboot-adoption/run-template/ADOPTION-RUN-LOG.template.md', '# Run Log\n\nfixture\n');
  }
  if (omit !== 'skill') {
    write('ai-specs/skills/specboot-adopt/SKILL.md', '---\nname: specboot-adopt\n---\n\nfixture skill body\n');
    write('ai-specs/skills/specboot-adopt/references/source-resolution.md', 'fixture reference\n');
  }

  if (git) {
    spawnSync('git', ['-C', root, 'init', '--quiet'], { encoding: 'utf8' });
    spawnSync('git', ['-C', root, 'add', '-A'], { encoding: 'utf8' });
    spawnSync('git', ['-C', root, '-c', 'user.email=t@example.invalid', '-c', 'user.name=T',
      'commit', '--quiet', '-m', 'fixture'], { encoding: 'utf8' });
  }
  return root;
}

// A source whose skill DIRECTORY exists but whose SKILL.md does not. Validation must reach the
// file: the initial session reads it directly, so a directory alone cannot satisfy the adoption.
function makeSourceWithSkillDirButNoSkillMd() {
  const root = makeCanonicalSource({ omit: 'skill' });
  fs.mkdirSync(path.join(root, 'ai-specs', 'skills', 'specboot-adopt'), { recursive: true });
  fs.writeFileSync(path.join(root, 'ai-specs', 'skills', 'specboot-adopt', 'NOTES.md'), 'not a skill body\n');
  return root;
}

// sha256 of every file under `root`, keyed by relative path. Used to prove the external canonical
// source is byte-identical before and after a run.
function checksumTree(root) {
  const out = {};
  for (const rel of listFiles(root)) {
    out[rel] = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, rel))).digest('hex');
  }
  return out;
}

// The explicit statement the committed manifest carries INSTEAD of a resolved path (design D-S
// option B). A single fixed sentence, asserted here and constrained by `const` in the schema, so
// it cannot be softened, reworded, or quietly dropped.
const LOCAL_PATH_RESOLUTION =
  'The local canonical source path is resolved per machine and is not stored in the committed manifest.';

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function manifestPath(dir) {
  return path.join(dir, '.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json');
}

// Removes the assembled payload, reproducing a clean-checkout state.
function removePayload() {
  fs.rmSync(PAYLOAD_DIR, { recursive: true, force: true });
}


// A Git-backed source whose working tree has UNCOMMITTED CHANGES (design D-S, third disposition).
// The commit exists and is resolvable; it simply does not identify what the run reads. That is the
// whole point of the case: an implementation that reads HEAD and stops thinking passes the clean
// case and silently produces precisely-wrong provenance here.
function makeDirtyCanonicalSource(opts = {}) {
  const root = makeCanonicalSource({ ...opts, git: true });
  fs.appendFileSync(path.join(root, 'SPECBOOT_ADOPTION_GUIDE.md'),
    '\n<!-- uncommitted edit: the working tree no longer matches HEAD -->\n');
  const st = spawnSync('git', ['-C', root, 'status', '--porcelain'], { encoding: 'utf8' });
  if (!st.stdout.trim()) {
    throw new Error('fixture setup failed: the source was expected to be dirty but git reports it clean');
  }
  return root;
}

function headCommit(root) {
  const r = spawnSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : null;
}

// A full structural + content snapshot, used for byte-for-byte "unchanged" assertions. Unlike
// checksumTree it records the ENTRY TYPE too, so a symlink appearing where nothing was before is a
// difference even when its content hash happens to be unremarkable.
function treeState(root) {
  const out = {};
  const walk = (dir) => {
    if (!exists(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === '.git') continue;
      const full = path.join(dir, e.name);
      const rel = path.relative(root, full);
      if (e.isSymbolicLink()) {
        out[rel] = 'symlink:' + fs.readlinkSync(full);
      } else if (e.isDirectory()) {
        out[rel] = 'dir';
        walk(full);
      } else {
        out[rel] = 'file:' + crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
      }
    }
  };
  walk(root);
  return out;
}

// Every string value anywhere in a JSON document, flattened. Used to assert a forbidden value
// (a placeholder selection, a resolved absolute path) appears NOWHERE rather than merely not in
// the one field a test happened to look at.
function allStrings(node, acc = []) {
  if (typeof node === 'string') acc.push(node);
  else if (Array.isArray(node)) node.forEach(n => allStrings(n, acc));
  else if (node && typeof node === 'object') Object.values(node).forEach(n => allStrings(n, acc));
  return acc;
}

// Reads every file the run could have written under `dir` and returns their concatenated text, so
// a forbidden token can be searched for across the whole produced tree at once.
function allWrittenText(dir) {
  let out = '';
  for (const rel of listFiles(dir)) {
    const full = path.join(dir, rel);
    try {
      if (fs.lstatSync(full).isSymbolicLink()) { out += rel + '\n' + fs.readlinkSync(full) + '\n'; continue; }
      out += rel + '\n' + fs.readFileSync(full, 'utf8') + '\n';
    } catch { /* unreadable entries contribute their path only */ out += rel + '\n'; }
  }
  return out;
}

// Makes `.specboot/` unwritable so that provisioning fails AFTER the client discovery entries are
// written and BEFORE the durable state is. This injects a genuine mid-provisioning failure without
// putting a test-only branch into production code. Returns a restore function.
function blockDurableWrites(dir) {
  const sb = path.join(dir, '.specboot');
  fs.mkdirSync(sb, { recursive: true });
  fs.chmodSync(sb, 0o555);
  // Prove the injection actually took: a vacuous pass here would make the all-or-nothing
  // assertion meaningless.
  try {
    fs.mkdirSync(path.join(sb, '.probe'));
    fs.rmSync(path.join(sb, '.probe'), { recursive: true, force: true });
    fs.chmodSync(sb, 0o755);
    throw new Error('failure injection did not take: .specboot/ is still writable (running as root?)');
  } catch (e) {
    if (/did not take/.test(e.message)) throw e;
  }
  return () => { try { fs.chmodSync(sb, 0o755); } catch {} };
}

module.exports = {
  CLI,
  PKG_DIR,
  PAYLOAD_DIR,
  REPO_ROOT,
  assemblePayload,
  removePayload,
  makeFixture,
  removeFixture,
  gitInit,
  runCli,
  gitSaysIgnored,
  exists,
  readIfExists,
  gitignoreRules,
  listFiles,
  REQUIRED_ARTIFACTS,
  LOCAL_PATH_RESOLUTION,
  makeCanonicalSource,
  makeSourceWithSkillDirButNoSkillMd,
  checksumTree,
  readJson,
  manifestPath,
  makeDirtyCanonicalSource,
  headCommit,
  treeState,
  allStrings,
  allWrittenText,
  blockDurableWrites,
};
