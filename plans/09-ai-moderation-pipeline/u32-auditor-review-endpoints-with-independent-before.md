---
id: "09-u32"
plan: "09"
title: "Auditor review endpoints with independent-before-aggregate and disagreement tracking"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 261
depends_on: ["09-u31","09-u02"]
writes: ["src/review/http/**","src/review/app/audit-review.ts","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/audit-review.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/moderation.md#WF-AUDIT-1","docs/design/ux/wireframes/moderation.md#WF-AUDIT-2","docs/design/ai/amendment-loop.md","docs/design/ai/safety-and-privacy.md#bias-monitoring-across-jurisdictions","docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/audit-review.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Auditors list their work (random order, no counts as status), open a masked sampled decision, record an agree, disagree or unclear verdict, and their verdict is stored BEFORE any group result is visible. A disagreement is tracked per rule and DP and can seed a policy proposal. It never changes the item.

## Steps
1. GET /v1/review/work (auditor or labeler; shuffled, stable per session; no totals): {auditSamples:[{reviewRef, whyPicked, dpLabel, jurisdiction}], labelTasks: []} (label tasks join in the label unit). 403 not_permitted for others naming the role.
2. GET /v1/review/audit/{reviewRef}: the masked view from the mask unit plus the rule text as written. POST /v1/review/audit/{reviewRef}/reviews {verdict agree|disagree|unclear, note?, conflict?}; one per auditor per sample; `conflict:true` removes the reviewer from this sample and excludes the verdict; the group aggregate is available only after the caller submitted (test that GET never includes others verdicts before).
3. Table audit_review (id, sample_id, reviewer_id, verdict, note, conflict, created_at; unique sample+reviewer) and view `rule_disagreement` (rule_id, dp_id, jurisdiction, agree, disagree, unclear) counted; GET /v1/review/disagreements (steward and auditors, aggregates only).
4. Proposal seed: a `disagree` with a note writes a `policy_proposal_seed` row (rule id, redacted note, review_ref) consumed by the later PolicyProposalPort unit; no PR is made here.
5. NO-INSTANCE-OVERRIDE-1: no endpoint in this unit mutates a decision or state (route-table test in the lane unit also checks).
6. Tests: role guard; random order not sorted by anything stable across sessions; independence rule; one verdict per sample; conflict handling; aggregates only; note never echoes unmasked text (reuse masking fixture).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Verdict recorded before aggregate is visible (test).
- No route changes a decision.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Label tasks (label unit).
- UI.
