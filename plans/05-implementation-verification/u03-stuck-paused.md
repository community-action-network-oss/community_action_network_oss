---
id: "05-u03"
plan: "05"
title: "Stuck and paused transitions (T11 to T14), stage blocker records and pause review flags"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 92
depends_on: ["05-u02", "09-u05", "12-u06"]
writes: ["src/problems/app/**", "src/problems/http/**", "src/stuck/**", "test/stuck-paused.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/spec/constitution/rules.md#LEGAL-GATE-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/spec/constitution/rules.md#INTERIM-1", "docs/spec/constitution/rules.md#BLOCKER-1", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3"]
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
Implement the resting states with their required fields (docs/spec/01a-lifecycle.md): paused (T11 and T12: reason and resume condition) and stuck (T13 and T14: the accountable unresolved record), the stage blocker record that ST07 and ST08 use (`BLOCKER-1`), and a queued re-check by the moderation run for overdue pauses that never changes state automatically. Stuck includes the legally blocked case: only the solution is illegal under some legal layer (D-61). A single blocked stage is a stage state; the problem becomes `stuck` only when no remaining required stage can proceed (01a section 4.1).

## Steps
1. Table `stage_blocker` (id, stage_id, constraint_text, source_ref, source_version, layer L0 to L6 or null, provision, blocked_actions, recheck_condition, review_date, next_route, attempt_ref (a task id, evidence id or the legal-gate record id of 04-u05), cleared_at null, cleared_note null, created_by or run_id). It implements the `BlockerRecordPort` that the block and unblock endpoints of 12-u06 call (BLOCKER-1: every field required; a legal block needs layer and provision, `LEGAL-CITE-1`; the attempt must belong to the problem).
2. T13 (active to stuck; the initiator proposes, a moderation run decides, DP-BLOCKER and DP-LEGALITY, 09-u42): requires blockerStatement, its source and version, blockedActions, the recheck condition (review date), nextRoute and at least one documented attempt, and the condition that every remaining required stage is `blocked` or behind a `blocked` stage (verified from the stage rows, never asserted by the client; 12-u06 queues the candidate). The problem-level record is the union of its blocked stages' records and is returned publicly on detail. T14 (stuck to active) requires clearedNote and evidence; blocked stages return to their prior state (ST08, 12-u06) in the same transaction. The archive record for an unresolved stuck problem is built by 13-u01 on T13 (`ARCHIVE-1`, `DP-ARCHIVE`).
3. T11 (active to paused, the initiator or a moderation run) requires reasonCode, resumeCondition, reviewDate (default and maximum 90 days ahead); stores resume_state; while paused no stage starts or resolves (12-u06 refuses, stage states are kept). T12 returns to `active` with a resumeConditionMetNote and stages continue where they were. Public fields appear on detail. T22 plan changes are allowed while paused (12-u09).
4. Job pauseReviewDue(now) on the queue of 09-u05 (no cron table): paused problems past review_date get paused_review_due_at set, an in-app notice to the initiator, and a re-check job for the moderation run (09-u42 decides whether to keep waiting, resume or annotate). The job never changes state (01a: "It never changes state by itself"; test asserts the state is unchanged). No moderator queue exists.
5. Legal-gate path: a stage choice with a blocked legal gate (04-u05) pre-fills the stage blocker; the endpoint accepts legalGateRecordId as the documented attempt.
6. Tests: each missing T13 field; a legal block without layer and provision refused; attempt from another problem refused; T13 refused while a required stage can still proceed; paused review date over 90 days refused; round trips T11/T12 and T13/T14 with stage states restored; review-due marker after the date and no state change; contributions in paused and stuck are only clarifying_question and progress_update (plan 04 matrix).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Stuck always shows constraint, source, version, blocked actions, recheck condition and next route.
- A legally blocked record names its layer and provision; T13 needs every required stage blocked or behind a blocked one.
- The review job never mutates state; paused cannot exceed a 90 day review date.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Closing and redirecting (next unit).
- The deciding run (09-u42) and the re-check outcome handling.
