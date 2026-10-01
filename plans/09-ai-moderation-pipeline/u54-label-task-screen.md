---
id: "09-u54"
plan: "09"
title: "Label task screen"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 283
depends_on: ["09-u35","09-u53"]
writes: ["app/review/label/**","src/features/review/label/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/label-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/moderation.md#WF-LABEL-1","docs/design/ai/appeals.md#steps","docs/open-questions/OQ-label-task-panel.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/label-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-LABEL-1 at /review/label/{id}: the exact question, the rule as written, the redacted text, a Yes, No or Not sure choice, a conflict declaration, and the independence note. The label becomes an example or rule change only through a policy proposal.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The server units this depends on are already done, so the contract exists.
2. app/review/label/[id].tsx from GET /v1/review/label/{id}, submit with POST /v1/review/label/{id}/labels. Shows label.q ("Does rule {ruleId} apply to this text?"), the rule text, the masked text, `label.masked` and `label.independent` notes; no running counts, no other labels, no appellant information.
3. After sending show confirmation and return to the work list; a second attempt shows the already-labeled state.
4. Tests: required choice; conflict declaration path; independent note present; no counts of other labels rendered; already-labeled state; not permitted state.
5. Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply; strings only through useT() ids added to src/i18n/en.json and docs/design/ux/copy-deck.md ids; no em or en dashes (npm run lint:copy).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Nothing about other labelers is rendered.
- `npm run verify` is green.

## Out of scope
- Task creation and aggregation (server).
