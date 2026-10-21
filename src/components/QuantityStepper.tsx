import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export default function QuantityStepper({ value, onChange, min = 1, max = 10 }: Props) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <View className="flex-row items-center self-start rounded-full border border-line bg-ivory">
      <Pressable
        onPress={() => canDecrease && onChange(value - 1)}
        className={`h-11 w-11 items-center justify-center ${canDecrease ? "" : "opacity-30"}`}
        hitSlop={6}
      >
        <Ionicons name="remove" size={18} color="#111111" />
      </Pressable>
      <Text className="w-8 text-center font-body-semibold text-base text-ink">{value}</Text>
      <Pressable
        onPress={() => canIncrease && onChange(value + 1)}
        className={`h-11 w-11 items-center justify-center ${canIncrease ? "" : "opacity-30"}`}
        hitSlop={6}
      >
        <Ionicons name="add" size={18} color="#111111" />
      </Pressable>
    </View>
  );
}