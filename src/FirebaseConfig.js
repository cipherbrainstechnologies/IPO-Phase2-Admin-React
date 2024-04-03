import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcmb_bZiVnFwzGw3vRlGpSdikk72ZCbf4",
  authDomain: "ipodekho-19fc1.firebaseapp.com",
  projectId: "ipodekho-19fc1",
  storageBucket: "ipodekho-19fc1.appspot.com",
  messagingSenderId: "931102543499",
  appId: "1:931102543499:web:01c01b8e86983e8ccf4e8e",
  measurementId: "G-02SPCQPKDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
