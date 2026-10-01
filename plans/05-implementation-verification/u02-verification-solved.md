---
id: "05-u02"
plan: "05"
title: "Verification evidence, T13, T14 solved proposal and Resolution records"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 91
depends_on: ["05-u01"]
writes: ["src/verification/**", "src/resolutions/**", "src/problems/app/**", "src/db/schema.ts", "drizzle/**", "src/app.module.ts", "test/verification.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01-slice-1-brief.md#7-what-solved-means", "docs/spec/constitution/rules.md#EVID-URL-1", "docs/spec/constitution/rules.md#INTERIM-1", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/open-questions/OQ-solved-evidence-threshold.md", "docs/design/ux/wireframes/participate.md#WF-TASK-2", "docs/design/ux/wireframes/browse.md#WF-RESOLUTION-1"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/verification.e2e-spec.ts"]
founder_gate: false
defaults: "The solved evidence threshold follows brief section 7 (one tagged URL plus an outcome statement); log nothing new, OQ-solved-evidence-threshold already holds the question."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Verification evidence as URL plus attestation (a structured submission, 10-u11 verification schema), the failed-check path (T13), and the solved path: the initiator proposes (T14), a moderation run decides (09-u42: DP-VERIFICATION, DP-EVIDENCE-TIER), producing a Resolution record under a policy version. This unit builds the proposal, the prerequisites and the record; it builds no confirm path.

## Steps
1. POST /v1/problems/{id}/verification-evidence (member; problem in verification or implementation): body {url, kind ("official_page" | "record" | "dated_observation" | "independent_statement"), observedAt (date), attestation (text: who observed or published it, by public role, never a personal name; run the NAME-1 detector), note?}. Stores a contribution of type verification_evidence plus evidence_ref with attestation (EVID-URL-1: URL, category, date, attestation only; no upload route), checked by the blocking moderation run like other contributions (09-u40), exempt from cooldown; the body is validated against the pinned schema through 10-u29.
2. T13 (verification to implementation) by the initiator or a moderation run (DP-VERIFICATION): required failed-check note and evidence ids; new tasks allowed afterwards.
3. T14 propose (initiator) requires 1+ published evidence_ref tagged verification_evidence and outcomeStatement (max from the schema) that answers the chosen proposal success metric (store both next to each other in the pending transition). The proposal is the input to the run; when the run decides accept (09-u42, with the run id) the engine applies T14, and this unit's resolution writer creates the resolution_record with the run's policy_version and emits notifications and emails to followers through the plan 04 fan-out. A person never confirms. A task completed alone never allows T14 (test).
4. Schema resolution_record: id, problem_id (not unique: history is kept), kind (solved|closed|redirected), outcome_statement, reason_code, explanation, destination, route_text, evidence_ref_ids jsonb, decision_id, policy_version, transitional bool default false (INTERIM-1), superseded_by null (a re-resolution T23 or T24 keeps the old record and links the new one, D-59; never deleted), created_at, origin_node_id, protocol_version. Endpoints: GET /v1/resolutions (public, cursor, newest first, filter kind) and GET /v1/problems/{id}/resolution (public). Response includes policyVersion ("Decided under policy vX"), the transitional flag, and the history of superseded records.
5. Tests: evidence validations (bad URL, personal name in attestation flagged, upload route absent from OpenAPI), T14 without evidence fails, with unaccepted evidence fails, propose, then a run-actor decision (FakeModel) creates the record with the run's policy version, a human actor cannot apply T14, T13 loop back to implementation, resolutions listing and filter.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A promise or completed task alone cannot produce solved (test).
- The Resolution record carries the policy version, the transitional flag and evidence ids, and is never overwritten.
- No file upload route exists in OpenAPI (EVID-URL-1 test).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Closed and redirected resolutions (later unit).
- The deciding run (09-u42) and reopening a solved problem (T24 re-resolution, plan 09).
