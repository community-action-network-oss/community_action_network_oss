---
id: "11-u37"
plan: "11"
title: "Simulation run report and graduation progress view for maintainers (WF-SIM-1)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 137
depends_on: ["11-u34","10-u39"]
writes: ["src/features/simulation/**","app/policy/simulations/**","src/i18n/en.json","__tests__/simulation/**","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/policy.md#WF-SIM-1","docs/design/ai/simulation.md#8-graduation-criteria-defaults-to-be-ratified","docs/design/ux/ui-unit-template.md","docs/spec/constitution/rules.md#SIM-GATE-1"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Route `/policy/simulations/{id}` plus a list at `/policy/simulations`; maintainers only (`common.notPermitted.body`). Never rank personas; criteria show Met, Not yet, Needs a live run or Needs a founder value as text with an icon, never colour alone."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The maintainers' view of a run: header with run id, policy version and model mode ("recorded responses" or live), persona run counts by family, metrics with the previous run, the graduation checklist G1 to G13 with thresholds and states, and links to the findings that became policy proposals.

## Steps
1. Fetch the list, run and graduation endpoints from 11-u34 through the generated client; route guard for the maintainer role.
2. Render WF-SIM-1: mode statement first (deterministic runs say "Met on synthetic fixtures with recorded responses" where applicable), persona family counts (no per-persona ranking), metric rows (flip, false reject, overturn, injection, cost) with previous values and text deltas, the 13 criteria rows with value, threshold, interval and state, critical misses banner, link list to policy proposals (10-u39 route).
3. Empty, loading and error states; the graduation verdict line ("Not ready" or "Ready for founder review"), never "Open".
4. Tests with fixture payloads (deterministic-only, mixed, critical miss, no runs), not-permitted state for non-maintainers, a11y and RTL.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-SIM-1.
- Criteria are listed with thresholds and a text state each (tests).
- No ranking of personas appears (test).
- Deterministic-only data never shows a ready verdict (test).
- `npm run verify` is green on web.

## Out of scope
- Starting runs from the UI.
- Opening public participation (founder action).
