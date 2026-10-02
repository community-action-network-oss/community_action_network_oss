---
id: "06-u21"
plan: "06"
title: "Explainer page: when the rules improve, past cases are re-examined"
repo: "can_gallery"
area: can-gallery
model: sonnet
est_hours: 1.0
priority: 154
depends_on: ["06-u20"]
writes: ["src/app/re-resolution/**", "src/content/re-resolution.ts", "docs/claims.md", "scripts/check-out.mjs", "src/app/layout.tsx"]
spec: ["docs/design/flows/re-resolution.md", "docs/adr/0013-retroactive-re-resolution.md", "docs/spec/01a-lifecycle.md", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/open-questions/OQ-reresolution-feasibility.md", "docs/open-questions/OQ-policy-retroactivity.md", "DECISIONS.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["8e1c401"]
actual_hours: 0.1
---
## Objective
/re-resolution/ explains retroactive re-resolution (D-59): a rule or law change is replayed over past solved, closed, redirected and stuck problems, and a problem reopens only when the conclusion changes and reopening is feasible.

## Steps
1. Explain in order: what triggers it (a policy or legal-corpus change reaching rollout); what is reviewed (past resolutions and their decision records, only those the change touches); the four results (keep, annotate, reopen, hold); the visible notice "Reopened under policy vX" with the rule that changed, history kept, appeal available; never silent, never deleted.
2. Feasibility: show the four default criteria (problem still exists, jurisdiction still enabled, the initiator or a steward can be notified, reopening does not undo a lawful completed implementation without a new proposal) and say plainly they are an open question with a link to OQ-reresolution-feasibility and the invitation to help. Tag `Planned`.
3. One fictional example ("Fictional example") of a solved problem reopening and one of an infeasible case that is annotated instead.
4. Add claims to docs/claims.md; route in nav, layout and scripts/check-out.mjs.
5. Copy rules: no em dashes or en dashes in any user-facing text; github.com is the only external host; no forms, cookies, analytics or third-party requests; label unbuilt things `Planned`; nothing implies the platform is live or handling real problems; no emergency, legal, medical or government service claims; calm, warm, no hype.
6. Lifecycle v2 and archive (W13): say that what is re-examined is the Archive record of each ended problem and the resolved stages of active problems; a reopen returns the problem to active and only the affected stages return to work, their later stages wait again, and the old Archive record is kept (a new one is added when the problem ends again). Where this page says resolution or resolution record, say stage result or Archive record.

## Acceptance
- The page states never silent, history kept, appealable, with the feasibility open question linked.
- verify passes.

## Out of scope
- Persona proof page (06-u22).
