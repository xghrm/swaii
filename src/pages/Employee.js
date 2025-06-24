// src/pages/EmployeeDashboard.jsx
import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    updateDoc,
    doc
} from "firebase/firestore";
import { db } from "../firebase";
import "./cart.css";

const EmployeeDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchPendingOrders = async () => {
            const q = query(
                collection(db, "orders"),
                where("status", "==", "Pending"),
                orderBy("timestamp", "desc")
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(data);
        };

        fetchPendingOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        await updateDoc(doc(db, "orders", orderId), {
            status: newStatus
        });

        setOrders(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="employee-dashboard">
            <h2>📋 Pending Orders</h2>
            {orders.length === 0 ? (
                <p>No pending orders.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="order-card">
                        <p><strong>Date:</strong> {new Date(order.timestamp?.seconds * 1000).toLocaleString()}</p>

                        {/* معلومات الزبون */}
                        <p><strong>Customer Name:</strong> {order.userName || "N/A"}</p>
                        <p><strong>Phone:</strong> {order.phone || "N/A"}</p>
                        <p><strong>Address:</strong> {order.address || "N/A"}</p>

                        {/* العناصر المطلوبة */}
                        <ul>
                            {order.items?.map((item, i) => (
                                <li key={i}>
                                    {item.name} - ${item.price} × {item.quantity}
                                </li>
                            ))}
                        </ul>

                        {/* أزرار التحكم */}
                        <div className="order-actions">
                            <button
                                className="approve-btn"
                                onClick={() => updateStatus(order.id, "Approved")}
                            >
                                ✅ Approve
                            </button>
                            <button
                                className="reject-btn"
                                onClick={() => updateStatus(order.id, "Rejected")}
                            >
                                ❌ Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default EmployeeDashboard;