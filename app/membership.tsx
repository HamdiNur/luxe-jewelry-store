import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";
import { plans } from "@/data/plans";
import type { PlanId } from "@/types/membership";
import { useMembership } from "@/hooks/useMembership";
import { formatDate, formatPrice } from "@/utils/format";
import ScreenHeader from "@/components/ScreenHeader";
import BenefitRow from "@/components/BenefitRow";
import PlanCard from "@/components/PlanCard";
import PrimaryButton from "@/components/PrimaryButton";

export default function Membership() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isSignedIn } = useAuth();
  const { isMember, plan, startedAt, subscribe, cancel } = useMembership();

  const [selected, setSelected] = useState<PlanId>("yearly");
  const [busy, setBusy] = useState(false);

  const selectedPlan = plans.find((p) => p.id === selected) ?? plans[0];
  const activePlan = plans.find((p) => p.id === plan);

  const handleSubscribe = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    setBusy(true);
    // Pretend to process, so the flow feels real. No payment happens anywhere.
    await new Promise((resolve) => setTimeout(resolve, 900));
    subscribe(selected);
    setBusy(false);
    Alert.alert("Welcome to LUXE Premium", "Your demo membership is active. No payment was taken.");
  };

  const handleCancel = () =>
    Alert.alert("Cancel membership?", "You will lose the 10% member discount.", [
      { text: "Keep membership", style: "cancel" },
      {
        text: "Cancel membership",
        style: "destructive",
        onPress: () => {
          cancel();
          Alert.alert("Membership cancelled", "You can rejoin whenever you like.");
        },
      },
    ]);

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title="Membership" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: isMember ? 40 : 150 }}
      >
        <View className="overflow-hidden rounded-3xl">
          <LinearGradient colors={["#111111", "#2b2417"]} style={{ padding: 24 }}>
            <Text className="font-body-medium text-xs uppercase tracking-[3px] text-gold-light">LUXE Premium</Text>
            <Text className="mt-2 font-display-bold text-4xl leading-10 text-white">
              The inner{"\n"}circle
            </Text>
            <Text className="mt-3 font-body text-sm leading-5 text-white/70">
              Exclusive collections, early access and member pricing on every order.
            </Text>
          </LinearGradient>
        </View>

        <View className="mt-4 flex-row items-start rounded-2xl border border-gold bg-ivory p-4">
          <Ionicons name="information-circle-outline" size={20} color="#B8934A" />
          <Text className="ml-3 flex-1 font-body text-[13px] leading-5 text-ink">
            <Text className="font-body-semibold">Demo membership.</Text> Nothing is charged and no payment details
            are collected. Your membership is stored on this device only.
          </Text>
        </View>

        {isMember && (
          <View className="mt-4 rounded-2xl bg-ink p-5">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#D8BC7E" />
              <Text className="ml-2 font-body-medium text-xs uppercase tracking-[3px] text-gold-light">Active</Text>
            </View>
            <Text className="mt-2 font-display-semibold text-2xl text-white">
              {activePlan?.name ?? "Premium"} membership
            </Text>
            <Text className="mt-1 font-body text-sm text-white/70">
              {startedAt ? `Member since ${formatDate(startedAt)}` : "Member"}
              {activePlan ? ` · ${formatPrice(activePlan.price)} / ${activePlan.period} (demo, not charged)` : ""}
            </Text>
          </View>
        )}

        <Text className="mb-1 mt-8 font-display-semibold text-2xl text-ink">Member benefits</Text>
        <View>
          <BenefitRow
            icon="diamond-outline"
            title="Exclusive collections"
            description="Limited-run pieces released only to members."
          />
          <BenefitRow
            icon="time-outline"
            title="Early access"
            description="Shop new arrivals before they open to everyone."
          />
          <BenefitRow
            icon="pricetag-outline"
            title="10% member discount"
            description="Applied automatically to every order in your cart."
          />
        </View>

        {!isMember && (
          <>
            <Text className="mb-3 mt-8 font-display-semibold text-2xl text-ink">Choose a plan</Text>
            {plans.map((p) => (
              <PlanCard key={p.id} plan={p} selected={p.id === selected} onPress={() => setSelected(p.id)} />
            ))}
          </>
        )}

        {isMember && (
          <View className="mt-8">
            <PrimaryButton label="Cancel membership" variant="outline" onPress={handleCancel} />
          </View>
        )}
      </ScrollView>

      {!isMember && (
        <View
          className="absolute bottom-0 left-0 right-0 border-t border-line bg-ivory px-5 pt-3"
          style={{ paddingBottom: Math.max(insets.bottom, 12) }}
        >
          <PrimaryButton
            label={
              isSignedIn
                ? `Start demo membership · ${formatPrice(selectedPlan.price)}/${selectedPlan.period}`
                : "Sign in to join"
            }
            onPress={handleSubscribe}
            loading={busy}
          />
          <Text className="mt-2 text-center font-body text-[11px] text-muted">Demo only. You will not be charged.</Text>
        </View>
      )}
    </View>
  );
}