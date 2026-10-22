import { ActivityIndicator, Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "solid" | "outline";
};

export default function PrimaryButton({ label, onPress, loading, disabled, variant = "solid" }: Props) {
  const solid = variant === "solid";
  const inactive = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      className={`h-[52px] flex-row items-center justify-center rounded-full ${
        solid ? "bg-ink" : "border border-ink bg-transparent"
      } ${inactive ? "opacity-50" : "active:opacity-85"}`}
    >
      {loading ? (
        <ActivityIndicator color={solid ? "#D8BC7E" : "#111111"} />
      ) : (
        <Text className={`font-body-semibold text-[15px] ${solid ? "text-gold-light" : "text-ink"}`}>{label}</Text>
      )}
    </Pressable>
  );
}