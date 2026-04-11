import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { MapPin, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecentVisitors() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "visitors"),
      orderBy("timestamp", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("RecentVisitors data received:", docs.length, "items");
        setVisitors(docs);
      },
      (error) => {
        console.error("RecentVisitors Listener Error:", error);
        // If index is missing, Firestore provides a link in the console
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="mt-8 pt-8 border-t border-zinc-800">
      <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400 mb-4 flex items-center gap-2">
        <Globe size={12} className="text-amber-500" />
        Recent Visitors
      </h4>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visitors.map((v) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[11px] text-zinc-300 truncate">
                  {v.city}, {v.country}
                </p>
              </div>
              <span className="font-mono text-[9px] text-zinc-600 uppercase">
                {v.timestamp?.toDate() ? new Intl.RelativeTimeFormat('en', { style: 'short' }).format(
                  Math.ceil((v.timestamp.toDate().getTime() - Date.now()) / 60000), 'minute'
                ).replace('in 0 min', 'now') : 'now'}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {visitors.length === 0 && (
          <p className="font-mono text-[10px] text-zinc-600 italic">Waiting for traffic...</p>
        )}
      </div>
    </div>
  );
}
