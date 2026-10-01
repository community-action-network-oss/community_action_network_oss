---
id: "13-u19"
plan: "13"
title: "Archive eval runner: recall, nDCG, cross-language gap, explanation accuracy, register gate"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 418
depends_on: ["13-u18","13-u10","13-u11","09-u68"]
writes: ["src/archive/eval/**","test/archive-eval.e2e-spec.ts","docs/archive-eval.md"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#10-evaluation","docs/design/ai/evaluation.md","docs/adr/0014-openrouter-free-first-models.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Run the retrieval and fit eval of 13-u18 against the real pipeline (fake or recorded embeddings in CI), compute the metrics and gate the model register for the embedding model: a model enters or stays in the register only above the thresholds.

## Steps
1. Loader for the can_policy eval files (path from config, skipped with a printed reason when can_policy is absent); loads the synthetic records through the real assembler outputs path (insert as ratified simulation records) into a throwaway schema.
2. Metrics: recall at 5, nDCG at 10, cross-language recall gap (queries in each language against the same records), per-dimension explanation accuracy, fit recall for planted illegality and planted over-budget, with Wilson bounds where counts allow (reuse the can_policy convention of 10-u23, documented).
3. Gate: `npm run archive:eval -- --model <id>` writes a result row into the model register of 09-u68 (kind `embedding`, scores, date) and exits non-zero when a threshold is missed. The router refuses an embedding model without a passing row (13-u07).
4. Replay diff: when the embedding model or the pack weights change, the runner compares top-5 lists against the stored baseline and reports changes per query (evaluation.md replay diff).
5. CI mode uses the FakeEmbedding adapter and recorded vectors under test/fixtures; live mode (budget capped, public synthetic text only, D-65) is the same command with `--live`.
6. Tests: a deliberately bad model (random vectors) fails the gate; the fake multilingual table passes; a weight change produces a replay diff; a planted illegal step missed by the code under test fails the run.

## Acceptance
- The gate blocks a model that misses a threshold, and the register records the result.
- CI runs the eval offline.
- `npm run verify` is green.

## Out of scope
- Choosing the production model (an operator runs `--live`).
