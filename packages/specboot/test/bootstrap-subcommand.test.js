'use strict';

// Task 4.4 — the guarantee that the DEFAULT invocation is unchanged by the bootstrap subcommand.
//
// The packaged-snapshot assertions that shared this file (task 4.3) were retired to
// `test/deferred/packaged-snapshot-bootstrap.test.js` under task 4.30, when packaged-snapshot
// delivery was deferred whole to `add-specboot-packaged-snapshot-delivery`. What remains here is
// mode-independent and still binding: adding a subcommand must not change what the default install
// path does, and `make-specboot-installer-client-aware` remains separate future work.

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

const h = require('./helpers');

describe('default invocation is unchanged by the bootstrap subcommand', () => {
  let dir;
  before(() => { dir = h.gitInit(h.makeFixture('specboot-default-')); });
  after(() => h.removeFixture(dir));

  test('installs the template and shared adapters as before', () => {
    const r = h.runCli([dir]);
    assert.equal(r.status, 0, `default install exited ${r.status}: ${r.stderr}`);
    assert.ok(h.exists(path.join(dir, 'ai-specs')), 'default install copies the template');
    assert.ok(h.exists(path.join(dir, '.claude', 'skills')), 'default install creates Claude adapters');
    assert.ok(h.exists(path.join(dir, '.cursor', 'skills')), 'default install creates Cursor adapters');
  });

  test('creates NO bootstrap payload and NO bootstrap exposure', () => {
    assert.equal(h.exists(path.join(dir, '.specboot', 'bootstrap')), false,
      'default invocation must not create the transient payload');
    assert.equal(h.exists(path.join(dir, '.specboot', 'adoption')), false,
      'default invocation must not create the durable adoption record');
    assert.equal(h.exists(path.join(dir, '.claude', 'skills', 'specboot-adopt')), false,
      'default invocation must not expose the orchestration skill');
  });

  test('provisions exactly the documented client set - no client added to the default loop', () => {
    const clients = ['.claude', '.cursor', '.kiro', '.agents'];
    const present = clients.filter(c => h.exists(path.join(dir, c)));
    assert.deepEqual(present.sort(), ['.claude', '.cursor'],
      'the default path provisions Claude and Cursor only; adding bootstrap must not change that');
  });
});
