import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cartStore";

type IconName = keyof typeof Ionicons.glyphMap;

const icon =
  (active: IconName, inactive: IconName) =>
  ({ color, focused }: { color: string; focused: boolean }) =>
    <Ionicons name={focused ? active : inactive} size={22} color={color} />;

export default function TabsLayout() {
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#B8934A",
        tabBarInactiveTintColor: "#8A857A",
        tabBarStyle: { backgroundColor: "#FFFDF8", borderTopColor: "#E7DFD0" },
        tabBarLabelStyle: { fontFamily: "Inter_500Medium", fontSize: 11 },
        tabBarBadgeStyle: { backgroundColor: "#B8934A", color: "#111111", fontFamily: "Inter_600SemiBold", fontSize: 10 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: icon("home", "home-outline") }} />
      <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: icon("search", "search-outline") }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites", tabBarIcon: icon("heart", "heart-outline") }} />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: icon("bag", "bag-outline"),
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: icon("person", "person-outline") }} />
    </Tabs>
  );
}