'use strict';

// Task 4.32 — an unresolved permanent replacement REFUSES, and the transient entry survives.
//
// Design D-C: "no entry carrying an `intended-permanent-replacement` is removed until that
// replacement is verified to exist and resolve, and an unresolved replacement is FAIL with the
// entry left in place." `10-debootstrap.md` step 2 makes that a discrete pass BEFORE step 3 acts
// on any entry.
//
// Why it matters: a removal that outruns its replacement leaves the repository worse than not
// running the step at all. ADOPT-13's skip-on-exist rule then makes the gap permanent, and the only
// trace is a "skipped" line.
//
// This test drives the REAL `debootstrap` command as a child process. Reimplementing its logic here
// would prove only that the test agrees with itself.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('./helpers');

const SKILL_ENTRY = '.claude/skills/specboot-adopt';

// Bootstraps a fixture normally, then sabotages EXACTLY ONE entry's replacement so a failure
// cannot be mistaken for a whole-run abort.
function bootstrapThenSabotage(replacementPath) {
  const dir = h.gitInit(h.makeFixture('specboot-debootstrap-'));
  const src = h.makeCanonicalSource({ git: true });
  const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
  assert.equal(r.status, 0, `fixture setup failed: bootstrap exited ${r.status}: ${r.stderr}`);

  const mf = h.manifestPath(dir);
  const m = h.readJson(mf);
  const target = m.entries.find(e => e.path === SKILL_ENTRY);
  assert.ok(target, `fixture setup failed: no ${SKILL_ENTRY} entry in the manifest`);
  assert.equal(target['intended-permanent-replacement'], null,
    'fixture setup assumed this entry starts with no replacement');

  target['intended-permanent-replacement'] = replacementPath;
  fs.writeFileSync(mf, JSON.stringify(m, null, 2) + '\n');

  // Prove the sabotage describes something that genuinely does not resolve. A replacement that
  // happens to exist would make every assertion below vacuous.
  const abs = path.join(dir, replacementPath);
  let resolves = false;
  try { resolves = fs.existsSync(fs.realpathSync(abs)); } catch { resolves = false; }
  assert.equal(resolves, false,
    `fixture setup failed: ${replacementPath} resolves, so there is no unresolved replacement to refuse`);

  return { dir, src, mf };
}

describe('4.32 — an unresolved permanent replacement refuses, and the entry survives', () => {
  let dir, src, mf, before_, result, entryLinkBefore;

  before(() => {
    ({ dir, src, mf } = bootstrapThenSabotage('docs/base-standards.md'));
    entryLinkBefore = fs.readlinkSync(path.join(dir, SKILL_ENTRY));
    before_ = h.treeState(dir);
    result = h.runCli(['debootstrap', dir, '--yes']);
  });
  after(() => { h.removeFixture(dir); h.removeFixture(src); });

  // (a) the operation returns the documented failing result
  test('the run exits non-zero and reports the reconciliation', () => {
    assert.notEqual(result.status, 0,
      'an unresolved replacement is FAIL, not cleanup: the run must exit unsuccessfully');
    const out = result.stdout + result.stderr;
    assert.match(out, /FAIL/i, 'the run must record FAIL');
    assert.match(out, new RegExp(SKILL_ENTRY.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      'the report must name the entry it refused to remove');
    assert.match(out, /docs\/base-standards\.md/,
      'the report must name the replacement it was waiting on');
    assert.match(out, /reconcil/i,
      'the run must stop for human reconciliation rather than deciding for itself');
  });

  // (b) the transient entry remains intact
  test('the transient entry is still present, still a symlink, still resolving', () => {
    const abs = path.join(dir, SKILL_ENTRY);
    assert.ok(h.exists(abs), 'the entry whose replacement is missing must be left in place');
    assert.ok(fs.lstatSync(abs).isSymbolicLink(), 'it must still be a symlink, not a leftover stub');
    assert.equal(fs.readlinkSync(abs), entryLinkBefore,
      'its target must be byte-for-byte what it was before the refused run');
    assert.ok(fs.existsSync(fs.realpathSync(abs)),
      'it must still resolve — a surviving but broken entry is not a survival');
  });

  // (c) no unrelated path was removed
  test('nothing was removed, and the only modified path is the manifest', () => {
    const after_ = h.treeState(dir);
    const removed = Object.keys(before_).filter(k => !(k in after_));
    assert.deepStrictEqual(removed, [],
      'a refusal removes nothing: a step that deleted a sibling while refusing fails here');

    const added = Object.keys(after_).filter(k => !(k in before_));
    assert.deepStrictEqual(added, [], 'a refusal creates nothing either');

    const changed = Object.keys(before_).filter(k => k in after_ && before_[k] !== after_[k]);
    const MANIFEST_REL = path.join('.specboot', 'adoption', 'BOOTSTRAP-MANIFEST.json');
    assert.deepStrictEqual(changed.filter(k => k !== MANIFEST_REL), [],
      'the only file a refusal may modify is the manifest, where it records the FAIL');
  });

  // (d) the manifest records neither removal nor a successful disposition for that entry
  test('the refused entry has no terminal successful disposition', () => {
    const e = h.readJson(mf).entries.find(x => x.path === SKILL_ENTRY);
    assert.ok(e, 'the entry must still be in the manifest');
    assert.notEqual(e['cleanup-status'], 'removed',
      'an entry left on disk must not be recorded as removed — a manifest disagreeing with the filesystem is worse than either outcome alone');
    const fd = e['final-disposition'];
    if (fd) {
      assert.doesNotMatch(String(fd.action || ''), /removed|converted/i,
        'no successful final-disposition may be written for a refused entry');
    }
  });

  // (e) durable evidence survives for reconciliation and resume
  test('the durable manifest and run log survive, and still name what is terminal', () => {
    assert.ok(h.exists(mf), 'the committed manifest must survive a refusal — it is the resume source');
    assert.ok(h.exists(path.join(dir, '.specboot', 'adoption', 'ADOPTION-RUN-LOG.md')),
      'the adoption run log must survive too');

    const m = h.readJson(mf);
    assert.ok(Array.isArray(m.entries) && m.entries.length > 0,
      'the manifest must still enumerate its entries');
    for (const e of m.entries) {
      assert.ok('cleanup-status' in e,
        `every entry must still carry a cleanup-status so a resume can tell terminal from pending: ${e.path}`);
    }
  });
});

describe('4.32 — a resolving replacement is unaffected', () => {
  test('an entry whose replacement resolves is still processed normally', () => {
    const dir = h.gitInit(h.makeFixture('specboot-debootstrap-ok-'));
    const src = h.makeCanonicalSource({ git: true });
    try {
      assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

      // A replacement that genuinely exists and resolves.
      fs.mkdirSync(path.join(dir, 'docs'), { recursive: true });
      fs.writeFileSync(path.join(dir, 'docs', 'base-standards.md'), '# standards\n');
      const m = h.readJson(h.manifestPath(dir));
      m.entries.find(e => e.path === SKILL_ENTRY)['intended-permanent-replacement'] = 'docs/base-standards.md';
      fs.writeFileSync(h.manifestPath(dir), JSON.stringify(m, null, 2) + '\n');

      const r = h.runCli(['debootstrap', dir, '--yes']);
      assert.equal(r.status, 0, `a resolving replacement must not block cleanup: ${r.stdout}${r.stderr}`);
      const e = h.readJson(h.manifestPath(dir)).entries.find(x => x.path === SKILL_ENTRY);
      assert.ok(['removed', 'converted'].includes(e['cleanup-status']),
        'the entry must reach a terminal disposition when its replacement resolves');
    } finally { h.removeFixture(dir); h.removeFixture(src); }
  });
});
