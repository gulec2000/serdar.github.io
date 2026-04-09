import React, { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { db } from "@/firebase";
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const firebaseConfig = {
  apiKey: "AIzaSyCP85yvORfDxP-AVVfePrJBxwr4toaXQzg",
  authDomain: "porrtfolio-visitor-counter.firebaseapp.com",
  projectId: "porrtfolio-visitor-counter",
  storageBucket: "porrtfolio-visitor-counter.firebasestorage.app",
  messagingSenderId: "153592606800",
  appId: "1:153592606800:web:8843be7537943391e3a155"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function RecentVisitors() {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "visitors"), orderBy("timestamp", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVisitors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
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
              className="flex items-center gap-3 group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 transition-colors" />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[11px] text-zinc-300 truncate">
                  {v.city}, {v.country}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}