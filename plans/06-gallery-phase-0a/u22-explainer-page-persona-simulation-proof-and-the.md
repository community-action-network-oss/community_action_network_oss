---
id: "06-u22"
plan: "06"
title: "Explainer page: persona simulation proof and the four seed problems (synthetic evidence)"
repo: "can_gallery"
area: can-gallery
model: sonnet
est_hours: 1.5
priority: 155
depends_on: ["06-u21"]
writes: ["src/app/proof/**", "src/content/seeds.ts", "scripts/check-seeds.mjs", "docs/claims.md", "scripts/check-out.mjs", "src/app/layout.tsx", "package.json"]
spec: ["docs/design/ai/simulation.md", "docs/adr/0011-persona-simulation-proof.md", "DECISIONS.md", "docs/spec/01-slice-1-brief.md"]
verify: ["npm run check:seeds", "npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
/proof/ explains how CAN proves its AI-executed policy before anyone real takes part (D-55, D-56): AI persona agents act as submitters, contributors, proposers, appellants and adversaries against the real pipeline, red-team the policy pack and feed the amendment loop; graduation criteria decide when public participation opens.

## Steps
1. Sections: what personas are (agents, never real people); what they attack (injection, doxxing, floods, hate, schema abuse, legal-layer traps); graduation criteria before public participation opens (state that thresholds are defaults to be ratified); CI uses a fake model, live runs are founder-approved; results will be published as reports (Planned).
2. Seed problems: show the four D-56 framings verbatim as `Seed problem, synthetic evidence` cards; seeds 1 and 2 are first (Planned), seeds 3 and 4 wait for the problem graph (Planned). Say: the framings are real public topics, the evidence is synthetic, no individual is named. `src/content/seeds.ts` holds the texts.
3. `scripts/check-seeds.mjs`: each framing in `seeds.ts` equals the verbatim text in `../DECISIONS.md` D-56 (skip with a message when the superproject is absent); each card carries the label text exactly "Seed problem, synthetic evidence"; wired as `check:seeds` in verify.
4. Amsterdam may be named only as the first real jurisdiction overlay for seeds 1 and 2 (D-56). The can-gallery skill invariant "no real jurisdiction named" predates D-56; leave a note in the commit message for the orchestrator to update the skill (this unit cannot edit .claude).
5. Claims and route registration as the other explainers.
6. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.
7. Lifecycle v2 and archive (W13): the seed cards say each seed runs a stage plan (seed 1: two parallel stages feeding the design stage, then pilot and measurement; seed 2: baseline, two parallel stages, pilot, result) and that every finished run leaves a labelled simulation record in the Archive that new problems can learn from (cold start; shown with "Seed problem, synthetic evidence" and never mixed into outcome statistics). Graduation criterion 1 is worded as completing the stage plan or ending honestly stuck or redirected with the record complete. Mention the archive reuse persona and the attacker that plants instructions in a draft, in one plain sentence each.

## Acceptance
- The four framings are verbatim and labelled "Seed problem, synthetic evidence" (check:seeds).
- The page makes clear personas are simulated and nothing here is a real problem.
- verify passes.

## Out of scope
- Publishing real simulation reports (not yet produced).
