import { useTheme } from "@/constants/theme";
import { auth, db } from "@/lib/firebase";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function StudentHome() {
  const { colors } = useTheme();
  const user = auth.currentUser;

  const [timestamp, setTimestamp] = useState(Date.now());
  const [showQR, setShowQR] = useState(false);
  const [spent, setSpent] = useState(0);
  const [goal, setGoal] = useState<number | null>(null);

  /* =======================
     🔁 Fetch Monthly Goal
     ======================= */
  useEffect(() => {
    if (!user) return;

    const loadGoal = async () => {
      const snap = await getDoc(doc(db, "goals", user.uid));
      if (snap.exists()) {
        setGoal(snap.data().monthlyGoal);
      }
    };

    loadGoal();
  }, []);

  /* =======================
     🔁 Fetch THIS MONTH spending (REAL-TIME)
     ======================= */
  useEffect(() => {
    if (!user) return;

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const q = query(
      collection(db, "transactions"),
      where("studentUid", "==", user.uid),
      where("createdAt", ">=", Timestamp.fromDate(monthStart))
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const total = snapshot.docs.reduce(
        (sum, d) => sum + (d.data().amount || 0),
        0
      );
      setSpent(total);
    });

    return unsub;
  }, []);

  /* =======================
     🔁 QR Refresh
     ======================= */
  useEffect(() => {
    if (!showQR) return;
    const interval = setInterval(() => setTimestamp(Date.now()), 30000);
    return () => clearInterval(interval);
  }, [showQR]);

  if (!user) return null;

  const effectiveGoal = goal ?? 3000; // fallback only if user never set a goal
  const progress = Math.min(spent / effectiveGoal, 1);

  const qrPayload = JSON.stringify({
    uid: user.uid,
    email: user.email,
    ts: timestamp,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center", padding: 24 }}>
      {/* 💸 Monthly Spending */}
      <View style={{ marginBottom: 28 }}>
        <Text style={{ color: "#0BE602", fontSize: 14, fontWeight: "600", textAlign: "center" }}>
          Monthly Spending
        </Text>

        <View style={{ height: 10, backgroundColor: "#1a1a1a", borderRadius: 10, marginTop: 8 }}>
          <View
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              backgroundColor: progress >= 1 ? "#ff4d4d" : "#0BE602",
              borderRadius: 10,
            }}
          />
        </View>

        <Text style={{ color: "#fff", opacity: 0.7, fontSize: 12, textAlign: "center", marginTop: 6 }}>
          ₹{spent} spent of ₹{effectiveGoal}
        </Text>

        {progress >= 1 && (
          <Text
            style={{
              color: "#ff4d4d",
              fontSize: 12,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Monthly goal exceeded
          </Text>
        )}
      </View>

      {/* Avatar */}
      <Text style={{ fontSize: 72, textAlign: "center" }}>🧑‍🎓</Text>

      <Text style={{ color: "#0BE602", fontSize: 22, textAlign: "center" }}>
        Hello 👋
      </Text>

      <Text style={{ color: "#fff", opacity: 0.7, textAlign: "center", marginBottom: 32 }}>
        {user.email}
      </Text>

      {/* QR */}
      {!showQR ? (
        <TouchableOpacity
          onPress={() => {
            setTimestamp(Date.now());
            setShowQR(true);
          }}
          style={{ backgroundColor: "#0BE602", padding: 16, borderRadius: 16 }}
        >
          <Text style={{ textAlign: "center", fontWeight: "700", color: "#000" }}>
            Generate QR
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            alignItems: "center",
            padding: 24,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: "#0BE602",
          }}
        >
          <QRCode value={qrPayload} size={220} color="#0BE602" backgroundColor="transparent" />
          <Text style={{ color: "#0BE602", marginTop: 14, fontSize: 13 }}>
            QR refreshes every 30 seconds
          </Text>
          <TouchableOpacity onPress={() => setShowQR(false)} style={{ marginTop: 16 }}>
            <Text style={{ color: "#fff", opacity: 0.7 }}>Generate again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
