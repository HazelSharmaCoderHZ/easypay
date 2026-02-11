import { auth, db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function VendorAnalytics() {
  const [weeklyRevenue, setWeeklyRevenue] = useState<number[]>(Array(7).fill(0));
  const [dailyTotals, setDailyTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    const vendor = auth.currentUser;
    if (!vendor) return;

    const q = query(
      collection(db, "transactions"),
      where("vendorUid", "==", vendor.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const weekly = Array(7).fill(0);
      const daily: Record<string, number> = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.createdAt) return;

        const date = data.createdAt.toDate();
        const dayIndex = date.getDay();
        const dateKey = date.toDateString(); // e.g. "Mon Feb 26 2026"

        weekly[dayIndex] += data.amount;
        daily[dateKey] = (daily[dateKey] || 0) + data.amount;
      });

      setWeeklyRevenue(weekly);
      setDailyTotals(daily);
    });

    return unsub;
  }, []);

  const maxAmount = Math.max(...weeklyRevenue, 1);

  // Highest & lowest earning day (this month)
  const today = new Date();
  const monthEntries = Object.entries(dailyTotals).filter(([dateStr]) => {
    const d = new Date(dateStr);
    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });

  let highest = { amount: 0, date: "" };
  let lowest = { amount: Infinity, date: "" };

  monthEntries.forEach(([date, amount]) => {
    if (amount > highest.amount) highest = { amount, date };
    if (amount < lowest.amount) lowest = { amount, date };
  });

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
          marginBottom: 6,
          textAlign: "center",
        }}
      >
        Analytics
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.6,
          marginBottom: 28,
          textAlign: "center",
        }}
      >
        Revenue insights
      </Text>

      {/* Weekly Revenue Bars */}
      <Text
        style={{
          color: "#0BE602",
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        This Week
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: 200,
          marginBottom: 32,
        }}
      >
        {weeklyRevenue.map((amount, index) => {
          const height = (amount / maxAmount) * 160;

          return (
            <View key={index} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 24,
                  height,
                  borderRadius: 12,
                  backgroundColor: "#0BE602",
                  marginBottom: 8,
                }}
              />
              <Text style={{ color: "#ffffff", fontSize: 12 }}>
                {WEEK_DAYS[index]}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Summary Cards */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#0f0f0f",
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: "#0BE602",
          }}
        >
          <Text style={{ color: "#0BE602", fontSize: 14 }}>
            Highest earning day this month
          </Text>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            ₹{highest.amount || 0}
          </Text>
          <Text style={{ color: "#ffffff", opacity: 0.5, fontSize: 12 }}>
            {highest.date || "—"}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#0f0f0f",
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: "#0BE602",
          }}
        >
          <Text style={{ color: "#0BE602", fontSize: 14 }}>
            Lowest earning day this month
          </Text>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            ₹{lowest.amount === Infinity ? 0 : lowest.amount}
          </Text>
          <Text style={{ color: "#ffffff", opacity: 0.5, fontSize: 12 }}>
            {lowest.date || "—"}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Text
        style={{
          color: "#ffffff",
          opacity: 0.4,
          fontSize: 12,
          textAlign: "center",
          marginTop: 24,
        }}
      >
        Analytics based on real transactions
      </Text>
    </ScrollView>
  );
}
