import { auth, db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function StudentAnalytics() {
  const [weekly, setWeekly] = useState<number[]>(Array(7).fill(0));
  const [dailyTotals, setDailyTotals] = useState<Record<number, number>>({});

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("studentUid", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const weeklySum = Array(7).fill(0);
      const dailyMap: Record<number, number> = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.createdAt) return;

        const date = data.createdAt.toDate();
        weeklySum[date.getDay()] += data.amount;

        const day = date.getDate();
        dailyMap[day] = (dailyMap[day] || 0) + data.amount;
      });

      setWeekly(weeklySum);
      setDailyTotals(dailyMap);
    });

    return unsub;
  }, []);

  const totalWeeklySpend = weekly.reduce((a, b) => a + b, 0);
  const avgDailySpend =
    totalWeeklySpend > 0 ? Math.round(totalWeeklySpend / 7) : 0;

  const maxAmount = Math.max(...weekly, 1);
  const highestDayIndex = weekly.indexOf(Math.max(...weekly));

  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const firstDayIndex = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).getDay();

  const hasData = totalWeeklySpend > 0;

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
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Analytics
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.6,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        Understand where and when you spend
      </Text>

      {/* Summary Cards */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 28,
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
          <Text style={{ color: "#ffffff", opacity: 0.6 }}>
            Weekly total
          </Text>
          <Text
            style={{
              color: "#0BE602",
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            ₹{totalWeeklySpend}
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
          <Text style={{ color: "#ffffff", opacity: 0.6 }}>
            Weekly Avg / day
          </Text>
          <Text
            style={{
              color: "#0BE602",
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            ₹{avgDailySpend}
          </Text>
        </View>
      </View>

      {/* Weekly Spend */}
      <Text
        style={{
          color: "#0BE602",
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 6,
        }}
      >
        Weekly spending pattern
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.5,
          fontSize: 12,
          marginBottom: 12,
        }}
      >
        Taller bars mean higher spending on that day
      </Text>

      {hasData ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 200,
          }}
        >
          {weekly.map((amount, i) => (
            <View key={i} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 22,
                  height: (amount / maxAmount) * 160,
                  backgroundColor:
                    i === highestDayIndex ? "#0BE602" : "#0BE60299",
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              />
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 12,
                  opacity: i === highestDayIndex ? 1 : 0.6,
                }}
              >
                {WEEK_DAYS[i]}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#0f0f0f",
            borderRadius: 16,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              opacity: 0.6,
              textAlign: "center",
            }}
          >
            Not enough data yet. Start making payments to see analytics.
          </Text>
        </View>
      )}

      {/* Insight */}
      {hasData && (
        <Text
          style={{
            color: "#ffffff",
            opacity: 0.5,
            fontSize: 12,
            marginTop: 10,
          }}
        >
          Highest spending usually happens on{" "}
          <Text style={{ color: "#0BE602", fontWeight: "600" }}>
            {WEEK_DAYS[highestDayIndex]}
          </Text>
        </Text>
      )}

      {/* Monthly Heatmap */}
      <Text
        style={{
          color: "#0BE602",
          fontSize: 18,
          fontWeight: "600",
          marginTop: 32,
          marginBottom: 6,
        }}
      >
        Monthly activity
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.5,
          fontSize: 12,
          marginBottom: 12,
        }}
      >
        Darker days indicate higher spending
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <View key={i} style={{ width: "13%" }} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const intensity = Math.min((dailyTotals[day] || 0) / 300, 1);

          return (
            <View
              key={day}
              style={{
                width: "13%",
                aspectRatio: 1,
                borderRadius: 10,
                backgroundColor: `rgba(11,230,2,${0.25 + intensity * 0.75})`,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.4,
          fontSize: 12,
          marginTop: 12,
        }}
      >
        Analytics are based on your actual UniPay transactions
      </Text>
    </ScrollView>
  );
}
