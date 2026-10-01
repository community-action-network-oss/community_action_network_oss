---
id: "08-u01"
plan: "08"
title: "corpus.mjs catalog command and optional tags field"
repo: "."
area: "can-root"
model: sonnet
est_hours: 1.5
priority: 10
depends_on: []
writes: ["plans/tools/**","plans/FORMAT.md"]
spec: ["plans/FORMAT.md","docs/spec/21-open-source-governance.md","DECISIONS.md"]
verify: ["node plans/tools/test/run.mjs","node plans/tools/corpus.mjs lint","node plans/tools/corpus.mjs catalog --json > /dev/null"]
founder_gate: false
defaults: "Output only fields already in the frontmatter plus tags; do not add a database or cache."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Give gallery and contributor tooling one stable machine-readable view of the corpus, so they never parse unit files themselves.

## Steps

1. Read plans/tools/corpus.mjs and the tests. Add an optional unit field `tags` (inline JSON array of lowercase kebab strings) to the lint rules and to plans/FORMAT.md. Unknown tags are allowed; malformed ones are lint errors.
2. Add `corpus.mjs catalog [--json|--markdown] [--root DIR] [--include-gated] [--status todo,doing] [--area X] [--tag T]`. Default JSON array, sorted by plan id then priority then unit id, no timestamps. Fields: id, plan, plan_title, title, repo, area, est_hours, priority, status, founder_gate, needs, tags, spec, depends_on, path (relative to the superproject), objective (first paragraph of Objective), acceptance (bullet list).
3. Founder-gated units are excluded unless --include-gated, so public views never list them by default.
4. Add tests under plans/tools/test (fixture with and without tags, gated exclusion, ordering stability, markdown output). Keep corpus.mjs stdlib only.
5. Document the command in plans/FORMAT.md CLI section.

## Acceptance

- Existing 18 tests and new tests pass; lint passes on the live corpus.
- Two runs on the same tree give byte-identical output.
- `catalog --json` includes tags when present and an empty array otherwise.

## Out of scope

- Changing selection rules for `next`.
- Tagging other plans units (owners do that).
- Network or git access in the tool.
