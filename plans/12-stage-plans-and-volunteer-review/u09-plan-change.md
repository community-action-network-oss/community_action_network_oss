---
id: "12-u09"
plan: "12"
title: "Plan change after publication (PLAN-CHANGE-1, T22): proposals, DP-STAGE-PLAN, atomic plan version"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 52
depends_on: ["12-u06", "09-u23", "04-u07", "10-u63", "10-u62"]
writes: ["src/stages/app/plan-change/**", "src/stages/http/**", "src/stages/infra/**", "src/db/schema.ts", "drizzle/**", "test/plan-change.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/design/flows/plan-change.md", "docs/spec/constitution/rules.md#PLAN-CHANGE-1", "docs/design/ux/wireframes/stages.md#WF-STAGEMAP-1"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/plan-change.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Change the stage plan of a published problem only through a proposal checked by the AI, never silently (`PLAN-CHANGE-1`, transition T22 `PLAN-CHANGE`): added, removed, split or merged stages, edge changes, criteria changes, or a stage marked `skipped`, each with a reason. Allowed while the problem is `active` or `paused`.

## Steps
1. Schema: `plan_change` (id, problem_id, base_plan_version, proposed_by, edits jsonb (typed list: add_stage, remove_stage (becomes skipped), split, merge, set_edges, set_criteria, skip_stage, reactivate_stage), reason, status `proposed|poster_accepted|poster_declined|applied|needs_revision|rejected|held`, poster_reason null, run_id null, decision jsonb null, resulting_plan_version null, created_at, decided_at) and `plan_version_snapshot` (problem_id, plan_version, plan jsonb, created_at, never updated). Public after publish: the applied change, its reason and the diff ("Plan changed on {date}"); proposals not yet applied are public to the poster and proposer only.
2. `POST /v1/problems/{id}/plan-changes` (member): runs the deterministic DAG check on the resulting plan with `validatePlan` (cycle, dangling edge, no criteria, final criteria unreachable) before any run, refusing with fieldErrors; a proposal by someone other than the poster needs the poster's `POST /v1/plan-changes/{id}/accept|decline` with a reason (like RECO-1); the poster's own proposals skip that step. Resolved stages are never deleted or re-criteria'd: to redo one the proposal uses `reactivate_stage` (a reopen of that stage, ST10, which returns its unstarted successors to `planned`); removing a stage that has work uses `skipped` with a reason and keeps contributions visible.
3. `PlanChangeTarget`, a moderation target: `DP-STAGE-PLAN` and `DP-CRITERIA` (and `DP-LEGALITY`, `DP-PRIVACY` on new text) through 09-u22. Outcome `publish` applies T22 through the problem engine (03-u05, same state, event, `plan_version` + 1 with an optimistic check, a concurrent loser gets `conflict`) and in the same transaction applies ST01 for new stages, ST09 for skipped ones, ST10 and ST11 for reactivated ones, rewrites edges and criteria, and runs the gating engine (12-u06); `needs_revision` returns hints; `hold` leaves the plan unchanged and retries.
4. A "not met" result of T15 changes no state, so new work needs a plan change; the unmet final criteria are available to prefill the proposal (`GET /v1/problems/{id}/plan-changes/prefill`).
5. Notices: the follower fan-out kind `plan_changed` (04-u07) and an email with the diff summary only (no text), `GET /v1/problems/{id}/plan-history`.
6. Tests: serial to parallel conversion applies and recomputes ready stages; a cycle is refused before any run; a resolved stage cannot be deleted; reactivation returns unstarted successors to planned; a stale `base_plan_version` conflicts; a non-poster proposal waits for the poster; hold leaves the plan unchanged; an applied change writes the T22 event and a snapshot; a paused problem accepts the change but starts nothing.
7. `npm run openapi`, then `git add -- openapi/openapi.json`.

## Acceptance
- No route changes a published plan except an applied, decided `plan_change`.
- Every applied change is atomic, versioned, public with its reason and keeps the old version in history.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The plan change form (12-u21).
- DP prompts (plans 09 and 10).
