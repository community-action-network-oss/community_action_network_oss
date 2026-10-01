---
id: "11-u48"
plan: "11"
title: "Seed runs produce simulation archive records (cold start, SIM-LABEL-1)"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.2
priority: 148
depends_on: ["11-u20","11-u21","11-u47","13-u04","13-u05"]
writes: ["test/simulation/scenarios/archive/**","test/simulation/seeds/archive-export.ts","package.json"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#11-cold-start","docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/spec/24-archive-reuse.md#245-slice-1","docs/spec/constitution/rules-legal-sim.md#SIM-LABEL-1"]
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
Every seed variant that reaches a terminal state (solved, `stuck`, closed, redirected) leaves a published `archive_record` with `source: simulation` and the label "Seed problem, synthetic evidence", so the archive has something to suggest from before any real problem ends (D-76 cold start).

## Steps
1. A scenario check `archive.cold_start` after the seed 1 and seed 2 scenarios: for each terminal run assert exactly one record, `status` published by DP-ARCHIVE, `source: simulation`, the label field present, failure paths present (the blocked stage and the `stuck` ending have their `challenge` entries, ARCHIVE-1), personal data stripped (the privacy canaries of the run do not appear), and the record is excluded from the outcome statistics view.
2. `npm run sim:archive-export`: after a run, export the published simulation records as JSON in the archive_record schema to `test/simulation/fixtures/archive/` (the fixture archive the web journey 13-u28 and the reuse e2e 13-u22 can load); the export refuses anything with `source` other than simulation.
3. Record the counts in the run report (`report.archive {records, challenges, stuck_records}`) without adding them to any G criterion.
4. Tests: deterministic runs of seed 1 happy and stuck produce two records; a withdrawn pre-publication problem produces none; the export is idempotent.

## Acceptance
- Every terminal seed run has a labelled published record with its challenges.
- The export contains only simulation records.
- `npm run verify` is green.

## Out of scope
- The reuse scenario (11-u49).
