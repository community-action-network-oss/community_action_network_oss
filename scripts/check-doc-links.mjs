#!/usr/bin/env node
// Usage: node scripts/check-doc-links.mjs <dir>
// Fails when a relative markdown link, or a backticked repo path such as
// `docs/spec/00-index.md`, in any .md under <dir> does not resolve to a file or folder.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = resolve(process.argv[2] ?? "");
if (!process.argv[2] || !existsSync(dir) || !statSync(dir).isDirectory()) {
  console.error("usage: node scripts/check-doc-links.mjs <dir>");
  process.exit(2);
}

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith(".md") ? [join(d, e.name)] : [],
  );

const repoPath = /^(docs|scripts|plans|\.github|\.devcontainer|can_[a-z]+)\/[\w./-]+$/;
let bad = 0;
for (const file of walk(dir)) {
  const text = readFileSync(file, "utf8").replace(/```[\s\S]*?```/g, "");
  const check = (target, base, kind) => {
    if (!existsSync(resolve(base, target))) {
      console.error(`${file.slice(root.length + 1)}: broken ${kind}: ${target}`);
      bad++;
    }
  };
  for (const m of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    const t = m[1].split("#")[0];
    if (t && !/^[a-z][a-z0-9+.-]*:/i.test(t)) check(t, dirname(file), "link");
  }
  for (const m of text.matchAll(/`([^`\s]+)`/g)) {
    if (repoPath.test(m[1]) && !m[1].includes("..")) check(m[1], root, "path");
  }
}
if (bad) process.exit(1);
console.log(`doc links ok: ${walk(dir).length} files`);
