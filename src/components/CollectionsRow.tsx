import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { collections } from "@/data/collections";
import type { CategoryId } from "@/types/product";

type Props = { onSelect?: (id: CategoryId) => void };

export default function CollectionsRow({ onSelect }: Props) {
  // Safe fallback to prevent "TypeError: Cannot read property 'map' of undefined"
  const safeCollections = collections ?? [];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
    >
      {safeCollections.map((c) => (
        <Pressable
          key={c.id}
          onPress={() => onSelect?.(c.category)}
          className="h-44 w-48 overflow-hidden rounded-2xl active:opacity-85"
        >
          <Image
            source={c.image}
            contentFit="cover"
            style={StyleSheet.absoluteFill}
            transition={200}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={{ flex: 1, justifyContent: "flex-end", padding: 14 }}
          >
            <Text className="font-display-bold text-2xl leading-7 text-white">
              {c.title}
            </Text>
            <Text className="font-body text-xs uppercase tracking-widest text-gold-light">
              {c.subtitle}
            </Text>
          </LinearGradient>
        </Pressable>
      ))}
    </ScrollView>
  );
}