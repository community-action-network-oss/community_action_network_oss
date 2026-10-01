### Context-efficient, cached, multi-model inference architecture

**Status:** slice-1 core (D-51, D-53). This is the design of the moderation run: a bounded DAG of small agents per event (classify, rule checks, explain, deterministic aggregation) that applies the ratified policy pack at each decision point (`DP-*`, `01-slice-1-brief.md`, section 4). It is built in slice 1 against a deterministic `FakeModel` plus recorded responses. The live Anthropic provider is founder-gated by an API key and a spend cap (`OQ-model-provider-spend-cap`). It extends the gates in `14-ai-privacy-gateway.md`, which stay canonical.

**Moderation run rules.** Agents get no tools (`AGENT-NO-TOOLS-1`). User content is quoted data, never instructions, and outputs are schema-constrained. Every run records inputs hash, policy version, prompt hash, model id, outputs, confidence and cost (`POLICY-CITE-1`). Runs happen before publication, on every update (diff-aware) and after publication (policy change, context change, sampling). Any failure holds the item (`FAIL-CLOSED-AI-1`). The cache key includes the policy version. Design: `docs/design/ai/runtime.md`, `docs/design/ai/decision-points.md`.

**Founder direction:** The AI subsystem must be designed for a large and continuously evolving body of constitutional rules, jurisdiction laws, policy packs, workflow rules, and evidence requirements without sending the entire rule corpus into every model request. It should use bounded staged inference, deterministic policy evaluation where possible, privacy-safe caching, and eval-driven routing to the cheapest model that has demonstrated adequate performance for the specific task and risk tier.

#### Do not turn the complete rule system into one prompt

Represent rules as versioned, addressable policy objects with stable rule IDs, effective dates, jurisdictions, applicability predicates, priority, source, authoritative text, machine-readable constraints, approved summaries, examples, and evaluation fixtures. Separate:

- Deterministic rules that code or a policy engine can evaluate directly
- Retrieval rules that determine which policy subset applies
- Classification or extraction tasks suitable for a smaller model
- Ambiguous interpretation tasks requiring a stronger model or qualified human
- Decisions that only the emergency and legal lane may take (`escalate_human`), and policy changes, which AI may assist but cannot ratify

A generated summary must not silently replace authoritative legal or constitutional text. Every model stage should receive only the applicable policy slice and retain source and rule identifiers for traceability.

#### Inference pipeline as a bounded directed acyclic graph

Implement inference as observable, restartable stages with typed inputs and outputs rather than one unconstrained conversation:

1. **Request classification:** Determine task, language, jurisdiction candidates, data class, sensitivity, workflow stage, and risk tier.
2. **Deterministic applicability:** Resolve effective policy versions, jurisdiction, user capability, evidence class, and mandatory non-AI rules.
3. **Policy retrieval:** Retrieve only the relevant constitutional articles, jurisdiction rules, workflow constraints, definitions, and examples.
4. **Fact and claim extraction:** Convert minimized user content into a structured claim, actor-role, geography, time, evidence, and uncertainty representation.
5. **Specialist evaluations:** Run bounded evaluators for privacy, safety, legality, relevance, evidence, structural framing, moderation, and workflow eligibility. Independent evaluations may run in parallel when their inputs and authority do not depend on each other.
6. **Deterministic aggregation:** Combine typed results using explicit precedence, veto, dependency, confidence, and escalation rules.
7. **Targeted adjudication:** Send only unresolved conflicts, missing facts, or ambiguous rules to a stronger model or qualified human.
8. **User-safe explanation:** Generate an explanation from the structured decision record and cited rule IDs without exposing restricted reasoning or internal risk signals.
9. **Output privacy and policy gate:** Re-screen the final output before display, storage, or publication.

Each stage must be independently testable, replayable against the same approved inputs where provider behavior permits, and replaceable without redesigning the entire pipeline.

#### Hard context budgets

Define a maximum input, output, retrieved-policy, and tool-result budget for every stage and supported model. The orchestrator must estimate tokens before dispatch and refuse to rely on accidental provider truncation.

When material exceeds a stage budget:

- Split by independent claims, documents, jurisdictions, time periods, evidence items, policy families, or workflow questions.
- Use typed partial outputs with source pointers, confidence, unresolved dependencies, and coverage metadata.
- Aggregate partial results deterministically where possible.
- Run a final cross-item consistency pass over structured results rather than all raw source text.
- Escalate when dependencies cross chunks or mandatory rules cannot fit safely.

Never truncate a mandatory rule, exception, legal qualifier, contradiction, denial condition, or evidence source merely to fit a model context. A coverage manifest should show which rules and source segments were considered, omitted, superseded, or escalated.

#### Durable structured state instead of conversational memory

Persist approved intermediate state such as classification, policy selection, claim graph, evidence references, unresolved questions, stage outputs, and decision records in typed application storage. Do not repeatedly resend the full conversation when the next stage needs only a small structured subset.

Conversation history should be summarized into separately reviewable facts and user-approved intent. The system must distinguish user statements, model inferences, retrieved facts, authoritative rules, disputed claims, and prior decisions.

#### Prompt and policy caching

Maximize safe reuse of stable prompt components:

- Keep the system constitution, stage instructions, tool schemas, output schemas, and selected public policy text in stable canonical order so provider prefix caching can apply.
- Separate stable public prefixes from dynamic, user-specific, or restricted suffixes.
- Cache compiled policy packs, embeddings, retrieval indexes, token counts, schema validators, jurisdiction-resolution results, and deterministic rule outputs where valid.
- Use content-addressed keys incorporating stage, prompt version, policy-pack hashes, model and endpoint version, jurisdiction, language, data class, tool schema, and relevant feature flags.
- Define TTL, invalidation, migration, and cache-warming rules for every cache class.
- Invalidate affected entries immediately when a rule, law, policy pack, model, prompt, schema, safety control, or jurisdiction mapping changes.

Provider-side prompt caching must never be assumed to provide privacy, deletion, geographic, or retention guarantees beyond the approved provider agreement.

#### PII-safe cache boundaries

Public constitutional and policy components may be cached broadly. User-specific or restricted content must not share a cache namespace across users, problems, tenants, or purposes unless an approved privacy analysis demonstrates that it is non-identifying and safe.

For sensitive cache entries:

- Prefer not to cache raw input or output.
- Cache minimized structured results when sufficient.
- Encrypt at rest and in transit.
- Scope keys to user, problem, tenant, purpose, policy version, and authorization context as needed.
- Apply short TTLs and explicit deletion propagation.
- Prevent cache timing, key, hit-rate, or error behavior from becoming an identity or content side channel.
- Exclude sensitive material from ordinary logs, traces, analytics, and shared semantic caches.

A cache hit never bypasses current authorization, retention, consent, policy-version, or publication checks.

#### Multi-model inference gateway

Maintain a versioned model registry describing each approved endpoint's:

- Supported tasks and languages
- Quality and calibration by task and risk tier
- Input and output context limits
- Structured-output and tool-use reliability
- Cost and rate limits
- Latency and availability
- Region, retention, training-use, isolation, and subprocessor properties
- Safety and PII-handling approval
- Known failure modes and prohibited data classes
- Current evaluation version and expiry

The gateway should route each stage to the **cheapest eligible model that meets the approved quality, privacy, language, latency, context, and risk thresholds**. Cheapest does not mean lowest token price when retries, review burden, false negatives, long prompts, tool errors, or downstream harm make the total outcome more expensive.

Use an escalation ladder:

1. Deterministic code or cached valid result
2. Small or inexpensive model
3. More capable specialist model
4. Independent verifier or alternative model where required
5. For emergency, crisis and legal cases only: the logged human lane

Escalate on low confidence, disagreement, unsupported language, incomplete policy coverage, schema failure, novel attack patterns, high-risk data, or consequential outcome. Do not repeatedly retry a cheap model when evidence shows that it is not competent for the task.

The gateway must not silently fail over to an endpoint with weaker privacy terms, a different region, unapproved retention, unsupported policy versions, or prohibited data access. Privacy and constitutional eligibility are hard routing constraints, not cost preferences.

#### Evaluation-driven model selection

Create task-specific evaluation suites for intake classification, PII detection, redaction, jurisdiction routing, policy retrieval, moderation, evidence extraction, duplicate detection, structural reframing, translation, summarization, responsibility mapping, timeline extraction, and explanation generation.

Evaluate models using metrics appropriate to each task, including:

- Precision, recall, false-negative rate, and calibration
- Policy-rule coverage and correct exception handling
- Citation and source grounding
- Structured-output validity and schema adherence
- PII leakage and harmful over-redaction
- Multilingual, code-switching, script, dialect, and RTL performance
- Prompt-injection and tool-abuse resistance
- Determinism or stability where required
- Human review time and correction rate
- Latency, retries, token use, cache-hit rate, and total cost per accepted result
- Disparate impact across jurisdictions, languages, affected groups, and political contexts

Set a minimum threshold per task and risk tier. A model that passes low-risk summarization may still be prohibited from privacy classification, legal routing, moderation, or evidence decisions.

Use synthetic, public, licensed, or properly redacted evaluation data. Production examples may enter an evaluation set only through an approved purpose, minimization, retention, access, and deletion process.

#### Continuous routing lifecycle

- Benchmark candidate models offline against the same versioned suite.
- Promote through shadow, canary, bounded rollout, and monitored general availability.
- Compare routed decisions with human outcomes, appeals, reversals, and downstream defects.
- Re-evaluate after model, endpoint, prompt, policy, schema, retrieval, or provider changes.
- Detect quality, cost, latency, and fairness drift.
- Retain rollback to the previous routing policy and model set.
- Expire approvals when evidence becomes stale.

The routing policy, thresholds, evaluation dataset version, and model registry must be auditable. Model selection must not be changed solely through an opaque vendor recommendation or benchmark headline.

#### Cost governance

Track cost by stage, problem, jurisdiction, language, model, retry, cache hit, accepted output, human correction, and verified product outcome. Optimize total cost per safe and accepted decision rather than tokens alone.

Set budgets and alerts for unexpected context growth, cache misses, retry loops, tool recursion, provider price changes, traffic abuse, and stage-level regressions. Any automatic cost cutoff must fail safely to a private draft, deferred processing, deterministic fallback, or human queue rather than silently weakening policy checks.

#### Provider and model policy (D-65)

The provider is OpenRouter through its OpenAI-compatible API. Free (`:free`) models are tried first, then cheap ones. For each decision point the router uses the cheapest registered model that passes that DP's evaluation thresholds, and escalates only on low confidence or an eval failure. The model register records model id, price and per-DP eval score with dates. A 429 or outage backs off and falls through to the next registered model; if all fail the item is held. The default app spend cap is $10 per month, with per-run budgets below it. Free endpoints take synthetic data only; real member content goes only to endpoints with data collection denied. Design: `docs/design/ai/runtime.md`, `docs/design/ai/evaluation.md`.
