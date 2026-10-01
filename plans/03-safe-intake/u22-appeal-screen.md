---
id: "03-u22"
plan: "03"
title: "Appeal screen"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 0.8
priority: 58
depends_on: ["03-u21","03-u12","02-u24","02-u25"]
writes: ["app/me/problems/**","src/appeals/**","src/i18n/en.json","__tests__/appeal-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-APPEAL-1","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#APPEAL-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/appeal-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: skipped
attempts: 0
commits: []
actual_hours: null
blocked_reason: "superseded by 09-u51"
---
## Objective
SUPERSEDED: replaced by 09-u51. The appeal screen is replaced by the appeal form and status timeline. This unit is skipped and builds nothing; the text below is kept only as history.

WF-APPEAL-1: file an appeal with grounds before the deadline, see the status and the honest reviewer disclosure.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/me/problems/[id]/appeal.tsx: grounds multiline (max 2000, counter), who will review ("A different volunteer reviews this when more than one is available; otherwise the same interim volunteer will, and the page says so"), window and deadline date, Submit calls POST /v1/moderation/decisions/{id}/appeals.
3. States: window closed (date shown, form hidden), already appealed (status and outcome with explanation, disclosure text, struck hints or restored draft message), validation, not permitted, offline, session expired.
4. After an overturn show the effect in plain words from the API (back with a volunteer, or restored).
5. Tests: happy path, window closed, one per decision, disclosure text appears when the API flag is true, validation focus.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The page never promises an outcome or a time.
- Disclosure text appears exactly when the API says the same moderator reviews.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Moderator appeal review.
