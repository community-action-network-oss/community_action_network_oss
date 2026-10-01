---
id: "05-u03"
plan: "05"
title: "Stuck and paused transitions (T15 to T18) and pause review flags"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 92
depends_on: ["05-u02", "09-u05"]
writes: ["src/problems/app/**", "src/problems/http/**", "src/stuck/**", "test/stuck-paused.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/constitution/rules.md#LEGAL-GATE-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/spec/constitution/rules.md#INTERIM-1", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3"]
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
Implement the resting states with their required fields: stuck (the accountable unresolved record) and paused (reason and resume condition), and queue a re-check by the moderation run for overdue pauses without ever changing state automatically. Stuck includes the legally blocked case: only the solution is illegal under some legal layer (D-61).

## Steps
1. T15 (working states to stuck, by the initiator or a moderation run, DP-LEGALITY) requires blockerStatement, blockerSource, blockerVersion, blockerLayer (L0 to L6 for a legal block, else null) and the provision cited (LEGAL-CITE-1), blockedActions, recheckCondition (the review date), nextRoute (next lawful escalation route) and at least one documented attempt (a task id, an evidence id, or the legal-gate record id): verify the referenced attempt belongs to the problem. Stored on the problem (stuck_* columns via migration or a problem_stuck_record table) and returned publicly on detail. T16 (stuck to implementation) requires clearedNote and evidence.
2. T17 (working states to paused, initiator or a moderation run) requires reasonCode, resumeCondition, reviewDate (default and maximum 90 days ahead); stores resume_state; T18 returns to the stored state with a resumeConditionMetNote. Public fields appear on detail.
3. Job pauseReviewDue(now) on the queue of 09-u05 (no cron table): paused problems past review_date get paused_review_due_at set, an in-app notice to the initiator, and a re-check job for the moderation run (09-u42 DP-STAGE decides whether to keep waiting, resume or annotate). The job never changes state (lifecycle spec: "It never changes state by itself"; test asserts the state is unchanged). No moderator queue exists.
4. Legal-gate path: a decision record with a blocked legal gate (plan 04) pre-fills the stuck fields; the endpoint accepts legalGateRecordId as the documented attempt.
5. Tests: each missing T15 field, a legal block without layer and provision refused, attempt from another problem refused, paused review date over 90 days refused, round trips T17/T18 and T15/T16, review-due marker after the date and no state change, confirm that contributions allowed in paused and stuck are only clarifying_question and progress_update (plan 04 matrix).
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Stuck always shows constraint, source, version, blocked actions, recheck condition and next route.
- The review job never mutates state; a legally blocked stuck record names its layer and provision.
- Paused cannot exceed a 90 day review date.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Closing and redirecting (next unit).
- The deciding run (09-u42) and the re-check outcome handling.
