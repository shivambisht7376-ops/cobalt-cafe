import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ============================================================
//  Cobalt Caffe — Firebase Configuration
// ============================================================

export const firebaseConfig = {
  apiKey: "AIzaSyBmqG2YnqAE7kh2SWYuEvQwTQay6z6_-Po",
  authDomain: "talha-di-hatti.firebaseapp.com",
  projectId: "talha-di-hatti",
  storageBucket: "talha-di-hatti.firebasestorage.app",
  messagingSenderId: "789051620713",
  appId: "1:789051620713:web:a2736d0af51a576e4151f8",
  measurementId: "G-TB0EGQ3HJE"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

// Admin email — only this account can access the admin portal
export const ADMIN_EMAILS = [
  "shivamzi953@gmail.com",
  "shivambisht935@gmail.com"
];

// Total tables in the cafe
export const TOTAL_TABLES = 15;