---
id: "09-u50"
plan: "09"
title: "Re-reviewed under a new policy version: notice, list and public short form"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 279
depends_on: ["09-u29","09-u48","02-u25"]
writes: ["app/me/notices/**","app/me/problems/**","src/features/notices/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/remod-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-REMOD-1","docs/spec/constitution/rules.md#REMOD-NOTICE-1","docs/design/ai/triggers.md#re-moderation-semantics","docs/design/flows/post-publication-recheck.md#notices","docs/open-questions/OQ-reremoderation-grace.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/remod-notice.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-REMOD-1 is the notice an author sees when a published item is re-reviewed under a new policy version, plus a short public form on the problem page. It is never a silent removal: it shows what changed, the rules now applied, how long the item stays visible, and the appeal path.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The server units this depends on are already done, so the contract exists.
2. src/features/notices/useNotices.ts over GET /v1/me/notices and POST /v1/me/notices/{id}/seen; app/me/notices/index.tsx lists notices (decided under and re-reviewed) newest first, no counts as status, no urgency language.
3. app/me/notices/[id].tsx renders WF-REMOD-1: remod.title, "Re-reviewed under policy {version}", remod.body, what changed, rules now applied with plain texts, visible-until date or the immediate variant (`remod.immediate`) for privacy or crisis tiers, `remod.nothingSilent`, Revise it and Appeal this decision (API appealUntil), and the permissive block with "Resubmit now" calling the transitions endpoint when `resubmitNow` is true.
4. Public short form `remod.public` on the problem detail screen from GET /v1/problems/{id}/notice (extend the existing detail route file minimally): text only, no author data.
5. Calm, non-shaming wording; neutral plain language from the copy deck ids; add the ids to docs/design/ux/copy-deck.md if missing and to src/i18n/en.json.
6. Tests: notice shows policy version and rules; immediate variant; permissive variant shows resubmit; appeal entry disabled when closed; public short form has no author data; list is not a feed (no infinite scroll, no counts).
7. Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply; strings only through useT() ids added to src/i18n/en.json and docs/design/ux/copy-deck.md ids; no em or en dashes (npm run lint:copy).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- The notice always offers the appeal path.
- No text implies silent removal or urgency.
- `npm run verify` is green.

## Out of scope
- Email of notices.
- Appeal screens (next).
