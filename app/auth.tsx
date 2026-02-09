import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Attempting login...");
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Login successful:", cred.user.uid);

      // 🔥 FORCE navigation (THIS WAS MISSING)
      router.replace("/student"); // temporary hard route
    } catch (err) {
      console.error("Login failed:", err);
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
      <Text style={{ color: "#0BE602", fontSize: 26, textAlign: "center" }}>
        UniPay Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#0BE602",
          borderRadius: 12,
          padding: 14,
          color: "#fff",
          marginTop: 24,
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#0BE602",
          borderRadius: 12,
          padding: 14,
          color: "#fff",
          marginTop: 16,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#0BE602",
          padding: 16,
          borderRadius: 14,
          marginTop: 24,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
