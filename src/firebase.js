import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore'; // ✅ أضفنا serverTimestamp

const firebaseConfig = {
    apiKey: "AIzaSyBjoBBtVCHo9NMoypsjYOZOnjEznkjKgTs",
    authDomain: "swai-auth.firebaseapp.com",
    projectId: "swai-auth",
    storageBucket: "swai-auth.firebasestorage.app",
    messagingSenderId: "1079787855377",
    appId: "1:1079787855377:web:48dac6d140f76843649bb0",
    measurementId: "G-YT0CNVPTPN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db, serverTimestamp }; // ✅ أضفنا serverTimestamp للتصدير
