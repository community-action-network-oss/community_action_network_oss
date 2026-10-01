---
id: "10-u25"
plan: "10"
title: "CI wiring: eval, replay on PRs, reports as artifacts, protected-core refusal"
repo: "can_policy"
area: can-policy
model: sonnet
est_hours: 0.8
priority: 25
depends_on: ["10-u23","10-u24","10-u13"]
writes: [".github/workflows/**","tools/protected-core-check.mjs","test/protected-core.test.mjs","ci/**","README.md"]
reads: []
spec: ["docs/design/ai/amendment-loop.md#1-proposal","docs/design/ai/policy-pack.md#ci-in-can_policy","docs/design/flows/policy-amendment.md"]
verify: ["npm run verify"]
founder_gate: false
defaults: "If the GitHub Actions context is unavailable locally, test the scripts directly and validate the workflow with `node -e` YAML parsing; do not add an Actions linter dependency."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make the PR gate real: on each PR run verify, eval (strict), replay diff against the base ref, upload both reports as artifacts and post the markdown summary, and refuse a PR that touches the protected core.

## Steps
1. `tools/protected-core-check.mjs --base <ref>`: diffs `packs/*/rules.yaml` and fails when any rule with `protected_core: true` changed text, tier, or was removed, printing "protected core: route to constitutional amendment (VIII.2)".
2. Update `.github/workflows/ci.yml`: jobs `verify`, `eval` (strict, `--diff-against origin/main`), `replay` (`--base origin/main --head .`), `protected-core`; upload `.tmp/eval.json`, `.tmp/replay.json`, `.tmp/replay.md` as artifacts; a comment step using `actions/github-script` posts `replay.md` when the event is a PR (guarded so forks without a token skip it).
3. PR template `.github/pull_request_template.md` with the ratification checklist of docs/design/ai/amendment-loop.md (7 items) as unchecked boxes; `CODEOWNERS` placeholder `* @community-action-network-oss/can-policy-maintainers`.
4. Tests for protected-core-check with temp git repos (changed text fails, new non-core rule passes).

## Acceptance
- A PR changing a protected rule fails the job (test of the script).
- Workflow YAML parses and names the four jobs.
- The PR template lists the seven checklist items.
- `npm run verify` green.

## Out of scope
- Branch protection settings (founder, after 10-u01).
- Ratification tooling (10-u26).
