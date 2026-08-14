'use strict';

// Tasks 4.5 + 4.6 — canonical payload assembly and the split enforcing/warn-only drift check.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('./helpers');

const KIT_MANIFEST = path.join(h.REPO_ROOT, 'specboot-adoption', 'bootstrap-kit', 'manifest.json');

function loadKitManifest() {
  return JSON.parse(fs.readFileSync(KIT_MANIFEST, 'utf8'));
}

// NOTE (task 5.24): the assertions that STAGED a payload by invoking `bootstrap` moved to
// `test/deferred/packaged-snapshot-payload.test.js` when packaged-snapshot delivery was deferred.
// What remains here is the pack-time assembly and drift-check MACHINERY, which 5.24 deliberately
// retains: the deferred change must inherit working drift protection rather than rebuild it, and
// the kit's no-duplicated-content guarantee depends on the drift check whichever mode consumes it.
describe('canonical payload assembly', () => {
  let dir;
  // Design D-O: this test assembles the payload it intends to test, in its own setup. Without
  // this the payload is absent in a clean checkout, the CLI falls back to the repository root,
  // and the byte-identity assertion compares canonical against canonical - a vacuous pass.
  before(() => {
    h.assemblePayload();
    dir = h.gitInit(h.makeFixture('specboot-assembly-'));
  });
  after(() => h.removeFixture(dir));

  test('kit manifest holds references, never content', () => {
    const m = loadKitManifest();
    assert.ok(Array.isArray(m.entries) && m.entries.length > 0, 'kit manifest must list entries');
    for (const e of m.entries) {
      assert.ok(e.canonicalSource, `entry ${e.id} must name a canonical source path`);
      assert.ok(e.payloadTarget, `entry ${e.id} must name a payload target`);
      assert.equal(e.content, undefined,
        `entry ${e.id} must not embed content - the kit references canonical paths only`);
    }
  });

  test('every assembled payload file is byte-identical to its canonical source', () => {
    const m = loadKitManifest();
    for (const e of m.entries) {
      const canonical = path.join(h.REPO_ROOT, e.canonicalSource.replace(/\/$/, ''));
      const assembled = path.join(h.PAYLOAD_DIR, e.canonicalSource.replace(/\/$/, ''));
      if (!h.exists(canonical)) continue;
      assert.ok(h.exists(assembled), `${e.id}: the assembly must produce ${e.canonicalSource}`);
      if (e.kind === 'file') {
        assert.equal(fs.readFileSync(assembled).toString(), fs.readFileSync(canonical).toString(),
          `${e.id}: assembled payload must be byte-identical to canonical`);
      }
    }
  });
});

describe('drift check', () => {
  let dir;
  // Design D-O: assemble a KNOWN-GOOD payload first, so a failure below means genuine drift and
  // not "never assembled". Determinism here starts the test from a known state; it does not make
  // the assertion more forgiving.
  before(() => {
    h.assemblePayload();
    dir = h.gitInit(h.makeFixture('specboot-drift-'));
  });
  after(() => h.removeFixture(dir));

  // These two run against the ASSEMBLED payload, which needs no bootstrap invocation. That is the
  // payload `prepack` produces and npm ships, so it is the one whose drift protection must stay
  // live now that packaged-snapshot delivery — and the staged payload it created — is deferred.
  test('a freshly assembled payload has NO drift - the check can tell clean from drifted', () => {
    const r = h.runCli(['drift-check', h.REPO_ROOT]);
    assert.equal(r.status, 0, `drift-check failed on a freshly assembled payload: ${r.stdout}${r.stderr}`);
    assert.match(`${r.stdout}`, /Drift failures\s+0 \(enforcing\)/,
      'a freshly assembled payload must report zero enforcing failures');
  });

  test('FAILS when a kit payload file drifts from its canonical source', () => {
    const drifted = path.join(h.PAYLOAD_DIR, 'SPECBOOT_ADOPTION_GUIDE.md');
    const before = fs.readFileSync(drifted);
    try {
      fs.writeFileSync(drifted, before + '\n<!-- injected drift -->\n');
      const r = h.runCli(['drift-check', h.REPO_ROOT]);
      assert.equal(r.status, 1, 'genuine drift in the kit payload must FAIL, not warn');
      assert.match(`${r.stdout}${r.stderr}`, /drift: /,
        'the failure must name the drifted path');
    } finally {
      fs.writeFileSync(drifted, before);
    }
  });

  test('WARNS but does not fail on pre-existing packages/specboot/template/ drift', () => {
    // Baseline recorded in reports/baseline-capture.md: code-auditing, enrich-us and
    // using-git-worktrees already differ from canonical. Design D-I keeps that warn-only so this
    // change does not silently alter three unrelated skills.
    const r = h.runCli(['drift-check', h.REPO_ROOT]);
    assert.equal(r.status, 0,
      'pre-existing template drift must warn, not fail - it is out of scope for this change');
    assert.match(`${r.stdout}${r.stderr}`, /warn/i,
      'pre-existing template drift must still be reported as a warning');
  });
});



describe('packaged files', () => {
  // Design D-O: assemble explicitly here, then run pack with lifecycle scripts SUPPRESSED. Without
  // --ignore-scripts, `prepack` regenerates bootstrap-payload/ as a side effect and repairs the
  // precondition of unrelated tests - which is exactly how this suite previously passed only on a
  // second invocation.
  before(() => { h.assemblePayload(); });

  test('npm pack includes bin/, template/, and the assembled payload directory', () => {
    const { spawnSync } = require('child_process');
    const pkgDir = path.join(h.REPO_ROOT, 'packages', 'specboot');
    const r = spawnSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'],
      { cwd: pkgDir, encoding: 'utf8' });
    assert.equal(r.status, 0, `npm pack --dry-run failed: ${r.stderr}`);

    // `npm pack` may emit lifecycle-script output before the JSON on some npm versions; take the
    // document from the first '[' so the assertion tests packaging, not npm's logging.
    const jsonStart = r.stdout.indexOf('[');
    assert.notEqual(jsonStart, -1, 'npm pack --json must emit a JSON array');
    const report = JSON.parse(r.stdout.slice(jsonStart));
    const files = (report[0] && report[0].files ? report[0].files : []).map(f => f.path);
    assert.ok(files.length > 0, 'npm pack must report files');

    assert.ok(files.some(f => f.startsWith('bin/')), 'package must include bin/');
    assert.ok(files.some(f => f.startsWith('template/')), 'package must include template/');
    assert.ok(files.some(f => f.startsWith('bootstrap-payload/')),
      'package must include the assembled bootstrap payload directory');
  });
});
