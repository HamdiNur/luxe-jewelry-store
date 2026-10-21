import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
};

export default function EmptyState({ icon = "search-outline", title, message }: Props) {
  return (
    <View className="items-center px-8 py-16">
      <Ionicons name={icon} size={32} color="#B8934A" />
      <Text className="mt-3 font-display-semibold text-xl text-ink">{title}</Text>
      {message ? (
        <Text className="mt-1 text-center font-body text-sm text-muted">{message}</Text>
      ) : null}
    </View>
  );
}