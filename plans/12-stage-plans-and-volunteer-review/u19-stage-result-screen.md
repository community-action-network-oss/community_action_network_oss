---
id: "12-u19"
plan: "12"
title: "Stage resolution result (WF-STAGE-2) and the final solved result"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 44
depends_on: ["12-u07", "12-u18", "09-u51", "02-u24", "02-u25"]
writes: ["app/problems/**", "src/stages/result/**", "src/i18n/en.json", "__tests__/stage-result-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/stages.md#WF-STAGE-2", "docs/spec/01b-stages.md", "docs/spec/constitution/rules.md#STAGE-RESOLVE-1", "docs/design/flows/appeal.md", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/stage-result-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-STAGE-2 at `/problems/{id}/stages/{stageId}/result` from `GET /v1/stages/{id}/result`: each criterion shows Met or Not met yet in words with the why and, when not met, the next step; the rule ids and the policy badge ("Decided under policy vX") are shown; an appeal button leads to WF-APPEAL-1 until `appealableUntil`. The same layout serves the final problem result (`solved`) over the final criteria and the DP-VERIFICATION decision.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. Layout from the wireframe: `{stage.result.title}`, chip (Done or In progress), per-criterion rows (`{stage.result.met}`, `{stage.result.notMet}`, `{stage.result.why}`, `{stage.result.next}`), `{stage.result.rule}`, `{stage.result.done}` only when every criterion is met, `[Back to the stage]`.
3. Not met is a normal result: neutral note style, never red, input and evidence kept; the poster and contributors keep working in WF-STAGE-1.
4. `{stage.result.appeal}` opens the appeal form of 09-u51 for the poster and any contributor to that stage; hidden for others and after `appealableUntil`.
5. Final result variant: when the problem is `solved` (or a T15 not-met result exists) show the final criteria with per-criterion evidence ids as links, the policy version and the archive link (`/archive`, plan 13).
6. States: loading, error, offline, not permitted, empty (no result yet: links back to the stage), re-decided notice after an overturned appeal.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Every criterion shows a word result and an explanation; colour is never the only signal.
- Rule ids and the policy version are always shown.
- Appeal visibility follows the API.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Appeal screens themselves (09-u51).
