---
id: "09-u55"
plan: "09"
title: "Emergency and legal lane console"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 284
depends_on: ["09-u38","09-u53"]
writes: ["app/lane/**","src/features/lane/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/lane-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/moderation.md#WF-LANE-1","docs/design/ai/appeals.md#emergencylegal-lane","docs/design/flows/emergency-legal-lane.md","docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/lane-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-LANE-1 at /lane for lane members only: a redacted case, the trigger DP, the jurisdiction pack route, three actions (contact the channel, record a safety or legal hold, answer a legal request), a required reason, and the notice that every action is logged and reviewed by a second member. It cannot publish or overturn.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The server units this depends on are already done, so the contract exists.
2. app/lane/index.tsx from GET /v1/lane/cases (empty state lane.empty), case detail pane with redacted record and rule ids; action form posts POST /v1/lane/cases/{id}/actions with a required reason and authority; a second view lists actions awaiting review with POST /v1/lane/actions/{id}/review (disabled for the author of the action, with the reason shown).
3. lane.noPublish and lane.logged copy are always visible. There is no publish, reject or overturn control (test asserts none in the tree).
4. Not permitted for other roles names the lane. Offline: writes blocked with the banner (lane actions are never queued offline).
5. Tests: reason required with field error; action posted with the API fields; second-member review disabled for the author; empty state; not permitted state; no publish or overturn control present.
6. Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply; strings only through useT() ids added to src/i18n/en.json and docs/design/ux/copy-deck.md ids; no em or en dashes (npm run lint:copy).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- No control can publish, reject or overturn.
- Reason is required and enforced.
- `npm run verify` is green.

## Out of scope
- Lane staffing and oversight (open questions).
