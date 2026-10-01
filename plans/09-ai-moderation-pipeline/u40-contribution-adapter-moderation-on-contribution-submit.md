---
id: "09-u40"
plan: "09"
title: "Contribution adapter: moderation on contribution submit and accept"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 269
depends_on: ["09-u24","04-u02"]
writes: ["src/contributions/app/moderation-target.ts","src/contributions/**","src/moderation/app/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/moderation-contributions.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md#which-dps-apply-to-which-content-type","docs/design/flows/contribution-and-proposal.md","docs/spec/01-slice-1-brief.md#5-moderation-decisions-and-appeals","docs/spec/01-slice-1-brief.md#6-contributions","docs/spec/constitution/rules.md#MOD-EXPLAIN-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-contributions.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Plug contributions into the pipeline. A contribution is public only after a complete run (DP-CONTRIB-RELEVANCE, DP-PRIVACY, DP-NAMING, DP-TONE, DP-ASSUMPTIONS, DP-COMPLETENESS, DP-CRISIS, DP-LEGAL, and DP-EVIDENCE-TIER or DP-LEGALITY on the right types).

## Steps
1. Implement the ModerationTarget port for contributions (04-u02 tables) with outcome mapping: publish gives accepted/visible, needs_revision returns hints on the contribution fields, reject hides with rule ids and appeal window (appeal restores per the brief table), hold keeps it pending.
2. Supersession guard: delete the moderator accept or hide use case and routes added by 04-u03 if present (and its tests); keep the evidence tier recompute function and call it from the applier on accept. Cooldown rules from 04-u01 and pack values stay and run before queuing.
3. The selector table already maps contribution types; add e2e coverage for personal_experience (privacy), a solution type (DP-LEGALITY), verification evidence type (DP-VERIFICATION once plan 05 exists, skipped with a stated reason).
4. Appeal on a hidden contribution restores it (re-run overturn path of the appeal unit uses the adapter `restore`).
5. Tests: each outcome maps; a clean fixture contribution becomes visible only after a run; hold keeps it private; appeal overturn restores.
6. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- No contribution is visible without a complete run.
- The 04-u03 moderator path is gone and its tests removed.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Contribution screens.
