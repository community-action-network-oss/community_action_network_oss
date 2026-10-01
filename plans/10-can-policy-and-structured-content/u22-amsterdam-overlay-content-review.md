---
id: "10-u22"
plan: "10"
title: "Amsterdam overlay legal content and reviewer (founder action)"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 22
depends_on: ["10-u21"]
writes: ["packs/jurisdictions/nl-amsterdam/**"]
reads: []
spec: ["docs/open-questions/OQ-amsterdam-overlay-review.md","docs/open-questions/OQ-legal-policy-reviewers.md","docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2","DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: true
defaults: "If no qualified Dutch reviewer is found, fill the overlay from public sources, keep `reviewed: false`, and keep the unreviewed banner; public participation stays closed (SIM-GATE-1) and the overlay is used only on synthetic evidence."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Real legal content for the Amsterdam overlay and a named reviewer or partner. Legal text is gated: a human with legal competence decides what the overlay asserts. Agents may prepare drafts from public sources for the reviewer, but nothing is marked reviewed without the founder.

## Steps
1. Founder (or delegate) names a reviewer or partner (Dutch municipal-law specialist, Amsterdam civic organization) and records it in `reviewer.yaml` with date and scope; or explicitly accepts `unreviewed` with the banner (the OQ default).
2. Fill `sources.md` with real sources and effective dates for the topics in `competence.yaml`; fill each placeholder rule text with a short statement of the competence or constraint and its source, in English with Dutch terms where needed.
3. Run seeds 1 and 2 mentally against the overlay: the seed-1 `stuck` proposal (a measure the municipality cannot legally take directly) must be blockable by a rule here; seed 2 must have a competent body for cleaning.
4. Set `status: ratified` only through the ratification record (10-u28); otherwise leave `draft`.

## Acceptance
- A reviewer or an explicit "unreviewed" acceptance is recorded.
- Every rule has a real source, an effective date and a retrieved date, or stays `proposed`.
- `npm run verify` green.

## Out of scope
- Any claim that the overlay is legal advice.
- Other jurisdictions.
