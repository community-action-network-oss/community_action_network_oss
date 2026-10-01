---
name: can-server
description: Work on can_server, the NestJS 12 + Drizzle + Postgres node server of CAN. Use when editing can_server code, schema, migrations, the OpenAPI contract, or running its verify pipeline.
---

# can_server

Weight: about 13 source files and 250 LOC in src/ (excl. tests) at W1. Small; read it all before editing.

## Stack
NestJS 12 (ESM, `.js` suffix on relative imports), Vitest (no swc needed), oxlint, Prettier, TypeScript ^6 (not 7: @nestjs/swagger peer), Drizzle 0.45 + pg, uuid v14 (v7 ids), Node >=24, npm.

## Commands (run from can_server/)
- `docker compose up -d --wait` Postgres 16 (host port 5433, can/can/can) + Mailpit (SMTP 1025, UI 8025)
- `npm run db:generate` / `db:migrate`, `npm run openapi`, `npm run lint|build|test|test:e2e`
- `npm run verify` is the single gate: compose up, migrate, lint, build, unit, e2e, openapi, `git diff --exit-code openapi/openapi.json`. The diff compares to the index, so `git add` a changed contract before verify passes.
- Config: `src/config.ts` reads process.env (loads `.env` if present). `.env.example` is committed, `.env` is not. No @nestjs/config.

## Invariants
- `src/domain/` imports no Nest, Drizzle, pg or I/O. Pure types and functions.
- `events` table is append-only: never UPDATE or DELETE.
- Every route has an explicit `operationId` via `@ApiOperation`, and DTO classes with `@ApiProperty` (no swagger CLI plugin).
- `configureApp()` in `src/app.setup.ts` is the single place for pipes, CORS and shutdown hooks; main, e2e tests and the OpenAPI generator all call it. New e2e tests must call it too.
- pg Pool is lazy, so `npm run openapi` needs no DB. Keep it that way (no connect-on-boot).
- Never edit a committed migration; add a new one.

## Single-owner paths
- `openapi/openapi.json`: generated only by `npm run openapi` (sorted keys). Never hand-edit. One agent at a time changes it; can_app consumes it via `gen:api`.
- `drizzle/**`: generated only by `npm run db:generate`. Never hand-edit; one agent at a time.

## Traps
- Template ships `vite-tsconfig-paths` (deprecated warning in Vitest 4); removed, no path aliases are used.
- Template `deploy` script and `@nestjs/mau` removed on purpose.
- `tsconfig.build.json` rootDir is `src`, so scripts must live under `src/` (openapi generator is `src/openapi.ts`, run from `dist/`).
- Vitest include is `**/*.spec.ts` for unit and `**/*.e2e-spec.ts` for e2e; do not name e2e files `.spec.ts`.
- zsh does not word-split unquoted variables, which bites when passing path lists to `git commit -- $VAR`.
