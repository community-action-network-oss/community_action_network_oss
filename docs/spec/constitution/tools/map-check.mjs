// Usage: node map-check.mjs [map.tsv]. Diffs article numbers in the split commit's staging file against map keys.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const mapPath = process.argv[2] ?? join(here, '..', 'map.tsv');
const src = execFileSync('git', ['-C', here, 'show', '7f61360:docs/spec/constitution/_staging.md'], { encoding: 'utf8', maxBuffer: 1 << 26 });
const want = [...src.matchAll(/^### Article (\d+):/gm)].map((m) => +m[1]);
const lines = readFileSync(mapPath, 'utf8').trim().split('\n').slice(1);
const got = lines.map((l) => +l.split('\t')[0]);
const missing = want.filter((n) => !got.includes(n));
const extra = got.filter((n) => !want.includes(n));
const dup = got.filter((n, i) => got.indexOf(n) !== i);
if (want.length !== 99 || missing.length || extra.length || dup.length) {
  console.error(`map-check FAIL: source=${want.length} missing=[${missing}] extra=[${extra}] dup=[${dup}]`);
  process.exit(1);
}
console.log('map-check OK: 99 articles, each mapped exactly once');
