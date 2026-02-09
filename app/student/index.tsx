import { useTheme } from "@/constants/theme";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function StudentHome() {
  const { colors } = useTheme();
  const user = auth.currentUser;

  const [timestamp, setTimestamp] = useState(Date.now());
  const [showQR, setShowQR] = useState(false);

  // 🔢 Dummy goal data (UI only)
  const MONTHLY_GOAL = 3000;
  const SPENT_SO_FAR = 1750;
  const progress = Math.min(SPENT_SO_FAR / MONTHLY_GOAL, 1);

  // Refresh QR every 30 seconds
  useEffect(() => {
    if (!showQR) return;

    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, [showQR]);

  if (!user) return null;

  const qrPayload = JSON.stringify({
    uid: user.uid,
    email: user.email,
    ts: timestamp,
    type: "student-entry",
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* 💸 Monthly Goal Progress */}
      <View style={{ marginBottom: 28 }}>
        <Text
          style={{
            color: "#0BE602",
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 6,
            textAlign: "center",
          }}
        >
          Monthly Spending
        </Text>

        <View
          style={{
            height: 10,
            width: "100%",
            backgroundColor: "#1a1a1a",
            borderRadius: 10,
            overflow: "hidden",
            marginHorizontal: 8
          }}
        >
          <View
            style={{
              height: "100%",
              overflow: "hidden",
              borderRadius: 10,
              width: `${progress * 100}%`,
              backgroundColor: "#0BE602",
              marginHorizontal: 8
            }}
          />
        </View>

        <Text
          style={{
            color: "#ffffff",
            opacity: 0.7,
            fontSize: 12,
            textAlign: "center",
            marginTop: 6,
          }}
        >
          ₹{SPENT_SO_FAR} spent of ₹{MONTHLY_GOAL}
        </Text>
      </View>

      {/* Avatar */}
      <Text
        style={{
          fontSize: 72,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        🧑‍🎓
      </Text>

      {/* Greeting */}
      <Text
        style={{
          color: "#0BE602",
          fontSize: 22,
          fontWeight: "600",
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
        {user.email}
      </Text>

      {/* Generate QR Button */}
      {!showQR && (
        <TouchableOpacity
          onPress={() => {
            setTimestamp(Date.now());
            setShowQR(true);
          }}
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
            Generate QR
          </Text>
        </TouchableOpacity>
      )}

      {/* QR Section */}
      {showQR && (
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#0f0f0f",
            padding: 24,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: "#0BE602",
          }}
        >
          <QRCode
            value={qrPayload}
            size={220}
            color="#0BE602"
            backgroundColor="transparent"
          />

          <Text
            style={{
              color: "#0BE602",
              marginTop: 14,
              fontSize: 13,
            }}
          >
            QR refreshes every 30 seconds
          </Text>

          <TouchableOpacity
            onPress={() => setShowQR(false)}
            style={{ marginTop: 16 }}
          >
            <Text
              style={{
                color: "#ffffff",
                opacity: 0.7,
                fontSize: 13,
              }}
            >
              Generate again
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
