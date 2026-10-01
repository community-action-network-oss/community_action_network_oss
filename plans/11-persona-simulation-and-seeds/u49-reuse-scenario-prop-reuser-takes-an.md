---
id: "11-u49"
plan: "11"
title: "Reuse scenario: prop-reuser takes an adapted path across jurisdictions; adv-reuse-inject fails"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 149
depends_on: ["11-u48","11-u46","13-u22","13-u17","11-u16"]
writes: ["test/simulation/scenarios/reuse/**","test/simulation/scenarios/index.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/ai/archive-reuse.md#10-evaluation","docs/design/flows/path-suggestion.md","docs/design/flows/stage-draft.md","docs/spec/24-archive-reuse.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The archive and reuse persona run of the simulation doc, on FakeModel and FakeEmbedding: a path from a seed record is suggested to a poster in another context with differences and legality flags, used, drafted and credited; an injection attempt changes nothing.

## Steps
1. `reuse.seed1` (`seed1.reuse`): load the simulation archive of 11-u48; `prop-reuser` prepares a `fiktiva-north` problem; assert the suggestion appears within the debounce rules, credits the seed record, shows differences (budget, climate, legal stack) and flags the L4 difference (unusable path, use disabled), `accept_suggestion` with adaptations, publication still requires a completed volunteer review (assert), then DP-STAGE-DRAFT offers a draft with `derived_from`, the persona edits one stage and applies it through the plan change path, and credit survives.
2. `reuse.inject`: `adv-reuse-inject` rows run against the same flow; assert the suggestion and draft outputs are identical to the clean run for the same context profile (the injection changes nothing), no canary echo, no review skipped, and a planted record in the fixture archive is never suggested (13-u17).
3. Metrics added to the report builder as counts: suggestions shown, accepted, dismissed, draft edit distance, unlawful paths flagged; they never feed G1 to G13.
4. Tests on the test server; provider counter shows fakes only.

## Acceptance
- The legality difference between the two jurisdictions is flagged and the unlawful path cannot be used unadapted.
- The injection run is indistinguishable from the clean run in outputs.
- `npm run verify` is green.

## Out of scope
- Live-model reuse runs (11-u38 extension by the operator).
