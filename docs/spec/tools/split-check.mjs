#!/usr/bin/env node
// Verifies docs/spec/split-map.tsv: concatenating each segment (in original line
// order) reproduces build_spec.md byte for byte, and every line of every split
// file is used exactly once.
// Usage: node docs/spec/tools/split-check.mjs [repo_root] [git_ref]
//   git_ref: read every file from that commit (e.g. the split commit, since the
//   split files are edited afterwards and build_spec.md is removed later).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.argv[2] || path.resolve(import.meta.dirname, '../../..');
const ref = process.argv[3];
const read = (p) => ref
  ? execFileSync('git', ['-C', root, 'show', `${ref}:${p}`], { maxBuffer: 1 << 26 })
  : fs.readFileSync(path.join(root, p));
const lines = (buf) => buf.toString('utf8').match(/[^\n]*\n|[^\n]+$/g) || [];

const rows = read('docs/spec/split-map.tsv').toString().trim().split('\n').slice(1)
  .map((r) => r.split('\t')).map(([s, e, f, o]) => ({ s: +s, e: +e, f, o: +o }))
  .sort((a, b) => a.s - b.s);

const files = {}, used = {};
let out = '', expect = 1, errors = [];
for (const { s, e, f, o } of rows) {
  if (s !== expect) errors.push(`gap/overlap at original line ${expect} (row starts ${s})`);
  expect = e + 1;
  files[f] ??= lines(read(`docs/spec/${f}`));
  used[f] ??= new Array(files[f].length).fill(0);
  for (let i = 0; i <= e - s; i++) {
    const l = files[f][o - 1 + i];
    if (l === undefined) { errors.push(`${f}: offset ${o + i} past end`); break; }
    out += l; used[f][o - 1 + i]++;
  }
}
for (const [f, u] of Object.entries(used)) u.forEach((n, i) => n !== 1 && errors.push(`${f}: line ${i + 1} used ${n}x`));
const orig = read('build_spec.md');
if (Buffer.compare(Buffer.from(out, 'utf8'), orig) !== 0) errors.push('concatenation differs from build_spec.md');
if (errors.length) { console.error('SPLIT CHECK FAILED\n' + errors.slice(0, 20).join('\n')); process.exit(1); }
console.log(`split ok: ${rows.length} segments, ${Object.keys(files).length} files, ${orig.length} bytes`);
