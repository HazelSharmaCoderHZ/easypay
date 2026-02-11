import { auth, db } from "@/lib/firebase";
import { CameraView, useCameraPermissions } from "expo-camera";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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
  uid: string;
  ts: number;
};

export default function VendorScan() {
  const [amount, setAmount] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [student, setStudent] = useState<ScannedStudent | null>(null);

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  if (!permission?.granted) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Camera permission required</Text>
      </View>
    );
  }

  const handleScan = ({ data }: { data: string }) => {
    if (scanned || !amount) return;

    try {
      const parsed = JSON.parse(data);
      setStudent(parsed);
      setScanned(true);
    } catch {
      // ignore invalid QR
    }
  };

  const handleConfirm = async () => {
    try {
      const vendor = auth.currentUser;
      if (!vendor || !student) return;

      await addDoc(collection(db, "transactions"), {
        studentUid: student.uid,
        studentEmail: student.email,
        vendorUid: vendor.uid,
        amount: Number(amount),
        createdAt: serverTimestamp(),
      });

      Alert.alert("Transaction Successful ✅", `₹${amount} recorded`);

      setScanned(false);
      setStudent(null);
      setAmount("");
    } catch (err) {
      Alert.alert("Error", "Failed to record transaction");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {!scanned && (
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleScan}
        />
      )}

      {scanned && student && (
        <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
          <Text style={{ fontSize: 64, textAlign: "center" }}>✅</Text>

          <Text style={{ color: "#0BE602", fontSize: 22, fontWeight: "700", textAlign: "center" }}>
            Confirm Transaction
          </Text>

          <View style={{ backgroundColor: "#0f0f0f", borderRadius: 18, padding: 20, marginVertical: 24 }}>
            <Text style={{ color: "#fff" }}>Student: {student.email}</Text>
            <Text style={{ color: "#fff" }}>Amount: ₹{amount}</Text>
            <Text style={{ color: "#fff", opacity: 0.6 }}>
              Time: {new Date(student.ts).toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleConfirm}
            style={{ backgroundColor: "#0BE602", padding: 16, borderRadius: 16 }}
          >
            <Text style={{ textAlign: "center", fontWeight: "700", color: "#000" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!scanned && (
        <View style={{ padding: 20, borderTopWidth: 1, borderColor: "#0BE602" }}>
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
          <Text style={{ color: "#fff", opacity: 0.6, textAlign: "center" }}>
            Enter amount, then scan student QR
          </Text>
        </View>
      )}
    </View>
  );
}
