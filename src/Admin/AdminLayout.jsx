import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHeader from './components/Header';
import Sidebar from './components/Sidebar';
import AdminDashboard from './Dashboard/AdminDashboard';
import UserManage from './Dashboard/User';

const AdminLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="bg-stone-900 dark:bg-gray-50">
        <div className="flex h-screen overflow-hidden">
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden transition-all ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <AdminHeader onToggleSidebar={handleToggleSidebar} />
            <main className='flex-1 bg-stone-500'>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Routes>
                  <Route path="admin/" element={<AdminDashboard />} />
                  <Route path='admin/User' element={<UserManage />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
