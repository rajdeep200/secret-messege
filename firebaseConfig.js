import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCNDj5-dE2CV4hKIQ3gZnMDcztIAllu9bA",
  authDomain: "react-firebase-crud-35bd9.firebaseapp.com",
  projectId: "react-firebase-crud-35bd9",
  storageBucket: "react-firebase-crud-35bd9.appspot.com",
  messagingSenderId: "881193742883",
  appId: "1:881193742883:web:5955255fc5fa910c273796",
  measurementId: "G-3J49H428M6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);