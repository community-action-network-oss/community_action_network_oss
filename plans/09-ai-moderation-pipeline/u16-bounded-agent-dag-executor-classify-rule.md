---
id: "09-u16"
plan: "09"
title: "Bounded agent DAG executor: classify, rule checks, explain"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 245
depends_on: ["09-u15","09-u10","09-u06","09-u04"]
writes: ["src/moderation/app/dag/**","test/fixtures/moderation/dag/**","src/moderation/app/dag/*.spec.ts"]
reads: ["src/ai-gateway/**","src/moderation/**"]
spec: ["docs/design/ai/runtime.md#the-agent-dag","docs/design/ai/runtime.md#flow","docs/design/ai/policy-pack.md#per-decision-point-contents","docs/spec/15-ai-inference.md"]
needs: []
verify: ["npm run verify","npx vitest run src/moderation/app/dag"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Execute one DP as at most four node kinds: classify, rule checks (parallel per rule slice), explain, then hand the structured result to deterministic aggregation. Agents have no tools; all context is assembled by the server; outputs are schema-constrained JSON validated by the server.

## Steps
1. `DagExecutor.runDp({dp, gatewayFields, ctx})` builds the stage plan from the DP in the registry: classify (language, field spans, risk tier), one rule-check call per applicable rule slice in parallel with only that rule text, examples and field, then explain from the structured result and cited rule ids only (it receives redacted spans, never full raw text).
2. Validate every output against the DP `schema.json` (ajv or the zod bridge 10-u04 uses; reuse it). One repair retry with the validation error codes (not content); then the stage fails closed with `schema_invalid`. A rule id outside the DP applicable set, an unknown key, or free text outside `revision_hint` and `reasons` fails validation.
3. Stage outputs are saved through the RunRecorder as they finish and read back on resume. Hard caps of 6 model calls per DP and 20 per event, with the typed error from the router.
4. Deterministic DPs (no model needed, e.g. DP-COMPLETENESS layer 1) are plain nodes in the same plan with `kind: "code"`.
5. Concurrency: rule checks use Promise.all with a limit from config; a timeout on any blocking stage yields a `held` result with reason, never a partial publish.
6. Unit tests with FakeModel: normal run, one repair retry succeeds, repair fails, unknown rule id rejected, call caps, resume from stored stages skips finished ones, explain stage input contains no raw field text (assert on the recorded request).

## Acceptance
- No stage can call a tool or fetch (no such capability in the types).
- Invalid output after one repair holds the run.
- Call caps enforced and resume works.
- `npm run verify` is green.

## Out of scope
- Injection and canary checks (next unit).
- Aggregation.
