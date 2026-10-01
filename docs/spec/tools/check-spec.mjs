#!/usr/bin/env node
// Checks the edited spec: file sizes, Notion residue, dashes, open-question format.
// Usage: node docs/spec/tools/check-spec.mjs [repo_root]
// Constitution files are checked by docs/spec/constitution/tools/check.mjs.
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || path.resolve(import.meta.dirname, '../../..');
const spec = path.join(root, 'docs/spec');
const oqDir = path.join(root, 'docs/open-questions');
const MAX = 25 * 1024;
const errors = [];
const md = (d) => fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.md')).map((f) => path.join(d, f)) : [];
const rel = (p) => path.relative(root, p);

for (const f of md(spec)) {
  const t = fs.readFileSync(f, 'utf8');
  if (Buffer.byteLength(t) > MAX) errors.push(`${rel(f)}: ${Buffer.byteLength(t)} bytes > 25KB`);
  if (/<\/?aside>/.test(t)) errors.push(`${rel(f)}: contains <aside>`);
  if (/^> ?$/m.test(t)) errors.push(`${rel(f)}: empty "> " line`);
  if (/[—–]/.test(t)) errors.push(`${rel(f)}: em or en dash`);
  if (/Hall of fame/i.test(t)) errors.push(`${rel(f)}: "Hall of fame"`);
}

const manifesto = path.join(root, 'manifesto.md');
if (fs.existsSync(manifesto)) {
  const t = fs.readFileSync(manifesto, 'utf8');
  if (/[—–]/.test(t)) errors.push('manifesto.md: em or en dash');
  if (!/^# /m.test(t)) errors.push('manifesto.md: no H1');
  if (/instagram|igsh=/i.test(t)) errors.push('manifesto.md: tracking link');
  if (Buffer.byteLength(t) > MAX) errors.push('manifesto.md: > 25KB');
} else errors.push('manifesto.md missing');

const oq = md(oqDir).filter((f) => /OQ-.+\.md$/.test(f));
if (oq.length < 15) errors.push(`docs/open-questions: only ${oq.length} OQ files (need 15 or more)`);
for (const f of oq) {
  const t = fs.readFileSync(f, 'utf8');
  const slug = path.basename(f, '.md');
  if (Buffer.byteLength(t) > MAX) errors.push(`${rel(f)}: > 25KB`);
  if (/[—–]/.test(t)) errors.push(`${rel(f)}: em or en dash`);
  if (!t.includes(`**ID:** ${slug}`)) errors.push(`${rel(f)}: missing id line`);
  if (!/\*\*Status:\*\* (open|proposed|decided|withdrawn)/.test(t)) errors.push(`${rel(f)}: missing status`);
  for (const h of ['Question', 'Why it matters', 'Current default', 'Who can help', 'Spec links'])
    if (!new RegExp(`^## ${h}`, 'm').test(t)) errors.push(`${rel(f)}: missing section "${h}"`);
}

if (errors.length) { console.error('SPEC CHECK FAILED\n' + errors.join('\n')); process.exit(1); }
console.log(`spec ok: ${md(spec).length} spec files, ${oq.length} open questions`);
