'use strict';

// Task 4.3 — the `bootstrap` subcommand in PACKAGED-SNAPSHOT mode.
//
// RETIRED FROM THE ACTIVE SUITE, NOT DELETED (task 4.30). Packaged-snapshot delivery is deferred
// in full to `add-specboot-packaged-snapshot-delivery` (design D-W), and the CLI no longer exposes
// it: with no validated canonical source the run fails closed with zero target-repository writes.
//
// These assertions describe what packaged-snapshot did at the time they were written. They are
// preserved verbatim as PRIOR EVIDENCE for the deferred change, which inherits them as its
// starting point. Rewriting them to match a later scope decision would be the fabrication this
// contract forbids everywhere else.
//
// `test/deferred/` is outside the `test/*.test.js` glob in package.json `scripts.test`, so these
// do not run. The deferred change re-activates them.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('../helpers');

describe('bootstrap subcommand — packaged-snapshot mode (no canonical source supplied)', () => {
  let dir;
  before(() => {
    h.assemblePayload();   // D-O: this block establishes the payload state it depends on
    dir = h.gitInit(h.makeFixture('specboot-bootstrap-'));
  });
  after(() => h.removeFixture(dir));

  test('creates the transient payload under .specboot/bootstrap/ in packaged-snapshot mode', () => {
    const r = h.runCli(['bootstrap', dir]);   // no --source: packaged-snapshot fallback
    assert.equal(r.status, 0, `bootstrap exited ${r.status}: ${r.stderr}`);

    assert.ok(h.exists(path.join(dir, '.specboot', 'bootstrap')),
      '.specboot/bootstrap/ payload directory must exist');
    assert.ok(h.exists(path.join(dir, '.specboot', 'bootstrap', 'SPECBOOT_ADOPTION_GUIDE.md')),
      'payload must carry the adoption guide');
    assert.ok(h.exists(path.join(dir, '.specboot', 'bootstrap', 'specboot-adoption')),
      'payload must carry the phase files');
    assert.ok(h.exists(path.join(dir, '.specboot', 'bootstrap', 'README.md')),
      'payload must state what the directory is and that ADOPT-18 removes it');
  });

  test('records packaged-snapshot as the delivery mode it took', () => {
    const m = JSON.parse(fs.readFileSync(
      path.join(dir, '.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json'), 'utf8'));
    assert.equal(m.source['delivery-mode'], 'packaged-snapshot',
      'the payload assertions in this block hold for this mode, and only for this mode');
  });

  test('writes the durable BOOTSTRAP-MANIFEST.json under .specboot/adoption/', () => {
    const manifestPath = path.join(dir, '.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json');
    assert.ok(h.exists(manifestPath), 'durable manifest must exist');

    const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.ok(Array.isArray(m.entries), 'manifest must carry an entries array');
    assert.ok(m.entries.length > 0, 'manifest must inventory what bootstrap created');
    assert.ok(m.selectedClient !== undefined, 'manifest must record the declared client');
    assert.ok(m.environment && typeof m.environment.symlinksSupported === 'boolean',
      'manifest must record capability-detected symlink support, never assume it');

    const required = ['path', 'source', 'checksum', 'ownership', 'mode',
      'intended-permanent-replacement', 'cleanup-status'];
    for (const entry of m.entries) {
      for (const field of required) {
        assert.ok(Object.prototype.hasOwnProperty.call(entry, field),
          `every manifest entry needs "${field}" (missing on ${entry.path})`);
      }
      assert.ok(['bootstrap-created', 'pre-existing-modified', 'pre-existing-untouched']
        .includes(entry.ownership), `bad ownership on ${entry.path}: ${entry.ownership}`);
      assert.ok(['symlink', 'copy', 'appended-block', 'real-file'].includes(entry.mode),
        `bad mode on ${entry.path}: ${entry.mode}`);
      assert.equal(entry['cleanup-status'], 'pending',
        'a freshly bootstrapped entry starts at cleanup-status "pending"');
    }
  });

  test('never creates a real file where a later step needs a symlink', () => {
    // ADOPT-03's `cp -rn` and createSymlink both skip existing paths, and ADOPT-13 preserves a
    // real directory colliding with a canonical skill name. A real root instruction file or a
    // real skill directory here would become permanent and be recorded only as "skipped".
    for (const rootInstruction of ['CLAUDE.md', 'AGENTS.md', 'codex.md', 'GEMINI.md']) {
      const p = path.join(dir, rootInstruction);
      if (h.exists(p)) {
        const st = fs.lstatSync(p);
        if (!st.isSymbolicLink()) {
          const m = JSON.parse(fs.readFileSync(
            path.join(dir, '.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json'), 'utf8'));
          const entry = m.entries.find(e => e.path === rootInstruction);
          assert.ok(entry, `real ${rootInstruction} must be registered in the manifest`);
          assert.ok(entry['intended-permanent-replacement'],
            `real ${rootInstruction} must name an intended-permanent-replacement`);
        }
      }
    }

    const skillDir = path.join(dir, '.claude', 'skills', 'specboot-adopt');
    if (h.exists(skillDir)) {
      assert.ok(fs.lstatSync(skillDir).isSymbolicLink(),
        '.claude/skills/specboot-adopt must be a symlink, never a real directory');
    }
  });

  test('re-running bootstrap is a no-op that reports existing entries', () => {
    const before = h.listFiles(dir).sort();
    const r = h.runCli(['bootstrap', dir]);
    assert.equal(r.status, 0, 'second bootstrap run must succeed');
    const after = h.listFiles(dir).sort();
    assert.deepEqual(after, before, 're-running bootstrap must not change the file set');
  });
});
