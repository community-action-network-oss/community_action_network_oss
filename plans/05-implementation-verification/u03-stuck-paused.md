---
id: "05-u03"
plan: "05"
title: "Stuck and paused transitions (T15 to T18) and pause review flags"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 92
depends_on: ["05-u02"]
writes: ["src/problems/app/**","src/problems/http/**","src/platform/jobs/**","src/moderation/**","test/stuck-paused.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/constitution/rules.md#LEGAL-GATE-1","docs/spec/constitution/rules.md#INTERIM-1","docs/design/ux/wireframes/browse.md#WF-DETAIL-3"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/stuck-paused.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Implement the resting states with their required fields: stuck (the accountable unresolved record) and paused (reason and resume condition), and flag overdue pauses to moderators without ever changing state automatically.

## Steps
1. T15 (working states to stuck, by initiator or moderator) requires blockerStatement, blockerSource, blockerVersion, blockedActions, recheckCondition (the review date), nextRoute (next lawful escalation route) and at least one documented attempt (a task id, an evidence id, or the legal-gate record id): verify the referenced attempt belongs to the problem. Stored on the problem (stuck_* columns via migration or a problem_stuck_record table) and returned publicly on detail. T16 (stuck to implementation) requires clearedNote and evidence.
2. T17 (working states to paused, initiator or moderator) requires reasonCode, resumeCondition, reviewDate (default and maximum 90 days ahead); stores resume_state; T18 returns to the stored state with a resumeConditionMetNote. Public fields appear on detail.
3. Job pauseReviewFlags(now) in src/platform/jobs (follows the plan 03 JobPort): paused problems past review_date get a moderator flag (a row or column paused_review_flagged_at) listed in GET /v1/moderation/queue?type=pause_reviews. The job never changes state (brief: "It never changes state by itself"; test asserts the state is unchanged).
4. Legal-gate path: a decision record with a blocked legal gate (plan 04) pre-fills the stuck fields; the endpoint accepts legalGateRecordId as the documented attempt.
5. Tests: each missing T15 field, attempt from another problem refused, paused review date over 90 days refused, round trips T17/T18 and T15/T16, review flag after the date and no state change, confirm that contributions allowed in paused and stuck are only clarifying_question and progress_update (plan 04 matrix).
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Stuck always shows constraint, source, version, blocked actions, recheck condition and next route.
- The review job never mutates state.
- Paused cannot exceed a 90 day review date.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Closing and redirecting (next unit).
