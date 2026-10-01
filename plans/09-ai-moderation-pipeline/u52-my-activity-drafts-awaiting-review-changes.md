---
id: "09-u52"
plan: "09"
title: "My activity: drafts, awaiting review, changes requested, notices"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 281
depends_on: ["09-u48","09-u50","02-u25"]
writes: ["app/me/index.tsx","src/features/activity/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/myact-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-MYACT-1","docs/design/ux/journeys.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/myact-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-MYACT-1 at /me: drafts, submitted items (Awaiting review, held shown as awaiting review), items that need attention (changes requested with the real deletion date, re-reviewed notices), and sign out.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The server units this depends on are already done, so the contract exists.
2. Build /me from the my-problems list (03-u06 endpoint) and the notices endpoint: group Drafts, Submitted, Needs your attention; each row shows state label text, the deletion date or appeal deadline from the API, and a single Open or Continue action. No counts as status, no streaks.
3. A notice row (re-reviewed) is listed under Needs your attention with a link to WF-REMOD-1.
4. Local drafts that are not yet on the server (03-u16) still appear under Drafts if that store exists; if not present, skip with a code comment, do not create the store.
5. Tests: grouping; held item appears as Awaiting review; deletion date shown; notice row appears; empty state offers the next action; sign out works.
6. Supersession guard: if the older human-moderator version of this screen from plan 03 (03-u20 to 03-u25) exists, delete the files it wrote for it and their tests, and note the deletions in the commit message. Keep route paths stable.
7. Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply; strings only through useT() ids added to src/i18n/en.json and docs/design/ux/copy-deck.md ids; no em or en dashes (npm run lint:copy).
8. Lifecycle v2 wording: the groups are Drafts, In volunteer review (link to WF-VREVIEW-3), Checking before publication (the WF-PENDING-1 states of 09-u48), Changes requested (T02, with the real deletion date), and Published. Replace any "Submitted" or "Awaiting review" group heading by these (copy-deck ids from docs/design/ux/copy-deck-lifecycle.md).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Dates are API values.
- No counts or urgency language.
- `npm run verify` is green.

## Out of scope
- Notification settings.
