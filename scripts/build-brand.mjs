// Builds the static brand assets. Run: npm run brand (after `npm run images`, which makes the hero photo)
//
//   src/app/icon.svg          favicon (browsers pick it up automatically via the App Router file convention)
//   src/app/apple-icon.png    180×180 home-screen icon
//   public/og-image.jpg       1200×630 share card for Facebook, iMessage, Google, etc.
//
// Text is converted to outlines, so every file renders the same everywhere with no fonts installed.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const root = process.cwd();
const C = { onyx: "#0f0e0d", linen: "#f5f1ea", brass: "#c4a166", stone: "#c9c0b3" };

const loadFont = (rel) => {
  const buf = readFileSync(join(root, "node_modules", rel));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const serif = loadFont("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff");
const serifItalic = loadFont("@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff");
const sans = loadFont("@fontsource/manrope/files/manrope-latin-700-normal.woff");
const sansReg = loadFont("@fontsource/manrope/files/manrope-latin-500-normal.woff");

/**
 * Text as outlined paths, with letter-spacing (opentype's getPath has none). Each glyph is outlined at
 * the origin and placed with a transform: opentype.js occasionally emits NaN control points when a glyph
 * is drawn at a fractional offset, and librsvg stops drawing a path at the first bad number.
 */
function outline(font, text, x, y, size, tracking = 0) {
  const parts = [];
  let cx = x;
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    const d = g.getPath(0, 0, size).toPathData(2);
    if (d.includes("NaN")) throw new Error(`Bad outline for "${ch}" at ${size}px`);
    if (d) parts.push(`<path transform="translate(${cx.toFixed(2)} ${y.toFixed(2)})" d="${d}"/>`);
    cx += ((g.advanceWidth ?? 0) * size) / font.unitsPerEm + tracking;
  }
  return { parts, width: cx - x - tracking };
}
/** <g> of glyph paths in one fill. */
const draw = (fill, ...outlines) => `<g fill="${fill}">${outlines.flatMap((o) => o.parts).join("")}</g>`;

const measure = (font, text, size, tracking = 0) => outline(font, text, 0, 0, size, tracking).width;

/** "L&L" monogram centered in a square of side `s`. */
function monogram(s, { rounded }) {
  const size = s * 0.56;
  const wL = measure(serif, "L", size);
  const wAmp = measure(serifItalic, "&", size * 0.92);
  const gap = -s * 0.01;
  const total = wL * 2 + wAmp + gap * 2;
  const x0 = (s - total) / 2;
  const base = s * 0.7;
  const l1 = outline(serif, "L", x0, base, size);
  const amp = outline(serifItalic, "&", x0 + wL + gap, base, size * 0.92);
  const l2 = outline(serif, "L", x0 + wL + gap + wAmp + gap, base, size);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" rx="${rounded ? s * 0.22 : 0}" fill="${C.onyx}"/>
  <rect x="${s * 0.18}" y="${s * 0.82}" width="${s * 0.64}" height="${Math.max(1, s * 0.018)}" fill="${C.brass}" opacity="0.8"/>
  ${draw(C.linen, l1, l2)}
  ${draw(C.brass, amp)}
</svg>`;
}

writeFileSync(join(root, "src", "app", "icon.svg"), monogram(64, { rounded: true }));
await sharp(Buffer.from(monogram(180, { rounded: false }))).png().toFile(join(root, "src", "app", "apple-icon.png"));

// ---- Share card (1200×630) -------------------------------------------------
{
  const W = 1200;
  const H = 630;
  const photo = await sharp(join(root, "public", "images", "hero-kitchen-1920.webp"))
    .resize(W, H, { fit: "cover", position: "right" })
    .toBuffer();

  const X = 80;
  const kicker = outline(sans, "STATESVILLE, NC  ·  FAMILY OWNED", X + 46, 150, 17, 4.2);
  const t1 = outline(serif, "Granite, marble & quartz,", X, 280, 76);
  const t2 = outline(serifItalic, "crafted in Statesville.", X, 362, 80);
  const mark = outline(serif, "L", X, 520, 44);
  const amp = outline(serifItalic, "&", X + measure(serif, "L", 44), 520, 41);
  const mark2 = outline(serif, "L", X + measure(serif, "L", 44) + measure(serifItalic, "&", 41), 520, 44);
  const word = outline(sans, "GRANITE", X + 98, 517, 15, 5);
  const foot = outline(sansReg, "Free quotes  ·  In-stock slabs  ·  704-528-6060", X, 568, 24);

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="l" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${C.onyx}" stop-opacity="0.96"/>
      <stop offset="0.55" stop-color="${C.onyx}" stop-opacity="0.78"/>
      <stop offset="1" stop-color="${C.onyx}" stop-opacity="0.15"/>
    </linearGradient>
    <linearGradient id="b" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0.5" stop-color="${C.onyx}" stop-opacity="0"/>
      <stop offset="1" stop-color="${C.onyx}" stop-opacity="0.75"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#l)"/>
  <rect width="${W}" height="${H}" fill="url(#b)"/>
  <rect x="${X}" y="${142}" width="32" height="1.5" fill="${C.brass}"/>
  ${draw(C.brass, kicker)}
  ${draw(C.linen, t1)}
  ${draw(C.brass, t2)}
  <rect x="${X}" y="452" width="${W - X * 2}" height="1" fill="${C.brass}" opacity="0.35"/>
  ${draw(C.linen, mark, mark2, word)}
  ${draw(C.brass, amp)}
  ${draw(C.stone, foot)}
</svg>`;

  await sharp(photo)
    .composite([{ input: Buffer.from(overlay) }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(root, "public", "og-image.jpg"));
}

console.log("Wrote src/app/icon.svg, src/app/apple-icon.png, public/og-image.jpg");
