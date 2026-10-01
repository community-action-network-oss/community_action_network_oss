---
id: "07-u08"
plan: "07"
title: "Root e2e wiring in verify-all"
repo: "."
area: can-root
model: sonnet
est_hours: 1
priority: 122
depends_on: ["12-u26", "07-u07", "07-u21", "07-u22", "02-u01", "11-u18"]
writes: ["scripts/verify-all.sh","scripts/e2e.sh"]
reads: ["can_server/package.json","can_app/package.json"]
spec: ["docs/spec/01-slice-1-brief.md#1-what-slice-1-is","docs/design/system-design.md#10-web-first-verification","docs/spec/02-agent-rules.md"]
needs: []
verify: ["bash -n scripts/verify-all.sh","bash -n scripts/e2e.sh","bash scripts/verify-all.sh --docs-only"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One command runs the slice-1 definition of done: reset and seed (with the seed bootstrap and the FakeModel, never a live provider), start server and Expo web, run the Playwright journeys at both viewports, stop everything.

## Steps
0. The journey specs run by name: `e2e/journey-v2.spec.ts` (12-u26) first, then `e2e/journeys/branches.spec.ts`, `policy-change.spec.ts` and `legal-stack.spec.ts`.
1. scripts/e2e.sh: docker compose up -d --wait in can_server (npm --prefix), npm --prefix can_server run db:migrate, seed:reset and the seed bootstrap (11-u18) with AI_PROVIDER=fake forced and ANTHROPIC_API_KEY and OPEN_ROUTER_KEY unset (the script fails if a live provider is configured), start the server in the background (npm --prefix can_server run start:prod after build; write its pid to a temp file), wait for http://localhost:4000/v1/health, ensure Playwright browsers are present (npm --prefix can_app run e2e:install if missing), run npm --prefix can_app run e2e, then always stop background processes with a trap, print where traces are.
2. Wire verify-all.sh --e2e to call scripts/e2e.sh (replace the "not wired yet" stub); the default run stays without e2e unless --e2e is given. Print a gate table including e2e.
3. No cd: use npm --prefix and absolute paths. Never leave processes running on failure (trap EXIT).

## Acceptance
- The script cleans up background processes on success and failure.
- --docs-only still works with no docker.

## Out of scope
- Hosted CI.
