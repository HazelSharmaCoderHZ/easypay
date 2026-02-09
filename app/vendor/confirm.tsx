import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function VendorConfirm() {
  const router = useRouter();
  const { email, amount, ts } = useLocalSearchParams();

  const handleConfirm = () => {
    Alert.alert(
      "Transaction Successful ✅",
      "The payment has been recorded successfully.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/vendor"),
        },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 64, textAlign: "center", marginBottom: 12 }}>
        ✅
      </Text>

      <Text
        style={{
          color: "#0BE602",
          fontSize: 22,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        Confirm Transaction
      </Text>

      <View
        style={{
          backgroundColor: "#0f0f0f",
          borderRadius: 20,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <Text style={{ color: "#ffffff", marginBottom: 8 }}>
          Student: {email}
        </Text>
        <Text style={{ color: "#ffffff", marginBottom: 8 }}>
          Amount: ₹{amount}
        </Text>
        <Text style={{ color: "#ffffff", opacity: 0.6 }}>
          Time: {new Date(Number(ts)).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleConfirm}
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
          Confirm Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
}
