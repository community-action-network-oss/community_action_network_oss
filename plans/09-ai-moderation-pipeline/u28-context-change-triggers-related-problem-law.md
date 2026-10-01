---
id: "09-u28"
plan: "09"
title: "Context-change triggers: related problem, law update, evidence tier"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 257
depends_on: ["09-u27"]
writes: ["src/moderation/app/recheck/context-change.ts","src/moderation/app/events.ts","test/moderation-context-change.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/triggers.md#3-post-publication-async","docs/design/flows/post-publication-recheck.md","docs/design/ai/decision-points.md#per-dp-notes"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-context-change.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Targeted async re-checks when context changes: a new related or duplicate problem is published (DP-DUPLICATE on candidates), a jurisdiction law pack updates (DP-LEGALITY and DP-BLOCKER on affected items), an evidence tier changes. Only items that reference the changed context are rechecked.

## Steps
1. Emit `context_changed` events (kind, subject ids) from the problem publish path (via the applier hook), the policy activation of a jurisdiction pack (policy_changed with scope jurisdiction), and the evidence tier recompute path if it exists (else a documented stub interface).
2. Handler maps each kind to a candidate query: related problems by shared jurisdiction and fingerprint or tag match from published rows only (public data only, never private drafts), items referencing the changed law section, items with the changed evidence. Enqueue async-class jobs trigger context_change with the DP subset.
3. Results go through the same flip detection as policy change; a law-pack update can move an item to a re-review notice, never to a state change by itself (pause-review principle).
4. Tests: publishing a near-duplicate triggers DP-DUPLICATE on the earlier item only; a jurisdiction law update triggers DP-LEGALITY for items of that jurisdiction only; no private draft is ever a candidate.

## Acceptance
- Only referencing items are rechecked (test).
- Private drafts are never candidates.
- `npm run verify` is green.

## Out of scope
- Notices.
- Sampling.
