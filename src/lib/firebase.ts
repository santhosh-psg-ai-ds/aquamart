// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "aquamart-a1h4f",
  "appId": "1:99056607686:web:96b565354daa8bb86452c7",
  "storageBucket": "aquamart-a1h4f.firebasestorage.app",
  "apiKey": "AIzaSyD8kHJSsG70eBb95RjGDUAwLIp8Ty7fsZk",
  "authDomain": "aquamart-a1h4f.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "99056607686"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
