---
id: "09-u57"
plan: "09"
title: "LEGAL-CITE-1: legal_finding store, DB constraint, output schema and citation in every explanation"
repo: "can_server"
area: can-server
model: sonnet
est_hours: 1.3
priority: 286
depends_on: ["09-u56"]
writes: ["src/moderation/app/legal-stack/findings/**", "src/db/schema.ts", "drizzle/**", "src/moderation/app/outcome/**", "openapi/openapi.json", "test/legal-cite.e2e-spec.ts"]
spec: ["docs/spec/constitution/rules.md#LEGAL-CITE-1", "docs/spec/constitution/rules.md#LEGAL-STACK-1", "docs/design/ai/legal-stack.md#4-how-dps-use-the-stack", "docs/adr/0012-legal-layer-stack.md", "docs/design/ai/decision-points.md#per-dp-notes"]
needs: ["docker", "db"]
verify: ["npm run verify", "npx vitest run --config ./vitest.config.e2e.ts test/legal-cite.e2e-spec.ts"]
founder_gate: false
defaults: "none needed; every choice in this unit is a reversible engineering default"
status: todo
attempts: 0
commits: []
actual_hours: null
---
## Objective
No legality decision exists without layer, article and corpus version. This is enforced by the DP output schema and by a database constraint.

## Steps
1. Table `legal_finding` {id, decision_id, run_id, layer text check in L0..L6, article_id (nullable only when finding = none_found), corpus_id, corpus_version, corpus_hash, finding in constrains|permits|none_found|conflict}. Constraints: layer, corpus_id, corpus_version, corpus_hash NOT NULL; article_id NOT NULL unless `none_found`; a `moderation_decision` whose `rule_ids` include a legal rule (LEGAL-STACK-1, LEGAL-GATE-1, TOPIC-FORBIDDEN-1) needs at least one finding row (deferred constraint trigger).
2. The outcome applier (09-u23) validates the DP output `legal_findings[]` against the 10-u58 schema, writes the rows in the decision transaction, and rejects the output as a schema failure (retry then hold) when a finding lacks layer, article or corpus version.
3. Explanations (MOD-EXPLAIN-1): every legality explanation lists `{layer, article_id, corpus_version}` and the sentence "applicable rule, not legal advice"; the output gate (09-u10) re-screens it; DP-LEGAL (09-u11) cites the instrument that makes the text a legal matter, using the same finding shape.
4. Read model: the poster sees the full findings of their own decisions; `GET /v1/policy/legal-basis-log` serves aggregate counts per layer and corpus version without item ids. Run `npm run openapi` then `git add -- openapi/openapi.json`.
5. Tests: DB constraint test (a legality decision missing layer, article or version fails to insert); schema failure retried then held; poster sees citations; aggregate endpoint leaks no item id.

## Acceptance
- The LEGAL-CITE-1 constraint test passes (insert without any of the three fails).
- Every legal explanation contains layer, article and corpus version (string test).
- openapi regenerated; `npm run verify` green.

## Out of scope
- Topic refusal flow (09-u58).
- Conflict handling (09-u59).
