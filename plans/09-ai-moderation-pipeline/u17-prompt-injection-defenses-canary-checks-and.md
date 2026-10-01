---
id: "09-u17"
plan: "09"
title: "Prompt-injection defenses, canary checks and deterministic vetoes"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 246
depends_on: ["09-u16","09-u11"]
writes: ["src/moderation/app/guards/**","test/fixtures/moderation/injection/**","src/moderation/app/guards/*.spec.ts"]
reads: ["src/moderation/**","src/ai-gateway/**"]
spec: ["docs/design/ai/runtime.md#prompt-injection-defenses","docs/design/ai/safety-and-privacy.md#fail-closed-matrix","docs/design/ai/evaluation.md#sets-per-decision-point","docs/spec/constitution/rules.md#PRIV-GATE-1","docs/spec/constitution/rules.md#NAME-1"]
needs: []
verify: ["npm run verify","npx vitest run src/moderation/app/guards"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make a successful injection change at most one stage of JSON, and make the aggregation cross-check it. Canary tripping holds the run; injection-shaped content lowers the publish floor to hold; DP-PRIVACY and DP-NAMING have deterministic cross-checks that can veto publish.

## Steps
1. Canary: after each stage, if the per-run canary token appears in any output the run becomes `held` with reason canary_tripped, is flagged for auditors (an audit_event `moderation.canary.tripped` with run id only) and no hint text is generated from that content.
2. Injection shape detector `looksLikeInjection(fieldText)` (patterns such as ignore previous rules, system prompt, role markers, delimiter forgery); positive sets a run flag so aggregation will not allow `publish` for that item (floor becomes hold) while still allowing needs_revision.
3. Deterministic vetoes: after the DAG, `crossCheck(dp, structured, fields)` for DP-PRIVACY (03-u02 detectors on the redacted spans mapping back to originals) and DP-NAMING (PERSON candidates): if the model said publish but a detector fires, the veto changes it to needs_revision with the span. A veto can only make an outcome stricter.
4. Adversarial fixtures under test/fixtures/moderation/injection/: instruction-in-content, delimiter forgery, output-asks-to-publish scripted via FakeModel, encoded abuse, multilingual evasion, canary echo. Each has expected outcome (hold or needs_revision, never publish).
5. Unit tests per fixture and a property test: for any fixture, the final outcome is never publish when a veto or canary or injection flag is set.

## Acceptance
- No adversarial fixture ever yields publish.
- Canary trip yields hold, a flagged audit event and no generated hint.
- Vetoes only tighten outcomes (property test).
- `npm run verify` is green.

## Out of scope
- Persona simulation (plan 11).
- Aggregation precedence (next).
