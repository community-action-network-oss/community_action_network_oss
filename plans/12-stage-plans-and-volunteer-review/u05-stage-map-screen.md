---
id: "12-u05"
plan: "12"
title: "Problem page stage map (WF-STAGEMAP-1) with accessible list view"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 36
depends_on: ["12-u02", "02-u20", "02-u24", "02-u25", "02-u14"]
writes: ["app/problems/**", "src/stages/**", "src/i18n/en.json", "__tests__/stagemap-*.test.tsx", "src/api/schema.d.ts"]
reads: ["src/**"]
spec: ["docs/spec/01b-stages.md", "docs/design/ux/wireframes/stages.md#WF-STAGEMAP-1", "docs/design/ux/copy-deck-lifecycle.md", "docs/design/ux/ui-unit-template.md", "docs/design/flows/stage-advancement.md"]
needs: []
verify: ["npm run verify", "npx jest --ci __tests__/stagemap-screen.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["1788781"]
actual_hours: 0.1
---
## Objective
Build WF-STAGEMAP-1: the stage map on the problem page, replacing the single "Stage:" line of the status panel. A graph view and an equivalent list view from the same data (`GET /v1/problems/{id}/stages`). Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).

## Steps
1. `npm run gen:api` and commit `src/api/schema.d.ts` with this unit (the server contract exists after 12-u02).
2. `src/stages/StageMap.tsx` and `StageList.tsx` on the gluestack civic wrappers (02-u25). The list view is the default for screen readers and one-column phones and the toggle `{plan.view.graph}` or `{plan.view.list}` is always visible. Each node shows the stage name and a chip with the exact text (Planned, Ready, In progress, Checking evidence, Done, Blocked, Skipped), never colour alone; current stages (ready, active, resolving) also carry the text "Current" and a thicker outline. Edges are arrows and are also stated in words ("Starts after"). The list is in topological order (the API order).
3. Graph layout is a pure function `layoutDag(nodes, edges)` (layered by longest path from the start nodes, nodes in a layer ordered by list order); arrows with `react-native-svg` (bundled with Expo, `npx expo install react-native-svg`); Tab and arrow keys move between nodes, Enter opens the stage (`/problems/{id}/stages/{stageId}`, built in 12-u18 to 12-u20; until then the target shows a planned label). Default if SVG is unavailable on a platform: render the list.
4. Problem chip from the API data: "Active: stage {name}" or "Active: {n} stages in progress"; "Solved" only when the API says so. A blocked stage cites its constraint; a skipped stage cites its reason; the final criteria node is shown after the stages that lead to it ("Final criteria: after Choose, Funding"). A published problem with no stage plan shows only the final criteria. The action `{stagemap.change}` ("Propose a change to the plan") opens a placeholder until 12-u21.
5. States: loading, error, offline (cached), not permitted, and the empty plan. Copy ids are in docs/design/ux/copy-deck-lifecycle.md (no hard-coded strings, no em or en dashes).
6. Tests: list and graph render the same nodes; topological order; chip text for one and several active stages; keyboard traversal in the graph; heading outline; 200 percent text does not clip; a skipped and a blocked stage render their reason.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6).
- The graph and the list show identical data; the list is always reachable.
- No colour-only status; chips are the exact spec text.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The stage workspace screens (12-u18 to 12-u20) and the plan change form (12-u21).
- Drawing arbitrary-position graphs or dragging edges.
