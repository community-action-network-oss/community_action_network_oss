---
id: "09-u09"
plan: "09"
title: "Privacy gateway: redaction, pseudonymization, token store and zones"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 238
depends_on: ["09-u08","03-u02"]
writes: ["src/ai-gateway/app/redaction/**","src/ai-gateway/infra/token-store.ts","src/ai-gateway/app/zones.ts","src/db/schema.ts","drizzle/**","src/app.module.ts","test/fixtures/moderation/priv-gateway/**","test/ai-gateway-redaction.e2e-spec.ts"]
reads: ["src/problems/domain/privacy/**"]
spec: ["docs/design/ai/safety-and-privacy.md#data-zones-in-a-run","docs/design/ai/safety-and-privacy.md#redaction-and-re-identification-tests","docs/spec/14-ai-privacy-gateway.md","docs/spec/constitution/rules.md#PRIV-GATEWAY-1","docs/spec/constitution/rules.md#PRIV-GATE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/ai-gateway-redaction.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build the gateway front half: authorize, classify the data zone, redact deterministically (reuse the 03-u02 detectors), pseudonymize with operation-scoped expiring tokens whose mapping lives in a separate store, and emit the audit event every gateway call must leave (PRIV-GATEWAY-1).

## Steps
1. Zones in src/ai-gateway/app/zones.ts: transient_raw, restricted_evidence, sanitized, public, audit. Only `sanitized` may enter a GatewayOutput; restricted evidence contributes tier and description only (never the content); a field in the wrong zone is refused with `zone_violation`.
2. Redaction pipeline: wrap detectPrivacyFlags (03-u02, import it, do not copy) plus extra detectors for secrets and coordinates and homoglyph or spacing normalization; replace spans with tokens like [PERSON_1]. Output keeps offsets mapping so decisions cite spans of the ORIGINAL field (offsets only).
3. Token store table pseudonym_token (id, operation_id, kind, token, ciphertext of original, expires_at default 1 hour); a separate role or schema grant is not available in tests, so isolate it in its own module with its own repository and never join it from run tables; expiry job `purgeExpiredTokens(now)`. Tokens are operation scoped, never global; the model never sees the mapping. Hint text returned to a person is re-expanded server side only if the person owns the content.
4. Gateway audit: one audit_event per call, action `ai.gateway.call`, detail {runId, dpId, stage, zone, redactionCount, providerId} with no text.
5. Fixtures test/fixtures/moderation/priv-gateway/: synthetic PII across scripts (Latin, Arabic, Devanagari), rare combination of role place and time, spacing and leetspeak evasion, split across fields. Tests assert redaction recall on the set and that outputs of `redact` never contain the seeded identifiers; over-redaction metric is recorded, with a threshold file next to the fixtures.
6. Failure: any redaction error throws `gateway_failure` and no GatewayOutput exists (fail closed; the orchestrator turns it into hold).

## Acceptance
- Seeded identifiers never reach a GatewayOutput (test).
- Restricted evidence content never leaves its zone (test).
- Every call writes the gateway audit event without text.
- `npm run verify` is green.

## Out of scope
- Output gate (next unit).
- Real provider terms or DPA.
