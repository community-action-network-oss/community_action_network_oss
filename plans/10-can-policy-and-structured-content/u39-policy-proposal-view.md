---
id: "10-u39"
plan: "10"
title: "Policy proposal view: eval results, replay diff, ratification, rollout (WF-POLICY-2)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 39
depends_on: ["10-u38","10-u32"]
writes: ["src/features/policy/**","app/policy/**","src/i18n/en.json","__tests__/policy/**","src/api/schema.d.ts"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/policy.md#WF-POLICY-2","docs/design/ai/amendment-loop.md#3-replay-diff","docs/design/ai/evaluation.md#replay-diff-method"]
verify: ["npm run gen:api","npm run verify"]
founder_gate: false
defaults: "Results are text plus icon (Passed, Did not pass), never colour alone and never red for a failed test of a proposal. Ratification actions for panel members are hidden entirely in this unit (no voting yet); show only status and the transitional badge."
status: done
attempts: 0
commits: ["a6d5c99"]
actual_hours: null
---
## Objective
Route `/policy/{id}`, readable by anyone, showing summary fields, automated test results, replay totals and masked examples, ratification state with the `status.transitional` badge while founder stewardship applies, and rollout stages with dates.

## Steps
1. Fetch `GET /v1/policy-proposals/{id}`; render summary fields from the schema (read-only mode of `SchemaForm`), stage chip, eval table rows with Passed or Did not pass and the line "Did not pass. This blocks the change.", replay block (changed of total, expected, unexpected, stricter, more permissive, masked examples).
2. Ratification block: panel status, transitional badge, dissent list (empty state text); rollout list shadow, canary, full with dates and current marker.
3. Empty and loading states for proposals with no reports yet; errors per the shared pattern; copy ids from the copy deck (`policy.eval.*`, `policy.replay.*`, `policy.ratify.*`).
4. Tests with fixture responses for each stage, a failed gate, and no-report state; a11y (no colour-only status), RTL.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-POLICY-2.
- A failed gate shows the blocking sentence with text and icon (test).
- Stage, replay totals and rollout dates render from the API payload (tests).
- No voting control is rendered (test).
- `npm run verify` is green on web.

## Out of scope
- Ratification actions for panel members.
- Simulation report view (plan 11).
