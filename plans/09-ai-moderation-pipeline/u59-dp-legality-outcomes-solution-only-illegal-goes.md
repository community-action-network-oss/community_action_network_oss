---
id: "09-u59"
plan: "09"
title: "DP-LEGALITY outcomes: solution-only illegal goes to stuck with layered payload; layer interpretation conflict holds with a conflict note"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 288
depends_on: ["09-u57", "09-u36", "09-u41"]
writes: ["src/moderation/app/legal-stack/conflict/**", "src/proposals/app/moderation-target.ts", "src/moderation/app/stuck-payload.ts", "src/db/schema.ts", "drizzle/**", "test/legal-stuck-conflict.e2e-spec.ts"]
spec: ["docs/design/ai/legal-stack.md#two-different-legal-outcomes", "docs/design/ai/legal-stack.md#1-the-layers", "docs/spec/constitution/rules.md#TOPIC-FORBIDDEN-1", "docs/spec/constitution/rules.md#LEGAL-CORPUS-1", "docs/open-questions/OQ-legal-layer-conflicts.md", "docs/design/flows/legal-corpus-update.md#failure-paths"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/legal-stuck-conflict.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Two precise legal outcomes. Only the solution is illegal: the problem is lawful to publish, the proposal is blocked, the problem goes to stuck (legally blocked) with a layered payload. Layers disagree on interpretation: hold with a conflict note, queued as a policy question, never published and never silently resolved.

## Steps
1. Extend the 09-u41 stuck payload with `layer`, `article_id`, `corpus_version` and `lawful_alternatives[]`; DP-BLOCKER (T15) accepts only a payload that carries them (LEGAL-CITE-1). Test: a proposal blocked at L4 only reaches stuck through T15 with the L4 citation, the problem itself stays published.
2. Conflict handling: when findings contain `conflict` between layers, the aggregate outcome is `hold` with `conflict_note` (layers, articles, why they disagree); the run is recorded and retried only when a new policy or corpus version activates; table `legal_conflict` {id, run_id, layers[], article_ids[], note, status open|resolved_by_version, proposal_candidate_id}.
3. Queue: write a `proposal_candidate` through `PolicyProposalPort` (09-u36, fake adapter) of kind `policy_question` with a redacted conflict note (OQ-legal-layer-conflicts default); an unresolvable PREC-1 conflict that touches rights or crisis tier also goes to the lane queue (09-u38) and never to a per-item moderator.
4. Never silent: the poster sees a held notice with the plain conflict summary and the policy-question id.
5. Tests: solution-only illegal reaches stuck with layered payload; L1 vs L3 conflict holds with note and creates exactly one candidate; a later corpus version activation retries the held run (uses 10-u55 activation); no endpoint overrides the decision.

## Acceptance
- An illegal-only proposal reaches stuck with layer, article and corpus version (TOPIC-FORBIDDEN-1 fixture).
- A layer conflict holds with a stored conflict note and one policy-question candidate.
- `npm run verify` is green.

## Out of scope
- Resolving conflicts (a policy change by people, OQ-legal-layer-conflicts).
