---
id: "04-u06"
plan: "04"
title: "duplicate_of linking"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 0.8
priority: 75
depends_on: ["04-u05"]
writes: ["src/problems/app/**","src/problems/http/**","test/duplicate.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md#2-slice-1-defaults","docs/spec/01-slice-1-brief.md#4-lifecycle","docs/open-questions/OQ-duplicate-handling.md"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/duplicate.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The only link type in slice 1: a problem can be marked duplicate_of another published problem. Used later as a required field of closing with reason duplicate (T16, plan 05).

## Steps
1. POST /v1/problems/{id}/duplicate {duplicateOfId, note?} (initiator only): target must be published and not the same problem, must not create a cycle (follow the chain, max depth 10), must not be withdrawn or a tombstone; writes problem.duplicate_of and a problem_event "duplicate_linked" (no state change); DELETE clears with event "duplicate_unlinked" (initiator only).
2. Detail response already includes duplicateOf; add duplicateOf title and id for display (title of the target only if it is published).
3. GET /v1/problems/{id}/duplicates (public): problems whose duplicate_of points here (list of id, title, label).
4. Tests: self link refused, cycle refused, unpublished target refused, unlink, listing, permissions.
5. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A cycle can never be created.
- No other link types exist.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Merging content or contributions.
- Closing as duplicate (T16, plan 05).
