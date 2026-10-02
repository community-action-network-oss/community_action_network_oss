---
id: "16-u12"
plan: "16"
title: "New page /where-you-fit/: come as you are"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 0.8
priority: 4
depends_on: ["16-u11"]
writes: ["src/app/where-you-fit/**", "src/components/**", "src/content/**", "src/config/site.ts", "scripts/check-out.mjs"]
spec: ["DECISIONS.md", "docs/spec/18-phases-gates.md", "docs/design/ux/visual-direction.md", "docs/adr/0007-gluestack-design-system.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: done
attempts: 0
commits: ["0a5da7b"]
actual_hours: 0.1
---
## Objective
Explain, in plain words and pictograms, that anyone can build a profile, nobody is underqualified, and CAN will show each person only the few problems they can move. Vision, not feature. Everything is Planned.

## Steps
1. Load the can-gallery skill and the impeccable skill. PRODUCT.md and the Direction contract (`.impeccable/surfaces/src-app-page-tsx.md`) are settled (D-80): read both and `reference/craft-floor.md`, then build to them. Never run impeccable init, concept-seed or a direction round.
2. Open with: you do not need to be an expert in problems; you already know something a public problem needs.
3. A plate of five fictional people (a nurse, a hotel night manager, a council clerk, a retired electrician, a student who speaks two languages), each with the two or three fictional problems they would be shown and why (a skill, a language, a place). Label Fictional example.
4. 'What CAN will ask you' as a static illustration of the structured questions (what you know, what you can give, languages, places you are connected to, what affects you, causes). Not a form; no inputs.
5. 'It stays on your phone' and 'Nothing guesses what keeps you scrolling', with an Unfold holding the privacy detail (no name or contact, on-device matching, interest-blind notices, delete everything) and a link to docs/spec/26-capability-profile.md via the docs route (DocRef) if it exists in the manifest, else to the repository.
6. Close with 'A few problems, done properly' and the action into /contribute/ for people who want to help build it now.
7. Point the nav link from 16-u10 at /where-you-fit/ and add the route to check:out's route list if it keeps one.
8. Keep every piece of information the page serves today: move detail into `Unfold`, never delete it.
9. Copy rules: plain words a nurse, cook or clerk reads first time; no em or en dashes; label anything unbuilt `Planned` and every example `Fictional example`; nothing implies CAN is live; no emergency, legal, medical or government service claims; calm, warm, no hype; never call the matching a feed; never repeat a sentence from manifesto.md, DECISIONS.md or the spec index verbatim.

## Acceptance
- Route exists, one h1, Planned and Fictional labels present.
- No form or input in out/.
- verify passes.

## Out of scope
- App screens.
