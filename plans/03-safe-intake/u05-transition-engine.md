---
id: "03-u05"
plan: "03"
title: "Transition engine with atomic event write and pending confirm"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 42
depends_on: ["03-u01","02-u10","02-u08"]
writes: ["src/problems/app/**","src/problems/infra/**","src/problems/problems.module.ts","src/db/schema.ts","drizzle/**","test/transition-engine.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/design/system-design.md#4-event-log","docs/spec/constitution/rules.md#INTERIM-1","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/transition-engine.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Run the lifecycle guard against real rows. A transition updates the problem and appends a problem_event in one database transaction, or changes nothing. Includes the pending (propose then confirm or decline) mechanism for T14, T19, T20.

## Steps
1. src/problems/app/transition-engine.ts: apply({problemId, to, actor: {id, role}, fields, reason, action?: "propose" | "confirm" | "decline"}) inside one Drizzle transaction: SELECT the problem FOR UPDATE, evaluate with the lifecycle guard (context from the row: resume_state, previous state, duplicate rules), mutate the problem (state, version+1, updated_at, published_at on T04, resume_state on T17 and stored previous state for T18, tombstoned_at on T21, purge_after = decision date + 30 days on T05, T06, T07, pending_transition cleared), insert one problem_event via buildProblemEvent in the same transaction, and write an audit_event for moderator-actor transitions with interim true.
2. Pending mechanism: a propose sets problem.pending_transition = {to, proposedBy, fields, proposedAt} and appends event type "transition_proposed" without changing state; confirm by a moderator applies the target transition and clears pending, event type "transition_confirmed" plus the real transition event; decline clears it with event "transition_declined" and a required reason. confirmerRule decides if the confirmer may be the proposer: pool size from the account table count of role moderator. When self-confirmation is used, set payload.selfConfirmed true and audit interim true (INTERIM-1).
3. Errors: ApiException invalid_transition (409), not_permitted (403), validation_failed with fieldErrors for missing fields (422/400 per kernel), conflict on version mismatch if an expectedVersion is passed.
4. The engine never calls other modules for field semantics: callers pass already-validated fields. It does not send email (decision-email unit hooks a DecisionNotifier port later; define the port here with a no-op default).
5. PUB-FAILCLOSED-1: if any dependency throws before commit, no state change and no event exist (tested).
6. Tests (e2e): each T-id happy path using fixture helpers in test/support/problems.ts (create rows directly); atomicity: inject a failing event insert and assert state, version and pending are unchanged; concurrent apply on the same problem lets exactly one win (version check); propose then confirm by a different moderator; self-confirmation allowed only when the pool is 1 and flagged; every invalid pair from the guard maps to invalid_transition.

## Acceptance
- State change and problem_event commit together or not at all (failure-injection test).
- Moderator confirmations are audited with the interim flag.
- Concurrent transitions cannot both succeed.
- `npm run verify` is green.

## Out of scope
- HTTP endpoints (later units).
- Field content checks.
- Emails.
