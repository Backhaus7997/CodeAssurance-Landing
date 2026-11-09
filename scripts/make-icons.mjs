// Builds app/favicon.ico (16, 32, 48 px) and app/apple-icon.png (180 px) from the shield in app/icon.svg.
// Usage: node scripts/make-icons.mjs
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync(new URL("../app/icon.svg", import.meta.url));

async function shieldPng(size) {
  return sharp(svg, { density: 512 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

// ICO with PNG entries: 6-byte header, 16-byte directory entry per image, then the PNG data.
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(async (size) => ({ size, data: await shieldPng(size) })));
writeFileSync(new URL("../app/favicon.ico", import.meta.url), ico(images));

const apple = await sharp({ create: { width: 180, height: 180, channels: 4, background: "#000000" } })
  .composite([{ input: await shieldPng(132), gravity: "centre" }])
  .png()
  .toBuffer();
writeFileSync(new URL("../app/apple-icon.png", import.meta.url), apple);

console.log(`favicon.ico (${sizes.join(", ")} px) and apple-icon.png (180 px) written`);
