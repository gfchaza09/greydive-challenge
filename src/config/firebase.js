// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVYJLNn_-pfPxfsh_l94pdW4PkX1El5N8",
  authDomain: "greydive-challenge-18dd3.firebaseapp.com",
  projectId: "greydive-challenge-18dd3",
  storageBucket: "greydive-challenge-18dd3.appspot.com",
  messagingSenderId: "851139722150",
  appId: "1:851139722150:web:baaac4c8efc8f2053cad67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
