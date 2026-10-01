---
id: "16-u04"
plan: "16"
title: "Wireframes WF-PROFILE-1 to 6 and WF-MATCH-1, journey J-PROFILE and copy deck"
repo: "."
area: "can-spec"
model: sonnet
est_hours: 1.5
priority: 4
depends_on: ["16-u01"]
writes: ["docs/design/ux/wireframes/profile.md", "docs/design/ux/journeys.md", "docs/design/ux/screens.md", "docs/design/ux/copy-deck.md"]
spec: ["DECISIONS.md", "docs/design/ux/wireframes/auth.md", "docs/design/ux/wireframes/browse.md", "docs/design/ux/journeys.md"]
verify: ["python3 docs/design/check.py", "node plans/tools/corpus.mjs lint"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Design the profile registration and the 'Problems you can move' view so app units can build them.

## Steps
1. Read auth.md (WF-ONBOARD-1) and browse.md (WF-LIST-1) for the wireframe format.
2. WF-PROFILE-1 welcome: 'You do not need to be an expert in problems. You are already good at something.' and 'This stays on this phone.'
3. WF-PROFILE-2 what you know (skill groups, chips), WF-PROFILE-3 what you can give (time, kinds of help), WF-PROFILE-4 places you are connected to (coarse, device check per ADR 0016), WF-PROFILE-5 languages, what affects you and causes. Every step skippable, 'You can change this later' on each.
4. WF-PROFILE-6 review: everything listed, stored on this device, export, delete.
5. WF-MATCH-1 'Problems you can move': a short list, each with 'Why you see this' naming the matched skill, language or place; a link to the plain chronological list; no counts, no badges.
6. Add journey J-PROFILE to journeys.md and the frames to screens.md. Add every message id to copy-deck.md (check.py fails on unknown ids).

## Acceptance
- Seven frames defined, journey added, copy ids exist, check.py passes.

## Out of scope
- App code.
