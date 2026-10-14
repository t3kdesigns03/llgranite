// Single source of truth for L&L Granite. Every business fact here comes from their current site
// (llgranite.com, Oct 2026) or the brief. Anything marked CONFIRM is an assumption to check with the
// shop before launch (also listed in the README go-live checklist).

import type { ImageName } from "./images.generated";

export const site = {
  name: "L&L Granite",
  legalName: "L & L Granite LLC",
  tagline: "Granite, marble & quartz countertops, fabricated and installed in Statesville, NC.",
  phone: {
    display: "704-528-6060",
    href: "tel:+17045286060",
    // CONFIRM the main line takes texts. If not, set sms to null and the "Text us" links disappear.
    sms: "sms:+17045286060" as string | null,
    e164: "+17045286060",
  },
  address: {
    street: "1580 Buffalo Shoals Rd",
    city: "Statesville",
    region: "NC",
    zip: "28677",
    oneLine: "1580 Buffalo Shoals Rd, Statesville, NC 28677",
  },
  hours: {
    // Their contact page lists 9:00am–4:00pm; listings say Mon–Fri, closed weekends. CONFIRM.
    rows: [
      { days: "Monday – Friday", time: "9:00am – 4:00pm" },
      { days: "Saturday & Sunday", time: "Closed" },
    ],
    short: "Mon–Fri 9–4",
    schema: ["Mo-Fr 09:00-16:00"],
    // For the live open/closed badge. Minutes after midnight, Eastern; 1 = Monday.
    open: 9 * 60,
    close: 16 * 60,
    workdays: [1, 2, 3, 4, 5],
    tz: "America/New_York",
    note: "Slab viewing by appointment, so someone is free to walk the yard with you. Call or text to set a time.",
  },
  // Year founded, e.g. 2008. Unknown, so it's null and the trust strip shows other facts instead.
  // (A HomeAdvisor listing for "L & L Granite, LLC" claims 17 years. CONFIRM before using.)
  established: null as number | null,
  // CONFIRM service area with the shop. Used in copy, SEO description and structured data.
  areas: ["Statesville", "Mooresville", "Troutman", "Harmony", "Taylorsville", "Hickory", "Salisbury", "Mocksville", "Lake Norman"],
  counties: ["Iredell", "Rowan", "Catawba", "Alexander", "Davie"],
  links: {
    facebook: "https://www.facebook.com/L-L-Granite-LLC-260961073931740/",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=L%26L+Granite%2C+1580+Buffalo+Shoals+Rd%2C+Statesville%2C+NC+28677",
    mapEmbed: "https://maps.google.com/maps?q=1580%20Buffalo%20Shoals%20Rd%2C%20Statesville%2C%20NC%2028677&z=14&output=embed",
  },
  // Quote form. "netlify" works out of the box on Netlify. To use Formspree instead, set provider to
  // "formspree" and paste the form endpoint (https://formspree.io/f/xxxxxxx).
  form: {
    provider: "netlify" as "netlify" | "formspree",
    name: "quote",
    formspreeEndpoint: "",
  },
  mission:
    "To create warm, inviting rooms full of elegance, character and sophistication through custom natural stone, and to deliver work of distinction that exceeds expectations from first idea to finished countertop.",
  // Preview mode. While true: noindex/nofollow everywhere and a "Proposed site by T3KDesigns" footer
  // credit. Flip to false when L&L buys. That's the go-live switch.
  spec: true,
  // While true, project pages carry a small "representative photos" line. Flip to false once every
  // photo in scripts/image-sources.mjs is L&L's own work.
  placeholderPhotos: true,
  // Production web address (sitemap, canonical URLs, share cards). SITE_URL env var overrides.
  url: "https://llgranite.com",
  previewUrl: "https://llgranite.t3kdesigns.app",
} as const;

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/materials", label: "Materials" },
  { href: "/process", label: "Process" },
  { href: "/care", label: "Care" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ------------------------------------------------------------------
   Trust strip + strengths
   ------------------------------------------------------------------ */

export const trust = [
  { big: "Family", small: "owned & run in Statesville" },
  { big: "In-house", small: "fabrication & installation" },
  { big: "Designer", small: "on staff to help you choose" },
  { big: "In-stock", small: "slab inventory to walk & touch" },
];

export const strengths = [
  {
    title: "Customer satisfaction, first",
    text: "It's the thing we're proudest of. We listen before we measure, and we don't call a job done until you've walked it with us.",
  },
  {
    title: "Quality you can feel",
    text: "Tight, color-matched seams. Clean polished edges. Cutouts that line up with your sink and cooktop the first time.",
  },
  {
    title: "Experience that shows",
    text: "Long-proven know-how in the shop and on site, so the odd angle, the long island and the tricky seam are routine, not risky.",
  },
  {
    title: "Craftsmanship",
    text: "Every slab is laid out by hand for your room, with the veining and movement placed where it looks best.",
  },
  {
    title: "Responsibility",
    text: "Straight answers on seams, schedules and site prep before you sign, so nothing surprises you on install day.",
  },
  {
    title: "Expeditious delivery",
    text: "We move as fast as good work allows and keep you posted. Template, fabrication and install, handled by one team.",
  },
];

/* ------------------------------------------------------------------
   Materials
   ------------------------------------------------------------------ */

export type MaterialId = "granite" | "marble" | "quartz";

export const materials: {
  id: MaterialId;
  name: string;
  line: string;
  intro: string;
  image: ImageName;
  scene: ImageName;
  benefits: { title: string; text: string }[];
  bestFor: string;
  care: string;
}[] = [
  {
    id: "granite",
    name: "Granite",
    line: "Formed by the earth. Built for real kitchens.",
    intro:
      "Every granite slab is one of a kind: no two are alike and none can be duplicated. It shrugs off heat, holds up to busy family kitchens, and brings color and movement no factory can copy.",
    image: "granite-texture",
    scene: "proj-black-island",
    benefits: [
      { title: "Heat resistant", text: "Hot pots, fryers and toaster ovens can go right on the counter." },
      { title: "Truly one of a kind", text: "Natural stone, so your slab's pattern exists nowhere else." },
      { title: "Tough & durable", text: "Resists scratches and chips in everyday kitchen use." },
      { title: "Easy upkeep", text: "Sealed before install, plus a 3-in-1 cleaner with every job." },
    ],
    bestFor: "Busy kitchens, outdoor-adjacent spaces, anyone who cooks hot and often.",
    care: "Low. Mild soap and water daily; use the 3-in-1 cleaner quarterly.",
  },
  {
    id: "marble",
    name: "Marble",
    line: "The classic. Soft light, sweeping veins.",
    intro:
      "Marble is limestone or dolomite transformed by heat and pressure over millions of years. It comes in a beautiful range of colors and gives a room a sophistication nothing else quite matches.",
    image: "marble-texture",
    scene: "proj-marble-bath",
    benefits: [
      { title: "Timeless beauty", text: "Soft, luminous surface with dramatic or delicate veining." },
      { title: "A range of colors", text: "From bright statuary whites to warm creams, grays and greens." },
      { title: "Naturally cool", text: "A favorite of bakers for rolling dough and pastry." },
      { title: "Lives beautifully", text: "Develops a soft patina over time that many owners love." },
    ],
    bestFor: "Bathrooms, vanities, fireplace surrounds, baking stations and statement islands.",
    care: "Moderate. Reseal periodically and keep acids like lemon and vinegar off the surface.",
  },
  {
    id: "quartz",
    name: "Quartz",
    line: "Engineered for consistency. Next to no maintenance.",
    intro:
      "Quartz is engineered stone: crushed natural quartz bound into a slab that is non-porous, consistent from end to end, and about as low-maintenance as a countertop gets.",
    image: "quartz-texture",
    scene: "proj-open-plan-1",
    benefits: [
      { title: "Non-porous", text: "Resists bacterial growth. Never needs sealing or polishing." },
      { title: "Stain resistant", text: "Coffee, wine, lemon, olive oil, vinegar, makeup: wipe and go." },
      { title: "Scratch & chip resistant", text: "Holds its polish against scratches, chips, cracks and dulling." },
      { title: "Consistent look", text: "What you see in the sample is what you get across the room." },
    ],
    bestFor: "Families who want zero fuss, bright whites and marble looks, bathrooms and laundry rooms.",
    care: "Lowest. Soap and water. Use trivets under hot pans and appliances.",
  },
];

/** Side-by-side comparison on the Materials page. */
export const compare = {
  cols: ["Granite", "Marble", "Quartz"],
  rows: [
    { label: "Heat", values: ["Excellent", "Good", "Use trivets"] },
    { label: "Stains", values: ["Very good, sealed", "Needs care", "Excellent"] },
    { label: "Scratches", values: ["Excellent", "Softer", "Excellent"] },
    { label: "Sealing", values: ["Sealed at install", "Periodic", "Never"] },
    { label: "Pattern", values: ["One of a kind", "One of a kind", "Consistent"] },
  ],
};

export const extras = [
  {
    title: "Sinks",
    text: "Undermount and drop-in sinks in stainless and composite. Undermounts are cut, polished and drilled for your faucet in the shop.",
  },
  {
    title: "Tile & tile supplies",
    text: "A wide selection of tile for backsplashes, plus the setting materials and supplies to finish the job.",
  },
  {
    title: "Accessories",
    text: "Soap dispensers, hot water dispensers and the small touches that make a new kitchen feel finished.",
  },
  {
    title: "Designer on staff",
    text: "Not sure what goes with your cabinets or floor? Our designer will help you pull the room together.",
  },
];

/* ------------------------------------------------------------------
   Process
   ------------------------------------------------------------------ */

export const steps = [
  {
    n: "01",
    title: "Consultation & free quote",
    short: "Tell us about the room. We'll price it from your measurements.",
    detail:
      "Call, text or send the form with your rough measurements and what you have in mind. We'll talk through materials, edges and budget and give you a free quote. Pricing is based on the measurements you provide, and adjusted only if our field measurements come out different.",
  },
  {
    n: "02",
    title: "Choose & approve your slab",
    short: "Walk the yard and put your name on the exact slab.",
    detail:
      "Come see the slabs in person. Our designer can help you choose. You'll approve the actual slab before template and before you sign. Found one at another supplier? Approve it there and have them put it on hold for you, then we'll order it. With a signed contract and deposit, we hold your slabs until fabrication.",
  },
  {
    n: "03",
    title: "Template",
    short: "We measure your finished cabinets precisely, with you there.",
    detail:
      "Our templater makes an exact pattern of your cabinets. You (or a decision-maker 18 or older) need to be there the whole time to decide seam placement, corner radius, overhangs and any special island details. See the checklist below so the site is ready.",
  },
  {
    n: "04",
    title: "Fabrication",
    short: "Cut, edged and polished in our Statesville shop.",
    detail:
      "Your slab is laid out for the best veining, cut to the template, and finished with your chosen edge. Undermount sinks are cut out, polished and drilled for faucets here in the shop.",
  },
  {
    n: "05",
    title: "Installation",
    short: "Set, seamed and checked, usually in a single visit.",
    detail:
      "Our crew sets the tops, forms seams with color-matched epoxy, and completes any drop-in sink or cooktop cutouts on site. A decision-maker 18 or older needs to be present for the whole install and the final walk-through.",
  },
  {
    n: "06",
    title: "Walk-through & care",
    short: "We inspect it with you and show you how to keep it beautiful.",
    detail:
      "Before we leave, we look over the finished tops together. Granite jobs come with a can of 3-in-1 cleaner, and we'll explain exactly how to care for your stone. Questions later? Just call.",
  },
];

export const templateChecklist = [
  "Base cabinets installed, level and secured",
  "Old countertops removed (in most cases)",
  "Sinks, faucets and soap / hot water dispensers on site",
  "Cooktop, downdraft or range on site (specs are enough for cooktops)",
  "Dishwasher, refrigerator and floor-to-ceiling cabinets in place",
  "Cabinets emptied and the area clear of furniture",
  "A decision-maker 18+ available for the full appointment",
];

export const goodToKnow = [
  {
    q: "How long will it take?",
    a: "We'll give you an estimated install date and work to beat it, but it is an estimate, not a guarantee. The most common delays are appliance, plumbing or electrical items that aren't ready yet, which is why the template checklist matters.",
  },
  {
    q: "Will I be able to see the seams?",
    a: "Yes, a little. Seams are typically 1/16\" to 1/8\" and visible to the eye and touch. We fill them with color-matched epoxy and place them carefully. We'll consult you on placement, but the fabricator makes the final call so the stone is supported properly.",
  },
  {
    q: "Do you hook up the sink and cooktop?",
    a: "No. We're not plumbers or electricians, so plumbing and electrical connections aren't included. We'll cut and polish the openings perfectly; your plumber or electrician makes the connections.",
  },
  {
    q: "Do you remove my old countertops?",
    a: "Removal of old tops isn't included in installation. In most cases they need to be off before we template. If a bathroom mirror has to come down for the new vanity top, please remove it beforehand.",
  },
  {
    q: "Should I paint first?",
    a: "If you can, hold off on final paint and wallpaper until after install. Installation is construction, and the occasional wall scrape can happen. Any wall or cabinet areas the new tops expose or cover aren't finished by us.",
  },
  {
    q: "What if the site isn't ready on template day?",
    a: "If our crew has to come back because the site isn't ready, an additional trip fee may apply. A quick look at the checklist the day before saves everyone time.",
  },
  {
    q: "Do I need to move anything?",
    a: "Yes, please. Empty the cabinets and clear appliances and furniture from the work area. We're not able to take responsibility for items our crew has to move.",
  },
];

/* ------------------------------------------------------------------
   Care & maintenance
   ------------------------------------------------------------------ */

export const care: {
  id: MaterialId;
  name: string;
  summary: string;
  daily: string;
  spills: string;
  stubborn: string;
  sealing: string;
  stains?: string;
  avoid: string[];
}[] = [
  {
    id: "granite",
    name: "Granite",
    summary: "Sealed before install. Every installation comes with a can of 3-in-1 cleaner: use it quarterly and the sealer stays maintained, with no resealing needed.",
    daily: "Mild, non-abrasive dish soap or a stone soap and warm water. Use just a little soap so it doesn't leave a film, then rinse and dry.",
    spills: "Blot right away (wiping spreads it). Clean with mild soap and water, rinse, and dry with a soft cloth.",
    stubborn: "Acetone on a soft cloth, then rinse well. Dried-on gum, nail polish or paint can be lifted with a razor blade held flat to the surface.",
    sealing: "Once properly sealed, granite should see little or no staining. Honed or brushed finishes stain faster and need sealing more often.",
    stains:
      "Mix poultice powder with a little dish soap into a paste, spread it over the stain, cover with plastic wrap and tape the edges. Leave it a couple of days to draw the stain out. Stains from spills left a long time often fade on their own. Still there? Call us.",
    avoid: ["Vinegar, lemon and other citrus", "Bathroom, grout and tub & tile cleaners", "Abrasive cleansers, dry or soft"],
  },
  {
    id: "marble",
    name: "Marble",
    summary: "Marble is sealed before install, but it's porous, so plan on resealing periodically. Treat it a little more gently and it will age beautifully.",
    daily: "Mild, non-abrasive dish soap or a stone soap and water. A little soap goes a long way; rinse and dry thoroughly.",
    spills: "Blot immediately, then clean with mild soap and water, rinse, and dry with a soft cloth. Acids etch marble, so don't let them sit.",
    stubborn: "Acetone on a soft cloth, gentle scrub, then rinse thoroughly.",
    sealing: "Reseal periodically after installation. Honed or brushed marble stains faster than polished and needs sealing more often.",
    stains:
      "Poultice: powder plus a little dish soap mixed to a paste, spread over the stain, covered with plastic wrap and taped down for a couple of days.",
    avoid: ["Vinegar, lemon and other citrus", "Bathroom, grout and tub & tile cleaners", "Abrasive cleansers, dry or soft"],
  },
  {
    id: "quartz",
    name: "Quartz",
    summary: "No sealing, polishing or reconditioning. Soap and water handles almost everything. The one rule: protect it from heat.",
    daily: "Mild, non-abrasive dish soap or stone soap with water. Use only a little soap to avoid a film; rinse and dry.",
    spills: "Blot (don't wipe), then mild soap and water, rinse, and dry with a soft cloth. Repeat if needed.",
    stubborn: "A gentle liquid cleaner like Bar Keepers Friend with a soft cloth or a white Scotch-Brite pad. Never red or green pads: they contain aluminum oxide and dull the finish.",
    sealing: "Polished quartz never needs sealing. Honed or brushed finishes show stains more easily and need more frequent attention.",
    avoid: [
      "Hot pans, slow cookers, fryers and skillets directly on the surface: use trivets",
      "Comet, Ajax and other abrasive cleaners",
      "Acidic cleaners, vinegar, lemon and citrus",
      "Red or green scouring pads",
    ],
  },
];

export const heatWarning =
  "Sudden temperature changes or sustained heat, especially near edges and cutouts, can crack quartz, and manufacturers don't cover heat damage under warranty. Trivets and hot pads every time.";

/* ------------------------------------------------------------------
   Projects. Photos are placeholders until L&L supplies their own (see README).
   ------------------------------------------------------------------ */

export type Room = "kitchen" | "bath" | "commercial";

export type Project = {
  slug: string;
  title: string;
  material: MaterialId;
  room: Room;
  summary: string;
  story: string;
  scope: string;
  images: ImageName[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "open-plan-waterfall-island",
    title: "Open-Plan Waterfall Island",
    material: "quartz",
    room: "kitchen",
    summary: "A long white quartz island, mitered to the floor at both ends.",
    story:
      "The island is the centerpiece of this open plan, so the slab was laid out to carry its soft gray veining unbroken over the top and down both waterfall ends. Perimeter tops were cut from the same lot so the whole room reads as one.",
    scope: "Island with mitered waterfall ends, perimeter runs, undermount farmhouse sink",
    images: ["proj-open-plan-1", "proj-open-plan-2", "proj-open-plan-3", "proj-open-plan-4"],
    featured: true,
  },
  {
    slug: "calacatta-waterfall",
    title: "Bold-Vein Waterfall",
    material: "marble",
    room: "kitchen",
    summary: "Dramatic veining, book-matched down the island's waterfall.",
    story:
      "Big, sweeping veins only work when they're placed with intent. We laid this one out so the movement runs diagonally across the top and continues down the end panel, echoing the full-height slab wall behind it.",
    scope: "Island with waterfall end, full-height slab feature wall",
    images: ["waterfall-island"],
    featured: true,
  },
  {
    slug: "jet-black-island",
    title: "Jet-Black Island",
    material: "granite",
    room: "kitchen",
    summary: "Deep black granite on a clean-lined island.",
    story:
      "Black granite is about as durable as countertops get, and polished it reads like glass. Squared edges keep it sharp and modern against the warm wood stools.",
    scope: "Island top, eased square edge",
    images: ["proj-black-island", "granite-black"],
    featured: true,
  },
  {
    slug: "statuary-double-vanity",
    title: "Statuary Double Vanity",
    material: "marble",
    room: "bath",
    summary: "White marble vanity framed by a full slab wall.",
    story:
      "A primary bath with two undermount sinks, brass fixtures and a marble wall behind. The vanity top was cut so its veining lines up with the wall slab for a continuous look.",
    scope: "Double vanity, undermount sinks drilled for widespread faucets",
    images: ["proj-marble-bath"],
    featured: true,
  },
  {
    slug: "traditional-black-granite",
    title: "Traditional Kitchen, Black Granite",
    material: "granite",
    room: "kitchen",
    summary: "Honey oak cabinets anchored by dark granite.",
    story:
      "A classic pairing that never goes out of style. The dark granite grounds the warm wood, and the island houses a full gas cooktop cut in the shop to the manufacturer's specs.",
    scope: "Perimeter, island with cooktop cutout, undermount sink",
    images: ["proj-classic-granite-1"],
    featured: true,
  },
  {
    slug: "gold-vein-quartz",
    title: "Gold-Vein Quartz Kitchen",
    material: "quartz",
    room: "kitchen",
    summary: "Warm white quartz with gold veining and brass accents.",
    story:
      "Gold veining ties the stone to the brass hardware and stools. Quartz keeps it practical: no sealing, and a bright surface that stays that way.",
    scope: "Island, perimeter, full-height backsplash",
    images: ["proj-gold-vein", "quartz-texture"],
    featured: true,
  },
  {
    slug: "warm-modern-kitchen",
    title: "Warm Modern Kitchen",
    material: "quartz",
    room: "kitchen",
    summary: "A long seating island in a dark, warm kitchen.",
    story:
      "Seating for five along an island that wraps at both ends. Pendant light rakes across the surface, so the finish and seams had to be flawless.",
    scope: "Island with waterfall ends, perimeter",
    images: ["hero-kitchen"],
  },
  {
    slug: "marble-backsplash",
    title: "Full-Height Marble Backsplash",
    material: "marble",
    room: "kitchen",
    summary: "Slab backsplash running to the ceiling behind the range.",
    story:
      "Instead of tile, a single run of marble slab climbs the wall behind the sink and range hood. Fewer grout lines, more stone.",
    scope: "Full-height slab backsplash, perimeter tops",
    images: ["proj-marble-backsplash"],
  },
  {
    slug: "marble-island-dark-cabinets",
    title: "Marble Island, Dark Cabinetry",
    material: "marble",
    room: "kitchen",
    summary: "Bright stone against charcoal cabinets.",
    story: "High contrast done right: white marble with gray veining lights up a run of dark, flat-panel cabinets.",
    scope: "Island with waterfall end, perimeter",
    images: ["proj-marble-island"],
  },
  {
    slug: "family-kitchen-peninsula",
    title: "Family Kitchen Peninsula",
    material: "granite",
    room: "kitchen",
    summary: "A light granite peninsula built for homework and dinner.",
    story: "A big L-shaped peninsula in a busy family kitchen, chosen for durability and a light, easy-living color.",
    scope: "L-shaped peninsula, perimeter",
    images: ["proj-classic-granite-2"],
  },
  {
    slug: "speckled-waterfall-peninsula",
    title: "Speckled Waterfall Peninsula",
    material: "quartz",
    room: "kitchen",
    summary: "Terrazzo-look quartz paired with walnut.",
    story: "Chunky, speckled quartz on a waterfall peninsula and backsplash, set against walnut cabinetry for a modern, warm look.",
    scope: "Peninsula with waterfall end, backsplash",
    images: ["proj-terrazzo-waterfall"],
  },
  {
    slug: "bright-white-quartz",
    title: "Bright White Quartz",
    material: "quartz",
    room: "kitchen",
    summary: "Crisp white quartz with brass fixtures.",
    story: "Clean, bright and practically maintenance-free. A white quartz with an undermount sink and a polished eased edge.",
    scope: "Perimeter, undermount sink",
    images: ["proj-white-quartz"],
  },
  {
    slug: "farmhouse-marble-island",
    title: "Farmhouse Marble Island",
    material: "marble",
    room: "kitchen",
    summary: "Marble island in a white shaker kitchen.",
    story: "Marble's soft veining warms up a bright shaker kitchen, and the waterfall end turns the island into furniture.",
    scope: "Island with waterfall end",
    images: ["proj-classic-marble"],
  },
  {
    slug: "primary-bath-vanity",
    title: "Primary Bath Vanity",
    material: "quartz",
    room: "bath",
    summary: "Long quartz vanity with plenty of counter space.",
    story: "A long, simple vanity top in quartz: no sealing, unbothered by toothpaste and makeup, easy to wipe down.",
    scope: "Vanity top, undermount sink",
    images: ["proj-quartz-vanity"],
  },
  {
    slug: "floating-vanity",
    title: "Floating Vanity, Modern Bath",
    material: "quartz",
    room: "bath",
    summary: "A slim top on a wall-hung vanity.",
    story: "A thin, clean-edged top for a floating vanity with a vessel sink, set against large-format gray stone tile.",
    scope: "Vanity top, vessel sink cutout",
    images: ["proj-stone-bath"],
  },
  {
    slug: "restaurant-bar",
    title: "Restaurant Bar & Service Counters",
    material: "granite",
    room: "commercial",
    summary: "Hard-working stone for a busy dining room.",
    story:
      "Commercial counters take a beating. Granite handles heat, spills and constant use, and it still looks sharp at the end of a Saturday night.",
    scope: "Bar top, service stations",
    images: ["proj-restaurant"],
  },
  {
    slug: "cafe-counters",
    title: "Café Counters",
    material: "quartz",
    room: "commercial",
    summary: "Non-porous quartz where food is served all day.",
    story: "Quartz is non-porous and resists bacterial growth, which makes it a natural fit for food service counters.",
    scope: "Service counter, pickup ledge",
    images: ["proj-cafe-counter"],
  },
];

export const roomLabel: Record<Room, string> = { kitchen: "Kitchen", bath: "Bath", commercial: "Commercial" };
export const materialLabel: Record<MaterialId, string> = { granite: "Granite", marble: "Marble", quartz: "Quartz" };

/** Quote form choices. */
export const quote = {
  projectTypes: ["Kitchen", "Bath", "Commercial", "Other"],
  contactMethods: ["Call", "Text", "Email"],
  viewTimes: ["Weekday morning", "Weekday afternoon", "Not yet / not sure"],
};
