import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAe2lXfKhjs07uSLTe1oYH0ErRPfmiyZR8",
  authDomain: "feedback-432f5.firebaseapp.com",
  projectId: "feedback-432f5",
  storageBucket: "feedback-432f5.firebasestorage.app",
  messagingSenderId: "304255294197",
  appId: "1:304255294197:web:46f818c479cbf2a7cbc3bc",
  measurementId: "G-SHLGHWPX1L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
};
