---
id: "05-u02"
plan: "05"
title: "Verification evidence and the solved check (T15, DP-VERIFICATION on the final acceptance criteria)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 91
depends_on: ["05-u01", "12-u07", "13-u01"]
writes: ["src/verification/**", "src/problems/app/**", "src/stages/app/final-check/**", "src/db/schema.ts", "drizzle/**", "src/app.module.ts", "test/verification.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#4-lifecycle", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/spec/01-slice-1-brief.md#7-what-solved-means", "docs/spec/24-archive-reuse.md", "docs/spec/constitution/rules.md#EVID-URL-1", "docs/spec/constitution/rules.md#VERIFY-1", "docs/spec/constitution/rules.md#INTERIM-1", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/open-questions/OQ-solved-evidence-threshold.md", "docs/design/ux/wireframes/participate.md#WF-TASK-2", "docs/design/ux/wireframes/stages.md#WF-STAGE-2"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/verification.e2e-spec.ts"]
founder_gate: false
defaults: "The solved evidence threshold follows brief section 7 (one tagged URL per final criterion plus an outcome statement); log nothing new, OQ-solved-evidence-threshold already holds the question."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Verification evidence as URL plus attestation (a structured submission, verification schema 10-u11), and the solved path of lifecycle v2: `solved` is judged only against the final acceptance criteria (T15, `DP-VERIFICATION`, `DP-EVIDENCE-TIER`). The system proposes T15 when the last required stage resolves (12-u06), or the poster proposes it; a moderation run decides (09-u42). A "not met" result changes no state, shows the unmet criteria, and new work needs a plan change (T22, 12-u09). On `solved` the archive record is built by the archive module (13-u01, `ARCHIVE-1`); this unit builds no resolution record.

## Steps
1. POST /v1/problems/{id}/verification-evidence (member; problem `active`): body {stageId?, url, kind ("official_page" | "record" | "dated_observation" | "independent_statement"), observedAt (date), attestation (text: who observed or published it, by public role, never a personal name; run the NAME-1 detector), criterionIds[]?, note?}. Stores a contribution of type verification_evidence (allowed in `active` and `blocked` stages and at problem level, not in planned stages, `STAGE-PREP-1`) plus evidence_ref with attestation (EVID-URL-1: URL, category, date, attestation only; no upload route); when aimed at a stage the steward may attach it as `stage_evidence` (12-u10); checked by the blocking moderation run like other contributions (09-u40), exempt from cooldown; the body is validated against the pinned schema through 10-u29.
2. T15 prerequisites in the engine context (the server computes them, the client cannot assert them): every required stage `resolved` or `skipped` and, for each final acceptance criterion, 1+ evidence id (URL tagged `verification_evidence` or `stage_evidence`, published) plus an outcome statement against that criterion. A promise or completed task alone never qualifies (`VERIFY-1`).
3. The system proposal made by 12-u06 and the poster's own proposal both carry criterionEvidence and outcomeStatement; when the run accepts (09-u42, run id), the engine applies T15 and its effects write the follower notifications and emails through the plan 04 fan-out and trigger the archive record build (13-u01 registers a TransitionEffects handler on T15). A person never confirms.
4. Table `final_check_result` (id, problem_id, attempt, run_id, decision_id, per_criterion jsonb [{criterionId, met, why, evidenceIds}], outcome met|not_met|held, policy_version, transitional bool, rule_ids text[], created_at; insert-only for the app role) and `GET /v1/problems/{id}/final-result` (public): per-criterion results, "Decided under policy vX", the unmet criteria with what would help, and the archive record id once built. A not-met result sets no state and offers the plan change prefill (12-u09); a held run leaves the problem `active` and retries.
5. Tests: evidence validations (bad URL, personal name in attestation flagged, upload route absent from OpenAPI); T15 refused with an unresolved required stage and with a final criterion that has no evidence; unaccepted evidence does not count; the system proposal then a run-actor accept (FakeModel) makes the problem solved and triggers the archive hook once; "not met" leaves the state and returns the unmet criteria; a human actor cannot apply T15; a completed task alone never qualifies.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- `solved` needs every required stage resolved or skipped and every final criterion met with evidence (test).
- The final result carries per-criterion results, the policy version and the transitional flag, and is never overwritten.
- No file upload route exists in OpenAPI (EVID-URL-1 test); no `/v1/resolutions` route exists.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- The archive record itself and its public routes (13-u01, `GET /v1/archive`).
- The deciding run (09-u42) and reopening a solved problem (T21 re-resolution, plan 09).
- Stage-level evidence resolution (12-u07).
