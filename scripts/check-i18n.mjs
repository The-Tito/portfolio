// Fails when the ES and EN dictionaries drift apart (missing keys or different list lengths).
import { readFileSync } from "node:fs";

const load = (locale) =>
  JSON.parse(readFileSync(new URL(`../src/i18n/messages/${locale}.json`, import.meta.url), "utf8"));

function* paths(value, prefix = "") {
  if (Array.isArray(value)) {
    yield `${prefix}[length=${value.length}]`;
    for (const [i, item] of value.entries()) yield* paths(item, `${prefix}[${i}]`);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) yield* paths(item, `${prefix}.${key}`);
  } else {
    yield prefix;
  }
}

const [base, ...others] = ["es", "en"];
const reference = new Set(paths(load(base)));
let failed = false;

for (const locale of others) {
  const current = new Set(paths(load(locale)));
  const missing = [...reference].filter((p) => !current.has(p));
  const extra = [...current].filter((p) => !reference.has(p));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`✗ ${locale}.json differs from ${base}.json`);
    for (const p of missing) console.error(`  missing ${p}`);
    for (const p of extra) console.error(`  extra   ${p}`);
  }
}

if (failed) process.exit(1);
console.log("✓ i18n dictionaries are in sync");
