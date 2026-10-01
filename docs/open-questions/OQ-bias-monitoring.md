# OQ-bias-monitoring: How is moderation bias monitored across jurisdictions?

- **ID:** OQ-bias-monitoring
- **Status:** open

## Question

How does the project detect and respond to systematically different outcomes across languages, jurisdictions, groups and political contexts?

## Why it matters

A policy applied by AI at scale can be consistently unfair. Without measurement nobody would notice.

## Current default (what we built meanwhile)

Disparate-impact evals on the labeled sets per policy version, disagreement tracking, and cross-jurisdiction reviewers on panels. Appeal and flip rates are reported per jurisdiction and language in the audit sample.

## Who can help

Fairness researchers; linguists; rights practitioners.

## What a good answer looks like

Metrics, reporting cadence, thresholds that trigger a policy review, and who sees the reports.

## Spec links

- `docs/spec/06-moderation-geo-governance.md`
- `docs/spec/15-ai-inference.md`
- `docs/design/ai/runtime.md`
