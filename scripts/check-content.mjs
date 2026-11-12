#!/usr/bin/env node
/* npm run check:content

   Run after adding, renaming or removing a message or a photo. It checks:

   Messages (messages/<locale>/<page>.json)
     ✗ every language has the same files
     ✗ every file has the same keys in every language
     ✗ every file is listed in MESSAGE_FILES in src/i18n/request.ts,
       and every listed file exists
     ✗ no namespace is defined by two files of the same language

   Images (public/images/…)
     ✗ every "/images/…" path written in src/ points at a file that exists
     ! files in public/images/ that nothing uses (a warning, not a failure)

   ✗ lines fail the check (exit code 1); ! lines are only reported.
   No dependencies: plain Node. */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const MESSAGES = join(ROOT, "messages");
const PUBLIC = join(ROOT, "public");
const SRC = join(ROOT, "src");

const errors = [];
const warnings = [];
const rel = (p) => relative(ROOT, p);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

/** "a.b.c" for every leaf value in a messages object. */
function keyPaths(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    return v !== null && typeof v === "object" ? keyPaths(v, path) : [path];
  });
}

/* ---- Messages ----------------------------------------------------------- */

const locales = readdirSync(MESSAGES).filter((n) => statSync(join(MESSAGES, n)).isDirectory());
const filesOf = Object.fromEntries(
  locales.map((l) => [l, readdirSync(join(MESSAGES, l)).filter((f) => f.endsWith(".json")).sort()]),
);
/* English is the default locale, so it is the reference the others are
   compared against. */
const base = locales.includes("en") ? "en" : locales[0];
const others = locales.filter((l) => l !== base);

const parsed = {};
for (const l of locales) {
  parsed[l] = {};
  for (const f of filesOf[l]) {
    try {
      parsed[l][f] = JSON.parse(readFileSync(join(MESSAGES, l, f), "utf8"));
    } catch (e) {
      errors.push(`messages/${l}/${f} is not valid JSON: ${e.message}`);
    }
  }
}

for (const l of others) {
  for (const f of filesOf[base]) if (!filesOf[l].includes(f)) errors.push(`messages/${l}/${f} is missing (messages/${base}/${f} exists)`);
  for (const f of filesOf[l]) if (!filesOf[base].includes(f)) errors.push(`messages/${base}/${f} is missing (messages/${l}/${f} exists)`);
}

for (const f of filesOf[base]) {
  for (const l of others) {
    if (!parsed[base][f] || !parsed[l]?.[f]) continue;
    const a = new Set(keyPaths(parsed[base][f]));
    const b = new Set(keyPaths(parsed[l][f]));
    for (const k of a) if (!b.has(k)) errors.push(`messages/${l}/${f} is missing "${k}" (present in ${base})`);
    for (const k of b) if (!a.has(k)) errors.push(`messages/${base}/${f} is missing "${k}" (present in ${l})`);
  }
}

for (const l of locales) {
  const owner = {};
  for (const f of filesOf[l]) {
    for (const ns of Object.keys(parsed[l][f] ?? {})) {
      if (owner[ns]) errors.push(`messages/${l}: "${ns}" is defined in both ${owner[ns]} and ${f}`);
      else owner[ns] = f;
    }
  }
}

const requestTs = readFileSync(join(SRC, "i18n", "request.ts"), "utf8");
const listed = requestTs.match(/MESSAGE_FILES\s*=\s*\[([^\]]*)\]/);
if (!listed) {
  errors.push("src/i18n/request.ts: could not find the MESSAGE_FILES list");
} else {
  const names = [...listed[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
  for (const n of names) if (!filesOf[base].includes(`${n}.json`)) errors.push(`MESSAGE_FILES lists "${n}" but messages/${base}/${n}.json does not exist`);
  for (const f of filesOf[base]) {
    const n = f.replace(/\.json$/, "");
    if (!names.includes(n)) errors.push(`messages/${base}/${f} is not listed in MESSAGE_FILES (src/i18n/request.ts), so it is never loaded`);
  }
}

/* ---- Images ------------------------------------------------------------- */

const IMAGE_PATH = /["'`(]\/(images\/[^"'`)\s]+)/g;
const used = new Set();
for (const file of walk(SRC).filter((p) => [".ts", ".tsx", ".css"].includes(extname(p)))) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(IMAGE_PATH)) {
      const path = m[1];
      if (path.includes("${")) continue; // built at runtime; can't check statically
      used.add(path);
      if (!existsSync(join(PUBLIC, path))) errors.push(`${rel(file)}:${i + 1} points at /${path}, which does not exist in public/`);
    }
  });
}

const IMAGE_FILE = /\.(jpe?g|png|webp|avif|gif|svg)$/i;
for (const file of walk(join(PUBLIC, "images")).filter((p) => IMAGE_FILE.test(p))) {
  const path = relative(PUBLIC, file).split("\\").join("/");
  if (!used.has(path)) warnings.push(`public/${path} is not used anywhere in src/`);
}

/* ---- Report ------------------------------------------------------------- */

const nMessageFiles = locales.reduce((n, l) => n + filesOf[l].length, 0);
console.log(`Checked ${nMessageFiles} message files (${locales.join(", ")}) and ${used.size} image paths.`);
for (const w of warnings) console.log(`  ! ${w}`);
for (const e of errors) console.log(`  ✗ ${e}`);
if (errors.length) {
  console.log(`\n${errors.length} problem${errors.length === 1 ? "" : "s"} to fix.`);
  process.exit(1);
}
console.log(warnings.length ? "\nOK, with warnings." : "\nAll good.");
