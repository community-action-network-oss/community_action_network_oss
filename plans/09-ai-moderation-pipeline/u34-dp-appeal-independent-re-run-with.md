---
id: "09-u34"
plan: "09"
title: "DP-APPEAL: independent re-run with a different model and prompt variant"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 263
depends_on: ["09-u33","09-u22","09-u15"]
writes: ["src/appeals/app/rerun.ts","src/appeals/http/**","src/moderation/app/handlers/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/appeals-rerun.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/appeals.md#steps","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/design/flows/appeal.md","docs/design/ux/wireframes/submit.md#WF-APPEAL-2","docs/design/ai/runtime.md#multi-model-routing-and-escalation","docs/spec/constitution/rules.md#APPEAL-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/appeals-rerun.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Re-run the appealed DP set with a model and prompt variant different from the original, with the appellant grounds as quoted data. If the re-run flips the result the decision is overturned and the effects of the brief section 5 table apply through the engine.

## Steps
1. Handler for the appeal job: read the original run (models and prompt hash), ask the router for a variant plan (different model AND `prompt.alt.md`), run the DP set with trigger appeal; the grounds appear only inside the quoted data block. Stage outputs record route_reason variant.
2. Agrees with appellant: status overturned, the decision is superseded, the instance is re-decided by the normal pipeline with the variant result recorded, and effects follow the brief: T02 back to submitted with hints struck through, T05 back to submitted with the draft restored and deletion cancelled if still held (else the person resubmits), T19 and T20 back to the prior state with the reason, contribution restored. Candidate example flag through the sampler (appeal_candidate).
3. Upholds: status rerun then awaits the appellant: `POST /v1/appeals/{id}/accept` closes as upheld, `POST /v1/appeals/{id}/dispute` moves to label (label unit). The appeal never closes silently by timeout; delays show as a status.
4. Re-run cannot complete: appeal stays open and is retried with backoff, never auto-upheld (test with provider timeout script).
5. GET /v1/appeals/{id} timeline (appellant only): steps filed, rerun (result and that a different model was used, model class family and prompt variant label, never restricted prompt text), label (open, counts only), policy proposed (link if privacy safe), re-decision; real queue age; `noPersonOverrode: true` disclosure.
6. Tests: overturn effect per decision type (T02, T05 at least) restores state through the engine; upheld path; timeout retry; timeline shape key-set test; variant model differs from the original (assert ids).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- The re-run always differs from the original in model and prompt (test).
- Overturn effects match the brief table (tested for T02 and T05).
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Label tasks (next).
- App screens.
