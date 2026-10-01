---
id: "11-u31"
plan: "11"
title: "Appeal loop scenario (G8): 10 appeals, an overturn that becomes a ratified example and a re-decision"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 131
depends_on: ["11-u20","09-u34","09-u35","09-u36","09-u37","11-u26"]
writes: ["test/simulation/scenarios/appeals/**"]
reads: []
spec: ["docs/design/ai/appeals.md","docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified","docs/design/ai/amendment-loop.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "The label task and the pack PR step are simulated with fixtures (a stub panel decision and a locally built pack variant) because no real panel exists; the report says so. If plan 09 or the label module lacks an endpoint, record `pending_dependency`."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Run at least 10 simulated appeals across personas, with at least one overturn, and walk the full loop once: independent re-run, label task, label becomes an example through a PR in can_policy fixtures, a new pack version, the instance re-decided by AI under it.

## Steps
1. Appeal set: 10 appeals filed by `app-appellant` and `sub-revising` variants against decisions from seeds 1 and 2 (some with new evidence, some disputing a reading); assert each resolved within the configured time bound (injected clock) and record upheld or overturned.
2. Full loop on one disputed case: independent re-run still disputed, label task created (randomized, context-masked fixture panel of 3 synthetic labelers), label stored, candidate written (11-u26), a pack variant with the example added is built via a fixture step, activated, and the original instance is re-decided by AI with the new version recorded; assert the poster sees the new notice.
3. Output `appeals {filed, upheld, overturned, time_to_decision, loop_exercised, example_ratified_fixture: true}`; the report marks `ratified_example: simulated_panel`.
4. Tests on the test server.

## Acceptance
- At least 10 appeals resolved within the bound (test).
- One overturn flows through to a new pack version and an AI re-decision with a notice (test).
- `npm run verify` is green.

## Out of scope
- A real ratification panel.
- Label task UI.
