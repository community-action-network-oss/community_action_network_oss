---
id: "06-u08"
plan: "06"
title: "Accessibility audit and fixes (axe via Playwright on the static export)"
repo: "can_promo_site"
area: "can-promo-site"
model: sonnet
est_hours: 1.5
priority: 80
depends_on: ["06-u01","06-u03","06-u05","06-u06","06-u07"]
writes: ["scripts/serve-out.mjs","scripts/a11y.mjs","docs/a11y-report.md","playwright.config.*","package.json","package-lock.json","src/app/**","src/components/**","src/content/**"]
spec: ["docs/spec/16-security-a11y-ops-testing.md","docs/spec/17-ux.md","docs/spec/18-phases-gates.md","docs/spec/01-slice-1-brief.md"]
verify: ["npm run build","npm run a11y","npm run verify"]
founder_gate: false
defaults: "If the Playwright Chromium download is unavailable, commit the scripts and report, set status blocked with the reason, and do not weaken the checks."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Prove the site meets the accessibility baseline offline: run axe-core against every route of the static export and fix what it finds, then add keyboard, zoom and reduced-motion checks.

## Steps

1. Add dev dependencies @playwright/test and @axe-core/playwright (dev only; nothing ships). Install the Chromium browser locally.
2. Write scripts/serve-out.mjs: a tiny static server for `out/` on a free port using node:http (handle trailing slashes and 404.html).
3. Write scripts/a11y.mjs: discover routes from the files in out/, then per route run axe with tags wcag2a, wcag2aa, wcag21aa, wcag22aa and fail on any violation. Also check: one h1, a skip link that works, visible focus on every interactive element when tabbing, no horizontal scroll at 320 px width and at 200 percent zoom, `prefers-reduced-motion` honoured, `lang` set, color contrast pass in both color schemes if the site has dark mode, link text unique enough.
4. Fix every finding in src (semantic HTML first, ARIA last). Record the run, remaining manual checks (screen reader pass on two routes) and results in docs/a11y-report.md.
5. Add `a11y` to package.json and call it from `verify` only if it runs in under two minutes; otherwise keep it as a separate required step documented in the report.

## Acceptance

- Zero axe violations on every route in light and dark schemes.
- docs/a11y-report.md lists routes, rules, fixes and open manual checks.
- `npm run a11y` is repeatable offline; verify passes.

## Out of scope

- Native or third-party audit services.
- Visual redesign.
- Full WCAG conformance statement (needs a human screen reader pass).
