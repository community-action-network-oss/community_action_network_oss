---
id: "06-u20"
plan: "06"
title: "Explainer page: the legal layer stack, lawful everywhere"
repo: "can_gallery"
area: can-gallery
model: sonnet
est_hours: 1.5
priority: 153
depends_on: ["06-u18", "06-u19"]
writes: ["src/app/lawful-everywhere/**", "src/content/legal-stack.ts", "src/components/**", "docs/claims.md", "scripts/check-out.mjs", "src/app/layout.tsx"]
spec: ["docs/design/ai/legal-stack.md", "docs/adr/0012-legal-layer-stack.md", "docs/spec/constitution/rules.md#LEGAL-STACK-1", "docs/spec/constitution/rules.md#TOPIC-FORBIDDEN-1", "docs/open-questions/OQ-legal-layer-conflicts.md", "docs/open-questions/OQ-supranational-default.md", "DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["238fca2"]
actual_hours: 0.1
---
## Objective
/lawful-everywhere/ explains the cumulative legal stack (D-61): content and solutions must satisfy every layer from human rights down to the city, so CAN never asks for anything illegal anywhere.

## Steps
1. Static stack graphic (inline SVG or CSS, with a text equivalent list): L0 CAN platform rules; L1 UN human rights (UDHR, ICCPR, ICESCR); L2 supranational where binding (for the Netherlands: EU Charter, EU law, ECHR); L3 national constitution; L4 national law; L5 regional law; L6 city rules. Tag `Planned`. Say: layers apply together, not first-match; a lower layer may restrict further but never relax a higher one.
2. Two outcomes explained with one fictional example each (label "Fictional example"): a topic forbidden by local law is not published in that place and the refusal is logged with its legal basis; a lawful problem whose only solution is illegal is published and marked stuck (legally blocked). When layers disagree on how to read a rule, the decision is held with a note and becomes a policy question (link OQ-legal-layer-conflicts).
3. Every refusal cites layer, article and corpus version; the laws live in can_policy as versioned corpora with their official source. Not legal advice (state it). Name Amsterdam only as "the first planned jurisdiction overlay" (D-56); no claim that any layer is complete or reviewed.
4. Add claims to docs/claims.md; add the route to nav, layout and scripts/check-out.mjs.
5. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.

## Acceptance
- The page lists all seven layers in order with a text alternative to the graphic.
- Both outcomes are explained and no legal-advice claim is made.
- verify passes.

## Out of scope
- Retroactive re-resolution (06-u21).
