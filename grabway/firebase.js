import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIsUfrQ-S-k5NJGQGvVdOmJ4Z0Y8-NqDM",
  authDomain: "grabway-8e3d1.firebaseapp.com",
  databaseURL: "https://grabway-8e3d1-default-rtdb.firebaseio.com",
  projectId: "grabway-8e3d1",
  storageBucket: "grabway-8e3d1.appspot.com",
  messagingSenderId: "23193733667",
  appId: "1:23193733667:web:c438a4067e8e6b70d7ff96",
  measurementId: "G-KC9GFHWTL7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { app, analytics, auth, database, firestore };
