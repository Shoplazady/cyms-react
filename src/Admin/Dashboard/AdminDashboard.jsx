import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <>
            {/* Additional components or elements specific to the dashboard can be added here */}
            <h2>Admin Dashboard</h2>
            {/* Use Outlet to render nested routes */}
            <Outlet />
        </>
    );
};

export default AdminDashboard;