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
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/design/system-design.md#4-event-log", "docs/spec/constitution/rules.md#INTERIM-1", "docs/spec/constitution/rules.md#PUB-FAILCLOSED-1", "docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1"]
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
Run the lifecycle v2 guard against real rows. A transition updates the problem and appends a problem_event in one database transaction, or changes nothing. Transitions that the table assigns to a moderation run are accepted only with a recorded run id (applied by the outcome applier 09-u23); an initiator proposal (T13 to T17, T22) is recorded and waits for the run. There is no human confirm path. Modules plug side effects into the same transaction through a `TransitionEffects` port (stage instantiation at T04, archive record on terminal transitions, volunteer access ending), so this unit never imports them.

## Steps
1. src/problems/app/transition-engine.ts: apply({problemId, to, actor: {kind: "initiator" | "run" | "lane" | "system", id}, fields, reason, action?: "direct" | "propose" | "decline", runId?, expectedVersion?}) inside one Drizzle transaction: SELECT the problem FOR UPDATE, evaluate with the lifecycle guard (context from the row: resume_state, duplicate rules, runId, the review facts supplied by a ReviewFacts port: completed review count, quorum state, day count), mutate the problem (state, version+1, updated_at, review_requested_at on T01, published_at on T04, resume_state on T08, T09 and T11, tombstoned_at on T18, purge_after = decision date + 30 days on T05, T06, T07, pending_transition cleared), insert one problem_event via buildProblemEvent in the same transaction (payload carries runId and policy version when present), and write an audit_event for run and lane actors with transitional true when the run's pack was ratified only by transitional stewardship (INTERIM-1).
2. TransitionEffects port: `register(effect: {on: TransitionId[], run(tx, ctx): Promise<void>})`, invoked after the problem row is mutated and before the event insert commits, all inside the transaction (an effect that throws rolls everything back). Registered by later units: 12-u04 (T04 stage instantiation, T01 review queue entry, T05 to T07 volunteer access ends), 13-u01 (archive record on T13 to T18), 12-u06 (ST09 on T16, T17, T18). The engine ships with no registered effects and tests it with a recording fake.
3. Proposal mechanism (T13, T14, T15, T16, T17, T22): action "propose" by the initiator sets problem.pending_transition = {to, proposedBy, fields, proposedAt} and appends event type "transition_proposed" without changing state; it is the input to a moderation run (09-u42 wires and decides it, 12-u09 for T22). A run outcome of accept applies the target transition with its runId and clears pending (events "transition_decided" plus the real transition event); a run outcome of decline clears it with event "transition_declined", rule ids and the run's explanation. A person never confirms or declines. T15 may also be proposed by actor system when the last required stage resolves (01b ST05).
4. Held state (T08, T09, T10): actor system only; T08 and T09 store resume_state; T10 returns to resume_state and the run's normal outcome applies next.
5. Errors: ApiException invalid_transition (409), not_permitted (403) including any attempt to decide a run-gated transition without a run id, validation_failed with fieldErrors for missing fields (422/400 per kernel), conflict on version mismatch if an expectedVersion is passed.
6. The engine never calls other modules for field semantics: callers pass already-validated fields. It does not send email: define the DecisionNotifier port here with a no-op default; the email adapter (03-u11) and the outcome applier (09-u23) plug in.
7. PUB-FAILCLOSED-1: if any dependency or effect throws before commit, no state change and no event exist (tested).
8. Tests (e2e): each T-id happy path (T00 to T22 that is implemented by state change) using fixture helpers in test/support/problems.ts (create rows directly); atomicity: inject a failing event insert and a throwing effect and assert state, version and pending are unchanged; concurrent apply on the same problem lets exactly one win (version check); initiator propose then a run-actor decision applies; initiator or any member trying to apply T04 or T15 directly gets not_permitted; T04 is refused without a completed review fact; T20 and T21 are refused here with not_permitted until 09-u63 implements the system-only reopen; every invalid pair from the guard maps to invalid_transition.

## Acceptance
- State change and problem_event commit together or not at all (failure-injection test, including a throwing effect).
- Run-gated transitions cannot be applied without a run id (test); no person confirms anything.
- Concurrent transitions cannot both succeed.
- `npm run verify` is green.

## Out of scope
- HTTP endpoints (later units).
- The outcome applier and run orchestration (09-u22, 09-u23).
- Field content checks.
- The T20 and T21 reopen transitions (09-u63).
- Emails (03-u11).
- The effects themselves (12-u04, 12-u06, 13-u01).
