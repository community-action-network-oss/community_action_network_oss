---
id: "09-u65"
plan: "09"
title: "Reopened under policy vX: notice screen and reopened detail state"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 294
depends_on: ["09-u64", "09-u50", "05-u06"]
writes: ["app/me/notices/**", "app/problems/**", "src/features/notices/**", "src/features/problems/status/**", "src/i18n/en.json", "src/api/schema.d.ts", "__tests__/reopened-*.test.tsx"]
spec: ["docs/design/ux/wireframes/submit.md#WF-REMOD-1", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/design/flows/re-resolution.md", "docs/design/ai/triggers.md#re-resolution-d-59", "docs/design/ux/copy-deck.md", "docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify", "npx jest --ci __tests__/reopened-notice.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Show the visible re-resolution result. The notice follows WF-REMOD-1 with the re-resolution wording, and the problem detail shows a reopened state. UX gap: no wireframe defines the reopened status panel variant; this unit reuses the WF-DETAIL-3 status panel pattern (paused and stuck variants) and logs the gap in the commit message for the spec owner.

## Steps
1. Run `npm run gen:api` and commit `src/api/schema.d.ts` (09-u64 contract exists).
2. Notice screen (extend `app/me/notices/[id].tsx` of 09-u50): kinds `reopened` and `re_resolution_annotated` render "Reopened under policy {version}" or "Re-checked under policy {version}", the changed rules and law (layer, article, corpus version as plain text and links), what it means for the conclusion, a link to the full history, `remod.nothingSilent`, and the appeal entry (API `appealUntil`). Calm, non-shaming, no urgency.
3. Reopened detail state: status panel variant `reopened` on the problem detail (WF-DETAIL-3 pattern): headline "Reopened under policy {version}", the old resolution stays visible in History marked superseded, the stage is the new state (solution_development, eligible or verification), and the public short form from `/notice` shows no author data. The annotation variant shows "Re-checked" text with the reason in plain words and keeps the old decision intact.
4. Strings only through `useT()` ids in src/i18n/en.json, ids added to docs/design/ux/copy-deck.md; `npm run lint:copy` clean (no em or en dashes).
5. Tests: reopened notice shows version, changed rules and legal citation; annotation variant; history link and appeal entry always present; reopened status panel shows superseded old resolution; public short form has no author data. Every required state of ui-unit-template section 1 has a test or a stated reason.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; 3b not applicable, no schema form).
- The notice and the detail state always offer the appeal path and never imply silent removal.
- `npm run verify` is green.

## Out of scope
- A new wireframe (spec owner follows up on the UX gap).
- Email.
