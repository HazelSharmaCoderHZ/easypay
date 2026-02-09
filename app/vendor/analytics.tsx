import { ScrollView, Text, View } from "react-native";

const dailyRevenue = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 1800 },
  { day: "Wed", amount: 900 },
  { day: "Thu", amount: 2100 },
  { day: "Fri", amount: 2600 },
  { day: "Sat", amount: 3200 },
  { day: "Sun", amount: 1500 },
];

export default function VendorAnalytics() {
  const maxAmount = Math.max(...dailyRevenue.map(d => d.amount));

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
          textAlign: "center"
        }}
      >
        Analytics
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.6,
          marginBottom: 28,
          textAlign: "center"
        }}
      >
        Revenue insights (demo data)
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
        {dailyRevenue.map((item) => {
          const height = (item.amount / maxAmount) * 160;

          return (
            <View key={item.day} style={{ alignItems: "center" }}>
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
                {item.day}
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
            ₹3200
          </Text>
          <Text style={{ color: "#ffffff", opacity: 0.5, fontSize: 12 }}>
            22.02.2026
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
            ₹900
          </Text>
          <Text style={{ color: "#ffffff", opacity: 0.5, fontSize: 12 }}>
            14.02.2026
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
        Demo analytics shown using mock data
      </Text>
    </ScrollView>
  );
}
