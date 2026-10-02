---
id: "06-u13"
plan: "06"
title: "Static hosting deploy preparation docs and checks"
repo: "can_gallery"
area: "can-gallery"
model: sonnet
est_hours: 1
priority: 130
depends_on: ["06-u09"]
writes: ["docs/deploy.md","deploy/headers.txt","scripts/check-deploy.mjs","next.config.ts","package.json"]
spec: ["docs/adr/0003-nextjs-static-gallery-site.md","docs/spec/18-phases-gates.md","docs/open-questions/OQ-hosting-region.md","docs/open-questions/OQ-domain.md","docs/spec/16-security-a11y-ops-testing.md"]
verify: ["npm run build","npm run check:deploy","npm run verify"]
founder_gate: false
status: done
attempts: 0
commits: ["d00d786"]
actual_hours: null
---

## Objective

Make the eventual deploy a checklist, not a project. Document static hosting without choosing a vendor and prove the build output is host-neutral.

## Steps

1. Write docs/deploy.md: build command, output folder, what a static host must provide (404 page, trailing-slash behavior, security headers), a neutral comparison of host types (object storage with CDN, static site host, repository pages) on privacy of visitor IPs, logs, cost to the project (the platform is non-monetary, docs/spec/20-participation-nonmonetary.md) and ease of leaving; the open questions OQ-domain and OQ-hosting-region; the noindex stance until the founder decides; rollback by redeploying the previous commit output.
2. Write deploy/headers.txt: a host-neutral list of response headers (Content-Security-Policy with default-src self, frame-ancestors none, X-Content-Type-Options, Referrer-Policy no-referrer, Permissions-Policy empty) with a note on converting it to each host format.
3. Write scripts/check-deploy.mjs: out/ has 404.html, no localhost URLs, no absolute path to a specific host, no inline scripts that the CSP would block (or document nonces), and deploy/headers.txt contains every required header. Add check:deploy to verify.
4. Confirm next.config.ts uses output export, trailingSlash as decided in ADR 0003, and images unoptimized.

## Acceptance

- docs/deploy.md lets a maintainer deploy with no further research once a host is chosen.
- check:deploy passes against a fresh build; verify passes.

## Out of scope

- Choosing a host or buying a domain.
- Actually deploying (06-u14).
- CI deploy workflows.
