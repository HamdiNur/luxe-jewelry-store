import type { CategoryId } from "@/types/product";
import { productImages as img } from "./images";

export const collections = [
  {
    id: "c1",
    title: "The Signature Edit",
    subtitle: "Rings",
    category: "rings" as CategoryId,
    image: img.goldenHourRing,
  },
  {
    id: "c6",
    title: "Grand Luxe",
    subtitle: "Luxury",
    category: "luxury" as CategoryId,
    image: img.eternal,
  },
  {
    id: "c2",
    title: "Golden Threads",
    subtitle: "Necklaces",
    category: "necklaces" as CategoryId,
    image: img.lunaPendant,
  },
  {
    id: "c3",
    title: "The Earring Atelier",
    subtitle: "Earrings",
    category: "earrings" as CategoryId,
    image: img.novaDrops,
  },
  {
    id: "c4",
    title: "Radiant Cuffs",
    subtitle: "Bracelets",
    category: "bracelets" as CategoryId,
    image: img.soleilCuff,
  },
  {
    id: "c5",
    title: "Timeless Precision",
    subtitle: "Watches",
    category: "watches" as CategoryId,
    image: img.aureliaWatch,
  },
];
