#!/usr/bin/env node
// Usage: check-github.mjs [repoDir ...] | --self-test. Dependency-free regex checks on .github files.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export function check(dir) {
  const errs = [];
  const gh = path.join(dir, '.github');
  const rd = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);
  const tdir = path.join(gh, 'ISSUE_TEMPLATE');
  if (fs.existsSync(tdir)) {
    for (const f of fs.readdirSync(tdir).filter((f) => f.endsWith('.yml') && f !== 'config.yml')) {
      const t = rd(path.join(tdir, f));
      for (const k of ['name', 'description', 'body']) {
        if (!new RegExp(`^${k}:`, 'm').test(t)) errs.push(`ISSUE_TEMPLATE/${f}: missing ${k}`);
      }
    }
  }
  const labels = rd(path.join(gh, 'labels.yml'));
  if (labels !== null) {
    labels.split('\n').forEach((l, i) => {
      if (!l.trim() || l.trim().startsWith('#')) return;
      if (!/^- \{name: [\w-]+, color: [0-9a-f]{6}, description: ".*"\}$/.test(l)) errs.push(`labels.yml:${i + 1}: unparseable`);
    });
  }
  const pr = rd(path.join(gh, 'PULL_REQUEST_TEMPLATE.md'));
  if (pr !== null && !/^#+\s*AI disclosure/im.test(pr)) errs.push('PULL_REQUEST_TEMPLATE.md: missing AI disclosure heading');
  const wdir = path.join(gh, 'workflows');
  if (fs.existsSync(wdir)) {
    for (const f of fs.readdirSync(wdir).filter((f) => /\.ya?ml$/.test(f))) {
      const t = rd(path.join(wdir, f));
      if (!/^\s*permissions:/m.test(t)) errs.push(`workflows/${f}: no permissions:`);
      if (/pull_request_target/.test(t)) errs.push(`workflows/${f}: pull_request_target`);
      if (/secrets\./.test(t)) errs.push(`workflows/${f}: secrets. reference`);
      if (/curl[^\n|]*\|\s*(sudo\s+)?(ba|z)?sh\b/.test(t)) errs.push(`workflows/${f}: curl | sh`);
    }
  }
  return errs;
}

function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cg-'));
  const w = (p, s) => { fs.mkdirSync(path.dirname(path.join(tmp, p)), { recursive: true }); fs.writeFileSync(path.join(tmp, p), s); };
  w('.github/ISSUE_TEMPLATE/x.yml', 'name: a\ndescription: b\nbody: []\n');
  w('.github/labels.yml', '- {name: a, color: 000000, description: "d"}\n');
  w('.github/PULL_REQUEST_TEMPLATE.md', '## AI disclosure\n');
  w('.github/workflows/ci.yml', 'permissions:\n  contents: read\n');
  if (check(tmp).length) throw new Error('good fixture failed: ' + check(tmp));
  const bad = [
    ['.github/ISSUE_TEMPLATE/x.yml', 'name: a\n'],
    ['.github/labels.yml', 'junk\n'],
    ['.github/PULL_REQUEST_TEMPLATE.md', 'nothing\n'],
    ['.github/workflows/ci.yml', 'on: pull_request_target\n'],
  ];
  for (const [p, s] of bad) {
    const old = fs.readFileSync(path.join(tmp, p), 'utf8');
    w(p, s);
    if (!check(tmp).length) throw new Error('bad fixture passed: ' + p);
    w(p, old);
  }
  fs.rmSync(tmp, { recursive: true });
  console.log('check-github self-test ok');
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const args = process.argv.slice(2);
  if (args[0] === '--self-test') selfTest();
  else {
    let bad = 0;
    for (const d of args.length ? args : ['.']) {
      for (const e of check(d)) { console.error(`${d}: ${e}`); bad++; }
    }
    if (bad) process.exit(1);
    console.log('check-github ok');
  }
}
