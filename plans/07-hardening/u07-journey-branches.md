---
id: "07-u07"
plan: "07"
title: "Playwright journeys: rejection, appeal and stuck"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 121
depends_on: ["07-u06"]
writes: ["e2e/journeys/branches.spec.ts","e2e/helpers/**"]
reads: ["e2e/**","src/**","app/**"]
spec: ["docs/design/ux/journeys.md","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/01-slice-1-brief.md#4-lifecycle","docs/design/ux/copy-deck.md","docs/design/ux/wireframes/submit.md#WF-DECISION-1","docs/design/ux/wireframes/submit.md#WF-DECISION-2","docs/design/ux/wireframes/submit.md#WF-APPEAL-1","docs/design/ux/wireframes/moderation.md#WF-MOD-APPEAL-1","docs/design/ux/wireframes/browse.md#WF-DETAIL-3","docs/design/ux/ui-unit-template.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npm run e2e -- e2e/journeys/branches.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The other three required paths: a changes-requested then revise-and-resubmit then published flow, a rejection appealed and overturned by a different moderator, and a problem that ends stuck with a documented blocker.

## Steps
1. Revise and resubmit: moderator requests changes with a hint on the condition field (WF-DECISION-1); the member sees the hint beside the field, edits, resubmits (T03) with no retyping (assert the field is pre-filled), moderator publishes.
2. Rejection and appeal: moderator rejects with rule ids (WF-DECISION-2: deletion date text equals the decision date plus 30 days, appeal available); member files an appeal (WF-APPEAL-1); the seeded second moderator opens WF-MOD-APPEAL-1, sees no same-moderator disclosure, overturns; the problem is back in review and the draft is restored. Also assert the original decider cannot resolve the appeal (the API returns not permitted shown by the UI).
3. Stuck path: on a seeded problem in implementation, the initiator proposes stuck with blocker statement, source and version, blocked actions, recheck date, next route and an attempt; WF-DETAIL-3 shows the stuck variant with all of them and no red styling (assert via text labels and that the chip uses the neutral class or token name used in the app).
4. Single-moderator disclosure variant: not run in e2e (pool size is fixed by the seed); covered by server tests. State this in a comment.
5. Both viewports; axe on decision, appeal and stuck screens.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- All three paths pass at both viewports.
- Hints appear beside the right fields and nothing is retyped.
- The stuck screen shows every field the brief requires.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Appeal of closed or redirected (covered by server tests).
