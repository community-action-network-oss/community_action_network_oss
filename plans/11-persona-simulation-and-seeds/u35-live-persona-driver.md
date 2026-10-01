---
id: "11-u35"
plan: "11"
title: "Live persona mode: model-driven personas via the gateway, transcripts, spend cap guard"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 135
depends_on: ["11-u17","09-u09","09-u15","09-u14","11-u25"]
writes: ["test/simulation/live/**"]
reads: []
spec: ["docs/design/ai/simulation.md#5-modes","docs/design/ai/safety-and-privacy.md","docs/spec/constitution/rules.md#SIM-NOSECRET-1","docs/design/flows/persona-simulation-run.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Built and tested with FakeModel only (D-65: live runs are not founder-gated). Live mode needs OPEN_ROUTER_KEY and an explicit --cap-usd, uses free or cheap registered models only and synthetic data only, and refuses to start without them. Persona model differs from the DP model where the register allows."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Code for live mode: each persona turn is produced by a model through the same gateway and router as the pipeline, from the persona prompt and the schema, with strict output validation and a spend guard. No keys are stored in the harness (SIM-NOSECRET-1).

## Steps
1. `live/persona-model.ts`: builds the turn prompt from `persona.yaml`, `prompt.md`, the current schema and the last decision; calls the gateway persona route (plan 09 router, a dedicated `persona` purpose with its own budget line); validates the model output against the script step shape (a structured submission for the schema), retries once, then marks the persona stuck.
2. Spend guard: `--cap-usd` required (a run budget under the monthly cap); persona turns route only to free or cheap registered models and only synthetic content is ever sent; the runner reads spend from the gateway/budget records and stops at 95% of the cap writing `report.incomplete: true`; live mode refuses to start without `--cap-usd` and without the gateway reporting a live provider as enabled; no secret is read from the environment by harness code.
3. Transcripts: every persona turn (prompt hash, model id, redacted output) is written to `transcripts/` so a finding can be replayed (11-u36); canary strings never appear in prompts.
4. Tests with FakeModel persona responses (scripted JSON): turn production, invalid output retry then stuck, guard refusal without cap, stop at cap writes an incomplete report, transcripts present and canary-free.

## Acceptance
- Live mode refuses to start without a cap or an enabled live provider (tests).
- A cap stop produces an incomplete report (test).
- Transcripts exist and contain no canaries (test).
- `npm run verify` is green with FakeModel only.

## Out of scope
- Running live (11-u38, 11-u39).
- The provider adapter and model register (09-u13, 09-u68).
