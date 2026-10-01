#!/usr/bin/env node
// Plan-corpus tool: lint | next | graph | set. Node stdlib only. Format: plans/FORMAT.md
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPOS = ['.', 'can_server', 'can_app', 'can_gallery', 'can_policy'];
const AREAS = ['can-spec', 'can-root', 'can-server', 'can-app', 'can-gallery', 'can-policy'];
const USTATUS = ['todo', 'doing', 'done', 'blocked', 'skipped'];
const PSTATUS = ['todo', 'doing', 'done'];
const NEEDS = ['docker', 'db', 'mail'];
const UREQ = ['id', 'plan', 'title', 'repo', 'area', 'est_hours', 'priority', 'depends_on', 'writes', 'spec', 'verify', 'founder_gate', 'status'];
const PREQ = ['id', 'title', 'approved', 'status', 'depends_on_plans', 'spec'];

// ---- frontmatter (YAML subset) ----
function parseVal(s) {
  s = s.trim();
  if (s === 'null' || s === '') return null;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if (s[0] === '[') return JSON.parse(s);
  if (s[0] === '"') return JSON.parse(s);
  if (s[0] === "'" && s.endsWith("'")) return s.slice(1, -1);
  return s;
}
function splitDoc(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)([\s\S]*)$/);
  if (!m) throw new Error('missing --- frontmatter block');
  return { fm: m[1], body: m[3] };
}
function parseFm(text) {
  const { fm, body } = splitDoc(text);
  const data = {};
  for (const [i, line] of fm.split(/\r?\n/).entries()) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const m = line.match(/^([A-Za-z_][\w-]*):(.*)$/);
    if (!m) throw new Error(`frontmatter line ${i + 1} not "key: value": ${line}`);
    try { data[m[1]] = parseVal(m[2]); } catch (e) { throw new Error(`frontmatter key ${m[1]}: ${e.message}`); }
  }
  return { data, body };
}
const ser = (v) => (v === null ? 'null' : typeof v === 'string' ? (/^[A-Za-z][\w-]*$/.test(v) && !/^(true|false|null)$/.test(v) ? v : JSON.stringify(v)) : Array.isArray(v) ? JSON.stringify(v) : String(v));

// ---- load ----
function load(root) {
  const plansDir = path.join(root, 'plans');
  const errors = [], plans = [], units = [];
  const err = (f, m) => errors.push(`${path.relative(root, f)}: ${m}`);
  const read = (f) => {
    try { return { file: f, ...parseFm(fs.readFileSync(f, 'utf8')) }; } catch (e) { err(f, `unparseable: ${e.message}`); return null; }
  };
  const dirs = fs.existsSync(plansDir) ? fs.readdirSync(plansDir, { withFileTypes: true }).filter((d) => d.isDirectory() && /^\d\d-/.test(d.name)).map((d) => d.name).sort() : [];
  for (const d of dirs) {
    const pf = path.join(plansDir, d, 'PLAN.md');
    if (!fs.existsSync(pf)) { err(path.join(plansDir, d), 'missing PLAN.md'); continue; }
    const p = read(pf);
    if (p) plans.push({ ...p, dir: d });
    for (const f of fs.readdirSync(path.join(plansDir, d)).filter((n) => /^u\d+.*\.md$/.test(n)).sort()) {
      const u = read(path.join(plansDir, d, f));
      if (u) units.push({ ...u, dir: d });
    }
  }
  return { errors, plans, units, err };
}
const lanes = (units) => [...new Set(units.map((u) => u.data.repo))].sort();

// cycle detection over id -> [ids]; returns a cycle path or null
function findCycle(edges) {
  const state = {};
  const walk = (n, stack) => {
    if (state[n] === 2) return null;
    if (state[n] === 1) return [...stack.slice(stack.indexOf(n)), n];
    state[n] = 1;
    for (const m of edges[n] || []) if (m in edges) { const c = walk(m, [...stack, n]); if (c) return c; }
    state[n] = 2;
    return null;
  };
  for (const n of Object.keys(edges)) { const c = walk(n, []); if (c) return c; }
  return null;
}

// ---- lint ----
function lint(root) {
  const { errors, plans, units, err } = load(root);
  const isNum = (x) => typeof x === 'number' && Number.isFinite(x);
  const isStrArr = (x) => Array.isArray(x) && x.every((s) => typeof s === 'string');
  const pids = new Set();
  for (const p of plans) {
    const d = p.data, f = p.file;
    for (const k of PREQ) if (!(k in d)) err(f, `missing required field ${k}`);
    if (d.id !== undefined) { if (pids.has(d.id)) err(f, `duplicate plan id ${d.id}`); pids.add(d.id); }
    if (d.status !== undefined && !PSTATUS.includes(d.status)) err(f, `bad status "${d.status}" (${PSTATUS.join('|')})`);
    if ('approved' in d && typeof d.approved !== 'boolean') err(f, 'approved must be true|false');
    if (d.id !== undefined && !p.dir.startsWith(`${d.id}-`)) err(f, `plan id "${d.id}" does not match folder ${p.dir}`);
    for (const k of ['depends_on_plans', 'spec']) if (k in d && !isStrArr(d[k])) err(f, `${k} must be an inline JSON array of strings`);
  }
  const pedges = {};
  for (const p of plans) {
    pedges[p.data.id] = p.data.depends_on_plans || [];
    for (const dep of pedges[p.data.id]) if (!pids.has(dep)) err(p.file, `depends_on_plans dangling id ${dep}`);
  }
  const pc = findCycle(pedges);
  if (pc) errors.push(`plan dependency cycle: ${pc.join(' -> ')}`);

  const ids = new Map();
  for (const u of units) {
    const d = u.data, f = u.file;
    for (const k of UREQ) if (!(k in d)) err(f, `missing required field ${k}`);
    if (d.id !== undefined) { if (ids.has(d.id)) err(f, `duplicate unit id ${d.id} (also ${path.relative(root, ids.get(d.id))})`); else ids.set(d.id, f); }
    const en = (k, allowed) => { if (k in d && !allowed.includes(d[k])) err(f, `bad ${k} "${d[k]}" (${allowed.join('|')})`); };
    en('repo', REPOS); en('area', AREAS); en('status', USTATUS);
    if ('model' in d) en('model', ['sonnet', 'haiku']);
    if ('needs' in d && (!isStrArr(d.needs) || d.needs.some((n) => !NEEDS.includes(n)))) err(f, `bad needs (subset of ${NEEDS.join('|')})`);
    if ('founder_gate' in d && typeof d.founder_gate !== 'boolean') err(f, 'founder_gate must be true|false');
    if ('priority' in d && !Number.isInteger(d.priority)) err(f, 'priority must be an integer');
    if ('est_hours' in d) { if (!isNum(d.est_hours) || d.est_hours <= 0) err(f, 'est_hours must be a positive number'); else if (d.est_hours > 1.5) err(f, `est_hours ${d.est_hours} > 1.5`); }
    for (const k of ['depends_on', 'writes', 'reads', 'spec', 'verify', 'commits']) if (k in d && !isStrArr(d[k])) err(f, `${k} must be an inline JSON array of strings`);
    const plan = plans.find((p) => p.dir === u.dir);
    if (d.plan !== undefined && plan && plan.data.id !== d.plan) err(f, `unit plan "${d.plan}" does not match folder plan id "${plan.data.id}"`);
    for (const w of Array.isArray(d.writes) ? d.writes : []) {
      if (typeof w === 'string' && (path.isAbsolute(w) || /^[A-Za-z]:/.test(w) || w.split(/[\\/]/).includes('..'))) err(f, `writes glob escapes repo: ${w}`);
    }
    for (const s of Array.isArray(d.spec) ? d.spec : []) {
      const p = String(s).split('#')[0];
      if (!fs.existsSync(path.join(root, p))) err(f, `spec path not found: ${p}`);
    }
    if (d.area === 'can-app' && !/WF-[A-Z-]+-\d+/.test(`${[].concat(d.spec || []).join('\n')}\n${u.body}`)) err(f, 'can-app unit must cite a WF-<AREA>-<n> wireframe id');
  }
  const uedges = {};
  for (const u of units) {
    const dep = u.data.depends_on;
    uedges[u.data.id] = Array.isArray(dep) ? dep : [];
    for (const x of uedges[u.data.id]) if (!ids.has(x)) err(u.file, `depends_on dangling id ${x}`);
  }
  const uc = findCycle(uedges);
  if (uc) errors.push(`unit dependency cycle: ${uc.join(' -> ')}`);
  // informational plan deps: warn when no unit-level edge backs them
  const warnings = [];
  const planOf = Object.fromEntries(units.map((u) => [u.data.id, u.data.plan]));
  for (const p of plans) for (const dep of p.data.depends_on_plans || []) {
    const backed = units.some((u) => u.data.plan === p.data.id && (u.data.depends_on || []).some((x) => planOf[x] === dep));
    if (pids.has(dep) && !backed) warnings.push(`plan ${p.data.id} depends_on_plans ${dep} but no unit of ${p.data.id} depends on a unit of ${dep}`);
  }
  return { errors, warnings, plans, units };
}

function cmdLint(root) {
  const { errors, warnings, plans, units } = lint(root);
  if (errors.length) { console.error(errors.map((e) => `ERROR ${e}`).join('\n')); console.error(`lint FAILED: ${errors.length} error(s)`); return 1; }
  const by = {};
  for (const u of units) by[u.data.status] = (by[u.data.status] || 0) + 1;
  for (const w of warnings) console.error(`WARN ${w}`);
  console.log(`lint OK: ${plans.length} plans, ${units.length} units${warnings.length ? `, ${warnings.length} warning(s)` : ''}`);
  console.log(`status: ${Object.entries(by).sort().map(([k, v]) => `${k}=${v}`).join(' ') || 'none'}`);
  for (const l of lanes(units)) {
    const us = units.filter((u) => u.data.repo === l);
    console.log(`lane ${l}: ${us.length} units, ${us.reduce((s, u) => s + u.data.est_hours, 0).toFixed(1)}h`);
  }
  return 0;
}

// ---- next ----
function select(root, hours) {
  const { errors, plans, units } = lint(root);
  if (errors.length) throw new Error(`corpus does not lint (${errors.length} errors); run lint`);
  const approved = new Set(plans.filter((p) => p.data.approved === true).map((p) => p.data.id));
  const status = Object.fromEntries(units.map((u) => [u.data.id, u.data.status]));
  const budget = hours * 0.8;
  const out = { hours, budget, lanes: {}, skipped: [] };
  const cand = units.filter((u) => u.data.status === 'todo');
  const ok = [];
  for (const u of cand) {
    const d = u.data;
    if (!approved.has(d.plan)) out.skipped.push({ id: d.id, reason: 'plan not approved' });
    else if (d.founder_gate) out.skipped.push({ id: d.id, reason: 'founder_gate' });
    else ok.push(u);
  }
  const byId = Object.fromEntries(units.map((u) => [u.data.id, u]));
  for (const lane of lanes(ok)) {
    const pool = ok.filter((u) => u.data.repo === lane).sort((a, b) => a.data.priority - b.data.priority || a.data.id.localeCompare(b.data.id));
    const picked = [], pickedIds = new Set();
    let total = 0, progress = true;
    while (progress) { // a unit may unlock once its same-lane dep is picked
      progress = false;
      for (const u of pool) {
        const d = u.data;
        if (pickedIds.has(d.id)) continue;
        if (!d.depends_on.every((x) => status[x] === 'done' || (pickedIds.has(x) && byId[x].data.repo === lane))) continue;
        if (total + d.est_hours > budget + 1e-9) continue;
        picked.push(d); pickedIds.add(d.id); total += d.est_hours; progress = true;
        break;
      }
    }
    out.lanes[lane] = { units: picked.map((d) => ({ id: d.id, title: d.title, est_hours: d.est_hours, model: d.model || 'sonnet', needs: d.needs || [] })), total };
    for (const u of pool) if (!pickedIds.has(u.data.id)) {
      const d = u.data;
      const unmet = d.depends_on.filter((x) => !(status[x] === 'done' || (pickedIds.has(x) && byId[x].data.repo === lane)));
      out.skipped.push({ id: d.id, reason: unmet.length ? `deps not satisfied: ${unmet.join(', ')}` : 'over time budget' });
    }
  }
  out.skipped.sort((a, b) => a.id.localeCompare(b.id));
  return out;
}

function cmdNext(root, args) {
  const hours = Number(flag(args, '--hours') ?? 6);
  if (!(hours > 0)) throw new Error('--hours must be a positive number');
  const r = select(root, hours);
  if (args.includes('--json')) { console.log(JSON.stringify(r, null, 2)); return 0; }
  console.log(`night plan: ${hours}h, budget ${r.budget.toFixed(1)}h per lane`);
  for (const [lane, l] of Object.entries(r.lanes)) {
    console.log(`\nlane ${lane} (${l.total.toFixed(1)}h)`);
    for (const u of l.units) console.log(`  ${u.id}  ${u.est_hours}h  ${u.model}  ${u.title}${u.needs.length ? `  [needs ${u.needs.join(',')}]` : ''}`);
  }
  if (!Object.keys(r.lanes).length) console.log('\n(no eligible units)');
  if (r.skipped.length) { console.log('\nskipped:'); for (const s of r.skipped) console.log(`  ${s.id}: ${s.reason}`); }
  return 0;
}

// ---- graph ----
function cmdGraph(root) {
  const { errors, plans, units } = lint(root);
  if (errors.length) throw new Error(`corpus does not lint (${errors.length} errors); run lint`);
  const n = (p, id) => `${p}_${id.replace(/\W/g, '_')}`;
  const q = (s) => s.replace(/"/g, "'");
  const L = ['flowchart LR'];
  for (const p of plans) {
    L.push(`  subgraph ${n('s', p.data.id)}["${p.data.id} ${q(p.data.title)}"]`);
    for (const u of units.filter((x) => x.dir === p.dir)) L.push(`    ${n('u', u.data.id)}["${u.data.id}"]`);
    L.push('  end');
  }
  for (const p of plans) for (const d of p.data.depends_on_plans) L.push(`  ${n('s', d)} ==> ${n('s', p.data.id)}`);
  for (const u of units) for (const d of u.data.depends_on) L.push(`  ${n('u', d)} --> ${n('u', u.data.id)}`);
  console.log(L.join('\n'));
  return 0;
}

// ---- set ----
const SETTABLE = ['status', 'attempts', 'commits', 'actual_hours', 'blocked_reason'];
function cmdSet(root, args) {
  const [id, ...pairs] = args;
  if (!id || !pairs.length) throw new Error('usage: set <unit-id> key=value ...');
  const { units } = load(root);
  const u = units.find((x) => x.data.id === id);
  if (!u) throw new Error(`unit not found: ${id}`);
  let text = fs.readFileSync(u.file, 'utf8');
  const nl = text.includes('\r\n') ? '\r\n' : '\n';
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  let fm = m[1];
  const next = { ...u.data };
  for (const p of pairs) {
    const i = p.indexOf('=');
    const k = p.slice(0, i), v = parseVal(p.slice(i + 1));
    if (i < 1 || !SETTABLE.includes(k)) throw new Error(`cannot set "${p}" (allowed: ${SETTABLE.join(', ')})`);
    next[k] = v;
    const line = `${k}: ${ser(v)}`;
    const re = new RegExp(`^${k}:.*$`, 'm');
    fm = re.test(fm) ? fm.replace(re, () => line) : `${fm}${nl}${line}`;
  }
  if (!USTATUS.includes(next.status)) throw new Error(`bad status ${next.status}`);
  fs.writeFileSync(u.file, text.replace(m[0], () => `---${nl}${fm}${nl}---`));
  console.log(`${id}: ${pairs.join(' ')}`);
  return 0;
}

// ---- cli ----
function flag(args, name) { const i = args.indexOf(name); return i < 0 ? undefined : args[i + 1]; }
function main() {
  const args = process.argv.slice(2);
  const cmd = args.shift();
  const root = path.resolve(flag(args, '--root') ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..'));
  const i = args.indexOf('--root');
  if (i >= 0) args.splice(i, 2);
  const cmds = { lint: cmdLint, next: cmdNext, graph: cmdGraph, set: cmdSet };
  if (!cmds[cmd]) { console.error('usage: corpus.mjs lint|next --hours N [--json]|graph|set <unit-id> k=v... [--root DIR]'); return 2; }
  try { return cmds[cmd](root, args); } catch (e) { console.error(`error: ${e.message}`); return 1; }
}
process.exitCode = main();
