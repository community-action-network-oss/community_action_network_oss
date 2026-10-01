---
id: "09-u43"
plan: "09"
title: "OpenAPI audit: operation ids, response key sets and no content leaks"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 272
depends_on: ["09-u25","09-u29","09-u34","09-u35","09-u32","09-u38","09-u37","09-u39"]
writes: ["test/contract-moderation.e2e-spec.ts","src/moderation/http/**","src/notices/**","src/appeals/**","src/review/http/**","src/label-tasks/**","src/lane/**","openapi/openapi.json"]
reads: ["src/**","openapi/**"]
spec: ["docs/design/components/server.md#http-surface-changes-under-d-51","docs/design/ai/safety-and-privacy.md","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/contract-moderation.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One test that guards the whole moderation contract the app consumes: every plan 09 route has an explicit operationId and DTO schema; response key sets are asserted; no response ever contains raw hidden text, internal notes, account ids of other people, scores, floors or other signals.

## Steps
1. List the plan 09 routes (decisions, status, notices, appeals, timeline, review work, audit, label, lane, disagreements, policy changes) in one table in the test; assert each exists in openapi.json with operationId and a response schema, with `additionalProperties: false` where the DTO allows.
2. Key-set tests with fixture data for each response (decision, notice, timeline, masked view, lane case): exact allowed keys; forbidden key names scan (`internalNote`, `confidence`, `threshold`, `floor`, `accountId`, `email`, `handle` in reviewer-facing shapes).
3. Leak scan: run a full fixture flow with a seeded canary string in the input and assert it appears in no response except the initiator own decision spans (offsets only) and own draft reads.
4. Fix any DTO that fails (small edits only), run `npm run openapi` and commit the regenerated contract.
5. Assert that no route can edit a decision (duplicate of the lane test, cheap, keeps the contract guard self-contained).
6. Plan extension (W13): add to the audited route table the routes of lifecycle v2 and archive that touch moderation shapes: the publication decision (`GET /v1/me/problems/{id}/decision`, 12-u08), stage result (12-u07), review recommendation responses (never public), suggestion and archive routes are audited by 13-u21 (do not duplicate). Forbidden key scan adds `attestation`, `impactLabel` in any moderation-facing shape (LOC-PRIV-1).

## Acceptance
- All plan 09 routes have operation ids and exact key-set tests.
- No canary leak in any response.
- openapi/openapi.json regenerated and committed; `npm run verify` is green.

## Out of scope
- New endpoints.
