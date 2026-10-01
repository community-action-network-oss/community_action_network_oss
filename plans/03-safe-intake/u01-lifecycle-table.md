---
id: "03-u01"
plan: "03"
title: "Lifecycle transition table and guard with exhaustive tests"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 15
depends_on: ["02-u09"]
writes: ["src/domain/lifecycle/**"]
reads: ["src/domain/lifecycle/vocabulary.ts"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/design/system-design.md#9-test-strategy","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1"]
needs: []
verify: ["npm run lint","npm run build","npm test","npx vitest run src/domain/lifecycle"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Encode the brief transition table (T01 to T22) as typed data and a pure guard function. This is the single executable form of the table. Exhaustive table-driven tests make it impossible to drift from the brief.

## Steps
1. src/domain/lifecycle/table.ts: export const TRANSITIONS: readonly Transition[] where Transition = {id: "T01".."T22", from: State[] (expand "W" into the five working states, and "W, paused or stuck" accordingly), to: State | "resume_state" | "previous_state" | "deleted", actors: ActorKind[] from {initiator, moderator, system, any_member}, confirm: boolean (true when the table says "proposes, moderator confirms": T14, T19, T20), required: FieldKey[] (machine names such as title, structuralStatement, affectedScope, coarseArea, evidenceUrlsOrNote, noIdentifiersConfirmed, moderationDecision, stageSummary, proposals, decisionRecord, legalGateRecord, tasks, verificationEvidence, outcomeStatement, blockerStatement, recheckCondition, reasonCode, resumeCondition, reviewDate, destination, ...), sideEffects: string[] (names only), conditions: string[] (names of predicates such as noOtherAcceptedContribution)}. Copy the ids and required fields from the brief table verbatim in comments so reviewers can diff.
2. src/domain/lifecycle/guard.ts: evaluateTransition({from, to, actor, fields, context}) returns {ok: true, transition} or {ok: false, code: "invalid_transition" | "not_permitted" | "missing_fields" | "condition_failed", missing?: FieldKey[], transitionId?}. Pure; no I/O. Resolution of "resume_state" and "previous_state" targets uses context.resumeState and context.previousState. T21 requires context.noOtherAcceptedContribution; T07 allows actor system.
3. Confirm-type transitions: evaluate for a proposer actor returns {ok: true, mode: "propose"}; for a moderator confirming an existing pending transition returns mode "confirm"; add confirmerRule(pool, proposerId, confirmerId): different moderator required when pool size is 2 or more, otherwise self-confirmation allowed with disclosure true (INTERIM-1, APPEAL-1 style).
4. Exhaustive tests (table-driven, src/domain/lifecycle/guard.spec.ts): (1) a test that parses the transition table section of docs/spec/01-slice-1-brief.md at test time (read the file, split markdown rows) and asserts every T-id, from set, to state and actor in TRANSITIONS equals the brief (a brief edit must fail this test); (2) for every pair (from, to) over all 15 states and every actor kind, the result is ok exactly when some table row allows it, else invalid_transition or not_permitted; (3) every row fails with missing_fields when each required field is removed in turn; (4) property test with fast-check (add as devDependency) that random (from, to, actor, fields) never returns ok unless the table allows it; (5) confirmerRule for pools 1, 2 and 3.
5. Export a helper allowedTransitions(from, actor) used later by the API to tell the app which actions exist (never hardcode in the app).
6. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- Every one of T01 to T22 exists and equals the brief (parsing test).
- No state pair outside the table is ever ok (exhaustive and property tests).
- The module imports nothing from Nest, Drizzle or node I/O.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- Persistence and the atomic event write (engine unit).
- Field content validation (eligibility and privacy units).
