---
id: "13-u11"
plan: "13"
title: "DP-REUSE-FIT deterministic checks: legality under the new stack, resource fit, differences"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 410
depends_on: ["13-u10","09-u56","09-u57","10-u56"]
writes: ["src/archive/domain/reuse-fit/**","src/archive/app/reuse-fit/**","test/fixtures/legal-reuse/**","test/reuse-fit-deterministic.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#6-dp-reuse-fit","docs/design/ai/legal-stack.md","docs/spec/constitution/rules-legal-sim.md#REUSE-CONTEXT-1","docs/spec/constitution/rules-legal-sim.md#LEGAL-STACK-1","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The part of DP-REUSE-FIT that needs no model. Suggesting an illegal path is the harm to avoid, so legality is deterministic where it can be and fails closed where it cannot.

## Steps
1. Legality per stage: re-check each stage option and criterion of the source path against the new problem's stack L0 to L6 using the legal-stack step of 09-u56 and the article retrieval of 10-u56, with the citation format of 09-u57 (`legal_finding` shape: layer, article, corpus version). Result per stage `lawful`, `unlawful_at_L<n>` with the citation, or `unknown`. An unlawful step is marked, never dropped.
2. Fail closed: if the new problem's legal stack is unresolved, or the corpus for a layer is missing, the result for that layer is `hold` with reason `stack_unresolved` or `corpus_missing`, and the whole suggestion is not shown (the panel shows nothing for it, never a path without a check).
3. Resource and budget fit: the source `cost_band`, labour hours band and in-kind needs against the declared `resource_band` and `budget_band` give `fits`, `stretch` or `exceeds` with the gap named; unknown declared values give `unknown` and lower confidence.
4. Differences flagged: each context dimension that differs (from 13-u10), plus a staleness flag when `policy_version` or a layer's `legal_corpus_version` changed since the source record (an old legal basis may be stale), with both versions.
5. Output type `ReuseFitFacts {legality[], resourceFit, differences[], stale[], confidence}`; confidence is a deterministic function (every `unknown` lowers it; any `hold` makes it zero).
6. Fixtures: synthetic fiktiva stacks only (10-u20 and 10-u67). Tests: a source stage lawful in jurisdiction A and unlawful at L4 in B is flagged with the citation; missing corpus holds; over-budget path is `exceeds` with the gap; stale corpus version is flagged; no network and no model.

## Acceptance
- Planted illegal-at-L<n> steps are always flagged (fixture recall 1.0).
- An unresolved stack or missing corpus holds the suggestion, never shows it.
- `npm run verify` is green.

## Out of scope
- Adaptations and the model read (13-u12).
- Display.
