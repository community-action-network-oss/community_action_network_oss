---
id: "09-u18"
plan: "09"
title: "Deterministic aggregation: PREC-1 precedence and confidence floors"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 247
depends_on: ["09-u06"]
writes: ["src/moderation/domain/aggregate/**","src/moderation/domain/aggregate/*.spec.ts"]
reads: ["src/moderation/domain/**"]
spec: ["docs/design/ai/decision-points.md#shared-contract","docs/design/ai/runtime.md#the-agent-dag","docs/design/ai/safety-and-privacy.md#fail-closed-matrix","docs/spec/constitution/rules.md#PREC-1","docs/spec/constitution/rules.md#MOD-EXPLAIN-1"]
needs: []
verify: ["npm run verify","npx vitest run src/moderation/domain/aggregate"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Plain code, no model: combine the DP results of one event into one outcome using the precedence escalate_human > route_external (crisis) > reject > needs_revision > hold > publish, ties broken by PREC-1 tier, with confidence floors from the pack and the injection flag.

## Steps
1. Pure `aggregate(results[], ctx)` returns {outcome, ruleIds[], fieldRef, hints: [{fieldRef, hint, ruleId}], holdReason?, lane?}. `publish` requires every blocking DP to say publish at or above its floor; a missing DP result (timeout, missing pack) is `hold` with its reason; an unresolved PREC-1 conflict at rights or crisis tier is `hold` with `policy_conflict` and `lane: true`.
2. Validation: `escalate_human` from a DP other than DP-CRISIS or DP-LEGAL throws `invalid_escalation` and the result becomes hold (defence against a model emitting it). Only allowed outcomes per DP (from the registry) are accepted.
3. needs_revision aggregates hints per field_ref (one hint per field, several rule ids); MOD-EXPLAIN-1 requires rule ids and field ref, and revision hint unless safety-sensitive; the function enforces it and falls back to hold if impossible.
4. Async DP results use `aggregateAsync` which never yields a state change by itself, only `flip` information when compared with the live decision.
5. Table-driven unit tests: every pairwise precedence, floors, injection flag, missing DP, invalid escalation, PREC-1 tie-break, hints merged per field.

## Acceptance
- Precedence matches decision-points.md "Shared contract" in a full pairwise table test.
- escalate_human from any other DP is rejected.
- Pure module: no Nest, Drizzle or I/O imports.
- `npm run verify` is green.

## Out of scope
- Applying outcomes to state.
