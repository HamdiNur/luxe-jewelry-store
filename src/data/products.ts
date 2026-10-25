import type { Product } from "@/types/product";
import { productImages as img } from "./images";

export const products: Product[] = [
  // ==================== RINGS ====================
  {
    id: "r1",
    name: "Aurelia Ring",
    category: "rings",
    price: 980,
    description:
      "An elegant polished gold ring with a softly domed profile, made to be worn every day.",
    material: "18k solid gold",
    metals: ["gold", "silver"],
    sizes: ["5", "6", "7", "8", "9"],
    image: img.aureliaRing,
    featured: true,
  },
  {
    id: "r2",
    name: "Solstice Band",
    category: "rings",
    price: 520,
    description:
      "A minimalist stacking band with a smooth finish. Wear one or layer several.",
    material: "14k gold",
    metals: ["gold", "silver"],
    sizes: ["5", "6", "7", "8", "9"],
    image: img.solsticeBand,
    isNew: true,
  },
  {
    id: "r3",
    name: "Celeste Solitaire",
    category: "rings",
    price: 2150,
    description:
      "A classic solitaire with a brilliant-cut stone raised on a slim, polished band.",
    material: "Platinum-finish silver, 0.5ct lab-grown diamond",
    metals: ["silver", "gold"],
    sizes: ["5", "6", "7", "8"],
    image: img.celesteSolitaire,
    featured: true,
  },
  {
    id: "r4",
    name: "Golden Hour Ring",
    category: "rings",
    price: 1350,
    description:
      "A sculptural statement ring in flowing gold curves that catch the light from every angle.",
    material: "18k gold",
    metals: ["gold"],
    sizes: ["5", "6", "7", "8", "9"],
    image: img.goldenHourRing,
  },
  {
    id: "r5",
    name: "Emerald Drop Ring",
    category: "rings",
    price: 1750,
    description:
      "A striking yellow-gold ring featuring a rich oval-cut green emerald solitaire setting.",
    material: "18k yellow gold, natural emerald",
    metals: ["gold"],
    sizes: ["5", "6", "7", "8"],
    image: img.emeraldDropRing,
    isNew: true,
  },
  {
    id: "r6",
    name: "Monolith Ring",
    category: "rings",
    price: 1890,
    description:
      "A bold, raised solitaire ring presented on an ivory display pedestal.",
    material: "18k yellow gold, brilliant-cut diamond",
    metals: ["gold"],
    sizes: ["5", "6", "7", "8"],
    image: img.monolith,
  },

  // ==================== NECKLACES ====================
  {
    id: "n1",
    name: "Luna Pendant",
    category: "necklaces",
    price: 640,
    description:
      "A delicate crescent pendant on a whisper-fine chain, resting just below the collarbone.",
    material: "14k gold, diamond accent",
    metals: ["gold", "silver"],
    sizes: ["40cm", "45cm"],
    image: img.lunaPendant,
    featured: true,
  },
  {
    id: "n2",
    name: "Sol Chain",
    category: "necklaces",
    price: 480,
    description:
      "A refined gold chain with a subtle shine. Wear it alone or as the base of a layered look.",
    material: "14k gold vermeil",
    metals: ["gold", "silver"],
    sizes: ["40cm", "45cm", "50cm"],
    image: img.solChain,
  },
  {
    id: "n3",
    name: "Amara Necklace",
    category: "necklaces",
    price: 720,
    description:
      "An elegant layered necklace with two fine strands at different lengths.",
    material: "14k gold",
    metals: ["gold"],
    sizes: ["40cm", "45cm"],
    image: img.amaraNecklace,
    isNew: true,
  },
  {
    id: "n4",
    name: "Eden Lariat",
    category: "necklaces",
    price: 590,
    description:
      "A fine lariat necklace with a delicate drop. Slip it through itself for an adjustable fit.",
    material: "14k gold",
    metals: ["gold", "silver"],
    image: img.edenLariat,
  },
  {
    id: "n5",
    name: "Emerald Pendant Necklace",
    category: "necklaces",
    price: 2100,
    description:
      "A vibrant pear-cut emerald suspended on a fine 18k gold chain.",
    material: "18k gold, natural emerald",
    metals: ["gold"],
    sizes: ["40cm", "45cm"],
    image: img.emeraldPendantNecklace,
    featured: true,
  },
  {
    id: "n6",
    name: "Solaria",
    category: "necklaces",
    price: 1950,
    description:
      "Radiant high-jewellery design celebrating brilliance and organic asymmetry.",
    material: "18k gold and fine gemstones",
    metals: ["gold"],
    sizes: ["40cm", "45cm"],
    image: img.solaria,
  },

  // ==================== EARRINGS ====================
  {
    id: "e1",
    name: "Sol Hoops",
    category: "earrings",
    price: 360,
    description:
      "Polished gold hoops with a comfortable hinged closure, light enough for all-day wear.",
    material: "14k gold vermeil",
    metals: ["gold", "silver"],
    image: img.solHoops,
    gallery: [img.solHoops, img.solHoops9],
    featured: true,
  },
  {
    id: "e2",
    name: "Pearl Muse",
    category: "earrings",
    price: 450,
    description:
      "Lustrous freshwater pearls with a soft, creamy glow, finished with gold settings.",
    material: "Freshwater pearls, 14k gold",
    metals: ["gold"],
    image: img.pearlMuse,
    gallery: [img.pearlMuse, img.pearlMuse2],
  },
  {
    id: "e3",
    name: "Nova Drops",
    category: "earrings",
    price: 540,
    description:
      "Modern gold drop earrings with a sleek, molten shape. Bold without being heavy.",
    material: "18k gold vermeil",
    metals: ["gold"],
    image: img.novaDrops,
    isNew: true,
  },
  {
    id: "e4",
    name: "Iris Studs",
    category: "earrings",
    price: 290,
    description:
      "Minimalist gemstone studs that add a quiet sparkle to any outfit.",
    material: "Sterling silver, cubic zirconia",
    metals: ["silver", "gold"],
    image: img.irisStuds,
  },
  {
    id: "e5",
    name: "Emerald Drop Earrings",
    category: "earrings",
    price: 1250,
    description:
      "Elegant drop earrings featuring vivid oval emeralds set in handcrafted gold mounts.",
    material: "18k gold, emeralds",
    metals: ["gold"],
    image: img.emeraldDropEarrings,
    isNew: true,
  },
  {
    id: "e6",
    name: "Nova Stud Set",
    category: "earrings",
    price: 380,
    description:
      "Matching minimalist organic gold studs and hammered hoop set.",
    material: "14k solid gold",
    metals: ["gold"],
    image: img.nova,
  },

  // ==================== BRACELETS ====================
  {
    id: "b1",
    name: "Soleil Cuff",
    category: "bracelets",
    price: 680,
    description:
      "An open structural cuff with a brushed gold finish inspired by radiant sunlight.",
    material: "18k brushed gold vermeil",
    metals: ["gold"],
    image: img.soleilCuff,
    isNew: true,
  },
  {
    id: "b2",
    name: "Elysian Link Collection",
    category: "bracelets",
    price: 850,
    description:
      "Interlocking polished links that drape fluidly around the wrist.",
    material: "14k solid gold",
    metals: ["gold", "silver"],
    image: img.elysianLinkCollection,
    featured: true,
  },

  {
    id: "b4",
    name: "Éclat Diamond Link Bracelet",
    category: "bracelets",
    price: 1450,
    description:
      "An oval gold bracelet embellished with subtle double rows of micro-pave clear diamonds.",
    material: "18k gold, brilliant diamonds",
    metals: ["gold"],
    image: img.eclat,
  },
  {
    id: "b5",
    name: "Imperia Bangle Display",
    category: "bracelets",
    price: 1100,
    description:
      "A minimalist gold cuff presented in an open velvet luxury packaging box.",
    material: "18k solid yellow gold",
    metals: ["gold"],
    image: img.imperia,
  },

  // ==================== WATCHES ====================
  {
    id: "w1",
    name: "Aurelia Watch",
    category: "watches",
    price: 1850,
    description:
      "A sophisticated timepiece featuring a sleek minimalist dial paired with a polished gold mesh strap.",
    material: "Stainless steel with gold plating, sapphire crystal",
    metals: ["gold"],
    image: img.aureliaWatch,
    featured: true,
  },
  {
    id: "w2",
    name: "Atlas Watch",
    category: "watches",
    price: 2100,
    description:
      "A classic luxury watch designed with precision quartz movement and an understated luxury leather strap.",
    material: "Rose gold finish, genuine leather",
    metals: ["gold", "silver"],
    image: img.atlasWatch,
    isNew: true,
  },
  {
    id: "w3",
    name: "Chronos",
    category: "watches",
    price: 2400,
    description:
      "An iconic statement timepiece crafted for timeless elegance and accurate daily wear.",
    material: "18k gold finish, stainless steel back",
    metals: ["gold"],
    image: img.chronos,
  },
  {
    id: "w4",
    name: "Lumera Watch",
    category: "watches",
    price: 1950,
    description:
      "Centered luxury watch display set against an open cream presentation box.",
    material: "Gold stainless steel, crystal bezel",
    metals: ["gold"],
    image: img.lumeraWatch,
    isNew: true,
  },
  {
    id: "w5",
    name: "Sovereign Timepiece",
    category: "watches",
    price: 2650,
    description:
      "A classic dark velvet box presentation holding a gold executive wristwatch.",
    material: "18k gold plating, swiss movement",
    metals: ["gold"],
    image: img.sovereign,
  },
  {
    id: "w6",
    name: "Voyager Watch",
    category: "watches",
    price: 2200,
    description:
      "Sleek, modern minimalist luxury watch designed with dark tones and clean lines.",
    material: "Matte black stainless steel",
    metals: ["silver"],
    image: img.voyager,
  },
  {
    id: "w7",
    name: "Aria Twisted Bangle",
    category: "watches",
    price: 920,
    description:
      "A sculptural open-ended bangle crafted with two fluidly twisting strands of solid polished gold.",
    material: "18k polished yellow gold",
    metals: ["gold"],
    image: img.aria,
    featured: true,
  },

  // ==================== LUXURY ====================
  {
    id: "l1",
    name: "Eternal",
    category: "luxury",
    price: 3200,
    description:
      "An exquisite high-end luxury piece crafted to commemorate life's most precious milestones.",
    material: "Platinum and certified conflict-free diamonds",
    metals: ["silver"],
    image: img.eternal,
    featured: true,
  },
  {
    id: "l2",
    name: "Teardrop",
    category: "luxury",
    price: 1450,
    description:
      "A delicate teardrop design suspended gracefully to catch every nuance of light.",
    material: "14k white gold and crystal accents",
    metals: ["silver"],
    image: img.teardrop,
  },
  {
    id: "l3",
    name: "Crown",
    category: "luxury",
    price: 2800,
    description:
      "Regal styling meets everyday refinement in this majestic crown-inspired statement piece.",
    material: "18k yellow gold",
    metals: ["gold"],
    image: img.crown,
  },
  {
    id: "l4",
    name: "Celeste High Jewelry Set",
    category: "luxury",
    price: 4500,
    description:
      "A masterwork luxury necklace and earring ensemble set in polished cream casing.",
    material: "18k gold, white diamonds",
    metals: ["gold"],
    image: img.celeste,
    featured: true,
  },
];
