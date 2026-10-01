---
id: "07-u21"
plan: "07"
title: "Playwright journeys: policy change notice and re-resolution reopen (T20, T21)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 126
depends_on: ["07-u07", "09-u50", "09-u65", "09-u66", "09-u64"]
writes: ["e2e/journeys/policy-change.spec.ts", "e2e/helpers/**"]
spec: ["docs/design/ux/journeys.md", "docs/spec/01a-lifecycle.md", "docs/spec/01b-stages.md", "docs/spec/constitution/rules.md#REMOD-NOTICE-1", "docs/spec/constitution/rules.md#RERESOLVE-1", "docs/design/ux/copy-deck.md", "docs/design/ux/wireframes/submit.md#WF-REMOD-1", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3", "docs/design/ux/wireframes/browse.md#WF-DETAIL-4", "docs/design/ux/wireframes/archive.md#WF-ARCHIVE-2", "docs/design/ux/wireframes/stages.md#WF-STAGEMAP-1", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npm run e2e -- e2e/journeys/policy-change.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Prove the post-decided half of the model in the UI with the FakeModel: when the community's policy changes, affected published content is re-moderated and shows a visible notice, and a solved problem whose conclusion changes under the new rule or legal corpus is reopened (T20) with its history intact, and the affected stages return to active.

## Steps
1. Re-moderation notice: with a published seed problem and a fixture pack v2 whose changed rule flips its outcome (staged rollout through the test hook of 09-u27: shadow, canary, full), the initiator and a visitor see the WF-REMOD-1 notice "Re-reviewed under policy v2" with the rule, the explanation and the appeal path; the earlier decision and text stay visible; nothing is removed silently (assert the old decision is still listed on the timeline). An unchanged item shows no notice.
2. Re-resolution reopen (T20 `REOPEN-RULE`): a seed problem already solved (archive record under policy v1, 13-u01) and a new legal corpus or policy version (fixture) that changes the conclusion; the re-resolution review job runs (09-u61) and the feasibility check passes; the problem shows "Reopened under policy vX" and the status label of its reopened state, the affected stages show as reopened (ST10) in the stage map (WF-STAGEMAP-1) and their unstarted successors return to Planned, the old archive record stays linked in WF-ARCHIVE-2 as an earlier record and the new terminal state will build a new one, the initiator received the email in Mailpit, and the decision has an appeal path. Also run the infeasible case (jurisdiction no longer enabled or a lawful completed implementation): the page gets an annotation notice, no state change, and the record explains why.
3. T21 `REOPEN-EVIDENCE` variant: a changed evidence rule reopens a solved problem to Active with "Reopened under policy vX", the stages that supplied the final-criteria evidence reopened (ST10) and a request for evidence meeting the new rule.
4. Both viewports; axe on the notice and reopened screens. Selectors are role and label based; assert text from the lifecycle vocabulary and copy deck, never colour.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The notice, the reopen and the infeasible annotation each pass at both viewports with the FakeModel.
- History is never hidden: the earlier decision and archive record remain reachable (assertions).
- The email for the reopen arrives in Mailpit with no problem text.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Legal stack paths (07-u22).
- The server pipeline itself (plan 09 E2E units).
