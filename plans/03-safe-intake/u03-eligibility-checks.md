---
id: "03-u03"
plan: "03"
title: "Eligibility, language, URL and secret checks with corpus"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 17
depends_on: []
writes: ["src/problems/domain/eligibility/**","test/fixtures/eligibility.json","test/fixtures/evidence-urls.json"]
reads: ["docs/spec/constitution/rules.md"]
spec: ["docs/spec/constitution/rules.md#SCOPE-1","docs/spec/constitution/rules.md#CRISIS-STATIC-1","docs/spec/constitution/rules.md#EVID-URL-1","docs/spec/constitution/rules.md#PUB-FAILCLOSED-1","docs/spec/01-slice-1-brief.md#2-slice-1-defaults","docs/open-questions/OQ-unsupported-language.md","docs/open-questions/OQ-eligible-categories.md","docs/spec/constitution/rules.md"]
needs: []
verify: ["npm run lint","npm run build","npm test","npx vitest run src/problems/domain/eligibility"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
The remaining deterministic submit checks: structural versus individual-case statements, emergency language, out-of-scope classes, URL scheme and shape, secrets-in-text, length limits and script-based language detection. Corpora cite RULE-IDs.

## Steps
1. src/problems/domain/eligibility/classify.ts: classifyStatement(text): {ok: true} | {ok: false, ineligibilityCode: "individual_case" | "medical" | "legal_advice" | "therapy" | "commercial" | "emergency", ruleId: "SCOPE-1" | "CRISIS-STATIC-1", hint}. Emergency terms (help, danger, bleeding, attack, suicide, overdose, fire now ...) produce emergency with CRISIS-STATIC-1 and an external-route hint, never a rejection of the whole draft (the app offers WF-EXTERNAL-1 inline). Individual-case signals: first person singular plus a personal grievance with a counterpart ("my landlord", "my employer", "I was fired") versus structural phrasing about a shared condition. Commercial: sale, discount, promo code, buy now, referral links.
2. src/problems/domain/eligibility/language.ts: detectScript(text) using Unicode script ranges; mostly Latin means supported English path; other dominant scripts return {supported: false, label: "language not yet supported"} (the item is accepted for human review with that label and may get needs_revision, rule PUB-FAILCLOSED-1, OQ-unsupported-language). Never rejects.
3. src/problems/domain/eligibility/url.ts: checkEvidenceUrl(raw): accepts only https (and http only if config.allowHttpEvidence in tests), host with a dot, no credentials in the URL, no javascript:, data:, file:, no localhost or private IP literals, max 2048 chars, normalises and strips tracking params (utm_*, fbclid); returns {ok, normalized, category: "official_page" | "news" | "other"} with category guessed by hostname suffix list kept in data (EVID-URL-1: URL, category, date, attestation only; no upload).
4. src/problems/domain/eligibility/secrets.ts: findSecrets(text): flags AWS-style keys, "-----BEGIN", bearer tokens, long hex or base64 runs near words like password, key, secret, token. Flag ruleId PRIV-GATE-1 with kind "secret".
5. src/problems/domain/eligibility/limits.ts: LIMITS (title 120, condition 300, affected 300, desiredOutcome 300, observed 600, uncertain 600) and checkLimits(fields).
6. Corpora (all fictional): test/fixtures/eligibility.json rows {id, text, expected, ruleId, category} with at least 40 rows covering each SCOPE-1 class declined, a non-identifying structural rewrite accepted for each, emergency language routed, borderline cases; test/fixtures/evidence-urls.json with at least 30 rows (good, javascript:, userinfo, IP literal, punycode lookalike, over-long, tracking params). Runner specs assert every row and that every ruleId exists in rules.md.
7. Tests that read files under ../docs (the superproject) resolve the path from the superproject root and skip with an explicit reason when it is absent, because can_server may be checked out alone.

## Acceptance
- Each SCOPE-1 class has declined and accepted-rewrite rows.
- Emergency language never auto-rejects; it returns a route hint.
- Unsupported script is accepted for review with the label, never rejected.
- Only https URLs without credentials pass.
- `npm run lint`, `npm run build` and `npm test` are green (no docker needed).

## Out of scope
- Wiring into endpoints (checks unit).
- AI classification.
