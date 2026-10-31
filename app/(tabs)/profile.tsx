import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/expo";
import PrimaryButton from "@/components/PrimaryButton";
import MenuRow from "@/components/MenuRow";
import { useMyOrders } from "@/hooks/useMyOrders";
import { useMembership } from "@/hooks/useMembership";
import { useCartLines } from "@/hooks/useCartLines";
import { track } from "@/services/analytics";
import { useFavoritesStore } from "@/store/favoritesStore";
import { formatDate } from "@/utils/format";

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View className="flex-1 items-center">
      <Text className="font-display-bold text-3xl text-ink">{value}</Text>
      <Text className="font-body text-xs text-muted">{label}</Text>
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const { orders } = useMyOrders();
  const { isMember, plan, startedAt } = useMembership();
  const { count: cartCount } = useCartLines();
  const favoriteCount = useFavoritesStore((s) => s.ids.length);

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-cream">
        <ActivityIndicator color="#B8934A" />
      </SafeAreaView>
    );
  }

  const confirmSignOut = () =>
    Alert.alert("Sign out?", "Your cart and favorites stay on this device.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          track("sign_out", { source: "profile" });
          try {
            await signOut();
          } catch {
            Alert.alert("Couldn't sign out", "Please check your connection and try again.");
          }
        },
      },
    ]);

  if (!isSignedIn) {
    return (
      <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
        <View className="flex-1 justify-center px-8">
          <View className="items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full border border-line bg-ivory">
              <Ionicons name="person-outline" size={32} color="#B8934A" />
            </View>
            <Text className="mt-5 font-display-bold text-4xl text-ink">Your LUXE account</Text>
            <Text className="mt-2 text-center font-body text-sm leading-5 text-muted">
              Sign in to view your profile, orders and membership.
            </Text>
          </View>
          <View className="mt-8 gap-3">
            <PrimaryButton label="Sign in" onPress={() => router.push("/sign-in")} />
            <PrimaryButton label="Create account" variant="outline" onPress={() => router.push("/sign-up")} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const initial = (fullName[0] ?? email[0] ?? "L").toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Text className="font-display-bold text-4xl text-ink">Profile</Text>

        <View className="mt-6 flex-row items-center rounded-2xl border border-line bg-ivory p-4">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-ink">
            <Text className="font-display-bold text-2xl text-gold-light">{initial}</Text>
          </View>
          <View className="ml-4 flex-1">
            <View className="flex-row items-center">
              <Text numberOfLines={1} className="flex-shrink font-body-semibold text-base text-ink">
                {fullName || "Welcome back"}
              </Text>
              {isMember && (
                <View className="ml-2 rounded-full bg-gold px-2 py-0.5">
                  <Text className="font-body-semibold text-[9px] uppercase tracking-widest text-ink">Premium</Text>
                </View>
              )}
            </View>
            <Text numberOfLines={1} className="font-body text-sm text-muted">
              {email}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row rounded-2xl border border-line bg-ivory py-4">
          <Stat value={orders.length} label="Orders" />
          <View className="w-px bg-line" />
          <Stat value={favoriteCount} label="Favorites" />
          <View className="w-px bg-line" />
          <Stat value={cartCount} label="In cart" />
        </View>

        {isMember ? (
          <View className="mt-4 rounded-2xl bg-ink p-5">
            <Text className="font-body-medium text-xs uppercase tracking-[3px] text-gold-light">LUXE Premium</Text>
            <Text className="mt-1 font-display-semibold text-2xl text-white">Membership active</Text>
            <Text className="mt-1 font-body text-sm capitalize text-white/70">
              {plan} plan{startedAt ? ` · since ${formatDate(startedAt)}` : ""} · demo
            </Text>
          </View>
        ) : (
          <View className="mt-4 rounded-2xl border border-gold bg-ivory p-5">
            <Text className="font-body-medium text-xs uppercase tracking-[3px] text-gold">LUXE Premium</Text>
            <Text className="mt-1 font-display-semibold text-2xl text-ink">Unlock member benefits</Text>
            <Text className="mt-1 font-body text-sm leading-5 text-muted">
              Exclusive collections, early access and member discounts.
            </Text>
            <View className="mt-4">
              <PrimaryButton label="Explore membership" onPress={() => router.push("/membership")} />
            </View>
          </View>
        )}

        <View className="mt-4">
          <MenuRow
            icon="receipt-outline"
            label="Order history"
            detail={orders.length > 0 ? String(orders.length) : undefined}
            onPress={() => router.push("/orders")}
          />
          <MenuRow icon="settings-outline" label="Account settings" onPress={() => router.push("/settings")} />
          <MenuRow
            icon="diamond-outline"
            label="Membership"
            detail={isMember ? "Active" : "Not a member"}
            onPress={() => router.push("/membership")}
          />
        </View>

        <View className="mt-8">
          <PrimaryButton label="Sign out" variant="outline" onPress={confirmSignOut} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}