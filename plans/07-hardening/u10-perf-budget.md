---
id: "07-u10"
plan: "07"
title: "Web bundle performance budget and native bundle check"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 124
depends_on: ["05-u08", "12-u24"]
writes: ["scripts/bundle-budget.mjs","scripts/check-native-bundle.mjs","perf-budget.json","package.json","__tests__/bundle-budget*.test.ts"]
reads: ["dist/**"]
spec: ["docs/spec/16-security-a11y-ops-testing.md","docs/design/system-design.md#10-web-first-verification","docs/spec/01-slice-1-brief.md#1-what-slice-1-is","docs/design/ux/wireframes/browse.md#WF-LIST-1","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npm run budget"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Keep the web app light and keep native bundling honest: a recorded size budget enforced after the web export, and a script that proves iOS and Android JS bundles still export.

## Steps
1. scripts/bundle-budget.mjs (node stdlib): after expo export, find the JS files under dist/ (including _expo/static/js/web/*.js), compute raw and gzip sizes with node:zlib, compare against perf-budget.json {entryGzipKb, totalGzipKb, perRouteGzipKb?}. Initial budget: measure the current build and set each value to measured size plus 15 percent, committed with the measured numbers in a comment field; fails with a table of offenders.
2. package.json: script "budget": "node scripts/bundle-budget.mjs" and append it to the verify script after the web export step so verify enforces it; "check:native": runs npx expo export --platform ios and --platform android into temp directories via scripts/check-native-bundle.mjs (JS bundles only, no simulators; D-8), removing the temp dirs afterwards. check:native is not part of verify (slow), it is part of the root verify-all.
3. Add a unit test for the budget comparer with fixture sizes (over, under, missing file).
4. List the five largest dependencies in the output (from the export source map or bundle analysis if available; otherwise skip with a message) so growth is traceable.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- npm run verify fails if the entry bundle exceeds the budget (test with a lowered budget in the unit test).
- check:native exports both platform bundles and cleans up temp files.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Runtime performance profiling.
- CDN or caching strategy (hosting).
