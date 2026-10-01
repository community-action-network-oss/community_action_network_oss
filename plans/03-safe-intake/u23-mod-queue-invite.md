---
id: "03-u23"
plan: "03"
title: "Steward invite screen (WF-MOD-INVITE-1)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 59
depends_on: ["03-u15", "02-u16", "02-u15", "02-u24", "02-u25"]
writes: ["app/review/invites.tsx", "src/invites/**", "src/i18n/en.json", "__tests__/mod-invite-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md", "docs/design/ux/wireframes/moderation.md#WF-MOD-INVITE-1", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/mod-invite.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-MOD-INVITE-1 only: the steward issues an invite and the code is shown once. The per-item moderator queue (WF-MOD-QUEUE-1) is gone: nobody reviews single items (D-51); review work for auditors and labelers is 09-u53, and 09-u53 owns app/review/index.tsx.

## Steps
1. Run `npm run gen:api` (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The dependent server unit is already done, so the contract exists.
2. app/review/invites.tsx (RequireAuth, role moderator meaning steward; others see not permitted naming who can do it): Issue button calls POST /v1/invites, shows the code once in a copyable block with a clear "This is shown once" message and expiry, then only the list (no codes) from GET /v1/invites. Validation for expiry days. Do not create app/review/index.tsx here.
3. Empty, loading, error, offline and rate limited states.
4. Tests: steward view, member not permitted, invite code appears once and not after re-render from cache (clear it from query cache after display), no queue or appeals tabs exist.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The invite code is not kept in query cache or storage after it is displayed once.
- Non-stewards never see the route's data.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The review work list, audit and label screens (09-u53, 09-u54).
- Any per-item moderation screen.
