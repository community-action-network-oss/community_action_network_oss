---
id: "14-u44"
plan: "14"
title: "Label wording and explanation for verified proofs"
repo: can_app
area: can-app
model: sonnet
est_hours: 1
priority: 494
depends_on: ["14-u42","14-u06"]
writes: ["src/components/guest/**","src/i18n/en.json","__tests__/guest-wording-zk*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#6-ux-hooks","docs/adr/0016-private-location-attestation.md","docs/design/ux/wireframes/guest.md#WF-GUEST-1","docs/open-questions/OQ-impacted-label-web.md","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Gated on the adoption decision. Switch the screen reader label and the explanation sheet for items whose `proofType` is `zk_cell_v1` to the wording the founder chose in the adoption decision, with no layout change, and keep "Reported impacted" for earlier types.

## Steps
1. Read the wording from `docs/design/location/adoption-decision.md` (copy it into the copy deck ids; do not invent new wording).
2. Branch on `proofType` in `GuestBadge` and the explanation text: earlier items keep their wording.
3. Strings only through useT() ids in src/i18n/en.json; no em or en dashes (npm run lint:copy).
4. Tests: each proof type renders its wording; no string claims more than the proof type supports; no em or en dashes.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Wording follows the adoption decision file.
- Older items are unchanged.
- `npm run verify` is green.

## Out of scope
- Other copy.
