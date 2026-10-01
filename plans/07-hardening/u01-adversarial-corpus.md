---
id: "07-u01"
plan: "07"
title: "Adversarial fixture corpus for detectors"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 110
depends_on: ["03-u03","03-u02"]
writes: ["test/fixtures/adversarial-*.json","src/problems/domain/privacy/**","src/problems/domain/eligibility/**"]
reads: ["src/**","test/fixtures/**"]
spec: ["docs/spec/01-slice-1-brief.md","docs/spec/constitution/rules.md#PRIV-GATE-1","docs/spec/constitution/rules.md#NAME-1","docs/spec/constitution/rules.md#SCOPE-1","docs/spec/constitution/rules.md#EVID-URL-1","docs/design/system-design.md#9-test-strategy","docs/spec/constitution/rules.md"]
needs: []
verify: ["npm run lint","npm run build","npm test","npx vitest run src/problems/domain/privacy"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Try hard to get personal data, unsafe URLs and out-of-scope text past the deterministic detectors, record each attempt as a corpus row citing its RULE-ID, and fix the detectors where they leak. Honest known gaps stay documented.

## Steps
1. Create test/fixtures/adversarial-privacy.json and adversarial-eligibility.json and adversarial-urls.json with at least 80 rows total, each {id, text, expected, ruleId, category, note}. Categories: unicode confusables (Cyrillic and Greek look-alikes for Latin letters, fullwidth digits), zero-width and bidi control characters inserted inside names, phones and emails, digits spelled out ("five five five"), leetspeak, split across lines and punctuation, base64 or hex encoded email, emails written "at"/"dot", names glued to words, very long input (100000 characters, must finish under 200 ms), URL tricks (userinfo, IDN lookalike, nested redirects as query params, uppercase scheme, whitespace and control characters in the URL, javascript: with entities), emergency language in euphemisms, and prompt-injection style text ("ignore previous instructions") which must simply be treated as text (no AI is called: AI-OFF-1).
2. Runner specs (extend the plan 03 corpus runners or add src/problems/domain/adversarial.spec.ts) assert every row; rows that currently fail must be fixed in the detector if the fix is small and general, otherwise moved to category known_gap with a note and an assertion of the current behaviour so improvements are deliberate. Never loosen an existing plan 03 corpus row.
3. Performance guard: a spec asserts the detectors finish 100000 characters of adversarial text in under 200 ms (regex catastrophic backtracking check; rewrite any offending regex).
4. Every ruleId in every row exists in docs/spec/constitution/rules.md (test).
5. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- No catastrophic regex: the long input row passes the time guard.
- known_gap rows exist only with a note and a current-behaviour assertion.
- All plan 03 corpus tests still pass unchanged.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- ML detection.
- Image or file checks.
