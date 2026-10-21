import type { Product } from "@/types/product";
import { productImages as img } from "./images";

export const products: Product[] = [
  // Collection 1: The Signature Edit (Rings)
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

  // Collection 2: Golden Threads (Necklaces)
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

  // Collection 3: The Earring Atelier (Earrings)
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
    gallery: [img.solHoops, img.solHoops2],
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
    category: "bracelets",
    price: 290,
    description:
    //   "Minimalist gemstone studs that add a quiet sparkle to any outfit.",
    "A radiant gold bracelet featuring a continuous row of sparkling round stones in elegant bezel settings. Its polished finish and timeless silhouette bring refined brilliance to every occasion.",
  //     material: "Gold-plated metal with cubic zirconia stones"
    material: "Sterling silver, cubic zirconia",
    metals: ["silver", "gold"],
    image: img.irisStuds,
  },
  //   {
  //     id: "b1",
  //     name: "Soleil Cuff"r,
  //     category: "bracelets",
  //     price: 890,
  //     description:
  //       "A radiant gold bracelet featuring a continuous row of sparkling round stones in elegant bezel settings. Its polished finish and timeless silhouette bring refined brilliance to every occasion.",
  //     material: "Gold-plated metal with cubic zirconia stones",
  //     metals: ["gold"],
  //     image: img.soleilCuff,
  //     featured: true,
  //   },
];
