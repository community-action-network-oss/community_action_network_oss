---
id: "10-u67"
plan: "10"
title: "Second synthetic jurisdiction: fiktiva-north overlay and legal stack with deliberate differences"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 67
depends_on: ["10-u20","10-u41","10-u53"]
writes: ["packs/jurisdictions/fiktiva-north/**","packs/legal/synthetic/fiktiva-north/**","test/fiktiva-north.test.mjs"]
reads: ["packs/**","schemas/**"]
spec: ["docs/design/ai/legal-stack.md","docs/design/ai/policy-pack.md#layers-and-precedence","docs/design/ai/evaluation.md#slice-1-bootstrap-with-fictional-fixtures","docs/design/ai/archive-reuse.md#6-dp-reuse-fit","docs/design/components/can-policy.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A second invented jurisdiction so the reuse e2e (13-u22) and the archive eval (13-u18) can test legality differences: one source option that is lawful in fiktiva-city is unlawful at L4 in fiktiva-north, the budget class is lower and the climate class differs. Everything is labelled fictional.

## Steps
1. `packs/jurisdictions/fiktiva-north/` as in 10-u20 (`pack.yaml` name fiktiva-north, layer jurisdiction, parent constitution, `fictional: true`, `status: draft`, `reviewer.yaml` none, `sources.md` states it is invented, 5 invented overlay rules and a `competence.yaml` that differs in at least one office).
2. Synthetic six-layer corpus under `packs/legal/synthetic/fiktiva-north/` in the corpus format of 10-u41 (L1 to L6, a few invented articles each, labelled fictional with the provenance fields filled with `fictional`): include (a) an L4 article that forbids a collection-fee mechanism that fiktiva-city allows, (b) an L6 article that allows something fiktiva-city forbids (so differences run both ways), (c) an L2 article identical in both (a control), and a corpus version string different from fiktiva-city's to exercise the staleness flag.
3. Pin the corpora in the pack with the stack config of 10-u53 (binding L4 and L6, reference L1 and L2); add a `declared_context` file `context-fixtures.yaml` with the budget band, resource band and climate class of a typical fiktiva-north problem for the eval data.
4. Lint: the overlay passes the weakening and protected-core checks of 10-u20; the corpus passes `tools/lint-legal.mjs`; a test asserts the three planted differences exist and the control matches fiktiva-city.
5. Document in `packs/jurisdictions/fiktiva-north/README.md` which differences are planted and which tests rely on them, so nobody tidies them away.

## Acceptance
- The planted differences exist and are tested.
- The overlay and corpus lint clean and are labelled fictional.
- `npm run verify` is green.

## Out of scope
- Any real jurisdiction.
