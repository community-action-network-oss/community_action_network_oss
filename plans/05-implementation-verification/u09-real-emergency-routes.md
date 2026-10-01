---
id: "05-u09"
plan: "05"
title: "Real emergency and external routes with reviewed legal text (founder-gated)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 210
depends_on: ["05-u07"]
writes: ["src/external/**","src/i18n/en.json","__tests__/external-routes.test.tsx"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/open-questions/OQ-emergency-routing.md","docs/open-questions/OQ-legal-policy-reviewers.md","docs/spec/constitution/rules.md#CRISIS-STATIC-1","docs/design/ux/wireframes/submit.md#WF-EXTERNAL-1","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/external-routes.test.tsx"]
founder_gate: true
defaults: "None: skipped until reviewed text exists."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Replace the fictional example routes with real, reviewed ones for a launch jurisdiction. Needs the founder to choose the jurisdiction and a legal or policy reviewer to approve every line. Gated.

## Steps
1. Founder supplies jurisdiction, routes and reviewed wording in docs/open-questions/OQ-emergency-routing.md.
2. Replace the static data in src/external/routes.ts, keep every line static and offline (CRISIS-STATIC-1), keep the not-an-emergency-service statement.
3. Update the tests with the reviewed lines and keep the zero-fetch assertion.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Every line carries its source and review date in the data file.
- The screen still renders with the network down.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Choosing the jurisdiction.
- Legal advice.
