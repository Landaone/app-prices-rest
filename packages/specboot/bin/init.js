#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template');
const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

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
const STAGING_PROBE = '.specboot/staging/.specboot-probe';
const STAGING_BLOCK =
  '### SpecBoot ###\n' +
  '# enrich-us staging: durable local copy of an enriched work-item artifact, not committed\n' +
  STAGING_RULE + '\n';

// Asks Git whether it already treats a path under `.specboot/staging/` as ignored - by any
// rule, exact or broader (e.g. a bare `.specboot/` line), not just the exact narrow rule.
// The probe path does not need to exist on disk; `git check-ignore` evaluates pathnames.
// Returns true (ignored) / false (not ignored) when Git gives a clean answer, or null when
// Git's evaluation could not be run (not a repo, git missing, or any other failure).
function gitSaysStagingIgnored(targetDir) {
  const result = spawnSync('git', ['-C', targetDir, 'check-ignore', '--quiet', STAGING_PROBE], {
    stdio: 'ignore',
  });
  if (result.error || result.status === null) return null;
  if (result.status === 0) return true;
  if (result.status === 1) return false;
  return null;
}

function writeOrAppendStagingBlock(gitignorePath) {
  if (!pathExists(gitignorePath)) {
    fs.writeFileSync(gitignorePath, STAGING_BLOCK);
    stats.gitignore = 'created';
    return;
  }

  const content = fs.readFileSync(gitignorePath, 'utf8');
  let prefix = '';
  if (content.length > 0) {
    prefix = (content.endsWith('\n') ? '' : '\n') + '\n';
  }
  fs.appendFileSync(gitignorePath, prefix + STAGING_BLOCK);
  stats.gitignore = 'appended';
}

// Ensures a path under `.specboot/staging/` is ignored by Git. Prefers Git's own ignore
// evaluation (recognizes exact, broader, or otherwise-equivalent existing rules as already
// satisfying this - a true no-op when so). Falls back to a conservative exact-line-only
// check when Git's evaluation cannot be run. Never replaces existing content, never widens
// the written rule to a bare `.specboot/` pattern.
function ensureGitignoreStagingRule() {
  const gitignorePath = path.join(target, '.gitignore');
  const gitVerdict = gitSaysStagingIgnored(target);

  if (gitVerdict === true) {
    stats.gitignore = 'already ignored (git)';
    return;
  }

  if (gitVerdict === false) {
    writeOrAppendStagingBlock(gitignorePath);
    return;
  }

  // gitVerdict === null: Git's evaluation is unavailable - conservative fallback,
  // exact-line recognition only (does not interpret broader rules itself).
  if (pathExists(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, 'utf8');
    const alreadyPresent = content.split(/\r?\n/).some(line => line.trim() === STAGING_RULE);
    if (alreadyPresent) {
      stats.gitignore = 'already present';
      return;
    }
  }
  writeOrAppendStagingBlock(gitignorePath);
}

function main() {
  console.log('\n  lidr-specboot');
  console.log('  Augmented Spec-driven development powered by OpenSpec\n');
  console.log(`  Target: ${target}\n`);

  copyRecursive(TEMPLATE_DIR, target);
  ensureGitignoreStagingRule();

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
  console.log(`  .gitignore    ${stats.gitignore} (.specboot/staging/ rule)`);

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

main();
