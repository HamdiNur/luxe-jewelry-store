import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  detail?: string;
  onPress: () => void;
};

export default function MenuRow({ icon, label, detail, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center border-b border-line py-4 active:opacity-70">
      <Ionicons name={icon} size={20} color="#B8934A" />
      <Text className="ml-3 flex-1 font-body-medium text-[15px] text-ink">{label}</Text>
      {detail ? <Text className="mr-2 font-body text-sm text-muted">{detail}</Text> : null}
      <Ionicons name="chevron-forward" size={18} color="#9B958A" />
    </Pressable>
  );
}