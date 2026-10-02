---
id: "03-u09"
plan: "03"
title: "Moderation decision table and public rule registry"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 46
depends_on: ["03-u07"]
writes: ["src/moderation/**", "src/db/schema.ts", "drizzle/**", "src/app.module.ts", "test/moderation-read.e2e-spec.ts", "openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals", "docs/design/system-design.md#2-can-server-module-boundaries", "docs/design/system-design.md#6-api-surface-v1", "docs/spec/constitution/rules.md#MOD-EXPLAIN-1", "docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-read.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["d89404e"]
actual_hours: 0.1
---
## Objective
Create the moderation_decision table with database constraints that enforce MOD-EXPLAIN-1 and publish the rule registry (GET /v1/rules). There is no moderator queue and no human decider: decisions are written by moderation runs (09-u22, 09-u23). 09-u03 migrates this table to the AI model (adds run_id, dp_id, confidence, model_id, prompt_hash, transitional) and 09-u24 owns the per-problem decisions read.

## Steps
1. Table moderation_decision: id, target_type ("problem" | "contribution"), target_id (uuid, no FK because contributions arrive in plan 04; add a CHECK on target_type), outcome ("published" | "needs_revision" | "rejected"; 09-u03 widens it to the AI outcomes; these three map to T04, T02 and T05 of the publication decision DP-PUBLISH, 12-u08), rule_ids text[] NOT NULL with CHECK cardinality > 0, field_ref text, span_start int, span_end int, revision_hint text, safety_sensitive bool default false, policy_version text NOT NULL, public_explanation text NOT NULL, appealable_until timestamptz NOT NULL, interim bool NOT NULL default true (legacy name; 09-u03 replaces it with transitional and drops it), decided_by uuid NULL (no human decider: null for run decisions; only the emergency/legal lane logs a person, 09-u38), created_at. No internal_note, reviewer_disclosure or needs_rereview column. CHECKs (MOD-EXPLAIN-1): for outcomes needs_revision and rejected, field_ref NOT NULL and (revision_hint NOT NULL or safety_sensitive); span_start and span_end both set or both null with start < end. Insert-only for the app role (NO-INSTANCE-OVERRIDE-1: decisions are never edited; a changed outcome is a new decision).
2. src/moderation/domain/rules.ts: RULES = [{id, plainText}] limited to ids that exist in docs/spec/constitution/rules.md (SCOPE-1, PRIV-GATE-1, NAME-1, EVID-URL-1, PUB-FAILCLOSED-1 and any other that a decision can cite on intake) with calm plain-language texts, and POLICY_VERSION = "fixture-1" as a placeholder replaced by the active pack version once 10-u04 lands. Test parses rules.md and asserts each id exists.
3. GET /v1/rules (public): {policyVersion, items:[{id, plainText}]}. Do NOT add any queue endpoint, role-guarded decision endpoint or POST /v1/moderation/decisions: no person reviews or decides single items.
4. Update the grants migration if the restricted role needs table grants (select and insert only).
5. Tests: DB constraint tests (insert missing rule_ids, missing field_ref for rejected, null hint without safety_sensitive each fail); UPDATE and DELETE fail under the app role; /v1/rules lists only registry ids; no route under /v1/moderation/queue exists.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.
7. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- MOD-EXPLAIN-1 is enforced by the database, proven by failing inserts.
- The table has no human-decider, internal-note or disclosure columns beyond a nullable decided_by, and no queue route exists.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Writing decisions (09-u23) and the per-problem decisions read (09-u24).
- The AI-model columns (09-u03).
- Appeals (09-u33).
