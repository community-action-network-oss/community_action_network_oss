---
id: "04-u02"
plan: "04"
title: "Contribution endpoints with checks, cooldown and pending review"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 71
depends_on: ["04-u01","03-u08"]
writes: ["src/contributions/**","src/app.module.ts","test/contributions.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#6-contributions","docs/design/system-design.md#6-api-surface-v1","docs/spec/constitution/rules.md#PRIV-GATE-1","docs/spec/constitution/rules.md#EVID-URL-1","docs/spec/constitution/rules.md#RANK-1","docs/spec/constitution/rules.md#OWN-1","docs/design/ux/wireframes/participate.md#WF-CONTRIB-1","docs/design/ux/wireframes/participate.md#WF-CONTRIB-2"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/contributions.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
GET and POST /v1/problems/{id}/contributions and PATCH /v1/contributions/{id}. Contributions are checked on submit, wait for moderator review, and respect delays.

## Steps
1. POST (member): {type, body, evidenceRefs?: [{url, note}], answersContributionId?}. Validate: problem is published and isAllowed(state, type); body max 1500; evidence type needs at least one URL; factual_claim may reference a clarifying_question of the same problem; moderation_feedback refused; cooldown via nextAllowedAt (429 cooldown_active with retryAfterSeconds and calm message). Run the deterministic checks (privacy, secrets, URL rules) from plan 03: hard flags reject with fieldErrors; personal_experience must pass identifier checks; review flags need acknowledgement body field keptFlagIds. Create with status pending_review, evidence_ref rows with category from checkEvidenceUrl.
2. GET list (public): only accepted contributions to everyone, plus the caller's own pending ones flagged status pending_review; each item {id, type, body, authorHandle, createdAt, status, answersContributionId, evidenceRefs}; grouped client-side. No counts, no reactions, order by createdAt ascending (RANK-1 spirit); response includes criteria {order: "created_at_asc", usesEngagementSignals: false}.
3. PATCH (author): withdraw (tombstone: body null, tombstoned_at set, status tombstoned) or edit body only while pending_review; accepted text cannot be silently edited (edit after publication is OQ-edit-after-publication: default is withdraw and resubmit). Tombstones remain visible as placeholders with date.
4. Add allowedContributionTypes (array from allowedTypes(state), empty for guests and in terminal states) to the problem detail response (GET /v1/problems/{id}) so clients never hardcode the matrix; update the detail key-set test.
5. Audit events for create and withdraw (no body). Rate limit through the existing limiter in addition to cooldown. A problem initiator may contribute like anyone.
6. Tests: type not allowed in state, per-state happy paths for 3 types, cooldown 2 minutes and exemption for progress_update, hard flag rejection, answers link validation, pending visible only to author, tombstone, key-set test (no email, no counts), OpenAPI has no multipart route.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A pending contribution is invisible to everyone except its author and moderators.
- No counts or ranking fields exist anywhere in the response (key-set test).
- All writes require a session (ACCT-REQ-1 route-table test still passes).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Moderator review of contributions (next unit).
- Notifications.
