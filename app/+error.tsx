// import { Link, Stack, useRouter } from "expo-router";
// import { StyleSheet, Text, View, Pressable } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useEffect } from "react";

// export default function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
//   const router = useRouter();

//   useEffect(() => {
//     // Senior Developer Practice: Log the error to your telemetry/analytics service (e.g., PostHog)
//     console.error("LUXE Uncaught App Error:", error);
//   }, [error]);

//   return (
//     <>
//       <Stack.Options options={{ headerShown: false }} />
//       <View style={styles.container}>
//         <View style={styles.iconContainer}>
//           <Ionicons name="alert-circle-outline" size={48} color="#B8934A" />
//         </View>

//         <Text style={styles.title}>An Exquisite Interruption</Text>
        
//         <Text style={styles.message}>
//           We encountered an unexpected issue while curating your experience. Please try refreshing or return to the gallery.
//         </Text>

//         <Pressable style={styles.primaryButton} onPress={retry}>
//           <Text style={styles.primaryButtonText}>Reload Experience</Text>
//         </Pressable>

//         <Pressable 
//           style={styles.secondaryButton} 
//           onPress={() => router.replace("/")}
//         >
//           <Text style={styles.secondaryButtonText}>Return Home</Text>
//         </Pressable>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F4EC", // LUXE Cream background
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 32,
//   },
//   iconContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: "#EADCC9",
//   },
//   title: {
//     fontFamily: "CormorantGaramond_600SemiBold",
//     fontSize: 28,
//     color: "#111111",
//     textAlign: "center",
//     marginBottom: 12,
//     letterSpacing: 1,
//   },
//   message: {
//     fontFamily: "Inter_400Regular",
//     fontSize: 14,
//     color: "#6F6A60",
//     textAlign: "center",
//     lineHeight: 22,
//     marginBottom: 32,
//   },
//   primaryButton: {
//     backgroundColor: "#111111",
//     width: "100%",
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   primaryButtonText: {
//     fontFamily: "Inter_600SemiBold",
//     fontSize: 14,
//     color: "#FFFFFF",
//     letterSpacing: 1,
//   },
//   secondaryButton: {
//     backgroundColor: "transparent",
//     width: "100%",
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#111111",
//   },
//   secondaryButtonText: {
//     fontFamily: "Inter_600SemiBold",
//     fontSize: 14,
//     color: "#111111",
//     letterSpacing: 1,
//   },
// });