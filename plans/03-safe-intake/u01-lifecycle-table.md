---
id: "03-u01"
plan: "03"
title: "Lifecycle v2 transition table (T00 to T22) and guard with exhaustive tests"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 15
depends_on: ["02-u09"]
writes: ["src/domain/lifecycle/**"]
reads: ["src/domain/lifecycle/vocabulary.ts", "docs/spec/01a-lifecycle.md"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/design/system-design.md#9-test-strategy", "docs/spec/constitution/rules.md#PUB-FAILCLOSED-1", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/spec/constitution/rules.md#REVIEW-1", "docs/spec/constitution/rules.md#CRITERIA-1"]
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
Encode the problem-level transition table of docs/spec/01a-lifecycle.md (lifecycle v2, D-72: T00 to T22, the single owner of the table) as typed data and a pure guard function. This is the single executable form of the table. Exhaustive table-driven tests make it impossible to drift from the spec. Decisions are made by moderation runs, not people: the table carries which decision points gate a transition, never a human confirmer. Stage transitions (ST01 to ST11) are a separate table owned by 12-u01.

## Steps
1. src/domain/lifecycle/table.ts: export const TRANSITIONS: readonly Transition[] where Transition = {id: "T00".."T22", from: State[] (the 12 states of 02-u09; T06 from in_review and held; T10 from held; T16 from active, paused and stuck; T20 from solved, closed, redirected and stuck; T21 from solved; T22 from active and paused), to: State | "resume_state" | "deleted" | "same", actors: ActorKind[] from {initiator, run, lane, system} ("run" means a recorded moderation run applied through the outcome applier, 09-u23; the initiator is the poster before publication and the provisional steward after), gatedBy: DpId[] (decision point ids that gate it: T01 none for the synchronous checks plus DP-PRIVACY, T02 and T04 and T05 DP-PUBLISH with the DPs it aggregates, T13 and T14 DP-BLOCKER and DP-LEGALITY, T15 DP-VERIFICATION and DP-EVIDENCE-TIER, T16 DP-DUPLICATE, DP-ELIGIBILITY and DP-CLOSURE, T17 DP-ELIGIBILITY, DP-CRISIS and DP-CLOSURE, T20 and T21 DP-RERESOLUTION, T22 DP-STAGE-PLAN and DP-CRITERIA; strings only, the registry lives in plan 09), proposedBy: ActorKind | null (T13, T14, T15, T16, T17 and T22: the initiator proposes, the run decides; T15 may also be proposed by the system when the last required stage resolves), required: FieldKey[] (machine names such as title, structuralStatement, facts, affectedScope, coarseArea, sources (or noSourceNote), finalAcceptanceCriteria (CRITERIA-1), stagePlan, noIdentifiersConfirmed, schemaVersionPin, blockerStatement, recheckCondition, reasonCode, resumeCondition, reviewDate, destination, criteriaEvidence, outcomeStatement, planProposal, oldPolicyVersion, newPolicyVersion, changedConclusion, affectedStages, feasibilityResult, ...), sideEffects: string[] (names only), conditions: string[] (names of predicates such as noOtherAcceptedContribution, feasibilityPassed, everyRequiredStageResolvedOrSkipped, atLeastOneCompletedReview, reviewQuorumMet, everyRecommendationResolved)}. Copy the ids and required fields from the spec table verbatim in comments so reviewers can diff.
2. src/domain/lifecycle/guard.ts: evaluateTransition({from, to, actor, fields, context}) returns {ok: true, transition, mode: "direct" | "propose" | "decide"} or {ok: false, code: "invalid_transition" | "not_permitted" | "missing_fields" | "condition_failed", missing?: FieldKey[], transitionId?}. Pure; no I/O. Resolution of "resume_state" targets uses context.resumeState (T10 and T12). T18 requires context.noOtherAcceptedContribution; T07 allows actor system; T02, T04, T05, T09 (system), T13, T14, T15, T16, T17, T20, T21 and T22 as run decisions require actor run and context.runId; T08, T09 and T10 are actor system. An initiator evaluating a run-decided transition gets mode "propose" only where proposedBy is initiator (T13 to T17, T22) and not_permitted otherwise; T04 requires context.atLeastOneCompletedReview (REVIEW-1: zero reviews keeps the problem in_review), context.reviewQuorumMetOrPosterOverride and context.everyRecommendationResolved is not required (open recommendations are weighed, never counted as accepted); T20 and T21 require actor run, context.feasibilityPassed and old and new policy versions; withdrawn and rejected never reopen by T20.
3. There is no human confirmer rule. Anything that decides a transition without a run id (or lane id for the lane's logged actions, NO-INSTANCE-OVERRIDE-1) is not_permitted. Self-confirmation, pool sizes and confirmerRule do not exist.
4. Exhaustive tests (table-driven, src/domain/lifecycle/guard.spec.ts): (1) a test that parses the transition table section 4.2 of docs/spec/01a-lifecycle.md at test time (read the file, split markdown rows; normalize the from and to cells with a small documented mapping such as "(none)", "(deleted)", "resume state (draft or in_review)", "same state") and asserts every T-id (T00 to T22), from set, to state and actor class in TRANSITIONS equals the spec (a spec edit must fail this test); (2) for every pair (from, to) over all 12 states and every actor kind, the result is ok exactly when some table row allows it, else invalid_transition or not_permitted; (3) every row fails with missing_fields when each required field is removed in turn (T01 without finalAcceptanceCriteria fails CRITERIA-1); (4) property test with fast-check (add as devDependency) that random (from, to, actor, fields) never returns ok unless the table allows it; (5) a human actor kind never decides T02, T04, T05, T13 to T17, T20, T21 or T22; (6) T20 and T21 are refused without feasibilityPassed, from withdrawn and from rejected; (7) T04 is refused with zero completed reviews.
5. Export a helper allowedTransitions(from, actor) used later by the API to tell the app which actions exist (never hardcode in the app). Export oldToNewTransitionId (the map of section 4.3, used only by tests and a one-time fixture migration, never by runtime code).
6. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- Every one of T00 to T22 exists and equals docs/spec/01a-lifecycle.md (parsing test).
- No state pair outside the table is ever ok (exhaustive and property tests).
- No human actor can decide a run-gated transition (test); T04 needs a completed review (test).
- The module imports nothing from Nest, Drizzle or node I/O.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- Persistence and the atomic event write (engine unit).
- Running moderation or re-resolution (plan 09 and 09-u27); this unit only encodes which transitions exist.
- Stage transitions ST01 to ST11 (12-u01).
- Field content validation (eligibility, privacy and schema validator units).
