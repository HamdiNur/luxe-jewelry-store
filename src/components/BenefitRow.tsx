import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

export default function BenefitRow({ icon, title, description }: Props) {
  return (
    <View className="flex-row items-start border-b border-line py-4">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-ink">
        <Ionicons name={icon} size={18} color="#D8BC7E" />
      </View>
      <View className="ml-4 flex-1">
        <Text className="font-body-semibold text-[15px] text-ink">{title}</Text>
        <Text className="mt-0.5 font-body text-sm leading-5 text-muted">{description}</Text>
      </View>
    </View>
  );
}