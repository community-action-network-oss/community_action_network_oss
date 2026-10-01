# OQ-dp-confidence-thresholds: What confidence threshold applies at each decision point?

- **ID:** OQ-dp-confidence-thresholds
- **Status:** open

## Question

For each decision point (`DP-ELIGIBILITY`, `DP-PRIVACY`, `DP-FRAMING`, `DP-DUPLICATE`, `DP-CONTRIB-RELEVANCE`, `DP-TONE`, `DP-NAMING`, `DP-LEGALITY`, `DP-DECISION-RECORD`, `DP-VERIFICATION`, `DP-CRISIS`, `DP-EVIDENCE-TIER`), below what confidence does a run hold or escalate instead of deciding? This replaces `OQ-moderation-confidence-threshold`.

## Why it matters

Too low a threshold lets errors through. Too high holds too much and slows honest people. Privacy and crisis points need stricter thresholds than tone.

## Current default (what we built meanwhile)

Thresholds live in the policy pack and are set by eval on synthetic labeled sets. Below threshold the outcome is `hold` (`PUB-FAILCLOSED-1`). Placeholder in tests: privacy and crisis stricter than the rest. Catalog: `docs/design/ai/decision-points.md`.

## Who can help

Machine-learning evaluators; trust-and-safety practitioners.

## What a good answer looks like

Per decision point: the eval set, metrics (false-negative rate first for privacy and crisis), the proposed threshold, and the expected hold rate.

## Spec links

- `docs/spec/01-slice-1-brief.md` (section 4.2)
- `docs/spec/15-ai-inference.md`
- `docs/design/ai/decision-points.md`
