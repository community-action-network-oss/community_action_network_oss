## AI

**Status (D-51, D-53):** the privacy gateway is **slice-1 core**. Every moderation run (`15-ai-inference.md`) sends its inputs through this gateway first (`PRIV-GATEWAY-1`). Tests and night runs use a deterministic `FakeModel` with recorded responses, so no content leaves the machine. The **live provider** (first adapter: Claude via the Anthropic API) is founder-gated: it switches on only with an API key, a spend cap, the hosted-provider requirements below and the operational gates below. These safety requirements are now load-bearing, not future work. Public wording: "People make every rule. AI applies it, explains it and answers to appeal." Design: `docs/design/ai/runtime.md`.

This file (the safety boundary and its operational gates) is the **canonical** AI specification. `06-moderation-geo-governance.md` and `17-ux.md` only link here.

### AI subsystem

General rules for every AI feature, in addition to the gateway rules below:

- Isolate model providers behind interfaces, with structured outputs validated against a schema.
- Keep system instructions and policy data separate from user-controlled content, and treat user content, retrieved documents and community labels as untrusted.
- Version models and prompts, keep evaluation sets, roll out by canary, and keep a kill switch and a safe non-AI fallback. Fail safely when a model or policy service is unavailable.

### Public-facing AI data safety boundary

**Founder direction:** Treat every public-facing AI input, attachment, retrieved record, tool result, intermediate representation, and generated output as potentially containing personal data, sensitive personal data, third-party information, precise location, secrets, or restricted civic evidence. A user intending to publish a public problem does not make the unreviewed intake safe or public. Raw intake remains private and untrusted until the privacy gate approves a non-identifying representation.

Public-facing AI includes conversational intake, structural reframing, summarization, translation, moderation assistance, duplicate detection, search, retrieval-augmented generation, evidence extraction, transcription, OCR, image or document analysis, recommendation, timeline generation, responsibility mapping, report generation, and any AI-enabled support or contributor interface.

#### Safe-processing architecture

Use an explicit AI privacy gateway rather than allowing application features to call external models directly. The gateway should:

1. Authenticate the requesting user or service and verify purpose and authorization.
2. Classify the requested operation, data classes, jurisdiction, sensitivity, and permitted model environments.
3. Reject unsupported, excessive, or prohibited data before model access.
4. Remove file metadata and perform malware, document, image, OCR, secret, identifier, and re-identification screening.
5. Minimize, redact, generalize, pseudonymize, or tokenize data before leaving the approved trust boundary.
6. Construct the smallest purpose-specific prompt and retrieval context.
7. Route only to an approved model deployment with the required region, retention, training-use, isolation, and contract controls.
8. Treat model output as sensitive and untrusted until output privacy, safety, grounding, and policy checks pass.
9. Require user confirmation before publishing AI-transformed content.
10. Record a minimal audit event without storing raw prompts or responses by default.

No client, plugin, contributor tool, background worker, or experimental feature may bypass this gateway for production user data.

#### Data-zone separation

Maintain technically and operationally distinct zones:

- **Transient raw-intake zone:** Short-lived private drafts and uploads used only for classification, redaction, and user-approved transformation.
- **Restricted evidence zone:** Encrypted, narrowly authorized material that is excluded from general-purpose public AI and ordinary contributor access.
- **Sanitized AI-processing zone:** Minimized or tokenized context approved for a specific model operation.
- **Public knowledge zone:** Material that has passed privacy, safety, evidence, and publication review.
- **Audit and telemetry zone:** Minimal metadata, policy versions, routing decisions, and outcome status without raw content by default.

Moving data between zones is a consequential policy decision and must be server-authorized, auditable, testable, and reversible where possible.

#### Processing preference order

For potentially identifying content, prefer:

1. Deterministic local validation and redaction.
2. On-device or organization-controlled processing when it provides adequate quality and security.
3. Isolated project-operated inference in an approved region.
4. A contractually approved hosted provider only when the preceding options are insufficient.

Local execution is not automatically safe: models, plugins, extensions, logs, crash reporters, model downloads, tool servers, and the operating system can still leak data. Every environment requires a threat model and verified configuration.

#### Hosted-provider requirements

A hosted model may process production user data only after documented approval of:

- Data-processing agreement and lawful transfer mechanism where required
- Explicit prohibition on training or improving shared models with project data
- Zero or strictly bounded content retention, with deletion verification
- Approved processing and storage regions
- Tenant isolation and least-privilege operator access
- Encryption in transit and at rest
- Subprocessor inventory and change notification
- Security certifications or equivalent evidence appropriate to risk
- Breach notification and incident-cooperation terms
- Abuse-monitoring behavior and whether provider personnel can inspect content
- Model, endpoint, version, fallback, and routing transparency
- Export, deletion, termination, and provider-switch procedures
- Prohibition on silently routing data to an unapproved model or region

Consumer chat products, personal API accounts, browser extensions, unapproved MCP or tool servers, and free hosted endpoints must not receive production user data merely because they are convenient or inexpensive.

#### Retrieval and tool safety

Authorization must be enforced before retrieval, not after a model has seen the data. Retrieval systems must apply user, problem, role, jurisdiction, evidence classification, retention, and purpose constraints before producing model context. Do not rely on the model to ignore unauthorized records.

Tool calls require explicit schemas, allowlists, bounded permissions, output validation, time and cost limits, and confirmation for consequential actions. Retrieved documents and tool output remain untrusted and may contain prompt injection designed to exfiltrate data, alter policy, or invoke unauthorized actions.

#### Pseudonymization and token handling

Where a workflow needs continuity without identity disclosure, replace identifiers with scoped, expiring tokens. Keep re-identification mappings in a separate encrypted service with stricter authorization, retention, and audit rules. Do not use stable global pseudonyms when a problem-scoped or operation-scoped token is sufficient.

Pseudonymized data remains personal data when it can be relinked. Hashing an email address, phone number, account ID, or exact address does not by itself make it anonymous.

#### Logging and observability

Do not place raw prompts, raw responses, attachments, embeddings, retrieved passages, personal identifiers, or decryption material in ordinary application logs, traces, analytics, crash reports, or model-evaluation stores. Use opaque request IDs, policy outcomes, model versions, timing, token counts, redaction counts, and categorized failure codes.

Time-bounded encrypted diagnostic capture may be enabled only for a specific incident or approved evaluation, using sampled minimum-necessary data, restricted access, documented purpose, automatic expiry, and an auditable deletion path.

#### Output controls

AI output can reproduce input PII, infer sensitive attributes, reveal restricted retrieval context, or combine harmless facts into an identifying narrative. Before display or publication:

- Re-run secret, identifier, sensitive-attribute, exact-location, and re-identification checks.
- Validate citations, source permissions, and claim scope.
- Prevent output from revealing hidden system metadata, reviewer identities, moderation evidence, or restricted records.
- Mark uncertain transformations and require human confirmation.
- Preserve the original sanitized user statement so an AI rewrite cannot silently change meaning.
- Fail closed to a private draft when confidence, language support, or privacy checks are insufficient.

#### Consent, notice, and user rights

Before an AI feature receives user content, provide a plain-language notice describing purpose, data classes, processing location or provider class, retention, whether a human may review it, publication consequences, and available non-AI or manual alternatives. Do not use bundled consent to authorize unrelated training, profiling, advertising, or product analytics.

Support applicable access, correction, deletion, withdrawal, objection, and export rights. Deletion must address raw intake, provider retention, caches, embeddings, evaluation datasets, replicas, backups, derived records, and re-identification mappings according to the approved retention policy.

#### Operational gates

Before any public-facing AI feature enters production, require:

- Data-flow and trust-boundary diagram
- Data protection impact assessment or equivalent privacy review
- Model and provider register
- Purpose, lawful basis, data-class, jurisdiction, retention, and deletion mapping
- Synthetic-PII evaluation set covering supported languages and scripts
- Prompt-injection, extraction, memorization, cross-tenant, retrieval-authorization, and tool-abuse tests
- Redaction recall and harmful-over-redaction analysis
- Provider failure, fallback, outage, breach, and termination runbooks
- Feature kill switch, and a safe fallback: with the model off or failing, items are held and nothing is published (`FAIL-CLOSED-AI-1`). The human lane is only for emergency and legal cases
- Independent security and privacy review proportionate to risk
- Explicit founder approval for high-risk data classes or external processing

Do not test with real private evidence or copied production PII when representative synthetic data can answer the question.

