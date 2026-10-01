---
id: "07-u15"
plan: "07"
title: "Static web build image for can_app: Expo web export behind a tiny static server"
repo: "can_app"
area: can-app
model: sonnet
est_hours: 1
priority: 133
depends_on: ["07-u10", "07-u13"]
writes: ["Dockerfile", ".dockerignore", "docker/serve.mjs", "scripts/test-image.sh", "package.json"]
spec: ["docs/design/components/cross-cutting.md", "docs/design/system-design.md#10-web-first-verification", "docs/design/ux/wireframes/browse.md#WF-LIST-1", "docs/design/ux/ui-unit-template.md"]
needs: ["docker"]
verify: ["npm run verify", "bash scripts/test-image.sh"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
A portable image that serves the can_app web export (D-57). Build args set EXPO_PUBLIC_API_BASE_URL; no server code and no secrets in the image. Native app store builds are separate and founder-gated.

## Steps
1. Dockerfile, multi-stage: build stage (pinned node LTS) runs npm ci and the existing web export (npx expo export --platform web) with ARG EXPO_PUBLIC_API_BASE_URL (required, the build fails if empty); runtime stage is a minimal pinned node slim image with only dist/ and docker/serve.mjs, non-root user, HEALTHCHECK against /healthz, EXPOSE 8080.
2. docker/serve.mjs (node stdlib, no dependency): serves files from dist/ with correct content types, immutable cache headers for hashed assets under _expo/static and no-cache for index.html, SPA fallback to index.html for unknown paths that do not look like files, GET /healthz returns 200 ok, noindex header X-Robots-Tag: noindex (the app is not indexed, same as the app meta), a strict Content-Security-Policy that allows the configured API origin in connect-src (read from an optional runtime env API_ORIGIN, default derived from nothing: when unset use 'self'), X-Content-Type-Options nosniff, no directory listing, path traversal refused, graceful shutdown on SIGTERM.
3. scripts/test-image.sh (script "test:image", needs docker): builds with a dummy API base URL, runs it, asserts non-root, GET / returns the app html with noindex, /healthz is 200, an unknown route falls back to index.html, "/../../etc/passwd" style paths return 404, the baked bundle contains the API base URL and no other host, docker stop exits within 10 seconds.
4. Reuse the budget numbers of 07-u10 for a size note only; do not duplicate the budget check.

## Acceptance
- Acceptance: meets docs/design/ux/ui-unit-template.md (sections 1 to 6; mark items not applicable with a reason in the commit message).
- The image serves the web export with the right headers and fallback, as non-root, with no secrets.
- The build fails when EXPO_PUBLIC_API_BASE_URL is missing.
- `npm run verify` is green (tsc, lint, prettier, logical-properties check, jest, web export).

## Out of scope
- Registry push, CDN, TLS (hosting is founder-gated).
- Native builds (EAS), device runs.
