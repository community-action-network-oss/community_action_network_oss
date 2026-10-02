---
id: "02-u10"
plan: "02"
title: "Problems schema, jurisdictions and list endpoint"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 18
depends_on: ["02-u08","02-u09","02-u04"]
writes: ["src/db/schema.ts","drizzle/**","src/problems/**","src/jurisdictions/**","src/app.module.ts","src/accounts/infra/**","test/problems-list.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#3-slice-1-erd","docs/design/system-design.md#6-api-surface-v1","docs/spec/constitution/rules.md#RANK-1","docs/spec/constitution/rules.md#DECENT-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/problems-list.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["28c72f8"]
actual_hours: 0.1
---
## Objective
Create the problem and problem_event tables and the first read endpoints: GET /v1/jurisdictions and GET /v1/problems. Read only; writes arrive in plan 03.

## Steps
1. Append to src/db/schema.ts: problem (id, initiator_id fk, schema_id, schema_version, schema_hash (the structured-content version the body was validated against, filled by 10-u29; nullable until then), plan_version int default 1 (the stage plan version, changed only by T22, 12-u09), review_requested_at timestamptz null (set by T01), no_source_note text null, jurisdiction_id fk, state text, title, condition (the structural statement), affected, coarse_area, desired_outcome, observed, uncertain, evidence_tier text null, investigation_needed bool default false, pending_transition jsonb null, resume_state text null, pause_reason, resume_condition, duplicate_of fk null, version int default 1, published_at, tombstoned_at, withdrawn_published bool default false, purge_after, created_at, updated_at, origin_node_id, protocol_version; NO owner column, OWN-1; all content text columns nullable because drafts are partial and retention purges scrub them) and problem_event (id, problem_id fk, type, actor_id, from_state, to_state, reason, payload jsonb, prev_hash null, origin_node_id, protocol_version, occurred_at). Indexes: (state, published_at desc, id), a GIN tsvector index on title + condition for q.
2. npm run db:generate; then a custom migration revoking UPDATE and DELETE on problem_event from can_app_rw (pattern from the accounts-schema unit) and extend its grants test.
3. Replace the placeholder HasPublishedContent repo with a real one (account has a published problem as initiator).
4. GET /v1/jurisdictions (public): {items:[{id,name,kind,isFictional,emergencyNotice}]}. GET /v1/problems (public): published problems only (published_at not null and state not in draft, in_review, needs_revision, held, rejected, and excluding pre-publication withdrawn), filters state, jurisdictionId, q (plainto_tsquery), cursor keyset on (published_at desc, id desc), limit default 20 max 50 via the kernel helpers. Each item: id, title, state, label (from STATE_COPY; for `active` the plain label until the stage chip data exists, then "Active: stage {name}" or "Active: {n} stages in progress" through a StageChipPort whose null object returns null, implemented by 12-u02), jurisdiction name, coarseArea, investigationNeeded, publishedAt, policyVersion (null until a moderation run has decided, populated by plan 09), transitional boolean (INTERIM-1), reopened boolean (T20 or T21, D-59), isSeed boolean (default false; SIM-LABEL-1, set by 11-u13) and syntheticEvidence boolean. The response also has criteria: {order: "published_at_desc", usesEngagementSignals: false} (RANK-1).
5. Mark both endpoints @Public. DTOs and operationIds: listJurisdictions, listProblems.
6. Tests (e2e, direct inserts): private states never appear; pagination returns stable non-overlapping pages; q matches; the response has no engagement fields (assert exact key set); unauthenticated access works; OpenAPI has no owner field on problem schemas (OWN-1).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A guest can list only published problems, ordered by publication time only.
- problem_event rejects UPDATE and DELETE under the restricted role (test).
- RANK-1 criteria object is present and tested.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Detail endpoint (next unit).
- Creating or changing problems (plan 03).
