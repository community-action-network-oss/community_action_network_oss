---
id: "10-u57"
plan: "10"
title: "Corpus activation events: re-moderation and re-resolution jobs on a legal corpus version change"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 57
depends_on: ["10-u55", "09-u27"]
writes: ["src/policy/legal/activation/**", "src/moderation/app/recheck/corpus-scope.ts", "src/db/schema.ts", "drizzle/**", "src/app.module.ts", "test/legal-corpus-activation.e2e-spec.ts"]
spec: ["docs/design/flows/legal-corpus-update.md#sequence", "docs/design/flows/legal-corpus-update.md#outcomes-it-can-cause", "docs/spec/constitution/rules.md#LEGAL-CORPUS-1", "docs/design/ai/triggers.md#re-resolution-d-59", "docs/design/ai/triggers.md#3-post-publication-async", "docs/adr/0012-legal-layer-stack.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/legal-corpus-activation.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Moving a legal corpus through shadow, canary and full emits events, and the ratified change enqueues both follow-up jobs: re-moderation of published content (the 09-u27 fan-out, scoped by corpus) and the re-resolution scan (consumed by 09-u60). Neither is silent.

## Steps
1. Extend `LegalRegistry` activation: shadow is recorded only; reaching canary appends `legal.corpus.activated` (layer, jurisdiction, corpus_id, old and new version and hash, ratification id) once per (corpus, version, state canary). Refuse to activate a corpus whose ratification record lacks a review record id (LEGAL-CORPUS-1).
2. On that event enqueue two jobs through the payload queue: `recheck_policy_change` scoped `{corpus_id, versions}` (09-u27 fan-out reuses its batches; selection = published items whose last run used an older corpus version in the retrieved article set) and `re_resolution_scan` `{trigger: legal_corpus, old, new}` (type name and payload schema defined here; its handler is 09-u60). Store the job ids on the activation row (`recheck_job_id`, `reresolution_job_id`) as the LEGAL-CORPUS-1 trace.
3. Rollback: moving back to the previous version enqueues the same two jobs for the reverse diff; halted rollout writes `policy.rollout.halted`.
4. Tests: a ratified fixture corpus change enqueues exactly both jobs; an unratified one is refused; shadow enqueues nothing; reverse change enqueues both again; hash mismatch keeps the previous version active.

## Acceptance
- A ratified fixture change enqueues both jobs and records their ids (LEGAL-CORPUS-1 test).
- Shadow never enqueues work.
- `npm run verify` green.

## Out of scope
- The job handlers (09-u27 exists, 09-u60 adds the re-resolution scan).
