import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Or Firestore if preferred

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export the Realtime Database instance (or Firestore, if you choose to switch)
export const db = getDatabase(app); // For Realtime Database
// export const db = getFirestore(app); // Uncomment this for Firestore if needed