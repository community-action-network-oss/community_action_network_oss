---
id: "09-u60"
plan: "09"
title: "Re-resolution scan: rule and corpus diff, candidate selection, triggers (RERESOLVE-1)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 289
depends_on: ["09-u27", "09-u57", "10-u57"]
writes: ["src/resolutions/app/review/select/**", "src/resolutions/app/review/diff/**", "src/db/schema.ts", "drizzle/**", "src/app.module.ts", "test/re-resolution-select.e2e-spec.ts"]
spec: ["docs/design/ai/triggers.md#re-resolution-d-59", "docs/design/flows/re-resolution.md#trigger", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/adr/0013-retroactive-re-resolution.md", "docs/design/ai/triggers.md#backpressure", "docs/design/flows/legal-corpus-update.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/re-resolution-select.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Find the past resolutions a rule or corpus change can touch, and nothing else. Triggered when a policy rollout reaches canary (never shadow) and when a legal corpus version activates; it never re-runs everything.

## Steps
1. Rule diff service: between two pack versions compute changed rule ids, DP prompts, thresholds and schema versions; between two corpus versions compute changed, added and removed article ids (by `text_sha256`). Pure functions with fixtures from 09-u01 v1 and v2 and the 10-u55 corpora.
2. Triggers: handler for `policy_rollout` reaching canary (09-u27 event) and for `legal.corpus.activated` (10-u57 job `re_resolution_scan`). Both create `resolution_review_batch` rows {id, trigger, old_version, new_version, jurisdiction, cursor, status}.
3. Selection: terminal or resting problems (`solved`, `closed`, `redirected`, `stuck`) with a Resolution or decision record whose recorded `policy_version` or corpus versions are older than the new one AND whose `rule_ids` or `legal_finding` (09-u57) article ids intersect the diff, filtered by jurisdiction. Withdrawn and rejected are never selected (they use ordinary re-moderation). Items in the diff but already reviewed under the new version are skipped (idempotent by (problem, new version)).
4. Cursor-resumable chunks; each selected item becomes a `re_resolution` job in the async class, throttled by the same token bucket as re-moderation (09-u05, 09-u27) so new submissions are never starved.
5. Tests: a diff touching one rule selects exactly the fixture resolutions citing it; unrelated resolutions are not selected; shadow selects nothing; idempotent rerun; resumable after a crash.

## Acceptance
- Only resolutions whose cited rules or articles are in the diff are selected (test).
- Canary and corpus activation each create one batch; shadow creates none.
- `npm run verify` is green.

## Out of scope
- Running DP-RERESOLUTION (09-u61).
- Reopening (09-u63).
