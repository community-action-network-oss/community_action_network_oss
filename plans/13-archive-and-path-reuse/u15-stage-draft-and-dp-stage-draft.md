---
id: "13-u15"
plan: "13"
title: "stage_draft and DP-STAGE-DRAFT: private AI-drafted plan after publication"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 414
depends_on: ["13-u12","12-u02","12-u06","09-u71","10-u65","13-u14"]
writes: ["src/archive/app/stage-draft/**","src/archive/domain/stage-draft/**","src/moderation/app/dp/stage-draft*.ts","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/fixtures/moderation/dp-stage-draft/**","test/stage-draft.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#8-dp-stage-draft","docs/design/flows/stage-draft.md","docs/spec/24-archive-reuse.md#243-after-publication-the-drafted-stage-plan","docs/spec/01b-stages.md","docs/spec/constitution/rules-legal-sim.md#REUSE-NOBLOCK-1","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
After publication (problem `active`) with at least one accepted suggestion, DP-STAGE-DRAFT drafts a stage plan the poster can edit and submit. It is private to the poster until applied (D-76). Without accepted suggestions it does not run automatically; the poster may ask for a draft from the best current matches.

## Steps
1. Table `stage_draft` (id, problem_id, poster_id, `plan` jsonb in the `StagePlan` shape of 12-u01, `derived_from` jsonb per stage (record ids, source stage keys, license), `suggestion_ids`, `status` offered|edited|applied|discarded|expired, `expires_at` default created_at + 30 days, `run_id`, timestamps). Private: only the poster reads it; never visible to volunteers or the public. A job deletes expired rows (30-day expiry, the existing job runner) and a repeat run replaces an `offered` draft, never an `edited` one.
2. Trigger: the `problem.published` event (T04) with at least one `accepted` suggestion, or `POST /v1/problems/{id}/stage-draft` (poster, "ask for a draft", uses the best current matches and states so). Inputs: accepted suggestions with adaptations and `reuse_fit`, the published problem, the final criteria.
3. Deterministic structure first: `validatePlan` from 12-u01 (DAG, a name, goal, decision method and criterion on every stage) and coverage of every final criterion by some stage; the model step translates source criteria to the new context, sets `depends_on` and the default `decision_method` (poster chooses after community input), and records `derived_from` per stage. Outcomes `publish` (offer to the poster), `needs_revision` (regenerate once), `hold` (nothing offered). The DP-STAGE-DRAFT handler is registered in the DP registry with fixtures under test/fixtures/moderation/dp-stage-draft.
4. Attribution: every drafted stage carries `derived_from` with the source archive records and their license (REUSE-CREDIT-1); the field survives edits (13-u16).
5. API: `GET /v1/problems/{id}/stage-draft`, `PATCH /v1/problems/{id}/stage-draft` (poster edits stages with the same validation; a stage keeps its source and gets `editedByPoster = true`), `DELETE` discards. Operation ids `getStageDraft`, `requestStageDraft`, `patchStageDraft`, `discardStageDraft`. Run `npm run openapi` and `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit it.
6. Tests with FakeModel: an accepted suggestion yields a draft that passes `validatePlan` and covers all final criteria; a draft that does not cover a criterion goes needs_revision then hold; expiry job deletes at 30 days; the draft is invisible to anyone but the poster (403/404 matrix including a volunteer); the draft never touches the live plan; no suggestion accepted means no automatic run.
7. Rate limits: do not edit the central rate-limit table `src/platform/security/limits.ts` owned by 07-u02 in this unit (that table is single-owner and a row added here would conflict). The routes of this unit are listed in the acceptance as a follow-up for 07-u02, with proposed limits.

## Acceptance
- A draft is a valid plan with `derived_from` on every stage.
- The draft is private and expires after 30 days.
- It never changes the live stage plan.
- `npm run verify` is green with openapi regenerated.
- Follow-up for 07-u02 (not done here, never edit the limits table in this unit): add rows for `getStageDraft` (GET /v1/problems/{id}/stage-draft): 60 per hour per account; `requestStageDraft` (POST /v1/problems/{id}/stage-draft): 5 per day per problem (it may call a model); `patchStageDraft` (PATCH /v1/problems/{id}/stage-draft): 120 per hour per account; `discardStageDraft` (DELETE /v1/problems/{id}/stage-draft): 20 per day per account.

## Out of scope
- Applying the draft (13-u16).
- The screen (13-u27).
