---
id: "10-u31"
plan: "10"
title: "Draft schema migration: minor auto-migrate, major mapping with 30-day grace"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 31
depends_on: ["10-u29","10-u12"]
writes: ["src/policy/migration/**","src/problems/**","src/contributions/**","drizzle/**","src/db/schema.ts","test/policy/migration/**","test/fixtures/policy/**","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/design/ai/structured-content.md#8-how-schemas-change","docs/design/flows/policy-schema-change.md","docs/design/flows/structured-submission.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run openapi","git add openapi/openapi.json","npm run verify"]
founder_gate: false
defaults: "If a major bump has no migration map in the pack, refuse activation of that schema version for new drafts only after logging; in-flight drafts stay pinned (the pack CI blocks such a bump anyway, 10-u12)."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Implement the in-flight draft rules of docs/design/flows/policy-schema-change.md: a minor bump auto-migrates drafts; a major bump keeps drafts on the old version for a grace window (`grace.schema_major_draft_days`, default 30) and offers a field-mapping migration the poster confirms; after the window the draft must migrate before submit. Published content is never rewritten.

## Steps
1. Domain (`src/policy/domain/migrate.ts`): `classifyBump(from, to)` (patch, minor, major); `applyMap(body, map)` using the format from 10-u12 (copy, split, merge, drop; dropped and new required paths reported); minor migration rule: carry all answers, new optional fields empty, new bounds apply at next submit.
2. Draft states: `pinned` (on its stamped version), `migrated`. Endpoint `GET /v1/drafts/{id}/migration` returns `{current: {...}, target: {...}, bump, grace_ends_at, mapping: [{from_path, to_path, transform, carried_value, needs_confirmation}], new_required: [...], dropped: [...]}`; `POST /v1/drafts/{id}/migration` accepts the confirmed mappings, re-stamps the draft, writes `draft.schema_migrated`. Editing and autosave on a pinned draft keep working until the grace window ends; submit after `grace_ends_at` on an unmigrated draft returns `schema_migration_required`.
3. Minor and patch bumps: a job on activation (or lazy on next open) auto-migrates `draft`, `submitted` and `needs_revision` items to the new version without confirmation and records the event. A `submitted` item mid-review is evaluated by the version it was stamped with.
4. Published content: tests assert no write path touches `schema_*` columns of published rows; an owner edit opens the current version (the response includes the version) and validation covers the diff only.
5. Fixtures: add a 1.0.0 to 1.1.0 (minor) and 1.1.0 to 2.0.0 (major, with map) problem schema pair to `test/fixtures/policy/` (new pack version in the fixture dir, rebuilt by the fixture builder from 10-u04).
6. Tests: classification; each transform; minor auto-migration; major: draft stays pinned, grace countdown with an injected Clock, migration confirmation, unmapped required field returned as `new_required`, post-window submit refused; published row untouched. Regenerate OpenAPI.

## Acceptance
- Minor bump auto-migrates drafts, major keeps them pinned for the configured days then requires migration (Clock-driven tests).
- Unmapped required fields are asked fresh (returned in `new_required`).
- No code path rewrites a published item's schema version (test).
- `npm run verify` green.

## Out of scope
- The migration screen (10-u37).
- Re-moderation markers "predates field Y" on published items (plan 09 and follow-up).
