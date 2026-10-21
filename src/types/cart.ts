import type { Metal } from "./product";

export interface CartItem {
  key: string; // productId + metal + size, so different options become separate lines
  productId: string;
  metal?: Metal;
  size?: string;
  quantity: number;
}