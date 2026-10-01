---
id: "03-u01"
plan: "03"
title: "Lifecycle transition table (T00 to T24) and guard with exhaustive tests"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 15
depends_on: ["02-u09"]
writes: ["src/domain/lifecycle/**"]
reads: ["src/domain/lifecycle/vocabulary.ts", "docs/spec/01a-lifecycle.md"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/design/system-design.md#9-test-strategy", "docs/spec/constitution/rules.md#PUB-FAILCLOSED-1", "docs/spec/constitution/rules.md#RERESOLVE-1"]
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
Encode the transition table of docs/spec/01a-lifecycle.md (T00 to T24, the single owner of the table) as typed data and a pure guard function. This is the single executable form of the table. Exhaustive table-driven tests make it impossible to drift from the spec. Decisions are made by moderation runs, not people: the table carries which decision points gate a transition, never a human confirmer.

## Steps
1. src/domain/lifecycle/table.ts: export const TRANSITIONS: readonly Transition[] where Transition = {id: "T00".."T24", from: State[] (expand "W" into the five working states, and "W, paused or stuck" accordingly; T23 from solved, closed, redirected, stuck), to: State | "resume_state" | "previous_state" | "deleted" | "none", actors: ActorKind[] from {initiator, run, lane, system, any_member} ("run" means a recorded moderation run applied through the outcome applier, 09-u23), gatedBy: DpId[] (decision point ids that gate it, e.g. T01 none for the synchronous checks then the blocking set, T04 DP-ELIGIBILITY ..., T14 DP-VERIFICATION and DP-EVIDENCE-TIER, T23 and T24 DP-RERESOLUTION; strings only, the registry lives in plan 09), proposedBy: ActorKind | null (T14, T19, T20: initiator proposes, the run decides), required: FieldKey[] (machine names such as title, structuralStatement, affectedScope, coarseArea, evidenceUrlsOrNote, noIdentifiersConfirmed, schemaVersionPin, stageSummary, proposals, decisionRecord, legalGateRecord, tasks, verificationEvidence, outcomeStatement, blockerStatement, recheckCondition, reasonCode, resumeCondition, reviewDate, destination, oldPolicyVersion, newPolicyVersion, changedConclusion, feasibilityResult, ...), sideEffects: string[] (names only), conditions: string[] (names of predicates such as noOtherAcceptedContribution, feasibilityPassed)}. Copy the ids and required fields from the spec table verbatim in comments so reviewers can diff.
2. src/domain/lifecycle/guard.ts: evaluateTransition({from, to, actor, fields, context}) returns {ok: true, transition, mode: "direct" | "propose" | "decide"} or {ok: false, code: "invalid_transition" | "not_permitted" | "missing_fields" | "condition_failed", missing?: FieldKey[], transitionId?}. Pure; no I/O. Resolution of "resume_state" and "previous_state" targets uses context.resumeState and context.previousState. T21 requires context.noOtherAcceptedContribution; T07 allows actor system; T02, T04, T05, T13 to T20 as run decisions require actor run and context.runId; an initiator evaluating a run-decided transition gets mode "propose" only where proposedBy is initiator (T14, T19, T20) and not_permitted otherwise; T23 and T24 require actor run, context.feasibilityPassed and old and new policy versions; withdrawn and rejected never reopen by T23.
3. There is no human confirmer rule. Anything that decides a transition without a run id (or lane id for the lane's logged actions, NO-INSTANCE-OVERRIDE-1) is not_permitted. Self-confirmation, pool sizes and confirmerRule do not exist.
4. Exhaustive tests (table-driven, src/domain/lifecycle/guard.spec.ts): (1) a test that parses the transition table section of docs/spec/01a-lifecycle.md at test time (read the file, split markdown rows) and asserts every T-id (T00 to T24), from set, to state and actor class in TRANSITIONS equals the spec (a spec edit must fail this test); (2) for every pair (from, to) over all 15 states and every actor kind, the result is ok exactly when some table row allows it, else invalid_transition or not_permitted; (3) every row fails with missing_fields when each required field is removed in turn; (4) property test with fast-check (add as devDependency) that random (from, to, actor, fields) never returns ok unless the table allows it; (5) a human actor kind never decides T02, T04, T05, T14 to T20, T23 or T24; (6) T23 and T24 are refused without feasibilityPassed, from withdrawn and from rejected.
5. Export a helper allowedTransitions(from, actor) used later by the API to tell the app which actions exist (never hardcode in the app).
6. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- Every one of T00 to T24 exists and equals docs/spec/01a-lifecycle.md (parsing test).
- No state pair outside the table is ever ok (exhaustive and property tests).
- No human actor can decide a run-gated transition (test).
- The module imports nothing from Nest, Drizzle or node I/O.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- Persistence and the atomic event write (engine unit).
- Running moderation or re-resolution (plan 09 and 09-u27); this unit only encodes which transitions exist.
- Field content validation (eligibility, privacy and schema validator units).
