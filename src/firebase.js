import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "quikgrade-b4c31.firebaseapp.com",
  projectId: "quikgrade-b4c31",
  storageBucket: "quikgrade-b4c31.firebasestorage.app",
  messagingSenderId: "548831609048",
  appId: "1:548831609048:web:6075f36d6f6681fa3797ad",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
