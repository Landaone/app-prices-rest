'use strict';

// Tasks 4.24, 4.25, 4.30 — the refusals that make source-linked delivery safe.
//
// The shared property under test is NOT "the run reports an error". It is that the run reports an
// error AND the target repository is byte-for-byte unchanged. A CLI that validates after writing
// has already produced the state nobody approved; skip-on-exist (the ambient failure mode this
// whole design is built against) then makes that state look like a success in the record.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('./helpers');

const PLACEHOLDERS = ['undeclared', 'unknown', 'default', 'none'];

// Asserts a refusal: non-zero exit, and nothing whatsoever created in the target.
function assertRefusedWithZeroWrites(r, dir, before) {
  assert.notEqual(r.status, 0, 'the run must exit non-zero');
  assert.deepStrictEqual(h.treeState(dir), before,
    'the target repository must be byte-for-byte unchanged after a refusal');
  for (const p of ['.specboot', '.claude', '.kiro', '.agents', '.gitignore', 'AGENTS.md']) {
    assert.equal(h.exists(path.join(dir, p)), false, `${p} must not exist after a refusal`);
  }
}

describe('4.24 — a missing client selection refuses with zero writes', () => {
  test('a validated source with NO --client refuses and writes nothing', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      const before = h.treeState(dir);
      const r = h.runCli(['bootstrap', dir, '--source', src]);
      assertRefusedWithZeroWrites(r, dir, before);
      assert.match(r.stderr, /client/i, 'the refusal must say a client selection is required');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('NO source and NO client refuses — no placeholder selection is ever written', () => {
    const dir = h.makeFixture();
    try {
      const before = h.treeState(dir);
      const r = h.runCli(['bootstrap', dir]);
      assertRefusedWithZeroWrites(r, dir, before);
    } finally { h.removeFixture(dir); }
  });

  test('no committed artifact anywhere records a placeholder selection', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      // Both invocation shapes. Neither may leave a manifest behind at all; if one does, it must
      // certainly not claim a human made a selection they did not make.
      h.runCli(['bootstrap', dir]);
      h.runCli(['bootstrap', dir, '--source', src]);
      const mf = h.manifestPath(dir);
      if (h.exists(mf)) {
        const strings = h.allStrings(h.readJson(mf));
        for (const bad of PLACEHOLDERS) {
          assert.equal(strings.includes(bad), false,
            `the committed manifest must never record "${bad}" as a client selection`);
        }
      }
      const written = h.allWrittenText(dir);
      assert.equal(/undeclared/.test(written), false,
        'no artifact the run wrote may contain the placeholder "undeclared"');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });
});

describe('4.25 — an unknown client refuses with zero writes and names what is supported', () => {
  test('a client with no recipe refuses and writes nothing', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      const before = h.treeState(dir);
      const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'emacs-copilot']);
      assertRefusedWithZeroWrites(r, dir, before);
      assert.match(r.stderr, /emacs-copilot/, 'the refusal must name the unsupported client');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('the refusal lists the clients that ARE supported', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'emacs-copilot']);
      const out = r.stderr + r.stdout;
      for (const supported of ['claude', 'kiro', 'codex']) {
        assert.match(out, new RegExp(supported),
          `the refusal must list "${supported}" among the supported clients, so the operator can act on it`);
      }
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('the nearest supported client is never substituted', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude-code']);
      assert.equal(h.exists(path.join(dir, '.claude')), false,
        'a near-miss client name must not be resolved to claude on the run\'s own judgement');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });
});

describe('4.30 — no packaged-snapshot path remains reachable', () => {
  test('bootstrap with no --source fails closed with zero target-repository writes', () => {
    const dir = h.makeFixture();
    try {
      const before = h.treeState(dir);
      const r = h.runCli(['bootstrap', dir, '--client', 'claude']);
      assertRefusedWithZeroWrites(r, dir, before);
      assert.match(r.stderr + r.stdout, /source/i,
        'the refusal must report that a validated canonical source is required');
    } finally { h.removeFixture(dir); }
  });

  test('no payload is assembled, and no .specboot/bootstrap/ is created', () => {
    const dir = h.makeFixture();
    try {
      h.runCli(['bootstrap', dir]);
      h.runCli(['bootstrap', dir, '--client', 'claude']);
      assert.equal(h.exists(path.join(dir, '.specboot', 'bootstrap')), false,
        '.specboot/bootstrap/ belongs to the deferred packaged-snapshot mode and must never be created');
      assert.equal(h.exists(h.manifestPath(dir)), false,
        'a refused run must not leave a durable manifest behind');
    } finally { h.removeFixture(dir); }
  });

  test('no copied guide, phase file, or skill body appears anywhere', () => {
    const dir = h.makeFixture();
    try {
      h.runCli(['bootstrap', dir]);
      const copied = h.listFiles(dir).filter(f =>
        /SPECBOOT_ADOPTION_GUIDE\.md$/.test(f) ||
        /specboot-adoption\//.test(f) ||
        /skills\/specboot-adopt\/SKILL\.md$/.test(f));
      assert.deepStrictEqual(copied, [],
        'a refused run must copy nothing; copying is the fork source-linked delivery exists to prevent');
    } finally { h.removeFixture(dir); }
  });
});
