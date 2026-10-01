---
id: "13-u16"
plan: "13"
title: "Apply a stage draft as a plan-change proposal; attribution survives edits"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.3
priority: 415
depends_on: ["13-u15","12-u09","09-u70","09-u59"]
writes: ["src/archive/app/stage-draft/apply/**","src/archive/app/attribution/**","src/stages/app/**","src/db/schema.ts","drizzle/**","openapi/openapi.json","test/stage-draft-apply.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#8-dp-stage-draft","docs/design/ai/archive-reuse.md#9-attribution-and-license","docs/design/flows/stage-draft.md","docs/design/flows/plan-change.md","docs/spec/constitution/rules-legal-sim.md#REUSE-CREDIT-1","docs/spec/01a-lifecycle.md","docs/design/components/server.md"]
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
Acceptance of a draft, in whole or edited, is a plan-change proposal (T22, PLAN-CHANGE-1) that goes through DP-STAGE-PLAN, DP-CRITERIA and DP-LEGALITY like any plan. Credit is carried onto every derived stage and survives later edits (REUSE-CREDIT-1).

## Steps
1. `POST /v1/problems/{id}/stage-draft/apply` (poster): submits the current draft through the plan-change path of 12-u09 (T22, PLAN-CHANGE-1; the proposal carries the new `StagePlan`, the reason "started from archived paths", and `derived_from`). The endpoint returns the run status; a failure names the stage and keeps the draft (nothing lost); only the poster can call it; it never bypasses the run.
2. Attribution storage: table `stage_derived_from` (stage_id, archive_record_id, source_stage_key, license, edited bool). On an accepted plan change (the T22 applier of 12-u09) copy `derived_from` from the proposal onto the new stages; later plan changes that rename, split or merge a derived stage keep the rows (a split copies them to both halves, a merge unions them). A removed stage keeps its row with `stage_removed_at` so credit is never lost.
3. Read side: the stage map and stage workspace DTOs gain `basedOn[]` (record title, public url, license) for derived stages; the label copy "Based on" is the app's. The list of source records is public because archive records are public.
4. License change: records already published keep the license they were published under; a later CC0 default changes no stored row (OQ-contribution-license); attribution display stays.
5. Mark the suggestions the draft came from as `used`. Run `npm run openapi` and `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit it.
6. Tests: apply with a valid draft creates one plan-change proposal and a DP-STAGE-PLAN run; a draft failing DP-STAGE-PLAN keeps the draft and returns the stage; credit appears on derived stages after acceptance; after a split and a merge the credit rows are intact; a removed stage keeps its credit row; non-poster is 403.

## Acceptance
- No stage plan change happens except through DP-STAGE-PLAN (route and DB test).
- Credit survives rename, split, merge and removal (tests).
- `npm run verify` is green with openapi regenerated.

## Out of scope
- The review and edit UI (13-u27).
- Metrics (13-u20).
