import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/performance";

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = process.env;

const clientCredentials = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Check that `window` is in scope for the analytics module!
if (typeof window !== "undefined" && firebase.apps.length === 0) {
  firebase.initializeApp(clientCredentials);
  firebase.analytics();
  firebase.performance();
}

export default firebase;
