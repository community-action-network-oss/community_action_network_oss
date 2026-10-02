---
id: "09-u02"
plan: "09"
title: "Roles for auditor, labeler and lane member with guards"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 231
depends_on: ["02-u08","02-u04"]
writes: ["src/accounts/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/roles.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/README.md","docs/design/ai/appeals.md","docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1","docs/spec/01-slice-1-brief.md#3-roles-in-slice-1","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/roles.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["a94816e"]
actual_hours: null
---
## Objective
Per-item moderators no longer exist (D-51). Add the human roles that remain, auditor, labeler and lane_member, as additive account roles with request guards, and keep `moderator` only as the steward and maintainer function used by invites.

## Steps
1. Table account_role (account_id fk, role text CHECK in auditor|labeler|lane_member|steward, granted_by fk null, granted_at, revoked_at null; unique (account_id, role) where revoked_at is null). Keep account.role as is. Generate the migration with `npm run db:generate` (never hand-edit drizzle/**). Audit event `account.role.granted` and `.revoked` through the audit writer, detail has role only.
2. src/accounts/app/roles.ts: `hasRole(accountId, role)` and a `@RequireRole(...)` decorator plus guard that returns not_permitted (403) with the error envelope, naming the role needed (the app shows who can do it). Roles never grant publish, reject or override rights.
3. Admin-only seed helper `grantRole` used by tests and by `npm run seed` (extend only if seed script exists; otherwise export the function and note it). No public endpoint grants roles in this unit.
4. Conflict declaration data model only: table `conflict_declaration` (account_id, scope text, created_at) so label and audit units can refuse conflicted reviewers later. No UI.
5. Tests: guard allows and denies per role; a member cannot read a guarded route; role grant writes an audit event; revoked role is denied.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Guards exist for auditor, labeler and lane_member and return 403 not_permitted for others.
- No role carries a publish or override permission (asserted in a test that lists guarded routes).
- openapi/openapi.json regenerated in the same commit; `npm run verify` is green.

## Out of scope
- Role assignment UI.
- Randomized selection of labelers (09 label unit).
- Lane-specific logic.
