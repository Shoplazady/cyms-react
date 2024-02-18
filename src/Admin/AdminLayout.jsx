import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from './components/Header';
import Sidebar from './components/Sidebar';
import AdminDashboard from './Dashboard/AdminDashboard';
import UserManage from './Dashboard/User';
import Ordertable from './Dashboard/Table/Ordertable';
import Category from './Dashboard/Table/Category';
import JobTable from './Dashboard/Table/Jobposition';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    return (
      <div className="bg-gray-900 dark:bg-gray-50">
        <div className="flex h-screen overflow-hidden">
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className="flex flex-1 flex-col w-full">
            <AdminHeader onToggleSidebar={handleToggleSidebar} />
            <main className='flex-1 h-full shadow-inner bg-gray-800 dark:bg-stone-100 duration-300 ease-linear'>
              <div className="mx-auto p-2 md:p-4 2xl:p-6">
                <Routes>
                  <Route path="/admin/" element={<AdminDashboard />} />
                  <Route path="/admin/User" element={<UserManage />} />
                  <Route path="/admin/Order" element={<Ordertable />} />
                  <Route path="/admin/category" element={<Category />} />
                  <Route path="/admin/job" element={<JobTable />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
};

export default AdminLayout;
