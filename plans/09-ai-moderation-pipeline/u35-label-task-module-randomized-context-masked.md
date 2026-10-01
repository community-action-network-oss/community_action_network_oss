---
id: "09-u35"
plan: "09"
title: "label_task module: randomized, context-masked, quorum fixed up front"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 264
depends_on: ["09-u34","09-u30","09-u02"]
writes: ["src/label-tasks/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/label-tasks.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/appeals.md#steps","docs/open-questions/OQ-label-task-panel.md","docs/design/ux/wireframes/moderation.md#WF-LABEL-1","docs/design/ai/amendment-loop.md","docs/design/ai/safety-and-privacy.md#abuse-of-the-policy-process","docs/design/ai/evaluation.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/label-tasks.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
When the independent re-run upholds and the appellant disputes, create a label task: an exact question, a masked copy, a fixed panel size and consensus rule set before labels arrive, labelers drawn at random, labels collected before the aggregate is shown, disagreement recorded.

## Steps
1. Tables label_task (id, appeal_id null, source appeal|eval, question text, rule_id, masked_input jsonb, panel_size, consensus_rule jsonb, status open|closed|aggregated, jurisdiction_needed, label, disagreement jsonb, created_at) and label (task_id, labeler_id, label yes|no|unsure, conflict, created_at; unique task+labeler). Panel size and consensus rule come from pack values (`labels.panel_size`, `labels.consensus`) and are stored on the task at creation (OQ-label-task-panel is open: default 5 labelers, 2 of 3 majority proposal; constants only in the pack fixture).
2. Creation from `POST /v1/appeals/{id}/dispute`: question "Does rule R apply to this text?", masked input from the mask unit, no appellant or author identity. Task creation is idempotent per appeal.
3. Randomized assignment: eligible labelers (role labeler, not the appellant, not conflicted, jurisdiction match where `jurisdiction_needed`, cross-jurisdiction preference from config) drawn with injected Random; GET /v1/review/work (extend from the audit unit) lists assigned tasks; GET /v1/review/label/{id} and POST /v1/review/label/{id}/labels {label, conflict?}.
4. Independence: aggregate is computed only when the quorum is in; no individual label or running count is visible to other labelers (test); appellant timeline shows only "3 of 5 labels in" style counts.
5. On aggregate: store label and disagreement record (split is recorded as an ambiguous-rule signal, the instance stays decided as is with an explanation), status aggregated, and emit `label_task.aggregated` for the proposal unit.
6. Tests: random assignment excludes conflicted and the appellant; quorum fixed at creation even if pack values change later; independence; split vote path; eval-source tasks (source eval) can be created by a service call for plan 11 later.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Quorum and consensus rule are stored before any label exists (test).
- No label visible to other labelers before aggregation.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- PR creation (next).
- Labeler UI.
