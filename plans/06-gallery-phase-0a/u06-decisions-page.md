---
id: "06-u06"
plan: "06"
title: "How decisions are made: DECISIONS.md summary and ADR index page"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 60
depends_on: ["06-u02"]
writes: ["scripts/sync-decisions.mjs","scripts/check-decisions.mjs","src/content/decisions.json","src/app/how-decisions-are-made/**","src/components/**","package.json"]
spec: ["docs/spec/21-open-source-governance.md","docs/spec/22-ai-contribution-policy.md","DECISIONS.md","docs/adr/README.md","docs/open-questions/README.md"]
verify: ["npm run sync:decisions","npm run check:decisions","npm run verify"]
founder_gate: false
defaults: "Show only each decision headline, never the Why or Reverse text, and do not show raw log wording that reads as internal chatter."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Explain how decisions are made and show the public record: the decision taxonomy from the governance spec, the open-questions flow, the AI-assisted contribution rules, a summary list of logged decisions and the ADR index.

## Steps

1. Write scripts/sync-decisions.mjs: parse ../DECISIONS.md for bold headlines of the form `D-<n> · wave · text`, and ../docs/adr/README.md for the ADR table. Write src/content/decisions.json (id, headline, adr links, repo path) deterministically. Skip with a message if the sources are absent.
2. Build /how-decisions-are-made: (1) the decision table from docs/spec/21-open-source-governance.md in plain words, (2) how an open question becomes a decision (proposal, discussion, founder or governance decision, logged), (3) the transitional founder role, stated factually, (4) how AI-assisted contributions are handled and how work is reviewed (docs/spec/22), (5) the headline list and ADR index linking to repository paths through src/content/site.ts.
3. Check each headline for private detail or internal tone; rewrite is not allowed (it is a log), so exclude such an entry by id in an `EXCLUDE` list in the script with a comment, and mention exclusions in the commit message.
4. Write scripts/check-decisions.mjs (stale check as in the catalog) and wire sync:decisions and check:decisions into package.json and verify.
5. Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.
6. Entries and headlines keep any existing "·" separator out of rendered text; show "D-12" then the sentence.

## Acceptance

- Page renders the taxonomy, flow, AI handling, headline list and ADR index.
- Decisions JSON regenerates with no diff.
- No Why or Reverse text is published; verify passes.

## Out of scope

- Publishing DECISIONS.md in full.
- Voting or comment features.
- Changing any decision.
