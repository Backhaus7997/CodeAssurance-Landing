// Tells Bing (and other IndexNow engines) which pages exist after a publish, so they are recrawled in
// hours instead of weeks. Run after the push to main and the Pages deploy.
// Usage: node scripts/indexnow.mjs [--dry-run]
import { readFileSync, readdirSync, existsSync } from "node:fs";

const HOST = "www.code-assurance.com";
const SITEMAP = new URL("../out/sitemap.xml", import.meta.url);
const PUBLIC = new URL("../public/", import.meta.url);
const dryRun = process.argv.includes("--dry-run");

function fail(message) {
  console.error(`indexnow: ${message}`);
  process.exit(1);
}

if (!existsSync(SITEMAP)) fail("out/sitemap.xml not found; run npm run build first");
const urlList = [...readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) fail("the sitemap has no URLs");

const keys = readdirSync(PUBLIC)
  .filter((name) => /^[0-9a-f]{32}\.txt$/.test(name))
  .filter((name) => readFileSync(new URL(name, PUBLIC), "utf8").trim() === name.slice(0, -4));
if (keys.length !== 1) fail(`expected exactly one key file in public/, found ${keys.length}`);
const key = keys[0].slice(0, -4);

const body = { host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList };

if (dryRun) {
  console.log(JSON.stringify(body, null, 2));
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
if (res.status !== 200 && res.status !== 202) fail(`IndexNow answered ${res.status}: ${await res.text()}`);
console.log(`indexnow: submitted ${urlList.length} URLs (HTTP ${res.status})`);
