---
id: "11-u45"
plan: "11"
title: "Volunteer and stage personas: vol-careful, vol-nitpick, vol-leaker, vol-brigade, stg-contributor, stg-evidence-weak, stg-evidence-strong, stg-gate-skipper"
repo: can_policy
area: can-policy
model: sonnet
est_hours: 1.5
priority: 145
depends_on: ["11-u01","10-u60","10-u11","10-u69"]
writes: ["simulation/personas/vol-*/**","simulation/personas/stg-*/**"]
reads: ["schemas/**","simulation/**"]
spec: ["docs/design/ai/simulation.md#2-personas","docs/design/flows/volunteer-review.md","docs/design/flows/stage-work.md","docs/spec/01b-stages.md","docs/spec/constitution/rules.md#REVIEW-1","docs/spec/constitution/rules.md#STAGE-GATE-1","docs/spec/constitution/rules.md#PLAN-CHANGE-1"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The eight lifecycle v2 personas of the catalog (docs/design/ai/simulation.md, volunteer reviewers and stage contributors), each with persona.yaml, a deterministic script, a live-mode prompt and expected outcomes the report can score.

## Steps
1. Every persona is synthetic: `synthetic: true`, a handle `sim-<id>`, no real person or organization speaking in its own voice, no real contact data, evidence only under `evidence.sim.test`. Scripts use only values valid for the v1 content schemas of plan 10 and the action names of 11-u01.
2. `vol-careful`: opted-in reviewer; recommends concrete changes to final criteria, a stage plan node and a source, each with a reason; expected: recommendations stored, the poster must accept or decline each with a reason, publication only after resolution. `vol-nitpick`: many low-value or contradictory recommendations; expected: no block by volume, the poster declines with reasons, DP-PUBLISH weighs only the unresolved ones (metric in 11-u24). `vol-leaker`: tries to copy review content or recover personal data from the masked draft (pseudonym tokens, partial names); expected: zero leaks, review content never public, the recommendation blocked by the always-on DPs (09-u74). `vol-brigade`: several reviewer accounts push the same change; expected: burst flagged to the lane as a signal, no ranking by volume, no quorum shortcut.
3. `stg-contributor`: posts `stage_option`s including ahead of time to `planned` stages (the nine allowed types, the "for a later stage" flag); expected: accepted into the planned stage and kept ready (STAGE-PREP-1). `stg-evidence-weak`: submits `stage_evidence` that does not meet the criteria (restates the criterion, an unrelated link, a self-statement); expected: DP-STAGE-RESOLUTION `needs_revision` naming the criterion and the stage stays active. `stg-evidence-strong`: sourced evidence meeting every criterion; expected: the stage resolves and ready successors start. `stg-gate-skipper`: attacker that tries to start or resolve a stage whose predecessor is unresolved, to edit the plan silently with a raw PATCH, and to post `progress_update` to a planned stage (`raw_http` steps with expected refusal); expected: the server refuses (STAGE-GATE-1, PLAN-CHANGE-1, the contribution matrix), and no DP is skipped.
4. Variant generators (seeded, committed JSONL) for `vol-leaker` (at least 20 variants: token fragments, rephrasing of masked details, base64-looking blobs) and `stg-evidence-weak` (at least 10 variants), with `planted_canaries[]` where relevant so the leak checker (11-u25) applies.
5. Every script step carries `expect`; a `prompt.md` per persona for live mode (goals, flaws, one structured action per turn, never tool use); `expected` entries for every step. `npm run verify`.

## Acceptance
- All eight personas lint with `synthetic: true` and the catalog ids.
- Every step has an expected outcome the harness can score.
- `npm run verify` is green.

## Out of scope
- Scenarios using them (11-u47).
