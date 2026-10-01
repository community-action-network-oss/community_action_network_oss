---
id: "06-u24"
plan: "06"
title: "Explainer page: the private location check, impacted and guest labels"
repo: can_gallery
area: can-gallery
model: sonnet
est_hours: 1
priority: 156
depends_on: ["06-u23"]
writes: ["src/app/private-location/**","src/content/location-explainer.ts","docs/claims.md","scripts/check-out.mjs","src/app/layout.tsx"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md","docs/adr/0016-private-location-attestation.md","docs/spec/constitution/ch02-privacy-participation.md","docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/open-questions/OQ-impacted-label-web.md","DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
/private-location/ is the page the permission prompt links to ("learn more"): plain words on how a message is labelled impacted or guest without anyone learning where a person is (D-73, D-75).

## Steps
1. Sections, each tagged `Planned`: (1) Why a label: readers should know whether a message comes from people the problem affects; the label belongs to one message, not a person, and guest content is always labelled and never hidden unless a reader chooses "Impacted only". (2) How it works in the first version: the check runs on your device against the affected area; your exact location is never sent or saved; only the result, the area version and the kind of check are stored. (3) What it cannot do: on the web the check is self-asserted, so the label reads "Reported impacted" and nobody claims it proves where you were; a determined person can fake a location; the label has no effect on whether a message is accepted or how it is judged. (4) What happens when the check fails or you say no: your message still goes through, labelled guest, with a neutral reason, and you can check again later; nothing is held against your account. (5) The next step, honestly: a zero-knowledge proof so the server learns even less, adopted only if it passes measured limits (about 3 seconds on a mid-range phone, a small proof, a clean external privacy review); until then it is not built. (6) What we never store: coordinates, grid cells, location derived from your network address, or a trail of places.
2. No claim of verified location anywhere on the page. A short "Fictional example" of a resident, a visitor and a commuter and the label each would see.
3. Claims to docs/claims.md with source paths; route in nav, layout and scripts/check-out.mjs.
4. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.

## Acceptance
- The page says self-asserted on web, never verified, and lists what is never stored.
- `npm run verify` passes.

## Out of scope
- The app prompt (12-u24).
