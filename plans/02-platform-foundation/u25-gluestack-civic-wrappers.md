---
id: "02-u25"
plan: "02"
title: "Adopt gluestack-ui: re-implement civic wrappers on gluestack primitives"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 20
depends_on: ["02-u24"]
writes: ["src/components/civic/**","src/theme/**","__tests__/**","docs/gluestack.md","package.json","package-lock.json"]
reads: ["src/**","app/**"]
spec: ["docs/design/ux/tokens.json","docs/design/ux/ui-unit-template.md","docs/design/ux/visual-direction.md","docs/design/ux/wireframes/browse.md#WF-LIST-1","docs/adr/0007-gluestack-design-system.md","docs/spec/11-architecture.md"]
needs: []
verify: ["npm run verify"]
founder_gate: false
defaults: "If a wrapper cannot be expressed on a gluestack primitive without changing its public props, keep the props and wrap a gluestack primitive anyway; never import react-native View or Text styling shortcuts as a fallback for that component without a comment naming why."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Re-implement every civic wrapper in `src/components/civic/**` on the gluestack primitives installed by 02-u24, with public props unchanged, so feature code and tests do not change.

## Steps
1. List the civic components and their exported props (snapshot the prop types in the commit message). Do not rename, add required, or remove any public prop.
2. Rebuild each on the matching generated primitive from `src/components/ui/**` (button, input, text, box, pressable, and so on). Styling comes from the generated token theme, never hard-coded values.
3. Preserve accessibility props and roles exactly: `accessibilityLabel` required on CivicButton, role, state, hint, 44 point minimum target, visible focus, error association on fields.
4. Keep the `no-restricted-imports` rule: feature code imports only from `src/components/civic`; only civic may import `src/components/ui`.
5. Run the full suite; fix wrappers, not tests. If a test must change, stop and record why in the commit message (acceptance says none do).
6. Re-check WF-LIST-1 (home and list screen) on Expo web in light and dark. Report web bundle size after in `docs/gluestack.md` next to the figures from 02-u24.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-LIST-1.
- Home screen and all civic wrapper tests pass unchanged (no test edits).
- Public props of every civic component are identical to before.
- `check:logical` passes; dark mode tokens work.
- `npm run verify` is green on web; bundle size reported before and after.

## Out of scope
- New civic components, screen redesign, native device testing.
