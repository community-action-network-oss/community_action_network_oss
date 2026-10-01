---
id: "09-u19"
plan: "09"
title: "Stage-output cache keys (HMAC) and wiring on the 10-u04 cache"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 248
depends_on: ["09-u16"]
writes: ["src/moderation/app/cache/**","src/moderation/app/cache/*.spec.ts"]
reads: ["src/policy/**","src/moderation/**"]
spec: ["docs/design/ai/runtime.md#caching","docs/design/ai/safety-and-privacy.md#pii-safe-caches-and-logs","docs/spec/constitution/rules.md#DRAFT-TTL-1"]
needs: []
verify: ["npm run verify","npx vitest run src/moderation/app/cache"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The runtime.md stage-output cache. 10-u04 already ships the PII-safe store (src/policy/domain/cache.ts: LRU, refuses values with long strings or email, phone, url patterns, keyed by policy version). Reuse it; this unit adds the runtime key (an HMAC over dp, stage, policy version, prompt hash, model id, jurisdiction, language and normalized gateway input), the per-target namespace and purge, and the wiring into the DAG. Value is the structured stage output only.

## Steps
1. Read src/policy/domain/cache.ts first and import it; do not write a second store. Key builder `cacheKey(parts)` with `cache_secret` from config (HMAC-SHA256, rotated with retention; add the config key and .env.example line), normalization (whitespace and case folded, tokens stable per operation), namespace per problem for user content, global only for public pack components. The key string is passed to the 10-u04 store as its opaque key.
2. Value schema allows only outcome, rule ids, spans as offsets, confidence; a test passes a value with text and expects the writer to refuse. TTL default 7 days from config. The store is in memory (restart empties it, which only costs model calls): note the ceiling in a `ponytail:` comment, move to a table only if cost per accepted result shows it matters.
3. Wire into the DAG executor: lookup before provider call; a hit still goes through current-policy and authorization checks (policy version is in the key so a new version is always a miss); record `cache=hit` in the run stage with the same fields.
4. Deletion: keep an in-memory index namespace to keys so `purgeForTarget(targetId)` can delete a target entries; call it from the draft purge and withdrawal paths (DRAFT-TTL-1 includes caches) without editing 03-u14: expose it as a port with a no-op default and register the real one from the moderation module.
5. Timing: cache must not be an identity side channel; the API status response has no cache field (asserted later by the contract unit; here assert the run stage records hit or miss internally only).
6. Unit tests: hit on same input and version, miss on a new policy version, miss on a different model, value with text refused, purge on target delete, expiry with fake clock, key contains no plaintext.

## Acceptance
- New policy version never hits an old entry.
- Cache rows hold no raw text (writer refuses).
- Purged with the target.
- `npm run verify` is green.

## Out of scope
- Provider prompt caching (adapter unit).
- A persistent cache table.
