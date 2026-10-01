---
id: "09-u26"
plan: "09"
title: "On-update path: diff-aware runs and pending versions of published items"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 255
depends_on: ["09-u25"]
writes: ["src/moderation/app/on-update.ts","src/problems/app/**","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/moderation-update.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/triggers.md#2-on-every-update-blocking-if-public","docs/design/flows/content-update.md","docs/open-questions/OQ-edit-after-publication.md","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/moderation-update.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
An edit to a published item is a pending version: the previous approved version stays visible with "edit under review", and the edit goes live only when a complete run on the changed fields says publish. Diff-aware: only DPs bound to changed fields run, plus always DP-CRISIS, DP-LEGAL and DP-PRIVACY on changed text.

## Steps
1. Table content_revision (id, target_kind, target_id, base_version, fields jsonb, changed_fields text[], status pending|approved|rejected|superseded, run_job_ids, created_at); approved revision replaces public fields in the same transaction as the applier decision. Migration via db:generate. Read OQ-edit-after-publication first; which edits are allowed at all stays a pack value `edits.allowed_fields` (default all structured fields), not code.
2. Edit endpoint behavior for published problems: PATCH creates a revision and enqueues update-class jobs with the field diff; response carries `editUnderReview: true`. Public detail keeps serving the previous version plus a flag. Newer revision supersedes an older pending one.
3. Unchanged fields reuse their prior complete run only when `policy_version` is unchanged (selector `reusePrior`), otherwise they are re-checked. Dependencies widen the set per triggers.md section 2 (selector already encodes this; add tests here).
4. Outcomes: publish makes the revision live and writes a decision; needs_revision keeps the old version live and returns hints on the revision; reject discards the revision with rule ids (the published item stays); hold leaves it pending.
5. Private drafts: no blocking run and nothing queued on PATCH (test). Advisory check on request: POST /v1/problems/{id}/moderation/advisory (initiator) runs DP-ASSUMPTIONS and DP-COMPLETENESS (layer 1 plus model read) synchronously under a short timeout with trigger advisory, returns `{hints: HintDto[], status: "ok" | "unavailable"}`, records a run (never a decision, never a state change, never public), and on any hold returns unavailable with no hints (the form still works). This is the "Check my draft" contract that 10-u36 consumes. Per-account advisory cap from a pack value.
6. Tests: advisory returns hints per field and changes no state; advisory with a provider timeout script returns unavailable; edit of `scope` runs the narrowed DP set; old version stays visible while pending; publish swaps; reject keeps old; supersede by a second edit; unchanged policy reuses prior run (zero model calls for unchanged field DPs).
7. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- A public item never shows unreviewed text (test).
- Narrowed DP set verified by recorded DP ids.
- openapi/openapi.json regenerated; `npm run verify` is green.

## Out of scope
- Policy of which edits are allowed (open question, pack value).
- App edit screen.
