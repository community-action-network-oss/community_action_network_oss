---
id: "03-u19"
plan: "03"
title: "Submit steps 6 and 7: privacy review, preview, submit"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 55
depends_on: ["03-u16", "03-u08", "03-u07", "02-u24", "02-u25"]
writes: ["app/report/**","src/submit/**","src/i18n/en.json","__tests__/submit-6-7*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-SUBMIT-6","docs/design/ux/wireframes/submit.md#WF-SUBMIT-7","docs/spec/constitution/rules.md#PRIV-GATE-1","docs/spec/01-slice-1-brief.md#9-drafts-fingerprints-and-the-pending-screen","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/submit-steps-6-7.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: skipped
attempts: 0
commits: []
actual_hours: null
blocked_reason: "superseded by 10-u33"
---
## Objective
SUPERSEDED: replaced by 10-u33. Hard-coded submit steps 6 and 7 are replaced by the schema renderer. This unit is skipped and builds nothing; the text below is kept only as history.

Step 6 shows the server privacy and eligibility check results beside the fields they refer to; step 7 is the mandatory preview with an explanation of what publishing means, then submits (T01).

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. Step 6: call POST /v1/problems/{id}/checks; list flags grouped by field with the span highlighted in a readable text preview (text underline plus a label, not colour only); hard flags have only Edit; review flags have Generalise (jump to the field with the suggestion text) and Keep as is (POST checks/keep). Emergency result shows an inline, non-blocking WF-EXTERNAL-1 offer. Language label shown when present ("language not yet supported" informational).
3. Step 7: GET /v1/problems/{id}/preview and render the exact public view next to the publishing explanation (what happens next, who sees it, deletion and appeal timings, "Rules-based checks and human review today. AI assistance is planned; people make and answer for every decision."), the no-identifiers confirmation checkbox, and Submit.
4. Submit: if signed out, route to sign-in/sign-up with returnTo the preview step and keep the local draft; once authenticated create or sync the server draft then POST transitions {to: "submitted", fields: {identifiersConfirmed: true}}. Map validation_failed fieldErrors to the right earlier step with a link "Fix this" that focuses the field. Success routes to /me/problems/{id} (WF-PENDING-1).
5. Tests: flags rendered per field with spans, keep-as-is path, hard flag blocks submit and focuses the first error, emergency non-blocking, sign-in at submit preserves the draft, session expiry during submit shows the sheet and keeps the draft, double click submits once.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The preview equals the server preview response, not a client re-render of drafts.
- A hard flag can never be bypassed in the UI.
- Submit is idempotent against double clicks.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Pending screen and my activity (next unit).
- Plan 05 external routes page.
