import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function VendorHome() {
  const router = useRouter();
  const user = auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Emoji */}
      <Text style={{ fontSize: 72, textAlign: "center", marginBottom: 12 }}>
        🧑‍🍳
      </Text>

      {/* Greeting */}
      <Text
        style={{
          color: "#0BE602",
          fontSize: 22,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        Hello 👋
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.7,
          fontSize: 14,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        {user?.email}
      </Text>

      {/* Scan Button */}
      <TouchableOpacity
        onPress={() => router.push("/vendor/scan")}
        style={{
          backgroundColor: "#0BE602",
          paddingVertical: 16,
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            color: "#000",
            fontSize: 16,
          }}
        >
          Scan & Enter Amount
        </Text>
      </TouchableOpacity>
    </View>
  );
}
