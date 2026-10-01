---
id: "02-u02"
plan: "02"
title: "Config hardening and structured logging"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 10
depends_on: []
writes: ["src/config.ts","src/config.spec.ts","src/platform/logging/**","src/main.ts","src/app.setup.ts",".env.example"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#11-operations-notes","docs/design/system-design.md#3-slice-1-erd","docs/spec/16-security-a11y-ops-testing.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run src/config.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make configuration typed, validated and fail-fast, add every secret name the slice needs, and add JSON logs with request ids and a tested redaction list. Nothing later should read process.env directly.

## Steps
1. In src/config.ts keep the existing exports and add: nodeEnv, emailEncKey (32 bytes, base64), emailIndexKey, fingerprintKey, inviteHashKey, cookieSecure (bool), mailTransport (smtp only), aiProvider ("fake" default | "openrouter" | "anthropic" optional), openRouterKey and anthropicApiKey (optional, secrets), aiSpendCapMonthlyUsd (default 10), aiDataCollection ("deny" default | "allow"), allowedOrigins, trustProxy, sessionIdleDays=30, sessionAbsoluteDays=90, codeTtlMinutes=10, codeMaxAttempts=5.
2. Dev only: when NODE_ENV is not production, missing keys get fixed, clearly labelled dev values (a constant in src/config.ts, "dev-only, never use outside local"). In production a missing or wrong-length key throws at startup with the variable name (never the value).
3. AI gateway config (D-51, D-53, D-65; replaces the old AI-off switch): AI_PROVIDER defaults to "fake" (the deterministic FakeModel of plan 09, no network, no cost). AI_PROVIDER=openrouter is accepted only when OPEN_ROUTER_KEY is present and AI_SPEND_CAP_MONTHLY_USD is a positive number (default 10); otherwise throw at startup naming the missing variable (never the value). AI_PROVIDER=anthropic (optional adapter) additionally needs ANTHROPIC_API_KEY. AI_DATA_COLLECTION is deny by default; allow is accepted only outside production. Any other AI_PROVIDER value throws. In development only (NODE_ENV not production), variables not already set may be loaded from the superproject `../.env` (gitignored): read only the names this config needs and never log any value. Export config.ai = {provider, openRouterKey?, anthropicApiKey?, spendCapMonthlyUsd, dataCollection}; plan 09 (09-u08, 09-u12, 09-u13) consumes it and nothing else reads these variables.
4. Export a pure function loadConfig(env) so tests can pass an env object; config remains the default singleton built from process.env.
5. Create src/platform/logging/logger.ts: one-line JSON logs {time, level, msg, requestId, ...fields}; a redact(obj) function masking keys matching /email|code|token|cookie|authorization|password|secret|body|statement|narrative/i at any depth; a request-id middleware (reads X-Request-Id or generates one, sets the response header) registered from configureApp in src/app.setup.ts. Log one line per request (method, route template, status, ms) and never headers or bodies.
6. Update .env.example with every variable name and a comment, no real secrets.
7. Unit tests (src/config.spec.ts, src/platform/logging/logger.spec.ts): production without keys throws and names the variable; AI_PROVIDER unset gives fake; AI_PROVIDER=openrouter without key throws and names the variable; cap defaults to 10; a non-positive cap throws; the dev `../.env` fallback fills only unset names and a key never appears in any error or log; an unknown provider throws; wrong key length throws; redact masks nested email, code and token keys and arrays; request id is echoed.

## Acceptance
- Starting with NODE_ENV=production and no keys exits with a clear error naming the first missing variable.
- A redaction test proves email, code, token and cookie values never appear in log output.
- No other file reads process.env (grep proves it, except src/config.ts and drizzle.config.ts via config).
- `npm run verify` is green.

## Out of scope
- Secret rotation, vaults, or any hosted secret manager.
- Metrics or tracing.
