---
id: "09-u48"
plan: "09"
title: "Awaiting review and held screens (fail closed)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 277
depends_on: ["09-u25", "02-u25", "02-u24", "02-u16", "12-u12"]
writes: ["app/me/problems/**","src/features/moderation/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/pending-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-PENDING-1","docs/design/ux/wireframes/submit.md#WF-HOLD-1","docs/design/ai/triggers.md#1-pre-publication-blocking","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/spec/constitution/rules.md#CRISIS-STATIC-1","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/pending-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-PENDING-1 shows that an AI moderation run is in progress and that nothing is public. WF-HOLD-1 shows the fail-closed state with the real waiting time, never a promise, and never implying publication. Both live at /me/problems/{id}.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The server units this depends on are already done, so the contract exists.
2. src/features/moderation/useModerationStatus.ts: TanStack hook over GET /v1/problems/{id}/moderation/status with polling (interval backs off from 3 s to 30 s, stops when state is decided, pauses when the tab is hidden). The generated client only.
3. app/me/problems/[id]/index.tsx renders by state: `checking` is WF-PENDING-1, the wait while the publication run (DP-PUBLISH) is in flight after volunteer review ("Checking against policy {policyVersion}", `pending.wait` copy, submitted time, Edit draft and Withdraw with the deletion date confirm, collapsed "What you submitted"); `held` is WF-HOLD-1 (hold.title, hold.body, real age "Waiting for {minutes} minutes" via ICU, retry note, language variant when heldReason is language_unsupported, crisis line "If someone is in danger, call your local number", Edit draft and Withdraw); `decided` redirects to the decision route.
4. No fake progress bars and no estimated completion time; elapsed time is shown only in the held state. The chip stays "Awaiting review" in held. A hold never shows a publish affordance.
5. Editing while checking: confirm that editing cancels the run and a new check starts on submit (calls the draft PATCH then returns to draft).
6. Tests: checking state copy and no progress bar; held state shows real age from the API value; language variant; hold never shows a publish control; polling stops when decided; withdraw confirm shows the deletion date.
7. Supersession guard: if the older human-moderator version of this screen from plan 03 (03-u20 to 03-u25) exists, delete the files it wrote for it and their tests, and note the deletions in the commit message. Keep route paths stable.
8. Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply; strings only through useT() ids added to src/i18n/en.json and docs/design/ux/copy-deck.md ids; no em or en dashes (npm run lint:copy).
9. Lifecycle v2 scope trim (W13): the "In volunteer review" status screen is owned by 12-u17 (and the preparation workspace by 12-u12), both on `/me/problems/{id}`. This unit keeps only the held state (WF-HOLD-1) and the publication-check wait (WF-PENDING-1 as it applies after volunteer review). It must not render, and its tests must not cover, the `draft`, `needs_revision` or `in_review` volunteer-review states: for those the route mounts the 12-u12 and 12-u17 components; this unit only registers the `checking` and `held` branches in the shared route switch. No chip text for volunteer review is set here.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The real age comes from the API, not a client timer.
- The held screen never implies publication.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Decision screens (next).
- Local draft store changes.
