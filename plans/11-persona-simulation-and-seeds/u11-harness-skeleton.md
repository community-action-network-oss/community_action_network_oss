---
id: "11-u11"
plan: "11"
title: "Simulation harness skeleton: HTTP-only runner, run store, import-boundary test"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 111
depends_on: ["10-u04"]
writes: ["test/simulation/**","package.json","tsconfig.json","vitest.config.ts"]
reads: ["src/**","openapi/openapi.json"]
spec: ["docs/design/components/server.md#where-the-simulation-harness-lives","docs/design/ai/simulation.md#4-lifecycle-driving","docs/design/flows/persona-simulation-run.md","docs/spec/constitution/rules.md#SIM-NOSECRET-1"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Plain TypeScript run by `node` (night runs) and launched by Vitest (CI), as decided in server.md. No new dependency except what can_server already has; if a YAML parser is needed use the one already present or the pinned `yaml` package, and say so."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The empty but working shell of the harness at `can_server/test/simulation`: a runner that takes a scenario set, seed, pack version and mode, talks to a running server only over HTTP, stores a run directory, and cannot import server code. The harness is HTTP-only (docs/design/components/server.md "Where the simulation harness lives"): it imports no server internals, only its own code and the generated API types.

## Steps
1. Layout: `test/simulation/{runner,api,personas,scenarios,report,store}/`, `test/simulation/README.md`, an entry `test/simulation/run.ts` (CLI: `--scenarios <set>`, `--seed N`, `--mode deterministic|live|replay`, `--base-url`, `--out <dir>`, `--pack <name@version>`), npm scripts `sim` (node runner) and `sim:test` (Vitest suite under `test/simulation/**/*.spec.ts`).
2. Run store (`store/`): a run directory `runs/<run_id>/` (gitignored) with `manifest.json` (run_id, mode, seed, base_url, pack and schema versions, start and end time, harness git sha), `events.jsonl` (every HTTP exchange: persona, step id, method, path, status, redacted body hash, timing), `transcripts/` (live mode), `report.json` (written by later units). `run_id` is a UUIDv7 from the existing id generator pattern or an injected clock plus counter in tests.
3. Import-boundary test (`test/simulation/boundary.spec.ts`): parses every file under `test/simulation` and fails on any import that resolves into `src/` except the generated types file (`openapi/openapi.json` or the app-independent type copy), `drizzle-orm`, `pg`, or `@nestjs/*` (SIM-NOSECRET-1, "no tools beyond the API client"). The runner reads no `.env` and accepts only `--base-url` and a persona token source; a test asserts the process env passed to personas contains none of the keys `DATABASE_URL`, `ANTHROPIC_API_KEY`, `SMTP_*`.
4. Guards: the runner refuses to start unless `GET /v1/health` reports `simulation: true` (added in 11-u13) or `--allow-ci-stack` is passed together with a base URL on localhost; it never reads a database.
5. Tests: runner with a tiny in-process stub HTTP server (Node http, no server import) runs one scripted no-op persona and writes a valid run directory; boundary test red-green with a deliberate bad import fixture; guard refuses a non-simulation base URL.

## Acceptance
- A stub-server run writes a complete run directory (manifest and events).
- An import from `src/` fails the boundary test (red-green).
- The runner refuses a base URL that is not marked as a simulation stack.
- `npm run verify` is green.

## Out of scope
- Personas, scenarios, reports (later units).
- Server simulation mode (11-u13).
