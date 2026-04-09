import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { Users } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyCP85yvORfDxP-AVVfePrJBxwr4toaXQzg",
  authDomain: "porrtfolio-visitor-counter.firebaseapp.com",
  projectId: "porrtfolio-visitor-counter",
  storageBucket: "porrtfolio-visitor-counter.firebasestorage.app",
  messagingSenderId: "153592606800",
  appId: "1:153592606800:web:8843be7537943391e3a155",
  measurementId: "G-XHLZW0K026"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const trackVisitor = async () => {
      const sessionKey = 'visitor_tracked_portfolio';
      if (localStorage.getItem(sessionKey)) return;

      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const visitorId = crypto.randomUUID();
        
        await setDoc(doc(db, "visitors", visitorId), {
          id: visitorId,
          timestamp: serverTimestamp(),
          country: data.country_name || 'Unknown',
          city: data.city || 'Unknown',
          lat: data.latitude || 0,
          lng: data.longitude || 0,
          userAgent: navigator.userAgent
        });

        await updateDoc(doc(db, "stats", "global"), {
          totalVisitors: increment(1)
        }).catch(async (err) => {
          if (err.code === 'not-found') {
            await setDoc(doc(db, "stats", "global"), { totalVisitors: 1 });
          }
        });

        localStorage.setItem(sessionKey, 'true');
      } catch (error) { console.error('Tracking failed:', error); }
    };

    trackVisitor();

    const unsubscribe = onSnapshot(doc(db, "stats", "global"), (docSnap) => {
      if (docSnap.exists()) setCount(docSnap.data().totalVisitors);
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