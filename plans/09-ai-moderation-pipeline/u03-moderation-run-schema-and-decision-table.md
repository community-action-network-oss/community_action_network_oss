---
id: "09-u03"
plan: "09"
title: "moderation_run schema and decision table migration to the AI model"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 232
depends_on: ["03-u09","02-u04"]
writes: ["src/moderation/domain/**","src/moderation/infra/schema-notes.md","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/moderation-run-schema.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/runtime.md#run-record","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#INTERIM-1","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-run-schema.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Create the immutable moderation_run table and migrate the moderation_decision table that 03-u09 created from human decisions to AI decisions. Constraints enforce MOD-EXPLAIN-1 and keep raw text out of runs.

## Steps
1. Table moderation_run per runtime.md "Run record": id uuid v7, event_id, target_kind, target_id, target_version int, dp_id, mode (blocking|async), trigger (pre_publication|update|policy_change|context_change|sample|appeal|replay|advisory), policy_version, pack_hash, stage_prompt_hashes jsonb, stage_models jsonb (model_id, provider, route_reason small|escalated|variant), inputs_hash bytea, outputs jsonb, outcome, rule_ids text[], field_ref, revision_hint, confidence numeric, public_explanation, tokens_in, tokens_out, latency_ms, cost_micro_usd bigint, cache (hit|miss|bypass), status (complete|held|failed|superseded), held_reason text, shadow bool, created_at. Unique run key on (target_id, target_version, dp_id, policy_version, trigger) for non shadow rows (idempotency). CHECK outcome in the six values only. CHECK escalate_human only when dp_id in (DP-CRISIS, DP-LEGAL). No text column except the explanation and hint, which are output-gated by a later unit; outputs hold spans as offsets.
2. Migrate moderation_decision (created by 03-u09; read its migration before writing yours): add run_id fk, dp_id, confidence, model_id, prompt_hash, transitional bool (replaces interim), superseded_by null; make decided_by nullable (system actor is run_id; lane decisions set it); widen the outcome CHECK to the six AI outcomes in addition to the legacy values, accept both reject and rejected; keep the MOD-EXPLAIN-1 CHECKs for needs_revision, reject and rejected. Never edit an existing migration; add a new one with `npm run db:generate`.
3. Supersession guard: if routes from 03-u09 or 03-u10 exist, delete GET /v1/moderation/queue and POST /v1/moderation/decisions, their DTOs and tests (human moderator decisions are replaced by runs, D-51). Keep GET /v1/rules and the rule registry. Record the deleted routes in the commit message.
4. src/moderation/domain/outcome.ts: pure outcome type, `isTerminalForState`, and `assertEscalationAllowed(dpId, outcome)`. src/moderation/domain/hold-reasons.ts: the closed hold reason code list from safety-and-privacy.md fail-closed matrix (provider_timeout, schema_invalid, low_confidence, language_unsupported, pack_missing, budget_exhausted, canary_tripped, gateway_failure, policy_conflict).
5. Grants: moderation_run is insert-only for the app role (no UPDATE or DELETE except status moves done by a SECURITY DEFINER function or a narrow column grant; pick the narrow column grant on status, held_reason, superseded and say so in the migration comment).
6. Tests (db): constraint failures (bad outcome, escalate_human from DP-TONE, missing rule_ids on reject, duplicate run key), insert ok for a complete run, decision row requires run_id for new AI outcomes.
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Run rows cannot hold an invalid outcome or an escalation outside DP-CRISIS and DP-LEGAL (DB tested).
- MOD-EXPLAIN-1 still enforced by the database on decisions.
- The human moderator queue and decision routes are gone if they existed.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Writing runs (next unit).
- Reading endpoints.
- Notices, appeals tables.
