---
id: "10-u21"
plan: "10"
title: "Amsterdam (NL) jurisdiction overlay skeleton, marked unreviewed"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1
priority: 21
depends_on: ["10-u06","10-u20"]
writes: ["packs/jurisdictions/nl-amsterdam/**"]
reads: []
spec: ["docs/open-questions/OQ-amsterdam-overlay-review.md","docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","docs/design/ai/policy-pack.md#layers-and-precedence","DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Structure and source list only. Do not state any legal rule as authoritative text; every rule body in this unit is `text: \"TODO legal review\"` with `status: proposed` and a `sources` list. The pack status is `draft` and `reviewer: none`; it may only be used on synthetic evidence."
status: done
attempts: 0
commits: ["0591549"]
actual_hours: 0.1
---
## Objective
The skeleton of the first real jurisdiction overlay (D-56): file layout, competence table headings, source checklist with effective dates to fill, and the unreviewed marking, ready for the founder-gated legal content unit (10-u22). No legal assertion is made here.

## Steps
1. `pack.yaml` (name nl-amsterdam, layer jurisdiction, parent constitution, jurisdiction `NL-AMSTERDAM`, `status: draft`, `reviewed: false`, `languages: [en, nl]`), `rules.yaml` with placeholder ids `NL-AMS-COMP-1` (competent bodies), `NL-AMS-SAFETY-1` (public safety and policing competences, seed 1), `NL-AMS-PUBLICSPACE-1` (cleaning and public space, seed 2), `NL-AMS-PRIV-1` (data protection overlay), each `text: "TODO legal review"`, `status: proposed`.
2. `competence.yaml` skeleton: topics for seeds 1 and 2 (explosives and violent incidents, public order, criminal investigation and prosecution, civil liberties; street cleaning, waste collection, enforcement of littering rules, communications) each with `body: ""` roles only (for example "the municipal department for public space", never a named person) and `source: ""`.
3. `sources.md`: a checklist table (source, kind, URL placeholder `TODO`, effective date, retrieved date, who verified) listing the kinds to cite: national statute, municipal ordinance, municipal competence descriptions, data protection authority guidance. The text states plainly: "Drafted from public sources by the project. Unreviewed. Use only on synthetic evidence." `reviewer.yaml`: `reviewer: none`, `blocking: true` with the OQ link.
4. Add a lint rule: a pack with `reviewed: false` must carry the unreviewed banner in `sources.md`, may not be selected as `active` by a ratification record without the field `unreviewed_acknowledged: true` (record format arrives in 10-u26: add the check there), and every rule with `text` containing `TODO` must be `status: proposed`.
5. Add Dutch placeholders: `messages.nl.json` stubs only for route texts, empty strings flagged `needs_translation`.

## Acceptance
- Overlay skeleton lints; unreviewed banner present; no rule text asserts law.
- Every rule is `proposed` with `TODO legal review`.
- `npm run verify` green.

## Out of scope
- Legal content and reviewer (10-u22, founder-gated).
- Dutch translations.
