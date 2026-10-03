---
id: "04-u07"
plan: "04"
title: "Follows, consent, in-app notifications and emails"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 76
depends_on: ["04-u06","03-u11"]
writes: ["src/notifications/**","src/db/schema.ts","drizzle/**","src/platform/mail/templates.ts","src/app.module.ts","test/notifications.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/constitution/rules.md#NOTIFY-CONSENT-1","docs/spec/01-slice-1-brief.md#4-lifecycle","docs/design/system-design.md#2-can-server-module-boundaries","docs/spec/20-participation-nonmonetary.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/notifications.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["42c541a"]
actual_hours: null
---
## Objective
Followers learn about changes without engagement tricks: explicit opt-in, mute, unfollow, in-app notifications, and an email only for opted-in followers. Consent is recorded with purpose and timestamp.

## Steps
1. Schema: follow (account_id, problem_id, created_at, muted_at null, email_consent_at null, unique pair), notification (id, account_id, problem_id, kind, event_id, created_at, read_at), consent_record (account_id, purpose "problem_updates_email", granted_at, revoked_at). No counters stored anywhere.
2. Endpoints: POST /v1/problems/{id}/follow {emailUpdates: boolean}, DELETE follow (unfollow), POST follow/mute and unmute, GET /v1/me/follows, GET /v1/me/notifications (cursor, newest first, read flag), POST /v1/me/notifications/{id}/read, POST /v1/me/notifications/read-all. No unread count endpoint, no badge data (screens.md: no badges with counts).
3. Fan-out: a NotificationFanout service called after commit by the transition engine, the outcome applier (09-u23) and the stage and decision-record flows through a domain event port (publish in-process, deliver in a separate transaction so a fan-out failure never rolls back the lifecycle change). Kinds: state_changed (public problem label only), stage_changed (the public stage chip text, for example a stage became Ready or Done), plan_changed ("Plan changed", T22, PLAN-CHANGE-1), decision_recorded, contribution_published, re_reviewed (REMOD-NOTICE-1) and reopened (T20 and T21, D-59); review content, recommendations and reviewer identities never produce a notification to followers (REVIEW-1); re_reviewed and reopened say "re-reviewed under policy vX" or "reopened under policy vX" and point to the explanation, never carry text. Skip muted followers; send email only when email_consent_at is set; email templates in templates.ts contain only the label, plain explanation and a link; every email repeats how to mute or unfollow.
4. NOTIFY-CONSENT-1 evidence: consent_record row created with purpose and timestamp when emailUpdates is true; revoking sets revoked_at and stops mail. Followers are never auto-added (even the initiator opts in or the UI offers it explicitly).
5. Tests: opt-in required for email, muted gets nothing, unfollow stops fan-out, revoke stops email, fan-out failure leaves the lifecycle change committed, no email content includes problem text, no count fields in any response.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- NOTIFY-CONSENT-1: no email without a consent record with purpose and timestamp.
- Mute, unfollow and leave all work and are tested.
- No unread counts or badge data in the API.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Push notifications (founder-gated).
- Digests.
