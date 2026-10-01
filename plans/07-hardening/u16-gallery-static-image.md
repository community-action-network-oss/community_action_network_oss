---
id: "07-u16"
plan: "07"
title: "Static export image for can_gallery behind a tiny static server"
repo: "can_gallery"
area: can-gallery
model: sonnet
est_hours: 1
priority: 134
depends_on: ["06-u09", "07-u13"]
writes: ["Dockerfile", ".dockerignore", "docker/serve.mjs", "scripts/test-image.sh", "package.json"]
spec: ["docs/design/components/cross-cutting.md", "docs/spec/16-security-a11y-ops-testing.md"]
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
A portable image that serves the static Next.js export of can_gallery (D-57). The gallery is read-only, public and static: the image holds the generated out/ directory only.

## Steps
1. Dockerfile, multi-stage: build stage (pinned node LTS) runs npm ci, npm run sync:content (skipped with a clear message when the superproject docs are absent, in which case the committed src/content copy is used) and the existing static export (npm run build producing out/) with ARG NEXT_PUBLIC_APP_URL; runtime stage is a minimal pinned node slim image holding out/ and docker/serve.mjs, non-root, HEALTHCHECK /healthz, EXPOSE 8080.
2. docker/serve.mjs (node stdlib, same behaviour as the app image tiny server of 07-u15 but without SPA fallback: unknown paths return the exported 404.html with status 404): content types, immutable caching for hashed assets, short caching for html, nosniff, frame-ancestors none, a CSP with no third-party origins (the gallery has no scripts from elsewhere, 06-u09 budget), directory index files (about/index.html style), refuses traversal, graceful SIGTERM.
3. scripts/test-image.sh (script "test:image", needs docker): builds, runs, asserts non-root, the home page and one localized page are 200, an unknown path is 404 with the exported page, /healthz 200, no external host appears in any html, the image holds no node_modules.

## Acceptance
- The static export is served by a non-root container with correct headers and a real 404.
- No secrets and no node_modules in the runtime image.
- `npm run verify` is green.

## Out of scope
- Registry push, CDN, domain, TLS and the deploy itself (06-u13 and 06-u14 own deploy prep, founder-gated).
