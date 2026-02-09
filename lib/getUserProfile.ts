import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export type UserProfile = {
  role: "student" | "vendor" | "admin";
  active: boolean;
};

export async function getUserProfile(uid: string) {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data() as UserProfile;
  } catch (err) {
    console.warn("Firestore profile fetch failed:", err);
    return "offline";
  }
}
