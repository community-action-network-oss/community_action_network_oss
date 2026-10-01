---
id: "09-u23"
plan: "09"
title: "Outcome applier: ModerationTarget port and decision write in the transition engine"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 252
depends_on: ["09-u22","03-u05"]
writes: ["src/moderation/app/outcome-applier.ts","src/moderation/domain/target.ts","src/moderation/domain/outcome-map.ts","src/problems/app/**","test/moderation-applier.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md#catalog","docs/design/ai/triggers.md#1-pre-publication-blocking","docs/design/ai/runtime.md#idempotency","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/01a-lifecycle.md#42-transition-table","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#INTERIM-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-applier.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Turn a recorded aggregate into the state change plus decision row in one transaction through the transition engine (03-u05), guarded by target_version. Define the ModerationTarget port so problems, contributions, proposals, decision records and tasks all plug in as adapters.

## Steps
1. src/moderation/domain/target.ts: `ModerationTarget` port {load, currentVersion, contentType, applyOutcome(tx, outcome, decisionId)} plus `TargetKind`. Outcome map in outcome-map.ts: for the problem target publish gives T04, needs_revision T02, reject T05, route_external leaves state and records the route, hold leaves state and schedules retry, escalate_human leaves state, opens a lane case (hook interface only, the lane unit implements it).
2. OutcomeApplier.apply(runId): in ONE transaction, SELECT the target FOR UPDATE, verify `target_version` equals the version the run judged (else mark the run superseded and enqueue a new run), insert moderation_decision from the run (rule ids, field ref, hint, explanation, policy_version, prompt_hash, model_id, confidence, run_id, transitional flag from the pack approval, appealable_until = now + 14 days, always earlier than purge_after, assert), call the engine with actor system (decider recorded as the run). Failure anywhere rolls back everything (PUB-FAILCLOSED-1 failure injection test).
3. Hold handling: `hold` writes a run with status held and a retry job with exponential backoff through the queue (never becomes publish by timeout, test with fake clock after days). A held item stays in its pre-publication state.
4. DecisionNotifier port from 03-u05 is called after commit with no text; if 03-u11 has landed its adapter sends mail, otherwise the default no-op stays. Do not depend on 03-u11.
5. Supersession guard: if 03-u10 code remains (moderator decision use case, `interim` flag usage), delete it; the engine no longer needs the propose and confirm path for T04, T05, T14, T19 and T20 when actor is system. Keep the engine API and its tests green; remove only tests that assert moderator-confirm behavior and say so in the commit message. Moderator confirmation columns stay unused.
6. Tests (e2e): each outcome maps to the right transition; target moved on gives superseded and a requeue; failure injection leaves no decision and no state change; hold retries and never publishes; decision row satisfies MOD-EXPLAIN-1; escalate_human from a non-crisis DP cannot reach the applier (aggregate rejects it; assert again here).

## Acceptance
- State change, event and decision commit together or not at all.
- A stale run is never applied (version check).
- Hold never becomes publish by time.
- `npm run verify` is green.

## Out of scope
- Problem adapter specifics beyond the engine (next unit).
- Contribution and other target adapters (later units).
