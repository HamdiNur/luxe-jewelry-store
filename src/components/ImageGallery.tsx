import { useState } from "react";
import {
  FlatList,
  View,
  useWindowDimensions,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type Props = { images: ImageSourcePropType[] };

export default function ImageGallery({ images }: Props) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  if (images.length === 0) {
    return (
      <LinearGradient
        colors={["#F3EBDB", "#E3D3B0"]}
        style={{ width, height: width, alignItems: "center", justifyContent: "center" }}
      >
        <Ionicons name="diamond-outline" size={56} color="#B8934A" />
      </LinearGradient>
    );
  }

  return (
    <View style={{ width, height: width }}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Image source={item} contentFit="cover" transition={250} style={{ width, height: width }} />
        )}
      />
      {images.length > 1 && (
        <View className="absolute bottom-4 w-full flex-row justify-center gap-1.5">
          {images.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full ${i === index ? "w-5 bg-ink" : "w-1.5 bg-ink/30"}`}
            />
          ))}
        </View>
      )}
    </View>
  );
}