# ADR 0002: The server owns the OpenAPI contract

- Status: Accepted, 2026-10-01 (D-3)

## Context
`can_app` needs a typed client for `can_server`. Spec section 14 wanted a shared `api-client` package and a `protocol` package. With separate repos, a shared-packages repo adds a fourth moving part before any consumer other than the app exists.

## Decision
`can_server` generates `openapi/openapi.json` from its code (zod DTO schemas feed both validation and OpenAPI). `can_app` runs `npm run gen:api` to produce its client from that file. Lists are `{items, nextCursor}`; errors have stable machine codes. Each repo's CI fails when the committed artifact is stale. Event types, rule ids and other protocol meaning are documented in `docs/spec`, not only in DTOs.

## Consequences
- One source of truth, no hand-written fetch code, drift is a failing build.
- The app depends on the server checkout (or a published `openapi.json`) to regenerate; `CAN_OPENAPI_PATH` makes this explicit.
- Federation will need a neutral home for protocol schemas later; the event shape is kept free of Nest and ORM types so extraction is mechanical.

## How to reverse
Extract a `can_protocol` repo holding schemas plus the OpenAPI file, make both repos depend on it, and keep `/v1` stable during the move.
