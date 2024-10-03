import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:"AIzaSyAK1fHPnYd5QZDqA6x74Sad9mpKQw2uXic",
  authDomain: "athleteally-3c235.firebaseapp.com",
  projectId: "athleteally-3c235",
  storageBucket: "athleteally-3c235.appspot.com",
  messagingSenderId: "424160962540",
  appId: "1:424160962540:web:ceaa25805f9599e78202c9",
  measurementId:"G-K4T3JQVHEG",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
