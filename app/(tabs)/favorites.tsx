import { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { products } from "@/data/products";
import { useFavoritesStore } from "@/store/favoritesStore";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default function Favorites() {
  const ids = useFavoritesStore((s) => s.ids);
  const hydrated = useFavoritesStore((s) => s.hydrated);

  const saved = useMemo(
    () =>
      ids.flatMap((id) => {
        const p = products.find((x) => x.id === id);
        return p ? [p] : [];
      }),
    [ids]
  );

  if (!hydrated) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-cream">
        <ActivityIndicator color="#B8934A" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <View className="px-5 pb-4 pt-2">
            <Text className="font-display-bold text-4xl text-ink">Favorites</Text>
            {saved.length > 0 && (
              <Text className="mt-1 font-body text-xs text-muted">
                {saved.length} saved {saved.length === 1 ? "piece" : "pieces"}
              </Text>
            )}
          </View>
        }
        columnWrapperStyle={{ gap: 14, paddingHorizontal: 20, marginBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title="No favorites yet"
            message="Tap the heart on any piece to save it here."
          />
        }
      />
    </SafeAreaView>
  );
}