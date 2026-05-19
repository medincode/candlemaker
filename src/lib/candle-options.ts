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
    name: "Bocal en Verre",
    emoji: "🫙",
    description: "Élégant et intemporel, laisse briller la couleur de la cire",
    basePrice: 240,
    shape: "jar",
  },
  {
    id: "concrete",
    name: "Pot en Béton",
    emoji: "🪨",
    description: "Minimaliste et texturé, esthétique industrielle-chic",
    basePrice: 320,
    shape: "pot",
  },
  {
    id: "ceramic",
    name: "Bol en Céramique",
    emoji: "🍵",
    description: "Artisanal, large flamme, magnifique pièce maîtresse",
    basePrice: 380,
    shape: "bowl",
  },
  {
    id: "tin",
    name: "Boîte Métal",
    emoji: "🫙",
    description: "Compact, finition mate, parfait pour offrir",
    basePrice: 180,
    shape: "tin",
  },
];

export const WAXES: Wax[] = [
  {
    id: "soy",
    name: "Cire de Soja",
    emoji: "🌿",
    description: "Combustion propre, écologique, retient magnifiquement les parfums",
    priceAdd: 0,
    burnTime: "45–55 h",
    ecoRating: 4,
    properties: ["Vegan", "Propre", "Biodégradable"],
  },
  {
    id: "coconut",
    name: "Cire de Coco",
    emoji: "🥥",
    description: "Texture crémeuse premium, diffusion olfactive supérieure",
    priceAdd: 60,
    burnTime: "50–60 h",
    ecoRating: 5,
    properties: ["Luxe", "Crémeuse", "Intense"],
  },
  {
    id: "beeswax",
    name: "Cire d'Abeille",
    emoji: "🍯",
    description: "Notes de miel naturelles, propriétés purifiantes",
    priceAdd: 80,
    burnTime: "60–80 h",
    ecoRating: 4,
    properties: ["Naturelle", "Miel", "Purifiante"],
  },
  {
    id: "paraffin",
    name: "Paraffine",
    emoji: "✨",
    description: "Classique, couleurs vives, combustion régulière",
    priceAdd: 0,
    burnTime: "35–45 h",
    ecoRating: 2,
    properties: ["Classique", "Colorée", "Accessible"],
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
        name: "Rose & Géranium",
        description: "Un bouquet romantique de roses fraîches et de géranium doux",
        notes: ["Rose", "Géranium", "Feuille verte"],
      },
      {
        id: "jasmine-ylang",
        name: "Jasmin & Ylang",
        description: "Floraux envoûtants et sensuels aux accents tropicaux",
        notes: ["Jasmin", "Ylang ylang", "Musc blanc"],
      },
      {
        id: "peony-magnolia",
        name: "Pivoine & Magnolia",
        description: "Pétales poudrés, délicats et féminins",
        notes: ["Pivoine", "Magnolia", "Air frais"],
      },
      {
        id: "lavender-chamomile",
        name: "Lavande & Camomille",
        description: "Mélange apaisant pour la nuit, pure relaxation",
        notes: ["Lavande", "Camomille", "Miel"],
      },
    ],
  },
  {
    id: "woody",
    name: "Boisé",
    emoji: "🌲",
    scents: [
      {
        id: "sandalwood-cedar",
        name: "Santal & Cèdre",
        description: "Bois chauds et enracinants sur fond crémeux de santal",
        notes: ["Santal", "Cèdre", "Vanille"],
      },
      {
        id: "patchouli-amber",
        name: "Patchouli & Ambre",
        description: "Profondeur terreuse et résineuse avec chaleur ambrée",
        notes: ["Patchouli", "Ambre", "Vétiver"],
      },
      {
        id: "pine-eucalyptus",
        name: "Pin & Eucalyptus",
        description: "Air de forêt crisp, tonique et spa-like",
        notes: ["Pin", "Eucalyptus", "Camphre"],
      },
    ],
  },
  {
    id: "fresh",
    name: "Frais",
    emoji: "🌊",
    scents: [
      {
        id: "sea-breeze-mint",
        name: "Brise Marine & Menthe",
        description: "Air océanique avec menthe fraîche, instantanément revigorant",
        notes: ["Sel marin", "Menthe", "Agrumes"],
      },
      {
        id: "green-tea-lemon",
        name: "Thé Vert & Citron",
        description: "Vibes spa zen, propre et vivifiant",
        notes: ["Thé vert", "Citron", "Concombre"],
      },
      {
        id: "rain-water-lily",
        name: "Pluie & Nénuphar",
        description: "Fraîcheur rosée après une pluie matinale",
        notes: ["Pluie", "Nénuphar", "Cèdre blanc"],
      },
      {
        id: "citrus-bergamot",
        name: "Agrumes & Bergamote",
        description: "Explosion d'agrumes zestés avec profondeur de bergamote",
        notes: ["Orange", "Bergamote", "Citron vert"],
      },
    ],
  },
  {
    id: "spicy",
    name: "Épicé",
    emoji: "🌶️",
    scents: [
      {
        id: "vanilla-cinnamon",
        name: "Vanille & Cannelle",
        description: "Épices douillettes comme des viennoiseries fraîches",
        notes: ["Vanille", "Cannelle", "Clou de girofle"],
      },
      {
        id: "tobacco-vanilla",
        name: "Tabac & Vanille",
        description: "Douceur fumée sophistiquée et profonde",
        notes: ["Feuille de tabac", "Vanille", "Santal"],
      },
      {
        id: "cardamom-ginger",
        name: "Cardamome & Gingembre",
        description: "Mélange d'épices exotiques, réchauffant et mystérieux",
        notes: ["Cardamome", "Gingembre", "Poivre noir"],
      },
    ],
  },
];

export const WAX_COLORS: WaxColor[] = [
  { id: "ivory", name: "Ivoire", hex: "#FFFFF0" },
  { id: "blush", name: "Blush", hex: "#F4C2C2" },
  { id: "sage", name: "Sauge", hex: "#8FAF8A" },
  { id: "lavender", name: "Lavande", hex: "#C9B8E8" },
  { id: "charcoal", name: "Charbon", hex: "#4A4A4A" },
];

export const BOTANICALS: Botanical[] = [
  { id: "rose-petals", name: "Pétales de Rose", emoji: "🌹", priceAdd: 30 },
  { id: "lavender-buds", name: "Boutons de Lavande", emoji: "💜", priceAdd: 30 },
  { id: "citrus-slices", name: "Tranches d'Agrumes", emoji: "🍋", priceAdd: 30 },
  { id: "chamomile", name: "Fleurs de Camomille", emoji: "🌼", priceAdd: 30 },
];

export const WICK_TYPES: WickType[] = [
  {
    id: "cotton",
    name: "Coton",
    description: "Combustion propre et classique, peu de suie",
    emoji: "🤍",
  },
  {
    id: "wood",
    name: "Bois",
    description: "Crépitement doux et enveloppant",
    emoji: "🪵",
  },
  {
    id: "hemp",
    name: "Chanvre",
    description: "Éco-responsable, combustion lente et régulière",
    emoji: "🌿",
  },
];

export const LABEL_PRICE_ADD = 20;

export function calculatePrice(design: {
  vessel?: Vessel | null;
  wax?: Wax | null;
  botanicals?: string[];
  label?: string;
}): number {
  let price = 0;
  if (design.vessel) price += design.vessel.basePrice;
  if (design.wax) price += design.wax.priceAdd;
  if (design.botanicals) price += design.botanicals.length * 30;
  if (design.label && design.label.trim().length > 0) price += LABEL_PRICE_ADD;
  return price;
}
