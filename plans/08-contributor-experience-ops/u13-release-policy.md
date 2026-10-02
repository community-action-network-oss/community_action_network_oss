---
id: "08-u13"
plan: "08"
title: "Release and versioning policy"
repo: "."
area: "can-root"
model: sonnet
est_hours: 1
priority: 130
depends_on: []
writes: ["docs/policy/releases.md","docs/policy/release-record-template.md"]
spec: ["docs/spec/21-open-source-governance.md","docs/spec/12-decentralization-ready.md","docs/adr/0002-server-owned-openapi.md","DECISIONS.md"]
verify: ["node -e \"for(const f of ['docs/policy/releases.md','docs/policy/release-record-template.md'])if(require('fs').statSync(f).size>25000)throw new Error(f)\"","node plans/tools/corpus.mjs lint"]
founder_gate: false
defaults: "Pre-1.0 semantic versions per repo, calendar-named superproject status releases, nothing publishes to a registry."
status: done
attempts: 0
commits: ["a444cf7"]
actual_hours: 0.1
---

## Objective

Define how the three repos and the superproject are versioned and released, using the release record fields in docs/spec/21, without publishing anything.

## Steps

1. Policy: each repo uses semantic versioning `0.MINOR.PATCH` until a founder decision says 1.0, with tags `vX.Y.Z`. The superproject cuts a monthly release-status tag `status-YYYY-MM` that records submodule pointers. The OpenAPI contract version follows can_server. The protocol version is separate and starts at `0.1` per the timeline in docs/spec/18, tracked as `protocol_version` (D-22).
2. Who may cut a release (maintainers), the pointer-bump rule (only maintainers merge, CONTRIBUTING.md), the order (server contract, then app client, then superproject), and that nothing is published to any registry, store or host without a founder gate.
3. Release record template with the eight fields from docs/spec/21: what changed, which problem it addresses, evidence it works, known limitations, security and privacy implications, migration requirements, rollback procedure, contributors recognized.
4. Rollback: revert pointer bump, redeploy previous tag; migrations are forward only unless a down path is documented in the record.
5. Changelog source: commit history feeds the gallery what is new page (plan 06 unit 07).

## Acceptance

- Both files are under 25 KB.
- Every field of the spec release record appears in the template.
- The policy says nothing is published or deployed by default.

## Out of scope

- Tagging or releasing anything.
- CI release jobs.
- Package registry setup.
