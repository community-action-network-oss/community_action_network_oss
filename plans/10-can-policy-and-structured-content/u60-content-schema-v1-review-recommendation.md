---
id: "10-u60"
plan: "10"
title: "Content schema v1: review_recommendation"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1
priority: 12
depends_on: ["10-u08","10-u07"]
writes: ["content-schemas/review_recommendation/**","limits.yaml","test/schema-review-recommendation.test.mjs"]
reads: ["schemas/**","tools/**"]
spec: ["docs/design/ai/structured-content.md#1-content-types-and-their-schemas","docs/spec/01a-lifecycle.md","docs/spec/constitution/rules.md","docs/design/flows/volunteer-review.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The schema of a volunteer recommendation (D-72, REVIEW-1, RECO-1): private content, never public, never moderated for merit.

## Steps
1. Fields: `problem_ref`, `path` (a field or metadata path: any problem field, `stage_plan.<stage>`, `stage_plan.<stage>.criteria`, `final_acceptance_criteria`, `sources`, `affected_area`, `context_profile`; the allowed path grammar is a JSON Schema `pattern` plus a lint that every non-meta path exists in the problem schema), `recommendation` (the change asked, 20 to 600 chars), `reason` (20 to 600 chars), `status` (`open|accepted|declined`, server-set), `resolution_reason` (poster; required when status is accepted or declined, RECO-1; conditional `if/then` in the schema).
2. `x-checks.dps` lists only the always-on DPs (DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS): recommendations are never checked for merit (decision-points.md, review recommendations). Add a lint test that no other DP is listed.
3. Guidance: say what to change and why, never name or describe a person, never paste personal data from the masked view.
4. Every schema file follows docs/design/ai/structured-content.md section 2: JSON Schema 2020-12 with `id`, `version: "1.0.0"`, `pack: "base@1.0.0"`, and per property `x-ui`, `x-guidance` (why, good, bad, min_chars, max_chars; fictional one-sentence examples) and `x-checks` (dps, enums, allow_unknown, none_stated). Message ids resolve in `content-schemas/<type>/messages.en.json` (plain language, no em or en dashes). Each schema folder holds `examples/valid-*.json` (at least 2) and `examples/invalid-*.json` (at least 3, named for what they break); the unit test validates them with the 10-u03 tooling.
5. Examples: valid recommendation on stage criteria, valid on affected_area; invalid: accepted without resolution_reason, path that does not exist, reason too short, a named person in the text (shape passes, listed as "fails DP-NAMING").
6. Bounds into limits.yaml `fields.review_recommendation.*`.

## Acceptance
- Schemas validate, required lists match structured-content.md.
- Every message id used exists in messages.en.json.
- Valid examples pass and invalid examples fail for the stated reason.
- `npm run verify` is green.

## Out of scope
- The renderer (10-u05).
- Server enforcement.
