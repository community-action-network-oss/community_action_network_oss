---
id: "13-u14"
plan: "13"
title: "Suggestion API: events, list, detail, accept, dismiss and the review speed-up summary"
repo: can_server
area: can-server
model: sonnet
est_hours: 1.5
priority: 413
depends_on: ["13-u13","12-u03"]
writes: ["src/archive/http/suggestions*.ts","src/archive/app/suggestions/api/**","src/review/**","src/app.module.ts","openapi/openapi.json","test/path-suggestion-api.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/design/ai/archive-reuse.md#7-path_suggestion-lifecycle","docs/design/flows/path-suggestion.md","docs/spec/24-archive-reuse.md#244-speed-without-skipping-review","docs/spec/constitution/rules-legal-sim.md#REUSE-CONTEXT-1","docs/design/components/server.md"]
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
HTTP surface of the suggestion engine, for the poster, plus the summary volunteers see in review. Accepting never changes the problem; it records a private note.

## Steps
1. `POST /v1/problems/{id}/suggestions/events` (poster, body `{field, kind: "blur"|"idle"}` with no content; the server reads the stored draft) returns 202; rate-limited per account and draft. `GET /v1/problems/{id}/suggestions` returns the current suggestions (state, dimensions, warnings, attribution) and an `emptyState` flag; `GET /v1/problems/{id}/suggestions/{sid}` returns the detail of WF-SUGGEST-2: source cases with links to archive records and their license, per-dimension similarity with both values, legality per layer L0 to L6 with text results and citations, resource fit per needed item, differences, adaptations, the draft stages with their credit, confidence. `POST .../{sid}/accept` (body: chosen adaptation ids) and `POST .../{sid}/dismiss` (optional reason code).
2. Accept records `accepted` with the chosen adaptations as a private note on the draft; it never edits facts, criteria or the stage plan (the "use as starting point" copy into the editor is a client action over the draft API after a confirm, 13-u24). An accept on a suggestion whose `reuse_fit` legality says unlawful at any layer is refused with 409 and the reason (the app also disables the action).
3. Review speed-up: the masked review view of 12-u03 gains `accepted_suggestions[]` (source records, fit summary, adaptations, no poster identity) so volunteers see the archive evidence; strong fit is summarised in one line. At least one completed volunteer review is still required (D-74); a test asserts no code in this unit changes review quorum, status or DP-PUBLISH inputs besides adding the summary.
4. Privacy and keys: DTOs have explicit key sets; no other draft's data, no account ids, no scores without `dimensions`; other members get 404 for someone else's suggestions. Operation ids `postSuggestionEvent`, `listSuggestions`, `getSuggestion`, `acceptSuggestion`, `dismissSuggestion`. Run `npm run openapi` and `git add -- openapi/openapi.json` so the verify diff gate passes. Never hand-edit it.
5. Tests: poster only; event endpoint carries no content; detail has legality rows for every layer in force; accept of an unlawful suggestion is 409; accepted shows in the volunteer view and nowhere public; a member cannot read another member's suggestion; key-set tests.
6. Rate limits: do not edit the central rate-limit table `src/platform/security/limits.ts` owned by 07-u02 in this unit (that table is single-owner and a row added here would conflict). The routes of this unit are listed in the acceptance as a follow-up for 07-u02, with proposed limits.

## Acceptance
- Every shown suggestion exposes its differences, legality and resource fit (REUSE-CONTEXT-1).
- Accept is blocked for unlawful suggestions and never mutates the problem.
- `npm run verify` is green with openapi regenerated.
- Follow-up for 07-u02 (not done here, never edit the limits table in this unit): add rows for `postSuggestionEvent` (POST /v1/problems/{id}/suggestions/events): 60 per hour per account and draft (the server also debounces); `listSuggestions` (GET /v1/problems/{id}/suggestions): 120 per hour per account; `getSuggestion` (GET /v1/problems/{id}/suggestions/{sid}): 120 per hour per account; `acceptSuggestion` (POST .../{sid}/accept): 60 per hour per account; `dismissSuggestion` (POST .../{sid}/dismiss): 60 per hour per account.

## Out of scope
- The panel and detail screens (13-u23, 13-u24).
- Drafting after publication (13-u15).
