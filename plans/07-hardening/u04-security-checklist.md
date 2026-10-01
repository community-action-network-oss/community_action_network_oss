---
id: "07-u04"
plan: "07"
title: "Security checklist: headers, CORS, restricted DB role, secret scan"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 113
depends_on: ["07-u03"]
writes: ["src/app.setup.ts","src/platform/security/**","src/db/db.module.ts","src/config.ts","scripts/scan-secrets.mjs","docs/security-checklist.md","package.json",".env.example","test/security.e2e-spec.ts"]
reads: ["src/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/spec/16-security-a11y-ops-testing.md","docs/design/system-design.md#11-operations-notes","docs/design/system-design.md#3-slice-1-erd","docs/spec/constitution/rules.md#PRIV-GATE-1"]
needs: ["docker","db"]
verify: ["npm run verify","npx vitest run --config ./vitest.config.e2e.ts test/security.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Close the loop on basic transport and secret hygiene and record it as a checklist the next contributor can rerun: security headers, strict CORS, body limits, the app connecting as the restricted database role, a secret scan, and inert-input guarantees.

## Steps
1. Headers on every response from configureApp: X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy no-referrer, Cross-Origin-Resource-Policy same-site, a Content-Security-Policy of default-src none and frame-ancestors none for the JSON API (the Swagger UI at /docs is exempted and disabled when NODE_ENV is production), Strict-Transport-Security only when config.cookieSecure. No powered-by header. Implement by hand (a small middleware); no new dependency.
2. CORS: allowlist exactly config.corsOrigins, credentials true, methods and headers explicit; test that a disallowed Origin gets no CORS headers and that wildcard is impossible by config validation.
3. Body size limit 100 kb (413 in the error envelope), query length limits, JSON only (415 otherwise).
4. Database role: add DATABASE_URL_APP (default derived from DATABASE_URL using role can_app_rw via a documented login role created by an additional migration, with a dev password only in .env.example) used by the pooled connection in db.module.ts, while migrations and seed keep the owner URL. If switching breaks a flow, fix the grants migration, not the role. Test: with the app connection, UPDATE on problem_event and audit_event fail.
5. scripts/scan-secrets.mjs (node stdlib, script "scan:secrets"): scans git-tracked files (git ls-files via child_process) for private keys, AWS-style keys, Anthropic-style API keys (sk-ant-), any ANTHROPIC_API_KEY or OPEN_ROUTER_KEY value (OpenRouter keys start with sk-or-), high-entropy assignments to names containing secret, key, token, password; allowlist for the labelled dev-only constants and example.test addresses; exits non-zero with file and line. Add it to npm run verify.
6. Inert input e2e (test/security.e2e-spec.ts, AI_PROVIDER=fake): post XSS, SQL-like and prompt-injection strings in structured answers; they are stored verbatim, returned verbatim as JSON strings (content-type application/json, nosniff), never executed, never logged (log redaction test reads captured log lines); OpenAPI /docs not served in production mode.
7. Write docs/security-checklist.md (in can_server/docs): a table of each control, where it lives, how to re-test it, and the explicit list of what is NOT covered (TLS, hosting, WAF, secret management, real mail provider, live AI provider key handling, device security).

## Acceptance
- The app connects as the restricted role and append-only grants hold (test).
- Secret scan passes on the repo and fails on a planted fake key in a temp file (test in the script spec).
- The checklist names what is out of scope honestly.
- `npm run verify` is green.

## Out of scope
- TLS and hosting (founder decisions, OQ-hosting-region).
- Dependency vulnerability scanning service.
