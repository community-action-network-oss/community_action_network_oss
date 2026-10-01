---
id: "13-u26"
plan: "13"
title: "Archived case view: the full journey, challenges and outcome (WF-ARCHIVE-2)"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 433
depends_on: ["13-u25","12-u05"]
writes: ["app/archive/**","src/features/archive/**","src/i18n/en.json","__tests__/archive-case*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/archive.md#WF-ARCHIVE-2","docs/design/ux/copy-deck-archive.md","docs/spec/24-archive-reuse.md","docs/design/ux/wireframes/stages.md#WF-STAGEMAP-1","docs/design/ux/wireframes/browse.md#WF-DETAIL-2","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One archived case at /archive/{id}: what was tried, what failed and why, what worked, with evidence as links, and an action to start from it.

## Steps
1. Route app/archive/[id].tsx over `getArchiveRecord`: snapshot, context profile in plain words, the stage map following the graph and list rules (reuse 12-u05), options not chosen with the reason, each `challenge` with what was tried, why it failed or what blocked it, and how it was resolved or that it was not, costs and resources in bands, the outcome per final criterion, versions, license and attribution line.
2. Evidence is shown as links to sources, never as uploaded files. A withdrawn or annotated record shows its visible note (WF-DETAIL-2 tombstone rules apply to withdrawn).
3. "Use this as a starting point" goes to the signed-in poster's draft chooser and shows the same adaptation view as WF-SUGGEST-2 (it calls the suggestion detail with this record as the source); it never creates a problem silently; guests are sent to sign in with a calm message.
4. Stuck or unresolved records state plainly what was not achieved. Simulation label as in the list.
5. Every string goes through useT() ids added to src/i18n/en.json and the ids of docs/design/ux/copy-deck-archive.md; no em or en dashes (npm run lint:copy). Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply.
6. Tests: challenges render all three parts; evidence as links; annotated and withdrawn states; the use action requires sign-in and creates nothing; list view reachable by keyboard; unresolved wording.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The whole journey is shown, including failures.
- The use action never creates a problem silently.
- `npm run verify` is green.

## Out of scope
- Server changes.
