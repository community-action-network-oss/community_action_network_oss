# ADR 0001: Superproject with three submodules and bare sibling remotes

- Status: Accepted, 2026-10-01 (D-1, D-2)
- Deciders: founder; recorded by design agent A3

## Context
The build spec (section 14) proposed one monorepo (`apps/`, `services/`, `packages/`). The founder said a monorepo is not necessary and asked for three repos: server (NestJS), app (Expo), promo site (Next.js), under one superproject that holds the spec, plans, decisions and design. There is no GitHub owner yet and no `gh` CLI.

## Decision
The superproject has three git submodules: `can_server`, `can_app`, `can_promo_site`. Each is its own repo with its own history, verify script and CI. Submodule URLs are relative (`../can_server.git`), pointing at bare repos created as siblings of the superproject directory. The same relative URLs resolve on a hosting service once all four repos live under one owner. The monorepo option is dropped, not debated here.

## Consequences
- Independent tooling and release cadence per repo; contributors clone only what they need.
- Cross-repo changes need two commits and a pointer bump; the contract flow (ADR 0002) keeps that rare.
- Only one agent (the root agent) writes `.gitmodules` and gitlinks, to avoid index conflicts.
- Shared code has no home yet. Domain rules stay in `can_server`; tokens live in the superproject design pack and are copied by build step.

## How to reverse
Vendor the three repos into the superproject (`git submodule deinit`, remove gitlinks, copy trees in) or merge them with `git subtree`. Remove the bare repos. No data format depends on the layout.
