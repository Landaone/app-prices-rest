'use strict';

// RETIRED FROM THE ACTIVE SUITE, NOT DELETED (task 4.30). This is task 4.21's behavior-pinning
// baseline for packaged-snapshot mode, preserved verbatim as prior evidence for the deferred
// change `add-specboot-packaged-snapshot-delivery` (design D-W). It pinned that mode's end state
// before source-linked delivery was added; it is retained so the deferred change starts from a
// measured baseline rather than from memory.

// Task 4.21 — the packaged-snapshot regression.
//
// The baseline in `fixtures-packaged-snapshot-baseline.json` was captured BEFORE source-linked
// mode existed. That ordering is the whole point: a regression written after the feature lands
// proves only that the code agrees with itself.
//
// Scope, stated once so it cannot be widened or narrowed later by argument: this pins what
// packaged-snapshot DOES - the payload tree it stages, the entry inventory it records, the durable
// artifacts it writes, and the ignore rules it provisions. Run-level provenance that the manifest
// schema requires in BOTH modes is an additive record ABOUT the run; the assertions below are
// additive-safe by construction and are never relaxed to accommodate source-linked mode.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const h = require('../helpers');

const BASELINE = require('./fixtures-packaged-snapshot-baseline.json');

describe('packaged-snapshot behavior is preserved unchanged (4.21)', () => {
  let dir;

  before(() => {
    h.assemblePayload();                       // D-O: this test establishes its own payload state
    dir = h.gitInit(h.makeFixture('specboot-pkgsnap-'));
    const r = h.runCli(['bootstrap', dir]);
    assert.equal(r.status, 0, `packaged-snapshot bootstrap exited ${r.status}: ${r.stderr}`);
  });

  after(() => h.removeFixture(dir));

  // Two assertions, deliberately in opposite directions. Together they pin the BEHAVIOR - "stage
  // exactly the canonical projection the kit manifest describes" - rather than freezing a content
  // inventory that legitimately grows when canonical sources gain a file.
  //
  //   (1) superset: every path the pre-source-linked baseline staged is still staged. An
  //       implementation that drops a payload file fails here.
  //   (2) exactness against the mapping: the tree is precisely what the kit manifest projects,
  //       with its documented exclusions honored. An implementation that stages something outside
  //       the mapping, or ignores an exclusion, fails here.
  //
  // Neither can be satisfied by weakening the other, and no assertion was removed to accommodate
  // source-linked mode.
  test('still stages every path the pre-source-linked baseline staged', () => {
    const actual = new Set(h.listFiles(path.join(dir, '.specboot', 'bootstrap')));
    const missing = BASELINE.payloadTree.filter(p => !actual.has(p));
    assert.deepEqual(missing, [],
      'a packaged-snapshot payload file present at the baseline may never stop being staged');
  });

  test('stages exactly the canonical projection the kit manifest describes, and nothing else', () => {
    const kit = h.readJson(path.join(h.REPO_ROOT, 'specboot-adoption', 'bootstrap-kit', 'manifest.json'));
    const expected = new Set();
    for (const e of kit.entries) {
      const from = path.join(h.REPO_ROOT, e.canonicalSource.replace(/\/$/, ''));
      const targetRel = e.payloadTarget.replace(/^\.specboot\/bootstrap\//, '').replace(/\/$/, '');
      if (e.kind === 'file') {
        expected.add(targetRel);
      } else {
        const excluded = (e.exclude || []).map(x => x.replace(/\/$/, ''));
        for (const rel of h.listFiles(from)) {
          if (excluded.some(x => rel.split(path.sep)[0] === x)) continue;
          expected.add(path.join(targetRel, rel));
        }
      }
    }
    const actual = h.listFiles(path.join(dir, '.specboot', 'bootstrap')).sort();
    assert.deepEqual(actual, [...expected].sort(),
      'the payload is the manifest projection of canonical sources - no more, no less');

    // The exclusions are part of the behavior, asserted by name so they cannot lapse silently.
    assert.equal(actual.some(f => f.split(path.sep).includes('history')), false,
      'specboot-adoption/history/ is excluded from the payload');
    assert.equal(actual.some(f => f.startsWith(path.join('specboot-adoption', 'bootstrap-kit'))), false,
      'specboot-adoption/bootstrap-kit/ is excluded from the payload');
  });

  test('writes exactly the baseline durable artifacts', () => {
    const actual = h.listFiles(path.join(dir, '.specboot', 'adoption')).sort();
    assert.deepEqual(actual, BASELINE.durableArtifacts);
  });

  test('records the baseline entry inventory, field for field', () => {
    const m = h.readJson(h.manifestPath(dir));
    const actual = m.entries.map(e => ({
      path: e.path,
      ownership: e.ownership,
      mode: e.mode,
      'cleanup-status': e['cleanup-status'],
      canonicalPath: e.source.canonicalPath,
      'intended-permanent-replacement': e['intended-permanent-replacement'],
    })).sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));

    assert.deepEqual(actual, BASELINE.entries,
      'every packaged-snapshot entry must reproduce its baseline path, ownership, mode, ' +
      'cleanup-status, canonical source and replacement');
    assert.equal(m.deliveryChannel, BASELINE.deliveryChannel);
  });

  test('provisions exactly the baseline ignore rules and never ignores the durable path', () => {
    assert.deepEqual(h.gitignoreRules(dir), BASELINE.gitignoreRules);
    assert.equal(h.gitSaysIgnored(dir, '.specboot/adoption/'), false,
      '.specboot/adoption/ holds committed evidence and is never ignored');
    assert.equal(h.gitignoreRules(dir).includes('.specboot/'), false,
      'a bare .specboot/ rule would swallow the durable root');
  });

  test('still records packaged-snapshot as its delivery mode once modes exist', () => {
    const m = h.readJson(h.manifestPath(dir));
    assert.ok(m.source, 'the manifest must carry the run-level source block');
    assert.equal(m.source['delivery-mode'], 'packaged-snapshot');
    // Reversed by 4.16 under design D-S option B: the `path` field is gone from the committed
    // manifest in BOTH modes, so the packaged-snapshot assertion is that no such field exists -
    // not that it exists holding null. This tightens the pin rather than relaxing it.
    assert.equal(Object.prototype.hasOwnProperty.call(m.source, 'path'), false,
      'no resolved-path field exists in the committed manifest in any mode');
    assert.equal(m.source['local-path-resolution'], h.LOCAL_PATH_RESOLUTION,
      'the per-machine-resolution statement is carried in packaged-snapshot mode too');
  });
});
