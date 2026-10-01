## 20. Required project artifacts

An index of the documents and living records the project maintains, version-controlled in the repositories. This table is the single list. Detail for an artifact belongs in the file it names, not here. "Where" is a path or the spec section that defines it. Status: `exists` (in the superproject today), `planned` (a plan unit or phase will produce it), `later` (a later phase or the decentralization track).

| Artifact | Where | Phase | Status |
|---|---|---|---|
| README with local setup and system overview | superproject and each repository | 0B | planned |
| Product requirements; scope and non-goals | `docs/spec/03-scope.md`, `01-slice-1-brief.md` | 0B | exists |
| Open-questions register, assumptions and risk registers | `docs/open-questions/`; risks in `docs/design/` | 0B | exists |
| Decision log | `DECISIONS.md` | 0B | exists |
| Architecture decision records (Expo, gluestack on UniWind, NestJS, PostgreSQL, Drizzle, three submodules, server-owned OpenAPI, Next.js gallery, email-code auth, web-first verification, no live AI in slice 1) | `docs/adr/` | 0B | exists |
| Architecture overview, diagrams, slice-1 ERD, API surface, auth flow, test strategy | `docs/design/` | 0B | exists |
| Domain glossary and state machines | `00-index.md` (glossary), `01-slice-1-brief.md` (state table) | 0B | exists |
| Data model and data classification | `10-data-model.md`, `docs/design/` | 1 | exists (model), planned (classification) |
| Constitution, rule registry, article map | `docs/spec/constitution/` | 0B | exists |
| API contract | `can_server/openapi/openapi.json` (generated) | 1 | planned |
| Universal frontend compatibility matrix (iOS, Android, mobile web, desktop web, LTR, RTL, scripts) | `can_app/docs/` | 1 | planned (web only in slice 1) |
| Threat model and privacy impact assessment | `docs/design/`, `16-security-a11y-ops-testing.md` | 0B | planned |
| Moderation policy schema and evaluation plan | `06-moderation-geo-governance.md` | 1 to 2 | planned |
| AI data-flow map, trust-boundary diagram, DPIA, model and provider register, retention and deletion matrix, hosted-provider checklist, gateway spec, synthetic-PII corpus, safe-logging standard, provider incident runbooks | `14-ai-privacy-gateway.md` (gates) | before any AI | later |
| Inference-stage DAG, context budgets, stage schemas, coverage manifest, cache architecture and invalidation, model registry, routing policy, escalation ladder, evaluation suites, cost dashboard | `15-ai-inference.md` | before any AI | later |
| Test strategy and quality dashboard | `docs/design/`, `16-security-a11y-ops-testing.md` | 1 | planned |
| Runbooks: deploy, rollback, incident response, backup, restore, data deletion | each repository `docs/runbooks/` | 6 | later |
| Changelog and release notes | each repository | 1 | planned |
| Contributor guide, code of conduct, security policy | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` | 0A | planned |
| Open-source license decision | `docs/open-questions/OQ-license.md` (resolved: MIT, D-49; LICENSE in every repository) | 0B | done |
| AI-assisted contribution policy, disclosure template, reviewer checklist, merge gates, autonomous-agent rules, tool setup guide | `22-ai-contribution-policy.md`, `AI_CONTRIBUTIONS.md` | 0A to 1 | planned |
| Concept-page brief, factual claims register, recruitment content, contribution calls, launch checklist | `can_gallery/`, `18-phases-gates.md` (Phase 0A) | 0A | planned |
| Interest channel (form or list), if any | `docs/open-questions/OQ-promo-interest-channel.md` | 0A | open |
| Gate X readiness standard and role-page templates | `18-phases-gates.md` (Gate X) | Gate X | later |
| One-hour contribution catalog (role, risk, prerequisites, review, outcome, stopping point) | `plans/` task catalog | 0A | planned |
| Non-monetary operating model, free-access guarantee, in-kind support registry, host-recognition standard, independence rules, cost-request procedure, no-custody policy | `20-participation-nonmonetary.md` | 0B | exists |
| Claim, provenance, evidence-safety, contradiction, correction and restricted-reference specifications; problem-graph, authority, responsibility, blocker and commitment schemas; public-infrastructure and community-implementation safety policy | `07-systemic-evidence.md` | 7 | later |
| Political-neutrality, candidate-identity, election-readiness, civic-report and voter-brief policies | `08-election-accountability.md` | 8 | later |
| Centralized-first and decentralization decision; separate production and experimental data rules | `12-decentralization-ready.md` | 0B | exists |
| Decentralization charter, governance, RFC template, node-role taxonomy, signed node manifest, community-node wizard, maturity model, low-cost profile, provider-adapter contract, capacity benchmark, migration runbook | `13-decentralization-track.md` | D | later |
| Global identifier, origin, authoritative-location, replica and signed-event specifications; export, import and portability specification | `12-decentralization-ready.md` (seams now), `13-decentralization-track.md` (rest) | D0 | later |
| Federation, discovery, event exchange, conflict, correction, withdrawal, deletion and retention RFCs | `13-decentralization-track.md` | D1 to D2 | later |
| Distributed-storage threat model, capability model, fragment placement, repair protocol, metadata-leakage analysis, abuse-storage policy | `13-decentralization-track.md` | D3 | later |
| Node quarantine, revocation, key rotation, revalidation and restoration procedures; conformance suite and compatibility matrix | `13-decentralization-track.md` | D2 | later |
| Decentralization concentration register (hosting, DNS, identity, custody, signing, protocol control, distribution, moderation, governance, funding, domain control, recovery authority) | `13-decentralization-track.md` | D | later |
