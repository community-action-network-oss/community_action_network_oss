---
id: "09-u13"
plan: "09"
title: "AnthropicProvider behind config (founder-gated)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 242
depends_on: ["09-u12","09-u08"]
writes: ["src/ai-gateway/providers/anthropic/**","package.json","package-lock.json",".env.example","src/ai-gateway/providers/anthropic/*.spec.ts"]
reads: ["src/ai-gateway/**"]
spec: ["docs/design/ai/runtime.md#provider-adapter-interface","docs/design/ai/safety-and-privacy.md#zero-retention-and-providers","docs/design/ai/safety-and-privacy.md#operational-gates-before-live-data","docs/open-questions/OQ-model-provider-spend-cap.md","docs/spec/15-ai-inference.md"]
needs: []
verify: ["npm run verify","npx vitest run src/ai-gateway/providers/anthropic"]
founder_gate: true
defaults: "Ship the adapter dark: constructible only when ANTHROPIC_API_KEY, AI_SPEND_CAP_DAILY and a register entry with a current eval all exist. No key or cap is ever committed."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
First live adapter, using the official Anthropic SDK. Founder-gated because it needs an API key and a spend cap. Implemented behind config; tests use mocks and never touch the network.

## Steps
1. Before writing code, check current Anthropic documentation (the claude-api skill) for the official SDK package, the latest Claude model ids, structured output and prompt caching support. Do NOT take model ids from this file or from memory: model ids live only in the model register config (`AI_MODEL_REGISTRY`) and the adapter reads them from there.
2. Implement `AnthropicProvider implements ModelProvider` in src/ai-gateway/providers/anthropic/. It maps `complete()` to the SDK with the system text, the quoted data block, schema-constrained JSON output, max output tokens and a timeout; no tools are ever passed; zero-retention and region flags come from the register entry, and the constructor refuses an entry without them.
3. Constructible only when the key, the daily spend cap and a register entry with `evalExpiry` in the future all exist; otherwise the registry offers only FakeModel and a boot log line says why (no secrets in the log).
4. Provider prompt caching only for the stable public prefix (pack text, schema, examples), never relied on for privacy.
5. Unit tests with a mocked SDK client: request shape contains no tools, canary and quoted block preserved, timeout maps to a typed `provider_timeout`, 429 and 5xx map to one retry then `provider_unavailable`, refusal to construct without key or cap, no network import in tests.
6. Add the SDK to package.json with the version the docs name (record the version and date in the commit message).

## Acceptance
- With no key or no cap the provider cannot be constructed (test).
- No tools are sent (test).
- No test touches the network.
- `npm run verify` is green.

## Out of scope
- Any live call (09 live record unit, also founder-gated).
- Choosing a model, budget numbers or DPA.
