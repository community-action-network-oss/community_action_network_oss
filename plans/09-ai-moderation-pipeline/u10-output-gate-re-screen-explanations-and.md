---
id: "09-u10"
plan: "09"
title: "Output gate: re-screen explanations and hints"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1
priority: 239
depends_on: ["09-u09"]
writes: ["src/ai-gateway/app/output-gate.ts","src/ai-gateway/app/output-gate.spec.ts","test/fixtures/moderation/output-gate/**"]
reads: ["src/ai-gateway/**"]
spec: ["docs/design/ai/runtime.md#prompt-injection-defenses","docs/design/ai/safety-and-privacy.md#privacy-gateway-placement","docs/spec/constitution/rules.md#MOD-EXPLAIN-1","docs/spec/constitution/rules.md#PRIV-GATEWAY-1"]
needs: []
verify: ["npm run verify","npx vitest run src/ai-gateway/app/output-gate"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["fd08401"]
actual_hours: null
---
## Objective
Everything a model says to a person (public_explanation, revision_hint, reasons) passes an output gate: PII and secrets re-screen, no quoting of restricted text, no scores or floors, only known rule ids, and no reproduction of any input identifier.

## Steps
1. `screenOutput({text, allowedRuleIds, inputTokens, restrictedSpans})` returns `{ok:true,text}` or `{ok:false, code}` with codes pii_leak, secret, restricted_quote, score_disclosure, unknown_rule, canary.
2. Reuse the 03-u02 and 03-u03 detectors on the output; reject text that contains a token pattern like [PERSON_1] unresolved or an expanded original; reject numbers that look like confidence or thresholds when preceded by "confidence", "score", "threshold", "floor"; reject any rule id not in allowedRuleIds.
3. A failed gate never repairs text by itself: the orchestrator regenerates the explanation once from structured fields (a template fallback `explanationFromRules(ruleIds, fieldRef)` lives here, deterministic, pulls rule plain text from the registry) or holds. Implement the template fallback and test it.
4. Fixtures: synthetic outputs that leak an email, echo a name, quote a restricted span, disclose a threshold, cite an unknown rule; and clean outputs. Table-driven unit tests.

## Acceptance
- Each leak class in the fixtures is rejected with its code.
- The deterministic template fallback never contains input text.
- `npm run verify` is green.

## Out of scope
- Wiring into the run (orchestrator unit).
