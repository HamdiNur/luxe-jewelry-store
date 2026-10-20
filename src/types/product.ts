import type { ImageSourcePropType } from "react-native";

export type CategoryId =
  | "rings" | "necklaces" | "bracelets" | "earrings" | "watches" | "luxury";

export type Metal = "gold" | "silver";

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  material: string;
  metals: Metal[];
  sizes?: string[];
  image?: ImageSourcePropType;
  gallery?: ImageSourcePropType[];
  featured?: boolean;
  isNew?: boolean;
}