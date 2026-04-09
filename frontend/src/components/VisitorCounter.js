import React, { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
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

// Safe initialization
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const trackVisitor = async () => {
      const sessionKey = 'visitor_tracked_portfolio';
      if (localStorage.getItem(sessionKey)) {
        console.log("Visitor already tracked this session.");
        return;
      }

      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const visitorId = crypto.randomUUID();
        
        console.log("Tracking new visitor from:", data.city);

        await setDoc(doc(db, "visitors", visitorId), {
          id: visitorId,
          timestamp: serverTimestamp(),
          country: data.country_name || 'Unknown',
          city: data.city || 'Unknown',
          lat: data.latitude || 0,
          lng: data.longitude || 0
        });

        const statsRef = doc(db, "stats", "global");
        await updateDoc(statsRef, {
          totalVisitors: increment(1)
        }).catch(async (err) => {
          if (err.code === 'not-found') {
            await setDoc(statsRef, { totalVisitors: 1 });
          } else {
            throw err;
          }
        });

        localStorage.setItem(sessionKey, 'true');
      } catch (error) {
        console.error('Visitor tracking error:', error);
      }
    };

    trackVisitor();

    const unsubscribe = onSnapshot(doc(db, "stats", "global"), (docSnap) => {
      if (docSnap.exists()) {
        setCount(docSnap.data().totalVisitors);
      } else {
        console.log("Stats document does not exist yet.");
        setCount(0);
      }
    }, (error) => {
      console.error("Listener error:", error);
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