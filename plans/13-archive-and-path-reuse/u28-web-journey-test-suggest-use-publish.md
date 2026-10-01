---
id: "13-u28"
plan: "13"
title: "Web journey test: suggest, use, publish, draft, apply (Playwright, fakes)"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.2
priority: 435
depends_on: ["13-u24","13-u26","13-u27","02-u21","12-u26"]
writes: ["e2e/archive-reuse*.spec.ts","e2e/fixtures/archive-reuse/**"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/archive.md#WF-SUGGEST-1","docs/design/ux/wireframes/archive.md#WF-SUGGEST-2","docs/design/ux/wireframes/archive.md#WF-ARCHIVE-2","docs/design/ux/wireframes/archive.md#WF-STAGEDRAFT-1","docs/design/ux/journeys.md","docs/design/ux/ui-unit-template.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One Playwright journey on the web app against the test server with fakes: a poster sees suggestions, opens a detail, uses a path, publishes, receives a stage draft and applies it; plus the public archive pages.

## Steps
1. Use the harness of 02-u21 and seed the test server with the fixture archive of 13-u22 (the same fixtures through its seed endpoint or script, no new server code).
2. Journey: sign in as a poster, fill the problem fields, assert the panel appears after the idle debounce and never takes focus; open the detail, assert legality rows and the disabled action for the not-allowed path; confirm the sheet on an allowed path; send for review and publish with the fake reviewer; open the stage draft, edit one stage, apply, assert the "Based on" credit on the stage map.
3. Public: /archive lists the record with its simulation label, filters work, /archive/{id} shows challenges; both work signed out.
4. Accessibility smoke: axe check on the five screens at 375 px and 1280 px, list views reachable with the keyboard.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The journey passes locally with the fakes.
- No axe violations of serious or critical impact on the five screens.
- `npm run verify` is green.

## Out of scope
- Native device tests (D-8).
