---
id: "13-u24"
plan: "13"
title: "Suggestion detail and \"use as starting point\" sheet (WF-SUGGEST-2)"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 431
depends_on: ["13-u23","12-u05","12-u14"]
writes: ["src/features/suggestions/**","app/me/problems/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/suggest-detail*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/archive.md#WF-SUGGEST-2","docs/design/ux/copy-deck-archive.md","docs/design/flows/path-suggestion.md","docs/spec/constitution/rules-legal-sim.md#REUSE-CONTEXT-1","docs/spec/constitution/rules-legal-sim.md#REUSE-CREDIT-1","docs/design/ux/wireframes/stages.md#WF-STAGEMAP-1","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The full detail of one path: source cases, similarity and differences per dimension, legality per layer, resource fit, adaptations, draft stages with credit, and the confirm-then-copy action.

## Steps
1. Run `npm run gen:api` if the contract changed since 13-u23 and commit `src/api/schema.d.ts`.
2. Detail screen from `getSuggestion`: source cases (links to /archive/{id}, license, "Based on" credit), a per-dimension table (dimension name, your value, their value, same, close or different as text plus icon), differences before the action, legality with one row per layer L0 to L6 in force (Allowed, Needs a legal check, Not allowed, the reason and source link), resource fit listing each needed item against what the poster listed (fits, stretch, exceeds with the gap), adaptations with reasons, confidence in words, and the draft stages using the graph and list pair of WF-STAGEMAP-1 (list is the default for screen readers; reuse the components of 12-u05).
3. "Use as starting point" opens a confirm sheet (`suggest.use.confirm`); only after confirming are the draft stages copied into the stage plan editor (WF-PREP-3) as editable stages with their credit, through the draft API; it never touches facts or criteria and calls `acceptSuggestion` with the chosen adaptations. The action is disabled with the reason beside it when legality says Not allowed.
4. High-stakes domains (medicine, agriculture, law, finance, mental health, engineering) show the uncertainty line from the copy deck and the stronger-review note.
5. Every string goes through useT() ids added to src/i18n/en.json and the ids of docs/design/ux/copy-deck-archive.md; no em or en dashes (npm run lint:copy). Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply.
6. Tests: all dimension rows render both values; layer rows complete; disabled action with reason for Not allowed; confirm sheet gates the copy; copied stages carry credit; facts and criteria untouched; list view reachable by keyboard.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Every difference is shown before the use action, in words with the dimension name.
- Nothing is copied without the confirm sheet.
- `npm run verify` is green.

## Out of scope
- The archive screens.
