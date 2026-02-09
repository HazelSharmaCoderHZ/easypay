import { useTheme } from "@/constants/theme";
import { auth, db } from "@/lib/firebase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function VendorConfirm() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  const studentUid = params.uid as string;
  const studentEmail = params.email as string;
  const amount = Number(params.amount);

  const vendor = auth.currentUser;

  if (!vendor) return null;

  const handleComplete = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await addDoc(collection(db, "transactions"), {
        studentUid,
        studentEmail,
        vendorUid: vendor.uid,
        amount,
        semester: "2026-S1", // 🔁 can be dynamic later
        timestamp: serverTimestamp(),
        status: "pending",
      });

      Alert.alert(
        "Payment Recorded",
        "Transaction has been saved successfully."
      );

      router.replace("/");
    } catch (err) {
      Alert.alert(
        "Error",
        "Failed to record transaction. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 24,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 22,
          fontWeight: "600",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Confirm Payment
      </Text>

      {/* Details Card */}
      <View
        style={{
          backgroundColor: colors.card,
          padding: 20,
          borderRadius: 20,
          marginBottom: 32,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            opacity: 0.6,
            marginBottom: 6,
          }}
        >
          Student
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            marginBottom: 16,
          }}
        >
          {studentEmail}
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            opacity: 0.6,
            marginBottom: 6,
          }}
        >
          Amount
        </Text>

        <Text
          style={{
            color: colors.primary,
            fontSize: 28,
            fontWeight: "700",
          }}
        >
          ₹{amount}
        </Text>
      </View>

      {/* Complete Button */}
      <TouchableOpacity
        onPress={handleComplete}
        disabled={loading}
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 16,
          borderRadius: 16,
          opacity: loading ? 0.6 : 1,
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
          {loading ? "Processing..." : "Complete Payment"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
