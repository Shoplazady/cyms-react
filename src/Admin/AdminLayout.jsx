import React from 'react';
import AdminHeader from './components/Header'; 
import AdminSidebar from './components/Sidebar'; 

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
