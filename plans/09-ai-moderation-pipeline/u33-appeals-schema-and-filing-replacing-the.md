---
id: "09-u33"
plan: "09"
title: "Appeals: schema and filing, replacing the human appeal queue"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 262
depends_on: ["09-u24","09-u02"]
writes: ["src/appeals/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/appeals-file.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/appeals.md#steps","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#APPEAL-1","docs/spec/constitution/rules.md#APPEAL-2","docs/design/flows/appeal.md","docs/design/ux/wireframes/submit.md#WF-APPEAL-1","docs/design/ai/structured-content.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/appeals-file.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One appeal per decision, until appealable_until, with structured grounds (rule, passage, reason). The appeal never changes state by itself; it starts the independent re-run. Appeals no longer have human reviewers.

## Steps
1. Table appeal (id, decision_id unique fk, appellant_id, grounds jsonb {ruleId, passage, reason}, status filed|rerun|label_open|awaiting_policy|overturned|upheld|closed, rerun_run_id null, label_task_id null, resulting_pr_ref null, outcome null, outcome_explanation null, filed_at, decided_at). Migration via db:generate. The appeal schema is a content type: validate grounds against the active appeal schema through the 10-u04 registry (stamp schema_id and version).
2. POST /v1/moderation/decisions/{id}/appeals (initiator of the target): window check gives conflict code `appeal_window_closed` with the date; one per decision (conflict); allowed outcomes in one constant list (needs_revision, reject, plus T19 and T20 decisions once plan 05 lands); per-account cap from pack value `caps.appeals_per_account_per_period` through the rate-limit helper (07-u02 may not exist yet: read the value through the policy module and enforce with a simple count query). A rejected good-faith appeal has zero penalty (APPEAL-2): no cooldown, no flag (test).
3. Grounds text is untrusted data like any user text: it passes DP-PRIVACY, DP-NAMING, DP-TONE and DP-CRISIS checks only (the appeal channel cannot leak or abuse), and is quoted data in any later prompt.
4. Appeal on an emergency or legal item routes to the lane (hook interface, lane unit implements): the appeal is accepted but status awaits_lane; the instance stays held.
5. Events appeal.filed (outbox), audit event with ids only. Enqueue the re-run job (the re-run unit handles it).
6. Supersession guard: delete 03-u12 and 03-u13 code if present (reviewer selection, moderator appeal queue, `reviewer_id`, GET /v1/moderation/appeals) and their tests. `appeal.reviewer_id` is replaced by `rerun_run_id`.
7. Tests: window boundary with fake clock; one per decision; non-initiator 404; grounds schema failure maps to fieldErrors; zero-penalty; no state change on filing.
8. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Filing never changes the target state.
- No human reviewer fields or queue endpoints remain.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- The re-run (next unit).
- Timeline read endpoint (re-run and label units extend it).
