
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const EmployeeProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isEmployee, setIsEmployee] = useState(false);

    useEffect(() => {
        const checkEmployee = async () => {
            const user = auth.currentUser;
            if (!user) {
                setIsEmployee(false);
                setLoading(false);
                return;
            }

            const docRef = doc(db, 'Employee', user.uid);
            const docSnap = await getDoc(docRef);

            setIsEmployee(docSnap.exists());
            setLoading(false);
        };

        checkEmployee();
    }, []);

    if (loading) return <p>Loading...</p>;

    return isEmployee ? children : <Navigate to="/unauthorized" />;
};

export default EmployeeProtectedRoute;
