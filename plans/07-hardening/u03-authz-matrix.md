---
id: "07-u03"
plan: "07"
title: "Authorization matrix and rule-registry scans"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 112
depends_on: ["07-u02", "05-u04", "09-u02", "09-u38", "09-u43", "12-u03", "12-u11"]
writes: ["test/authz-matrix.e2e-spec.ts","test/support/authz-matrix.ts","test/rule-scans.spec.ts"]
reads: ["src/**","openapi/openapi.json"]
spec: ["docs/spec/01-slice-1-brief.md","docs/spec/constitution/rules.md#ACCT-REQ-1","docs/spec/constitution/rules.md#IDENT-1","docs/spec/constitution/rules.md#OWN-1","docs/spec/constitution/rules.md#MONEY-0","docs/spec/constitution/rules.md#DEVICE-0","docs/spec/constitution/rules.md#EVID-URL-1","docs/design/system-design.md#6-api-surface-v1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/authz-matrix.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A test-only unit that proves who can do what. The matrix is data (route by actor to expected status), generated from the OpenAPI document so a new route without a matrix entry fails the test, plus cheap registry scans for the static rules.

## Steps
1. test/support/authz-matrix.ts: actors anon, member (no relation), volunteer (a member opted in to review), initiator (owner of the target problem, the poster and after publication the steward), other member, steward account (role moderator: invites only), auditor, labeler, lane_member, maintainer, admin, expired session (there is no per-item moderator actor: no route lets any person change a single moderation outcome, NO-INSTANCE-OVERRIDE-1); for each operationId in openapi/openapi.json an expected status per actor (data table written by hand, reviewed against the system-design API table: Actor column). Use seed helpers to create targets in each relevant state.
2. test/authz-matrix.e2e-spec.ts: iterate every operationId x actor; assert the status matches (401 session_expired for expired, 403 not_permitted, 404 for private-existence cases, 2xx or 4xx validation for permitted actors with a minimal valid or deliberately invalid body so authorization is distinguished from validation). assert that no route outside the emergency/legal lane (09-u38) lets a role set or overturn a moderation outcome, then fail with a clear list if OpenAPI has an operationId missing from the matrix or the matrix has a removed one.
3. test/rule-scans.spec.ts (pure, no db): MONEY-0 greps package.json files of both repos (read ../can_app/package.json guarded: skip with a note if absent) and src/db/schema.ts for payment packages (stripe, paypal, braintree, razorpay, adyen) and column names amount, balance, currency; DEVICE-0 scans schema for imei, serial, biometric, face_template; IDENT-1 walks the OpenAPI response schemas and fails on any property named email, emailCiphertext, token or password; OWN-1 fails if any schema has a property named owner; EVID-URL-1 fails if any path has a multipart request body or a property of format binary.
4. Review privacy scan (REVIEW-1, proves the claim of 12-u03): no public (anonymous) route and no route reachable by a non-poster, non-volunteer member returns any `review_recommendation`, review session or reviewer identity field; the review routes return 404 for a problem not in `in_review`; a volunteer cannot read the poster handle or any unmasked field (exact key sets from the masked view); the poster sees reviewers only as "Volunteer n"; a volunteer cannot review their own problem; routes of the stage plan (`start`, `submit`, `block`, `choice`, `plan-changes`) are allowed only to the steward and refused to members and volunteers, and no route sets a stage `resolved` or a problem `active` or `solved` (STAGE-RESOLVE-1, NO-INSTANCE-OVERRIDE-1).
5. Cross-check ACCT-REQ-1: every non-GET route returns 401 without a session except the three auth exchange routes (already tested in plan 02; this test covers all routes added later).

## Acceptance
- A newly added route without a matrix row fails the suite.
- The four static-rule scans run in plain unit test mode with no docker.
- Matrix statuses match the system-design API table actor column.
- `npm run verify` is green.

## Out of scope
- Penetration testing by third parties.
- Fuzzing.
