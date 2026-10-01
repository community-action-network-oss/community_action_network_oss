---
id: "07-u11"
plan: "07"
title: "Native device smoke test run (founder-gated)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 220
depends_on: ["07-u10"]
writes: ["docs/native-smoke-results.md"]
reads: ["docs/native-smoke-checklist.md"]
spec: ["docs/open-questions/OQ-native-device-testing.md","docs/spec/01-slice-1-brief.md#1-what-slice-1-is","docs/design/system-design.md#10-web-first-verification","docs/design/ux/wireframes/auth.md#WF-SIGNIN-2","docs/design/ux/wireframes/browse.md#WF-LIST-1","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npm run verify"]
founder_gate: true
defaults: "None: skipped until a human with a device runs it."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The founder (or a device-equipped contributor) runs the native smoke checklist on a real device or simulator and records results. No agent can do this; it is tracked so the gap is visible.

## Steps
1. Run docs/native-smoke-checklist.md on iOS and Android with the server reachable from the device.
2. Record pass or fail per item with date, OS version and device in docs/native-smoke-results.md.
3. File an open question for each failure with a proposed default.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Results file lists device, OS, date and each checklist item.
- Failures become open-question files.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Store submission.
- Automated device farms.
