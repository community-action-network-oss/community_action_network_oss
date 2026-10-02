# Release and versioning policy

How the four CAN repositories and the superproject are versioned and released. Binding decisions are in `DECISIONS.md`; this file does not reopen them. The fields every release records come from `docs/spec/21-open-source-governance.md` ("Continuous release and review rhythm"), and the template is [release-record-template.md](release-record-template.md).

## Nothing publishes by default

Cutting a release means writing a record and creating a git tag. It never publishes to a package registry, app store or host, and never deploys. Any publish or deploy needs a founder gate (D-64). Night runs and agents never tag, push or release; a maintainer does, by hand. This policy sets up no CI release job and no registry.

## Versions

| What | Scheme | Tag | Notes |
| --- | --- | --- | --- |
| `can_server`, `can_app`, `can_gallery` | Semantic versioning, `0.MINOR.PATCH` | `vX.Y.Z` | Stay on `0.x` until a founder decision says 1.0. Breaking changes bump MINOR while on `0.x`. |
| OpenAPI contract | Follows `can_server` | none of its own | The server owns the contract ([ADR 0002](../adr/0002-server-owned-openapi.md)); the app client is generated from it. |
| Protocol | Separate number, starts at `0.1` | none yet | Recorded as `protocol_version` (D-22). `0.1` is published in the growth phase of the timeline in `docs/spec/18-phases-gates.md`. A protocol change needs a versioned protocol proposal (`docs/spec/21-open-source-governance.md`). |
| `can_policy` packs | Own versioned `release.json` plus ratification records | per that repo | Not duplicated here. See the `can_policy` README and its `ratifications/` folder; a policy release follows the pack process, not this one. |
| Superproject | Calendar status release | `status-YYYY-MM` | Monthly. It records which commit each submodule points at. It is a status marker, not a semantic version. |

## Who and in what order

- Only maintainers cut releases and merge pointer bumps (`CONTRIBUTING.md`). Contributors and agents propose; they do not tag.
- Order: `can_server` first (contract), then the `can_app` client regenerated from it, then `can_gallery` and `can_policy` as needed, then the superproject pointer bump and its `status-YYYY-MM` tag. Push each submodule's `main` before the superproject so the pointer resolves for clones (see the `can-root` skill).
- Cadence: monthly, matching the rhythm in `docs/spec/21-open-source-governance.md` and the routine window in [dependency-updates.md](dependency-updates.md). Security fixes are released out of band.

## The release record

Every release, including a `status-YYYY-MM` tag, has a record in the pull request or tag message built from [release-record-template.md](release-record-template.md). All eight fields are required; write "none" rather than leaving one out.

## Rollback

- Revert the pointer bump in the superproject and redeploy the previous tag. Do not rewrite or delete published tags.
- Database migrations are forward only. A release may be rolled back past a migration only if its record documents a down path and it was tested.
- Every record states its own rollback procedure; a release without one is not ready.

## Changelog

Commit history is the changelog source. Messages that say what changed and why feed the gallery's what is new page (`plans/06-gallery-phase-0a/u07-whats-new.md`), so write them for a reader outside the team.
