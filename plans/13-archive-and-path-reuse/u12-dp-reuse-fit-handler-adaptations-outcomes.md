---
id: "13-u12"
plan: "13"
title: "DP-REUSE-FIT handler: adaptations, outcomes, wiring into the run DAG"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 411
depends_on: ["13-u11","09-u22","09-u16","09-u17","10-u65"]
writes: ["src/archive/app/reuse-fit/handler/**","src/moderation/app/dp/reuse-fit*.ts","test/fixtures/moderation/dp-reuse-fit/**","test/reuse-fit-handler.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#6-dp-reuse-fit","docs/design/ai/decision-points.md","docs/design/ai/runtime.md","docs/spec/constitution/rules-legal-sim.md#REUSE-CONTEXT-1","docs/design/components/server.md"]
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
Finish DP-REUSE-FIT as a registered decision point: the facts of 13-u11 plus a model step that proposes adaptations, with schema-validated output and the three outcomes. It never changes the problem, a review or a stage plan by itself.

## Steps
1. Register `DP-REUSE-FIT` (trigger: a path suggestion computed; blocking for display) in the registry of 09-u06. Prompt, schema and examples live in can_policy (10-u65); tests use fixtures.
2. Model step through the DAG executor (09-u16): input is the redacted draft, the source path as a delimited data block and the deterministic facts; output `adaptations[]` as a diff against the source path (`substitute`, `scale_down`, `add_institution_step`, `drop_step`, each with a reason and, for an unlawful step, the lawful analogue if one exists in the archive or the corpus) and a `confidence`. The output schema is closed; an adaptation that touches a stage the facts marked `hold` is rejected by a deterministic validator.
3. Outcomes: `publish` (show), `needs_revision` (regenerate the adaptations once with the validator's hint, then `hold`), `hold` (do not show). Deterministic aggregation (09-u18) takes the minimum: any `hold` in the facts wins; the model can only lower confidence, never raise it above the deterministic ceiling.
4. Output is gated by the output gate of 09-u10 and stored as `reuse_fit` jsonb on the suggestion (13-u13) with the run id. The record text is quoted as data; an injection canary (09-u17) failing the run gives `hold`.
5. Tests with FakeModel: lawful path with adaptations publishes; unlawful step gets the analogue when the fixture archive has one and none otherwise; an adaptation touching a held stage is refused; invalid JSON retries once then holds; the model cannot raise confidence; a canary echo holds.

## Acceptance
- `reuse_fit` has `legality[]`, `resourceFit`, `differences[]`, `adaptations[]` and `confidence` for every shown suggestion.
- No code path adopts a suggestion (REUSE-CONTEXT-1; test that the handler has no write access to problem, review or stage tables).
- `npm run verify` is green.

## Out of scope
- The suggestion lifecycle (13-u13).
- Prompt quality (live record runs, plan 11).
