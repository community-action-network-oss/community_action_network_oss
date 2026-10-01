---
id: "07-u13"
plan: "07"
title: "Environment variable contract document and startup validation"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.2
priority: 131
depends_on: ["02-u02", "07-u04"]
writes: ["src/config.ts", "src/config.spec.ts", "scripts/check-env.mjs", "docs/env-contract.md", ".env.example", "package.json"]
spec: ["docs/design/components/cross-cutting.md", "docs/spec/16-security-a11y-ops-testing.md", "docs/design/system-design.md#11-operations-notes"]
needs: []
verify: ["npm run verify", "npx vitest run src/config.spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Make the environment-variable contract of the server exact and checkable (D-57): one document listing every variable, and one validator that fails at boot with a precise message. The contract table in the cross-cutting design doc is the intent; the implemented names win and any difference is listed in the document for can-spec to reconcile.

## Steps
1. Read src/config.ts as built by 02-u02, 09-u08, 10-u04 and later units, and list every variable the server reads in docs/env-contract.md (in can_server/docs): name, required or optional, default, secret yes or no, example, owning unit. Group by service area: server core (DATABASE_URL, DATABASE_URL_APP, PORT, PUBLIC_BASE_URL, APP_BASE_URL, ALLOWED_ORIGINS or CORS origins, COOKIE_SECURE, TRUST_PROXY), identity keys (EMAIL_ENC_KEY, EMAIL_INDEX_KEY, fingerprint and invite hash keys), mail (MAIL_TRANSPORT, SMTP_URL, MAIL_FROM), policy (POLICY_PACKS_DIR and POLICY_ACTIVE as implemented by 10-u04; the design doc names POLICY_PACK_SOURCE, POLICY_PACK_VERSION and POLICY_PACK_HASH, record the mapping), AI gateway (AI_PROVIDER fake by default, OPEN_ROUTER_KEY, AI_SPEND_CAP_MONTHLY_USD default 10, AI_DATA_COLLECTION default deny, optional ANTHROPIC_API_KEY; live only when the key and cap are set), simulation (SIMULATION_MODE, never set in production). Also list the app build variable EXPO_PUBLIC_API_BASE_URL and the gallery build variable NEXT_PUBLIC_APP_URL as build-time values of the other services.
2. Startup validation in src/config.ts (extends 02-u02): production mode fails at boot, naming each problem and never a value: missing required variables, wrong key lengths, COOKIE_SECURE false, a wildcard or http origin in ALLOWED_ORIGINS, SIMULATION_MODE set, AI_PROVIDER=anthropic without key and daily cap, POLICY_ACTIVE hash not matching a loadable pack (reported by 07-u14 at runtime, checked syntactically here), dev-only constant keys in use. Non-production prints warnings only for dev defaults.
3. scripts/check-env.mjs (script "check:env"): loads a given env file (default none) through the same validator without starting the server and prints the problems; used by the prod-like compose (07-u17) before containers start. Test: a table of bad environments gives the expected messages, a fully valid production env passes, the document lists every variable that src/config.ts reads (test greps config.ts for process.env names and compares with the document table).
4. .env.example mirrors the document (names and comments, no real secrets).

## Acceptance
- The document and config.ts agree (test compares variable names).
- Production boot fails with a clear named message for each bad case.
- No secret value is ever printed.
- `npm run verify` is green.

## Out of scope
- Secret managers and rotation (hosting decisions).
- Editing docs/design (reconciling names is reported to can-spec).
