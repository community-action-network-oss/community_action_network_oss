---
id: "09-u58"
plan: "09"
title: "TOPIC-FORBIDDEN-1: refuse a locally forbidden topic with a logged legal basis, per jurisdiction"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 287
depends_on: ["09-u57", "09-u24", "09-u25"]
writes: ["src/moderation/app/topic-forbidden/**", "src/db/schema.ts", "drizzle/**", "src/problems/app/topic-refusal*.ts", "openapi/openapi.json", "test/topic-forbidden.e2e-spec.ts"]
spec: ["docs/spec/constitution/rules.md#TOPIC-FORBIDDEN-1", "docs/design/ai/legal-stack.md#two-different-legal-outcomes", "docs/design/ai/legal-stack.md#4-how-dps-use-the-stack", "docs/spec/01a-lifecycle.md", "docs/design/flows/intake-submit.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/topic-forbidden.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
When local law forbids discussing a topic at all, the problem is not published in that jurisdiction and the refusal is logged with its legal basis. This is different from a lawful problem whose only solution is illegal (that goes to stuck, 09-u59).

## Steps
1. Detection: DP-ELIGIBILITY (legal basis) at T01 and T03 reads retrieval results; a topic refusal is possible only when a retrieved article's topic-index entry has `topic_ban: true`, `ban_scope` covering the problem's topic, and its corpus `reviewed: true`. A model-inferred ban without that entry is `hold`, never reject (test).
2. Outcome: `reject` (appealable) or `route_external`, through the outcome applier; the problem stays pre-publication and is never public in that jurisdiction. Per jurisdiction, never global: the same content may be allowed under another jurisdiction overlay (test with two fixtures).
3. Table `topic_refusal` {id, problem_id, jurisdiction, layer, article_id, corpus_version, corpus_hash, run_id, decision_id, created_at, appeal_id null}; the poster gets a plain explanation with the citation and an appeal path (APPEAL-1); the log is public in aggregate (counts per layer and corpus version) and full for the poster.
4. A ban that conflicts with L1 or L2 (the retrieved L1 or L2 findings are `conflict`) is `hold`, queued as a policy question via 09-u59, with the state unchanged (PREC-1).
5. Appeal: DP-APPEAL (09-u34) re-runs with the same retrieval slice and a different model; upheld refusals stay logged.
6. Tests: forbidden topic refused with logged basis and appeal route; same text allowed under another jurisdiction fixture; unreviewed corpus ban cannot reject (holds); L1 conflict holds; counts endpoint leaks nothing. Run `npm run openapi` then `git add -- openapi/openapi.json`.

## Acceptance
- A forbidden-topic fixture is refused with a stored layer, article and corpus version (TOPIC-FORBIDDEN-1 test).
- An illegal-only proposal is not refused here (covered in 09-u59).
- openapi regenerated; `npm run verify` green.

## Out of scope
- Stuck path and conflict queue (09-u59).
- App screens for refusal (use the existing decision screens, 09-u49).
