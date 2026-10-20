import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PromoBanner() {
  return (
    <View className="mx-5 overflow-hidden rounded-3xl">
      <LinearGradient colors={["#111111", "#2b2417"]} style={{ padding: 24 }}>
        <Text className="font-body-medium text-xs uppercase tracking-[3px] text-gold-light">
          Autumn Collection
        </Text>
        <Text className="mt-2 font-display-bold text-4xl leading-10 text-white">
          Radiance{"\n"}in every detail
        </Text>
        <View className="mt-4 self-start rounded-full bg-gold px-4 py-2">
          <Text className="font-body-semibold text-xs text-ink">Shop the edit</Text>
        </View>
      </LinearGradient>
    </View>
  );
}