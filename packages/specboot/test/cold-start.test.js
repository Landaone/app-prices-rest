'use strict';

// Task 4.29 — a genuinely virgin source-linked cold start reaches provisioning and stops.
//
// This is the end-to-end assertion the change was missing. Every other test in this campaign
// exercises one correction; this one drives the whole critical path from a repository that has
// none of the tooling the adoption installs, and asserts the OBSERVABLE end state - which is what
// an operator actually gets.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('./helpers');

// A repository with NO SpecBoot files, NO OpenSpec, NO /opsx:* commands, NO discoverable
// specboot-adopt skill, and NO .specboot/. Every one of those is an OUTPUT of the adoption.
function makeVirginRepo() {
  const dir = h.gitInit(h.makeFixture('specboot-virgin-'));
  fs.writeFileSync(path.join(dir, 'README.md'), '# Some project\n');
  fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'src', 'main.js'), 'console.log(1);\n');
  return dir;
}

function assertVirgin(dir) {
  for (const p of ['SPECBOOT_ADOPTION_GUIDE.md', 'specboot-adoption', '.specboot',
                   'openspec', '.claude', '.kiro', '.agents', 'ai-specs']) {
    assert.equal(h.exists(path.join(dir, p)), false, `a virgin repository must not contain ${p}`);
  }
}

describe('4.29 — virgin source-linked cold start', () => {
  let dir, src, run;

  before(() => {
    dir = makeVirginRepo();
    src = h.makeCanonicalSource({ git: true });
    assertVirgin(dir);
    run = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
  });
  after(() => { h.removeFixture(dir); h.removeFixture(src); });

  test('the run succeeds from a repository that had none of the tooling', () => {
    assert.equal(run.status, 0, `cold start exited ${run.status}: ${run.stderr}`);
  });

  test('durable state exists under .specboot/adoption/', () => {
    assert.ok(h.exists(h.manifestPath(dir)), 'BOOTSTRAP-MANIFEST.json must exist');
    assert.ok(h.exists(path.join(dir, '.specboot', 'adoption', 'ADOPTION-RUN-LOG.md')),
      'the adoption run log must exist');
  });

  test('the discovery entries resolve to the EXTERNAL canonical source', () => {
    const entry = path.join(dir, '.claude', 'skills', 'specboot-adopt');
    assert.ok(h.exists(entry), 'the selected client\'s discovery entry must exist');
    const st = fs.lstatSync(entry);
    assert.ok(st.isSymbolicLink(), 'the entry must be a symlink, not a real file');
    assert.equal(fs.readlinkSync(entry),
      path.join(src, 'ai-specs', 'skills', 'specboot-adopt'),
      'it must point at the external canonical skill, not a local copy');
  });

  test('no copied guide, phase file, or skill body exists anywhere', () => {
    const copied = h.listFiles(dir).filter(f =>
      /SPECBOOT_ADOPTION_GUIDE\.md$/.test(f) ||
      /(^|\/)specboot-adoption\//.test(f) ||
      /SKILL\.md$/.test(f));
    assert.deepStrictEqual(copied, [], 'source-linked delivery copies nothing canonical');
  });

  test('.specboot/bootstrap/ was NEVER created', () => {
    assert.equal(h.exists(path.join(dir, '.specboot', 'bootstrap')), false,
      'absent, and never created at any point - not merely emptied');
  });

  test('the resolved path is in NO committed artifact, and only in ignored .specboot/local/', () => {
    const m = h.readJson(h.manifestPath(dir));
    assert.equal(h.allStrings(m).some(v => v.includes(src)), false,
      'the committed manifest must contain no resolved absolute source path');
    const runLog = fs.readFileSync(path.join(dir, '.specboot', 'adoption', 'ADOPTION-RUN-LOG.md'), 'utf8');
    assert.equal(runLog.includes(src), false, 'the committed run log must contain none either');

    const store = path.join(dir, '.specboot', 'local', 'source-path');
    if (h.exists(store)) {
      assert.equal(fs.readFileSync(store, 'utf8').trim(), src);
      assert.equal(h.gitSaysIgnored(dir, '.specboot/local/source-path'), true,
        'the machine-local store must be git-ignored');
    }
  });

  test('no placeholder client selection, and no pointer-file entry', () => {
    const m = h.readJson(h.manifestPath(dir));
    const strings = h.allStrings(m);
    assert.equal(strings.includes('undeclared'), false, 'no placeholder selection');
    assert.equal((m.entries || []).some(e => e.mode === 'pointer-file'), false,
      'a pointer file is not a discovered skill and must never be recorded as an entry');
    assert.deepStrictEqual(m.clientSelection.selected, ['claude']);
    assert.deepStrictEqual(m.clientSelection.notSelected.sort(), ['codex', 'kiro']);
  });

  test('the run STOPS after provisioning and emits a fresh-session handoff', () => {
    const out = run.stdout + run.stderr;
    assert.match(out, /fresh session/i,
      'the initial session must hand off rather than continue into the adoption steps');
    assert.equal(out.includes(src), false,
      'the handoff prompt must carry no source path - identity travels as checksums');
  });

  test('native discovery is NOT claimed by the provisioning session', () => {
    const out = run.stdout + run.stderr;
    assert.equal(/discovery (probe )?(passed|PASS)/i.test(out), false,
      'discovery can only be evidenced by a session that started after the entries existed');
  });

  test('the same virgin repository refuses when no source is supplied', () => {
    const other = makeVirginRepo();
    try {
      const before = h.treeState(other);
      const r = h.runCli(['bootstrap', other, '--client', 'claude']);
      assert.notEqual(r.status, 0);
      assert.deepStrictEqual(h.treeState(other), before,
        'a cold start without a source must refuse, not fall back to copying SpecBoot in');
    } finally { h.removeFixture(other); }
  });
});
