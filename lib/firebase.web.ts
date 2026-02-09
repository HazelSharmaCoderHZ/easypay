import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsQKcmU4vr_omN5WACeEUk1rULzQnJw2U",
  authDomain: "unipay-3b36b.firebaseapp.com",
  projectId: "unipay-3b36b",
  storageBucket: "unipay-3b36b.firebasestorage.app",
  messagingSenderId: "336395614622",
  appId: "1:336395614622:web:53ea6957fabc5c2103fe8f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // browser persistence
export const db = getFirestore(app);

export default app;
