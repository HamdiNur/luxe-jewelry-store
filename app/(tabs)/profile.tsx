import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/expo";
import PrimaryButton from "@/components/PrimaryButton";

export default function Profile() {
  const router = useRouter();
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

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
  const initial = (email[0] ?? "L").toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <Text className="font-display-bold text-4xl text-ink">Profile</Text>

        <View className="mt-6 flex-row items-center rounded-2xl border border-line bg-ivory p-4">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-ink">
            <Text className="font-display-bold text-2xl text-gold-light">{initial}</Text>
          </View>
          <View className="ml-4 flex-1">
            <Text className="font-body-semibold text-base text-ink">Welcome back</Text>
            <Text numberOfLines={1} className="font-body text-sm text-muted">
              {email}
            </Text>
          </View>
        </View>

        <Text className="mt-6 text-center font-body text-xs text-muted">
          Orders, settings and membership are coming in the next stages.
        </Text>

        <View className="mt-8">
          <PrimaryButton label="Sign out" variant="outline" onPress={confirmSignOut} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}