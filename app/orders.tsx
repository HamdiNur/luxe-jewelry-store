import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useAuth } from "@clerk/expo";
import { useMyOrders } from "@/hooks/useMyOrders";
import { formatDate, formatPrice } from "@/utils/format";
import ScreenHeader from "@/components/ScreenHeader";
import EmptyState from "@/components/EmptyState";
import SummaryRow from "@/components/SummaryRow";

export default function Orders() {
  const { isSignedIn } = useAuth();
  const { orders, hydrated } = useMyOrders();

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title="Order history" />

      {!hydrated ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#B8934A" />
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o) => o.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              icon="receipt-outline"
              title={isSignedIn ? "No orders yet" : "Sign in to see your orders"}
              message={isSignedIn ? "Demo orders you place will appear here." : "Your order history lives in your account."}
            />
          }
          renderItem={({ item: order }) => (
            <View className="mb-4 rounded-2xl border border-line bg-ivory p-4">
              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="font-body-semibold text-[15px] text-ink">{order.number}</Text>
                  <Text className="mt-0.5 font-body text-xs text-muted">{formatDate(order.createdAt)}</Text>
                </View>
                <View className="rounded-full bg-ink px-2.5 py-1">
                  <Text className="font-body-medium text-[10px] uppercase tracking-widest text-gold-light">
                    Demo order
                  </Text>
                </View>
              </View>

              <View className="my-3 h-px bg-line" />

              {order.lines.map((l, i) => (
                <View key={`${l.productId}-${i}`} className="flex-row items-start justify-between py-1">
                  <View className="flex-1 pr-3">
                    <Text className="font-body-medium text-sm text-ink">
                      {l.quantity} × {l.name}
                    </Text>
                    <Text className="font-body text-xs capitalize text-muted">
                      {[l.metal, l.size && `Size ${l.size}`].filter(Boolean).join(" · ")}
                    </Text>
                  </View>
                  <Text className="font-body text-sm text-ink">{formatPrice(l.unitPrice * l.quantity)}</Text>
                </View>
              ))}

              <View className="my-3 h-px bg-line" />
              
              {/* Member discount row added right above Shipping */}
              {!!order.discount && (
                <SummaryRow label="Member discount" value={`-${formatPrice(order.discount)}`} />
              )}
              
              <SummaryRow label="Shipping" value={order.shipping === 0 ? "Free" : formatPrice(order.shipping)} />
              <SummaryRow label="Total" value={formatPrice(order.total)} strong />
            </View>
          )}
        />
      )}
    </View>
  );
}