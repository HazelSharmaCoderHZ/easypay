import { auth, db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SetGoal() {
  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState(false);

  const isValid = Number(goal) > 0;

  // 🔁 Load existing goal
  useEffect(() => {
    const loadGoal = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "goals", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setGoal(String(snap.data().monthlyGoal));
      }
    };

    loadGoal();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await setDoc(doc(db, "goals", user.uid), {
        monthlyGoal: Number(goal),
        updatedAt: serverTimestamp(),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      Alert.alert("Error", "Failed to save goal");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Card */}
      <View
        style={{
          backgroundColor: "#0f0f0f",
          borderRadius: 24,
          padding: 24,
          borderWidth: 1,
          borderColor: "#0BE602",
        }}
      >
        {/* Emoji */}
        <Text style={{ fontSize: 64, textAlign: "center", marginBottom: 8 }}>
          🎯
        </Text>

        {/* Title */}
        <Text
          style={{
            color: "#0BE602",
            fontSize: 22,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Monthly Spending Goal
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            color: "#ffffff",
            opacity: 0.6,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Set a limit to track and control your campus expenses
        </Text>

        {/* Input */}
        <TextInput
          value={goal}
          onChangeText={(v) => {
            setGoal(v);
            setSaved(false);
          }}
          keyboardType="numeric"
          placeholder="₹ Enter amount"
          placeholderTextColor="#666"
          style={{
            borderWidth: 1,
            borderColor: "#0BE602",
            borderRadius: 18,
            padding: 18,
            fontSize: 20,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 10,
          }}
        />

        {/* Helper */}
        <Text
          style={{
            color: "#ffffff",
            opacity: 0.4,
            textAlign: "center",
            fontSize: 12,
            marginBottom: 20,
          }}
        >
          This resets automatically every month
        </Text>

        {/* Save Button */}
        <TouchableOpacity
          disabled={!isValid}
          onPress={handleSave}
          style={{
            backgroundColor: isValid ? "#0BE602" : "#0BE60240",
            paddingVertical: 16,
            borderRadius: 20,
            marginBottom: 12,
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

        {/* Success Message */}
        {saved && (
          <View
            style={{
              backgroundColor: "#0BE60220",
              borderRadius: 14,
              padding: 12,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: "#0BE602",
                fontSize: 13,
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              ✅ Goal updated successfully
            </Text>
          </View>
        )}
      </View>

      {/* Footer hint */}
      <Text
        style={{
          color: "#ffffff",
          opacity: 0.35,
          textAlign: "center",
          fontSize: 12,
          marginTop: 20,
        }}
      >
        You can change this anytime
      </Text>
    </View>
  );
}
