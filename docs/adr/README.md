# Architecture decision records

MADR-lite: context, decision, consequences, how to reverse. One decision per file, numbered, never edited after acceptance except to mark it superseded. Decisions that change an ADR get a new ADR that links back. `DECISIONS.md` at the repo root is the orchestrator's day-by-day log; ADRs are the durable, contributor-facing version of the architectural ones.

| ADR | Title | Status |
|---|---|---|
| [0001](0001-submodule-layout.md) | Superproject with three submodules and bare sibling remotes | Accepted |
| [0002](0002-server-owned-openapi.md) | The server owns the OpenAPI contract | Accepted |
| [0003](0003-nextjs-static-gallery-site.md) | Next.js static export for the gallery | Accepted |
| [0004](0004-email-code-auth.md) | Email 6-digit code sign-in | Accepted |
| [0005](0005-web-first-verification.md) | Verify on web first; native only has to bundle | Accepted |
| [0006](0006-no-live-ai-in-slice-1.md) | No live AI in slice 1 | Accepted |

To propose a new ADR: copy an existing file, use the next number, state context and how to reverse, and open it as a pull request. Keep each file under 25KB.
