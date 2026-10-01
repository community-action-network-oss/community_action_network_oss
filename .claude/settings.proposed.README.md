# Proposed permissions for unattended night runs

`settings.proposed.json` is a proposal. It is not active. To activate it, review it, then rename it to `.claude/settings.json` (or merge the `permissions` block into your existing one).

Deny rules take precedence over allow rules. That matters for `git -C:*`, which is allowed so agents can work in each submodule, while `git -C * push:*` is denied.

## Allow

| Rule | Why |
| --- | --- |
| `npm run`, `npm ci`, `npm install` | verify, build, test, generate scripts in each repo |
| `npx expo`, the two pinned `openapi-typescript` forms | app export and the generated API client, pinned versions only |
| `node plans/tools/corpus.mjs`, `node docs/*`, `python3 docs/design/check.py` | plan lint and doc checkers |
| `docker compose`, `docker info`, `docker ps` | server lane Postgres and Mailpit, and the Docker preflight |
| `git -C`, `git status`, `git diff`, `git log` | only-mode commits and inspection in each repo (see precedence note) |
| `sleep`, `date`, `ls`, `mkdir`, `lsof` | waiting, timestamps, listing, finding ports to kill dev servers |
| `curl http://localhost:*` | health checks against local dev servers |
| `caffeinate` | keeps the machine awake overnight |
| `Edit`, `Write` | writing code and docs |

## Deny

| Rule | Why |
| --- | --- |
| `git push`, `git -C * push` | remotes are local bare repos and pushing is a morning human step |
| `npm publish`, `npx eas`, `eas`, `npx expo publish`, `docker push` | no publishing or deploying from a night run |
| `curl https://*`, `curl http://[!l]*` | best effort block on non-localhost fetches. Patterns are glob prefixes, so a creative command line can slip past. Treat as a guard rail, not a sandbox. |
| `rm -rf /*` | catastrophic delete |

Note: the first run of a pinned `npx` package fetches from the npm registry. That is allowed by the pinned rules above.
