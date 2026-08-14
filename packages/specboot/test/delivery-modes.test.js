'use strict';

// Tasks 4.14-4.20 — the delivery-mode campaign (design D-R, D-S, D-T).
//
// Every describe below establishes the state it needs in its OWN setup (design D-O): a fixture
// canonical source, an assembled payload where one is required, a virgin target. No block depends
// on another's side effect, and each must pass on a FIRST invocation.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('./helpers');

const SKIPPED_SL = 'SKIPPED — source-linked mode';

// ---------------------------------------------------------------------------------------------
// 4.14 — source-linked mode copies nothing canonical into the project.
// ---------------------------------------------------------------------------------------------
describe('4.14 source-linked mode creates no copied canonical content', () => {
  let src, dir;
  before(() => {
    src = h.makeCanonicalSource();
    dir = h.gitInit(h.makeFixture('specboot-sl-'));
    const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
    assert.equal(r.status, 0, `source-linked bootstrap exited ${r.status}: ${r.stderr}`);
  });
  after(() => { h.removeFixture(dir); h.removeFixture(src); });

  test('the transient container is never created — absent, not merely empty', () => {
    assert.equal(h.exists(path.join(dir, '.specboot', 'bootstrap')), false,
      'source-linked mode must not create .specboot/bootstrap/ at all');
  });

  test('no copied guide, phase file, or skill body exists anywhere in the project', () => {
    const files = h.listFiles(dir);
    assert.equal(files.some(f => path.basename(f) === 'SPECBOOT_ADOPTION_GUIDE.md'), false,
      'the guide must never be copied into the project');
    assert.equal(files.some(f => f.split(path.sep).includes('specboot-adoption')), false,
      'no phase file may be copied into the project');
    assert.equal(files.some(f => path.basename(f) === 'SKILL.md'), false,
      'the skill body must never be copied into the project');
  });

  test('durable state is written under .specboot/adoption/ only', () => {
    assert.ok(h.exists(h.manifestPath(dir)), 'the durable manifest must exist');
    assert.ok(h.exists(path.join(dir, '.specboot', 'adoption', 'ADOPTION-RUN-LOG.md')),
      'the durable run log must exist');
    // Reversed by 4.23: `.specboot/local/` is the machine-local, git-ignored source-path store
    // introduced by design D-S option B. It is a legitimate member of `.specboot/` in
    // source-linked mode, so the assertion pins the exact set rather than a single name - and
    // still fails on a transient container or any other unannounced directory.
    const underSpecboot = fs.readdirSync(path.join(dir, '.specboot')).sort();
    assert.deepEqual(underSpecboot, ['adoption', 'local'],
      '.specboot/ holds the durable root and the machine-local store, and nothing else');
    assert.equal(h.gitSaysIgnored(dir, '.specboot/adoption/BOOTSTRAP-MANIFEST.json'), false,
      'the durable root is committed evidence and is never ignored');
    assert.equal(h.gitSaysIgnored(dir, '.specboot/local/source-path'), true,
      'the machine-local store is ignored, so it can never be committed');
  });

  test('the payload and container obligations are recorded SKIPPED, never blank', () => {
    const m = h.readJson(h.manifestPath(dir));
    assert.ok(m.modeObligations, 'per-mode obligations must be recorded explicitly');
    assert.equal(m.modeObligations.payload, SKIPPED_SL);
    assert.equal(m.modeObligations.container, SKIPPED_SL);
  });
});

// ---------------------------------------------------------------------------------------------
// 4.15 — an incomplete source is rejected BEFORE any write.
// ---------------------------------------------------------------------------------------------
describe('4.15 an incomplete source is rejected before any write', () => {
  for (const omit of ['guide', 'phases', 'skill']) {
    test(`missing ${h.REQUIRED_ARTIFACTS[omit]} is rejected and the target is unchanged`, () => {
      const src = h.makeCanonicalSource({ omit });
      const dir = h.gitInit(h.makeFixture(`specboot-bad-${omit}-`));
      const before = h.listFiles(dir).sort();

      const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);

      assert.notEqual(r.status, 0, 'an incomplete source must be rejected with a non-zero exit');
      assert.match(r.stderr + r.stdout, new RegExp(h.REQUIRED_ARTIFACTS[omit].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        'the rejection must name the artifact that was missing');
      assert.deepEqual(h.listFiles(dir).sort(), before,
        'the target tree must be byte-for-byte unchanged: a run that creates a manifest and then ' +
        'reports the problem has already failed');
      assert.equal(h.exists(path.join(dir, '.specboot')), false,
        'no .specboot/ may exist after a rejected source');

      h.removeFixture(dir); h.removeFixture(src);
    });
  }

  test('a skill directory without a readable SKILL.md is an invalid source', () => {
    const src = h.makeSourceWithSkillDirButNoSkillMd();
    const dir = h.gitInit(h.makeFixture('specboot-bad-skillmd-'));
    const before = h.listFiles(dir).sort();

    const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);

    assert.notEqual(r.status, 0,
      'validation must reach SKILL.md itself — the initial session reads that file directly');
    assert.deepEqual(h.listFiles(dir).sort(), before);
    h.removeFixture(dir); h.removeFixture(src);
  });
});

// ---------------------------------------------------------------------------------------------
// 4.16 — the manifest records PORTABLE source identity: checksums, Git provenance, and no path.
//
// Reversed under design D-S option B. The earlier form of this block asserted a `path` field
// carrying a "machine-specific-non-portable" label. The manifest is committed by design, so that
// field put one operator's laboratory path into every clone of the adopting repository; a label
// describing a value as non-portable does not make committing it portable. The block now asserts
// the opposite: the committed manifest states HOW the local path is obtained, and carries none.
// ---------------------------------------------------------------------------------------------
describe('4.16 the manifest records portable source identity and no path', () => {
  test('a Git working-tree source records its commit, its checksums, and no path', () => {
    const src = h.makeCanonicalSource({ git: true });
    const dir = h.gitInit(h.makeFixture('specboot-prov-git-'));
    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

    const s = h.readJson(h.manifestPath(dir)).source;
    assert.equal(s['delivery-mode'], 'source-linked');
    assert.match(s['guide-checksum'], /^[0-9a-f]{64}$/, 'guide checksum must be recorded');
    assert.match(s['skill-checksum'], /^[0-9a-f]{64}$/, 'skill checksum must be recorded');
    assert.equal(s.git.status, 'recorded');
    assert.match(s.git.commit, /^[0-9a-f]{7,40}$/, 'the commit is read, never inferred');

    assert.equal(s['local-path-resolution'], h.LOCAL_PATH_RESOLUTION,
      'the block must state explicitly that the local source path is resolved per machine and ' +
      'is not stored in the committed manifest');
    assert.equal(Object.prototype.hasOwnProperty.call(s, 'path'), false,
      'the committed manifest carries no field for a resolved path at all');
    assert.equal(JSON.stringify(s).includes(src),  false,
      'no resolved absolute path may appear anywhere in the run-level source block');

    h.removeFixture(dir); h.removeFixture(src);
  });

  test('a non-Git source records an explicit unavailable value with its reason', () => {
    const src = h.makeCanonicalSource({ git: false });
    const dir = h.gitInit(h.makeFixture('specboot-prov-nogit-'));
    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

    const s = h.readJson(h.manifestPath(dir)).source;
    assert.equal(s.git.status, 'unavailable',
      '"unavailable" is a representable value, never an absent field');
    assert.equal(typeof s.git.reason, 'string');
    assert.ok(s.git.reason.trim().length > 0, 'the reason must not be an empty string');
    assert.equal(Object.prototype.hasOwnProperty.call(s.git, 'commit'), false,
      'no commit value may be inferred for a source that is not a Git working tree');
    assert.equal(s['local-path-resolution'], h.LOCAL_PATH_RESOLUTION,
      'the statement is carried in every mode, not only where a source resolved');
    assert.equal(Object.prototype.hasOwnProperty.call(s, 'path'), false);

    h.removeFixture(dir); h.removeFixture(src);
  });

  test('the schema REJECTS a resolved path rather than merely omitting one', () => {
    const schema = h.readJson(
      path.join(h.REPO_ROOT, 'specboot-adoption', 'bootstrap-kit', 'BOOTSTRAP-MANIFEST.schema.json'));
    const block = schema.properties.source;

    assert.equal(block.additionalProperties, false,
      'additionalProperties: false is what makes a path unrecordable even by accident');
    assert.equal(Object.prototype.hasOwnProperty.call(block.properties, 'path'), false,
      'the schema defines no path property');
    assert.equal((block.required || []).includes('path'), false,
      'and cannot require one');
    assert.ok(block.properties['local-path-resolution'],
      'the per-machine-resolution statement is a defined field, not prose in a description');
    assert.equal(block.properties['local-path-resolution'].const, h.LOCAL_PATH_RESOLUTION,
      'a single permitted value, so the statement cannot be softened or reworded away');
    assert.ok((block.required || []).includes('local-path-resolution'),
      'and it is required, so a manifest cannot simply omit it');
    assert.equal(JSON.stringify(block).includes('machine-specific-non-portable'), false,
      'the labelled-path form is gone, not merely optional');
  });
});

// ---------------------------------------------------------------------------------------------
// 4.17 — only selected clients are provisioned.
// ---------------------------------------------------------------------------------------------
describe('4.17 only selected clients get discovery entries', () => {
  let src, dir;
  before(() => {
    src = h.makeCanonicalSource();
    dir = h.gitInit(h.makeFixture('specboot-select-'));
    fs.mkdirSync(path.join(dir, '.claude'), { recursive: true });
    fs.mkdirSync(path.join(dir, '.kiro'), { recursive: true });   // present but NOT selected
    const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
    assert.equal(r.status, 0, `bootstrap exited ${r.status}: ${r.stderr}`);

    // Precondition. "The unselected client got nothing" is trivially true against an
    // implementation that provisioned nothing for anyone.
    assert.ok(h.exists(path.join(dir, '.claude', 'skills', 'specboot-adopt')),
      'precondition: the SELECTED client must actually have been provisioned');
  });
  after(() => { h.removeFixture(dir); h.removeFixture(src); });

  test('the selected client\'s entries exist and point at the external canonical source', () => {
    const link = path.join(dir, '.claude', 'skills', 'specboot-adopt');
    assert.ok(h.exists(link), 'the selected client must get its skill discovery entry');
    const points = fs.lstatSync(link).isSymbolicLink()
      ? fs.readlinkSync(link)
      : fs.readFileSync(link, 'utf8');
    assert.ok(points.includes(src),
      'the entry must point at the EXTERNAL canonical source, not at a local copy');
  });

  test('the unselected client has no artifact created anywhere', () => {
    assert.deepEqual(fs.readdirSync(path.join(dir, '.kiro')), [],
      'a client nobody selected gets nothing provisioned');
    const m = h.readJson(h.manifestPath(dir));
    assert.equal(m.entries.some(e => e.path.startsWith('.kiro')), false,
      'no manifest entry may exist for an unselected client');
  });

  test('the manifest records the unselected client NOT SELECTED, never PENDING EVIDENCE', () => {
    const cs = h.readJson(h.manifestPath(dir)).clientSelection;
    assert.deepEqual(cs.selected, ['claude']);
    assert.ok(cs.notSelected.includes('kiro'));
    assert.equal(JSON.stringify(cs).includes('PENDING EVIDENCE'), false,
      'PENDING EVIDENCE asserts intended support nobody claimed for an unselected client');
  });
});

// ---------------------------------------------------------------------------------------------
// 4.18 — autodiscovery writes nothing before a human selection exists.
// ---------------------------------------------------------------------------------------------
describe('4.18 autodiscovery performs no write before human selection', () => {
  test('a tree with candidates is byte-for-byte unchanged while findings are reported', () => {
    const dir = h.gitInit(h.makeFixture('specboot-autodisc-'));
    fs.mkdirSync(path.join(dir, '.claude'), { recursive: true });
    fs.mkdirSync(path.join(dir, '.kiro'), { recursive: true });
    const before = h.checksumTree(dir);
    const beforeDirs = h.listFiles(dir).sort();

    const r = h.runCli(['autodiscover', dir]);

    assert.equal(r.status, 0, `autodiscover exited ${r.status}: ${r.stderr}`);
    assert.match(r.stdout, /candidate/i, 'findings must be reported');
    assert.deepEqual(h.checksumTree(dir), before, 'autodiscovery must write nothing');
    assert.deepEqual(h.listFiles(dir).sort(), beforeDirs);
    assert.equal(h.exists(path.join(dir, '.specboot')), false);
    assert.equal(h.exists(path.join(dir, '.gitignore')), false,
      'not even an ignore rule may be provisioned before a selection exists');
    h.removeFixture(dir);
  });

  test('finding nothing is not authorization to proceed with no client', () => {
    const dir = h.gitInit(h.makeFixture('specboot-autodisc-empty-'));
    const before = h.listFiles(dir).sort();

    const r = h.runCli(['autodiscover', dir]);

    assert.equal(r.status, 0);
    assert.deepEqual(h.listFiles(dir).sort(), before, 'an empty result still writes nothing');
    assert.match(r.stdout, /not found|no candidate/i, 'the empty result is reported as a finding');
    assert.match(r.stdout, /which client/i,
      'an empty result must still ask; it is a finding, not a decision');
    h.removeFixture(dir);
  });
});

// ---------------------------------------------------------------------------------------------
// 4.19 — source drift blocks resume; identity is the checksums, never the path.
// ---------------------------------------------------------------------------------------------
describe('4.19 source drift blocks resume', () => {
  test('a mutated canonical guide stops the resume for reconciliation', () => {
    const src = h.makeCanonicalSource();
    const dir = h.gitInit(h.makeFixture('specboot-drift-'));
    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

    fs.appendFileSync(path.join(src, 'SPECBOOT_ADOPTION_GUIDE.md'), '\nchanged upstream\n');
    const r = h.runCli(['resume', dir, '--source', src]);

    assert.notEqual(r.status, 0, 'drift must stop the run');
    assert.match(r.stdout + r.stderr, /drift/i);
    assert.match(r.stdout + r.stderr, /reconcil/i,
      'the stop is for human reconciliation, not a silent continue');
    h.removeFixture(dir); h.removeFixture(src);
  });

  test('an unchanged source resumes normally', () => {
    const src = h.makeCanonicalSource();
    const dir = h.gitInit(h.makeFixture('specboot-nodrift-'));
    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

    const r = h.runCli(['resume', dir, '--source', src]);
    assert.equal(r.status, 0, `unchanged source must resume: ${r.stderr}`);
    assert.match(r.stdout, /source identity verified/i,
      'a silent exit 0 is not a resume — the run must state that it verified source identity');
    h.removeFixture(dir); h.removeFixture(src);
  });

  test('a source moved to a new path with matching checksums resumes', () => {
    const src = h.makeCanonicalSource();
    const dir = h.gitInit(h.makeFixture('specboot-moved-'));
    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

    const moved = h.makeFixture('specboot-source-moved-');
    fs.cpSync(src, moved, { recursive: true });
    fs.rmSync(src, { recursive: true, force: true });

    const r = h.runCli(['resume', dir, '--source', moved]);
    assert.equal(r.status, 0,
      'the recorded absolute path is never a precondition of resume — identity is the checksums');
    assert.match(r.stdout, /source identity verified/i);
    assert.match(r.stdout, /path/i,
      'the run reports that it accepted a new local path on matching checksums');
    h.removeFixture(dir); h.removeFixture(moved);
  });
});

// ---------------------------------------------------------------------------------------------
// 4.20 — source-linked de-bootstrap: remove project-local entries, never touch the source.
// ---------------------------------------------------------------------------------------------
describe('4.20 source-linked de-bootstrap leaves the external source byte-identical', () => {
  let src, dir, sourceBefore;

  before(() => {
    src = h.makeCanonicalSource();
    sourceBefore = h.checksumTree(src);
    dir = h.gitInit(h.makeFixture('specboot-debootstrap-'));

    // A pre-existing client instruction file the bootstrap must append to and later byte-restore.
    fs.mkdirSync(path.join(dir, '.claude'), { recursive: true });
    fs.writeFileSync(path.join(dir, '.claude', 'CLAUDE.md'), '# Project rules\n\nkeep me exactly\n');

    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

    // Preconditions, asserted BEFORE de-bootstrap runs. Without them every assertion in this
    // block passes vacuously against an implementation that provisioned nothing: "the entry is
    // gone" is trivially true when it was never created (design D-O's sibling failure mode - a
    // test can be green for the wrong reason).
    assert.ok(h.exists(path.join(dir, '.claude', 'skills', 'specboot-adopt')),
      'precondition: source-linked bootstrap must have provisioned the discovery entry');
    assert.match(fs.readFileSync(path.join(dir, '.claude', 'CLAUDE.md'), 'utf8'),
      /SPECBOOT-BOOTSTRAP:BEGIN/,
      'precondition: bootstrap must have appended a delimited block to the pre-existing file');

    const d = h.runCli(['debootstrap', dir]);
    assert.equal(d.status, 0, `debootstrap exited ${d.status}: ${d.stderr}`);
  });

  after(() => { h.removeFixture(dir); h.removeFixture(src); });

  test('the project-local discovery entries are gone', () => {
    assert.equal(h.exists(path.join(dir, '.claude', 'skills', 'specboot-adopt')), false,
      'the temporary discovery entry must be removed');
  });

  test('an appended instruction block is byte-restored', () => {
    assert.equal(fs.readFileSync(path.join(dir, '.claude', 'CLAUDE.md'), 'utf8'),
      '# Project rules\n\nkeep me exactly\n',
      'the file the block was appended to must be byte-restored, not merely trimmed');
  });

  test('the durable manifest survives with terminal dispositions on every entry', () => {
    assert.ok(h.exists(h.manifestPath(dir)), 'de-bootstrap never deletes its own evidence');
    const m = h.readJson(h.manifestPath(dir));
    for (const e of m.entries) {
      assert.notEqual(e['cleanup-status'], 'pending',
        `entry ${e.path} left at "pending" is FAIL, not a partial PASS`);
      assert.ok(e['final-disposition'], `entry ${e.path} needs a final disposition`);
    }
    assert.equal(m.modeObligations.payload, SKIPPED_SL);
    assert.equal(m.modeObligations.container, SKIPPED_SL);
  });

  test('the external canonical source is byte-identical, file for file', () => {
    assert.deepEqual(h.checksumTree(src), sourceBefore,
      'the canonical source is read-only for the whole adoption');
  });

  test('no manifest entry describes the source or any path inside it', () => {
    const m = h.readJson(h.manifestPath(dir));
    for (const e of m.entries) {
      assert.equal(e.path.startsWith(src), false,
        'the source is never an entry — that is what puts it out of reach of cleanup');
    }
  });
});

// ---------------------------------------------------------------------------------------------
// 4.23 — the resolved path lives ONLY in machine-local, git-ignored state (design D-S option B).
//
// The committed manifest carries portable identity (4.16). This block asserts the other half:
// where the run keeps the resolved path at all, it keeps it somewhere that cannot be committed,
// holding the path and nothing else — a convenience pointer, never a second provenance record.
// ---------------------------------------------------------------------------------------------

const LOCAL_STORE_DIR = path.join('.specboot', 'local');
const LOCAL_STORE_FILE = path.join(LOCAL_STORE_DIR, 'source-path');

describe('4.23 the resolved source path reaches no committed artifact', () => {
  let src, dir;
  before(() => {
    src = h.makeCanonicalSource();
    dir = h.gitInit(h.makeFixture('specboot-localstore-'));
    const r = h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']);
    assert.equal(r.status, 0, `source-linked bootstrap exited ${r.status}: ${r.stderr}`);
  });
  after(() => { h.removeFixture(dir); h.removeFixture(src); });

  test('no committable file the run wrote contains the resolved absolute path', () => {
    const offenders = [];
    for (const rel of h.listFiles(dir)) {
      if (h.gitSaysIgnored(dir, rel) === true) continue;   // ignored: it can never be committed
      const abs = path.join(dir, rel);
      if (fs.lstatSync(abs).isSymbolicLink()) {
        // A symlink to the external source names an absolute path in its target. It is allowed
        // to exist, and it is NOT allowed to be committable.
        offenders.push(`${rel} (symlink naming an external path, not excluded from commit)`);
        continue;
      }
      if (fs.readFileSync(abs, 'utf8').includes(src)) offenders.push(rel);
    }
    assert.deepEqual(offenders, [],
      'the manifest, the run log, and every other committable file the run writes must carry no ' +
      'absolute external path');
  });

  test('the manifest and the run log specifically carry none', () => {
    assert.equal(fs.readFileSync(h.manifestPath(dir), 'utf8').includes(src), false,
      'the committed manifest records portable identity only');
    assert.equal(
      fs.readFileSync(path.join(dir, '.specboot', 'adoption', 'ADOPTION-RUN-LOG.md'), 'utf8').includes(src),
      false, 'the run log is committed by design (D-B), so it records no resolved path either');
  });

  test('the retained path is written under .specboot/local/ and git reports it ignored', () => {
    assert.ok(h.exists(path.join(dir, LOCAL_STORE_FILE)),
      'the run retains the resolved path for same-machine reuse');
    assert.equal(h.gitSaysIgnored(dir, '.specboot/local/source-path'), true,
      'the machine-local store must be ignored, by its own per-path rule');
    assert.ok(h.gitignoreRules(dir).includes('.specboot/local/'),
      'the rule is the exact narrow path, provisioned by the same per-path probe as the others');
    assert.equal(h.gitignoreRules(dir).includes('.specboot/'), false,
      'a bare .specboot/ rule would swallow the durable committed evidence');
    assert.equal(h.gitSaysIgnored(dir, '.specboot/adoption/BOOTSTRAP-MANIFEST.json'), false,
      'and the durable evidence stays committable');
  });

  test('the store holds the path and nothing else', () => {
    assert.deepEqual(fs.readdirSync(path.join(dir, LOCAL_STORE_DIR)), ['source-path'],
      'the store is a convenience pointer, not a second provenance mechanism');
    const body = fs.readFileSync(path.join(dir, LOCAL_STORE_FILE), 'utf8');
    assert.equal(body.trim(), src, 'it holds the resolved path verbatim');
    assert.equal(/[0-9a-f]{64}/.test(body), false, 'no checksum may be stored beside the path');
    assert.equal(/source-linked|packaged-snapshot/.test(body), false,
      'no delivery mode may be stored beside the path');
    assert.equal(/commit/i.test(body), false, 'no commit may be stored beside the path');
  });
});

describe('4.23 resume against the machine-local store', () => {
  test('same-machine resume reuses the store without asking, and still recomputes the checksums', () => {
    const src = h.makeCanonicalSource();
    const dir = h.gitInit(h.makeFixture('specboot-localresume-'));
    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

    const r = h.runCli(['resume', dir]);            // no --source: the machine-local store answers
    assert.equal(r.status, 0, `same-machine resume must not have to ask: ${r.stderr}`);
    assert.match(r.stdout, /source identity verified/i);
    assert.match(r.stdout, /machine-local/i,
      'the run states that it obtained the local path from the machine-local store');

    // Reuse is not trust. Drift the source and resume again with no --source: a run that read the
    // store and skipped the checksums would pass here, which is exactly the failure to prevent.
    fs.appendFileSync(path.join(src, 'SPECBOOT_ADOPTION_GUIDE.md'), '\nchanged upstream\n');
    const d = h.runCli(['resume', dir]);
    assert.notEqual(d.status, 0, 'a reused path is still checksummed on every resume');
    assert.match(d.stdout + d.stderr, /drift/i);

    h.removeFixture(dir); h.removeFixture(src);
  });

  test('a deleted store causes no failure beyond asking for a source path again', () => {
    const src = h.makeCanonicalSource();
    const dir = h.gitInit(h.makeFixture('specboot-nostore-'));
    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);

    fs.rmSync(path.join(dir, LOCAL_STORE_DIR), { recursive: true, force: true });

    const asked = h.runCli(['resume', dir]);
    assert.notEqual(asked.status, 0, 'with no local path known, the run stops and asks');
    assert.match(asked.stdout + asked.stderr, /--source/,
      'an absent store is answered by asking for a path');
    assert.equal(/drift/i.test(asked.stdout + asked.stderr), false,
      'an absent machine-local store is the ordinary cross-machine case, never drift');
    assert.equal(/corrupt|invalid manifest/i.test(asked.stdout + asked.stderr), false,
      'and never a failure of the durable state');

    const supplied = h.runCli(['resume', dir, '--source', src]);
    assert.equal(supplied.status, 0, 'supplying the path is the whole remedy');
    assert.match(supplied.stdout, /source identity verified/i);

    h.removeFixture(dir); h.removeFixture(src);
  });

  test('ADOPT-18 removes the machine-local store', () => {
    const src = h.makeCanonicalSource();
    const dir = h.gitInit(h.makeFixture('specboot-storecleanup-'));
    assert.equal(h.runCli(['bootstrap', dir, '--source', src, '--client', 'claude', '--yes']).status, 0);
    assert.ok(h.exists(path.join(dir, LOCAL_STORE_FILE)),
      'precondition: the store exists before de-bootstrap');

    assert.equal(h.runCli(['debootstrap', dir]).status, 0);

    assert.equal(h.exists(path.join(dir, LOCAL_STORE_DIR)), false,
      'the store is project-local temporary state and goes with the rest of it');
    assert.ok(h.exists(h.manifestPath(dir)), 'the durable committed evidence stays');

    h.removeFixture(dir); h.removeFixture(src);
  });
});
