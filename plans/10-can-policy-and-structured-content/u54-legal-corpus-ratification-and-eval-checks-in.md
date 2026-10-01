---
id: "10-u54"
plan: "10"
title: "Legal corpus ratification and eval checks in CI (review record, citations resolve, replay)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 54
depends_on: ["10-u41", "10-u26", "10-u25"]
writes: ["tools/lint-legal-ratification.mjs", "tools/lint.mjs", "tools/replay.mjs", "tools/eval.mjs", "test/legal-ratification.test.mjs", ".github/workflows/ci.yml", "docs/ratification.md"]
spec: ["docs/design/flows/legal-corpus-update.md#sequence", "docs/spec/constitution/rules.md#LEGAL-CORPUS-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/design/ai/amendment-loop.md", "docs/design/ai/evaluation.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make LEGAL-CORPUS-1 machine-checked: a corpus change cannot ratify without a lawyer review record, every citation in prompts, examples and eval cases resolves, and the replay diff reports legal flips.

## Steps
1. `tools/lint-legal-ratification.mjs`: for each ratification record naming a `legal` pack, require a matching `review/*.md` (reviewer, jurisdiction qualification, scope, date, expiry in the future); fail on a corpus whose `content_hash` changed since the last ratified version with no new review record; fail on a ratification for an LLM-authored change (commit trailer or `authored_by: ai` without a reviewer).
2. Citation resolution: every `{layer, article_id, corpus_version}` appearing in `decision-points/**/examples`, `eval/**` and prompts resolves to an article in the pinned corpus; unresolved ids fail.
3. Topic-index coverage and `topic_ban` rules (reviewed corpus only) re-checked at ratification.
4. Eval gate: legal eval cases (10-u58) must pass thresholds; replay (10-u24) takes `--legal` and reports flips by layer and article, including an estimate of past resolutions touched (for DP-RERESOLUTION).
5. Add the step to CI; document the record fields in docs/ratification.md. Tests: a corpus PR with no review record cannot ratify; one with a record passes; an unresolved citation fails.

## Acceptance
- A corpus PR without a review record cannot ratify (test).
- Replay report lists legal flips by layer and article.
- `npm run verify` green.

## Out of scope
- The runtime loader (10-u55).
- Panel method (OQ-ratification-method).
