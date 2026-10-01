# Architecture decision records

MADR-lite: context, decision, consequences, how to reverse. One decision per file, numbered, never edited after acceptance except to mark it superseded. Decisions that change an ADR get a new ADR that links back. `DECISIONS.md` at the repo root is the orchestrator's day-by-day log; ADRs are the durable, contributor-facing version of the architectural ones.

| ADR | Title | Status |
|---|---|---|
| [0001](0001-submodule-layout.md) | Superproject with three submodules and bare sibling remotes | Accepted |
| [0002](0002-server-owned-openapi.md) | The server owns the OpenAPI contract | Accepted |
| [0003](0003-nextjs-static-gallery-site.md) | Next.js static export for the gallery | Accepted |
| [0004](0004-email-code-auth.md) | Email 6-digit code sign-in | Accepted |
| [0005](0005-web-first-verification.md) | Verify on web first; native only has to bundle | Accepted |
| [0006](0006-no-live-ai-in-slice-1.md) | No live AI in slice 1 | Superseded by 0008 (2026-10-01) |
| [0007](0007-gluestack-design-system.md) | gluestack-ui is the design system for all surfaces | Accepted |
| [0008](0008-ai-executed-community-policy.md) | AI-executed, community-legislated policy | Accepted |
| [0009](0009-can-policy-repo.md) | `can_policy` is the fifth repository | Accepted |
| [0010](0010-structured-content-everywhere.md) | Structured content everywhere, no free-form posting | Accepted |
| [0011](0011-persona-simulation-proof.md) | Persona simulation is the slice-1 proof | Accepted |
| [0012](0012-legal-layer-stack.md) | Cumulative legal layer stack | Accepted |
| [0013](0013-retroactive-re-resolution.md) | Retroactive re-resolution of past resolutions | Accepted |
| [0014](0014-openrouter-free-first-models.md) | OpenRouter with free-first, eval-chosen models | Accepted (supersedes the Anthropic-first part of 0008) |
| [0015](0015-stage-plans-and-volunteer-review.md) | Stage plans and volunteer review | Accepted (supersedes the fixed-sequence parts of the lifecycle) |
| [0016](0016-private-location-attestation.md) | Private location attestation for impacted versus guest | Accepted |

To propose a new ADR: copy an existing file, use the next number, state context and how to reverse, and open it as a pull request. Keep each file under 25KB.
