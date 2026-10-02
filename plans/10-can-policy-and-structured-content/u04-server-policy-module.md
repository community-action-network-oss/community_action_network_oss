---
id: "10-u04"
plan: "10"
title: "Policy module: pack loader, version registry, content-schema registry, PII-safe cache, fixture pack"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 4
depends_on: []
writes: ["src/policy/**","src/app.module.ts","src/config.ts","test/fixtures/policy/**","test/policy/**","openapi/openapi.json",".env.example"]
reads: ["src/**","openapi/openapi.json"]
spec: ["docs/design/ai/policy-pack.md","docs/design/ai/structured-content.md","docs/design/components/server.md","docs/design/components/can-policy.md","docs/design/flows/structured-submission.md","docs/spec/constitution/rules.md"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run openapi","git add openapi/openapi.json","npm run verify"]
founder_gate: false
defaults: "If 1.5 hours run short, land the cache as a tested pure module under src/policy/domain/cache.ts without wiring it into a request path, and say so in the commit message. Never drop the loader, the hash check or the endpoint."
status: done
attempts: 0
commits: ["260b0dd"]
actual_hours: 0.1
---
## Objective
A `policy` module in can_server that loads an immutable policy pack by version and hash, keeps a version registry with an active pointer per jurisdiction, serves content schemas by type and version, and has a PII-safe cache keyed by policy version. A complete fixture pack ships in the repo so server work never waits for can_policy. Exposes `GET /v1/content-schemas/{type}` and regenerates `openapi/openapi.json`.

## Steps
1. Layout: `src/policy/domain/` (pure TS: `pack.ts` types, `hash.ts`, `resolve.ts`, `cache.ts`), `src/policy/app/` (`PolicyStore`, `ContentSchemaRegistry` use cases), `src/policy/infra/` (`FsPackSource` reading a directory), `src/policy/http/` (controller, zod DTOs), `src/policy/policy.module.ts`. Domain imports no Nest, Drizzle or I/O (lint rule).
2. Config (`src/config.ts`, `.env.example`): `POLICY_PACKS_DIR` (default `test/fixtures/policy`), `POLICY_ACTIVE` as JSON `{"<jurisdiction|default>": {"name": "...", "version": "...", "hash": "<64 hex>"}}`, optional `POLICY_SHADOW`, `POLICY_CANARY`. The pinned hash in config is authoritative; the pack source is never trusted alone.
3. Hash contract (must match can_policy 10-u03 exactly): hashed files are everything under the pack directory except `manifest.json`, `release.json`, `ratifications/`, `CHANGELOG.md`, `ci/`, `tools/`, `test/`, `node_modules/` and dotfiles; text files (`.json .yaml .yml .md .txt`) have CRLF normalised to LF; per-file sha256 hex; entries sorted by path in byte order; `pack_hash = sha256_hex(["parent:" + (parent_pack_hash or "none"), ...entries.map(e => e.path + "\t" + e.sha256)].join("\n"))`. Version string `<name>@<semver>+<first 12 hex>`.
4. `PolicyStore.load(name, version, expectedHash)`: reads `pack.yaml` and `manifest.json`, recomputes the hash and refuses on mismatch, refuses when `ratifications/` has no record naming this version and hash with `approved_by` and `expires_at` in the future (FOUNDER-TRANS-1), validates every `content-schemas/*/schema.json` parses, compiles resolved layers (base, constitution, jurisdiction, local) by rule id with the stricter-wins merge and the tier order of constitution I.2, and refuses a lower layer that weakens a higher-layer rule or touches rules listed under `protected_core` in the base pack. A failed load never replaces the active pack; old versions stay loadable by `(name, version, hash)`.
5. Version registry: in-memory map of loaded packs by `pack_hash`, an `active` pointer per jurisdiction (with `default`), and `shadow` and `canary` slots with `canary_percent`. `PolicyStore.active(jurisdiction)` returns the immutable compiled pack or throws `PolicyUnavailable` (callers map that to `hold`, never to publish).
6. `ContentSchemaRegistry.get(type, {jurisdiction, version?})` returns `{schema, schema_id, schema_version, schema_hash, policy_version, messages}` where `schema_hash` is the sha256 of the schema file and `messages` is the parsed `content-schemas/<type>/messages.en.json` (default decision: label and help text for schema fields live in the pack beside the schema, one file per type and locale). Unknown type gives a typed not-found; an explicit retired version still resolves for replays.
7. `GET /v1/content-schemas/{type}` with optional `?version=` and `?jurisdiction=`; `operationId: getContentSchema`; DTO classes with `@ApiProperty`; 404 uses the shared error envelope; response sets `ETag` to the schema hash and `Cache-Control: no-cache`. Run `npm run openapi` and `git add openapi/openapi.json` before `npm run verify` (can-server skill).
8. PII-safe cache (`domain/cache.ts`): key `sha256(policy_version + "|" + dp_id + "|" + normalizedInputHash)`; value stores only the structured decision output, never input text; TTL and max entries from config; `get`/`set` refuse a value containing any string longer than 400 characters or matching the email, phone or url patterns (a cache must not become a PII store); eviction is LRU. Tests prove no input text can be recovered from keys or values.
9. Fixture pack `test/fixtures/policy/`: pack `base@0.0.1` with `pack.yaml`, `rules.yaml` (3 invented rules incl. one `protected_core`), `limits.yaml` (2 keys), `content-schemas/problem/{schema.json,messages.en.json}` (a 4-field miniature that uses `x-ui`, `x-guidance`, `x-checks`), a `constitution` pack, a fictional jurisdiction `fiktiva-city` pack, `manifest.json` per pack built by a small script `test/policy/build-fixture.ts` (re-implementing the contract), and `ratifications/base-0.0.1.md` with `approved_by: test-founder`, `expires_at: 2999-01-01`. Also negative fixtures generated in-memory by tests: tampered file, missing ratification, expired ratification, weakening overlay, protected-core touch.
10. Tests (Vitest, no network): load ok and hash stable; every negative fixture refused and the previous active pack retained; `PolicyUnavailable` when nothing valid; registry returns schema by type and version; endpoint e2e (`test/policy/content-schemas.e2e-spec.ts`, calls `configureApp()`) returns 200 with ETag, 404 for unknown type; cache tests above. No test reads `../can_policy`.

## Acceptance
- A tampered pack file (one byte) makes the load fail and the previous active version stays serving (test).
- A pack without a valid unexpired ratification record, or whose overlay weakens a higher rule, is refused (tests).
- `GET /v1/content-schemas/problem` returns the fixture schema with `schema_version`, `schema_hash`, `policy_version`, `messages`.
- The cache never stores input text (test with planted email, phone and a 500 character string).
- `npm run verify` is green and `openapi/openapi.json` is committed with the change.

## Out of scope
- Moderation runs, DP execution, gateway and FakeModel (plan 09).
- Validating submissions against a pinned schema (10-u29).
- Fetching packs from git or GitHub: the source is a directory in this plan.
