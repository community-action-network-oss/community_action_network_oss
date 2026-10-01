---
id: "15-u10"
plan: "15"
title: "App label for contributions added by news watch (WF-NEWS-1)"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 509
depends_on: ["15-u05", "04-u08"]
writes: ["src/components/civic/**", "src/i18n/en.json", "__tests__/news-contribution*.test.tsx"]
reads: ["src/**"]
spec: ["docs/design/ux/wireframes/browse.md#WF-NEWS-1", "docs/design/ux/copy-deck.md", "docs/spec/25-news-watch.md#256-how-news-changes-a-problem-news-no-direct-1", "docs/design/ux/ui-unit-template.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
WF-NEWS-1: a contribution whose author is the `news_watch` system actor shows "Added by news watch" instead of a handle, the evidence target, the article title and publisher, the run's rationale, and links to open the article and to dispute.

## Steps
1. Read 04-u08's contribution card first; add a branch for `authorKind: "system"` with `systemActor: "news_watch"`. Do not fork the card.
2. Chip `news.contribution.label` in the same neutral style as `(Assisted)`; an info button opens `news.contribution.explain`.
3. "Open the article" uses the `source_ref` URL (external, new tab on web). Dispute uses the existing flow.
4. Every string goes through useT() ids in src/i18n/en.json; no em or en dashes (npm run lint:copy). Every required state of ui-unit-template section 1 has a test or a stated reason it does not apply.
5. Tests: a system contribution never renders a handle; the label, the source and the rationale show; a member contribution is unchanged.

## Acceptance
- Meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- `npm run verify` is green.

## Out of scope
- The partner badge (15-u09).
