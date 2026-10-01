---
id: "09-u41"
plan: "09"
title: "Proposal and decision-record adapters (DP-LEGALITY, DP-DECISION-RECORD, DP-STAGE)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 270
depends_on: ["09-u40","04-u04","04-u05"]
writes: ["src/proposals/app/moderation-target.ts","src/decisions/app/moderation-target.ts","src/moderation/app/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/moderation-proposals.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md#per-dp-notes","docs/design/flows/contribution-and-proposal.md","docs/design/flows/lifecycle-transition.md","docs/spec/01a-lifecycle.md#42-transition-table","docs/spec/constitution/rules.md#LEGAL-GATE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-proposals.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Gate T08 to T11 stage moves and the decision record on runs. Proposal marked ready runs DP-LEGALITY (dual legality gate producing the stuck payload), DP-STAGE and DP-EVIDENCE-TIER; a decision record runs DP-DECISION-RECORD and DP-LEGALITY. Humans no longer confirm.

## Steps
1. ModerationTarget adapters for proposal and decision record: field refs from their schemas; outcomes map to the engine transitions T08, T09, T10, T11 (publish), needs_revision with hints, reject, hold.
2. DP-LEGALITY output for a blocked proposal carries the stuck payload (blocking constraint, source and version, blocked actions, recheck condition); store it on the run outputs and pass to DP-BLOCKER at T15 later. Every explanation says "under pack X, version Y", never legal advice (test string check).
3. Supersession guard: remove moderator-confirm code paths for T08 to T11 from 04-u04 and 04-u05 where they exist, and their tests; the field enforcement of those units stays.
4. DP-DECISION-RECORD checks completeness and consistency only, never whether the decision is good (fixture where a bad but complete decision passes).
5. Tests: ready proposal with a legal conflict fixture yields stuck payload and needs_revision; complete decision record passes; incomplete one gets field hints; hold keeps stage unchanged.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- No stage move to T08 to T11 happens without a complete run.
- Legal explanations always cite pack and version.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Task and verification (next).
