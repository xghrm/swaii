// AdminProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AdminProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("✅ UID:", user.uid);
                const docRef = doc(db, "Admin", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("✅ Admin document found");
                    setIsAdmin(true);
                } else {
                    console.log("❌ Admin document NOT found");
                }
            } else {
                console.log("❌ No logged in user");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Loading...</p>;

    return isAdmin ? children : <Navigate to="/unauthorized" />;
};

export default AdminProtectedRoute;