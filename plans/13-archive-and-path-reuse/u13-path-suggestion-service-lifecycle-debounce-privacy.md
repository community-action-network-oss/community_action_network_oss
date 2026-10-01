---
id: "13-u13"
plan: "13"
title: "path_suggestion service: lifecycle, debounce, privacy gateway, cache, budget"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 412
depends_on: ["13-u12","09-u14","09-u19","09-u09","12-u04"]
writes: ["src/archive/app/suggestions/**","src/archive/domain/suggestions/**","src/db/schema.ts","drizzle/**","test/path-suggestion.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#7-path_suggestion-lifecycle","docs/design/flows/path-suggestion.md","docs/spec/24-archive-reuse.md#242-suggestions-while-preparing","docs/spec/constitution/rules-legal-sim.md#REUSE-NOBLOCK-1","docs/design/components/server.md"]
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
The live suggestion engine while a poster prepares a problem (D-76): a debounced pipeline per draft that runs retrieval, ranking and DP-REUSE-FIT and keeps a `path_suggestion` per candidate. The poster is never blocked (REUSE-NOBLOCK-1).

## Steps
1. Table `path_suggestion` (id, problem_id of the draft, `record_ids[]`, `state` computing|ready|stale|dismissed|accepted|used, `dimensions` jsonb, `reuse_fit` jsonb, `draft_stages` jsonb, `attribution` jsonb, `confidence`, `profile_version`, `cache_key`, `run_id`, timestamps) and `suggestion_run` (draft id, started_at, status, cost_micro_usd). Private to the poster; volunteers see accepted ones only through 13-u14. Add the migration with `npm run db:generate`.
2. Trigger: `POST /v1/problems/{id}/suggestions/events` (13-u14) records a change event; the service debounces per draft: one run in flight, a trailing run 5 seconds after the last change, at most 6 runs per hour per draft (pack values from 10-u66). A changed `context_profile` (new `profile_version`) marks older suggestions `stale`.
3. Run: build the query from the redacted field text plus the context profile only, never raw intake and never a private location (assert on the object passed to retrieval); retrieval (13-u09), ranking (13-u10), DP-REUSE-FIT (13-u12) per candidate, keep only `publish` outcomes. Honest empty state when nothing is above the floor: no model beyond the query embedding.
4. Cache: key = hash(context_profile, redacted problem text, archive index version, embedding model id, policy version). A hit returns instantly; a new archive version invalidates only keys whose top results changed. The cache stores no raw text (hash plus result ids).
5. Budget and failure: every run counts against the per-run and monthly caps (09-u14); on budget exhaustion, provider failure or a hold, the panel state is `unavailable` with no content and the form continues; nothing throws into the preparation endpoints.
6. Accept and dismiss are state moves in the service (`accepted` stores the chosen adaptations; `dismissed` is remembered per draft so the same suggestion is not shown again until its inputs change).
7. Tests with FakeModel and FakeEmbedding: debounce collapses ten rapid events into one trailing run, the 7th run within an hour is refused with a calm state, a profile change stales old suggestions, cache hit costs 0 provider calls, budget exhaustion yields `unavailable`, dismissal persists, the query object contains no email, address or location.

## Acceptance
- Never more than one run in flight per draft; the hourly cap holds.
- No raw intake or location reaches retrieval or any model.
- Failure of any dependency never blocks preparation (test through the preparation endpoints).
- `npm run verify` is green.

## Out of scope
- HTTP endpoints (13-u14).
- The panel (13-u23).
- Stage drafting (13-u15).
