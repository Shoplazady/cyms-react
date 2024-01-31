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
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div class="flex flex-1 flex-col">
            <AdminHeader onToggleSidebar={handleToggleSidebar} />
            <main className='flex-1 bg-stone-800 dark:bg-stone-200 duration-300 ease-linear'>
              <div className="mx-auto max-w-full p-2 md:p-4 2xl:p-6">
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
