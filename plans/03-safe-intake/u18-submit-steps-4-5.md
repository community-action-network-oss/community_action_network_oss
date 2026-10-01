---
id: "03-u18"
plan: "03"
title: "Submit steps 4 and 5: observed vs uncertain, evidence links"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 54
depends_on: ["03-u17","02-u24","02-u25"]
writes: ["app/report/**","src/submit/**","src/i18n/en.json","__tests__/submit-4-5*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/submit.md#WF-SUBMIT-4","docs/design/ux/wireframes/submit.md#WF-SUBMIT-5","docs/spec/constitution/rules.md#EVID-URL-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/submit-steps-4-5.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Step 4 separates what is observed from what is uncertain; step 5 collects evidence as URLs only, or an honest "no evidence yet" note.

## Steps
1. Step 4: two labelled multiline fields (observed, uncertain) with counters (600) and hints that explain the difference in plain words.
2. Step 5: repeatable URL rows (url, short note), add and remove buttons with accessible names, at least one URL or a no-evidence note is required to pass Next (client check mirrors T01 required fields; the server remains the authority). A client-side shape check shows a friendly hint only for obviously invalid input (missing https); the real URL rules come back from the server checks in step 6.
3. Copy states that only links are accepted and no files can be uploaded (EVID-URL-1), and that links should point to public pages, not private documents.
4. Persist to the draft store and PATCH intake_evidence and noEvidenceNote to the server draft as in steps 1 to 3.
5. Tests: required-evidence rule, add and remove rows keep focus sensible (focus the new row), 200 percent text size has no clipping (no fixed heights), long URLs wrap, autosave.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- No file input exists anywhere on these screens.
- Long URLs wrap without horizontal scroll at 360 px.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Server URL verification (checks).
- Steps 6 and 7.
