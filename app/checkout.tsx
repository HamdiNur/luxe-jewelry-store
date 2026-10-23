import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";
import { useCartLines } from "@/hooks/useCartLines";
import { useCartStore } from "@/store/cartStore";
import { useOrdersStore } from "@/store/ordersStore";
import { formatPrice } from "@/utils/format";
import SummaryRow from "@/components/SummaryRow";
import EmptyState from "@/components/EmptyState";

export default function Checkout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isSignedIn, userId } = useAuth();
  const clear = useCartStore((s) => s.clear);
  const addOrder = useOrdersStore((s) => s.addOrder);

  // (a) Destructured discount from useCartLines
  const { lines, subtotal, discount, shipping, total } = useCartLines();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const placeOrder = () => {
    if (!userId) return;
    const number = `LX-${Date.now().toString().slice(-6)}`;
    addOrder({
      id: String(Date.now()),
      number,
      userId,
      createdAt: new Date().toISOString(),
      lines: lines.map(({ item, product }) => ({
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: item.quantity,
        metal: item.metal,
        size: item.size,
      })),
      // (b) Added discount into the addOrder payload
      subtotal,
      discount,
      shipping,
      total,
    });
    setOrderNumber(number);
    clear();
  };

  if (orderNumber) {
    return (
      <View className="flex-1 items-center justify-center bg-cream px-8">
        <Ionicons name="checkmark-circle" size={64} color="#B8934A" />
        <Text className="mt-4 font-display-bold text-4xl text-ink">Thank you</Text>
        <Text className="mt-2 text-center font-body text-sm leading-5 text-muted">
          Demo order {orderNumber} is confirmed.{"\n"}No payment was taken and nothing will be shipped.
        </Text>
        <Pressable onPress={() => router.replace("/orders")} className="mt-8 rounded-full bg-ink px-8 py-4">
          <Text className="font-body-semibold text-[15px] text-gold-light">View my orders</Text>
        </Pressable>
        <Pressable onPress={() => router.replace("/")} className="mt-4" hitSlop={8}>
          <Text className="font-body-medium text-sm text-gold">Continue shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream">
      <View className="flex-row items-center px-5 pb-3" style={{ paddingTop: insets.top + 8 }}>
        <Pressable
          onPress={() => router.back()}
          className="h-11 w-11 items-center justify-center rounded-full border border-line bg-ivory"
        >
          <Ionicons name="chevron-back" size={22} color="#111111" />
        </Pressable>
        <Text className="ml-4 font-display-bold text-3xl text-ink">Checkout</Text>
      </View>

      {lines.length === 0 ? (
        <EmptyState icon="bag-outline" title="Nothing to check out" message="Add a piece to your cart first." />
      ) : (
        <>
          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
            <View className="flex-row items-start rounded-2xl border border-gold bg-ivory p-4">
              <Ionicons name="information-circle-outline" size={20} color="#B8934A" />
              <Text className="ml-3 flex-1 font-body text-[13px] leading-5 text-ink">
                <Text className="font-body-semibold">Demo checkout.</Text> No payment details are collected, no card
                is charged and no real order is placed.
              </Text>
            </View>

            {!isSignedIn && (
              <View className="mt-3 flex-row items-start rounded-2xl border border-line bg-ivory p-4">
                <Ionicons name="person-outline" size={20} color="#B8934A" />
                <Text className="ml-3 flex-1 font-body text-[13px] leading-5 text-ink">
                  Sign in so this order is saved to your account. Your cart will be waiting when you come back.
                </Text>
              </View>
            )}

            <Text className="mb-3 mt-7 font-display-semibold text-2xl text-ink">Order summary</Text>
            <View className="rounded-2xl border border-line bg-ivory p-4">
              {lines.map(({ item, product }) => (
                <View key={item.key} className="flex-row items-start justify-between py-2">
                  <View className="flex-1 pr-3">
                    <Text className="font-body-medium text-sm text-ink">
                      {item.quantity} × {product.name}
                    </Text>
                    <Text className="font-body text-xs capitalize text-muted">
                      {[item.metal, item.size && `Size ${item.size}`].filter(Boolean).join(" · ")}
                    </Text>
                  </View>
                  <Text className="font-body text-sm text-ink">{formatPrice(product.price * item.quantity)}</Text>
                </View>
              ))}
              <View className="my-2 h-px bg-line" />
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />

              {/* (c) Member discount row added right after Subtotal */}
              {discount > 0 && (
                <SummaryRow label="Member discount (10%)" value={`-${formatPrice(discount)}`} />
              )}

              <SummaryRow label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <SummaryRow label="Total" value={formatPrice(total)} strong />
            </View>
          </ScrollView>

          <View
            className="absolute bottom-0 left-0 right-0 border-t border-line bg-ivory px-5 pt-3"
            style={{ paddingBottom: Math.max(insets.bottom, 12) }}
          >
            <Pressable
              onPress={isSignedIn ? placeOrder : () => router.push("/sign-in")}
              className="h-[52px] items-center justify-center rounded-full bg-ink active:opacity-85"
            >
              <Text className="font-body-semibold text-[15px] text-gold-light">
                {isSignedIn ? `Place demo order · ${formatPrice(total)}` : "Sign in to place order"}
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}