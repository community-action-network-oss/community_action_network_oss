---
id: "10-u29"
plan: "10"
title: "Validate submissions against the pinned schema version; drafts pin schema id, version and hash"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 29
depends_on: ["10-u04","03-u06"]
writes: ["src/policy/**","src/problems/**","src/contributions/**","drizzle/**","src/db/schema.ts","test/policy/**","package.json","package-lock.json","openapi/openapi.json"]
reads: ["src/**"]
spec: ["docs/design/ai/structured-content.md#2-schema-format","docs/design/flows/structured-submission.md","docs/design/ai/policy-pack.md","docs/spec/constitution/rules.md#SCHEMA-1","docs/spec/constitution/rules.md#STRUCT-ONLY-1"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run openapi","git add openapi/openapi.json","npm run verify"]
founder_gate: false
defaults: "Add `ajv` (exact version, `ajv/dist/2020`) as the only new dependency. If 03-u06 draft endpoints are not yet merged when this runs, create the validator as a standalone use case with tests and leave the endpoint change to a follow-up note in the commit message."
status: done
attempts: 0
commits: ["add32a5","ea3f41b"]
actual_hours: 0.2
---
## Objective
Every structured submission and draft carries `schema_id`, `schema_version` and `schema_hash`; the server validates the body against exactly that version, and rejects an unknown, retired, or hash-mismatched version with a prompt to reload (SCHEMA-1, STRUCT-ONLY-1). This replaces the hard-coded field validation of 03-u06 for the problem draft body.

## Steps
1. Read 03-u06 (`src/problems/**` draft create and edit) and 10-u04. Add `StructuredContentValidator` in `src/policy/app/` using `ajv/dist/2020` with the `x-ui`, `x-guidance`, `x-checks` keywords registered as no-ops (strict mode on), compiled schemas cached by `schema_hash`.
2. Drizzle migration (new, never edit an old one; `npm run db:generate`): `content_schema_version(type, version, pack_version, schema_hash, activated_at, retired_at)` and draft columns `schema_id`, `schema_version`, `schema_hash` (not null for new rows). Backfill existing drafts to the fixture problem schema version in the migration.
3. Draft create takes the active version (or the version the client asked for) and stamps it; draft edit validates the body against the stamped version only, not the active one. A submit for a retired version still validates against the stamped version until the grace window ends (10-u31 handles the window).
4. Errors use the shared envelope with closed codes `schema_unknown`, `schema_retired`, `schema_hash_mismatch`, `schema_invalid` (with JSON pointer per violation). `schema_unknown` and `schema_hash_mismatch` carry `reload: true`. No error names an internal limit value that is `public: false` in limits.yaml.
5. Deterministic completeness layer of DP-COMPLETENESS lives here as pure functions in `src/policy/domain/completeness.ts`: required present, enum, `min_chars`/`max_chars` from the schema, URL shape, list sizes, repeated-sentence-across-fields, filler (lorem, punctuation only, stopwords only, same string in every field). Returns structured findings with `field_ref`; plan 09 calls it before any model run. Table-driven tests with at least 25 cases.
6. Contract: add the new fields to the OpenAPI DTOs, regenerate `openapi/openapi.json` (`npm run openapi`, `git add`). Tests: valid body passes; each error code; a body valid under 1.0.0 but invalid under 1.1.0 validates by the pinned version; filler detectors; e2e through `configureApp()`.

## Acceptance
- Submissions validate against the stamped version; unknown, retired and mismatched versions are rejected with the closed codes (tests).
- Filler and repeated-text detectors have table-driven tests.
- No problem field is named in validator code (test greps `src/policy`).
- `npm run verify` is green and the OpenAPI contract is committed.

## Out of scope
- Moderation runs and DP model calls (plan 09).
- Draft migration (10-u31).
- Fill-assist (10-u30).
