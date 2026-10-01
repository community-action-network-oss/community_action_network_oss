# Contributing to CAN

Thank you for helping. CAN is at the concept and scaffolding stage, so careful small contributions matter more than big ones.

## Ways to help

- **Code:** server, app or promo site work units from `plans/`.
- **Design:** tokens, screens and accessibility under `docs/design/`.
- **Docs:** fix unclear or wrong text in `docs/spec/`, READMEs and ADRs.
- **Open questions:** answer or sharpen an `OQ-*.md` in `docs/open-questions/`. Add evidence, options and trade-offs.
- **Review:** read open pull requests and say what you checked.

## Setup

1. Clone with submodules. The repository is not hosted yet, and submodule URLs are relative (`../<name>.git`), so they resolve once all four repos are pushed under one host. Today you clone from a local copy: `git -c protocol.file.allow=always clone --recurse-submodules /path/to/community_action_network_oss` (or `git -c protocol.file.allow=always submodule update --init` afterwards). The setting is needed only for local-path clones, because git blocks the file transport for submodules by default.
2. Install Node 24 or newer, Docker and Python 3.
3. Follow the Quick start in [README.md](README.md).
4. Run `scripts/verify-all.sh`. It should be green before you change anything.

Each submodule has its own README and `npm run verify`. Run it before every commit.

## Picking work from plans/

Units in `plans/` are sized at about one hour. Read the unit file, follow its spec links, and load the matching area skill under `.claude/skills/` (`can-server`, `can-app`, `can-promo-site`, `can-spec`), which holds the rules for that area. The files in `.claude/skills/` are guides for AI agents and humans alike. Format is in `plans/FORMAT.md`; lint it with `node plans/tools/corpus.mjs lint`. Status is maintained by maintainers: do not edit it. Open a pull request that references the unit id (for example in the title) and the maintainers will update status.

## Commit conventions

- Small, focused commits. One idea each.
- Tests green and `npm run verify` passing in every touched repo. Never commit a red build.
- No em or en dashes in user-facing copy.
- Do not hand-edit generated files (`openapi/openapi.json`, `drizzle/`, `src/api/schema.d.ts`).
- Founder-operated agents follow the pipeline in `docs/spec/02-agent-rules.md`: they commit only to `night/*` branches and the founder merges. This does not apply to or relax anything for other contributors.

## Submodule workflow

The three apps are separate git repositories mounted in this one.

1. Make and commit your change inside the submodule (`can_server/`, `can_app/` or `can_promo_site/`).
2. Back in the root, `git add -- <submodule>` and commit the pointer bump. Only maintainers merge pointer bumps to `main`.
3. Contract order: when the API changes, `can_server` regenerates `openapi/openapi.json` (`npm run openapi`) and commits it first. Then `can_app` runs `npm run gen:api` to rebuild its client.

## AI-assisted contributions

The full policy is `docs/spec/22-ai-contribution-policy.md`. Summary:

- A human is accountable for every change: correctness, tests, security, privacy, licensing, accessibility. You must understand it and explain it in your own words.
- Disclose AI use in the pull request: tool, model if known, how it was used, what you verified, what you are unsure of. Do not share secret prompts.
- AI output is untrusted input. Review and test it before maintainers see it.
- No unattended, bulk, unsolicited or mechanically generated issues or pull requests. These may be closed without detailed review.
- Do not weaken or delete tests to pass. AI-written commit messages, fabricated reproductions and unverified security reports are not accepted.
- AI review is advisory. It never replaces a required human approval, and nothing merges itself.
- High-risk areas (auth, privacy, moderation, identity, protocol, migrations, constitution) need designated human reviewers.
- Never send secrets, private evidence, personal data or restricted material to a hosted AI service.

### Affordable tool setup

Snapshot from the spec at commit 7f61360. It may date: prices, licenses, data use and availability change. Listing a tool is not an endorsement or a promise it is free. You can contribute manually, with a paid assistant, a cheaper hosted model, or a local model.

- Cline: open-source coding agent with provider choice and reviewable diffs
- OpenCode: open-source terminal, desktop and IDE coding agent with many provider and local-model options
- Aider: open-source terminal pair programmer supporting hosted and local models
- GitHub Models: model experimentation with a limited free access path
- Kimi K2 and the Kimi API: openly available model weights and compatible hosted access, subject to current terms
- DeepSeek models and the DeepSeek API: model and hosted API options, subject to current terms
- Ollama: local-model execution where your hardware is sufficient

Reference policies the project drew on (snapshot, may date):

- Python Developer Guide, guidelines for using AI tools: contributor understanding, focused changes, test integrity
- NumPy AI Policy: mandatory disclosure, contributor explanation, human-authored context
- Kubernetes, open source maintainership in the age of AI: disclosure, verification, limits on large generated pull requests
- Apache Software Foundation Generative Tooling Guidance: originality, copyright, third-party licensing
- OpenInfra Policy for AI Generated Content: generated code is untrusted, human in the loop
- Open edX AI Contribution Policy: contributor and reviewer guidance, maintainer-load protection
- scikit-learn Automated Contributions Policy: no fully automated submissions
- KubeVirt AI Contribution Policy: disclosure conventions, DCO obligations, policy lifecycle
- Apache Airflow pull-request template: a practical AI disclosure field
- Open Source Guides, How to Contribute: general contribution quality
- Gentoo AI Policy and NetBSD Commit Guidelines: strict-policy reference points
- Scientific Python, community considerations around AI contributions: maintainer capacity and culture
- Open-source AI contribution policy collection: a living cross-project reference set

## How decisions are made

- `DECISIONS.md` logs every default and judgment call with how to reverse it. It is binding until changed. Only maintainers edit it.
- Significant technical choices get an ADR in `docs/adr/`.
- Questions nobody can answer yet become `OQ-*.md` files in `docs/open-questions/`. Add your reasoning there, or open a pull request with a new one. A maintainer records the outcome in `DECISIONS.md` and, where needed, an ADR.

## Review expectations

Expect a human reviewer to look at intent, design, test quality and risk, not only whether CI is green. Keep pull requests small so review is quick. Respond to review in your own words. Maintainers may ask you to split, reduce or add a design note before review continues.

## Conduct and security

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md): report vulnerabilities privately, never in public issues.
