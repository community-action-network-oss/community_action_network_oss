---
id: "10-u59"
plan: "10"
title: "Policy content: DP-RERESOLUTION prompt, output schema, examples and eval"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 59
depends_on: ["10-u14", "10-u06", "10-u07", "10-u41"]
writes: ["decision-points/DP-RERESOLUTION/**", "packs/base/rules.yaml"]
spec: ["docs/design/ai/decision-points.md#per-dp-notes", "docs/design/flows/re-resolution.md", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/open-questions/OQ-reresolution-feasibility.md", "docs/design/ai/evaluation.md", "docs/adr/0013-retroactive-re-resolution.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Author the policy content for DP-RERESOLUTION (outcomes keep, annotate, reopen, hold; never reject, never delete), so the eval runner scores it on recorded responses.

## Steps
1. Create `decision-points/DP-RERESOLUTION/` from the 10-u14 skeleton: `prompt.md` (inputs: resolution record, decision record, legal-gate record with layer citations, the rule diff with changed article ids; question: does the new rule change the conclusion), `schema.json` extending `schemas/dp-output.schema.json` (outcome restricted to the four; optional `reopen_target` `solution_development|eligible|verification`, `changed_rule_ids[]`, `changed_findings[]` with layer, article, old and new corpus version, `infeasible_reason` hint), packs examples and eval.
2. At least 8 examples and 10 eval cases (synthetic, fictional ids): unchanged conclusion (keep); changed conclusion but infeasible (annotate with reason); changed legal conclusion on solutions (reopen to solution_development); eligibility of the problem changed (reopen to eligible); evidence rule changed on a solved problem (reopen to verification, T24); low confidence (annotate for audit, never reopen); cannot decide (hold); lawful completed implementation (annotate, not reopen).
3. Thresholds: `max_false_reopen` 0.02 (reopen is the expensive error), recall on true flips 0.9; values are defaults to be ratified. Add RERESOLVE-1 to the rule list.
4. Adversarial cases: record text trying to force a reopen; a diff that touches an unrelated article (must keep).

## Acceptance
- DP-RERESOLUTION lints with all four outcomes covered and no reject outcome possible (schema test).
- `npm run verify` green.

## Out of scope
- The server handler (09-u62).
