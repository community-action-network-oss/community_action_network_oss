---
id: "11-u41"
plan: "11"
title: "Seed 3 files: continuous AI capability risk, needs the problem graph (founder gate until then)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 141
depends_on: ["11-u07"]
writes: ["simulation/seeds/seed-3-ai-risk/**"]
reads: []
spec: ["docs/design/ai/simulation.md#9-seeds-3-and-4-join-later","docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/adr/0011-persona-simulation-proof.md","docs/spec/07-systemic-evidence.md"]
verify: ["npm run verify"]
founder_gate: true
defaults: "Do not start before the problem graph exists (parent and child problems, links beyond duplicate_of, jurisdictions per child, progress aggregation). Spec 07 (systemic evidence) has not been turned into a plan yet; the founder opens this unit when it has, and a plan unit for the graph must be `done` first."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Seed 3, framing verbatim: "Increasingly capable AI systems create an evolving global risk that requires continuously updated technical, institutional, legal, and social defenses." Synthetic evidence, no individuals, label "Seed problem, synthetic evidence".

## Steps
1. Confirm the graph units exist and are done; if not, stop and report.
2. Write `seed.yaml`, a parent `problem.json` and a decomposition into bounded child problems (each valid for the then-current problem schema), synthetic evidence under the fake domain, a rubric, and variants including `con-expert` proposing child problems and a scope-adversary posting an everything-problem.
3. Add the new graduation criterion "a parent reaches solved only through its children" to `thresholds.yaml` through its own stricter PR, with the harness assertion in a follow-up server unit.
4. Lifecycle v2 (W13): each child problem gets its own stage plan and final acceptance criteria in the seed files, and the parent's final criteria are phrased over its children.

## Acceptance
- The seed lints and the framing equals D-56 seed 3 byte for byte.
- The decomposition has bounded child problems with synthetic evidence only.

## Out of scope
- The problem graph itself (not planned yet, spec 07).
