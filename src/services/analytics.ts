import PostHog from "posthog-react-native";

const apiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY ?? "";
const host = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

export const analyticsConfigured = apiKey.length > 0;

if (!analyticsConfigured && __DEV__) {
  console.warn("[analytics] EXPO_PUBLIC_POSTHOG_API_KEY is missing. Analytics is disabled.");
}

export const posthog = new PostHog(apiKey || "phc_missing_key", {
  host,
  disabled: !analyticsConfigured,
});

const appEnv = __DEV__ ? "development" : "production";

// Every event the app can send, with the properties each one must include.
type EventMap = {
  product_viewed: { product_id: string; product_name: string; category: string; price: number };
  search_performed: { query: string; results_count: number; source: "home" | "explore" };
  add_to_cart: {
    product_id: string;
    product_name: string;
    category: string;
    metal: string;
    size: string;
    quantity: number;
    value: number;
  };
  remove_from_cart: { product_id: string; product_name: string; quantity: number };
  favorite_added: { product_id: string; product_name: string; category: string };
  favorite_removed: { product_id: string; product_name: string; category: string };
  checkout_started: { item_count: number; value: number; is_member: boolean };
  order_placed: { order_number: string; item_count: number; value: number; discount: number; demo: boolean };
  sign_up_completed: { method: string };
  sign_in_completed: { method: string };
  sign_out: { source: string };
  membership_viewed: { is_member: boolean };
  subscription_started: { plan: string; price: number; demo: boolean };
  subscription_cancelled: { plan: string; demo: boolean };
};

export type EventName = keyof EventMap;

export function track<E extends EventName>(
  event: E,
  props: EventMap[E] & Record<string, string | number | boolean>
) {
  try {
    posthog.capture(event, { ...props, app_env: appEnv });
  } catch (error) {
    // Analytics must never break the app.
    if (__DEV__) console.warn("[analytics] capture failed", error);
  }
}