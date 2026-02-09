import { Text, View } from "react-native";

export default function AdminHome() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Text style={{ color: "#0BE602", fontSize: 22 }}>
        UniPay Admin Panel
      </Text>
    </View>
  );
}
