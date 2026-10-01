---
id: "02-u21"
plan: "02"
title: "Playwright web smoke harness"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 40
depends_on: ["02-u20","02-u18","02-u12"]
writes: ["e2e/**","playwright.config.ts","package.json","package-lock.json","scripts/e2e-*.mjs",".gitignore"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/system-design.md#9-test-strategy","docs/design/system-design.md#10-web-first-verification","docs/design/ux/copy-deck.md","docs/design/ux/wireframes/browse.md#WF-LIST-1","docs/design/ux/wireframes/auth.md#WF-SIGNIN-2","docs/design/ux/ui-unit-template.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npm run e2e"]
founder_gate: false
defaults: "If Chromium cannot be downloaded in the environment, commit the harness with the smoke spec and mark the unit blocked with that reason."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Add the Playwright web harness against the real server, Mailpit and seed data, with a smoke spec and helpers later journey units reuse (sign in through Mailpit, axe scan, viewport presets).

## Steps
1. Add devDependencies @playwright/test and @axe-core/playwright. Scripts: "e2e": "playwright test", "e2e:install": "playwright install chromium". playwright.config.ts: baseURL http://localhost:8081, two projects (viewport 360x800 and 1280x800), retries 1, trace on first retry, and webServer entries that start the Expo web server (npx expo start --web --port 8081) only when not already up (reuseExistingServer true). The API server is expected on :4000 (scripts/e2e-prepare.mjs checks http://localhost:4000/v1/health and Mailpit :8025, fails with a clear message otherwise, and runs the server seed command with a documented env var CAN_SERVER_DIR default ../can_server).
2. e2e/helpers/mailpit.ts (HTTP to :8025), e2e/helpers/auth.ts: signInAs(page, email) driving WF-SIGNIN-1/2 and reading the code from Mailpit, signUpWithInvite(page, invite, email), and e2e/helpers/axe.ts: expectNoSeriousAxeViolations(page).
3. e2e/smoke.spec.ts: the list shows the fixture problems (seed with --fixture, 02-u12; later journeys use the pipeline-loaded seeds from 11-u18); opening one shows its status label; a seeded member signs in via Mailpit and My activity becomes reachable (there is no per-item moderator area); axe has no serious or critical issues on list and detail at both viewports.
4. Exclude e2e/ from jest (jest.config.js testPathIgnorePatterns) and from tsc/lint only if necessary; keep npm run verify green. Add playwright-report and test-results to .gitignore.
5. Document in the commit message that browsers install with npm run e2e:install and are not part of npm run verify.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- npm run e2e passes against compose + seed at both viewports.
- npm run verify does not require browsers and stays green.
- Helpers are reusable: plan 07 journeys import them without edits.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Full journeys (plan 07).
- Native device testing (founder-gated).
