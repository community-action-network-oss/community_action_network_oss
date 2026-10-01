---
id: "03-u17"
plan: "03"
title: "Submit steps 1 to 3: condition, affected, where"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 53
depends_on: ["03-u16","03-u06","02-u14","02-u16","02-u24","02-u25"]
writes: ["app/report/**","src/submit/**","src/i18n/en.json","__tests__/submit-1-3*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/submit.md#WF-SUBMIT-1","docs/design/ux/wireframes/submit.md#WF-SUBMIT-2","docs/design/ux/wireframes/submit.md#WF-SUBMIT-3","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/submit-steps-1-3.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build the staged intake shell (one question per screen, "Step n of 7" as text, back and next, saved indicator) and steps 1 to 3 over the local draft store. Signed-out users can write; sign-in happens at submit.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/report/[step].tsx plus src/submit/StepShell.tsx: progress text from ICU plural-free message "Step {n} of {total}", heading as h1, EmergencyNotice, SavedIndicator, Back and Next, keyboard operable, route validates step 1 to 7 and redirects out of range.
3. Step 1 (condition): multiline TextField with 300 character counter, hint with fictional example "The bus shelter on Route 9 is missing.", inline flag area ready to render privacy flags (component src/submit/FlagNotice.tsx showing the flag text and two actions Generalise and Keep as is; wired to real flags in the steps 6 and 7 unit, but supports local pre-checks: do NOT duplicate the server detector; show flags only from the server checks result passed as a prop).
4. Step 2 (affected): group radios (residents, workers, students, other) plus description and optional count with an "I do not know" option. Step 3 (where): jurisdiction picker from GET /v1/jurisdictions (fictional only, labelled fictional) and a coarse area free-text with the note it is display only and never verified.
5. Persist every change to the draft store; on first authenticated Next, create the server draft (POST /v1/problems) and then PATCH on later steps with expectedVersion; handle conflict by reloading the server version into the form without discarding local edits (show a short banner). Signed-out users keep working locally.
6. Crisis wording in step 1 offers WF-EXTERNAL-1 inline only after the server says emergency (the link target page is built in plan 05; until then link to an anchor text of external routes as plain text from copy "If someone is in danger, contact your local emergency number").
7. Tests: step navigation and range guard, autosave on each field, signed-out writing then authenticated upload creating exactly one server draft, conflict banner, validation messages, offline keeps local save.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Typing never requires sign-in; sign-in is requested only at submit.
- One server draft is created even if Next is pressed twice (idempotent create guard).
- Every step shows the emergency notice.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Steps 4 to 7.
- Submitting.
