import type { Metal } from "./product";

// Orders keep a snapshot of name and price, so history stays correct even if products change later.
export interface OrderLine {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  metal?: Metal;
  size?: string;
}

export interface Order {
  id: string;
  number: string;
  userId: string;
  createdAt: string; // ISO date
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
}