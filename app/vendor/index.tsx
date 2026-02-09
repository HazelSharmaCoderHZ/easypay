import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function VendorHome() {
  const router = useRouter();
  const user = auth.currentUser;

  const TODAY_REVENUE = 2350; // dummy

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24 }}>
      <Text style={{ fontSize: 72, textAlign: "center", marginBottom: 12 }}>
        🧑‍🍳
      </Text>

      <Text style={{ color: "#0BE602", fontSize: 22, textAlign: "center" }}>
        Hello 👋
      </Text>

      <Text
        style={{
          color: "#fff",
          opacity: 0.7,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        {user?.email}
      </Text>

      {/* Revenue Card */}
      <View
        style={{
          backgroundColor: "#0f0f0f",
          borderRadius: 20,
          padding: 20,
          marginBottom: 32,
          borderWidth: 1,
          borderColor: "#0BE602",
        }}
      >
        <Text style={{ color: "#0BE602", fontSize: 14 }}>
          Today’s Revenue
        </Text>
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "700" }}>
          ₹{TODAY_REVENUE}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/vendor/scan")}
        style={{
          backgroundColor: "#0BE602",
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "700" }}>
          Scan QR
        </Text>
      </TouchableOpacity>
    </View>
  );
}
