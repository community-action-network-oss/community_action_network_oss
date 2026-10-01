---
id: "09-u53"
plan: "09"
title: "Review work list and auditor sample review"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 282
depends_on: ["09-u32","02-u25","02-u16"]
writes: ["app/review/**","src/features/review/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/audit-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/moderation.md#WF-AUDIT-1","docs/design/ux/wireframes/moderation.md#WF-AUDIT-2","docs/design/ux/wireframes/moderation.md","docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/audit-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-AUDIT-1 (route /review): the random-order work list for auditors and labelers, no counts as status. WF-AUDIT-2 (/review/audit/{reviewRef}): a context-masked sampled decision with an agree, disagree or unclear verdict recorded before the group result is shown.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The server units this depends on are already done, so the contract exists.
2. app/review/index.tsx from GET /v1/review/work: audit samples ("Why picked: random"), label task entries (opened by the label unit; render rows now and route to /review/label/{id}), empty state review.empty. Not permitted for other roles shows common.notPermitted naming auditor or labeler.
3. app/review/audit/[reviewRef].tsx: two panes on desktop, stacked on mobile: masked input with the span marked and the rule text on the left; decision under audit (outcome, rules, field and span, hint, policy version, run id, model class, prompt hash) and the question on the right: three radios, "What should the rule say?" note, conflict declaration checkbox, send button. After send show `audit.sent`; the group result is never shown before sending.
4. No handles, accounts, places or author identity can be rendered because the API does not return them; add a test that the screen renders only keys from the API fixture (snapshot of keys).
5. There is no action that changes the item (no publish, reject or override control anywhere).
6. Tests: random order not re-sorted client side; verdict required; conflict path; sent state; not permitted state; no override controls.
7. Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply; strings only through useT() ids added to src/i18n/en.json and docs/design/ux/copy-deck.md ids; no em or en dashes (npm run lint:copy).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Verdict is submitted before any group result appears.
- No control changes an item.
- `npm run verify` is green.

## Out of scope
- Label task screen (next).
- Policy proposal screens (plan 10).
