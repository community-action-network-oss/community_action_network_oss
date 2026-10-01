# ADR 0015: Stage plans and volunteer review

- Status: Accepted, 2026-10-01 (D-72). Supersedes the fixed-sequence parts of the lifecycle (the public stages gathering facts, developing solutions, choosing a solution, in progress, checking the result) and the stage-transition meaning of DP-STAGE. Builds on [0008](0008-ai-executed-community-policy.md), [0010](0010-structured-content-everywhere.md) and [0013](0013-retroactive-re-resolution.md).

## Context
A single fixed public sequence fits few real problems. Some need parallel work, some skip steps, and a poster who has not prepared criteria cannot say what "solved" means. Posts also reached moderation before any human check of their facts and sources.

## Decision
- Prepare (private), then volunteer review (private, opt-in, personal data masked), then the AI publication decision (DP-PUBLISH), then a per-problem stage plan, repeated until the final acceptance criteria are met.
- The stage plan is a DAG of stages with their own acceptance criteria and decision method. No stage starts until its predecessors are resolved (STAGE-GATE-1); contributions to planned stages are allowed (STAGE-PREP-1).
- New DPs: DP-SOURCE-TRUST, DP-CRITERIA, DP-STAGE-PLAN, DP-PUBLISH, DP-STAGE-RESOLUTION. DP-STAGE is redefined out; DP-VERIFICATION judges final solved against the final criteria. Stage resolution is an AI decision on evidence, appealable (STAGE-RESOLVE-1).
- New content types: `stage_option`, `stage_choice`, `stage_evidence`, `review_recommendation`; the problem gains `sources[]`, `final_acceptance_criteria[]` and an optional `stage_plan`. The old sequence survives as the optional template `classic-5`.
- Plan changes after publication need a proposal checked by DP-STAGE-PLAN (PLAN-CHANGE-1). Rule changes re-run DP-STAGE-RESOLUTION on resolved stages and feed re-resolution.
- Design: `docs/design/ai/decision-points.md`, `structured-content.md`, `triggers.md`, `appeals.md`, `simulation.md`.

## Consequences
- Richer data model (stages, edges, criteria, options, choices, evidence, recommendations) and more schema surface to maintain.
- DAG gating adds scheduling logic and a cycle check; parallel stages need clear successor rules.
- Review latency: publication now waits for volunteers. Mitigation: a pack-defined review window, honest queue display, and DP-PUBLISH weighing only unresolved recommendations.
- More decisions to appeal and re-resolve (one per stage), so run volume and appeal load rise.

## How to reverse
Restore the fixed lifecycle: publish a pack where `stage_plan` is always `classic-5`, review is skipped by pack config, and DP-STAGE-RESOLUTION maps to the old stage move. Stored plans and recommendations stay on record.
