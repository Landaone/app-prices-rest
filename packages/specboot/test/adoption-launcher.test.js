'use strict';

// Task 4.33 — the launcher template's four proofs (design D-V).
//
// The launcher is the SOLE artifact a human pastes to start an adoption. It replaces a ~1,850-word
// verbatim paste of ADOPTION-ENTRY-PROMPT.md with a short template carrying one parameter, so the
// canonical procedure is LOADED from the validated source rather than retyped into a chat box.
// A truncated or stale paste fails silently; a load cannot.
//
// The launcher is prompt text an agent follows, not a code path the installer executes, so these
// assertions are made over the committed template file itself. That is the whole observable
// contract: what the file instructs is what the mechanism does.
//
// RED precondition: these must be observed FAILING while
// specboot-adoption/bootstrap-kit/ADOPTION-LAUNCHER.template.md is ABSENT. An assertion that
// passes before the template exists asserts nothing.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const h = require('./helpers');

const KIT = path.join(h.REPO_ROOT, 'specboot-adoption', 'bootstrap-kit');
const LAUNCHER = path.join(KIT, 'ADOPTION-LAUNCHER.template.md');
const ENTRY_PROMPT = path.join(KIT, 'ADOPTION-ENTRY-PROMPT.md');

// Read the launcher, failing with the missing-launcher reason when it does not exist. Every
// assertion group routes through this, so RED reports one unambiguous cause rather than a stack
// trace from fs.
function readLauncher() {
  assert.equal(fs.existsSync(LAUNCHER), true,
    'ADOPTION-LAUNCHER.template.md is absent: the launcher template has not been created yet ' +
    '(task 3.20). This is the expected RED reason before implementation.');
  return fs.readFileSync(LAUNCHER, 'utf8');
}

describe('4.33(a) — an invalid candidate source produces zero writes', () => {
  test('the launcher names all four required canonical artifacts', () => {
    const t = readLauncher();
    assert.match(t, /SPECBOOT_ADOPTION_GUIDE\.md/,
      'artifact 1: the adoption guide must be validated');
    assert.match(t, /specboot-adoption\//,
      'artifact 2: the phase directory must be validated');
    assert.match(t, /ai-specs\/skills\/specboot-adopt\/SKILL\.md/,
      'artifact 3: the skill file must be validated as readable, not merely present as a directory');
    assert.match(t, /specboot-adoption\/bootstrap-kit\/ADOPTION-ENTRY-PROMPT\.md/,
      'artifact 4: the entry prompt is what the launcher loads next, so a source that cannot ' +
      'produce it is not a source the launcher can hand off to');
  });

  test('the check is read-only and the candidate source is not trusted on sight', () => {
    const t = readLauncher();
    assert.match(t, /read-only|without writing|do not write/i,
      'the validation must be stated as read-only');
    assert.match(t, /candidate/i,
      'an operator-supplied path is a candidate, not a source trusted because it was supplied');
  });

  test('validation is ordered BEFORE loading instructions and BEFORE any target write', () => {
    const t = readLauncher();
    const validateAt = t.search(/SPECBOOT_ADOPTION_GUIDE\.md/);
    const loadAt = t.search(/read[\s\S]{0,40}ADOPTION-ENTRY-PROMPT\.md[\s\S]{0,40}in full|in full[\s\S]{0,40}follow/i);
    assert.ok(validateAt > -1 && loadAt > -1 && validateAt < loadAt,
      'the four-artifact check must appear before the instruction to load the entry prompt: ' +
      'ordering is the trust boundary, not a stylistic preference');
    assert.match(t, /before[\s\S]{0,80}(load|writ)/i,
      'the launcher must state that nothing is loaded or written until validation passes');
  });

  test('a failed check stops with ZERO target-repository writes and names what failed', () => {
    const t = readLauncher();
    assert.match(t, /zero|no change of any kind|nothing/i,
      'the refusal must be a zero-write stop');
    assert.match(t, /stop/i, 'the launcher must say to stop, not to continue degraded');
    assert.match(t, /report|which/i,
      'the refusal must name which check failed, so the operator can fix the right thing');
  });
});

describe('4.33(b) — a valid source causes the COMPLETE canonical entry file to be loaded', () => {
  test('the launcher instructs a complete read of the entry prompt', () => {
    const t = readLauncher();
    assert.match(t, /ADOPTION-ENTRY-PROMPT\.md/,
      'the launcher must name the file it loads');
    assert.match(t, /\b(in full|completely|complete file|entire)\b/i,
      'a partially read procedure is the same defect as a partially pasted one: the read must be ' +
      'stated as complete');
  });

  test('the complete read precedes any adoption action', () => {
    const t = readLauncher();
    assert.match(t, /before[\s\S]{0,60}(any )?adoption action|before taking any/i,
      'the launcher must order the complete read ahead of acting, not alongside it');
  });

  test('the launcher instructs that the loaded file be followed exactly', () => {
    const t = readLauncher();
    assert.match(t, /follow[\s\S]{0,30}exactly/i,
      'the entry prompt is the canonical procedure, not a reference to consult selectively');
  });
});

describe('4.33(c) — the launcher contains NO duplicated procedure', () => {
  test('exactly one runtime parameter, <SPECBOOT_SOURCE>', () => {
    const t = readLauncher();
    const params = [...new Set(t.match(/<[A-Z_]{3,}>/g) || [])];
    assert.deepStrictEqual(params, ['<SPECBOOT_SOURCE>'],
      `the launcher takes exactly one runtime parameter; found: ${JSON.stringify(params)}`);
  });

  test('no ADOPT step contract is restated', () => {
    const t = readLauncher();
    assert.equal(/ADOPT-\d{2}/.test(t), false,
      'naming an ADOPT step is how a launcher becomes a second authority: the file operators copy ' +
      'is the file whose drift spreads fastest');
  });

  test('no client-selection procedure is restated', () => {
    const t = readLauncher();
    assert.equal(/autodiscovery|NOT SELECTED|selected client|client selection/i.test(t), false,
      'client selection belongs to the loaded entry prompt and the guide, not to the launcher');
  });

  test('no checkpoint protocol is restated', () => {
    const t = readLauncher();
    assert.equal(/checkpoint|staged scope|remote impact|push approval/i.test(t), false,
      'the checkpoint protocol has exactly one normative home (00-conventions.md)');
  });

  test('the pre-write approval gate is REFERENCED, not defined', () => {
    const t = readLauncher();
    assert.match(t, /approval gate/i,
      'the launcher must state that no write precedes the approval gate');
    assert.equal(/\[HUMAN APPROVAL REQUIRED\]/.test(t), false,
      'the launcher must point at the gate the loaded entry file defines, not define one itself');
  });

  test('the launcher is short — it is a gate and one instruction, not a procedure', () => {
    const words = readLauncher().trim().split(/\s+/).length;
    assert.ok(words < 500,
      `the launcher must stay short to be pasteable; measured ${words} words. The ~1,850-word ` +
      'entry prompt is what it exists to stop anyone pasting.');
  });
});

describe('4.33(d) — no runtime absolute path reaches a committed artifact', () => {
  test('the committed template carries the placeholder, not a real path', () => {
    const t = readLauncher();
    assert.match(t, /<SPECBOOT_SOURCE>/,
      'the committed template must carry the placeholder');
    const absolute = (t.match(/(?:^|[\s`("'])(\/(?:Users|home|var|opt|tmp|private)\/\S+)/gm) || [])
      .map(s => s.trim());
    assert.deepStrictEqual(absolute, [],
      `no machine-specific absolute path may be committed; found: ${JSON.stringify(absolute)}`);
  });

  test('the launcher states the runtime path stays out of the target repository', () => {
    const t = readLauncher();
    assert.match(t, /never[\s\S]{0,120}commit|only[\s\S]{0,60}session|not[\s\S]{0,60}committed/i,
      'the filled-in path lives in the chat/runtime turn and must never be committed');
  });

  test('client-neutral: no @ include syntax, no slash command, no OpenSpec command', () => {
    const t = readLauncher();
    assert.equal(/(^|\s)@[A-Za-z0-9_./-]+/.test(t), false,
      'client-specific @ include syntax would break every client that does not implement it');
    assert.equal(/(^|\s)\/(opsx|openspec|specboot)[:\s]/.test(t), false,
      'a slash command assumes infrastructure the target repository does not have at cold start');
    assert.equal(/\bopenspec\s+(init|validate|status|list|update)\b/i.test(t), false,
      'OpenSpec is an OUTPUT of the adoption; the launcher must not invoke it');
  });

  test('the entry prompt exists and is what the launcher points at', () => {
    assert.equal(fs.existsSync(ENTRY_PROMPT), true,
      'ADOPTION-ENTRY-PROMPT.md must already exist: task 3.21 reconciles it, it does not create it');
    assert.match(readLauncher(), /ADOPTION-ENTRY-PROMPT\.md/,
      'the launcher must point at the canonical entry prompt');
  });
});
