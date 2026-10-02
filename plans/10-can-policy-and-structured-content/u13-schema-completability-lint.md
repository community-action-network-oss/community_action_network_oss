---
id: "10-u13"
plan: "10"
title: "Schema completability lint: widgets, DP references, message ids, guidance in eval"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.2
priority: 13
depends_on: ["10-u08", "10-u09", "10-u10", "10-u11", "10-u12", "10-u60", "10-u61", "10-u69", "10-u70"]
writes: ["tools/lint-schemas.mjs","tools/widgets.json","test/lint-schemas.test.mjs","tools/lint.mjs"]
reads: ["content-schemas/**","decision-points/**"]
spec: ["docs/design/ai/policy-pack.md#content-schemas","docs/design/ai/structured-content.md#2-schema-format","docs/design/flows/policy-schema-change.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "The widget list in tools/widgets.json is the contract with the renderer (10-u05); if the renderer supports a widget this file lacks, add it here, never the reverse."
status: done
attempts: 0
commits: ["8c6d6fb"]
actual_hours: 0.1
---
## Objective
The content-schema half of pack CI: a schema that cannot be completed, references a DP that does not exist, uses a missing message or ships a guidance example that is not in an eval set must fail the PR (docs/design/ai/policy-pack.md "Content schemas").

## Steps
1. `tools/widgets.json`: the closed list of widget names the renderer supports (text, textarea, choice, multichoice, list, evidence_url, assumption, date, place, basis, plus `source_ref_list`, `criteria_list`, `context_profile`, `area_picker` and `stage_plan` of lifecycle v2) with the JSON types each accepts; lint fails on a widget not in the list unless the property is optional AND marked `x-ui.fallback: "text"`.
2. `tools/lint-schemas.mjs` checks, per schema: (a) every required property has a widget and a label message; (b) every `x-checks.dps` entry names a directory in `decision-points/` (skip entries whose directory is absent only when `--allow-missing-dps` is passed, used by early units); (c) every message id used exists in that type's `messages.en.json` and no message is unused; (d) every `x-guidance.good` and `x-guidance.bad` string appears in some `decision-points/*/eval/*.jsonl` case via `source: "x-guidance:<type>.<field>"` (reverse lookup file `content-schemas/<type>/examples/guidance-index.json` from 10-u08 style); (e) `x-checks.dps` of every field includes the always-on DPs (PRIVACY, NAMING, TONE, CRISIS, ASSUMPTIONS, COMPLETENESS) for text-bearing widgets; (f) length bounds equal limits.yaml; (g) no U+2013 or U+2014.
3. A "form snapshot" substitute that runs without the app: `tools/form-outline.mjs` prints the ordered outline of sections and fields from a schema (label, widget, required) and test snapshots it for the problem schema, so a schema change shows up as a readable diff in the PR (the rendered-form snapshot gate of structured-content.md is completed by the app in 10-u05 tests; document this split).
4. Tests with temp schemas: unknown widget, missing label, missing DP dir, unused message, guidance example missing from eval, bounds drifting from limits.yaml. Wire into `npm run verify` (default without `--allow-missing-dps` once 10-u19 exists; until then the flag is set in package.json with a TODO naming 10-u19 and a test that fails if the flag remains after all DP dirs exist).

## Acceptance
- Each defect class above fails lint with a precise message (tests).
- The outline snapshot for `problem` is committed.
- `npm run verify` green on the real schemas.

## Out of scope
- Rendering forms (app).
- Writing new schemas.
