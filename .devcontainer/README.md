# Devcontainer

Status: untested in a container. Nobody has built this yet; treat the first build as the test and fix what breaks.

## When to use it

You prefer containers or a hosted dev environment (for example GitHub Codespaces) and want no local installs. It gives Node 24, Python 3, the Docker CLI and the ESLint, Prettier and EditorConfig extensions. After creation it runs `bash scripts/bootstrap.sh`, the same one-command setup as a local machine.

No paid AI tool is required.

## Known limits

- Submodule URLs are relative (`../<name>.git`), so they resolve only when the superproject was cloned from a remote. A local-only copy without a remote cannot fetch submodules.
- Docker is reached through docker-outside-of-docker. The can_server database (compose) works only if the host Docker daemon is available to the container. If it is not, run `bash scripts/bootstrap.sh --no-docker`; the gallery and app need no Docker.
- Forwarded ports: 3000 (gallery), 8081 (app), 8025 (mail UI), 5433 (Postgres).
