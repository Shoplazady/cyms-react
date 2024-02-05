import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <>
            <h2>Admin Dashboard</h2>
            <Outlet />
            
        </>
    );
};

export default AdminDashboard;