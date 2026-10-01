---
id: "09-u41"
plan: "09"
title: "Stage option and stage choice adapters (DP-LEGALITY, DP-DECISION-RECORD at the CHOICE-GATE)"
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
Gate the choice of a stage on runs (lifecycle v2, 01b-stages.md CHOICE-GATE). A `stage_option` marked ready runs DP-LEGALITY (dual legality gate producing the stuck payload) and DP-EVIDENCE-TIER; a `stage_choice` and its decision record run DP-DECISION-RECORD and DP-LEGALITY before the stage may move to `resolving` (ST04). The old T08 to T11 stage moves no longer exist (see the map in 01a-lifecycle.md 4.3). Humans do not confirm.

## Steps
1. ModerationTarget adapters for `stage_option` (04-u04 rows) and `stage_choice` plus its decision record (04-u05 rows): field refs from their schemas (10-u11, 10-u70); outcomes map to the choice gate result consumed by the stage engine (12-u06 ST04 precondition: publish marks the choice recorded, needs_revision with hints, reject, hold keeps the stage unchanged). No problem-level transition is involved.
2. DP-LEGALITY output for a blocked proposal carries the stuck payload (blocking constraint, source and version, blocked actions, recheck condition); store it on the run outputs and pass to DP-BLOCKER at T15 later. Every explanation says "under pack X, version Y", never legal advice (test string check).
3. Supersession guard: remove moderator-confirm code paths for the old stage moves (T08 to T11 of the previous sequence) and any DP-STAGE call from 04-u04, 04-u05 and 04-u10 where they exist, and their tests; the field enforcement of those units stays.
4. DP-DECISION-RECORD checks completeness and consistency only, never whether the decision is good (fixture where a bad but complete decision passes).
5. Tests: ready stage option with a legal conflict fixture yields the stuck payload and needs_revision; complete decision record passes; incomplete one gets field hints; hold keeps stage unchanged.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- No stage reaches `resolving` with a recorded choice that lacks a complete CHOICE-GATE run.
- Legal explanations always cite pack and version.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Layered legal citations, the stuck payload with layer and article, topic refusals and conflict holds: 09-u56 to 09-u59.
- Task and final verification (next).
- Stage resolution (DP-STAGE-RESOLUTION, 09-u73, 12-u07).
