---
id: "10-u24"
plan: "10"
title: "Replay diff report: flips by direction, DP, rule and jurisdiction, protected-tier block"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 24
depends_on: ["10-u23"]
writes: ["tools/replay.mjs","tools/lib/replay-report.mjs","test/replay.test.mjs","test/fixtures/replay/**","docs/replay.md","package.json"]
reads: ["decision-points/**","packs/**"]
spec: ["docs/design/ai/evaluation.md#replay-diff-method","docs/design/ai/amendment-loop.md#3-replay-diff","docs/design/flows/policy-amendment.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "The default flip limit for a minor version is 5% of the replay set per DP, as `replay_limits.minor_flip_pct` in `limits.yaml`; any unintended flip in the privacy, crisis or rights tier blocks regardless."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Implement the replay diff the amendment loop gates on, working offline against fixture decisions and recorded responses, producing a report the PR and WF-POLICY-2 can show.

## Steps
1. Inputs: `--base <pack dir or ref>` and `--head <pack dir>`, `--decisions test/fixtures/replay/decisions.jsonl` (rows `{decision_id, dp, jurisdiction, language, redacted_input, outcome, rule_ids, field_ref, confidence, stratum}`), recordings for base and head (head recordings are derived from the head case table or provided). Never reads real data; fixtures only, redacted inputs only.
2. Compute per row: flipped when outcome, rule ids or field differ; direction `stricter` or `more_permissive` using the aggregation order from decision-points.md; confidence delta. Aggregate flips by direction, DP, rule and jurisdiction; share matching the motivating examples (`--motivating <ids file>`) as `expected`, others `unintended`; examples shown as redacted spans only.
3. Verdict: `blocked` when flips exceed `replay_limits.minor_flip_pct` for a minor bump or when any `unintended` flip belongs to a protected tier (rule `tier` from rules.yaml: rights, crisis_safety, privacy); `needs_review` when unintended flips exist; else `ok`. Exit code 1 on `blocked`.
4. Output: `--json` report (stable ordering) and `--md` summary for the PR comment with the counts, a small flips table, estimated re-moderation volume (flips x 1) and estimated cost with a `cost_per_run` key from `limits.yaml` (default 0). Shape documented in `docs/replay.md` because the server and app read it in 10-u32 and 10-u39.
5. Tests: no flips gives ok; one unintended privacy flip blocks; flip share over the limit blocks; direction classification table; deterministic output; empty replay set reports "no data" and exits 0 with a warning.
6. Fixtures: 60 invented decisions over 4 DPs and 2 jurisdictions, including appealed and near-threshold strata.

## Acceptance
- A seeded unintended privacy-tier flip blocks with exit 1 (test).
- Report JSON conforms to a schema in `schemas/replay-report.schema.json` (add it).
- Re-running produces identical output.
- `npm run verify` green.

## Out of scope
- Reading real stored decisions (server, later).
- Ratification (10-u26).
