---
id: "11-u30"
plan: "11"
title: "Rollout and rollback scenario (G10): shadow to full, then rollback, kill switch"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 130
depends_on: ["11-u17","09-u27","09-u29"]
writes: ["test/simulation/scenarios/rollout/**"]
reads: []
spec: ["docs/design/ai/amendment-loop.md#5-staged-rollout","docs/design/ai/amendment-loop.md#7-monitoring-and-rollback","docs/design/flows/policy-amendment.md","docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "Uses two fixture pack versions from can_policy (the v1 candidate and a patch variant built for the test); pack switching goes through the server configuration contract of 10-u04 and plan 09 rollout units."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Exercise one shadow to canary to full rollout and one rollback in the sim stack, plus the kill switch, and assert the effects the amendment loop promises.

## Steps
1. Rollout: with traffic from careful and wellmeaning-wrong personas, activate version B as shadow (decisions stored with shadow flag, not visible), then canary (random percentage per the config, assert distribution within bounds over N events), then full; assert every decision records the version used.
2. Rollback: trip a configured metric breach (or manual trigger), assert the previous version is active for new events, affected items are re-moderated, flipped items get the "re-reviewed under policy vX" notice (never silent removal).
3. Kill switch: all DPs go to `hold` plus the static crisis route; assert nothing publishes and recovery restores service.
4. Output `rollout.exercised {shadow_to_full: 1, rollback: 1, kill_switch: 1}` for G10. Tests on the test server.

## Acceptance
- Shadow decisions are not visible to people (test).
- Rollback restores the previous version and re-moderates affected items with notices (test).
- Kill switch holds everything and keeps the crisis route (test).
- `npm run verify` is green.

## Out of scope
- Implementing rollout (plan 09).
