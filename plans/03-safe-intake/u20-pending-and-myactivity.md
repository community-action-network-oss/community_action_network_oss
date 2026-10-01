---
id: "03-u20"
plan: "03"
title: "Pending review and my activity screens"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 56
depends_on: ["03-u19","02-u24","02-u25"]
writes: ["app/me/**","src/myactivity/**","src/i18n/en.json","__tests__/pending-*.test.tsx","__tests__/myactivity-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-PENDING-1","docs/design/ux/wireframes/submit.md#WF-MYACT-1","docs/spec/01-slice-1-brief.md#9-drafts-fingerprints-and-the-pending-screen","docs/open-questions/OQ-review-wait-statement.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/pending-screen.test.tsx __tests__/myactivity-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: skipped
attempts: 0
commits: []
actual_hours: null
blocked_reason: "superseded by 09-u48, 09-u52"
---
## Objective
SUPERSEDED: replaced by 09-u48, 09-u52. Pending and my-activity screens are replaced by the awaiting-review and my-activity screens. This unit is skipped and builds nothing; the text below is kept only as history.

WF-PENDING-1: "Submitted, awaiting volunteer review" with the honest wait statement, Withdraw and Edit. WF-MYACT-1: drafts and submissions with exact deletion dates.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/me/index.tsx (RequireAuth) from GET /v1/me/problems: rows with title, label chip from API, deletion date text where present ("Your text is deleted on {date}"), next action text from API, and links by state: draft to the step flow, submitted and needs_revision and rejected to /me/problems/{id}/..., published to the public detail. Empty state with the Report action; error and offline states.
3. app/me/problems/[id].tsx: for submitted shows the pending screen with the wait statement: "Volunteers review in the order received. There is no guaranteed time." plus the median wait only if the API provides it (default text without a number: OQ-review-wait-statement), the Edit and Withdraw (T06 via transitions) actions, and the line that an email arrives with the decision. For other states, redirect to the decision screens built next (route placeholder until then renders the label and explanation).
4. Withdraw requires a confirm dialog that states the deletion date; Edit on a submitted problem withdraws nothing: it is only offered when allowedTransitions or the API says canEdit; use that field, never infer.
5. Tests: list rows per state with deletion dates, empty, error, offline; pending screen text has no fabricated numbers; withdraw confirm flow calls the transition and shows the deletion date; not-permitted shows who can do it (initiator).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No invented wait numbers; a number is shown only when the API returns one.
- Deletion dates are the API values.
- Withdraw is confirmed and reversible-by-redraft messaging is clear.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Decision screens (next unit).
- Queue position estimate (D-31 says drop it if dishonest; not built).
