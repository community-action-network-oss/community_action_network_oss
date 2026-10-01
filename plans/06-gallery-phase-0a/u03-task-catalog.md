---
id: "06-u03"
plan: "06"
title: "One-hour contribution catalog page generated from plan units"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1.5
priority: 30
depends_on: ["06-u02","08-u01","06-u15","16-u10"]
writes: ["scripts/sync-catalog.mjs","scripts/check-catalog.mjs","src/content/catalog.json","src/app/contribute/tasks/**","src/components/**","src/app/globals.css","package.json"]
spec: ["docs/spec/20-participation-nonmonetary.md","docs/spec/21-open-source-governance.md","docs/spec/01-slice-1-brief.md","plans/FORMAT.md"]
verify: ["npm run sync:catalog","npm run check:catalog","npm run verify"]
founder_gate: false
defaults: "If 08-u01 tags are absent on units, group by area and est_hours only."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Give every call to contribute a maintained target: a page at /contribute/tasks listing the bounded units in plans/, generated, never hand-edited. This delivers the Phase 0A rule that every call to contribute maps to a task, owner, review process and expected outcome.

## Steps

1. Read plans/FORMAT.md, and the output of `node ../plans/tools/corpus.mjs catalog --json` (added by 08-u01). Read the existing open-questions sync script if present and follow its conventions.
2. Write scripts/sync-catalog.mjs: run the catalog command against `..`, keep only founder_gate false units whose status is todo or doing, and write a trimmed, deterministic src/content/catalog.json (id, title, repo, area, est_hours, tags, needs, spec links, objective sentence, acceptance bullets, unit file path). No timestamps. If `..` has no plans folder, print a message and exit 0.
3. Build /contribute/tasks as a static page: unit cards grouped by area, anchors per area (`#can-server`), no client JS. Each card shows what it is, estimated effort ("about N hours of focused work; yours may differ"), required context (spec links), the repo, how to claim it (open an issue citing the unit id), review process (maintainer review, AI disclosure in the pull request, per docs/spec/22-ai-contribution-policy.md) and expected outcome (the acceptance bullets). Link the unit file via src/content/site.ts so links appear only when REPO_URL is set; otherwise show the repo path as text.
4. State the one-hour idea carefully: small steps count, and one hour does not solve a complex problem (docs/spec/20-participation-nonmonetary.md).
5. Write scripts/check-catalog.mjs (fail when sources exist and catalog.json is stale, or when a card lacks owner text, review text or acceptance) and add sync:catalog, check:catalog to package.json and verify.
6. Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.

## Acceptance

- /contribute/tasks renders every eligible unit and nothing hand-written about specific units.
- Re-running sync:catalog produces no diff.
- check:catalog passes; verify passes.

## Out of scope

- Role pages (06-u04, 06-u05).
- Per-user claiming, accounts or forms.
- Editing plan units.
