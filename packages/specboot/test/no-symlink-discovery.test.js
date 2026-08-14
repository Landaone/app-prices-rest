'use strict';

// Task 4.28 — where the selected client cannot natively discover the external skill without a
// symlink, the run FAILS CLOSED before provisioning (design D-D).
//
// Discovery is a property of the CLIENT, not of the filesystem. A client that surfaces a skill
// through a symlinked directory does not surface it through a text file containing a path.
// Recording such a file as a discovery entry claims a capability nobody observed - the same defect
// as recording presence on disk as discovery, arrived at from the other side.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const h = require('./helpers');

function runNoSymlinks(dir, src, client = 'claude') {
  return h.runCli(['bootstrap', dir, '--source', src, '--client', client, '--no-symlinks', '--yes']);
}

describe('4.28 — unsupported no-symlink discovery fails closed before provisioning', () => {
  test('the run stops and the target is byte-for-byte unchanged', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      const before = h.treeState(dir);
      const r = runNoSymlinks(dir, src);
      assert.notEqual(r.status, 0, 'the run must exit non-zero rather than degrade');
      assert.deepStrictEqual(h.treeState(dir), before,
        'a capability refusal must leave the target repository byte-for-byte unchanged');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('the refusal names the client, the mechanism, and what was attempted', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      const out = (r => r.stdout + r.stderr)(runNoSymlinks(dir, src));
      assert.match(out, /claude/i, 'the limitation is client-specific: name the client');
      assert.match(out, /symlink/i, 'name the mechanism the recipe requires');
      assert.match(out, /discover/i, 'say that native discovery is what cannot be provisioned');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('NO pointer-file discovery entry is created', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      runNoSymlinks(dir, src);
      assert.equal(h.exists(path.join(dir, '.claude', 'skills', 'specboot-adopt')), false,
        'a real file at the client\'s skill path is not a discovered skill and must not be written as one');
      const mf = h.manifestPath(dir);
      if (h.exists(mf)) {
        const modes = (h.readJson(mf).entries || []).map(e => e.mode);
        assert.equal(modes.includes('pointer-file'), false,
          'pointer-file must not be recordable as a discovery entry mode');
      }
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('NO content copy is made as a fallback', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      runNoSymlinks(dir, src);
      const copied = h.listFiles(dir).filter(f => /SKILL\.md$|SPECBOOT_ADOPTION_GUIDE\.md$/.test(f));
      assert.deepStrictEqual(copied, [],
        'copying canonical content is the fork source-linked delivery exists to prevent');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('the schema no longer admits pointer-file as an entry mode', () => {
    const fs = require('fs');
    const schema = JSON.parse(fs.readFileSync(
      path.join(h.REPO_ROOT, 'specboot-adoption', 'bootstrap-kit', 'BOOTSTRAP-MANIFEST.schema.json'), 'utf8'));
    const modeEnum = schema.properties.entries.items.properties.mode.enum;
    assert.equal(modeEnum.includes('pointer-file'), false,
      'the claim must be unmakeable at the schema level, not merely discouraged in prose');
  });
});
