#!/usr/bin/env bash
# Runs every check in the repo and summarizes. Exit 1 if any fail.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
pass=(); fail=(); skip=()
docs_only=0; e2e=0; skip_server=0
for a in "$@"; do
  case "$a" in
    --docs-only) docs_only=1 ;;   # no docker, no npm: doc and plan checks only
    --e2e) e2e=1 ;;               # reserved
    --skip-server) skip_server=1 ;; # skip can_server (and its docker) only
    *) echo "usage: verify-all.sh [--docs-only] [--e2e] [--skip-server]" >&2; exit 2 ;;
  esac
done

run() { # name, command...
  local name="$1"; shift
  echo "== $name"
  if "$@"; then pass+=("$name"); else fail+=("$name"); fi
}

for sub in can_server can_app can_gallery can_policy; do
  [ $docs_only -eq 1 ] && continue
  dir="$ROOT/$sub"
  if [ "$sub" = can_server ] && [ $skip_server -eq 1 ]; then
    skip+=("$sub (--skip-server)")
  elif [ ! -f "$dir/package.json" ]; then
    skip+=("$sub (missing, run: git submodule update --init)")
  elif [ ! -d "$dir/node_modules" ] && node -e 'const p=require(process.argv[1]);process.exit(Object.keys({...p.dependencies,...p.devDependencies}).length?0:1)' "$dir/package.json"; then
    skip+=("$sub (run: npm --prefix $sub install)")
  else
    if [ "$sub" = can_server ]; then
      if command -v docker >/dev/null 2>&1; then
        run "can_server docker up" docker compose -f "$dir/docker-compose.yml" up -d --wait
      else
        skip+=("can_server docker up (docker not installed)")
      fi
    fi
    run "$sub verify" npm --prefix "$dir" run verify
    if [ "$sub" = can_app ]; then # JS-only native bundle proof (D-8)
      run "can_app ios bundle" npx --prefix "$dir" expo export --platform ios --output-dir "$(mktemp -d)"
    fi
  fi
done

run "plans corpus lint" node "$ROOT/plans/tools/corpus.mjs" lint
[ -f "$ROOT/docs/spec/tools/check-spec.mjs" ] && run "spec check" node "$ROOT/docs/spec/tools/check-spec.mjs"
run "constitution check" node "$ROOT/docs/spec/constitution/tools/check.mjs"
run "design check" python3 "$ROOT/docs/design/check.py"
run "plans tools tests" node "$ROOT/plans/tools/test/run.mjs"
run "ux tokens build" node "$ROOT/docs/design/ux/tokens.build.mjs"
run "ux tokens in sync" git -C "$ROOT" diff --exit-code -- docs/design/ux/tokens.json
run "constitution map check" node "$ROOT/docs/spec/constitution/tools/map-check.mjs"
[ $e2e -eq 1 ] && echo "e2e: not wired yet (plan 07-u08)"

echo; echo "---- summary"
for x in "${pass[@]}"; do echo "PASS  $x"; done
for x in "${skip[@]}"; do echo "SKIP  $x"; done
for x in "${fail[@]}"; do echo "FAIL  $x"; done
[ ${#fail[@]} -eq 0 ]
