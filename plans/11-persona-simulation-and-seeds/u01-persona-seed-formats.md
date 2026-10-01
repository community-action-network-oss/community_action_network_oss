---
id: "11-u01"
plan: "11"
title: "Persona and seed file formats with schemas and lint"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.2
priority: 101
depends_on: ["10-u03"]
writes: ["simulation/**","schemas/persona.schema.json","schemas/script.schema.json","schemas/seed.schema.json","tools/lint-simulation.mjs","tools/lint.mjs","test/simulation-format.test.mjs","docs/simulation-data.md"]
reads: []
spec: ["docs/design/ai/simulation.md#10-layout","docs/design/ai/simulation.md#2-persona-catalog","docs/design/components/can-policy.md","docs/spec/constitution/rules.md#SIM-LABEL-1","docs/spec/constitution/rules.md#SIM-NOSECRET-1"]
verify: ["npm run verify"]
founder_gate: false
defaults: "The script step language stays declarative (no code, no expressions beyond equality on listed state fields); anything cleverer belongs in the harness (plan 11 server units)."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Fix the data contract between can_policy simulation data and the harness in can_server, so personas and seeds written by later units are lintable and the harness can load them without guessing.

## Steps
1. `schemas/persona.schema.json` for `simulation/personas/<id>/persona.yaml`: `id` (stable, from the catalog in docs/design/ai/simulation.md section 2), `family` (submitter|contributor|adversarial), `role`, `goals[]`, `knowledge`, `flaws[]`, `behaviors[]`, `language`, `turn_budget` (int), `seed` (int), `synthetic: true` (required, const), `handle` (pattern `^sim-[a-z0-9-]+$`), `script` (relative path), `prompt` (relative path, live mode), `expected` (list of `{step_id, outcomes[], dp?, rule_ids?}`), and for adversarial `attack_goal` and `pass_condition` (strings), `attack_data` (optional path to a JSONL of variants).
2. `schemas/script.schema.json` for `script.json`: `steps[]` each `{id, when {state?: [..], after_step?: id, outcome_was?: outcome}, action: submit|contribute|revise|appeal|read|assist|stop|raw_http, content_type, schema_version?, fields (object keyed by schema field), assumption_strategy (mark_assumption|correct|ignore) for answering needs_revision hints, expect {outcome, rule_ids?, field_ref?}, raw_http {method, path, body} (only for adv-schema-bypass)}`. A step may reference `{{seed.<field>}}` or `{{var.<name>}}` placeholders resolved by the harness.
3. `schemas/seed.schema.json` for `simulation/seeds/<id>/seed.yaml`: `id`, `number`, `framing` (verbatim string), `jurisdiction`, `label` (const "Seed problem, synthetic evidence"), `problem` (path to a JSON body valid for the `problem` schema), `evidence[]` (`{id, url, description, tier_cap, synthetic: true}` with URL host `evidence.sim.test`), `rubric` (path to expected decomposition list), `variants[]` (happy, revise, appeal, stuck, attack_wave), `personas[]` (ids).
4. `tools/lint-simulation.mjs` (called from `lint.mjs`): validates all three kinds; every persona id in a seed exists; every evidence URL host is `evidence.sim.test`; no U+2013 or U+2014; no string in persona or seed files matches an email, phone or street-address pattern or any host except the fake domain (a mini PII scan; the patterns are the same ones `can_server` will use); a persona without `synthetic: true` fails; seed `framing` must equal one of the four D-56 framings byte for byte (list them in `simulation/FRAMINGS.json`: seeds 1 to 4 verbatim from DECISIONS.md D-56).
5. Write `simulation/FRAMINGS.json` with the four framings. Seed 1: "Amsterdam residents face recurring explosions and violent incidents that may reduce actual and perceived public safety." Seed 2: "Amsterdam city centre remains dirty despite substantial government cleaning activity and expenditure." Seed 3: "Increasingly capable AI systems create an evolving global risk that requires continuously updated technical, institutional, legal, and social defenses." Seed 4: "Climate change creates large, interconnected harms that require decomposition into bounded geographic, sectoral, mitigation, adaptation, finance, governance, and verification problems." (D-56 lists only short names; these full sentences are the founder-approved wording and are used by the gated units 11-u41 and 11-u42 only.)
6. Fixtures and tests: valid persona, script and seed pass; each defect (missing synthetic flag, bad handle, real-looking email, non-fake host, wrong framing, unknown persona id in a seed) fails with a clear message. `docs/simulation-data.md`: one page on the three formats.

## Acceptance
- The three schemas and the lint exist and every defect above fails (tests).
- FRAMINGS.json holds the four framings verbatim and the seed lint compares against it.
- `npm run verify` green.

## Out of scope
- Actual personas and seeds (following units).
- The harness that reads them (can_server).
