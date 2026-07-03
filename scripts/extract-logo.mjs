// Extracts the OptimatX emblem (PNG) that is base64-embedded inside the
// reference prototype bundle `OptimatX Landing.html` and writes it to
//   public/assets/optimatx-mark.png
//
// The bundle has a <script type="__bundler/manifest"> mapping UUID keys to
// { mime, compressed, data(base64) }. There is exactly one image/png in it -
// the club emblem (the gold Phi-ring with pi and blue infinity). The full
// lockup is NOT in the bundle; we build that in markup (see components/ui/Logo).
//
// Run with:  npm run extract:logo

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const BUNDLE = join(root, "OptimatX Landing.html");
const OUT_DIR = join(root, "public", "assets");
const OUT_FILE = join(OUT_DIR, "optimatx-mark.png");

const html = readFileSync(BUNDLE, "utf8");

const match = html.match(
  /<script type="__bundler\/manifest">([\s\S]*?)<\/script>/
);
if (!match) {
  console.error("Could not find the __bundler/manifest script in the bundle.");
  process.exit(1);
}

const manifest = JSON.parse(match[1]);

const pngEntry = Object.entries(manifest).find(
  ([, v]) => v && v.mime === "image/png"
);
if (!pngEntry) {
  console.error("No image/png asset found in the manifest.");
  process.exit(1);
}

const [key, asset] = pngEntry;
let bytes = Buffer.from(asset.data, "base64");
if (asset.compressed) {
  bytes = gunzipSync(bytes);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, bytes);

console.log(
  `Wrote ${OUT_FILE} (${bytes.length} bytes) from manifest key ${key} [${asset.mime}].`
);
