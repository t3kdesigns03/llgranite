// Every photo on the site, by name. `npm run images` turns each one into responsive WebP files in
// public/images/ plus a manifest (src/lib/images.generated.ts) with sizes and blur placeholders.
//
// ALL OF THESE ARE PLACEHOLDERS (Unsplash License / CC0 Wikimedia) until L&L supplies real job photos.
// To swap one: drop the client's photo in photos/ (e.g. photos/smith-kitchen.jpg), change `src` below
// to "photos/smith-kitchen.jpg", run `npm run images`, done. Keep the name the same and nothing else
// changes. `focus` is where the crop centers on narrow screens (CSS object-position).
//
// `crop` (optional) cuts a region out of the original first, as fractions: { left, top, width, height }.

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=2400&q=85&fm=jpg`;
const commons = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=2400`;

export const sources = [
  // Hero + big moments
  { name: "hero-kitchen", src: unsplash("1699852676054-a55370ac4c7a"), focus: "60% 50%", credit: "Unsplash 1699852676054" },
  { name: "waterfall-island", src: unsplash("1785535573585-8f962fa3cda5"), focus: "45% 55%", credit: "Unsplash 1785535573585" },

  // Material close-ups
  { name: "granite-texture", src: commons("Granite_slab_up_close.jpg"), focus: "50% 50%", credit: "Wikimedia Commons, CC0: Granite slab up close" },
  { name: "granite-black", src: unsplash("1778272617843-bdda47b64bad"), focus: "50% 70%", credit: "Unsplash 1778272617843" },
  { name: "marble-texture", src: unsplash("1785535573585-8f962fa3cda5"), crop: { left: 0.6, top: 0.04, width: 0.38, height: 0.4 }, focus: "50% 50%", credit: "Unsplash 1785535573585 (crop)" },
  { name: "quartz-texture", src: unsplash("1776395159824-b45c556995eb"), crop: { left: 0.52, top: 0.5, width: 0.46, height: 0.42 }, focus: "50% 50%", credit: "Unsplash 1776395159824 (crop)" },
  { name: "sink-faucet", src: unsplash("1791493192207-62dffb95c141"), focus: "50% 60%", credit: "Unsplash 1791493192207" },

  // Project: waterfall quartz, open plan (same house, four angles)
  { name: "proj-open-plan-1", src: unsplash("1682888813795-192fca4a10d9"), focus: "55% 60%", credit: "Unsplash 1682888813795" },
  { name: "proj-open-plan-2", src: unsplash("1682888813913-e13f18692019"), focus: "50% 60%", credit: "Unsplash 1682888813913" },
  { name: "proj-open-plan-3", src: unsplash("1682888813789-c39fe30921e2"), focus: "40% 60%", credit: "Unsplash 1682888813789" },
  { name: "proj-open-plan-4", src: unsplash("1682888813788-373f947aacb3"), focus: "50% 60%", credit: "Unsplash 1682888813788" },

  // Other projects
  { name: "proj-black-island", src: unsplash("1778272617920-fa9445d8d1b8"), focus: "50% 60%", credit: "Unsplash 1778272617920" },
  { name: "proj-marble-backsplash", src: unsplash("1791493192258-070274a53d36"), focus: "50% 50%", credit: "Unsplash 1791493192258" },
  { name: "proj-marble-island", src: unsplash("1588854337236-6889d631faa8"), focus: "60% 60%", credit: "Unsplash 1588854337236" },
  { name: "proj-classic-granite-1", src: unsplash("1786191109448-a08b905526b0"), focus: "55% 60%", credit: "Unsplash 1786191109448" },
  { name: "proj-classic-granite-2", src: unsplash("1771207918197-e73b6f6c2518"), focus: "55% 60%", credit: "Unsplash 1771207918197" },
  { name: "proj-gold-vein", src: unsplash("1776395159824-b45c556995eb"), focus: "60% 60%", credit: "Unsplash 1776395159824" },
  { name: "proj-terrazzo-waterfall", src: unsplash("1781249144389-4174c1164955"), focus: "35% 60%", credit: "Unsplash 1781249144389" },
  { name: "proj-white-quartz", src: unsplash("1565538810643-b5bdb714032a"), focus: "50% 70%", credit: "Unsplash 1565538810643" },
  { name: "proj-classic-marble", src: unsplash("1556912173-3bb406ef7e77"), focus: "40% 70%", credit: "Unsplash 1556912173" },
  { name: "proj-marble-bath", src: unsplash("1564540583246-934409427776"), focus: "50% 55%", credit: "Unsplash 1564540583246" },
  { name: "proj-quartz-vanity", src: unsplash("1584622650111-993a426fbf0a"), focus: "65% 60%", credit: "Unsplash 1584622650111" },
  { name: "proj-stone-bath", src: unsplash("1604709177225-055f99402ea3"), focus: "45% 60%", credit: "Unsplash 1604709177225" },
  { name: "proj-restaurant", src: unsplash("1517248135467-4c7edcad34c4"), focus: "50% 55%", credit: "Unsplash 1517248135467" },
  { name: "proj-cafe-counter", src: unsplash("1554118811-1e0d58224f24"), focus: "50% 55%", credit: "Unsplash 1554118811" },
];

/** Output widths. The largest is capped at the original's width. */
export const widths = [480, 828, 1200, 1920];
