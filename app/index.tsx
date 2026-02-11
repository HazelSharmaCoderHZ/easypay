import { auth } from "@/lib/firebase";
import { Redirect } from "expo-router";

export default function Index() {
  const user = auth.currentUser;

  if (!user) {
    return <Redirect href="/landing" />;
  }

  // Logged-in users go to auth resolver
  return <Redirect href="/auth" />;
}