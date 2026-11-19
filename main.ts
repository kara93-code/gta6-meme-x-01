// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The entry itself is an X post: a GTA 6 "MISSION PASSED" meme whose picture
// shows make.fun's ghost mascot in a Vice City sunset scene. The house reads
// that post from X and judges its first picture plus its text, so this
// program does nothing clever: it hands the post's address over.
//
// It reads POST.json from the repository root, checks that it is a JSON
// object naming one X post URL, and writes those exact bytes to
// /output/POST.json, where the gate reads them. The file is written with a
// plain write and mode 0644 so the grader can read it back. The repository
// carries a package.json with "type": "module" so Node treats this file as
// an ES module without a warning.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const POST_FILE = "POST.json";

function fail(message: string): never {
  console.error(`gta6-meme-x-01: ${message}`);
  process.exit(1);
}

const sourcePath = join(BOT_DIR, POST_FILE);
let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  fail(`could not read ${sourcePath}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString("utf8"));
} catch {
  fail(`${POST_FILE} is not valid JSON`);
}

if (
  typeof parsed !== "object" ||
  parsed === null ||
  Array.isArray(parsed) ||
  typeof (parsed as { url?: unknown }).url !== "string" ||
  ((parsed as { url: string }).url.length === 0)
) {
  fail(`${POST_FILE} must be a JSON object with a non-empty "url" string`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, POST_FILE);
writeFileSync(outPath, raw, { mode: 0o644 });
chmodSync(outPath, 0o644);
