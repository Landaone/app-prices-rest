'use strict';

// Tasks 4.5 / 4.6 — payload assembly and drift detection AS OBSERVED THROUGH A BOOTSTRAP RUN.
//
// RETIRED FROM THE ACTIVE SUITE, NOT DELETED (task 4.30 / 5.24). These assertions stage a payload
// by invoking `bootstrap` with no canonical source — the packaged-snapshot path, which is deferred
// whole to `add-specboot-packaged-snapshot-delivery` (design D-W). The CLI now refuses that
// invocation with zero target-repository writes, so they cannot pass here.
//
// The pack-time assembly and the drift check THEMSELVES remain covered by the active
// `test/payload-assembly.test.js`: 5.24 retains that machinery deliberately, so retiring the mode
// did not silently retire the drift protection the kit depends on.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('../helpers');

describe('payload staged by a packaged-snapshot bootstrap run', () => {
  let dir;
  // Design D-O: this test assembles the payload it intends to test, in its own setup. Without
  // this the payload is absent in a clean checkout, the CLI falls back to the repository root,
  // and the byte-identity assertion compares canonical against canonical - a vacuous pass.
  before(() => {
    h.assemblePayload();
    dir = h.gitInit(h.makeFixture('specboot-assembly-'));
  });
  after(() => h.removeFixture(dir));

  test('the assembled payload is what is under test, not a source-copy fallback', () => {
    // Guards against the vacuous pass: with bootstrap-payload/ present the CLI must resolve the
    // npm channel, so the comparison below exercises the assembled payload rather than canonical
    // against itself.
    assert.ok(h.exists(h.PAYLOAD_DIR), 'setup must have assembled the payload');
    const r = h.runCli(['bootstrap', dir]);
    assert.equal(r.status, 0, `bootstrap exited ${r.status}: ${r.stderr}`);
    assert.match(r.stdout, /Channel:\s*npm/,
      'with an assembled payload present the CLI must use the npm channel, not the source-copy fallback');
  });

  test('every assembled payload file is byte-identical to its canonical source', () => {
    const r = h.runCli(['bootstrap', dir]);
    assert.equal(r.status, 0, `bootstrap exited ${r.status}: ${r.stderr}`);

    const m = loadKitManifest();
    let compared = 0;

    for (const e of m.entries) {
      const canonical = path.join(h.REPO_ROOT, e.canonicalSource);
      const delivered = path.join(dir, e.payloadTarget);
      if (!h.exists(canonical)) continue;

      if (e.kind === 'file') {
        assert.ok(h.exists(delivered), `payload missing ${e.payloadTarget}`);
        assert.deepEqual(fs.readFileSync(delivered), fs.readFileSync(canonical),
          `${e.payloadTarget} must be byte-identical to ${e.canonicalSource}`);
        compared++;
      } else if (e.kind === 'directory') {
        const exclude = e.exclude || [];
        for (const rel of h.listFiles(canonical)) {
          if (exclude.some(x => rel.startsWith(x.replace(/\/$/, '')))) continue;
          const src = path.join(canonical, rel);
          const dst = path.join(delivered, rel);
          assert.ok(h.exists(dst), `payload missing ${path.join(e.payloadTarget, rel)}`);
          assert.deepEqual(fs.readFileSync(dst), fs.readFileSync(src),
            `${rel} must be byte-identical to its canonical source`);
          compared++;
        }
      }
    }

    assert.ok(compared > 0, 'assembly test must actually compare files, not vacuously pass');
  });
});

});

describe('drift check over a staged payload', () => {
  let dir;
  // Design D-O: assemble a KNOWN-GOOD payload first, so a failure below means genuine drift and
  // not "never assembled". Determinism here starts the test from a known state; it does not make
  // the assertion more forgiving.
  before(() => {
    h.assemblePayload();
    dir = h.gitInit(h.makeFixture('specboot-drift-'));
  });
  after(() => h.removeFixture(dir));

  test('a freshly assembled payload has NO drift - the check can tell clean from drifted', () => {
    const r0 = h.runCli(['bootstrap', dir]);
    assert.equal(r0.status, 0, 'initial bootstrap must succeed');
    const r = h.runCli(['drift-check', dir]);
    assert.equal(r.status, 0,
      'a freshly assembled payload must report no drift - otherwise the drift test cannot ' +
      'distinguish genuine drift from a stale or absent payload');
  });

  test('FAILS when a kit payload file drifts from its canonical source', () => {
    const r0 = h.runCli(['bootstrap', dir]);
    assert.equal(r0.status, 0, 'initial bootstrap must succeed');

    const guide = path.join(dir, '.specboot', 'bootstrap', 'SPECBOOT_ADOPTION_GUIDE.md');
    fs.appendFileSync(guide, '\n<!-- deliberate drift injected by the test -->\n');

    const r = h.runCli(['drift-check', dir]);
    assert.notEqual(r.status, 0,
      'drift check must exit non-zero when an assembled payload file differs from canonical');
    assert.match(`${r.stdout}${r.stderr}`, /drift/i, 'drift check must name the problem');
  });

});
