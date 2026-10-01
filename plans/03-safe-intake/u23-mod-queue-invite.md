---
id: "03-u23"
plan: "03"
title: "Moderator queue and invite screens"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 59
depends_on: ["03-u09","03-u15","02-u16","02-u15","02-u24","02-u25"]
writes: ["app/mod/**","src/moderator/**","src/i18n/en.json","__tests__/mod-queue-*.test.tsx","__tests__/mod-invite-*.test.tsx","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/wireframes/moderation.md#WF-MOD-QUEUE-1","docs/design/ux/wireframes/moderation.md#WF-MOD-INVITE-1","docs/open-questions/OQ-moderator-pool-size.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/mod-queue.test.tsx __tests__/mod-invite.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-MOD-QUEUE-1 (oldest first, honest wait column, tabs for submissions, appeals, invites) and WF-MOD-INVITE-1 (issue an invite, shown once).

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/mod/index.tsx (RequireAuth, role moderator; others see not permitted naming who can do it): list from GET /v1/moderation/queue with tabs Submissions, Appeals (type param), Invites. Rows: waiting time as text ("5 days"), title, area, "kept by author" flag count as text, repost note. No gamified counts, no streaks. Interim banner when the API reports a pool of one.
3. app/mod/invites.tsx: Issue button calls POST /v1/invites, shows the code once in a copyable block with a clear "This is shown once" message and expiry, then only the list (no codes) from GET /v1/invites. Validation for expiry days.
4. Empty, loading, error, offline and rate limited states.
5. Tests: moderator view, member not permitted, queue order as given by API, invite code appears once and not after re-render from cache (clear it from query cache after display), appeals tab.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The invite code is not kept in query cache or storage after it is displayed once.
- Non-moderators never see the nav entry or the data.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Review screen (next unit).
