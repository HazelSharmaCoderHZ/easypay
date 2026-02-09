import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SetGoal() {
  const [goal, setGoal] = useState("");

  const isValid = Number(goal) > 0;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Emoji / Motivation */}
      <Text style={{ fontSize: 64, textAlign: "center", marginBottom: 16 }}>
        🎯
      </Text>

      <Text
        style={{
          color: "#0BE602",
          fontSize: 24,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 6,
        }}
      >
        Set Your Monthly Spending Goal
      </Text>

      <Text
        style={{
          color: "#ffffff",
          opacity: 0.6,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        Control your campus spending
      </Text>

      {/* Input */}
      <TextInput
        value={goal}
        onChangeText={setGoal}
        keyboardType="numeric"
        placeholder="Enter amount (₹)"
        placeholderTextColor="#555"
        style={{
          borderWidth: 1,
          borderColor: "#0BE602",
          borderRadius: 18,
          padding: 18,
          fontSize: 20,
          color: "#ffffff",
          textAlign: "center",
          marginBottom: 24,
        }}
      />

      {/* Button */}
      <TouchableOpacity
        disabled={!isValid}
        style={{
          backgroundColor: isValid ? "#0BE602" : "#0BE60240",
          paddingVertical: 16,
          borderRadius: 20,
          transform: [{ scale: isValid ? 1 : 0.97 }],
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 16,
            color: "#000",
          }}
        >
          Save Goal
        </Text>
      </TouchableOpacity>

      {/* Hint */}
      <Text
        style={{
          color: "#ffffff",
          opacity: 0.4,
          textAlign: "center",
          fontSize: 12,
          marginTop: 16,
        }}
      >
        You can change this anytime
      </Text>
    </View>
  );
}
