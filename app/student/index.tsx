import { useTheme } from "@/constants/theme";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function StudentHome() {
  const { colors } = useTheme();
  const user = auth.currentUser;

  const [amount, setAmount] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [showQR, setShowQR] = useState(false);

  // Refresh QR timestamp every 30 seconds
  useEffect(() => {
    if (!showQR) return;

    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, [showQR]);

  if (!user) return null;

  const parsedAmount = Number(amount);

  const isAmountValid =
    !isNaN(parsedAmount) && parsedAmount > 0;

  const qrPayload = JSON.stringify({
    uid: user.uid,
    email: user.email,
    amount: parsedAmount,
    ts: timestamp,
    type: "student-payment",
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Title */}
      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "600",
          marginBottom: 6,
          textAlign: "center",
        }}
      >
        UniPay
      </Text>

      <Text
        style={{
          color: colors.text,
          opacity: 0.6,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        Enter amount and show QR to vendor
      </Text>

      {/* Amount Input */}
      <TextInput
        value={amount}
        onChangeText={(text) => {
          setAmount(text);
          setShowQR(false); // regenerate QR only on confirm
        }}
        keyboardType="numeric"
        placeholder="Enter amount (₹)"
        placeholderTextColor="#6B7280"
        style={{
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 14,
          padding: 14,
          color: colors.text,
          fontSize: 16,
          marginBottom: 16,
        }}
      />

      {/* Generate QR Button */}
      <TouchableOpacity
        disabled={!isAmountValid}
        onPress={() => {
          setTimestamp(Date.now());
          setShowQR(true);
        }}
        style={{
          backgroundColor: isAmountValid
            ? colors.primary
            : colors.primary + "40",
          paddingVertical: 14,
          borderRadius: 14,
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "600",
            color: "#000",
            fontSize: 16,
          }}
        >
          Generate QR
        </Text>
      </TouchableOpacity>

      {/* QR Section */}
      {showQR && (
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.card,
            padding: 24,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: colors.primary,
          }}
        >
          <QRCode
            value={qrPayload}
            size={220}
            color={colors.primary}
            backgroundColor="transparent"
          />

          <Text
            style={{
              color: colors.text,
              marginTop: 16,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Amount: ₹{parsedAmount}
          </Text>

          <Text
            style={{
              color: colors.primary,
              marginTop: 6,
              fontSize: 13,
            }}
          >
            QR refreshes every 30 seconds
          </Text>
        </View>
      )}
    </View>
  );
}
