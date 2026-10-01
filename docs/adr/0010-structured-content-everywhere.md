# ADR 0010: Structured content everywhere, no free-form posting

- Status: Accepted, 2026-10-01 (D-58). Builds on [0008](0008-ai-executed-community-policy.md).

## Context
Free-form posts hide assumptions, mix fact with guess, omit scope and law, and are hard for any reader or agent to check. Moderating a blob leaves hints vague. The community can legislate policy in advance only if it can also decide what a post must contain.

## Decision
- No content type allows free-form posting. Problem, every contribution type, proposal, decision record, task, verification, appeal and policy proposal each have a schema decided in advance by the community.
- Schemas live in `can_policy` as part of the versioned policy pack: JSON Schema plus UI hints, per-field guidance and examples. The server serves the active version; the app renders forms from it and never hard-codes fields. Submissions record the schema version and hash.
- The problem schema forces coverage of condition, affected, place, time, facts versus uncertainty, evidence, causal hypothesis, scope, responsible roles, desired outcome, assumptions, out of scope and lawful options.
- Two decision points apply to every type at submit and update: DP-ASSUMPTIONS (holds back wrong factual, causal, legal and scope assumptions with `needs_revision` and field hints) and DP-COMPLETENESS (required fields meaningfully answered).
- AI may suggest field values through the privacy gateway. The poster confirms each one and assisted fields are flagged in the record.
- Schemas change only through the amendment loop. In-flight drafts migrate; published content keeps its schema version.
- Design: `docs/design/ai/structured-content.md`.

## Consequences
- Posts are longer to write but checkable; hints sit beside fields. Eval and replay work per field.
- The pack grows (schemas, guidance, limits) and each schema change needs form and migration review.
- The UX, API and copy deck must render from schemas (routed by the orchestrator). Proposed rule ids: STRUCT-ONLY-1, SCHEMA-1, ASSUMP-1, COMPLETE-1, AI-ASSIST-1.
- Risk: forms feel heavy or exclude people; mitigations are fill-assist, honest `unknown` where allowed, and simulation-based tuning of bounds.

## How to reverse
Mark a type's schema as `free_text_allowed` through a major pack version (a protected-tier-reviewed PR) and drop DP-ASSUMPTIONS and DP-COMPLETENESS from it. Stored records keep their schema version, so nothing is lost.
