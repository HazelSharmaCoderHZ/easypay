import { auth, db } from "@/lib/firebase";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function VendorHistory() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalEarned, setTotalEarned] = useState(0);

  useEffect(() => {
    const vendor = auth.currentUser;
    if (!vendor) return;

    const q = query(
      collection(db, "transactions"),
      where("vendorUid", "==", vendor.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(txs);

      const sum = txs.reduce(
        (acc, tx) => acc + (tx.amount || 0),
        0
      );
      setTotalEarned(sum);
    });

    return unsub;
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#000" }}
      contentContainerStyle={{ padding: 24 }}
    >
      {/* Header */}
      <Text
        style={{
          color: "#0BE602",
          fontSize: 26,
          fontWeight: "700",
          marginBottom: 4,
        }}
      >
        Transaction History
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.6,
          marginBottom: 20,
        }}
      >
        All payments received
      </Text>

      {/* Total Earnings */}
      <View
        style={{
          backgroundColor: "#0f0f0f",
          borderRadius: 18,
          padding: 18,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: "#0BE602",
        }}
      >
        <Text style={{ color: "#ffffff", opacity: 0.6 }}>
          Total earned
        </Text>
        <Text
          style={{
            color: "#0BE602",
            fontSize: 24,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          ₹{totalEarned}
        </Text>
      </View>

      {/* Transactions */}
      {transactions.map((tx) => {
        const date = tx.createdAt?.toDate();

        return (
          <View
            key={tx.id}
            style={{
              backgroundColor: "#0f0f0f",
              borderRadius: 16,
              padding: 16,
              marginBottom: 14,
              borderLeftWidth: 4,
              borderLeftColor: "#0BE602",
            }}
          >
            {/* Top Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                {tx.studentEmail || "Student"}
              </Text>

              <Text
                style={{
                  color: "#0BE602",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                +₹{tx.amount}
              </Text>
            </View>

            {/* Date */}
            <Text
              style={{
                color: "#ffffff",
                opacity: 0.45,
                fontSize: 12,
              }}
            >
              {date
                ? date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </Text>
          </View>
        );
      })}

      {/* Empty State */}
      {transactions.length === 0 && (
        <View style={{ marginTop: 60 }}>
          <Text
            style={{
              color: "#ffffff",
              opacity: 0.4,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            No transactions yet
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
