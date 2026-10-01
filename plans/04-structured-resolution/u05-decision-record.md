---
id: "04-u05"
plan: "04"
title: "Decision record and legal-gate record"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 74
depends_on: ["04-u04"]
writes: ["src/decisions/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/decision-record.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#2-slice-1-defaults","docs/spec/constitution/rules.md#LEGAL-GATE-1","docs/open-questions/OQ-decision-method.md","docs/open-questions/OQ-legal-policy-reviewers.md","docs/design/ux/wireframes/participate.md#WF-DECREC-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/decision-record.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Record how a solution was chosen: chosen proposal, method, rationale, decider, authority, optional dissent, and the legal-gate check record. No voting rule (a recorded decision with rationale). Executing T11 itself waits for tasks in plan 05.

## Steps
1. Schema decision_record: id, problem_id, proposal_id unique, method text (default "recorded decision with rationale"), rationale NOT NULL, decided_by, authority NOT NULL (who and under what rule, e.g. "Provisional steward under slice 1 rules"), dissent_notes null, interim bool default true, decided_at; and legal_gate_record: id, decision_record_id, checked_against ("constitution" | "jurisdiction pack"), pack_version text, outcome ("clear" | "blocked"), constraint_text null, source_ref null, checked_by, checked_at. LEGAL-GATE-1: outcome blocked requires constraint_text and source_ref (CHECK).
2. POST /v1/problems/{id}/decision (initiator or moderator; problem in solution_selection): body {proposalId (must be accepted and belong to the problem), method?, rationale, authority, dissentNotes?, legalGate: {outcome, constraintText?, sourceRef?}}. Blocked outcome does not create a decision effect: it records the gate and returns the stuck-transition hint (the client then uses T15 in plan 05). GET /v1/problems/{id}/decision (public) returns the record with interim true and the plain text "Interim decision, will be re-reviewed".
3. The record is append-only: no PATCH or DELETE endpoint (changes need a new decision after T10).
4. Tests: happy path, wrong state, non-accepted proposal refused, blocked gate needs constraint and source (DB and API), initiator and moderator allowed, member 403, no editing endpoint exists (OpenAPI check).
5. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- No vote, no score: only rationale, method, authority.
- LEGAL-GATE-1: a blocked check without constraint and source cannot be stored.
- Decision is publicly readable and marked interim.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- T11 execution and tasks (plan 05).
- Decision panels or voting (later phases).
