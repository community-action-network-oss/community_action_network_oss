---
id: "09-u11"
plan: "09"
title: "DP-CRISIS and DP-LEGAL deterministic layer that needs no model"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 240
depends_on: ["09-u08","03-u02","03-u03"]
writes: ["src/moderation/domain/crisis/**","src/moderation/app/crisis-first.ts","test/fixtures/moderation/crisis/**","src/moderation/domain/crisis/*.spec.ts"]
reads: ["src/problems/domain/**"]
spec: ["docs/design/ai/decision-points.md#per-dp-notes","docs/design/ai/appeals.md#emergencylegal-lane","docs/design/ai/safety-and-privacy.md#fail-closed-matrix","docs/spec/constitution/rules.md#CRISIS-STATIC-1","docs/spec/constitution/rules.md#SCOPE-1","docs/design/flows/emergency-legal-lane.md"]
needs: []
verify: ["npm run verify","npx vitest run src/moderation/domain/crisis"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
DP-CRISIS runs first on every text-bearing event and must never depend on a model. Build the deterministic keyword and pattern layer (and the DP-LEGAL legal-process detector) that always runs before any model call, plus the static-resources contract. Safety routing fails open to static resources; publication fails closed.

## Steps
1. Pure `detectCrisis(fields, language)` returns {level: none|possible|clear|imminent, categories[], spans} from a keyword and pattern table in src/moderation/domain/crisis/lexicon.ts (fictional minimal lexicon in English, plus Dutch for the Amsterdam overlay; the lexicon is TEMPORARY test data, real terms come from the pack, so load additional terms from the pack when present). Reuse 03-u03 `eligibility` emergency helper if it exists instead of duplicating.
2. `detectLegalProcess(fields)` for subpoena, court order, law-enforcement request, "request about a named person" shapes (deterministic first pass; model read comes through the DAG).
3. src/moderation/app/crisis-first.ts: `crisisFirst(input)` runs before the gateway; result type `{route: "static_resources" | "none", level, hold: boolean, lane: boolean}`. clear or imminent gives `route_external` plus hold of the item, imminent also `lane: true`; possible adds a model read later but already sets `hold: true`. Never throws: on any error return {route:"static_resources", hold:true}.
4. Static resources contract: `StaticCrisisResources` interface returning jurisdiction route text from the jurisdiction row (`emergency_notice`, 02-u04) with a baked-in fallback; no network.
5. Tests (unit): clear, imminent, possible and none fixtures including spacing and homoglyph evasion; the layer works with the gateway module unbound (import graph test); error injection returns static_resources and hold.

## Acceptance
- No model or gateway dependency in the import graph of src/moderation/domain/crisis (test).
- Any error yields static resources plus hold, never publish.
- Imminent danger sets the lane flag; nothing else does except legal process.
- `npm run verify` is green.

## Out of scope
- The lane module (09 lane unit).
- Real emergency routes and legal text (05-u09, founder-gated).
