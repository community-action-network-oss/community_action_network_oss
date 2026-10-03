---
id: "09-u13"
plan: "09"
title: "OpenRouterProvider behind config (OpenAI-compatible endpoint)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 242
depends_on: ["09-u12","09-u08"]
writes: ["src/ai-gateway/providers/openrouter/**","package.json","package-lock.json",".env.example","src/config.ts","src/config.spec.ts","src/ai-gateway/providers/openrouter/*.spec.ts"]
reads: ["src/ai-gateway/**"]
spec: ["docs/design/ai/runtime.md#provider-adapter-interface","docs/design/ai/safety-and-privacy.md#zero-retention-and-providers","docs/design/ai/safety-and-privacy.md#operational-gates-before-live-data","docs/open-questions/OQ-model-provider-spend-cap.md","docs/adr/0014-openrouter-free-first-models.md","docs/spec/15-ai-inference.md"]
needs: []
verify: ["npm run verify","npx vitest run src/ai-gateway/providers/openrouter"]
founder_gate: false
defaults: "Not founder-gated (D-65). Constructible only when AI_PROVIDER=openrouter, OPEN_ROUTER_KEY, a positive AI_SPEND_CAP_MONTHLY_USD and a register entry with a current eval all exist. The key is never read from a file other than the dev .env fallback, never committed and never logged. Tests mock HTTP."
status: done
attempts: 0
commits: ["fedf5f1"]
actual_hours: null
---
## Objective
First live adapter (D-65): `OpenRouterProvider implements ModelProvider` over the official OpenAI-compatible endpoint `https://openrouter.ai/api/v1/chat/completions`, with OpenRouter provider routing and the `data_collection` setting on every request. Tests mock HTTP and never touch the network.

## Steps
1. Use plain `fetch` (Node 24) against `https://openrouter.ai/api/v1`; add no SDK unless the official OpenAI-compatible client is already a dependency. Model ids come only from the model register (`AI_MODEL_REGISTRY`), never from code. Check the current OpenRouter API docs for the `provider` routing fields and structured-output (`response_format` json_schema) support before coding.
2. `complete()` maps to one chat completion: system text, the quoted data block as the user message, schema-constrained JSON output, `max_tokens`, a timeout, no tools ever. Every request sets `provider: { data_collection, allow_fallbacks: false, require_parameters: true }`. `data_collection` is `deny` unless the request is marked synthetic (simulation, seeds, evals, record runs) and `AI_DATA_COLLECTION=allow`; a non-synthetic payload to a register entry with `dataCollection: "allow"` is refused with a typed `endpoint_not_allowed` (test).
3. Config in `src/config.ts` (extends 02-u02): `AI_PROVIDER=openrouter` accepted only with `OPEN_ROUTER_KEY` and `AI_SPEND_CAP_MONTHLY_USD` (default 10, positive); otherwise throw at boot naming the variable, never the value. Dev only: when a variable is not already set, load the superproject `../.env` as a fallback (read only the names this config needs; never in production). `.env.example` lists the names with no values.
4. The key is read once into the config object, sent only in the Authorization header, and excluded from logs, errors, run records and recordings (extend the logger redact list and add a test that an error message and a log line never contain it).
5. Map failures: timeout to `provider_timeout`; 429 and 5xx to a typed `provider_unavailable` carrying `retryAfter` (the router, 09-u15, owns backoff and fallback; the adapter does not loop); schema-invalid output to `schema_invalid`; a 402 or cap hit from OpenRouter to `provider_budget`.
6. Tests with a mocked `fetch`: request shape (URL, headers, provider routing, no tools, canary and quoted block preserved), `data_collection` deny by default, synthetic-only allow path, refusal to construct without key or cap, error mapping, no key in any log or error, no real network.

## Acceptance
- With no key or no cap the provider cannot be constructed (test).
- `data_collection` is `deny` for non-synthetic requests and no fallback is allowed (test).
- No tools are sent; no test touches the network.
- `npm run verify` is green.

## Out of scope
- Backoff, fallback and model choice (09-u15 router, 09-u68 register).
- Any real member data to a live provider (still founder-gated).
- The optional Anthropic adapter.
