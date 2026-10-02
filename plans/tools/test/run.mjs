// node plans/tools/test/run.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const tool = path.join(here, '..', 'corpus.mjs');
const valid = path.join(here, 'fixtures', 'valid');
const run = (root, ...a) => spawnSync('node', [tool, ...a, '--root', root], { encoding: 'utf8' });

// copy the valid corpus, apply edit(dir), return dir
function mutant(edit) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'corpus-'));
  fs.cpSync(valid, d, { recursive: true });
  edit(d);
  return d;
}
const sub = (rel, from, to) => (d) => {
  const f = path.join(d, 'plans', rel);
  const t = fs.readFileSync(f, 'utf8');
  assert.ok(t.includes(from), `fixture edit: "${from}" not in ${rel}`);
  fs.writeFileSync(f, t.replace(from, to));
};
const U1 = '01-alpha/u01-one.md', U2 = '01-alpha/u02-two.md', U3 = '01-alpha/u03-screen.md';

const defects = {
  'unparseable frontmatter': [sub(U1, 'priority: 1', 'priority 1'), /unparseable.*not "key: value"/],
  'missing required field': [sub(U1, 'verify: ["npm run verify"]\n', ''), /missing required field verify/],
  'bad enum': [sub(U1, 'area: can-server', 'area: can-bogus'), /bad area "can-bogus"/],
  'duplicate unit id': [sub(U2, 'id: "01-u02"', 'id: "01-u01"'), /duplicate unit id 01-u01/],
  'dangling depends_on': [sub(U2, '["01-u01"]', '["01-u99"]'), /dangling id 01-u99/],
  'dependency cycle': [sub(U1, 'depends_on: []', 'depends_on: ["01-u02"]'), /unit dependency cycle: .*01-u0[12]/],
  'plan id mismatch': [sub(U1, 'plan: "01"', 'plan: "02"'), /does not match folder plan id "01"/],
  'writes escapes repo (..)': [sub(U1, '"src/**"', '"../x/**"'), /writes glob escapes repo: \.\.\/x/],
  'writes escapes repo (absolute)': [sub(U1, '"src/**"', '"/etc/**"'), /writes glob escapes repo: \/etc/],
  'spec path missing': [sub(U1, 'docs/spec/a.md#intro', 'docs/spec/nope.md#intro'), /spec path not found: docs\/spec\/nope\.md/],
  'app unit without WF citation': [sub(U3, 'WF-HOME-1', 'HOME-1'), /can-app unit must cite a WF-/],
  'est_hours > 1.5': [sub(U1, 'est_hours: 1.0', 'est_hours: 2'), /est_hours 2 > 1\.5/],
};

test('lint passes on valid corpus', () => {
  const r = run(valid, 'lint');
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /lint OK: 2 plans, 7 units/);
  assert.match(r.stdout, /lane can_server: 3 units, 3\.0h/);
});

for (const [name, [edit, re]] of Object.entries(defects)) {
  test(`lint fails: ${name}`, () => {
    const r = run(mutant(edit), 'lint');
    assert.equal(r.status, 1);
    assert.match(r.stderr, re);
  });
}

test('next is deterministic and correct on valid corpus', () => {
  const a = run(valid, 'next', '--hours', '6', '--json');
  assert.equal(a.status, 0, a.stderr);
  assert.equal(run(valid, 'next', '--hours', '6', '--json').stdout, a.stdout);
  const j = JSON.parse(a.stdout);
  assert.deepEqual(j.lanes.can_server.units.map((u) => u.id), ['01-u01', '01-u02']);
  assert.equal(j.lanes.can_server.total, 2.5);
  assert.deepEqual(j.lanes.can_app.units.map((u) => u.id), ['01-u03']);
  assert.deepEqual(j.skipped, [
    { id: '01-u04', reason: 'founder_gate' },
    { id: '01-u05', reason: 'deps not satisfied: 01-u01' },
    { id: '02-u01', reason: 'plan not approved' },
  ]);
});

test('next respects time budget', () => {
  const j = JSON.parse(run(valid, 'next', '--hours', '1.5', '--json').stdout); // budget 1.2h
  assert.deepEqual(j.lanes.can_server.units.map((u) => u.id), ['01-u01']);
  assert.ok(j.skipped.some((s) => s.id === '01-u02' && s.reason === 'over time budget'));
});

test('next: cross-lane dep unlocks once dep is done', () => {
  const d = mutant((x) => { sub(U1, 'status: todo', 'status: done')(x); });
  const j = JSON.parse(run(d, 'next', '--hours', '6', '--json').stdout);
  assert.deepEqual(j.lanes.can_app.units.map((u) => u.id), ['01-u03', '01-u05']);
});

test('set updates fields in place, preserving body', () => {
  const d = mutant(() => {});
  const f = path.join(d, 'plans', U1);
  const before = fs.readFileSync(f, 'utf8');
  const r = run(d, 'set', '01-u01', 'status=done', 'attempts=2', 'commits=["abc1234"]', 'actual_hours=0.9', 'blocked_reason=none');
  assert.equal(r.status, 0, r.stderr);
  const after = fs.readFileSync(f, 'utf8');
  assert.match(after, /^status: done$/m);
  assert.match(after, /^attempts: 2$/m);
  assert.match(after, /^commits: \["abc1234"\]$/m);
  assert.match(after, /^actual_hours: 0\.9$/m);
  assert.match(after, /^blocked_reason: none$/m);
  assert.equal(after.split('---\n')[2], before.split('---\n')[2]); // body untouched
  assert.equal(run(d, 'lint').status, 0);
  assert.equal(run(d, 'set', '01-u01', 'id=x').status, 1);
});

test('graph emits mermaid', () => {
  const r = run(valid, 'graph');
  assert.match(r.stdout, /^flowchart LR/);
  assert.match(r.stdout, /u_01_u01 --> u_01_u02/);
  assert.match(r.stdout, /s_01 ==> s_02/);
});

test('next lists a same-lane dependency before its dependent even when the dependent has lower priority number', () => {
  const d = mutant(sub(U2, 'priority: 2', 'priority: 0'));
  const j = JSON.parse(run(d, 'next', '--hours', '6', '--json').stdout);
  assert.deepEqual(j.lanes.can_server.units.map((u) => u.id), ['01-u01', '01-u02']);
});

test('lint warns (exit 0) when a plan dependency has no unit-level edge', () => {
  const d = mutant(sub('02-beta/u01-unapproved.md', 'depends_on: ["01-u03"]', 'depends_on: []'));
  const r = run(d, 'lint');
  assert.equal(r.status, 0);
  assert.match(r.stderr, /WARN plan 02 depends_on_plans 01 but no unit of 02 depends on a unit of 01/);
  assert.match(r.stdout, /1 warning/);
});

test('lint does not warn when a unit edge backs the plan dependency', () => {
  const r = run(valid, 'lint');
  assert.equal(r.status, 0);
  assert.doesNotMatch(r.stderr, /WARN/);
});

test('can_policy unit lints and is scheduled in its own lane', () => {
  const r = run(valid, 'lint');
  assert.match(r.stdout, /lane can_policy: 1 units/);
  const j = JSON.parse(run(valid, 'next', '--hours', '6', '--json').stdout);
  assert.deepEqual(j.lanes.can_policy.units.map((u) => u.id), ['01-u06']);
  assert.equal(run(mutant(sub('01-alpha/u06-policy-lane.md', 'area: can-policy', 'area: can-bogus')), 'lint').status, 1);
});

const cat = (root, ...a) => run(root, 'catalog', ...a);
test('catalog: json shape, gated excluded, stable order, byte-identical', () => {
  const a = cat(valid);
  assert.equal(a.status, 0, a.stderr);
  assert.equal(cat(valid).stdout, a.stdout);
  const j = JSON.parse(a.stdout);
  assert.ok(!j.some((u) => u.id === '01-u04'));
  assert.deepEqual(j.map((u) => u.id), ['01-u01', '01-u02', '01-u03', '01-u05', '01-u06', '02-u01'].sort((x, y) => j.findIndex((u) => u.id === x) - j.findIndex((u) => u.id === y)));
  for (let i = 1; i < j.length; i++) assert.ok(j[i - 1].plan < j[i].plan || (j[i - 1].plan === j[i].plan && j[i - 1].priority <= j[i].priority));
  assert.deepEqual(j.find((u) => u.id === '01-u01').tags, []);
  assert.equal(j.find((u) => u.id === '01-u01').objective, 'Do 01-u01.');
  assert.deepEqual(j.find((u) => u.id === '01-u01').acceptance, ['y']);
  assert.equal(j.find((u) => u.id === '01-u01').path, 'plans/01-alpha/u01-one.md');
  assert.equal(j.find((u) => u.id === '01-u01').plan_title, 'Alpha');
  assert.ok(JSON.parse(cat(valid, '--include-gated').stdout).some((u) => u.id === '01-u04'));
});

test('catalog: tags field lints and filters', () => {
  const d = mutant(sub(U1, 'defaults: "none"', 'defaults: "none"\ntags: ["good-first", "docs"]'));
  assert.equal(run(d, 'lint').status, 0);
  const j = JSON.parse(cat(d, '--tag', 'docs').stdout);
  assert.deepEqual(j.map((u) => u.id), ['01-u01']);
  assert.deepEqual(j[0].tags, ['good-first', 'docs']);
  for (const bad of ['["Bad"]', '["a_b"]', '"docs"', '[1]']) {
    const r = run(mutant(sub(U1, 'defaults: "none"', `defaults: "none"\ntags: ${bad}`)), 'lint');
    assert.equal(r.status, 1, bad);
    assert.match(r.stderr, /tags must be/);
  }
});

test('catalog: status and area filters', () => {
  assert.deepEqual(JSON.parse(cat(valid, '--area', 'can-app').stdout).map((u) => u.area), JSON.parse(cat(valid, '--area', 'can-app').stdout).map(() => 'can-app'));
  assert.ok(JSON.parse(cat(valid, '--status', 'done').stdout).length === 0);
  assert.ok(JSON.parse(cat(valid, '--status', 'todo,doing').stdout).length > 0);
});

test('catalog: markdown output', () => {
  const r = cat(valid, '--markdown');
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /^# Plan corpus catalog/);
  assert.match(r.stdout, /### 01-u01 Unit 01-u01/);
  assert.match(r.stdout, /- \[ \] y/);
  assert.equal(cat(valid, '--markdown').stdout, r.stdout);
});
