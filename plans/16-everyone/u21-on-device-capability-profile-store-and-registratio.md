---
id: "16-u21"
plan: "16"
title: "On-device capability profile store and registration screens"
repo: "can_app"
area: "can-app"
model: sonnet
est_hours: 1.5
priority: 10
depends_on: ["16-u04", "16-u01"]
writes: ["src/**", "app/**", "test/**"]
spec: ["DECISIONS.md", "docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Build WF-PROFILE-1 to WF-PROFILE-6: the structured, skippable registration stored only on the device, encrypted at rest. Acceptance follows docs/design/ux/ui-unit-template.md.

## Steps
1. Read docs/design/ux/wireframes/profile.md and spec 26.
2. Encrypted local store (platform keystore for the key); propose-then-save: nothing is written until the person confirms a step.
3. Export to a file, import, delete all (key first, then store). No network call carries profile data.
4. Screens per WF-PROFILE-1 to 6 on the civic wrappers.

## Acceptance
- Screens match the frames.
- A test proves no fetch carries profile fields.
- verify passes.

## Out of scope
- Matching (16-u22).
