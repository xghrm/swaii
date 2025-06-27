// src/pages/EmployeeDashboard.jsx
import React, { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    orderBy,
    query,
    updateDoc,
    doc,
} from "firebase/firestore";
import { db } from "../firebase";
import "./cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("Pending");

    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(data);
        };

        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, "orders", orderId), { status: newStatus });

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );

            toast.success(`Order ${newStatus === "Approved" ? "approved" : "rejected"} successfully!`);
        } catch (error) {
            toast.error("Error updating order.");
        }
    };

    const renderOrders = (status) => {
        const filtered = orders.filter((o) => o.status === status);
        if (filtered.length === 0) return <p>No {status} orders.</p>;

        return filtered.map((order) => (
            <div key={order.id} className="order-card">
                <p><strong>Date:</strong> {new Date(order.timestamp?.seconds * 1000).toLocaleString()}</p>
                <p><strong>Customer Name:</strong> {order.userName || "N/A"}</p>
                <p><strong>Phone:</strong> {order.phone || "N/A"}</p>
                <p><strong>Address:</strong> {order.address || "N/A"}</p>
                <ul>
                    {order.items?.map((item, i) => (
                        <li key={i}>
                            {item.name} - ${item.price} × {item.quantity}
                        </li>
                    ))}
                </ul>
                {status === "Pending" && (
                    <div className="order-actions">
                        <button onClick={() => updateStatus(order.id, "Approved")} className="approve-btn">✅ Approve</button>
                        <button onClick={() => updateStatus(order.id, "Rejected")} className="reject-btn">❌ Reject</button>
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div className="employee-dashboard">
            <h1 style={{ color: '#d68a8a' }}>🧑‍💼 Employee Dashboard</h1>

            <div className="tabs">
                <button onClick={() => setActiveTab("Pending")} className={activeTab === "Pending" ? "active-tab" : ""}>
                    Pending Orders
                </button>
                <button onClick={() => setActiveTab("Approved")} className={activeTab === "Approved" ? "active-tab" : ""}>
                    Approved
                </button>
                <button onClick={() => setActiveTab("Rejected")} className={activeTab === "Rejected" ? "active-tab" : ""}>
                    Rejected
                </button>
            </div>

            <div className="tab-content">
                {renderOrders(activeTab)}
            </div>

            <ToastContainer position="top-center" />
        </div>
    );
};

export default EmployeeDashboard;