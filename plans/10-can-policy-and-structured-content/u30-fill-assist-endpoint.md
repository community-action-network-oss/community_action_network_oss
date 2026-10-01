---
id: "10-u30"
plan: "10"
title: "AI fill-assist endpoint through the privacy gateway (AI-ASSIST-1)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 30
depends_on: ["10-u29","09-u08","09-u09","09-u12"]
writes: ["src/policy/assist/**","src/policy/policy.module.ts","test/policy/assist/**","openapi/openapi.json"]
reads: ["src/ai-gateway/**","src/policy/**"]
spec: ["docs/design/ai/structured-content.md#7-ai-fill-assist","docs/design/components/server.md","docs/design/ai/safety-and-privacy.md","docs/spec/constitution/rules.md#AI-ASSIST-1","docs/design/flows/structured-submission.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run openapi","git add openapi/openapi.json","npm run verify"]
founder_gate: false
defaults: "Uses plan 09 units: AiGatewayPort and prompt builder (09-u08), privacy gateway (09-u09) and FakeModel (09-u12). If the AiGatewayPort does not exist when you start, STOP and report blocked; never write a gateway or call a provider directly. Use FakeModel only."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Implement `POST /v1/content-schemas/{type}/assist` per structured-content.md section 7: the poster's private notes go through the privacy gateway, the model returns per-field suggestions as proposals (never written as content), and the response is stamped for the `assisted` record. AI helps; the poster confirms (AI-ASSIST-1).

## Steps
1. Request `{schema_version, notes (max length from limits.yaml `assist.notes_max_chars`, default 4000), fields? (subset)}`; auth required; per-account rate limit key `assist` from limits.yaml; notes are never stored beyond the request except as an encrypted draft attachment that follows the draft retention rule (DRAFT-TTL-1) if the client passes `draft_id`.
2. Flow: validate schema version (10-u29) -> privacy gateway redaction and pseudonymization of the notes -> build prompt from `decision-points/ASSIST-FILL` of the active pack (10-u19; in tests the fixture pack carries a tiny ASSIST-FILL) with the schema as the only context -> model adapter port (FakeModel in tests) -> validate output against the ASSIST-FILL schema -> de-pseudonymize only inside the response to the same user -> respond.
3. Response: `{suggestions: [{field_ref, value, basis, confidence}], questions: [{field_ref, text}], assist_run_id, policy_version, prompt_hash, model_id}`. Hard rules enforced in code, not trusted to the model: drop any suggestion whose `field_ref` is not in the schema; drop suggestions for fields marked `x-checks.no_assist: true`; drop a suggestion whose value contains a URL, number or date that does not occur in the notes (invention guard, tested); never return more than one suggestion per field; there is no accept-all endpoint.
4. Record: an `assist_run` row with inputs hash, policy_version, prompt_hash, model_id, cost, outcome; the draft stores `assisted_fields: [{field_ref, assist_run_id}]` only when the poster confirms through the normal draft edit (field `assisted: true` accepted only with a valid, recent `assist_run_id` owned by the same account).
5. Fail closed: gateway or model failure, budget exhausted, invalid output after one retry returns 503 with code `assist_unavailable`; the form still works without assist.
6. Tests with FakeModel recordings: happy path; invented URL dropped; unknown field dropped; injection in notes ("ignore the rules") does not change the schema or leak the prompt; PII in notes is redacted before the adapter call (spy on the adapter input); `assisted: true` without a valid run id rejected. Regenerate `openapi/openapi.json`.

## Acceptance
- The adapter never sees raw identifiers from the notes (spy test).
- Invented sources, numbers and dates never reach the response (tests).
- No endpoint writes a suggestion into content; `assisted: true` needs a valid owned run id (tests).
- `npm run verify` is green with FakeModel only.

## Out of scope
- The gateway, adapters and FakeModel (plan 09).
- The app wiring (10-u36).
- Live provider calls (founder-gated, plan 11).
