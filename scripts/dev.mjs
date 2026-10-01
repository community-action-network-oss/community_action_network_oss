// One command dev environment: node scripts/dev.mjs (Node stdlib only).
import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import net from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tty = process.stdout.isTTY;
const paint = (c, s) => (tty ? `\x1b[${c}m${s}\x1b[0m` : s);

const services = [
  { name: 'server', color: 32, repo: 'can_server', port: 4000, cmd: ['npm', 'run', 'start:dev'], url: 'http://localhost:4000/docs' },
  { name: 'gallery', color: 36, repo: 'can_gallery', port: 3000, cmd: ['npm', 'run', 'dev'], url: 'http://localhost:3000' },
  { name: 'app', color: 35, repo: 'can_app', port: 8081, cmd: ['npx', 'expo', 'start', '--web', '--port', '8081'], url: 'http://localhost:8081' },
];

const listening = (port) =>
  Promise.all(['127.0.0.1', '::1'].map((host) => new Promise((res) => {
    const s = net.connect({ port, host });
    s.once('connect', () => { s.destroy(); res(true); });
    s.once('error', () => res(false));
  }))).then((r) => r.some(Boolean));

const run = (cmd, args) => spawnSync(cmd, args, { cwd: root, stdio: 'inherit' }).status === 0;

// 1. dependencies
const ready = services.filter((s) => {
  if (existsSync(join(root, s.repo, 'node_modules'))) return true;
  console.log(`[dev] ${s.repo}: node_modules missing, run: npm --prefix ${s.repo} ci`);
  return false;
});
if (!ready.length) process.exit(1);

// 2. database
const docker = spawnSync('docker', ['info'], { stdio: 'ignore' }).status === 0;
if (!docker) {
  console.warn('[dev] WARNING: Docker is not running. The API will report the database down. Start Docker and re-run for Postgres.');
} else if (
  run('docker', ['compose', '-f', 'can_server/docker-compose.yml', '--project-directory', 'can_server', 'up', '-d', '--wait']) &&
  ready.some((s) => s.repo === 'can_server')
) {
  run('npm', ['--prefix', 'can_server', 'run', 'db:migrate']);
}

// 3-4. spawn
const children = [];
let stopping = false;
const pipe = (s, stream, out) => {
  let buf = '';
  const tag = paint(s.color, `[${s.name}]`);
  stream.on('data', (d) => {
    buf += d;
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const l of lines) out.write(`${tag} ${l}\n`);
  });
  stream.on('end', () => buf && out.write(`${tag} ${buf}\n`));
};

for (const s of ready) {
  if (await listening(s.port)) { console.log(`[dev] ${s.name}: already running on :${s.port}`); continue; }
  const c = spawn(s.cmd[0], s.cmd.slice(1), {
    cwd: join(root, s.repo),
    detached: true, // own process group so the whole tree can be killed
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, FORCE_COLOR: tty ? '1' : '0' },
  });
  children.push(c);
  pipe(s, c.stdout, process.stdout);
  pipe(s, c.stderr, process.stderr);
  c.on('exit', (code, sig) => {
    if (!stopping) console.log(`[dev] ${s.name} exited (${sig ?? code}); the others keep running`);
    if (children.every((x) => x.exitCode !== null || x.signalCode !== null) && !stopping) process.exit(1);
  });
  s.child = c;
}

// 6. announce
for (const s of ready) {
  if (!s.child) continue;
  (async () => {
    while (!stopping && s.child.exitCode === null) {
      if (await listening(s.port)) return console.log(`[dev] ${s.name} ready: ${s.url}`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  })();
}
if (docker) console.log('[dev] Postgres/Mailpit stay up on exit. Stop them: docker compose -f can_server/docker-compose.yml --project-directory can_server down');

// 5. shutdown
const stop = () => {
  if (stopping) return;
  stopping = true;
  for (const c of children) { try { process.kill(-c.pid, 'SIGTERM'); } catch {} }
  setTimeout(() => {
    for (const c of children) { try { process.kill(-c.pid, 'SIGKILL'); } catch {} }
    process.exit(0);
  }, 5000).unref();
  setInterval(() => {
    if (children.every((c) => c.exitCode !== null || c.signalCode !== null)) process.exit(0);
  }, 100).unref();
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
