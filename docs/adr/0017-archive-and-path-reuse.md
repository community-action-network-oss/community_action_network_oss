# ADR 0017: Archive and path reuse

- Status: Accepted, 2026-10-01 (D-76). Builds on [0010](0010-structured-content-everywhere.md), [0012](0012-legal-layer-stack.md), [0014](0014-openrouter-free-first-models.md) and [0015](0015-stage-plans-and-volunteer-review.md). Design: `docs/design/ai/archive-reuse.md`.

## Context
Many communities face the same problems and solve them from scratch. CAN already holds structured problems, stage plans and evidence, so the whole journey, including failures, can be kept and offered to the next community, adapted to its law, resources and place.

## Decision
- Every terminal problem becomes a public `archive_record` with personal data stripped by a second privacy-gateway pass (DP-ARCHIVE). Failures and challenges are recorded.
- Matching uses a structured `context_profile`, Postgres full-text search and pgvector embeddings (small multilingual model, free or cheap via OpenRouter or local, chosen by eval).
- Each `path_suggestion` passes DP-REUSE-FIT (legality under the new L0 to L6 stack, resource and budget fit, differences, adaptations) and is never adopted automatically.
- After publication DP-STAGE-DRAFT drafts a stage plan from accepted suggestions; it enters DP-STAGE-PLAN as a normal plan proposal. At least one review is still required (D-74).
- Retrieval reads ratified records only; archive text is data, never instructions.
- License default CC BY 4.0 with attribution (OQ-contribution-license, alternative CC0).

## Consequences
- Cold start needs simulation-seeded records, labelled as simulated.
- Embedding model changes re-embed the archive.
- Suggestion quality depends on the quality of `context_profile` answers.

## How to reverse
Disable suggestions and DP-STAGE-DRAFT, keep the archive as manual search only. Stored records stay valid.
