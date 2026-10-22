import { Text, TextInput, View, type TextInputProps } from "react-native";

type Props = TextInputProps & { label: string; error?: string };

export default function AuthField({ label, error, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 font-body-medium text-xs uppercase tracking-wider text-muted">{label}</Text>
      <TextInput
        placeholderTextColor="#9B958A"
        {...props}
        className={`rounded-xl border bg-ivory px-4 py-3.5 font-body text-[15px] text-ink ${
          error ? "border-red-400" : "border-line"
        }`}
      />
      {error ? <Text className="mt-1 font-body text-xs text-red-600">{error}</Text> : null}
    </View>
  );
}