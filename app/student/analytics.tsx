import { ScrollView, Text, View } from "react-native";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const mockWeeklyData = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 60 },
  { day: "Wed", amount: 180 },
  { day: "Thu", amount: 90 },
  { day: "Fri", amount: 220 },
  { day: "Sat", amount: 40 },
  { day: "Sun", amount: 150 },
];

export default function StudentAnalytics() {
  const today = new Date();
  const monthName = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(year, today.getMonth(), 1).getDay();

  const maxAmount = Math.max(...mockWeeklyData.map(d => d.amount));

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
        Spending insights & patterns
      </Text>

      {/* Weekly Bar Chart */}
      <Text
        style={{
          color: "#0BE602",
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 12,
        }}
      >
        Weekly Spend
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: 200,
          marginBottom: 36,
        }}
      >
        {mockWeeklyData.map((item) => {
          const height = (item.amount / maxAmount) * 160;

          return (
            <View key={item.day} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 22,
                  height,
                  borderRadius: 12,
                  backgroundColor: "#0BE602",
                  marginBottom: 8,
                }}
              />
              <Text style={{ color: "#ffffff", fontSize: 12 }}>
                {item.day}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Month Header */}
      <Text
        style={{
          color: "#0BE602",
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 12,
          marginTop: 18
        }}
      >
        {monthName} {year}
      </Text>

      {/* Weekday Labels */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        {WEEK_DAYS.map((day) => (
          <Text
            key={day}
            style={{
              color: "#ffffff",
              opacity: 0.6,
              width: "13%",
              textAlign: "center",
              fontSize: 12,
            }}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {/* Empty cells before month starts */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <View key={`empty-${i}`} style={{ width: "13%" }} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const intensity = Math.random(); // mock spending intensity
          const day = i + 1;

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
          marginTop: 14,
        }}
      >
        Brighter days indicate higher spending (demo data)
      </Text>
    </ScrollView>
  );
}
