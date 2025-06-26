// src/tabs/UsersTab.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";
import "./addm.css"; // تأكد من استيراد ملف الـ CSS
import { toast } from "react-toastify";

const UsersTab = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await getDocs(collection(db, "users"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "users", id));
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast.success("🗑️ User deleted successfully.");
    };

    const handleSuspend = async (id) => {
        await updateDoc(doc(db, "users", id), { suspended: true });
        toast.warning("🚫 User suspended.");
    };

    return (
        <div className="users-tab-container">
            <h3 className="users-tab-title">👥 Users List</h3>
            <div className="users-grid">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className={`user-card ${user.suspended ? "suspended" : ""}`}
                    >
                        <p><strong>Name:</strong> {user.name || "N/A"}</p>
                        <p><strong>Email:</strong> {user.email || "N/A"}</p>
                        <div className="user-actions">
                            <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                                🗑️ Delete
                            </button>
                            <button className="suspend-btn" onClick={() => handleSuspend(user.id)}>
                                🚫 Suspend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersTab;