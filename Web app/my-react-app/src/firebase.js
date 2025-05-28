// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// імпортуємо те, що використовують компоненти:
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrUsM6aBqiAtfW10Xo9SAntlrMPxWkwS8",
  authDomain: "web-app-project-1234.firebaseapp.com",
  projectId: "web-app-project-1234",
  storageBucket: "web-app-project-1234.appspot.com",      
  messagingSenderId: "1037233706378",
  appId: "1:1037233706378:web:2c259ecb6ff28509176473",
  measurementId: "G-X5GY4GC854"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Створюємо і експортуємо сервіси, які потрібні у компонентах:
export const auth    = getAuth(app);
export const storage = getStorage(app);
export const db      = getFirestore(app);
