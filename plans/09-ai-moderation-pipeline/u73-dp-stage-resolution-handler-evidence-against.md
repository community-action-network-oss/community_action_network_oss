---
id: "09-u73"
plan: "09"
title: "DP-STAGE-RESOLUTION handler: evidence against criteria, per-criterion results"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 301
depends_on: ["09-u20","09-u16","09-u01","12-u07","10-u64"]
writes: ["src/moderation/app/dp-stage-resolution.ts","src/moderation/domain/stage-resolution/**","test/fixtures/moderation/stage-resolution/**","test/dp-stage-resolution.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/decision-points.md","docs/design/ai/decision-points.md#shared-contract","docs/design/ai/decision-points.md#per-dp-notes","docs/spec/01b-stages.md","docs/spec/constitution/rules.md#STAGE-RESOLVE-1","docs/spec/01a-lifecycle.md","docs/design/ai/triggers.md"]
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
The registered DP-STAGE-RESOLUTION that 12-u07 calls. It replaces the old stage-transition meaning of DP-STAGE (D-72). Appealable (STAGE-RESOLVE-1).

## Steps
1. Read 12-u07 (`StageResolutionTarget`, `stage_resolution` table). Register `DP-STAGE-RESOLUTION` in the registry with outcomes publish (the stage resolves), needs_revision (the stage stays active, unmet criteria named), hold; mode blocking, and async when a rule or policy change touches a resolved stage (then the keep, annotate or reopen decision belongs to DP-RERESOLUTION, 09-u61, which calls this handler's evidence logic).
2. Deterministic layer: every criterion of the stage has at least one mapped `stage_evidence` item, the choice gate is recorded when the stage `needs_choice`, evidence is not dated before the stage started, tiers from DP-EVIDENCE-TIER are present; a missing mapping is `needs_revision` naming the criterion with no model call. A completed task alone is never evidence.
3. Model layer: does each item address its criterion, what the evidence does not show, criteria met only by the poster's own statement. Output `per_criterion[]` {criterion_ref, met, evidence_ids, hint}; a `publish` with any `met: false` is invalid (aggregate validator test). The result feeds `stage_resolution.per_criterion` unchanged.
4. Cited sources go through DP-SOURCE-TRUST (09-u69) first; a stage whose only evidence is `weak` sources is `needs_revision` citing it.
5. Use FakeModel keyword-table files added under the unit's own fixtures directory (do not edit the fake table of 09-u12; add a second table file it loads via config), and moderationFixtures() packs (never the 10-u04 default pack).
6. Tests: all criteria met resolves; one unmet criterion returns with the criterion named; evidence restating the criterion is not met; instructions hidden in an evidence description do nothing (canary); held on provider failure leaves the stage `resolving` (applied by 12-u07); the DP is registered under the old name nowhere (no DP-STAGE id remains in the registry).

## Acceptance
- `publish` never carries an unmet criterion.
- No DP named DP-STAGE exists in the registry (test).
- `npm run verify` is green.

## Out of scope
- Applying ST05 and ST06 (12-u07).
- Prompt (10-u64).
