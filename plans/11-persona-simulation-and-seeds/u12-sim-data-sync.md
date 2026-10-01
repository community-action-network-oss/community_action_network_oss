---
id: "11-u12"
plan: "11"
title: "Simulation data sync and loaders: personas, seeds and thresholds from can_policy"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 112
depends_on: ["11-u11","11-u01"]
writes: ["test/simulation/data/**","scripts/sync-simulation-data.mjs","package.json","test/simulation/fixtures/**"]
reads: ["../can_policy/simulation/**"]
spec: ["docs/design/ai/simulation.md#10-layout","docs/design/components/can-policy.md","docs/design/flows/persona-simulation-run.md"]
needs: []
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Follow the 03-u02 pattern: read `../can_policy` when present, else use the committed copy under `test/simulation/fixtures/data/`; never fail a standalone checkout of can_server."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The harness loads personas, scripts, seeds, FRAMINGS and thresholds as typed objects with validation, from a synced copy so can_server never needs can_policy at runtime.

## Steps
1. `scripts/sync-simulation-data.mjs` (stdlib): copies `../can_policy/simulation/**` (personas, seeds, thresholds, FRAMINGS.json) and `../can_policy/schemas/{persona,script,seed,thresholds}.schema.json` into `test/simulation/fixtures/data/`, writing a `SOURCE.json` with the can_policy git sha; exits 0 with "skipped: can_policy not present" when absent. Add `npm run sim:sync`.
2. Loaders in `test/simulation/data/` (YAML via the pinned parser; JSON schema validation with `ajv` only if can_server already has it from 10-u29, otherwise a small hand validator for the three formats): `loadPersonas()`, `loadSeeds()`, `loadThresholds()`, returning typed structures; unknown persona id in a seed throws; the `synthetic: true` and framing-equality checks are repeated (defence in depth).
3. Commit a small synced snapshot (the format fixtures plus whatever personas and seeds exist when this unit runs; a note in `SOURCE.json`).
4. Tests: loaders on the committed snapshot; a persona without `synthetic: true` is refused; a seed whose framing differs is refused; `sync` skips cleanly when the sibling is absent.

## Acceptance
- Loaders return validated typed personas, seeds and thresholds from the committed snapshot.
- The sync script is a no-op without can_policy and never fails verify.
- `npm run verify` is green.

## Out of scope
- Running scripts (11-u17).
- Writing persona content.
