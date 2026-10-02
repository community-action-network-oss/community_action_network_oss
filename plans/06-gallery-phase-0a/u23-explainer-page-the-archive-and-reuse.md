---
id: "06-u23"
plan: "06"
title: "Explainer page: the Archive and reuse, solving common problems together"
repo: can_gallery
area: can-gallery
model: sonnet
est_hours: 1
priority: 155
depends_on: ["06-u22"]
writes: ["src/app/archive-and-reuse/**","src/content/archive-explainer.ts","docs/claims.md","scripts/check-out.mjs","src/app/layout.tsx"]
reads: ["src/**"]
spec: ["docs/spec/24-archive-reuse.md","docs/design/ai/archive-reuse.md","docs/adr/0017-archive-and-path-reuse.md","docs/spec/constitution/ch04-resolution-lifecycle.md","docs/open-questions/OQ-contribution-license.md","DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["4ea292c"]
actual_hours: null
---
## Objective
/archive-and-reuse/ explains the second main goal (D-76): every problem that ends, solved or not, goes into a public Archive with personal data stripped, and a new problem can start from what worked or failed elsewhere, adapted and checked, never adopted automatically, always credited.

## Steps
1. Sections, each tagged `Planned` (nothing is built): (1) What the Archive keeps: the whole journey of an ended problem (facts and sources, the stage plan as it ran, options and the reasons for the choices, evidence links, what failed or was blocked and why, costs, the outcome), personal data stripped. Failed paths are kept on purpose. (2) How suggestions work: while a poster prepares a problem the AI finds similar ended problems by context (type, size, budget, climate, institutions, legal setting), shows what is the same and what differs, checks the legal setting and the resources of the new place, and proposes an adapted path. (3) The poster decides: nothing is adopted automatically, volunteer review is still required, the community is invited and is not a blocker. (4) Credit: every suggestion and every stage plan drawn from one links back to its source case; default license CC BY 4.0, an open question (link OQ-contribution-license). (5) An example, labelled "Fictional example": an affordable approach proven in one city offered as a starting path to a low-resource town, with the legality check flagging one step. (6) Honest limits: the Archive starts empty and is filled first by the simulation seeds (labelled), high-stakes domains need expert review, the match can be wrong and the poster checks it.
2. Static inline SVG diagram (accessible name, no external asset): ended problem -> Archive record -> similar new problem -> suggested path with differences and legality check -> poster decides -> credit.
3. Claims to docs/claims.md with source paths (06-u01 register); route in nav, layout and scripts/check-out.mjs; link `DocRef` to the spec and design doc on github.com.
4. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.

## Acceptance
- The page states never automatic, credit always, failures kept, and the open license question linked.
- `npm run verify` passes.

## Out of scope
- The static Archive pages (06-u25).
