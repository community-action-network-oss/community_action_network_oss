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

Do not use time spent, session count, posting volume, political conversion, candidate preference, or vote choice as primary success metrics (anti-engagement rules: `17-ux.md`, "Deliberate, not addictive"). The platform must not measure success by changing votes toward a candidate or party. This list is the **canonical** product-metrics list; `21-open-source-governance.md` links here.

## 18. Testing and quality gates

Maintain a layered test suite. This section lists categories only. The detailed AI test requirements live in the operational gates of `14-ai-privacy-gateway.md` and the evaluation sections of `15-ai-inference.md`.

- Unit tests for domain rules and state transitions; property-based tests for permissions and lifecycle invariants
- Integration tests for database, jobs, storage and adapters; contract tests for the API and policy schemas
- End-to-end tests for each critical user journey (slice 1: the script in `01-slice-1-brief.md`)
- Moderation evaluation sets, including multilingual and adversarial cases
- Accessibility checks, security scanning, dependency review and authorization tests (horizontal and vertical privilege escalation)
- Migration, backup, restore, export and deletion tests; load and resilience tests before broad launch
- Systemic-accountability suites, once those features exist: provenance, contradiction, correction and tamper-evident timeline; responsibility attribution and term boundaries; public-asset permission and unsafe-action; mass participation, duplicate-report and brigading
- Election-layer suites, once enabled: political neutrality, equal treatment, candidate correction, ranking transparency, voter-brief non-endorsement
- AI suites, once any AI feature exists: PII detection and redaction, retrieval authorization, prompt injection, cross-tenant isolation, context budgets, caches, routing and cost (all defined in the AI files)

A feature is not done until acceptance criteria, tests, documentation, observability, privacy impact, failure behavior, and rollback are addressed.

