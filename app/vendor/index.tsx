import { useTheme } from "@/constants/theme";
import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function VendorHome() {
  const { colors } = useTheme();
  const router = useRouter();
  const user = auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 24,
        justifyContent: "center",
      }}
    >
      {/* Greeting */}
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          marginBottom: 4,
        }}
      >
        Welcome 👋
      </Text>

      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "600",
          marginBottom: 32,
        }}
      >
        {user?.email || "Vendor"}
      </Text>

      {/* Main Action Card */}
      <View
        style={{
          backgroundColor: colors.card,
          padding: 24,
          borderRadius: 24,
          marginBottom: 24,
          borderWidth: 2,
          borderColor: colors.primary,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 8,
          }}
        >
          Ready to Accept Payments
        </Text>

        <Text
          style={{
            color: colors.text,
            opacity: 0.6,
            marginBottom: 20,
          }}
        >
          Scan student UniPay QR to record a transaction.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/vendor/scan")}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 16,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: 16,
              color: "#000",
            }}
          >
            Scan Student QR
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer hint */}
      <Text
        style={{
          color: colors.text,
          opacity: 0.4,
          fontSize: 12,
          textAlign: "center",
        }}
      >
        UniPay Vendor Mode
      </Text>
    </View>
  );
}
