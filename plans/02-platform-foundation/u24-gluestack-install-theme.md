---
id: "02-u24"
plan: "02"
title: "Adopt gluestack-ui: install, pin and generate the theme from tokens"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1.5
priority: 19
depends_on: []
writes: ["package.json","package-lock.json","babel.config.js","metro.config.js","tailwind.config.js","global.css","uniwind*","nativewind*","gluestack-ui.config.json","app.json","jest.config.js","scripts/sync-tokens.mjs","scripts/check-logical.mjs","eslint.config.js","src/components/ui/**","src/theme/**","app/_layout.tsx","__tests__/gluestack-*.test.tsx","docs/gluestack.md"]
reads: ["src/**","app/**","scripts/**"]
spec: ["docs/design/ux/tokens.json","docs/design/ux/ui-unit-template.md","docs/design/ux/visual-direction.md","docs/design/ux/wireframes/browse.md#WF-LIST-1","docs/adr/0007-gluestack-design-system.md","docs/spec/11-architecture.md"]
needs: []
verify: ["npm run sync:tokens","npm run verify","npx jest --ci __tests__/gluestack-theme.test.tsx"]
founder_gate: false
defaults: "Version rule: use the newest gluestack-ui major that supports Expo SDK 57, React 19.2 and react-native-web 0.21 and is published as stable. If only an alpha or rc supports this stack, pin that exact version and record it in DECISIONS.md (the orchestrator writes it; report it). Never fall back to React Native core. Styling engine (NativeWind or UniWind) is whatever that gluestack version's docs require."
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make gluestack-ui the design-system foundation of can_app: install it through the official gluestack CLI at an exact pinned version, wire its styling engine, and generate its theme from tokens so the civic wrappers can be rebuilt on it (next unit). D-33 recorded an earlier fallback to React Native core; D-50 and ADR 0007 reverse that.

## Steps
1. Read the current gluestack-ui docs for the version rule in `defaults` (npm dist-tags and the installation guide for Expo). Record the chosen version and the engine in `docs/gluestack.md` (why, date, how to bump). Pin exact versions in package.json (no `^` or `~` on gluestack-ui, the styling engine or anything the CLI adds).
2. Install with the official CLI (`npx gluestack-ui@<chosen> init`). If it fails on a divergent `~/.gluestack` cache clone, use a throwaway HOME (known trap). Add only the components the civic wrappers need (button, input, text, box or view, pressable, checkbox, modal or sheet, select if needed); generated source goes to `src/components/ui/**` and is never hand-edited afterwards (single owner: the gluestack CLI).
3. Wire the styling engine exactly as the docs require for that version (babel, metro, css entry, provider in `app/_layout.tsx`). Keep `web.output: single`.
4. Extend `scripts/sync-tokens.mjs` so `npm run sync:tokens` also generates the gluestack theme config (colour, spacing, radii, type scale, light and dark) from `docs/design/ux/tokens.json`. The generated file carries a "generated, do not edit" header; tokens.json stays the single source and no colour outside it is introduced.
5. jest: widen `transformIgnorePatterns` in jest.config.js for every ESM or untranspiled package the install adds; add any required mocks (for example reanimated) in a jest setup file. Existing tests must pass unchanged.
6. ESLint: keep the `no-restricted-imports` rule (feature code imports UI only from `src/components/civic`); add `src/components/ui/**` to the prettier and lint ignore lists if generated code needs it, but civic stays linted.
7. Report web bundle size before and after (`expo export --platform web`, total JS bytes of `dist/_expo/static/js/web/*.js`, raw and gzip) in `docs/gluestack.md` and the commit message.
8. Write `__tests__/gluestack-theme.test.tsx`: the generated theme exposes every token colour in light and dark; the provider renders a generated component under jest.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message). First screen re-checked: WF-LIST-1 renders unchanged.
- gluestack-ui and its styling engine are pinned to exact versions; the choice and any pre-release status are written down in `docs/gluestack.md` and reported for DECISIONS.md.
- Theme is generated from tokens.json by `sync:tokens`; dark mode tokens resolve under `prefers-color-scheme` and under the app's dark setting.
- The home screen and all existing civic wrapper tests pass unchanged.
- Logical start/end lint (`check:logical`) passes, including on generated component source (or the generated folder is excluded with a written reason).
- `npm run verify` is green on web; `npx expo export --platform ios` and `android` still bundle.
- Web bundle size before and after is reported.

## Out of scope
- Re-implementing the civic wrappers (02-u25).
- Any screen change, native device testing, new components beyond those the wrappers need.
