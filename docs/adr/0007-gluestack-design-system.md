# ADR 0007: gluestack-ui is the design system for all surfaces

- Status: Accepted, 2026-10-01 (D-50; supersedes the fallback in D-33 and the plain CSS choice in D-9)

## Context
D-7 chose gluestack v5 for `can_app`, with a fallback to civic wrappers over React Native core. D-33 took the fallback because `gluestack-ui@5 init` reported "v5 alpha" and pulled reanimated, react-aria and svg. D-9 chose plain CSS for the gallery. The founder decided CAN should have one design system on every surface instead.

## Decision
gluestack-ui is the design-system foundation for `can_app` (Expo: iOS, Android, web) and `can_gallery` (Next.js 16 static export).

- Version: the newest stable gluestack-ui major that supports Expo SDK 57, React 19.2 and react-native-web 0.21 (for the gallery, Next.js 16). If only an alpha or rc supports the stack, pin that exact version and record it in `DECISIONS.md`. No fallback to React Native core.
- Pin gluestack-ui and its styling engine (NativeWind or UniWind, as its docs require) to exact versions.
- `docs/design/ux/tokens.json` stays the single source; each repo generates its gluestack theme from it (`sync:tokens`, `sync:content`). Generated theme and CLI-generated `src/components/ui/**` are never hand-edited.
- In `can_app`, civic wrappers in `src/components/civic/**` are rebuilt on gluestack primitives with unchanged public props; feature code keeps importing only from civic.
- The gallery stays a fully static export with no runtime third-party fetch, tracking, cookies or forms.
- Adoption units run before every other UI unit: 02-u24 and 02-u25 (app), 06-u15 and 06-u16 (gallery). Until they land, the app is RN-core civic wrappers and the gallery is plain CSS.

## Consequences
- One component system and one token pipeline across surfaces.
- The static gallery gains client JavaScript it did not have; it is held to an explicit budget (130 KB gzipped per page) in 06-u16 and 06-u09.
- Exact version pinning means deliberate upgrades.
- Alpha risk: if only a pre-release fits, the project depends on unstable APIs and extra packages (reanimated, react-aria, svg were seen with v5); bumps may break wrappers, mitigated by unchanged civic props and the existing civic test suite.
- Bundle size is reported before and after in both repos.

## How to reverse
In `can_app`, re-implement the civic wrappers' internals on React Native core primitives (their props are unchanged, so feature code is untouched) and remove `src/components/ui/**` and the engine. In `can_gallery`, restore plain CSS driven by `tokens.css`. Record the reversal in a new ADR that links back.
