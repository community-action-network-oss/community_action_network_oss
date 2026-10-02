# Open questions

This is the register of everything the project has not decided yet. It is community work, not a list of founder blockers: the build keeps going on a stated default while a question stays open, and anyone can help close one.

One file per question, named `OQ-<slug>.md`. Each has an id, the question, why it matters, the current default (what we built meanwhile), the roles that can help, a status and links to the spec sections it touches.

## How to help

1. Pick a question that matches what you know. The "Who can help" line says which skills fit.
2. Read "Current default" so you know what is already assumed, and "What a good answer looks like" so you know how much is being asked.
3. Open a proposal: a short document or pull request that adds a `## Proposal` section to the question file (or a linked file). Keep it bounded and cite sources. Fictional examples are welcome; never include real personal data.
4. Discuss it in the pull request. Say what would change and what could go wrong.
5. Disagree respectfully and with evidence. Popularity does not decide these questions.

You do not need to write code. Most questions need lived experience, legal or domain knowledge, plain-language writing, or careful reading.

## How a question gets resolved

proposal, then discussion, then a founder or governance decision, then it is logged in `DECISIONS.md`.

- Reversible questions: the founder decides, records the decision and its reason in `DECISIONS.md`, and sets the question status to `decided` with a link to the entry.
- Governance questions: they follow the amendment and decision process in `docs/spec/21-open-source-governance.md` and the constitution.
- Questions touching safety, law or privacy also need the qualified reviewer named in the question.
- Until decided, the default stays in force and the code keeps it behind configuration where it can.

Statuses: `open`, `proposed` (a proposal exists), `decided` (resolved and logged), `withdrawn` (no longer relevant, with a reason).

## Adding a question

Copy any existing file. Keep the same headings. Night or agent runs add questions here rather than stopping to ask (`docs/spec/02-agent-rules.md`, "Unattended runs"). Do not write to `DECISIONS.md` from a question file.

## Index

| Question | Summary |
|---|---|
| [OQ-license](OQ-license.md) | Resolved, MIT (D-49): which license should each repository carry? |
| [OQ-domain](OQ-domain.md) | What public name and domain should the project use? |
| [OQ-launch-jurisdiction-language](OQ-launch-jurisdiction-language.md) | Amsterdam is the seed overlay (D-56): is it also the pilot place, and in what language? |
| [OQ-promo-interest-channel](OQ-promo-interest-channel.md) | How can a visitor register interest without handing over personal data? |
| [OQ-emergency-routing](OQ-emergency-routing.md) | Which emergency and crisis resources are shown, per jurisdiction? |
| [OQ-eligible-categories](OQ-eligible-categories.md) | Which kinds of public problem are eligible, and which are excluded? |
| [OQ-visibility-classes](OQ-visibility-classes.md) | Which records are public, limited, auditor-only or transient? |
| [OQ-location-verification](OQ-location-verification.md) | How is a person's connection to an area established and shown? |
| [OQ-decision-method](OQ-decision-method.md) | How are solutions selected, and how are stewardship groups formed? |
| [OQ-legal-policy-reviewers](OQ-legal-policy-reviewers.md) | Who can review and approve jurisdiction policy packs? |
| [OQ-hosting-region](OQ-hosting-region.md) | Where is the first deployment hosted (undecided, but portable, D-57), and which email provider sends sign-in codes? |
| [OQ-draft-ttl](OQ-draft-ttl.md) | Are the draft retention numbers right? |
| [OQ-unsupported-language](OQ-unsupported-language.md) | What happens to submissions in unsupported languages, and which languages come after English? |
| [OQ-legal-data-requests](OQ-legal-data-requests.md) | How does the project answer legal or government requests for data? |
| [OQ-account-deletion-retention](OQ-account-deletion-retention.md) | What happens when someone deletes their account? |
| [OQ-guest-read-search-indexing](OQ-guest-read-search-indexing.md) | Can guests read problems, and may search engines index them? |
| [OQ-age-default](OQ-age-default.md) | What is the minimum age? |
| [OQ-cooldown-lengths](OQ-cooldown-lengths.md) | How long should the reflection delays be? |
| [OQ-security-and-conduct-contact](OQ-security-and-conduct-contact.md) | Where do security and conduct reports go? |
| [OQ-solved-evidence-threshold](OQ-solved-evidence-threshold.md) | What evidence is enough to call a problem solved? |
| [OQ-handle-scope](OQ-handle-scope.md) | One handle per account, or a different pseudonym per problem? |
| [OQ-human-presence](OQ-human-presence.md) | How do we limit bots and fake accounts without collecting identity? |
| [OQ-rights-core-amendment](OQ-rights-core-amendment.md) | How can the protected rights core ever be amended? |
| [OQ-moderation-confidence-threshold](OQ-moderation-confidence-threshold.md) | Withdrawn, superseded by OQ-dp-confidence-thresholds |
| [OQ-founder-stewardship-sunset](OQ-founder-stewardship-sunset.md) | When does transitional founder stewardship end? |
| [OQ-duplicate-handling](OQ-duplicate-handling.md) | Who decides that a problem duplicates another, and can it be contested? |
| [OQ-edit-after-publication](OQ-edit-after-publication.md) | How can published text be edited without hiding history? |
| [OQ-moderator-signin](OQ-moderator-signin.md) | Should emergency/legal lane members, auditors and policy maintainers use a stronger sign-in factor? |
| [OQ-moderator-pool-size](OQ-moderator-pool-size.md) | How big must the emergency/legal lane, auditor and labeler pools be? |
| [OQ-native-device-testing](OQ-native-device-testing.md) | Who can test native-only behaviour on real devices? |
| [OQ-handle-word-lists](OQ-handle-word-lists.md) | Are the handle word lists acceptable across cultures? |
| [OQ-review-wait-statement](OQ-review-wait-statement.md) | How should the review wait be stated honestly? |
| [OQ-evidence-tier-plain-language](OQ-evidence-tier-plain-language.md) | How do we explain evidence tiers and the investigation flag to ordinary people? |
| [OQ-ratification-method](OQ-ratification-method.md) | How are policy changes ratified, and what is the quorum? |
| [OQ-policy-retroactivity](OQ-policy-retroactivity.md) | Do policy changes apply to content already published? |
| [OQ-model-provider-spend-cap](OQ-model-provider-spend-cap.md) | Which model provider and spend cap for live calls? |
| [OQ-dp-confidence-thresholds](OQ-dp-confidence-thresholds.md) | What confidence threshold applies at each decision point? |
| [OQ-policy-pr-rights](OQ-policy-pr-rights.md) | Who may open policy PRs, and who maintains can_policy? |
| [OQ-replay-diff-sample-size](OQ-replay-diff-sample-size.md) | How large must a replay diff sample be? |
| [OQ-label-task-panel](OQ-label-task-panel.md) | How big is a label-task panel, and how is it randomized? |
| [OQ-bias-monitoring](OQ-bias-monitoring.md) | How is moderation bias monitored across jurisdictions? |
| [OQ-content-schema-design](OQ-content-schema-design.md) | Who designs the v1 content schemas, and how are they kept sound? |
| [OQ-graduation-criteria](OQ-graduation-criteria.md) | Are graduation criteria G1 to G13 the right bar for opening public participation? |
| [OQ-persona-realism-bias](OQ-persona-realism-bias.md) | How realistic and how unbiased are the AI personas? |
| [OQ-reremoderation-grace](OQ-reremoderation-grace.md) | How long is the grace period when a policy change flips a published item? |
| [OQ-lane-oversight](OQ-lane-oversight.md) | Who oversees the emergency and legal lane? |
| [OQ-amsterdam-overlay-review](OQ-amsterdam-overlay-review.md) | Who reviews the Amsterdam overlay, and which local partners help? |
| [OQ-steward-entity-grants](OQ-steward-entity-grants.md) | May a steward entity receive grants without breaking the non-monetary rule? |
| [OQ-mera-disclosure](OQ-mera-disclosure.md) | Must hosting or links from Mera be disclosed? |
| [OQ-news-ledger](OQ-news-ledger.md) | Should the news pipeline become a self-hostable, shared node service? |
| [OQ-limits](OQ-limits.md) | What per-account limits apply to posting and appeals? |
| [OQ-legal-corpus-sourcing](OQ-legal-corpus-sourcing.md) | Who curates and verifies the legal corpus for each layer, and how often does it update? |
| [OQ-legal-layer-conflicts](OQ-legal-layer-conflicts.md) | What happens when human rights (L1) conflict with national law (L3 or L4)? |
| [OQ-supranational-default](OQ-supranational-default.md) | Is the binding supranational layer (L2) the right default, and for which jurisdictions? |
| [OQ-reresolution-feasibility](OQ-reresolution-feasibility.md) | When is reopening a past resolution feasible? |
| [OQ-review-quorum](OQ-review-quorum.md) | How many volunteer reviews, or how long, before the publication decision can run? |
| [OQ-stage-decision-method](OQ-stage-decision-method.md) | How is the choice inside a stage made, and who may override the default? |
| [OQ-trusted-sources](OQ-trusted-sources.md) | What makes a cited URI a trusted source? |
| [OQ-reviewer-eligibility](OQ-reviewer-eligibility.md) | Who may be a volunteer reviewer, and what conflict rules apply? |
| [OQ-impacted-label-web](OQ-impacted-label-web.md) | What should the impacted label say on web while the check is self-asserted? |
| [OQ-h3-resolution](OQ-h3-resolution.md) | What cell size and minimum area size protect people? |
| [OQ-boundary-data](OQ-boundary-data.md) | Which boundary data and licence define affected areas? |
| [OQ-impact-decision-weight](OQ-impact-decision-weight.md) | May the impacted label ever carry decision weight? |
| [OQ-zk-setup](OQ-zk-setup.md) | Which proof system setup suits a contributor-run project? |
| [OQ-contribution-license](OQ-contribution-license.md) | Under what license is contributed content offered? |
| [OQ-archive-retention](OQ-archive-retention.md) | How do withdrawal and account deletion interact with a permanent archive? |
| [OQ-cross-language-reuse](OQ-cross-language-reuse.md) | How does reuse work across languages? |
| [OQ-capability-taxonomy](OQ-capability-taxonomy.md) | Which plain-language groups describe what people know? |
| [OQ-profile-multi-device](OQ-profile-multi-device.md) | How does a capability profile move between devices without a sync server? |
| [OQ-match-notify-channel](OQ-match-notify-channel.md) | How does a person hear about matching problems without the server learning interests? |
| [OQ-help-needed-tags](OQ-help-needed-tags.md) | How strictly is help_needed checked? |

Related: [spec index](../spec/00-index.md), [constitution](../spec/constitution/README.md), [decision log](../../DECISIONS.md), [design](../design/), [ADRs](../adr/).
