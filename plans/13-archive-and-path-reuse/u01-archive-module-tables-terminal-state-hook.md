---
id: "13-u01"
plan: "13"
title: "Archive module: tables, terminal-state hook and public read API"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 400
depends_on: ["02-u03","02-u10","03-u05","09-u05"]
writes: ["src/archive/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/archive-module.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/24-archive-reuse.md","docs/design/ai/archive-reuse.md#1-archive_record-schema","docs/design/flows/archive-on-terminal.md","docs/spec/01a-lifecycle.md","docs/spec/constitution/rules-legal-sim.md#ARCHIVE-1","docs/adr/0017-archive-and-path-reuse.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The archive module of can_server: the tables of the archive record, the hook that fires when a problem ends (ARCHIVE-1), and the public read API. Anchor unit: plan 12 and later plan 13 units build on these names. Vocabulary is exactly .claude/skills/can-code-large/briefs/archive-v1.md.

## Steps
1. Migration with `npm run db:generate` (never hand-edit drizzle/** or src/db/schema.ts conflicts; add tables in a new section). Tables: `archive_record` (id uuid v7, `problem_ref` opaque uuid with no foreign key to a person, `terminal_state` solved|closed|redirected|withdrawn|stuck, `source` real|simulation, `status` pending|published|needs_attention|withdrawn, `unresolved` bool (stuck), `previous_record_id` null (reopen chain), `snapshot` jsonb, `options` jsonb, `evidence_refs` jsonb, `costs` jsonb, `outcome` jsonb, `versions` jsonb (policy, schema, legal corpus per layer, archive schema), `quality` jsonb (completeness, ratified bool, dp_archive_run_id), `revision` int, `ended_at`, `published_at`); `context_profile` (id, `owner_kind` archive_record|problem, `owner_id`, columns for problem_type, category, population_scale, country, region, settlement_class, climate_class, resource_band, budget_band, language, jsonb for institutions[], legal_stack[], constraints[]); `executed_path_stage` (record id, stage key, name, goal, criteria jsonb, outcome resolved|skipped|blocked|abandoned, duration_band, cost_band, depends_on text[], chosen_option jsonb); `challenge` (record id, stage key, tried, why_failed_or_blocked, kind legal|resource|institutional|evidence|social|technical, resolution text, layer null L0..L6); `attribution` (record id, credit_text, source_url, license default CC-BY-4.0, handles jsonb for opted-in contributors only). CHECK constraints for the enums. A unique key on (problem_ref, ended_at) makes the build idempotent.
2. No column anywhere holds a person identifier, an email, an exact coordinate or an attestation field (LOC-PRIV-1). A schema scan test asserts it.
3. Hook: the transition engine (03-u05) already writes the domain event atomically; add the event name `problem.ended` for the terminal and stuck transitions (T13 and T15 to T18 of docs/spec/01a-lifecycle.md; a pre-publication withdrawal or rejection never fires it). A subscriber in src/archive/app enqueues a job `archive.build` on the payload queue (09-u05) keyed by (problem_id, ended_at). The handler in this unit only inserts a `pending` record with the ids (assembly is 13-u02, DP-ARCHIVE is 13-u04). The terminal transition never waits for it and never fails because of it.
4. Public read API with no authentication: `GET /v1/archive` (cursor pagination, newest first; filters `country`, `region`, `terminal_state`, `problem_type`, `language`, `q` reserved), `GET /v1/archive/{id}`. Only `status = published` rows are returned; others are 404. Responses never include `problem_ref` as a link to a poster or any contributor handle unless opted in. Operation ids `listArchive` and `getArchiveRecord`; DTOs carry explicit key sets. Add an ETag.
5. Run `npm run openapi` and `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit it.
6. Tests (db): enum CHECKs, idempotent enqueue for a duplicate event, a withdrawn-before-publication problem does not enqueue, the list never returns pending rows, the schema scan.

## Acceptance
- A terminal transition in a seeded problem creates exactly one `pending` archive_record and one queued job, and a repeat of the event creates none.
- GET /v1/archive and GET /v1/archive/{id} are public and return published records only.
- The schema scan finds no person or location column.
- `npm run verify` is green with openapi regenerated.

## Out of scope
- Record assembly (13-u02).
- DP-ARCHIVE and the privacy re-strip (13-u04).
- Vector index and retrieval (13-u07 onward).
- Gallery pages.
