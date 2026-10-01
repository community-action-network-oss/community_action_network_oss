---
id: "11-u26"
plan: "11"
title: "Failures to labeled example candidates and policy PR drafts"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 126
depends_on: ["11-u24","11-u10"]
writes: ["test/simulation/amend/**"]
reads: []
spec: ["docs/design/ai/simulation.md#7-feeding-the-amendment-loop","docs/design/ai/amendment-loop.md","docs/design/ai/evaluation.md#sets-per-decision-point"]
needs: []
verify: ["npm run lint","npm run build","npx vitest run test/simulation"]
founder_gate: false
defaults: "The harness writes files only; opening a PR or editing an eval set is a human or night-run step in can_policy. Inputs are post-gateway redacted text taken from the run record, never raw persona text containing canaries."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Convert every miss (false publish, false reject, injection success, leak, poor hint, fail-open) into a candidate file in the format of 11-u10 and a draft policy proposal skeleton, so each run feeds the amendment loop automatically.

## Steps
1. `amend/candidates.ts`: for each deviation or critical entry produce `{id, dp, input (redacted), expected_outcome, rule_ids, field_ref, jurisdiction, language, provenance: "simulation", run_id, persona_id, miss_kind, observed_outcome, status: "candidate"}`; ids are content-hash based so reruns do not duplicate; inputs run through the PII scan and are dropped (with `redaction_failed: true` noted) if any identifier remains.
2. `amend/pr-draft.ts`: groups candidates by DP and rule and writes one markdown draft per group in `.github/ISSUE_TEMPLATE/policy-pr-draft.md` form (rule ids and DPs, reason, motivating candidate ids, expected flips estimated from replay of the candidates, protected-core check, rollback plan stub).
3. Output directory `runs/<run_id>/candidates/` with an index; a flag `--export-to <can_policy dir>` copies candidates to `simulation/candidates/<run_id>/` when the sibling exists.
4. Tests: each miss kind yields a valid candidate (schema from can_policy copied into fixtures); rerun is idempotent; a candidate with leftover PII is dropped; groups map to drafts.

## Acceptance
- All six miss kinds produce schema-valid candidates (tests).
- Reruns do not duplicate candidates (test).
- No candidate contains a planted canary or identifier (test).
- `npm run verify` is green.

## Out of scope
- Label tasks and confirmation (label module).
- Editing eval sets.
