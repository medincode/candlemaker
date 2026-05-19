export type Vessel = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  basePrice: number;
  shape: "jar" | "pot" | "bowl" | "tin";
};

export type Wax = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  priceAdd: number;
  burnTime: string;
  ecoRating: number;
  properties: string[];
};

export type ScentCategory = {
  id: string;
  name: string;
  emoji: string;
  scents: Scent[];
};

export type Scent = {
  id: string;
  name: string;
  description: string;
  notes: string[];
};

export type WaxColor = {
  id: string;
  name: string;
  hex: string;
};

export type Botanical = {
  id: string;
  name: string;
  emoji: string;
  priceAdd: number;
};

export type WickType = {
  id: string;
  name: string;
  description: string;
  emoji: string;
};

export const VESSELS: Vessel[] = [
  {
    id: "jar",
    name: "Classic Jar",
    emoji: "🫙",
    description: "Timeless clear glass, lets the wax color shine beautifully",
    basePrice: 24,
    shape: "jar",
  },
  {
    id: "concrete",
    name: "Concrete Pot",
    emoji: "🪨",
    description: "Industrial-chic, minimalist and uniquely textured",
    basePrice: 32,
    shape: "pot",
  },
  {
    id: "ceramic",
    name: "Ceramic Bowl",
    emoji: "🍵",
    description: "Artisan-crafted, wide flame glow, stunning centerpiece",
    basePrice: 38,
    shape: "bowl",
  },
  {
    id: "tin",
    name: "Tin Box",
    emoji: "🫙",
    description: "Travel-friendly, matte finish, perfect for gifting",
    basePrice: 18,
    shape: "tin",
  },
];

export const WAXES: Wax[] = [
  {
    id: "soy",
    name: "Soy Wax",
    emoji: "🌿",
    description: "Clean-burning, eco-friendly, holds scent beautifully",
    priceAdd: 0,
    burnTime: "45–55 hrs",
    ecoRating: 4,
    properties: ["Vegan", "Clean burn", "Biodegradable"],
  },
  {
    id: "coconut",
    name: "Coconut Wax",
    emoji: "🥥",
    description: "Premium creamy texture, superior scent throw",
    priceAdd: 6,
    burnTime: "50–60 hrs",
    ecoRating: 5,
    properties: ["Luxury", "Creamy", "Strong scent"],
  },
  {
    id: "beeswax",
    name: "Beeswax",
    emoji: "🍯",
    description: "Natural honey undertones, air-purifying properties",
    priceAdd: 8,
    burnTime: "60–80 hrs",
    ecoRating: 4,
    properties: ["Natural", "Honey notes", "Air purifying"],
  },
  {
    id: "paraffin",
    name: "Paraffin",
    emoji: "✨",
    description: "Classic choice, vibrant colors, affordable luxury",
    priceAdd: 0,
    burnTime: "35–45 hrs",
    ecoRating: 2,
    properties: ["Classic", "Vivid color", "Budget-friendly"],
  },
];

export const SCENT_CATEGORIES: ScentCategory[] = [
  {
    id: "floral",
    name: "Floral",
    emoji: "🌸",
    scents: [
      {
        id: "rose-geranium",
        name: "Rose & Geranium",
        description: "A romantic bouquet of fresh roses with soft geranium",
        notes: ["Rose", "Geranium", "Green leaf"],
      },
      {
        id: "jasmine-ylang",
        name: "Jasmine & Ylang",
        description: "Heady, sensual florals with a tropical heart",
        notes: ["Jasmine", "Ylang ylang", "White musk"],
      },
      {
        id: "peony-magnolia",
        name: "Peony & Magnolia",
        description: "Soft powdery petals, delicate and feminine",
        notes: ["Peony", "Magnolia", "Fresh air"],
      },
      {
        id: "lavender-chamomile",
        name: "Lavender & Chamomile",
        description: "Calming bedtime blend, pure relaxation",
        notes: ["Lavender", "Chamomile", "Honey"],
      },
    ],
  },
  {
    id: "woody",
    name: "Woody",
    emoji: "🌲",
    scents: [
      {
        id: "sandalwood-cedar",
        name: "Sandalwood & Cedar",
        description: "Warm, grounding woods with a creamy sandalwood base",
        notes: ["Sandalwood", "Cedar", "Vanilla"],
      },
      {
        id: "patchouli-amber",
        name: "Patchouli & Amber",
        description: "Earthy, resinous depth with golden amber warmth",
        notes: ["Patchouli", "Amber", "Vetiver"],
      },
      {
        id: "pine-eucalyptus",
        name: "Pine & Eucalyptus",
        description: "Crisp forest air, spa-like and invigorating",
        notes: ["Pine", "Eucalyptus", "Camphor"],
      },
    ],
  },
  {
    id: "fresh",
    name: "Fresh",
    emoji: "🌊",
    scents: [
      {
        id: "sea-breeze-mint",
        name: "Sea Breeze & Mint",
        description: "Ocean air with cooling mint, instantly refreshing",
        notes: ["Sea salt", "Spearmint", "Citrus"],
      },
      {
        id: "green-tea-lemon",
        name: "Green Tea & Lemon",
        description: "Clean, uplifting zen spa vibes",
        notes: ["Green tea", "Lemon", "Cucumber"],
      },
      {
        id: "rain-water-lily",
        name: "Rain & Water Lily",
        description: "Dewy freshness after morning rain",
        notes: ["Rain", "Water lily", "White cedar"],
      },
      {
        id: "citrus-bergamot",
        name: "Citrus & Bergamot",
        description: "Energising burst of zesty citrus with bergamot depth",
        notes: ["Orange", "Bergamot", "Lime"],
      },
    ],
  },
  {
    id: "spicy",
    name: "Spicy",
    emoji: "🌶️",
    scents: [
      {
        id: "vanilla-cinnamon",
        name: "Vanilla & Cinnamon",
        description: "Cosy, warm spice like fresh-baked pastries",
        notes: ["Vanilla", "Cinnamon", "Clove"],
      },
      {
        id: "tobacco-vanilla",
        name: "Tobacco & Vanilla",
        description: "Sophisticated, smoky sweetness with depth",
        notes: ["Tobacco leaf", "Vanilla", "Sandalwood"],
      },
      {
        id: "cardamom-ginger",
        name: "Cardamom & Ginger",
        description: "Exotic spice blend, warming and mysterious",
        notes: ["Cardamom", "Ginger", "Black pepper"],
      },
    ],
  },
];

export const WAX_COLORS: WaxColor[] = [
  { id: "ivory", name: "Ivory", hex: "#FFFFF0" },
  { id: "blush", name: "Blush Pink", hex: "#F4C2C2" },
  { id: "sage", name: "Sage", hex: "#8FAF8A" },
  { id: "lavender", name: "Lavender", hex: "#C9B8E8" },
  { id: "charcoal", name: "Charcoal", hex: "#4A4A4A" },
];

export const BOTANICALS: Botanical[] = [
  { id: "rose-petals", name: "Rose Petals", emoji: "🌹", priceAdd: 3 },
  { id: "lavender-buds", name: "Lavender Buds", emoji: "💜", priceAdd: 3 },
  { id: "citrus-slices", name: "Citrus Slices", emoji: "🍋", priceAdd: 3 },
  { id: "chamomile", name: "Chamomile Flowers", emoji: "🌼", priceAdd: 3 },
];

export const WICK_TYPES: WickType[] = [
  {
    id: "cotton",
    name: "Cotton",
    description: "Classic clean burn, minimal soot",
    emoji: "🤍",
  },
  {
    id: "wood",
    name: "Wood",
    description: "Soft crackling sound, cosy ambiance",
    emoji: "🪵",
  },
  {
    id: "hemp",
    name: "Hemp",
    description: "Eco-friendly, slow even burn",
    emoji: "🌿",
  },
];

export const LABEL_PRICE_ADD = 2;

export function calculatePrice(design: {
  vessel?: Vessel | null;
  wax?: Wax | null;
  botanicals?: string[];
  label?: string;
}): number {
  let price = 0;
  if (design.vessel) price += design.vessel.basePrice;
  if (design.wax) price += design.wax.priceAdd;
  if (design.botanicals) price += design.botanicals.length * 3;
  if (design.label && design.label.trim().length > 0) price += LABEL_PRICE_ADD;
  return price;
}
