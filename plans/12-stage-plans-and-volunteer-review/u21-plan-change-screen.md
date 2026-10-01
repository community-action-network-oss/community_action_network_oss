---
id: "12-u21"
plan: "12"
title: "Propose a plan change (WF-STAGEMAP-1 action): form, status and plan history"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 46
depends_on: ["12-u09", "12-u14", "12-u05", "02-u24", "02-u25"]
writes: ["app/problems/**", "src/stages/plan-change/**", "src/i18n/en.json", "__tests__/plan-change-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/stages.md#WF-STAGEMAP-1", "docs/design/ux/wireframes/prepare.md#WF-PREP-3", "docs/design/flows/plan-change.md", "docs/spec/constitution/rules.md#PLAN-CHANGE-1", "docs/spec/01a-lifecycle.md", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/plan-change-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build the `{stagemap.change}` flow of WF-STAGEMAP-1 (PLAN-CHANGE-1, T22): a proposal form that reuses the plan editor components of 12-u14 over the published plan, a status screen for the proposal (waiting for the poster, checking, applied, changes requested, held) and the public plan history ("Plan changed on {date}").

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server units are done, so the contract exists.
2. `app/problems/[id]/plan-change.tsx` (RequireAuth, member): the editor in proposal mode (resolved stages are shown read only with `Reactivate` instead of delete; removing a stage with work uses Skip with a reason), a required reason field, `GET /v1/problems/{id}/plan-changes/prefill` to start from the unmet final criteria after a T15 not-met result, and submit to `POST /v1/problems/{id}/plan-changes`; validation errors from the DAG check are shown inline as in WF-PREP-3.
3. Proposal status page: a non-poster proposal shows "Waiting for the poster" with the poster's accept or decline reason when given (the poster's own accept and decline form with a reason lives here for the poster); `needs_revision` hints beside the changed stages; `held` says the plan is unchanged and the check will retry; applied links to the new map.
4. Plan history section on the stage map page (`GET /v1/problems/{id}/plan-history`): version, date, reason, diff summary in words; the problem page shows "Plan changed" with the plain explanation.
5. States: loading, error, offline, session expired, not permitted (resting or terminal problem: a calm message), conflict (a newer plan version exists: reload with the user's edits kept).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No plan change is ever applied silently: the UI shows status and reason for every proposal.
- Resolved stages cannot be deleted from the form.
- A stale plan version conflict keeps the user's edits.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The server side (12-u09) and the AI decision content.
