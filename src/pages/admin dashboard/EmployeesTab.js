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
import "./addm.css";
import { toast } from "react-toastify";

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
        if (!newName || !newEmail) return toast.error("Please fill in all fields");
        await addDoc(collection(db, "Employee"), { name: newName, email: newEmail });
        setNewName("");
        setNewEmail("");
        toast.success("✅ Employee added successfully");
        window.location.reload();
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "Employee", id));
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        toast.success("🗑️ Employee deleted");
    };

    const handleUpdate = async (id) => {
        const newName = prompt("Enter new name:");
        if (newName) {
            await updateDoc(doc(db, "Employee", id), { name: newName });
            toast.info("✏️ Name updated");
            window.location.reload();
        }
    };

    return (
        <div className="employees-tab-container">
            <h3 className="employees-tab-title">👨‍💼 Employees Management</h3>
            <form onSubmit={handleAdd} className="add-employee-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <button type="submit">➕ Add Employee</button>
            </form>

            <div className="employee-list">
                {employees.map((emp) => (
                    <div key={emp.id} className="employee-card">
                        <p><strong>Name:</strong> {emp.name || "N/A"}</p>
                        <p><strong>Email:</strong> {emp.email || "N/A"}</p>
                        <div className="employee-actions">
                            <button onClick={() => handleUpdate(emp.id)} className="edit-btn">✏️ Edit</button>
                            <button onClick={() => handleDelete(emp.id)} className="delete-btn">🗑️ Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeesTab;