---
id: "14-u01"
plan: "14"
title: "Area model: versioned affected_area with H3 cell set and fetch API"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 450
depends_on: ["02-u03","02-u10"]
writes: ["src/areas/**","src/db/schema.ts","drizzle/**","src/app.module.ts","package.json","package-lock.json","openapi/openapi.json","test/areas.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/location/attestation.md#2-area-model","docs/adr/0016-private-location-attestation.md","docs/spec/constitution/rules-legal-sim.md#IMPACT-1","docs/open-questions/OQ-h3-resolution.md","docs/open-questions/OQ-boundary-data.md","docs/design/components/server.md"]
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
The versioned affected area of a problem (D-73): one canonical polygon, a derived H3 cell set at resolution 8, and a public fetch API. Anchor unit: the attestation, the contribution label, the area editor and zk_cell_v1 all build on `area_version`.

## Steps
1. Add the `h3-js` dependency (Apache-2.0, the reference implementation; polygon to cells is not worth hand-rolling). Record the choice in the commit message.
2. Migration: `problem_area_version` (problem_id fk, `version` int monotonically increasing per problem, unique on (problem_id, version), `polygon` jsonb GeoJSON Polygon or MultiPolygon in WGS84, `h3_resolution` int default 8, `cells` as a sorted bigint array or bytea of 64-bit ids, `cell_count` int, `polygon_hash` bytea, `cells_root_sha256` bytea (SHA-256 Merkle root over the sorted cell ids; the Poseidon root is added later by 14-u11), `authoring` overlay|drawn, `overlay_ref` null, `created_by`, `created_at`). A version row is immutable: no UPDATE grant. CHECK `cell_count >= 25` read from a single constants file `src/areas/domain/limits.ts` (K_MIN_CELLS default 25; the DB check uses the same number via the migration; OQ-h3-resolution keeps both as pack values later).
3. Domain (pure, unit tested): `polygonToCells(polygon, res)` using cells whose centre lies inside or that intersect by more than 50 percent, simplification of a drawn polygon to at most 200 vertices, `merkleRootSha256(cells)`, `validateArea()` returning `too_small`, `too_large_flag` (country scale is allowed but returns a review flag), `self_intersecting`, `invalid_geojson`. No input or output ever carries a position of a person; the module has no import of any device or user location.
4. Service: `createAreaVersion(problemId, polygon | overlayRef, actor)` allocates the next version in one transaction. Allowed for the poster on a draft or in_review problem, or through a plan-change proposal after publication (the proposal flow itself belongs to plan 12; this unit exposes the service and rejects calls on an active problem unless the caller passes a proposal id the plan-change path validates). An area change never edits an older version.
5. API: `PUT /v1/problems/{id}/area` (poster, creates a version, returns version metadata), `GET /v1/problems/{id}/area?version=n` (public, version defaults to latest, returns polygon, `h3Resolution`, a pointer or the cell list, `cellCount`, roots, `polygonHash`, versioned ETag and `Cache-Control: public, max-age=300, immutable` for an explicit version). Operation ids `putProblemArea`, `getProblemArea`. Areas are public data about problems, never about people.
6. Tests: a 25-cell minimum rejects a one-building polygon with the neighbourhood hint, version numbers increment without gaps under two concurrent creates, an old version is unchanged after a new one, the public GET works without a session, ETag changes with the version, a country-sized polygon returns the review flag.
7. Run `npm run openapi` and `git add -- openapi/openapi.json`.
8. Rate limits: do not edit the central rate-limit table `src/platform/security/limits.ts` owned by 07-u02 in this unit (that table is single-owner and a row added here would conflict). The routes of this unit are listed in the acceptance as a follow-up for 07-u02, with proposed limits.

## Acceptance
- Versions are immutable and monotonically increasing per problem.
- No area below K_MIN_CELLS can be stored (DB and domain).
- The fetch API is public, cacheable and returns the cell set for a given version.
- `npm run verify` is green.
- Follow-up for 07-u02 (not done here, never edit the limits table in this unit): add rows for `putProblemArea` (PUT /v1/problems/{id}/area): 20 per day per problem and 40 per day per account; `getProblemArea` (GET /v1/problems/{id}/area): public, cacheable, 120 per minute per IP.

## Out of scope
- The client check and permission flow (14-u04, 12-u24).
- The area picker UI in preparation (plan 12).
- Poseidon root and circuits (14-u11).
- Overlay boundary dataset ingestion (OQ-boundary-data).
