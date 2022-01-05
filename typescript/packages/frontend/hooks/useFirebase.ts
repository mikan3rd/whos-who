import { useEffect, useState } from "react";

import { getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";

export const useFirebase = () => {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  // const [firebaseAuth, setFirebaseAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== "undefined" && firebaseApp === null) {
      const clientCredentials = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      };
      const firebaseApp = initializeApp(clientCredentials);
      getAnalytics(firebaseApp);
      getPerformance(firebaseApp);

      setFirebaseApp(firebaseApp);
    }
  }, [firebaseApp]);

  return { firebaseApp };
};
