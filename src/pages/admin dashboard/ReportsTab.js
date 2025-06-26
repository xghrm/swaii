import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./addm.css";

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

    const acceptedOrders = orders.filter(order => order.status === "Approved").slice(0, 5);
    const rejectedOrders = orders.filter(order => order.status === "Rejected").slice(0, 5);

    return (
        <div className="reports-tab-container">
            <h2 className="reports-title">📊 Reports & Sales Summary</h2>
            <div className="summary-cards">
                <div className="summary-card">
                    <h3>Total Orders</h3>
                    <p className="summary-number">{totalOrders}</p>
                </div>
                <div className="summary-card">
                    <h3>Total Sales</h3>
                    <p className="summary-number">${totalSales.toFixed(2)}</p>
                </div>
            </div>

            <div className="orders-section">
                <div className="orders-list approved-orders">
                    <h4>✅ Approved Orders</h4>
                    <ul>
                        {acceptedOrders.map((order, index) => (
                            <li key={index}>
                                {new Date(order.timestamp?.seconds * 1000).toLocaleString()} -
                                ${Number(order.total || 0).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="orders-list rejected-orders">
                    <h4>❌ Rejected Orders</h4>
                    <ul>
                        {rejectedOrders.map((order, index) => (
                            <li key={index}>
                                {new Date(order.timestamp?.seconds * 1000).toLocaleString()} -
                                ${Number(order.total || 0).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ReportsTab;