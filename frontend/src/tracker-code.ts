export const TRACKER_CODE = (config: any) => `
<!-- Visitor Tracker Script -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getFirestore, doc, setDoc, updateDoc, increment, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

  const firebaseConfig = ${JSON.stringify(config, null, 2)};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function trackVisitor() {
    const sessionKey = 'visitor_tracked_' + firebaseConfig.projectId;
    if (localStorage.getItem(sessionKey)) return;

    try {
      // Get location data
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      const visitorId = crypto.randomUUID();
      
      // 1. Record individual visitor
      await setDoc(doc(db, "visitors", visitorId), {
        id: visitorId,
        timestamp: serverTimestamp(),
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown',
        lat: data.latitude || 0,
        lng: data.longitude || 0,
        userAgent: navigator.userAgent
      });

      // 2. Increment global counter
      await updateDoc(doc(db, "stats", "global"), {
        totalVisitors: increment(1)
      }).catch(async (err) => {
        // If document doesn't exist, create it (first visitor)
        if (err.code === 'not-found') {
          await setDoc(doc(db, "stats", "global"), { totalVisitors: 1 });
        }
      });

      localStorage.setItem(sessionKey, 'true');
    } catch (error) {
      console.error('Tracking failed:', error);
    }
  }

  trackVisitor();
</script>
`;
