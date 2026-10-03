---
id: "09-u06"
plan: "09"
title: "DP registry from the pack and the deterministic DP selector"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 235
depends_on: ["10-u04","09-u01"]
writes: ["src/moderation/domain/selector/**","src/moderation/app/dp-registry.ts","test/fixtures/moderation/selector-table.json","src/moderation/domain/selector/*.spec.ts"]
reads: ["src/policy/**","src/moderation/domain/**"]
spec: ["docs/design/ai/runtime.md#event-bus-and-selector","docs/design/ai/triggers.md","docs/design/ai/decision-points.md","docs/design/ai/policy-pack.md#per-decision-point-contents","docs/design/components/server.md"]
needs: []
verify: ["npm run verify","npx vitest run src/moderation/domain/selector"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["692360d"]
actual_hours: null
---
## Objective
Map (event type, target kind, state, changed fields, jurisdiction) to the set of DPs to run. The table is generated from the DP catalog in the active pack so a new DP cannot be forgotten.

## Steps
1. src/moderation/app/dp-registry.ts: `DpRegistry` reads the active pack through the 10-u04 policy module (never the can_policy repo directly) and exposes per DP: id, mode (blocking or async), allowed outcomes, applicable content types, bound fields, rule ids, schema, prompt hash, thresholds. A DP present in the catalog table of decision-points.md but missing in the pack is reported as `missing` so callers hold (fail closed).
2. Pure selector `selectDps({event, targetKind, contentType, state, changedFields, jurisdictionId, packDps})` returning `{dpId, mode, fields, priorityClass}[]`. Encode the tables of decision-points.md ("Catalog" and "Which DPs apply to which content type") as data in selector/table.ts, with a test that parses docs/design/ai/decision-points.md (skip with a stated reason if the docs folder is absent) and asserts every DP id in the catalog appears in the table.
3. Rules: DP-CRISIS, DP-LEGAL, DP-PRIVACY always for changed text; DP-ASSUMPTIONS and DP-COMPLETENESS for every content type on submit and update; dependencies of triggers.md section 2 widen the set (edit of a stage option runs DP-LEGALITY, add evidence runs DP-EVIDENCE-TIER, change of problem statement runs DP-FRAMING and DP-DUPLICATE); diff narrows fields; unchanged fields are marked `reusePrior` only when the caller says policy_version is unchanged.
4. Event kinds as a closed union (lifecycle v2): review_requested (T01 and T03), publication_requested (the poster asks for DP-PUBLISH after review), edited, contribution_submitted, stage_option_ready, stage_choice_recorded, stage_evidence_submitted, plan_change_proposed (T22), recommendation_submitted, stuck_proposed, close_proposed, solved_proposed, problem_ended (archive), suggestion_requested, stage_draft_requested, appeal_filed, policy_changed, context_changed, sample_tick. The old kinds submitted, resubmitted, proposal_ready, decision_record_submitted, evidence_added and stage_move_proposed are removed.
5. Unit tests (no Nest, no DB): one case per catalog row of decision-points.md; a diff touching only `scope` selects DP-FRAMING, DP-DUPLICATE, DP-ASSUMPTIONS, DP-COMPLETENESS plus the always set; a missing DP yields `missing`.
6. Selector table additions from the catalog of decision-points.md: DP-SOURCE-TRUST (review_requested, publication_requested, edited sources), DP-CRITERIA (review_requested, publication_requested, edited criteria, plan_change_proposed), DP-STAGE-PLAN (review_requested, publication_requested, plan_change_proposed), DP-PUBLISH (publication_requested only), DP-STAGE-RESOLUTION (stage_evidence_submitted, and async on policy_changed for resolved stages), DP-ARCHIVE (problem_ended), DP-REUSE-FIT (suggestion_requested), DP-STAGE-DRAFT (stage_draft_requested). Content type `review_recommendation` selects exactly DP-PRIVACY, DP-NAMING, DP-TONE, DP-CRISIS. DP-STAGE is removed from the table, and the catalog parse test must expect its absence.

## Acceptance
- Every DP of the catalog is reachable from some event in the table (test).
- Selector is pure and has no Nest, Drizzle or I/O imports.
- A DP missing from the pack is surfaced as missing, never silently skipped.
- `npm run verify` is green.

## Out of scope
- Reading events from the database (relay unit).
- Running DPs.
