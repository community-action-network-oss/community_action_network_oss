---
id: "07-u09"
plan: "07"
title: "Accessibility pass against the UI unit template"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 123
depends_on: ["07-u07", "07-u21", "07-u22", "02-u24", "02-u25", "09-u53", "09-u55", "12-u24"]
writes: ["e2e/a11y/**","src/**","app/**","e2e/helpers/**"]
reads: ["e2e/**"]
spec: ["docs/design/ux/ui-unit-template.md#3-accessibility", "docs/design/ux/ui-unit-template.md#4-layout-and-rtl", "docs/spec/01-slice-1-brief.md#11-accessibility-and-rtl-baseline-from-day-one", "docs/spec/16-security-a11y-ops-testing.md", "docs/design/ux/copy-deck.md", "docs/design/ux/wireframes/browse.md#WF-LIST-1", "docs/design/ux/wireframes/forms.md#WF-FORM-1", "docs/design/ux/wireframes/moderation.md#WF-AUDIT-1", "docs/design/ux/wireframes/moderation.md#WF-LANE-1", "docs/design/ux/wireframes/browse.md#WF-DETAIL-3", "docs/design/ux/ui-unit-template.md"]
needs: ["docker","db","mail"]
verify: ["npm run verify","npm run e2e -- e2e/a11y"]
founder_gate: false
defaults: "Findings too large for the unit become OQ files and the specific spec step is marked test.fixme with the OQ id in the reason."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
One systematic sweep of every route against the template accessibility and layout sections, automated where possible, with the fixes it finds. This is the evidence for the slice-1 accessibility baseline.

## Steps
1. e2e/a11y/routes.ts lists every route (public, member, the preparation workspace, criteria and plan editors (WF-PREP-1 to WF-PREP-3), the volunteer review queue, review and resolution screens (WF-VREVIEW-1 to WF-VREVIEW-3), the stage map in graph and list view (WF-STAGEMAP-1), the stage workspace, result and contribute-ahead screens (WF-STAGE-1 to WF-STAGE-3), the plan change form, the guest badge sheet, the Impacted only filter and the location permission prompt (WF-GUEST-1, WF-FILTER-1, WF-LOCPERM-1), auditor and labeler review routes, lane console, maintainer policy and simulation routes, steward invite route; there is no per-item moderator route) with the fixture state needed. Spec a: axe-core (wcag2a, wcag2aa, wcag21aa tags) on each route at 360 and 1280, light and dark scheme (emulate prefers-color-scheme), zero serious or critical violations.
2. Spec b: 200 percent text: set the root font size to 200 percent (and a browser-zoom variant via page.evaluate document.documentElement.style.zoom = 2 at 1280 width) and assert no horizontal scrollbar at 360 px and that no element with text is clipped (check scrollWidth versus clientWidth on text containers).
3. Spec c: keyboard only: tab through the main journeys (sign in, the problem form first section, review list to label task, the stage plan editor dependency checkboxes and the graph node traversal, the recommendation form) asserting focus order matches reading order, a visible focus ring (computed outline width 2 px), skip link first, Escape closes the session sheet and returns focus, no keyboard trap.
4. Spec d: reduced motion (emulate reducedMotion reduce): no animation longer than 200 ms (check computed transition and animation durations). Spec g: the schema renderer: every field type in the widget registry, hints beside fields, the assumption prompt and the unsupported-field placeholder pass axe, keyboard and 200 percent text. Spec e: RTL check with dir="rtl" set on the document for three screens: no overlapping text, directional icons mirrored (assert the transform or logical class) and no physical left or right style keys (the repo lint already enforces).
5. Spec f: touch target audit: every interactive element has a bounding box of at least 44 by 44 at 360 px.
6. Fix findings in src/ and app/ in the same unit when small; for larger gaps write docs/open-questions entries (one file each with a default) and list them in the commit message. Do not disable rules to pass.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- All specs pass at both viewports.
- Findings fixed or recorded as open questions, never suppressed.
- The template checklist items 3 and 4 are each evidenced by a named test.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Native screen reader testing (founder-gated, OQ-native-device-testing).
