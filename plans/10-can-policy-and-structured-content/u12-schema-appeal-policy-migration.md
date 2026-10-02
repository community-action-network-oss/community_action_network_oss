---
id: "10-u12"
plan: "10"
title: "Content schemas v1: appeal and policy_proposal, plus migration-map format"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 12
depends_on: ["10-u07"]
writes: ["content-schemas/appeal/**","content-schemas/policy_proposal/**","schemas/migration-map.schema.json","tools/lint.mjs","test/schema-appeal-policy.test.mjs","docs/schema-versioning.md"]
reads: []
spec: ["docs/design/ai/structured-content.md#8-how-schemas-change","docs/design/flows/policy-schema-change.md","docs/design/ux/wireframes/policy.md#WF-POLICY-1"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If a field's bounds are unclear, use the bounds from docs/design/ai/decision-points.md \"Policy-pack values\" and note the guess in the schema's `x-guidance.why`; never invent a required field the structured-content tables do not list."
status: done
attempts: 0
commits: ["8bd3ce3"]
actual_hours: 0.1
---
## Objective
The last two content types and the machine format for major-version migration maps (so a major bump can carry in-flight drafts).

## Steps
1. appeal: decision_ref, rule_ids_disputed[], what_is_wrong (which fact or reading), outcome_sought, new_evidence_refs[] (guidance: never new personal data; `x-checks.dps` includes DP-PRIVACY); policy_proposal: rule_ids_and_dps_touched[], reason, motivating_examples[] (masked refs), expected_flips, protected_core_check (acknowledged), rollback_plan, plus the WF-POLICY-1 sections (what changes, why, who is affected, lawful basis and risks).
2. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui` (widget, label_msg, help_msg, order, group), `x-guidance` (why, good, bad, min_chars, max_chars; good and bad examples are fictional, one short sentence each) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids in `x-ui` resolve in `content-schemas/<type>/messages.en.json` (flat id to string; plain language, no em or en dashes). Required list matches the table in structured-content.md. Each schema folder also holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, each named for what it breaks) that the unit test validates with the 10-u03 tooling.
3. `schemas/migration-map.schema.json` and `content-schemas/<type>/migrations/<from>-to-<to>.json`: `{type, from, to, fields: [{from_path, to_path, transform: copy|split|merge|drop, note}], new_required: [paths], dropped: [paths]}`.
4. Lint addition: when a schema directory contains versions (`schema.json` is the current one, `versions/<semver>.schema.json` keeps retired ones), a MAJOR bump (compare required sets with the previous version) without a migration map fails; a minor or patch bump with a changed required set fails; added fields in a minor bump must be optional. Implement by diffing the current schema against the highest earlier version found under `versions/`.
5. `docs/schema-versioning.md`: semver rules from structured-content.md section 8, the grace window (`grace.schema_major_draft_days` in limits.yaml), what drafts and published content do, rollback.
6. Tests: both schemas as in 10-u08; a fixture type with versions 1.0.0 and 2.0.0 shows the lint passes with a map and fails without; minor bump with new required field fails.

## Acceptance
- Appeal and policy_proposal schemas validate with examples and messages.
- Major bump without migration map fails lint (test).
- Minor bump that adds a required field fails lint (test).
- `npm run verify` green.

## Out of scope
- Applying migration maps to drafts (10-u31, 10-u37).
- Policy proposal UI (10-u38, 10-u39).
