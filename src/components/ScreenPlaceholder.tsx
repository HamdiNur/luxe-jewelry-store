import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function ScreenPlaceholder({ title, subtitle, icon }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 items-center justify-center px-8">
        <Ionicons name={icon} size={40} color="#B8934A" />
        <Text className="mt-4 font-display-semibold text-3xl text-ink">{title}</Text>
        <Text className="mt-2 text-center font-body text-muted">{subtitle}</Text>
      </View>
    </SafeAreaView>
  );
}