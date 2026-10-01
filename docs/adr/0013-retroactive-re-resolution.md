# ADR 0013: Retroactive re-resolution

- Status: Accepted, 2026-10-01 (D-59). Builds on [0008](0008-ai-executed-community-policy.md) and [0012](0012-legal-layer-stack.md).

## Context
Re-moderation covers published content. A problem resolved last year (`solved`, `closed`, `redirected`, `stuck`) may have reached its conclusion under rules or law that have since changed.

## Decision
- A policy or legal-corpus change starts a re-resolution review job that replays the new rule over past resolutions and their decision records, through a new DP, DP-RERESOLUTION, with outcomes `keep`, `annotate`, `reopen`, `hold`.
- When the conclusion changes and reopening is feasible, the problem reopens for re-resolution through a reopen transition (defined in `docs/spec/01a-lifecycle.md`). Default feasibility: the problem still exists, the jurisdiction is still enabled, the initiator or a steward can be notified, and reopening does not undo a lawful completed implementation without a new proposal (open question, proposed).
- Never silent: a visible notice, full history kept, old record never deleted, decision appealable.
- Design: `docs/design/ai/triggers.md`, `decision-points.md`, `amendment-loop.md`.

## Consequences
- Resolutions stay current with the law, at the cost of reopen volume; rollouts are batched and estimated in the replay diff.
- Needs a spec change (reopen transition, state rules) routed by the orchestrator. Proposed rule id: RERESOLVE-1; open question OQ-reresolution-feasibility.
- Risk: churn and notice fatigue; mitigated by `annotate` over `reopen` where infeasible and batching.

## How to reverse
Disable the job by pack config (DP-RERESOLUTION returns `keep`). Stored notices and history remain.
