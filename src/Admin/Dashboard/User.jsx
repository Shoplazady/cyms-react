//User.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const UserManage = () => {
    return (
        <>
            <h2>User edit page</h2>
            <Outlet />
        </>
    );
};

export default UserManage;