import React, { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { db } from "firebase";
import { getFirestore, doc, onSnapshot, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { Users } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyCP85yvORfDxP-AVVfePrJBxwr4toaXQzg",
  authDomain: "porrtfolio-visitor-counter.firebaseapp.com",
  projectId: "porrtfolio-visitor-counter",
  storageBucket: "porrtfolio-visitor-counter.firebasestorage.app",
  messagingSenderId: "153592606800",
  appId: "1:153592606800:web:8843be7537943391e3a155"
};

// Safe initialization helper
const getDb = () => {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getFirestore(app);
};

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const db = getDb();
    const statsRef = doc(db, "stats", "global");

    const trackVisitor = async () => {
      const sessionKey = 'visitor_tracked_portfolio';
      if (localStorage.getItem(sessionKey)) return;

      try {
        // 1. Get Location
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.ok ? await response.json() : {};
        
        // 2. Generate ID (with fallback for non-HTTPS or older browsers)
        const visitorId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
          ? crypto.randomUUID() 
          : Math.random().toString(36).substring(2) + Date.now().toString(36);

        // 3. Save Visitor Record
        await setDoc(doc(db, "visitors", visitorId), {
          id: visitorId,
          timestamp: serverTimestamp(),
          country: data.country_name || 'Unknown',
          city: data.city || 'Unknown',
          lat: data.latitude || 0,
          lng: data.longitude || 0
        });

        // 4. Update Global Counter
        try {
          await updateDoc(statsRef, {
            totalVisitors: increment(1)
          });
        } catch (err) {
          if (err.code === 'not-found') {
            await setDoc(statsRef, { totalVisitors: 1 });
          }
        }

        localStorage.setItem(sessionKey, 'true');
      } catch (error) {
        console.error('Tracking Error:', error);
      }
    };

    trackVisitor();

    // Real-time Listener
    const unsubscribe = onSnapshot(statsRef, (docSnap) => {
      if (docSnap.exists()) {
        setCount(docSnap.data().totalVisitors);
      } else {
        setCount(0);
      }
    }, (err) => {
      console.error("Firestore Listener Error:", err);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-2 border border-zinc-800 rounded-sm bg-zinc-900/30 mb-2">
      <Users size={12} className="text-amber-500" />
      <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-500">
        Visitors: <span className="text-zinc-200">{count !== null ? count.toLocaleString() : "..."}</span>
      </span>
    </div>
  );
}