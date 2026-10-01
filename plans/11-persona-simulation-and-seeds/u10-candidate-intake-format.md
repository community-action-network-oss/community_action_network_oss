---
id: "11-u10"
plan: "11"
title: "Labeled example candidates and policy PR draft format"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1
priority: 110
depends_on: ["10-u14","11-u01"]
writes: ["schemas/candidate.schema.json","simulation/candidates/README.md","simulation/candidates/.gitkeep","tools/lint-candidates.mjs","tools/lint.mjs","test/candidates.test.mjs",".github/ISSUE_TEMPLATE/**"]
reads: []
spec: ["docs/design/ai/simulation.md#7-feeding-the-amendment-loop","docs/design/ai/evaluation.md#sets-per-decision-point","docs/design/ai/amendment-loop.md#1-proposal"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Candidates are data only: nothing in this directory changes policy until a PR moves an auditor-confirmed case into an eval set or example."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The file formats that carry a simulation failure into the amendment loop: a labeled example candidate (redacted, provenance `simulation`) and a policy PR draft, with lint so the harness (11-u26) emits valid files.

## Steps
1. `schemas/candidate.schema.json`: `{id, dp, input (post-gateway redacted), expected_outcome, rule_ids, field_ref?, jurisdiction, language, provenance: "simulation", run_id, persona_id, miss_kind (false_publish|false_reject|injection_success|leak|poor_hint|fail_open), observed_outcome, status: candidate|confirmed|rejected, confirmed_by_label_task?}`; inputs must pass the simulation PII scan.
2. `simulation/candidates/` holds `<run_id>/<id>.json`; `README.md` states the lifecycle: candidate -> auditor-labeler confirms (randomized, context-masked) -> a PR moves it into `decision-points/<DP>/eval/regression.jsonl` or `adversarial.jsonl` -> a fixed case can only be retired by its own ratified PR.
3. `tools/lint-candidates.mjs`: schema, PII scan, id uniqueness, `confirmed` requires `confirmed_by_label_task`; an eval-set row with `provenance: simulation` must trace to a confirmed candidate id.
4. Policy PR draft format: `.github/ISSUE_TEMPLATE/policy-pr-draft.md` pre-fills the `policy_proposal` fields (rule ids and DPs, reason, motivating candidate ids, expected flips, protected-core check, rollback plan) so a harness-generated draft is a normal proposal.
5. Tests: valid, each defect, traceability rule.

## Acceptance
- Candidate schema, lint and PR draft template exist and defects fail (tests).
- The lifecycle is stated in the README.
- `npm run verify` green.

## Out of scope
- Generating candidates (11-u26).
- The label task module.
