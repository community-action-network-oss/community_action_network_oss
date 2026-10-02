#!/usr/bin/env bash
# Runs every check in the repo and summarizes. Exit 1 if any fail.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
pass=(); fail=(); skip=()

run() { # name, command...
  local name="$1"; shift
  echo "== $name"
  if "$@"; then pass+=("$name"); else fail+=("$name"); fi
}

for sub in can_server can_app can_gallery can_policy; do
  dir="$ROOT/$sub"
  if [ ! -f "$dir/package.json" ]; then
    skip+=("$sub (missing, run: git submodule update --init)")
  elif [ ! -d "$dir/node_modules" ] && node -e 'const p=require(process.argv[1]);process.exit(Object.keys({...p.dependencies,...p.devDependencies}).length?0:1)' "$dir/package.json"; then
    skip+=("$sub (run: npm --prefix $sub install)")
  else
    run "$sub verify" npm --prefix "$dir" run verify
  fi
done

run "plans corpus lint" node "$ROOT/plans/tools/corpus.mjs" lint
[ -f "$ROOT/docs/spec/tools/check-spec.mjs" ] && run "spec check" node "$ROOT/docs/spec/tools/check-spec.mjs"
run "constitution check" node "$ROOT/docs/spec/constitution/tools/check.mjs"
run "design check" python3 "$ROOT/docs/design/check.py"

echo; echo "---- summary"
for x in "${pass[@]}"; do echo "PASS  $x"; done
for x in "${skip[@]}"; do echo "SKIP  $x"; done
for x in "${fail[@]}"; do echo "FAIL  $x"; done
[ ${#fail[@]} -eq 0 ]
