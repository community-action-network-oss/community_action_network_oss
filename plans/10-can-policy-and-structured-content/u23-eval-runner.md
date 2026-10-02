---
id: "10-u23"
plan: "10"
title: "Eval runner: recorded responses, metrics with confidence bounds, threshold gate"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 23
depends_on: ["10-u14","10-u15"]
writes: ["tools/eval.mjs","tools/lib/metrics.mjs","tools/lib/recordings.mjs","test/eval.test.mjs","test/fixtures/eval/**","docs/eval.md","package.json"]
reads: ["decision-points/**"]
spec: ["docs/design/ai/evaluation.md","docs/design/ai/amendment-loop.md#2-automated-eval-gate","docs/design/ai/policy-pack.md#ci-in-can_policy"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Confidence interval is the Wilson score interval at 95%. If a DP has fewer than 20 core cases the lower bound is reported but the gate uses the point estimate and prints a \"small sample\" warning."
status: done
attempts: 0
commits: ["0aeac73"]
actual_hours: 0.1
---
## Objective
Replace the 10-u03 eval stub: score each decision point's `core`, `adversarial`, `privacy` and `parity` sets against recorded model responses and compare to `eval/thresholds.yaml`, so a PR can be blocked on a failing gate.

## Steps
1. Recording format `decision-points/<DP>/eval/recordings.jsonl`: `{case_id, model_id, output}` where `output` is a dp-output document; a missing recording for a case is a distinct `unrecorded` finding (not a fail, but it blocks `--strict`). A deterministic `recorder` mode `npm run eval -- --derive-fake` writes recordings from the case table (the expected outcome, optionally with a seeded noise rate for tests), mirroring how plan 09 derives FakeModel behaviour from the case table.
2. `tools/eval.mjs [--dp DP-X] [--strict] [--json out.json]`: for each DP loads cases, recordings, thresholds; validates each output against the DP schema (schema validity rate); computes recall of non-publish expectations for harmful classes, false-reject rate on core negatives, citation correctness (rule ids and field refs exist), calibration ECE (10 equal bins), injection pass rate on adversarial, parity gap across jurisdiction and language tags, per-class counts; adds Wilson lower bounds for recalls.
3. Gate: compare every metric to `thresholds.yaml`; print a table per DP with pass or did not pass and an overall exit code; a threshold file edited in the same PR as its first lowering is caught by a `--diff-against <git ref>` option that fails when any threshold became looser (document the stricter-PR rule).
4. Disjointness check between `examples/` and `eval/core.jsonl` by id and normalized input hash (also run by the DP lint; share code).
5. Tests with tiny fixture DPs: perfect recordings pass; one missed harmful case fails recall; a malformed output fails schema validity; loosened threshold detected by `--diff-against`; small-sample warning appears; JSON report has stable key order.
6. `docs/eval.md`: metrics, formulas, how to read the report. The CI step from 10-u03 switches from stub to `npm run eval -- --strict --json .tmp/eval.json`.

## Acceptance
- A harmful-class miss fails the gate with the DP and case id named (test).
- Loosening a threshold is detected by `--diff-against` (test).
- Running twice gives byte-identical JSON.
- `npm run verify` green and the real DPs run through `--derive-fake` without schema errors.

## Out of scope
- Live model calls (plan 11, founder-gated).
- Replay diff (10-u24).
