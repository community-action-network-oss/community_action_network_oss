---
id: "06-u07"
plan: "06"
title: "What is new page fed from the superproject git log"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1
priority: 70
depends_on: ["06-u02","06-u15","06-u16"]
writes: ["scripts/sync-changelog.mjs","scripts/check-changelog.mjs","src/content/changelog.json","src/app/whats-new/**","package.json"]
spec: ["docs/spec/21-open-source-governance.md","docs/spec/20-participation-nonmonetary.md"]
verify: ["npm run sync:changelog","npm run check:changelog","npm run verify"]
founder_gate: false
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Show visitors that work is moving, honestly, using commit subjects from the superproject history. Output is committed so builds are offline and reproducible.

## Steps

1. Write scripts/sync-changelog.mjs: run `git -C .. log --no-merges --format=%h%x09%as%x09%s -n 300`. Keep only short sha, date, subject. Never emit author names or emails. Replace any em or en dash in a subject with a comma. Group by ISO week. Write src/content/changelog.json sorted newest first, plus the head sha it was built from. If `..` is not a git repository, keep the committed file and exit 0.
2. Build /whats-new: weekly groups, each entry with date and subject, a note that entries are development activity and not product releases, and the monthly release-status idea from docs/spec/21-open-source-governance.md as "planned".
3. Write scripts/check-changelog.mjs: JSON shape, no dashes, no emails, and when the superproject exists, that the recorded head sha is an ancestor of HEAD (stale is allowed, a rewritten history is not).
4. Wire sync:changelog and check:changelog into package.json and verify.
5. Copy rules: no em dashes or en dashes in any user-facing text; label every example as fictional; nothing may imply the platform is live or handling real problems; no emergency, legal, medical or government service claims.

## Acceptance

- /whats-new lists real commit subjects grouped by week with no author data.
- check:changelog passes after a fresh sync; verify passes.

## Out of scope

- Release notes (plan 08 owns release policy).
- Per-submodule logs.
- Any build-time network access.
