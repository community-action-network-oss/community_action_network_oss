---
id: "02-u15"
plan: "02"
title: "Navigation shell, skip link and emergency notice"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 0.8
priority: 23
depends_on: ["02-u14","02-u24","02-u25"]
writes: ["app/**","src/components/civic/**","src/navigation/**","src/i18n/en.json","__tests__/nav-*.test.tsx"]
reads: ["src/**","app/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/design/ux/screens.md","docs/design/ux/screens.md#navigation","docs/design/ux/copy-deck.md","docs/design/ux/wireframes/browse.md#WF-LIST-1","docs/design/ux/ui-unit-template.md"]
needs: []
verify: ["npm run verify","npx jest --ci __tests__/nav-shell.test.tsx"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: done
attempts: 0
commits: ["fccd087"]
actual_hours: 0.1
---
## Objective
The persistent frame: a top bar on wide web and bottom tabs on narrow screens, with the four primary areas, a skip link, noindex meta, and the static emergency notice component that every form shows.

## Steps
1. Using expo-router layouts in app/: areas Discover (/), Report (/report), My activity (/me), Policy (/policy, public) and Review (/review, shown only for the auditor or labeler roles from 09-u02; the lane console /lane is reached only from a lane_member's My activity or direct link). No count badges on nav items. Create route stubs that render a Screen with a heading so links work, using index files so later units extend the same route files: app/report/index.tsx, app/me/index.tsx, app/policy/index.tsx, app/review/index.tsx, app/sign-in/index.tsx, plus app/sign-up.tsx and app/welcome.tsx. Never create app/me.tsx, app/review.tsx, app/policy.tsx or app/sign-in.tsx.
2. src/navigation/SessionContext.ts: a minimal context {status: "loading"|"guest"|"member", roles?: string[], handle?} with a guest default so this unit is independent of the server; the session provider unit replaces the default value.
3. Layout switches by width (useWindowDimensions, breakpoint 768): top bar with text links at 768 and up, bottom tab bar below; each target at least 44 by 44; current area uses aria-current on web and an accessibilityState selected on native, plus a text-visible indicator (underline), never colour alone.
4. Web: a visible-on-focus "Skip to main content" link as the first focusable element; set document title per route and <meta name="robots" content="noindex"> through expo-router Head; a landmark main region.
5. src/components/civic/EmergencyNotice.tsx: static text "If someone is in danger, contact your local emergency number." from an ICU id, role note, no network call (CRISIS-STATIC-1). Used later by every form and by the nav footer.
6. Tests: auditor and labeler see Review, a plain member and a guest do not; skip link is first in tab order (render order assertion); EmergencyNotice renders without any fetch (jest mock asserts zero calls); active item exposes selected state.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- Nav is usable by keyboard only on web.
- No colour-only active state and no count badges.
- EmergencyNotice works with the network down.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Real session data (session provider unit).
- Notification bell (plan 04).
