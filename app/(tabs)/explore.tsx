import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { products } from "@/data/products";
import type { CategoryId } from "@/types/product";
import CategoryChips from "@/components/CategoryChips";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import { useSearchTracking } from "@/hooks/useSearchTracking";
type SortId = "featured" | "new" | "low" | "high";

const sorts: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
];

export default function Explore() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [sort, setSort] = useState<SortId>("featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.includes(q))
    );

    const sorted = [...list];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    if (sort === "new") sorted.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return sorted;
  }, [query, category, sort]);
    useSearchTracking(query, results.length, "explore");

  const header = (
    <View>
      <View className="px-5 pb-4 pt-2">
        <Text className="font-display-bold text-4xl text-ink">Explore</Text>
        <View className="mt-4 flex-row items-center rounded-full border border-line bg-ivory px-4">
          <Ionicons name="search-outline" size={18} color="#6F6A60" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search the full collection"
            placeholderTextColor="#9B958A"
            className="ml-2 flex-1 py-3 font-body text-sm text-ink"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color="#9B958A" />
            </Pressable>
          )}
        </View>
      </View>

      <CategoryChips selected={category} onSelect={setCategory} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingHorizontal: 20 }}
        className="mt-4"
      >
        {sorts.map((s) => (
          <Pressable key={s.id} onPress={() => setSort(s.id)}>
            <Text
              className={`font-body-medium text-xs uppercase tracking-wider ${
                sort === s.id ? "text-gold" : "text-muted"
              }`}
            >
              {s.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text className="mb-3 mt-4 px-5 font-body text-xs text-muted">
        {results.length} {results.length === 1 ? "piece" : "pieces"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={header}
        keyboardShouldPersistTaps="handled"
        columnWrapperStyle={{ gap: 14, paddingHorizontal: 20, marginBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={
          <EmptyState title="No pieces found" message="Try a different search, category or sort." />
        }
      />
    </SafeAreaView>
  );
}