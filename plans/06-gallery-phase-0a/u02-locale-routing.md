---
id: "06-u02"
plan: "06"
title: "Locale-ready routing structure (English only)"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1
priority: 20
depends_on: ["06-u01"]
writes: ["src/lib/locale.ts","src/lib/paths.ts","src/content/site.ts","src/components/**","src/app/layout.tsx","src/app/**/page.tsx","docs/i18n.md","scripts/check-locale.mjs","package.json"]
spec: ["docs/spec/18-phases-gates.md","docs/spec/16-security-a11y-ops-testing.md","docs/open-questions/OQ-unsupported-language.md"]
verify: ["npm run check:locale","npm run verify"]
founder_gate: false
defaults: "Keep English at unprefixed root paths. Do not add a /en prefix and do not enable any second locale."
status: "todo"
attempts: 0
commits: []
actual_hours: null
---

## Objective

Make adding a language later a content task, not a refactor, while shipping English only. Phase 0A promises locale-prefixed routes later.

## Steps

1. Create src/lib/locale.ts: LOCALES = ["en"], DEFAULT_LOCALE = "en", a direction map (ltr/rtl) and `htmlAttrs(locale)` returning lang and dir. Use it in the root layout.
2. Create src/lib/paths.ts: `localePath(path, locale = DEFAULT_LOCALE)` returns the path unprefixed for the default locale and `/{locale}{path}` otherwise. All internal links and nav items go through it (find and replace literal internal hrefs in components and pages).
3. Create src/content/site.ts as the single place for external links and site constants: `REPO_URL = null` (rendered as "Repository link coming once the remote exists") and the other documented repository paths. No invented URL.
4. Write docs/i18n.md: how a locale is added (move pages under src/app/[locale], add generateStaticParams from LOCALES, copy src/content/en to src/content/<locale>, translator rules from OQ-unsupported-language, RTL check, hreflang), and what is deliberately not done yet.
5. Write scripts/check-locale.mjs: fail if any source file under src contains an internal `href="/` literal outside paths.ts, or if the layout hard-codes lang. Add `check:locale` to package.json and `verify`.

## Acceptance

- Output of `npm run build` is byte-equivalent in routes to before (same routes, same paths).
- Internal links all go through localePath; check:locale passes.
- docs/i18n.md describes the exact steps for adding a second locale.

## Out of scope

- Translating any text.
- Adding a language switcher.
- Moving pages under [locale] (documented only).
