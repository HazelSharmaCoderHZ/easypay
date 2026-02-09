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
      {/* Avatar / Emoji */}
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
