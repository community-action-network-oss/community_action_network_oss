---
id: "16-u05"
plan: "16"
title: "visual-direction.md: the gallery identity paragraph"
repo: "."
area: "can-spec"
model: sonnet
est_hours: 0.5
priority: 5
depends_on: []
writes: ["docs/design/ux/visual-direction.md"]
spec: ["DECISIONS.md", "docs/design/ux/visual-direction.md"]
verify: ["python3 docs/design/check.py"]
founder_gate: false
defaults: "D-80 is binding; if a step is blocked, take the most private and plainest option and report it for the morning review."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Bring the shared visual direction in line with D-80 for the gallery.

## Steps
1. Rewrite the last paragraph of 'Shared use': the app keeps the calm shared palette; the gallery has its own identity (Public Pictograms, an Isotype picture language) with a gallery-owned theme, the shared status hue families, system fonts only, and no red for ordinary states; the direction contract lives in can_gallery/.impeccable.
2. Add one line to Typography: system fonts only on every surface, the gallery included.
3. Leave every app rule unchanged.

## Acceptance
- The paragraph matches D-80; check.py passes.

## Out of scope
- Token changes.
