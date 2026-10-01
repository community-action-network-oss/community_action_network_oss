---
id: "03-u06"
plan: "03"
title: "Draft endpoints: create, edit, delete, my problems"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 43
depends_on: ["03-u05","03-u03"]
writes: ["src/problems/http/**","src/problems/app/**","src/problems/infra/**","src/db/schema.ts","drizzle/**","test/drafts.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#9-drafts-fingerprints-and-the-pending-screen","docs/design/system-design.md#6-api-surface-v1","docs/design/ux/wireframes/submit.md#WF-MYACT-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/drafts.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Let a member create and edit a private draft, discard it (T19), and list their own problems with deletion dates. Content text is stored partially and validated for length only here. Sources, final criteria and the stage plan are added by the preparation API (12-u04).

## Steps
1. Migration: add to problem intake_evidence jsonb (array of {url, note}), no_evidence_note text, identifiers_confirmed_at timestamptz, purged_at timestamptz, review_reminder_sent_at timestamptz (all nullable).
2. POST /v1/problems (member) creates a draft {title?, condition?, affected?, coarseArea?, desiredOutcome?, observed?, uncertain?, jurisdictionId?} with state draft and initiator = session account (T00); PATCH /v1/problems/{id} (initiator) edits allowed fields only while state is draft, needs_revision or in_review (an edit in in_review writes a new version snapshot that volunteers see as changed, 12-u03; the first change that touches a field flagged by DP-PUBLISH is what T03 needs), with optimistic version (If-Match style expectedVersion in body) and length limits from src/problems/domain/eligibility/limits.ts; DELETE /v1/problems/{id} (initiator) is T19: only in draft, hard deletes the row and its events (no event is written; the delete is audited with no content), 204.
3. GET /v1/me/problems (member): items {id, state, label, title, updatedAt, deleteAfter (purge_after, shown to the initiator as the exact deletion date), appealableUntil (null until the moderation unit), canWithdraw, canEdit}, cursor paged, newest first. Pre-publication withdrawn and rejected items stay listed until purged; the item also carries reviewCount and needsReviewers while in_review (12-u03 fills them).
4. Authorization: only the initiator (or a moderator for GET detail via the detail endpoint) may touch a draft; others get 404. Rate limit draft creation with the in-memory limiter (20 per day per account).
5. DTOs with @ApiProperty and operationIds createDraft, updateDraft, deleteDraft, listMyProblems. Do not accept unknown fields (whitelist, forbidNonWhitelisted).
6. Tests: create then patch then list shows deleteAfter null for draft; non-owner gets 404; patch in held, rejected or any public state is invalid_transition style conflict; delete removes the row; limits enforced with fieldErrors; version mismatch returns conflict.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Drafts are invisible to everyone but the initiator and moderators.
- T19 leaves no row and no event.
- No endpoint returns an email.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Running deterministic checks (checks unit).
- Submitting (transitions endpoint).
