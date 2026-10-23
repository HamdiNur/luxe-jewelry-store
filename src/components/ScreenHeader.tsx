import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ScreenHeader({ title }: { title: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-row items-center px-5 pb-3" style={{ paddingTop: insets.top + 8 }}>
      <Pressable
        onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        className="h-11 w-11 items-center justify-center rounded-full border border-line bg-ivory"
      >
        <Ionicons name="chevron-back" size={22} color="#111111" />
      </Pressable>
      <Text className="ml-4 font-display-bold text-3xl text-ink">{title}</Text>
    </View>
  );
}