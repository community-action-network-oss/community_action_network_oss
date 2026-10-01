---
name: can-app
description: Work on can_app, the universal Expo (web, iOS, Android) app of CAN. Use when editing screens, civic components, i18n, theme tokens, the generated API client, or running its verify pipeline.
---

# can_app

Weight: about 20 source files and 360 LOC in app/ + src/ (excl. tests and generated schema.d.ts) at W1. Small; read it all before editing. It is its own git repo (own history inside can_app/).

## Stack
Expo SDK 57, expo-router ~57 (`web.output: single`, scheme `can`), RN 0.86, React 19.2, react-native-web, TypeScript ~6.0 (not 7), TanStack Query, openapi-fetch, react-intl 12 (ESM only), zod + react-hook-form, jest-expo + @testing-library/react-native 14 (render and fireEvent are async: always `await`), ESLint 9 + eslint-config-expo + react-native-a11y, Prettier, Node >=24, npm. Verified on Expo web only: no simulators or devices.

## Commands (run from can_app/)
- `npx expo start --web --port 8081` needs can_server on :4000 (`EXPO_PUBLIC_API_URL` overrides).
- `npm run verify` is the single gate: tsc, expo lint, prettier --check, logical-properties check, jest, web export. Also check native bundling with `npx expo export --platform ios --output-dir <tmp>` (JS only).
- `npm run sync:tokens` copies `../docs/design/ux/tokens.json`. `npm run gen:api` regenerates `src/api/schema.d.ts` from `../can_server/openapi/openapi.json`.

## Invariants
- Feature code (app/, non-civic src/) imports UI only from `src/components/civic` (ESLint no-restricted-imports). TARGET: civic components are wrappers over gluestack-ui primitives (D-50, ADR 0007), adopted by units 02-u24 and 02-u25, generated source in `src/components/ui/`, theme generated from tokens. UNTIL those units land the current implementation is RN-core civic wrappers styled from tokens (D-33). Civic public props never change.
- Every UI string goes through `useT()` with an id from `src/i18n/en.json` (typed `MessageId`). ICU placeholders, no concatenation, no em or en dashes (a test enforces it). Copy source of truth: `docs/design/ux/copy-deck.md`.
- Logical properties only (start/end, never left/right): `scripts/check-logical.mjs` fails verify.
- `CivicButton` requires `accessibilityLabel`; touch targets at least `size.minTarget` (44).
- API access only via `src/api/client.ts` (typed openapi-fetch). The client binds `fetch` late so tests can mock `globalThis.fetch`. 503 from /health still carries a body: handled as data.
- Colours, spacing, type come from `src/theme` (tokens), never hard-coded.

## Single-owner paths
- `src/api/schema.d.ts`: generated only by `npm run gen:api`. Never hand-edit. Commit it with the contract change it follows.
- `src/components/ui/**`: reserved for the gluestack CLI (appears when 02-u24 lands). Never hand-edit.
- `src/theme/tokens.json`: synced from `docs/design/ux/tokens.json` by `npm run sync:tokens`. Never hand-edit; change the design source.

## Traps
- `package.json` `overrides` makes eslint-plugin-react-native-a11y accept ESLint 9 (it declares peer eslint <=8). Do not add a `.npmrc` with legacy-peer-deps; expo install may create one, delete it.
- ESLint 10 breaks eslint-config-expo peers: stay on ESLint 9. react-test-renderer must match React (19.2.3).
- TS 6 has `types: []` by default; tsconfig lists `"types": ["jest"]`.
- Do not install openapi-typescript locally (TS peer conflict); `gen:api` runs it via npx with a TS 5 helper.
- (Pre-adoption note) `npx gluestack-ui@5 init` failed on a divergent cache clone in ~/.gluestack; workaround is a throwaway HOME. It also pulls reanimated, worklets and react-aria.
- react-intl and @formatjs are ESM: jest.config.js widens transformIgnorePatterns for them.
- Web build is `output: single` (SPA): no per-route HTML, no SSR.
- `expo start` rewrites `tsconfig.json` (expands arrays, drops the `.expo/types` and `expo-env.d.ts` includes). The committed file is Expo's own output so the tree stays clean, and `tsconfig.json` is in `.prettierignore` because Expo's formatting conflicts with prettier. Edit it by hand only, then run `expo start` once and commit what Expo writes. tsc passes without those includes (no typed routes).
