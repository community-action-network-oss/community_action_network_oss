---
id: "03-u05"
plan: "03"
title: "Transition engine with atomic event write and run-decision input"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 42
depends_on: ["03-u01","02-u10","02-u08"]
writes: ["src/problems/app/**","src/problems/infra/**","src/problems/problems.module.ts","src/db/schema.ts","drizzle/**","test/transition-engine.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/design/system-design.md#4-event-log", "docs/spec/constitution/rules.md#INTERIM-1", "docs/spec/constitution/rules.md#PUB-FAILCLOSED-1", "docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1"]
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
Run the lifecycle guard against real rows. A transition updates the problem and appends a problem_event in one database transaction, or changes nothing. Transitions that the table assigns to a moderation run are accepted only with a recorded run id (applied by the outcome applier 09-u23); an initiator proposal (T14, T19, T20) is recorded and waits for the run. There is no human confirm path.

## Steps
1. src/problems/app/transition-engine.ts: apply({problemId, to, actor: {kind: "initiator" | "run" | "lane" | "system", id}, fields, reason, action?: "direct" | "propose" | "decline", runId?, expectedVersion?}) inside one Drizzle transaction: SELECT the problem FOR UPDATE, evaluate with the lifecycle guard (context from the row: resume_state, previous state, duplicate rules, runId), mutate the problem (state, version+1, updated_at, published_at on T04, resume_state on T17 and stored previous state for T18, tombstoned_at on T21, purge_after = decision date + 30 days on T05, T06, T07, reopened_at and reopen count on T23 and T24, pending_transition cleared), insert one problem_event via buildProblemEvent in the same transaction (payload carries runId and policy version when present), and write an audit_event for run and lane actors with transitional true when the run's pack was ratified only by transitional stewardship (INTERIM-1).
2. Proposal mechanism (T14, T19, T20 only): action "propose" by the initiator sets problem.pending_transition = {to, proposedBy, fields, proposedAt} and appends event type "transition_proposed" without changing state; it is the input to a moderation run (09-u42 wires and decides it). A run outcome of accept applies the target transition with its runId and clears pending (events "transition_decided" plus the real transition event); a run outcome of decline clears it with event "transition_declined", rule ids and the run's explanation. A person never confirms or declines.
3. Errors: ApiException invalid_transition (409), not_permitted (403) including any attempt to decide a run-gated transition without a run id, validation_failed with fieldErrors for missing fields (422/400 per kernel), conflict on version mismatch if an expectedVersion is passed.
4. The engine never calls other modules for field semantics: callers pass already-validated fields. It does not send email: define the DecisionNotifier port here with a no-op default; the email adapter (03-u11) and the outcome applier (09-u23) plug in.
5. PUB-FAILCLOSED-1: if any dependency throws before commit, no state change and no event exist (tested).
6. Tests (e2e): each T-id happy path (T00 to T24 that is implemented by state change) using fixture helpers in test/support/problems.ts (create rows directly); atomicity: inject a failing event insert and assert state, version and pending are unchanged; concurrent apply on the same problem lets exactly one win (version check); initiator propose then a run-actor decision applies; initiator or any member trying to apply T04 or T14 directly gets not_permitted; T23 reopen from solved writes reopened_at, keeps the old resolution event, and is refused from withdrawn; every invalid pair from the guard maps to invalid_transition.

## Acceptance
- State change and problem_event commit together or not at all (failure-injection test).
- Run-gated transitions cannot be applied without a run id (test); no person confirms anything.
- Concurrent transitions cannot both succeed.
- `npm run verify` is green.

## Out of scope
- HTTP endpoints (later units).
- The outcome applier and run orchestration (09-u22, 09-u23).
- Field content checks.
- Emails (03-u11).
