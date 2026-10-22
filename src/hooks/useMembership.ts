import { useAuth } from "@clerk/expo";
import { useMembershipStore } from "@/store/membershipStore";
import type { PlanId } from "@/types/membership";

export function useMembership() {
  const { userId } = useAuth();
  const subscription = useMembershipStore((s) => (userId ? s.subscriptions[userId] : undefined));
  const subscribeStore = useMembershipStore((s) => s.subscribe);
  const cancelStore = useMembershipStore((s) => s.cancel);

  return {
    isMember: !!subscription,
    plan: subscription?.plan,
    startedAt: subscription?.startedAt,
    subscribe: (plan: PlanId) => {
      if (userId) subscribeStore(userId, plan);
    },
    cancel: () => {
      if (userId) cancelStore(userId);
    },
  };
}