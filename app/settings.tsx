import AuthField from "@/components/AuthField";
import PrimaryButton from "@/components/PrimaryButton";
import ScreenHeader from "@/components/ScreenHeader";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useOrdersStore } from "@/store/ordersStore";
import {
  usePreferencesStore,
  type PreferenceKey,
} from "@/store/preferencesStore";
import { getErrorMessage } from "@/utils/validation";
import { useAuth, useUser } from "@clerk/expo";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="mb-3 mt-8 font-body-medium text-xs uppercase tracking-wider text-muted">
      {children}
    </Text>
  );
}

function ToggleRow({
  prefKey,
  label,
  hint,
}: {
  prefKey: PreferenceKey;
  label: string;
  hint: string;
}) {
  const value = usePreferencesStore((s) => s[prefKey]);
  const setPreference = usePreferencesStore((s) => s.setPreference);

  return (
    <View className="flex-row items-center justify-between border-b border-line py-3">
      <View className="flex-1 pr-4">
        <Text className="font-body-medium text-[15px] text-ink">{label}</Text>
        <Text className="mt-0.5 font-body text-xs text-muted">{hint}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={(v) => setPreference(prefKey, v)}
        trackColor={{ false: "#E7DFD0", true: "#B8934A" }}
        thumbColor="#FFFDF8"
      />
    </View>
  );
}

export default function Settings() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameError, setNameError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
  }, [user?.id]);

  const saveName = async () => {
    const first = firstName.trim();
    const last = lastName.trim();
    if (!first) return setNameError("Enter your first name.");
    if (first.length > 40 || last.length > 40)
      return setNameError("Names can be up to 40 characters.");

    setNameError(undefined);
    setSaving(true);
    try {
      await user?.update({ firstName: first, lastName: last });
      Alert.alert("Saved", "Your details were updated.");
    } catch (e) {
      setNameError(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const resetDemoData = () =>
    Alert.alert(
      "Reset demo data?",
      "This clears the cart, favorites and order history on this device. Your account is not affected.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            useCartStore.getState().clear();
            useFavoritesStore.setState({ ids: [] });
            useOrdersStore.getState().clearAll();
            Alert.alert("Done", "Demo data was cleared.");
          },
        },
      ],
    );

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title="Settings" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
        >
          <SectionLabel>Account</SectionLabel>
          {isSignedIn ? (
            <>
              <Text className="mb-4 font-body text-sm text-muted">
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
              <AuthField
                label="First name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />
              <AuthField
                label="Last name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                error={nameError}
              />
              <PrimaryButton
                label="Save details"
                onPress={saveName}
                loading={saving}
              />
            </>
          ) : (
            <PrimaryButton
              label="Sign in to edit your details"
              onPress={() => router.push("/sign-in")}
            />
          )}

          <SectionLabel>Notifications</SectionLabel>
          <ToggleRow
            prefKey="orderUpdates"
            label="Order updates"
            hint="Saved on this device. Real alerts are not connected in the demo."
          />
          <ToggleRow
            prefKey="newArrivals"
            label="New arrivals"
            hint="Hear about new collections first."
          />

          <SectionLabel>Privacy</SectionLabel>
          <ToggleRow
            prefKey="analytics"
            label="Share usage analytics"
            hint="Usage data such as screens viewed and items added to cart. Your email and password are never sent."
          />

          <SectionLabel>Demo data</SectionLabel>
          <PrimaryButton
            label="Reset demo data"
            variant="outline"
            onPress={resetDemoData}
          />

          <Text className="mt-10 text-center font-body text-xs leading-5 text-muted">
            LUXE demo build {Constants.expoConfig?.version ?? "1.0.0"}
            {"\n"}No payments are processed in this app.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}