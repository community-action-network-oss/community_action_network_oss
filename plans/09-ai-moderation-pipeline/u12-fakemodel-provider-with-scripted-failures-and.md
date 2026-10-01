---
id: "09-u12"
plan: "09"
title: "FakeModel provider with scripted failures and record/replay fixtures"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 241
depends_on: ["09-u08"]
writes: ["src/ai-gateway/providers/fake/**","src/ai-gateway/providers/replay/**","test/fixtures/moderation/fake/**","src/ai-gateway/providers/**/*.spec.ts"]
reads: ["src/ai-gateway/**"]
spec: ["docs/design/ai/runtime.md#provider-adapter-interface","docs/design/ai/safety-and-privacy.md#zero-retention-and-providers","docs/spec/15-ai-inference.md","docs/design/ai/simulation.md"]
needs: []
verify: ["npm run verify","npx vitest run src/ai-gateway/providers"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The slice-1 default provider. FakeModel is deterministic: its output is a function of (stage, rule ids, a keyword table in fixtures), so every test is repeatable, and it can be scripted per fixture to fail in the ways the pipeline must survive. A replay provider serves recorded responses and fails the test on a missing recording.

## Steps
1. FakeModel implements ModelProvider with id `fake-1` (and `fake-2`, a second deterministic model with a different keyword table, used for escalation and appeal variants). Keyword table JSON under test/fixtures/moderation/fake/ maps keywords to {outcome, rule_ids, confidence}; classify stage returns language, field spans and risk tier from simple rules; explain stage composes from structured input only.
2. Scripting: a `FakeScript` object in the request metadata for tests (never in production wiring) can force low confidence, schema-invalid JSON, timeout, canary echo, injection-style output (an output asking to publish), unknown rule id, and extra keys. Production module registration must not accept scripts: the script input is only read when `NODE_ENV=test` (test).
3. Token counts and cost are computed from text length with a fixed ratio so budget tests are deterministic (`costMicroUsd` per 1k tokens from the register).
4. Record and replay: `RecordingProvider` wraps a provider and stores `(requestHash -> response)` JSON under a directory (record mode only when `AI_RECORD=1`, founder-gated use); `ReplayProvider` serves them and THROWS `missing_recording` on a miss, never calls out. Request hash is over stage, prompt_hash, and the redacted data. Fixtures are made from synthetic inputs only; a test asserts the fixture folder contains no string matching the PII detectors.
5. Register the providers in ai-gateway.module.ts: `AI_PROVIDER=fake` (default) and `replay`; `anthropic` is wired by its own unit.
6. Unit tests: determinism (same request twice, same bytes), each scripted failure, replay miss throws, fixture PII scan.

## Acceptance
- Same request gives byte-identical output.
- Every scripted failure mode is covered by a test.
- ReplayProvider cannot reach the network (no http import in its folder, tested).
- `npm run verify` is green.

## Out of scope
- Live provider.
- Router.
