---
id: "11-u42"
plan: "11"
title: "Seed 4 files: climate change decomposition, needs the problem graph (founder gate until then)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 142
depends_on: ["11-u41"]
writes: ["simulation/seeds/seed-4-climate/**"]
reads: []
spec: ["docs/design/ai/simulation.md#9-seeds-3-and-4-join-later","docs/adr/0011-persona-simulation-proof.md","docs/spec/07-systemic-evidence.md"]
verify: ["npm run verify"]
founder_gate: true
defaults: "Same prerequisite as 11-u41: the problem graph must exist first."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Seed 4, framing verbatim: "Climate change creates large, interconnected harms that require decomposition into bounded geographic, sectoral, mitigation, adaptation, finance, governance, and verification problems." Synthetic evidence, no individuals, label "Seed problem, synthetic evidence".

## Steps
1. Confirm the graph units exist and are done; if not, stop and report.
2. Write the seed files with a parent and children along the seven axes in the framing (geographic, sectoral, mitigation, adaptation, finance, governance, verification), synthetic evidence under the fake domain, a rubric and variants as in seed 3.
3. Extend the persona variants for decomposition proposals; run lint.
4. Lifecycle v2 (W13): each child problem gets its own stage plan and final acceptance criteria, as in 11-u41.

## Acceptance
- The seed lints and the framing equals D-56 seed 4 byte for byte.
- Children cover the seven axes.

## Out of scope
- The problem graph (spec 07, not planned).
