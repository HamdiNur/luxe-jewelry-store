import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/format";
import { useFavoritesStore } from "@/store/favoritesStore";

type Props = { product: Product; onPress?: () => void };

export default function ProductCard({ product, onPress }: Props) {
  const router = useRouter();
  const liked = useFavoritesStore((s) => s.ids.includes(product.id));
  const toggle = useFavoritesStore((s) => s.toggle);

  const open = () => {
    if (onPress) return onPress();
    router.push({ pathname: "/product/[id]", params: { id: product.id } });
  };

  return (
    <Pressable onPress={open} className="flex-1 active:opacity-80">
      <View className="aspect-[4/5] overflow-hidden rounded-2xl bg-ivory">
        {product.image ? (
          <Image source={product.image} contentFit="cover" style={{ flex: 1 }} transition={200} />
        ) : (
          <LinearGradient
            colors={["#F3EBDB", "#E3D3B0"]}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="diamond-outline" size={38} color="#B8934A" />
          </LinearGradient>
        )}
        {product.isNew && (
          <View className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1">
            <Text className="font-body-medium text-[10px] uppercase tracking-widest text-gold-light">New</Text>
          </View>
        )}
        <Pressable
          onPress={() => toggle(product.id)}
          hitSlop={8}
          className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-white/90"
        >
          <Ionicons name={liked ? "heart" : "heart-outline"} size={18} color={liked ? "#B8934A" : "#111111"} />
        </Pressable>
      </View>
      <Text numberOfLines={1} className="mt-3 font-body-medium text-sm text-ink">
        {product.name}
      </Text>
      <Text className="mt-0.5 font-body text-sm text-gold">{formatPrice(product.price)}</Text>
    </Pressable>
  );
}