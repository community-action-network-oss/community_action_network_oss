---
id: "09-u67"
plan: "09"
title: "E2E: the legal stack end to end (cumulative layers, topic refusal versus stuck, conflict hold, citations)"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 296
depends_on: ["09-u59", "09-u58", "09-u45"]
writes: ["test/e2e-legal-stack.e2e-spec.ts", "test/support/legal-stack-flow.ts", "test/fixtures/moderation/legal/flow/**"]
spec: ["docs/design/ai/legal-stack.md", "docs/spec/constitution/rules.md#LEGAL-STACK-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/spec/constitution/rules.md#TOPIC-FORBIDDEN-1", "docs/spec/constitution/rules.md#LEGAL-CORPUS-1", "docs/design/ai/simulation.md#3-seed-scenarios-seeds-1-and-2"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/e2e-legal-stack.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Prove D-61 on FakeModel and synthetic fiktiva corpora: nothing illegal is requested or published, and each refusal is citable.

## Steps
1. Proposals blocked only at L2, only at L4 and only at L6 are each blocked with the right layer, article and corpus version in `legal_finding`; the problem stays published and reaches stuck through T15.
2. A post on a topic with a reviewed L6 topic ban is not published in that jurisdiction, `topic_refusal` stores the basis, the poster sees citation and appeal path; the same post under a second jurisdiction fixture passes.
3. A layer interpretation conflict (L1 vs L3) holds with a conflict note and one policy-question candidate; a corpus version activation retries it.
4. A missing layer corpus holds every legality run (FAIL-CLOSED-AI-1); a tampered corpus never loads.
5. A ratified corpus change enqueues re-moderation and re-resolution (10-u57), the former flips a published item with a notice (09-u29), the latter selects the affected past resolution (09-u60).
6. DB constraint check: inserting a legality decision without layer, article or version fails; provider counter shows FakeModel only.

## Acceptance
- The legal stack scenarios pass on FakeModel in CI.
- Every refusal and block carries layer, article and corpus version.
- `npm run verify` is green.

## Out of scope
- Real corpora (reviewed legal content is gated, 10-u51 and 10-u52).
