---
id: "03-u07"
plan: "03"
title: "Transitions endpoint and allowed-actions"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 44
depends_on: ["03-u06"]
writes: ["src/problems/http/**","src/problems/app/**","test/transitions-endpoint.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/design/system-design.md#6-api-surface-v1","docs/spec/constitution/rules.md#ACCT-REQ-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/transitions-endpoint.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["51c815f"]
actual_hours: 0.1
---
## Objective
Expose POST /v1/problems/{id}/transitions to the engine, and tell clients which transitions the viewer may attempt, so the app never hardcodes rights.

## Steps
1. POST /v1/problems/{id}/transitions body {to, reason?, fields?, action?: "direct"|"propose", expectedVersion?}; actor role comes from the session, never from the body. Maps engine errors to the kernel envelope (invalid_transition 409, not_permitted 403, validation_failed with fieldErrors per missing field). Returns {id, state, label, version, pending: null | {to, proposedBy: handle} (a proposal waiting for its moderation run)}.
2. Refuse with not_permitted and a message naming the right route when the requested transition is run-decided (T02, T04, T05, the decided parts of T13 to T17 and T22, T20, T21: these happen only through a recorded moderation run, applied by 09-u23) or is system-only (T08, T09, T10, and T07 by a user other than the initiator). The initiator may only apply direct transitions (T01, T03, T06, T07, T11, T12, T18, T19) and propose T13, T14, T15, T16, T17 and T22 (T22 through its own endpoint, 12-u09).
3. Add allowedTransitions to the problem detail response (GET /v1/problems/{id}) for the viewer: [{to, requires: FieldKey[], mode: "direct"|"propose"}] computed from allowedTransitions(from, actor) in the lifecycle domain; empty for guests. Update the detail e2e key-set test accordingly.
4. This unit wires T01 only as far as the guard: the synchronous deterministic checks are added in the checks unit (T01 and T03 stay blocked by it: until then T01 returns not_permitted with message "checks not wired"). Do NOT bypass: add a TODO-free feature flag SUBMIT_CHECKS_WIRED in code that the checks unit flips by deleting it. T01 now moves the problem to in_review (volunteer review, 12-u03); there is no wait-for-a-person hook on the publication decision: when the review quorum is met and the poster requests publication, the publication decision run is enqueued by 12-u08.
5. Tests: guest 401, other member 403, wrong state 409, missing fields 422 with field names, run-decided transition (T04) by a member 403, propose for T16 (close) records a pending proposal without changing state (fields stubbed minimal for the guard), allowedTransitions per role and state.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Actor identity comes only from the session.
- T02, T04, T05 and every other run-decided transition cannot be done through this endpoint.
- allowedTransitions is computed from the domain table (test compares with the guard).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Moderation runs and decisions (plan 09).
- Plan 05 field validation for T13 to T18.
