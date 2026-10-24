import { Pressable, Text, View } from "react-native";
import type { Plan } from "@/data/plans";
import { formatPrice } from "@/utils/format";

type Props = { plan: Plan; selected: boolean; onPress: () => void };

export default function PlanCard({ plan, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-3 flex-row items-center rounded-2xl border bg-ivory p-4 ${
        selected ? "border-ink" : "border-line"
      }`}
    >
      <View
        className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
          selected ? "border-ink" : "border-line"
        }`}
      >
        {selected && <View className="h-2.5 w-2.5 rounded-full bg-gold" />}
      </View>

      <View className="ml-3 flex-1">
        <View className="flex-row items-center">
          <Text className="font-body-semibold text-[15px] text-ink">{plan.name}</Text>
          {plan.badge && (
            <View className="ml-2 rounded-full bg-gold px-2 py-0.5">
              <Text className="font-body-semibold text-[10px] uppercase tracking-wider text-ink">{plan.badge}</Text>
            </View>
          )}
        </View>
        {plan.note && <Text className="mt-0.5 font-body text-xs text-muted">{plan.note}</Text>}
      </View>

      <Text className="font-display-bold text-2xl text-ink">
        {formatPrice(plan.price)}
        <Text className="font-body text-xs text-muted"> /{plan.period}</Text>
      </Text>
    </Pressable>
  );
}