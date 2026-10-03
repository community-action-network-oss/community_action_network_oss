---
name: can-server
description: Work on can_server, the NestJS 12 + Drizzle + Postgres node server of CAN. Use when editing can_server code, schema, migrations, the OpenAPI contract, or running its verify pipeline.
---

# can_server

## Stack
NestJS 12 (ESM, `.js` suffix on relative imports), Vitest (no swc needed; does not typecheck, so run `nest build`), oxlint, Prettier, TypeScript ^6 (not 7: @nestjs/swagger peer), Drizzle 0.45 + pg, uuid v14 (v7 ids), Node >=24, npm.

## Commands (run from can_server/)
- `docker compose up -d --wait` Postgres 16 (host port 5433, can/can/can) + Mailpit (SMTP 1025, UI 8025). NEVER `docker compose down -v` (wipes the shared local DB).
- `npm run db:generate` / `db:migrate`, `npm run openapi`, `npm run lint|build|test|test:e2e`
- `npm run verify` is the single gate: compose up, migrate, lint, build, unit, e2e, openapi, `git diff --exit-code openapi/openapi.json`. The diff compares to the index, so `git add -- openapi/openapi.json` after a contract change before verify. Never run vitest while verify runs.
- `npm run sync:policy-fixture` refreshes `test/fixtures/policy-v1` from can_policy; then update `PINS.json` and `.env.example` POLICY_ACTIVE by hand.
- `npm run sim:sync` (`--check` for drift) refreshes `test/simulation/fixtures/data`.
- Config: `src/config.ts` reads process.env (loads `.env` if present). `.env.example` is committed, `.env` is not. No @nestjs/config.

## Invariants
- `src/domain/` imports no Nest, Drizzle, pg or I/O. Pure types and functions.
- Insert-only tables (`problem_event`, `stage_event`, `moderation_decision`, `decision_record`, `legal_gate_record`, `moderation_run_stage`, `moderation_event`, `pseudonym_token`): never UPDATE or DELETE. The creating migration needs `REVOKE UPDATE, DELETE ... FROM can_app_rw` AND a BEFORE UPDATE/DELETE trigger, because the app role owns the tables and REVOKE alone is not enforced (see `drizzle/0024_*`). `moderation_run` has a freeze trigger once status leaves running.
- Auth: non-GET routes need a session unless `@Public()`; GET routes are open unless decorated. A GET that reads `req.auth` needs `@Authenticated()`.
- Roles: base roles via `@Roles`; additive `account_role` (auditor, labeler, lane_member, steward) via `@RequireRole`; steward is derived from moderator/admin; `GET /v1/me/roles`.
- `/v1/problems*` is pinned to 3 public GETs (contract test PROFILE-LOCAL-1), never a PUT/PATCH there. Write and owner routes live under `/v1/drafts/:id/...`, `/v1/me/...`, `/v1/stages`, `/v1/rules`.
- OWN-1: no OpenAPI schema text may contain the substrings "owner" or "initiator" (case-insensitive regex over all schemas, `test/problems-list.e2e-spec.ts`); say `assignee`.
- `test/schema.e2e-spec.ts` forbids column names containing "email" except `email_ciphertext`/`email_hmac`.
- Health is `GET /health` (no `v1` prefix).
- Every route has an explicit `operationId` via `@ApiOperation`, and DTO classes with `@ApiProperty` (no swagger CLI plugin). `ApiException(status, code, message, fieldErrors?, extra?)`.
- `configureApp()` in `src/app.setup.ts` is the single place for pipes, CORS and shutdown hooks; main, e2e tests and the OpenAPI generator all call it. New e2e tests must call it too.
- pg Pool is lazy, so `npm run openapi` needs no DB. Keep it that way (no connect-on-boot).
- Never edit a committed migration; add a new one.
- Locks: StageEngine locks the problem row, then stages by id; use `applyIn(tx, ...)`. Never call `TransitionEngine.apply` or a repo that opens its own tx inside an engine tx (deadlock). `ContributionPort.create` takes the caller's tx. `TaskPort` is `openRequired(tx, stageId)`, implemented by `DbTaskPort` (`src/tasks`); `TasksModule` is imported by `StagesModule`.
- D-85 reply cap: `enforceReplyCap` (`src/contributions/app/reply-cap.ts`) runs inside the submit tx under an advisory lock. Every reply path (contribution POST, stage options, stage evidence) goes through `ContributionPort.create(..., tx)`. Over the cap: 429 `reply_limit_reached {limit, remaining, resetsAt}`. Allowance: `GET /v1/me/problems/{id}/reply-allowance`. Pack key `caps.replies_per_account_per_problem_per_day`.
- AI: `src/ai-gateway` is the only door to a model (architecture test). Model-bound text only via `PrivacyGateway.prepare`; `mask()` is pure; the output gate (`src/ai-gateway/app/output-gate.ts`) runs before any model text reaches a person; reexpand only on the poster's own view. Contribution privacy checks (`src/contributions/app/contribution-checks.ts`) exclude id-ref fields `improves`, `target`, `target_stage`, `task_ref` (UUIDs trip the phone pattern).
- Detector text folds: every `normalise()` fold used by privacy, eligibility and secrets must keep text length (the index map depends on it). Email regexes need the local-part lookbehind (`BL` in `src/problems/domain/privacy/detect.ts`) to stay linear; any detector change must pass the adversarial performance guard (`src/problems/domain/privacy/adversarial.spec.ts`).
- Prompt templates: exactly one `<<<DATA`, one slot line `(the labelled lines are inserted here by the server)`, one `DATA>>>`, one `{{RULES}}`, at most one `{{SHOTS}}`. Run prompt hash is `BuiltPrompt.promptHash`.
- Legal (`src/policy/legal`): `registry.stackFor` fails closed with `LegalLayerMissing`; `LegalArticle.text` is never serialised; use `tryRetrieveLegal`, `renderLegalLines`, `neutraliseLegalForgery`. The choice gate (`LegalChoiceGate`) uses the `LEGAL_JUDGE` port, default `FailClosedLegalJudge`: a non-ban retrieved article is unjudged and the gate is held.
- Queue: `src/platform/queue` (`QueuePort`, `QueueWorker`); periodic ticks only when `jobsEnabled`; payloads carry ids only. `EventRelay` and `RelayCursor` live in AppModule.
- Providers (`src/ai-gateway/providers`: fake, replay, openrouter): `ProviderError` (`providers/errors.ts`) is separate from `GatewayError`, and the gateway maps every `ProviderError` to hold. openrouter is inert unless `AI_PROVIDER=openrouter` + `OPEN_ROUTER_KEY` + a register entry with a current `evalExpiry`.
- `AssistModule` (`src/policy/assist`) is registered in `AppModule`, not `PolicyModule` (import cycle via PrivacyGatewayModule > ModerationModule > PolicyModule).
- Content: ajv runs strict + strictTypes (can_policy also enforces strictRequired). `content_schema_version` rows are keyed (type, schema_hash); `pack_version` follows the newest activation.

## Single-owner paths
- `openapi/openapi.json`: generated only by `npm run openapi` (sorted keys). Never hand-edit. One agent at a time changes it; can_app consumes it via `gen:api`.
- `drizzle/**`: generated only by `npm run db:generate` (check `drizzle/` for the latest number; do not hard-code it). Never hand-edit; one agent at a time.

## Where things live
- Policy fixtures: tests never read `../can_policy` live; they use `test/fixtures/policy-v1` (`FIXTURE_V1_DIR`).
- Tests loading the v1 chain call `ratifiedV1()` (`test/policy/helpers.ts`). The pack carries all 28 DPs; a test needing a missing DP hides one (`GappedRegistry`).
- SMTP adapter: `src/platform/mail/smtp.adapter.ts`.

## Traps
- Offline: nodemailer resolves SMTP hosts via real DNS and ignores /etc/hosts. The adapter maps localhost to 127.0.0.1; tests use IP literals (`smtp://127.0.0.1:1025`) and set `SMTP_URL` in `vi.hoisted` for app-booting e2e.
- Exact-key-set e2e tests (problem-detail, stages-api) must be updated when a DTO gains a field.
- Specs posting `/v1/stages/{id}/choice` against packs without a legal_stack override `CHOICE_GATE` with `PassingChoiceGate`.
- Drizzle `execute<T>` needs `type` aliases, not interfaces. A SQL `x IN (...)` CHECK passes on NULL: add `x IS NOT NULL AND`.
- Template `vite-tsconfig-paths`, the `deploy` script and `@nestjs/mau` were removed on purpose; no path aliases.
- `tsconfig.build.json` rootDir is `src`, so scripts must live under `src/` (openapi generator is `src/openapi.ts`, run from `dist/`).
- Vitest include is `**/*.spec.ts` for unit and `**/*.e2e-spec.ts` for e2e; do not name e2e files `.spec.ts`.
- zsh does not word-split unquoted variables, which bites when passing path lists to `git commit -- $VAR`.
- Never run prettier (`npm run format`) on `src/` wholesale; format only the files you touched.
- e2e specs share one Postgres DB: the seed spec cleans dev seed rows, so write specs that own their rows and do not assume an empty DB. e2e files run sequentially (`fileParallelism: false` in vitest.config.e2e.ts) because specs scan global event and job tables; order event queries explicitly (`ORDER BY id`) and scope counts to the spec's own rows. Insert-only ledgers can never be cleaned: use a unique calendar block per run. Retention jobs sweep whole tables, so anchor e2e clocks in the past.
- Auth rate limits are in memory per process (`src/platform/security/rate-limiter.ts`); tests must not expect them to persist.
- Import Ajv as `import { Ajv2020 } from 'ajv/dist/2020.js'` (ESM path, named export).
- Seed e2e teardown (`test/seed.e2e-spec.ts`) deletes stage children in FK-safe order and disables triggers (`alter table ... disable trigger user`) around the insert-only tables; keep that order when adding stage child tables.
