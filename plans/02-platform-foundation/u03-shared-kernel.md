---
id: "02-u03"
plan: "02"
title: "Shared kernel: error envelope, clock, pagination, noindex"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 11
depends_on: ["02-u02"]
writes: ["src/platform/**","src/domain/ids.ts","src/app.setup.ts","src/app.module.ts","test/kernel.e2e-spec.ts","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#6-api-surface-v1","docs/design/system-design.md#4-event-log","docs/spec/constitution/rules.md#DECENT-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/kernel.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Add the small shared pieces every module uses: the stable error envelope, an id generator and clock behind ports, cursor pagination helpers, an event builder, and the noindex header. Reuse src/domain/ids.ts (UUIDv7) and src/domain/event.ts; do not duplicate them.

## Steps
1. src/platform/errors.ts: class ApiException(status, code, message, fieldErrors?) and a Nest ExceptionFilter producing {error:{code, message, fieldErrors?}} for ApiException, ValidationPipe errors (map class-validator messages to fieldErrors keyed by field name, code "validation_failed") and unknown errors (500, code "internal", no stack in the body). Register the filter in configureApp.
2. Stable codes enum in src/platform/error-codes.ts: validation_failed, unauthenticated, session_expired, not_permitted, not_found, invalid_transition, rate_limited, conflict, internal. Add an ErrorResponseDto with @ApiProperty and reference it from a shared decorator ApiErrors() used by later controllers.
3. src/platform/ports.ts: interfaces Clock {now(): Date} and IdGenerator {next(): string}; UuidV7Generator and SystemClock implementations (wrap src/domain/ids.ts); a FixedClock for tests in src/platform/testing.ts.
4. src/platform/pagination.ts: encodeCursor(obj) / decodeCursor(str) (base64url JSON, validated, invalid cursor throws validation_failed), clampLimit(raw) default 20 max 50, and a Page<T> type {items, nextCursor}.
5. src/platform/events.ts: buildProblemEvent({problemId, type, actorId, from, to, reason, payload}) returning a row with id from IdGenerator, originNodeId and protocolVersion from config/domain/protocol.ts, prevHash null, occurredAt from Clock.
6. Middleware in configureApp sets X-Robots-Tag: noindex, nofollow on every response (all pages noindex in slice 1). Export the Platform module (global) providing Clock and IdGenerator.
7. Tests: unit tests for cursor and clamp and the event builder; test/kernel.e2e-spec.ts builds the app with configureApp and asserts a 404 route returns the envelope with code not_found, a bad cursor returns validation_failed, and the noindex header is present.
8. Run `npm run openapi`, then `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit the file.

## Acceptance
- Every error response in the e2e test matches the envelope shape.
- Invalid cursors and out-of-range limits are handled (limit 500 becomes 50).
- buildProblemEvent always sets prev_hash null, origin_node_id and protocol_version (DECENT-1).
- openapi/openapi.json regenerated and committed in the same commit.
- `npm run verify` is green.

## Out of scope
- Idempotency-Key handling (07 if needed).
- Any domain module.
