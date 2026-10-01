## 15. Security, privacy, and abuse resistance

Create a threat model before public launch. Cover account takeover, privilege escalation, doxxing, stalking, brigading, Sybil attacks, reviewer collusion, false expertise, evidence tampering, malicious uploads, scraping, prompt injection, data poisoning, denial of service, and insider misuse.

Minimum controls:

- Strong authentication and optional or required MFA for privileged roles
- Least privilege and separation of duties
- Encryption in transit and at rest
- Secret management and rotation
- Secure upload scanning and content-type validation
- Rate limits, abuse detection, and anti-automation controls
- CSRF, XSS, injection, SSRF, broken access control, and dependency protections
- Append-only or tamper-evident audit strategy for consequential events
- Backup, restore, disaster recovery, and deletion testing
- Privacy-preserving logs and analytics
- Coordinated vulnerability disclosure process before broad launch

## 16. Accessibility, localization, and usability

Target WCAG 2.2 AA for core flows. Support keyboard navigation, screen readers, clear focus, sufficient contrast, reduced motion, plain-language explanations, and accessible maps or non-map alternatives.

Design localization from the start. Do not concatenate translated strings. Store original language and translations distinctly. Moderation quality must be evaluated per launch language, not assumed from English performance.

## 17. Observability and operations

Implement structured logs, metrics, traces, health checks, job visibility, and actionable alerts. Define service-level objectives for core flows before production.

Track product outcomes without optimizing for addiction:

- Eligible problems reaching active resolution
- Median time between stages
- Proposal-to-implementation rate
- Verified solution rate
- Reopened or failed resolutions
- Appeal rate and overturn rate
- Moderation precision, recall, calibration, and demographic or regional disparities
- Participation balance between core participants, visitors, and experts
- User-reported safety and usefulness
- Data deletion and incident-response performance
- Evidence provenance and correction quality
- Documented commitment completion and verified outcome rates
- Blocker age, response delay, and escalation effectiveness
- Responsibility-attribution accuracy and successful appeals
- Civic-report coverage, uncertainty, and equal-treatment audits

Do not use time spent, session count, posting volume, political conversion, candidate preference, or vote choice as primary success metrics. The platform must not measure success by changing votes toward a candidate or party.

## 18. Testing and quality gates

Maintain a layered test suite:

- Unit tests for domain rules and state transitions
- Property-based tests for permissions and lifecycle invariants
- Integration tests for database, jobs, storage, and AI adapters
- Contract tests for APIs and policy schemas
- End-to-end tests for each critical user journey
- Moderation evaluation sets, including multilingual and adversarial cases
- Accessibility checks
- Security scanning, dependency review, and authorization tests
- Migration, backup, restore, export, and deletion tests
- Load and resilience tests before broad launch
- Provenance, contradiction, correction, and tamper-evident timeline tests
- Responsibility-attribution and term-boundary tests
- Public-asset permission and unsafe-community-action tests
- Mass-participation, duplicate-report, brigading, and coordinated-evidence tests
- Political-neutrality, equal-treatment, candidate-correction, ranking-transparency, and voter-brief non-endorsement tests
- Public-facing AI PII detection, redaction, minimization, tokenization, output-leakage, and deletion tests
- Retrieval authorization, prompt-injection, tool-exfiltration, cross-tenant isolation, model memorization, and provider-fallback tests
- Synthetic multilingual PII fixtures covering names, addresses, identifiers, biometrics, documents, metadata, rare narratives, mixed-direction text, and indirect re-identification
- Stage-level context-budget, mandatory-rule coverage, chunk-boundary, cross-chunk dependency, aggregation, replay, and truncation-failure tests
- Prompt-prefix, compiled-policy, retrieval, and result-cache correctness, invalidation, isolation, deletion, side-channel, and stale-policy tests
- Multi-model routing, cheapest-qualified selection, privacy-constrained fallback, disagreement escalation, eval-threshold, drift, rollback, and cost-runaway tests

A feature is not done until acceptance criteria, tests, documentation, observability, privacy impact, failure behavior, and rollback are addressed.

