---
id: "04-u05"
plan: "04"
title: "Stage choice gate and decision record (CHOICE-GATE, layered and cited legal-gate record)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 74
depends_on: ["04-u04", "12-u02", "10-u70"]
writes: ["src/decisions/**","src/stages/app/choice/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/decision-record.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01b-stages.md", "docs/spec/01-slice-1-brief.md#2-slice-1-defaults", "docs/spec/constitution/rules.md#LEGAL-GATE-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/spec/constitution/rules.md#INTERIM-1", "docs/open-questions/OQ-stage-decision-method.md", "docs/open-questions/OQ-legal-policy-reviewers.md", "docs/design/ux/wireframes/stages.md#WF-STAGE-1", "docs/design/ux/wireframes/participate.md#WF-DECREC-2"]
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
Record how a stage's choice was made: chosen option ids or steps, decision method, rationale, decider, authority, optional dissent, and the legal-gate check record cited per legal layer (L0 to L6, D-61). The decision record now records a `stage_choice` (lifecycle v2, D-72). No voting rule is built here: the method is the stage's `decision_method` (default `poster_after_input`, `OQ-stage-decision-method`) and the record shows who decided under what authority. The record is a structured submission validated against the `decision_record` schema (10-u29). This unit implements the `ChoiceGatePort` that 12-u02's choice endpoint calls (`CHOICE-GATE`, docs/spec/01b-stages.md 4b.5: `DP-DECISION-RECORD` and `DP-LEGALITY`, run through 09-u41); it holds if a required part is missing and never decides which option is best.

## Steps
1. Schema decision_record: id, problem_id, stage_id, stage_choice_id unique, method text (from the stage's decision_method), rationale NOT NULL, decided_by, authority NOT NULL (who and under what rule, e.g. "Provisional steward under the founding rules"), dissent_notes null, transitional bool default false (INTERIM-1), policy_version null (set by the run, 09-u41), decided_at, withdrawn_at null; and legal_gate_record: id, decision_record_id, findings jsonb (one entry per legal layer L0 to L6 that applies: layer, provision or article, corpus version, finding clear or blocked, LEGAL-CITE-1), pack_version text, outcome ("clear" | "blocked"; a topic forbidden by local law never reaches a decision record, it is refused at problem intake, TOPIC-FORBIDDEN-1), constraint_text null, source_ref null, checked_by (the run id), checked_at. LEGAL-GATE-1 and LEGAL-CITE-1: outcome blocked requires constraint_text, source_ref and at least one finding that names a layer and a provision (CHECK).
2. `ChoiceGatePort` adapter: called by `POST /v1/stages/{id}/choice` (12-u02) in the same transaction as the `stage_choice` insert. A clear gate writes `decision_record` and `legal_gate_record` and keeps the choice; a missing required part (rationale, authority, method) returns `needs_revision` with a hint and stores nothing as chosen; a blocked gate stores the gate record and does not keep the choice, and returns the blocked-stage hint: the stage becomes `blocked` through ST07 (applied by the run, 12-u06 and 09-u42), and the problem becomes `stuck` (T13) only when no required stage can proceed. The client-supplied legalGate is only the decider's own statement and never trusted: the run result (09-u41) fills it server-side.
3. `GET /v1/stages/{id}/decision` (public after publish) returns the record with policyVersion, the transitional flag, the plain text "Decided under policy vX" (plus "Policy vX, transitional stewardship" when transitional) and the legal-gate record per layer. A withdrawn choice (while the stage is `active`, 12-u02) keeps its record, marked withdrawn; a new choice writes a new record. The record is append-only: no PATCH or DELETE endpoint.
4. Tests: happy path with the default method; decider only (a non-decider gets 403 at the choice endpoint); a missing rationale holds with a hint; a blocked gate needs constraint and source (DB and API) and a layered finding; withdraw keeps the old record; a planned stage cannot take a choice; no editing endpoint exists (OpenAPI check).
5. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- No vote, no score: only rationale, method, authority.
- LEGAL-GATE-1: a blocked check without constraint and source cannot be stored.
- Decision is publicly readable and shows the policy version.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The stage transitions ST04 to ST08 and tasks (12-u06, plan 05).
- Decision panels or voting (later phases).
