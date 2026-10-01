---
id: "07-u03"
plan: "07"
title: "Authorization matrix and rule-registry scans"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 112
depends_on: ["07-u02","05-u04"]
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
1. test/support/authz-matrix.ts: actors anon, member (no relation), initiator (owner of the target problem), other member, moderator, admin, expired session; for each operationId in openapi/openapi.json an expected status per actor (data table written by hand, reviewed against the system-design API table: Actor column). Use seed helpers to create targets in each relevant state.
2. test/authz-matrix.e2e-spec.ts: iterate every operationId x actor; assert the status matches (401 session_expired for expired, 403 not_permitted, 404 for private-existence cases, 2xx or 4xx validation for permitted actors with a minimal valid or deliberately invalid body so authorization is distinguished from validation). Fail with a clear list if OpenAPI has an operationId missing from the matrix or the matrix has a removed one.
3. test/rule-scans.spec.ts (pure, no db): MONEY-0 greps package.json files of both repos (read ../can_app/package.json guarded: skip with a note if absent) and src/db/schema.ts for payment packages (stripe, paypal, braintree, razorpay, adyen) and column names amount, balance, currency; DEVICE-0 scans schema for imei, serial, biometric, face_template; IDENT-1 walks the OpenAPI response schemas and fails on any property named email, emailCiphertext, token or password; OWN-1 fails if any schema has a property named owner; EVID-URL-1 fails if any path has a multipart request body or a property of format binary.
4. Cross-check ACCT-REQ-1: every non-GET route returns 401 without a session except the three auth exchange routes (already tested in plan 02; this test covers all routes added later).

## Acceptance
- A newly added route without a matrix row fails the suite.
- The four static-rule scans run in plain unit test mode with no docker.
- Matrix statuses match the system-design API table actor column.
- `npm run verify` is green.

## Out of scope
- Penetration testing by third parties.
- Fuzzing.
