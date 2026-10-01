---
id: "10-u07"
plan: "10"
title: "limits.yaml with OQ-limits defaults and its schema"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1
priority: 7
depends_on: ["10-u03"]
writes: ["limits.yaml","schemas/limits.schema.json","tools/lint.mjs","test/limits.test.mjs","docs/limits.md"]
reads: ["schemas/**"]
spec: ["docs/design/ai/decision-points.md#policy-pack-values-scarcity-and-minimum-effort","docs/open-questions/OQ-limits.md","docs/design/ai/structured-content.md","docs/design/ai/policy-pack.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Use exactly the defaults in the OQ-limits and decision-points tables; cooldown lengths are provisional (OQ-cooldown-lengths) and marked `provisional: true`."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
All caps, field bounds and cooldowns as pack values, never code constants, with a schema and a lint that keeps them consistent with the content schemas.

## Steps
1. `schemas/limits.schema.json` and `limits.yaml` with keys: `caps.problems_per_account_per_period {count: 3, days: 7}`, `caps.contributions_per_account_per_day {total: 20, per_problem: 8}`, `caps.proposals_per_account_per_problem 2`, `caps.open_drafts_per_account 5`, `caps.appeals_per_account_per_period {count: 3, days: 7}`, `fields.<type>.<field>.min_chars/max_chars` (empty map now; schema units add entries), `fields.<type>.list.min/max`, `cooldowns.between_contributions_same_problem {seconds: 120}`, `cooldowns.after_rejected_contribution {seconds: 600}`, `cooldowns.exempt_types [progress_update, verification_evidence]`, `grace.schema_major_draft_days 30`, `risk_period.burst_threshold` (object, `public: false`), `schema_version: 1`.
2. Every leaf has `{value, unit?, provisional?, note}` or a typed object; unknown keys fail. A `public: false` leaf is excluded from anything the server returns in explanations (document in `docs/limits.md`).
3. Lint addition: every `fields.<type>.<field>` path must exist in `content-schemas/<type>/schema.json` once that schema exists, and its bounds must equal the schema `x-guidance` bounds (single source of truth is limits.yaml; schemas reference limits keys through `x-guidance.limits_key`). Implement the check so it is a no-op for types without a schema yet; later schema units rely on it.
4. Tests: valid file passes; unknown key, negative number and `min_chars > max_chars` fail; a rate-limit explanation example in `docs/limits.md` contains no value of any `public: false` leaf.
5. `docs/limits.md`: table of every key with default, meaning, and OQ link; rule that a change is a policy PR with replay of what would have been blocked.

## Acceptance
- `limits.yaml` validates and equals the OQ-limits defaults.
- The lint fails when a limits path points at a field a schema does not have (test with a temp schema).
- `npm run verify` green.

## Out of scope
- Server enforcement of caps (plan 09 and 07 rate-limit units read these values).
- Final cooldown values (OQ-cooldown-lengths).
