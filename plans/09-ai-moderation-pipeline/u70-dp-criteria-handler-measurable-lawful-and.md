---
id: "09-u70"
plan: "09"
title: "DP-CRITERIA handler: measurable, lawful and fitting acceptance criteria (CRITERIA-1)"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 298
depends_on: ["09-u20","09-u16","09-u01","09-u56","10-u62"]
writes: ["src/moderation/app/dp-criteria.ts","src/moderation/domain/criteria/**","test/fixtures/moderation/criteria/**","test/dp-criteria.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/decision-points.md#shared-contract","docs/design/ai/decision-points.md#per-dp-notes","docs/spec/constitution/rules.md#CRITERIA-1","docs/spec/01a-lifecycle.md","docs/design/ai/legal-stack.md"]
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
Check acceptance criteria, final (problem) or per stage: measurable, lawful, and fitting the problem. Runs on the draft-to-review gate, the publish run, when criteria are edited and on every plan-change proposal (T22).

## Steps
1. Deterministic layer: every criterion has a non-empty statement and a `measure` or `how_observed` of minimum length from the pack, no criterion duplicates another, a deadline when given is a valid date after today, and every stage criterion maps to a final criterion or carries a stated reason (structural coverage is DP-STAGE-PLAN).
2. Model layer through the DAG: measurable (a way to tell it happened, not "things improve"), lawful (no criterion requires an unlawful act; the DP uses the legal-stack step of 09-u56 so a criterion that demands an act forbidden at some layer is `reject` with the layer and article cited, otherwise `needs_revision`), fitting (the final criteria restate `desired_outcome` in testable form; stage criteria serve the stage goal). Outcomes publish, needs_revision, reject, hold.
3. Output `per_criterion[]` {ref, measurable, lawful, fits, hint}; a `publish` with any false value is invalid (aggregate validator test). Hints are anchored by `field_ref` to the criterion path so the app shows them beside the criterion (WF-PREP-2).
4. A criterion that is lawful but unreachable by design (for example it requires a competence the institution does not have) is `needs_revision` with the competence hint from the overlay `competence.yaml`.
5. Use FakeModel keyword-table files added under the unit's own fixtures directory (do not edit the fake table of 09-u12; add a second table file it loads via config), and moderationFixtures() packs (never the 10-u04 default pack).
6. Tests: vacuous criterion gets a measurability hint; an unlawful criterion (fiktiva L2 fixture) is rejected with the layer; a stage criterion with no link to the final ones gets a coverage hint; clean criteria publish; low confidence holds.

## Acceptance
- An unlawful criterion is rejected only with a cited layer and article.
- Hints are field-anchored.
- `npm run verify` is green.

## Out of scope
- Prompt (10-u62).
- Plan structure (09-u71).
