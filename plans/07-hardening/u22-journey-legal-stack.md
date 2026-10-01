---
id: "07-u22"
plan: "07"
title: "Playwright journeys: legal stack refusal (TOPIC-FORBIDDEN-1) and legally blocked stuck"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 127
depends_on: ["07-u07", "09-u67", "09-u59", "09-u58", "09-u49", "05-u06", "12-u05"]
writes: ["e2e/journeys/legal-stack.spec.ts", "e2e/helpers/**"]
spec: ["docs/design/ux/journeys.md", "docs/spec/01a-lifecycle.md", "docs/spec/constitution/rules.md#TOPIC-FORBIDDEN-1", "docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/spec/constitution/rules.md#LEGAL-GATE-1", "docs/design/ux/copy-deck.md", "docs/design/ux/wireframes/submit.md#WF-DECISION-2", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3", "docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify", "npm run e2e -- e2e/journeys/legal-stack.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Prove the cumulative legal layer stack (D-61) from the user's side, with the FakeModel and the fiktiva-city test overlay plus the Amsterdam skeleton: a problem whose topic is forbidden by local law is not published in that jurisdiction and the refusal cites its legal basis; a problem whose solution only is illegal stays open and moves to stuck (legally blocked).

## Steps
1. Topic forbidden (TOPIC-FORBIDDEN-1): in the fiktiva-city overlay (a test layer that marks a topic forbidden at the city layer L6, 10-u20) a member submits a problem on that topic; the run refuses it, the member sees the not-accepted decision screen (WF-DECISION-2 pattern, text from the copy deck, no promise of publication) with the layer, the provision and the policy version (LEGAL-CITE-1), the problem is not in the public list, and the same problem in the Amsterdam jurisdiction (where the fixture does not forbid it) publishes normally. If the design has no dedicated wording yet, assert the generic not-accepted decision text plus the cited layer line and record an open question for the wording; do not invent copy.
2. Cumulative layers: a content item that violates only L1 (human rights layer) is refused in every jurisdiction, and one that is lawful under L1 to L5 but forbidden at L6 is refused only in the city; the decision shows the highest-precedence layer cited.
3. Legally blocked stuck: a published problem whose stage has two options where the chosen solution is illegal under L4 (national law, fixture corpus) has that stage `blocked` (ST07, via the choice gate and DP-LEGALITY, 09-u59) and the stage map (WF-STAGEMAP-1) shows the cited constraint, with a parallel branch still running when the plan has one; when every remaining required stage is blocked the problem goes to stuck (T13); WF-DETAIL-3 shows the blocker, the layer and provision, the corpus version, blocked actions, the recheck condition and the next lawful escalation route, with the problem still open and no red styling; a layer interpretation conflict (two layers disagree) shows a hold, never a publish.
4. Both viewports; axe on the refusal and stuck screens; no model provider call.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Refusal versus stuck are distinct in the UI and both cite layer and provision (assertions on text).
- A forbidden topic is absent from the public list in that jurisdiction and logged with its legal basis (checked through the lane audit read of 09-u38 or the run record API, whichever exists).
- A layer conflict never publishes.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Policy change and reopen (07-u21).
- Real legal content (reviewed legal corpora are founder and lawyer gated, 10-u22 and plan 10 legal units).
