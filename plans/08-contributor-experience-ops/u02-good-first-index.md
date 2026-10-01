---
id: "08-u02"
plan: "08"
title: "Good-first-units index generated from plans"
repo: "."
area: "can-root"
model: sonnet
est_hours: 1
priority: 20
depends_on: ["08-u01"]
writes: ["scripts/sync-good-first.mjs","docs/contributing/good-first-units.md","docs/contributing/README.md"]
spec: ["docs/spec/21-open-source-governance.md","docs/spec/20-participation-nonmonetary.md","plans/FORMAT.md"]
verify: ["node scripts/sync-good-first.mjs","node scripts/sync-good-first.mjs --check"]
founder_gate: false
defaults: "Default heuristic: status todo, founder_gate false, no needs, est_hours at most 1, and not tagged needs-context; the tag good-first forces inclusion."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

A newcomer should see ten or fewer units they can finish in about an hour without a database or a deep spec read, kept current by a script.

## Steps

1. Write scripts/sync-good-first.mjs: call `node plans/tools/corpus.mjs catalog --json`, apply the heuristic and tag overrides, and write docs/contributing/good-first-units.md as a table (id, title, repo, area, hours, context links, how to claim). Deterministic, no dates. Cap at 25 KB.
2. Add `--check`: exit 1 with a diff hint when the committed file is stale.
3. Write docs/contributing/README.md: how units are chosen for this list, how to claim one (open an issue citing the unit id, one person per unit at a time), what review to expect, that status is maintained by maintainers only, and the AI disclosure rule (docs/spec/22).
4. Regenerate and commit the index. If fewer than three units qualify, say so on the page and link open questions as the other way in.
5. Heuristic additions (W13): never list units whose `repo` is `.` and whose id is in the zk spike set (they need toolchains and devices) unless they are not founder-gated; the data-only units that contribute synthetic archive eval records or queries (13-u18) and the second synthetic jurisdiction (10-u67) are good first for domain experts and non-programmers who can read law: tag them in the overrides file.

## Acceptance

- The index regenerates with no diff; --check passes.
- Every row links to an existing unit file.
- The README explains the heuristic and the tag overrides.

## Out of scope

- Editing unit frontmatter to add tags.
- Assigning units to people.
- A web UI.
