---
id: "05-u08"
plan: "05"
title: "Terminal and resting action forms on the renderer shell"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 97
depends_on: ["05-u06", "05-u05", "05-u04", "02-u24", "02-u25", "10-u05"]
writes: ["src/stage/**", "src/problems/**", "src/i18n/en.json", "__tests__/terminal-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/browse.md#WF-DETAIL-3", "docs/design/ux/wireframes/forms.md#WF-FORM-1", "docs/design/ux/wireframes/forms.md#WF-FORM-3", "docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01-slice-1-brief.md#7-what-solved-means", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/terminal-forms.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Extend the stage controls from plan 04 to the later transitions (T11 to T21) as proposals the initiator makes and the moderation run decides. The forms are the schema renderer (10-u05) on the pinned schemas; 10-u35 completes them. There is no moderator confirm panel: nobody confirms, the run decides and the screen shows "Awaiting review", then the outcome with the rule and policy version (09-u49, 09-u42).

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. For each allowed later transition (T11 to T20) render the action from allowedTransitions and mount SchemaForm on the schema named by its requires list (decision record picker, failed-check note, outcome statement with the chosen success metric quoted by the schema's guidance, blocker, pause and closure fields). The 90 day pause maximum and reason-code lists come from the pack, not from the app. No FieldKey-to-input registry is kept (D-58).
3. Withdraw (T21) shows the OWN-1 explanation up front and falls back to the "request closure" form when the API says other contributions exist (allowedTransitions omits T21).
4. After a proposal is sent show the "Awaiting review" state and poll or refresh through the API status shape of 09-u24; when the run asks for changes show the hints beside fields (renderer hints prop); when it decides, show the policy-version label. A held run shows the held text of 09-u48.
5. Tests: each form is rendered from a fixture schema and maps fieldErrors, T21 fallback to closure request, the awaiting-review state after propose, no confirm or decline control exists anywhere (grep and query test), hints appear beside their fields.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Controls and required fields come from the API allowedTransitions and requires lists and from schemas.
- No moderator confirm panel, queue tab or self-confirmation banner exists.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Contribution flows.
- The deciding run and appeals screens (09-u42, 09-u49, 09-u51).
