---
id: "10-u08"
plan: "10"
title: "Content schema v1: problem (14 fields, messages, examples)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 8
depends_on: ["10-u07"]
writes: ["content-schemas/problem/**","limits.yaml","test/schema-problem.test.mjs"]
reads: []
spec: ["docs/design/ai/structured-content.md#3-the-problem-schema-field-by-field"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If a field's bounds are unclear, use the bounds from docs/design/ai/decision-points.md \"Policy-pack values\" and note the guess in the schema's `x-guidance.why`; never invent a required field the structured-content tables do not list."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The problem schema exactly as specified field by field in docs/design/ai/structured-content.md section 3, with plain-language labels, why-we-ask text, good and bad examples, message bundle and valid and invalid example submissions. This is the most important schema: it decides what every first post must cover.

## Steps
1. Create `content-schemas/problem/schema.json` with id `problem`, version 1.0.0 and the 14 fields in order: condition, affected, place, since, observed_facts[], uncertain_claims[], evidence_refs[], causal_hypothesis {statement, status untested|partly_supported|supported}, scope, responsible_roles[], desired_outcome, assumptions[] {statement, kind factual|causal|legal|scope, confidence, how_to_check}, out_of_scope[], lawful_options (options or `unknown`, plus acknowledgement flag). Optional `existing_efforts` (missing value is `none_stated`, not a block). Group fields into 7 sections matching WF-FORM-1 and WF-FORM-4 (for example: The condition, Who is affected, Where and since, What is known, Causes, Scope and outcome, Assumptions).
2. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui` (widget, label_msg, help_msg, order, group), `x-guidance` (why, good, bad, min_chars, max_chars; good and bad examples are fictional, one short sentence each) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids in `x-ui` resolve in `content-schemas/<type>/messages.en.json` (flat id to string; plain language, no em or en dashes). Required list matches the table in structured-content.md. Each schema folder also holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, each named for what it breaks) that the unit test validates with the 10-u03 tooling.
3. Bounds: condition 40 to 400 chars, causal_hypothesis.statement 40 to 600, observed facts 1 to 10, assumptions 1 to 8; write them into `limits.yaml` `fields.problem.*` and reference via `x-guidance.limits_key` so 10-u07 lint passes. `place` widget forbids an address: `x-checks.no_address: true`. `responsible_roles` items carry `x-checks.roles_only: true` (DP-NAMING reads it).
4. `x-checks.dps` per field exactly as in structured-content.md sections 4 to 6: condition, affected, scope, desired_outcome list DP-ELIGIBILITY and DP-FRAMING; place lists DP-DUPLICATE; every text field lists DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS, DP-ASSUMPTIONS, DP-COMPLETENESS; evidence_refs lists DP-EVIDENCE-TIER.
5. Seed guidance examples are synthetic and also eligible as eval cases: write 3 of the `good` and `bad` pairs so they are usable as DP-COMPLETENESS and DP-ASSUMPTIONS cases in 10-u19 (record their ids in `content-schemas/problem/examples/guidance-index.json`).
6. Examples: `valid-minimal.json`, `valid-with-assumptions.json` (fictional city, fictional condition), `invalid-missing-causal-status.json`, `invalid-address-in-place.json`, `invalid-filler-everywhere.json`, `invalid-named-person-in-roles.json` (the last two are valid JSON shape but listed in the test as "must fail DP-level checks, passes schema shape" so the test documents the layer split).
7. Test `test/schema-problem.test.mjs`: schema meta-validates (10-u03), valid examples pass, invalid shape examples fail with the expected pointer, required list equals the doc table, every `x-ui` message id exists in messages.en.json, no dashes of either kind.

## Acceptance
- The 14 fields and their order match structured-content.md section 3 (test compares field names).
- Every message id used exists in `messages.en.json`.
- Valid examples pass and invalid examples fail for the stated reason.
- `npm run verify` green.

## Out of scope
- Amsterdam seed content (plan 11).
- The renderer (10-u05).
- Per-DP prompts (10-u15 to 10-u19).
