
async function checkIPBlock() {
  try {
    const res = await fetch("https://ipinfo.io/json");
    if (!res.ok) return;

    const ipData = await res.json();
    const ip = ipData.ip;

    if (!ip) return;

 
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
    const { getFirestore, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js");

    const firebaseConfig = {
      apiKey: "AIzaSyBUWnHIPZ8JOUsX0ba-f70l2S7EkRaoz5Q",
      authDomain: "da1assdasdg.firebaseapp.com",
      projectId: "da1assdasdg",
      storageBucket: "da1assdasdg.firebasestorage.app",
      messagingSenderId: "612813413332",
      appId: "1:612813413332:web:386e44f11da041562d1441"
    };

    const app = initializeApp(firebaseConfig, "blocker");
    const db = getFirestore(app);

    const blockedRef = doc(db, "blocked_ips", ip);
    const blockedSnap = await getDoc(blockedRef);

    if (blockedSnap.exists()) {
      console.log("🚫 IP BLOQUEADA:", ip);
      window.location.href = "https://www.google.com";
    }
  } catch (e) {
    console.warn("Error en verificación de bloqueo:", e);
  }
}


checkIPBlock();
setInterval(checkIPBlock, 2000);