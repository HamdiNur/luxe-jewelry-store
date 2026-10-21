import EmptyState from "@/components/EmptyState";
import QuantityStepper from "@/components/QuantityStepper";
import SummaryRow from "@/components/SummaryRow";
import { useCartLines } from "@/hooks/useCartLines";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";
import { FREE_SHIPPING_THRESHOLD } from "@/utils/pricing";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const router = useRouter();
  const hydrated = useCartStore((s) => s.hydrated);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const { lines, subtotal, shipping, total } = useCartLines();

  if (!hydrated) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-cream">
        <ActivityIndicator color="#B8934A" />
      </SafeAreaView>
    );
  }

  if (lines.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-cream">
        <EmptyState
          icon="bag-outline"
          title="Your cart is empty"
          message="Pieces you add will wait for you here."
        />
        <Pressable
          onPress={() => router.push("/explore")}
          className="rounded-full bg-ink px-6 py-3"
        >
          <Text className="font-body-semibold text-sm text-gold-light">
            Start exploring
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const confirmClear = () =>
    Alert.alert("Clear cart?", "This removes every item from your cart.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: clear },
    ]);

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-row items-end justify-between px-5 pb-4 pt-2">
        <Text className="font-display-bold text-4xl text-ink">Your Cart</Text>
        <Pressable onPress={confirmClear} hitSlop={8}>
          <Text className="font-body-medium text-xs uppercase tracking-wider text-muted">
            Clear all
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={lines}
        keyExtractor={(l) => l.item.key}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: { item, product } }) => (
          <View className="mb-3 flex-row rounded-2xl border border-line bg-ivory p-3">
            {product.image ? (
              <Image
                source={product.image}
                contentFit="cover"
                style={{ width: 92, height: 92, borderRadius: 12 }}
              />
            ) : (
              <View className="h-[92px] w-[92px] items-center justify-center rounded-xl bg-cream">
                <Ionicons name="diamond-outline" size={26} color="#B8934A" />
              </View>
            )}
            <View className="ml-3 flex-1 justify-between">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-2">
                  <Text
                    numberOfLines={1}
                    className="font-body-medium text-[15px] text-ink"
                  >
                    {product.name}
                  </Text>
                  <Text className="mt-0.5 font-body text-xs capitalize text-muted">
                    {[item.metal, item.size && `Size ${item.size}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </Text>
                </View>
                <Pressable onPress={() => removeItem(item.key)} hitSlop={10}>
                  <Ionicons name="trash-outline" size={18} color="#9B958A" />
                </Pressable>
              </View>
              <View className="flex-row items-center justify-between">
                <QuantityStepper
                  value={item.quantity}
                  onChange={(q) => setQuantity(item.key, q)}
                />
                <Text className="font-body-semibold text-sm text-ink">
                  {formatPrice(product.price * item.quantity)}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      <View className="border-t border-line bg-ivory px-5 pb-4 pt-4">
        <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? "Free" : formatPrice(shipping)}
        />
        {shipping > 0 && (
          <Text className="font-body text-xs text-gold">
            Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free
            shipping
          </Text>
        )}
        <View className="my-2 h-px bg-line" />
        <SummaryRow label="Total" value={formatPrice(total)} strong />
        <Pressable
          onPress={() => router.push("/checkout")}
          className="mt-3 h-[52px] items-center justify-center rounded-full bg-ink active:opacity-85"
        >
          <Text className="font-body-semibold text-[15px] text-gold-light">
            Checkout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
