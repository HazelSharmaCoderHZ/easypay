import { ScrollView, Text, View } from "react-native";

const mockTransactions = [
  {
    id: "1",
    title: "Cafeteria Lunch",
    date: "12 Sep 2026",
    time: "01:24 PM",
    amount: 120,
  },
  {
    id: "2",
    title: "Coffee Stall",
    date: "12 Sep 2026",
    time: "05:10 PM",
    amount: 60,
  },
  {
    id: "3",
    title: "Evening Snacks",
    date: "11 Sep 2026",
    time: "06:45 PM",
    amount: 90,
  },
  {
    id: "4",
    title: "Juice Corner",
    date: "10 Sep 2026",
    time: "04:12 PM",
    amount: 40,
  },
  {
    id: "5",
    title: "Breakfast Canteen",
    date: "09 Sep 2026",
    time: "08:30 AM",
    amount: 70,
  },
];

export default function Statement() {
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
        }}
      >
        Statement
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.6,
          marginBottom: 24,
        }}
      >
        Your spending history
      </Text>

      {/* Transactions */}
      {mockTransactions.map((tx) => (
        <View
          key={tx.id}
          style={{
            backgroundColor: "#0f0f0f",
            borderRadius: 18,
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
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {tx.title}
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

          {/* Meta */}
          <Text
            style={{
              color: "#ffffff",
              opacity: 0.5,
              fontSize: 12,
            }}
          >
            {tx.date} • {tx.time}
          </Text>
        </View>
      ))}

      {/* Footer */}
      <Text
        style={{
          color: "#ffffff",
          opacity: 0.4,
          fontSize: 12,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        This is a demo statement with sample data
      </Text>
    </ScrollView>
  );
}
