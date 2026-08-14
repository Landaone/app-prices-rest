'use strict';

// Task 4.26 — the preflight, and all-or-nothing provisioning (design D-X).
//
// The approval gate presented an INTENTION while collisions were discovered DURING provisioning,
// one path at a time. A run that hits its second collision after writing its first entry has
// already produced the state nobody approved.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('./helpers');

// Pre-creates three of the paths the claude recipe will occupy, so the preflight has more than one
// collision to find. One collision can be found by accident; three cannot.
function seedCollisions(dir) {
  const collided = [
    '.claude/skills/specboot-adopt',
    '.claude/CLAUDE.md',
    '.gitignore',
  ];
  fs.mkdirSync(path.join(dir, '.claude', 'skills', 'specboot-adopt'), { recursive: true });
  fs.writeFileSync(path.join(dir, '.claude', 'skills', 'specboot-adopt', 'PREEXISTING.md'), 'mine\n');
  fs.writeFileSync(path.join(dir, '.claude', 'CLAUDE.md'), '# pre-existing project instructions\n');
  fs.writeFileSync(path.join(dir, '.gitignore'), 'node_modules/\n');
  return collided;
}

describe('4.26 — every collision is detected in preflight, before any write', () => {
  test('all collisions are reported together, and nothing is written', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      const collided = seedCollisions(dir);
      const before = h.treeState(dir);
      const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
      const out = r.stdout + r.stderr;

      for (const c of collided) {
        assert.match(out, new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
          `the preflight must report the collision at ${c} before anything is written`);
      }
      assert.deepStrictEqual(h.treeState(dir), before,
        'a run reporting collisions must leave the target byte-for-byte unchanged');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });

  test('the mutation inventory names path, operation, mechanism, and reversibility', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    try {
      const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--dry-run']);
      const out = r.stdout + r.stderr;
      assert.match(out, /\.claude\/skills\/specboot-adopt/, 'the inventory must name each path');
      assert.match(out, /create|modify/i, 'the inventory must state the operation');
      assert.match(out, /symlink|appended-block|real-file/i, 'the inventory must state the mechanism');
      assert.match(out, /reversib/i, 'the inventory must state reversibility');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });
});

describe('4.26 — provisioning is all-or-nothing', () => {
  test('a failure partway through leaves nothing behind', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    let restore = () => {};
    try {
      const before = h.treeState(dir);
      restore = h.blockDurableWrites(dir);

      const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
      assert.notEqual(r.status, 0, 'a provisioning failure must exit non-zero');

      restore();
      fs.rmSync(path.join(dir, '.specboot'), { recursive: true, force: true });

      assert.deepStrictEqual(h.treeState(dir), before,
        'the pre-provisioning state must be restored: no orphaned discovery entry, manifest, run log, ignore rule, or machine-local store');
    } finally { restore(); h.removeFixture(dir); h.removeFixture(src); }
  });

  test('specifically: no orphaned discovery entry survives a failed provisioning', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    let restore = () => {};
    try {
      restore = h.blockDurableWrites(dir);
      h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
      restore();
      assert.equal(h.exists(path.join(dir, '.claude', 'skills', 'specboot-adopt')), false,
        'the discovery entry written before the failure must be removed by the restore');
      assert.equal(h.exists(path.join(dir, '.claude', 'CLAUDE.md')), false,
        'the instruction file written before the failure must be removed by the restore');
    } finally { restore(); h.removeFixture(dir); h.removeFixture(src); }
  });

  test('a retry after a failed provisioning starts from a repository that was never bootstrapped', () => {
    const dir = h.makeFixture();
    const src = h.makeCanonicalSource();
    let restore = () => {};
    try {
      restore = h.blockDurableWrites(dir);
      h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
      restore();
      fs.rmSync(path.join(dir, '.specboot'), { recursive: true, force: true });

      const r2 = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
      assert.equal(r2.status, 0, 'the retry must succeed rather than trip over leftovers');
      assert.equal(/Already bootstrapped/.test(r2.stdout), false,
        'the retry must not be short-circuited by a manifest a failed run left behind');
    } finally { restore(); h.removeFixture(dir); h.removeFixture(src); }
  });
});
