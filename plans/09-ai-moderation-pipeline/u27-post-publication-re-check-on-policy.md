---
id: "09-u27"
plan: "09"
title: "Post-publication re-check on policy change: rollout state, batches, flips"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 256
depends_on: ["09-u07","09-u24","09-u26"]
writes: ["src/moderation/app/recheck/**","src/db/schema.ts","drizzle/**","src/app.module.ts","test/moderation-policy-change.e2e-spec.ts"]
reads: ["src/policy/**","src/moderation/**"]
spec: ["docs/design/ai/triggers.md#3-post-publication-async","docs/design/ai/triggers.md#re-moderation-semantics","docs/design/ai/triggers.md#backpressure","docs/design/flows/post-publication-recheck.md","docs/design/ai/amendment-loop.md","docs/design/ai/policy-pack.md#how-the-server-loads-packs"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-policy-change.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
When a new pack version becomes active (shadow, canary percentage, then full), re-run the affected DPs over published items in resumable, token-bucket throttled batches. Shadow runs are recorded and never acted on. A flip is detected by comparing with the live decision.

## Steps
1. Read src/policy/ (10-u04): the registry keeps active, shadow and canary slots per jurisdiction (config POLICY_ACTIVE, POLICY_SHADOW, POLICY_CANARY, canary_percent) and loads packs by version and hash; do not duplicate it. Add table policy_rollout (version, hash, jurisdiction, state shadow|canary|active|retired, canary_percent, started_at, activated_at) as history and restart-safe state, and a `PolicyActivation` service that moves a slot through the registry API, persists the row and appends a `policy_changed` event. PolicyUnavailable from the registry is a hold, never a publish.
2. Fan-out handler for policy_changed jobs: select items whose last complete run used an older version, filtered by affected DPs and jurisdiction, in chunks with a cursor (table recheck_batch {id, version, cursor, scope, status}); each item gets an async-class job with trigger policy_change; chunks throttled by the queue token bucket so new submissions are never starved.
3. Shadow: runs are stored with shadow=true and never applied; canary applies to a deterministic hash-bucket percentage of items; full applies to all. Moving state forward is a config or registry change, not a code change.
4. Flip detection: compare the new decision with the live one; unchanged writes only the run; a flip stores the new decision (old stays in history) and emits `moderation.recheck.flipped` for the notices unit. Flip to a more permissive outcome emits `moderation.recheck.permissive`. This unit does NOT hide or remove content.
5. Spend caps pause the batch and alert; the item keeps its current public state (never fails open or closed on content). Run failure retries with backoff.
6. Tests (FakeModel with fixture packs v1 and v2 from the fixtures unit): exactly the documented flipping item flips; shadow records without effect; canary percentage deterministic; resumable by cursor after a crash; spend cap pauses; unchanged items only get a run row.

## Acceptance
- Only the documented fixture flips between v1 and v2.
- Shadow never changes visible state.
- Batches resume from the cursor; throttled by token bucket.
- `npm run verify` is green.

## Out of scope
- Notices (next but one unit).
- Context-change triggers.
