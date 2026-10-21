import { useMemo, useState } from "react";
import { Alert, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { ImageSourcePropType } from "react-native";
import { products } from "@/data/products";
import type { Metal } from "@/types/product";
import { formatPrice } from "@/utils/format";
import ImageGallery from "@/components/ImageGallery";
import QuantityStepper from "@/components/QuantityStepper";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

const metalStyle: Record<Metal, { label: string; color: string }> = {
  gold: { label: "Gold", color: "#D8BC7E" },
  silver: { label: "Silver", color: "#C9CCD0" },
};

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const product = products.find((p) => p.id === id);

  const [metal, setMetal] = useState<Metal | undefined>(product?.metals[0]);
  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
    const others = products.filter((p) => p.category !== product.category);
    return [...sameCategory, ...others].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-cream" style={{ paddingTop: insets.top }}>
        <EmptyState icon="alert-circle-outline" title="Piece not found" message="This item may no longer be available." />
        <Pressable onPress={() => router.back()} className="rounded-full bg-ink px-6 py-3">
          <Text className="font-body-semibold text-sm text-gold-light">Go back</Text>
        </Pressable>
      </View>
    );
  }

  const images = (product.gallery ?? (product.image ? [product.image] : [])) as ImageSourcePropType[];
  const total = product.price * quantity;

  const handleAddToCart = () => {
    // Stage 3 replaces this with the real cart.
    Alert.alert(
      "Added to cart (demo)",
      `${quantity} x ${product.name}${metal ? ` in ${metalStyle[metal].label}` : ""}${size ? `, size ${size}` : ""}`
    );
  };

  return (
    <View className="flex-1 bg-cream">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        <View>
          <ImageGallery images={images} />
          <Pressable
            onPress={() => router.back()}
            className="absolute left-4 h-11 w-11 items-center justify-center rounded-full bg-white/90"
            style={{ top: insets.top + 8 }}
          >
            <Ionicons name="chevron-back" size={22} color="#111111" />
          </Pressable>
        </View>

        <View className="px-5 pt-6">
          <Text className="font-body-medium text-xs uppercase tracking-[3px] text-gold">{product.category}</Text>
          <Text className="mt-1 font-display-bold text-4xl leading-10 text-ink">{product.name}</Text>
          <Text className="mt-2 font-body-semibold text-xl text-ink">{formatPrice(product.price)}</Text>

          <Text className="mt-5 font-body text-[15px] leading-6 text-muted">{product.description}</Text>

          <View className="mt-5 flex-row items-start rounded-2xl border border-line bg-ivory p-4">
            <Ionicons name="diamond-outline" size={18} color="#B8934A" />
            <View className="ml-3 flex-1">
              <Text className="font-body-medium text-xs uppercase tracking-wider text-muted">Material</Text>
              <Text className="mt-0.5 font-body text-sm text-ink">{product.material}</Text>
            </View>
          </View>

          <Text className="mb-3 mt-7 font-body-medium text-xs uppercase tracking-wider text-muted">
            Metal{metal ? `: ${metalStyle[metal].label}` : ""}
          </Text>
          <View className="flex-row gap-3">
            {product.metals.map((m) => {
              const active = m === metal;
              return (
                <Pressable
                  key={m}
                  onPress={() => setMetal(m)}
                  className={`flex-row items-center rounded-full border px-4 py-2.5 ${
                    active ? "border-ink bg-ink" : "border-line bg-ivory"
                  }`}
                >
                  <View
                    className="mr-2 h-4 w-4 rounded-full border border-black/10"
                    style={{ backgroundColor: metalStyle[m].color }}
                  />
                  <Text className={`font-body-medium text-sm ${active ? "text-gold-light" : "text-ink"}`}>
                    {metalStyle[m].label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {product.sizes && product.sizes.length > 0 && (
            <>
              <Text className="mb-3 mt-7 font-body-medium text-xs uppercase tracking-wider text-muted">
                Size{size ? `: ${size}` : ""}
              </Text>
              <View className="flex-row flex-wrap gap-2.5">
                {product.sizes.map((s) => {
                  const active = s === size;
                  return (
                    <Pressable
                      key={s}
                      onPress={() => setSize(s)}
                      className={`min-w-[52px] items-center rounded-full border px-4 py-2.5 ${
                        active ? "border-ink bg-ink" : "border-line bg-ivory"
                      }`}
                    >
                      <Text className={`font-body-medium text-sm ${active ? "text-gold-light" : "text-ink"}`}>{s}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}

          <Text className="mb-3 mt-7 font-body-medium text-xs uppercase tracking-wider text-muted">Quantity</Text>
          <QuantityStepper value={quantity} onChange={setQuantity} />
        </View>

        <Text className="mb-3 mt-10 px-5 font-display-semibold text-2xl text-ink">You may also like</Text>
        <FlatList
          data={related}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 14, paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <View style={{ width: 160 }}>
              <ProductCard product={item} />
            </View>
          )}
        />
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 flex-row items-center gap-3 border-t border-line bg-ivory px-5 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 12) }}
      >
        <Pressable
          onPress={() => setLiked((v) => !v)}
          className="h-[52px] w-[52px] items-center justify-center rounded-full border border-line bg-cream"
        >
          <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color={liked ? "#B8934A" : "#111111"} />
        </Pressable>
        <Pressable
          onPress={handleAddToCart}
          className="h-[52px] flex-1 items-center justify-center rounded-full bg-ink active:opacity-85"
        >
          <Text className="font-body-semibold text-[15px] text-gold-light">Add to cart · {formatPrice(total)}</Text>
        </Pressable>
      </View>
    </View>
  );
}