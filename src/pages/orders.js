// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../firebase";
import useUser from "../hooks/employeeuser";
import "./order.css";
import { toast } from "react-toastify";

const Orders = () => {
    const user = useUser();
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        if (!user) return;
        let q;
        if (user.role === "admin") {
            q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
        } else if (user.role === "employee") {
            q = query(collection(db, "orders"), where("status", "==", "Pending"));
        } else {
            q = query(collection(db, "orders"), where("userId", "==", user.uid));
        }
        const unsub = onSnapshot(q, (snap) => {
            setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        });
        return () => unsub();
    }, [user]);

    const updateStatus = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "orders", id), { status: newStatus });

            // إشعار حسب نوع الحالة
            if (newStatus === "Approved") {
                toast.success("✅ Order has been approved.");
            } else if (newStatus === "Rejected") {
                toast.info("❌ Order has been rejected.");
            }
        } catch (error) {
            toast.error(`❌ Error updating status: ${error.message}`);
        }
    };

    const confirmCancel = async () => {
        if (!cancelReason) {
            toast.error("⚠️ Please select a reason for cancellation.");
            return;
        }
        try {
            await deleteDoc(doc(db, "orders", selectedOrderId));
            toast.success("✅ Order cancelled: " + cancelReason);
            setShowModal(false);
            setCancelReason("");
            setSelectedOrderId(null);
        } catch (err) {
            toast.error(`❌ ${err.message}`);
        }
    };

    const openCancelModal = (orderId) => {
        setSelectedOrderId(orderId);
        setShowModal(true);
    };

    return (
        <div className="orders-container">
            <h2>
                Orders 🧾 : <span style={{ textTransform: "capitalize" }}>{user?.role}</span>
            </h2>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <p><strong>Order Date:</strong> {new Date(order.timestamp?.seconds * 1000).toLocaleString()}</p>
                        <p><strong>Status:</strong> <span style={{ color:
                                order.status === "Approved" ? "green" :
                                    order.status === "Rejected" ? "red" :
                                        order.status === "Canceled" ? "gray" : "orange",
                            fontWeight: "bold" }}>{order.status}</span></p>

                        {user.role === "employee" && (
                            <div style={{ marginBottom: "10px" }}>
                                <p><strong>Customer:</strong> {order.userName || "N/A"}</p>
                                <p><strong>Phone:</strong> {order.phone || "N/A"}</p>
                                <p><strong>Address:</strong> {order.address || "N/A"}</p>
                            </div>
                        )}

                        <ul>
                            {order.items.map((itm, i) => (
                                <li key={i}>{itm.name} – ${itm.price} × {itm.quantity}</li>
                            ))}
                        </ul>

                        {user.role === "employee" && order.status === "Pending" && (
                            <div className="btns">
                                <button onClick={() => updateStatus(order.id, "Approved")}>✅ Approve</button>
                                <button onClick={() => updateStatus(order.id, "Rejected")}>❌ Reject</button>
                            </div>
                        )}

                        {user.role === "admin" && (
                            <div className="btns">
                                <button onClick={() => confirmCancel(order.id)}>🗑️ Delete</button>
                            </div>
                        )}

                        {user.role !== "admin" && user.role !== "employee" && order.status === "Pending" && (
                            <div className="btns">
                                <button onClick={() => openCancelModal(order.id)} style={{ padding: "10px 16px", backgroundColor: "#ff4d4f", color: "white", fontSize: "17px", border: "none", borderRadius: "10px", cursor: "pointer", margin: "20px" }}>Cancel Order</button>
                            </div>
                        )}
                    </div>
                ))
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Why do you want to cancel?</h3>
                        <select value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}>
                            <option value="">-- Select a reason --</option>
                            <option value="Changed my mind">Changed my mind</option>
                            <option value="Found a better price">Found a better price</option>
                            <option value="Delay in delivery">Delay in delivery</option>
                            <option value="Other">Other</option>
                        </select>
                        <div className="btns">
                            <button onClick={confirmCancel} style={{ marginTop: 10 }}>Confirm</button>
                            <button onClick={() => setShowModal(false)} style={{ marginTop: 10 }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;