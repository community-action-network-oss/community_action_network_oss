---
id: "05-u02"
plan: "05"
title: "Verification evidence, T13, T14 solved and Resolution records"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 91
depends_on: ["05-u01"]
writes: ["src/verification/**","src/resolutions/**","src/problems/app/**","src/moderation/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/verification.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle","docs/spec/01-slice-1-brief.md#7-what-solved-means","docs/spec/constitution/rules.md#EVID-URL-1","docs/spec/constitution/rules.md#INTERIM-1","docs/open-questions/OQ-solved-evidence-threshold.md","docs/design/ux/wireframes/participate.md#WF-TASK-2","docs/design/ux/wireframes/browse.md#WF-RESOLUTION-1"]
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
Verification evidence as URL plus attestation, the failed-check path (T13), and the solved path: the initiator proposes, a moderator confirms (T14), producing a Resolution record.

## Steps
1. POST /v1/problems/{id}/verification-evidence (member; problem in verification or implementation): body {url, kind ("official_page" | "record" | "dated_observation" | "independent_statement"), observedAt (date), attestation (text: who observed or published it, by public role, never a personal name; run the NAME-1 detector), note?}. Stores a contribution of type verification_evidence plus evidence_ref with attestation (EVID-URL-1: URL, category, date, attestation only; no upload route), reviewed by a moderator like other contributions (plan 04 flow), exempt from cooldown.
2. T13 (verification to implementation) by initiator or moderator: required failed-check note and evidence ids; new tasks allowed afterwards.
3. T14 propose (initiator) requires 1+ accepted evidence_ref tagged verification_evidence and outcomeStatement (max 800) that answers the chosen proposal success metric (store both next to each other in the pending transition); moderator confirm applies the transition, writes a moderation_decision (outcome solved_confirmed, rule ids, public explanation) with interim true, creates the resolution_record and emits notifications and emails to followers through the plan 04 fan-out. A task completed alone never allows T14 (test).
4. Schema resolution_record: id, problem_id unique, kind (solved|closed|redirected), outcome_statement, reason_code, explanation, destination, route_text, evidence_ref_ids jsonb, decision_id, interim bool default true, created_at, origin_node_id, protocol_version. Endpoints: GET /v1/resolutions (public, cursor, newest first, filter kind) and GET /v1/problems/{id}/resolution (public). Response includes the interim text "Interim decision, will be re-reviewed" while interim is true.
5. Tests: evidence validations (bad URL, personal name in attestation flagged, upload route absent from OpenAPI), T14 without evidence fails, with unaccepted evidence fails, propose then confirm by moderator creates the record, self-confirm disclosure with a pool of one, T13 loop back to implementation, resolutions listing and filter.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A promise or completed task alone cannot produce solved (test).
- The Resolution record carries the interim label and evidence ids.
- No file upload route exists in OpenAPI (EVID-URL-1 test).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Closed and redirected resolutions (later unit).
- Appeal of solved decisions (reopening is deferred).
