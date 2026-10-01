---
id: "09-u24"
plan: "09"
title: "Problem as the first ModerationTarget with checks gate and decisions read"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 253
depends_on: ["09-u23","03-u08","02-u10"]
writes: ["src/problems/app/moderation-target.ts","src/moderation/http/**","src/moderation/app/decisions-read.ts","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/moderation-problem-target.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/triggers.md#1-pre-publication-blocking","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#NO-INSTANCE-OVERRIDE-1","docs/design/ux/wireframes/submit.md#WF-DECISION-1","docs/design/components/server.md#http-surface-changes-under-d-51"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-problem-target.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Implement the ModerationTarget adapter for problems and expose what the initiator sees: decisions with hints, rule ids with plain text, policy version and appeal window. The decisions read is public contract for the app.

## Steps
1. src/problems/app/moderation-target.ts implements the port over the problem table and problem_version snapshots (03-u08). Contentful fields for the run come from the structured fields with `field_ref` (never a text blob); the synchronous deterministic checks of 03-u08 still run first at T01 and T03 and a hard failure keeps the draft with field hints and creates no decision (unchanged).
2. GET /v1/problems/{id}/moderation (initiator only; 404 for others): `{status: "decided"|"checking"|"held"|"none", decisions: [{id, dpId, outcome, ruleIds:[{id, plainText}], hints: HintDto[], fieldRef, spanStart, spanEnd, revisionHint, publicExplanation, policyVersion, transitional, appealableUntil, modelClass, promptVariant, createdAt}], appeal: null | {id, status}}`. internal_note never appears; spans are offsets only. Define the shared `HintDto {fieldRef, revisionHint, ruleIds[], policyVersion, spanStart?, spanEnd?}` in src/moderation/http/dto.ts: it is the single hint shape for decisions, the advisory check (update unit) and the app form renderer (10-u36 builds against it). Operation ids explicit, DTO classes with @ApiProperty.
3. GET /v1/problems/{id}/moderation/status (initiator): `{state: "checking"|"held"|"decided", heldReason: code|null, ageSeconds, policyVersion}` where ageSeconds is the real wait since submit (no estimates, no promises). Held reason codes map to the user-facing categories of WF-HOLD-1 (language, capacity, generic). Same shape whether the result came from the cache (no cache field).
4. Supersession guard: remove GET /v1/moderation/queue, POST /v1/moderation/decisions and any moderator-only decision read if they still exist; their absence is asserted in the lane unit but delete here first.
5. Tests: decisions visible to initiator with texts and spans, 404 for another member, internal note key absent (key-set test), status shows real age with a fake clock, held reason code mapping, T01 with FakeModel publish script ends in published through the applier.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Initiator can read decisions and live run status; others cannot.
- No moderator route to decide a problem remains.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Pre-publication submit hook (next unit).
- Notices.
