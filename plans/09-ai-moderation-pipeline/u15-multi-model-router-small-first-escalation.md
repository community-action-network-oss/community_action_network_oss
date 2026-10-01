---
id: "09-u15"
plan: "09"
title: "Multi-model router: small first, escalation, independent verifier"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 244
depends_on: ["09-u12","09-u14"]
writes: ["src/ai-gateway/app/router/**","test/fixtures/moderation/router/**","src/ai-gateway/app/router/*.spec.ts"]
reads: ["src/ai-gateway/**"]
spec: ["docs/design/ai/runtime.md#multi-model-routing-and-escalation","docs/spec/15-ai-inference.md","docs/design/ai/policy-pack.md#per-decision-point-contents","docs/design/ai/evaluation.md#thresholds-as-ratification-gates"]
needs: []
verify: ["npm run verify","npx vitest run src/ai-gateway/app/router"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Pick the model per stage from the register: cache or deterministic result first, small model when eligible, escalate on low confidence or schema failure, use an independent verifier for reject and route_external on high-impact DPs, and hold when still below the floor. Privacy, region and retention are hard filters.

## Steps
1. `Router.route(stageRequest, ctx)` returns an ordered plan; `Router.execute` calls providers through the budget guard. Eligibility filter: register task and language match, DP eligibility flag with a current eval (`evalExpiry`), region and retention at least as strong as required; failover never goes to a weaker endpoint (test).
2. Escalation triggers: confidence below the stage floor from the pack thresholds, rule checks disagree, schema invalid after the one repair retry, language at the edge of support. `route_reason` values small, escalated, variant recorded on the stage output.
3. Independent verifier: for outcomes reject and route_external on the DPs flagged high impact in thresholds, a second model or the `prompt.alt.md` variant must agree, else the result is `hold`. The variant selection function is exported for the appeal re-run (different model AND different prompt variant than the original, read from the original run record).
4. Never lower the floor to clear a queue; a floor comes only from pack thresholds (test that no config value overrides it downward).
5. Retries: 1 schema repair and 1 provider retry only, no loops; calls counted per DP (cap 6) and per event (cap 20) with a typed `call_cap_exceeded` that becomes hold.
6. Unit tests with FakeModel scripts: low confidence escalates to fake-2; disagreement holds; weaker-region fallback refused; verifier disagreement holds; appeal variant picks a different model and prompt than the original run.

## Acceptance
- Escalation, verifier and hold paths are tested with FakeModel scripts.
- No path calls a weaker-terms endpoint.
- Call caps hold at 6 per DP and 20 per event.
- `npm run verify` is green.

## Out of scope
- Prompts and stage orchestration (DAG unit).
