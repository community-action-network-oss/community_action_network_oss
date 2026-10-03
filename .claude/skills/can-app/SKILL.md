---
name: can-app
description: Work on can_app, the universal Expo (web, iOS, Android) app of CAN. Use when editing screens, civic components, i18n, theme tokens, the generated API client, or running its verify pipeline.
---

# can_app

Weight: about 20 source files and 360 LOC in app/ + src/ (excl. tests and generated schema.d.ts) at W1. Small; read it all before editing. It is its own git repo (own history inside can_app/).

## Stack
Expo SDK 57, expo-router ~57 (`web.output: single`, scheme `can`), RN 0.86, React 19.2, react-native-web, TypeScript ~6.0 (not 7), TanStack Query, openapi-fetch, react-intl 12 (ESM only), zod + react-hook-form, gluestack-ui v5 on UniWind (Tailwind), jest-expo + @testing-library/react-native 14 (render and fireEvent are async: always `await`), ESLint 9 + eslint-config-expo + react-native-a11y, Prettier, Node >=24, npm. Verified on Expo web only: no simulators or devices.

## Commands (run from can_app/)
- `npx expo start --web --port 8081` needs can_server on :4000 (`EXPO_PUBLIC_API_URL` overrides).
- `npm run verify` is the single gate: tsc, expo lint, prettier --check, logical-properties check, jest, web export. Also check native bundling with `npx expo export --platform ios --output-dir <tmp>` (JS only).
- `npm run sync:tokens` copies `../docs/design/ux/tokens.json`. `npm run gen:api` regenerates `src/api/schema.d.ts` from `../can_server/openapi/openapi.json`.

## Invariants
- Feature code (app/, non-civic src/) imports UI only from `src/components/civic` (ESLint no-restricted-imports). Civic components wrap gluestack-ui primitives (D-50, ADR 0007); generated source is in `src/components/ui/`, the theme is generated from tokens. Civic public props never change.
- Every UI string goes through `useT()` with an id from `src/i18n/en.json` (typed `MessageId`). ICU placeholders, no concatenation, no em or en dashes (a test enforces it). Copy source of truth: `docs/design/ux/copy-deck.md`.
- Logical properties only (start/end, never left/right): `scripts/check-logical.mjs` fails verify.
- `CivicButton` requires `accessibilityLabel`; always pass `aria-label` (via `accessibilityLabel`/`label`) to `TextField`; touch targets at least `size.minTarget` (44).
- API access only via `src/api/client.ts` (typed openapi-fetch). The client binds `fetch` late so tests can mock `globalThis.fetch`. 503 from /health still carries a body: handled as data.
- Colours, spacing, type come from `src/theme` (tokens), never hard-coded.
- Server errors: `ApiError` drops extra fields (retryAfterSeconds, resetsAt, flags, limit, remaining); read them from the raw response (pattern in `src/contributions/api.ts`).
- Reply allowance (D-85): every form that posts a reply reads `GET /v1/me/problems/{id}/reply-allowance` first (`ReplyAllowance.tsx`, `reply.*` copy ids), disables Post at 0 with the reset time, keeps the draft, and handles 429 `reply_limit_reached`.
- Session roles = base role + `GET /v1/me/roles` (query key `['my-roles', handle]`) and the `'review-opt-in'` query; nav areas gate on steward/auditor/labeler/optIn.
- The capability profile (`src/profile`) and matcher (`src/match/match.ts`) never import `src/api`; the public fetch is profile-blind (`src/match/problems.ts`, PROFILE-LOCAL, D-80).

## SchemaForm (`src/forms/schema`)
- Props: `submitLabel`, `submitDisabled`, `readOnly` (keeps Back/Next, never submits), `choices` keyed by widget name (stage_ref, criterion_ref, ref).
- `serverSet()` fields (readOnly or `x-checks.server_set`) are hidden or read-only and removed from bodies by `stripServerSet`.
- Supported widgets are the `KNOWN` set in `model.ts` (incl. rule_id_list, slug_list, acknowledgement, number, evidence_url, stage_ref, criterion_ref, cost_estimate, legal_gate with read-only view in `LegalGate.tsx`); an unlisted widget falls back to the unknown-field path, so add new widgets to `KNOWN`.
- Route glue in `app/` names fields; modules in `src/preparation`, `src/features/policy` and option dirs do not (grep tests in `__tests__/*-no-field-names.test.js`). Tests that need fs/path must be `.js` (tsc has no Node types).

## Single-owner paths
- `src/api/schema.d.ts`: generated only by `npm run gen:api` (works offline). Never hand-edit. Run it after every server contract change and commit it with that change; it must not lag the server openapi.
- `src/components/ui/**`, `global.css`, `src/theme/gluestack.generated.ts`: generated (gluestack CLI / `npm run sync:tokens`). Never hand-edit.
- `src/theme/tokens.json`: synced from `docs/design/ux/tokens.json` by `npm run sync:tokens`. Never hand-edit; change the design source.

## Traps
- `package.json` `overrides` makes eslint-plugin-react-native-a11y accept ESLint 9 (it declares peer eslint <=8). Do not add a `.npmrc` with legacy-peer-deps; expo install may create one, delete it.
- ESLint 10 breaks eslint-config-expo peers: stay on ESLint 9. react-test-renderer must match React (19.2.3).
- TS 6 has `types: []` by default; tsconfig lists `"types": ["jest"]`.
- Do not install openapi-typescript locally (TS peer conflict); `gen:api` runs it via npx with a TS 5 helper.
- `metro.config.js` carries a web resolver override for UniWind's `InputAccessoryView` rewrite; without it the web build renders a blank page. Do not remove it; `scripts/check-metro-web.js` (in verify) guards it.
- Jest runs jest-expo (native env). Test `QueryClient`s set `retry: false, gcTime: Infinity`. Run jest with `< /dev/null` (stdin otherwise hangs it).
- e2e (`npm run e2e`, Playwright) needs can_server on :4000 and Mailpit on :8025 (checked by `e2e:prepare`); the web server runs `expo start --web --no-dev`. Not part of verify.
- RNTL 14: a second render after unmount in one test breaks later tests. Lint rules: `react-hooks/purity` forbids `Date.now()` in render, `react-hooks/set-state-in-effect` fails lint, and the logical-properties check flags `left:` object keys.
- Never import `next/link` (gallery only). Masked tokens `[KIND_n]` render as neutral chips and are never revealed (`MaskedText.tsx`).
- zsh: pass `[id]` route paths to git as quoted array elements.
- react-intl and @formatjs are ESM: jest.config.js widens transformIgnorePatterns for them.
- Web build is `output: single` (SPA): no per-route HTML, no SSR.
- `expo start` rewrites `tsconfig.json` (expands arrays, drops the `.expo/types` and `expo-env.d.ts` includes). The committed file is Expo's own output so the tree stays clean, and `tsconfig.json` is in `.prettierignore` because Expo's formatting conflicts with prettier. Edit it by hand only, then run `expo start` once and commit what Expo writes. tsc passes without those includes (no typed routes).
