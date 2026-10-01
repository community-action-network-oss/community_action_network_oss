---
id: "13-u03"
plan: "13"
title: "context_profile builder and API: deterministic mapping, fixed taxonomy, poster confirms"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 402
depends_on: ["13-u01","10-u08","10-u69","12-u04","09-u56"]
writes: ["src/archive/domain/context-profile/**","src/archive/app/context-profile/**","src/archive/http/context-profile*.ts","src/db/schema.ts","drizzle/**","src/app.module.ts","openapi/openapi.json","test/context-profile.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#3-context_profile","docs/spec/24-archive-reuse.md#242-suggestions-while-preparing","docs/design/ai/structured-content.md","docs/spec/constitution/ch04-resolution-lifecycle.md","docs/design/components/server.md"]
needs: ["docker","db"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The same `context_profile` for new problems and archived ones. Never typed freehand: a deterministic mapping first, then AI fill-assist proposes, the poster confirms (AI-ASSIST-1). Owner kinds `problem` and `archive_record` share the table of 13-u01.

## Steps
1. Domain: the fixed taxonomy as data in `taxonomy.ts` (problem_type and category ids; the file is the default and the authoritative list is the pack value of 10-u66), band functions (`populationScale(affected)` into `<100 .. >=1M | unknown`, `budgetBand(amount, currencyClass)` where the currency class is an income-adjusted class not an exchange rate, `resourceBand`), `geography(place)` reduced to country, region, `settlement_class` and Koppen `climate_class` at the coarsest level (never a street or point), `institutions(responsible_roles)` roles only, `constraints(assumptions, out_of_scope, lawful_options)` typed `legal|time|skills|political|physical`, `language` as BCP 47, and `legal_stack` from the jurisdiction resolver of 09-u56 (layers in force L0 to L6 each with its corpus version). Unknown is allowed per dimension and lowers confidence, never blocks.
2. Service `deriveContextProfile(problemDraft)` returns `{profile, sources: Record<dimension, "mapped"|"ai_proposed"|"poster_confirmed">, confidence}`; the AI part is a port `ProfileProposerPort` implemented through the fill-assist endpoint of plan 10 (10-u30, privacy gateway, redacted text, D-65 register); the default implementation is a fake so this unit needs no model. A dimension proposed by AI is never stored as confirmed.
3. Table use: `context_profile` rows of owner kind `problem` are private to the poster until publication; only the band values are public afterwards (declared resources and exact budgets stay private). Declared resources are a poster answer checked like any other field (gaming is flagged by fit checks and volunteer review).
4. API: `GET /v1/problems/{id}/context-profile` (poster, and volunteers during review with the same masking as the review view), `PUT /v1/problems/{id}/context-profile` (poster; accepts confirmations per dimension; validates against the taxonomy; bumps a `profile_version` that later marks suggestions stale), `POST /v1/problems/{id}/context-profile/derive` (poster; runs the mapping and the proposer and returns proposals only). Operation ids `getContextProfile`, `putContextProfile`, `deriveContextProfile`. Run `npm run openapi` and `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit it.
5. Tests: mapping fixtures for each dimension including `unknown`, a place string never leaves the country, region and class level, AI-proposed values are flagged unconfirmed until PUT, a PUT with an unknown taxonomy id is 422, the public archive profile shows bands only, no field contains an account id.

## Acceptance
- The mapping is deterministic and complete for every dimension of the context_profile section of the design doc.
- Nothing AI-proposed is stored as confirmed without the poster.
- Geography is never finer than settlement class and region.
- `npm run verify` is green with openapi regenerated.

## Out of scope
- Retrieval and ranking (13-u09, 13-u10).
- The profile editor UI inside the preparation workspace (plan 12 and 13-u23).
- Taxonomy governance beyond the pack value.
