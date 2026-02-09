import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export type UserRole = "student" | "vendor" | "admin";

export type UserProfile = {
  role: UserRole;
  email: string;
  active: boolean;
};

export async function getUserProfile(
  uid: string
): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as UserProfile;
}
