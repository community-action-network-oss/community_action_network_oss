---
id: "13-u23"
plan: "13"
title: "Suggested paths panel in the preparation workspace (WF-SUGGEST-1)"
repo: can_app
area: can-app
model: sonnet
est_hours: 1.5
priority: 430
depends_on: ["13-u14","12-u12","12-u05","02-u13","02-u24","02-u25"]
writes: ["src/features/suggestions/**","app/me/problems/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/suggest-panel*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/archive.md#WF-SUGGEST-1","docs/design/ux/copy-deck-archive.md","docs/design/flows/path-suggestion.md","docs/spec/constitution/rules-legal-sim.md#REUSE-NOBLOCK-1","docs/design/ux/wireframes/prepare.md#WF-PREP-1","docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The private suggested-paths panel inside the preparation workspace (WF-PREP-1): live while the poster fills in the problem, never blocking, never showing scores as status.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit; the server contract is already done.
2. src/features/suggestions/useSuggestions.ts: TanStack hooks over `listSuggestions` (poll with backoff while a run is `computing`, pause when the tab is hidden) and a `useSuggestionEvents` hook that sends a field `blur` event or an `idle` event after 1.5 seconds of no typing (content is never sent, the server reads the stored draft). The generated client only.
3. Panel component (collapsible under the parts list on phones, side column at 1280 px; the preparation workspace route of plan 12 mounts it): cards ordered by fit, each with title, source count, similarity summary (dimension names), key differences, a legality badge and a resource-fit badge with an icon and text (never colour alone), "View path" and "Dismiss". A path not allowed where the poster is stays visible with its badge and the reason.
4. States: loading (`suggest.updating` announced once in a live region that also says how many paths were found), empty, too few fields, unavailable (the form keeps working), offline (last suggestions with a "may be out of date" line). New results never take focus. "Send for volunteer review" is never disabled by the panel.
5. Dismiss calls `dismissSuggestion`; a "Show hidden" link restores dismissed items for the draft. The "not advice" line is always shown.
6. Every string goes through useT() ids added to src/i18n/en.json and the ids of docs/design/ux/copy-deck-archive.md; no em or en dashes (npm run lint:copy). Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply.
7. Tests: events are debounced and carry no content; ordering and badges; a not-allowed path stays visible with its reason; unavailable and offline states keep the form usable; live region text; no scores or ranks rendered; dismissal persists.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The panel never blocks sending for review.
- Legality and resource fit are always visible on a card.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- The detail screen (13-u24).
- Server logic.
