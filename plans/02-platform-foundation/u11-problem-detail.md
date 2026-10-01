---
id: "02-u11"
plan: "02"
title: "Problem detail, visibility rules and public timeline"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 19
depends_on: ["02-u10"]
writes: ["src/problems/**","test/problem-detail.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#3-slice-1-erd","docs/design/system-design.md#6-api-surface-v1","docs/design/ux/wireframes/browse.md#WF-DETAIL-2","docs/spec/constitution/rules.md#OWN-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/problem-detail.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Add GET /v1/problems/{id} and GET /v1/problems/{id}/events with the exact visibility rules: public after publish, private drafts only to the initiator (and the emergency/legal lane for its own case, via 09-u38), tombstone (never 404) for published items that were withdrawn.

## Steps
1. Detail response: id, state, label, explanation, nextAction (STATE_COPY), policyVersion, transitional flag, reopened flag with the notice reference (the decided-under and reopened notices themselves come from 09-u29), title, condition, affected, coarseArea, observed, uncertain, desiredOutcome, jurisdiction, investigationNeeded, publishedAt, handle of the initiator (never email), pauseReason, resumeCondition, duplicateOf (id or null). When tombstonedAt is set, initiator-authored text fields are replaced by null and {tombstone: true, tombstonedAt, reason} is returned (WF-DETAIL-2; OWN-1).
2. Visibility: guests and other members see published problems only. A non-published problem returns 404 not_found to everyone except its initiator (the lane sees only the minimum redacted record through its own route), who sees it with the private states and their label (default: 404 rather than 403 so private existence never leaks). Unknown ids return 404.
3. GET /v1/problems/{id}/events (public for published problems): cursor paged, oldest first, items {id, type, fromState, toState, reason, occurredAt}; actor shown as handle only and only for public event types; payload never returned in slice 1.
4. Auth is optional on these routes: the guard attaches the actor when a valid session exists but does not require it (add an @OptionalAuth decorator to src/platform/security if missing).
5. Tests: guest, other member, initiator and a steward account (no special access) against each state; tombstoned problem returns 200 with tombstone true and null text; unknown id 404; events paging; no email or internal field in the exact key set.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A private problem is indistinguishable from a missing one to outsiders.
- Tombstone returns 200, not 404.
- The key-set test fails if a new field leaks.
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Contribution lists (plan 04).
- The transition engine (plan 03).
