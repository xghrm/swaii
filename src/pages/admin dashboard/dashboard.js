import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const DashboardTab = () => {
    const [stats, setStats] = useState({ users: 0, employees: 0, orders: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const usersSnap = await getDocs(collection(db, "users"));
            const employeesSnap = await getDocs(collection(db, "Employee"));
            const ordersSnap = await getDocs(collection(db, "orders"));

            setStats({
                users: usersSnap.size,
                employees: employeesSnap.size,
                orders: ordersSnap.size,
            });
        };

        fetchStats();
    }, []);

    return (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={cardStyle}>
                <h3>Total Users</h3>
                <p>{stats.users}</p>
            </div>
            <div style={cardStyle}>
                <h3>Total Employees</h3>
                <p>{stats.employees}</p>
            </div>
            <div style={cardStyle}>
                <h3>Total Orders</h3>
                <p>{stats.orders}</p>
            </div>
        </div>
    );
};

const cardStyle = {
    flex: "1 1 250px",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center"
};

export default DashboardTab;
