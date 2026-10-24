import type { PlanId } from "@/types/membership";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  period: string;
  badge?: string;
  note?: string;
}

export const plans: Plan[] = [
  { id: "monthly", name: "Monthly", price: 19, period: "month" },
  { id: "yearly", name: "Yearly", price: 149, period: "year", badge: "Save 35%", note: "About $12.42 per month" },
];