# 02 Run it

You need Git, Node 24 or newer, npm and Python 3. Docker is needed only for the `can_server` database. Windows users: use WSL.

## Clone

```sh
git clone --recurse-submodules https://github.com/community-action-network-oss/community_action_network_oss.git
```

Already cloned without submodules? Run `git submodule update --init`. Note that `can_policy` may not be on GitHub yet, so that one submodule can fail to fetch from a fork; the other four still work.

## One command setup

```sh
bash scripts/bootstrap.sh --check     # report only, changes nothing
bash scripts/bootstrap.sh             # init submodules, install, start the database
bash scripts/bootstrap.sh --no-docker # skip the database (gallery and app need no Docker)
bash scripts/bootstrap.sh --verify    # run the full check at the end
```

It never uses sudo and never installs system packages. A dev container is also provided in [.devcontainer](../../.devcontainer/README.md) and reuses the same script.

## Run the check

```sh
bash scripts/verify-all.sh
```

Useful flags: `--docs-only` (no Docker or npm, only doc and plan checks), `--skip-server` (skip `can_server` and its Docker), `--e2e` (reserved). The check should be green before you change anything. If it is red on a clean checkout, open a bug issue with the output.

## What each repo runs

Each repo has its own README and its own `npm run verify`. Run it inside the repo you touched, using `npm --prefix <repo> run verify` from the root.

| Repo | `verify` covers |
|---|---|
| `can_server` | lint, tests, OpenAPI contract, migrations (needs Docker) |
| `can_app` | types, lint, formatting, tests, a web export |
| `can_gallery` | synced docs check, tests, lint, types, static build |
| `can_policy` | lint, parity check, tests |

The root also checks plans, spec, constitution and design docs. For a live development stack run `npm start` at the root (database, server, gallery and app with prefixed logs).

Next: [03 Pick work](03-pick-work.md).
