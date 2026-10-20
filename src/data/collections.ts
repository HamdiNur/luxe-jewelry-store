import type { CategoryId } from "@/types/product";
import { productImages as img } from "./images";

export const collections = [
  { id: "c1", title: "The Signature Edit", subtitle: "Rings", category: "rings" as CategoryId, image: img.goldenHourRing },
  { id: "c2", title: "Golden Threads", subtitle: "Necklaces", category: "necklaces" as CategoryId, image: img.lunaPendant },
  { id: "c3", title: "The Earring Atelier", subtitle: "Earrings", category: "earrings" as CategoryId, image: img.novaDrops },
];