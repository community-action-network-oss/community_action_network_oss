---
id: "07-u06"
plan: "07"
title: "Playwright journey: draft to solved"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 120
depends_on: ["02-u21","05-u08","05-u07","04-u11","03-u25"]
writes: ["e2e/journeys/main.spec.ts","e2e/helpers/**","package.json"]
reads: ["e2e/**","src/**","app/**"]
spec: ["docs/design/ux/journeys.md","docs/spec/01-slice-1-brief.md#1-what-slice-1-is","docs/spec/01-slice-1-brief.md#7-what-solved-means","docs/design/ux/copy-deck.md","docs/design/ux/wireframes/submit.md#WF-SUBMIT-1","docs/design/ux/wireframes/moderation.md#WF-MOD-REVIEW-1","docs/design/ux/wireframes/browse.md#WF-RESOLUTION-1","docs/design/ux/wireframes/participate.md#WF-TASK-2","docs/design/ux/ui-unit-template.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npm run e2e -- e2e/journeys/main.spec.ts"]
founder_gate: false
defaults: "If Chromium or docker is unavailable the unit is skipped by preflight; do not weaken assertions to make it pass."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The headline acceptance of slice 1: one fictional problem walked from draft to solved by real UI in two roles, against the real server, Mailpit and seed data.

## Steps
1. Before the spec: server reset and seed through the harness prepare script (npm run seed:reset in can_server) so the run is deterministic. Use the plan 02 helpers (signUpWithInvite, signInAs through Mailpit, axe).
2. Journey, as one serial spec with named test.step blocks: member signs up with a seeded invite; writes steps 1 to 7 (reload midway to prove local autosave); submits (WF-PENDING-1 visible); moderator signs in, opens the queue, publishes with rule ids and jurisdiction; member sees the published problem and the decision email in Mailpit; another member contributes evidence, moderator accepts; initiator moves T08, adds two proposals (accepted by the moderator), T09, records the decision with legal gate clear, creates a task and moves T11; another member claims and completes the task; T12; verification evidence (URL plus attestation) accepted; initiator proposes solved with an outcome statement, moderator confirms; the Resolution record appears in WF-RESOLUTION-1 with the interim label.
3. After each major step assert the status label text from the lifecycle vocabulary (not colour), run expectNoSeriousAxeViolations on the key screens, and keep selectors role and label based (getByRole, getByLabel) so copy changes do not break structural intent; use text from the copy deck constants where exported.
4. Run at both Playwright projects (360 and 1280). Capture screenshots into test-results only (not committed).
5. If a UI gap blocks the journey, fix the smallest thing in app code in this unit and note it in the commit message; do not skip a step.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The journey passes from reset seed to solved at both viewports.
- No fixed sleeps; all waits are web-first assertions or Mailpit polling.
- The Resolution record shows the interim label.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Rejection, appeal and stuck paths (next unit).
- Native device runs (founder-gated).
