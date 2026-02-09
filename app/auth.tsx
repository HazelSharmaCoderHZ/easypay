import { auth, db } from "@/lib/firebase";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log("Attempting login...");

      // 1️⃣ Firebase Auth
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = cred.user.uid;
      console.log("Login successful:", uid);

      // 2️⃣ Fetch role from Firestore
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        throw new Error("User profile not found");
      }

      const data = snap.data();
      const role = data.role;

      console.log("User role:", role);

      // 3️⃣ Route based on role
      if (role === "student") {
        router.replace("/student");
      } else if (role === "vendor") {
        router.replace("/vendor");
      } else if (role === "admin") {
        router.replace("/admin");
      } else {
        throw new Error("Invalid user role");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      Alert.alert(
        "Login failed",
        err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
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
      <Text
        style={{
          color: "#0BE602",
          fontSize: 26,
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        UniPay Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#0BE602",
          borderRadius: 12,
          padding: 14,
          color: "#fff",
          marginBottom: 16,
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
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          backgroundColor: "#0BE602",
          padding: 16,
          borderRadius: 14,
          marginTop: 24,
          opacity: loading ? 0.7 : 1,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            color: "#000",
          }}
        >
          {loading ? "Signing in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
