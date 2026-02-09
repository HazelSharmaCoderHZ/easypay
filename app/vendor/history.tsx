import { ScrollView, Text, View } from "react-native";

const mockHistory = [
  {
    id: "1",
    student: "student1@vitstudent.ac.in",
    amount: 120,
    time: "12 Sep 2026 • 01:24 PM",
  },
  {
    id: "2",
    student: "student2@vitstudent.ac.in",
    amount: 60,
    time: "12 Sep 2026 • 02:10 PM",
  },
  {
    id: "3",
    student: "student3@vitstudent.ac.in",
    amount: 180,
    time: "11 Sep 2026 • 07:45 PM",
  },
  {
    id: "4",
    student: "student4@vitstudent.ac.in",
    amount: 90,
    time: "11 Sep 2026 • 06:05 PM",
  },
  {
    id: "5",
    student: "student5@vitstudent.ac.in",
    amount: 40,
    time: "10 Sep 2026 • 04:30 PM",
  },
];

export default function VendorHistory() {
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
        History
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.6,
          marginBottom: 24,
        }}
      >
        Past transactions (demo data)
      </Text>

      {/* Transactions */}
      {mockHistory.map((tx) => (
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
                fontSize: 14,
                fontWeight: "600",
                flex: 1,
                marginRight: 8,
              }}
            >
              {tx.student}
            </Text>

            <Text
              style={{
                color: "#0BE602",
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              ₹{tx.amount}
            </Text>
          </View>

          <Text
            style={{
              color: "#ffffff",
              opacity: 0.5,
              fontSize: 12,
            }}
          >
            {tx.time}
          </Text>
        </View>
      ))}

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.4,
          fontSize: 12,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        This is a demo history view
      </Text>
    </ScrollView>
  );
}
