---
id: "03-u15"
plan: "03"
title: "Moderator-issued invites endpoint"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 0.8
priority: 52
depends_on: ["02-u08"]
writes: ["src/accounts/http/**","src/accounts/app/**","test/invites.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#8-accounts-and-sign-in-d-14","docs/design/system-design.md#6-api-surface-v1","docs/design/ux/wireframes/moderation.md#WF-MOD-INVITE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/invites.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
POST /v1/invites lets a moderator or admin issue a one-time invite code, shown once, stored only as a hash.

## Steps
1. Body {expiresInDays?: 1..30 default 14}. Generate 16 random chars grouped for readability, store hashSecret(code), issued_by, expires_at; response {code, expiresAt} returned once and never retrievable. GET /v1/invites (moderator) lists issued invites without codes: {id, issuedAt, expiresAt, redeemed: boolean}.
2. Roles guard moderator or admin; audit event "invite.issued" (no code in detail); rate limit 20 per day per moderator.
3. Tests: moderator can issue and the code redeems at signup via the existing use case; member gets 403; the code never appears in the list or in logs (redaction test); expired invite fails signup generically.
4. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- The invite code is shown exactly once and stored only as a hash.
- Only moderators and admins can issue.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Invite UI (moderation app unit).
