---
id: "09-u45"
plan: "09"
title: "E2E with FakeModel part 2: policy change with notice, appeal, label task, re-decision"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 274
depends_on: ["09-u44","09-u29","09-u37","09-u38"]
writes: ["test/e2e-moderation-policy-appeal.e2e-spec.ts","test/support/moderation-flow.ts","test/fixtures/moderation/flow/**"]
reads: ["src/**","test/**"]
spec: ["docs/design/ai/README.md","docs/design/ai/amendment-loop.md","docs/design/ai/appeals.md","docs/design/flows/post-publication-recheck.md","docs/design/flows/appeal.md","docs/design/flows/policy-amendment.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/e2e-moderation-policy-appeal.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Second half of the plan 09 acceptance. Activate pack v2 (fixtures unit) and a published item flips: the author gets a visible re-reviewed notice and an appeal path. The author appeals, the independent re-run upholds, the author disputes, a label task is created and answered by seeded labelers, the fake PolicyProposalPort produces a proposal, v3 is activated, and the instance is re-decided under it.

## Steps
1. Scenario 5: policy change. Move v2 through shadow (no visible effect), canary, full. Assert the documented flipping item gets a `moderation_notice` (REMOD-NOTICE-1), is never removed without it, the notice lists rules and policy version, and unchanged items only get run rows. `GET /v1/me/notices` and the public short form match.
2. Scenario 6: appeal. File an appeal on the flipped decision (structured grounds), assert the re-run used a different model and prompt variant, scripted to uphold; dispute; assert a label task with fixed quorum exists; seeded labelers (role labeler) answer through HTTP; independence holds (no aggregate before quorum); aggregate creates a proposal file via the fake adapter.
3. Scenario 7: re-decision. Activate a v3 fixture (extend the fixtures pack through test/fixtures/moderation/flow/ only, never the policy fixtures of 10-u04) that contains the proposal example; assert the instance is re-decided under v3, the appeal outcome and timeline show v3, and the appellant gets a decided_under notice. Assert APPEAL-1: no grounding rows written except through the proposal path.
4. Scenario 8: lane. A crisis-imminent fixture opens a lane case, a lane member records a logged action with a reason, a second member reviews; no route publishes or overturns.
5. Final assertions: provider counter shows only FakeModel calls; every run has policy_version and prompt_hash; the metrics endpoint shows a flip and an overturn.

## Acceptance
- The plan 09 acceptance runs end to end on FakeModel in CI.
- No silent removal at any point (notice always present).
- `npm run verify` is green.

## Out of scope
- Persona simulation (plan 11).
