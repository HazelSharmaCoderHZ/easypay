import { useTheme } from "@/constants/theme";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const QR_EXPIRY_MS = 30 * 1000; // 30 seconds

export default function VendorScan() {
  const { colors } = useTheme();
  const router = useRouter();

  const [permission, requestPermission] =
    useCameraPermissions();

  const [scanned, setScanned] = useState(false);

  // Permission loading
  if (!permission) return null;

  // Permission denied
  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            marginBottom: 12,
          }}
        >
          Camera access required
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: 14,
          }}
        >
          <Text style={{ fontWeight: "600", color: "#000" }}>
            Allow Camera
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = ({ data }: { data: string }) => {
    if (scanned) return;

    try {
      const parsed = JSON.parse(data);

      // Basic validation
      if (parsed.type !== "student-payment") {
        throw new Error("Invalid QR type");
      }

      const now = Date.now();
      if (now - parsed.ts > QR_EXPIRY_MS) {
        throw new Error("QR code expired");
      }

      if (!parsed.amount || parsed.amount <= 0) {
        throw new Error("Invalid amount");
      }

      if (!parsed.uid || !parsed.email) {
        throw new Error("Invalid student data");
      }

      setScanned(true);

      // Navigate to confirmation screen
      router.push({
        pathname: "/vendor/confirm",
        params: {
          uid: parsed.uid,
          email: parsed.email,
          amount: String(parsed.amount),
          ts: String(parsed.ts),
        },
      });
    } catch (err: any) {
      Alert.alert(
        "Invalid QR",
        err.message || "Unable to read QR code"
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={handleScan}
      />

      {/* Overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 240,
            height: 240,
            borderRadius: 24,
            borderWidth: 3,
            borderColor: colors.primary,
          }}
        />

        <Text
          style={{
            color: "#fff",
            marginTop: 20,
            fontSize: 16,
          }}
        >
          Scan student UniPay QR
        </Text>
      </View>
    </View>
  );
}
