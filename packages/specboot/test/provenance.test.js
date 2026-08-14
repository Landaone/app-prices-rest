'use strict';

// Task 4.27 — Git provenance has THREE dispositions, not two (design D-S).
//
// A dirty working tree has content that no commit identifies. Reading HEAD and writing it down as
// though it did produces provenance that is PRECISELY WRONG - worse than absent, because a later
// reader can resolve the commit, diff nothing, and conclude the source matched.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const h = require('./helpers');

function bootstrapAgainst(src, client = 'claude') {
  const dir = h.makeFixture();
  const r = h.runCli(['bootstrap', dir, '--source', src, '--client', client, '--yes']);
  return { dir, r };
}

describe('4.27 — a clean Git working tree records its commit', () => {
  test('worktree clean, status recorded, the commit present', () => {
    const src = h.makeCanonicalSource({ git: true });
    const { dir } = bootstrapAgainst(src);
    try {
      const m = h.readJson(h.manifestPath(dir));
      assert.equal(m.source.git.worktree, 'clean');
      assert.equal(m.source.git.status, 'recorded');
      assert.equal(m.source.git.commit, h.headCommit(src));
      assert.equal('observed-head' in m.source.git, false,
        'observed-head is context for the dirty case only');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });
});

describe('4.27 — a non-repository records unavailable with its reason', () => {
  test('worktree not-a-repository, status unavailable, a non-empty reason, no commit', () => {
    const src = h.makeCanonicalSource({ git: false });
    const { dir } = bootstrapAgainst(src);
    try {
      const m = h.readJson(h.manifestPath(dir));
      assert.equal(m.source.git.worktree, 'not-a-repository');
      assert.equal(m.source.git.status, 'unavailable');
      assert.ok(m.source.git.reason && m.source.git.reason.length > 0,
        'unavailable must carry its reason - an absent field is indistinguishable from an uncollected one');
      assert.equal('commit' in m.source.git, false, 'no commit may be recorded where none exists');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });
});

describe('4.27 — a DIRTY Git working tree records unavailable, never its HEAD as identity', () => {
  test('worktree dirty, status unavailable, with the reason', () => {
    const src = h.makeDirtyCanonicalSource();
    const { dir } = bootstrapAgainst(src);
    try {
      const m = h.readJson(h.manifestPath(dir));
      assert.equal(m.source.git.worktree, 'dirty',
        'the dirty state must be represented, not collapsed into the clean one');
      assert.equal(m.source.git.status, 'unavailable',
        'a commit cannot identify content the run did not read from it');
      assert.match(m.source.git.reason || '', /uncommitted|dirty|working tree/i,
        'the reason must say WHY provenance is unavailable here');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('the HEAD commit never reaches the identity field', () => {
    const src = h.makeDirtyCanonicalSource();
    const head = h.headCommit(src);
    const { dir } = bootstrapAgainst(src);
    try {
      const m = h.readJson(h.manifestPath(dir));
      assert.equal('commit' in m.source.git, false,
        'the field a consumer reads as identity must be absent for a dirty tree');
      if (m.source.git['observed-head']) {
        assert.equal(m.source.git['observed-head'].commit, head);
        assert.match(m.source.git['observed-head'].note, /does not identify/i,
          'a retained HEAD must be explicitly labelled as not identifying the source content');
      }
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('the checksums are still recorded, and still match the bytes actually read', () => {
    const src = h.makeDirtyCanonicalSource();
    const { dir } = bootstrapAgainst(src);
    try {
      const crypto = require('crypto');
      const fs = require('fs');
      const path = require('path');
      const m = h.readJson(h.manifestPath(dir));
      const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
      assert.equal(m.source['guide-checksum'],
        sha(path.join(src, 'SPECBOOT_ADOPTION_GUIDE.md')),
        'identity must reflect the WORKING TREE bytes, including the uncommitted edit');
      assert.equal(m.source['skill-checksum'],
        sha(path.join(src, 'ai-specs', 'skills', 'specboot-adopt', 'SKILL.md')));
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('no commit value is inferred anywhere in the source block', () => {
    const src = h.makeDirtyCanonicalSource();
    const head = h.headCommit(src);
    const { dir } = bootstrapAgainst(src);
    try {
      const m = h.readJson(h.manifestPath(dir));
      const git = m.source.git;
      const identityStrings = Object.entries(git)
        .filter(([k]) => k !== 'observed-head')
        .map(([, v]) => (typeof v === 'string' ? v : ''));
      assert.equal(identityStrings.includes(head), false,
        'HEAD must appear only under observed-head, never as a bare identity value');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });
});
