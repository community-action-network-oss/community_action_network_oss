---
id: "04-u04"
plan: "04"
title: "Proposals endpoints and T08, T09, T10 field enforcement"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 73
depends_on: ["04-u03", "10-u29"]
writes: ["src/proposals/**","src/problems/app/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/proposals.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#6-contributions","docs/design/system-design.md#6-api-surface-v1","docs/design/ux/wireframes/participate.md#WF-PROPOSAL-1","docs/design/ux/wireframes/participate.md#WF-PROPOSAL-2"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/proposals.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Add proposals (a structured submission validated against the pinned proposal schema through 10-u29) and enforce the lifecycle-spec required fields for T08 (eligible to solution_development), T09 (to solution_selection) and T10 (back) through the engine.

## Steps
1. Schema proposal: id, problem_id, author_id, summary, mechanism, success_metric, risks, verification_plan, status (draft|submitted|withdrawn), created_at, updated_at, origin_node_id, protocol_version. Migration via db:generate.
2. POST /v1/problems/{id}/proposals (member; problem state solution_development or solution_selection per the allowed contribution types, proposed_solution), PATCH /v1/proposals/{id} (author) while the problem is in solution_development, GET /v1/problems/{id}/proposals (public) returning comparison data in a fixed order of creation, no scores or votes.
3. Proposals are subject to the same deterministic checks and blocking moderation run as contributions (09-u40, 09-u41): model a proposal submission as a contribution of type proposed_solution that carries a proposal row (contribution_id fk on proposal); status follows the contribution status; only published (accepted) proposals count for T09. The proposal text columns hold the validated structured answers; the schema, not this unit, names the fields.
4. Field enforcement in the engine context for the transitions endpoint: T08 requires stageSummary {established, disputed} (an initiator action, no run decides it) and 1+ evidence URL or a missingEvidenceNote (use accepted evidence contributions or the note); T09 requires 2+ accepted proposals each with mechanism, successMetric, risks, verificationPlan, OR 1 proposal plus noAlternativesNote; T10 requires reason. Missing items come back as fieldErrors naming what is missing.
5. Context providers (src/problems/app/transition-context.ts) compute counts server-side; the client cannot assert them.
6. Tests: field enforcement per transition including each missing piece; proposals only in allowed states; unaccepted proposals do not count; list has no score fields.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- T08, T09, T10 fail with precise fieldErrors when required fields are missing.
- The server computes proposal counts, never the client.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Decision record (next unit).
- Voting or scoring (not in slice 1).
