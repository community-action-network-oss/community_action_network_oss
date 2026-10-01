# ADR 0008: AI-executed, community-legislated policy

- Status: Accepted, 2026-10-01 (D-51, D-53). Supersedes [0006](0006-no-live-ai-in-slice-1.md).

## Context
Per-item human review does not scale, is slow and varies by reviewer. ADR 0006 chose no live AI and a human for everything published, which only postponed the question. The founder model separates community consensus from the individual instance: the community legislates policy, AI applies it.

## Decision
- The community never judges single items. It writes and ratifies **policy packs** (rules, per-DP prompts, labeled examples, thresholds, jurisdiction overlays). AI agents apply the ratified policy at every event: before publication (blocking, fail closed), on every update (diff-aware), and after publication (policy change, context change, sampling).
- Outcomes are `publish`, `needs_revision`, `reject`, `route_external`, `hold`, `escalate_human`. Only the emergency/crisis and legal/law-enforcement lane involves a person per item, and it is logged.
- Appeals produce labeled examples that amend the policy through a PR; the instance is then re-decided by AI. Flipped published items show "re-reviewed under policy vX", never silent removal.
- Slice 1 builds the full pipeline against a deterministic `FakeModel` and recorded responses (no paid calls). The first live provider, Claude via the Anthropic API, is founder-gated on an API key and a spend cap.
- All model calls go through the privacy gateway (spec 14). Agents have no tools. Content is data, not instructions.
- Design: `docs/design/ai/`.

Superseded with this ADR: D-13 (no live AI in slice 1), D-16 (moderator confirms publish), the interim-moderator clause (becomes interim policy stewardship, constitution VIII.2), rule AI-OFF-1, and the manifesto line "people make and answer for every decision" (now "people make every rule; AI applies it, explains it, and answers to appeal").

## Consequences
- Review scales with compute. Wait times become queue age, not volunteer availability.
- Decisions are consistent and explainable by rule id and policy version; quality depends on eval sets and the amendment loop.
- New work: the pipeline, policy repo, eval sets, rollout and replay tooling, label tasks, the emergency/legal lane.
- Risks: model error, bias across jurisdictions, prompt injection, policy capture, cost. Mitigations are in `docs/design/ai/safety-and-privacy.md` and `amendment-loop.md`.
- The spec, rules registry, UX copy and system design need updating (INTERIM-1, AI-OFF-1 and the moderator actor in the transition table are superseded; routed by the orchestrator).

## How to reverse
Restore human per-item review: bind a human review adapter to the same decision port (decisions already record `rule_ids` and `policy_version`), switch DPs to `hold` by config, and reinstate the interim-moderator clause. No schema change is needed.
