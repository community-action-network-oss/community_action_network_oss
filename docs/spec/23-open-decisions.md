## 21. Open questions and reserved decisions

Every unresolved question lives in `docs/open-questions/`, one file per question, each with its current default. This file is only the map from the original question list to those files. The register's README explains how anyone can help resolve one.

Questions are not founder blockers. For each, the build continues on the stated default (`01-slice-1-brief.md`). Decision taxonomy: `21-open-source-governance.md`, "Decision process".

### Critical before architecture (original list)

| Original question | Register entry |
|---|---|
| Existing repository, code, infrastructure, budget, accounts | answered by the three repositories (`11-architecture.md`); budget and accounts are founder matters |
| Country or jurisdiction and language of the first pilot | `OQ-launch-jurisdiction-language` |
| First users and problem category | `OQ-eligible-categories`, `OQ-launch-jurisdiction-language` |
| Public, invitation-only, organization-based, or small geography | slice 1 is invite-only writes, public reads (`01-slice-1-brief.md`) |
| Which records are public, limited, moderator-only or transient | `OQ-visibility-classes`, `OQ-guest-read-search-indexing` |
| Location verification | `OQ-location-verification` |
| Legal and safety experts | `OQ-legal-policy-reviewers` |
| Actions that need human moderation before publication | slice 1: all of them are decided by a moderation run, never by a person per item (`01-slice-1-brief.md`); thresholds in `OQ-dp-confidence-thresholds` |
| Hosting region, budget | `OQ-hosting-region` |
| Open-source license: resolved, MIT (D-49) | `OQ-license` |
| Production actions the agent may perform | `02-agent-rules.md` |

### Critical before workflow implementation

| Original question | Register entry |
|---|---|
| Eligibility and ineligibility criteria; categories and exclusions | `OQ-eligible-categories` |
| Emergency and imminent-harm routing | `OQ-emergency-routing` |
| Participation radius and visitor limits | `OQ-location-verification` |
| Expert verification and expiry | deferred (`04-roles-stewardship.md`) |
| Decision and legitimacy model | `OQ-decision-method`, `OQ-stage-decision-method` |
| Volunteer review: quorum, eligibility, trusted sources | `OQ-review-quorum`, `OQ-reviewer-eligibility`, `OQ-trusted-sources` |
| Meaning and evidence threshold for `solved` | `OQ-solved-evidence-threshold` |
| Appeal stages and reviewer independence | `OQ-moderator-pool-size`, `01-slice-1-brief.md` (section 5) |
| Retention, account deletion, public-record expectations | `OQ-draft-ttl`, `OQ-account-deletion-retention`, `OQ-edit-after-publication` |
| Pseudonyms and identity disclosure | answered: pseudonyms are allowed (`01-slice-1-brief.md`, section 8). Scope of a handle: `OQ-handle-scope` |

### Important before pilot

| Original question | Register entry |
|---|---|
| Brand, domain, visual identity, tone | `OQ-domain` |
| Notification channels and consent model | slice 1 is email only with opt-in consent (`NOTIFY-CONSENT-1`); `OQ-hosting-region` covers the real email provider |
| Analytics restrictions | none in slice 1 (no analytics) |
| Service-level objectives, support model | planned (`16-security-a11y-ops-testing.md`) |
| Pilot size, success thresholds, exit criteria | planned (`18-phases-gates.md`) |
| Moderation staffing and escalation hours | `OQ-moderator-pool-size`, `OQ-moderator-signin` |
| Policy transparency and public audit | `constitution/` and `DECISIONS.md` |

### Critical before systemic or election accountability

These belong to Phases 7 and 8 and have no register entries yet. They are listed so nobody mistakes them for forgotten:

- Parent and child problem-linking rules and aggregation thresholds
- Evidence categories that remain external or restricted; source, provenance, contradiction, correction and retention policy
- Institutional responsibility and term-attribution standard
- Community-controlled, public, hybrid and temporary implementation authority rules; public asset, contractor, procurement, funding and safety policy
- Criteria and governance for prominent public-problem views
- Whether and where verified public candidates and officeholders may be named
- Election-law, defamation, data-protection and political-neutrality review capacity
- Candidate response, correction, appeal and equal-treatment guarantees
- Voter-brief boundaries and the prohibition on endorsements or targeted persuasion
- Conditions under which the election layer must remain disabled (`08-election-accountability.md`)

### Reserved product and governance decisions

The founder and the approved governance process decide these. Contributors may propose alternatives and experiments. Community preference, design contests or visual popularity cannot settle them.

| Decision | Register entry |
|---|---|
| What becomes public | `OQ-visibility-classes` |
| Moderation thresholds | `OQ-moderation-confidence-threshold` |
| Who participates in decisions; affected-party influence | `OQ-decision-method`, `OQ-location-verification` |
| Location verification | `OQ-location-verification` |
| Reputation consequences | deferred (Constitution VII) |
| Identity requirements | `OQ-human-presence`, `OQ-handle-scope` |
| Appeal rights | `OQ-moderator-pool-size` |
| Evidence thresholds | `OQ-solved-evidence-threshold`, `OQ-evidence-tier-plain-language` |
| What qualifies as solved | `OQ-solved-evidence-threshold` |
