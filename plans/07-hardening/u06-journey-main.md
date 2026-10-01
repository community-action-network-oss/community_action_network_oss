---
id: "07-u06"
plan: "07"
title: "Playwright journey: seed problem from draft to solved with FakeModel runs"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 120
depends_on: ["02-u21", "05-u08", "05-u07", "04-u11", "09-u44", "09-u48", "09-u49", "09-u40", "09-u41", "09-u42", "10-u33", "10-u34", "10-u35", "11-u18"]
writes: ["e2e/journeys/main.spec.ts", "e2e/helpers/**", "package.json"]
reads: ["e2e/**","src/**","app/**"]
spec: ["docs/design/ux/journeys.md", "docs/spec/01-slice-1-brief.md#1-what-slice-1-is", "docs/spec/01-slice-1-brief.md#7-what-solved-means", "docs/spec/01a-lifecycle.md", "docs/design/ux/copy-deck.md", "docs/design/ux/wireframes/forms.md#WF-FORM-1", "docs/design/ux/wireframes/submit.md#WF-SUBMIT-3", "docs/design/ux/wireframes/submit.md#WF-SUBMIT-4", "docs/design/ux/wireframes/submit.md#WF-PENDING-1", "docs/design/ux/wireframes/browse.md#WF-RESOLUTION-1", "docs/design/ux/wireframes/participate.md#WF-TASK-2", "docs/design/ux/ui-unit-template.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npm run e2e -- e2e/journeys/main.spec.ts"]
founder_gate: false
defaults: "If Chromium or docker is unavailable the unit is skipped by preflight; do not weaken assertions to make it pass."
status: skipped
attempts: 0
commits: []
actual_hours: null
blocked_reason: "superseded by 12-u25, 12-u26"
---
## Objective
The headline acceptance of slice 1: one Amsterdam-framed seed problem (D-56, synthetic evidence) walked from draft to solved by real UI against the real server, Mailpit and the FakeModel. Every publication and every consequential transition is decided by a recorded moderation run under the ratified fixture policy, never by a person.

## Steps
1. Before the spec: reset and seed through the harness prepare script (npm run seed:reset, then the seed bootstrap of 11-u18 for the synthetic seed account and Amsterdam overlay, with AI_PROVIDER=fake and the recorded FakeModel script for this journey, 09-u12). No live provider and no paid call. Use the plan 02 helpers (signUpWithInvite, signInAs through Mailpit, axe).
2. Journey, as one serial spec with named test.step blocks, roles member, second member and initiator only: member signs up with a seeded invite; fills the problem form in the schema renderer (WF-FORM-1 sections, the basis question, assumptions listed; reload midway to prove local autosave and that the schema version pin survives); sees the privacy check and the mandatory preview (WF-SUBMIT-3, WF-SUBMIT-4); submits; WF-PENDING-1 shows "Awaiting review" (pre-publication moderation run, nothing public); the FakeModel run publishes; the member sees "Decided under policy vX" with the rule citation and the decision email in Mailpit; another member submits an evidence contribution as a schema form, it shows "Awaiting review" to its author only, then becomes visible after its run; initiator moves T08, adds two proposals (each run-gated, 09-u41), T09, records the decision with a layered legal-gate record clear, creates a task and proposes T11, the run applies it; another member claims and completes the task; T12; verification evidence (URL plus attestation, schema form) published; initiator proposes solved with an outcome statement, the run decides T14; the Resolution record appears in WF-RESOLUTION-1 as "Decided under policy vX".
3. After each major step assert the status label text from the lifecycle vocabulary (not colour), run expectNoSeriousAxeViolations on the key screens, and keep selectors role and label based (getByRole, getByLabel) so copy changes do not break structural intent; use text from the copy deck constants where exported. Assert that no control for a person to confirm, decline or override a decision exists on any screen.
4. Run at both Playwright projects (360 and 1280). Capture screenshots into test-results only (not committed).
5. If a UI gap blocks the journey, fix the smallest thing in app code in this unit and note it in the commit message; do not skip a step.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The journey passes from reset seed to solved at both viewports with the FakeModel and no network call to any model provider.
- Every publication and decision in the journey carries a run-derived policy version; no person decides anything.
- No fixed sleeps; all waits are web-first assertions or Mailpit polling.
- The Resolution record shows "Decided under policy vX".
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Revise, rejection, appeal-to-example, hold (07-u07).
- Re-moderation notice and re-resolution reopen (07-u21); legal stack refusal and legally blocked stuck (07-u22).
- Native device runs (founder-gated).
