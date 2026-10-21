import { Text, View } from "react-native";

type Props = { label: string; value: string; strong?: boolean };

export default function SummaryRow({ label, value, strong }: Props) {
  return (
    <View className="flex-row items-center justify-between py-1">
      <Text className={strong ? "font-body-semibold text-base text-ink" : "font-body text-sm text-muted"}>
        {label}
      </Text>
      <Text className={strong ? "font-body-semibold text-base text-ink" : "font-body text-sm text-ink"}>
        {value}
      </Text>
    </View>
  );
}