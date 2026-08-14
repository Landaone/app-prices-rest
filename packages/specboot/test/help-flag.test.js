'use strict';

// Task 4.13 — flag arguments must never be treated as a target directory.
//
// `bin/init.js` computes its target from `process.argv[2]` after checking a fixed subcommand set.
// Any argument that is not a known subcommand becomes the target path, so `init.js --help`
// resolves `--help` against the process cwd and installs a full SpecBoot tree into a directory
// literally named `--help`. This suite pins the contract that help output writes nothing.

const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const h = require('./helpers');

const HELP_FLAGS = ['--help', '-h'];

describe('help flags produce usage and write nothing', () => {
  let dir;
  beforeEach(() => { dir = h.makeFixture('specboot-helpflag-'); });
  afterEach(() => h.removeFixture(dir));

  for (const flag of HELP_FLAGS) {
    test(`\`${flag}\` exits 0 and prints usage`, () => {
      const r = h.runCli([flag], { cwd: dir });

      assert.equal(r.status, 0,
        `${flag} must exit 0, got ${r.status}: ${r.stderr}`);
      assert.match(r.stdout, /usage/i,
        `${flag} must print usage text on stdout, got: ${JSON.stringify(r.stdout)}`);
    });

    test(`\`${flag}\` creates no files or directories`, () => {
      const before = h.listFiles(dir).sort();
      const r = h.runCli([flag], { cwd: dir });
      const after = h.listFiles(dir).sort();

      // The fixture starts empty, so the tree must remain empty. Compared as full lists rather
      // than counts so an unexpected write is named in the failure message.
      assert.deepEqual(after, before,
        `${flag} must not write into the working directory; new entries: ` +
        JSON.stringify(after.filter((f) => !before.includes(f))));

      // The specific defect: a directory named after the flag itself.
      assert.equal(h.exists(path.join(dir, flag)), false,
        `${flag} must not create a directory named "${flag}" (exit ${r.status})`);

      // The flag must not be accepted as a target anywhere: no install artifacts at all.
      for (const artifact of ['.specboot', 'ai-specs', 'openspec', '.gitignore', 'CLAUDE.md']) {
        assert.equal(h.exists(path.join(dir, artifact)), false,
          `${flag} must not provision "${artifact}"`);
        assert.equal(h.exists(path.join(dir, flag, artifact)), false,
          `${flag} must not provision "${artifact}" under a "${flag}" directory`);
      }
    });
  }
});
