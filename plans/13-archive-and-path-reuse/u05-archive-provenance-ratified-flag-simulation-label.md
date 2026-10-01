---
id: "13-u05"
plan: "13"
title: "Archive provenance, ratified flag, simulation label, annotation and retraction"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.2
priority: 404
depends_on: ["13-u04"]
writes: ["src/archive/app/curation/**","src/archive/http/**","src/db/schema.ts","drizzle/**","openapi/openapi.json","test/archive-curation.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#12-abuse-and-poisoning","docs/design/ai/archive-reuse.md#11-cold-start","docs/spec/24-archive-reuse.md#241-the-archive-record","docs/spec/constitution/rules-legal-sim.md#ARCHIVE-1","docs/design/components/server.md"]
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
The ratified flag and provenance that retrieval depends on, the visible "simulated" label, and the policy-governed way to annotate, de-rank or withdraw a harmful or legally invalid record. Nothing is removed silently.

## Steps
1. `ratified` is set only by the DP-ARCHIVE publish path of a platform terminal state from a problem that passed DP-PUBLISH; there is no endpoint that creates or imports an archive record from outside (route test over the router). A DB check forbids `ratified = true` without `quality.dp_archive_run_id` and without a published `problem_ref` mapping.
2. Provenance: `provenance` jsonb on the record (run ids of the DPs that admitted the problem and the record, policy, schema and corpus versions); the public `GET /v1/archive/{id}` includes a `provenance` block with run ids only (no content of runs).
3. Simulation: `source = simulation` records always carry the public label "Seed problem, synthetic evidence" (SIM-LABEL-1) in the API field `label`, are excluded from every outcome statistic (a SQL view `archive_outcome_stats` filters `source = real`), and are retrievable by the cold-start suggestions only when `ARCHIVE_ALLOW_SIMULATION=true` (default true in slice 1, SIM-GATE-1) and shown with the label.
4. Curation action `curateArchiveRecord(id, action, reason)` with actions `annotate`, `derank`, `withdraw`: system or steward only (no public endpoint accepts it from members), writes an `archive_annotation` row (action, reason, rule ids, actor kind, policy version, created_at) and a visible public note; a withdrawn record is tombstoned in lists and keeps its id and note; retrieval excludes withdrawn records and multiplies the score of de-ranked ones by the pack value `archive.derank_factor`. DP-RERESOLUTION (plan 09, 09-u61) uses the same action when a record's cited legal basis changed.
5. Revisions: append-only `archive_revision` list for corrections (field, old hash, new hash, reason); the record body is never edited in place.
6. Run `npm run openapi` and `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit it.
7. Tests: no route creates a record; ratified needs a run id; a simulated record is labelled and absent from the stats view; annotate and withdraw leave a visible note and the history; a de-ranked record scores lower in a retrieval fixture; withdrawn records vanish from search but stay readable by id as tombstones.

## Acceptance
- Retrieval can rely on `ratified` as a database-enforced invariant.
- Simulation records are labelled everywhere and never in outcome statistics.
- Every curation action leaves a visible note and a row.
- `npm run verify` is green.

## Out of scope
- Retrieval itself (13-u09).
- The decision to withdraw a record (policy governs it; no UI for it here).
