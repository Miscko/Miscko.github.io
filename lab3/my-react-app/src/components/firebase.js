// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBitbJWjQces_pZnSKzHlWQJ39y15x0FNE",
  authDomain: "web-app-f99bb.firebaseapp.com",
  projectId: "web-app-f99bb",
  storageBucket: "web-app-f99bb.appspot.com",
  messagingSenderId: "333417709049",
  appId: "1:333417709049:web:82c53c260ddad720e41128",
  measurementId: "G-D9ZSHQ1ZJE",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
