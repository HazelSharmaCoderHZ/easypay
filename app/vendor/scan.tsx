import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ScannedStudent = {
  email: string;
  ts: number;
};

export default function VendorScan() {
  const [amount, setAmount] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [student, setStudent] = useState<ScannedStudent | null>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission?.granted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>
          Camera permission required
        </Text>
      </View>
    );
  }

  const handleScan = ({ data }: { data: string }) => {
    if (scanned || !amount) return;

    try {
      const parsed = JSON.parse(data);

      setStudent({
        email: parsed.email,
        ts: parsed.ts,
      });
      setScanned(true);
    } catch {
      // invalid QR → ignore
    }
  };

  const handleConfirm = () => {
    Alert.alert(
      "Transaction Successful ✅",
      `₹${amount} recorded successfully`,
      [
        {
          text: "OK",
          onPress: () => {
            // reset state for next scan
            setScanned(false);
            setStudent(null);
            setAmount("");
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* CAMERA (disabled after scan) */}
      {!scanned && (
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleScan}
        />
      )}

      {/* CONFIRMATION VIEW */}
      {scanned && student && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 24,
          }}
        >
          <Text
            style={{
              fontSize: 64,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
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
              borderRadius: 18,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <Text style={{ color: "#fff", marginBottom: 6 }}>
              Student: {student.email}
            </Text>

            <Text style={{ color: "#fff", marginBottom: 6 }}>
              Amount: ₹{amount}
            </Text>

            <Text style={{ color: "#fff", opacity: 0.6 }}>
              Time:{" "}
              {new Date(student.ts).toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleConfirm}
            style={{
              backgroundColor: "#0BE602",
              padding: 16,
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
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* BOTTOM INPUT (only before scan) */}
      {!scanned && (
        <View
          style={{
            padding: 20,
            backgroundColor: "#000",
            borderTopWidth: 1,
            borderColor: "#0BE602",
          }}
        >
          <TextInput
            placeholder="Enter amount ₹"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={{
              borderColor: "#0BE602",
              borderWidth: 1,
              borderRadius: 14,
              padding: 14,
              color: "#fff",
              marginBottom: 12,
            }}
          />

          <Text
            style={{
              color: "#fff",
              opacity: 0.6,
              textAlign: "center",
            }}
          >
            Enter amount, then scan student QR
          </Text>
        </View>
      )}
    </View>
  );
}
