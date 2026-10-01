---
id: "11-u36"
plan: "11"
title: "Recorded replay mode: rerun a live finding from its transcript"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 136
depends_on: ["11-u35"]
writes: ["test/simulation/replay/**"]
reads: []
spec: ["docs/design/ai/simulation.md#5-modes","docs/design/flows/persona-simulation-run.md"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "Replay uses persona transcripts and recorded model responses; DP model responses come from recorded provider responses stored by the gateway test recorder (plan 09). Missing recordings fail the replay with the missing turn named."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A live finding becomes a cheap regression: `--mode replay --from <run_id>` re-executes the persona turns from transcripts against FakeModel loaded with the recorded DP responses.

## Steps
1. Read `transcripts/` and the recordings index of the source run; build a script from the persona turns; load recordings into the FakeModel script input; run through the executor (11-u17).
2. Assert the same outcomes as the source run turn by turn, report differences as `replay_deviation`; a mismatch in a prior failure becomes a regression candidate (11-u26).
3. Tests with a fabricated transcript and recordings: identical outcomes pass, a changed pack version produces deviations, missing recording is reported.

## Acceptance
- Replay of a recorded run matches outcomes on the same pack version (test).
- A changed pack produces reported deviations (test).
- `npm run verify` is green.

## Out of scope
- Recording infrastructure (plan 09).
