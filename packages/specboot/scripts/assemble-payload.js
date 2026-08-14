#!/usr/bin/env node
'use strict';

// Pack-time payload assembly (design D-A / D-G).
//
// Builds packages/specboot/bootstrap-payload/ from the CANONICAL paths named in the bootstrap kit
// manifest. Run from `prepack`, so the payload is produced at publish time and no second copy of
// any canonical artifact is ever checked into git.

const fs = require('fs');
const path = require('path');

const PKG_DIR = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PKG_DIR, '..', '..');
const OUT = path.join(PKG_DIR, 'bootstrap-payload');
const KIT = path.join(REPO_ROOT, 'specboot-adoption', 'bootstrap-kit', 'manifest.json');

function exists(p) { try { fs.lstatSync(p); return true; } catch { return false; } }

function copyTree(src, dest, exclude = []) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (e.name === '.DS_Store') continue;
    if (exclude.some(x => e.name === x.replace(/\/$/, ''))) continue;
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyTree(s, d, exclude);
    else fs.copyFileSync(s, d);
  }
}

if (!exists(KIT)) {
  console.error(`assemble-payload: kit manifest not found at ${KIT}`);
  process.exit(1);
}

const kit = JSON.parse(fs.readFileSync(KIT, 'utf8'));
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// The manifest itself travels with the payload so the installed CLI can read it.
fs.copyFileSync(KIT, path.join(OUT, 'manifest.json'));

let assembled = 0;
for (const e of kit.entries) {
  const from = path.join(REPO_ROOT, e.canonicalSource);
  if (!exists(from)) {
    console.error(`assemble-payload: skipping missing canonical source ${e.canonicalSource}`);
    continue;
  }
  const to = path.join(OUT, e.canonicalSource.replace(/\/$/, ''));
  if (e.kind === 'directory') copyTree(from, to, e.exclude || []);
  else { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); }
  assembled++;
}

// stderr, never stdout: `npm pack --json` parses stdout and a log line there corrupts it.
console.error(`assemble-payload: assembled ${assembled} entries into bootstrap-payload/`);
