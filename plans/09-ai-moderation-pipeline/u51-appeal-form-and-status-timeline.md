---
id: "09-u51"
plan: "09"
title: "Appeal form and status timeline"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 280
depends_on: ["09-u49","09-u34","09-u35","09-u37","10-u05"]
writes: ["app/me/problems/**","src/features/moderation/appeal/**","src/i18n/en.json","src/api/schema.d.ts","__tests__/appeal-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/wireframes/submit.md#WF-APPEAL-1","docs/design/ux/wireframes/submit.md#WF-APPEAL-2","docs/design/ai/appeals.md#what-the-appellant-sees","docs/spec/constitution/rules.md#APPEAL-1","docs/spec/constitution/rules.md#APPEAL-2","docs/design/flows/appeal.md","docs/design/ux/copy-deck.md","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/appeal-screens.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-APPEAL-1: file an appeal with structured grounds (rule, passage, reason) using the schema-driven renderer. WF-APPEAL-2: a status timeline that shows only the steps that have happened, with the real wait and the disclosure that no person overrode the decision. The result screen reuses the decision view.

## Steps
1. Run `npm run gen:api` first (reads ../can_server/openapi/openapi.json) and commit `src/api/schema.d.ts` with this unit. The server units this depends on are already done, so the contract exists.
2. app/me/problems/[id]/appeal.tsx: grounds form from the appeal schema through the 10-u05 renderer (rule selector from the decision rule ids, passage, reason), `Closes {date}` from appealableUntil, window-closed state, submit calls POST /v1/moderation/decisions/{id}/appeals, field errors mapped; after sending show "Appeal received" and the timeline.
3. app/me/problems/[id]/appeal-status.tsx from GET /v1/appeals/{id}: steps filed, independent re-run (result, "different model, prompt variant {label}"), community label (open, counts only "3 of 5 labels in", never identities), policy change proposed (link only when the API provides it), re-decision under {version}; the real wait text; outcomes upheld, overturned or unclear with the explanation and version; actions after an upheld re-run: Accept the result (POST accept) or I still disagree (POST dispute) with a one-line explanation of what dispute does.
4. Never closes silently by timeout; a delayed step shows a status text. Show `decision.noPerson` disclosure and model class family.
5. Overturned: link to the decision view for the new result (reuse, do not copy).
6. Tests: grounds validation maps errors to fields; window closed disabled with the date; timeline renders only completed steps; label counts only; dispute and accept call the right endpoints; disclosure present; no identities anywhere.
7. Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply; strings only through useT() ids added to src/i18n/en.json and docs/design/ux/copy-deck.md ids; no em or en dashes (npm run lint:copy).

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6, and 3b where the unit renders a schema form; mark items not applicable with a reason in the commit message).
- Timeline shows only steps that happened.
- Counts only for label progress, no identities.
- `npm run verify` is green.

## Out of scope
- Labeler screens.
- Server logic.
