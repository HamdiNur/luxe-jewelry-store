import { useEffect, useRef } from "react";
import { usePathname } from "expo-router";
import { useAuth } from "@clerk/expo";
import { usePostHog } from "posthog-react-native";
import { usePreferencesStore } from "@/store/preferencesStore";

export default function AnalyticsBridge() {
  const posthog = usePostHog();
  const pathname = usePathname();
  const { isLoaded, userId } = useAuth();
  const analyticsOn = usePreferencesStore((s) => s.analytics);
  const previousUserId = useRef<string | null>(null);

  // Respect the "Share usage analytics" switch in Settings.
  useEffect(() => {
    if (analyticsOn) {
      posthog.optIn();
    } else {
      posthog.optOut();
    }
  }, [analyticsOn, posthog]);

  // Link events to the signed-in user (by Clerk id only, never email), and start fresh on sign-out.
  useEffect(() => {
    if (!isLoaded) return;
    if (userId) {
      posthog.identify(userId);
      previousUserId.current = userId;
    } else if (previousUserId.current) {
      posthog.reset();
      previousUserId.current = null;
    }
  }, [isLoaded, userId, posthog]);

  // Record a screen view whenever the route changes.
  useEffect(() => {
    if (!pathname) return;
    try {
      posthog.screen(pathname);
    } catch {
      // Ignore analytics errors.
    }
  }, [pathname, posthog]);

  return null;
}