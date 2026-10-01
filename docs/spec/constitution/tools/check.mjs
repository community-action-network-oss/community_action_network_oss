// Usage: node check.mjs. Constitution checks: map, size, banned words, dashes, rule ID parity.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const fails = [];
try { execFileSync('node', [join(here, 'map-check.mjs')], { stdio: 'pipe' }); } catch (e) { fails.push('map-check: ' + e.stderr); }

const files = readdirSync(root).filter((f) => /\.(md|tsv)$/.test(f));
const text = {};
for (const f of files) {
  const p = join(root, f);
  text[f] = readFileSync(p, 'utf8');
  if (statSync(p).size > 25 * 1024) fails.push(`${f}: over 25KB`);
  for (const w of ['funder', 'advertiser', 'business model']) if (text[f].toLowerCase().includes(w)) fails.push(`${f}: banned "${w}"`);
  if (/[–—]/.test(text[f])) fails.push(`${f}: en or em dash`);
}
const used = new Set();
for (const f of files.filter((x) => /^ch\d\d/.test(x)))
  for (const l of text[f].split('\n').filter((l) => l.startsWith('Rules:')))
    for (const m of l.matchAll(/[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\d+/g)) used.add(m[0]);
const defined = new Set(files.filter((f) => /^rules(-.+)?\.md$/.test(f)).flatMap((f) => [...text[f].matchAll(/^\| ([A-Z][A-Z0-9-]*-\d+) \|/gm)].map((m) => m[1])));
for (const r of used) if (!defined.has(r)) fails.push(`rule used but not in rules*.md: ${r}`);
for (const r of defined) if (!used.has(r)) fails.push(`rule in rules*.md but unused in chapters: ${r}`);
if (fails.length) { console.error(fails.join('\n')); process.exit(1); }
console.log(`constitution check OK: ${files.length} files, ${defined.size} rules`);
