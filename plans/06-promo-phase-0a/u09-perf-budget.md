---
id: "06-u09"
plan: "06"
title: "Performance budget and offline Lighthouse-style checks"
repo: "can_promo_site"
area: "can-promo-site"
model: sonnet
est_hours: 1.5
priority: 90
depends_on: ["06-u08"]
writes: ["docs/performance-budget.md","scripts/check-budget.mjs","scripts/perf.mjs","package.json","src/app/**","src/components/**","public/**"]
spec: ["docs/spec/16-security-a11y-ops-testing.md","docs/spec/18-phases-gates.md","docs/adr/0003-nextjs-static-promo-site.md"]
verify: ["npm run build","npm run check:budget","npm run perf","npm run verify"]
founder_gate: false
defaults: "If a budget number fails on the first run, fix the page first; only relax a budget by editing docs/performance-budget.md with a written reason."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Make fast and non-tracking enforceable. Define a budget, check the built output against it, and measure loading offline with throttling, with no hosted measurement service.

## Steps

1. Write docs/performance-budget.md with numbers and why: HTML per page at most 30 KB, total JavaScript per page at most 100 KB gzipped, CSS at most 30 KB gzipped, each image at most 100 KB, no web fonts (system fonts), zero third-party origins, LCP at most 2.5 s and CLS at most 0.1 under a slow 4G profile, no console errors.
2. Write scripts/check-budget.mjs over `out/`: sizes (gzip via node:zlib), every external URL in HTML and CSS must be on a short allow list (documented in the budget file), no script tags with a remote src, `img` has width, height and alt, no cookies or storage writes in JS strings.
3. Write scripts/perf.mjs: serve out/ with scripts/serve-out.mjs, drive Chromium via Playwright with CDP network and CPU throttling, record LCP, CLS and total bytes via PerformanceObserver per route, fail on budget breach, print a table. This is the Lighthouse-style check; the lighthouse package is optional and not required.
4. Fix breaches (remove unused CSS and JS, size images). Add check:budget and perf to package.json; add check:budget to verify.

## Acceptance

- Budget file exists with reasons; both scripts pass on every route.
- No third-party request appears in the Playwright request log.
- verify passes.

## Out of scope

- CDN or caching headers (06-u13).
- Analytics or real-user monitoring (forbidden in Phase 0A).
