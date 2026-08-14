'use strict';

// Tasks 4.7 + 4.8 — per-path ignore provisioning for the transient set, and protection of the
// durable .specboot/adoption/ path.

const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('./helpers');

const TRANSIENT = ['.specboot/staging/', '.specboot/bootstrap/'];
const DURABLE = '.specboot/adoption/';

describe('transient ignore provisioning', () => {
  let dir;
  beforeEach(() => { dir = h.gitInit(h.makeFixture('specboot-ignore-')); });
  afterEach(() => h.removeFixture(dir));

  test('no existing .gitignore: creates it with the exact rule for every transient path', () => {
    assert.equal(h.exists(path.join(dir, '.gitignore')), false, 'fixture starts with no .gitignore');
    const r = h.runCli([dir]);
    assert.equal(r.status, 0, `install exited ${r.status}: ${r.stderr}`);

    const rules = h.gitignoreRules(dir);
    for (const rule of TRANSIENT) {
      assert.ok(rules.includes(rule), `.gitignore must contain the exact rule ${rule}`);
    }
    const content = h.readIfExists(path.join(dir, '.gitignore'));
    assert.ok(content.endsWith('\n'), '.gitignore must end with a trailing newline');
  });

  test('existing .gitignore: pre-existing lines preserved in order, rules appended', () => {
    const original = 'node_modules/\n*.log\nbuild/\n';
    fs.writeFileSync(path.join(dir, '.gitignore'), original);

    const r = h.runCli([dir]);
    assert.equal(r.status, 0);

    const content = h.readIfExists(path.join(dir, '.gitignore'));
    assert.ok(content.startsWith(original),
      'every pre-existing line must be preserved unchanged, in its original order');
    for (const rule of TRANSIENT) {
      assert.ok(h.gitignoreRules(dir).includes(rule), `${rule} must be appended`);
    }
    assert.ok(content.endsWith('\n'), '.gitignore must end with a trailing newline');
  });

  test('exact rules already present: byte-for-byte no-op', () => {
    const original = `node_modules/\n${TRANSIENT.join('\n')}\n`;
    fs.writeFileSync(path.join(dir, '.gitignore'), original);

    const r = h.runCli([dir]);
    assert.equal(r.status, 0);
    assert.equal(h.readIfExists(path.join(dir, '.gitignore')), original,
      '.gitignore must be left byte-for-byte unchanged when every rule is already present');
  });

  test('repeated execution is idempotent - no duplicate rule, no duplicate header', () => {
    h.runCli([dir]);
    const afterFirst = h.readIfExists(path.join(dir, '.gitignore'));
    h.runCli([dir]);
    const afterSecond = h.readIfExists(path.join(dir, '.gitignore'));

    assert.equal(afterSecond, afterFirst, 'second run must produce no further change');
    for (const rule of TRANSIENT) {
      const count = h.gitignoreRules(dir).filter(l => l === rule).length;
      assert.equal(count, 1, `${rule} must appear exactly once`);
    }
  });

  test('broader pre-existing rule that Git already honours leaves .gitignore unchanged', () => {
    // A bare `.specboot/` line makes Git report both transient probes as ignored. Git's own
    // evaluation - not textual matching - decides, so nothing is appended.
    const original = 'node_modules/\n.specboot/\n';
    fs.writeFileSync(path.join(dir, '.gitignore'), original);

    const r = h.runCli([dir]);
    assert.equal(r.status, 0);
    assert.equal(h.readIfExists(path.join(dir, '.gitignore')), original,
      'when Git already reports the probes as ignored, .gitignore must not be modified');
  });

  test('the bootstrap path uses the git check-ignore probe, not a literal-line match', () => {
    // A negation that un-ignores only the bootstrap path. Note `.specboot/*` rather than a bare
    // `.specboot/`: Git cannot re-include a file whose PARENT DIRECTORY is excluded, so with a
    // bare directory rule the negation is inert and Git still reports the probe as ignored
    // (verified: `git check-ignore -v` matches `.gitignore:2:.specboot/`). With the glob form the
    // negation is reachable, Git reports NOT ignored, and the exact narrow rule must be appended.
    const original = 'node_modules/\n.specboot/*\n!.specboot/bootstrap/\n';
    fs.writeFileSync(path.join(dir, '.gitignore'), original);

    const r = h.runCli([dir]);
    assert.equal(r.status, 0);

    const rules = h.gitignoreRules(dir);
    assert.ok(rules.includes('.specboot/bootstrap/'),
      'Git\'s evaluation, not the textual presence of a .specboot/ pattern, decides whether to append');
  });

  test('no broader pattern is ever written', () => {
    h.runCli([dir]);
    const rules = h.gitignoreRules(dir);
    assert.equal(rules.includes('.specboot/'), false,
      'a bare .specboot/ line would swallow the durable adoption evidence');
    assert.equal(rules.includes('.specboot'), false, 'no bare .specboot pattern either');
  });
});

describe('durable .specboot/adoption/ is protected', () => {
  let dir;
  beforeEach(() => { dir = h.gitInit(h.makeFixture('specboot-durable-')); });
  afterEach(() => h.removeFixture(dir));

  test('after a default install, the durable path is NOT ignored', () => {
    h.runCli([dir]);
    assert.equal(h.gitSaysIgnored(dir, '.specboot/adoption/BOOTSTRAP-MANIFEST.json'), false,
      'the durable manifest must remain committable evidence');
  });

  // Invoked source-linked: a bootstrap with no validated canonical source now fails closed with
  // zero writes (task 4.30), so exercising this requirement needs a real source and an explicit
  // client. The REQUIREMENT is unchanged - the durable path stays tracked, the transient paths
  // stay ignored - only the invocation that reaches it is.
  test('after a bootstrap run, the durable path is NOT ignored', () => {
    const src = h.makeCanonicalSource();
    try {
      const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
      assert.equal(r.status, 0, `bootstrap exited ${r.status}: ${r.stderr}`);

      assert.equal(h.gitSaysIgnored(dir, '.specboot/adoption/BOOTSTRAP-MANIFEST.json'), false,
        'bootstrap must not ignore the record of what it did');
      assert.equal(h.gitSaysIgnored(dir, '.specboot/adoption/ADOPTION-RUN-LOG.md'), false,
        'the filled run log is the documented resume source and must stay tracked');

      // ...while every transient path IS ignored, whether or not this run creates it.
      assert.equal(h.gitSaysIgnored(dir, '.specboot/bootstrap/SPECBOOT_ADOPTION_GUIDE.md'), true,
        'the transient payload path must be ignored even though no run creates it');
      assert.equal(h.gitSaysIgnored(dir, '.specboot/local/source-path'), true,
        'the machine-local source-path store must be ignored');
    } finally { h.removeFixture(src); }
  });

  test('no ignore rule is provisioned for the durable path', () => {
    const src = h.makeCanonicalSource();
    try {
      h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
      const rules = h.gitignoreRules(dir);
      assert.equal(rules.some(r => r.includes('adoption')), false,
        `no rule may target ${DURABLE}`);
    } finally { h.removeFixture(src); }
  });
});
