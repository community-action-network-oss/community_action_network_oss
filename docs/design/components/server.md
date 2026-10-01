# can_server components

NestJS 12 modular monolith, Drizzle, Postgres 16. Layers inside each module: `http/` (controllers, zod DTOs) calls `app/` (use cases) calls `domain/` (pure TS) and `infra/` (Drizzle repos, adapters behind ports). `domain/` must not import `@nestjs/*`, `drizzle-orm` or `infra/` (lint rule, planned 02-u03). Dependency direction is one way; cross-module calls use exported use-case interfaces, never another module's tables.

## Built today
`src/main.ts`, `app.module.ts`, `app.setup.ts`, `config.ts`, `openapi.ts`, `health/{controller,dto,module}`, `db/{schema,db.module}` (one table: `events`, append-only), `domain/{ids,event,protocol}`. Everything below this line is planned.

## Module map
```mermaid
flowchart TD
  http[http: controllers and DTOs] --> acc[accounts]
  http --> prob[problems]
  http --> contrib[contributions]
  http --> prop[proposals]
  http --> dec[decisions]
  http --> task[tasks]
  http --> modr[moderation runtime]
  prob --> modr
  contrib --> modr
  prop --> modr
  dec --> modr
  task --> modr
  modr --> pol[policy]
  modr --> gw[ai-gateway]
  gw --> adapters[provider adapters: FakeModel, Anthropic]
  gw --> budgets[router and budgets]
  modr --> aud[audit]
  acc --> aud
  prob --> aud
  pol --> plat[platform]
  aud --> plat
  prob --> plat
```

| Module | Responsibility | Depends on | Built by | Status |
|---|---|---|---|---|
| `platform` | config, health, clock, IdGenerator (UUIDv7), event log writer, `JobPort` runner, ports | none | 02-u02, 02-u03, 03-u14 | partly built (config, health, ids, event) |
| `accounts` | account, session, invite, handle, email crypto, login codes | audit, notification port | 02-u04 to 02-u08, 03-u15 | planned |
| `problems` | problem, problem_event, transition engine, jurisdiction, draft_fingerprint, deterministic submission checks | accounts, moderation, audit | 02-u09 to 02-u12, 03-u01 to 03-u08 | planned |
| `moderation` | **AI moderation runtime orchestrator**: DP selector, run recorder, decision applier, outcome mapper, hold-and-retry, appeal re-run | problems, policy, ai-gateway, audit | plan 09 (pending); today 03-u09, 03-u10 (human queue, superseded) | plan 09 (pending) |
| `policy` | pack loader, version registry (semver + hash), active and rollout state, cache keyed by version | platform | plan 09 (pending) | plan 09 (pending) |
| `ai-gateway` | privacy gateway (redact, pseudonymize, zones), provider adapters (FakeModel, Anthropic), router (small model first), budgets and spend caps, model register | policy, platform | plan 09 (pending) | plan 09 (pending) |
| `contributions` | contribution, evidence_ref (URL only), allowed-per-state matrix | problems, moderation | 04-u01 to 04-u03 | planned |
| `proposals` | proposal, comparison data | problems, contributions | 04-u04 | planned |
| `decisions` | decision_record, legal-gate record | proposals, problems | 04-u05 | planned |
| `tasks` | task, blockers, verification refs | decisions, problems | 05-u01, 05-u02 | planned |
| `audit` | audit_event, write-only API for others | none | 02-u04 | planned |

Added by D-55 to D-58 (all pending plans 09, 10, 11):

| Part | Responsibility | Depends on | Status |
|---|---|---|---|
| Content-schema registry (inside `policy`) | serves schema JSON by content type and version from the active pack; validates submissions against the pinned `schema_version`; refuses hash mismatch; `GET /v1/content-schemas/{type}?version=` | policy loader | plan 10 (pending) |
| Fill-assist endpoint | `POST /v1/content-schemas/{type}/assist`: notes through the privacy gateway, schema-constrained per-field suggestions, nothing stored as content | ai-gateway, registry | plan 10 (pending) |
| DP-COMPLETENESS, DP-ASSUMPTIONS | two more DPs in the selector, run on every structured content type; own prompts, schemas and eval sets in the pack | moderation | plan 09 (pending) |
| Notices read model | per-account "re-reviewed under policy vX" and "Decided under policy vX" notices built from decisions; `GET /v1/me/notices` | moderation | plan 10 (pending) |
| `label_task` module | randomized, context-masked appeal and eval label pools, disagreement tracking, label export as pack PR input | moderation, accounts (labeler role) | plan 10 (pending) |
| `lane` module | emergency and legal lane cases, logged actions by lane members; the only per-case human decision | moderation, audit | plan 11 (pending) |
| Simulation harness | persona runner driving the public API; see below | none in-process | plan 11 (pending) |

### Where the simulation harness lives
Decision: `can_server/test/simulation`, a plain TypeScript runner (Vitest-launched in CI, a `node` script for night runs) that talks to a running server over HTTP only. Why: it needs the public API, FakeModel bindings, fixtures and the test database that already live in `can_server`; a separate package adds a repo, versioning and duplicated fixtures for no gain. The HTTP-only rule (the runner imports no server internals) keeps moving it out cheap later. It runs against its own database, never production. Detail: [../flows/persona-simulation-run.md](../flows/persona-simulation-run.md), [../ai/simulation.md](../ai/simulation.md).

## Inside moderation, policy and ai-gateway
```mermaid
flowchart LR
  ev[event from problems, contributions, jobs] --> sel[DP selector]
  sel --> run[run executor: bounded DAG]
  run --> gwp[ai-gateway port]
  gwp --> priv[privacy gateway]
  priv --> rt[router + budget guard]
  rt --> fake[FakeModel]
  rt --> anth[Anthropic adapter, founder-gated]
  run --> agg[deterministic aggregation]
  agg --> app2[decision applier]
  app2 --> rec[run recorder]
  pol2[policy: active pack, version, hash] --> sel
  pol2 --> run
  app2 --> trans[transition engine + events]
```

| Part | Notes |
|---|---|
| DP selector | maps event type plus content kind to the DP set in the active pack. Provisional DP ids in [../ai/decision-points.md](../ai/decision-points.md). |
| Run executor | classify, rule checks, explain, then aggregate deterministically. Agents have no tools; content is quoted data; outputs schema-bound. |
| Privacy gateway | redaction, pseudonymization, data zones, zero-retention providers; no provider call without it. See [../ai/safety-and-privacy.md](../ai/safety-and-privacy.md). |
| Router and budgets | small model first, escalate on low confidence, per-day and per-run caps, cost per accepted result metric. |
| Adapters | `FakeModel` (deterministic, recorded responses; tests and night runs). `Anthropic` adapter needs API key and spend cap: founder-gated, off by default. |
| Decision applier | writes decision and the transition in one transaction through the engine. `hold` on any failure. |
| Policy loader | loads a pack by version and hash, refuses on mismatch, keeps the previous active version; cache keyed by policy version plus normalized input hash. See [../ai/policy-pack.md](../ai/policy-pack.md). |

Runtime detail lives in [../ai/runtime.md](../ai/runtime.md); this file only places it among modules.

## AI entities (sketch)
```mermaid
erDiagram
  policy_pack_version ||--o{ moderation_run : "applied in"
  moderation_run ||--o{ moderation_decision : produces
  moderation_decision ||--o{ appeal : "appealed via"
  appeal ||--o{ label_task : "may spawn"
  problem ||--o{ moderation_run : "subject"
  moderation_run {
    uuid id PK
    text subject_type
    uuid subject_id
    text trigger "submit|update|recheck|sample|appeal"
    text mode "blocking|async"
    bytea inputs_hash
    text policy_version
    text prompt_hash
    text model_id
    jsonb outputs
    numeric cost
    text outcome
  }
  policy_pack_version {
    text version PK "semver"
    bytea content_hash
    text state "shadow|canary|active|retired"
    int canary_percent
    timestamptz ratified_at
  }
  moderation_decision {
    uuid id PK
    uuid run_id FK
    text outcome
    text[] rule_ids
    text policy_version
    text prompt_hash
    text model_id
    numeric confidence
    text field_ref
    text revision_hint
    timestamptz appealable_until
  }
  label_task {
    uuid id PK
    uuid appeal_id FK
    text status
    jsonb masked_input
    text label
    int panel_size
  }
```
`moderation_decision` replaces the human-decider columns of the older ERD (`decided_by`, `interim`, `reviewer_disclosure` are gone or system-actor). `appeal.reviewer_id` becomes the independent run id. The `events` scaffold table carries run events by `object_type`.

## HTTP surface changes under D-51
`POST /v1/moderation/decisions` and the moderator queue and appeals queue endpoints in system-design section 6 are replaced by: read decisions and runs for my problem, file appeal, read notices, and (for auditors and labelers) sample and label endpoints. Exact paths come with plan 09.

## Tests
Domain units in Vitest (no Nest), e2e against compose Postgres and Mailpit, FakeModel with recorded responses for every DP; no paid calls in CI or night runs.
