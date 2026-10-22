import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = { title: string; subtitle: string; children: ReactNode };

export default function AuthShell({ title, subtitle, children }: Props) {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-cream">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
            className="h-11 w-11 items-center justify-center rounded-full border border-line bg-ivory"
          >
            <Ionicons name="chevron-back" size={22} color="#111111" />
          </Pressable>
          <Text className="mt-8 font-display-bold text-xl tracking-[6px] text-gold">LUXE</Text>
          <Text className="mt-3 font-display-bold text-4xl leading-[44px] text-ink">{title}</Text>
          <Text className="mt-2 font-body text-sm leading-5 text-muted">{subtitle}</Text>
          <View className="mt-8">{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}