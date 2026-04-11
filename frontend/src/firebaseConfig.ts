import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCP85yvORfDxP-AVVfePrJBxwr4toaXQzg",
  authDomain: "porrtfolio-visitor-counter.firebaseapp.com",
  projectId: "porrtfolio-visitor-counter",
  storageBucket: "porrtfolio-visitor-counter.firebasestorage.app",
  messagingSenderId: "153592606800",
  appId: "1:153592606800:web:8843be7537943391e3a155",
  measurementId: "G-XHLZW0K026"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;