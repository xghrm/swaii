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

const Orders = () => {
    const user = useUser();
    const [orders, setOrders] = useState([]);

    /* ────────── جلب الطلبات حسب الدور ────────── */
    useEffect(() => {
        if (!user) return;

        let q;
        if (user.role === "admin") {
            q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
        } else if (user.role === "employee") {
            q = query(collection(db, "orders"), where("status", "==", "Pending"));
        } else {
            // user العادي
            q = query(collection(db, "orders"), where("userId", "==", user.uid));
        }

        const unsub = onSnapshot(q, (snap) => {
            setOrders(
                snap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }))
            );
        });
        return () => unsub();
    }, [user]);

    /* ────────── تحديث حالة الطلب ────────── */
    const updateStatus = async (id, newStatus) => {
        await updateDoc(doc(db, "orders", id), { status: newStatus });
    };

    /* ────────── إلغاء / حذف الطلب ────────── */
    const handleDelete = async (id) => {
        const ok = window.confirm("⚠️  Are you sure you want to cancel this order?");
        if (!ok) return;
        try {
            await deleteDoc(doc(db, "orders", id));
            alert("✅ Order has been cancelled.");
        } catch (err) {
            alert(`❌ ${err.message}`);
        }
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
                        <p>
                            <strong>Order Date:</strong>{" "}
                            {new Date(order.timestamp?.seconds * 1000).toLocaleString()}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            <span
                                style={{
                                    color:
                                        order.status === "Approved"
                                            ? "green"
                                            : order.status === "Rejected"
                                                ? "red"
                                                : order.status === "Canceled"
                                                    ? "gray"
                                                    : "orange",
                                    fontWeight: "bold",
                                }}
                            >
                {order.status}
              </span>
                        </p>

                        {/* بيانات الزبون تظهر للموظف */}
                        {user.role === "employee" && (
                            <div style={{ marginBottom: "10px" }}>
                                <p>
                                    <strong>Customer:</strong> {order.userName || "N/A"}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {order.phone || "N/A"}
                                </p>
                                <p>
                                    <strong>Address:</strong> {order.address || "N/A"}
                                </p>
                            </div>
                        )}

                        {/* عناصر الطلب */}
                        <ul>
                            {order.items.map((itm, i) => (
                                <li key={i}>
                                    {itm.name} – ${itm.price} × {itm.quantity}
                                </li>
                            ))}
                        </ul>

                        {/* أزرار الموظف */}
                        {user.role === "employee" && order.status === "Pending" && (
                            <div className="btns">
                                <button onClick={() => updateStatus(order.id, "Approved")}>✅ Approve</button>
                                <button onClick={() => updateStatus(order.id, "Rejected")}>❌ Reject</button>
                            </div>
                        )}

                        {/* زر الحذف للمدير */}
                        {user.role === "admin" && (
                            <div className="btns">
                                <button onClick={() => handleDelete(order.id)}>🗑️ Delete</button>
                            </div>
                        )}

                        {/* زر الإلغاء للمستخدم العادي */}
                        {user.role !== "admin" &&
                            user.role !== "employee" &&
                            order.status === "Pending" && (
                                <div className="btns">
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        style={{
                                            padding: "10px 16px",
                                            backgroundColor: "#ff4d4f",
                                            color: "white",
                                            fontSize: "17px",
                                            border: "none",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            margin: "20px",
                                        }}
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
