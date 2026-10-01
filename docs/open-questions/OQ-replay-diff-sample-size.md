# OQ-replay-diff-sample-size: How large must a replay diff sample be?

- **ID:** OQ-replay-diff-sample-size
- **Status:** open

## Question

When a policy change is replayed over past decisions to see what would flip, how many decisions are sampled, and how is the sample chosen?

## Why it matters

A small sample can miss a harmful flip. A full replay costs money and time.

## Current default (what we built meanwhile)

Replay over all fixtures in tests. In production the default is a stratified random sample by decision point, jurisdiction and outcome, with every past appealed decision included. The diff report lists flips per rule.

## Who can help

Statisticians; evaluators; trust-and-safety practitioners.

## What a good answer looks like

A sample size rule per decision point with a confidence statement, and a trigger for a full replay.

## Spec links

- `docs/design/ai/amendment-loop.md`
- `docs/spec/15-ai-inference.md`
