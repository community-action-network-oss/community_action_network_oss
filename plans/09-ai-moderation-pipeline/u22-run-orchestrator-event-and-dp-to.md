---
id: "09-u22"
plan: "09"
title: "Run orchestrator: event and DP to a recorded, aggregated result"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 251
depends_on: ["09-u16","09-u18","09-u19","09-u04","09-u17","09-u11","09-u21","09-u09","09-u14"]
writes: ["src/moderation/app/run-orchestrator.ts","src/moderation/app/handlers/**","src/moderation/moderation.module.ts","src/app.module.ts","test/moderation-orchestrator.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/runtime.md#flow","docs/design/ai/runtime.md#idempotency","docs/design/ai/safety-and-privacy.md#fail-closed-matrix","docs/design/ai/triggers.md#ordering-and-concurrency","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/spec/constitution/rules.md#PRIV-GATEWAY-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-orchestrator.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Wire the pieces for one moderation job: crisis first, gateway, DP DAG per DP in parallel, deterministic aggregation, output gate, run record. The result is a recorded outcome ready for the applier. Any failure maps to a hold with a closed reason code (fail-closed matrix).

## Steps
1. Register the queue handler for queue `moderation` in src/moderation/app/handlers/. For a job {eventId, targetKind, targetId, targetVersion, dpIds, trigger}: load the target through a `ModerationTarget` port (declared in 09 applier unit; here use a minimal read interface `loadForModeration(targetKind,targetId,targetVersion)` returning typed fields and content type, implemented by an in-test adapter until the problem adapter lands), pin the active policy version at start (recorded in the run), call crisisFirst, gateway redaction, then `DagExecutor.runDp` for each DP in parallel, aggregate, run the output gate on explanation and hints (one template fallback, else hold).
2. Fail-closed mapping table in src/moderation/app/hold-map.ts from every error code (provider_timeout, schema_invalid, gateway_failure, pack_missing, budget_exhausted, canary_tripped, language_unsupported, call_cap_exceeded, delimiter_in_content, gateway_not_configured, PolicyUnavailable from the 10-u04 registry) to a hold reason of the closed list, covered by a table test. Unknown errors become hold too.
3. Idempotency and supersession: `RunRecorder.begin` returns an existing complete run (return it, no model calls, assert zero provider calls); if the target version moved on during the run, mark superseded and enqueue the newer version job (never applied).
4. Pack handling: a missing or invalid pack for a DP gives hold for that DP only and keeps the previous active version.
5. Language: unsupported language (classify stage) gives hold with reason language_unsupported; no guess.
6. Priority and parallelism: DP-CRISIS completes first; aggregation waits for all blocking DPs or the timeout (then hold).
7. Tests (e2e with FakeModel): clean fixture publishes in aggregate; vague fixture needs_revision with field hints; injection fixture holds; provider timeout script holds with reason; re-delivery of a completed job makes zero provider calls; target version bump supersedes.

## Acceptance
- Every error path ends as hold with a closed reason code (table test).
- Re-delivery is idempotent and makes no provider call.
- No raw text in the run row (reuse canary assertion).
- `npm run verify` is green.

## Out of scope
- Applying the outcome to state (next units).
- HTTP endpoints.
