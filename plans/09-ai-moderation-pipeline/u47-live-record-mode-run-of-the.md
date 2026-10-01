---
id: "09-u47"
plan: "09"
title: "Live record-mode run of the pipeline (OpenRouter, free models, synthetic data)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 276
depends_on: ["09-u13","09-u68","09-u44"]
writes: ["test/fixtures/moderation/recorded/**","scripts/record-moderation.ts","test/moderation-replay.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/runtime.md#provider-adapter-interface","docs/design/ai/safety-and-privacy.md#operational-gates-before-live-data","docs/open-questions/OQ-model-provider-spend-cap.md","docs/adr/0014-openrouter-free-first-models.md","docs/spec/14-ai-privacy-gateway.md"]
needs: []
verify: ["npm run verify","npx vitest run test/moderation-replay"]
founder_gate: false
defaults: "Not founder-gated (D-65). Free (:free) registered models only, synthetic inputs only, a hard per-run budget (default 1 USD) under the monthly cap. If OPEN_ROUTER_KEY is absent or no free model is registered, mark the unit blocked with the reason; never fall back to a paid or real-data path."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Run the e2e fixtures once against OpenRouterProvider in record mode, using only free registered models and synthetic inputs, to produce recorded responses so later CI and night runs replay them with zero paid calls.

## Steps
1. scripts/record-moderation.ts: sets `AI_PROVIDER=openrouter AI_RECORD=1 AI_DATA_COLLECTION=allow`, refuses to run without a cap and a `--budget-usd` (default 1), restricts the router to registered `free: true` models (09-u68), runs the part 1 fixtures through the pipeline with a hard budget ceiling that stops at 95 percent, and writes `(requestHash -> response)` JSON into test/fixtures/moderation/recorded/. Inputs are synthetic only (scan before write).
2. test/moderation-replay.e2e-spec.ts runs the same scenarios with `AI_PROVIDER=replay`; a missing recording fails the test instead of calling out.
3. Report model ids, cost and any schema failures in the commit message; update the model register eval fields only through `select:models` (09-u68), never in code. The key is never printed.

## Acceptance
- Replay run passes with no network.
- Recordings contain no text matching the PII detectors.
- Only free registered models were called and spend is within the budget.

## Out of scope
- Persona live runs (plan 11).
