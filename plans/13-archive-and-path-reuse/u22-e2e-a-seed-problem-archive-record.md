---
id: "13-u22"
plan: "13"
title: "E2E: a seed problem archive record suggests a path to a new problem elsewhere, with legality differences flagged"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 421
depends_on: ["13-u14","13-u16","13-u19","13-u21","10-u20","10-u67","09-u56","10-u56"]
writes: ["test/e2e/archive-reuse.e2e-spec.ts","test/fixtures/archive-reuse/**"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md","docs/spec/24-archive-reuse.md","docs/design/flows/path-suggestion.md","docs/design/flows/stage-draft.md","docs/design/flows/archive-on-terminal.md","docs/design/components/server.md"]
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
The acceptance test of plan 13 with FakeModel and FakeEmbedding only (no network, provider counter asserted): a seed problem ends, its archive record is published, and a poster in another jurisdiction gets an adapted suggestion with the legality differences flagged, uses it, and gets a draft stage plan with credit.

## Steps
1. Setup: a seeded problem in fiktiva-city (seed 1 shape, parallel stages, one blocked stage) is driven to `solved` through the stage engine; assert exactly one archive record, DP-ARCHIVE `publish`, `source: simulation`, label present, index chunks and vectors written.
2. A second poster in fiktiva-north (10-u67: a different L4 rule makes one source option unlawful and the budget band lower) prepares a similar problem; field events produce a suggestion within the debounce rules; assert: the source record is credited, the dimension table shows differences (budget, legal stack), legality marks the one stage `unlawful_at_L4` with the citation and corpus version, resource fit says `stretch` or `exceeds`, adaptations are proposed, nothing was adopted.
3. The poster accepts the suggestion with adaptations (the unlawful step cannot be used unadapted: 409 test), publishes through the normal review path (one volunteer review is still required, assert), then DP-STAGE-DRAFT offers a draft with `derived_from`; the poster edits one stage, applies it, DP-STAGE-PLAN passes, and the live stage map shows "basedOn" credit that survives a later split.
4. Negative runs: a poisoned record is never suggested; an unresolved legal stack holds the suggestion; the embedding outage shows structured plus text matches only; a stuck source record appears with the `did_not_succeed` warning and its blocking challenge.
5. Assert privacy: no response in the run contains an email, account id or coordinate; the provider counter is 0 for real providers.

## Acceptance
- The scenario passes in CI with fakes.
- Legality differences between the two jurisdictions are flagged with layer, article and corpus version.
- `npm run verify` is green.

## Out of scope
- Live-model runs (plan 11).
