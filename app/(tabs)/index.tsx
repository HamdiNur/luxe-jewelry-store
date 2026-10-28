import CategoryChips from "@/components/CategoryChips";
import CollectionsRow from "@/components/CollectionsRow";
import ProductCard from "@/components/ProductCard";
import PromoBanner from "@/components/PromoBanner";
import SectionHeader from "@/components/SectionHeader";
import { products } from "@/data/products";
import { useSearchTracking } from "@/hooks/useSearchTracking";
import type { CategoryId } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)),
    );
  }, [query, category]);

  useSearchTracking(query, filtered.length, "home");

  const header = (
    <View>
      <View className="px-5 pb-4 pt-2">
        <Text className="font-display-bold text-4xl tracking-[6px] text-ink">
          LUXE
        </Text>
        <View className="mt-4 flex-row items-center rounded-full border border-line bg-ivory px-4">
          <Ionicons name="search-outline" size={18} color="#6F6A60" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search rings, pearls, gold…"
            placeholderTextColor="#9B958A"
            className="ml-2 flex-1 py-3 font-body text-sm text-ink"
            returnKeyType="search"
          />
        </View>
      </View>

      <PromoBanner />

      <SectionHeader title="Featured Collections" />
      <CollectionsRow onSelect={setCategory} />
      <SectionHeader title="Shop by Category" />
      <CategoryChips selected={category} onSelect={setCategory} />

      <View className="h-5" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={header}
        keyboardShouldPersistTaps="handled"
        columnWrapperStyle={{
          gap: 14,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={
          <View className="items-center px-8 py-16">
            <Ionicons name="search-outline" size={32} color="#B8934A" />
            <Text className="mt-3 font-display-semibold text-xl text-ink">
              No pieces found
            </Text>
            <Text className="mt-1 text-center font-body text-sm text-muted">
              Try a different search or category.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}