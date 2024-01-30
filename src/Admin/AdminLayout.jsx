import React from 'react';
import AdminHeader from './components/Header'; 
import AdminDashboard from './Dashboard/AdminDashboard'; 

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div className="flex">
        <div className="flex-1">
          <AdminDashboard />
          {children}
          </div>
      </div>
    </>
  );
};

export default AdminLayout;
