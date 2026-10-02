---
id: "16-u22"
plan: "16"
title: "On-device matcher and 'Problems you can move'"
repo: "can_app"
area: "can-app"
model: sonnet
est_hours: 1.5
priority: 11
depends_on: ["16-u21", "16-u20"]
writes: ["src/**", "app/**", "test/**"]
spec: ["DECISIONS.md", "docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: done
attempts: 0
commits: ["505120d"]
actual_hours: 0.1
---
## Objective
Build WF-MATCH-1: fetch the public problem list without signing in, match it deterministically against the local profile, and show a short list with why each matched. Acceptance follows docs/design/ux/ui-unit-template.md.

## Steps
1. Deterministic filter over help_needed (skill groups, languages, coarse place, topics) and the not-for-me list; no ranking by engagement.
2. Each item shows 'Why you see this'. A link to the plain chronological list is always present.
3. Opt-in local notice after an interest-blind push or background refresh (NOTIFY-CONSENT-1).

## Acceptance
- Unit tests for the matcher.
- No profile data in any request.
- verify passes.

## Out of scope
- Server push service.
