---
id: "11-u03"
plan: "11"
title: "Contributor and other personas: expert, resident, skeptic, implementer, institution, proposer, appellant"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 1.5
priority: 103
depends_on: ["11-u01", "10-u10", "10-u11", "10-u12", "10-u70"]
writes: ["simulation/personas/con-*/**","simulation/personas/prop-*/**","simulation/personas/app-*/**"]
reads: []
spec: ["docs/design/ai/simulation.md#2-persona-catalog","docs/design/ai/structured-content.md#1-content-types-and-their-schemas","docs/spec/01-slice-1-brief.md#6-contribution-types"]
verify: ["npm run verify"]
founder_gate: false
defaults: "Scripts target the fiktiva-city problems of 11-u02 until seed scripts supply Amsterdam content (11-u07, 11-u08); the harness binds `{{seed.problem_id}}` at run time."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The seven non-submitter, non-adversarial personas with deterministic scripts over the 13 contribution types and the stage_option, stage_choice, stage_evidence, decision_record, task and appeal schemas. Every persona is synthetic: `synthetic: true`, a handle of the form `sim-<id>`, no real person, no real organization speaking in its own voice (an institution persona uses a role label such as "the municipal department for public space"), no real contact data, evidence only under the fake domain `evidence.sim.test`. Scripts use only field values valid for the v1 content schemas of plan 10.

## Steps
1. `con-expert`: precise `root_cause` (with a disproof test), `constraint` (law source), `evidence` (with what it does not show); expected `publish`, evidence tier raised.
2. `con-resident`: `observation` and `stakeholder_perspective` (a group, never a person), no personal narrative; includes one `personal_experience` that illustrates a pattern (expected publish) and one that is a case narrative (expected needs_revision).
3. `con-skeptic`: `risk` and `clarifying_question` challenging a claim; expected publish (dissent is not penalized; the report checks that no false reject is recorded for it).
4. `con-implementer`: `implementation_offer`, claims a task, `progress_update`, `verification_evidence`; respects the cooldown exemption types from limits.yaml.
5. `con-institution`: plays a role label ("the municipal department for public space"), submits a `constraint` with a legal source reference; never a real body speaking.
6. `prop-proposer`: writes two `stage_option`s on an active stage (one lawful, one that the jurisdiction pack blocks, expected `blocked` stage and the stuck payload from DP-LEGALITY) and, as the stage decider, one `stage_choice` with its decision record for the lawful one with the legal-gate record.
7. `app-appellant`: files an `appeal` with a specific factual dispute, once with new evidence refs (no new personal data) and once without; scripts specify which decision to appeal by an `outcome_was` selector.
8. Every script step carries `expect`; `prompt.md` per persona for live mode. `npm run verify`.
9. Lifecycle v2 (W13): `con-implementer` completes the steps of a stage choice and posts `stage_evidence` mapped to criteria (a task done alone never resolves a stage); contributions to `planned` stages are allowed through `con-expert` and `con-resident` with the "for a later stage" flag (STAGE-PREP-1). Everything involving volunteers, stage evidence quality and gate-skipping is in 11-u45.

## Acceptance
- Seven personas lint clean with expected outcomes per step.
- prop-proposer yields one lawful and one blocked proposal.
- `npm run verify` green.

## Out of scope
- Adversarial personas.
- Running scripts.
