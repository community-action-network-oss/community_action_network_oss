---
id: "10-u55"
plan: "10"
title: "Legal corpus loader and registry in the policy module, with synthetic fixture corpora"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.5
priority: 55
depends_on: ["10-u04", "10-u41"]
writes: ["src/policy/legal/**", "src/policy/policy.module.ts", "src/config.ts", "test/fixtures/legal/**", "test/policy-legal/**", "openapi/openapi.json", ".env.example"]
spec: ["docs/design/ai/legal-stack.md", "docs/design/flows/legal-corpus-update.md", "docs/spec/constitution/rules.md#LEGAL-SOURCE-1", "docs/spec/constitution/rules.md#LEGAL-STACK-1", "docs/design/components/server.md", "docs/design/components/can-policy.md"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run test/policy-legal"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
Load legal corpora by version and hash, keep a registry of active corpus versions per jurisdiction and layer, and refuse anything without provenance. Server tests use only synthetic corpora in test/fixtures/legal, never ../can_policy.

## Steps
1. `src/policy/legal/` domain: `corpus.ts` types, `load.ts` (reads `corpus.yaml`, `articles/`, `topic-index.json`; recomputes `content_hash` and the pack hash with the existing 10-u04 hash module; refuses a missing provenance field, mismatch, `index_only` used as binding without acknowledgement, or an article without `source_locator`).
2. Registry `LegalRegistry`: `stackFor(jurisdiction, at: Date)` returns the six layers as declared by the jurisdiction `legal_stack` pins (10-u53) with corpus id, version, hash and mode; a missing layer corpus throws `LegalLayerMissing` (callers map it to `hold`, FAIL-CLOSED-AI-1). Table `legal_corpus_version` (layer, jurisdiction, corpus_id, version, hash, state shadow|canary|active|retired, activated_at); activation rides the existing `PolicyActivation` service (09-u27 adds it; here a minimal activate function used by tests).
3. Config `LEGAL_CORPORA_DIR` (default `test/fixtures/legal`), pinned hashes through the same `POLICY_ACTIVE` pins.
4. Fixtures (synthetic, labeled fictional, jurisdiction `fiktiva`): all six layers with a few invented articles each, including an L2 article that blocks an invented mechanism, an L4 article that blocks only a solution, an L6 article with a reviewed topic ban, an L1 article conflicting in interpretation with an L3 one, and an `index_only` L5.
5. Run `npm run openapi` and `git add -- openapi/openapi.json` if an endpoint `GET /v1/legal/corpora` (versions and hashes only, no text) is added; it is added.
6. Tests: load ok; tampered article refused and previous version retained; missing layer holds; registry returns pins by date; endpoint leaks no text.

## Acceptance
- A tampered or provenance-less corpus never loads and the previous version keeps serving (test).
- `stackFor` returns six layers for fiktiva and throws for a jurisdiction missing one.
- `npm run verify` green and openapi committed.

## Out of scope
- Topic retrieval (10-u56).
- Moderation use (plan 09).
