import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyDgUTbqdazPfP-RY2nNHqC1w4CQ6b9OuHE",
  authDomain: "amaranoc4.firebaseapp.com",
  projectId: "amaranoc4",
  storageBucket: "amaranoc4.firebasestorage.app",
  messagingSenderId: "671971992189",
  appId: "1:671971992189:web:be7402a079f1f0d268c714",
  measurementId: "G-N97VP5STQS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue }; 