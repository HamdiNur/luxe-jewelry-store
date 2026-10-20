import { Pressable, ScrollView, Text } from "react-native";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/types/product";
import { products } from "@/data/products";
type Props = {
  selected: CategoryId | "all";
  onSelect: (id: CategoryId | "all") => void;
};

export default function CategoryChips({ selected, onSelect }: Props) {
  const available = categories.filter((c) => products.some((p) => p.category === c.id));
  const items = [{ id: "all" as const, label: "All" }, ...available];  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
      {items.map((c) => {
        const active = c.id === selected;
        return (
          <Pressable
            key={c.id}
            onPress={() => onSelect(c.id)}
            className={`rounded-full border px-4 py-2 ${active ? "border-ink bg-ink" : "border-line bg-ivory"}`}
          >
            <Text className={`font-body-medium text-sm ${active ? "text-gold-light" : "text-ink"}`}>{c.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}