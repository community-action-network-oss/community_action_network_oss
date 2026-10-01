---
id: "13-u10"
plan: "13"
title: "Ranking and explanation: per-dimension similarity, pack-value weights, diversity"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.3
priority: 409
depends_on: ["13-u09","10-u66"]
writes: ["src/archive/domain/ranking/**","src/archive/app/ranking/**","test/archive-ranking.spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#5-ranking-and-explanation","docs/spec/constitution/rules-legal-sim.md#REUSE-CONTEXT-1","docs/design/components/server.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Cut the 30 candidates to 5 with an explanation per context dimension. No score is shown without its breakdown (REUSE-CONTEXT-1). Pure functions, no database, no model.

## Steps
1. Per-dimension similarity in `dimensions.ts`: `same`, `close` or `different` with a numeric value in [0,1] and the two values side by side (draft value and record value) for problem type, constraints, resources and budget, scale, geography and climate, institutions, legal stack (layer by layer: same corpus, different corpus, layer missing) and language. Each function is table-tested with its boundary cases (adjacent population bands are `close`; same Koppen group is `same`, neighbouring group is `close`).
2. Weights from the policy pack (10-u66, values read through the policy module): defaults problem type 0.25, constraints 0.15, resources and budget 0.15, scale 0.10, geography and climate 0.10, institutions 0.10, legal stack 0.10, language 0.05. The weights must sum to 1.0 (config check at load; refuse a pack that does not).
3. Final score = weighted sum plus a completeness bonus and a `solved` bonus (pack values), multiplied by the de-rank factor of annotated records (13-u05). Failed or stuck paths still rank; they carry `warning: "did_not_succeed"` plus the blocking challenge. A record's rank weight uses its evidence tier, never popularity or views.
4. Diversity: at most two suggestions from one source problem; the cut is deterministic with ties broken by record id.
5. Output `RankedCandidate {recordId, score, dimensions[{name, verdict, draftValue, recordValue}], warnings[], matchedChunks[]}`; the API layer never sends a score without `dimensions`.
6. Tests: weights sum guard, a fixture where a close cultural match with a legal-stack mismatch ranks below a weaker match with the same stack when the weight table says so, solved bonus, de-rank factor, diversity cap, deterministic ties, failed path shown with the warning.

## Acceptance
- Every ranked item carries all dimension verdicts with both values.
- Weights come from pack values and are validated.
- Pure unit tests only; `npm run verify` is green.

## Out of scope
- Legality and resource fit (13-u11).
- Display (13-u23).
