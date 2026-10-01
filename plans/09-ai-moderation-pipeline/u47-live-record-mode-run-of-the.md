---
id: "09-u47"
plan: "09"
title: "Live record-mode run of the pipeline with Claude (founder-gated)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 276
depends_on: ["09-u13","09-u44"]
writes: ["test/fixtures/moderation/recorded/**","scripts/record-moderation.ts","test/moderation-replay.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/runtime.md#provider-adapter-interface","docs/design/ai/safety-and-privacy.md#operational-gates-before-live-data","docs/open-questions/OQ-model-provider-spend-cap.md","docs/spec/14-ai-privacy-gateway.md"]
needs: []
verify: ["npm run verify","npx vitest run test/moderation-replay"]
founder_gate: true
defaults: "Do nothing until the founder sets the key, the daily spend cap and approves the operational gates. Recordings use synthetic inputs only."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
With a founder-set key and spend cap, run the e2e fixtures once against AnthropicProvider in record mode to produce recorded responses, so later CI and night runs can replay them with zero paid calls.

## Steps
1. scripts/record-moderation.ts: sets `AI_PROVIDER=anthropic AI_RECORD=1`, refuses to run without a cap, runs the part 1 fixtures through the pipeline with a hard budget ceiling, and writes `(requestHash -> response)` JSON into test/fixtures/moderation/recorded/. Inputs are synthetic only (scan before write).
2. test/moderation-replay.e2e-spec.ts runs the same scenarios with `AI_PROVIDER=replay`; a missing recording fails the test instead of calling out.
3. Report model ids, cost and any schema failures in the commit message; update the model register eval fields only through the register file, never in code.

## Acceptance
- Replay run passes with no network.
- Recordings contain no text matching the PII detectors.

## Out of scope
- Persona live runs (plan 11).
