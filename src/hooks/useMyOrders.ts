import { useMemo } from "react";
import { useAuth } from "@clerk/expo";
import { useOrdersStore } from "@/store/ordersStore";

export function useMyOrders() {
  const { userId } = useAuth();
  const orders = useOrdersStore((s) => s.orders);
  const hydrated = useOrdersStore((s) => s.hydrated);

  const mine = useMemo(() => (userId ? orders.filter((o) => o.userId === userId) : []), [orders, userId]);
  return { orders: mine, hydrated };
}