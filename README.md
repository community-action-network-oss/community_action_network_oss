# Community Action Network (CAN)

CAN is an open-source platform where people surface a real public problem, bring evidence, work out what is causing it, propose lawful solutions, track who does what, and check whether it worked. Problem, evidence, lawful solution, tracked outcome. Read the full [manifesto](manifesto.md) for the why.

## Where we are

Concept and scaffolding. The specification, the constitution, the design system and three repositories exist. Nothing handles real problems yet. The server has a health endpoint, an append-only event table and an OpenAPI contract. The app is a shell that shows whether the server is reachable. The promo site is a static page. Everything else is a plan, and we label it as planned.

## Repo map

| Path | What it is |
| --- | --- |
| `can_server/` | Submodule. NestJS 12, Drizzle, Postgres. Owns the API contract (`openapi/openapi.json`). |
| `can_app/` | Submodule. Expo (web, iOS, Android) app. Builds its typed client from the server contract. |
| `can_promo_site/` | Submodule. Next.js static promo site. |
| `docs/spec/` | The specification, split into files of 25KB or less. Start at `00-index.md`. |
| `docs/spec/constitution/` | The constitution, chapters I to XI, with a rules list and checkers. |
| `docs/design/` | Design system, UX tokens and screens, with a checker. |
| `docs/adr/` | Architecture decision records. |
| `docs/open-questions/` | Open questions the community can help answer (`OQ-*.md`). |
| `plans/` | Work units of about one hour each, plus the tool that lints them. |
| `DECISIONS.md` | Log of every default and judgment call, each reversible. |
| `scripts/` | `verify-all.sh` runs every check in the repo. |

## Quick start

Prerequisites: Node 24 or newer, Docker, Python 3.

```sh
git clone --recurse-submodules <repo-url> community_action_network_oss
# already cloned without submodules? git submodule update --init
```

Server (http://localhost:4000/health, Swagger at /docs):

```sh
cd can_server
npm install && cp .env.example .env
docker compose up -d --wait
npm run db:migrate
npm run start:dev
```

App on Expo web (http://localhost:8081, needs the server running):

```sh
cd can_app
npm install
npm start
```

Promo site (http://localhost:3000): see `can_promo_site/README.md` for the exact commands.

Check everything:

```sh
scripts/verify-all.sh
```

## How to contribute

Code, design, docs, open questions and review are all welcome. Pick a unit from `plans/`, read its spec links, make a small focused change with green tests, and open a pull request. If you used an AI tool, say so. The full process is in [CONTRIBUTING.md](CONTRIBUTING.md). Please also read the [Code of Conduct](CODE_OF_CONDUCT.md) and [SECURITY.md](SECURITY.md).

## License

License not yet chosen, see `docs/open-questions/OQ-license.md`. Until it is chosen, no license is granted for reuse.
