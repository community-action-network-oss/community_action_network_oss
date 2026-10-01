---
id: "10-u20"
plan: "10"
title: "Fictional test jurisdiction overlay: fiktiva-city"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 0.8
priority: 20
depends_on: ["10-u06"]
writes: ["packs/jurisdictions/fiktiva-city/**"]
reads: []
spec: ["docs/design/ai/policy-pack.md#layers-and-precedence","docs/design/ai/evaluation.md#slice-1-bootstrap-with-fictional-fixtures","docs/design/components/can-policy.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Everything is invented; no real statute, body or place appears. The overlay may only add or narrow rules."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A fully fictional jurisdiction overlay used by examples, eval sets, fixtures and parity tests, so no test depends on real law.

## Steps
1. `pack.yaml` (name fiktiva-city, layer jurisdiction, parent constitution, jurisdiction fiktiva-city, `status: draft`, `fictional: true`), `rules.yaml` with 5 invented overlay rules (for example a council meeting notice period, an office alias pattern `{office} of Fiktiva City, officeholder as of {YYYY-MM}`, a competent-body table `competence.yaml` mapping topic to office for DP-ASSUMPTIONS and DP-LEGALITY, two routes for DP-ELIGIBILITY `route_external` keys, a law-update date).
2. `sources.md`: states the overlay is invented; `reviewer.yaml` with `reviewer: none, fictional: true`.
3. Lint addition: any overlay rule that lowers a base or constitution tier or touches a `protected_core` id fails (test with a deliberately weakening temp overlay); the overlay must not reuse an id from a higher layer except to narrow (`narrows: <id>`).
4. Add the overlay to the fixtures so 10-u15 to 10-u19 examples reference real keys (route keys, office alias, competence table).

## Acceptance
- The overlay passes lint; a weakening overlay fails (test).
- Route keys and office alias pattern exist for the DP examples to cite.
- `npm run verify` green.

## Out of scope
- Amsterdam (10-u21).
- Hash manifests (10-u27).
