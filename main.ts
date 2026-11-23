// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The entry itself is an X post: a split-screen GTA 6 meme called "Agent
// Already Paid". On the left a gamer shouts while waiting for GTA 6, a
// calendar on the wall reading "GTA 6!" under a Vice City sky. On the right
// a make.fun ghost in headphones works at a laptop — sparkle eyes, thick
// black outline — a stack of blue USDC coins beside it plus one magenta
// coin with a white star, and a green badge reading "Bounty Reward +$500".
// The caption reads "ME WAITING FOR GTA 6..." against "MY AI AGENT:
// ALREADY GETTING PAID ON make.fun". The house reads that post from X and
// judges its first picture plus its text,
// so this program does nothing clever: it hands the post's address over.
//
// It loads POST.json from the repository root, checks that it names one X
// post address, and copies those exact bytes to /output/POST.json, where the
// gate reads them. The copy is written with a plain write and mode 0644 so
// the grader can read it back. The repository carries a package.json with
// "type": "module" so Node treats this file as an ES module. Submit #4
// ("Agent Already Paid") only changes which post is named; the copy logic
// is unchanged from submit #3 ("WASTED").
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POST_NAME = "POST.json";
const POST_ADDRESS = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/.*\/status\/\d+$/;

function abort(reason: string): never {
  console.error(`gta6-meme-x-01: ${reason}`);
  process.exit(1);
}

function loadPostFile(folder: string): Buffer {
  try {
    return readFileSync(join(folder, POST_NAME));
  } catch (err) {
    abort(`could not read ${join(folder, POST_NAME)}: ${(err as Error).message}`);
  }
}

function isPostAddress(url: string): boolean {
  return POST_ADDRESS.test(url);
}

function extractPostUrl(raw: Buffer): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString("utf8"));
  } catch {
    abort(`${POST_NAME} is not valid JSON`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    abort(`${POST_NAME} must be a JSON object with a "url" string`);
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== "string" || url.length === 0) {
    abort(`${POST_NAME} must be a JSON object with a non-empty "url" string`);
  }
  if (!isPostAddress(url)) {
    abort(`${POST_NAME} url is not an X post address: ${url}`);
  }
  return url;
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const raw = loadPostFile(botDir);
  const url = extractPostUrl(raw);
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, POST_NAME);
  writeFileSync(target, raw, { mode: 0o644 });
  chmodSync(target, 0o644);
  console.log(`gta6-meme-x-01: wrote ${url} to ${target}`);
}

main();
