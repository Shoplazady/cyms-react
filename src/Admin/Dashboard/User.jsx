//User.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import  SortableTable  from './Table/SortableTable';

const UserManage = () => {
    return (
        <>
            <h2>User edit page</h2>
            
            <Outlet />

            <SortableTable />
        </>
    );
};

export default UserManage;