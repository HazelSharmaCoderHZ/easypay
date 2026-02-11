import { Text, View } from "react-native";

export default function Blocked() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        padding: 24,
      }}
    >
      <Text
        style={{
          color: "#0BE602",
          fontSize: 20,
          marginBottom: 12,
        }}
      >
        Access Restricted
      </Text>

      <Text
        style={{
          color: "#9CA3AF",
          textAlign: "center",
        }}
      >
        Your account is not active or not registered.
        Please contact the university admin.
      </Text>
    </View>
  );
}