import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ReportsTab = () => {
    const [orders, setOrders] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            const snapshot = await getDocs(collection(db, "orders"));
            const data = snapshot.docs.map(doc => doc.data());
            setOrders(data);
            setTotalOrders(data.length);
            setTotalSales(data.reduce((sum, order) => sum + Number(order.total || 0), 0));
        };

        fetchOrders();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>📊 Reports & Sales Summary</h2>
            <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
                <div style={cardStyle}>
                    <h3>Total Orders</h3>
                    <p style={numberStyle}>{totalOrders}</p>
                </div>
                <div style={cardStyle}>
                    <h3>Total Sales</h3>
                    <p style={numberStyle}>${totalSales.toFixed(2)}</p>
                </div>
            </div>
            <h4 style={{ marginTop: "30px" }}>🧾 Recent Orders</h4>
            <ul>
                {orders.slice(0, 10).map((order, index) => (
                    <li key={index}>
                        {new Date(order.timestamp?.seconds * 1000).toLocaleString()} -
                        ${Number(order.total || 0).toFixed(2)} - {order.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const cardStyle = {
    flex: 1,
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const numberStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#4caf50"
};

export default ReportsTab;
