---
id: "11-u16"
plan: "11"
title: "Persona API driver: sessions, schema-form filler, hint answering"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 116
depends_on: ["11-u11","10-u29","11-u13"]
writes: ["test/simulation/api/**","test/simulation/personas/driver/**"]
reads: []
spec: ["docs/design/ai/simulation.md#1-principles","docs/design/ai/simulation.md#4-lifecycle-driving","docs/design/flows/structured-submission.md","docs/design/ai/structured-content.md#4-dp-assumptions"]
needs: ["docker","db"]
verify: ["npm run lint","npm run build","npm test","npm run verify"]
founder_gate: false
defaults: "The driver may call only routes a real user could (plus the observer feed read by the reporter). If an action needs a route that does not exist yet, the step fails with `route_missing` and the report lists it; never add a back door."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The HTTP client layer personas use: sign up by synthetic invite, keep a session and CSRF token, fetch the content schema for a type, build a body from script field values, submit drafts and transitions, read decisions, hints and notices, file appeals. The harness is HTTP-only (docs/design/components/server.md "Where the simulation harness lives"): it imports no server internals, only its own code and the generated API types.

## Steps
1. `PersonaSession` (`api/session.ts`): per persona cookie jar, CSRF handling per the existing client contract, invite redemption (`POST` signup flow from plan 02), sign-in; every request tagged with `X-Sim-Run` and the persona id in `events.jsonl`.
2. `SchemaFiller` (`personas/driver/fill.ts`): given the schema from `GET /v1/content-schemas/{type}` and a script step's `fields`, returns a body stamped with `schema_id`, `schema_version`, `schema_hash`; resolves `{{seed.*}}` and `{{var.*}}`; refuses to invent a value for a required field the script omitted (reports `script_incomplete`).
3. `HintAnswerer`: reads `needs_revision` hints (`field_ref`, `revision_hint`, rule ids) from the decision payload and applies the step's `assumption_strategy`: `mark_assumption` (adds an entry to `assumptions[]` and sets the basis to assuming), `correct` (replaces the field with the script's `revise.fields`), `ignore` (resubmits unchanged to prove the pipeline holds).
4. High-level methods used by scenarios: `submitProblem`, `contribute`, `proposeSolution`, `recordDecision`, `claimTask`, `postProgress`, `postVerification`, `appeal`, `readNotices`, `readPublicProblem`, each returning a typed result `{status, decision?, hints[], http}`.
5. Tests against a stub server and, where available, the real test server: session handling, filler stamps, hint strategies, missing route reporting, no call outside `/v1`.

## Acceptance
- Each strategy changes the body as specified (tests).
- A step needing a missing route reports `route_missing` rather than failing silently (test).
- All traffic is tagged with run and persona ids (test).
- `npm run verify` is green.

## Out of scope
- Running whole scripts (11-u17).
- Live model drivers (11-u35).
