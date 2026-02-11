import { auth, db } from "@/lib/firebase";
import { useRouter } from "expo-router";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function VendorHome() {
  const router = useRouter();
  const user = auth.currentUser;

  const [todayRevenue, setTodayRevenue] = useState(0);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("vendorUid", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const today = new Date();
      let total = 0;

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.createdAt) return;

        const date = data.createdAt.toDate();

        if (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        ) {
          total += data.amount || 0;
        }
      });

      setTodayRevenue(total);
    });

    return unsub;
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24 }}>
      {/* Avatar */}
      <Text style={{ fontSize: 72, textAlign: "center", marginBottom: 12 }}>
        🧑‍🍳
      </Text>

      {/* Greeting */}
      <Text style={{ color: "#0BE602", fontSize: 22, textAlign: "center" }}>
        Hello 👋
      </Text>

      <Text
        style={{
          color: "#fff",
          opacity: 0.7,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        {user?.email}
      </Text>

      {/* Revenue Card */}
      <View
        style={{
          backgroundColor: "#0f0f0f",
          borderRadius: 20,
          padding: 20,
          marginBottom: 32,
          borderWidth: 1,
          borderColor: "#0BE602",
        }}
      >
        <Text style={{ color: "#0BE602", fontSize: 14 }}>
          Today’s Revenue
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          ₹{todayRevenue}
        </Text>

        <Text
          style={{
            color: "#ffffff",
            opacity: 0.4,
            fontSize: 12,
            marginTop: 6,
          }}
        >
          Updates in real time
        </Text>
      </View>

      {/* Action */}
      <TouchableOpacity
        onPress={() => router.push("/vendor/scan")}
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
          }}
        >
          Scan QR
        </Text>
      </TouchableOpacity>
    </View>
  );
}
