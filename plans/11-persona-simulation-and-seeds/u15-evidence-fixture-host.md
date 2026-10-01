---
id: "11-u15"
plan: "11"
title: "Fixture evidence host for synthetic evidence URLs"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 0.8
priority: 115
depends_on: ["11-u11"]
writes: ["test/simulation/evidence-host/**"]
reads: []
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/ai/decision-points.md#per-dp-notes"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "Agents never fetch URLs (DP-EVIDENCE-TIER reads stored metadata). The host exists so a human opening a seed evidence link in the sim stack sees a clearly marked synthetic page; keep it a tiny static server."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A tiny Node HTTP server (stdlib) that serves `https://evidence.sim.test/...` style paths as plain pages marked "Synthetic evidence, not real data" for every seed evidence item, and the metadata JSON the sim stack stores for those URLs.

## Steps
1. `test/simulation/evidence-host/server.ts`: serves `GET /<seed>/<id>` as an HTML page with a visible banner "Synthetic evidence for a seed problem. Not real data." and the item description; `GET /<seed>/<id>.json` as metadata; 404 otherwise; listens on a port given by flag; no outbound requests.
2. A `metadata fixture` writer: given the loaded seeds (11-u12), produce the metadata map the sim stack uses (`url -> {publisher_role, date, kind, tier_cap, synthetic: true}`) as `test/simulation/fixtures/evidence-metadata.json`.
3. Tests: every evidence item of any loaded seed resolves with the banner; unknown path 404; no `Access-Control-Allow-Origin: *` (same-origin only).

## Acceptance
- Every seed evidence URL resolves to a page with the synthetic banner (test).
- The server makes no outbound request (test with a blocked socket).
- `npm run verify` is green.

## Out of scope
- Fetching evidence in the pipeline (not allowed).
- Seed content.
