// src/tabs/EmployeesTab.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const EmployeesTab = () => {
    const [employees, setEmployees] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        const fetchEmployees = async () => {
            const snapshot = await getDocs(collection(db, "Employee"));
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setEmployees(data);
        };
        fetchEmployees();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newName || !newEmail) return alert("Please fill in all fields");
        await addDoc(collection(db, "Employee"), { name: newName, email: newEmail });
        setNewName("");
        setNewEmail("");
        window.location.reload();
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "Employee", id));
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    };

    const handleUpdate = async (id) => {
        const newName = prompt("Enter new name:");
        if (newName) {
            await updateDoc(doc(db, "Employee", id), { name: newName });
            window.location.reload();
        }
    };

    return (
        <div>
            <h3>👨‍💼 Employees Management</h3>
            <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <button type="submit">➕ Add Employee</button>
            </form>

            {employees.map((emp) => (
                <div
                    key={emp.id}
                    style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        marginBottom: "10px",
                    }}
                >
                    <p>
                        <strong>Name:</strong> {emp.name || "N/A"}
                    </p>
                    <p>
                        <strong>Email:</strong> {emp.email || "N/A"}
                    </p>
                    <button onClick={() => handleUpdate(emp.id)} style={{ marginRight: "10px" }}>
                        ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(emp.id)}>🗑️ Delete</button>
                </div>
            ))}
        </div>
    );
};

export default EmployeesTab;
