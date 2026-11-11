// Sums the gzip size of every <script src> an exported HTML page loads up front.
// Usage: node scripts/first-load-js.mjs out/index.html
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { gzipSync } from "node:zlib";

const htmlPath = process.argv[2];
if (!htmlPath) {
  console.error("Usage: node scripts/first-load-js.mjs <file.html>");
  process.exit(1);
}

const html = readFileSync(htmlPath, "utf8");

// Script paths are absolute ("/_next/..."), so resolve them from the export root: the nearest folder
// above the page that holds _next (out/ for out/pricing/index.html).
function exportRoot(dir) {
  for (let current = dir; ; current = dirname(current)) {
    if (existsSync(join(current, "_next"))) return current;
    if (dirname(current) === current) throw new Error(`No _next folder above ${dir}`);
  }
}
const root = exportRoot(dirname(htmlPath));
const sources = [...new Set([...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]))];

let total = 0;
for (const src of sources) {
  if (/^https?:\/\//.test(src)) {
    console.error(`External script not counted: ${src}`);
    continue;
  }
  const file = join(root, src.split("?")[0].replace(/^\//, ""));
  total += gzipSync(readFileSync(file)).length;
}

console.log(`scripts=${sources.length}`);
console.log(`first-load-js-gzip-bytes=${total}`);
