import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * MANUAL SETUP REQUIRED:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use an existing one).
 * 3. Add a Web App to your project.
 * 4. Copy the firebaseConfig object and paste it below.
 * 5. Enable Firestore Database and Firebase Authentication (Google provider).
 */
const firebaseConfig = {
  apiKey: "AIzaSyCP85yvORfDxP-AVVfePrJBxwr4toaXQzg",
  authDomain: "porrtfolio-visitor-counter.firebaseapp.com",
  projectId: "porrtfolio-visitor-counter",
  storageBucket: "porrtfolio-visitor-counter.firebasestorage.app",
  messagingSenderId: "153592606800",
  appId: "1:153592606800:web:8843be7537943391e3a155",
  measurementId: "G-XHLZW0K026"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
