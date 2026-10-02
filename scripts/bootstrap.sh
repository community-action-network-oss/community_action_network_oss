#!/usr/bin/env bash
# One-command local setup. Never uses sudo, never installs system packages.
# Usage: scripts/bootstrap.sh [--check] [--no-docker] [--verify] [--help]
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
check=0; docker_on=1; verify=0
for a in "$@"; do
  case "$a" in
    --check) check=1 ;;       # report only, change nothing
    --no-docker) docker_on=0 ;;
    --verify) verify=1 ;;     # run scripts/verify-all.sh at the end
    --help|-h)
      echo "usage: bootstrap.sh [--check] [--no-docker] [--verify] [--help]"
      echo "  --check      report tool versions and what would run; change nothing"
      echo "  --no-docker  skip the can_server database (gallery and app need no Docker)"
      echo "  --verify     run scripts/verify-all.sh when setup finishes"
      echo "Windows: use WSL."
      exit 0 ;;
    *) echo "unknown flag: $a (try --help)" >&2; exit 2 ;;
  esac
done

hard_missing=0
have() { command -v "$1" >/dev/null 2>&1; }
need() { # name, fix hint; counts toward exit code
  if have "$1"; then echo "ok    $1: $("$1" --version 2>&1 | head -n1)"
  else echo "MISS  $1: $2"; hard_missing=1; fi
}

echo "== tools"
need git "install git (macOS: xcode-select --install; Debian/Ubuntu: sudo apt install git)"
if have node; then
  major="$(node -p 'process.versions.node.split(".")[0]')"
  if [ "$major" -ge 24 ]; then echo "ok    node: $(node -v)"
  else echo "MISS  node: $(node -v) is older than 24; install Node 24+ (https://nodejs.org or nvm install 24)"; hard_missing=1; fi
else
  echo "MISS  node: install Node 24+ (https://nodejs.org or nvm install 24)"; hard_missing=1
fi
if have npm; then echo "ok    npm: $(npm -v)"
else echo "MISS  npm: it ships with Node 24+; reinstall Node"; hard_missing=1; fi
if have python3; then echo "ok    python3: $(python3 --version 2>&1)"
else echo "WARN  python3: needed by docs/design/check.py; install Python 3"; fi
docker_ok=0
if [ $docker_on -eq 0 ]; then echo "skip  docker: --no-docker"
elif have docker && docker compose version >/dev/null 2>&1; then
  if docker info >/dev/null 2>&1; then docker_ok=1; echo "ok    docker: $(docker --version); $(docker compose version | head -n1)"
  else echo "WARN  docker: installed but the daemon is not running; start Docker Desktop. can_server setup skipped"; fi
else echo "WARN  docker/compose: missing; only can_server needs it. Install Docker Desktop or Docker Engine + compose plugin"; fi

if [ $hard_missing -ne 0 ]; then echo "Fix the MISS lines above and rerun." >&2; exit 1; fi

step() { # description, command...
  if [ $check -eq 1 ]; then echo "would: $1"; else echo "== $1"; shift; "$@"; fi
}

echo "== setup"
step "git submodule update --init" git -C "$ROOT" submodule update --init
for sub in can_server can_app can_gallery can_policy; do
  if [ $check -eq 0 ] && [ ! -f "$ROOT/$sub/package.json" ]; then echo "skip  $sub: no package.json"; continue; fi
  # --check cannot tell yet before submodules exist; list what is on disk
  [ $check -eq 1 ] && [ ! -f "$ROOT/$sub/package.json" ] && { echo "skip  $sub: no package.json (would exist after submodule init)"; continue; }
  step "npm ci in $sub" npm --prefix "$ROOT/$sub" ci
done
if [ $docker_ok -eq 1 ] && [ -f "$ROOT/can_server/docker-compose.yml" ]; then
  step "docker compose up -d --wait (can_server)" docker compose -f "$ROOT/can_server/docker-compose.yml" up -d --wait
fi

if [ $verify -eq 1 ]; then
  step "scripts/verify-all.sh$([ $docker_ok -eq 0 ] && echo ' --skip-server')" \
    bash "$ROOT/scripts/verify-all.sh" $([ $docker_ok -eq 0 ] && echo --skip-server)
fi

echo
echo "Next: read docs/onboarding/README.md (if present) and CONTRIBUTING.md, then pick a unit."
echo "Check everything any time with: scripts/verify-all.sh"
