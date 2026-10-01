# OQ-moderation-confidence-threshold: At what confidence must an automated result hold?

- **ID:** OQ-moderation-confidence-threshold
- **Status:** withdrawn

## Question

Superseded by `OQ-dp-confidence-thresholds`: AI decides single items (D-51), so a low-confidence result holds the item rather than sending it to a human reviewer. Only the emergency and legal lane goes to a human.

## Why it matters

Too low a threshold lets errors through; too high holds too much.

## Current default (what we built meanwhile)

See `OQ-dp-confidence-thresholds`. Below threshold the run holds (`PUB-FAILCLOSED-1`).

## Who can help

Machine-learning evaluators; trust-and-safety practitioners.

## What a good answer looks like

An evaluation plan: the task, the test set, the metric and a proposed threshold, using synthetic data only.

## Spec links

- `docs/spec/14-ai-privacy-gateway.md`
- `docs/spec/15-ai-inference.md`
