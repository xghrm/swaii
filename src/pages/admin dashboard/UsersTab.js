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
    };

    const handleSuspend = async (id) => {
        await updateDoc(doc(db, "users", id), {
            suspended: true,
        });
        alert("User suspended.");
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1rem' }}>👥 Users List</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
                {users.map((user) => (
                    <div key={user.id} style={{
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '15px',
                        backgroundColor: user.suspended ? '#ffe6e6' : '#f9f9f9'
                    }}>
                        <p><strong>Name:</strong> {user.name || "N/A"}</p>
                        <p><strong>Email:</strong> {user.email || "N/A"}</p>
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={() => handleDelete(user.id)} style={{ marginRight: '10px', background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px' }}>
                                🗑️ Delete
                            </button>
                            <button onClick={() => handleSuspend(user.id)} style={{ background: '#ffc107', color: 'black', border: 'none', padding: '5px 10px' }}>
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
