---
id: "09-u08"
plan: "09"
title: "AiGatewayPort, minimal prompt builder and the no-direct-provider rule"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 237
depends_on: ["02-u02","10-u04"]
writes: ["src/ai-gateway/domain/**","src/ai-gateway/app/prompt-builder.ts","src/ai-gateway/ai-gateway.module.ts","src/ai-gateway/register/**","test/architecture/**","src/ai-gateway/**/*.spec.ts","src/config.ts",".env.example"]
reads: ["src/**"]
spec: ["docs/design/ai/runtime.md#provider-adapter-interface","docs/design/ai/runtime.md#prompt-injection-defenses","docs/design/ai/safety-and-privacy.md#privacy-gateway-placement","docs/spec/14-ai-privacy-gateway.md","docs/spec/15-ai-inference.md","docs/spec/constitution/rules.md#PRIV-GATEWAY-1","docs/design/components/cross-cutting.md#portability-d-57"]
needs: []
verify: ["npm run verify","npx vitest run src/ai-gateway"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Define the only door to a model, for moderation stages and for the non-moderation ASSIST-FILL task of 10-u30 (a `kind: "assist"` input using the same redaction, budgets and providers, so 10-u30 builds on this port): AiGatewayPort, the typed gateway output a provider will accept, the minimal prompt builder with quoted data blocks and a per-run canary, and an architecture test that forbids importing a provider adapter anywhere else. Replaces the NoopAiGateway of ADR 0006 (there is no code path where publication works without a run).

## Steps
1. src/ai-gateway/domain/types.ts: `GatewayInput` (stage, dpId, ruleSlice, fields: {fieldRef, text}[] already redacted, metadata), branded `GatewayOutput` (the only type `ModelProvider.complete()` accepts; constructed only inside the gateway module via a private symbol), `ModelProvider` interface exactly as in runtime.md, `AiGatewayPort { run(input): Promise<StageResult> }`.
2. src/ai-gateway/app/prompt-builder.ts: render the DP prompt template from the pack (role, resolved rule slice, output schema, then the quoted data block); user content appears only inside one delimited block; the delimiter is escaped, or the call is rejected with `delimiter_in_content` (test both); the system text states the block is data; a random per-run canary token (injected `Random`) is placed in the system text; compute `prompt_hash` over the rendered template BEFORE data insertion (policy-pack.md). Token counting before dispatch with the stage budget (input 6k, output 600 defaults from config); over budget is a typed error, never truncation.
3. Model register type (src/ai-gateway/register/): entries {id, provider, tasks, languages, maxInput, costPerMtok, region, retention, evalExpiry, dpEligibility[]}; loaded from config JSON; slice 1 default register lists only `fake-1`. Config keys added to src/config.ts and .env.example: AI_PROVIDER (fake default), ANTHROPIC_API_KEY, AI_SPEND_CAP_DAILY, AI_MODEL_REGISTRY (path). Zod fails at boot on inconsistent combinations (provider anthropic without key and cap).
4. Replace NoopAiGateway: delete it if it exists and bind AiGatewayPort in ai-gateway.module.ts to a placeholder that throws `gateway_not_configured` until later units provide the real one; callers translate that into `hold`.
5. test/architecture/no-direct-provider.spec.ts: scan src/**/*.ts imports; only files under src/ai-gateway/** may import src/ai-gateway/providers/**, `@anthropic-ai/sdk` or any provider SDK. Also add an oxlint rule or documented override equivalent if the repo lint config supports it.
6. Unit tests: prompt builder escapes or rejects delimiter, canary present in system and absent from data, hash stable across data changes and changes with a rule slice change, over-budget error, register validation.

## Acceptance
- No model request can be built except through the gateway (type and architecture test).
- Prompt hash excludes user data and is stable.
- Config refuses a live provider without key and cap.
- `npm run verify` is green.

## Out of scope
- Redaction (next units).
- Provider adapters.
