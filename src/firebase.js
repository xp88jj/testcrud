import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Or Firestore if preferred

const firebaseConfig = {
  apiKey: "AIzaSyAq9ndrukr8VJjwn25n6lUNGpwQ6ui73Vw",
  authDomain: "testcrud-30cfd.firebaseapp.com",
  databaseURL: "https://testcrud-30cfd-default-rtdb.firebaseio.com",
  projectId: "testcrud-30cfd",
  storageBucket: "testcrud-30cfd.firebasestorage.app",
  messagingSenderId: "742703032125",
  appId: "1:742703032125:web:196091c5423f907fc48754",
  measurementId: "G-MCPWDNJCRN"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export the Realtime Database instance (or Firestore, if you choose to switch)
export const db = getDatabase(app); // For Realtime Database
// export const db = getFirestore(app); // Uncomment this for Firestore if needed