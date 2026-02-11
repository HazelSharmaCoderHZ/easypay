import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="landing" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="blocked" />

      <Stack.Screen name="student" />
      <Stack.Screen name="vendor" />
      <Stack.Screen name="admin" />
    </Stack>
  );
}