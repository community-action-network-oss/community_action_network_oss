---
id: "09-u04"
plan: "09"
title: "Run recorder, idempotency and stage-output resume"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 233
depends_on: ["09-u03"]
writes: ["src/moderation/app/run-recorder.ts","src/moderation/infra/**","src/moderation/domain/run-key.ts","test/moderation-run-recorder.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/runtime.md#idempotency","docs/design/ai/runtime.md#run-record","docs/design/ai/triggers.md#ordering-and-concurrency","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-run-recorder.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["492d41c"]
actual_hours: null
---
## Objective
One component records runs: start, store each stage output as it completes (so a crashed run resumes), complete, hold, fail or supersede. Re-delivery of the same event returns the existing complete run.

## Steps
1. src/moderation/domain/run-key.ts: `runKey({targetId,targetVersion,dpId,policyVersion,trigger})` pure, with trigger classes (blocking triggers share a class; appeal and replay are their own).
2. Table moderation_run_stage (run_id fk, stage text, seq int, output jsonb, model_id, prompt_hash, tokens_in, tokens_out, cost_micro_usd, created_at; unique run_id+stage+seq). Outputs are structured only. Migration via db:generate.
3. RunRecorder (src/moderation/app/run-recorder.ts, Drizzle repo in infra/): `begin(key, meta)` returns existing complete run or a new running row (status running is a column value added here with a CHECK update); `saveStage`; `complete(runId, decision fields)`; `hold(runId, reason)`; `fail`; `supersede(runId)`. All writes carry no raw text; assert with a test that scans a recorded run for a seeded canary string given as input.
4. Supersede rule: `begin` for a newer target_version marks in-flight older runs for the same target superseded; a completed older run is never applied (the applier checks `status`).
5. Resume: `begin` on a crashed running row returns its stored stage outputs so the executor skips finished stages.
6. Tests: same key twice returns the same run id; two concurrent begins create one row; supersede; resume returns stages; canary text never appears in any column; hold requires a reason from the closed list.

## Acceptance
- Idempotent by the run key (concurrency tested).
- Crash resume returns stored stage outputs.
- No raw input text is persisted (canary test).
- `npm run verify` is green.

## Out of scope
- Executing stages.
- Applying decisions.
