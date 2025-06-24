import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import DashboardTab from "./admin dashboard/dashboard";
import UsersTab from "./admin dashboard/UsersTab";
import EmployeesTab from "./admin dashboard/EmployeesTab";
import CategoriesTab from "./admin dashboard/CategoriesTab";
import ReportsTab from "./admin dashboard/ReportsTab";
import RestaurantTab from "./admin dashboard/reastaurants";
import Logo from "../assets/logo.png";

const AdminDashboard = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src={Logo} alt="Logo" style={{ width: '60px', height: '60px', marginRight: '10px' }} />
                <h1 style={{ color: '#d68a8a' }}>Admin Dashboard</h1>
            </div>

            <Tabs value={tabIndex} onChange={handleChange} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto">
                <Tab label="Dashboard" />
                <Tab label="Users" />
                <Tab label="Employees" />
                <Tab label="Categories & Offers" />
                <Tab label="Reports & Sales" />
                <Tab label="Restaurants & More" />
            </Tabs>

            <div style={{ marginTop: '30px' }}>
                {tabIndex === 0 && <DashboardTab />}
                {tabIndex === 1 && <UsersTab />}
                {tabIndex === 2 && <EmployeesTab />}
                {tabIndex === 3 && <CategoriesTab />}
                {tabIndex === 4 && <ReportsTab />}
                {tabIndex === 5 && <RestaurantTab />}
            </div>
        </div>
    );
};

export default AdminDashboard;
