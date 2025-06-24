import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const useUser = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // جرب نجيب الدور من 3 مجموعات محتملة
                const employeeDoc = await getDoc(doc(db, "Employee", user.uid));
                if (employeeDoc.exists()) {
                    setUserData({ ...employeeDoc.data(), uid: user.uid, role: "employee" });
                    return;
                }

                const adminDoc = await getDoc(doc(db, "Admin", user.uid));
                if (adminDoc.exists()) {
                    setUserData({ ...adminDoc.data(), uid: user.uid, role: "admin" });
                    return;
                }

                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserData({ ...userDoc.data(), uid: user.uid, role: "user" });
                }
            } else {
                setUserData(null);
            }
        });

        return () => unsub();
    }, []);

    return userData;
};

export default useUser;
