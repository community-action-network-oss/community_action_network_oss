---
id: "09-u38"
plan: "09"
title: "Emergency and legal lane module with NO-INSTANCE-OVERRIDE-1 route test"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 267
depends_on: ["09-u23","09-u02","09-u11"]
writes: ["src/lane/**","src/moderation/app/outcome-applier.ts","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/lane.e2e-spec.ts","test/no-instance-override.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/appeals.md#emergencylegal-lane","docs/design/flows/emergency-legal-lane.md","docs/design/ux/wireframes/moderation.md#WF-LANE-1","docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1","docs/spec/constitution/rules.md#CRISIS-STATIC-1","docs/open-questions/OQ-lane-oversight.md","docs/open-questions/OQ-emergency-routing.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/lane.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The only place a person acts on a single case. DP-CRISIS escalate_human and DP-LEGAL escalate_human, plus unresolvable PREC-1 conflicts at rights or crisis tier, open a lane case. Every action is logged with a reason; the lane cannot publish, overturn a rule decision, or edit policy.

## Steps
1. Tables lane_case (id, run_id, trigger dp, jurisdiction_id, redacted_summary, rule_ids, status open|actioned|reviewed|closed, opened_at) and lane_action (id, case_id, actor_id, action contact_channel|record_hold|answer_request, reason NOT NULL, authority text, created_at, reviewed_by null, reviewed_at null). Migration via db:generate. Insert-only for the app role on lane_action (revoke UPDATE, DELETE; second-member review is a separate lane_review table).
2. Implement the applier hook: escalate_human opens a case with the minimal redacted summary (from the masked builder, only the minimum) and keeps the item held; `lane.case.opened` and `moderation.routed_external` events.
3. Endpoints (role lane_member only): GET /v1/lane/cases, POST /v1/lane/cases/{id}/actions {action, reason, authority}, POST /v1/lane/actions/{id}/review (a second member; the same member is refused). Each action writes an audit_event (actor, time, case ref, rule ids, action, reason; no raw personal data). A redacted example candidate is queued for the policy proposal port (seed table only). Reason missing is refused (`validation_failed`).
4. What a member may NOT do, tested: no endpoint publishes, rejects or overturns; `record_hold` sets a legal or safety hold marker that keeps content hidden, nothing more.
5. Lane unattended: case age is visible via GET; content stays held, never published; static crisis resources keep showing (CRISIS-STATIC-1).
6. NO-INSTANCE-OVERRIDE-1 route-table test in test/no-instance-override.e2e-spec.ts: enumerate the Nest route table and assert there is no route that edits a decision or sets publish on a held item by hand. Delete any remaining 03-u10, 03-u12, 03-u13 or 04-u03 moderator decision route or use case that fails the test (record deletions in the commit message).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Every lane action has a reason and an audit event (test).
- Route-table test passes: no per-item override route exists.
- The same member cannot review their own action.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Real emergency routes and legal text (05-u09, founder-gated).
- Lane UI.
