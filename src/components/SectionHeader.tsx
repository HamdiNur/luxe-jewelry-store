import { Text } from "react-native";

export default function SectionHeader({ title }: { title: string }) {
  return <Text className="mb-3 mt-7 px-5 font-display-semibold text-2xl text-ink">{title}</Text>;
}