---
id: "11-u17"
plan: "11"
title: "Deterministic script executor: seeded order, expectations, FakeModel binding"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 117
depends_on: ["11-u16","11-u12","09-u12"]
writes: ["test/simulation/runner/**","test/simulation/scenarios/engine/**"]
reads: []
spec: ["docs/design/ai/simulation.md#5-modes","docs/design/ai/simulation.md#4-lifecycle-driving","docs/design/flows/persona-simulation-run.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Order is fixed by `(turn, persona index)` from the persona seed; there is no wall-clock dependence (an injected Clock), so two runs with the same seed produce the same `events.jsonl` modulo ids and timestamps."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Run persona scripts end to end in deterministic mode: pick the next eligible persona turn, execute one step through the driver, compare the observed outcome with `expect`, record pass or deviation, and stop on terminal state, budget or turn limit. FakeModel behaviour is bound through the plan 09 test configuration.

## Steps
1. Orchestrator (`runner/orchestrator.ts`): holds a `WorldState` (problem states, open tasks, allowed actions fetched from the API, never assumed), a seeded PRNG for tie-breaks, a turn limit and per-persona `turn_budget`; each turn selects a persona whose `when` predicate holds; attackers may attempt forbidden actions on purpose (`raw_http` or `expect` of a refusal).
2. Step result classification: `as_expected`, `deviation` (outcome differs from `expect`), `error` (transport or unexpected status), each stored with persona, step, observed and expected; deviations never abort the run; they feed metrics and candidates.
3. FakeModel binding: the executor starts the run with a config handle for plan 09's test model (`FAKE_MODEL_SCRIPT` or equivalent documented in that unit) whose behaviour is derived from the case tables of can_policy `decision-points/*` so DP outcomes in deterministic runs follow the eval cases; document the exact switch in `test/simulation/README.md`.
4. Termination: all personas finished or stuck, turn limit, or a stop signal from the run budget; the final `WorldState` is written to the run directory.
5. Tests: determinism (two runs byte-identical after masking ids and timestamps), deviation recorded not fatal, turn limit stops, a persona never attempts a state-forbidden action unless flagged as an attacker.

## Acceptance
- Two runs with the same seed produce identical event streams after masking (test).
- Deviations are recorded and do not abort (test).
- The run ends on terminal states, budget or turn limit (tests).
- `npm run verify` is green.

## Out of scope
- Specific scenarios (11-u19 onward).
- Live personas.
