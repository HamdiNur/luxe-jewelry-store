import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/format";

type Props = { product: Product; onPress?: () => void };

export default function ProductCard({ product, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="flex-1 active:opacity-80">
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
      </View>
      <Text numberOfLines={1} className="mt-3 font-body-medium text-sm text-ink">
        {product.name}
      </Text>
      <Text className="mt-0.5 font-body text-sm text-gold">{formatPrice(product.price)}</Text>
    </Pressable>
  );
}