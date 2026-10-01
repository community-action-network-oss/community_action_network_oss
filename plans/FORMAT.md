# Plan corpus format

The corpus is plain markdown with a small frontmatter subset. `node plans/tools/corpus.mjs` (Node 24+, stdlib only) lints it and selects each night's work. Selection is a script, not model reasoning.

## Layout

```
plans/00-ROOT.md          index: mission, plan list, mermaid DAG (corpus.mjs graph), merge order, how to run a night
plans/NN-slug/PLAN.md     one plan
plans/NN-slug/uMM-slug.md one unit (<= 1.5 agent-hours)
plans/runs/YYYY-MM-DD.md  night reports
plans/tools/              corpus.mjs and tests
```

Open questions go to `docs/open-questions/`, never into per-plan files. Lanes are repos. Unit status is written ONLY by the orchestrator (use `corpus.mjs set`); unit agents return commit SHAs.

## Frontmatter subset

A block between two `---` lines at the top of the file. Each line is `key: value`. Values are: bare or quoted strings, `true`/`false`, numbers, `null`, or inline JSON arrays (`["a", "b"]`, one line). No nesting, no multi-line values. `#` lines are comments.

## PLAN.md

| field | type | notes |
|---|---|---|
| id | string | `"02"`; must equal the folder's `NN` prefix |
| title | string | |
| approved | bool | units are only eligible when their plan is `true` |
| status | todo/doing/done | |
| depends_on_plans | [plan ids] | informational only (ordering and the graph); `next` never enforces it. No dangling ids, no cycles. `lint` warns (not an error) when no unit of the plan depends on a unit of the named plan |
| spec | [paths] | must exist |

Body: goal, acceptance, unit table, risks.

Unit-level `depends_on` is the only enforced dependency constraint. Keep `depends_on_plans` in sync by giving each plan dependency at least one cross-plan unit edge.

## Unit

| field | type | notes |
|---|---|---|
| id | string | `"02-u03"`, unique corpus-wide |
| plan | string | must equal the folder's PLAN.md id |
| title | string | |
| repo | enum | `.`, `can_server`, `can_app`, `can_gallery`, `can_policy`; this is the lane. Paths in `writes` and `verify` are relative to it, and `verify` runs with it as cwd |
| area | enum | can-spec, can-root, can-server, can-app, can-gallery, can-policy |
| model | enum | sonnet (default), haiku |
| est_hours | number | > 0 and <= 1.5 |
| priority | int | lower runs first |
| depends_on | [unit ids] | no cycles; no dangling ids |
| writes | [globs] | relative to repo; absolute paths and `..` rejected |
| reads | [globs] | optional |
| spec | [paths] | superproject-root-relative, must exist; `#anchor` allowed and ignored by existence check |
| needs | subset of docker, db, mail | optional; skipped when the preflight shows it unavailable |
| verify | [commands] | |
| founder_gate | bool | true units are never selected |
| defaults | string | reversible default to apply if blocked (optional) |
| status | enum | todo, doing, done, blocked, skipped |
| attempts | int | optional, default 0 |
| blocked_reason | string | optional |
| commits | [sha strings] | optional |
| actual_hours | number or null | optional, logged for calibration |

Required: id, plan, title, repo, area, est_hours, priority, depends_on, writes, spec, verify, founder_gate, status.

Body sections, in order: `## Objective`, `## Steps`, `## Acceptance`, `## Out of scope`.

UI units (`area: can-app`) must cite at least one wireframe id matching `/WF-[A-Z-]+-\d+/` in `spec` or the body, and must embed the acceptance in `docs/design/ux/ui-unit-template.md` by reference.

## Selection rules (`next`)

Eligible: status `todo`, plan `approved: true`, `founder_gate: false`, and every dependency `done`, or picked earlier tonight in the same lane. Cross-lane dependencies must already be `done`. Per lane, in priority then id order, units are taken while the running sum of `est_hours` stays within `hours * 0.8` (the rest is reserved for close-out). A unit that does not fit is skipped and later smaller ones may still be taken. Skipped units are reported with the reason (gate, unapproved, deps, budget).

## CLI

```
node plans/tools/corpus.mjs lint  [--root DIR]
node plans/tools/corpus.mjs next  --hours 6 [--root DIR] [--json]
node plans/tools/corpus.mjs graph [--root DIR]
node plans/tools/corpus.mjs set <unit-id> key=value ... [--root DIR]   # status, attempts, commits, actual_hours, blocked_reason
node plans/tools/test/run.mjs
```

`--root` is the superproject root (default: two levels above the tool).
