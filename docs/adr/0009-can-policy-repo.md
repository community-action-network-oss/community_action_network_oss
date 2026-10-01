# ADR 0009: `can_policy` is the fifth repository

- Status: Accepted, 2026-10-01 (D-52). Extends [0001](0001-submodule-layout.md).

## Context
If policy is what the community legislates, it needs a home with history, review and CI: not a folder inside the server, and not config edited in production. Rules live today in `docs/spec/constitution/rules.md`.

## Decision
- A fifth submodule, `can_policy`, holds policy packs: `packs/base`, `packs/constitution`, `packs/jurisdictions/<id>`, `packs/local/<id>`, `decision-points/<DP>/{prompt.md, schema.json, examples/, eval/}`, `ratifications/`, `CHANGELOG.md`.
- Changes arrive only as pull requests. CI runs schema lint, eval against labeled sets, and replay diff (against fixtures). Ratification, staged rollout and rollback follow `docs/design/ai/amendment-loop.md`.
- Versions are semver plus a content hash. The server loads packs by version and hash, refuses unratified or expired packs, and records `policy_version` and `prompt_hash` on every decision.
- RULE-IDs move from the superproject registry into the repo over time; until then the registry is the source and slice-1 fixtures sit with the server tests.
- Creating the GitHub repo and wiring the submodule is a founder-gated plan unit, because the remote must exist first. Same license as the others (MIT, D-49).

## Consequences
- Moderation changes are public, reviewable and revertible like code.
- A fifth repo adds wiring (`.gitmodules`, bare sibling remote, verify-all).
- Server depends on a pack version pin; policy releases do not require a server release.

## How to reverse
Move `can_policy` contents into a folder in the superproject (`policy/`), keep the same layout and loader contract, and remove the submodule.
