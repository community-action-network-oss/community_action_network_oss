---
id: "03-u09"
plan: "03"
title: "Moderation schema, rule registry, queue and problem decisions read"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 46
depends_on: ["03-u07"]
writes: ["src/moderation/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/moderation-read.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/design/system-design.md#2-can-server-module-boundaries","docs/design/system-design.md#6-api-surface-v1","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/design/ux/wireframes/moderation.md#WF-MOD-QUEUE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-read.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Create the moderation_decision table with database constraints that enforce MOD-EXPLAIN-1, publish the moderator-selectable rule registry, and add the read endpoints: the review queue and the decisions of one problem.

## Steps
1. Table moderation_decision per the brief section 5: id, target_type ("problem" | "contribution"), target_id (uuid, no FK because contributions arrive in plan 04; add a CHECK on target_type), outcome ("published" | "needs_revision" | "rejected" | "contribution_accepted" | "contribution_hidden" | "closed_confirmed" | "redirected_confirmed" | "solved_confirmed"), rule_ids text[] NOT NULL with CHECK cardinality > 0, field_ref text, span_start int, span_end int, revision_hint text, safety_sensitive bool default false, policy_version text NOT NULL, public_explanation text NOT NULL, internal_note text, appealable_until timestamptz NOT NULL, interim bool NOT NULL default true, needs_rereview bool default true, reviewer_disclosure text, decided_by uuid NOT NULL, created_at. CHECKs (MOD-EXPLAIN-1): for outcomes needs_revision and rejected, field_ref NOT NULL and (revision_hint NOT NULL or safety_sensitive); span_start and span_end both set or both null with start < end.
2. src/moderation/domain/rules.ts: SELECTABLE_RULES = [{id, plainText}] limited to ids that exist in docs/spec/constitution/rules.md (SCOPE-1, PRIV-GATE-1, NAME-1, EVID-URL-1, PUB-FAILCLOSED-1 and any other that a moderator can lawfully cite on intake) with calm plain-language texts, and POLICY_VERSION = "slice1-0". Test parses rules.md and asserts each id exists.
3. GET /v1/rules (public): {policyVersion, items:[{id, plainText}]}. GET /v1/moderation/queue (moderator): submissions in submitted state oldest first with {problemId, title, coarseArea, waitingSince, keptFlags (count and kinds), repostMatch, language label}; cursor paged; plus an items-type query param type=submissions|appeals (appeals returns an empty list until the appeals units; keep the shape). GET /v1/problems/{id}/moderation (initiator or moderator): decisions for the problem; the initiator sees fieldRef, revisionHint, spans, publicExplanation, appealableUntil, ruleIds with texts; internalNote only for moderators.
4. Role guard: moderator only for the queue (403 not_permitted otherwise). Mark GET /v1/rules public. Update the grants migration if the restricted role needs table grants.
5. Tests: DB constraint tests (insert missing rule_ids, missing field_ref for rejected, null hint without safety_sensitive each fail); queue ordering oldest first; non-moderator 403; initiator never sees internalNote; /v1/rules lists only registry ids.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.
7. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- MOD-EXPLAIN-1 is enforced by the database, proven by failing inserts.
- internal_note never appears in any non-moderator response (key-set test).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Making decisions (next unit).
- Appeals.
