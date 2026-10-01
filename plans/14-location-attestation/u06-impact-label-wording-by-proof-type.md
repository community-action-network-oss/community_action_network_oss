---
id: "14-u06"
plan: "14"
title: "Impact label wording by proof type: \"Reported impacted\" while self-asserted (D-75)"
repo: can_app
area: can-app
model: sonnet
est_hours: 1
priority: 455
depends_on: ["12-u22","14-u04"]
writes: ["src/location/guest/**","src/i18n/en.json","__tests__/guest-wording*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/guest.md#WF-GUEST-1","docs/design/ux/copy-deck-lifecycle.md","docs/open-questions/OQ-impacted-label-web.md","docs/spec/constitution/rules-legal-sim.md#GUEST-LABEL-1","docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/design/location/attestation.md#6-ux-hooks","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The Guest badge and its explanation sheet are 12-u22, the filter is 12-u23. This unit only makes the wording follow the strength of the proof (D-75): while the check is self-asserted on web the label reads "Reported impacted" and never claims a verified location; the wording switches on the response field `proofType`.

## Steps
1. Read 12-u22 first. In the screen reader label and any text that says an item is impacted, replace "From inside the affected area" by the copy-deck id for "Reported impacted" when `proofType` is `client_assertion` or `device_attested` (D-75 default; the founder may override through the copy deck id without code, OQ-impacted-label-web). Keep the badge, its explanation and the filter untouched.
2. Centralise the choice in one function `impactWording(proofType)` returning copy ids, so 14-u44 can add `zk_cell_v1` without touching components.
3. Scan test: no string in the i18n file for the label or the explanation contains the words verified location, proof of location or spoofing; no em or en dashes (npm run lint:copy).
4. Every string goes through useT() ids in src/i18n/en.json (ids from the copy decks); no em or en dashes (npm run lint:copy). Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply.
5. Tests: each proof type returns its wording; the sheet and the label agree; none of the forbidden phrases exist.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Wording follows the proof type everywhere an item is called impacted.
- No string claims a verified location or mentions spoofing.
- `npm run verify` is green.

## Out of scope
- The badge and the filter (12-u22, 12-u23).
