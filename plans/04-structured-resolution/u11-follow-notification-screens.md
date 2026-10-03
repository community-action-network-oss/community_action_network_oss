---
id: "04-u11"
plan: "04"
title: "Follow controls and notifications list"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.2
priority: 80
depends_on: ["04-u07","04-u10","02-u24","02-u25"]
writes: ["app/me/**","src/follow/**","src/notifications/**","src/problems/**","src/i18n/en.json","__tests__/follow-*.test.tsx","__tests__/notifications-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/spec/constitution/rules.md#NOTIFY-CONSENT-1","docs/design/ux/wireframes/browse.md#WF-DETAIL-1","docs/design/ux/wireframes/submit.md#WF-MYACT-1","docs/design/ux/screens.md#navigation","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/follow-controls.test.tsx __tests__/notifications-list.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["00cabc0","653e431"]
actual_hours: null
---
## Objective
A Follow control on the detail screen with explicit email consent text, mute and unfollow, and a notifications list under My activity (kinds include stage and plan changes, 04-u07). No badges with counts.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. FollowControl in src/follow/: Follow (in-app only) and "Also email me updates" toggle with the consent sentence ("We email you only about this problem. You can mute or unfollow any time."), Mute, Unfollow; optimistic update only where rollback is safe.
3. app/me/notifications.tsx: list newest first with kind text from API, label and a link to the problem; "Mark as read" per item and "Mark all as read"; empty state; no unread counters in nav or anywhere (test asserts the nav has no numeric badge).
4. Guests see a sign-in prompt instead of controls. Offline and error states.
5. Tests: opt-in sentence shown before consent, mute and unfollow calls, list and mark read, no numeric badge, guest prompt.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Email updates are off until the user explicitly turns them on.
- No numeric badges anywhere.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Push notifications.
