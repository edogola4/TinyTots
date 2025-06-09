import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAT76q1aWuln2L3BiuVPhCDe5b77hbof8I",
  authDomain: "tinytots-6b2eb.firebaseapp.com",
  projectId: "tinytots-6b2eb",
  storageBucket: "tinytots-6b2eb.firebasestorage.app",
  messagingSenderId: "105498124375",
  appId: "1:105498124375:web:b904167a13c6ef2e500312",
  measurementId: "G-7H5WRQB83L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);