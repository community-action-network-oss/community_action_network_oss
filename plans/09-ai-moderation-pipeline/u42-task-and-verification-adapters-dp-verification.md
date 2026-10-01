---
id: "09-u42"
plan: "09"
title: "Task, final verification and terminal adapters (DP-VERIFICATION on final criteria, DP-BLOCKER, DP-CLOSURE)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 271
depends_on: ["09-u41","05-u01","05-u02"]
writes: ["src/tasks/app/moderation-target.ts","src/verification/app/moderation-target.ts","src/moderation/app/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/moderation-tasks.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md#per-dp-notes","docs/design/flows/task-and-verification.md","docs/spec/01-slice-1-brief.md#7-what-solved-means","docs/open-questions/OQ-solved-evidence-threshold.md","docs/spec/constitution/rules.md#VERIFY-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-tasks.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Confirmation of `solved` (T15) is a run outcome, labeled with the policy version, judged by DP-VERIFICATION against the final acceptance criteria. Gate task completion, the solved proposal, stuck (T13, and ST07 for a blocked stage), closed (T16) and redirected (T17) with DP-VERIFICATION, DP-BLOCKER and DP-CLOSURE. A completed task alone is not solved, and stage resolution is DP-STAGE-RESOLUTION (09-u73), not this unit.

## Steps
1. Adapters for task, verification evidence and the terminal transitions T14, T15, T19, T20 using the same port (the old T14, T15, T19 and T20 are T15, T13, T16 and T17, see 01a-lifecycle.md 4.3); T15 requires every required stage `resolved` or `skipped` and, per final criterion, the evidence ids (05-u02); the pack carries the current solved-evidence default (OQ-solved-evidence-threshold stays open).
2. Supersession guard: remove moderator-confirm propose/confirm paths for the solved, close and redirect transitions used by 05-u02 and 05-u04 where present, and the moderator confirm panel API usage (05-u08 UI is superseded). Keep the pending mechanism of the engine only if still used elsewhere; otherwise delete it with its tests.
3. DP-CLOSURE: closure reason must match facts (duplicate_of present, redirect destination an institution or approved partner); tests with fixtures.
4. Tests: solved proposal with evidence that does not bear on the metric gets needs_revision; closing as duplicate without duplicate_of gets hints; clean cases pass and apply transitions; a solved proposal whose final criterion has no mapped evidence gets needs_revision naming the criterion; a stuck proposal is accepted only when every remaining required stage is blocked or behind a blocked stage.
5. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- T15 (solved) is only reachable through a complete run (route test).
- Decisions are labeled with the policy version.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Real emergency and legal routes (05-u09, founder-gated).
