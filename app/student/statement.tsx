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

export default function History() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("studentUid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTransactions(txs);

      const sum = txs.reduce((acc, tx) => acc + (tx.amount || 0), 0);
      setTotal(sum);
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
        All your campus payments
      </Text>

      {/* Total Summary */}
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
          Total spent
        </Text>
        <Text
          style={{
            color: "#0BE602",
            fontSize: 24,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          ₹{total}
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
            }}
          >
            {/* Row */}
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
                Campus Purchase
              </Text>

              <Text
                style={{
                  color: "#0BE602",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                −₹{tx.amount}
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
