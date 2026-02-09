console.log("ROOT LAYOUT MOUNTED");
import { auth } from "@/lib/firebase";
import { getUserProfile } from "@/lib/getUserProfile";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<
    "student" | "vendor" | "admin" | null
  >(null);

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    console.log("AUTH STATE CHANGED", user?.uid);

    try {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      const profile = await getUserProfile(user.uid);

      if (!profile) {
        console.warn("No Firestore profile found");
        setRole("student"); // or null
        setLoading(false);
        return;
      }

      if (!profile.active) {
        console.log("PROFILE FETCHED:", profile);
console.log("ROLE SET TO:", profile?.role);

        setRole("student");
        setLoading(false);
        return;
      }

      setRole(profile.role);
      setLoading(false);
    } catch (err) {
      console.error("Auth layout error:", err);
      setRole(null);
      setLoading(false);
    }
  });

  return unsub;
}, []);


  if (loading) return null;




  // 🔓 NOT LOGGED IN
  if (!role) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="landing" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="blocked" />
      </Stack>
    );
  }

  // 🔐 ROLE-BASED APP SHELL
  return (
    <Stack screenOptions={{ headerShown: false }}>
  {role === "student" && <Stack.Screen name="student" />}
  {role === "vendor" && <Stack.Screen name="vendor" />}
  {role === "admin" && <Stack.Screen name="admin" />}
</Stack>

  );
}
